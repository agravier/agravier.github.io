---
layout: post
title: "Using CMAC and RL for dynamic balancing of a humanoid robot (AI Grant submission)"
disqus: true
mathjax: true
---

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Kqsx2f8xfls?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

In this post, I introduce my AI grant submission for Spring 2018.

It has been a few years since I have done research in AI or robotics. I am 
still partial to embodiment, and I have been learning about different 
reinforcement learning approaches with the help of Barto and Sutton's book. 
I hope publish some code and notes eventually.

Although I've been wanting to get back to try out new cognitive architectures 
and control ideas, I have not had the resources. I still have Kirikou, my NAO 
humanoid, although his battery won't let him stay on. But I don't have the GPU 
power for many of the experiments I'm thinking about trying. My attempt at 
building a machine for DL failed, the system remains unstable.

The AI Grant should fix that by providing a lot of cloud computing budget, which 
I will have to hook up with the simulator. I will also try again to create a GPU
machine for local experiments with Kirikou, and will try to get a new battery as
well as the version 5 of the NAO head.

I know that the plan will certainly not survive contact with the enemy, but here
it is for now: make use of CMAC in a RL setting, to learn self-balancing in an
actual physical robot in various settings (when standing and pushed, when 
standing on unstable ground, and eventually while walking). I have not fully 
explored prior works, but I know that Sutton used CMAC-like tile coding with 
Sarsa in [RLAI] to address the mountain car problem. However, the montain car 
problem is a toy problem. Instead, I would like to explore several CMAC variants
and RL algos to solve the more complicated problems of active dynamic 
balancing of a NAO robot in various settings.

## Update (2018-05-10)

I didn't get the grant; I'll take this as a sign that the interest of that 
community in this project is rather low. I was looking forward to working with
fellows from the "distributed lab" described on the AI Grant website, too bad.

I'll sell the hardware and do something else instead, probably not AI research 
until I find an affordable way to access lots of compute power.

