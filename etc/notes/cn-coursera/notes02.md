---
layout: default
title: Lecture notes in Computational Neuroscience (Week 2)
mathjax: true
---

# Week 2: Neural code

## Tools

### fMRI 

Brain placed in a magnetic field. Measures magnetic field variations and interprets them as changes in blood oxygenation of brain areas. 

Average activity of many neurons \\(\rightarrow\\) rather low spatial resolution. Slow response (seconds), low temporal resolution.

### EEG

Measures electrical field variations at the surface of the scalp, that correspond to the transmission of electrical signals along the axons of neurons (that match certain orientation criteria).

Fast response \\(\rightarrow\\) higher temporal resolution. Non invasive

Q: Though fMRI and EEG are useful techniques in that they can record neural activity in awake and behaving humans, what is the downside to their function?

A: Neither gives as clean a signal as we would like with respect to temporal and spatial resolution.

### Electrode arrays

Directly measures electrical field variations in the close proximity of neurons. Can be placed on the surface of neural tissues, or can penetrate (~2mm) into the surface of the cerebrum. 

Very high spatial resolution, very high temporal resolution, limited area. Invasive. Surgical settings only.

### Calcium imaging

Inject a fluorescent calcium indicator that emits more light when bound to calcium. Ca\\(^ +\\) enters the cell during AP generation and decays fast, so spikes are highlighted.

Very high spatial resolution (individual neurons), good temporal resolution. Invasive. Surgical settings only. Limited area.

### Patch clamp electrodes

Clamp a micropipette on the cell membrane, and insert an electrode inside the cell.

Extremely high spatial resolution, very high temporal resolution. Very limited area. Invasive/mostly in vitro.

Q: Preforming the patch clamp technique is difficult and requires quite a bit of finesse. Can you speculate why a researcher would want to record the internal activity of a single neuron instead of merely recording external signals?

A: Action potentials (and other activity) recorded internally have higher recorded amplitudes as a result of the proximity to the changes in voltage. Activity recorded externally is of lesser amplitude and requires much amplification because voltage changes decay quickly over short distances. Also, when patched onto a small portion of the plasma membrane of a neuron, a researcher has the ability to discern the properties of single ion channels, as seen in the diagram. Additionally, some internal recording techniques allow for the injection of certain chemicals and ions to which the researcher can record a change in internal activity of the patched cell.

## Models of neural encoding: Characterized input-output relationships in various neuron systems

### The neural code

Retina: Rods and cones are photoreceptors that capture light. Their output is transmitted and processed by successive layers of neurons until the retinal ganglions. The axons of retinal ganglions form the optic tract.

Experiment: a retina is placed in a nutrient liquid, on an electrode array, and a film is projected on it. The output of ganglion cells is recorded and displayed on a raster plot: a repetition of the movie is one line. A dot denotes a spike. Repetitions are stacked. Raster plots for all neurons are stacked.

Observations: one ganglion cell will often respond at the same times during each repetition of the movie. Weak responses are less consistent ones.

Different neurons respond to different features of the movie.

Q: If each point (within a red vertical line) correspond to the activity of that cell (A-U here) at a particular time during one repetition of the stimulus (in this case, the movie), what exactly is considered a "strong" response?

A: The cell fires very reliably (upon every iteration of the stimulus) at that point in the stimulus.

How to determine the meaning of these responses? Is it a complex population code? Are individual responses understandable independently form other neurons's responses?

\\(\rightarrow\\) 2 problems: encoding and decoding

Encoding: from stimulus to response. From descriptive models to mechanistic models.

Decoding: What do the responses tell about the stimulus if all we have access to are the responses? \\(\rightarrow\\) decoding algorithm: how to evaluate how accurate it is?

Probabilistic response models: 

- encoding model: what is the probability of a response given a stimulus?
- decoding model: what is the probability of a stimulus given a response?

In a single cell:

- response = spike
- stimulus = unknown, so we need to determine to what feature of a stimulus a neuron responds \\(\rightarrow\\) dimensionality reduction techniques
- what is the relationship between spike and stimulus, simply modeled as P(spike | stimulus feature) and P(stimulus feature | spike). The probabilistic model is justified by the non-determinism observed in the raster plot. Also, the input features that we model are not complete, and neglected features and sensitivities are modeled as noise \\(\rightarrow\\) stochastic model

### Neural tuning curves

Tuning curves can be used to represent the way that neural systems respond to their inputs.

#### Stimulus representation in the visual system

A well-known example of tuning curve represents the relationship between the response (nb of spikes) of a V1 neuron and the orientation of a bar of light moving across the visual field. The relationship is approximately Gaussian.

example 2: motor neuron's response to movement of monkey's arm in several directions. Relashionship: cosine-like

example 3: V1 neuron encoding for retinal disparity (angular distance between object and fixation point). Sigmoidal tuning curve.

V4 neurons respond to more complex geometric features like concavity and convexity.

Q: What do turning curves help us understand about the response of a cell to a given stimulus?

A: The particular response of the cell to varying feature inputs.

The visual cortex responds to many features. For one feature type, we can draw a map of feature selectivity of a patch of the cortex. Maps of feature selectivity can look different. For the map of feature orientation in several animals, we can see that often, neurons that are close respond to similar orientations, and the orientation smoothly changes across the cortical location. However, there are also clearer boundaries, and pinwheels if orientation selectivity. The same cortical patch can have cell activity for other features, for instance the spacial frequency (measured using gratings). There is also clustering of neurons with similar preferences, but less gradience, more boundaries.

Higher visual cortices have cells that respond to more complex features (up to semantic categories like faces, houses). 

Q: In order for higher order feature detection to occur, what must be happening at lower levels of the visual system?

A: Differential firing rates of these cells responding to particular, but simple (bars of light), features that are brought together to produce complex shapes and concepts.

The neural tuning curves of high-area neurons responding to complex features like faces is mapped by a showing discrete samples of the input signal and recording the number of spikes. The tuning curve is then just an histogram without predefined order, and one has to look at the response to try to find an underlying common feature (e.g. pictures of brad pitt and aniston together only, pamela anderson pictures and name written out). Those neurons can even respond to processed auditory signal \\(\rightarrow\\) "concept neurons".

#### Building up complexity

How the processing stream builds up from geometric features selectivity to semantic response?

The stream is not a linear chain of processing, there is a lot of interconnection. For instance, the thalamus relays info to cortical areas but also receives a lot of feedback from them.

\\(\rightarrow\\) reasons to believe that these higher-order representations can, through feedback mechanisms, influence what is being selected at lower level from the stimulus. There is evidence that semantics can influence the representation of an image in V1 and V4. (expectations, learning: what you think you're looking at can shape what you see).

## Constructing simple response models

In general, the experimenter does not know what stimulus feature may be the one for which the unit is selective. He also does not know what function links stimulus to response.

We first consider the response function as a probability of firing. The simplest function imaginable is a linear relationship: response = factor * stimulus. For instance:

- retinotopic c-s RF: the RF looks like a difference of Gaussians (mexican hat, cf. "Difference of Gaussians" filter in GIMP). Let's assume that the response is proportional: r = f s
  - on the continuous retinal map, let \\((x, y)\\) the coordinates of the center of a c-s RF of interest. for each \\((x', y')\\) in the proximity of (x, y), we multiply the luminous power of that pixel by the value of the RF of unit \\((x, y)\\) at \\((x', y')\\). We sum (as we are on a continuous retinal map, we integrate) those values over the whole map:

\\[ \int \int f(x',y') s(x-x', y-y', t) \mathrm{d}x' \mathrm{d}y' \\]

where \\(f(x,y)\\) denotes the luminous power at \\((x,y)\\), and \\(s(tr\_x, tr\_y, t)\\) represents the weight of the receptive field function at the point located at the offset \\(tr\_x, tr\_y\\) from \\((x, y)\\).

The relationship is still linear as in \\(r = f s\\), where the filter \\(f\\) is the difference of Gaussians weighting, and the stimulus \\(s\\) is the image.

  - We can now add more details to this model: we introduce a time lag, where the neuron responds to a a stimulus that happened \\(\tau\\) units of time ago: \\(r(t) = f s(t-\tau)\\)

  - in general, the response at time t to a stimulus s will depend on the stimulus values on a past range of time: \\(r(t) = \int f(\tau) s(t-\tau) \mathrm{d}\tau \\), where \\(f(t)\\) is a time filter that weights the stimulus depending on its time offset. For instance, using the simple moving average of the stimulus in the considered timeframe, 


\\[
 f(\tau) =
  \begin{cases}
   0 & \text{if } \tau \notin [t-a, t-b] \\\\
   c & \text{otherwise}
  \end{cases}
\\]

  - A more plausible time filter function is one where closer times have higher weights:

\\[
 f(\tau) = e^ {-\frac{\tau}{c}} \text{ for } \tau \lt a
\\]

- This leads to an overall picture of spatiotemporal filtering:

\\[ \int \int f(x', y', \tau) s(x-x', y-y', t-\tau) \mathrm{d}x' \mathrm{d}y' \mathrm{d}\tau \\]

\\(f(x', y', \tau)\\) can be visualized as "frames of receptive field".


Back to \\(r(t) = \int f(\tau) s(t-\tau) \mathrm{d}\tau \\), the formulation has a big shortcoming: unbounded rate, including the possibility of negative rates.

Introducing a static non-linearity solves that problems and adds flexibility. This is the general form of a linear/non-linear model (LN model):

\\[ r(t) = g( \int f(\tau) s(t-\tau) \mathrm{d}\tau ) \\]

g could be a sigmoidal function that introduces a saturating non-linearity and guarantees the bounding of the firing rate.

### Reverse correlation to identify the feature to which a neuron responds

Reverse correlation:

- Present the system with random stimulus values, collect output spikes.
- collect stimulus samples \\(s\_i\\) leading to a spike
- average all \\(s\_i\\) into a _spike-triggered average_

Q: What would increase the accuracy (with respect to the true representation of a given cell's preferred filter) of the calculated spike triggered average?

A: Using the reverse correlation technique to sum over many more iterations of the random stimulus.

### Determining the non-linear filter g from data

Given the i/o function P(spike | stimulus),  we can use Bayes' rule to figure out g:

\\[
P(spike | stimulus) = \frac{P(stimulus | spike) P(spike)}{P(stimulus)}
\\]

But stimulus is not just the value of the stimulus at t, but also the value at preceding times, as per temporal filtering. Even discretized, that makes an unconveniently large probability table.

\\(\rightarrow\\) Instead, we use the the convolution of the temporal filter with the stimulus over the past timeframe: \\( s\_1 = \int f(\tau) s(t-\tau) \mathrm{d}\tau \\). It's a scalar

Now, we can use: 

\\[
P(spike | s\_1) = \frac{P(s\_1 | spike) P(spike)}{P(s\_1)}
\\]

\\(s\_1\\) is smoother than the signal because it is the convolution of the rapidly varying stimulus with the usually smooth filter.

Having the values of s1 over time, we can now lookup what value s1 had at the time of spikes, and make a distribution (histogram) of those values, this gives us the distribution of \\(P(s\_1 | \textrm{spike})\\). We have \\(P(s\_1)\\) simply as the distribution of all \\(s\_1\\) values, and P(spike) as we have the spikes records.

Q: What exactly does the shape of the curve of S1 represent?

A: The positons along the stimulus curve that resemble the feature (filter) f with large and small values corresponding to high and low resemblance, respectively.

Explanation: S1 is a representation of the stimulus curve after it has been continuously filtered through the filter, f(t), over the entire time course of the stimulus at each point in time. That is, each point along the curve S1 represents the scalar value of the stimulus values discretized by some value, τ, weighted by the filter, f(t), at each discretized time point such that S1 = stim {s(t), s(t - τ), s(t - 2τ) . . . } * f(t).

## Feature selection

Neural systems don't only respond to one feature. \\(\rightarrow\\) How to introduce more features in our LN models?

To add the possibility to respond to multiple features, we now have one scalar-valued spatiotemporal filter function \\(f\_i\\) per feature, and we use a multi-dimensional i/o function (for instance, a 2 dimensional sigmoid).

We still hope for a dimensionality reduction: if the stimulus is intrinsically 20 dimensional, the feature space should preferably not be 30 dimensional.

So, we try to find a good mapping \\(P(\textrm{spike} |
\textrm{stimulus}) \rightarrow P(\textrm{spike} | s\_1, s\_2, ..., s\_n) \\).

There are many ways to do that:

- We could use the discretized time as coordinate system. The value of the input stimulus at each time step \\(t\_i\\) determines the value of this input sequence in dimension i. So, a stimulus recording with a 100 samples becomes one point in a 100-dimensional coordinate system.
- We could perform a Fourier transform, and s(t) would be understood as a sum of sines and cosines at different frequencies: 
\\( s(t) = \sum\_{i} \alpha\_i a(\omega\_i)) \\) for the component frequencies \\(\omega\_i\\), \\(\alpha\_i\\) coefficients, and a trig functions. Then, the transformed space is defined by those component frequencies.

Q: In other words, the Fourier transform gives us a way to:

- Decompose a signal into a sum of simple sine waves. 
- Look at the amplitudes of various frequencies present in the signal. 
- Solve problems with a different view of the signal. 
(All of these)

Now, but projecting the sample sequence point on the feature vector f in this high-dimensional space, he have a measure of how much the signal matches the unit's preference.

We are not limited to time and Fourier transforms, any set of features vector \\((f\_1, f\_2, f\_3, \ldots)\\) may represent the input sequence. The issue is to choose the features \\(f\_i\\) that best capture interesting aspects of the stimulus wrt AP firing.


### Determining multiple features from white noise.

Let a Gaussian white noise stimulus: \\( P(s(t)) = \mathcal{N}(0,sigma^ 2) \\)

If we look a the (square of) the amplitude of the stimulus in function of the frequency component, we notice that it has equal power at all frequencies, until the limit sampling resolution, meaning until the frequencies at which the signal resolution is lost and the signal becomes smooth. The point at which the power spectrum starts to dwindle is about the inverse of the correlation time of the stimulus.

Such a normal stimulus has the property that it will fill out a gaussian N-sphere in any transformed N-dimensional space. So, alone any feature, it will have a Gaussian distribution.

\\(\rightarrow\\) always spherically symmetric with respect to our choice of representation.

Feeding the unit with many such Gaussian noise input sequences, some will end up triggering spikes. 

The Gaussian *prior stimulus distribution* is the name given to the full set of those inputs. The set of inputs correlated with spikes is called the *spike-conditional distribution*. Its average is the *spike-triggered average*. It is the centroid of the spike-conditional distribution in the feature space.

Q: By "Spike-conditional distribution" we mean:

A: The probability distribution which describes the stimulus, given that a spike occurred.

Besides the average of the spike-conditional distribution, we consider its covariance and perform Principal Component Analysis (PCA).

Reminder: 

- \\(Var(x) = <(\bar{x} - x)^ 2>\\) where <> denotes the avearage.
- \\(Cov(v) = <(v - \bar{v}) (v - \bar{v})^ T>\\) where \\(v\\) is a column vector. So component \\(C\_{i,j}\\) of the covariance matrix is \\(<(x\_i-\bar{x}\_i)(x\_j-\bar{x}\_j)>\\)
- We perform the Eigenvector decomposition: \\(C = V \Sigma V^ T\\), where
  - \\(V\\) is a matrix of Eigenvectors,
  - \\(\Sigma\\) is a diagonal matrix of Eigenvalues \\(\sigma\_i^ 2\\)

The Eigenvectors of the decomposition of the covariance matrix make a new coordinate system in which to represent the data. Each Eigenvector has a corresponding Eigenvalue that is the squared variance of the data along that axis in that new coordinate system. We select the Eigenvectors with the highest Eigenvalues, and call those principal components of the spike-conditional distribution.

Q: Principal component analysis (PCA) gives us a method to:

- Find a representation of our data which has lower dimensionality, giving us a computationally easier problem to work with. 
- Find the vectors along which the variation of our data is maximal in our feature space, which we call the most significant "eigen vectors" of our covariance matrix. 
(Both of these)

Illustration: Eigenfaces

Given the common structure of faces, PCA lets us select about 8 principal components (eigenfaaces), and most id. photos can be expressed as a linear combinations of eigenfaces.

#### Spike sorting

PCA can also be used to separate waveforms from different neurons that were recorded on the same electrode:

- perform PCA
- project, cluster
- transform back the clustered projected points into the original series

#### Characterizing spike-triggering dimensions

We are looking for PCA dimensions with variances that are different from the prior distribution.

For that, we take the variances from the diagonal of the \\(\Sigma\\) matrix of Eigenvalues. All eigenvalues that are equal to the variance of the prior are unlikely to correspond to interesting dimensions (recall that we are looking for dimensions that have relevant to spike firing). However, there will be eigenvalues where the variance is wither increased or increased compared to the prior.

Plotting the density of samples projected on the corresponding Eigenvector against the background prior (which, projected in anyway, remains white noise), they will:
- often be shifted
- be more slender is their eigenvalue was smaller than the variance,
- or be "split" in two Gaussians, f.e. when a unit shows preference for a feature and its negative (but not its absence) (e.g. on/oof retinal ganglion cell, sensitive to light turning on or to light turning off, but not to light remaining constant)

Q: Mark 'true' if: covariance analysis allows us to find spike-conditioned feature dynamics which we cannot see through the spike-triggered average alone. Mark 'false' if it simply gives us another useful view of the data without providing any information not already present in the spike-triggered average.

A: Check for 'true'

Example: vibration-sensitive neuron that is sensitive to the frequency but not to the phase of the signal \\(\rightarrow\\) complex project shape 

Example: Complex cells in V1 that respond to grating frequencies  but are insensitive to the spatial phase of the grating (it can be shifted) make that the spike-triggered average is just a blur. Only higher-order analysis can reveal it.

### Evaluating features

As we are trying features to describe the unit's sensitivity, we try to obtain an interesting tuning curve. That means a tuning curve \\(P(spike | s) = P(s | spike) \frac{P(spike)}{P(s)}\\) where the ratio \\(\frac{P(s | spike)}{P(s)}\\) varies most. 

Q: In other words, we prefer tuning curves which:

A: Make our prior and spike-conditioned distributions look much different for a wide range of possible stimuli, allowing us to discriminate between them.

Expl: We do not particularly care if our spike-conditioned distributions have multiple modes (peaks) or have large responses (high peaks), since they can still look exactly like the prior and therefore would not be very useful to us! What we want is to be able to tell the difference between a spike-conditioned stimulus and a random stimulus. That means our model can provide us with a useful probability of whether a spike will occur (referred to here as p(spike|s), aka the tuning curve).

So, we can me sure the discrepancy between the two distributions to estimate the value of the chosen feature. For instance, using the Kullback-Leibler divergence of \\(P(s)\\) from \\(P(s | spike) \\).

[Wikipedia](http://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence): the Kullback–Leibler divergence of Q from P, denoted \\(D_\textrm{KL}(P||Q)\\), is a measure of the information lost when Q is used to approximate P: KL measures the expected number of extra bits required to code samples from P when using a code based on Q, rather than using a code based on P. Typically P represents the "true" distribution of data, observations, or a precisely calculated theoretical distribution. The measure Q typically represents a theory, model, description, or approximation of P.

\\[
D_{KL}(P(s | spike), P(s)) = \int ln(\frac{P(x | spike)}{P(s)}) P(s | spike) \mathrm{d}s
\\]

To maximize the Kullback-Leibler divergence of P(s) from P(s | spike), we use the method of maximally informative dimensions (Sharpee et al., Neural Computations, 2004). The filter is optimized by looking for a base vector in the multidimensional signal space that maximizes \\( D_{KL}(P(s | spike), P(s)) \\).

Unlike PCA, this technique of maximally informative dimensions accepts any sort of distribution as prior, not just white noise, so it can be used with natural stimuli (neurons will often not respond to white noise at all).

Q: Some advantages of maximally-informative dimensions are (check all that apply):

A: It gives us a way of seeking filters which maximize the discriminability of the spike-conditioned response and the prior.

A: It does not require a specific structure for the distributions, such as Gaussians.

A: You sound super-smart when you mention it at a party.

## Less basic coding models

Spiking history affects unit activity. How to introduce that dependence in the models?

### The generalized linear model (GLM)

It's the same as the linear/non-linear model (signal\\(\rightarrow\\)feature filter\\(\rightarrow\\)static non-linearity (exponential)), with an additional nonlinear feedback filter that is convoluted with the output spike train and incorporated in the input to the static non-linearity. The shape of the additional non-linear feedback filter determines the if the feedback is positive of negative, and on which timescale.

The maximum likelihood method is used to fit GLM. The choice of an exponential static non-linearity makes the application of the maximum likelihood method easier.

- Pillow et al., Nature 2008.
- Liam Paninski, ?

Maximum likelihood is used to determine the parameters of the (feedforward) stimulus filter and of the (feedback) spike history filter. It maximizes the likelihood of the output given the input subject to the parameters being optimized.

Q: Maximum likelihood estimation (MLE) is an approach whereby:

A: You find the model parameters which maximize the probability of the output you observed.

To generalize this model to the case of multiple neurons, where a some neurons' outputs affect other neurons, coupling filters are added: they are like the non-linear post-spike feedback filters, but they feedback into the convoluted signal of the _other neuron_. This is useful to incorporate into the model correlation due to direct (synaptic) or indirect (network) coupling between neurons.

### Modeling noise

Until now, we had a model that produces an instantaneous average firing rate at time t \\( r(t) \\), but no actual spikes. \\(\rightarrow\\) we need an explicit model of spiking. How to generate the spike train from a firing rate? \\(\rightarrow\\) stochastic generators (the Poisson generator)

#### Bernoulli trials

Coin flip:

\\[
\begin{cases}
p = \frac{1}{2} & \text{ of head}\\\\
1-p = \frac{1}{2} & \text{ of tail}\\\\
\end{cases}
\\]

Discretize time into equal bins. There is an _independent_ coin flip in each bin with probability \\( p(t) = r(t)\Delta t \\) of generating a spike.

To simplify out analysis, let's first assume that the firing rate is constant: \\( p = r \Delta t \\)

What is the distribution of the number of spikes? Time being equally partitioned, the probability that the n bins contain in total k spikes is \\( P\_n[k] = \binom{n}{k} p^ k (1-p)^ {n-k} \\). The mean number of spikes (expected value) is \\( \mathrm{E}(x) = np \\). The variance is \\( \mathrm{Var}(x) = np (1-p) \\).

#### Poisson

Bringing the bin size to the limit, for a duration of T time units, we have the Poisson distribution:

- Distribution: \\( P\_T[k] = (rT)^ k \frac{\mathrm{exp}(-rT)}{k!} \\)
- Mean: \\( E(x) = rT \\)
- Variance: \\( \mathrm{Var}(x) = rT \\)
- Fano factor (\\( = \frac{\mathrm{Var}}{\mathrm{E}} \\)): \\( F = 1 \\)
- Interval distribution (distribution of time between spikes): \\( P(T) = r \mathrm{exp}(-rT) \\)

The Poisson distribution is a good model of the spikes distribution on very short intervals (~O(100 ms)): The Fano factor is close to one, the interval distribution is close to exponential-like (but not really because the refractory period prevents a true Poisson distribution, as very short intervals are not possible. But apart from ver short intervals, the distribution of intervals for a large range of intervals is exponential and matches the Poisson distribution). 

On longer intervals, there is a modulation of the firing rate that makes Poisson too simplistic. The Poissonness of very short intervals can be observed by randomly split long recordings inso many short ones, and plotting their variance against their mean, to show the divergence from a Fano factor of 1.

