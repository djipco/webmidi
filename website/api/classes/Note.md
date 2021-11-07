
# Note

The `Note` class represents a single musical note such as `"D3"`, `"G#4"`, `"F-1"`, `"Gb7"`, etc.

`Note` objects can be played back on a single channel by calling
[`OutputChannel.playNote()`](OutputChannel#playNote) or, on multiple channels of the same
output, by calling [`Output.playNote()`](Output#playNote).

The note has [`attack`](#attack) and [`release`](#release) velocities set at `0.5` by default.
These can be changed by passing in the appropriate option. It is also possible to set a
system-wide default for attack and release velocities by using the
[`WebMidi.defaults`](WebMidi#defaults) property.

If you prefer to work with raw MIDI values (`0` to `127`), you can use [`rawAttack`](#rawAttack) and
[`rawRelease`](#rawRelease) to both get and set the values.

The note may have a [`duration`](#duration). If it does, playback will be automatically stopped
when the duration has elapsed by sending a `"noteoff"` event. By default, the duration is set to
`Infinity`. In this case, it will never stop playing unless explicitly stopped by calling a
method such as [`OutputChannel.stopNote()`](OutputChannel#stopNote),
[`Output.stopNote()`](Output#stopNote) or similar.

**Since**: 3.0.0



### `Constructor`


  **Parameters**

  > `new Note(value, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** | string<br />number<br /> ||The value used to create the note. If an identifier string is used, it must start with the note letter, optionally followed by an accidental and followed by the octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). If a number is used, it must be an integer between 0 and 127. In this case, middle C is considered to be C4 (note number 60).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the note should be explicitly stopped.|
    |[**`options.attack`**] | number<br /> |0.5|The note's attack velocity as a float between 0 and 1. If you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both `attack` and `rawAttack` are specified, the latter has precedence.|
    |[**`options.release`**] | number<br /> |0.5|The note's release velocity as a float between 0 and 1. If you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both `release` and `rawRelease` are specified, the latter has precedence.|
    |[**`options.rawAttack`**] | number<br /> |64|The note's attack velocity as an integer between 0 and 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both `attack` and `rawAttack` are specified, the latter has precedence.|
    |[**`options.rawRelease`**] | number<br /> |64|The note's release velocity as an integer between 0 and 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both `release` and `rawRelease` are specified, the latter has precedence.|

  </div>


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

### `.accidental` {#accidental}
**Since**: 3.0.0<br />
**Type**: string<br />


The accidental (#, ##, b or bb) of the note


### `.attack` {#attack}
**Since**: 3.0.0<br />
**Type**: number<br />


The attack velocity of the note as an integer between 0 and 127.


### `.duration` {#duration}
**Since**: 3.0.0<br />
**Type**: number<br />


The duration of the note as a positive decimal number representing the number of milliseconds
that the note should play for.


### `.identifier` {#identifier}
**Since**: 3.0.0<br />
**Type**: string<br />


The name, optional accidental and octave of the note, as a string.


### `.name` {#name}
**Since**: 3.0.0<br />
**Type**: string<br />


The name (letter) of the note


### `.number` {#number}
**Since**: 3.0.0<br />
**Type**: number<br />


The MIDI number of the note. This number is derived from the note identifier using C4 as a
reference for middle C.


### `.octave` {#octave}
**Since**: 3.0.0<br />
**Type**: number<br />


The octave of the note


### `.rawAttack` {#rawAttack}
**Since**: 3.0.0<br />
**Type**: number<br />


The attack velocity of the note as a positive integer between 0 and 127.


### `.rawRelease` {#rawRelease}
**Since**: 3.0.0<br />
**Type**: number<br />


The release velocity of the note as a positive integer between 0 and 127.


### `.release` {#release}
**Since**: 3.0.0<br />
**Type**: number<br />


The release velocity of the note as an integer between 0 and 127.



***

## Methods


### `.getOffsetNumber(...)` {#getOffsetNumber}


Returns a MIDI note number offset by octave and/or semitone. If the calculated value is less
than 0, 0 will be returned. If the calculated value is more than 127, 127 will be returned. If
an invalid value is supplied, 0 will be used.


  **Parameters**

  > Signature: `getOffsetNumber([octaveOffset], [semitoneOffset])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`octaveOffset`**] | number<br /> |0|An integer to offset the note number by octave.|
    |[**`semitoneOffset`**] | number<br /> |0|An integer to offset the note number by semitone.|

  </div>


**Return Value**

> Returns: `number`
> An integer between 0 and 127




