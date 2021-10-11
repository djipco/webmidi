
# Note

The `Note` class represents a single musical note such as `"D3"`, `"G#4"`, `"F-1"`, `"Gb7"`, etc.

`Note` objects can be played back on a single channel by calling
[OutputChannel.playNote()](OutputChannel#playNote) or on multiple channels of the same
output by calling [Output.playNote()](Output#playNote).

The note has attack and release velocities set at 0.5 by default. These can be changed by passing
in the appropriate option. It is also possible to set a system-wide default for attack and
release velocities by using the `WebMidi.defaults` property.

The note may have a duration. If it does, playback will be automatically stopped when the
duration has elapsed by sending a **noteoff** event. By default, the duration is set to
`Infinity`. In this case, it will never stop playing unless explicitly stopped by calling a
method such as [OutputChannel.stopNote()](OutputChannel#stopNote),
[Output.stopNote()](Output#stopNote) or similar.

**Since**: 3.0.0




### `new Note(...)`


  **Parameters**

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |string||The value used to create the note. If an identifier string is used, it must start with the note letter, optionally followed by an accidental and followed by the octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). If a number is used, it must be an integer between 0 and 127. In this case, middle C is considered to be C4 (note number 60).|
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the note should be explicitly stopped.|
    |[**`options.attack`**] |number|0.5|The note's attack velocity as a float between 0 and 1. If you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both `attack` and `rawAttack` are specified, the latter has precedence.|
    |[**`options.release`**] |number|0.5|The note's release velocity as a float between 0 and 1. If you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both `release` and `rawRelease` are specified, the latter has precedence.|
    |[**`options.rawAttack`**] |number|64|The note's attack velocity as an integer between 0 and 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both `attack` and `rawAttack` are specified, the latter has precedence.|
    |[**`options.rawRelease`**] |number|64|The note's release velocity as an integer between 0 and 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both `release` and `rawRelease` are specified, the latter has precedence.|





**Throws**:
  * `Error` : Invalid note identifier
  * `RangeError` : Invalid name value
  * `RangeError` : Invalid accidental value
  * `RangeError` : Invalid octave value
  * `RangeError` : Invalid duration value
  * `RangeError` : Invalid attack value
  * `RangeError` : Invalid release value

***

## Properties

### `.accidental`

The accidental (#, ##, b or bb) of the note

**Type**: string<br />
**Since**: 3.0.0<br />


### `.attack`

The attack velocity of the note as an integer between 0 and 127.

**Type**: number<br />
**Since**: 3.0.0<br />


### `.duration`

The duration of the note as a positive decimal number representing the number of milliseconds
that the note should play for.

**Type**: number<br />
**Since**: 3.0.0<br />


### `.identifier`

The name, optional accidental and octave of the note, as a string.

**Type**: string<br />
**Since**: 3.0.0<br />


### `.name`

The name (letter) of the note

**Type**: string<br />
**Since**: 3.0.0<br />


### `.number`

The MIDI number of the note. This number is derived from the note identifier using C4 as a
reference for middle C.

**Type**: number<br />
**Since**: 3.0.0<br />


### `.octave`

The octave of the note

**Type**: number<br />
**Since**: 3.0.0<br />


### `.rawAttack`

The attack velocity of the note as a positive integer between 0 and 127.

**Type**: number<br />
**Since**: 3.0.0<br />


### `.rawRelease`

The release velocity of the note as a positive integer between 0 and 127.

**Type**: number<br />
**Since**: 3.0.0<br />


### `.release`

The release velocity of the note as an integer between 0 and 127.

**Type**: number<br />
**Since**: 3.0.0<br />



***

## Methods

### `.getOffsetNumber(...)`

Returns a MIDI note number offset by the integer specified in the parameter. If the calculated
value is less than 0, 0 will be returned. If the calculated value is more than 127, 127 will be
returned. If an invalid value is supplied, 0 will be used.


  **Parameters**

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`offset`** ||||



**Returns: ** number<br />



