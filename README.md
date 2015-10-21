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
send a 'noteon' MIDI message to the device on channel 2 so it plays note number 76 at half
velocity:

```javascript
WebMidi.playNote(2, 76, 0.5);
```

That's it.

By the way, you should note that, just like in the Web MIDI API, channel numbers are
zero-indexed (from 0 to 15).

Receiving messages is just as easy. You simply have to set a callback function to be
triggered when a specific MIDI message is received. For example, to listen for pitch bend
events on any MIDI input channels:

```javascript
WebMidi.addEventListener('pitchbend', function(e) {
    console.log("Pitch value: " + e.value);
});
```

## More code examples

```javascript
// Enable WebMidi. 3 parameters: onSuccess handler, onFailure handler and boolean
// indicating if you want to use system exclusive messages (defaults to false).
WebMidi.enable(

  function() { 

    // Viewing available inputs and outputs
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);

    // Getting the current time
    console.log(WebMidi.time);

    // Playing a note by name (3rd octave F# on the 1st channel [0])
    WebMidi.playNote(0, "F#3");
    WebMidi.playNote(0, "F#3", 0.5);               // half velocity
    WebMidi.playNote(0, "F#3", 0.5, 1000);         // duration of 1000 milliseconds

    // Playing multiple notes simultaneously on the 4th MIDI channel [3]
    WebMidi.playNote(3, ["C0", "D#0", "G0"]);

    // Playing a note by MIDI number (on the 1st channel [0] at half velocity)
    WebMidi.playNote(0, 60, 0.5);

    // Stopping a playing note
    WebMidi.stopNote(0, 60, 1);                   // by note number
    WebMidi.stopNote(0, "C1", 1);                 // by name
    WebMidi.stopNote(0, "F#3", 0.5);              // 0.5 release velocity
    WebMidi.stopNote(0, "F#3", 0.5, 2000);        // wait 2 sec. before stopping

    // Send polyphonic aftertouch message
    WebMidi.sendKeyAftertouch(0, 60, 0.5);
    WebMidi.sendKeyAftertouch(0, 60, 0.5, 1000);  // wait 1 sec. before sending

    // Send control change value 127 to controller 1 (modulation) on channel 0
    WebMidi.sendControlChange(0, 1, 127);
    WebMidi.sendControlChange(0, 1, 127, 1000);   // wait 1 sec. before sending

    // Send channel aftertouch
    WebMidi.sendChannelAftertouch(0, 0.5);

    // Send pitch bend (between -1 and 1)
    WebMidi.sendPitchBend(0, -1);

    // Chaining multiple method calls
    WebMidi.sendPitchBend(0, -1)
      .sendPitchBend(0, -0.5, 200)
      .sendPitchBend(0, 0, 400)
      .sendPitchBend(0, 0.5, 800)
      .sendPitchBend(0, 1, 1000);

    // Listening for a 'note on' message (on all channels)
    WebMidi.addEventListener(
      'noteon',
      function(e){ console.log(e); },
      'all'
    );

    // Listening for a 'note on' message (on channel 0 only)
    WebMidi.addEventListener(
      'noteon',
      function(e){ console.log(e); },
      0
    );

    // Listening to other messages works the same way (defaults to 'all' channels)
    WebMidi.addEventListener(
      'noteoff',
      function(e){ console.log(e); }
    );

    WebMidi.addEventListener(
      'pitchbend',
      function(e){ console.log(e); }
    );


    // The special 'statechange' event tells you that a device has been plugged or
    // unplugged. For system-wide events, you do not need to specify a channel.
    WebMidi.addEventListener(
      'statechange',
      function(e){ console.log(e); }
    );


    // You can also check and remove event listeners (in this case, you shouldn't use
    // anonymous methods).
    WebMidi.addEventListener('statechange', test);
    console.log("Has event listener: ",  WebMidi.hasEventListener('statechange', test) );
    WebMidi.removeEventListener('statechange', test);
    console.log("Has event listener: ",  WebMidi.hasEventListener('statechange', test) );

    function test(e) {
      console.log(e);
    }

  },

  function(m) {
    console.log("Could not enable MIDI interface: " + m);
  },

  true      // Whether to enable sysex or not. When set to 'true', it might trigger an
            // authorization prompt to the user. If you do not need it, leave it to false.

);
```

## Full API Documentation

The full **API documentation** is available for download in the `dist/docs` folder. You
can also **[view it online](http://cotejp.github.io/webmidi/classes/WebMidi.html)**.
