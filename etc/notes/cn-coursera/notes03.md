---
layout: default
title: Lecture notes in Computational Neuroscience (Week 3)
mathjax: true
---

# Week 3: Decoding neural responses

## Two stimulus values and one neuron: binary choice

You hear a rustle in the forest. Is it indicative of danger?

We assume that we can order rustling sounds on an axis. On the left, the sounds are clearly the breeze. On the right, they are clearly produced by a dangerous animal.

How can we classify that based on the output of one/a few neuron?

Experiment: Monkey looks at center of screen across which random dots move with a coherence varying from 0% (totally random) to 100% (all dots move in the same direction). Monkey is trained to saccade to a location in the direction of the dots movements.

Recordings from a neuron in the MT area. Repeated experiments for the same coherence value. Histogram of the number of trials per number of spikes produced, clustered by direction saccade: in 0 trial did the neuron produce 0 spike and the saccade was downward, and 0 incorrect trial resulted in 0 spike and the saccade was upward; in 3 trials did the neuron produce 1 spike and the saccade was upward, and 0 trial for 1 spike, downward saccade, … With a 12.5% coherence, the 2 distributions look like separate gaussians, with more trials with more spikes for the downwards direction, and more trials with less spikes for the upwards directions.

Q: Can you speculate what might happen to these 2 distributions as the coherence decreases?

- They remain the same. 
- They move apart. 
- **They move toward each other.**
- None of these.

Given **one** neural response from one trial of the experiment, how can one use that information to best guess the direction of the stimulus?
`
Plotting the the neuron's success rate in function of the coherence requires a decoding step. 

- Plot the distribution of responses:
 - Probability of a number r of spikes given that the stimulus moved in one direction $$p(r \mid -) \rightarrow$$ normal centered on <r->
 - Probability of a number r of spikes given that the stimulus moved in the other direction $$p(r \mid +) \rightarrow$$ normal centered on <r+>
- Map a a range of the abscissa (r) to a direction by defining a threshold below which we choose none direction, and above which we choose the other.

Q: Where would you put the threshold value?

- At the peak of the right curve for right saccades and the peak of the left curve for left saccades. 
- **At the midpoint between the 2 curves, where their probabilities are equal.**
- Additional analysis needs to be conducted before a threshold can be estimated. 
- None of these.

Let z the crossing point of the two distributions. We maximize the total prediction error by using z as the threshold. The area under the portion of the $$p(r \mid -)$$ curve that lies below the $$p(r \mid +)$$ curve is then our false positive (type II error) probability for the + guess $$ p(r \geq z  \mid  -) $$, and the area below the higher curve past r=z is the probability of true positive $$ p(r \geq z  \mid  +) $$

Probability of correct prediction = probability of positive exemplar * probability of true positive + probability of negative exemplar * probability of true negative 

$$
P_{\textrm{correct}} = p(+) p(r \geq z  \mid  +) + p(-) (1 - p(r \geq z  \mid  -))
$$

Probability of erroneous predicition = probability of positive * probability of type II error + probability of negative examplar * probability of type I error

$$
P_{\textrm{error}} = p(+) p(r \lt z  \mid  +) + p(-) (1 - p(r \lt z  \mid  -)) \textrm{tbc}
$$

We want the likelihood ratio to be greater than 1: $$ \frac{p(r \mid +)}{p(r \mid -)} \gt 1 $$. (Neyman-Pearson lemma)

The neural response of one neuron is already closely correlated with the behavioral response.

The likelihood ratio can be explicitly computed to make decisions. We listen to the rustling noise and register a stimulus s that is quite likely be due to the breeze and quite unlikely to be due to a dangerous animal. Then, we compute the likelihood ratio of that sample:

$$
L(s) = \frac{p(s \mid \text{tiger})}{p(s \mid \text{breeze})}
$$

This is less than one in our case.

Listening to the leaves during a long time, we collect **independent** samples. So, with several independent observations, we can multiply the corresponding probabilities together. We can also sum their logs, or the log of the likelihood:

$$
L(s) = \frac{p(s \mid \text{tiger})}{p(s \mid \text{breeze})} < 1 \\
\Rightarrow log(L(s)) < 0
$$

Each sample adds to or subtract from log(L(s)), until a threshold is reached.

Experiment: To make an experiment where the monkey can collect samples (accumulate evidence), the previous experiment is repeated , but the monkey can respond when he wants, with some incentive to respond as soon as possible. Recordings from the LIP area (eye movements planning and execution). 

- determine the spatial region to which the recorded neuron is sensitive
- choose that lace as the voluntary saccade's aim for the experiment
- record from that heron throughout the trials

It is observed that that LIP neuron's firing rate gradually increases as the monkey observes the screen and collects evidence. The higher the coherence, the faster the firing rate ramps up.

The firing rate aligns with accumulated evidence, and the saccade occurs always at the same threshold firing rate. IT is interpreted as a threshold of confidence.

Back to to the likelihood ratio, L(s) or its log suffer from a scaling problem: the prior probabilities p(+) and p(-) are not taken into account in the decision making process.

In the retina, the probability distribution of a rod's output without stimulation and that in presence of light overlap. Trying to maximize the likelihood ratio, we would put the threshold at the crossing point of the distributions. But the biology takes the prior probability of photon into account, and that probability (that a photon hits the rod) is pretty low. So, the threshold is skewed in favor of the null hypothesis.

Q: True or False: Adjusting for the prior probabilities allows a downstream cell (the bipolar cell in this case) to be highly confident that any input it is receiving was the result of a stimulus rather than just noise from the upstream cell.

A: True

Explanation: The prior probability gives us a way of quantifying the distribution of firing rates of the cell in an average case, which we can think of as simply the noisy case (the cell is receiving any random input). By adjusting for that normal firing rate, we can pick out instances when the firing rate is significantly different from what we consider normal.

Let $$L_-$$ the effective loss (penalty weight) for a false positive and $$L_+$$ the cost of a type II error.

The expected losses are:

$$
\begin{cases}
  \textrm{Loss}_- = L_- P[+ \mid r]\\
  \textrm{Loss}_+ = L_+ P[- \mid r]
\end{cases}
$$

So, when $$ \textrm{Loss}_+ < \textrm{Loss}_- $$, the loss minimizing strategy is to choose +. USing Bayes' rule, $$ P[- \mid r] = \frac{p(r \mid -) p(-)}{p(r)} $$ and $$ P[+ \mid r] = \frac{p(r \mid +) p(+)}{p(r)} $$, which means that:

The loss-minimizing strategy is to decide to decode a + when the likelihood ratio is greater than the ration of expected losses: $$ \frac{p(r \mid +)}{p(r \mid -)} > \frac{L_+ p(+)}{L_- p(-)} $$.

### Vision and starlight (Fred Rieke)

Retina:

- In low light, the rods are used.
- higher light level, cones.

A few photons per thousands of rods are enough to get a signal sent to the brain.

Computational issue: how to detect sparse signals in a noisy detector?

The signal is sparse and not uniformly spread across detectors, so averaging dissolves the information in the noise.

We need to threshold the rods. A thresholding nonlinearity that rejects noisy rods and keeps the rods that absorb photons.

One advantage of studying the retina is that we have theoretical data about the signal and noise rod response amplitude distributions. with these two distributions, we can build a theoretical model of selectivity.

A second advantage is that we have anatomical data hinting at where such thresholding non-linearity may take place.

several rods $$\rightarrow$$ one rod bipolar cell $$\rightarrow$$ AII amacrine cell $$\rightarrow$$ ...

The rod bipolar cell is already receiving aggregate input from several rods, so the last opportunity to apply the filtering non-linearity is at the synapse between rod and bipolar cell.

Recording rod bipolar cells reveals the thresholding on-linearity. Using the measured distribution of rod signal and noise, we look for the non-linearity shape that predicts the measured bipolar response. This thresholding NL is way into the signal distribution. This can be understood theoretically by scaling the conditional distribution of signal response by the prior probability of receiving a photon in low light.


## Many values and many neurons: decoding algorithms for population codes.

### Cricket cereal system: population vector with 4 cardinal neurons

Cricket cereal system: 2 hind organs that sense air movement. Each  is covered in hairs connected to mechanoreceptors that transmit AP to a bunch of interneurons. 4 of these interneurons respond to 4 cardinal wind directions for low wind speeds.

And it happens that the response of one neuron is $$ \left(\frac{f(s)}{r_{\textrm{max}}}\right)_a = [\overrightarrow{v}\cdot\overrightarrow{c}_a]_+ $$ where $$\overrightarrow{c}_a$$ is the preferred direction of that neuron

The population vector for those four neurons is the sum of their $$\overrightarrow{c}_a$$, weighted by their firing rate:

$$
\overrightarrow{v}_\textrm{pop} = \sum_{a=1}^ 4 \left(\frac{r}{r_\textrm{max}}\right)_a \overrightarrow{c}_a
$$

Q: Which of these options presents a plausible explanation for the presence of neurons that encode for motion in 4 different directions in a 2-dimensional plane?

- Having neurons that select for 4 different directions allows the cricket to have a higher density of motion sensitive neurons. 
- **Negative firing rates cannot be achieved by a neuron.**
- The cricket collects more information about its environment if the basis vectors are not independent. 
- **Sensory neurons can only respond to positive motion along its primary axis.**

Explanation: This has to do with negation and how it relates to the physical world. On the real number line, we of course has negative numbers. But in physical terms, we cannot, for instance, have a negative firing rate. Also, sensory neurons are meant to respond to positive stimuli. As a result, we need these pairs of vectors that face in opposite directions in order to ensure the possibility of a positive response in all cases.

### M1 neurons: population vector with many neurons

Again, neurons responding to angle (this time arm movement) by cosine. With a base firing rate of $$r_0$$, the firing rate of a neuron with preference $$\overrightarrow{c}_a$$ is

$$
\left(\frac{f(s) - r_0}{r_{\textrm{max}}}\right)_a = \overrightarrow{v} \cdot \overrightarrow{c}_a
$$

The population vector for $$N$$ such neurons is the sum of their $$\overrightarrow{c}_a$$, weighted by their firing rate:

$$
\overrightarrow{v}_\textrm{pop} = \sum_{a=1}^ N \left(\frac{r-r_0}{r_\textrm{max}}\right) \overrightarrow{c}_a = \sum_{a=1}^ N\left(\overrightarrow{v}\cdot\overrightarrow{c}_a\right) \overrightarrow{c}_a
$$

Q: In this equation, we normalize the contribution of each neuron to the population vector by its maximum firing rate. Why do we do this?

- **Some neurons have an intrinsically higher firing rate and we want each neuron to contribute to the population vector in a way that is proportional to its relative activation. **
- We want each neuron to contribute vectors of the same length to the population vector (we want all neuron weights to be the same). 
- We want the population vector to have a length of 1. 
- No reason.

Explanation: When combining the effects of several neurons, we want to take into account that the neurons have differences regardless of the stimuli. For instance, if a neuron's maximum firing rate is 10Hz, and we observe an average of 9Hz in the presence of a particular stimulus, this is more interesting to us than if we observed a 9Hz average rate for a neuron whose maximum firing rate is 100Hz.

### More general population decoding

Not all responses are cosines, and not all population responses are the weighted average of neurons, and an optimal population decoding technique should also make use of knowledge of the stimulus and response distributions.

#### Bayesian inference

Vocabulary: in $$p[s \mid r] = \frac{p[r \mid s] p[s]}{p[r]}$$,

- posterior distribution: $$p[s \mid r]$$
- likelihood function or conditional distribution: $$p[r \mid s]$$
- prior distribution: $$p[s]$$
- marginal distribution: $$p[r]$$

Two strategies: 

- Maximum Likelihood (ML), trying to optimize the likelihood function
- Maximum a posteriori (MAP), trying to optimize the posterior distribution (and using our knowledge of $$p[s]$$ to bias our choice)

Example:

A population encodes a stimulus s. Each neuron a responds to s with a Gaussian tuning curve $$f_a(s)$$ (mean $$s_a$$; all tuning curves have the same spread and are evenly spaced along s, so as the mean population response is more or less constant.

Neurons responses are assumed independent.

What is the standard deviation of a poisson neuron with an average firing rate of r?

- $$r$$ 
- ** $$\sqrt{r}$$ **
- λ 
- None of these.

Explanation: The variance of a poisson distribution is equal to the mean and the standard deviation is the square root of the variance. Therefore, if the mean firing rate is r, the variance is equal to $$\sqrt{r}$$.

##### Maximum likelihood

The probability of the population response vector $$r$$ given stimulus s is the product (indep.) of the probabilities $$P[r_a \mid s]$$. As we are assuming a Poisson distribution, we have

$$
P[r_a \mid s] = \frac{(f_a(s)T)^ {r_aT}}{(r_aT)!}\mathrm{exp}(-f_a(s)T)
$$

so 

$$
P[r \mid s] = \prod_{a=1}^ N \frac{(f_a(s)T)^ {r_aT}}{(r_aT)!}\mathrm{exp}(-f_a(s)T)
$$

Q: log(ab/c)=?

- log(a)log(b)/log(c) 
- (log(a)+log(b))/log(c)
- **log(a)+log(b)−log(c)**
- None of these.

We want to maximize this expression of $$P[r \mid s]$$ in function of s. For that, we can log-linearlize that expression, as maximizing the logarithm of the function is equivalent.

As maximization technique, we can set the gradient to 0. The derivative of the log-linearized expression of $$P[r \mid s]$$ is simplified a lot by various constants:

$$
\ln(P[r \mid s]) = \sum_{a=1}^ N r_a \frac{f'(s)}{f(s)} = 0
$$

where $$f_a = A e^ {-\frac{1}{2\sigma_a^ 2}(s-s_a)^ 2}$$ in our case, which makes that the solution is 

$$
s^ * = \frac{\sum_{a=1}^ N\frac{r_as_a}{\sigma_a^ 2}}{\frac{r_a}{\sigma_a^ 2}}
$$

If variances are all equal, we find an expression of the population vector.

If not, the **informativeness** of each neuron is taken into account in the expression of $$s^ *$$, as the inverse of the spread is used to weight its contribution!


##### Maximum a posteriori

If the likelihood distribution is $$P(A \mid B)$$, what is the a posteriori distribution?

- P(A)
- **P(B\|A)**
- P(B)
- P(AB)

Explanation: Sorry for all the Latin phrases! Mathematicians love that stuff.

Remember that with Bayesian reasoning, we start with an initial belief about a distribution of something, we call that the "prior" distribution. As we collect new evidence, we can adjust our belief. Our belief after adjusting for the new evidence is called the "a posteriori" distribution. The likelihood tells us how likely we are to observe our evidence, given the various possible values of the thing we are concerned with, which is something we taken into account while estimating the posterior distribution. Bayes Rule tells us precisely how we can take that likelihood into account to come up with the posterior.

In the case of this question, our prior would be $$P(B)$$. Our evidence is represented by A, and the likelihood of our evidence is $$P(A \mid B)$$. In the Bayes Rule formula, it is $$P(B \mid A)$$ that plays the role of the posterior.


We want to maximize $$\textrm{ln} p[s \mid r] = \textrm{ln} P[r \mid s] + \textrm{ln} p[s] - \textrm{ln} P[r]$$

Again, we replace $$ ln(P[r \mid s]) $$ by $$ \sum_{a=1}^ N r_a \frac{f'(s)}{f(s)} $$, find $$s^ *$$ for which the derivative of the function is 0:

$$
s^ * = \frac{T\sum_{a=1}^ N\frac{r_as_a}{\sigma_a^ 2} + \frac{s_\textrm{prior}}{\sigma^ 2_\textrm{prior}}}{T\sum_{a=1}^ N \frac{r_a}{\sigma_a^ 2} + \frac{1}{\sigma^ 2_\textrm{prior}}}
$$

Now, compared to the ML case, information about the prior is taken into account, and here in the case of a gaussian prior distribution, the smaller its spread, the more influence $$s_\textrm{prior}$$ has.

### Limitations of population vector, ML ad MAP

- Can't take more temporal information than mean firing rate
- Tuning curves only
- Assumes independent neurons in the population.

## Complex, time-varying stimulus reconstruction

Extend Bayesian decoding to continuous time-varying stimuli (and responses).

Let's minimize (parameter $$s_{\textrm{Bayes}}$$ is the optimal estimator that we are trying to determine) an error function:

$$
\int L(s,s_\textrm{Bayes})p[s \mid r]\mathrm{d}s
$$

We can choose L() = MSE, and as usual, try to find $$s_\textrm{Bayes}$$ so as $$\frac{\mathrm{d}}{\mathrm{d}s_\textrm{Bayes}} \int L(s,s_\textrm{Bayes})p[s \mid r]\mathrm{d}s = 0$$. Using the MSE as error function L, we have

$$
2 \int (s-s_\textrm{Bayes})p[s \mid r]\mathrm{d}s = 0
$$
$$\Rightarrow s_\textrm{Bayes} = \int sp[s \mid r]\mathrm{d}s
$$

... which is no more than the continuous expression of the STA.

### Spike train decoding? (from 3:56 in week 3, lecture 3, I don't follow)

...


Q: In this experiment what do r and s represent?

- the video clip, the fMRI BOLD signal
- **the fMRI BOLD signal, the video clip**
- the fMRI BOLD signal, an electrical signal recorded directly from the patient's brain
- an electrical signal recorded directly from the patient's brain, the video clip

Expl: r represents the response, or firing rate of a neuron. So generally it measures brain activity. On the other hand s represents the stimuli that elicited that brain activity. In this case, the fMRI was used to measure the brain activity, and the video clips were used to elicit it.



