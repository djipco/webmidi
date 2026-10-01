---
sidebar_position: 1
slug: /getting-started
---

# Supported Environments

Starting with version 3, the library works in both the browser and Node.js. Let's quickly look at 
the specificities of both these environments.

## Browser Support

The library works in all browsers that natively [support](https://caniuse.com/midi) the
[Web MIDI API](https://webaudio.github.io/web-midi-api/). Currently, the following major browsers
have native support:

* Edge v79+
* Chrome 43+
* Opera 30+
* Firefox 108+

It is also possible to use this library in Internet Explorer if you install
[Jazz-Plugin](https://jazz-soft.net/download/Jazz-Plugin/) v1.4+.

Note that, in 2020, [Apple has announced](https://webkit.org/tracking-prevention/) that they would
not natively support the Web MIDI API (and a host of other APIs) in Safari because of fingerprinting
concerns. On macOS, Safari 18.4+ can get the API from a third-party extension,
[Web MIDI for Safari](https://triglavmodular.hu/mods/safari-webmidi/).

## Node.js Support

Version 3.0 of WEBMIDI.js introduced full Node.js support. Nothing special needs to be done, it
should just work in the following environments (with Node.js 8.5+):

* GNU/Linux
* macOS
* Windows
* Raspberry Pi

Support for the Node.js environment has been made possible in large part by the good folks of
[Jazz-Soft](https://jazz-soft.net/) via their [JZZ](https://www.npmjs.com/package/jzz) module.

## TypeScript Support

Starting with version 3, TypeScript is officially supported. You will find the TypeScript definition
file in these locations in side tje library's folder:

* `/dist/cjs/webmidi.cjs.d.ts` (Node.js module)
* `/dist/esm/webmidi.esm.d.ts` (ECMAScript module)
