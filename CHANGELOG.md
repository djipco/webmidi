# Changelog

Starting with version 3.x, all notable changes to WebMidi.js will be documented in this file. The 
format used is the one suggested by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.0.0]

### Added

- WebMidi.js now has builtin **Node.js** support thanks to the [jzz](https://www.npmjs.com/package/jzz)
node module by Jazz-Soft.

- WebMidi.js is now available in IIFE (Immediately Invoked Function Expression), CJS (CommonJS) and 
ESM (ECMAScript module) flavours (all with normal and minifed versions with sourcemaps).

- WebMidi.js now publishes a **TypeScript** definition file for CJS and ESM with all releases.

- WebMidi.js now explicitly checks for Jazz-Plugin support in environments with no native support 
for the Web MIDI API.

- The `WebMidi.enable()` method now returns a promise. The promise is fulfilled with the `WebMidi`
object. It still supports using a callback.

- `Input` and `Output` objects now emit `opened`, `closed` and `disconnected` events.

- Hundreds of unit tests have been added and test coverage is now available.

- There are new `InputChannel` and `OutputChannel` objects. They are used to communication with a 
  single channel of an input or output.

- All emitted events now have a `target` property referencing the object that triggered the event.

- The `sendNoteOn()` method has been added. It behaves the same way as `playNote()` does except it 
does not accept a `duration` option. It was added mostly for completeness' sake.

- The `sendNoteOff()` method has been added. It behaves the same way as `stopNote()` does. 
Actually, `stopNote()` is an alias to `sendNoteOff()`.

- All methods of the `Output` object that communication with a device are prefixed with "send". This 
  makes it easier to find the right method. Old method names are still usable but are deprecated.

- The `sendChannelAftertouch()`, `sendKeyAftertouch()` and `sendPitchbend()` method now have a 
`useRawValue` options allowing the assignment of value using an integer between 0 and 127 instead of
a float between 0 and 1.

- There is a new `Note` object that can be used in various places such as when calling `playNote()`
or `stopNote()`. It carries with it the note number, the duration (if any), the attack and release
information, etc.

- A `WebMidi.validation` property (defaults to `true`) can be used to disable all argument checking
and legacy support throughout the library (for performance). This property can also be in the 
options of `WebMidi.enable()`.

- The `send()` and `sendSysex()` methods of `Output` and `OutputChannel` can now officially use 
`Uint8Array` input (not supported on Node.js however).

- Licence has been changed to Apache 2.0

- An `octaveOffset` property has been added to `Input`, `InputChannel`, `Output` and 
`OutputChannel`. This means you can offset the octave globally, at the input/output level or at the
 channel level

- A `Message` object has been added. This allows easier routing of messages.

- Added support for RPN messages and improved NRPN parsing.

- A two-position array can now be passed to `sendControlChange()` to specify both MSB and LSB at 
once.

- The `InputChannel` object offers a `getNoteState()` method that reports if a note is currently 
playing or not. It also has a new `notesState` property which is an array holding the playing status
of all notes (0-127).

- It is now possible to add a forwarder to an `Input` that will forward MIDI messages to a specified
output. Also, the inbound messages can be filtered for forwarding by message type and channel. A new
`Forwarder` class has been added for that purpose.

- Added `WebMidi.version`

- The `WedMidi` object now has a `defaults` property where you can set system-wide defaults such as
the default `attack` and `release` velocity. More defaults to come!

### Changed

- [BREAKING CHANGE] Passing `undefined` as the `channel` value to `addListener()` no longer means
that all channels should be listening. This was a terrible design decision and it ends with version 
3.

- Documentation is now generated with [jsdoc](https://www.npmjs.com/package/jsdoc) instead of the 
outdated [yuidoc](https://www.npmjs.com/package/grunt-contrib-yuidoc).

- [BREAKING CHANGE] The `"controlchange"` event's `value` property is now a float between 0 and 1. 
Its `rawValue` property now contains the 7bit integer value (between 0 and 127).

- [BREAKING CHANGE] The `"nrpn"` event's `value` property is now a float between 0 and 1. 
Its `rawValue` property now contains the 16bit integer value (between 0 and 65535).

- Grunt has been replaced with NPM scripts for all build purposes.

- [BREAKING CHANGE] The `nrpnEventsEnabled` property has been moved from the `Input` class to the 
`InputChannel` class. Trying to access it will trigger a warning in the console.

- [BREAKING CHANGE] The `getCcNameByNumber()` method has been moved from the `Input` class to the 
`InputChannel` class and now returns `undefined` instead of `false` when no matching name is found.

- [BREAKING CHANGE] The `"tuningrequest"` event has been renamed `"tunerequest"`. 

- The event received by listeners registered on `Input` and `InputChannel` objects has been slightly 
changed. Its `data` property now contains a regular array (instead of a `Uint8Array`). Its `rawData` 
property now contains the `Uint8Array`.

- Several methods have been moved from the `WebMidi` object to the `Utilities` object. Using the old
methods will continue to work but will trigger a deprecation warning in the console.

- The `send()` method now accepts a `Message` object.

- If a device is disconnected and connected back, it will retain its state (such as listeners, 
etc.). This is particularly useful when the computer goes to sleep and is brought back online.

- Several conversion methods have been added to the new `Utilities` class such as 
`from7bitToFloat()`, `fromFloatTo7Bit()`, `fromMsbLsbToFloat()`, `fromFloatToMsbLsb()`, etc.

- All enumerations have been move to the `Enumerations` object (e.g. `MIDI_CHANNEL_MESSAGES`, 
`MIDI_CHANNEL_NUMBERS`, etc.)

### Deprecated

- The `velocity` option parameter has been renamed `attack`. There are new `rawAttack` and 
`rawRelease` parameters that should be used instead of setting `rawVelocity` to `true`.

- The `WebMidi.noteNameToNumber()` method was renamed and moved to `Utilities.toNoteNumber()`. The 
old method has been deprecated but will continue to work in v3.x.

- The `WebMidi.toMIDIChannels()` method was renamed and moved to `Utilities.sanitizeChannels()`. The
old method has been deprecated but will continue to work in v3.x.

- The name of the `Output.sendTuningRequest()` method was changed to `Output.sendTuneRequest()`. The
old name has been deprecated but will continue to work in v3.x.

- The `on()` method of the `Input` class has been deprecated. Use `addListener()` instead.

- The `InputChannel.nrpnEventsEnabled` property has been renamed to
`InputChannel.parameterNumberEventsEnabled`. The old property is deprecated but will be kept for 
backwards compatibility.

### Removed

- Support for Bower.


## [2.5.1] - 2019-08-25

Versions 2.5.x and earlier have not been tracked in this changelog.
