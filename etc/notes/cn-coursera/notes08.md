---
layout: default
title: Lecture notes in Computational Neuroscience (Week 8)
mathjax: true
---

# Week 8: Supervised learning and operant conditioning

## Supervised learning

### Classification

Example: get a machine to distinguish images of faces from images of other objects.

The first step is to label the training samples that we already have, and see if the face images and other images cluster in their original N-dimensional space in a way that makes them linearly separable. New (unlabeled) samples can then be automatically clustered according to their position relative to the separator. 

Can neurons do linear classification?

The simple idealized linear neuron that fires an output spike when \\(\sum\_iw\_iu\_i \gt \mu\\) is called **Perceptron**.

#### Perceptron

The inputs \\(u\_i\\) of the perceptron are each -1 or +1, and the output is \\(v = \Theta\left(\sum\_iw\_iu\_i-\mu\right)\\) where \\(\mu\\) is the firing threshold and \\(\Theta\left(x\gt 0\right) = +1\\) while \\(\Theta\left(x\leq 0\right) = -1\\).

In words, if the weighted sum of inputs minus the threshold is more than 0, the output is 1, otherwise it's -1.

Q: What does \\(\sum\_iw\_iu\_i-\mu\\) define in the N-dimensional input space?

- A hypercube (a square in 2D space)
- A hypersphere (a circle in 2D space)
- **A hyperplane (a line in 2D space)**
- None of the above.

This hyperplane separates inputs which weighted sum is greeter than \\(\mu\\) from those with a weighted sum smaller than the threshold. The Perceptron defines two classes linearly separated by the hyperplane, so can perform linear classification.

##### Perceptron learning rule

Given input vector \\(\textbf{u}\\), the desired output \\(v^ d\\), and a learning rate \\(\epsilon\\), for each input vector, the weights and threshold of a Perceptron are learnt as follows:

- apply \\(\textbf{u}\\) and calculate \\(v = \Theta\left(\sum\_iw\_iu\_i-\mu\right)\\)
- calculate the output error \\(e = v^ d - v\\)
- adjust \\(w\_i\\) with \\(\Delta w\_i = \epsilon e u\_i\\)
- adjust \\(\mu\\) with \\(\Delta \mu = -\epsilon e\\)

##### Limitation of the Perceptron

There may be several hyperplanes that segregate both clusters, or there may be none. A Perceptron can't learn XORed data, for instance, as they are not linearly separable.

To keep using the Perceptron with linearly inseparable data, we can use multi-layered Perceptron. For instance, a two-layer Perceptron can compute XOR.

#### Continuous output with sigmoid units

If we want to upgrade from the discrete output of the Perceptron to a continuously valued output, we can replace the Perceptron's binary thresholding \\(\Theta\\) function by a sigmoidal output function: \\(g\left(x\right) = \frac{1}{1+e^ {-\beta a}}\\), where \\(\beta\\) controls the slope of the sigmoid. We have the output:

\\[v = g\left(\textbf{w}^ T\textbf{u}\right)\\]

The output is bounded and normalized as the function \\(g\\) is \\(\mathbb{R}\to\left]0,1\right[\\).

##### Learning Multilayer Sigmoid Networks

Multilayer networks can perform non-linear clustering. Networks with many layers are called **deep networks**. They can learn more complex features.

We consider a 3-layer sigmoid network:

- input: \\(\textbf{u} = \left(u\_1 u\_2 \cdots u\_K\right)^ T\\)
- hidden: \\(g\left(\textbf{w}^ T\textbf{u}\right)\\)
- output: \\(v\_i = g\left(\sum\_j W\_{ij}g\left(\sum\_k w\_{jk} u\_k\right)\right)\\) and \\(\textbf{v} = \left(v\_1 v\_2 \cdots v\_J\right)^ T\\)

\\(\textbf{d}\\) is the desired output of the network. We want to minimise the output error:

\\[
E(\textbf{W}, \textbf{w}) = \frac{1}{2} \sum\_i (d\_i - v\_i)^ 2
\\]

Q: Which of the following could you use to minimize the error function with respect to W & w? (Hint: Where have we seen the use of gradients before with respect to optimization?)

- Gradient maximization. 
- Gradient ascent. 
- **Gradient descent.**
- Gradient recursion.

Explanation: We used gradient ascent for maximizing the log posterior function in the Sparse Coding and Predictive Coding lecture. Here we use gradient descent for minimizing a function.

**Delta learning rule** for the output layer weights \\(\textbf{W}\\):

\\[
\begin{align}
\Delta W\_{ij} &= -\epsilon\frac{\textrm{d}E}{\textrm{d}W_{ij}}\\\\
&= \epsilon (d\_i-v\_i)g'\left(\sum\_j W\_{ij}x\_j\right)x\_j
\end{align}
\\]

The "delta" in "delta rule" comes from the naming of the error term \\(\delta = (d\_i-v\_i)\\) in the original presentation.

Applying gradient descent to the hidden layer rule gives 

\\[
\Delta w\_{jk} = -\epsilon\frac{\textrm{d}E}{\textrm{d}w\_{jk}}
\\]

But as the output error \\(E\\) is defined in terms of output neurons activities, while we want to take the derisive in terms of hidden layer weights, we have to chain the derivation. This results in the **backpropagation rule**:

\\[
\Delta w\_{jk} = -\epsilon\frac{\textrm{d}E}{\textrm{d}x\_{j}}\frac{\textrm{d}x\_j}{\textrm{d}w_{jk}}
\\]

This expression shows the propagation of the output error down the chain of layers of the network.

###### Example: truck parking

Input of the network: position and angle of truck.  
Output: steering angle that the truck should use to back into a loading dock.
Training: records of successful human trials (mini-game)

## Reinforcement learning

Supervised learning is not exactly accurate for most human learning, as there is often no explicit supervision, but trial and error. More or less reliable rewards and punishments are the usual signals that help humans learn, and reinforcement learning models that.

        +-----+---> AGENT -------+
        |     |                  |
        |     |                  |
        u     r                  a
    (state) (reward)         (action)
        |     |                  |
        |     |                  |
        +-----+- ENVIRONMENT <---+

The agent interacts with its environment by performing actions \\(\textbf{a}\_t\\). The agent's state in the environment is a vector \\(\textbf{u}\_t\\) (ex. location of the rat in the barn), and the agent may receive at any point a reward from the environment (scalar \\(r\_t\\), may denote food intake when positive and an encounter with a cat when negative). In reinforcement learning, the agent needs to select the best action maximizing the total expected future reward.

Classical Pavlovian conditioning experiments (bell followed by food learnt; dog salivates with bell only). The conditioned stimulus predicts the future reward, but how to predict rewards delivered _some time after_ a stimulus presentation?

### Learning to predict future rewards

Given many trials of T time steps. The time within a trial is indexed by \\(t \in [0, T]\\). At each time step, there is a stimulus \\(u(t)\\) and a reward \\(r(t)\\).

We would like a neuron with output \\(v(t)\\) predicting total future reward from time t:

\\[v(t) = \langle \sum\_{\tau=0}^ {T-t}r(t+\tau)\rangle\_\textrm{trials}\\]

One possibility would be to predict based on all past stimuli \\(u\\) (tapped delay line). For instance here with a linear filter:

\\[v(t) = \sum\_{\tau=0}^ {t}w(\tau)u(t-\tau)\\]

Learning by minimizing the error function \\(\left(\sum\_{\tau=0}^ {T-t}r(t+\tau) - v(t)\right)^ 2\\) brings a problem: we only have \\(r(t)\\), but not \\(r(t+1)\\), \\(r(t+2)\\), etc.

Q: Can you speculate on how we can minimize this error function?

- Replace the future terms with r(t+1), which is a good approximation. 
- Replace the future terms with u(t+1), which is a good approximation. 
- **Replace the future terms with v(t+1), which is a good approximation.**
- There is actually no approximation to this error function.

#### Temporal Differences learning

The key idea to solve that is to notice that \\(\left(\sum\_{\tau=0}^ {T-t}r(t+\tau) - v(t)\right)^ 2 = \left(r(t) + \sum\_{\tau=0}^ {T-t-1}r(t+1+\tau) - v(t)\right)^ 2\\) and approximate \\(\sum\_{\tau=0}^ {T-t-1}r(t+1+\tau)\\) with \\(v(t+1)\\). The approximate error function

\\[\left(r(t) + v(t+1) - v(t)\right)^ 2\\]

can now be minimized by gradient descent. This is the **Temporal Differences** learning rule:

\\[
\Delta w(\tau) = \epsilon(r(t) + v(t+1) - v(t))u(t-\tau)
\\]

where \\(r(t) + v(t+1) - v(t) = \delta\\) is the error term, \\(\epsilon\\) is the learning rate, and \\(u(t-\tau)\\) is the input. Note that \\(r(t) + v(t+1)\\) is the expected future reward and \\(v(t)\\) is the prediction, so \\(\delta\\) is really computing a prediction error.

The term "temporal differences" comes from the expression \\(v(t+1) - v(t)\\) in the error term.

Example: stimulus at \\(t=100\\) reward at \\(t=200\\). The error term propagates trial by trial, from 200 back to 100, and the output v, that was totally inactive at trial 1, becomes active from \\(t=100\\) to \\(t=200\\) once learning is done. Once the learning is finished, the prediction error peaks at \\(t=100\\), corresponding to \\(r(100) + v(101) - v(100)\\).

There are recordings from dopaminergic neurons in the Ventral Tegmental Area of monkeys with an output similar to the \\(\delta \\) reward prediction error term: peak output around the time of the reward before training, peak output around the time of the stimulus after training.

Q: What do you think is going to happen to the response in the ventral tegmental area (VTA) if you omit the reward (as predicted by the TD model)?

- We will see a drastically increased firing rate. 
- **The firing rate will drop below the baseline firing rate.**
- The firing rate will slightly increase at a slightly later time. 
- Nothing.

When a reward is missed, dopaminergic VTA cells respond as predicted by the TD model: with a negative error term. As \\(r(t)=0\\) and \\(v(t+1)=0\\), \\(r(t) + v(t+1) - v(t) = - v(t)\\)

### Using reward information to select actions

In the Reinforcement Learning model, the agent measures at each time t the state u and reward r from the environment and can perform an action a, changing the environment.

Which action to take given a particular state? The problem is that of learning a state-to-action mapping  \\(\pi(\textbf{u}) = \textbf{a}\\) (policy) that maximizes total future reward \\(\langle \sum\_{\tau=0}^ {T-t}r(t+\tau)\rangle\_\textrm{trials}\\)

###### Example

A rat in a binary tree maze with 4 rewards (0, 5, 2, 0). The rat has to decide the action L (left) or R (right) at the root node A and one of the two subsequent nodes B (leading to 0 and 5) and C (to 2 and 0).

What are the states and actions in this reinforcement learning problem? 

- States: Left, Right; Actions: A, B, C 
- States: A, B, C; Actions: Left, Right, 0, 5, 2 
- **States: A, B, C; Actions: Left, Right**
- States: Success, Failure; Actions: Eat, Do Not Eat

Q: With a random policy, what is the expected reward (_value_) for each state?

- A: 3, B: 4, C: 5
- A: 5, B: 5, C: 0
- A: 2.5, B: 5, C: 0
- **A: 1.75, B: 2.5, C: 1**

#### Policy evaluation with Temporal Differences

The agent can learn the value of states using TD. 

Let the weight \\(w(u)\\) represent the value of state \\(u\\). The TD learning rule is used to update \\(w(u)\\):

\\[
w(u) \gets w(u) + \epsilon(r(u) + v(u') - v(u)))
\\]

where v(u) is the expected reward for the current state and v(u') is the expected reward for state \\(u'\\) resulting from taking an action from state \\(u\\): \\((u,a)\to u'\\).

TD learning of the expected values of a random policy in the binary decision tree example leads to the running average of \\(w(A)\\) oscillating around 1.75 after 15 trials, and \\(w(B)\\) and \\(w(C)\\) around 2.5 and 1 after a bit less time (\\(\epsilon = 0.5\\)). This correspond tot the correct values.

Armed with TD learning of the expected value of actions, the agent can now choose the action with the highest expected value.

Hence, the **values are surrogate immediate rewards**. Locally optimal choices lead to a globally optimal policy in Markov environments (i.e. where the next state only depends on the current one and the action taken) (cf. Dynamic Programming). 

### Actor-critic learning

We conceptualize our system as composed of two components: an actor, selecting actions and maintaining the policy, and a critic that maintains information about the value of each state. 

#### Algorithm

Repeat the two following steps until convergence:

##### 1. Critic learning

The critic performs policy evaluation. Critic learning follows the TD rule: for the value \\(v(u) = w(u)\\) of state \\(u\\),

\\[
w(u) \gets w(u) + \epsilon(r(u) + v(u') - v(u))
\\]

##### 2. Actor learning

The actor probabilistically selects an action and improves the policy. The probability to select action \\(a\\) at state \\(u\\) is the softmax function

\\[
P(a;u) = \frac{e^ {\beta Q\_a(u)}}{\sum\_b e^ {\beta Q\_b(u)}}
\\]

where \\(Q\_a(u)\\) is the value of a state-action pair \\(\langle u,a \rangle\\).

The probabilistic softmax selection method allows randomly exploring the environment. The higher \\(\beta\\), the less random the decision (actions with higher \\(Q\\) get selected).

Having selected an action, the following rule updates the \\(Q\\) values of all actions \\(a\\)':

\\[
Q\_{a'}(u) \gets Q\_{a'}(u) + \epsilon(r(u) + v(u') - v(u))(\delta\_{aa'} - P(a';u))
\\]

\\(\delta\_{aa'}\\) is the Dirac delta function equal to 1 iff \\(a=a'\\), so \\(\delta\_{aa'} - P(a';u)\\) is positive only when \\(a=a'\\), and negative otherwise. The Q value is only increased when \\(a\\) leads to a greater reward than expected, and decreased if the reward is less than expected.

#### Example

In the rat's binary decision tree maze, the Actor-Critic learning  performs as expected.

Q: Why does it take the algorithm longer to learn that "left" is the best action for C? 

- C is furthest from the start of the maze. 
- **The algorithm chooses "left" at A a majority of the time. **
- It did so just by chance. 
- None of the above.

The decision probabilities for the more often visited nodes converge faster to their asymptote than those of the less valuable nodes. A lower \\(\beta\\) parameter would even out the convergence times.

The Basal Ganglia is hypothesized to implement an Actor-Critic model, with a rough mapping of nuclei and areas to elements of the model, and (again) dopamine representing the TD error.

### Applying reinforcement learning to real world problems

See the [Stanford University autonomous helicopter](http://heli.stanford.edu/).
