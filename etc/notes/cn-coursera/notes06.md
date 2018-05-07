---
layout: default
title: Lecture notes in Computational Neuroscience (Week 6)
mathjax: true
---

# Week 6: Networks of neurons

## Modeling synapses

### Modifying the HH model

We want to model the effect of a chemical synapse on the membrane potential.

Q: How do you think we can form a computational model of the effects of inputs on the neuron's electrical potential V?

In the RC circuit model of the membrane, with an input current per unit area A and total input current $$I_e$$, specific membrane resistance $$r_m$$, specific membrane capacitance $$c_m$$, total membrane resistance $$R_m$$, total membrane capacitance $$C_m$$, membrane voltage $$V$$, Voltage at rest $$E_L$$, membrane time constant $$\tau_m = r_mc_m = R_mC_m$$, we have

$$
c_m\frac{\textrm{d}V}{\textrm{d}t} = -\frac{V-E_L}{r_m}+\frac{I_e}{A}
$$

equivalent to

$$
\tau_m\frac{\textrm{d}V}{\textrm{d}t} = -(V-E_L)+I_eR_m
$$

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

In the passive HH model ($$-C_m \frac{\textrm{d}V}{\textrm{d}t} = g_L\left(V-E_L\right) + \overline{g}_Kn^ 4\left(V-E_K\right) + \overline{g}_\textrm{Na}m^ 3h\left(V-E_\textrm{Na}\right) - I_e$$), the passive membrane channels are modeled by $$\ldots + \overline{g}_Kn^ 4\left(V-E_K\right) + \overline{g}_\textrm{Na}m^ 3h\left(V-E_\textrm{Na}\right)$$.

Similarly, an active ion channel s with equilibrium potential $$E_s$$ is modeled by $$g_s(V-E_s)r_m$$ where the synaptic conductance $$g_s$$ is function of inputs received by the synapse:

$$
g_s = \overline{g}_sP_\textrm{rel}P_s
$$

where $$\overline{g}_s$$ is the maximum conductance, $$P_\textrm{rel}$$ is the probability that the transmitter is released given that an input spike happens and $$P_s$$ is the probability that post-synaptic channels are open given that NT have been released in the synaptic cleft (fraction of channels open).

Assuming  $$P_\textrm{rel} = 1$$, the effect of a spike on $$P_s$$ is modeled by the following **kinetic model**:

$$\frac{\textrm{d}P_s}{\textrm{d}t} = \alpha_s(1-P_s)-\beta_sP_s$$

In English: the fraction of channels open equals the opening rate times the fraction of channels closed minus the closing rate times the fraction of channels open.

### The effect of one spike on synaptic conductance

Q: What is the value of Ps at equilibrium? That is, what is the value of Ps such that dPs/dt is 0?

- αs/(βs−αs) 
- **αs/(αs+βs)**
- αs(1−Ps)/βs
- None of these

In recorded data, $$\frac{P_s}{P_\textrm{max}}$$ (so, $$P_s$$ normalized to have a maximum value of 1 by dividing it by it recorded maximum P_\textrm{max}$$) as a function of time after a spike is reasonably modeled by:

- an exponential function for GABA(A) and AMPA synapses: $$K(t) = e^ {-\frac{t}{\tau_s}}$$,
- an alpha function for NMDA synapses: $$\alpha(t) = \frac{t}{\tau_\textrm{peak}}e^ {1-\frac{t}{\tau_\textrm{peak}}}$$


### The effect of several spike on synaptic conductance: the linear filter model of a synapse

Modeling the input spike train to synapse b as a sum of Dirac delta functions: $$ \rho_b(t) = \sum_{i=0}^ {n}\delta(t-t_i) $$

We can apply the expression of $$P_s(t)$$ as filter to the input spike train. For instance, an AMPA synapse with filter $$K(t)$$, the synaptic conductance changes as:

$$
g_b(t) = \overline{g}_{b}\sum_{t_i\lt t}K(t-t_i)
$$

or, in the continuous case:

$$
g_b(t) = \overline{g}_b\int_{-\infty}^ tK(t-\tau)\rho_b(\tau)\textrm{d}t
$$

Graphically, it looks like we are stacking the graph of K each time a spike arrives.

### Synapses in action in a minimal network model of two IaF neurons

Each neuron is connected to the other via a synapse s, and receives a constant input current $$I_e$$. Each neuron's equation is:

$$
\tau_m\frac{\textrm{d}V}{\textrm{d}t} = -\left( \left(V-E_L\right)-g_s \left(t\right)\left(V-E_x\right)r_m  \right)+I_eR_m
$$
 
And synapses are modeled by alpha functions: 

$$
g_s(t) = \overline{g}_s\int_{-\infty}^ t\frac{t}{\tau_\textrm{peak}}e^ {1-\frac{t}{\tau_peak}}\rho_s(\tau)\textrm{d}t
$$

with $$E_L=-70\textrm{ mV}$$, $$V_\textrm{threshold}=-54\textrm{ mV}$$,  $$\tau_m=20\textrm{ ms}$$, $$\tau_\textrm{peak}=10\textrm{ ms}$$, $$I_eR_m=25\textrm{ mV}$$

When $$E_s=0\textrm{ mV}$$ (excitatory synapses), the neurons fire in alternation.

When $$E_s=-80\textrm{ mV}$$ (inhibitory synapses), the neurons fire in synchrony.

## From spiking networks to rate-coded networks

Simulations with spiking neurons can reveal synchrony and correlation, and spike timing effects. However, the computational costs are high.

The option of simulating neurons that use firing-rate outputs lets us scale to larger networks. However, any phenomenon related to spike timing is lost.

The linear filter model of synapses with an input spike train $$\rho_b(t) = \sum_{i=0}^ n\delta(t-t_i) $$ linearly filtered by $$K(t) \approx \frac{P_s}{P_{\textrm{max}}}$$ gives a continuous real-valued synaptic conductance $$g_b(t) = \overline{g}_b\int_{-\infty}^ tK(t-\tau)\rho_b(\tau)\textrm{d}t$$.

For multiple synapses with individual weights $$w_1 \ldots w_N$$ and spike trains $$\rho_1 \ldots \rho_N$$, the total synaptic current of the receiving cell is the sum of individual currents, $$I_s(t) = \sum_{b=1}^ NI_b(t)$$, so

$$
I_s(t) = \sum_{b=1}^ N w_b\int_{-\infty}^ tK(t-\tau)\rho_b(\tau)\textrm{d}
$$

By approximating the instantaneous firing rate $$u_b(t)$$ using the spike train $$\rho_b(t)$$, we get a new expression of the input current in function of the firing rates of input neurons:

$$
I_s(t) = \sum_{b=1}^ N w_b\int_{-\infty}^ tK(t-\tau)u_b(\tau)\textrm{d}
$$

Problems:

- synchrony of spike trains
- correlation between $$u$$

These problems will most often not sufficiently affect the results, and we ignore them.

## Integrating input current equation to arrive at the kinetic expression of the firing-rate base network model

With an exponential synaptic filter $$K(t) = e^ {-\frac{t}{\tau_s}}$$, the differential of the input current equation in time is

$$
\tau_s\frac{\textrm{d}I_s}{\textrm{d}t} = -I_s+\sum_bw_bu_b
$$

This gives the following expression of the network dynamics (input current change in vector form and output firing rate change):
:

### General form of the firing rate based network model 

$$
\begin{cases}
\tau_s\frac{\textrm{d}I_s}{\textrm{d}t} = -I_s+\textbf{w}\cdot\textbf{u}\\\\
\tau_r\frac{\textrm{d}v}{\textrm{d}t} = -v + F\left(I_s(t)\right)
\end{cases}
$$

The function $$F$$ is an ad-hoc transformation.

### The firing rate based network model, neglecting synapse dynamics

If $$\tau_s \ll \tau_r$$, the synaptic input converges quickly, and $$I_s=\textbf{w}\cdot\textbf{u}$$, and the network is entirely determined by

$$
\tau_r\frac{\textrm{d}v}{\textrm{d}t} = -v + F\left(\textbf{w}\cdot\textbf{u}\right)
$$

### The firing rate based network model, neglecting output dynamics

If $$\tau_s \gg \tau_r$$, the output dynamics is negligible compared to the output current, and $$v = F\left(I_s(t)\right)$$, and the network is determined by:

$$
\begin{cases}
 v = F\left(I_s(t)\right)\\\\
 \tau_s\frac{\textrm{d}I_s}{\textrm{d}t} = -I_s+\textbf{w}\cdot\textbf{u}
\end{cases}
$$

### The firing rate based network model with static input (typical ANN case)

If the input is static or approximately so for a long period of time, we can look at the steady state: $$ \frac{\textrm{d}v}{\textrm{d}t} = 0 $$ and $$ \frac{\textrm{d}I_s}{\textrm{d}t} = 0 $$ giving

$$
v_{ss} = F(\textbf{w}\cdot\textbf{u})
$$

That's how unit output is computed in ANN. $$F$$ is often a sigmoidal threshold function.


## Multiple output neurons in a feedforward network

We assume that the synapses are sufficiently fast to neglect their dynamics, and use $$\tau_r\frac{\textrm{d}v}{\textrm{d}t} = -v + F\left(\textbf{w}\cdot\textbf{u}\right)$$ as equation for a single output.

For multiple output neurons, with $$W$$ the matrix of all weight vectors so as $$W_{ij}$$ is the synaptic weight from unit $$j$$ to unit $$i$$ and $$\textbf{v}$$ the vector of combined outputs of all units, the network equation is:

$$
\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t} = -\textbf{v} + F\left(W\textbf{u}\right)
$$

Q: We have officially moved to a higher level of abstraction! When we talked about biophysics last week, we looked at some detailed models of individual neurons. Now we have abstracted away some of those detailed dynamics as we move towards modelling whole networks of neurons. This is a common investigative strategy in the sciences. Why don't we keep all the low-level details when we build large scale models?

- The math may become a lot harder or complicated, making progress difficult. 
- Computational resources limit our ability to fully implement all the low-level details when building a larger system.
- Ease of use - we do not necessarily need all of the low-level details in order to explore the dynamics of higher-level systems such as whole networks.
- **All of these**

## Recurrent networks

In a more general formulation where output unit $$i$$ can be connected to output unit $$j$$ with weight $$m_{ij}$$,

$$
\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t} = -\textbf{v} + F\left(W\textbf{u} + M\textbf{v}\right)
$$

In English: the rate of change of the output $$\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t}$$ is a function $$F()$$ of the weighted input from the previous layer $$W\textbf{u}$$ and the weighted intra-layer feedback $$M\textbf{v}$$, minus the decay $$-\textbf{v}$$.

In the special case of feedforward networks, $$M$$ is the null matrix.

Q: Consider a simple recurrent network with 2 output neurons. Maybe one of them represents the 'fight' impulse, and the other one the 'flight' impulse. The input neurons represent various inputs from the environment. Given the following recurrent weight matrix M, what can we say about the relationship between the fight and flight responses in this particular animal? 

M=[0 −0.5; −0.5 0]

- They tend to balance each other - if one is likely, the other is going to be likely too, leading to "cognitive dissonance." 
- They are disconnected responses from each other - they do not really affect each other; this more resembles a feedforward network.
- **They tend to inhibit each other - as one becomes the more likely response, it suppresses the likelihood of the other.**
- None of the above.

Explanation: Suppose that v contains outputs for the fight impulse in the first element and flight in the second element. When we multiply M by v, we see that higher outputs of the fight response will lead to lower outputs of the flight response, and vice versa. Note: this is not a statement about fight and flight responses in nature in general!

## Linear feedforward network (performing numerical differentiation)

Given the network model

$$
\begin{cases}
\textrm{Dynamics: }&\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t} = -\textbf{v} + W\textbf{u}\\\\
\textrm{Steady state: }&\textbf{v}_{ss} = W\textbf{u}
\end{cases}
$$

the weight matrix

$$
W = \begin{bmatrix}
 1 & 0 & 0 & 0 & -1 \\\\
 -1 & 1 & 0 & 0 & 0 \\\\
 0 & -1 & 1 & 0 & 0 \\\\
 0 & 0 & -1 & 1 & 0 \\\\
 0 & 0 & 0 & -1 & 1 \\\\
 1 & 0 & 0 & 0 & -1
\end{bmatrix}
$$

and the static input vector

$$
\textbf{u} = \begin{bmatrix}
 1 \\\\
 2 \\\\
 2 \\\\
 2 \\\\
 1 
\end{bmatrix}
$$

Q: What is $$\textbf{v}_{ss}$$?

$$
\textbf{v}_{ss} = \begin{bmatrix}
 0 \\\\
 1 \\\\
 0 \\\\
 0 \\\\
 -1 \\\\
 0
\end{bmatrix}
$$

Q: What is this network doing?

- **Calculating some sort of derivative or difference, like looking for edges in a picture.**
- Looking for sequences of repeats or similarity, like finding spots of homogenous color in a picture. 
- Suppressing inputs - similar to turning the volume down or darkening an image. 
- None of the above.

Indeed, considering the weight matrix as a set of filters, each of its row calculates the difference between two adjacent input units.

The parallel should be made with the V1 oriented receptive fields (+\|-), which perform first-order differentiation: the definition of the derivative of a single-valued real function $$f$$ of a real scalar $$\frac{\textrm{d}f}{\textrm{d}x} = \lim_{h\to 0}\frac{f(x+h)-f(x)}{h}$$ is approximated in the discrete case by the difference $$f(x+1)-f(x)$$. In our case, $$W$$ performs that exact operation on $$\textbf{u}$$. 

It should also be noted that the V1 oriented center-surround receptive fields (+\|-\|+) perform second-order derivation: $$\frac{\textrm{d}^ 2f}{\textrm{d}x^ 2} = \lim_{h\to 0}\frac{f'(x+h)-f'(x)}{h}$$, and the discrete approximation for that, $$f(x+1)-f(x) - (f(x)-f(x-1)) = f(x+1)-2f(x)+f(x-1)$$, is approximated by the coefficients in the following matrix W:

$$
W = \begin{bmatrix}
 1 & 0 & 0 & 1 & -2 \\\\
 -2 & 1 & 0 & 0 & 1 \\\\
 1 & -2 & 1 & 0 & 0 \\\\
 0 & 1 & -2 & 1 & 0 \\\\
 0 & 0 & 1 & -2 & 1 \\\\
 1 & 0 & 0 & 1 & -2
\end{bmatrix}
$$

## Recurrent networks



### Linear recurrent network

$$
\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t} = -\textbf{v} + W\textbf{u} + M\textbf{v}
$$

let $$\textbf{h} = W\textbf{u}$$ the weighted $$N\times 1$$ feedforward input vector. 

How does $$M$$ affect $$v(t)$$?

#### Using eigenvectors to solve the network equation

$$
\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t} = -\textbf{v} + \textbf{h} + M\textbf{v}
$$

If M is symmetric, it has N **orthogonal eigenvectors** $$\textbf{e}_i$$ and eigenvalues $$\lambda_i$$ which satisfy

$$
M\textbf{e}_i = \lambda_i\textbf{e}_i
$$

As they are orthogonal, $$\textbf{e}_i\cdot\textbf{e}_j=0, i\neq j$$.

Normalizing the eigenvectors, they are now orthonormal, $$\textbf{e}_i\cdot\textbf{e}_i=1$$, and all vectors can be easily expressed in the eigenbasis as a linear combination of the eigenvectors. For the vector of membrane voltages,

$$
 \textbf{v}(t) = \sum_{j=1}^ Nc_j(t)\textbf{e}_j
$$

We substitute it in $$\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t} = -\textbf{v} + W\textbf{u} + M\textbf{v}$$, and replace $$M\textbf{e}_j$$ by $$\lambda_j\textbf{e}_j$$:

$$
\tau\sum_{j=1}^ N\frac{\textrm{d}\textbf{c}_j}{\textrm{d}t}\textbf{e}_j = -\sum_{j=1}^ Nc_j(\textbf{e}_j-\lambda_j\textbf{e}_j) + \textbf{h}
$$

The sums disappear if one takes the dot product of each side with any arbitrary $$\textbf{e}_i$$, because all $$\textbf{e}_j$$ are orthogonal:

$$
\tau\frac{\textrm{d}\textbf{c}_i}{\textrm{d}t} = -c_i(1-\lambda_i) + \textbf{h}\cdot\textbf{e}_i
$$

Solving the above gives:

$$
c_i(t) = \frac{\textbf{h}\cdot\textbf{e}_i}{1-\lambda_i}\left(1-e^ {\frac{-t(1-\lambda_i)}{\tau}}+c_i(0)e^ {\frac{-t(1-\lambda_i)}{\tau}}\right)
$$ 

With that, we can get the expression of $$\textbf{v}(t)$$.

#### Using eigenvalues to determine network stability

If $$\exists i: \lambda_i > 1$$, the first exponential term in $$c_i$$ will grow indefinitely with time, so the network is unstable.

If $$\forall i: \lambda_i < 1$$, the network is stable, it converges to $$\textbf{v}_{ss} = \sum_i \frac{\textbf{h}\cdot\textbf{e}_i}{1-\lambda_i}e_i$$

Q: We have used the term "steady state" several times now over the past few weeks. What do we mean by "steady state value" here?

- The value of v, given our weight matrices W and M, such that it changes at a constant (steady) rate over time.
- The value of v, given our weight matrices W and M, such that it changes as the exponential of a constant rate over time - it follows a perfect exponential curve.
- **The value of v, given our weight matrices W and M, such that v does not change further over time.**
- None of these

#### Amplification of inputs in a recurrent network

If all $$\lambda_i < 1$$ and $$\lambda_1$$ is close to 1,  and $$\forall j\neq 1, \lambda_j \ll 1$$, then

$$
\textbf{v}_{ss} = \frac{\textbf{h}\cdot\textbf{e}_1}{1-\lambda_1}e_1
$$

And the network is amplifying the projection of the input on eigenvector $$\textbf{e}_1$$ by a factor of $$\frac{1}{1-\lambda_1}$$.

##### Example: the angles network.

The 5 output units of a linear network are labeled -180, -90, 0, 90, 180, for the angles that they represent. 

the matrix $$M$$ is defined by the cosine of the relative angle between the units' labels, ported to $$\left[0,1\right]$$.

Q: Do you think this matrix M is symmetric?

- **Yes**

The connectivity matrix is such that close neighbors are amplified, and remote ones are inhibited, a pattern often encountered in the brain.

With that network, if all eigenvalues are 0 except $$\lambda_1 = 0.9$$, we observe the amplification $$\textbf{v}_{ss} = 10 (\textbf{h}\cdot\textbf{e}_1)e_1$$ of the input around the neuron's preferred angle.

#### Network memory with an eigenvalue of one (performing numerical integration)

If $$\lambda_1 = 1$$, and all other $$\lambda_i < 1$$, then:

$$
\tau\frac{\textrm{d}c_1}{\textrm{d}t} = \textbf{h}\cdot\textbf{e}_1
$$

Solving for $$c_1$$, 

$$
c_1(t) = c_1(0) + \frac{1}{\tau}\int_0^ t \textbf{h}(t')\cdot\textbf{e}_1\textrm{d}t' \tau
$$

in $$\textbf{v}(t) \approx c_1\textbf{e}_1 $$, assuming $$c_1(0)=0$$,

$$
\textbf{v}(t) \approx \frac{\textbf{e}_1}{\tau}\int_0^ t\textbf{h}(t')\cdot\textbf{e}_1\textrm{d}t'
$$

indicating that the firing rate depends on the integral of the past input, even if the current input is 0. 

This type of integrator neurons is present in the medial vestibular nucleus, maintaining a memory of eye position by integrating bursts from on-direction and off-direction movement neurons.

### Nonlinear recurrent networks

We now apply a nonlinear function F to the input and recurrent feedback:

$$
\tau\frac{\textrm{d}\textbf{v}}{\textrm{d}t} = -\textbf{v} + F\left(\textbf{h} + M\textbf{v}\right)
$$

Let's pick the rectification nonlinearity for $$F$$:

$$
F(x) = [x]^ + = x \text{ if } x \gt 0, \text{ and } 0 \text{ otherwise}
$$

It guarantees that the firing rate remains positive.

##### Stability even with large $$\lambda_i$$

If we again take our example of the angles network with the cosines in $$M$$ and all eigenvalues 0 except $$\lambda_1$$, but this time $$\lambda_1 = 1.9$$, and we use $$F$$ as above, we observe the amplification of the firing rate around the preferred value, and the network remains stable thanks to $$F$$.

##### Winner-takes-all

The same type network can select one peak in the input over the other thanks to lateral inhibition.

##### Gain modulation

An increase in the input value is multiplicatively amplified in the output.

##### Memory

Like in the linear case, network memory (integration of past input) can take place, in combination with the gain modulation, etc...


### Non-symmetric recurrent networks

If there are excitatory and inhibitory neurons, connections can't be symmetric. 

For excitatory neurons:

$$
\tau_E\frac{\textrm{d}\textbf{v}_E}{\textrm{d}t} = -\textbf{v}_E + \left[M_{EE}\textbf{v}_E + M_{EI}\textbf{v}_I - \gamma_E\right]^ +
$$

For inhibitory neurons:

$$
\tau_I\frac{\textrm{d}\textbf{v}_I}{\textrm{d}t} = -\textbf{v}_I + \left[M_{II}\textbf{v}_I + M_{IE}\textbf{v}_I - \gamma_I\right]^ +
$$


#### Linear stability analysis

The idea is to look at the stability of the network near fixed points (where $$\frac{\textrm{d}\textbf{v}_E}{\textrm{d}t} = 0$$ and $$\frac{\textrm{d}\textbf{v}_I}{\textrm{d}t} = 0$$.

We take the derivative of the kinetic expression w.r.t. $$v_e$$ and $$v_I$$. The result in Jacobian matrix is a stability matrix:

$$
J = \begin{bmatrix}
 \frac{M_{EE}-1}{\tau_E} & \frac{M_{EI}}{\tau_E} \\\\
 \frac{M_{IE}}{\tau_I} & \frac{M_{II}-1}{\tau_I}
\end{bmatrix}
$$

The two eigenvalues obtained by solving $$\lvert J-\lambda I \rvert = 0$$ determine the dynamics of the network near the fixed point. The solutions can have imaginary components. The imaginary component determine the oscillation frequency of the corresponding neurons, and the real part determines the stability of the fixed point: stable if negative.

$$
\begin{cases}
\lambda_1 = \frac{1}{2}\left( \frac{M_{EE}-1}{\tau_E} + \frac{M_{II}-1}{\tau_I} + \sqrt{\left(\frac{M_{EE}-1}{\tau_E}-\frac{M_{II}-1}{\tau_I}\right)^ 2 + 4\frac{M_{EI}M_{IE}}{\tau_E\tau_I}} \right)\\\\
\lambda_2 = \frac{1}{2}\left( \frac{M_{EE}-1}{\tau_E} + \frac{M_{II}-1}{\tau_I} - \sqrt{\left(\frac{M_{EE}-1}{\tau_E}-\frac{M_{II}-1}{\tau_I}\right)^ 2 + 4\frac{M_{EI}M_{IE}}{\tau_E\tau_I}} \right)
\end{cases}
$$

##### Example: 1 inhibitory and 1 excitatory neuron:

The excitatory neuron is:

$$
0.01\frac{\textrm{d}\textbf{v}_E}{\textrm{d}t} = -\textbf{v}_E + \left[1.25\textbf{v}_E - 1\textbf{v}_I + 10\right]^ +
$$

For the inhibitory neuron, $$\tau_I$$ is a parameter that we will vary:

$$
\tau_I\frac{\textrm{d}\textbf{v}_I}{\textrm{d}t} = -\textbf{v}_I + \left[0\textbf{v}_I + 1\textbf{v}_I - 10\right]^ +
$$

The Jacobian:

$$
J = \begin{bmatrix}
 \frac{1.25-1}{0.01} & \frac{-1}{0.01} \\\\
 \frac{1}{\tau_I} & \frac{0-1}{\tau_I}
\end{bmatrix} = \begin{bmatrix}
 25 & -100 \\\\
 \tau_I^ {-1} & -\tau_I^ {-1}
\end{bmatrix}
$$

Solving

$$
\lvert J-\lambda I \rvert = 0
$$

gives

$$
\begin{cases}
\lambda_1 = \frac{1}{2}\left( \frac{1.25-1}{0.01} + \frac{0-1}{\tau_I} + \sqrt{\left(\frac{1.25-1}{0.01}-\frac{0-1}{\tau_I}\right)^ 2 + 4\frac{-1}{0.01\tau_I}} \right)\\\\
\lambda_2 = \frac{1}{2}\left( \frac{1.25-1}{0.01} + \frac{0-1}{\tau_I} - \sqrt{\left(\frac{1.25-1}{0.01}-\frac{0-1}{\tau_I}\right)^ 2 + 4\frac{-1}{0.01\tau_I}} \right)
\end{cases}
$$

Varying $$\tau_I$$: 

$$\tau_I = 30 \text{ ms}$$ makes the real part or the eigenvalues negative. I consequence, the system spirals down to a stable fixed point in the phase plane $$\langle v_I, v_E \rangle$$. 

The convergence to the fixed point corresponds to damped oscillations of $$v_I$$ and $$v_E$$.

$$\tau_I = 50 \text{ ms}$$ makes the real part or the eigenvalues positive, resulting in an unstable network. On the phase plane, the network diverges from the fixed point. However, thanks to $$F$$, the network loops on a limit cycle.

The transition from stable to unstable system corresponds to a **Hopf bifurcation**.


