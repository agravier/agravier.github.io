---
layout: default
title: Lecture notes in Computational Neuroscience (Week 5)
---

# Week 5: Modeling neurons

## From equivalent circuit models to the Hodgkin-Huxley model

### Simple electrical circuits

- Capacitor C: insulator that accumulates charge on either side
- Resistor R: resists the flow of current
- Battery E: causes drop in electrical potential

Conductance: \\(g = R^ {-1}\\)

Kirchhoff's current law: the total current at a junction of wires is zero (note: current is a signed quantity).

Ohm's law: V = IR (resistance version) or I = Vg (conductance version)

Capacitance definition: C = Q/V : charge divided by voltage

### Modeling a patch of membrane

#### Membrane alone

The membrane is slightly permeable.

Without ion channels, the circuit model is a resistor (for insulation) and a capacitor (for slight permeability) in parallel. 

       +--R--+
    *--+     +--*
       +--C--+

What is the voltage access the membrane?

Ohm's law \\(V = I\_RR\\) gives \\(I\_R\\)

Capacitor: \\(Q = CV\\). gives \\(I\_C\\) by deriving:
\\[\frac{dQ}{dt} = C\frac{dV}{dt}\\]
as \\(I\_C = \frac{dQ}{dt}\\), we have 
\\[I\_C = C\frac{dV}{dt}\\]

Into Kirchhoff's first law: \\(I\_\textrm{ext} + I\_C + I\_R = 0\\)

\\[
C\frac{dV}{dt} = -\frac{V}{R} + I\_\textrm{ext}
\\]

A first-order linear differential equation.

#### Membrane with ion pumps

- higher K+ inside
- higher Na+, Cl-, Ca2+ outside
- active ionic pumps exchanging Na+ for K+ to maintain the osmotic  and electrical gradient
- the osmotic potential results in an electrical potential because the ions move throughout the membrane following their concentration gradient until opposed by electrical forces

Nernst potential: voltage at which osmotic and electrical forces are at equilibrium. It is the log of the ratio of ionic concentrations times an expression of the universal gas constant, temperature, electric charge and Faraday constant.

\\[
E = \frac{RT}{zF}\textrm{ln}\frac{\textrm{ions out}}{\textrm{ions in}}
\\]

This modelled with an extra battery in the electrical circuit model:

       +-R-E-+
    *--+     +--*
       +--C--+

E represents the battery with a voltage of \\(V\_\textrm{rest}\\)

\\[
C\frac{dV}{dt} = -\frac{V-V\_\textrm{rest}}{R} + I\_\textrm{ext}
\\]

With that battery, the voltage drop across the circuit is lesser, as part is accounted for by the battery, and part by the resistor.

We transform that into:

\\[
\tau \frac{dV}{dt} = -V + V\_\infty
\\]

Q: What is τ?

- R
- C
- Iext
- **RC**

\\(V\_\infty\\) is the steady state value of V.

Q: What is V∞ in case of constant input current?

- Iext R
- Vrest
- **Vrest+Iext R**
- VrestR

In case of square pulse, (step-wise constant current input), the solution is 

\\[
V(t) = 
\begin{cases}
  V\_\infty \left(1-e^ {-\frac{t}{\tau}}\right) & \textrm{ when there is current input} \\\\
  V\_\infty \left(e^ {-\frac{t}{\tau}}\right) & \textrm{ when there is no current input}
\end{cases}
\\]


#### With voltage-sensitive ion channels

One ion channel's current is determined by Ohm's law. So, the current flowing through one ion channel is determined by the voltage across the membrane and the conductance of the channel: \\(I=Vg\\). Each ion channel has its own conductance. The higher the conductance for one ion, the more the membrane potential is pulled towards the equilibrium potential of that ion, as defined by the Nernst potential.

 ion | potential
---|---
Na+  | 50mV
Ca2+ |150mV
K+   |-80mV
Cl-  |-60mV

We focus on sodium and potassium. Na+ currents tend to depolarize the membrane, and K+ currents tend to repolarize it.

Each ion channel is modeled by a resistor in series with a battery: +--R-E--+, with a resistor conductance \\(g\_i\\) and a battery potential \\(E\_i\\) proper to each channel. For ion channel \\(i\\):

\\[
I\_i = g\_i(V-E\_i)
\\]

Where V is the membrane potential.

Q: Let's review our circuit diagram from earlier in the lecture. The resistor, capacitor, and battery are roughly analogous to the `______`, `______`, and `______`, respectively.

- ion gradient, lipid bilayer, ion channels
- **ion channels, lipid bilayer, ion gradient**
- lipid bilayer, ion channels, ion gradient
- lipid bilayer, ion gradient, ion channels

#### Computing power at the ionic level: channel nonlinearity

We can trace some of the non-linearity that give the neurons their computing power down to the measurements and simulations done at ionic level. As one varies the input current between up to a certain point, the response of the membrane voltage scales linearly; however, past a certain intensity, the system shows its excitability, and the membrane depolarizes disproportionately.

            * inside
            |
    +----+--+--+----+
    |    |     |    |
    | -gNa->  -gK-> gL
   Cm    |     |    |
    |   ENa    Ek   EL
    |    |     |    |
    +----+--+--+----+
           _|__
           ////


L stands for "leak", it is a non-specific, passive channel.

This circuit is now active, in that the conductance of the Na and K channels is now variable. gNa and gK depend on the voltage.

##### Potassium VG channels

There is a molecular "gate" with a probability to be open that increases with depolarisation (for K channels) or polarisation (for Na channels). In K channels, this probability \\(P\_K\\) depends on the configuration of four sub-units of the channel;  \\(P\_K = n^ 4\\) 

Q: What is an assumption we make here?

- The probability of each subunit being in the open configuration is independent of the other subunits' configuration 
- The probability of the channel being open is larger when a channel has more subunits and we correspondingly raise n to higher powers
- At any given time, we only need to know if a single subunit is open to determine if the channel will be open. 
- All of the above.

Explanation: The probability of both of two independent events happening is the product of the probabilities of each event happening separately. If we assume the 4 subunits open and close independent of one another, then the probability that all of them will be open at the same time is the probability that one of them is open at any given time (n), raised to the 4th power, so that the probability the channel is open (all subunits are in the open configuration) is n*n*n*n. A similar concept would apply if we flipped 4 coins at the same time; the probability of getting 4 heads would be \\(\frac{1}{2}^ 4\\), since the probability of getting heads on each individual quarter does not depend on whether or not any of the other quarters land on heads.

Each of the channel's subunits fluctuates between open (probability n) and closed (1-n) state. Current only flows though the channel when all four units are open at the same time. \\(n\\) does **not** directly depend on the voltage. Rather, the **transition** of each sub-unit between open and closed state occurs at a voltage-dependent rates \\(\alpha(V)\\) for the closed-to-open transition and \\(\beta(V)\\) for the open-to-closed transition. With that, n varies as such:

\\[
\frac{\textrm{d}n}{\textrm{d}t} = \alpha\_n(V)(1-n)-\beta\_n(V)n
\\]

That is the rate at which the open probability for a subunit gate changes. \\((1-n)\alpha\_n(V)\\) : opening rate times probability of finding the gate closed. \\(n\beta\_n(V)\\): closing rate times probability of finding the gate open.

Q: Can you speculate on the effect that voltage dependence has on these rates (C --> O & O --> C)?

- It produces linear rates of change. 
- **It allows for a positive feedback loop.**
- It causes alpha to always be larger than beta. 
- None of these.

Explanation: As the voltage increases, the probability of the gate being opened, or n, increases which in turn brings in more positive charge, increasing the voltage which feeds back on itself in a multiplicative fashion.

At steady state for a fixed V:

\\[
\tau\_n(V)\frac{\textrm{d}n}{\textrm{d}t} = n\_\infty(V)-n
\\]

where

\\[
\tau\_n(V) = \frac{1}{\alpha\_n(V)+\beta\_n(V)}
\\]

and

\\[
n\_\infty(V) = \frac{\alpha\_n(V)}{\alpha\_n(V)+\beta\_n(V)}
\\]

##### Sodium VG channels

The Na+ channel has 3 subunit. It also has an additional second gating mechanism that has to be de-inactivated.

Let m the probability of the Na gate subunits to be open, and h that of the additional inactivation gate being open: \\(P\_\textrm{Na} ~ m^ 3h\\).

Voltage increases m (making it an **activation variable**), but decreases h (**inactivation variable**). As a result, sodium flows are transient and self-limiting.

##### Putting it together into the Hodgkin-Huxley model

\\[
\begin{cases}
\frac{\textrm{d}n}{\textrm{d}t} = \alpha\_n(V)(1-n)-\beta\_n(V)n\\\\
\frac{\textrm{d}m}{\textrm{d}t} = \alpha\_m(V)(1-m)-\beta\_m(V)m\\\\
\frac{\textrm{d}h}{\textrm{d}t} = \alpha\_h(V)(1-h)-\beta\_h(V)h
\end{cases}
\\]

Resulting in equivalent steady states for a fixed V:

\\[
\begin{cases}
\tau\_n(V)\frac{\textrm{d}n}{\textrm{d}t} = n\_\infty(V)-n\\\\
\tau\_m(V)\frac{\textrm{d}m}{\textrm{d}t} = m\_\infty(V)-m\\\\
\tau\_h(V)\frac{\textrm{d}h}{\textrm{d}t} = h\_\infty(V)-h
\end{cases}
\\]

Combining these individual ion channels models, we obtain all voltage-dependent conductances \\(g\_i\\) as functions of maximal conductances \\(\overline{g}\_i\\):

\\[
\begin{cases}
g\_K(V) =& \overline{g}\_K n^ 4\\\\
g\_\textrm{Na}(V) =& \overline{g}\_\textrm{Na} m^ 3h
\end{cases}
\\]

And we apply Ohm's and Kirchhoff's laws:

With \\(C\_m \frac{\textrm{d}V}{\textrm{d}t}\\) the capacitative current (so, in the circuit model, going throughout the membrane capacitor Cm), \\(-\sum\_i g\_i\left(V-E\_i\right)\\) the sum of ionic currents going through channels, and \\(I\_e\\) the external stimulus:

\\[
C\_m \frac{\textrm{d}V}{\textrm{d}t} = -\sum\_i g\_i\left(V-E\_i\right) + I\_e
\\]

The HH model is that system of equations:

\\[
\begin{cases}
\frac{\textrm{d}n}{\textrm{d}t} = \alpha\_n(V)(1-n)-\beta\_n(V)n\\\\
\frac{\textrm{d}m}{\textrm{d}t} = \alpha\_m(V)(1-m)-\beta\_m(V)m\\\\
\frac{\textrm{d}h}{\textrm{d}t} = \alpha\_h(V)(1-h)-\beta\_h(V)h\\\\
-C\_m \frac{\textrm{d}V}{\textrm{d}t} = g\_L\left(V-E\_L\right) + \overline{g}\_Kn^ 4\left(V-E\_K\right) + \overline{g}\_\textrm{Na}m^ 3h\left(V-E\_\textrm{Na}\right) - I\_e
\end{cases}
\\]

Plotting \\(n\_\infty(V)\\), \\(m\_\infty(V)\\), and \\(h\_\infty(V)\\), we can see read the probable sequence of gates opening and closing during a depolarization.

The time constants \\(\tau\_n(V)\\), \\(\tau\_m(V)\\) and \\(\tau\_h(V)\\) determine the speed at which n, m and h reach their limit values for a certain voltage. Plotting them reveals the speed at which each reacts to a change in voltage. 

Q: Based on the previous graph on the right side of the slide, which variable reacts fastest?

- n
- h
- **m**
- They are all roughly the same.

The graph shows that m has the shortest time constant to activation.

That means that VG sodium channels react faster.

Finally, it is useful to take note on the graphs of the resting potential of each ion, so as to visualize the direction of the influence of the opening of that channel.

With those, one can reconstruct the whole story qualitatively.

## From HH to simplified models

Incentives to simplify the HH model:

- analytical tractability, to work formally on the mathematical properties of neurons
- computational tractability, to allow for large-scale simulations

Observing the firing patterns of different biological neurons, or even of the same neuron under different depolarizations, we notice different firing patterns: bursting (thalamic, more depolarized), irregular spiking (thalamic, less depolarized), intermittent regular spiking (cortical), regular continuous spiking with slight variations in spike timing (e.g. motor neurons).

In real data, there isn't always a clear rate-coded response, and the spike timing can be confusing.

### Engineering a model that can present spiking and bursting modes: the Integrate-and-Fire model

Which function \\(f(V)\\) will make the following simple differential equation best describe a neuron's membrane potential response?

\\[
\frac{\textrm{d}V}{\textrm{d}t} = f(V) + I(t)  
\\]

What about \\(f(V) = -a(V - V\_0)\\)? (we assume that the conductance a=1, do simplify)

Q: Based on the linear model and resulting values of dV/dt around V0, what kind of fixed point is V0?

- Unstable. 
- Moving with respect to V. 
- **Stable.**
- None of these.

Explanations: Any input that pushes the voltage to some value to the left of the fixed point (V0) causes dV/dt to be positive, so V slides back up towards V0. Any input that pushes the voltage to the right of the fixed point causes dV/dt to be negative, so V slides back down toward V0. Either way, we end up back at V0, so we call the V0 a STABLE fixed point.

In absence of input I(t), we can plot \\(f(V)\\) around \\(V\_0\\) and notice that \\(V\_0\\) is a stable attractor. This is similar to the passive membrane equation.

How to introduce the non-linear spiking behavior? With ad-hoc rules! Here is the full IaF model:

\\[
\begin{cases}
\textrm{if } V\lt V\_\textrm{th},& C\_m\frac{\textrm{d}V}{\textrm{d}t} = -g\_L(V-Ei)-I\_e\\\\
\textrm{if } V\geq V\_\textrm{th},& \textrm{ fire a spike: }V\to V\_\textrm{max}\\\\
\textrm{if } V = V\_\textrm{max},& \textrm{ reset the membrane potential: }V\to V\_\textrm{reset} 
\end{cases}
\\]

This works, but it is not nice to look at it.

### A more less clunky model: Exponential IaF

If we add a second piece of curve on the right of \\(V\_0\\), after \\(V\_{th}\\), so as \\(f(V)\\) crosses zero again...

Q: As we think about what happens when crossing this new fixed point, let's first determine the stability of the new fixed point:
- Stable
- **Unstable**
- Neither
- The stability of the fixed point cannot be determined without more information

Explanation: The new fixed point is unstable because dV/dt is negative to the left and positive to the right. Thus, when voltage has a value close to the fixed point, voltage tends to change in a way that moves it away from the fixed point voltage. More explanation to follow in the lecture.

Back to the expression \\(
\frac{\textrm{d}V}{\textrm{d}t} = f(V) + I(t)  
\\), \\(f\\) could be quadratic, or a linear plus an exponential:

\\[
f(V) = -a(V-V\_0) + e^ {\frac{V-V\_\textrm{th}}{\Delta}}
\\]

\\(\Delta\\) determines the sharpness of the rise of f(V) in the exponential part.

We still need a ad-hoc reset of the voltage when it reaches \\(V\_\textrm{max}\\).

### An elegant model: the theta neuron

The theta neuron is a one-dimensional model on the unit circle:

\\[
\frac{\textrm{d}\theta}{\textrm{d}t} = i - \cos \theta + (1 + \cos \theta)I(t)
\\]

where the phase \\(\theta\\) represents the voltage. 

\\(\theta = \pi\\) corresponds to a spike, and the reset corresponds to the \\([2\pi]\\) congruence \\(\theta = -\pi\\).

This model is equivalent to a IaF model with quadratic non-linearity.

However, it's notable that the model fires regularly when \\(I(t) = 0\\), so it's a useful model of periodically firing neurons.

### An extra dimension

The problem of the IaF model is that it's one-dimensional, so there is no other solution than working in a Lie group or patching the dynamics. We need a second variable \\(u\\) to take care of inactivation:

\\[
\begin{cases}
\frac{\textrm{d}V}{\textrm{d}t} = F(V) + G(u) + I(t)\\\\
\frac{\textrm{d}u}{\textrm{d}t} = -u + H(V)\\\\
\end{cases}
\\]

#### The phase plane diagram

On the <u,V> plane, the points where \\(\frac{\textrm{d}V}{\textrm{d}t} = 0\\) and those where \\(\frac{\textrm{d}u}{\textrm{d}t} = 0\\) define the **nullclines** of V and u.


Q: Can you identify the fixed point or points in this phase plane?

- At the origin. 
- At the leftmost point of each nullcline 
- At the lowest point of each nullcline 
- **At the intersection between the two nullclines**

Explanation: Similar to our simple linear model, V0 would occur at the location where all rates of change are 0, that is where dudt=0 and dVdt=0, which is the intersection of the u nullcline and V nullcline (red and green curves).

At any point \\(\langle V, u\rangle\\) in the phase plane, the trajectory is determined by \\(\frac{\textrm{d}V}{\textrm{d}t}(V, u)\\) and \\(\frac{\textrm{d}u}{\textrm{d}t}(V, u)\\). 

Explanation: These concepts can be difficult if you have not encountered them before. Let's recap, if you like. Earlier in the lecture we saw a system with only one dimension (voltage), and we represented the system as movement (or flow) along a line. The direction and speed of flow was determined by the dV/dt function that we plotted. The system was attracted to stable fixed points and repelled away from unstable fixed points. Now we have a system with two dimensions, V and u, and correspondingly we represent the system as flow in a 2-dimensional plane (the phase plane). Both dV/dt and du/dt are defined at every point in the plane, although we cannot show the curves for these derivatives like we could when we only had one dimension. Instead, we plot the curves that show where the derivatives are 0 (these are the nullclines) to give a sense of the system's structure. Similar to our one-dimensional case, our two-dimensional system flows toward the fixed point. But, as you will see, sometimes the system travels through the phase plane in interesting ways.

### The Simple Model

It's a "zoomed" version of the 2D model above:

\\[
\begin{cases}
\frac{\textrm{d}V}{\textrm{d}t} = -\alpha V + \beta V^ 2 + \gamma + I(t)\\\\
\frac{\textrm{d}u}{\textrm{d}t} = a(bV-u)\\\\
\textrm{if } V\geq V\_\textrm{th},& \textrm{ then }V\from c, u\from u+d
\end{cases}
\\]

Example values: \\(\alpha=5\\),  \\(\beta=0.04\\),  \\(\gamma=140\\),  \\(V\_\textrm{th}=30\\).

a and b determine decay rate and sensitivity of u to changes in V.
c and d determine the resets of V and u.

These parameters can be used to mimic many phenomena, including sub-threshold resonance (which requires 2 variable).

## From HH to more realistic models: taking dendritic structure into consideration

How does the dendritic tree affect the information processing?

The HH model is a point model. Is that inappropriate to understand the function of the brain? Maybe. The question is probably incorrectly formulated, and HH certainly has its use cases. But more models of neurons are welcome for when the simplicity of HH doesn't cut it. How to model dendrites?

Experiment: inject current in the soma, measure membrane voltage on the dendrite. Result: delayed, broader, damped increase in voltage.

Experiment: inject current in the dendrite, measure membrane voltage on the soma. Result: delayed, broader, very damped increase in voltage. Observation: the thinner the dendrite, the larger the voltage change. The further from the soma, the more attenuation.

### Cable theory

Cable theory is used to understand voltage propagation in dendrites. V is now a function of position x and time t, resulting in partial differential equations.

A dendrite segment is a circuit with two continuous resistances along the dendrite: one outside of the cell \\(r\_0\\), and one inside \\(r\_i\\). all along the dendrite, these two resisting cables are connected by the passive circuit that represents the membrane: a capacitor and a resistor in parallel. They are abstracted in a continuous representation. 

The changes in current are a function of space: a voltage difference between two points in the membrane will drive a current towards the larger difference.

\\[
\frac{1}{r\_i}\frac{\partial{d}^ 2V\_m(x,t)}{\partial{d}x^ 2} = c\_m\frac{\partial{d}V}{\partial{d}t} + \frac{V\_m}{r\_m} 
\\]

which is equivalent to 

\\[
\lambda^ 2\frac{\partial{d}^ 2V\_m}{\partial{d}x^ 2} = \tau\_m\frac{\partial{d}V\_m}{\partial{d}t} + V\_m 
\\]

where \\(\tau\_m = r\_mc\_m\\) is the time constant (timescale) and \\(\lambda=\sqrt{\frac{r\_m}{r\_i}}\\) is the space constant (spatial scale, indicating how far the signal can propagate).

Q: Can you speculate how ri changes as the diameter of a dendrite increases?

- It increases.
- **It decreases. **
- It does not change. 
- Depends on the cell type.

Explanation: As the diameter of a dendrite increases there is more "room" for the charge to flow, meaning the resistance to current is decreased, similar to how water moves faster through a wide pipe than it does through a thin pipe.

Q: How about rm as the number of channels increases along the membrane?

- It increases.
- **It decreases.**
- It does not change.
- Depends on the cell type.

Explanation: As the number of channels increases along the membrane that allows for more current to flow which means a reduction in membrane resistance.

For a constant current input at x=0 on an infinite cable, the potential decays exponentially with distance:

\\[
v(x) \propto e^ {\left(-\frac{|x|}{\lambda}\right)}
\\]

For a discrete input, the propagation velocity is \\(c = \frac{2\lambda}{\tau}\\). The full expression for the propagation is:

\\[
v(x,t) \propto \sqrt{\frac{\tau}{4\pi\lambda^ 2t}} e^ {-\frac{t}{\tau}-\frac{\tau x^ 2}{4\lambda^ 2t}}
\\]

\\(e^ (-\frac{\tau x^ 2}{4\lambda^ 2t}\\) is a diffusive spread, and \\(e^ -\frac{t}{\tau}\\) is the exponential decay.

This expression filters the input pulses, much like a convolution filter.

### Compartmental models

A dendritic tree is not a passive cable. It's a tree, and it has ion channels along.

#### Simplifying the tree structure

We divide the dendrites into pieces of cable, or compartments, that are each assumed to have a constant density of ion channels, constant diameter, etc...

Each compartment is now described by a simpler differential equation that depends on \\(\frac{\textrm{d}V}{\textrm{d}t}\\), but not on \\(x\\).

The dendritic branching of compartment of diameter d1 into children with diameters d11 and d12 can be simplified in such model into one compartment of the diameter d1 when and appropriate electronic length, if \\(d\_{11}^ \frac{3}{2}+d\_{12}^ \frac{3}{2}=d\_1^ \frac{3}{2}\\). Applying recursively, we can get down to one single cable going out of the soma.

This property is often approximately satisfied by biological dendrites, so it's a common simplification.

#### Addressing the problem of ion channels

The compartmentalization and simplification of the dendritic tree doesn't address the problem of its active properties that are not modeled by the passive cable model.

Ion channels densities variations along dendrites, changing the dynamics along the way.

The current approach is to compartmentalize the dendrites into segments that have approximately constant channels densities, writing down the equation for the membrane potential for each compartment.

The connection between compartment 1 and its children 2 and 3 is regulated by four **coupling conductances**: g12 and g13 for the currents that go from the parent to child 2 and 3, g21 and g31 for currents going down the dendritic tree.

Yale's [ModelDB](http://senselab.med.yale.edu/modeldb/) website regroups many such models.

### What dendrites add to information processing in neurons?

Some possible ways by which dendritic trees can support neuronal computation:

Hippocampal neurons have solved the attenuation problem, and input signals arriving at the soma have similar shapes, regardless where in the tree they are generated (synaptic scaling).

The summing of inputs on the same branch can be sub-linear or super-linear (amplification).

The filtering and attenuation of the signal can contribute to the integration of several inputs.

Dendrites can generate calcium spikes! Together with the backprop of AP from the soma, this can be a mechanism of synaptic plasticity.

Models using some computational properties of dendrites (not fully backed by in observation): sound localization and direction selectivity

#### Delay lines in sound localization (Jeffress model)

There are nuclei in the brain stem responsible for sound localization. There is a timing different between the arrival of a sound the left ear as compared to the right.

The spike trains travel the leading ear's auditory pathway slightly earlier than the other ear's.

A population of coincidence detectors along the auditory pathways receives input from both pathways. Those coincidence detecting neurons that are closer to the left ear will detect coincident signals when the left ear is leading, and vice versa.

It could be the dendritic delay that compensates for the timing delay and allows coincidence detection.

Q: We can call the neurons that receive coincident inputs from both ears "coincidence detectors." If you hear a sound that seems to come from your left, which coincidence detectors were most likely activated?

- The coincidence detectors closer to your left ear. 
- **The coincidence detectors closer to your right ear.**
- Coincidence detectors in the middle.
- All of the coincidence detectors.

Explanation: A sound that comes from your left enters your left ear first. The signal from your left ear then has more time to travel down the delay line leading to your coincidence detecting neurons. This signal gets further along the delay line before it meets the signal from your right ear, which began slightly after the signal from your left ear. Thus, the two signals meet at a coincidence detecting neuron that is closer to the right ear, and your brain infers that the sound came from your left.

#### Direction selectivity

In the retina, neurons may respond to a stimulus moving one way and be inhibited by the same stimulus moving in the other direction (direction cell activity). 

A single neuron can have the computational power to be responsible for that property, thanks to the computational power to the dendritic tree:

- spatial input is distributed along one dendrite, with the sequence of spatial inputs corresponding to the movement direction aligned in the direction of the soma.
- the sequence of inputs along the dendrite influences the firing probability of the neuron thanks to the summation of depolarizations in the direction of signal propagation.

## Correlations and synchrony in neural populations (Guest lecture by Eric Shea-Brown)

### Considering an individual neuron:

The first and simplest statistic that matters in terms of how cells responds to varying stimulus: the mean firing rate. The rate code is typically represented by tuning curves.

Other interesting statistics that may give clues about the way neurons represent information, including the variance of the firing rate - the error bar on the tuning curve.

### Considering a population:

- we can plot the individual tuning curves of several neurons and their variance. 
- we can study the paired response of cells: considering two of the cells of the population at a time, measure their Pearson's correlation coefficient:
 - Take a sliding window of width T, move it in parallel along the spikes records of two cells from the population, and count the number of spikes in that window.
 - \\(\rho\_Y = \frac{\textrm{Cov}(n\_1n\_2)}{\sqrt{\textrm{Var}(n\_1)\textrm{Var}(n\_2)}}\\)
 - Studies have revealed that this correlation coefficient tends to be non-zero in a to of cases.
 - That does not indicate if that co-variance has any role in information encoding

If we look from a information theoretical point of view, correlation degrades encoding, as it lowers the amount of information present in the combined signals. In uncorrelated populations, population size increases the signal to noise ratio (measured as mean/sd), like repeated independent experiments increase the confidence in the RV. But correlation also degrades that increase of the signal-to-noise ratio with population size, and any correlation transforms the log-linear relationship into a log-saturating one.

However, if the two neurons are anti-correlated, signal encoding is enhanced as compared to uncorrelated populations. 

So, correlation decreases information in homogeneous populations, but increases the discriminability of signals in heterogeneous populations.

Also, the presence of correlated response could be itself in some cases indicative of something about the input. 

### Pairwise, triplet, ... n-tuplet spike patterns

Array recording techniques pose a challenge: how to represent those data? Enumeration of correlations is astronomical: for a 100 cells, that makes 10000 pairwise statistics, \\(100^ 3\\) triplet, etc...

There are many different approaches to this problem. 

One particular approach: a pairwise-based model

Consider all pairwise distributions between N neurons. The P2 model is the best possible model obtained using that information: with the firing rates and Pearson correlations, we pretend not to know anything else, and choose the N-tuplet distribution that maximizes the entropy.




