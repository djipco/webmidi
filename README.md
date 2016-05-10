# WebMidi
>**A JavaScript browser library making it easier to use Chrome's implementation of the 
>*Web MIDI API*.**

## Background

The [Web MIDI API](https://webaudio.github.io/web-midi-api/) is a really exciting addition
to the web platform that allows web developers to interact with MIDI musical instruments 
and devices. While great, most developers will find the *Web MIDI API* to be a bit too 
low-level for their needs. For example, sending and receiving MIDI messages involves 
performing binary arithmetic to encode or decode MIDI byte streams. Having to read the 
MIDI spec in order to properly do that is not fun. Also the *Web MIDI API* makes it hard 
to react upon receiving MIDI messages from external devices. For example, it only allows a 
single callback function per channel. The goal behind the **WebMidi** library is to make
all these things much easier.

>### Warning to users of version <= 1.x
>The API in version 2.x has changed and is not backwards-compatible. Please check the 
>[Migration Notes](#migration-notes) below for more information.

## Installation

Depending on your needs and environment, you can install the **WebMidi** library in one of 
three ways: manually, with Bower or with NPM.

#### Manual Install

You can install *WebMidi* the old fashioned way by downloading the
[latest release](https://github.com/cotejp/webmidi/releases) packaged as a zip file.
Uncompress the package, grab the `webmidi.min.js` file and copy it to your project. Link 
to it from your HTML page as usual. 

>By the way, you will also find the 
[full API documentation](http://cotejp.github.io/webmidi/latest/classes/WebMidi.html) in the 
`dist/docs` folder.

#### Bower Install

To install via Bower, simply run the following command in the Terminal (Mac, Linux) or the 
Command Prompt (Windows) from the root of your project (make sure to correctly capitalize 
the "W" and the "M" in WebMidi):

    bower install WebMidi

Then, just add a `<script>` tag to your HTML page and make it point to:

    bower_components/WebMidi/webmidi.min.js

#### NPM Install

If you prefer, you can install **WebMidi** with NPM. In order for this to work, you first
need to create a `node_modules` folder in your project's root. Then, from the project's
root, simply issue the following command in the Terminal (Mac, Linux) or the Command 
Prompt (Windows):

    npm install webmidi
    
Finally, just add a `<script>` tag to your HTML page and make it point to:

    node_modules/webmidi/webmidi.min.js

## Quick Start

Getting started is easy. The first thing to do is to enable **WebMidi**. To do that, you call
`WebMidi.enable()` and pass it a function to execute when done. This function will receive an 
`Error` object if enabling `WebMidi` fails. Let's check if **WebMidi** can be enabled: 

```javascript
WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }
  
}
```

If you need `sysex` support, you need to pass `true` as the second parameter to the `enable()` 
function (this may request authorizaton from the user).

To send and receive MIDI messages, you will need to do so via the appropriate `Output` and `Input`
device. To view the available `Input` and `Output` ports, you can use the matching arrays:

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

You could also use the device's name (as displayed in the `WebMidi.outputs` array:

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

input.addListener('pitchbend', function(e) {
    console.log("Pitch value: " + e.value);
});
```

## More code examples

Here are various other examples to give you an idea of what is possible with `WebMidi`. For all 
details, please consult the full 
**[API documentation](http://cotejp.github.io/webmidi/classes/WebMidi.html)**.

```javascript
// Enable WebMidi
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
  output.stopNote("C-1", 11);

  // Stop a playing note on channel 11 and use a high release velocity
  output.stopNote("C-1", 11, {velocity: 0.9});

  // Stopping a playing note in 2.5 seconds
  output.stopNote("C-1", 11, {time: "+2500"});

  // Send polyphonic aftertouch message to channel 8
  output.sendKeyAftertouch("C3", 8, 0.25);

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

[Documentation for version 1.0.0-beta.15](http://cotejp.github.io/webmidiv1.0.0-beta.15/classes/WebMidi.html) 
will also remain available as long as necessary.


## Migration Notes

If you are upgrading from version 1.x to 2.x, you should know that v2.x is not backwards compatible.
Some important changes were made to the API to make it easier to use, more versatile and 
future-proof.

Here is a summary of the changes:

    * All the "output" functions (`playNote()`, `sendPitchBend()`, etc.) have been moved to the 
    `Output` object. A list of all available `Output` objects is available in `WebMidi.outputs` 
    (like before).
    
    * All the "input" functions (`addListener`, `removeListener()` and `hasListener()` have been 
    moved to the `Input` object. A list of all available `Input` objects is available in 
    `WebMidi.inputs` (also like before).

There might be a few other minor changes here and there but the refactoring mostly concerns the
introduction of `Input` and `Output` objects.
