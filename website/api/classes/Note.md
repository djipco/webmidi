<a name="Note"></a>

# Note
The `Note` class represents a single note to be played. The `Note` can be played on a single
channel by using [OutputChannel.playNote()](OutputChannel#playNote) or on multiple
channels at once by using [Output.playNote()](Output#playNote).

If the note's `duration` property is set, the note will be stopped at the end of the duration. If
no duration is set, it will play until it is explicitly stopped using
[OutputChannel.stopNote()](OutputChannel#stopNote) or
[Output.stopNote()](Output#stopNote).

<!--**Kind**: global class  
-->
**Since**: 3.0.0  


* [Note](#Note)

    * [`new Note(value, [options])`](#new_Note_new)

    * [`.name`](#Note+name) : <code>string</code>

    * [`.number`](#Note+number) : <code>number</code>

    * [`.duration`](#Note+duration) : <code>number</code>

    * [`.attack`](#Note+attack) : <code>number</code>

    * [`.rawAttack`](#Note+rawAttack) : <code>number</code>

    * [`.release`](#Note+release) : <code>number</code>

    * [`.rawRelease`](#Note+rawRelease) : <code>number</code>

    * [`.octave`](#Note+octave) : <code>number</code>


* * *

<a name="new_Note_new"></a>

## `new Note(value, [options])`
<!---->
**Throws**:

- <code>Error</code> Invalid note name.
- <code>Error</code> Invalid note number.
- <code>RangeError</code> Invalid duration.
- <code>RangeError</code> Invalid attack value.
- <code>RangeError</code> Invalid rawAttack value.
- <code>RangeError</code> Invalid release value.
- <code>RangeError</code> Invalid rawRelease value.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>string</code> \| <code>number</code> |  | The name or note number of the note to create. If a number is used, it must be an integer between 0 and 127. If a string is used, it must be the note name followed by the octave (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). The octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the note should be explicitly stopped. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The note's attack velocity as a decimal number between 0 and 1. |
| [options.release] | <code>number</code> | <code>0.5</code> | The note's release velocity as a decimal number between 0 and 1. |
| [options.rawAttack] | <code>number</code> | <code>64</code> | The note's attack velocity as an integer between 0 and 127. |
| [options.rawRelease] | <code>number</code> | <code>64</code> | The note's release velocity as an integer between 0 and 127. |


* * *

<a name="Note+name"></a>

## `note.name` : <code>string</code>
The name of the note with the octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.)

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->

* * *

<a name="Note+number"></a>

## `note.number` : <code>number</code>
The MIDI note number as an integer between 0 and 127

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->

* * *

<a name="Note+duration"></a>

## `note.duration` : <code>number</code>
The duration of the note as a positive decimal number representing the number of milliseconds
that the note should play for.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->

* * *

<a name="Note+attack"></a>

## `note.attack` : <code>number</code>
The attack velocity of the note as a decimal number between 0 and 1.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->

* * *

<a name="Note+rawAttack"></a>

## `note.rawAttack` : <code>number</code>
The raw attack velocity of the note as an integer between 0 and 127.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->

* * *

<a name="Note+release"></a>

## `note.release` : <code>number</code>
The release velocity of the note as a decimal number between 0 and 1.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->

* * *

<a name="Note+rawRelease"></a>

## `note.rawRelease` : <code>number</code>
The raw release velocity of the note as an integer between 0 and 127.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->

* * *

<a name="Note+octave"></a>

## `note.octave` : <code>number</code>
The octave of the note as an integer between -1 and 9.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->

* * *

