---
layout: default
title: The QuantSoftware numpy tutorial in IPython notebook
---

# The [Quantsoftware Numpy tutorial](http://wiki.quantsoftware.org/index.php?title=Numpy_Tutorial_1) as an IPython notebook

### Importing Numpy
The following loads the numpy library and lets us refer to it by the shorthand
"np", which is the convention used in the numpy documentation and in many online
tutorials/examples.

In[1]:

{% highlight python %}
import numpy as np
{% endhighlight %}

### Creating arrays
Now lets make an array to play around with. You can make numpy arrays in a
number of ways, Filled with zeros:

In[2]:

{% highlight python %}
zeroArray = np.zeros( (2,3) )
print zeroArray
{% endhighlight %}


    [[ 0.  0.  0.]
     [ 0.  0.  0.]]


Or ones:

In[3]:

{% highlight python %}
oneArray = np.ones( (2,3) )
print oneArray
{% endhighlight %}


    [[ 1.  1.  1.]
     [ 1.  1.  1.]]


Or filled with junk:

In[4]:

{% highlight python %}
emptyArray = np.empty( (2,3) ) 
print emptyArray
{% endhighlight %}


    [[  6.91997195e-310   1.84976122e-316   6.91997225e-310]
     [  2.17413192e-316   1.85928839e-316   1.06099790e-313]]


Note, emptyArray might look random, but it's just uninitialized which means you
shouldn't count on it having any particular data in it, even random data! If you
do want random data you can use random():

In[5]:

{% highlight python %}
randomArray = np.random.random( (2,3) )
print randomArray
{% endhighlight %}


    [[ 0.91253686  0.70331325  0.42053793]
     [ 0.47538373  0.96904519  0.06918147]]


If you're following along and trying these commands out, you should have noticed
that making randomArray took a lot longer than emptyArray. That's because
np.random.random(...) is actually using a random number generator to fill in
each of the spots in the array with a randomly sampled number from 0 to 1.

You can also create an array by hand:

In[6]:

{% highlight python %}
foo = [ [1,2,3],
        [4,5,6]]
myArray = np.array(foo)
print myArray
{% endhighlight %}


    [[1 2 3]
     [4 5 6]]


### Reshaping arrays
Of course, if you're typing out a range for a larger matrix, it's easier to use
arange(...):

In[7]:

{% highlight python %}
rangeArray = np.arange(6,12).reshape( (2,3) )
print rangeArray
{% endhighlight %}


    [[ 6  7  8]
     [ 9 10 11]]


there's two things going on here. First, the arange(...) function returns a 1D
array similar to what you'd get from using the built-in python function
range(...) with the same arguments, except it returns a numpy array instead of a
list.

In[8]:

{% highlight python %}
print np.arange(6,12)
{% endhighlight %}


    [ 6  7  8  9 10 11]


the reshape method takes the data in an existing array, and stuffs it into an
array with the given shape and returns it.

In[9]:

{% highlight python %}
print rangeArray.reshape( (3,2) )
{% endhighlight %}


    [[ 6  7]
     [ 8  9]
     [10 11]]


The original array doesn't change though.

In[10]:

{% highlight python %}
print rangeArray
{% endhighlight %}


    [[ 6  7  8]
     [ 9 10 11]]


When you use reshape(...) the total number of things in the array must stay the
same. So reshaping an array with 2 rows and 3 columns into one with 3 rows and 2
columns is fine, but 3x3 or 1x5 won't work

In[11]:

{% highlight python %}
print rangeArray.reshape( (3,3) )
{% endhighlight %}



    ---------------------------------------------------------------------------
    ValueError                                Traceback (most recent call last)

    <ipython-input-11-5ca65ad9b738> in <module>()
    ----> 1 print rangeArray.reshape( (3,3) )
          2 squareArray = np.arange(1,10).reshape( (3,3) ) #this is fine, 9 elements


    ValueError: total size of new array must be unchanged


In[13]:

{% highlight python %}
squareArray = np.arange(1,10).reshape( (3,3) ) #this is fine, 9 elements
print squareArray
{% endhighlight %}


    [[1 2 3]
     [4 5 6]
     [7 8 9]]


### Accessing array elements
Accessing an array is also pretty straight forward. You access a specific spot
in the table by referring to its row and column inside square braces after the
array:

In[14]:

{% highlight python %}
print rangeArray[0,1]
{% endhighlight %}


    7


Note that row and column numbers start from 0, not 1! Numpy also lets you refer
to ranges inside an array:

In[15]:

{% highlight python %}
print rangeArray[0,0:2]
{% endhighlight %}


    [6 7]


In[16]:

{% highlight python %}
print squareArray[0:2,0:2]
{% endhighlight %}


    [[1 2]
     [4 5]]


These ranges work just like slices and python lists. n:m:t specifies a range
that starts at n, and stops before m, in steps of size t. If any of these are
left off, they're assumed to be the start, the end+1, and 1 respectively

In[17]:

{% highlight python %}
print squareArray[:,0:3:2]
{% endhighlight %}


    [[1 3]
     [4 6]
     [7 9]]


Also like python lists, you can assign values to specific positions, or ranges
of values to slices

In[18]:

{% highlight python %}
squareArray[0,:] = np.array(range(1,4)) # set the first row to 1,2,3
squareArray[1,1] = 0                    # set the middle spot to zero
squareArray[2,:] = 1                    # set the last row to ones
print squareArray
{% endhighlight %}


    [[1 2 3]
     [4 0 6]
     [1 1 1]]


Something new to numpy arrays is indexing using an array of indices:

In[19]:

{% highlight python %}
fibIndices = np.array( [1, 1, 2, 3] )
randomRow = np.random.random( (10,1) ) # an array of 10 random numbers
print randomRow
{% endhighlight %}


    [[ 0.01042836]
     [ 0.35193382]
     [ 0.70319522]
     [ 0.31075129]
     [ 0.5585514 ]
     [ 0.9961552 ]
     [ 0.89595873]
     [ 0.68940136]
     [ 0.83591443]
     [ 0.13828717]]


In[20]:

{% highlight python %}
print randomRow[fibIndices] # the first, first, second and third element of
                            # randomRow 
{% endhighlight %}


    [[ 0.35193382]
     [ 0.35193382]
     [ 0.70319522]
     [ 0.31075129]]


You can also use an array of true/false values to index:

In[21]:

{% highlight python %}
boolIndices = np.array( [[ True, False,  True],
                          [False,  True, False],
                          [ True, False,  True]] )
print squareArray[boolIndices] # a 1D array with the selected values
{% endhighlight %}


    [1 3 0 1 1]


It gets a little more complicated with 2D (and higher) arrays. You need two
index arrays for a 2D array:

In[22]:

{% highlight python %}
rows = np.array( [[0,0],[2,2]] ) #get the corners of our square array
cols = np.array( [[0,2],[0,2]] )
print squareArray[rows,cols]
{% endhighlight %}


    [[1 3]
     [1 1]]


In[23]:

{% highlight python %}
boolRows = np.array( [False, True, False] ) # just the middle row
boolCols = np.array( [True, False, True] )  # Not the middle column
print squareArray[boolRows,boolCols]
{% endhighlight %}


    [4 6]


### Operations on arrays
One useful trick is to create a boolean matrix based on some test and use that
as an index in order to get the elements of a matrix that pass the test:

In[24]:

{% highlight python %}
sqAverage = np.average(squareArray) # average(...) returns the average of all
                                    # the elements in the given array
betterThanAverage = squareArray > sqAverage
print betterThanAverage
{% endhighlight %}


    [[False False  True]
     [ True False  True]
     [False False False]]


In[25]:

{% highlight python %}
print squareArray[betterThanAverage]
{% endhighlight %}


    [3 4 6]


Indexing like this can also be used to assign values to elements of the array.
This is particularly useful if you want to filter an array, say by making sure
that all of its values are above/below a certain threshold:

In[26]:

{% highlight python %}
sqStdDev = np.std(squareArray) # std(...) returns the standard deviation of
                               # all the elements in the given array
clampedSqArray = np.array(squareArray.copy(), dtype=float) 
                                    # make a copy of squareArray that will
                                    # be "clamped". It will only contain
                                    # values within one standard deviation
                                    # of the mean. Values that are too low
                                    # or to high will be set to the min
                                    # and max respectively. We set 
                                    # dtype=float because sqAverage
                                    # and sqStdDev are floating point
                                    # numbers, and we don't want to 
                                    # truncate them down to integers.
clampedSqArray[ (squareArray-sqAverage) > sqStdDev ] = sqAverage+sqStdDev
clampedSqArray[ (squareArray-sqAverage) < -sqStdDev ] = sqAverage-sqStdDev
print clampedSqArray
{% endhighlight %}


    [[ 1.          2.          3.        ]
     [ 3.90272394  0.31949828  3.90272394]
     [ 1.          1.          1.        ]]


Multiplying and dividing arrays by numbers does what you'd expect. It
multiples/divides element-wise

In[27]:

{% highlight python %}
print squareArray * 2
{% endhighlight %}


    [[ 2  4  6]
     [ 8  0 12]
     [ 2  2  2]]


Addition works similarly:

In[28]:

{% highlight python %}
print squareArray + np.ones( (3,3) )
{% endhighlight %}


    [[ 2.  3.  4.]
     [ 5.  1.  7.]
     [ 2.  2.  2.]]


Multiplying two arrays together (of the same size) is also element wise

In[29]:

{% highlight python %}
print squareArray * np.arange(1,10).reshape( (3,3) )
{% endhighlight %}


    [[ 1  4  9]
     [16  0 36]
     [ 7  8  9]]


Unless you use the dot(...) function, which does matrix multiplication from
linear algebra:

In[30]:

{% highlight python %}
matA = np.array( [[1,2],[3,4]] )
matB = np.array( [[5,6],[7,8]] )
print np.dot(matA,matB)
{% endhighlight %}


    [[19 22]
     [43 50]]


And thats it! There's a lot more to the numpy library, and there are a few
things I skipped over here, such as what happens when array dimensions don't
line up when you're indexing or multiplying them together, so if you're
interested, I strongly suggest you head over to the scipy wiki's numpy tutorial
for a more in depth look at using numpy arrays.
