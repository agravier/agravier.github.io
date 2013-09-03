---
layout: default
title: Lecture notes in Computational Investing (Week 2)
mathjax: true
disqus: true
---

# Week 2: Company value, stock prices, and the Capital Assets Pricing Model

## Understanding how to value a company
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=47)

There are several ways to estimate the value of a company.

### Market cap

The **market cap** (market capitalisation) of a company is its share price times the numbers of shares. It's a straightforward way to estimate the company's value. 

But there are other ways. There have to be other ways, if we want to estimate if the stock price reflects the actual value.

### The value of future dividends

Example: the ACME dollar company is able to print one dollar bills on blank paper. It produces one dollar per year, indefinitely. What is it worth? Even though it will produce dollars forever, it's not worth an infinite amount of money.

We need to ask: **what is the value of these future dollars?** 

In other words, if someone *promises* an output of one dollar in the future (**dividend**), how much is that worth? How much money would you lend the ACME dollar company in exchange of that promise of getting back one dollar in one year?

One way to estimate that is to compare it to the money lent to a bank. How much are you willing to lend a bank in order to get a dollar in a year? Seeing that current interest rates are about 1%, you could expect to have to give about $0.99 in order to get back $1 a year later.

Assuming that you trust the bank more, the ACME dollar company would need to make a better offer than the bank to get you to lend  them money. If you are ready to accept 95 cents in exchange of ACME's remise of a dollar in the future, that means that the **discount rate** on that future dollar is 5.2% (\\(.95 + 5/95 * .95 = 1\\)). The **discount factor \\(\gamma\\)** (current-to-future value ratio) is 0.95.

Based on that information, the current value of $1 in 2 years is \\(.95^ 2\\); in \\(N\\) years, \\(.95^ N\\)

Hence,
 
\\[
\text{present value of dividend promises} = \sum\_{i=1}^ {\infty} d \gamma^ i 
\\]

where \\(d\\) is the dividend of $1, \\(\gamma\\) is the discount factor of \\(0.95\\), and the summation over \\(i\\) is a summation over the years.

The discounted present value of an asset's future income is called the **intrinsic value**.

There is an analytical solution to this simple power series:

\\[
\begin{align}
\text{intrinsic value} &= \sum\_{i=1}^ {\infty} d \gamma^ i \\\\
&= d \frac{1}{1-\gamma}
\end{align}
\\]

So, for ACME:

\\[\text{intrinsic value} = \dfrac{1}{1-0.95} = 20\\]

So, estimating the value of the ACME dollar printing company by the (subjective) value of future dividends yields $20.

### How information affects stock prices
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=49])

McKinlay introduced **event studies** in a seminal paper (MacKinlay, A. C. “Event Studies in Economics and Finance,” Journal of Economic Literature Vol. XXXV, Issue 1, 1997). They graphed the stock prices of companies around the time of news events (40 days centred window). They clustered the graphs by news valency: bad news for the company, good news  for the company, or random event unrelated to the company (control cluster). They then averaged each of the 3 clusters.

As expected, unrelated new have no impact on stock prices.

In the average case of bad news, the price starts dropping before the bad news is out, the biggest drop is on the day if the bad news, and there is a small recovery right afterwards.

In the case of good news, it's similar, also with an anticipated rise, but there is no bouncing back to lower prices after the news breaking peak.

#### Why do the news affect stock prices?

Let's imagine that the ACME dollar printing company needs a skilled CEO to generate its $1/year dividend. If news break about the effectiveness of the CEO, the profitability of the company is affected. Similarly, if news come out of concerning the cost of raw materials, same story.

News about future profitability strongly affect price.

That includes news about the economy, or more generally, about the environment of the company. The local (country, continent) economic news affect the local companies, and global economic news affect all of them. 

#### Why do we care what a company is worth?
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=51)

If we trust an analysis that informs us that the company is worth more than the current value of its stock, it may worth investing. It's another form of arbitrage.

### Book value 

book value = total assets minus intangible assets (contracts, etc) and liabilities (loans, etc)

If we split up a company and sell its parts, we get some money. The **book value** is the value of all the physical part of a company: the machines, the buildings, etc...

### Summing up

The value of a company = book value + intrinsic value

But the market is a very efficient information processor, the reaction to news reflects the potential future revenue of the company.

This is the **efficient markets hypothesis**: the market process information sufficiently rapidly to come to an equilibrium price that reflects the right value of the company.

The value of a company = number of shares \\(\times\\) price

This hypothesis entails that we can't beat the market in that regard, and as investors, we can't exploit the difference between the true of a company and its market cap, because it's null.

## The CPAM

### Overview
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=71)

The **Capital Assets Pricing Model** is a theory that is heavily used in fund management. Introduced in 1966 (Mossin, Jan. "Equilibrium in a capital asset market." Econometrica: Journal of the Econometric Society (1966): 768-783).

When comparing the price chart of Exxon Mobil (XOM) to that of the S&P 500, we note large regions where they are very correlated on a daily basis, and other regions where they are not. The CAPM is about modelling the factors that influence how the price of stock changes day-by-day.

We can observe that the most important factor of influence on a stock's daily price is the entire market. The CAPM says that the influence of the whole market on a stock's price is generally stronger than the small individual variations in stock price. The CAPM is a way to express and analyse that influence. 

CAPM had a large impact on finance, it kickstarted index investing. The CAPM implies that you're better off investing in a market portfolio rather than trying to pick a small number of stocks. This goes agains hedge fund and active portfolio management, where we assume that you can make money by picking individual stocks. The burden to prove it wrong is on us.

Let \\(r\_i\\) the daily return on a particular stock \\(i\\).

The CAPM assumes that **the daily return \\(r\_i\\) is compound of a systematic component that represents the influence of the whole market, and a residual component**:

\\[
r\_i = \beta\_i r\_m + \alpha\_i
\\]
 
where \\(r\_i\\) is the daily return on a particular stock, \\(r\_m\\) is the daily market return, \\(\beta\_i\\) factors how much the market return influences the stock's return, and \\(\alpha\_i\\) is the residual. As we could see on the XOM vs S&P500, alpha varies.

> The CAPM asserts that the expected value of the residual term \\(\alpha\_i\\) is 0, implying that there is no possibility to leverage information and make additional return.

The market's portfolio refers to a broad (representative) cap-weighted index. In the US, the Standard and Poor's 500 (S&P500) has the advantage that it is unbiased: it's the 500 largest US companies. The Dow Jones (DJ30) is a hand-picked sample of 30 companies, which may show some bias. In the UK, the FTA. Japan -- TOPIX. SPX/SPY are symbols that represents the whole market.

### Beta
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=73)

The CAPM considers that the residual \\(\alpha\_i\\) is akin to a random number with 0 expectation and non forecastable. The most important information is the \\(\beta_i\\) for the stock.

As the CAPM is a linear model \\(r\_i = \beta\_i r\_m + \alpha\_i\\) where we are trying to assess the factors \\(\alpha\_i\\) and \\(\beta\_i\\), a normal linear statistical regression of \\(r\_i\\) against \\(r\_m\\) should yield the slope \\(\beta\_i\\) and intercept \\(\alpha\_i\\) (which is positive for stocks that do better than the market). Each day yields a data point made of the market performance and stock performance that day. The scatter plot looks like an elongated Gaussian.

\\(\beta\\) and correlation are different: two equities can be equally correlated to the market and have different betas.

The correlation coefficient between \\(r\_i\\) and \\(r\_m\\) (\\(\text{cc} \in [-1, 1]\\) indicates the spread of the scatter cloud perpendicularly to the fitted CAPM line. Two lines could have the same slope, but the point cloud in one could be less spread than in the other.

* \\(\text{cc} = -1 \to\\) all data points aligned and \\(\beta < 0\\).
* \\(-1 < \text{cc} < 0 \to\\) data points scattered in an ellipsoid, and \\(\beta < 0\\). 
* \\(\text{cc} = 0 \to\\) points scattered in a circle and beta meaningless
* \\(0 < \text{cc} < 1 \to\\) data points scattered in an ellipsoid, and \\(\beta > 0\\). 
* \\(\text{cc} = 1 \to\\) all data points aligned and \\(\beta > 0\\). 

### How hedge funds use the CAPM
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=75)

CAPM implies that expected returns are proportional to \\(\beta\\), and excess return (above the market) is achievable if and only if \\(\beta > 1\\).

Naturally, a greater \\(\beta\\) also implies a greater risk.

The return of a portfolio \\(r\_p\\) is the sum of the returns of its components \\(r\_i\\) weighted by their proportions \\(w\_i\\) in value in the portfolio:

\\[
r\_p = \sum_i w\_i r\_i
\\]

Moreover, the beta of a portfolio is the sum of the betas of is components:

\\[
\beta\_p = \sum_i w\_i \beta\_i
\\]

Now, imagining that we have forecast information for one of those stocks; for instance, IBM will go up. That means that we have info on \\(\alpha\_\text{IBM}\\). But the final daily return for IBM \\(r\_\text{IBM}\\) is still mostly subject to market forces \\(\beta\_\text{IBM} r\_m\\), and if market conditions are unfavourable, the daily return will be negative regardless of the IBM forecast. Imagining that the market goes down: the \\(r\_\text{IBM}\\) will dive too, but less steeply than the \\(r\_\text{SPX}\\) thanks to the positive \\(\alpha\_\text{IBM}\\) (that we forecasted). And we can still make money on that differential by taking a long position in IBM and shorting the market. Let's run through that example:

* SPY is an ETF exactly representing S&P 500, that we can trade like stock. So, in the IBM example, let's imagine a portfolio made of 2 positions: IBM and SPY. 
* Let's assume that \\(\beta\_\text{IBM}=1\\) and  \\(\beta\_\text{SPY}=1\\), and let's have 50% of out portfolio in IBM, and 50% in SPY:  \\(w\_\text{IBM}=\dfrac{1}{2}\\) and \\(w\_\text{SPY}=\dfrac{1}{2}\\). 
* Now, **we short SPY: \\(w\_\text{SPY} \gets -\dfrac{1}{2}\\)**
* Let's calculate our daily returns for IBM and SPY:
\\[
\begin{cases}
w\_\text{IBM} r\_\text{IBM} &= w\_\text{IBM}\beta\_\text{IBM} + w\_\text{IBM}\alpha\_\text{IBM} \\\\
w\_\text{SPY} r\_\text{SPY} &= w\_\text{SPY}\beta\_\text{SPY} + w\_\text{SPY}\alpha\_\text{SPY}
\end{cases}
\\]
We have some of these numbers, and we further assume that \alpha\_\text{SPY} = 0, because it follows the market:
\\[
\Rightarrow
\begin{cases}
\dfrac{1}{2} r\_\text{IBM} &= \dfrac{1}{2} + \dfrac{1}{2}\alpha\_\text{IBM} \\\\
-\dfrac{1}{2} r\_\text{SPY} &= -\dfrac{1}{2}
\end{cases}
\\]
The portfolio return is thus:
\\[ 
\begin{align}
r\_p &= w\_\text{IBM} r\_\text{IBM} + w\_\text{SPY} r\_\text{SPY} \\\\
&= \dfrac{1}{2} + \dfrac{1}{2}\alpha\_\text{IBM} - \dfrac{1}{2}
&= \dfrac{1}{2}\alpha\_\text{IBM}
\end{align}
\\]
* So, our portfolio makes an amount of money proportional to the residual of IBM, regardless of the movements of the market: the IBM price line is always \\(\dfrac{1}{2}\alpha\_\text{IBM}\\) above the SPY price line, and that's where we make money. 
* The short SPY position just removes the market trend from our IBM bet.
  * If the market goes down, we lose money in IBM, but we gain more on our short position in SPY.
  * If the market goes up, we lose money on SPY, but we gain more on IBM.
* If worked for longing IBM which we though was going up, but it also works with shorting positions.

---

## Special module: QSTK
[(watch section for OS X)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=207)  
[(watch section for Windows)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=141)  

[((recommended) read the wiki)](http://wiki.quantsoftware.org/index.php?title=QSToolKit_Installation_Guide)

### Installing the dependencies

There are automated installation scripts that take care of dependencies:

[OS X](http://wiki.quantsoftware.org/index.php?title=QSToolKit_Installation_Guide_Mac) ([script](https://raw.github.com/tucker777/QuantSoftwareToolkit/master/MacInstallation.sh) (required: XCode, Homebrew))  
[Ubuntu](http://wiki.quantsoftware.org/index.php?title=QSToolKit_Installation_Guide_Ubuntu)  
[Windows](http://wiki.quantsoftware.org/index.php?title=QSToolKit_Installation_Guide_Windows)  

Manually: the requirements are:

**Python 2.7**

**Numpy**

**Scipy**

**Matplotlib**

**Pandas**

**Setuptools**

**CVXOPT**

**dateutil**

**Scikits**

**Statsmodel**

**QSTK**

I recommend installing everything in a [virtualenv](pypi.python.org/pypi/virtualenv) if you can. Manage your virtualenvs using [virtualenvwrapper](https://pypi.python.org/pypi/virtualenvwrapper).

### Testing the installation:

Download and uncompress the [examples](https://spark-public.s3.amazonaws.com/compinvesting1/QSTK-Setups/Examples.zip) archive, and run the *Validation.py* file.
