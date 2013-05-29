---
layout: default
title: Lecture notes in Computational Neuroscience (Week 6)
---

## Networks of neurons

### Modeling synapses

#### Modifying the HH model

We want to model the effect of a chemical synapse on the membrane potential.

Q: How do you think we can form a computational model of the effects of inputs on the neuron's electrical potential V?

In the RC circuit model of the membrane, with an input current per unit area A and total input current \\(I\_e\\), specific membrane resistance \\(r\_m\\), specific membrane capacitance \\(c\_m\\), total membrane resistance \\(R\_m\\), total membrane capacitance \\(C\_m\\), membrane voltage \\(V\\), Voltage at rest \\(E\_L\\), membrane time constant \\(\tau\_m = r\_mc\_m = R\_mC\_m\\), we have

\\[
c\_m\frac{\textrm{d}V}{\textrm{d}t} = -\frac{V-E\_L}{r\_m}+\frac{I\_e}{A}
\\]

equivalent to

\\[
\tau\_m\frac{\textrm{d}V}{\textrm{d}t} = -(V-E\_L)+I\_eR\_m
\\]

Q: What is the effect of τm, the "membrane time constant", on how fast the cell's voltage changes in response to an input?

- **As τm increases, it takes longer for the cell to reach steady state when an input is turned on, and longer to decrease to equilibrium when it is turned off.**
- As τm increases, it takes longer for the cell to reach steady state when an input is turned on, but falls back to equilibrium state more quickly. 
- As τm decreases, it takes longer for the cell to reach steady state when an input is turned on, and longer to decrease to equilibrium when it is turned off. 
- As τm decreases, it takes longer for the cell to reach steady state when an input is turned on, but falls back to equilibrium state more quickly.

Explanation: If you divide both sides of the membrane potential equation by τm, you can see that if the time constant increases, the terms on the right hand side governing the rate of change of voltage decrease.

Q: One more question before we proceed... Going back to the mathematical definition of τm, what then can we say is the relationship between the cell's surface area and how fast the cell reacts to an input?

- As surface area increases, the cell reaches steady state or equilibrium state more quickly.
- As surface area increases, the cell reaches steady state or equilibrium state more slowly.
- As surface area increases, the cell reaches steady state more quickly, but takes longer to fall back to equilibrium.
- **The cell's surface area does not affect how fast it reacts.**

Explanation: τm=RmCm=rm/A∗cmA=rmcm, so the surface area does not affect the time constant (which determines how fast the cell reacts)!

In the passive HH model (\\(-C\_m \frac{\textrm{d}V}{\textrm{d}t} = g\_L\left(V-E\_L\right) + \overline{g}\_Kn^ 4\left(V-E\_K\right) + \overline{g}\_\textrm{Na}m^ 3h\left(V-E\_\textrm{Na}\right) - I\_e\\)), the passive membrane channels are modeled by \\(\ldots + \overline{g}\_Kn^ 4\left(V-E\_K\right) + \overline{g}\_\textrm{Na}m^ 3h\left(V-E\_\textrm{Na}\right)\\).

Similarly, an active ion channel s with equilibrium potential \\(E\_s\\) is modeled by \\(g\_s(V-E\_s)r\_m\\) where the synaptic conductance \\(g\_s\\) is function of inputs received by the synapse:

\\[
g\_s = \overline{g}\_sP\_\textrm{rel}P\_s
\\]

where \\(\overline{g}\_s\\) is the maximum conductance, \\(P\_\textrm{rel}\\) is the probability that the transmitter is released given that an input spike happens and \\(P\_s\\) is the probability that post-synaptic channels are open given that NT have been released in the synaptic cleft (fraction of channels open).

Assuming  \\(P\_\textrm{rel} = 1\\), the effect of a spike on \\(P\_s\\) is modeled by the following **kinetic model**:

\\[\frac{\textrm{d}P\_s}{\textrm{d}t} = \alpha\_s(1-P\_s)-\beta\_sP\_s\\]

In English: the fraction of channels open equals the opening rate times the fraction of channels closed minus the closing rate times the fraction of channels open.

#### The effect of one spike on synaptic conductance

Q: What is the value of Ps at equilibrium? That is, what is the value of Ps such that dPs/dt is 0?

- αs/(βs−αs) 
- **αs/(αs+βs)**
- αs(1−Ps)/βs
- None of these

In recorded data, \\(\frac{P\_s}{P\_\textrm{max}}\\) as a function of time after a spike is reasonably modeled by:

- an exponential function for GABA(A) and AMPA synapses: \\(K(t) = e^ {-\frac{t}{\tau\_s}}\\),
- an alpha function for NMDA synapses: \\(\alpha(t) = \frac{t}{\tau\_\textrm{peak}}e^ {1-\frac{t}{\tau\_peak}}\\)


#### The effect of several spike on synaptic conductance: the linear filter model of a synapse

Modeling the input spike train to synapse b as a sum of Dirac delta functions: \\( \rho\_b(t) = \sum\_{i=0}^ {n}\delta(t-t\_i) \\)

We can apply the expression of \\(P\_s(t)\\) as filter to the input spike train. For instance, an AMPA synapse with filter \\(K(t)\\), the synaptic conductance changes as:

\\[
g\_b(t) = \overline{g}\_{b}\sum\_{t\_i\lt t}K(t-t\_i)
\\]

or, in the continuous case:

\\[
g\_b(t) = \overline{g}\_b\int\_{-\infty}^ tK(t-\tau)\rho\_b(\tau)\textrm{d}t
\\]

Graphically, it looks like we are stacking the graph of K each time a spike arrives.

#### Synapses in action in a minimal network model of two IaF neurons

Each neuron is connected to the other via a synapse s, and receives a constant input current \\(I\_e\\). Each neuron's equation is:

\\[
\tau\_m\frac{\textrm{d}V}{\textrm{d}t} = -\left( \left(V-E\_L\right)-g\_s \left(t\right)\left(V-E\_x\right)r\_m  \right)+I\_eR\_m
\\]
 
And synapses are modeled by alpha functions: 

\\[
g\_s(t) = \overline{g}\_s\int\_{-\infty}^ t\frac{t}{\tau\_\textrm{peak}}e^ {1-\frac{t}{\tau\_peak}}\rho\_s(\tau)\textrm{d}t
\\]

with \\(E\_L=-70\textrm{ mV}\\), \\(V\_\textrm{threshold}=-54\textrm{ mV}\\),  \\(\tau\_m=20\textrm{ ms}\\), \\(\tau\_\textrm{peak}=10\textrm{ ms}\\), \\(I\_eR\_m=25\textrm{ mV}\\)

When \\(E\_s=0\textrm{ mV}\\) (excitatory synapses), the neurons fire in alternation.

When \\(E\_s=-80\textrm{ mV}\\) (inhibitory synapses), the neurons fire in synchrony.

### From spiking networks to rate-coded networks




Simulations with spiking neurons can reveal synchrony and correlation, and spike timing effects. However, the computational costs are high.

The option of simulating neurons that use firing-rate outputs lets us scale to larger networks. However, any phenomenon related to spike timing is lost.

The linear filter model of synapses with an input spike train \\( \rho\_b(t) = \sum\_{i=0}^ n\delta(t-t\_i) \\) linearly filtered by \\(K(t) \simeq \frac{P\_s}{P\_{\textrm{max}}}\\) gives a continuous real-valued synaptic conductance  \\(g\_b(t) = \overline{g}\_b\int\_{-\infty}^tK(t-\tau)\rho_b(\tau)\textrm{d}t\\).

For multiple synapses with individual weights \\(w\_1 \ldots w\_N\\) and spike trains \\(\rho\_1 \ldots \rho\_N\\), the total synaptic current of the receiving cell is the sum of individual currents, \\(I\_s(t) = \sum\_{b=1}^ NI\_b(t)\\), so

\\[
I\_s(t) = \sum\_{b=1}^ N w\_b\int\_{-\infty}^tK(t-\tau)\rho\_b(\tau)\textrm{d}
\\]

By approximating the instantaneous firing rate \\(u\_b(t)\\) using the spike train \rho\_b(t), we get a new expression of the input current in function of the firing rates of input neurons:

\\[
I\_s(t) = \sum\_{b=1}^ N w\_b\int\_{-\infty}^tK(t-\tau)u\_b(\tau)\textrm{d}
\\]

Problems:

- synchrony of spike trains
- correlation between \\(u\\)

These problems will most often not sufficiently affect the results, and we ignore them.

### Integrating input current equation to arrive at the kinetic expression of the firing-rate base network model

With an exponential synaptic filter \\(K(t) = e^ {-\frac{t}{\tau\_s}}\\), the differential of the input current equation in time is

\\[
\tau\_s\frac{\textrm{d}I\_s}{\textrm{d}t} = -I\_s+\sum\_bw\_bu\_b
\\]

This gives the following expression of the network dynamics (input current change in vector form and output firing rate change):
:

#### General form of the firing rate based network model 

\\[
\begin{cases}
\tau\_s\frac{\textrm{d}I\_s}{\textrm{d}t} = -I\_s+\textbf{w}\cdot\textbf{u}\\\\
\tau\_r\frac{\textrm{d}v}{\textrm{d}t} = -v + F\left(I\_s(t)\right)
\end{cases}
\\]

The function \\(F\\) is an ad-hoc transformation.

#### The firing rate based network model, neglecting synapse dynamics

If \\(\tau\_s \ll \tau\_r\\), the synaptic input converges quickly, and \\(I\_s=\textbf{w}\cdot\textbf{u}\\), and the network is entirely determined by

\\[
\tau\_r\frac{\textrm{d}v}{\textrm{d}t} = -v + F\left(\textbf{w}\cdot\textbf{u}\right)
\\]

#### The firing rate based network model, neglecting output dynamics

If \\(\tau\_s \gg \tau\_r\\), the output dynamics is negligible compared to the output current, and \\(v = F\left(I\_s(t)\right)\\), and the network is determined by:

\\[
\begin{cases}
 v = F\left(I\_s(t)\right)\\\\
 \tau\_s\frac{\textrm{d}I\_s}{\textrm{d}t} = -I\_s+\textbf{w}\cdot\textbf{u}
\end{cases}
\\]

#### The firing rate based network model with static input (typical ANN case)

If the input is static or approximately so for a long period of time, we can look at the steady state: \\( \frac{\textrm{d}v}{\textrm{d}t} = 0 \\) and \\( \frac{\textrm{d}I\_s}{\textrm{d}t} = 0 \\) giving

\\[
v\_{ss} = F(\textbf{w}\cdot\textbf{u})
\\]

That's how unit output is computed in ANN. \\(F\\) is often a sigmoidal threshold function.


### Multiple output neurons in a feedforward network

We assume that the synapses are sufficiently fast to neglect their dynamics, and use \\(\tau\_r\frac{\textrm{d}v}{\textrm{d}t} = -v + F\left(\textbf{w}\cdot\textbf{u}\right)\\) as equation for a single output.

For multiple output neurons, with \\(W\\) the matrix of all weight vectors so as \\(W\_{ij}\\) is the synaptic weight from unit \\(j\\) to unit \\(i\\) and \\(\textbf{v}\\) the vector of combined outputs of all units, the network equation is:

\\[
\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t} = -\textbf{v} + F\left(W\textbf{u}\right)
\\]

Q: We have officially moved to a higher level of abstraction! When we talked about biophysics last week, we looked at some detailed models of individual neurons. Now we have abstracted away some of those detailed dynamics as we move towards modelling whole networks of neurons. This is a common investigative strategy in the sciences. Why don't we keep all the low-level details when we build large scale models?

- The math may become a lot harder or complicated, making progress difficult. 
- Computational resources limit our ability to fully implement all the low-level details when building a larger system.
- Ease of use - we do not necessarily need all of the low-level details in order to explore the dynamics of higher-level systems such as whole networks.
- **All of these**

### Recurrent networks

In a more general formulation where output unit \\(i\\) can be connected to output unit \\(j\\) with weight \\(m\_{ij}\\),

\\[
\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t} = -\textbf{v} + F\left(W\textbf{u} + M\textbf{v}\right)
\\]

In English: the rate of change of the output \\(\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t}\\) is a function \\(F()\\) of the weighted input from the previous layer \\(W\textbf{u}\\) and the weighted intra-layer feedback \\(M\textbf{v}\\), minus the decay \\(-\textbf{v}\\).

In the special case of feedforward networks, \\(M\\) is the null matrix.

Q: Consider a simple recurrent network with 2 output neurons. Maybe one of them represents the 'fight' impulse, and the other one the 'flight' impulse. The input neurons represent various inputs from the environment. Given the following recurrent weight matrix M, what can we say about the relationship between the fight and flight responses in this particular animal? 

M=[0 −0.5; −0.5 0]

- They tend to balance each other - if one is likely, the other is going to be likely too, leading to "cognitive dissonance." 
- They are disconnected responses from each other - they do not really affect each other; this more resembles a feedforward network.
- **They tend to inhibit each other - as one becomes the more likely response, it suppresses the likelihood of the other.**
- None of the above.

Explanation: Suppose that v contains outputs for the fight impulse in the first element and flight in the second element. When we multiply M by v, we see that higher outputs of the fight response will lead to lower outputs of the flight response, and vice versa. Note: this is not a statement about fight and flight responses in nature in general!

### Linear feedforward network

Given the network model

\\[
\begin{cases}
\textrm{Dynamics: }&\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t} = -\textbf{v} + W\textbf{u}\\\\
\textrm{Steady state: }&\textbf{v}\_{ss} = W\textbf{u}
\end{cases}
\\]

the weight matrix

\\[
W = \begin{bmatrix}
 1 & 0 & 0 & 0 & -1 \\\\
 -1 & 1 & 0 & 0 & 0 \\\\
 0 & -1 & 1 & 0 & 0 \\\\
 0 & 0 & -1 & 1 & 0 \\\\
 0 & 0 & 0 & -1 & 1 \\\\
 1 & 0 & 0 & 0 & -1
\end{bmatrix}
\\]

and the static input vector

\\[
\textbf{u} = \begin{bmatrix}
 1 \\\\
 2 \\\\
 2 \\\\
 2 \\\\
 1 
\end{bmatrix}
\\]

Q: What is \\(\textbf{v}\_{ss}\\)?

\\[
\textbf{v}\_{ss} = \begin{bmatrix}
 0 \\\\
 1 \\\\
 0 \\\\
 0 \\\\
 -1 \\\\
 0
\end{bmatrix}
\\]

Q: What is this network doing?

- **Calculating some sort of derivative or difference, like looking for edges in a picture.**
- Looking for sequences of repeats or similarity, like finding spots of homogenous color in a picture. 
- Suppressing inputs - similar to turning the volume down or darkening an image. 
- None of the above.

Indeed, considering the weight matrix as a set of filters, each of its row calculates the difference between two adjacent input units.

The parallel should be made with the V1 oriented receptive fields (+|-), which perform first-order differentiation: the definition of the derivative of a single-valued real function \\(f\\) of a real scalar \\(\frac{\textrm{d}f}{\textrm{d}x} = \lim\_{h\to 0}\frac{f(x+h)-f(x)}{h}\\) is approximated in the discrete case by the difference \\(f(x+1)-f(x)\\). In our case, \\(W\\) performs that exact operation on \\(\textbf{u}\\). 

It should also be noted that the V1 oriented center-surround receptive fields (+|-|+) perform second-order derivation: \\(\frac{\textrm{d}^ 2f}{\textrm{d}x^ 2} = \lim\_{h\to 0}\frac{f'(x+h)-f'(x)}{h}\\), and the discrete approximation for that, \\(f(x+1)-f(x) - (f(x)-f(x-1)) = f(x+1)-2f(x)+f(x-1)\\), is approximated by the coefficients in the following matrix W:

\\[
W = \begin{bmatrix}
 1 & 0 & 0 & 1 & -2 \\\\
 -2 & 1 & 0 & 0 & 1 \\\\
 1 & -2 & 1 & 0 & 0 \\\\
 0 & 1 & -2 & 1 & 0 \\\\
 0 & 0 & 1 & -2 & 1 \\\\
 1 & 0 & 0 & 1 & -2
\end{bmatrix}
\\]

### Recurrent networks


