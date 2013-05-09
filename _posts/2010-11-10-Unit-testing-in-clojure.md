---
layout: post
title: "Unit testing in clojure: mocking and lazy evaluation, atticus.mock and overloaded functions"
---

I originally [posted this text](http://agravier.blogspot.com/2010/11/unit-testing-in-clojure-mocking-and.html "Permalink to the original post of Unit testing in clojure: mocking and lazy evaluation, atticus.mock and overloaded functions") on my previous blog. I have copied it here in an effort to gather some of my past writings on this website. 

---

As I am learning Clojure by practicing on the [Google AI Challenge][1], I want to unit test all of my code. The [clojure.test][2] namespace contains useful macros and functions to define tests and express assertion but lacks mocking facilities.
I need to count how many times the mocked function is called by the function under test. The [atticus][3] package serves this purpose, and I've been happy using it on the first few functions I made ([e.g.][4]).

Yet, I quickly faced a couple of issues due to my extreme noobitude. I will present them here along with the resulting noobish solutions with which I came up.

### Atticus and overloaded functions

  
With atticus, how can one mock an overloaded function?  
Well, it turns out that you can't write
  
{% highlight clojure %}
(atticus.mock/expects
   [(update-game-state [a b] (atticus.mock/times 3))
    (update-game-state [a b c d] (atticus.mock/times 2))]
   (call-tested-f))
{% endhighlight %}

A workaround is to write:

{% highlight clojure %}
(atticus.mock/expects
   [(update-game-state [a b & rest] (atticus.mock/times 5))]
   (call-tested-f))
{% endhighlight %}

### Testing and lazy evaluation

  
The mock (whether created by rebinding the mocked function var manually or with atticus) may prevent lazy sequences from being realized. Consider:

{% highlight clojure %}
(defn mocked-f [n] (inc n))
(defn tested-f [v] (map mocked-f v))
(deftest tested-f-t
  (atticus.mock/expects
   [(mocked-f [n] (atticus.mock/times 3))]
   (tested-f [1 2 3])))
{% endhighlight %}

That test fails:

<div class="highlight"><pre><code>user> (tested-f-t)
 
FAIL in (tested-f-t) (mock.clj:27)
Expected 3 calls to mocked-f. 0 seen.
expected: (= actual expected)
  actual: (not (= 0 3))
nil</code></pre></div>
  
To solve that, you need to force the evaluation of the whole lazy sequence. I know this, but the revelation for me was that you can use `doall` at any level: it does not have to be directly applied to (in this case) the map function within the tested function (which would be highly inconvenient), but can be applied to the call to the tested function in the test. In retrospect, that makes sense, even without looking at the defintion of doall, as there is no reason to define it for each lazy seq generating function.

{% highlight clojure %}
(deftest tested-f-t
  (atticus.mock/expects
   [(mocked-f [n] (atticus.mock/times 3))]
   (doall (tested-f [1 2 3]))))
{% endhighlight %}
  
I'd like to thank **hugod** and **lpetit** on #clojure for their advice and for reminding me about lazy evaluation.

 [1]: http://ai-contest.com/
 [2]: http://richhickey.github.com/clojure/clojure.test-api.html
 [3]: https://github.com/hugoduncan/atticus
 [4]: https://github.com/agravier/mercure/blob/master/test/mercure/test/core.clj#L73  
