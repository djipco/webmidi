# MDN Links 
__MDN Links__ is a utility package for generating links to Mozilla Developer Network documentation pages. It's primary use is for generating links for YUIDoc to use for native classes and methods. Currently, only links to the Web API Reference and JavaScript Global Objects pages are supported.

## Usage

Install:

    npm install mdn-linker

Require:

    const mdn = require('mdn-links');

### Retrieve a link
Simply pass the name of the global object and, optionally, one of its members to the `getLink()` method:

    mdn.getLink('Array');
    //-> 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array'

    mdn.getLink('Blob', 'slice');
    //-> 'https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice'

### Update cache
A cached set of links is included in the package, but if these become stale they can be updated with the `update()` method:

    mdn.update(function () {
        console.log(mdn.getLink('Array', 'isArray'));
        console.log(mdn.getLink('Array', 'prototype.forEach'));
    }); 

## License

Copyright (c) 2015 Andy Earnshaw

This software is licensed under the MIT license.  See the `LICENSE.txt` file
accompanying this software for terms of use.

