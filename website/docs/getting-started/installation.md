---
sidebar_position: 2
---

# Installation

Depending on your needs and environment, you can install **WEBMIDI.js** in a variety of different
ways. Let's look at them.

## CDN

The fastest way to get started is to link the library from the
[jsDelivr](https://www.jsdelivr.com/package/npm/webmidi) CDN (content delivery network). Just add
this `<script>` tag to your HTML page:

```html
<script src="https://cdn.jsdelivr.net/npm/webmidi/dist/webmidi.iife.js"></script>
```

## Manual Install

Obviously, you can also install the library the old-fashioned way by downloading the
[latest release](https://github.com/djipco/webmidi/releases) packaged as a zip file. Uncompress the
package, grab the `./dist/webmidi.iife.js` file and copy it to your project. Link to it from your
HTML page using a `<script>` tag as usual.

## NPM Install

Arguably, the easiest approach is to install the library with NPM. At the root of your project,
simply issue the following command to perform the install:

```bash
npm install webmidi
```

Then, you can use any of those approaches depending on your environment:

### IIFE

```html
<!-- Script tag -->
<script src="node_modules/webmidi/dist/webmidi.iife.js"></script>
```

### CommonJS

```javascript
// CommonJS require
const {WebMidi} = require("webmidi");
``` 
 
### ES Module

```javascript
// ES module import
import {WebMidi} from "node_modules/webmidi/dist/webmidi.esm.js";
```

## Insecure Origins

Starting with version 77,
[Chrome deprecated Web MIDI usage on insecure origins](https://www.chromestatus.com/feature/5138066234671104).
This means that, going forward, any page using the library will need to be hosted on a secure 
origin:

* `https://`
* `localhost:`
* `file:///`

Also, the user will need to explicitely authorize usage via a prompt (no matter if system exclusive
messages are used or not).
