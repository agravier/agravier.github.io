---
layout: post
title: 'NAO Linux C++ development cheat sheet / tutorial, Part 2: Welcome to the Matrix, NAO'
---

I originally [posted this text](http://janebotics.blogspot.com/2013/02/welcome-to-matrix-nao-nao-tutorial-part.html "Permalink to Welcome to the Matrix, NAO (NAO tutorial part 2)") on another blog. I have copied it here in an effort to gather some of my past writings on this website. 

---

<h2>
<span style="font-family: Verdana, sans-serif;">
NAO Linux C++ development cheat sheet / tutorial, Part 2</span></h2>
Following <a href="http://janebotics.blogspot.com/2012/12/better-nao-than-never-nao-tutorial-part.html" target="_blank">Part 1</a>, we&nbsp;have a workspace in ~/nao/workspace, at least one toolchain set up for one of the two possible processors of NAO (<span style="font-family: Courier New, Courier, monospace;">qitoolchain list</span>), and the C++ SDK folder extracted in ~/nao/devtools.<br />
<span style="font-family: inherit;"><br /></span><span style="font-family: inherit;">We will now make our own NAO&nbsp;</span>C++<span style="font-family: inherit;">&nbsp;project, configure it, build it, and run it. We'll maybe have some fast review of some C++ at the same time.</span><br />
<span style="font-family: inherit;"><br /></span>
<span style="font-family: inherit;">Before doing that, let's have a look at what's in a qibuild project.</span><br />
<span style="font-family: inherit;">Change directory to your workspace:&nbsp;</span><span style="font-family: Courier New, Courier, monospace;">cd ~/nao/workspace</span>
<h2>
<span style="font-family: inherit;">Anatomy of the default qiBuild project</span></h2>
<div>
<span style="font-family: Courier New, Courier, monospace;">qibuild create project</span></div>
With that command, qibuild creates a project directory containing:<br />
<i>CMakeLists.txt</i><br />
<i>main.cpp</i><br />
<i>qiproject.xml</i><br />
<i>test.cpp</i><br />

Let's have a look at each file.<br />

<span style="font-family: Courier New, Courier, monospace;">cd project</span>

<h3>
qiBuild project file:&nbsp;<i>qiproject.xml</i></h3>
<div>
This file contains the name of the project, and can be used to list dependencies on other qiBuild projects. It's of little interest.<br />
</div>
<h3>
CMake file:&nbsp;<i>CMakeLists.txt</i></h3>
This file is a script of the build process. As the project is both meta-built (i.e. configured) and then built with the command <span style="font-family: Courier New, Courier, monospace;">qibuild</span>, you must wonder why a CMake file is used here rather than, say, another XML file like qiproject.xml. The reason is that CMake and qibuild&nbsp;cooperate, and&nbsp;the command&nbsp;<span style="font-family: Courier New, Courier, monospace;">qibuild configure</span>&nbsp;in fact calls cmake. qiBuild is in part a CMake code generator and a (fairly complex) CMake module, which is why the build file remains a CMake script (CMakeLists.txt), but has to start with the following statements:<br />

<span style="font-family: Courier New, Courier, monospace;">cmake_minimum_required(VERSION 2.8)</span><br />
<span style="font-family: Courier New, Courier, monospace;">project(project)</span><br />
<span style="font-family: 'Courier New', Courier, monospace;">find_package(qibuild)</span><br />

The first statement indicates that CMake version 2.8 or higher is required. The qiBuild library is written for this version of Cmake.&nbsp;The second (project(...)) statement informs CMake of the project name.<br />

Finally, the&nbsp;<span style="font-family: 'Courier New', Courier, monospace;">find_package</span><span style="font-family: inherit;">&nbsp;part tells CMake to load the qibuild module.&nbsp;</span><br />

As this is a CMake file, we should normally be able to directly process it with the meta-build tool CMake, like so: <span style="font-family: Courier New, Courier, monospace;">cmake CMakeLists.txt</span><span style="font-family: inherit;">. This should roughly perform like </span><span style="font-family: Courier New, Courier, monospace;">qibuild configure</span><span style="font-family: inherit;">. B</span>ut it doesn't work, we get the following message: <i>Could not find module Findqibuild.cmake or a configuration file for package qibuild.</i>&nbsp;That's because we also need to inform CMake of the path to the qibuild module in our ~/nao/devtools folder: &nbsp;<span style="font-family: Courier New, Courier, monospace;">cmake -Dqibuild_DIR=~/nao/devtools/qibuild/cmake/qibuild/ CMakeLists.txt</span><span style="font-family: inherit;">. This now should work, and the screen output should be similar to that of&nbsp;</span><span style="font-family: inherit;">&nbsp;</span><span style="font-family: Courier New, Courier, monospace;">qibuild configure</span><span style="font-family: inherit;">. The disk output is different, though, in that using the </span><span style="font-family: Courier New, Courier, monospace;">qibuild configure</span><span style="font-family: inherit;"> command result in all build files in one neat folder named after your toolchain, while using directly </span><span style="font-family: Courier New, Courier, monospace;">cmake</span><span style="font-family: inherit;"> without further options results in a mess of build files directly in the project folder. We could need to further refine our command to get something clean like with qiBuild. It's not necessary though, as that's what </span><span style="font-family: Courier New, Courier, monospace;">qibuild configure</span><span style="font-family: inherit;"> does for you: calling </span><span style="font-family: Courier New, Courier, monospace;">cmake</span><span style="font-family: inherit;"> with the right options, and take care of the housekeeping.</span><br />
<span style="font-family: inherit;"><br /></span>
<h3>
The <i>main.cpp</i> and <i>test.cpp</i> file</h3>
Those two files seem pretty simple, as the default main.cpp is a "hello, world", and the provided test.cpp is the "hello world" of C++ unit testing. However, it's good to have a quick look at how these two files are handled by our build tools.<br />

Let's look at the rest of the&nbsp;CMakeLists.txt file:<br />

<span style="font-family: Courier New, Courier, monospace;"># Create a executable named "project"</span><span style="font-family: 'Courier New', Courier, monospace;">&nbsp;with the source file: main.cpp</span><br />
<span style="font-family: Courier New, Courier, monospace;">qi_create_bin(project "main.cpp")</span><br />
<span style="font-family: inherit;"><br /></span>
<span style="font-family: Courier New, Courier, monospace;"># Add a simple test:</span><br />
<span style="font-family: Courier New, Courier, monospace;">enable_testing()</span><br />
<span style="font-family: Courier New, Courier, monospace;">qi_create_test(test_project "test.cpp")</span><br />
<div>
<br /></div>
<div>
The&nbsp;<span style="font-family: 'Courier New', Courier, monospace;">qi_create_bin(project main.cpp)</span>&nbsp;command instructs CMake that the file main.cpp should be used to create an executable named "project". &nbsp;</div>
<div>
<br /></div>
<div>
<span style="font-family: 'Courier New', Courier, monospace;">enable_testing()</span><span style="font-family: inherit;">&nbsp;is necessary to let you use any testing-related command later.</span></div>
<span style="font-family: inherit;"><br /></span>
<span style="font-family: inherit;">The </span><span style="font-family: Courier New, Courier, monospace;">qi_create_test(test_project "test.cpp")</span><span style="font-family: inherit;">&nbsp;is such a command. It tells that the test.cpp file should be used to make a test binary "test_project."</span><br />
<div>
<br /></div>
<div>
A test is successful if it returns 0. You run all tests with:</div>
<div>
<br /></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">qibuild test</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: inherit;">The test results are printed and also stored in the&nbsp;</span>build-tests/results folder.</div>
<div>
<br /></div>
<div>
You can call qiBuild commands from anywhere in the workspace by specifying the project name. For instance, calling&nbsp;<span style="font-family: 'Courier New', Courier, monospace;">qibuild configure helloworld</span>&nbsp;from the ~/nao/workspace/project directory works as expected: it configures the helloworld project in&nbsp;~/nao/workspace/helloworld. Calling&nbsp;&nbsp;<span style="font-family: 'Courier New', Courier, monospace;">qibuild configure</span><span style="font-family: inherit;">&nbsp;without specifying a project name will configure the project that corresponds to the working directory.</span></div>
<div>
<span style="font-family: inherit;"><br /></span></div>
<div>
<span style="font-family: inherit;">Now, let's make a real project that runs against NAO and does something useful.&nbsp;</span><br />
<span style="font-family: inherit;"><br /></span></div>
<h2>
A real project that actually does something</h2>
<div>
We will make a C++ module that uses the <a href="http://www.aldebaran-robotics.com/documentation/family/robots/inertial_robot.html" target="_blank">inertial unit</a> to plot the displacement on the center of gravity of the robot while he stands.<br />

<span style="font-family: Courier New, Courier, monospace;">qibuild create inertial_monitor</span><br />

Let's make a first version that runs on the computer and prints the displacement every second.<br />

The doc indicates us that the body inclination angles are available in the naoqi sensors database (<span style="font-family: Courier New, Courier, monospace;">ALMemory</span>) under the keys <span style="font-family: inherit;">"</span><span style="font-family: Courier New, Courier, monospace;">Device/SubDeviceList/InertialSensor/Angle<i>[X|Y]</i>/Sensor/Value</span><span style="font-family: inherit;">"</span>. Raw gyro and accelerometer data are also available, but for now, let's rely on the angle computed by naoqi.<br />

There are several ways to access data in <span style="font-family: Courier New, Courier, monospace;">ALMemory</span>.<br />
<span style="font-family: Courier New, Courier, monospace;">ALMemoryProxy::getData(key)</span> is the safest, but slowest. Returns an <span style="font-family: Courier New, Courier, monospace;">ALValue</span>.<br />
<span style="font-family: Courier New, Courier, monospace;">ALMemoryProxy::getDataPtr(key)</span> returns a pointer to the data, so it can be accessed later too. Return a void*, to be cast to the appropriate 32 bit type. As it's a pointer, it only makes sense for local modules.<br />
<span style="font-family: Courier New, Courier, monospace;">ALMemoryProxy::getDataOnChange(key)</span> will block until the value changes, then returns it as <span style="font-family: Courier New, Courier, monospace;">ALValue</span>.<br />

That means that somewhere in our main.cpp, we need to get a proxy to <span style="font-family: Courier New, Courier, monospace;">ALMemory</span>:<br />


{% highlight c++ %}
boost::shared_ptr<ALMemoryProxy> memoryProxy;  
try {  
memoryProxy = boost::shared_ptr<ALMemoryProxy>(new ALMemoryProxy(broker));  
} catch (const ALError& e) {  
  std::cerr << "Could not create proxy: " << e.what() << std::endl;  
  return 3;  
} 
{% endhighlight %}


<br />
Let's say that we define this to make the code more readable:<br />

{% highlight c++ %}
const std::string intertialSensorXKey("Device/SubDeviceList/InertialSensor/AngleX/Sensor/Value"),  
                  intertialSensorYKey("Device/SubDeviceList/InertialSensor/AngleY/Sensor/Value"); 
{% endhighlight %}

<br />
Then, our data gathering code could look like this:<br />

{% highlight c++ %}
float *intertialSensorX = static_cast<float*>(memoryProxy->getDataPtr(intertialSensorXKey));  
float *intertialSensorY = static_cast<float*>(memoryProxy->getDataPtr(intertialSensorYKey));  
while (true) {  
  std::cout << "X: " << *intertialSensorX << ", Y: " << *intertialSensorY << std::endl;  
  boost::this_thread::sleep(boost::posix_time::seconds(1));  
}  
{% endhighlight %}

<br />
Or it could also look like that:<br />

{% highlight c++ %}
while (true) {  
  std::cout << "X: " << memoryProxy->getData(intertialSensorXKey) << ", Y: " << memoryProxy->getData(intertialSensorXKey) << std::endl;  
  boost::this_thread::sleep(boost::posix_time::seconds(1));  
} 
{% endhighlight %}


That should be enough to get what we want. With that, let's first to make that a program that connects from the computer to the robot, and then make it a module that runs on NAO itself.<br />

Note that in the following code, a lot of code is added compared to above:<br />

<ul>
<li>Code to handle the command-line arguments, that I've chosen to put in a separate function called <span style="font-family: Courier New, Courier, monospace;">parseOpt</span>, for clarity. The IP of the robot and the port where to contact the robot's broker (naoqi) must be given wight he options <span style="font-family: Courier New, Courier, monospace;">--pip</span> and <span style="font-family: Courier New, Courier, monospace;">--pport</span>, respectively, as the robot runs on a different computer. If those options are not given, then the default is <span style="font-family: Courier New, Courier, monospace;">--pip nao.local --pport 9559</span>. It might work, in particular if the robot's name was never changed from "nao".</li>
<li>Code to make a local broker and connect it to NAO's remote one, all grouped in the function <span style="font-family: Courier New, Courier, monospace;">makeLocalBroker</span>, to make it clearer for you.</li>
</ul>

<h3>
main.cpp</h3>

{% highlight c++ %}
#include <iostream> // output, etc  
#include <boost/program_options.hpp> // a clean way to process command-line arguments  
#include <boost/shared_ptr.hpp> // Good practice to use C++ facilities in C++.  
#include <boost/thread/thread.hpp> // To use Boost's sleep. There are others, but Boost is a good portable library.  
#include <alcommon/albroker.h> // To handle Naoqi brokers (the local one and the one on NAO)  
#include <alcommon/albrokermanager.h> // same  
#include <alerror/alerror.h> // To catch and process Aldebaran's exceptions  
#include <alproxies/almemoryproxy.h> // To access ALMemory.  
  
void parseOpt(std::string* naoBrokerIP, int* naoBrokerPort, int argc, char* argv[]) {  
  namespace po = boost::program_options; // shorter to write po than boost::program_options  
  po::options_description desc("Allowed options");  
  desc.add_options()  
      ("pip", po::value<std::string>(naoBrokerIP)->default_value("nao.local"), "IP of the parent broker. Default: nao.local")  
      ("pport", po::value<int>(naoBrokerPort)->default_value(9559), "Port of the parent broker. Default: 9559");  
  po::variables_map vm; // Map containing all the options with their values  
  // program option library throws all kind of errors, we just catch them all, print usage and exit  
  try {  
    po::store(po::parse_command_line(argc, argv, desc), vm);  
    po::notify(vm);  
  } catch(po::error &e) {  
    std::cerr << e.what() << std::endl;  
    std::cout << desc << std::endl;  
    exit(1);  
  }  
}  
  
boost::shared_ptr<AL::ALBroker> makeLocalBroker(const std::string parentBrokerIP, int parentBrokerPort) {  
  // Name, IP and port of our local broker that talks to NAO's broker:  
  const std::string brokerName = "localbroker";  
  int brokerPort = 54000;   // FIXME: would be a good idea to look for a free port first  
  const std::string brokerIp   = "0.0.0.0";  // listen to anything  
  try {  
    boost::shared_ptr<AL::ALBroker> broker = AL::ALBroker::createBroker(  
        brokerName,  
        brokerIp,  
        brokerPort,  
        parentBrokerIP,  
        parentBrokerPort,  
        0    // you can pass various options for the broker creation, but default is fine  
      );  
    // ALBrokerManager is a singleton class (only one instance).  
    AL::ALBrokerManager::setInstance(broker->fBrokerManager.lock());  
    AL::ALBrokerManager::getInstance()->addBroker(broker);  
    return broker;  
  } catch(const AL::ALError& /* e */) {  
    std::cerr << "Faild to connect broker to: " << parentBrokerIP << ":" << parentBrokerPort  
              << std::endl;  
    AL::ALBrokerManager::getInstance()->killAllBroker();  
    AL::ALBrokerManager::kill();  
    exit(2);  
  }  
}  
  
int main(int argc, char* argv[]) {  
  boost::shared_ptr<AL::ALBroker> broker;  
  boost::shared_ptr<AL::ALMemoryProxy> memoryProxy;  
  
  std::string parentBrokerIP;  
  int parentBrokerPort;  
  setlocale(LC_NUMERIC, "C"); // Need this to for SOAP serialization of floats to work  
  // IP and port of the broker currently running on NAO:  
  parseOpt(&parentBrokerIP, &parentBrokerPort, argc, argv);  
  // Our own broker, connected to NAO's:  
  broker = makeLocalBroker(parentBrokerIP, parentBrokerPort);  
  
  try {  
    memoryProxy = boost::shared_ptr<AL::ALMemoryProxy>(new AL::ALMemoryProxy(broker));  
  } catch (const AL::ALError& e) {  
    std::cerr << "Could not create proxy: " << e.what() << std::endl;  
    return 3;  
  }  
  
  const std::string intertialSensorXKey("Device/SubDeviceList/InertialSensor/AngleX/Sensor/Value"),  
      intertialSensorYKey("Device/SubDeviceList/InertialSensor/AngleY/Sensor/Value");  
  
  while (true) {  
    std::cout << "X: " << memoryProxy->getData(intertialSensorXKey) << ", Y: "  
              << memoryProxy->getData(intertialSensorYKey) << std::endl;  
    boost::this_thread::sleep(boost::posix_time::seconds(1));  
  }  
  
 return 0;  
}  
{% endhighlight %}


<br />
Note that if we tried to use <span style="font-family: Courier New, Courier, monospace;">memoryProxy-&gt;getDataPtr</span> in the that code instead of <span style="font-family: Courier New, Courier, monospace;">memoryProxy-&gt;getData</span>, it would compile, but would throw an exception at runtime (as expected) with the pretty explicit error message "ALMemory::getDataPtr Cannot be called remotely".<br />

The CMakeLists file is very simple.<br />

<h3>
CMakeLists.txt</h3>
<div class="highlight"><pre><code>cmake_minimum_required(VERSION 2.8)
project(inertial_monitor)
find_package(qibuild)

qi_create_bin(inertial_monitor main.cpp)
qi_use_lib(inertial_monitor ALCOMMON BOOST BOOST_PROGRAM_OPTIONS)</code></pre></div>
<h3>
Configure and compile the project for your computer:</h3>
(To make the program that runs on the computer, we need a toolchain for compilation for the computer's architecture, not for NAO. This toolchain is located directly in the SDK folder ~/nao/devtools/naoqi-sdk-1.14.2-linux??. As we saw in Part 1, to make this toolchain available to qibuild, you can add it like that (here, giving it the name "local"): <span style="font-family: Courier New, Courier, monospace;">qitoolchain create local ~/nao/devtools/naoqi-sdk-1.14.2-linux??/toolchain.xml</span>)<br />

<span style="font-family: Courier New, Courier, monospace;">qibuild configure -c local inertial_monitor</span><br />
<span style="font-family: Courier New, Courier, monospace;">qibuild make -c local inertial_monitor</span><br />

<h3>
Call the program from your computer, for instance:&nbsp;</h3>
<span style="font-family: Courier New, Courier, monospace;">cd ~/nao/workspace/inertial_monitor</span><br />
<span style="font-family: Courier New, Courier, monospace;">build-local/sdk/bin/inertial_monitor --pip 192.168.1.11 --pport 9559</span><br />
<br />

It should display a list (X, Y) of values. Here, I run it with NAO standing, and make NAO lie on its belly:<br /><br />

<span style="font-family: Courier New, Courier, monospace;">build-local/sdk/bin/inertial_monitor --pip 192.168.2.3 --pport 9559</span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>[INFO ] Starting ALNetwork</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>[INFO ] localbroker is listening on 192.168.2.2:54000</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.0218986, Y: 0.99</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.0157626, Y: 1.01435</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.016146, Y: 1.01224</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.00885946, Y: 1.0086</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.0111607, Y: 1.00745</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: 0.0051381, Y: 1.00898</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.0148037, Y: 1.02145</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.0238159, Y: 1.01665</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.0155709, Y: 1.03161</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: 0.122871, Y: 0.231638</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.000231091, Y: 0.125218</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.0209397, Y: 0.110645</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: 0.022587, Y: 0.142667</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.0596727, Y: -0.0828282</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.0107773, Y: 0.0784314</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.112403, Y: -0.0853206</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.0483597, Y: 0.0257009</i></span><br />
<span style="font-family: Courier New, Courier, monospace;"><i>X: -0.00962669, Y: 0.075939</i></span><br />

<br />
You can stop it with Ctrl-C.<br /><br />

Note the change in Y value in the middle of that list. In general, we note also that the values are not very stable. Here, I'm sitting on a bed with NAO next to me, so the inertial sensor values vary more, but even on a flat and stable ground, they might vary a bit when NAO is immobile.<br /><br />

In the next part, we will transform that program into a module that runs directly on NAO.<br /><br />
</div>
