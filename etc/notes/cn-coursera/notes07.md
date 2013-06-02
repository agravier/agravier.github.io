---
layout: default
title: Lecture notes in Computational Neuroscience (Week 7)
---

# Week 7: Learning

## Synaptic plasticity, Hebbian and statistical learning

### Biological basis of learning

Hippocampus: first observations of synaptic plasticity

_Long Term Potentiation_: Long-term increase in synaptic strength. Observed as an increase in EPSP size over time.

_Long Term Depression_: Long-term decrease in synaptic strength, observed as decrease of EPSP.

Q: Can you speculate what might be happening to the post-synaptic cell that might cause an increase or decrease in EPSP amplitude?

- An increase/decrease in the number of neurotransmitter-gated channels.
- An increase/decrease in the number of leak channels.
- **Both of these.**
- Neither of these

Explanation: Anything that works to change the cell's rest conductance (changing number of leak channels) will change its excitability. Similarly, anything that changes the amount of current that can flow into the post synaptic cell upon binding with neurotransmitter (changing neurotransmitter-gated channels) will change its excitability.

### Hebb's rule

Donald Hebb suggested the Hebbian learning rule before the discovery of LTP/D: 

> If neuron A takes part in the firing of neuron B, then the synapse from A to B is strengthened.

Let the input vector \\(\textbf{u}\\), connected to output unit (scalar) \\(v\\), through the weights vector \\(\ textbf{w}\\).

Assume that the network dynamics is fast enough to be ignored. Then, the output is determined by the steady state output:

\\[
v = \textbf{w}\cdot\textbf{u} = \textbf{w}^ T\textbf{u} = \textbf{u}^ T \textbf{w}
\\]

Then, the continuous Hebbian learning rule can be expressed as the following rate equation:

\\[
\tau\_w\frac{\textrm{d}\textbf{w}}{\textrm{d}t} = \textbf{u}v
\\]

In english, the change in conniption strength is proportional to the product of input and output, which product will be low if either or both units don't fire, and will be high if and only if both units fire.

The delta-time version Hebbian learning rule

\\[
\tau\_w\frac{\textbf{w}(t+\Delta t)-\textbf{w}(t)}{\Delta t} = \textbf{u}v \quad\quad \left(\Rightarrow \textbf{w}(t+\Delta t) = \textbf{w}(t) + \frac{\Delta t}{\tau\_w}\textbf{u}v \right)
\\]

leads to the following discrete time implementation:

\\[
\textbf{w}\_{i+1} = \textbf{w}\_i + \epsilon \cdot \textbf{u}v\ \quad\quad \left(\Rightarrow \Delta\textbf{w} = \epsilon\cdot\textbf{u}v\right)
\\]

where \\(\epsilon\\) is the learning rate.

#### Average effect of Hebb's rule

With several input vectors \\(\textbf{u}\\), the Hebbian rule changes the weights by multiplying the input correlation matrix \\(Q\\) to them:

\\[
\langle\tau\_w\frac{\textrm{d}\textbf{w}}{\textrm{d}t}\rangle\_\textbf{u} = \langle\textbf{u}v\rangle\_\textbf{u} = \langle\textbf{u}\textbf{u}^ T\textbf{w}\rangle\_\textbf{u} =  \langle\textbf{u}\textbf{u}^ T\rangle\_\textbf{u}\textbf{w} = Q\textbf{w}
\\]

The input correlation matrix is \\(Q = \langle\textbf{u}\textbf{u}^ T\rangle\_\textbf{u}\\).

### Stability of the Hebbian learning rule

Is \\(w\\) converging? Looking at \\(\frac{\textrm{d}\\|\textbf{w}\\|^ 2}{\textrm{d}t}\\) should indicate whether it explodes.

For the continuous Hebbian learning rule, 

\\[
\frac{\textrm{d}\\|\textbf{w}\\|^ 2}{\textrm{d}t} = 2\textbf{w}^ T\frac{\textrm{d}\textbf{w}}{\textrm{d}t} = 2\textbf{w}^ T \frac{\textbf{u}v}{\tau\_w} = \frac{2v^ 2}{\tau\_w} \gt 0
\\]

which means that \\(\textbf{w}\\) grows without bounds.


### The covariance rule

LTD is modeled to happen when there is no or low ouput even though there is an input. But Hebb's rule doesn't model that.

The covariance rule generalizes the Hebbian learning rule to also work for LTD. In the continuous expression of the Hebbian learning rule, \\(\tau\_w\frac{\textrm{d}\textbf{w}}{\textrm{d}t} = \textbf{u}v\\), we replace the output vector \\(v\\) by its variation from average \\(v-\langle v\rangle\\):

\\[
tau\_w\frac{\textrm{d}\textbf{w}}{\textrm{d}t} = \textbf{u}\left(v-\langle v\rangle\right)
\\]

Q: If v (output of post-synaptic neuron) is large relative to the average of v over time in this equation, what does that imply about w?

- **w will increase in magnitude and the cell will undergo LTP**
- w will decrease in magnitude and the cell will undergo LTP 
- w will increase in magnitude and the cell will undergo LTD 
- w will decrease in magnitude and the cell will undergo LTD

Q: Conversely, if v is small (approaches 0) relative to the average of v over time, what does that imply about w?

- w will increase in magnitude and the cell will undergo LTP 
- w will decrease in magnitude and the cell will undergo LTP 
- w will increase in magnitude and the cell will undergo LTD 
- **w will decrease in magnitude and the cell will undergo LTD**

We note that \\(v-\langle v\rangle\\) is positive for high outputs, which amounts to Hebbian learning, and negative for low outputs, which makes the change of weights negative, leading to LTD.

#### Average effect of the covariance rule

With several input vectors \\(\textbf{u}\\), the covariance rule changes the weights by multiplying the input covariance matrix \\(C\\) to them:

\\[
\langle\tau\_w\frac{\textrm{d}\textbf{w}}{\textrm{d}t}\rangle\_\textbf{u} = \langle\textbf{u}\\left(v-\langle v\rangle\\right)\rangle\_\textbf{u} = \langle\textbf{u}\left(\textbf{u}^ T-\textbf{u}\right)\textbf{w}\rangle\_\textbf{u} = \left(\langle\textbf{u}\textbf{u}^ T\rangle-\langle\textbf{u}\textbf{u}^ T\rangle\right)\textbf{w} = C\textbf{w}
\\]

The covariance matrix of the inputs is \\(C = \left(\langle\textbf{u}\textbf{u}^ T\rangle-\langle\textbf{u}\textbf{u}^ T\rangle\right)\\)

#### Stability of the covariance rule

For the covariance learning rule, 

\\[
\frac{\textrm{d}\\|\textbf{w}\\|^ 2}{\textrm{d}t}
 = 2\textbf{w}^ T\frac{\textrm{d}\textbf{w}}{\textrm{d}t}
 = 2\textbf{w}^ T \frac{\textbf{u}\left(v-\langle v\rangle\right)}{\tau\_w}
 = \frac{2}{\tau\_w}\left(v^ 2-v\langle v\rangle\right)
 = \frac{2}{\tau\_w}\sigma\_v^ 2 \gt 0
\\]

so \\(\textbf{w}\\) grows without bounds too.

Unstable learning rules can be stabilized by normalizing \\(w\\) at each update, ensuring that \\(\\|\textbf{w}\\|=1\\) at all times. But that prevents small weights and LTD.

### Oja's learning rule

For \\(\alpha > 0\\),

\\[
\tau\_w\frac{\textrm{d}\textbf{w}}{\textrm{d}t} = \textbf{u}v - \alpha v^ 2\textbf{w}
\\]

#### Stability of Oja's rule

Looking at the derivative of \\(\\|\textbf{w}\\|^ 2\\),

\\[
\frac{\textrm{d}\\|\textbf{w}\\|^ 2}{\textrm{d}t}
 = 2\textbf{w}^ T\frac{\textrm{d}\textbf{w}}{\textrm{d}t}
 = 2\textbf{w}^ T\frac{\textbf{u}\left(v-\alpha v^ 2\textbf{w}\right)}{\tau\_w}
 = \frac{2}{\tau\_w}\left(v^ 2-\alpha v^ 2\textbf{w}^ T\textbf{w}\right)
 = 2v^ 2\left(1-\alpha\\|\textbf{w}\\|^ 2\right)
\\]

The norm of \\(\textbf{w}\\) will converge when \\(\frac{\textrm{d}\\|\textbf{w}\\|}{\textrm{d}t} = 0\\), which corresponds to \\(\\|\textbf{w}\\|^ 2 = \frac{1}{\alpha}\\)

So Oja's rule is stable, and \\(\\|\textbf{w}\\|\\) converges to \\(\frac{1}{\sqrt{\alpha}}\\).

### What do Hebbian, Covariance and Oja's learning rules do mathematically?

The averaged Hebbian learning rule \\(\tau\_w\frac{\textrm{d}\textbf{w}}{\textrm{d}t} = Q\textbf{w}\\) gives us an equation in terms of \\(\textbf{w}(t)\\). To solve that equation, we use eigenvectors (!).

Let \\(\textbf{e}\_i\\) the eigenvectors of the correlation matrix \\(Q\\). \\(Q\\) is orthonormal, so we can write \\(\textbf{w}(t)\\) as \\(\sum\_i c\_i(t)\textbf{e}\_i\\). Substituting it in the expression of the averaged Hebbian rule:

\\[
\tau\_w\frac{\textrm{d}c\_i}{\textrm{d}t} = \lambda\_ic\_i
\\]

with the solution

\\[
c\_i(t) = c\_i(0)e^ \frac{\lambda\_i}{\tau\_w}
\\]

Using this solution in \\(\textbf{w}(t)=\sum\_i c\_i(t)\textbf{e}\_i\\), we get

\\[
\textbf{w}(t) = \sum\_i c\_i(0)e^ \frac{\lambda\_i}{\tau\_w}\textbf{e}\_i
\\]

\\(w\\) is a linear combination of the eigenvectors of \\(Q\\), with terms that are exponentially dependent on the eigenvalues of \\(Q\\). In consequence, **at the limit in time, the largest eigenvalue dominates the expression, and we have \\(\textbf{w}(t)\propto \textbf{e}\_1\\)**.

Similarly, for Oja's rule, \\(\lim_{t \to \infty}\textbf{w}(t) = \frac{\textbf{e}\_1}{\sqrt{\alpha}}\\).

This means that those rules are equivalent to Principal Component Analysis.

#### Principal Component Analysis

For data with **zero mean**, the **Hebb rule** orients the weights vector in the **direction of the maximum variance** of the dataset (direction of the first eigenvector). If does not do that is the mean is not \\(\\textbf{0}\\).

**Without constraint on the mean**, the **covariance learning rule**  will orient the weights vector in the **direction of the maximum variance**. 

This means that Hebbian learning and its derivatives perform PCA on the dataset, leading to the linear dimensionality reduction that maximizes the variance of the projected data.

When applied to clustered data (for instance, two clouds of points in a 2D input space), the covariance rule will still align \\(w\\) with the overall maximum variance, which is less interesting for clustered data.

Networks of neurons performing unsupervised learning are able to take better advantage of such data.


## Introduction to Unsupervised Learning

With clustered data, the covariance rule doesn't find the most interesting feature of the input data, which are the two clusters. 

### A feedforward network that learns 2 clusters

We have two-dimensional data input through vector \\(\textbf{u}\\), connected to output units \\(v\_A\\) and \\(v\_B\\) via the weight vectors \\(\textbf{w}\_A\\) and \\(\textbf{w}\_B\\). The output \\(v\_i\\) of unit \\(i\\) is

\\[
v\_i = \textbf{w}\_i \cdot \textbf{u} = \textbf{w}\_i^ T\textbf{u} = \textbf{u}^ T\textbf{w}\_i
\\]

Neuron A (B) can then represent cluster A (B) by having \\(\textbf{w}\_A\\) (\\(\textbf{w}\_B\\)) be equal to the center (mean) of cluster A (B).

Q: Would neuron A or B be more active with an input that is closer (in Euclidian distance) to \\(\textbf{w}\_B\\)?

- A
- **B**

For a particular input, the most active neuron will be the one closest to the input:

\\[
\\|\textbf{u} - \textbf{w}\_i\\|^ 2 = \left(\textbf{u}-\textbf{w}\_i\right)^ T \left(\textbf{u}-\textbf{w}\_i\right) =  \\|\textbf{u}\\|^ 2 + \\|\textbf{w}\_i\\|^ 2 - 2v\_i
\\]

Indeed, assuming that the input and weight vectors have been normalized, minimizing \\(\\|\textbf{u} - \textbf{w}\_i\\|^ 2\\|\\) is equivalent to maximizing \\(v\_i\\).


#### Updating the weights

Given a new input vector \\(\textbf{u}\_t\\) (t is not time but a chronological index of inputs from 1 to t),

- Find the new input's cluster
- Update the weight of that cluster by setting the weight vector to the _running average_ of the inputs of that cluster.

How to compute that running average? We want

\\[
\begin{align}
\textbf{w}\_A(t) &= \frac{\sum\_i^ t\textbf{u}\_i}{t}\\\\
&= \frac{t-1}{t}\textbf{w}\_a(t-1) + \frac{\textbf{i}\_t}{t}\\\\
&= \textbf{w}\_A(t-1) + \frac{1}{t} \left(\textbf{u}\_t - \textbf{w}\_A(t-1)\right) \\\\
\end{align}
\\]

So, in the code, the modification of the weights vector has to be

\\[
\Delta\textbf{w}\_A = \epsilon\left(\textbf{u}\_t - \textbf{w}\_A\right)
\\]

where epsilon can be set as 1/t to compute the running average, or a small positive value.

Q: (1/t) may seem like a logical value for epsilon, but can you speculate why having a positive constant for epsilon might be more beneficial?

- It allows u to remain larger than w 
- **It allows the algorithm to update w indefinitely.**
- (1/t) is actually the best value for epsilon. 
- None of these.

### Competitive learning

The competitive learning algorithm goes as follows:

- Select the most active neuron (let it be A), with weights closest to the new input (for instance using a WTA type of network)
- update the weights: \\(\Delta\textbf{w}\_A = \epsilon\left(\textbf{u}\_t - \textbf{w}\_A\right)\\)

The weights vector is shifted from its current location in the direction of the new input by an amount of \\(\epsilon\\).

#### Example

We have 3 output neurons with randomly assigned initial weight values \\(\textbf{w}\_1\\), \\(\textbf{w}\_2\\) and \\(\textbf{w}\_3\\). Inputs come one at a time, and one neuron's weights is adapted for each input. In the end, a partitioning in 3 cluster has emerged, and each weight is close to the centroid of its cluster.

#### Relation to ANN algorithms

Competitive learning is closely related to Kohonen maps (SOM). Kohonen maps, however, update the weight vectors of other neurons in the neighborhood of the winning neuron too.

in this update, neighborhood is taken in a topological sense, as a network-intrinsic neighborhood relationship has been defined prior to learning. Typically, neurons form a topological two or three dimensional grid. The initial weights of neurons are typically aligned to their location in the topological map.

In biological neural systems, cortical maps can have a similar organization, with neural preferences for one input feature neatly arranged in the 2-D topological map of neighboring neurons. For instance, V1 orientation preference maps are made of neighboring neurons that prefer similar orientations. 

### Unsupervised learning

The input \\(\textbf{u}\\) is generated by a set of hidden causes \\(\textbf{v}\\). 

A _generative model_ \\(G\\) defines the transformation \\(v \to \textbf{u}\\). The goal is to learn a good model of the data generation process.

There is a prior joint probability \\(p[\textbf{v}; G]\\), and a likelihood function \\(p[\textbf{u}|\textbf{v},G]\\). \\(G\\) is determined by a set of unknown parameters that we would like to learn.

The two sub-problems of unsupervised learning are:

- problem of recognition: estimate the causes \\(\textbf{v}\\) for any observed input \\(\textbf{u}\\)
  - compute the posterior probability \\(p[\textbf{v}|\textbf{u};G]\\)
- use that information to learn the parameters \\(G\\)

#### Example

Back to our example of 2 clusters of points A and B in a 2d plane. 

We assume a model of two gaussian generators \\(\langle\mu\_A, \sigma\_A\rangle\\) and \\(\langle\mu\_B, \sigma\_B\rangle\\). It's a **mixture of Gaussians** model:

\\[
p[\textbf{u}; G] = \sum\_v p[\textbf{u}|v;G]p[v;G], \quad v\in \left\\{A,B\right\\}, G=\langle\mu\_v, \sigma\_v, \gamma\_v\rangle
\\]

where \\(\gamma\_v\\) is the prior probability \\(p[v;G]\\).

The problem of recognition (finding the posterior \\(p[\textbf{v}|\textbf{u};G]\\)) here is similar to the first step of competitive learning. The first step of competitive learning was to assign an incoming data point to a cluster. Here, we compute the posterior probability of the data point belonging to cluster A or B: \\(p[\\) _"data is A given that its coordinates are_ \\(\textbf{u}\\) _and that cluster A has distributions parameters_ \\(G\_A\\) _"_ \\(]\\) (\\(p[v=A | \textbf{u}, \mu\_A, \sigma\_A, \gamma\_A]\\)) and  \\(p[\\) _"data is B given that its coordinates are_ \\(\textbf{u}\\) _and that cluster B has distributions parameters_ \\(G\_B\\) _"_ \\(]\\) (\\(p[v=B | \textbf{u}, \mu\_B, \sigma\_B, \gamma\_B]\\)), and find that \\(p[v=A | \textbf{u}, \mu\_A, \sigma\_A, \gamma\_A] > p[v=B | \textbf{u}, \mu\_B, \sigma\_B, \gamma\_B]\\).

The second step of unsupervised learning is to update the parameters of \\(G\\), using \\(p[\textbf{v}|\textbf{u};G]\\). That corresponds to the second step of competitive learning, that consist in updating the weight vector to reflect the new cluster center. But here, in unsupervised learning, we do that update using the **Expectation-Maximization algorithm**.

#### The EM algorithm for unsupervised learning

The algorithm consists in iterating two steps unit convergence. 

##### The Expectation step

In the E step, we compute the posterior distribution of \\(v\\) (of clusters A and B in our example) for each \\(\textbf{u}\\).

Using Bayes' rule, 

\\[
\begin{align}
p[v|\textbf{u}; G] &= \frac{p[\textbf{u}|v; G]p[v; G]}{p[\textbf{u}; G]}\\\\
&= \frac{\mathcal{N}(\textbf{u};\boldsymbol{\mu}\_v \sigma\_vI)\gamma\_v}{\sum\_v\mathcal{N}(\textbf{u};\boldsymbol{\mu}\_v \sigma\_vI)\gamma\_v}
\end{align}
\\]

As compared to competitive learning, this is a softer competition than WTA.

##### The Maximization step

In the M step, we chance the set of parameters \\(G\\) using the results of the E stem.

The mean is changed as follows:

\\[
\boldsymbol{\mu}\_v = \frac{\sum\_u p[v; \textbf{u};G] \textbf{u}}{\sum\_u p[v; \textbf{u};G]}
\\]

the variance:

\\[
\sigma\_v^ 2 = \frac{\sum\_u p[v; \textbf{u};G] \|\textbf{u}-\boldsymbol{\mu}\_v\|^ 2}{\sum\_u p[v; \textbf{u};G]}
\\]

and the prior probability:

\\[
\gamma\_v = \frac{\sum\_u p[v; \textbf{u};G]}{\mathcal{N}\_u}
\\]

In comparison, competitive learning adapted the mean, but not the variance or prior probability of the clusters. 

The EM algorithm assumes that all datapoints are available at the time of learning (batch learning), whereas real-time learning is possible in competitive learning (online learning). 




## Sparse Coding and Predictive Coding

### Principal Component Analysis

Even on large input spaces, the eigenvectors of the input covariance matrix can be linearly combined to approximate input exemplars.

For instance, given a set of b&w pictures of faces of N pixels, Turk and Pentland (1991) computed the eigenvectors of the input covariance matrix, and subsequently expressed each face as a linear combination of these "eigenfaces": \\(\textbf{u} = \sum\_{i=1}^ N\textbf{e}\_iv\_i\\)

If we restrict the reconstruction to the use of the first \\(M \lt N\\) principal eigenvectors (associated with the \\(M\\)) largest eigenvalues of the covariance matrix, then a face is 

\\[\textbf{u} = \sum\_{i=1}^ M\textbf{e}\_iv\_i + \textbf{noise}\\]

This model can be used for lossy image compression.

However, an eigenvector analysis (or, equivalently, a PCA) is not good for local components extraction (edges, parts, etc...).

### Linear model of natural images

We now split up the input sample (natural image of \\(N\\) pixels for instance) in a number of weighted basis features (f.e. localized oriented edges). The image is the weighted sum of \\(M\\) (this time possibly larger than \\(N\\)) basis vectors, plus noise:

\\[
\begin{align}
\textbf{u} &= \sum\_{i=1}^ M\textbf{g}\_iv\_i + \textbf{noise}\\\\
&= G\textbf{v} + \textbf{noise}
\end{align}
\\]

where \\(G\\) is the \\(M\times N\\) matrix of column basis vectors \\(\textbf{g}\_i\\), and \\(\textbf{v}\\) is the row vector of coefficients \\(v\_i\\) (\\(M\\) elements).

We need to learn \\(G\\) and \\(\textbf{v}\\).

### Generative model of natural images

To specify a generative model for natural images, we need to specify a prior probability distribution for natural images \\(p[\textbf{v}]\\), and a likelihood function \\(p[\textbf{u}|\textbf{v},G]\\). 

#### Likelihood function for the generative model of natural images, assuming white noise

In our linear model \\(\textbf{u} = G\textbf{v} + \textbf{noise}\\), if the noise vector is assumed to be a Gaussian (\\(\to\\) no correlation across the components of the noise vector) with zero mean, then the likelihood function is also Gaussian, with a mean \\(G\textbf{v}\\) and an identity covariance:

\\[
p[\textbf{u}|\textbf{v};G] = \mathcal{N}(\textbf{u};G\textbf{v}, I) \propto e^ {-\frac{1}{2}\|\textbf{u}-G\textbf{v}\|^ 2}
\\]

The proportionality to the exponential above makes that the log likelihood is 

\\[
\log p[\textbf{u}|\textbf{v};G] = -\frac{1}{2}\|\textbf{u}-G\textbf{v}\|^ 2 + C
\\]

where, in the quadratic term, \\(|\textbf{u}-G\textbf{v}\|\\) can be identified as the difference between the input image and its reconstruction.

Q: Based on the equation log p[u|v;G] = -(1/2) ||u-Gv||^2 + C, can you see what effect minimizing the squared reconstruction error has on the likelihood function?

- Minimizes it.
- **Maximizes it.**
- Stabilizes it.
- None of these.

#### Prior distribution for the generative model of natural images, assuming that causes \\(v_i\\) are independent

If we can assume that the causes \\(v_i\\) are independent (we typically can't for natural images, but let's start like that), then the prior probability for \\(\textbf{v}\\) is equal to the product of the individual prior probabilities of its components: 

\\[p[\textbf{v}] = \prod\_ip[v\_i]\\]

In log terms:

\\[\log p[\textbf{v}] = \sum\_i\log p[v\_i; G]\\]

How to find the individual priors \\(p[v\_i; G]\\)?

As we assume that these \\(v\_i\\) represent very specific components of the image (matching the sparseness of biological neural representations), then for any input, we only want a few \\(v\_i\\) to be active. In consequence, we expect \\(p[v\_i]\\) to have a leptokurtic (super Gaussian) distribution (peak at 0, long tail, e.g. exponential \\(p[v\_i]=e^ {-v\_i}\\), Cauchy \\(p[v\_i]=\frac{1}{\pi \left(1+v\_i^ 2\right)}\\), ...).

We represent each \\(p[v\_i]\\) in the form of an exponential: \\(p[v\_i] = e^ {g(v\_i)}\\). For instance, \\(g(v\_i) = -|v\_i|\\) in an exponential, \\(g(v\_i) = -\pi\log(1+v\_i^ 2)\\) for a Chauchy pdf, etc...

Then, we have 

\\[
\begin{align}
 & p[\textbf{v}] = c \prod\_i e^ {g(v\_i)} \\\\
\Rightarrow & \log p[\textbf{v}] = \sum\_i g(v\_i) + c
\end{align}
\\]

#### Bayesian approach to finding \\(\textbf{v}\\) and learning \\(G\\) in the generative model of natural stimuli

Bayesian = maximize the posterior probability of causes:

\\[
p[\textbf{v} | \textbf{u}; G] = k p[\textbf{u} | \textbf{v}; G] p[\textbf{v}; G]
\\]

This is equivalent to maximizing the log-posterior probability of causes:

\\[
\begin{align}
F(\textbf{v}; G) &= \log p[\textbf{u} | \textbf{v}; G] + \log p[\textbf{v}; G] + \log k\\\\
&= -\frac{1}{2}\|\textbf{u}-G\textbf{v}\|^ 2 + \sum\_i g(v\_i) + K
\end{align}
\\]

We note that \\(-\frac{1}{2}\|\textbf{u}-G\textbf{v}\|^ 2\\) represents the reconstruction error, which we want to minimize, and \\(\sum\_i g(v\_i)\\) is the sparseness constraint, that we try to maximize. 

##### Maximization algorithm

We note the similarity with the EM algorithm.

Repeat those two steps:

- Maximize \\(F\\) w.r.t. \\(\textbf{v}\\) (keep \\(G\\) fixed) (lie the E step in EM)
- Maximize \\(F\\) w.r.t. \\(G\\) (keep \\(\textbf{v}\\) fixed to the value found in the previous step) (like the M step in EM)

###### Maximizing \\(F\\) w.r.t. \\(\textbf{v}\\) with gradient ascent

To maximize \\(F\\) w.r.t. \\(\textbf{v}\\), we look at \\(\frac{\textrm{d}F}{\textrm{d}\textbf{v}}\\). We change \\(\textbf{v}\\) proportionately to the slope \\(\frac{\textrm{d}F}{\textrm{d}\textbf{v}}\\). Here, 

\\[
\begin{align}
\frac{\textrm{d}\textbf{v}}{\textrm{d}t} &\propto \frac{\textrm{d}F}{\textrm{d}\textbf{v}} \\\\
\iff \quad \tau\_v \frac{\textrm{d}\textbf{v}}{\textrm{d}t} &= G^ T \left(\textbf{u}-G\textbf{v}\right) + g'(\textbf{v})
\end{align}
\\]

where \\(\tau\_v\\) is a time constant \\(\left(\textbf{u}-G\textbf{v}\right)\\) is \\(\textbf{u}\\) minus its reconstruction, so it's the error, and \\(g'(\textbf{v})\\) is the sparseness constraint.

This equation \\(\tau\_v \frac{\textrm{d}\textbf{v}}{\textrm{d}t} = G^ T \left(\textbf{u}-G\textbf{v}\right) + g'(\textbf{v})\\) has the form of a recurrent network's firing rate kinetic equation!

###### Recurrent network implementation of sparse coding

In \\(\tau\_v \frac{\textrm{d}\textbf{v}}{\textrm{d}t} = G^ T \left(\textbf{u}-G\textbf{v}\right) + g'(\textbf{v})\\), 

- \\(G^ T \textbf{u}\\) is the total input to the output layer \\(\textbf{v}\\): it is the input \\(\textbf{u}\\) after weighting through the feedforward weight matrix \\(G^ T\\)
- \\(-G^ T G\textbf{v}\\) is the recurrent (intra-layer) input, with \\(-G^ T G\\) the recurrent weights
- There is a feedback connection from \\(\textbf{v}\\) to \\(\textbf{u}\\) with weights \\(G\\). It computes \\(G\textbf{v}\\), which is the mean of the generative distribution, and the prediction.
- Hence, \\(\textbf{u}-G\textbf{v}\\), the error, is further computed at the input layer and propagated to the output layer through the feedforward weights \\(G^ T\\). With that, the output layer corrects its estimate \\(\textbf{v}\\).
- This prediction-correction cycle is iterated until convergence is achieved (\\(\textbf{v}\\) stable for any given \\(\textbf{u}\\))


###### Learning \\(G\\) with gradient ascent

Like for \\(\textbf{v}\\), we maximize \\(F\\) w.r.t. \\(G\\) by changing \\((G\\) proportionately to the slope \\(\frac{\textrm{d}F}{\textrm{d}G}\\):

\\[
\begin{align}
\frac{\textrm{d}G}{\textrm{d}t} &\propto \frac{\textrm{d}F}{\textrm{d}G} \\\\
\iff \quad \tau\_G \frac{\textrm{d}G}{\textrm{d}t} &=  \left(\textbf{u}-G\textbf{v}\right) \textbf{v}^ T
\end{align}
\\]

Taking \\(\tau\_G \gt \tau\_\textbf{v}\\) guatantees that \\(\textbf{v}\\) converges faster than \\(G\\), making it possible to use \\(\textbf{v}\\) to update \\(G\\).

This learning rule, \\(\tau\_G \frac{\textrm{d}G}{\textrm{d}t} =  \left(\textbf{u}-G\textbf{v}\right) \textbf{v}^ T\\), is very similar to Oja's learning rule. However, it's not learning the eigenvectors thanks to the sparseness criterion.

Take a guess just for fun. Based on what we have discussed regarding the visual system so far, especially our characterization of receptive field structure in early visual processing, what kind of basis vectors would you predict are learned for natural image patches?

- Eigenvectors of natural image patches 
- Objects in the environment
- Complex shapes
- **Oriented bars**


Feeding the network with patches from natural images, the basis vectors (columns \\(\textbf{g}\_i\\) of \\(G\\)) learnt resemble the oriented receptor fields of V1. As an interpretive model, this indicates that the brain creates an efficient sparse representation of natural images through these RF.

### Predictive coding networks

The sparse coding network is an instance of **predictive coding** network that uses feedback connections to transmit predictions about the input, and feedforward connections to convey a prediction error signal. The predictive estimator (output layer) maintains an estimate of the (hidden) causes of the input (vector \\(\textbf{v}\\)).

Predictive coding models can have, in addition to feedforward and feedback weights, a set of recurrent weights that learn time-varying input correlations, for instance in moving images. The internal representation (recurrent weights) is allowed to vary over time to model the dynamics of the inputs. Another possible component of predictive coding networks is a sensory error gain on the input layer, allowing to model such effects as visual attention.

The visual cortices present a puzzle: the connections between cortical areas in the visual streams are almost always bidirectional. Why the feedback connections?

Predictive coding networks models of the visual cortex give an explanation. They suggest that the feedback connections convey predictions of activity from higher to lower cortical areas, and that feedforward connections convey the error signals (activity minus prediction). Contextual effects, surround suppression, etc can be explained by hierarchical predictive coding models trained on natural images.
