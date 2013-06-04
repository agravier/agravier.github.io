---
layout: post-nomath
title: 'NAO Linux C++ development cheat sheet / tutorial, Part 3: The Apprentice NAOmancer'
---

In <a href="http://noelusion.com/2013/NAO-C++-tutorial-part-2:-Welcome-to-the-Matrix,-NAO/" target="_blank">Part 2</a>, we made our own simple application that runs on your computer, connects to NAO and displays every second on the filtered torso angle with respect to the world.

In this part, we transform this app into a module that can run on the robot and record torso angles in a file.

You can browse and clone the repository containing the source corresponding to this project on <a href="https://bitbucket.org/agravier/inmon" target="_blank">Bitbucket</a>. The tag corresponding to this part of the tutorial is <a href="https://bitbucket.org/agravier/inmon/src/6cbfc43fd7ce5d4aa553e597c0802051a919a0a0/?at=v0.1" target="_blank">v0.1</a>.

## Creating and opening the NAOqi module project

Let's make a fresh project.

<span style="font-family: Courier New, Courier, monospace;">cd ~/nao/workspace</span><br />
<span style="font-family: Courier New, Courier, monospace;">qibuild create inmon # [in]ertial sensor [mon]itor. catchy huh? </span><br />
<span style="font-family: Courier New, Courier, monospace;">cd inmon</span>

We won't really use the default source files, so let's delete all source files from the project:

<span style="font-family: Courier New, Courier, monospace;">rm *.cpp</span>

And we directly create the files we need and edit <i>CMakeLists.txt</i> to reflect that, because Qt Creator likes it that way (maybe there is an easier way? I usually don't use Qt Creator but Emacs, so I don't know if there is no easier way...).

<span style="font-family: Courier New, Courier, monospace;">touch inmon.{h,c}pp naoqi_module_loader.cpp inmon_client.cpp</span>

Dimitri tells me that modern versions of Qt Creator will just work fine and update the project when <i>CMakeLists.txt</i> is edited and saved, so you might not need to fight with your IDE by reloading it each time you add or move a file. So, don't do like me, install the <a href="http://qt-project.org/downloads#qt-creator" target="_blank">latest</a> Qt Creator, not your distro's default one.

<b>CMakeLists.txt</b>



{% highlight cmake %}
cmake_minimum_required(VERSION 2.8)
project(inmon)
find_package(qibuild)

# The naoqi module
qi_create_lib(inmon SHARED inmon.cpp naoqi_module_loader.cpp SUBFOLDER naoqi)
qi_use_lib(inmon ALCOMMON BOOST)
qi_stage_lib(inmon)

# Create an executable that can call the inmon module (locally or remotely)
qi_create_bin(inmon_client inmon_client.cpp)
qi_use_lib(call_fgrab ALCOMMON)
{% endhighlight %}



Configure the project, as this creates the build directory that Qt Creator wants (even if we will only use it as an editor, it wants a build directory):

<span style="font-family: Courier New, Courier, monospace;">qibuild configure</span>

There is a command to create Qt Creator project files that will work with qiBuild:

<span style="font-family: Courier New, Courier, monospace;">qibuild open</span>

with that command, you are now in QT Creator, and it's asking you about the build directory. Use ~/nao/workspace/inmon/build-atom as build directory, and click 'run cmake', and 'finish'. Your project is now open in Qt Creator, and the source files should be available for editing.

We already know how to get the filtered inertial sensor values, so let's focus on all the code that is around that. In a first iteration of this module, we will examine:

<ul>
<li>the actual class (<span style="font-family: Courier New, Courier, monospace;">IntertialMonitor</span>) that represents our module,</li>
<li>the code for loading and unloading that module into NAOqi,</li>
<li>making some of the member functions of our IntertialMonitor class available through NAOqi so that they can be called by an external program or another module.</li>
<li>making the module record the inertial sensor values to a file on NAO</li>
<li>making a client program that lets us call the exported functions of our module (start, stop, configure) from a remote computer or from NAO directly</li>
</ul>


## Programming a local (on-robot) NAOqi module

### Module loading code in naoqi_module_loader.cpp

A C++ NAOqi module is a library with some specific functions available. So, it's C++ code that has been compiled as a library (using <span style="font-family: Courier New, Courier, monospace;">qi_create_lib</span> in the <i>CMakeLists.txt</i> file). Two special functions have to be there to let NAOqi load and unload the module:

- <span style="font-family: Courier New, Courier, monospace;">_createModule</span> that sets the broker and creates an instance (an object)
- <span style="font-family: Courier New, Courier, monospace;">_closeModule</span> that does what it says.

I've separated those two functions in a file called <i>naoqi_module_loader.cpp</i>. They could also be in <i>inmon.cpp</i> along with the module class, but I find it clearer if they're not in the same file.

In practice, this code will rarely vary, you're going to copy-paste <i>naoqi_module_loader.cpp</i> from one local module project to the other. However, I've simplified it a little, removing code that lets you make the module a remote module (that can be loaded and used on a separate computer with its own local broker connected to NAO's broker over the network). For a full example of a module loader that can be used for both local and remote modules, see Aldebaran's loader <a href="https://developer.aldebaran-robotics.com/doc/1-14/_downloads/main7.cpp" target="_blank">there</a>.

### The NAOqi module class header <i>inmon.hpp</i>

The header file inmon.hpp contains the declaration of the <span style="font-family: Courier New, Courier, monospace;">InternalMonitor</span> class. It's a very useful to first look at that file to have an overview of the class without implementation details. Besides the include statements and other trivial things, the header file contains the following:



The first four public members are not so interesting, they are similar for all NAOqi module classes. When NAOqi  instantiates the class, the constructor (<span style="font-family: Courier New, Courier, monospace;">InertialMonitor(shared_ptr, string)</span>) is called, followed by the <span style="font-family: Courier New, Courier, monospace;">init()</span> method. <span style="font-family: Courier New, Courier, monospace;">~InertialMonitor</span> is the object destructor. Unloading the module calls <span style="font-family: Courier New, Courier, monospace;">exit()</span> prior to destruction. Note that those four methods should have been qualified by the keyword <span style="font-family: Courier New, Courier, monospace;">virtual</span> if we had planned to make derived classes from <span style="font-family: Courier New, Courier, monospace;">InertialMonitor</span>. You can read more about virtual methods in C++ on the very useful <a href="http://www.parashift.com/c++-faq/virtual-functions.html" target="_blank">C++ FAQ website</a>.

<span style="font-family: Courier New, Courier, monospace;">startMonitor(int)</span>, <span style="font-family: Courier New, Courier, monospace;">startMonitorAndRecord(int, string)</span> and <span style="font-family: Courier New, Courier, monospace;">stopMonitor()</span> are functions that we want to make available externally and to other modules.

- <span style="font-family: Courier New, Courier, monospace;">startMonitor(int)</span> and <span style="font-family: Courier New, Courier, monospace;">startMonitorAndRecord(int, string)</span> start or restart the inertial sensor monitor with the given sampling period, recording the data locally in the given plain text output file if provided (the data are appended to the file if it already exists).
- <span style="font-family: Courier New, Courier, monospace;">stopMonitor()</span> stops the monitor and closes the recording file if any.

The <span style="font-family: Courier New, Courier, monospace;">private</span> section of the class might seem a little obscure:


{% highlight c++ %}
private:  
  struct Impl;  
  boost::shared_ptr<Impl> impl; 
{% endhighlight %}


Normally, the private members of a class are all data attributes and member functions that are here for the convenience of the implementer, and not to be accessed by anyone but the class itself. So, we might expect to see something revealing the internals of the module, for instance like that:


{% highlight c++ %}
public:  
  void operator()(); // thread method. must be public to be callable, I think.  
private:  
  boost::shared_ptr<AL::ALMemoryProxy> memoryProxy;  
  boost::posix_time::time_duration samplingPeriod;   
  boost::thread *t;  // thread of the sampling code  
  bool stopThread;   // flag to stop the thread, also condVar's timed_wait predicate against spurious unblocks  
  boost::mutex stopThreadLock; // lock  
  boost::condition_variable condVar; // mechanism to control the thread's execution  
  //   probably more stuff  
{% endhighlight %}

But instead, all we see is an opaque struct of type <span style="font-family: Courier New, Courier, monospace;">Impl</span>, and a pointer <span style="font-family: Courier New, Courier, monospace;">impl</span> to one instance of <span style="font-family: Courier New, Courier, monospace;">Impl</span>. This is typical of the <b>PImpl</b> (means "[P]rivate [Impl]ementation") idiom, which is very useful in C++ to more clearly separate the public part of a class from its internal implementation. I advise to follow that idiom whenever possible. Here, all the threading mess still exists, but only in the cpp file.

The most obvious advantage of PImpl is that the header files are completely insensitive to implementation changes. So, for instance, if I decide to change from a wait mechanism that is internal to the class to some sort of event-driven (external timer maybe?) mechanism, well all these private attributes are certainly going to change, but if they are hidden behind a struct that is only defined in the cpp file, the header will remain exactly the same.

### The NAOqi module class implementation <i>inmon.cpp</i>

Now that we have seen the value of the opaque pointer to the implementation, we need to actually define this class and that <span style="font-family: Courier New, Courier, monospace;">Impl</span> structure. <i>inmon.cpp</i> contains the whole implementation. This section discusses some parts of it.

The functions of the outer <span style="font-family: Courier New, Courier, monospace;">InertialMonitor</span> class (ctor, dtor, <span style="font-family: Courier New, Courier, monospace;">init</span>, <span style="font-family: Courier New, Courier, monospace;">exit</span>, <span style="font-family: Courier New, Courier, monospace;">startMonitor</span>, <span style="font-family: Courier New, Courier, monospace;">startMonitorAndRecord</span>, <span style="font-family: Courier New, Courier, monospace;">stopMonitor</span>) should make use of the members of the inner PImpl structure (<span style="font-family: Courier New, Courier, monospace;">InertialMonitor::Impl</span>).

#### Overview
(the snippets below in the Overview section are pseudo-C++ code, simplified for readabililty.)
I have chosen to write the <span style="font-family: Courier New, Courier, monospace;">Impl</span> structure with the following members:


{% highlight c++ %}
struct InertialMonitor::Impl {  
  boost::shared_ptr<AL::ALMemoryProxy> memoryProxy;  
  bool stopThread; // flag to stop the thread, and predicate against spurious unblocks  
  std::ofstream outputFile;  
  boost::posix_time::time_duration samplingPeriod;  
  
  Impl(InertialMonitor &mod);  
  ~Impl();  
  void setupOutputFile(const std::string filename);  
  void closeOutputFile();  
  void operator()();  
}
{% endhighlight %}


The member function <span style="font-family: Courier New, Courier, monospace;">operator()</span> makes <span style="font-family: Courier New, Courier, monospace;">Impl</span> instances callable, and it's the function that should contains the sampling loop; something like the following pseudocode:


{% highlight c++ %}
void InertialMonitor::Impl::operator()() {  
  while (!stopThread) {  
    outputFile << timestamp << ", " << x << ", " << y << "\n";  
    wait(timeout);  
  }  
}  
{% endhighlight %}


The functions <span style="font-family: Courier New, Courier, monospace;">setupOutputFile()</span> and <span style="font-family: Courier New, Courier, monospace;">closeOutputFile()</span> open the <span style="font-family: Courier New, Courier, monospace;">InternalMonitor</span> record file and close it. They have to ensure that at all times, at most one file is open.

Our module has to be able to do two things simultaneously: respond to requests from clients and other modules, and monitor the inertial sensors at a certain frequency, maybe recording the observations in some file. The easiest way to do that is to have (when required) a thread T2 that does the sampling and recording, and another thread T1 that processes the remote calls and controls T2 accordingly.

<u>Let's see a use case:</u>

On the robot, NAOqi has loaded the <span style="font-family: Courier New, Courier, monospace;">InertialMonitor</span> module, so it has created an instance of it that we will call <span style="font-family: Courier New, Courier, monospace;">m</span>, and it sits idle, waiting for a RPC.

On a remote computer, I call <span style="font-family: Courier New, Courier, monospace;">p.startMonitor(1000)</span> (I call the member function <span style="font-family: Courier New, Courier, monospace;">startMonitor</span> on a proxy <span style="font-family: Courier New, Courier, monospace;">p</span> of the <span style="font-family: Courier New, Courier, monospace;">InertialMonitor</span> module), indicating that I want the <span style="font-family: Courier New, Courier, monospace;">InertialMonitor</span> module to sample the inertial sensor every second, without recording the output. The computer's instance of naoqi (the "remote broker") communicates with naoqi on the robot (local broker) to make that call.

On NAO, the module's main thread of execution (T1), which was waiting to be activated by such a request, starts running through <span style="font-family: Courier New, Courier, monospace;">m.startMonitor</span>, the method of the local <span style="font-family: Courier New, Courier, monospace;">InertialMonitor</span> instance <span style="font-family: Courier New, Courier, monospace;">m</span> that corresponds to the method called on the remote proxy module. In short, T1 runs through <span style="font-family: Courier New, Courier, monospace;">startMonitor</span> on the robot.

At some point the code of <span style="font-family: Courier New, Courier, monospace;">startMonitor</span>, T1 spawns a thread T2 that runs through an infinite loop. Meanwhile, T1 finishes running through <span style="font-family: Courier New, Courier, monospace;">startMonitor</span> and "goes back to wait" for another request.

T2 continues its loop: every second, it reads the inertial monitor sensor values from the local <span style="font-family: Courier New, Courier, monospace;">ALMemory</span> instance, and when done, goes back to wait for the next second, or to be interrupted by a signal from T1. It would also write the values to the file, had it been requested (using <span style="font-family: Courier New, Courier, monospace;">startMonitorAndRecord</span>).

On the remote computer, I call <span style="font-family: Courier New, Courier, monospace;">p.startMonitorAndRecord(100, "/home/nao/test")</span>. I want a 100 ms sampling, recorded in the file <i>test</i> in NAO's home folder (on the robot). The remote broker sends that call to the local broker.

The local naoqi runs T1 through <span style="font-family: Courier New, Courier, monospace;">m.startMonitorAndRecord</span>, with the parameters I gave. Note that at that time, T2 should still exist from the previous call, and it is either running (maybe busy reading sensor values), or waiting for the next sampling time. But we now want to have this monitoring thread run 10 times faster and record the readings in a file. So we could go two ways about it: communicate these new parameters to T2 and make it adapt its behavior to match that, or terminate T2 and make a new thread with the new parameters.

In programming, <b>simplicity is preferable when performance is not critical</b>. In the present case, that means that just stopping the execution of the sensor capture / recording loop and restarting it with the new parameters is better because it's simpler.

So, in the execution of <span style="font-family: Courier New, Courier, monospace;">m.startMonitorAndRecord</span> by T1, we have to first shutdown T2, then spawn it again with the new parameters. Of course, we can only shut down T2 when it is not in the middle of something critical, like writing to the record file, or reading the sensor values. In fact, it is only safe to stop T2 in the beginning of the loop. However, in our example here, T2 could be waiting up to 1 second to reach the beginning of the loop again and notice "the request to terminate" of T1. Meanwhile, T1 would be waiting for T2, and I, the user on the remote computer, would be wondering why my command to increase the sampling frequency and record it on file is still not executed. That means that T1 should be able to notify a "sleeping" T2 that he has to wake up now, because it's "time to die". In consequence, the "sleep" of T2 would better be the last thing it does before testing if it's been awaken by a request to terminate.

Back to our scenario, T2 is awaken from its wait by T1's signal, and detects that request to finish, so it exits its 1-second sampling loop and finishes. T1, which was waiting for this end of T2, continues by spawning another, new thread T2 that runs through the same infinite loop, but now configured for a 100ms period, and to record to the given file. T1 finishes running through <span style="font-family: Courier New, Courier, monospace;">startMonitorAndRecord</span> and "goes back to wait" for another request.

When the request to end T2 comes, this time, we have to also ensure that the recording file is properly closed.

#### Threading

From that overview, let's summarise the main points of the concurrent execution of T1 and T2, and see how it's done in the code:

The main execution thread (T1) is assumed to always exist, but its state is managed by the local instance of NAOqi. In other words, we ono need to know that when the <span style="font-family: Courier New, Courier, monospace;">InertialMonitor</span> module is loaded by NAOqi, 2 function are called: the constructor, and <span style="font-family: Courier New, Courier, monospace;">init()</span>. Then, the module "waits" for one of its public API methods to be called through NAOqi. When such a method is called, T1 runs through it and can spawn new threads that will run independently if necessary. But T1 itself should finish running the method and "go back to wait" to another NAOqi call.

When launching a new sampling thread, T1 has to first ensure that any bother sampling thread is done. If there is a T2 running, that means:


<ul>
<li>send a signal to T2 to terminate</li>
<li>wait that T2 is stopped</li>
<li>close the output file is any (using <span style="font-family: Courier New, Courier, monospace;">Impl::closeOutputFile</span>)</li>
</ul>


Once this is done, T1 has to:


<ul>
<li>open the new output file in append mode (we don't want to overwrite old records)</li>
<li>configure the sampling period (<span style="font-family: Courier New, Courier, monospace;">Impl:: samplingPeriod</span>)</li>
<li>start the new thread</li>
</ul>


On its side, T2 has the following responsibilities:


<ul>
<li>sample the inertial sensor values at the frequency required, without drift.</li>
<li>when notified of a request to self-terminate, </li>
<ul>
<li>if waiting: stop waiting for the next sampling period, and go right away to terminate.</li>
<li>if doing something else: wrap it up cleanly, and go to terminate.</li>
</ul>
</ul>


In the code, that is implemented in the following way:



{% highlight c++ %}
void InertialMonitor::Impl::operator()()  {  
  boost::unique_lock<boost::mutex> fileLock(outputFileLock); // starts locked  
  bool stopThreadCopy;  
  boost::posix_time::ptime time_t_epoch(boost::gregorian::date(1970,1,1));  
  float x, y;  
  stopThreadLock.lock();  
  stopThreadCopy = stopThread;  
  stopThreadLock.unlock();  
  float *intertialSensorX =  
      static_cast<float*>(memoryProxy->getDataPtr(intertialSensorXKey));  
  float *intertialSensorY =  
      static_cast<float*>(memoryProxy->getDataPtr(intertialSensorYKey));  
  boost::system_time tickTime = boost::get_system_time();  
  while (!stopThreadCopy) {  
    // get values  
    x = *intertialSensorX;  
    y = *intertialSensorY;  
    // note the time (in nanoseconds since Jan 1 1970)  
    boost::posix_time::time_duration duration = boost::get_system_time() - time_t_epoch;  
    long long timestampNanos = duration.total_nanoseconds();  
    // record them  
    if (outputFile_p) {  
      try {  
        outputFile << timestampNanos << ", " << x << ", " << y << "\n"; // endl flushes  
      } catch (std::exception& e) {  
        qiLogError("InertialMonitor") << "Failed to write \"" <<  timestampNanos << ", "  
                                      << x << ", " << y << "\" to the output file: "  
                                      << e.what() << std::endl;  
      }  
    }  
    // calculate next tick time  
    tickTime += samplingPeriod;  
    // wait for timeout, unlock fileLock while waiting, and control for spurious wakes  
    // by checking stopThread.  
    condVar.timed_wait(fileLock, tickTime, boost::lambda::var(stopThread));  
    stopThreadLock.lock();  
    stopThreadCopy = stopThread;  
    stopThreadLock.unlock();  
  }  
}  
{% endhighlight %}


Note the lock/read/unlock and lock/write/unlock operations in the above code for all variables that could potentially be accessed by T1 concurrently. Let's take for instance the 3 instructions <span style="font-family: Courier New, Courier, monospace;">stopThreadLock.lock(); stopThreadCopy = stopThread; stopThreadLock.unlock();</span> This means that before reading the value of the variable <span style="font-family: Courier New, Courier, monospace;">stopThread</span>, T2 has to <b>acquire the lock</b> named stopThreadLock (a member of Impl of type boost::mutex). Once the value is read, T2 <b>releases the lock</b> on <span style="font-family: Courier New, Courier, monospace;">stopThread</span>. <span style="font-family: Courier New, Courier, monospace;">stopThread</span> is the variable used to signal to T2 that it has to stop, so T1 might write in this variable anytime. So, in all places where this <span style="font-family: Courier New, Courier, monospace;">stopThread</span> variable is manipulated, it is surrounded by the lock/unlock mechanism. T2 will only be able to acquire this lock if another thread (here, T1) does not already hold it. For instance, in <span style="font-family: Courier New, Courier, monospace;">InertialMonitor::stopMonitor()</span>:


{% highlight c++ %}
void InertialMonitor::stopMonitor() {  
  try {  
    impl->closeOutputFile();  
    impl->stopThreadLock.lock();  
    impl->stopThread = true;  
    impl->stopThreadLock.unlock();  
    // wake up, it time ...  
    impl->condVar.notify_one();  
    // ... to die  
    if (impl->t) {  
      impl->t->join();  
    }  
  } catch (std::exception& e) {  
    qiLogError("InertialMonitor") << "Failed to stop intertial monitor: "  
                        << e.what() << std::endl;  
    exit();  
  }  
}  
{% endhighlight %}


This locking mechanism is a primitive way to do concurrent programming, but it's sufficient for our purpose. 

In the above code for <span style="font-family: Courier New, Courier, monospace;">stopMonitor</span>, we also see how notification to T2 to stop its activity is implemented:


<ul>
<li><span style="font-family: Courier New, Courier, monospace;">impl-&gt;stopThread</span> is set to true</li>
<li>T2 is awaken from its sleep through a signal (<span style="font-family: Courier New, Courier, monospace;">impl-&gt;condVar.notify_one()</span>)</li>
<li>T1 waits for T2 to finish and die (<span style="font-family: Courier New, Courier, monospace;">impl-&gt;t-&gt;join()</span>)</li>
</ul>


#### File handling

We need to record all samples, with for each sample: the time at which it was taken, the value of the inertial sensor for the X axis, and the value for Y. But that's not enough to know that: a decision has to be made regarding the format of the record files.


<ul>
<li>very compressed binary format vs text files? </li>
<li>format for dates?</li>
<li>format for sensor values?</li>
</ul>


It's better to have human-readable text, but it's also necessary not to loose precision in the output, and to ensure that the logs are also easily machine-readable. The sensor values come as floats, we can record them as they would be printed, as there is noise in the sensor readings and trailing digits are just garbage.

The format for dates is the number of nanoseconds since January 1st, 1970 (Unix "time 0") on NAO's clock. I choose an absolute time because it's generally more informative at the cost of a little more space and clutter, and because the file may be appended during a subsequent call to a recording function or even a subsequent run of the module. A relative clock may be reset by that, and the records would be inconsistent, with a rollback to time 0 in the middle of the file.

Finally, what should happen when the same file path is given during several subsequent calls of the <span style="font-family: Courier New, Courier, monospace;">startMonitorAndRecord</span> function? We have the choice between failing with an error message, overwriting the previous file, renaming it, or appending to the end of the file. In this implementation, I choose to append to the end of the file. This is implemented by opening the file in append mode in the <span style="font-family: Courier New, Courier, monospace;">Impl::setupOutputFile</span> function.



{% highlight c++ %}
void InertialMonitor::Impl::setupOutputFile(const std::string filename) {  
  try {  
    closeOutputFile();  
    outputFileLock.lock();  
    outputFile.open(filename.c_str(), std::ios::app); // append  
    outputFile_p = true;  
    outputFileLock.unlock();  
  } catch (std::exception& e) {  
    qiLogError("InertialMonitor") << "Failed to open the output file: "  
                                  << e.what() << std::endl;  
    throw InertialMonitorError("Failed to open the output file");  
  }  
}  
{% endhighlight %}


We also need to ensure that the record file is closed in all cases of execution.

### The client <i>inmon_client.cpp</i>

The client program is meant to give us a way to try out our module by calling tis public NAOqi functions, rather than being a very convenient front-end to the inertial sensors. So, it's just a simple command-line program that accepts a few options, conveniently implemented using <span style="font-family: Courier New, Courier, monospace;">boost::program_options</span>. This argument-processing code is all in the parseOpt function. This function is quite boring to read, in fact I invite you to have a look at <a href="http://www.radmangames.com/programming/how-to-use-boost-program_options" target="_blank">this neat blog post</a> if you want to better understand it. Rather, let's look at the main() function, which contains a few fundamental idiom of NAO programming:


{% highlight c++ %}
int main(int argc, char* argv[]) {  
  std::string parentBrokerIP, outputFile;  
  int parentBrokerPort, periodInMilliseconds;  
  command_t command; // command_t is just a typedef'd enum with START and STOP.  
  setlocale(LC_NUMERIC, "C"); // Need this to for SOAP serialization of floats to work  
  
  parseOpt(&parentBrokerIP, &parentBrokerPort, &command, &periodInMilliseconds,  
           &outputFile, argc, argv);  
  boost::shared_ptr<AL::ALProxy> inertialMonitorProxy;  
  try {  
    inertialMonitorProxy = boost::shared_ptr<AL::ALProxy>  
        (new AL::ALProxy("InertialMonitor", parentBrokerIP, parentBrokerPort));  
  } catch (const AL::ALError& e) {  
    std::cerr << "Could not create proxy: " << e.what() << std::endl;  
    return 3;  
  }  
  
  if (command == STOP) {  
    inertialMonitorProxy->callVoid("stopMonitor");  
  } else { // (command == START}  
    if (outputFile ==  "") {  
      inertialMonitorProxy->callVoid("startMonitor", periodInMilliseconds);  
    } else {  
      inertialMonitorProxy->callVoid("startMonitorAndRecord", periodInMilliseconds,  
                                     outputFile);  
    }  
  }  
 return 0;  
} 
{% endhighlight %}


The line <span style="font-family: Courier New, Courier, monospace;">inertialMonitorProxy = boost::shared_ptr&lt;AL::ALProxy&gt;(new AL::ALProxy("InertialMonitor", parentBrokerIP, parentBrokerPort))</span> is used to get a proxy to the <span style="font-family: Courier New, Courier, monospace;">InertialMonitor</span> module without having an <span style="font-family: Courier New, Courier, monospace;">InertialMonitorProxy</span> type, which Aldebaran modules have, but not user-created modules. Using the generic-type proxy, we can call the module's API functions using <span style="font-family: Courier New, Courier, monospace;">callVoid</span> or, for functions with return values, the templated <span style="font-family: Courier New, Courier, monospace;">call&lt;type&gt;</span>, as in <span style="font-family: Courier New, Courier, monospace;">inertialMonitorProxy-&gt;callVoid("startMonitor", periodInMilliseconds);</span>

### Trying it out

Let's try to build the project and call <span style="font-family: Courier New, Courier, monospace;">inmon_client</span>.

<span style="font-family: Courier New, Courier, monospace;">qibuild configure -c local</span><br />
<span style="font-family: Courier New, Courier, monospace;">qibuild make -c local</span>

Calling it without argument:

<span style="font-family: Courier New, Courier, monospace;">./build-local/sdk/bin/inmon_client</span>
<span style="font-family: inherit;">
</span>
<span style="font-family: inherit;">outputs:</span>

<i><span style="font-family: inherit;">
</span></i>
<span style="font-family: Courier New, Courier, monospace;"><i>missing required option command</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>Allowed options:</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>  --pip arg (=nao.local) IP of the parent broker. Default: nao.local</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>  --pport arg (=9559)    Port of the parent broker. Default: 9559</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>  -c [ --command ] arg   START or STOP</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>  --output-file arg      filename where to record sensor values on the robot. </i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>                         Default: no output file</i></span><br />

Giving it the required arguments still does not make the module run:

<span style="font-family: Courier New, Courier, monospace;">./build-local/sdk/bin/inmon_client --pip 192.168.2.3 -c START</span>

<span style="font-family: Courier New, Courier, monospace;"><i>[INFO ] Starting ALNetwork</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>[INFO ] NAOqi is listening on 127.0.0.1:54010</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>Could not create proxy: <span class="Apple-tab-span" style="white-space: pre;"> </span><br />ALNetwork::getModuleByName</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i><span class="Apple-tab-span" style="white-space: pre;"> </span>failed to get module InertialMonitor http://192.168.2.3:9559</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>[INFO ] Stopping ALNetwork</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>[INFO ] Exit</i></span><br />

We have to load our module on NAOqi on the robot first.

#### Loading and autoloading a local module 

First, let's send it over:

<span style="font-family: Courier New, Courier, monospace;">qibuild deploy -c atom nao@192.168.2.3:naoqi</span>

If it doesn't fail, we can connect to the robot and look at that <i>~/naoqi</i> folder

<span style="font-family: Courier New, Courier, monospace;">ssh nao@192.168.2.3</span><br />
<span style="font-family: Courier New, Courier, monospace;">cd ~/naoqi; ls</span>

We note the <i>preferences</i> folder. It contains a file called <i>autoload.ini</i>

<span style="font-family: Courier New, Courier, monospace;">ls lib/naoqi</span>

In the <i>~/naoqi/lib/naoqi</i> folder, we have out inmon library (<i>libinmon.so</i>)

If we had produced and deployed other libraries that are not NAOqi modules, they would be directly in <i>~/naoqi/lib</i>. However, this place is not a conventional place for the shared library loader to look for files. To solve that problem, we can set an environment variable called <span style="font-family: Courier New, Courier, monospace;">LD_LIBRARY_PATH</span> to include those paths that are not standard but where we want to put our development libraries. We can do that temporarily by running <span style="font-family: Courier New, Courier, monospace;">export LD_LIBRARY_PATH=$HOME/naoqi/lib:$HOME/naoqi/lib/naoqi</span> in our terminal. But it will disappear after we log out of NAO. To solve that, we need to edit <i>~/.bash_profile</i> and add that same line. As we are on NAO through plain ssh, we have to use a console text editor like emacs or nano: <span style="font-family: Courier New, Courier, monospace;">nano ~/.bash_profile</span> (use ctrl-o to write the file, ctrl-x to exit). We can also just drop the line in the file if we're sure that it will not mess it up: <span style="font-family: Courier New, Courier, monospace;">echo 'export LD_LIBRARY_PATH=$HOME/naoqi/lib:$HOME/naoqi/lib/naoqi' &gt;&gt; ~/.bash_profile</span>

To ensure that the change is taken into account, let's restart NAO. First, disconnect from ssh (ctrl-d will do that fast.). Then, turn off NAO and on again. Reconnect using ssh.

Then, we need to tell NAOqi to load our new module. Edit <i>~/naoqi/preferences/autoload.ini</i>. Under the <span style="font-family: Courier New, Courier, monospace;">[user]</span> section, add the full path to our module: <i>/home/nao/naoqi/lib/naoqi/libinmon.so</i>

If the file is empty, put the following inside:

<div class="highlight"><pre><code>[user]
/home/nao/naoqi/lib/naoqi/libinmon.so

[python]

[program]</code></pre></div>

This file lets NAOqi load what is listed inside when it starts. Under <span style="font-family: Courier New, Courier, monospace;">[user]</span>, you write <span style="font-family: Courier New, Courier, monospace;">/the/full/path/to/your/liblibraryname.so</span>. If you have a Python module, you write<span style="font-family: Courier New, Courier, monospace;"> /the/full/path/to/your/python_module.py</span> under <span style="font-family: Courier New, Courier, monospace;">[python]</span>.
The <span style="font-family: Courier New, Courier, monospace;">[program]</span><span style="font-family: inherit;"> </span>section makes NAOqi autoload an executable program. You need to specify <span style="font-family: Courier New, Courier, monospace;">/the/full/path/to/your/program</span>. Lines starting with <span style="font-family: Courier New, Courier, monospace;">#</span> are comments.

We manually stop NAOqi (ensure that stiffness is off and NAO is stable):

<span style="font-family: Courier New, Courier, monospace;">nao stop</span>

Note that the chest light should now flash yellow, indicating that NAOqi is not running. We restart NAOqi:

<span style="font-family: Courier New, Courier, monospace;">nao start</span>

"NAO Gnuk!" - We can examine the NAOqi log:

<span style="font-family: Courier New, Courier, monospace;">less /var/log/naoqi/head-naoqi.log</span>

In the end of that file, there should be a line that says "[INFO ] Starting InertialMonitor". If there was a problem and our module crashed, then NAOqi may have crashed too. The log should reflect that, as by default, all logged data at error level is recorded.

But restarting NAO in that way and going to fish for the log file is not very convenient. Moreover, the log only records data logged at INFO level and above. We maybe want to get access to low-level logged data. Let's stop naoqi again:

<span style="font-family: Courier New, Courier, monospace;">nao stop</span>

Another way to run naoqi is to call the binary directly. It allows passing naoqi-specific options; for instance, we want to get down to the VERBOSE level of logging:

<span style="font-family: Courier New, Courier, monospace;">naoqi -v</span>

You can stop it with ctrl-c.

Usually, I have a few terminal open with ssh into NAO, one of which I use to manipulate naoqi, and the others for files, etc&#8230;, and a few more terminals open with local shells.

let's start naoqi at high verbosity and call the <span style="font-family: Courier New, Courier, monospace;">startMonitorAndRecord</span> function of the <span style="font-family: Courier New, Courier, monospace;">InertialMonitor</span> module instance using the <span style="font-family: Courier New, Courier, monospace;">inmon_client</span> binary (it could be run from our computer or from NAO, let's try from out our computer)

in one of the ssh'd terminal:

<span style="font-family: Courier New, Courier, monospace;">naoqi -v &gt; ~/naoqi.log 2&gt;&amp;1</span>

in the local shell:

<span style="font-family: Courier New, Courier, monospace;">./build-local/sdk/bin/inmon_client --pip 192.168.2.3 --pport 9559 -c START --output-file /home/nao/inmon.out.txt -p 1000</span>

Wait a few seconds, then:

<span style="font-family: Courier New, Courier, monospace;">./build-local/sdk/bin/inmon_client --pip 192.168.2.3 --pport 9559 -c STOP</span>

You can stop (ctrl-c) naoqi in the ssh'd terminal, and examine the inmon log file (<span style="font-family: Courier New, Courier, monospace;">q</span> to quit):

<span style="font-family: Courier New, Courier, monospace;">less ~/inmon.out.txt</span>

and you can have a look at the verbose naoqi.log file that we made too:

<span style="font-family: Courier New, Courier, monospace;">less ~/naoqi.log</span>

(search for "Inertial" by typing <span style="font-family: Courier New, Courier, monospace;">/Inertial</span> and pressing enter. press <span style="font-family: Courier New, Courier, monospace;">n</span> for the next occurrence. <span style="font-family: Courier New, Courier, monospace;">Esc</span> to stop. <span style="font-family: Courier New, Courier, monospace;">q</span> to quit.)

## In the next episode

We have the basis of our module in place. In a second iteration, we will look at:

<ul>
<li>making the module send those sensor values as a stream to another computer on the network (which involves network I/O programming)</li>
<li>letting the client program optionally display the received stream of sensor values, and maybe do other neat things with it.</li>
</ul>

