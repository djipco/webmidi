# Changelog

Starting with version 3.x, all notable changes to WebMidi.js will be documented in this file. The 
format used is the one suggested by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.0.0]

### Added

- WebMidi.js now has builtin Node.js support.

- The `WebMidi.enabled()` method now returns a promise. The promise is fulfilled with an object 
referencing the available inputs and outputs.

- `Input` and `Output` objects now emit `opened`, `closed` and `disconnected` events.

- All emitted events now have a `target` property referencing the object that triggered the event.

- The `sendNoteOn()` method has been added. It behaves the same way as `playNote()` does except it 
does not accept a `duration` option. It was added mostly for completeness' sake.

- The `sendNoteOff()` message has been added. It behaves the same way as `stopNote()` does. 
Actually, `stopNote()` is an alias to `sendNoteOff()`.

- The `setChannelAftertouch()`, `setKeyAftertouch()` and `setPitchbend()` method now have a 
`useRawValue` options allowing to assign value using an integer between 0 and 127 instead of a float
between 0 and 1.

- A CHANGELOG.md file was added to the project to trach changes.

### Changed

- [BREAKING CHANGE] The `iife` version of the library is now namespaced inside the `webmidi` 
global property. This means that the `WebMidi` object is accessible at `webmidi.WebMidi`.

- All non-chainable methods now return `false` instead of returning `undefined` or throwing an error
when invalid input is provided. Methods that were changed to match this behaviour are 
`WebMidi.guessNoteNumber()`, `WebMidi.getOctave()`, `WebMidi.getNoteNumberByName()`, 
`Input.getCcNameByNumber()`, `Input.getChannelModeByNumber()`

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
`InputChannel` class.

- [BREAKING CHANGE] The `"tuningrequest"` event has been renamed `"tunerequest"`.

- Although still supported, passing `"all"` as the `channel` parameter is now discouraged for 
performance reasons. For this reason, it has been removed from the documentation.

### Deprecated

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

### Fixed

## [2.5.1] - 2019-08-25

Versions 2.5.x and earlier have not been tracked in this changelog.
