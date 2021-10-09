<a name="Utilities"></a>

# ABCUtilities
The `Utilities` class contains general-purpose utility methods. All methods are static and
should be called using the class name. For example: `Utilities.getNoteDetails("C4")`.

<!--**Kind**: global class  
-->
**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->


* [Utilities](#Utilities)

    * [.buildNote([input], [options])](#Utilities.buildNote) ⇒ [<code>Note</code>](#Note)

    * [.buildNoteArray([notes], [options])](#Utilities.buildNoteArray) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)

    * [.getNoteDetails(value)](#Utilities.getNoteDetails) ⇒ <code>Object</code>

    * [.getPropertyByValue(object, value)](#Utilities.getPropertyByValue) ⇒ <code>string</code>

    * [.guessNoteNumber(input)](#Utilities.guessNoteNumber) ⇒ <code>number</code> \| <code>false</code>

    * [.offsetNumber(offset)](#Utilities.offsetNumber) ⇒ <code>number</code>

    * [.sanitizeChannels([channel])](#Utilities.sanitizeChannels) ⇒ <code>Array</code>

    * [.to7Bit(value)](#Utilities.to7Bit) ⇒ <code>number</code>

    * [.toNormalized(value)](#Utilities.toNormalized) ⇒ <code>number</code>

    * [.toNoteIdentifier(The, An)](#Utilities.toNoteIdentifier) ⇒ <code>string</code>

    * [.toNoteNumber(identifier, [octaveOffset])](#Utilities.toNoteNumber) ⇒ <code>number</code>

    * [.toTimestamp([time])](#Utilities.toTimestamp) ⇒ <code>number</code> \| <code>false</code>


* * *

<a name="Utilities.buildNote"></a>

## ABCUtilities.buildNote([input], [options]) ⇒ [<code>Note</code>](#Note)
Converts the `input` parameter to a valid [Note](#Note) object. The input usually is an unsigned
integer (0-127) or a note identifier (`"C4"`, `"G#5"`, etc.). If the input is a [Note](#Note)
object, it will be returned as is.

If the input is a note number or identifier, it is possible to specify options by providing the
`options` parameter.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Throws**:

- TypeError The input could not be parsed to a note

**Since**: version 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [input] | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) |  |  |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the note should be explicitly stopped. |
| [options.attack] | <code>number</code> | <code>64</code> | The note's attack velocity as an integer between 0 and 127. |
| [options.release] | <code>number</code> | <code>64</code> | The note's release velocity as an integer between 0 and 127. |
| [options.octaveOffset] | <code>number</code> | <code>0</code> | An integer to offset the octave by. **This is only used when the input value is a note identifier.** |


* * *

<a name="Utilities.buildNoteArray"></a>

## ABCUtilities.buildNoteArray([notes], [options]) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
Converts an input value, which can be an unsigned integer (0-127), a note identifier, a
[Note](#Note) object or an array of the previous types, to an array of [Note](#Note) objects.

[Note](#Note) objects are returned as is. For note numbers and identifiers, a [Note](#Note)
object is created with the options specified. An error will be thrown when encountering invalid
input.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Throws**:

- TypeError An element could not be parsed as a note.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [notes] | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  |  |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the note should be explicitly stopped. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The note's attack velocity as a decimal number between 0 and 1. |
| [options.release] | <code>number</code> | <code>0.5</code> | The note's release velocity as a decimal number between 0 and 1. |
| [options.rawAttack] | <code>number</code> | <code>64</code> | The note's attack velocity as an integer between 0 and 127. |
| [options.rawRelease] | <code>number</code> | <code>64</code> | The note's release velocity as an integer between 0 and 127. |
| [options.octaveOffset] | <code>number</code> | <code>0</code> | An integer to offset the octave by. **This is only used when the input value is a note identifier.** |


* * *

<a name="Utilities.getNoteDetails"></a>

## ABCUtilities.getNoteDetails(value) ⇒ <code>Object</code>
Given a proper note identifier ("C#4", "Gb-1", etc.) or a valid MIDI note number (9-127), this
method returns an object containing broken down details about the specified note (uppercase
letter, accidental and octave).

When a number is specified, the translation to note is done using a value of 60 for middle C
(C4 = middle C).

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Throws**:

- TypeError Invalid note identifier

**Since**: 3.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> \| <code>number</code> | A note identifier A  atring ("C#4", "Gb-1", etc.) or a MIDI note number (0-127). |


* * *

<a name="Utilities.getPropertyByValue"></a>

## ABCUtilities.getPropertyByValue(object, value) ⇒ <code>string</code>
Returns the name of the first property of the supplied object whose value is equal to the one
supplied.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>string</code> - The name of the matching property  
<!---->

| Param | Type |
| --- | --- |
| object | <code>Object</code> | 
| value | <code>\*</code> | 


* * *

<a name="Utilities.guessNoteNumber"></a>

## ABCUtilities.guessNoteNumber(input) ⇒ <code>number</code> \| <code>false</code>
Returns a valid MIDI note number (0-127) given the specified input. The input usually is a
string containing a note identifier (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer
between 0 and 127 is passed, it will simply be returned as is (for convenience). Other strings
will be parsed for integer value, if possible.

If the input is an identifier, the resulting note number is offset by the `octaveOffset`
parameter. For example, if you pass in "C4" (note number 60) and the `octaveOffset` value is
-2, the resulting MIDI note number will be 36.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> \| <code>false</code> - A valid MIDI note number (0-127) or `false` if the input could not
successfully be parsed to a note number.  
**Since**: 3.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>number</code> | A string or number to extract the MIDI note number from. |


* * *

<a name="Utilities.offsetNumber"></a>

## ABCUtilities.offsetNumber(offset) ⇒ <code>number</code>
Returns the supplied MIDI note number offset by the requested octave and semitone values. If
the calculated value is less than 0, 0 will be returned. If the calculated value is more than
127, 127 will be returned. If an invalid offset value is supplied, 0 will be used.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> - An integer between 0 and 127  
**Throws**:

- <code>Error</code> Invalid note number

<!---->

| Param |
| --- |
| offset | 


* * *

<a name="Utilities.sanitizeChannels"></a>

## ABCUtilities.sanitizeChannels([channel]) ⇒ <code>Array</code>
Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be a
single integer or an array of integers.

For backwards-compatibility, passing `undefined` as a parameter to this method results in all
channels being returned (1-16). Otherwise, parameters that cannot successfully be parsed to
integers between 1 and 16 are silently ignored.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>Array</code> - An array of 0 or more valid MIDI channel numbers.  
**Since**: 3.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [channel] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | An integer or an array of integers to parse as channel numbers. |


* * *

<a name="Utilities.to7Bit"></a>

## ABCUtilities.to7Bit(value) ⇒ <code>number</code>
Returns a number between 0 and 127 which is the result of multiplying the input value by 127.
The input value should be number between 0 and 1 (inclusively). The returned value is
restricted between 0 and 127 even if the input is greater than 1 or smaller than 0.

Passing `Infinity` will return `127` and passing `-Infinity` will return `0`. Otherwise, when
the input value cannot be converted to a number, the method returns 0.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> - A number between 0 and 1 (inclusive)  
<!---->

| Param | Description |
| --- | --- |
| value | A positive integer between 0 and 127 (inclusive) |


* * *

<a name="Utilities.toNormalized"></a>

## ABCUtilities.toNormalized(value) ⇒ <code>number</code>
Returns a number between 0 and 1 representing the ratio of the input value divided by 127 (7
bit). The returned value is restricted between 0 and 1 even if the input is greater than 127 or
smaller than 0.

Passing `Infinity` will return `1` and passing `-Infinity` will return `0`. Otherwise, when the
input value cannot be converted to an integer, the method returns 0.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> - A number between 0 and 1 (inclusive)  
<!---->

| Param | Description |
| --- | --- |
| value | A positive integer between 0 and 127 (inclusive) |


* * *

<a name="Utilities.toNoteIdentifier"></a>

## ABCUtilities.toNoteIdentifier(The, An) ⇒ <code>string</code>
Returns an identifier string representing a note name (with optional accidental) followed by an
octave number. The octave can be offset by using the `octaveOffset` parameter.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Throws**:

- RangeError Invalid note number
- RangeError Invalid octaveOffset value

**Since**: 3.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | MIDI note number to convert to a note identifier |
| An | <code>octaveOffset</code> | offset to apply to the resulting octave |


* * *

<a name="Utilities.toNoteNumber"></a>

## ABCUtilities.toNoteNumber(identifier, [octaveOffset]) ⇒ <code>number</code>
Returns a MIDI note number matching the identifier passed in the form of a string. The
identifier must include the octave number. The identifier also optionally include a sharp (#),
a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
identifiers: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.

When converting note identifiers to numbers, C4 is considered to be middle C (MIDI note number
60) as per the scientific pitch notation standard.

The resulting note number can be offset by using the `octaveOffset` parameter.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> - The MIDI note number (an integer between 0 and 127).  
**Throws**:

- RangeError Invalid 'octaveOffset' value
- TypeError Invalid note identifier

**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| identifier | <code>string</code> |  | The identifier in the form of a letter, followed by an optional "#", "##", "b" or "bb" followed by the octave number. For exemple: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc. |
| [octaveOffset] | <code>number</code> | <code>0</code> | A integer to offset the octave by. |


* * *

<a name="Utilities.toTimestamp"></a>

## ABCUtilities.toTimestamp([time]) ⇒ <code>number</code> \| <code>false</code>
Returns a valid timestamp, relative to the navigation start of the document, derived from the
`time` parameter. If the parameter is a string starting with the "+" sign and followed by a
number, the resulting timestamp will be the sum of the current timestamp plus that number. If
the parameter is a positive number, it will be returned as is. Otherwise, false will be
returned.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> \| <code>false</code> - A positive number or `false` (if the time cannot be converted)  
**Since**: 3.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [time] | <code>number</code> \| <code>string</code> | The time string (e.g. `"+2000"`) or number to parse |


* * *

