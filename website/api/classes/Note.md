<a name="Note"></a>

# Note
The `Note` class represents a single musical note such as `"D3"`, `"G#4"`, `"F-1"`, `"Gb7"`, etc.

`Note` objects can be played back on a single channel by calling
[OutputChannel.playNote()](#OutputChannel+playNote) or on multiple channels of the same
output by calling [Output.playNote()](#Output+playNote).

The note has attack and release velocities set at 0.5 by default. These can be changed by passing
in the appropriate option. It is also possible to set a system-wide default for attack and
release velocities by using the `WebMidi.defaults` property.

The note may have a duration. If it does, playback will be automatically stopped when the
duration has elapsed by sending a **noteoff** event. By default, the duration is set to
`Infinity`. In this case, it will never stop playing unless explicitly stopped by calling a
method such as [OutputChannel.stopNote()](#OutputChannel+stopNote),
[Output.stopNote()](#Output+stopNote) or similar.

<!--**Kind**: global class  
-->
**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->


* [Note](#Note)

    * [new Note(value, [options])](#new_Note_new)

    * [.accidental](#Note+accidental) : <code>string</code>

    * [.attack](#Note+attack) : <code>number</code>

    * [.duration](#Note+duration) : <code>number</code>

    * [.identifier](#Note+identifier) : <code>string</code>

    * [.name](#Note+name) : <code>string</code>

    * [.number](#Note+number) : <code>number</code>

    * [.octave](#Note+octave) : <code>number</code>

    * [.rawAttack](#Note+rawAttack) : <code>number</code>

    * [.rawRelease](#Note+rawRelease) : <code>number</code>

    * [.release](#Note+release) : <code>number</code>

    * [.getOffsetNumber(offset)](#Note+getOffsetNumber) ⇒ <code>number</code>


* * *

<a name="new_Note_new"></a>

## new Note(value, [options])
<!---->
**Throws**:

- <code>Error</code> Invalid note identifier
- <code>RangeError</code> Invalid name value
- <code>RangeError</code> Invalid accidental value
- <code>RangeError</code> Invalid octave value
- <code>RangeError</code> Invalid duration value
- <code>RangeError</code> Invalid attack value
- <code>RangeError</code> Invalid release value

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>string</code> \| <code>number</code> |  | The value used to create the note. If an identifier string is used, it must start with the note letter, optionally followed by an accidental and followed by the octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). If a number is used, it must be an integer between 0 and 127. In this case, middle C is considered to be C4 (note number 60). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the note should be explicitly stopped. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The note's attack velocity as a float between 0 and 1. If you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both `attack` and `rawAttack` are specified, the latter has precedence. |
| [options.release] | <code>number</code> | <code>0.5</code> | The note's release velocity as a float between 0 and 1. If you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both `release` and `rawRelease` are specified, the latter has precedence. |
| [options.rawAttack] | <code>number</code> | <code>64</code> | The note's attack velocity as an integer between 0 and 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both `attack` and `rawAttack` are specified, the latter has precedence. |
| [options.rawRelease] | <code>number</code> | <code>64</code> | The note's release velocity as an integer between 0 and 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both `release` and `rawRelease` are specified, the latter has precedence. |


* * *

<a name="Note+accidental"></a>

## note.accidental : <code>string</code>
The accidental (#, ##, b or bb) of the note

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+attack"></a>

## note.attack : <code>number</code>
The attack velocity of the note as an integer between 0 and 127.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+duration"></a>

## note.duration : <code>number</code>
The duration of the note as a positive decimal number representing the number of milliseconds
that the note should play for.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+identifier"></a>

## note.identifier : <code>string</code>
The name, optional accidental and octave of the note, as a string.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+name"></a>

## note.name : <code>string</code>
The name (letter) of the note

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+number"></a>

## note.number : <code>number</code>
The MIDI number of the note. This number is derived from the note identifier using C4 as a
reference for middle C.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+octave"></a>

## note.octave : <code>number</code>
The octave of the note

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+rawAttack"></a>

## note.rawAttack : <code>number</code>
The attack velocity of the note as a positive integer between 0 and 127.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+rawRelease"></a>

## note.rawRelease : <code>number</code>
The release velocity of the note as a positive integer between 0 and 127.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+release"></a>

## note.release : <code>number</code>
The release velocity of the note as an integer between 0 and 127.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+getOffsetNumber"></a>

## note.getOffsetNumber(offset) ⇒ <code>number</code>
Returns a MIDI note number offset by the integer specified in the parameter. If the calculated
value is less than 0, 0 will be returned. If the calculated value is more than 127, 127 will be
returned. If an invalid value is supplied, 0 will be used.

<!--**Kind**: instance method of [<code>Note</code>](#Note)  
-->
**Returns**: <code>number</code> - An integer between 0 and 127  
<!---->

| Param |
| --- |
| offset | 


* * *

