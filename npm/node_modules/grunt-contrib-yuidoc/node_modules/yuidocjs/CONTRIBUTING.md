Contributing to YUIDoc
======================

Getting Involved
----------------

If you want to work on the default theme or need to work on the libraries, here's the steps:

    $ git clone git://github.com/yui/yuidoc.git
    $ cd yuidoc
    $ npm link

This will link `yuidoc` into the global folder. This basically installs it globally as a
link to this source directory.

Now all changes you make to the current source tree are available in the global `yuidoc`
executable. No need to reinstall the app to test your changes.

Running Unit Tests
------------------

You are also able to run unit tests by executing `npm test`.

    $ npm test

Server Mode
-----------

For performance, the Handlebars templates are cached from the first request. So you will have
to terminate the server and relaunch it before you can see your changes.

Assets should not be cached, so they should still serve new files on each request. This way
you can modify the JavaScript and CSS files on the fly.

Submitting Pull Requests
------------------------

Pull Requests are very welcome, but should be within the scope of the project, and follow the
repository's code conventions. Before submitting a Pull Request, it's always good to file an
issue, so we can discuss the details of the Pull Request.

The Yahoo CLA
-------------

At Yahoo, we have a single [Yahoo Open Source Contributor License Agreement][CLA] that we ask
contributors to electronically sign before merging in their Pull Requests.

[CLA]: https://yahoocla.herokuapp.com/
