# Changelog

Starting with version 3.x, all notable changes to WebMidi.js will be documented in this file. The 
format used is the one suggested by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.0.0]

### Added

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

- Various methods have been renamed. All old method names have been deprecated but will continue to
work in version 3.0:

  - `sendChannelAftertouch()` => `setChannelAftertouch()`
  - `sendKeyAftertouch()` => `setKeyAftertouch()`
  - `sendPitchBend()` => `setPitchBend()`
  - `sendSongPosition()` => `setSongPosition()`
  - `sendSongSelect()` => `setSong()`
  - `sendProgramChange()` => `setProgram()`

- Grunt has been replaced with NPM scripts for all build purposes.

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

### Removed

- Support for Bower.

### Fixed

## [2.5.1] - 2019-08-25

Versions 2.5.x and earlier have not been tracked in this changelog.
