---
layout: default
title: Lecture notes in Computational Neuroscience (Week 1)
mathjax: true
---

# Week 1: Basic neurobiology and basic Octave

## Types of brain models:

- descriptive: neural encoding of stimuli and decoding of stored information
- mechanistic: simulation of single neuron, simulation of network of neurons
- normative/interpretive: abstract computational principles of operation of NN.

Computational neuroscience aims at explaining formally how brains generate behaviors (Sejnowski) by providing tools and methods for

- characterizing _what_ nervous systems do ( $$\rightarrow$$ descriptive models )
- determining _how_ they function ( $$\rightarrow$$ mechanistic models )
- understanding _why_ they operate in the way they do ( $$\rightarrow$$ interpretive models )

## The concept of receptive field

Visual system of the cat study by Hubel and Wiesel. Electrical field recording of the occipital area of a cat. Visual stimuli. Moving oriented bars of lights. Conversion of electrical recording of one electrode (one cell) into tick sounds. The response if strong with 75deg bar of light in specific place. Also responds to 45 deg edge of light area in the same place

Q: This describes a model of a specific neuron in a cat responding to visual stimuli. Which of the following functions most accurately depict the model we are talking about here?

A: Frequency of spikes = f(Light bar's orientation)

Definition of a receptive field: Minimal properties of a sensory stimulus that generate a strong response from a cell. (example: stimulus location on retina + orientation + color) 

## A closer look at the 3 types of models: the example of receptor fields

### Building a descriptive model of receptor fields

Retina: tissue of receptors at the back of the eye. Retinal ganglion cells convey information to the lateral geniculate nucleus (LGN). 

Experiments to understand the RF of cells in the retina:

Flash circular spots of light on different locations on the retina. Each cell responds to a spot of light in one particular location. Spot of light in the surrounding area inhibits response $$\rightarrow$$ concept of center-surround RF in the retina (on-center, off-surround or off-center, on-surrond)

Q: The On-Center / Off-Surround receptive field can be thought of as a filter. This filter results in more activation due to certain stimuli, and a depression in activation due to other stimuli. What is this particular filter doing?

A: Causing activation with stimuli concentrated on the center of the visual field, and depressing activation with stimuli which are concentrated in the surround

The LGN transmits visual information to the primary visual cortex (V1). In V1, some of the cells have oriented center-surround receptive fields that best respond to bars of brighter light of the right size and orientation surrounded by darker areas. There are other types of receptive fields varying in orientation, or having off-center on-surround RFs so responding to dark bars. Reverse correlation can be used to quantify the RF type and orientation.

### Mechanistic model of RF

Answers the question: _how_ are oriented receptive fields built from center-surround receptive fields, using neural circuitry?

We need to look at the neuroanatomy of the visual system.

Retina $$\rightarrow$$ optic nerve $$\rightarrow$$ LGN $$\rightarrow$$ V1

In LGN, RFs are circular center surround, but in V1, they are elongated. How is the transformation done? The anatomy gives us an important clue: several LGN cells converge to each V1 cell. Model proposed by Hubel & Wiesel: several LGN cells whose combined RFs form an elongated RFs forward their output to one V1 cell. This model is controversial as it does not take into account recurrent (intra-layer) V1 connections.

### Interpretive model of RF

Answers the question: _why_ are V1 RF shaped by orientation? What are the computational advantages of elongated center-surround RF?

Efficient Coding Hypothesis: the [evolutionary] goal [of the brain] is to represent images as faithfully and efficiently as possible.

Idea: linear combinations (weighted sums) of superposed oriented RFs can be used to reconstruct more complex images.

Computationally, given an image I and its reconstruction Î by a set of receptive fields $$RF_i$$ with $$i \in [1, N]$$:

- minimize the total square pixelwise error between I and Î 
- while keeping the RF as independent as possible (note: this "independence" criterion is not properly defined)

Q: When we say "linear combination" we are talking about a specific mathematical way of combining several things together. Which of the following looks most like an example of a linear combination of receptive fields to form an image reconstruction, assuming I is the image, and the RFs are the receptive fields we are combining?

A: I = 3*RF1 + 2*RF2 + 5*RF3

Computational experiment: Start with random RF (meaning random input weights to output units) and run an optimization algorithm (sparse coding, ICA, predictive coding) using natural image patches as inputs. So, we have several RF that receive input from the same retinal patch, and the algorithm should adapt the input weights to these RF to allow efficient and faithful encoding of all images.

Observation: receptive fields covering contemporary have emerged from the learning of natural image patches using those efficient algorithms.

The same computational experiment has been successfully applied to other sensory cortices.

## Neurobiology 101

### Neurons

Various types and shapes of neurons. Examples:

- Pyramidal neurons in the visual cortex (pyramidal body shape)
- Purkinje cells in the cerebellum, with a dentritic tree with a large branching factor
- Wide variety of optic tectum cells cells

Neuron Doctrine: 

- The neuron is the fundamental structural & functional unit of the brain.
- Neurons are discrete cells and not continuous with other cells. (challenged in some cases)
- Information flows from the dendrites to the axon via the cell body.

Neuron spiking:

The cell membrane is a lipid bilayer that is impermeable to charged ions. 

Resting membrane potential of -70mV thanks to difference in relative ionic concentrations:

- outside: more Na$$^ +$$, more Cl$$^ -$$
- inside: more K+, more organic anions (conjugate bases of organic acids)
- active ionic pumps on the cell membrane expel Na$$^ +$$ and let K$$^ +$$ in.
- diffusion forces around open passive channels let ions flow.

Excitatory (depolarizing) post-synaptic electrical potential $$\rightarrow$$ local summation of those EPSP $$\rightarrow$$ AP threshold of ~-65mV $$\rightarrow$$ output spike

The local depolarization and repolarization of the membrane happens thanks to ion-selective membrane channels (proteins), that can be:

- voltage-gated
- chemically-gated (binding to a molecule causes opening)
- mechanically-gated (pressure or stretch)

### AP propagation

The local depolarization of the membrane causes the opening of voltage-gated Na$$^ +$$ channels, in turn causing the opening of more V-G Na$$^ +$$ channels (positive feedback loop), typically raising the potential difference from -70mV to +30mV. Once most V-G Na$$^ +$$ channels have opened, they will close, and potassium channels will open, letting potassium cations out. That repolarizes the membrane, and slightly hyper-polarizes it (refractionary period). K$$^ +$$ channels then close. The whole sequence of events (Na$$^ +$$ channels "chain reaction", K$$^ +$$ channels opening) constitutes an action potential. In myelinated neurons, the AP propagates from one node of Ranvier to the next. As this _saltatory conduction_ is an active mechanism, the signal is propagation is lossless. Spikes propagate faster, and on a longer range.

Multiple sclerosis leads to the loss of myelin on axons. (oligodendrocytes are true cells producing myelin)

### The synapse

Two kinds of synapses: 

- electrical synapses, using gap junctions
- chemical synapses, that use neurotransmitters

Electrical synapses directly propagate the electrical activity from one neuron to the other: gap junctions are ion channels through the membranes of both cells at once. As a result, ionic concentrations imbalanced can be directly propagated to the postsynaptic neuron, resulting in fast synchronization of the neurons. They are found in the SK reflex loop of the crayfish, f.e.

Chemical synapses: the AP triggers the release of neurotransmitters in the synaptic cleft (vesicles containing the NT fuse with the membrane). The NT then bind with the chemically-gated ion channels on the other side, and the channels open. For instance, channels that let Na$$^ +$$ in, resulting in increasnig the membrane potential.

Evolutionary perspective: what justifies chemical synapses? Possible answer: synapse strength more adjustable (density of inning channels) $$\rightarrow$$ chemical synapses as the basis of learning.

1 cortical neuron ~ 10k synapses.

Excitatory synapse: increase the post-synaptic membrane potential
Inhibitory synapse: decrease the post-synaptic membrane potential

An example of transmission at an excitatory synapse:

input spike $$\rightarrow$$ release of NT (e.g. *glutamate*) $$\rightarrow$$ NT binds to ion channel receptors $$\rightarrow$$ ion channels open $$\rightarrow$$ Na$$^ +$$ influx $$\rightarrow$$ depolarization $$\rightarrow$$ excitatory post-synaptic potential (EPSP)

An example of transmission at an inhibitory synapse: 

input spike $$\rightarrow$$ release of NT (e.g. *GABA*) $$\rightarrow$$ NT binds to ion channel receptors $$\rightarrow$$ ion channels open $$\rightarrow$$ K$$^ +$$ outflux $$\rightarrow$$ hyperpolarization $$\rightarrow$$ inhibitory post-synaptic potential (IPSP)

Synapse doctrine:

Synapses are the basis for memory and learning.

### Learning

Synaptic plasticity allows for learning. 

Hebbian plasticity (Hebb, 1949) is an example of synaptic plasticity: If neuron A takes part in firing neuron B, then the synaptic strength from A to B is strengthened.

Why is it computationally useful? Example of associative learning (learning that growl predicts tiger.

Long Term Potentiation is an increase in synaptic strength that lasts for hours or longer. This is an observed example of Hebbian plasticity. Experimentally, it is shown by measuring over time the amplitude of EPSP for the same input.

Long Term Depression is the equivalent decrease.

The direction of synaptic plasticity (LDP or LTD) depends on the relative timing of input and output spikes. If the input spike occurs before the output spike (corresponding to a causal ordering), we have LTP. In the contrary, we have LTD. The closer the input and output spikes, the stronger the change in synaptic strength. 

### The Nervous System

#### peripheral NS (PNS): somatic NS + autonomic NS

nerve = bundle of axons

somatic NS: nerves connecting to _voluntary_ skeletal muscles (efferent nerves: infer goes CNS $$\rightarrow$$ periphery) and sensory receptors (afferent). 

Autonomic NS: nerves that connect to the heart, blood vessels, smooth muscles and glands. Mostly unconscious, many vital functions

#### Central NS (CNS): brain + spinal cord 

Spinal cord: reflex arcs (local feedback looks), descending motor control signals activating spinal motor neurons, ascending sensory signals

Brain: 

- hindbrain = 
  - medulla oblongata controlling primitive functions like breathing, muscle tone, blood pressure
  - pons involved in sleep and arousal and very connected to the cerebellum
  - cerebellum: voluntary movements, sense of equilibrium, language, attention, etc
- midbrain and reticular formation:
  - midbrain: eye movements, visual reflexes, auditory reflexes (orientation reflex)
  - reticular formation: breathing, pain perception, sleep regulation, wakefulness and arousal, some muscle reflexes
- thalamus and hypothalamus:
  - thalamus: several nuclei. Traditionally considered as a relay station to the cortex for all sensory information except olfactive (this one directly goes to the cortex). Also involved in the sleep cycle.
  - hypothalamus: regulates the 4 F: fight, flee, feed, mate.
- cerebrum (perception, action, learning, memory and other cognitive functions) =
  - amygdala
  - basal ganglia
  - hippocampus
  - cerebral cortex: layered sheet of neurons ~= 14 inch pizza stuffed in a too small box. 14 billion neurons, so like 300 trillion synapses. 6 layers of neurons, quite uniform across the cortex ($$\rightarrow$$ common computational principle?). Input arrive in layer 4 (middle), output to thalamus to layer 6, output to other subcortical regions from layer 5, output to higher cortical areas from layers 2 and 3, input from other layers in layer 1 (and also in other layers).

How do brain regions interact? Discovery using lesion studies, electrophysiology, optical and functional imaging, molecular studies, anatomy, connectomic, etc…

Computing comparison:

- transistors in microprocessors are much more sparsely connected than brain neurons
- brain: 100 microseconds temporal resolution at best; digital circuits: 100picoseconds for a 10GHz computer
- computing paradigm: brain: massive parallelism, adaptive connectivity; digital computers: mostly sequential, fixed connectivity. $$\rightarrow$$ capabilities: brains can solve ill-posed problems, digital computers are good at numerical computation and symbol processing.

### Conclusions

- Information storage in the brain is in the *structure* (physical and chemical), down to the synaptic level.
- Electrochemical information signaling
- Unknown computational basis of the brain. We can try to understand it using descriptive, mechanistic and interpretive models.


## Sidetrack: Octave and programming musings

Notes from [opencourseonline](http://opencourseonline.com/334/coursera-open-course-stanford-university-machine-learning-video-playlist-5-octave-tutorial)

### basics

`help something` : doc about something  
`lookfor something` : search something in the documentation

`~=` : different  
`&& || xor()` : some logical ops  
`%` : comment
 
`;` : silent  
`'string'`  
`disp()`  
`sprintf()` : generate a string using c syntax  
`format long|short` : change the number of displayed decimals

`[1 2; 3 4; 5 6]` : matrix row by row  
`[1 2 3]` : row vector

`v = 1:0.1:2` $$\rightarrow$$ `[1 1.1 1.2 … 2]`  
`1:4` $$\rightarrow$$  `[1 2 3 4]`

`zeros(1,3)`  
`2 * ones(2,3)` $$\rightarrow$$ `[2 2 2; 2 2 2]`  
`rand(4,4)` : uniform  
`randn` : unit gaussian

`repmat(A, m[, n])` : make a matrix with the contents of A repeated on m rows and n columns (=m if not specified)  

`hist(v[, nbins])` prints an histogram

`eye(4)` : 4x4 identity matrix


### data processing

`A * C` : matrix mult  
`A .* B` : element wise matrix multi  
`A .^ 2` : square each element of A  
`1 ./ A` : element wise inverse  
`log(A), abs(A)` : element wise log, abs, etc..  
`-A` : element wise negative  

`length(v)` : nb of elements  
`A + 1: add one element-wise  
`A'` : transpose of A

`max(v)` : max scalar of vector  
`max(A,[],1) or max(A)` : column-wise max  
`max(A,[],2)` : row-wise max  
`[val, ind] = max(v)` : also get the index of max in vector

`A < 0` : element-wise comparison  
`find(M)` : indices of non-null elements. Indices start at 1.

`sum(A), prod(A)` : sum and product of all emelents  
`floor, ceil`  
`flipud, fliplr` : flip matrix

`pinv(A)` : pseudo inverse


### functions and control statements

{% highlight matlab %}
v = zeros(10,1);
for i=1:10,
  v(i) = 2^i;
end;
{% endhighlight %}

{% highlight matlab %}
indices = 1:10;
for i=indices,
  disp(i);
end;
{% endhighlight %}

{% highlight matlab %}
i = 1;
while i <= 5,
  v(i) = 100;
  i = i+1;
end;
{% endhighlight %}

{% highlight matlab %}
while true,
  v(i) = 999;
  i = i+1;
  if i==6,
    break;
  end;
end;
{% endhighlight %}

{% highlight matlab %}
if v(1) == 1,
  disp('lol');
elseif v(1) == 2,
  disp(':(');
else
  disp(':)');
end;
{% endhighlight %}

Functions are files ending in ".m": file squareThisNumber.m

{% highlight matlab %}
% begin file squareThisNember
function y = squareThisNumber(x)
y = x^2;
% end file
{% endhighlight %}

The file has to be located in the current directory (pwd, cd, ls
) or on the search path.

The octave search path can be modified:

    addpath("absolute/path/here")

returning tuples:

{% highlight matlab %}
% begin file squareAndCubeThisNember
function [y1, y2] = squareThisNumber(x)
y1 = x^2;
y2 = x^3
% end file
{% endhighlight %}

corresponding call:

{% highlight matlab %}
[a,b] = squareAndCubeThisNember(5)
{% endhighlight %}


### loading and manipulating data

`size(A)` : returns the size of A in each dimension

`size(A, n)` : size of A in dimension n

`length` : size of the longest dimension, mostly for vectors

`load file.dat` or `load('file.dat')` : load data file $$\rightarrow$$ creates 'file' variable

`who` : list variables available

`whos` : list variables with details

`clear` : remove all variables

`clear file` : remove variable 'file'

`v = A(1:10)`

`v[2:end]` : "end" is a keyword

`save hello.mat v;` : save variable v in file hello.mat in some matlab binary format

`save hello.mat v -ascii` : human-readable

`load hello.mat` : $$\rightarrow$$ creates variable v

`A(3,2)` : A_{3,2}

`A(2,:)` : every element in column 2

`A([1,3],:)` : rows 1 and 3, all columns

`A(:,2) = [10, 11, 12]` : change second column of A

`A = [A, [100; 101; 102]]` : concatenate an extra column to A

`A(:)` : all elements of A in a column vector

`C = [A B]` : concatenates A and B horizontally

`C = [A;B]` : concatenates A and B vertically


### Vectorization

It often results in performance improvements, taking advantage of Octave's library optimizations.

Example: The "sum from 0 to n of product of A_i and B_i" can be translated in the dot product of A' and B:

unvectorized implementation:

{% highlight matlab %}
product = 0.0
for j = 1:n+1,
  product = product + A(j) * B(j);
end;
{% endhighlight %}

vectorized implementation:

{% highlight matlab %}
product = A' * B;
{% endhighlight %}

In general, if you have difficulties to see how to vectorize code, unroll the outer loop in an example, and "see the vectors" unrolled, and repeat with inner loops.


