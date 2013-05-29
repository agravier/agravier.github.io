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
