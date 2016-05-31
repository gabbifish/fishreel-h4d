# fishreel

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

Supported by Python 2.7.11 and newer. 

## Build & development

If getting the **'python2_unicode_compatible' error** when looking at related accounts, this is likely because your OS is referencing an older version of **six**, one that is not in your pip installed directory. Pip installs in /Library/[..] while your system python installs in /System/Library/[..]

If you pip install six, it probably installs 1.9.0, but when you go into your python console, and type 
import six
six.__version__
'1.4.1'
You'll probably get the above.

Go to /System/Library/Frameworks/Python.framework/Versions/2.7/Extras/lib/python and:
sudo rm six.py six.pyc 
This will then force your console to reference your pip directory as opposed to your python dir, and the proper version will be referenced.


## Testing

Running `grunt test` will run the unit tests with karma.
# fishreel-test-may24
