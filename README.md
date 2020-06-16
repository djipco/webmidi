![WebMidi.js Logo](http://webmidijs.org/media/images/webmidijs-logo-color-on-white.svg "WebMidi.js")

[![npm](https://img.shields.io/npm/v/webmidi.svg)](https://www.npmjs.com/package/webmidi)
[![npm](https://img.shields.io/npm/dt/webmidi.svg)](https://www.npmjs.com/package/webmidi)
[![](https://data.jsdelivr.com/v1/package/npm/webmidi/badge)](https://www.jsdelivr.com/package/npm/webmidi)


## Introduction

**WebMidi.js** makes it easy to interact with MIDI instruments directly from a web browser or from 
Node.js. It simplifies the control of physical or virtual MIDI instruments with user-friendly 
functions such as `playNote()`, `setPitchBend()` or `sendControlChange()`. It also allows reacting 
to inbound MIDI messages by adding listeners for events such as `"noteon"`, `"pitchbend"` or 
`"programchange"`.

## Browser Support

The library works in all browsers that natively support the 
[Web MIDI API](https://webaudio.github.io/web-midi-api/). Currently, the following major browsers
have native support: 

* Edge
* Chrome
* Opera

It is also possible to use this library in other browsers if you install 
[Jazz-Plugin](https://jazz-soft.net/download/Jazz-Plugin/) v1.4+. This combination provides 
support for the following additional web browsers:

* Firefox
* Safari
* Internet Explorer

## Node.js Support

Version 3.0 of WebMidi.js introduced full Node.js support. Nothing special needs to be done, it 
should just work in the following environments:

* GNU/Linux
* macOS
* Windows
* Raspberry Pi

Support for the Node.js environment has been made possible by the good folks of 
[Jazz-Soft](https://jazz-soft.net/) via their [JZZ](https://www.npmjs.com/package/jzz) module.

## Flavours

To cater to various needs, WebMidi.js is distributed in 3 different flavours which you can find 
inside the `dist` folder: 

* **Immediately invoked function expression** (IIFE): This version creates a `WebMidi` object 
directly in the global namespace. This is the legacy approach which is often easier for beginners.

* **ES6 Module** (ESM): This is the modern approach which allows you to `import` the objects as
needed.

* **CommonJS Module** (CJS): this is the flavour used by Node.js and often with bundling tools 
such as WebPack.

All 3 flavours also come in a minified version with sourcemap.

## Installation

Depending on your needs and environment, you can install **WebMidi.js** in a variety of different 
ways.

#### CDN

The easiest way to get started is to link the WebMidi.js library from the 
[jsDelivr](https://www.jsdelivr.com/package/npm/webmidi) CDN (content delivery network). Just add 
this `<script>` tag to your HTML page:

    <script src="https://cdn.jsdelivr.net/npm/webmidi@3.0.0-alpha.1/dist/webmidi.iife.js"></script>

#### Manual Install

Obviously, you can also install **WebMidi.js** the old-fashioned way by downloading the
[latest release](https://github.com/djipco/webmidi/releases) packaged as a zip file. Uncompress the
package, grab the `./dist/webmidi.iife.js` file and copy it to your project. Link to it from your 
HTML page using a `<script>` tag as usual. 

#### NPM Install

Arguably, the easiest approach is to install **WebMidi.js** with NPM. At the root of your project, 
simply issue the following command to perform the install:

    npm install webmidi@next
    
Then, you can use any of those approaches depending on your environment:

    // Script tag
    <script src="node_modules/dist/webmidi.iife.js"></script>
 
    // CommonJS require
    const {WebMidi} = require("webmidi");
 
    // ES module import
    import {WebMidi} from "node_modules/dist/webmidi.esm.js";

## Insecure Origins

Starting with version 77, 
[Chrome deprecated Web MIDI usage on insecure origins](https://www.chromestatus.com/feature/5138066234671104). 
This means that, going forward, any page using WebMidi.js will need to be hosted on a secure origin:

* `https://`
* `localhost:`
* `file:///`

Also, the user will need to explicitely authorize usage via a prompt (no matter if system exclusive
messages are used or not).

## Quick Start

Getting started is easy. The first thing to do is to enable **WebMidi.js**. To do that, you call
`WebMidi.enable()` and use `then()` to pass it a function to execute when done:

```javascript
WebMidi
  .enable()
  .then(() => console.log("WebMidi enabled!"))
  .catch(err => alert(err));
```
To interact with devices you need to know which `Input` and `Output` ports are available. Connect a
MIDI device and try the following:

```javascript
WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));

function onEnabled() {
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);
}
```

Inputs and outputs all have a `channels` property containing an array of 16 `InputChannel` or 
`OutputChannel` objects. 

Here is a quick example of how to play a note on MIDI channel 1 of the first found output device 
(port):

```javascript
let synth = WebMidi.outputs[0];
synth.channels[1].playNote("C3");
```

Above, we retrieve the port in the `outputs` array and store it inside the `synth` variable. Then,
we access MIDI channel 1 of the synth and use its `playNote()` method.

Since the position of devices in the array could change, it is often better to use the device's 
name (as displayed in the `WebMidi.outputs` array):

```javascript
let synth = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
synth.channels[1].playNote("C3");
```

Receiving MIDI messages works in a similar way: you retrieve the `Input` device you want to use, and
then add a callback function to be triggered when a specific MIDI message is received on the desired
channel. For example, to listen for pitch bend events on channel 1 of the device:

```javascript
let input = WebMidi.getInputByName("Axiom Pro 25 USB A In");

input.channels[1].addListener('pitchbend', e => {
 console.log("Pitch value: " + e.value);
});
```

## API Documentation

The [API for WebMidi.js](https://webmidijs.org/docs/) is fully documented and I take 
pride in maintaining good API documentation. If you spot an error (even something minor) or think a 
topic should be made clearer, do not hesitate to 
[file an issue](https://github.com/djipco/webmidi/issues) or, better yet, send a PR. 

Here is a link to the full
**[API Reference](https://webmidijs.org/docs/)**. You can also find the API reference inside the 
`docs` folder.

## About Sysex Support

Per the 
[Web MIDI API specification](https://webaudio.github.io/web-midi-api/#dom-navigator-requestmidiaccess), 
system exclusive (sysex) support is disabled by default. If you need to use sysex messages, you will 
need to explicitly enable them:

```javascript
WebMidi.enable({sysex: true});
```

## Feature Request

If you would like to request a new feature, enhancement or API change, please check if it is not 
already planned for an upcoming version by checking the 
[Wiki](https://github.com/djipco/webmidi/wiki). Then, discuss it in the 
[Enhancement Proposals](https://webmidijs.org/forum/categories/enhancements) section of the forum.

## Sponsors

WebMidi.js is a passion project but it still takes quite a bit of time to develop and maintain. 
I would like to sincerely thank 👏 these sponsors for their support: 

[<img src="https://avatars3.githubusercontent.com/u/1488433?s=60&v=4">](https://github.com/awatterott "@awatterott")

If you would like to support the project, you can press the 
[Sponsor](https://github.com/sponsors/djipco) 💜 button at the top of the page.

## Contributing

If you are interested in contributing to the project, please read our 
[Contribution Guidelines](https://github.com/djipco/webmidi/blob/master/CONTRIBUTING.md).

## Citing this Software in Research

If you use this software for research or academic purposes, please cite the project in your 
references (or wherever appropriate). Here's an example of how to cite it 
([APA Style](https://apastyle.apa.org/)):

>Côté, J. P. (2019). WebMidi.js v2.5.1 [Computer Software]. Retrieved from 
https://github.com/djipco/webmidi

Here are a few examples of academic papers citing WebMidi.js:

* Bazin, T. & Hadjeres, G. (2019). NONOTO: A Model-agnostic Web Interface for Interactive 
Music Composition by Inpainting, presented at 10th International Conference on Computational
Creativity, Charlotte, 2019. Retrieved from https://arxiv.org/abs/1907.10380

* Cárdenas, A. & Mauricio B. (2018). Diseño y desarrollo de un prototipo para integración de
Tecnología de Tracking 3d con Tecnología MIDI [Doctoral dissertation, Pontificia Universidad
Católica del Ecuador]. Retrieved from http://repositorio.puce.edu.ec/handle/22000/15838

I invite academics to show their support for this project by notifying us of all papers 
referencing the software. The best way to do that is to submit a pull request adding your paper 
to the list above.
