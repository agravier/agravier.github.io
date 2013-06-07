---
layout: post
title: 'Fixing the mysterious virtualenv error "IOError: invalid Python installation" due to a missing "local" subdirectory (that should already be fixed but is not (for me))'
disqus: true
---

On some debian-based systems, the  posix_local install scheme is used. That means that an additional "local" directory is expected on the path of some things, including the path of python headers inside a virtualenv.
That issue was [solved][1] a while ago. Except that for me, the error still pops up. I have a relatively complex python setup,  with home-local virtualenv, virtualenvwrapper, and distribute, and many symlinked locations. Let's not enter into details.

The weird error looks like that when creating a new virtualenv:  
  

<div class="highlight"><pre><code> agravier site-packages  $  mkvirtualenv pycogmo  
New python executable in pycogmo/bin/python2  
Also creating executable in pycogmo/bin/python  
Traceback (most recent call last):  
  File "/usr/lib/python2.7/site.py", line 562, in   
    main()  
  File "/usr/lib/python2.7/site.py", line 544, in main  
    known\_paths = addusersitepackages(known\_paths)  
  File "/usr/lib/python2.7/site.py", line 271, in addusersitepackages  
    user_site = getusersitepackages()  
  File "/usr/lib/python2.7/site.py", line 246, in getusersitepackages  
    user\_base = getuserbase() # this will also set USER\_BASE  
  File "/usr/lib/python2.7/site.py", line 236, in getuserbase  
    USER\_BASE = get\_config_var('userbase')  
  File "/usr/lib/python2.7/sysconfig.py", line 577, in get\_config\_var  
    return get\_config\_vars().get(name)  
  File "/usr/lib/python2.7/sysconfig.py", line 476, in get\_config\_vars  
    \_init\_posix(\_CONFIG\_VARS)  
  File "/usr/lib/python2.7/sysconfig.py", line 355, in \_init\_posix  
    raise IOError(msg)  
IOError: invalid Python installation: unable to open /home/agravier/metahome/.local-common/share/python2.7/venvs/pycogmo/local/include/python2.7/pyconfig.h (No such file or directory)  
ERROR: The executable pycogmo/bin/python2 is not functioning  
ERROR: It thinks sys.prefix is u'/home/agravier/metahome/.local-common/share/python2.7/venvs' (should be u'/home/agravier/metahome/.local-common/share/python2.7/venvs/pycogmo')  
ERROR: virtualenv is not compatible with this system or executable</code></pre></div>

The fix is the following (I only fixed the activate script for sh, I'm too lazy to do all of them):

<div class="highlight"><pre><code>--- virtualenv.py.orig 2013-03-13 09:40:22.000000000 +0100
+++ virtualenv.py 2013-03-13 10:17:03.000000000 +0100
@@ -1301,6 +1301,8 @@
     else:
         logger.debug('No include dir %s' % stdinc_dir)
+    fix_local_scheme(home_dir)
+
     platinc_dir = distutils.sysconfig.get_python_inc(plat_specific=1)
     if platinc_dir != stdinc_dir:
         platinc_dest = distutils.sysconfig.get_python_inc(
@@ -1549,8 +1551,6 @@
                       'your %s file.' % pydistutils)
     ## FIXME: really this should be calculated earlier
-    fix_local_scheme(home_dir)
-
     if site_packages:
         if os.path.exists(site_packages_filename):
             logger.info('Deleting %s' % site_packages_filename)
@@ -2228,22 +2228,21 @@
 """)

 ##file activate.sh
-ACTIVATE_SH = convert("""
-eJytVVFvokAQfudXTLEPtTlLeo9tvMSmJpq02hSvl7u2wRUG2QR2DSxSe7n/frOACEVNLlceRHa+
-nfl25pvZDswCnoDPQ4QoTRQsENIEPci4CsBMZBq7CAsuLOYqvmYKTTj3YxnBgiXBudGBjUzBZUJI
-BXEqgCvweIyuCjeG4eF2F5x14bcB9KQiQQWrjSddI1/oQIx6SYYeoFjzWIoIhYI1izlbhJjkKO7D
-M/QEmKfO9O7WeRo/zr4P7pyHwWxkwitcgwpQ5Ej96OX+PmiFwLeVjFUOrNYKaq1Nud3nR2n8nI2m
-k9H0friPTGVsUdptaxGrTEfpNVFEskxpXtUkkCkl1UNF9cgLBkx48J4EXyALuBtAwNYIjF5kcmUU
-abMKmMq1ULoiRbgsDEkTSsKSGFCJ6Z8vY/2xYiSacmtyAfCDdCNTVZoVF8vSTQOoEwSnOrngBkws
-MYGMBMg8/bMBLSYKS7pYEXP0PqT+ZmBT0Xuy+Pplj5yn4aM9nk72JD8/Wi+Gr98sD9eWSMOwkapD
-BbUv91XSvmyVkICt2tmXR4tWmrcUCsjWOpw87YidEC8i0gdTSOFhouJUNxR+4NYBG0MftoCTD9F7
-2rTtxG3oPwY1b2HncYwhrlmj6Wq924xtGDWqfdNxap+OYxplEurnMVo9RWks+rH8qKEtx7kZT5zJ
-4H7oOFclrN6uFe+d+nW2aIUsSgs/42EIPuOhXq+jEo3S6tX6w2ilNkDnIpHCWdEQhFgwj9pkk7FN
-l/y5eQvRSIQ5+TrL05lewxWpt/Lbhes5cJF3mLET1MGhcKCF+40tNWnUulxrpojwDo2sObdje3Bz
-N3QeHqf3D7OjEXMVV8LN3ZlvuzoWHqiUcNKHtwNd0IbvPGKYYM31nPKCgkUILw3KL+Y8l7aO1ArS
-Ad37nIU0fCj5NE5gQCuC5sOSu+UdI2NeXg/lFkQIlFpdWVaWZRfvqGiirC9o6liJ9FXGYrSY9mI1
-D/Ncozgn13vJvsznr7DnkJWXsyMH7e42ljdJ+aqNDF1bFnKWFLdj31xtaJYK6EXFgqmV/ymD/ROG
-+n8O9H8f5vsGOWXsL1+1k3g=
+ACTIVATE_SH = convert("""eJytVVFv2jAQfs+vuIY+QDUadY+tmERVJJBaqArrtLVVMMlBLBk
+bJQ4pnfbfd05CSAggTWseCPGd7z7ffd+5AZOARzDnAmEZRxpmCHGEPiRcB2BHKg49hBmXDvM0XzO
+NNlzMQ7WEGYuCC6sBGxWDx6RUGsJYAtfg8xA9LTaW5eN2FzRb8NsCemIZoYbVxleelS40IESzpIQ
+PKNc8VHKJUsOahZzNBEapF5/DC7Ql2Ofu6P7OfR48Tb53793H7qRvwxvcgA5Qpp7mMcudQ66FB76
+vVKhTx2Itg1bblNrn/CSMn5P+aNgfPfQOgSmMNUi7bTVghekkvKoXgcxLmnY1ClRMRfVRUz/ShgG
+TPnxEwRdIAu4FELA1AqMXmTy1XBqzDphOuZCHIkZ4TAjihFawIATUYvo3V6H5WDEiTb41ugT4Qbx
+Rsc7NmstFHqbiaAoE56a44AVMLjCChAjIfPOzAUMmSku8WBFy9PdKf9sdU9PbKvv6Ne67z72n8WA
+0PFD89GjtEL5+c3xcOzIWolKqYw0dXx3q5Piq1kJyrPVufHWyabl5CyFz2Vp7w+cdsDPCRUA6YEs
+lfYx0GBtB4R62BoxRzGHrcLaXvW1MWyVuU/+xSLyZnYchClyziuhK2q3mtqwS1I7tuqVP17WtvAj
+l81g1TVEZMz3mHyVvx3VvB0N32H3oue51xSIUMXHPnoUpy7k4104dppq0QhZthJFwIWDOuDDrZa/
+IeBl2G37icqU3QOcmEkMzEwx5zJhPMtokbNOieF4qMRqZMKVYzbTc8Q1cE7uLuC24mQKXqQKtHeG
+ODo0jEu9UtpSoU5oChlNZhg+oVNW9G4y7t/c99/Fp9PA4OZkxZXlB7DSc/b7rcxaBWg1nHXg/opK
+6+y4iighLoadUF5RsifBagfxqT1Pqm0y1JA0ws4EzQcOJik/jBrq0Iml+LLiX30Eq5Pn1kW9BhED
+r1bXjJEly+YGaJs76kqaSE6m5TliIDjNRnOphXkoQpxT6INjX6fQNDhyyiNI8cdDWbmN+0+Sv0kg
+xvWWCsyi7PTv2akOzVkJ7mS3YhvmfMvg/Yej/58D/92F/aNBTxf4CpMKdgw==
 """)

 ##file activate.fish</code></pre></div>

How did I encode the activate script?

{% highlight python %}
def vert(b):
     s = zlib.compress(b.encode('utf-8'));
     return base64.b64encode(s).encode('ascii')
{% endhighlight %}


Also, there is another issue when chaining symlinks, and here is the
solution to add to the above patch if you want (credit for that one
goes to [atsampson][2]) :
 
<div class="highlight"><pre><code>@@ -424,10 +424,10 @@
     if not os.path.exists(os.path.dirname(dest)):
         logger.info('Creating parent directories for %s' % os.path.dirname(dest))
         os.makedirs(os.path.dirname(dest))
-    if not os.path.islink(src):
-        srcpath = os.path.abspath(src)
-    else:
-        srcpath = os.readlink(src)
+    srcpath = src
+    while os.path.islink(srcpath):
+        srcpath = os.path.join(os.path.dirname(srcpath), os.readlink(srcpath))
+    srcpath = os.path.abspath(srcpath)
     if symlink and hasattr(os, 'symlink') and not is_win:
         logger.info('Symlinking %s', dest)
         try:</code></pre></div>  

 [1]: https://github.com/pypa/virtualenv/commit/285679cfd326c918676e765e06ed142db66efde0
 [2]: https://github.com/pypa/virtualenv/issues/268#issuecomment-9212902  
