# WebMidi
_A JavaScript browser library making it easier to develop with the Web MIDI API._

## Background

The Web MIDI API is a really exciting piece of software that allos developers to interact
with MIDI musical devices. However, the Web MIDI API leaves it up to the developer to
manually encode MIDI messages before sending them. Reading the MIDI spec in order to
properly do that is not fun. Also the Web MIDI API makes it hard to react upon receiving 
MIDI messages from external devices. For example, it only allows a single callback 
function per channel and does not provide any help decoding the incoming binary messages. 
The goal behind WebMidi is to makes these things much easier.

## Installation

Even though it's a front-end library, you can nevertheless install WebMidi by using NPM.
If you already have [Node.js](https://nodejs.org/) installed, you also have NPM installed. 
This means you can install the `webmidi` package by issuing the following command in the 
Terminal (Mac, Linux) or the Command Prompt (Windows):

    npm install webmidi

If you prefer to do it the old fashioned way, you can 
[download the latest release](https://github.com/cotejp/webmidi/releases) packaged as a 
zip file. Uncompress it and then simply grab the `webmidi-x.x.x.min.js` file from the 
`dist` folder. Copy it to your project and link it to your HTML page as usual. By the way,
you will find the full API documentation in the `dist/docs` folder.

## Quick Start

Getting started is easy. The first thing to do is to enable WebMidi. When you call the
`WebMidi.enable()` function, you need to pass a callback function to execute upon success
and, optionnally, another callback function to execute upon failure. The `enable()` 
function will fail if the host browser does not suppport the Web MIDI API (currently, only 
Google Chrome does) or if the browser cannot connect to the host's MIDI subsystem.

Let's check if WebMidi can be enabled: 

```javascript
WebMidi.enable(onSuccess, onFailure);

function onSuccess() {
    console.log("WebMidi enabled.");
}

function onFailure(err) {
    console.log("WebMidi could not be enabled.", err);
}
```

To send MIDI messages with WebMidi, you simply need to pick the appropriate method and all
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

    // Playing a note (note number 60 on the 1st channel [0] at half velocity)
    WebMidi.playNote(0, 60, 0.5);
    WebMidi.playNote(0, 60, 0.5, 1000);           // send a noteoff after 1 sec.
    WebMidi.playNote(0, 60, 0.5, 1000, 1000);     // wait 1 sec. before playing

    // Stopping a playing note
    WebMidi.stopNote(0, 60, 1);
    WebMidi.stopNote(0, 60, 0.5, 2000);           // wait 2 sec. before stopping

    // Send polyphonic aftertouch message
    WebMidi.sendKeyAftertouch(0, 60, 0.5);
    WebMidi.sendKeyAftertouch(0, 60, 0.5, 1000);  // wait 1 sec. before sending

    // Send control change value 127 to controller 1 (modulation) on channel 0
    WebMidi.sendControlChange(0, 1, 127);
    WebMidi.sendControlChange(0, 1, 127, 1000);     // wait 1 sec. before sending

    // Send channel aftertouch
    WebMidi.sendChannelAftertouch(0, 0.5);

    // Send pitch bend (between -1 and 1)
    WebMidi.sendPitchBend(0, -1);

    // Chaining method calls
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
can also **[view it online](http://cote.cc/w/wp-content/uploads/projects/webmidi/docs/classes/WebMidi.html)**.
