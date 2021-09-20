# Changelog

Starting with version 3.x, all notable changes to WebMidi.js will be documented in this file. The 
format used is the one suggested by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.0.0]

### Added

- WebMidi.js now has builtin Node.js support thanks to the [jzz](https://www.npmjs.com/package/jzz)
node module by Jazz-Soft.

- WebMidi.js now explicitly checks for Jazz-Plugin support in environments with no native support 
for the Web MIDI API.

- The `WebMidi.enabled()` method now returns a promise. The promise is fulfilled with an object 
referencing the available inputs and outputs.

- `Input` and `Output` objects now emit `opened`, `closed` and `disconnected` events.

- There are new `InputChannel` and `OutputChannel` objects. They have most of the methods of the ...

- All emitted events now have a `target` property referencing the object that triggered the event.

- The `sendNoteOn()` method has been added. It behaves the same way as `playNote()` does except it 
does not accept a `duration` option. It was added mostly for completeness' sake.

- The `sendNoteOff()` message has been added. It behaves the same way as `stopNote()` does. 
Actually, `stopNote()` is an alias to `sendNoteOff()`.

- The `setChannelAftertouch()`, `setKeyAftertouch()` and `setPitchbend()` method now have a 
`useRawValue` options allowing the assignment of value using an integer between 0 and 127 instead of
a float between 0 and 1.

- There is a new `Note` object that can be used im various places such as when calling `playNote()`
or `stopNote()`. It carries with it the note number, the duration (if any), the attack and release
information, etc.

- A `WebMidi.validation` property (defaults to `true`) can be used to disable all argument checking
and legacy support throughout the library (for performance). This property can also be in the 
options of `WebMidi.enable()`.

- The `send()` method of `Output` and `OutputChannel` can now officially use `Uint8Array` input

- Licence has been changed to Apache 2.0

- An `octaveOffset` property has been added to `Input`, `InputChannel`, `Output` and 
`OutputChannel`.

### Changed

- [BREAKING CHANGE] Passing `undefined` as the `channel` value to `addListener()` no longer means
that all channels should be listening. This was a terrible design decision and it ends with version 
3.

- All non-chainable methods now return `false` instead of returning `undefined` or throwing an error
when invalid input is provided. Methods that were changed to match this behaviour are 
`WebMidi.guessNoteNumber()`, `WebMidi.getOctave()`, `WebMidi.getNoteNumberByName()`, 
`Input.getCcNameByNumber()`, `Input.getChannelModeByNumber()`.

- Documentation is now generated with [jsdoc](https://www.npmjs.com/package/jsdoc) instead of the 
outdated [yuidoc](https://www.npmjs.com/package/grunt-contrib-yuidoc).

- The `sendProgramChange()`, `sendSongSelect()`, `setTuningProgram()` and `setTuningBank()` methods 
now accepts values between 1 and 128 instead of between 0 and 127. This change aligns WebMidi.js 
with most devices that use a numbering scheme starting at 1 in such cases. As a general rule, when 
the number represents an enumeration it will be one-based (like channel numbers, program numbers, or 
bank numbers). When the number represents a magnitude, it will be zero-based (like control change 
values).

- [BREAKING CHANGE] The `"controlchange"` event's `value` property is now a float between 0 and 1. 
Its `rawValue` property now contains the 7bit integer value (between 0 and 127).

- [BREAKING CHANGE] The `"nrpn"` event's `value` property is now a float between 0 and 1. 
Its `rawValue` property now contains the 16bit integer value (between 0 and 65535).

- [BREAKING CHANGE] The `"songselect"` event now reports the song as an integer between 1 and 128 
(instead of 0-127).

- Various methods have been renamed. All old method names have been deprecated but will continue to
work in version 3.0:

  - `sendChannelAftertouch()` => `setChannelAftertouch()`
  - `sendKeyAftertouch()` => `setKeyAftertouch()`
  - `sendPitchBend()` => `setPitchBend()`
  - `sendSongPosition()` => `setSongPosition()`
  - `sendSongSelect()` => `setSong()`
  - `sendProgramChange()` => `setProgram()`

- Grunt has been replaced with NPM scripts for all build purposes.

- [BREAKING CHANGE] The `nrpnEventsEnabled` property has been moved from the `Input` class to the 
`InputChannel` class. Trying to access it will trigger a warning in the console.

- [BREAKING CHANGE] The `getCcNameByNumber()` method has been moved from the `Input` class to the 
`InputChannel` class and now returns `undefined` instead of `false` when no matching name is found.

- [BREAKING CHANGE] The `"tuningrequest"` event has been renamed `"tunerequest"`. 

- Although still supported, passing `"all"` as the `channel` parameter is now discouraged for 
performance reasons. It has been removed from the documentation.

- The event received by listeners registered on `Input` and `InputChannel` objects has been slightly 
changed. Its `data` property now contains a regular array (instead of a `Uint8Array`). Its `rawData` 
property now contains the `Uint8Array`.

- Several methods have been moved from the `WebMidi` object to the `Utilities` object. Using the old
methods will continue to work but will trigger a deprecation warning in the console.

### Deprecated

- The `velocity` option parameter has been renamed `attack`. There are new `rawAttack` and 
`rawRelease` parameters that should be used instead of setting `rawVelocity` to `true`.

- The name of the `WebMidi.noteNameToNumber()` method was changed to 
`WebMidi.getNoteNumberByName()`. The old name has been deprecated but will continue to work in v3.x.

- The name of the `WebMidi.toMIDIChannels()` method was changed to `WebMidi.sanitizeChannels()`. The
old name has been deprecated but will continue to work in v3.x.

- The name of the `Output.sendTuningRequest()` method was changed to `Output.sendTuneRequest()`. The
old name has been deprecated but will continue to work in v3.x.

- The name of the `WebMidi.MIDI_CHANNEL_MESSAGES` enum was changed to 
`WebMidi.MIDI_CHANNEL_VOICE_MESSAGES`. The old name has been deprecated but will continue to work in
v3.x.

- The `on()` method of the `Input` class has been deprecated. Use `addListener()` instead.

### Removed

- Support for Bower.


## [2.5.1] - 2019-08-25

Versions 2.5.x and earlier have not been tracked in this changelog.
