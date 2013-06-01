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

#### PCA

For data with **zero mean**, the **Hebb rule** orients the weights vector in the **direction of the maximum variance** of the dataset (direction of the first eigenvector). If does not do that is the mean is not \\(\\textbf{0}\\).

**Without constraint on the mean**, the **covariance learning rule**  will orient the weights vector in the **direction of the maximum variance**. 

This means that Hebbian learning and its derivatives perform PCA on the dataset, leading to the linear dimensionality reduction that maximizes the variance of the projected data.

When applied to clustered data (for instance, two clouds of points in a 2D input space), the covariance rule will still align \\(w\\) with the overall maximum variance, which is less interesting for clustered data.

Networks of neurons performing unsupervised learning are able to take better advantage of such data.


