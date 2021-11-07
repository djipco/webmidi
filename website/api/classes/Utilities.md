
# Utilities

The `Utilities` class contains general-purpose utility methods. All methods are static and
should be called using the class name. For example: `Utilities.getNoteDetails("C4")`.

**Since**: 3.0.0


***

## Methods


### `.buildNote(...)` {#buildNote}

**Since**: version 3.0.0<br />

Converts the `input` parameter to a valid [Note](Note) object. The input usually is an unsigned
integer (0-127) or a note identifier (`"C4"`, `"G#5"`, etc.). If the input is a [Note](Note)
object, it will be returned as is.

If the input is a note number or identifier, it is possible to specify options by providing the
`options` parameter.


  **Parameters**

  > Signature: `buildNote([input], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`input`**] | number<br />string<br />Note<br /> |||
    |[**`options`**] | object<br /> |{}||
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the note should be explicitly stopped.|
    |[**`options.attack`**] | number<br /> |64|The note's attack velocity as an integer between 0 and 127.|
    |[**`options.release`**] | number<br /> |64|The note's release velocity as an integer between 0 and 127.|
    |[**`options.octaveOffset`**] | number<br /> |0|An integer to offset the octave by. **This is only used when the input value is a note identifier.**|

  </div>


**Return Value**

> Returns: `Note`

**Attributes**: static

**Throws**:
  * TypeError The input could not be parsed to a note


### `.buildNoteArray(...)` {#buildNoteArray}

**Since**: 3.0.0<br />

Converts an input value, which can be an unsigned integer (0-127), a note identifier, a
[Note](Note) object or an array of the previous types, to an array of [Note](Note) objects.

[Note](Note) objects are returned as is. For note numbers and identifiers, a [Note](Note)
object is created with the options specified. An error will be thrown when encountering invalid
input.


  **Parameters**

  > Signature: `buildNoteArray([notes], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`notes`**] | number<br />string<br />Note<br />Array.&lt;number&gt;<br />Array.&lt;string&gt;<br />Array.&lt;Note&gt;<br /> |||
    |[**`options`**] | object<br /> |{}||
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the note should be explicitly stopped.|
    |[**`options.attack`**] | number<br /> |0.5|The note's attack velocity as a decimal number between 0 and 1.|
    |[**`options.release`**] | number<br /> |0.5|The note's release velocity as a decimal number between 0 and 1.|
    |[**`options.rawAttack`**] | number<br /> |64|The note's attack velocity as an integer between 0 and 127.|
    |[**`options.rawRelease`**] | number<br /> |64|The note's release velocity as an integer between 0 and 127.|
    |[**`options.octaveOffset`**] | number<br /> |0|An integer to offset the octave by. **This is only used when the input value is a note identifier.**|

  </div>


**Return Value**

> Returns: `Array.<Note>`

**Attributes**: static

**Throws**:
  * TypeError An element could not be parsed as a note.


### `.from7bitToFloat(...)` {#from7bitToFloat}


Returns a number between 0 and 1 representing the ratio of the input value divided by 127 (7
bit). The returned value is restricted between 0 and 1 even if the input is greater than 127 or
smaller than 0.

Passing `Infinity` will return `1` and passing `-Infinity` will return `0`. Otherwise, when the
input value cannot be converted to an integer, the method returns 0.


  **Parameters**

  > Signature: `from7bitToFloat(value)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |  ||A positive integer between 0 and 127 (inclusive)|

  </div>


**Return Value**

> Returns: `number`
A number between 0 and 1 (inclusive)


**Attributes**: static



### `.fromFloatTo7Bit(...)` {#fromFloatTo7Bit}


Returns a number between 0 and 127 which is the result of multiplying the input value by 127.
The input value should be number between 0 and 1 (inclusively). The returned value is
restricted between 0 and 127 even if the input is greater than 1 or smaller than 0.

Passing `Infinity` will return `127` and passing `-Infinity` will return `0`. Otherwise, when
the input value cannot be converted to a number, the method returns 0.


  **Parameters**

  > Signature: `fromFloatTo7Bit(value)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |  ||A positive integer between 0 and 127 (inclusive)|

  </div>


**Return Value**

> Returns: `number`
A number between 0 and 1 (inclusive)


**Attributes**: static



### `.fromFloatToMsbLsb(...)` {#fromFloatToMsbLsb}


Extracts 7bit MSB and LSB values from the supplied float.


  **Parameters**

  > Signature: `fromFloatToMsbLsb(value)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** | number<br /> ||A float between 0 and 1|

  </div>


**Return Value**

> Returns: `Object`

**Attributes**: static



### `.fromMsbLsbToFloat(...)` {#fromMsbLsbToFloat}


Combines and converts MSB and LSB values (0-127) to a float between 0 and 1. The returned value
is within between 0 and 1 even if the result is greater than 1 or smaller than 0.


  **Parameters**

  > Signature: `fromMsbLsbToFloat(msb, [lsb])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`msb`** | number<br /> ||The most significant byte as a integer between 0 and 127.|
    |[**`lsb`**] | number<br /> |0|The least significant byte as a integer between 0 and 127.|

  </div>


**Return Value**

> Returns: `number`
A float between 0 and 1.


**Attributes**: static



### `.getCcNameByNumber(...)` {#getCcNameByNumber}


Returns the name of a control change message matching the specified number. Some valid control
change numbers do not have a specific name or purpose assigned in the MIDI
[spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
In this case, the method returns `undefined`.


  **Parameters**

  > Signature: `getCcNameByNumber(number)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** | number<br /> ||An integer representing the control change message|

  </div>


**Return Value**

> Returns: `string` or `undefined`
The matching control change name or `undefined` if not match was
found.


**Attributes**: static



### `.getChannelModeByNumber(...)` {#getChannelModeByNumber}

**Since**: 2.0.0<br />

Returns the channel mode name matching the specified number. If no match is found, the function
returns `false`.


  **Parameters**

  > Signature: `getChannelModeByNumber(number)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** | number<br /> ||An integer representing the channel mode message.|

  </div>


**Return Value**

> Returns: `string` or `false`
The name of the matching channel mode or `false` if not match could be
found.


**Attributes**: static



### `.getNoteDetails(...)` {#getNoteDetails}

**Since**: 3.0.0<br />

Given a proper note identifier ("C#4", "Gb-1", etc.) or a valid MIDI note number (9-127), this
method returns an object containing broken down details about the specified note (uppercase
letter, accidental and octave).

When a number is specified, the translation to note is done using a value of 60 for middle C
(C4 = middle C).


  **Parameters**

  > Signature: `getNoteDetails(value)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** | string<br />number<br /> ||A note identifier A  atring ("C#4", "Gb-1", etc.) or a MIDI note number (0-127).|

  </div>


**Return Value**

> Returns: `Object`

**Attributes**: static

**Throws**:
  * TypeError Invalid note identifier


### `.getPropertyByValue(...)` {#getPropertyByValue}


Returns the name of the first property of the supplied object whose value is equal to the one
supplied.


  **Parameters**

  > Signature: `getPropertyByValue(object, value)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`object`** | object<br /> |||
    |**`value`** | *<br /> |||

  </div>


**Return Value**

> Returns: `string`
The name of the matching property


**Attributes**: static



### `.guessNoteNumber(...)` {#guessNoteNumber}

**Since**: 3.0.0<br />

Returns a valid MIDI note number (0-127) given the specified input. The input usually is a
string containing a note identifier (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer
between 0 and 127 is passed, it will simply be returned as is (for convenience). Other strings
will be parsed for integer value, if possible.

If the input is an identifier, the resulting note number is offset by the `octaveOffset`
parameter. For example, if you pass in "C4" (note number 60) and the `octaveOffset` value is
-2, the resulting MIDI note number will be 36.


  **Parameters**

  > Signature: `guessNoteNumber(input)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`input`** | string<br />number<br /> ||A string or number to extract the MIDI note number from.|

  </div>


**Return Value**

> Returns: `number` or `false`
A valid MIDI note number (0-127) or `false` if the input could not
successfully be parsed to a note number.


**Attributes**: static



### `.offsetNumber(...)` {#offsetNumber}


Returns the supplied MIDI note number offset by the requested octave and semitone values. If
the calculated value is less than 0, 0 will be returned. If the calculated value is more than
127, 127 will be returned. If an invalid offset value is supplied, 0 will be used.


  **Parameters**

  > Signature: `offsetNumber(offset)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`offset`** |  |||

  </div>


**Return Value**

> Returns: `number`
An integer between 0 and 127


**Attributes**: static

**Throws**:
  * `Error` : Invalid note number


### `.sanitizeChannels(...)` {#sanitizeChannels}

**Since**: 3.0.0<br />

Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be a
single integer or an array of integers.

For backwards-compatibility, passing `undefined` as a parameter to this method results in all
channels being returned (1-16). Otherwise, parameters that cannot successfully be parsed to
integers between 1 and 16 are silently ignored.


  **Parameters**

  > Signature: `sanitizeChannels([channel])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`channel`**] | number<br />Array.&lt;number&gt;<br /> ||An integer or an array of integers to parse as channel numbers.|

  </div>


**Return Value**

> Returns: `Array`
An array of 0 or more valid MIDI channel numbers.


**Attributes**: static



### `.toNoteIdentifier(...)` {#toNoteIdentifier}

**Since**: 3.0.0<br />

Returns an identifier string representing a note name (with optional accidental) followed by an
octave number. The octave can be offset by using the `octaveOffset` parameter.


  **Parameters**

  > Signature: `toNoteIdentifier(number, octaveOffset)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** | number<br /> ||The MIDI note number to convert to a note identifier|
    |**`octaveOffset`** | number<br /> ||An offset to apply to the resulting octave|

  </div>


**Return Value**

> Returns: `string`

**Attributes**: static

**Throws**:
  * RangeError Invalid note number
  * RangeError Invalid octaveOffset value


### `.toNoteNumber(...)` {#toNoteNumber}

**Since**: 3.0.0<br />

Returns a MIDI note number matching the identifier passed in the form of a string. The
identifier must include the octave number. The identifier also optionally include a sharp (#),
a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
identifiers: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.

When converting note identifiers to numbers, C4 is considered to be middle C (MIDI note number
60) as per the scientific pitch notation standard.

The resulting note number can be offset by using the `octaveOffset` parameter.


  **Parameters**

  > Signature: `toNoteNumber(identifier, [octaveOffset])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`identifier`** | string<br /> ||The identifier in the form of a letter, followed by an optional "#", "##", "b" or "bb" followed by the octave number. For exemple: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.|
    |[**`octaveOffset`**] | number<br /> |0|A integer to offset the octave by.|

  </div>


**Return Value**

> Returns: `number`
The MIDI note number (an integer between 0 and 127).


**Attributes**: static

**Throws**:
  * RangeError Invalid 'octaveOffset' value
  * TypeError Invalid note identifier


### `.toTimestamp(...)` {#toTimestamp}

**Since**: 3.0.0<br />

Returns a valid timestamp, relative to the navigation start of the document, derived from the
`time` parameter. If the parameter is a string starting with the "+" sign and followed by a
number, the resulting timestamp will be the sum of the current timestamp plus that number. If
the parameter is a positive number, it will be returned as is. Otherwise, false will be
returned.


  **Parameters**

  > Signature: `toTimestamp([time])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`time`**] | number<br />string<br /> ||The time string (e.g. `"+2000"`) or number to parse|

  </div>


**Return Value**

> Returns: `number` or `false`
A positive number or `false` (if the time cannot be converted)


**Attributes**: static



