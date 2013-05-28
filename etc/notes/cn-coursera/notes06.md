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

In recorded data, \\(\frac{P\_s}{P\_max}\\) as a function of time after a spike is reasonably modeled by:

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

When \\(E\_s=0\textrm{ mV}\\) (excitatory synapses), the neurons fire in synchrony.

### From spiking networks to rate-coded networks


## TBC...

