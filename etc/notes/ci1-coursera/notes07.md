---
layout: default
title: Lecture notes in Computational Investing (Week 7)
mathjax: true
disqus: true
---

# Week 7: Information Feeds and Technical Analysis

## Information feeds in real life
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=211)

Selection of information feeds:

* Thomson Reuters Machine Readable News
* StarMine
* InsiderInsights

They cost between $20k and $100k per year.

To choose an information feed to be part of a price prediction system, it should come:

* with historical data -- the historical track record is necessary for backtesting
* survivor bias free -- include stocks that are dead to avoid bias in back-tests
* with an API or generally in the format that allows integration with your system
* with a low latency is a key component. The utility of information decays quickly

### Thomson Reuters Machine Readable News

It's a streamed XML broadcast of **news** with full text and metadata (symbol tag, valency, etc). Servers in world's major news centres: NYC, London, Chicago, Washington DC, and connections at exchanges with very low latency.

How to use it? If there is a valency tag and historical news feeds, then **events could be extracted from feeds, and used in event studies**.

### StarMine by Thomson Reuters

It's an interesting prediction feed. It generates a daily signal of **predicted future changes in analyst sentiment**, with updates of taking analysts' revisions into account.

Analysts are people (usually at investment banks) specialised in providing information about specific stocks to banks and their clients. They assess the viability of companies and predict the expected returns of their stocks. These analysts' assessments are then compared to real earnings announcements, so the accuracy of each analyst's prediction for each stock is known.

StarMine assesses the accuracy of analysts and build estimates of earnings based on that, and build an analyst revision model: they use changes in analyst predictions (assumed to reflect the analyst's sentiment) to predict changes in stock prices.

### InsiderInsights 

They monitor the market behaviour of company insiders. For instance, when a CEO sells or buy stock, they are required to file the information publicly. This behaviour may be predictive of company performance. InsiderInsights is a daily information feed of such information with a significance assessment.

Like with other seeds, we can make event studies with it. Lucena Research made two event studies with that data. One with a bin of buying events, one with a bin of selling events. 

The buying event study gives maybe +2% over 13 days, but more interestingly, there is a drop in price before the buying event. This is because there is a delay between transaction, information disclosure, and public awareness. There is a delay before the action of the insider and the public filing, and an additional delay between filing and recording, which makes the event. Years ago, this filing-recording delay was large and data was only published weekly. Now, it's daily, and as this delay shortens, the pre-event "dip" artefact should diminish.

Insiders selling may imply that insiders lose confidence in the company. The selling event study reveals that the selling event is less significant than the buying event. This is because selling happens more often for other reasons than a change in confidence: options vesting, selling because they need cash, etc. Buying is a less ambiguous move because it can't be a forced move.

## Information and technical analysis
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=175)

Different versions of the Efficient Markets Hypothesis allow for different sorts of information to be valid. The strong version does not allow for any intrinsic potential information in price data. Technical analysis assumes that the strong efficient markets hypothesis is false, and that there is exploitable information in historical price and volume data. 

Technical analysis consists in computing indicators. Those *technical indicators* are formulas that result in informative numbers, for price prediction. They can be intraday, daily, etc. They are heuristics.

### Are they information, do they have value?

Technical analysis is controversial. It's only valid is there is information in the historical data, and that information can be exploited thanks to markets being not fully efficient. If such is the case, then that information can be exploited to make forecasts.

It might be argued that analysing the value of technical indicators over a large timespan can reveal their value. Dr Balch and his students did that and came to the following conclusions:

* Technical indicators were predictive in the 1980s, 1990s, but are not very predictive nowadays. This is probably because market efficiency has increased, in part because more people exploit technical indicators.
* Some indicators have a weak predictive power, often not sufficient to overcome transaction cost or market impact. So, the prediction is accurate but unprofitable.
* Combined technical indicators provide predictive power (while 20 years ago, one indicator was good enough).
* One way by which an indicator is useful is when the heuristics captured are correct, but another way is when the indicator is believed correct by many people, and its predictions are acted upon regardless of the intrinsic correctness of the indicator. It's a self-fulfilling prophecy.
* Another useful use of technical indicators is to contrast its predictions to a stock's behaviour. If the predictions are going one way, and the stock goes contrary to them, it's a good indication that something interesting happens, and potential value there.


### How does it work?

Technical indicators are heuristics based on psychology. For instance, if a stock is at an all-time high, investors may be more likely to want to sell. That can be be captured by a technical indicator reflecting a likelihood to go down. Each technical indicator represent some person's idea of the irrational price-based behaviour of markets. Combining technical indicators is a bit like combining analyst estimates, it can improve the predictive power.

Technical indicators also reflect "market physics". There are limits to how quickly a price can move, the market tends to overreact, etc. Technical indicators capture those insights.

### References

[1] Technical Analysis, Martin Pring  
[2] Investopedia  
[3] Wikipedia

[1] defines technical analysis as a tool to identify *trend reversal* early on and ride on this early insight until the trend has reversed. 

Technical analysis assumes that investors repeat past mistakes, for instance their emotional investment decisions.

[1] classifies indicators as either:

* *sentiment indicators* that reflect the emotional response of investors
* *flow-of-funds indicators* that relate the amount of money flowing in and out of an equity to the capacity of the market to absorb those flows ("overbought/oversold" equities are estimated using these types of indicators)
* *market structure indicators* based on price and volume

### Dr Tucker's insightful opinion

The shorter the timescale, the more valuable the market structure technical indicator. In the millisecond range, price and volume and order book information can predict the next movement. The shorter the time period, the less complicated the strategy needs to be (the problem is shifted to execution). The longer the time period, the mode intelligent the forecast must be. The longer the time period, the more exogenous is information that drives prices. Hence, automatic trade can only really work on shorter time periods.

### Examples of technical indicators
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=177)

Technical indicators often capture the idea that there is some underlying equity value of an equity, and the price is not aligned with that underlying value. With a good estimate of the true value, a deviation can be used for profit.

This type of trend (fluctuations around a true value) is called a *mean reversion* (because the true value is often captured as some sort of mean, which makes some sense if we assume that the prices always comes back to that true value, although it sounds a little like circular reasoning imo).

Many platforms have technical indicators built-in. Google finance has some.

#### Simple moving average -- SMA

SMA, parametrized by the time period of the averaging window is often used to as follows: when the price goes below the SMA, it's taken as an indication that an upward trend has reversed, and when the price goes above the SMA, that a downward trend has reversed. The averaging window can **not** centred on the day, of course, it is only looking in the past.

Thus, the SMA is used as a proxy for the underlying true value of the equity. 

#### Moving average convergence-divergence -- MACD

MACD looks at a SMA over a long period, a SMA over a short period, and their differences called exponential moving average period or EMAP. E.g, one over 26 days and one over 12 days.

When the fast SMA crosses up the slow SMA, it's a "golden cross" indicating a buying opportunity. When the fast SMA becomes slower than the slow one, it's a "dead cross" and a sell signal.

#### Bollinger bands / Homework 

Bollinger bands around a SMA indicate a stock's volatility by reflecting the standard deviation of the price over a parameter able number of past days. They expand when price is more volatile and contract when it's not. The idea is that when a stock crosses its top band, it has been overbought, and when it crosses the lower band, it has been oversold.

**It is important to convert price info and so on to standard units, for instance, a $$[-1, 1]$$ range.**

[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=179)

Bollinger bands are computed by looking back over $$N$$ days, calculating the SMA and standard deviation of price over those $$N$$ days. The bands are $$\text{SMA}_N \pm k\sigma_{N}$$ for a factor $$k$$. If we convert data so as the bands for $$k=1$$ are always $$-1$$ and $$+1$$, then we can just carry one number, the converted price, and implicitly get the Bollinger bands signal for all values of k. 

The idea that John Bollinger had was that a technical indicator should adapt to a stock's volatility.

##### How to compute Bollinger bands

1. Read historical price data
2. Let $$\text{mid} = \text{rolling mean over the loopback period}$$
3. Let $$\text{std} = \text{rolling stdev over the loopback period}$$
4. $$\text{lower BB} = \text{mid} - \text{std}$$
5. $$\text{higher BB} = \text{mid} + \text{std}$$
6. Normalisation, to convert the data to -1 and 1 Bollinger bands: $$\text{Value} = \frac{\text{price} - \text{mid}}{\text{std}}$$

Note: Pandas, NumPy have rolling statistics, so it's not necessary to reinvent the wheel.
