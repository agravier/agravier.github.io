---
layout: default
title: Lecture notes in Computational Neuroscience (Week 4)
---

## Week 4: Information Theory and Neural Coding

### Information theory and coding principles

If spikes are binary info, how well do they represent information?

#### Entropy and information

We again use our model of spiking as repeated Bernoulli trials: time bins each with a probability \\(p\\) of seeing a spike (a "1"):

\\[
P(1) = p
P(0) = 1-p
\\]

Then we have 

\\[
\textrm{information}(1) = -\textrm{log}\_2p
\\]

\\[
\textrm{information}(0) = -\textrm{log}\_2(1-p)
\\]

##### Intuitive explanation of information

Imagine a game where your opponent throws a ball in a court. You have to best guess where it will land. There is a \\(\frac{1}{2}\\) prior probability that it will land in the left half, and \\(\frac{1}{2}\\) that it will land in the right half. If you can get information that eliminates the let half, that piece of data contains \\(-\textrm{log}\_2\frac{1}{2} = 1\\) bit of information. If we have data that tells both in which vertical half and in which horizontal half (so in which quarter) of the court the ball will land, we are getting information about an event that had a prior probability of \\(\frac{1}{2}\frac{1}{2} = \frac{1}{4}\\), so the information carried is \\(\textrm{log}\_2\left(\frac{1}{2}\frac{1}{2}\right) = \textrm{log}\_2\frac{1}{2}+\textrm{log}\_2\frac{1}{2} = 2 \textrm{bit}\\).


##### Entropy

Entropy is the average information of a random variable. It's the sum of the surprisal (self-information) values of all possible values of the RV. It's dimensionless but conventionally called bits.

For a discrete random variable: \\(H = -\sum\_ip\_i\textrm{log}\_2p\_i\\)

For a continuous random variable: \\(H = -\int p(x)\textrm{log}\_2p(x)\textrm{d}x\\)

Intuitively, it's the number of binary questions necessary to specify a variable.

Q: Can you speculate how many bits of information are required to locate your car in a 4x2 parking lot, either by calculating or by intuition?

- 8 
- **3**
- 4 
- 16

By calculating entropy:

\\[
H = -\sum\_ip\_i\textrm{log}\_2p\_i
\\]

and \\( p\_i = \frac{1}{8} \\)

so \\( H = -\sum\_{i=1}^ 8\frac{1}{8}\textrm{log}\_2\left(\frac{1}{8}\right) = \textrm{log}\_2\frac{1}{8}. \\)

as \\( 8 = 2^ 3 \\), \\( H = -\textrm{log}\_2\frac{1}{8} = -(\textrm{log}\_21-\textrm{log}\_28) = 3\\)


Q: Which response do you think has the most intrinsic capability of encoding a stimulus?
- Top trace. 
- Middle Trace. 
- Bottom Trace. (most random-looking with equal number of spikes and non-spikes)
- None of these.

Now, the entropy of spike trains alone doesn't tell much, as we are not considering the stimulus.

Spikes and atomic stimuli are not necessarily directly correlated, in that spikes may be triggered by unknown components of the stimulus. We can use information theory to determine how much of the variability in the response r is encoding the stimulus s.

Taking the example of the movement direction detection of particles that move at various levels of coherence, let's assume that the spike trains observed in one recording implicitly encode one movement direction if they encode the other. Let the probability of type II error be for convenience equal to the probability of type I error: \\(P(r\_-|+)=P(r\_+|-)=q\\). How much of the response entropy is accounted for by these errors?

**Mutual information** \\(I\_m\\): amount of information that the response carries about the stimulus. It is calculated by subtracting the response entropy on repetitive stimulus input from the total response entropy. The **response entropy on repetitive presentation of one stimulus** \\(H\_s\\) is equivalent to the entropy of the conditional probability distribution \\(P[r|s]\\): \\(H\_s=-\sum\_r P[r|s]\textrm{log}\_2P[r|s]\\) for a given stimulus s. This gives the entropy of the response that encodes one type of stimulus, so the inherent variability of that response. In other words, it gives us the noise of the neural response for one specific stimulus. Now, averaging that over all possible stimuli, we get the **noise entropy**

\\[
H\_\textrm{noise} = \sum\_s P[s]H\_s =  -\sum\_s P[s] \sum\_r P[r|s]\textrm{log}\_2P[r|s]
\\]

so the mutual information is: \\(I\_m = H-H\_\textrm{noise}\\)

Q: If the stimulus and response are independent events with their own probabilities, p(s) & p(r), what then is the probability of the response given the stimulus, p(r|s)?

- **p(r)**
- p(s) 
- p(s|r) 
- None of these

Q: If p(r|s) = p(r), what value must MI take?

- 1 
- 0.5 
- **0** 
- More information is needed.

##### Kullback–Leibler divergence

As seen in week 2, the **Kullback–Leibler divergence from** distribution P **to** distribution Q \\(D\_\textrm{KL}(P||Q)\\), also called the information gain or relative entropy, measures the  the information lost when Q is used to approximate P. We can make the link with mutual information: the mutual information of the stimulus distribution S and of the response distribution R is the Kullback–Leibler divergence from their joint probability distribution P(R,S) to their marginal probability distribution (which is their joint probability distribution if they were independent) P(R)P(S):

\\[
I\_m(S,R) = D\_\textrm{KL}(P(R,S), P(R)P(S))
\\]

In consequence, the mutual information can be expressed both ways: 

\\[
I\_m = H-H\_\textrm{noise} = H(R)-\sum\_s P(s)H[R|s] = H(S)-\sum\_r P(r)H[S|r]
\\]

Q: What does the fact that \\(H[R] - \sum\_s P(s) H[R|s] = H[S] - \sum\_r P(r) H[S|r]\\) indicate about mutual information?

- It is dependent on stimulus and response. 
- It is symmetric between stimulus and response. 
- **Both of these.**
- None of these.


#### Computing information for neural spike trains

Until now, we've dealt with single spikes and firing rates, but not with spike patterns.

##### Computing information for spike patterns

The idea is to discretize the cell response in bins of width \\(\Delta t\\) and chunk it in binary words to length \\(L\\).

w = [0, 1, 1, 0, 0, 0, 0]

Present a long random stimulus, and slide a window of width \\(L\\) over the response recordings to build a histogram of the frequency of all words encountered. 

It results in the probability distribution of words \\(p(w)\\). 

We can then compute its entropy: \\(H(w) = -\sum\_\textrm{words}p(w)\textrm(log)\_2p(w)\\)

We also compute the noise entropy of that distribution. For that, the cell is presented with a stimulus that is repeated over many trials. One trial must be long and random. Then, we calculate the entropy of the response at the same offset t in all trials, and average all entropies over t: \\(H\_\textrm{noise}\\) becomes \\(\langle H\_{s\_t}\rangle\_t\\), which means \\(-\frac{\Delta t}{T}\sum\_t\sum\_r P[r|s\_t]\textrm{log}\_2P[r|s\_t]\\).

How to choose the timescale for the binning of the response track? We want a timescale just small enough that it still conveys all information about the stimulus.

Q: What does your intuition tell you about the time scale of this jitter?

- Some is to be expected as a result of noise inherent in neural activity. 
- Information about a stimulus can still be reliably transmitted if jitter exists. 
- The greater the width of this jitter, the less confident we are that the cell is accurately representing the stimulus. 
- **All of the above**

To determine the desirable width of the time bins and of words, we can maximise the information produced by the spike trains in function of (a) the bin width \\(\delta t\\) and (b) the word length \\(L\\).

One issue thus encountered is that of very long words: as we will certainly have few sampled of those, entropy will artificially drop. The solution is to predict the entropy at the limit by ignoring the entropy for very long words and extrapolating from that obtained from short words.

For the bin width, a limit appears below which shorter bins have almost no effect on entropy.

There is a large body of literature to deal with the limited amount of data available and still get information theoretic quantities.

##### Computing information for a single spike

How much does the observation of one spike tell us about the stimulus, assuming that we don't know what feature of the stimulus triggered it?

Like for spike patterns, we compute the general entropy of the responses with random input stimulus, and noise entropy with a specific stimulus. 

- In the random input case: 
 - Probability of a spike: \\(P(r=1) = \overline{r}\Delta t\\)
 - Probability of no spike: \\(P(r=0) = 1 - \overline{r}\Delta t\\) 
- In the repeated stimulus case:
 - Probability of a spike: \\(P(r=1|s) = r(t)\Delta t\\)
 - Probability of no spike: \\(P(r=0|s) = 1 - r(t)\Delta t\\)

where r(t) is the time-varying rate caused by the stimulus: 

Ergodicity: property of a random process for which the time average of one sequence of events is the same as the ensemble average.

Q: Can you recall how to compute the entropy of the response?

- Total entropy + noise entropy. 
- Total entropy / noise entropy. 
- Total entropy * noise entropy. 
- **Total entropy - noise entropy.**



#### What can information tell us about coding?
