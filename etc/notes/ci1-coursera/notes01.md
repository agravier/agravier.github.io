---
layout: default
title: Lecture notes in Computational Investing (Week 1)
mathjax: true
disqus: true
---

# Week 1: Introduction, hedge funds, and markets basics

## Introduction
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=35)

The course aims at understanding markets and their data. We will write visualisation and discovery software and create a market simulator.

A good source of knowledge: [wiki.quantsoftware.org/](http://wiki.quantsoftware.org/).

### Portfolio managers
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=3)

They do a data-driven, quantitative job.

Portfolio managers are paid

* either as part of the expense ratio (mutual funds, ETF): the expense ratio is typically less than 1% of the whole fund value, and the manager's salary is part of it,
* or by the *two and twenty* (hedge funds): 2% total assets value + 20% of profits.

The two and twenty incentivises increasing total yearly returns. The main goal of a mutual fund manager is to attract investors, so the salary being part of the expense ratio is a good incentive.

### Attracting investors

#### Who?

* Individuals
* Institutions (majority)
* Other hedge funds!

#### How to convince them to invest?

The track record is the first argument. Hedge funds are often started by past employees of other hedge funds. 

You can also develop a compelling strategy (story), and perform simulations (*back tests*). It's a challenge to convince investors based on back tests.

Think about the psychology of investors: they like to fit their
investments into pigeon holes, to label them. You need to convince the
investors that you are in a certain pigeon hole, that you've got that
label covered.

When deciding to invest in your fund, the investors look for:

* A benchmark-based performance, or
* Absolute returns

To convince investors, you need to compare similar portfolios fitting in the same pigeon hole, using relevant benchmarks. Benchmarks are usually market indices, and the goal is to show to the investors that your hedge fund is doing better than those benchmarks.

Another compelling argument is *absolute return*: a steady positive return, maybe lower, but with lower risk.

## Quantitatively assessing fund performance

The evolution of the fund value is compared to the evolution of the value of an index. It's 2 graphs superimposed. We can visually compare trends, volatilities, and so on, but quantitative comparisons are more useful.

### Metrics
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=9)

* Daily return: \\(\frac{\text{value(day)}}{\text{value(previous day)}}-1\\)
* Drawn-down: Take a high point's value \\(h\\),  take the next low point's value \\(l\\), the draw-dawn is \\(1-\frac{l}{h}\\)

Reward metric:

* Annual return: percentage of profit in a year. \\(\frac{\text{value(end)}}{\text{value(start)}}-1\\) (all returns are calculated like that)

Risk metrics:

* Standard deviation of daily return, indicating volatility
* Max draw-down: over a period of time, what was the largest loss of value (in percentage)
* Average draw-down: on average, how much (as a share of the overall fund size) the value goes down when it does.
* Beta: volatility in comparison to the market as a whole. \\(\beta=0.5\\) means that the security's volatility is 50% that of the market.

Risk-adjusted performance metrics:

* Sharpe ratio: how much reward for how much risk: \\(\frac{\text{reward}}{\text{risk}}\\)
* Sortino ratio: same, but only using a measure of downward volatility.
* Jensen's alpha: average return on a portfolio over and above that predicted by the capital asset pricing model (CAPM), given the portfolio's beta and the average market return. 

#### The Sharpe ratio
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=11)

Ubiquitous measure of asset performance, meant to tell us how well an assets perform given an amount of risk taken. A higher Sharpe ratio is better: for two assets with the same return, the one with a higher Sharpe ratio would give more return for the same risk.

It was invented to differentiate which portfolio is better in cases of similar return performance.  

The original definition was:

\\[
S = \frac{E[R-R_f]}{\sqrt{\text{var}[R-R_f]}} 
\\]

\\(R\\) is the return of the asset,
\\(R_f\\) is the risk-free return, like Libor or some very low-risk asset.

Nowadays, the \\(R_f\\) component is often ignored, and the Sharpe ratio is computed as

\\[
S = k\frac{\mathtt{mean(d)}}{\mathtt{sd(d)}} 
\\]

where ``d`` is the series of daily returns (``d[i]`` the daily return for day ``i``), ``sd(d)`` is the measure of standard deviation of daily returns, and \\(k=\sqrt{250}\\) for the number of trading days in a year.

#### Practical basic data manipulation

[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=13)

Yahoo Finance -> search a symbol -> Historical prices on the left -> Daily, Download spreadsheet

The columns are

* Date
* Open: value at the opening of the day
* High: highest during the day
* Low: lowest during the day
* Close: value at the end of the day
* Volume: number of shares traded that day
* Adj Close: Adjusted close (something about dividends)

We need to look at adjusted close values to calculate daily returns (the first day's daily return is 0). From there, calculate the avgerage daily return, its stdev, and Sharpe ratio like above.

## The mechanics of the markets

### Order types on stock markets
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=39)

Orders are sent to brokers, because direct trading on major stock exchanges is not allowed. Brokers have a computer on the exchange that makes orders available.

An order needs 5 things: 

* symbol, 
* order (buy/sell)
* (market/limit):
  * market order: take the best price currently available
  * limit order (preferable): maximum price for buying, minimum for selling
* number of shares

example: IBM, buy, market, 100, N/A

### Order books at exchanges
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=41)

The order book is a pair of price-ordered lists (there is one such pair for each symbol on the market) representing all limit orders. 

* the list **ask** prices, listing tuples containing, for each selling price level and each seller, the number of shares available. For one price level, the sellers are ordered FIFO
* the list of **bid** prices, listing the same tuples for sellers.

The **spread** is the gap between the lowest ask and the highest bid.

**Crossing the spread** refers to increasing an bid price to meet an ask, or vice versa.

### Price movements

If the lowest ask has, 1000 shares available at $10.00, with the next ask being at 10.05, and a bid comes for 1100 shares at that $10.00, then the buy order is executed *with all 1000 shares at $10, plus 100 shares at 10.05, making the effective aggregate buy price 10.0045455. On the order book, it results in an increased price, so lots of buying drives prices up by that mechanism

The reverse happens symmetrically. Lots of selling drives prices down.

When observing a lot more asks than bids, we can **predict** that the price will be driven down, as sellers will be more likely to cross the gap. When there are more bids than asks, we can predict that the price will be driven up.

### Exchange infrastructure

Traders are connected to brokers, who are (sometimes directly) connected to exchanges. The orders from traders are quite often directly fulfilled within the broker, never going to the exchange. It's more interesting to realise orders in house when possible because:

* the realisation of an order on an exchange has a cost
* if the highest bid is higher than your ask price, for instance, that's easy profit for the broker!

The brokers may be connected to exchanges through market makers. So there is another possibility that those market makers fulfil the orders internally. They get orders from several brokers, so they can also match and make profits before the market receives orders.

Although the market only accept market and limit buy or sell orders, the brokers makes many other types of more complex orders available to the traders. Importantly:

* Sell short: a bet against a stock (you predict a price drop)
* Stop limit: put an order at a price threshold

### Shorting a stock

You (trader) believe that stock A will do down. 

1. Borrow 100 shares of A from someone
2. Sell them at $100, get $10000.

You now have the obligation to return 100 shares of A, and have also $10000.

3. If the price of A drops to $99, you can buy 100 shares for $9900 and return them to the lender, and keep $100 profit. If it goes up, you lose

An important aspect of shorting stock is that the potential benefit is limited to a maximum (if stock A drops to $0, you get $10000), but the risk is unlimited.

### How hedge funds work

#### Order book observation
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=43)

Exploiting imbalance (very fast): when there are more people willing to sell than to buy, shorting a stock would make sense. Hedge funds co-locate rack-space right in the exchange to have the lowest delay, measured in nanoseconds. Speed is the key to exploiting such imbalances.

Arbitrage: on two exchange, the order books may not match. If NASDAQ's lowest ask for IBM stock is lower than the NYSE's highest bid, the difference between the two is arbitrage profit for a hedge fund with machines co-located at both exchanges. Speed is again the key, and those hedge funds make markets very efficient. Fiber optics run between those two racks...

Hedge funds will also have computers right next to important information sources, with data sent OTA to their HQ in milliseconds.

In all those cases of HFT, the hard limits are the speed of information transmission (speed of light in fibres), and the speed of information processing.

#### The computing infrastructure at hedge funds
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=45)

Let's imagine a small, slow quant shop. They don't do HFT. They have a **target portfolio**, achievable from the **current (live) portfolio** by selling a number of some shares, and buying some others.

The **trading algorithm** is the central component of the infrastructure. It compares the target portfolio to the live portfolio, and sends orders to the broker to try to make the the live portfolio match the target one.

(note: in "portfolio notation", AAPL -100 means that we are or ()for a target portfolio) want to *be short* of 100 Apple shares (so to have borrowed and sold 100 Apple shares, so as to buy them back later for cheaper), and GOOG 50 means that we are/want to *be long* Google 50, so be in possession of 50 Google shares)

For a small portfolio, below $1m, the trading algorithm can just be "take the difference between the target and live, and send the corresponding orders." However, for a quant shop, the portfolio size and resulting magnitude of such orders would make the market move against the intended goals. So, the trading algorithm will split up the change in lots of small orders spaced out in time, to avoid strongly affecting the market. Trading a large value in a block instead of spaced out in chinks over several days is called **fat fingering** a trade.

The target portfolio is calculated using a **forecast** (machine- or people-generated). The **portfolio optimiser** is an algorithm that combines the current portfolio, the forecast data, and **historical prices**, to come up with the target portfolio. The historical data is used to balance the portfolio and reduce volatility: typically, we want to acquire some stock that is counter-cyclical to those we are about to trade, and historical data reveals that. The portfolio optimiser also considers **risk constrains**.

A machine-generated market forecast is the output of a **forecasting algorithm** which may use Machine Learning techniques to come up with forecasts (See Computational Investment Part 2 on Coursera). The forecasting algorithm takes in an information feed (usually quantitative), and using historical data, makes a forecast.

In the context of HFT, the architecture is quite different, but the external information feeds are there, and they are optimised for speed. Thompson Reuters has a service that sends a single TCP packet to your rack at the exchange, with the stock symbol and a valency flag (good/bad news).

Low-frequency trading information feeds are **analysts estimates**. It's not unusual to further model the quality of analyst estimates and to take that information into account in the forecasting algorithm.

## Interview with Paul Jiganti

Paul Jiganti is managing director for the market structure at TDAmeritrade. Used to be Market Maker.

### A client makes an order...
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=133)

A **trailing stop order** it an order to have a limit order that follows the stock price while it raises but remains a little below, and stops moving when the stock starts to decrease. When the stock crosses the (now fixed) order, it gets triggered. Then, the order is sent as a market order to a market maker, which will represent it from a coloc on the market. The MM tests the order against their pricing mechanism and decides the best price for that order. For instance, if the MM has an agreement that the market orders have to always trade even if the MM takes a loss at it, so they set it one cent below the lowest ask (they're not allowed to set it lower). Or they go to a dark pool, print (**printing an order to the tape** means publicly documenting its execution) it there at a slightly better price than the market's current lowest ask.

[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=135)

A **dark pool** (alternative liquidity pool) allows the market maker to interact with an entire order. The MM operates the dark pool, does the orders matching internally, offers better prices than the market, and does some profit on the internal spread. The MM often generates its own orders to match the ones from brokers that do not have a pendant. They take a (very very calculated) risk in doing so. The cask majority of orders are filled within dark pools.

If the MM decides that it doesn't want to fulfil an order internally, it sends it to an exchange. There, a **matching engine** does the matching between the order and the **top of the book**.

An order is tagged with a unique ID by the broker right when it's made. The unique ID is transmitted along with the order all the way to the exchange, and when the trade is executed, the ID returns to the initial broker via two paths (redundancy for better safety).

In an exchange, the MM has to have a **resting bit**. Not too much info about that.

## Something goes wrong
[(watch section)](https://class.coursera.org/compinvesting1-003/lecture/view?lecture_id=137)

In the morning, when a market opens, there is an **opening cross**: the initial price of stocks is sent to all participants. Before opening, there are standing limit and market orders. The matching engine does its job, and when it stops matching, the starting price has been determined. All executable orders are executed at that initial price.

The initial public offering of stock happens in the same way, although not necessarily at the beginning of the day. The same matching process takes place.

The Facebook IPO crashed the servers due to too many orders. 

A computer glitch happened at the NYSE with the retail liquidity program. New software had to be written for Aug 1 to support a new order type, and Knight only deployed it properly on 7 of 8 servers there. It resulted in a hard to detect bug and a loss of $10m/min for 40 minutes.

## Vocabulary:

Stock: potential residual value of a company after virtual instant liquidation

Share: a part of a company's stock

Security: tradable asset (synonym: financial instrument) (stocks, debts, bonds, forwards, futures, options, swaps and other derivative contracts are all examples securities)

Stock market index: computed number estimating the value of a section of a stock market

Fund: Collective investment scheme 

Index fund: fund that aims at mimicking a stock index throughout a     representative sampling of the securities

Mutual fund: collective investment vehicle for securities (open-ended investment companies, SICAVs, unitised insurance funds, unit trusts, UCITS are types of mutual funds) -- hedge funds excluded

Exchange-Traded Fund (ETF): fund that is traded on a stock exchange

Hedge fund: Fund with more aggressive strategies and bigger clients (?)

Management expense ratio: Percentage of yearly operational expenses, calculated as ratio of operating expenses to average dollar value of assets. Trading activities (sales commissions, loads) are not included in operating expenses.

Sales commissions: front-end (?) charges paid when trading a fund 

Loads: back-end (?) charges paid when trading a fund

Two and twenty: refers to how hedge fund managers charge 2% of total asset value + 20% of all profits.

Back tests: investment simulations

Benchmark fund: fund bases its performance measure on an index

Absolute return fund: fund that bases its performance on steady, low-risk positive return
