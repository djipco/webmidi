---
sidebar_position: 2
---

# Installation

## Distribution Flavours

To cater to various needs, WEBMIDI.js is distributed in 3 different flavours which you can find
inside the [`dist`](https://github.com/djipco/webmidi/tree/develop/dist) folder:

* **Immediately Invoked Function Expression** (IIFE): This version adds its objects directly in the
  global namespace. This is the legacy approach which is often easier for beginners.

* **ES6 Module** (ESM): This is the modern approach which allows you to `import` the objects as
  needed (works in newer versions of browsers and Node.js).

* **CommonJS Module** (CJS): this is the flavour traditionnally used by Node.js and often with
  bundling tools such as WebPack.

All 3 flavours come in full and minified versions with sourcemap.


## Retrieving the Library

Depending on your needs and environment, you can retrieve and install **WEBMIDI.js** in a variety of
different ways. Let's look at all of them.

## Linking From CDN

The fastest way to get started is to link the library directly from the
[jsDelivr](https://www.jsdelivr.com/package/npm/webmidi) CDN (Content Delivery Network). Just add a 
`<script>` tag to your HTML page:

```html
<script src="https://cdn.jsdelivr.net/npm/webmidi@next/dist/iife/webmidi.iife.js"></script>
```

You can retrieve different versions and flavours of the library by modifying the URL. For example, 
to grab a different flavour replace `/dist/iife/webmidi.iife.js` by one of these:

* `/dist/cjs/webmidi.cjs.js`
* `/dist/cjs/webmidi.cjs.min.js`
* `/dist/esm/webmidi.esm.js`
* `/dist/esm/webmidi.esm.min.js`
* `/dist/iife/webmidi.iife.js`
* `/dist/iife/webmidi.iife.min.js`

If you want more control over versions and flavours, check out the 
[jsDelivr examples](https://www.jsdelivr.com/features).

## Installing Manually

Obviously, you can also install the library the old-fashioned way by manually downloading the
[latest release](https://github.com/djipco/webmidi/releases/latest) (zip file). Then, simply 
uncompress the package, grab the `./dist/iife/webmidi.iife.js` file and copy it to your project. 
Link to it from your HTML page using a `<script>` tag as usual.

## Installing with NPM

Arguably, the easiest approach is to install the library with [NPM](https://www.npmjs.com/) (Node 
Package Manager) or [Yarn](https://yarnpkg.com/). At the root of your project, simply issue the 
following command to perform the installation (obviously, [Node.js ](https://nodejs.org/en/) needs 
to be installed on your system):

```shell
npm install webmidi
```

Then, you can use any of these approaches depending on your environment:

  * ### IIFE

  The **IIFE** (Immediately-Invoked Function Expression) approach creates objects directly in the global 
  namespace and might be easier for beginners.
  
  ```html
  <!-- Script tag an HTML page -->
  <script src="node_modules/webmidi/dist/iife/webmidi.iife.js"></script>
  ```
  * ### CommonJS

  Using **CommonJS** is the traditional approach for Node.js.
  
  ```javascript
  const {WebMidi} = require("webmidi");
  ``` 
  * ### ES Module

  This is the modern approach using the 
  [ECMAScript module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) format.
  You can use it in browsers (see [compatibility](https://caniuse.com/es6-module-dynamic-import)) 
  and in Node.js v12+. **Going forward, this is the favoured approach.**

  **Browsers:**
  
  ```javascript
  import {WebMidi} from "./node_modules/webmidi/dist/esm/webmidi.esm.min.js";
  ```
  
  **Node.js:**
  
  ```javascript
  import {WebMidi} from "webmidi";
  ```



:::caution

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

:::
