# WebMidi
>**A JavaScript browser library making it easier to develop with the *Web MIDI API*.**

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

## Installation

Depending on your needs and environment, you can install the **WebMidi** library in one of 
three ways: manually, with Bower or with NPM.

#### Manual Install

You can install *WebMidi* the old fashioned way by downloading the
[latest release](https://github.com/cotejp/webmidi/releases) packaged as a zip file.
Uncompress the package, grab the `webmidi.min.js` file and copy it to your project. Link 
to it from your HTML page as usual. 

>By the way, you will also find the 
[full API documentation](http://cotejp.github.io/webmidi/classes/WebMidi.html) in the 
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

Getting started is easy. The first thing to do is to enable **WebMidi**. When you call the
`WebMidi.enable()` function, you need to pass a callback function to execute upon success
and, optionally, another callback function to execute upon failure. The `enable()` 
function will fail if the host browser does not suppport the Web MIDI API (currently, only 
Google Chrome does) or if the browser cannot connect to the host's MIDI subsystem.

Let's check if **WebMidi** can be enabled: 

```javascript
WebMidi.enable(onSuccess, onFailure);

function onSuccess() {
    console.log("WebMidi enabled.");
}

function onFailure(err) {
    console.log("WebMidi could not be enabled.", err);
}
```

To send MIDI messages with **WebMidi**, you simply need to pick the appropriate method and all
the native MIDI communication will be handled for you. For example, let's say we want to
send a 'noteon' MIDI message to all devices and channels so they play a 3rd octave C:

```javascript
WebMidi.playNote("C3");
```

That's it.

Receiving messages is just as easy. You simply have to set a callback function to be
triggered when a specific MIDI message is received. For example, to listen for pitch bend
events on any MIDI devices and channels:

```javascript
WebMidi.addListener('pitchbend', function(e) {
    console.log("Pitch value: " + e.value);
});
```

## More code examples

```javascript
// Enable WebMidi with onSuccess handler and onFailure handler.
WebMidi.enable(

  // Success handler
  function() {

    // Viewing available inputs and outputs
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);

    // Getting the current time
    console.log(WebMidi.time);

    // Playing a note (C3 on all available devices/channels)
    WebMidi.playNote("C3");

    // Playing a chord (on all available devices/channels)
    WebMidi.playNote(["C3", "D#3", "G3"]);

    // Playing a note (F#-1, at full velocity on all available devices/channels)
    WebMidi.playNote("F#-1", 1);

    // Playing a note for 1 sec. by MIDI number (on all channels of first output device). An array
    // of all output devices is available in WebMidi.outputs
    WebMidi.playNote(60, 1, 1000, WebMidi.outputs[0]);

    // Playing a note for 1 sec. (on channel 3 of a specific device)
    WebMidi.playNote(60, 1, 1000, WebMidi.outputs[0], 3);
    WebMidi.playNote(60, 1, 1000, WebMidi.outputs[0], 3, "+2000");    // wait 2 sec. before playing
    WebMidi.playNote(60, 1, 1000, WebMidi.outputs[0], 3, 50000);      // schedule 50 sec. after start

    // Stopping a playing note (with a release velocity at half)
    WebMidi.stopNote("C0", 0.5);
    WebMidi.stopNote("C0", 0.5, WebMidi.outputs[0], 12);             // For specific device and channel
    WebMidi.stopNote("C0", 0.5, WebMidi.outputs[0], 12, "+3000");    // After 3 sec. delay

    // Send polyphonic aftertouch message (half value)
    WebMidi.sendKeyAftertouch("C3", 0.5);
    WebMidi.sendKeyAftertouch("C3", 0.5, WebMidi.outputs[0], 12); // For specific device and channel

    // Send channel aftertouch
    WebMidi.sendChannelAftertouch(0.5, WebMidi.outputs[0], 12);

    // Send pitch bend (between -1 and 1)
    WebMidi.sendPitchBend(-1, WebMidi.outputs[0], 12);

    // Chaining method calls
    WebMidi.sendPitchBend(-1, WebMidi.outputs[0], 12)
      .sendPitchBend(-0.5, WebMidi.outputs[0], 12, "+200")
      .sendPitchBend(0, WebMidi.outputs[0], 12, "+400")
      .sendPitchBend(0.5, WebMidi.outputs[0], 12, "+800")
      .sendPitchBend(1, WebMidi.outputs[0], 12, "+1000");

    // Listening for a 'note on' message (on all devices and channels)
    WebMidi.addListener(
      'noteon',
      function(e){ console.log(e); }
    );

    // Listening for a 'note off' message (on 1st input device's channel 3)
    WebMidi.addListener(
      'noteoff',
      function(e){ console.log(e); },
      {input: WebMidi.outputs[0], channel: 3}
    );

    // Listening to other messages works the same way
    WebMidi.addListener(
      'pitchbend',
      function(e){ console.log(e); }
    );

    // The special 'statechange' event tells you that a device has been plugged or unplugged. For
    // system-wide events, you do not need to specify a device or channel.
    WebMidi.addListener(
      'statechange',
      function(e){ console.log(e); }
    );

    // You can also check and remove event listeners (in this case, you shouldn't use
    // anonymous methods).
    WebMidi.addListener('statechange', test);
    console.log("Has event listener: ",  WebMidi.hasListener('statechange', test) );
    WebMidi.removeListener('statechange', test);
    console.log("Has event listener: ",  WebMidi.hasListener('statechange', test) );

    function test(e) {
      console.log(e);
    }

  },

  // Failure handler
  function(m) {
    console.log("Could not enable MIDI interface: " + m);
  }

);
```

## Full API Documentation

The full **API documentation** is available for download in the `docs` folder. You can also 
**[view it online](http://cotejp.github.io/webmidi/classes/WebMidi.html)**.
