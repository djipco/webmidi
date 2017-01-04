![WebMidi.js Logo](http://cotejp.github.io/webmidi/images/webmidijs-logo.svg "WebMidi.js")

[![npm](https://img.shields.io/npm/v/webmidi.svg)](https://www.npmjs.com/package/webmidi)
[![npm](https://img.shields.io/npm/dt/webmidi.svg)](https://www.npmjs.com/package/webmidi)
[![Beerpay](https://beerpay.io/cotejp/webmidi/badge.svg?style=flat)](https://beerpay.io/cotejp/webmidi) 

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

>### Warning to users of version <= 1.x
>The API in version 2.x has changed and is not backwards-compatible. Please check the 
>[Migration Notes](#migration-notes) below for more information.

## Browser Support

This library works in all browsers that support the 
[Web MIDI API](https://webaudio.github.io/web-midi-api/). Currently, the following browsers have 
built-in support: 

* Chrome (Mac, GNU/Linux, Android & Windows)
* Opera (Mac, GNU/Linux, Windows)
* Android WebView component (KitKat and above) 

It is possible to use this library in other browsers if you install version 1.4+ of 
[Jazz-Plugin](http://jazz-soft.net/) together with the 
[WebMIDIAPIShim](http://cwilso.github.io/WebMIDIAPIShim/) polyfill. This combination provides 
support for the following additional browsers:

* Firefox (Mac, GNU/Linux & Windows)
* Safari (Mac)
* Internet Explorer (Windows)

For details on how to use **WebMidi.js** with the Jazz-Plugin (and WebMIDIAPIShim, please skip ahead 
to the [Using WebMidi.js with the Jazz-Plugin](#using-webmidijs-with-the-jazz-plugin) section.

## Caveat Emptor

**WebMidi.js** v2 is currently in the *release candidate* stage. The API should now be stable and 
most bugs should have been ironed out. However, until it reaches the *final* stage, it cannot be 
considered production-ready. If you find a bug, please 
[open an issue](https://github.com/cotejp/webmidi/issues) and I will do my best to address it in a 
timely fashion.

Having confirmation that the software works well is also valuable information. If that's the case 
for you, please drop me a note at [@jpcote](https://twitter.com/jpcote).

## Installation

Depending on your needs and environment, you can install **WebMidi.js** in one of three ways: 
manually, with Bower or with NPM.

#### Manual Install

You can install **WebMidi.js** the old fashioned way by downloading the
[latest release](https://github.com/cotejp/webmidi/releases) packaged as a zip file. Uncompress the 
package, grab the `webmidi.min.js` file and copy it to your project. Link to it from your HTML page 
as usual. 

#### Bower Install

To install via Bower, simply run the following command in the Terminal (Mac, Linux) or the 
Command Prompt (Windows) from the root of your project. Just make sure to correctly capitalize 
the "W" and the "M" in "WebMidi":

    bower install WebMidi

Then, just add a `<script>` tag to your HTML page and make it point to:

    <script src="bower_components/WebMidi/src/webmidi.js"></script>

#### NPM Install

If you prefer, you can install **WebMidi.js** with NPM. Simply issue the following command to 
perform the actual install:

    npm install webmidi
    
Finally, just add a `<script>` tag to your HTML page and make it point to:

    <script src="node_modules/webmidi/webmidi.min.js"></script>

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

>If you need `sysex` support, you will have to pass `true` as the second parameter to the `enable()` 
>function.

To send and receive MIDI messages, you will need to do so via the appropriate `Output` and `Input`
device. To view all the available `Input` and `Output` ports, you can use the matching arrays:

```javascript
WebMidi.enable(function (err) {
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
}
```

To send MIDI messages to a device, you simply need to grab that device and call one of its output
method (`playNote()`, `stopNote()`, `sendPitchBend()`, etc.). To retrieve a device, you can can use
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
Beware that device IDs are not the same accross browsers and platforms. You could also use the device's name (as
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

## More code examples

Here are various other examples to give you an idea of what is possible with **WebMidi.js**. For all 
details, please consult the full 
**[API documentation](http://cotejp.github.io/webmidi/latest/classes/WebMidi.html)**.

```javascript
// Enable WebMidi.js
WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }

  // Viewing available inputs and outputs
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);

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

  // Check for the presence of an event listener (n such cases, you cannot use anonymous functions).
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

## Full API Documentation

The full **API documentation** is available for download in the `docs` folder. You can also 
**[view it online](http://cotejp.github.io/webmidi/latest/classes/WebMidi.html)**.

Legacy 
[documentation for version 1.0.0-beta.15](http://cotejp.github.io/webmidi/v1.0.0-beta.15/classes/WebMidi.html) 
will also remain available online as long as necessary.

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

## Support the Project

If you find this library useful, you can **[buy me a drink](https://beerpay.io/cotejp/webmidi)** as 
a token of your appreciation. This would automatically make you even more awesome than you already 
are!

[![Beerpay](https://beerpay.io/cotejp/webmidi/badge.svg?style=beer-square)](https://beerpay.io/cotejp/webmidi)

Cheers!
