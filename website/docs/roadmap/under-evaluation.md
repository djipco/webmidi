---
sidebar_label: Under Evaluation
sidebar_position: 2
---

# Potential Enhancements To Evaluate

The analysis has not started yet. We will wait after the official launch of version 3. We do have a
lot of ideas and suggestions in store. Depending on whether these features break the API or not, 
they may make it into version 3.x or be deployed in v4.

:::info

If you have suggestions, please post them for discussion to the
[Feature Request](https://github.com/djipco/webmidi/discussions/categories/feature-requests)
category of our GitHub Discussions.

:::

## Ideas & Suggestions to Evaluate

If you feel any of these ideas should be given priority, plese explain why in the 
[Feature Request](https://github.com/djipco/webmidi/discussions/categories/feature-requests)
category of our GitHub Discussions so I can properly triage them.

* Add support for Web BLE MIDI ([browser implementation](https://github.com/skratchdot/ble-midi),
[Node implementation](https://github.com/natcl/ble-midi))

* Explore compatibility with WebMidiLink. Could we create an output that points to a WebMidiLinked
device?

* Could we allow `WebMidi.time` to be reset? (see 
[discussion #213](https://github.com/djipco/webmidi/discussions/213))

* Add throttling or delay option to `sendSysex` (see discussion
[#235](https://github.com/djipco/webmidi/discussions/235)).

* Calculate BPM from clock messages 
([Discussion #177](https://github.com/djipco/webmidi/discussions/177))

* Allow the first argument of `output.playNote( )` to be ‘0:0’ as ‘A0’, ‘7:3’ as ‘E:3’ and so on.

* Add a "mute" option for inputs/outputs

* Include the ability to add MIDI event listeners at the WebMidi.js level 
([Issue #138](https://github.com/djipco/webmidi/issues/138))

* Emit events on `send()` so outbound MIDI messages can be listened for 
([Discussion #171](https://github.com/djipco/webmidi/discussions/171))

* Add a `stopAllNotes()` method

* Calculate time values and make them directly available for `songposition` and `timecode` message

* Make Istanbul (nyc) break down the coverage stats by test file.

* Add the ability to send grouped messages for CC events (and potentially others)

* Add expliocit support for 
[MIDI Polyphonic Expressions](https://www.midi.org/midi-articles/midi-polyphonic-expression-mpe).

* Add explicit support for 
[Universal System Exclusive Messages](https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages)

  * This would include a `sendIdentityRequest()` method to the output object (perhaps with a 
  `getIdentity()` companion method that waits for the response) ([Issue #117](https://github.com/djipco/webmidi/issues/117))

  * This could also include the capability to query device for make/model (similar to 
  [jzz-midi-gear](https://www.npmjs.com/package/jzz-midi-gear))

  * Implement show control protocol subset

* Add ability to inject Jazz-Plugin code for browsers with no native Web MIDI API support.

* Add the option to create sysex plugins for various devices 
[forum thread](https://webmidijs.org/forum/discussion/comment/97#Comment_97)

* Add
[issue and PR templates](https://help.github.com/en/github/building-a-strong-community/about-issue-and-pull-request-templates)

* Add continuous integration tool

* Add ability to read/write MIDI files

* Solid timing, midi clock, sync, transport functionality

* Helper functions that help to deal with sysex checksum from specific manufacturer (Roland, 
checksum, etc.)

* Add explicit support for Sample Dump Format (see discussion on 
[forum](https://webmidijs.org/forum/discussion/30/has-there-been-any-work-on-sample-dump-standard))

* Allow third-party developers to develop modules that facilitate encoding and decoding of
device-specific sysex messages (see [forum discussion](https://webmidijs.org/forum/discussion/37/))

* Add timing capabilities such as syncing with Tone.js or being able to schedule events using
musical notes.

* Add the ability to export a MIDI file (perhaps with another lib such as 
[MidiWriterJS](https://www.npmjs.com/package/midi-writer-js) or 
[Jazz-Soft](https://jazz-soft.net/demo/WriteMidiFile.html)

* SMF Support

* Check if something specific needs to be done to support Electron 
([this discussion](https://www.electronjs.org/docs/api/session#sessetpermissionrequesthandlerhandler)).

* Evaluate whether if would be worth it to switch from the `midi` module to the `web-midi-test` 
module for unit tests (discussion [here](https://github.com/djipco/webmidi/discussions/223)).

## Enhancements Put On Hold For Now

* Consider usage of 
[pipelining operator](https://github.com/tc39/proposal-pipeline-operator/blob/master/README.md#introduction) 
for patching webmidi function calls to a sequence
 
* Consider using [middleware](https://github.com/unbug/js-middleware) approach for making the app 
pluggable

* Investigate the possibility to add a `Device` object that would group inputs and outputs for a
  single device (see [discussion #280](https://github.com/djipco/webmidi/discussions/280) for 
  details)

* Piano roll
