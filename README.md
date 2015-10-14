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
If you already have Node.js installed, you also have NPM installed. This means you can
install the `webmidi` package by issuing the following command in the Terminal (Mac, 
Linux) or the Command Prompt (Windows):

    npm install webmidi

Otherwise, just grab the `webmidi-x.x.x.min.js` file from the packaged zip or from the
[GitHub Repo](https://github.com/cotejp/webmidi). You can find it in the `dist` folder. 
Save it to your project and link it to your HTML page as usual.

## Quick Start

Getting started is easy. The first thing to do is to enable WebMidi. When you call the
`WebMidi.enable()` function, you need to pass a callback function to execute upon success
and, optionnally, another callback function to execute upon failure. The `enable()` 
function will fail if the host browser does not suppport the Web MIDI API (currently, only 
Google Chrome does) or if the browser cannot connect to the host's MIDI subsystem.

Let's check if WebMidi can be enabled: 

    WebMidi.enable(onSuccess, onFailure);

    function onSuccess() {
        console.log("WebMidi enabled.");
    }

    function onFailure(err) {
        console.log("WebMidi could not be enabled.", err);
    }

To send MIDI messages with WebMidi, you simply need to pick the appropriate method and all
the native MIDI communication will be handled for you. For example, let's say we want to
send a 'noteon' MIDI message to the device on channel 2 so it plays note number 76 at half
velocity:

    WebMidi.playNote(2, 76, 0.5);

That's it.

By the way, you should note that, just like in the Web MIDI API, channel numbers are
zero-indexed (from 0 to 15).

Receiving messages is just as easy. You simply have to set a callback function to be
triggered when a specific MIDI message is received. For example, to listen for pitch bend
events on any MIDI input channels:

    WebMidi.addEventListener('pitchbend', function(e) {
        console.log("Pitch value: " + e.value);
    });


## Receiving messages

Coming soon.

## Sending messages

Coming soon.

## Using chaining

Coming soon.

## Full API Documentation

The full **API documentation** is available for download in the `dist/docs` folder. You
can also **[view it online](http://cotejp.github.io/node-phidgets/docs/)**.
