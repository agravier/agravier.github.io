agravier.github.io
==================

This repository contains the files used to generate my website using
jekyll. The website itself is viewable at
[agravier.github.io](http://agravier.github.io).

The contents of the pages and posts are authored by me. You can partially
reproduce them provided you properly cite me.


## Notes to self

the pygments gem calls `python`. This calls python3 on Arch. You
should Jekyll in server more in a virtualenv as python will be an
alias of python2.

I generated all styles with

```bash
python -c "from pygments.styles import get_all_styles; print list(get_all_styles())" | tr -cd [:alnum:][:blank:] | xargs -d" " -I {} sh -c 'pygmentize -S "$1" -f html > "stylesheets/$1.css"' -- {} \;
```

with the header ```jquery: true```, main_jquery.js gets included,
which defines the behaviour of

    <p class="toggle_trigger"><a href="#">toggle link</p>
    <div markdown="1" class="toggle_container">
       blabla
    </div>

Note that the markdown=1 attribute is not supported by rdiscount yet
(but Maruku doesn't play well with MathJax, so I have to use rdiscount).

To make a markdown rendering of an IPython notebook: ```ipython
nbconvert --to markdown notebook.ipynb```. Remember to add the jekyll
header for processing.
