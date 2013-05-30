---
layout: post
title: 'NAO Linux C++ development cheat sheet / tutorial, Part 1: better NAO than never'
---

<h3>Preamble to this whole series of tutorial posts</h3>

I'd like to thank <b>Jane Sun</b> and <b>Dimitri Merejkowsky</b> for help and feedback.<br />

These posts start slow, but they get more technical later. The first part (which you've started reading) explains how to set up the C++ development environment for NAO under GNU/Linux. The <a href="http://noelusion.com/2013/NAO-C++-tutorial-part-2:-Welcome-to-the-Matrix,-NAO/" target="_blank">second post</a> gently introduces the build tools and a simple module. Starting from the <a href="http://noelusion.com/2013/NAO-C++-tutorial-part-3:The-Apprentice-NAOmancer/" target="_blank">third post</a>, I discuss some more detailed aspects of C++ programming, and the code gets too large to be entirely pasted and explained in a blog post, and needs to be hosted <a href="https://bitbucket.org/agravier/inmon" target="_blank">elsewhere</a>. Post 4 is still being written, but I will naturally need to make an even more drastic selection of what to explain and what to leave as an exploratory exercise for you, adventurous reader. Generally, I advise side-reading a lot of documentation(Aldebaran doc, Boost doc, C++ FAQ Lite, etc), other tutorials, and experimenting by yourself.<br />

I assume development for NAOqi 1.14.2 on a linux host, with a robot at IP 192.168.1.11 (or something like that, it may vary a bit); adapt the examples to your own configuration. When examples depend on the Linux distribution, I give examples for both Ubuntu 12.04 LTS, which Jane is using, and Archlinux, which I use.<br />

I assume that you are logged in Linux with the account that you want to use to develop, and that this user has the rights to at least install new software (on Ubuntu, that means that typing <span style="font-family: Courier New, Courier, monospace;">sudo apt-get</span> should not tell you "operation not permitted").<br />

You also need a minimal knowledge of the command line: know where you are (pwd) and where your files are, navigate to a directory (cd), create a directory (mkdir). I'll take you from there :).<br />
</div>
<h2>
Know the tools</h2>
<div>
<b>NAOqi</b> is a program that runs on the robot (it can also run on the computer and communicate with naoqi on the robot, but let's forget about that for now). It manages the loading of modules, communication between modules, and acts as the higher-level interface with the hardware.</div>
<div>
<br /></div>
<div>
<b>qiBuild</b> is a program that runs on the development computer. It's the most important build tool for NAO developers: you use it to configure a project, compile it and deploy it on the robot.</div>
<div>
<br /></div>
<div>
Qibuild can configure projects for various robots (Atom or Geode NAO) or to run on a separate computer. For that, it uses <b>CMake</b>, wich is a cross-platform and multi-platform meta-build tool. </div>
<div>
<br /></div>
<div>
You need to give qibuild a <b>toolchain</b> name to let it know which set of tools to use to build your project. You typically will have a toolchain that contains a compiler and a linker configured for the architecture of your robot (Linux on 32 bit Intel Atom or AMD Geode).<br />

We will also deal a little with common Unix tools like <b>bash</b>, <b>ssh</b>, <b>scp</b>...<br />

Now I'll explain all this in more details.<br />
</div>
<h2>
Toolchain and environment setup</h2>
<div>
First, install some necessary stuff (some of it might already be installed):<br />
<h3>
GCC, CMake</h3>
Ubuntu:<br />
<span style="font-family: Courier New, Courier, monospace;">sudo apt-get install gcc cmake</span><br />
Archlinux:<br />
<span style="font-family: Courier New, Courier, monospace;">sudo pacman -S gcc cmake</span><br />
<h3>
Python 2</h3>
Ubuntu:<br />
<span style="font-family: Courier New, Courier, monospace;">sudo apt-get install python</span><br />
Archlinux:<br />
<span style="font-family: Courier New, Courier, monospace;">sudo pacman -S python2</span><br />
<h3>
The rest</h3>
You may also want to install <b>QT Creator</b> as it's the IDE recommended by Aldebaran (the recommended way is to use <a href="http://qt-project.org/downloads#qt-creator" target="_blank">the installer</a> available on the Qt website, or if you can't, you can use the older version from the Ubuntu repositories with <span style="font-family: 'Courier New', Courier, monospace;">sudo apt-get install qtcreator</span><span style="font-family: inherit;"> on Ubuntu.).</span><br />

Then, you have to download the following files from the Aldebaran website (<a href="https://developer.aldebaran-robotics.com/resources/" target="_blank">here</a> with a developer account):<br />
<ul>
<li><b>NAOQI C++ SDK 1.14.2</b> for the architecture of your Linux development machine (32 bits or 64 bits). If you don't know if your kernel is 32 or 64 bit, type <span style="font-family: Courier New, Courier, monospace;">uname -m</span> at the command line. If it replies with x86_64, you are using a 64 bit Linux. If it replies x86, 32 bit. If something else, you're kinda stuck as Aldebaran does not provide toolchains for other architectures.</li>
<ul>
<li><b>If your architecture is 64 bits</b>, you may need to install some extra libraries for the cross-compilation to work (Dimitri from Aldebaran tells me that you no more need that, but it can't hurt). </li>
<ul>
<li>On Ubuntu, from the command-line, you can write:<br /><span style="font-family: Courier New, Courier, monospace;">sudo apt-get install gcc-multilib libc6-dev libc6-i386</span></li>
<li><span style="font-family: inherit;">On Archlinux: </span><span style="font-family: Courier New, Courier, monospace;">sudo pacman -S gcc-libs-multilib</span></li>
</ul>
</ul>
<li><b>NAOQI C++ Cross Toolchain 1.14.2 Linux 32 bits</b> for your NAO (either NAO 3 (Geode) or NAO 4 (Atom))</li>
<li><b>qiBuild </b>-- There is only one choice here, but actually it's maybe not the best one :). You're better off with the development version of qiBuild that's on Github, because the one on the Aldebaran website has happened to be two years old and lack features, by the past.</li>
<ul>
<li>To get the latest development version of qibuild, there are several ways:</li>
<ul>
<li>(<b>prefered method</b>) install git (Ubuntu: <span style="font-family: Courier New, Courier, monospace;">sudo apt-get install git</span>) and run:<br /><span style="font-family: Courier New, Courier, monospace;">cd ~/nao/devtools</span><span style="font-family: 'Courier New', Courier, monospace;">git clone git://github.com/aldebaran/qibuild.git</span></li>
<li>(<b>less good</b> because keeping qibuild up to date is more difficult that way) download the <a href="https://github.com/aldebaran/qibuild/archive/master.zip" target="_blank">zip file</a> and unzip it in <span style="font-family: 'Courier New', Courier, monospace;">~/nao/devtools</span></li>
<li><span style="font-family: Times, Times New Roman, serif;">Archlinux users, there is an AUR package, if you prefer.</span></li>
</ul>
</ul>
</ul>
<div>
Then extract these files in convenient locations. You can often do that with graphical tools, otherwise, do the following on the command line:</div>
<div>
<ul>
<li>If you have not already made one, you should create a directory for your NAO stuff: </li>
<ul>
<li><span style="font-family: Courier New, Courier, monospace;">mkdir -p ~/nao/{devtools,workspace}</span></li>
</ul>
<li>Navigate to you downloads folder, e.g. </li>
<ul>
<li><span style="font-family: Courier New, Courier, monospace;">cd ~/Downloads</span></li>
</ul>
<li><span style="font-family: inherit;">Extract all the development tools that we just downloaded, for instance in ~/nao/devtools: </span></li>
<ul>
<li><span style="font-family: inherit;">if you have downloaded the zip archive of qibuild, </span><span style="font-family: Courier New, Courier, monospace;">unzip master.zip -d ~/nao/devtools</span></li>
<li><span style="font-family: Courier New, Courier, monospace;">tar xzf naoqi-sdk-1.14.2-linux??.tar.gz -C </span><span style="font-family: 'Courier New', Courier, monospace;">~/nao/devtools</span></li>
<li><span style="font-family: Courier New, Courier, monospace;">tar xzf linux??-nao-atom-cross-toolchain-1.14.2.tar.gz -C ~/nao/devtools</span></li>
</ul>
<li>Install qiBuild (Ubuntu instructions):</li>
<ul>
<li><span style="font-family: Courier New, Courier, monospace;">mkdir -p ~/.local/bin</span></li>
<li><span style="font-family: inherit;"><span style="font-family: inherit;">We need to add that directory to the $PATH environment variable, as the qiBuild binaries will be installed there. We first record that in the profile file, that is loaded at each login: </span></span><span style="font-family: Courier New, Courier, monospace;">echo "export PATH=\$PATH:$HOME/.local/bin" &gt;&gt; ~/.profile</span></li>
<ul>
<li><span style="font-family: inherit;">Now, to get the effect of that for the current login session, you can log out and in again. You can also just type </span><span style="font-family: 'Courier New', Courier, monospace;">export PATH=$PATH:$HOME/.local/bin</span><span style="font-family: inherit;"> in your command line to get the same effect for that terminal only</span></li>
</ul>
<li><span style="font-family: Courier New, Courier, monospace;">cd ~/nao/devtools/qibuild</span></li>
<li><span style="font-family: Courier New, Courier, monospace;">./install-qibuild.sh</span></li>
<li><span style="font-family: inherit;">Now, try typing </span><span style="font-family: Courier New, Courier, monospace;">qibuild</span><span style="font-family: inherit;">. If bash responds with </span><i>qibuild: command not found</i>, then there is a problem: either qibuild did not install to ~/.local/bin (ls ~/.local/bin), or ~/.local/bin is not on $PATH (echo $PATH).</li>
</ul>
<li>For Archlinux only (and only if you are not using qiBuild 2 from the github repo): use sed to replace all instances of " python " by " python2 " in ~/.local/bin: <span style="font-family: Courier New, Courier, monospace;">find ~/.local/bin/q* -type f -exec sed -i 's/python /python2 /g' {} \;</span></li>
<li>Configure qibuild:</li>
<ul>
<li><span style="font-family: Courier New, Courier, monospace;">cd; qibuild config --wizard</span></li>
<li><span style="font-family: inherit;">You should normally choose: <br />- Unix Makefiles, <br />- QT Creator, followed by y</span></li>
</ul>
</ul>
<div>
That should be it, basic stuff is now installed. Time to configure that toolchain we just downloaded.<br />
</div>
</div>
</div>
<h3>
qiBuild toolchain and workspace preparation</h3>
<div>
<span style="font-family: 'Courier New', Courier, monospace;">cd ~/nao/devtools</span></div>
<div>
<span style="font-family: 'Courier New', Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: inherit;">Now, let's say we have two robots, one with an Atom head and one Geode head. We have dowloaded and extracted both </span>linux64-nao-atom-cross-toolchain-1.14.2 and linux64-nao-geode-cross-toolchain-1.14.2 in ~/nao/devtools. We want to make both toolchains available to qibuild. That would be those two lines:</div>
<div>
<br /></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">qitoolchain create atom ~/nao/devtools/linux??-nao-atom-cross-toolchain-1.14.2</span><span style="font-family: 'Courier New', Courier, monospace;">/toolchain.xml</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">qitoolchain create geode ~/nao/devtools/linux??-nao-geode-cross-toolchain-1.14.2</span><span style="font-family: 'Courier New', Courier, monospace;">/toolchain.xml</span></div>
<div>
<span style="font-family: inherit;"><br /></span></div>
<div>
<span style="font-family: inherit;">Add --default to one of the above commands to make that toolchain the default one.</span></div>
<div>
<span style="font-family: inherit;"><br /></span></div>
<div>
Here, we are giving each chain a short name that is easier to remember: "atom" and "geode". You can change those names, delete toolchains, and so on using the qitoolchain program (<span style="font-family: Courier New, Courier, monospace;">qitoolchain --help</span>). For instance:</div>
<div>
<br /></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">qitoolchain list</span> # lists all toolchains</div>
<div>
<div>
<span style="font-family: Courier New, Courier, monospace;">qitoolchain info atom</span> # more info about the toolchain with nickname atom</div>
</div>
<div>
<div>
<span style="font-family: Courier New, Courier, monospace;">qitoolchain remove geode</span> # deletes the toolchain with nickname geode</div>
</div>
<div>
<br /></div>
<div>
With toolchains setup, we now only need to make a <b>workspace</b>. It's a directory that contains several projects. It contains some configuration information for all these projects too, in a folder called ".qi".</div>
<div>
<br /></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">mkdir ~/nao/workspace</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">cd ~/nao/workspace</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">qibuild init --config atom</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
The last command makes that ".qi" folder, so ~/nao/workspace is now a qiBuild workspace. You can see that the folder is now a qiBuild workspace by typing <span style="font-family: Courier New, Courier, monospace;">ls -a</span><span style="font-family: inherit;">, which reveals the .qi folder. </span>The --config atom part is optional, it just makes the "atom" toolchain the default one.</div>
<div>
<br /></div>
<div>
Done! Now, let's copy a sample project from the SDK folder into our workspace to test it out:</div>
<div>
<span style="font-family: Courier New, Courier, monospace;">cp -R ~/nao/devtools/naoqi-sdk-1.14.2</span><span style="font-family: 'Courier New', Courier, monospace;">-linux??/doc/examples/core/helloworld ~/nao/workspace</span></div>
<div>
<br />
<span style="font-family: 'Courier New', Courier, monospace;">cd </span><span style="font-family: 'Courier New', Courier, monospace;">~/nao/workspace/</span><span style="font-family: 'Courier New', Courier, monospace;">helloword</span><br />
<span style="font-family: 'Courier New', Courier, monospace;">qisrc add .</span><br />
<span style="font-family: 'Courier New', Courier, monospace;"><br /></span>
</div>
<div>
<span style="font-family: inherit;">We try to configure and compile it for our Atom head NAO:</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">qibuild configure -c atom</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;">qibuild make -c atom</span></div>
<div>
<span style="font-family: Courier New, Courier, monospace;"><br /></span></div>
<div>
<span style="font-family: inherit;">No error? Good. </span><br />
<span style="font-family: inherit;"><br /></span>
<span style="font-family: inherit;">In the [next part]("http://noelusion.com/2013/NAO-C++-tutorial-part-2:-Welcome-to-the-Matrix,-NAO/"), we'll do our own C++ module that runs on the robot :D</span><br />
<span style="font-family: inherit;"><br /></span></div>
<div style='clear: both;'></div>
</div>
