![WebMidi.js Logo](https://djipco.github.io/webmidi/images/webmidijs-logo.svg "WebMidi.js")

[![npm](https://img.shields.io/npm/v/webmidi.svg)](https://www.npmjs.com/package/webmidi)
[![](https://data.jsdelivr.com/v1/package/npm/webmidi/badge)](https://www.jsdelivr.com/package/npm/webmidi)
[![npm](https://img.shields.io/npm/dt/webmidi.svg)](https://www.npmjs.com/package/webmidi)

<p align="center">
  <a href="https://github.com/djipco/webmidi#user-content-installation">INSTALLATION</a> — 
  <a href="https://github.com/djipco/webmidi#user-content-quick-start">QUICK START</a> — 
  <a href="https://github.com/djipco/webmidi#user-content-more-code-examples">EXAMPLES</a> — 
  <a href="https://webmidijs.org/docs/v2.5.2/">API DOCUMENTATION</a> — 
  <a href="https://webmidijs.org/forum/">FORUM</a>
</p>

## Background

The [Web MIDI API](https://webaudio.github.io/web-midi-api/) is a really exciting addition
to the web platform that allows web developers to interact with MIDI musical instruments 
and devices. While great, most developers will find the *Web MIDI API* to be a bit too 
low-level for their needs. For example, sending and receiving MIDI messages involves 
performing binary arithmetic to encode or decode MIDI byte streams. Having to read the 
MIDI spec in order to properly do that is not fun. Also the native *Web MIDI API* makes it hard 
to react upon receiving MIDI messages from external devices. For example, it only allows a 
single callback function per channel. The goal behind **WebMidi.js** is to make all these things 
much easier.

> ## ⚠️ About the upcoming version 3.0
> 
> I am currently working on version 3 and I would love to hear your ideas on how to improve the
> library. If you have a few minutes to spare, please fill in this survey:
>
> > https://forms.gle/bcahgNCGgwhcoJDD7 
>
> If you would like to try out v3.0.0-alpha, you can switch to the 
> [develop branch](https://github.com/djipco/webmidi/tree/develop) for instructions on how to do
> so.
>
> Thank you so much for your help!

## Sponsors

I would like to sincerely thank these sponsors for their support. WebMidi.js is a passion project
but it still takes quite a bit of time to develop and maintain. Thank you! 👏

[<img src="https://avatars3.githubusercontent.com/u/1488433?s=60&v=4">](https://github.com/awatterott "@awatterott")
[<img src="https://avatars3.githubusercontent.com/u/3331057?s=60&v=4">](https://github.com/rubendax "@rubendax")
<img src="https://djipco.github.io/webmidi/images/person.png" alt="Anonymous Sponsor" title="Anonymous Sponsor">

If you would like to support the project, you can press the 
[Sponsor](https://github.com/sponsors/djipco) 💜 button at the top of the page.

## Browser Support

This library works in all browsers that natively support the 
[Web MIDI API](https://webaudio.github.io/web-midi-api/). Currently, the following browsers have 
built-in support: 

* Chrome (macOS, GNU/Linux, Android & Windows)
* Opera (macOS, GNU/Linux, Windows)
* Android WebView component (KitKat and above)
* Edge (Windows)

It is also possible to use this library in other browsers if you install version 1.4+ of 
[Jazz-Plugin](http://jazz-soft.net/) together with the 
[WebMIDIAPIShim](http://cwilso.github.io/WebMIDIAPIShim/) polyfill. This combination provides 
support for the following additional browsers:

* Firefox v51 **or less** (Mac, GNU/Linux & Windows)
* Safari (macOS)
* Internet Explorer (Windows)

>For details on how to use **WebMidi.js** with the Jazz-Plugin (and WebMIDIAPIShim, please skip 
>ahead to the [Using WebMidi.js with the Jazz-Plugin](#using-webmidijs-with-the-jazz-plugin) 
>section.

For **Firefox v52+ support**, you need to install two extensions made by 
[Jazz-Soft](https://www.jazz-soft.net/):

* [Jazz-MIDI extension](https://addons.mozilla.org/en-US/firefox/addon/jazz-midi/) v1.5.1+
* [Web MIDI API extension](https://addons.mozilla.org/en-US/firefox/addon/web-midi-api/)

Early tests show that WebMidi.js is working in Firefox when both these extensions installed. Further 
testing will need to be done but it looks very promising.

I invite you to communicate with the Firefox and Safari teams to let them know how having native Web
MIDI support is important for you:

* Safari: https://bugs.webkit.org/show_bug.cgi?id=107250
* Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=836897

Note that, in 2020, [Apple has announced](https://webkit.org/tracking-prevention/) that they would not
implement the Web MIDI API (and a host of other APIs) in Safari over fingerprinting concerns. 

## Node.js Support

There is no official Node.js support in WebMidi.js 2.5.x. However, version 3 (currently in alpha) 
offers full Node.js support. You can try out version 3 in the 
[develop branch](https://github.com/djipco/webmidi/tree/develop).


## TypeScript Support

TypeScript type definitions have been tentatively added to WebMidi.js with version 2.3 (thanks to
[mmmveggies](https://www.github.com/mmmveggies)) but it should be noted that **TypeScript IS NOT 
officially supported** at this time. 

Usage:

```ts
import WebMidi from "webmidi";

WebMidi.enable(...);
```
Or (thanks to [michaelcaterisano](https://www.github.com/michaelcaterisano)):

```ts
const WebMidi: import("webmidi").WebMidi = require("webmidi");
```

You can also import the types, if you need them:

```ts
import WebMidi, { InputEventNoteon, InputEventNoteoff } from "webmidi";

input.addListener("noteon", "all", (event: InputEventNoteon) => {
  ...
}) 
```

I would like to add official TypeScript support in 
[version 3](https://github.com/djipco/webmidi/tree/develop). However, this would require help
from a knowledgeable TypeScript developer. Get in touch if you are interested in contributing.


## Installation

Depending on your needs and environment, you can install **WebMidi.js** in a variety of different 
ways.

#### CDN

The easiest way to get started is to link the WebMidi.js library from the 
[jsDelivr](https://www.jsdelivr.com/) CDN (content delivery network). To retrieve the latest 
version, just add this `<script>` tag to your HTML page:

    <script src="https://cdn.jsdelivr.net/npm/webmidi"></script>
    
In production, it might be a better idea to target a specific version. To do that, just append the 
desired version at the end of the request:

    <script src="https://cdn.jsdelivr.net/npm/webmidi@2.5.2"></script>

#### Manual Install

Obviously, you can also install **WebMidi.js** the old fashioned way by downloading the
[latest release](https://github.com/djipco/webmidi/releases) packaged as a zip file. Uncompress the
package, grab the `webmidi.min.js` file and copy it to your project. Link to it from your HTML page 
as usual. 

#### NPM Install

If it's more convenient, you can install **WebMidi.js** with NPM. Simply issue the following command 
to perform the actual install:

    npm install webmidi
    
Then, just add a `<script>` tag to your HTML page and make it point to:

    <script src="node_modules/webmidi/webmidi.min.js"></script>

#### Using with a Bundler

If you are using a bundler such as WebPack, you can import **WebMidi.js** in your project in this way:

    import WebMidi from 'path/to/webmidi';

## Insecure Origins

Starting with version 77, [Chrome deprecates Web MIDI usage on insecure origins](https://www.chromestatus.com/feature/5138066234671104). This means that, going forward, the page will 
need to be hosted on a secure origin (e.g. `https://`, `localhost:` or `file:///`) and the user will 
need to explicitely authorize usage (no matter if `sysex` is used or not).


## Quick Start

Getting started is easy. The first thing to do is to enable **WebMidi.js**. To do that, you call
`WebMidi.enable()` and pass it a function to execute when done. This function will receive an 
`Error` object if enabling `WebMidi` failed: 

```javascript
WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }
  
});
```


To send and receive MIDI messages, you will need to do so via the appropriate `Output` and `Input`
device. To view all the available `Input` and `Output` ports, you can use the matching arrays:

```javascript
WebMidi.enable(function (err) {
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
});
```

To send MIDI messages to a device, you simply need to grab that device and call one of its output
method (`playNote()`, `stopNote()`, `sendPitchBend()`, etc.). To retrieve a device, you can use
its position in the `WebMidi.outputs` array. For instance, to grab the first output device, you 
could use:

```javascript
var output = WebMidi.outputs[0];
```

However, this is not very safe as the position of devices in the array could change. An alternative
is to use the device's ID:

```javascript
var output = WebMidi.getOutputById("1584982307");
```
Beware that device IDs are not the same across browsers and platforms. You could also use the device's name (as
displayed in the `WebMidi.outputs` array):

```javascript
var output = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
```
 
Then, you can call any of the output methods and all native MIDI communications will be handled for 
you. For example, to play a "C" on the 3rd octave, you simply do:

```javascript
output.playNote("C3");
```

That's it.

Receiving messages works in a similar way: you retrieve the `Input` device you want to use, and then
add a callback function to be triggered when a specific MIDI message is received. For example, to 
listen for pitch bend events on all channels of the device:

```javascript

var input = WebMidi.getInputByName("Axiom Pro 25 USB A In");

input.addListener('pitchbend', "all", function(e) {
    console.log("Pitch value: " + e.value);
});
```

## API Documentation

The [API for WebMidi.js](https://webmidijs.org/docs/v2.5.2/index.html) is fully documented and I take 
pride in maintaining good API documentation. If you spot an error (even something minor) or think a 
topic should be made clearer, do not hesitate to 
[file an issue](https://github.com/djipco/webmidi/issues) or, better yet, send a PR. 

Here is a link to the full **[API Reference](https://webmidijs.org/docs/v2.5.2/index.html)**. You can 
also find  the API reference in portable format inside the `docs` folder.

By the way, legacy 
[documentation for version 1.0.0-beta.15](https://webmidijs.org/docs/v1.0.0-beta.15/index.html) will 
also remain available online as long as necessary.

## More code examples

Here are various other examples to give you an idea of what is possible with **WebMidi.js**. 

```javascript
// Enable WebMidi.js
WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }

  // Viewing available inputs and outputs
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);
  
  // Reacting when a new device becomes available
  WebMidi.addListener("connected", function(e) {
    console.log(e);
  });
  
  // Reacting when a device becomes unavailable
  WebMidi.addListener("disconnected", function(e) {
    console.log(e);
  });

  // Display the current time
  console.log(WebMidi.time);

  // Retrieving an output port/device using its id, name or index
  var output = WebMidi.getOutputById("123456789");
  output = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
  output = WebMidi.outputs[0];

  // Play a note on all channels of the selected output
  output.playNote("C3");

  // Play a note on channel 3
  output.playNote("Gb4", 3);

  // Play a chord on all available channels
  output.playNote(["C3", "D#3", "G3"]);

  // Play a chord on channel 7
  output.playNote(["C3", "D#3", "G3"], 7);

  // Play a note at full velocity on all channels)
  output.playNote("F#-1", "all", {velocity: 1});

  // Play a note on channel 16 in 2 seconds (relative time)
  output.playNote("F5", 16, {time: "+2000"});

  // Play a note on channel 1 at an absolute time in the future
  output.playNote("F5", 16, {time: WebMidi.time + 3000});

  // Play a note for a duration of 2 seconds (will send a note off message in 2 seconds). Also use
  // a low attack velocity
  output.playNote("Gb2", 10, {duration: 2000, velocity: 0.25});

  // Stop a playing note on all channels
  output.stopNote("C-1");

  // Stopping a playing note on channel 11
  output.stopNote("F3", 11);

  // Stop a playing note on channel 11 and use a high release velocity
  output.stopNote("G8", 11, {velocity: 0.9});

  // Stopping a playing note in 2.5 seconds
  output.stopNote("Bb2", 11, {time: "+2500"});

  // Send polyphonic aftertouch message to channel 8
  output.sendKeyAftertouch("C#3", 8, 0.25);

  // Send pitch bend (between -1 and 1) to channel 12
  output.sendPitchBend(-1, 12);

  // You can chain most method calls
  output.playNote("G5", 12)
    .sendPitchBend(-0.5, 12, {time: 400}) // After 400 ms.
    .sendPitchBend(0.5, 12, {time: 800})  // After 800 ms.
    .stopNote("G5", 12, {time: 1200});    // After 1.2 s.

  // Retrieve an input by name, id or index
  var input = WebMidi.getInputByName("nanoKEY2 KEYBOARD");
  input = WebMidi.getInputById("1809568182");
  input = WebMidi.inputs[0];

  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
    }
  );

  // Listen to pitch bend message on channel 3
  input.addListener('pitchbend', 3,
    function (e) {
      console.log("Received 'pitchbend' message.", e);
    }
  );

  // Listen to control change message on all channels
  input.addListener('controlchange', "all",
    function (e) {
      console.log("Received 'controlchange' message.", e);
    }
  );
  
  // Listen to NRPN message on all channels
  input.addListener('nrpn', "all",
    function (e) {
      if(e.controller.type === 'entry') {
        console.log("Received 'nrpn' 'entry' message.", e);
      }
      if(e.controller.type === 'decrement') {
        console.log("Received 'nrpn' 'decrement' message.", e);
      }
      if(e.controller.type === 'increment') {
        console.log("Received 'nrpn' 'increment' message.", e);
      }
      console.log("message value: " + e.controller.value + ".", e);
    }
  );

  // Check for the presence of an event listener (in such cases, you cannot use anonymous functions).
  function test(e) { console.log(e); }
  input.addListener('programchange', 12, test);
  console.log("Has event listener: ", input.hasListener('programchange', 12, test));

  // Remove a specific listener
  input.removeListener('programchange', 12, test);
  console.log("Has event listener: ", input.hasListener('programchange', 12, test));

  // Remove all listeners of a specific type on a specific channel
  input.removeListener('noteoff', 12);

  // Remove all listeners for 'noteoff' on all channels
  input.removeListener('noteoff');

  // Remove all listeners on the input
  input.removeListener();

});
```
## About Sysex Support

Per the 
[Web MIDI API specification](https://webaudio.github.io/web-midi-api/#dom-navigator-requestmidiaccess), 
system exclusive (sysex) support is disabled by default. If you need to use sysex messages, you will 
need to pass `true` as the second parameter to `WebMidi.enable()`:

```javascript
WebMidi.enable(function (err) {
  if (err) {
    console.warn(err);
  } else {
    console.log("Sysex is enabled!");
  }
}, true);
```
**Important**: depending on the browser, version and platform, it may also be necessary to serve the 
page over https if you want to enable sysex support.

## Migration Notes

If you are upgrading from version 1.x to 2.x, you should know that v2.x is not backwards compatible.
Some important changes were made to the API to make it easier to use, more versatile and to better
future-proof it.

Here is a summary of the changes:

* All the "output" functions (`playNote()`, `sendPitchBend()`, etc.) have been moved to the 
`Output` object. A list of all available `Output` objects is available in `WebMidi.outputs` 
(like before).
    
* All the "input" functions (`addListener`, `removeListener()` and `hasListener()` have been 
moved to the `Input` object. A list of all available `Input` objects is available in 
`WebMidi.inputs` (also like before).

There might be a few other minor changes here and there but the refactoring mostly concerns the
introduction of `Input` and `Output` objects.

## Using WebMidi.js with the Jazz-Plugin

To use **WebMidi.js** on Safari, Firefox and Internet Explorer, you will first need to install 
Jazz-Plugin. Simply [download the plugin](http://jazz-soft.net/download/Jazz-Plugin/) and run the 
installer.

> Users of Firefox v52+ are currently out of luck because Mozilla deactivated support for NPAPI
> plugins. There is an add-on version of 
> [Jazz-Midi](https://addons.mozilla.org/en-US/firefox/addon/jazz-midi/) but, unfortunately, the 
> API is different and cannot be used as is. Firefox v52+ users will have to wait for native Web 
> MIDI support to be finalized. 
> [Reading from the comments on Bug 836897](https://bugzilla.mozilla.org/show_bug.cgi?id=836897), 
> this might take a while...

Then, you will need to add the plugin to the page with the following HTML code:

    <object id="Jazz1" classid="CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90" class="hidden">
      <object id="Jazz2" type="audio/x-jazz" class="hidden">
        <p><a href=http://jazz-soft.net>Jazz-Plugin</a> required!</p>
      </object>
    </object>
    
To support recent versions of Internet Explorer, you also need to add a `meta` tag to the `<head>` 
of the page:

    <meta http-equiv="X-UA-Compatible" content="requiresActiveX=true"/>

Since Jazz-Plugin does not use the same syntax as the native Web MIDI API, it is necessary to also
install the [WebMIDIAPIShim](http://cwilso.github.io/WebMIDIAPIShim/) polyfill. You can do that by 
including the following in your page:

    <script src='http://cwilso.github.com/WebMIDIAPIShim/WebMIDIAPI.js'></script>
    
Obviously, you can also 
[download a local copy](https://github.com/cwilso/WebMIDIAPIShim/zipball/master) and link to it.

## Feature Request

If you would like to request a new feature, enhancement or API change, please first verify that it 
is not already planned for an upcoming version by checking the 
[Wiki](https://github.com/djipco/webmidi/wiki). If it isn't listed there, simply 
[file an issue](https://github.com/djipco/webmidi/issues) describing your request.

## Contributing

If you are interested in contributing to the project, please read our 
[Contribution Guidelines](https://github.com/djipco/webmidi/blob/master/CONTRIBUTING.md).

## Citing this Software in Research

If you use this software for research or academic purposes, please cite the project in your 
references (or wherever appropriate). Here's an example of how to cite it 
([APA Style](https://apastyle.apa.org/)):

>Côté, J. P. (2020). WebMidi.js v2.5.3 [Computer Software]. Retrieved from 
https://github.com/djipco/webmidi

Here are a few examples of academic papers citing WebMidi.js:

* Lundh Haaland, M. (2020). The Player as a Conductor : Utilizing an Expressive Performance
System to Create an Interactive Video Game Soundtrack (Dissertation). Retrieved from 
http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-281324

* Bazin, T. & Hadjeres, G. (2019). NONOTO: A Model-agnostic Web Interface for Interactive 
Music Composition by Inpainting, presented at 10th International Conference on Computational
Creativity, Charlotte, 2019. Retrieved from https://arxiv.org/abs/1907.10380

* Cárdenas, A. & Mauricio B. (2018). Diseño y desarrollo de un prototipo para integración de
Tecnología de Tracking 3d con Tecnología MIDI [Doctoral dissertation, Pontificia Universidad
Católica del Ecuador]. Retrieved from http://repositorio.puce.edu.ec/handle/22000/15838

I invite academics to show their support for this project by notifying us of all papers 
referencing the software. The best way to do that is to submit a pull request adding your paper 
to the list above.
