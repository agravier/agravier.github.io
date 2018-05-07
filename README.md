agravier.github.io
==================

This repository contains the files used to generate my website using
jekyll. The website itself is viewable at
[agravier.github.io](http://agravier.github.io).

The contents of the pages and posts are authored by me. You can partially
reproduce them provided you properly cite me.


## Notes to self

This can be built locally by following [this guide](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/_).

- installing: `bundle install`
- updating: `bundle update`
- serving: `bundle exec jekyll serve`

I used to use pygments for syntax highlighting, but GH pages only allows rouge.
I'm not sure if there this is a breaking change.

Similarly, I ised to use rdiscount, but now it's deprecated, and kramdown should
be used. It breaks mathjax, vertical bars inside equations are interpreted as 
table delimiters. So `\mid` should be used for conditioning, `\lvert` and 
`\rvert` for delimiters.

```
With regex: \\\\[()\]\[] -> $$$$
No regex:
\\\\ -> \\
\| or \left| or \right| -> \parallel, \lVert, \rVert
| -> \mid, \lvert, \rvert
```

### Old notes, not entirely sure if some may not still be useful:

The pygments gem calls `python`. This calls python3 on Arch. You
should Jekyll in server more in a virtualenv as python will be an
alias of python2.

I generated all styles with

```bash
python -c "from pygments.styles import get_all_styles; print list(get_all_styles())" | tr -cd [:alnum:][:blank:] | xargs -d" " -I {} sh -c 'pygmentize -S "$1" -f html > "stylesheets/$1.css"' -- {} \;
```

With the header ```jquery: true```, main_jquery.js gets included,
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
