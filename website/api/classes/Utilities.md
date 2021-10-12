
# Utilities

The `Utilities` class contains general-purpose utility methods. All methods are static and
should be called using the class name. For example: `Utilities.getNoteDetails("C4")`.

**Since**: 3.0.0


***

## Methods

### `.buildNote(...)`

Converts the `input` parameter to a valid [Note](Note) object. The input usually is an unsigned
integer (0-127) or a note identifier (`"C4"`, `"G#5"`, etc.). If the input is a [Note](Note)
object, it will be returned as is.

If the input is a note number or identifier, it is possible to specify options by providing the
`options` parameter.


  **Parameters**

  > `buildNote([input], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`input`**] |number|||
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the note should be explicitly stopped.|
    |[**`options.attack`**] |number|64|The note's attack velocity as an integer between 0 and 127.|
    |[**`options.release`**] |number|64|The note's release velocity as an integer between 0 and 127.|
    |[**`options.octaveOffset`**] |number|0|An integer to offset the octave by. **This is only used when the input value is a note identifier.**|




  **Returns**: `Note`
**Since**: version 3.0.0<br />
**Attributes**: static

**Throws**:
  * TypeError The input could not be parsed to a note

### `.buildNoteArray(...)`

Converts an input value, which can be an unsigned integer (0-127), a note identifier, a
[Note](Note) object or an array of the previous types, to an array of [Note](Note) objects.

[Note](Note) objects are returned as is. For note numbers and identifiers, a [Note](Note)
object is created with the options specified. An error will be thrown when encountering invalid
input.


  **Parameters**

  > `buildNoteArray([notes], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`notes`**] |number|||
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the note should be explicitly stopped.|
    |[**`options.attack`**] |number|0.5|The note's attack velocity as a decimal number between 0 and 1.|
    |[**`options.release`**] |number|0.5|The note's release velocity as a decimal number between 0 and 1.|
    |[**`options.rawAttack`**] |number|64|The note's attack velocity as an integer between 0 and 127.|
    |[**`options.rawRelease`**] |number|64|The note's release velocity as an integer between 0 and 127.|
    |[**`options.octaveOffset`**] |number|0|An integer to offset the octave by. **This is only used when the input value is a note identifier.**|




  **Returns**: `Array.&lt;Note&gt;`
**Since**: 3.0.0<br />
**Attributes**: static

**Throws**:
  * TypeError An element could not be parsed as a note.

### `.getNoteDetails(...)`

Given a proper note identifier ("C#4", "Gb-1", etc.) or a valid MIDI note number (9-127), this
method returns an object containing broken down details about the specified note (uppercase
letter, accidental and octave).

When a number is specified, the translation to note is done using a value of 60 for middle C
(C4 = middle C).


  **Parameters**

  > `getNoteDetails(value)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |string||A note identifier A  atring ("C#4", "Gb-1", etc.) or a MIDI note number (0-127).|




  **Returns**: `Object`
**Since**: 3.0.0<br />
**Attributes**: static

**Throws**:
  * TypeError Invalid note identifier

### `.getPropertyByValue(...)`

Returns the name of the first property of the supplied object whose value is equal to the one
supplied.


  **Parameters**

  > `getPropertyByValue(object, value)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`object`** |Object|||
    |**`value`** |*|||




  **Returns**: `string`<br />The name of the matching property
**Attributes**: static


### `.guessNoteNumber(...)`

Returns a valid MIDI note number (0-127) given the specified input. The input usually is a
string containing a note identifier (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer
between 0 and 127 is passed, it will simply be returned as is (for convenience). Other strings
will be parsed for integer value, if possible.

If the input is an identifier, the resulting note number is offset by the `octaveOffset`
parameter. For example, if you pass in "C4" (note number 60) and the `octaveOffset` value is
-2, the resulting MIDI note number will be 36.


  **Parameters**

  > `guessNoteNumber(input)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`input`** |string||A string or number to extract the MIDI note number from.|




  **Returns**: `number` or `false`<br />A valid MIDI note number (0-127) or `false` if the input could not
successfully be parsed to a note number.
**Since**: 3.0.0<br />
**Attributes**: static


### `.offsetNumber(...)`

Returns the supplied MIDI note number offset by the requested octave and semitone values. If
the calculated value is less than 0, 0 will be returned. If the calculated value is more than
127, 127 will be returned. If an invalid offset value is supplied, 0 will be used.


  **Parameters**

  > `offsetNumber(offset)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`offset`** ||||




  **Returns**: `number`<br />An integer between 0 and 127
**Attributes**: static

**Throws**:
  * `Error` : Invalid note number

### `.sanitizeChannels(...)`

Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be a
single integer or an array of integers.

For backwards-compatibility, passing `undefined` as a parameter to this method results in all
channels being returned (1-16). Otherwise, parameters that cannot successfully be parsed to
integers between 1 and 16 are silently ignored.


  **Parameters**

  > `sanitizeChannels([channel])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`channel`**] |number||An integer or an array of integers to parse as channel numbers.|




  **Returns**: `Array`<br />An array of 0 or more valid MIDI channel numbers.
**Since**: 3.0.0<br />
**Attributes**: static


### `.to7Bit(...)`

Returns a number between 0 and 127 which is the result of multiplying the input value by 127.
The input value should be number between 0 and 1 (inclusively). The returned value is
restricted between 0 and 127 even if the input is greater than 1 or smaller than 0.

Passing `Infinity` will return `127` and passing `-Infinity` will return `0`. Otherwise, when
the input value cannot be converted to a number, the method returns 0.


  **Parameters**

  > `to7Bit(value)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |||A positive integer between 0 and 127 (inclusive)|




  **Returns**: `number`<br />A number between 0 and 1 (inclusive)
**Attributes**: static


### `.toNormalized(...)`

Returns a number between 0 and 1 representing the ratio of the input value divided by 127 (7
bit). The returned value is restricted between 0 and 1 even if the input is greater than 127 or
smaller than 0.

Passing `Infinity` will return `1` and passing `-Infinity` will return `0`. Otherwise, when the
input value cannot be converted to an integer, the method returns 0.


  **Parameters**

  > `toNormalized(value)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |||A positive integer between 0 and 127 (inclusive)|




  **Returns**: `number`<br />A number between 0 and 1 (inclusive)
**Attributes**: static


### `.toNoteIdentifier(...)`

Returns an identifier string representing a note name (with optional accidental) followed by an
octave number. The octave can be offset by using the `octaveOffset` parameter.


  **Parameters**

  > `toNoteIdentifier(number, octaveOffset)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** |number||The MIDI note number to convert to a note identifier|
    |**`octaveOffset`** |number||An offset to apply to the resulting octave|




  **Returns**: `string`
**Since**: 3.0.0<br />
**Attributes**: static

**Throws**:
  * RangeError Invalid note number
  * RangeError Invalid octaveOffset value

### `.toNoteNumber(...)`

Returns a MIDI note number matching the identifier passed in the form of a string. The
identifier must include the octave number. The identifier also optionally include a sharp (#),
a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
identifiers: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.

When converting note identifiers to numbers, C4 is considered to be middle C (MIDI note number
60) as per the scientific pitch notation standard.

The resulting note number can be offset by using the `octaveOffset` parameter.


  **Parameters**

  > `toNoteNumber(identifier, [octaveOffset])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`identifier`** |string||The identifier in the form of a letter, followed by an optional "#", "##", "b" or "bb" followed by the octave number. For exemple: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.|
    |[**`octaveOffset`**] |number|0|A integer to offset the octave by.|




  **Returns**: `number`<br />The MIDI note number (an integer between 0 and 127).
**Since**: 3.0.0<br />
**Attributes**: static

**Throws**:
  * RangeError Invalid &#x27;octaveOffset&#x27; value
  * TypeError Invalid note identifier

### `.toTimestamp(...)`

Returns a valid timestamp, relative to the navigation start of the document, derived from the
`time` parameter. If the parameter is a string starting with the "+" sign and followed by a
number, the resulting timestamp will be the sum of the current timestamp plus that number. If
the parameter is a positive number, it will be returned as is. Otherwise, false will be
returned.


  **Parameters**

  > `toTimestamp([time])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`time`**] |number||The time string (e.g. `"+2000"`) or number to parse|




  **Returns**: `number` or `false`<br />A positive number or `false` (if the time cannot be converted)
**Since**: 3.0.0<br />
**Attributes**: static



