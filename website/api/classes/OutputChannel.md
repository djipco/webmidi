
# OutputChannel

The `OutputChannel` class represents a single output channel (1-16) from an output device. This
object is derived from the host's MIDI subsystem and cannot be instantiated directly.

All 16 `OutputChannel` objects can be found inside the parent output's
[channels](Output#channels) property.

**Since**: 3.0.0

**Extends**: EventEmitter


### `new OutputChannel(...)`


  **Parameters**

  > `new OutputChannel(output, number)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`output`** |Output||The output this channel belongs to|
    |**`number`** |number||The channel number (1-16)|



***

## Properties

### `.number`

This channel's MIDI number (1-16)

**Type**: number<br />
**Since**: 3.0<br />


### `.octaveOffset`

An integer to offset the reported octave of outgoing note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

Note that this value is combined with the global offset value defined on the `WebMidi` object
and with the value defined on the parent [Output](Output) object.

**Type**: number<br />
**Since**: 3.0<br />


### `.output`

The parent [Output](Output) this channel belongs to

**Type**: Output<br />
**Since**: 3.0<br />



***

## Methods

### `.decrementRegisteredParameter(...)`

Decrements the specified MIDI registered parameter by 1. Here is the full list of parameter
names that can be used with this function:

 * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
 * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
 * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
 * Tuning Program (0x00, 0x03): `"tuningprogram"`
 * Tuning Bank (0x00, 0x04): `"tuningbank"`
 * Modulation Range (0x00, 0x05): `"modulationrange"`
 * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
 * Elevation Angle (0x3D, 0x01): `"elevationangle"`
 * Gain (0x3D, 0x02): `"gain"`
 * Distance Ratio (0x3D, 0x03): `"distanceratio"`
 * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
 * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
 * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
 * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
 * Roll Angle (0x3D, 0x08): `"rollangle"`


  **Parameters**

  > `decrementRegisteredParameter(parameter, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |String||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * TypeError The specified registered parameter is invalid.

### `.incrementRegisteredParameter(...)`

Increments the specified MIDI registered parameter by 1. Here is the full list of parameter
names that can be used with this function:

 * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
 * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
 * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
 * Tuning Program (0x00, 0x03): `"tuningprogram"`
 * Tuning Bank (0x00, 0x04): `"tuningbank"`
 * Modulation Range (0x00, 0x05): `"modulationrange"`
 * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
 * Elevation Angle (0x3D, 0x01): `"elevationangle"`
 * Gain (0x3D, 0x02): `"gain"`
 * Distance Ratio (0x3D, 0x03): `"distanceratio"`
 * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
 * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
 * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
 * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
 * Roll Angle (0x3D, 0x08): `"rollangle"`


  **Parameters**

  > `incrementRegisteredParameter(parameter, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |String||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * TypeError The specified registered parameter is invalid.

### `.playNote(...)`

Plays a note or an array of notes on the channel. The first parameter is the note to play. It
can be a single value or an array of the following valid values:

 - A [Note](Note) object
 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)

The `playNote()` method sends a **note on** MIDI message for all specified notes on all
specified channels. If a `duration` is set in the `options` parameter or in the [Note](Note)
object's [duration](Note#duration) property, it will also schedule a **note off** message
to end the note after said duration. If no `duration` is set, the note will simply play until
a matching **note off** message is sent with [stopNote()](#OutputChannel+stopNote) or
[sendNoteOff()](#OutputChannel+sendNoteOff).

 The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](Note) objects, the durations and velocities defined in the [Note](Note)
objects have precedence over the ones specified via the method's `options` parameter.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.


  **Parameters**

  > `playNote(note, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |number||The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a {@link Note} object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number||A positive number larger than 0 representing the number of milliseconds to wait before sending a **note off** message. If invalid or left undefined, only a **note on** message will be sent.|
    |[**`options.attack`**] |number|0.5|The velocity at which to play the note (between `0` and `1`). If the `rawAttack` option is also defined, it will have priority. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.rawAttack`**] |number|0.5|The attack velocity at which to play the note (between `0` and `127`). This has priority over the `attack` property. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.release`**] |number|0.5|The velocity at which to release the note (between `0` and `1`). If the `rawRelease` option is also defined, it will have priority. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set.|
    |[**`options.rawRelease`**] |number|0.5|The velocity at which to release the note (between `0` and `127`). This has priority over the `release` property. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set.|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.resetAllControllers(...)`

Sends a **reset all controllers** channel mode message. This resets all controllers, such as
the pitch bend, to their default value.


  **Parameters**

  > `resetAllControllers([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.send(...)`

Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
sent immediately. The message should be an array of 8 bit unsigned integers (0-225), a
[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
object or a `Message` object.

It is usually not necessary to use this method directly as you can use one of the simpler
helper methods such as `playNote()`, `stopNote()`, `sendControlChange()`, etc.

Details on the format of MIDI messages are available in the summary of
[MIDI messages](https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message)
from the MIDI Manufacturers Association.


  **Parameters**

  > `send(message, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`message`** |Array.&lt;number&gt;||An array of 8bit unsigned integers, a `Uint8Array` object (not available in Node.js) containing the message bytes or a `Message` object.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([DOMHighResTimeStamp]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}), the operation will be scheduled for that point time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The first byte (status) must be an integer between 128 and 255.
  * `RangeError` : Data bytes must be integers between 0 and 255.

### `.sendChannelMode(...)`

Sends a MIDI **channel mode** message. The channel mode message to send can be specified
numerically or by using one of the following common names:

  * `"allsoundoff"` (#120)
  * `"resetallcontrollers"` (#121)
  * `"localcontrol"` (#122)
  * `"allnotesoff"` (#123)
  * `"omnimodeoff"` (#124)
  * `"omnimodeon"` (#125)
  * `"monomodeon"` (#126)
  * `"polymodeon"` (#127)

It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may
require a value that's not zero. For that reason, the `value` parameter is optional and
defaults to 0.

To make it easier, all channel mode messages have a matching helper method:

  - [turnSoundOff()](Output#turnSoundOff)
  - [resetAllControllers()](Output#resetAllControllers)
  - [setLocalControl()](Output#turnSoundOff)
  - [turnNotesOff()](Output#turnNotesOff)
  - [setOmniMode()](Output#setOmniMode)
  - [setPolyphonicMode()](Output#setPolyphonicMode)


  **Parameters**

  > `sendChannelMode(command, value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`command`** |number||The numerical identifier of the channel mode message (integer between 120-127) or its name as a string.|
    |**`value`** |number||The value to send (integer between 0-127).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.sendControlChange(...)`

Sends a MIDI **control change** message to the channel at the scheduled time. The control
change message to send can be specified numerically (0 to 127) or by using one of the following
common names:

 * `bankselectcoarse` (#0)
 * `modulationwheelcoarse` (#1)
 * `breathcontrollercoarse` (#2)
 * `footcontrollercoarse` (#4)
 * `portamentotimecoarse` (#5)
 * `dataentrycoarse` (#6)
 * `volumecoarse` (#7)
 * `balancecoarse` (#8)
 * `pancoarse` (#10)
 * `expressioncoarse` (#11)
 * `effectcontrol1coarse` (#12)
 * `effectcontrol2coarse` (#13)
 * `generalpurposeslider1` (#16)
 * `generalpurposeslider2` (#17)
 * `generalpurposeslider3` (#18)
 * `generalpurposeslider4` (#19)
 * `bankselectfine` (#32)
 * `modulationwheelfine` (#33)
 * `breathcontrollerfine` (#34)
 * `footcontrollerfine` (#36)
 * `portamentotimefine` (#37)
 * `dataentryfine` (#38)
 * `volumefine` (#39)
 * `balancefine` (#40)
 * `panfine` (#42)
 * `expressionfine` (#43)
 * `effectcontrol1fine` (#44)
 * `effectcontrol2fine` (#45)
 * `holdpedal` (#64)
 * `portamento` (#65)
 * `sustenutopedal` (#66)
 * `softpedal` (#67)
 * `legatopedal` (#68)
 * `hold2pedal` (#69)
 * `soundvariation` (#70)
 * `resonance` (#71)
 * `soundreleasetime` (#72)
 * `soundattacktime` (#73)
 * `brightness` (#74)
 * `soundcontrol6` (#75)
 * `soundcontrol7` (#76)
 * `soundcontrol8` (#77)
 * `soundcontrol9` (#78)
 * `soundcontrol10` (#79)
 * `generalpurposebutton1` (#80)
 * `generalpurposebutton2` (#81)
 * `generalpurposebutton3` (#82)
 * `generalpurposebutton4` (#83)
 * `reverblevel` (#91)
 * `tremololevel` (#92)
 * `choruslevel` (#93)
 * `celestelevel` (#94)
 * `phaserlevel` (#95)
 * `databuttonincrement` (#96)
 * `databuttondecrement` (#97)
 * `nonregisteredparametercoarse` (#98)
 * `nonregisteredparameterfine` (#99)
 * `registeredparametercoarse` (#100)
 * `registeredparameterfine` (#101)

 * `allsoundoff` (#120)
 * `resetallcontrollers` (#121)
 * `localcontrol` (#122)
 * `allnotesoff` (#123)
 * `omnimodeoff` (#124)
 * `omnimodeon` (#125)
 * `monomodeon` (#126)
 * `polymodeon` (#127)

As you can see above, not all control change message have a matching common name. This
does not mean you cannot use the others. It simply means you will need to use their number
(0-127) instead of their name. While you can still use them, numbers 120 to 127 are usually
reserved for *channel mode* messages. See
[sendChannelMode()](#OutputChannel+sendChannelMode) method for more info.

To view a detailed list of all available **control change** messages, please consult "Table 3 -
Control Change Messages" from the [MIDI Messages](
https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
specification.

Note: messages #0-31 (MSB) are paired with messages #32-63 (LSB). For example, message #1
(modulationwheelcoarse) can be accompanied by a second control change message for
modulationwheelfine to achieve a greater level of precision. if you want to specify both MSB
and LSB for messages between 0 and 31, you can do so by passing a 2-value array as the second
parameter.


  **Parameters**

  > `sendControlChange(controller, value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`controller`** |number||The MIDI controller name or number (0-127).|
    |**`value`** |number||The value to send (0-127). You can also use a two-position array for controllers 0 to 31. In this scenario, the first value will be sent as usual and the second calue will be sent to the matching LSB controller (which is obtained by adding 32 to the first controller)|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Since**: 3.0.0<br />

**Throws**:
  * `RangeError` : Controller numbers must be between 0 and 127.
  * `RangeError` : Invalid controller name.
  * `TypeError` : The value array must have a length of 2.

### `.sendNoteOff(...)`

Sends a **note off** message for the specified notes on the channel. The first parameter is the
note. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [Note](Note) object

 The execution of the **note off** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](Note) objects, the release velocity defined in the [Note](Note) objects has
precedence over the one specified via the method's `options` parameter.


  **Parameters**

  > `sendNoteOff(note, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |number||The note(s) to stop. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a {@link Note} object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.release`**] |number|0.5|The velocity at which to release the note (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have priority. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.rawRelease`**] |number|64|The velocity at which to release the note (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have priority. An invalid velocity value will silently trigger the default of `64`.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.sendNoteOn(...)`

Sends a **note on** message for the specified note(s) on the channel. The first parameter is
the note. It can be a single value or an array of the following valid values:

 - A [Note](Note) object
 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)

 When passing a [Note](Note) object or a note name, the `octaveOffset` will be applied. This is
 not the case when using a note number number. In this case, we assume you know exactly which
 MIDI note number should be sent out.


 The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](Note) objects, the attack velocity defined in the [Note](Note) objects has
precedence over the one specified via the method's `options` parameter. Also, the `duration` is
ignored. If you want to also send a **note off** message, use the
[playNote()](Output#playNote) method instead.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.


  **Parameters**

  > `sendNoteOn(note, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |number||The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a {@link Note} object or an array of the previous types.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.attack`**] |number|0.5|The velocity at which to play the note (between `0` and `1`).  If the `rawAttack` option is also defined, `rawAttack` will have priority. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.rawAttack`**] |number|64|The velocity at which to release the note (between `0` and `127`). If the `attack` option is also defined, `rawAttack` will have priority. An invalid velocity value will silently trigger the default of `64`.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.setChannelAftertouch(...)`

Sends a MIDI **channel aftertouch** message. For key-specific aftertouch, you should instead
use [setKeyAftertouch()](Output#setKeyAftertouch).


  **Parameters**

  > `setChannelAftertouch([pressure], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`pressure`**] |number||The pressure level (between 0 and 1). If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127.|
    |[**`options`**] |Object|{}||
    |[**`options.rawValue`**] |boolean|false|A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * RangeError Invalid channel aftertouch value.

### `.setKeyAftertouch(...)`

Sends a MIDI **key aftertouch** message at the scheduled time. This is a key-specific
aftertouch. For a channel-wide aftertouch message, use
[setChannelAftertouch()](Output#setChannelAftertouch).

The key can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note identifier such as `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.


  **Parameters**

  > `setKeyAftertouch(target, [pressure], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`target`** |number||The key(s) for which you are sending an aftertouch value. The notes can be specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), or an array of the previous types. When using a note identifier, the octave value will be offset by the combined value of `InputChannel.octaveOffset`, `Input.octaveOffset` and `WebMidi.octaveOffset` (if those values are not `0`). When using a key number, octaveOffset values are ignored.|
    |[**`pressure`**] |number|0.5|The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure is defined by using an integer between 0 and 127.|
    |[**`options`**] |Object|{}||
    |[**`options.useRawValue`**] |boolean|false|A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * RangeError Invalid key aftertouch value.

### `.setLocalControl(...)`

Turns local control on or off. Local control is usually enabled by default. If you disable it,
the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
its out port.


  **Parameters**

  > `setLocalControl([state], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`state`**] |boolean|false|Whether to activate local control (`true`) or disable it (`false`).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.setMasterTuning(...)`

Sends a **master tuning** message. The value is decimal and must be larger than -65 semitones
and smaller than 64 semitones.

Because of the way the MIDI specification works, the decimal portion of the value will be
encoded with a resolution of 14bit. The integer portion must be between -64 and 63
inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
a **Master Fine Tuning** RPN messages.


  **Parameters**

  > `setMasterTuning([value], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`value`**] |number|0.0|The desired decimal adjustment value in semitones (-65 < x < 64)|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The value must be a decimal number between larger than -65 and smaller
than 64.

### `.setModulationRange(...)`

Sends a **modulation depth range** message to adjust the depth of the modulation wheel's range.
The range can be specified with the `semitones` parameter, the `cents` parameter or by
specifying both parameters at the same time.


  **Parameters**

  > `setModulationRange(semitones, [cents], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`semitones`** |number||The desired adjustment value in semitones (integer between 0 and 127).|
    |[**`cents`**] |number|0|The desired adjustment value in cents (integer between 0 and 127).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.setNonRegisteredParameter(...)`

Sets a non-registered parameter (NRPN) to the specified value. The NRPN is selected by passing
in a two-position array specifying the values of the two control bytes. The value is specified
by passing in a single integer (most cases) or an array of two integers.

NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
they see fit. For example, according to the Roland GS specification, you can control the
**vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
would use:

```js
WebMidi.outputs[0].channels[0].setNonRegisteredParameter([1, 8], 123);
```

In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
value to send was 10, you could use:

```js
WebMidi.outputs[0].channels[0].setNonRegisteredParameter([2, 63], [0, 10]);
```

For further implementation details, refer to the manufacturer's documentation.


  **Parameters**

  > `setNonRegisteredParameter(parameter, [data], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |Array.&lt;number&gt;||A two-position array specifying the two control bytes (0x63, 0x62) that identify the non-registered parameter.|
    |[**`data`**] |number|[]|An integer or an array of integers with a length of 1 or 2 specifying the desired data.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The control value must be between 0 and 127.
  * `RangeError` : The msb value must be between 0 and 127

### `.setOmniMode(...)`

Sets OMNI mode to `"on"` or `"off"`. MIDI's OMNI mode causes the instrument to respond to
messages from all channels.

It should be noted that support for OMNI mode is not as common as it used to be.


  **Parameters**

  > `setOmniMode([state], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`state`**] |boolean|true|Whether to activate OMNI mode (`true`) or not (`false`).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `TypeError` : Invalid channel mode message name.
  * `RangeError` : Channel mode controller numbers must be between 120 and 127.
  * `RangeError` : Value must be an integer between 0 and 127.

### `.setPitchBend(...)`

Sends a MIDI **pitch bend** message at the scheduled time.


  **Parameters**

  > `setPitchBend([value], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`value`**] |number||The intensity of the bend (between -1.0 and 1.0). A value of zero means no bend. The resulting bend is relative to the pitch bend range that has been defined. The range can be set with [setPitchBendRange()]{@link OutputChannel#setPitchBendRange} . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of -1 will bend the note 1 octave below its nominal value. If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127 representing, respectively, the MSB (most significant byte) and the LSB (least significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64` bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents (1/100 of a semitone). An LSB of `64` also means no bend.|
    |[**`options`**] |Object|{}||
    |[**`options.rawValue`**] |boolean|false|A boolean indicating whether the value should be considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or an array of 2 integers if using both MSB and LSB).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.setPitchBendRange(...)`

Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
adjust the range used by their pitch bend lever. The range is specified by using the
`semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
means that the pitch bend range will be 12 semitones above and below the nominal pitch.


  **Parameters**

  > `setPitchBendRange(semitones, [cents], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`semitones`** |number||The desired adjustment value in semitones (between 0 and 127). While nothing imposes that in the specification, it is very common for manufacturers to limit the range to 2 octaves (-12 semitones to 12 semitones).|
    |[**`cents`**] |number|0|The desired adjustment value in cents (integer between 0-127).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The msb value must be between 0 and 127.
  * `RangeError` : The lsb value must be between 0 and 127.

### `.setPolyphonicMode(...)`

Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
multiple notes are being played.


  **Parameters**

  > `setPolyphonicMode([mode], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`mode`**] |string|poly|The mode to use: `"mono"` or `"poly"`.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.setProgram(...)`

Sends a MIDI **program change** message at the scheduled time.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > `setProgram([program], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`program`**] |number|1|The MIDI patch (program) number (1-128)|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `TypeError` : Failed to execute &#x27;send&#x27; on &#x27;MIDIOutput&#x27;: The value at index 1 is greater
than 0xFF.

### `.setRegisteredParameter(...)`

Sets the specified MIDI registered parameter to the desired value. The value is defined with
up to two bytes of data (msb, lsb) that each can go from 0 to 127.

MIDI
[registered parameters]
(https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
extend the original list of control change messages. The MIDI 1.0 specification lists only a
limited number of them. Here are the original registered parameters with the identifier that
can be used as the first parameter of this function:

 * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
 * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
 * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
 * Tuning Program (0x00, 0x03): `"tuningprogram"`
 * Tuning Bank (0x00, 0x04): `"tuningbank"`
 * Modulation Range (0x00, 0x05): `"modulationrange"`

Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
Standard*, which is not widely implemented.

Another set of extra parameters have been later added for 3D sound controllers. They are:

 * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
 * Elevation Angle (0x3D, 0x01): `"elevationangle"`
 * Gain (0x3D, 0x02): `"gain"`
 * Distance Ratio (0x3D, 0x03): `"distanceratio"`
 * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
 * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
 * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
 * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
 * Roll Angle (0x3D, 0x08): `"rollangle"`


  **Parameters**

  > `setRegisteredParameter(parameter, [data], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |string||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the registered parameter.|
    |[**`data`**] |number|[]|An single integer or an array of integers with a maximum length of 2 specifying the desired data.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.setTuningBank(...)`

Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > `setTuningBank(value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |number||The desired tuning bank (1-128).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The bank value must be between 1 and 128.

### `.setTuningProgram(...)`

Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > `setTuningProgram(value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |number||The desired tuning program (1-128).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The program value must be between 1 and 128.

### `.stopNote(...)`

This is an alias to the [sendNoteOff()](#OutputChannel+sendNoteOff) method.


  **Parameters**

  > `stopNote(note, options)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** ||||
    |**`options`** ||||




**Returns**: * `Output`


### `.turnNotesOff(...)`

Sends an **all notes off** channel mode message. This will make all currently playing notes
fade out just as if their key had been released. This is different from the
[turnSoundOff()](#OutputChannel+turnSoundOff) method which mutes all sounds immediately.


  **Parameters**

  > `turnNotesOff([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.



### `.turnSoundOff(...)`

Sends an **all sound off** channel mode message. This will silence all sounds playing on that
channel but will not prevent new sounds from being triggered.


  **Parameters**

  > `turnSoundOff([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|




**Returns**: * `OutputChannel`      <br />Returns the `OutputChannel` object so methods can be chained.




