---
sidebar_position: 1
slug: /getting-started
---

# Supported Environments

Starting with version 3, the library works in both the browser and Node.js and is available in a
variety of formats. Let's look at the specificities of all these environments.

## Browser Support

The library works in all browsers that natively support the
[Web MIDI API](https://webaudio.github.io/web-midi-api/). Currently, the following major browsers
have native support:

* Edge v79+
* Chrome 43+
* Opera 30+

It is also possible to use this library in other browsers if you install
[Jazz-Plugin](https://jazz-soft.net/download/Jazz-Plugin/) v1.4+. This combination provides
support for the following additional web browsers:

* Firefox
* Safari
* Internet Explorer

Note that, in 2020, [Apple has announced](https://webkit.org/tracking-prevention/) that they would
not natively support the Web MIDI API (and a host of other APIs) in Safari because of fingerprinting
concerns.

## Node.js Support

Version 3.0 of WebMidi.js introduced full Node.js support. Nothing special needs to be done, it
should just work in the following environments:

* GNU/Linux
* macOS
* Windows
* Raspberry Pi

Support for the Node.js environment has been made possible by the good folks of
[Jazz-Soft](https://jazz-soft.net/) via their [JZZ](https://www.npmjs.com/package/jzz) module.

## Distribution Flavours

To cater to various needs, WebMidi.js is distributed in 3 different flavours which you can find
inside the `dist` folder:

* **Immediately Invoked Function Expression** (IIFE): This version adds its objects directly in the
global namespace. This is the legacy approach which is often easier for beginners.

* **ES6 Module** (ESM): This is the modern approach which allows you to `import` the objects as
  needed.

* **CommonJS Module** (CJS): this is the flavour used by Node.js and often with bundling tools
  such as WebPack.

All 3 flavours also come in a minified version with sourcemap.
