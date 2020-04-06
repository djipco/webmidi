[![npm](https://img.shields.io/npm/v/webmidi.svg)](https://www.npmjs.com/package/webmidi)
[![npm](https://img.shields.io/npm/dt/webmidi.svg)](https://www.npmjs.com/package/webmidi)

## Background TO COMPLETE !!!!!

The [Web MIDI API](https://webaudio.github.io/web-midi-api/) is a really exciting addition
to the web platform that allows web developers to interact with MIDI musical instruments 
and devices. While great, most developers will find the *Web MIDI API* to be a bit too 
low-level for their needs. For example, sending and receiving MIDI messages involves 
performing binary arithmetic to encode or decode MIDI byte streams. Having to read the 
MIDI spec in order to properly do that is not fun. Also the native *Web MIDI API* makes it hard 
to react upon receiving MIDI messages from external devices. For example, it only allows a 
single callback function per channel. The goal behind **WebMidi.js** is to make all these things 
much easier.
