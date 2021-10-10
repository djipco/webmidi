# Note

The `Note` class represents a single musical note such as `"D3"`, `"G#4"`, `"F-1"`, `"Gb7"`, etc.

`Note` objects can be played back on a single channel by calling
[OutputChannel.playNote()]{@link OutputChannel#playNote} or on multiple channels of the same
output by calling [Output.playNote()]{@link Output#playNote}.

The note has attack and release velocities set at 0.5 by default. These can be changed by passing
in the appropriate option. It is also possible to set a system-wide default for attack and
release velocities by using the `WebMidi.defaults` property.

The note may have a duration. If it does, playback will be automatically stopped when the
duration has elapsed by sending a **noteoff** event. By default, the duration is set to
`Infinity`. In this case, it will never stop playing unless explicitly stopped by calling a
method such as [OutputChannel.stopNote()]{@link OutputChannel#stopNote},
[Output.stopNote()]{@link Output#stopNote} or similar.

**Since**: 3.0.0




### `new Note(...)`

**Signature**

> Note(value, options, options.duration, options.attack, options.release, options.rawAttack, options.rawRelease)

**Parameters**

***

## Properties

### `.accidental`
**Type**: string

The accidental (#, ##, b or bb) of the note



### `.attack`
**Type**: number

The attack velocity of the note as an integer between 0 and 127.



### `.duration`
**Type**: number

The duration of the note as a positive decimal number representing the number of milliseconds
that the note should play for.



### `.identifier`
**Type**: string

The name, optional accidental and octave of the note, as a string.



### `.name`
**Type**: string

The name (letter) of the note



### `.number`
**Type**: number

The MIDI number of the note. This number is derived from the note identifier using C4 as a
reference for middle C.



### `.octave`
**Type**: number

The octave of the note



### `.rawAttack`
**Type**: number

The attack velocity of the note as a positive integer between 0 and 127.



### `.rawRelease`
**Type**: number

The release velocity of the note as a positive integer between 0 and 127.



### `.release`
**Type**: number

The release velocity of the note as an integer between 0 and 127.




***

## Methods

### `.getOffsetNumber(...)`

Returns a MIDI note number offset by the integer specified in the parameter. If the calculated
value is less than 0, 0 will be returned. If the calculated value is more than 127, 127 will be
returned. If an invalid value is supplied, 0 will be used.

**Signature**

> getOffsetNumber(offset) ⇒ number

**Parameters**


| Parameter    | Attributes   | Description  |
| ------------ | ------------ | ------------ |
  |**`offset`**|Type: <br />Default: <br />mandatory||


