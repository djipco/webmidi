
# OutputChannel

The `OutputChannel` class represents a single output MIDI channel. `OutputChannel` objects are
provided by an [`Output`](Output) port which, itself, is made available by a device. The
`OutputChannel` object is derived from the host's MIDI subsystem and should not be instantiated
directly.

All 16 `OutputChannel` objects can be found inside the parent output's
[`channels`](Output#channels) property.

**Since**: 3.0.0

**Extends**: [`EventEmitter`](EventEmitter)
<!--**Extends**: EventEmitter-->


### `Constructor`


  **Parameters**

  > `new OutputChannel(output, number)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`output`** | Output<br /> ||The [`Output`](Output) this channel belongs to.|
    |**`number`** | number<br /> ||The MIDI channel number (`1` - `16`).|

  </div>



***

## Properties

### `.eventCount` {#eventCount}
**Type**: number<br />
**Attributes**: read-only<br />


The number of unique events that have registered listeners.

Note: this excludes global events registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) because they are not tied to a
specific event.


### `.eventMap` {#eventMap}
**Type**: Object<br />
**Attributes**: read-only<br />


An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the [`Listener`](Listener) objects registered
for the event.


### `.eventNames` {#eventNames}
**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />


An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) because they are not tied to a
specific event.


### `.eventsSuspended` {#eventsSuspended}
**Type**: boolean<br />


Whether or not the execution of callbacks is currently suspended for this emitter.


### `.number` {#number}
**Since**: 3.0<br />
**Type**: number<br />


This channel's MIDI number (`1` - `16`).


### `.octaveOffset` {#octaveOffset}
**Since**: 3.0<br />
**Type**: number<br />


An integer to offset the reported octave of outgoing note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

Note that this value is combined with the global offset value defined in
[`WebMidi.octaveOffset`](WebMidi#octaveOffset) and with the parent value defined in
[`Output.octaveOffset`](Output#octaveOffset).


### `.output` {#output}
**Since**: 3.0<br />
**Type**: Output<br />


The parent [`Output`](Output) this channel belongs to.



***

## Methods


### `.addListener(...)` {#addListener}


Adds a listener for the specified event. It returns the [`Listener`](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use
[`EventEmitter.ANY_EVENT`](#ANY_EVENT) as the first parameter. Note that a global
listener will also be triggered by non-registered events.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to listen to.|
    |**`callback`** | EventEmitter~callback<br /> ||The callback function to execute when the event occurs.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |this|The value of `this` in the callback function.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array and thus executed first.|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] | boolean<br /> |Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [`arguments`](Listener#arguments) property of the [`Listener`](Listener) object and can be retrieved or modified as desired.|

  </div>


**Return Value**

> Returns: `Listener`<br />

The newly created [`Listener`](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT).
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)` {#addOneTimeListener}


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [`Listener`](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the first parameter. Note that a
global listener will also be triggered by non-registered events.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to listen to|
    |**`callback`** | EventEmitter~callback<br /> ||The callback function to execute when the event occurs|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |this|The context to invoke the callback function in.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array and thus executed first.|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [`arguments`](Listener#arguments) property of the [`Listener`](Listener) object and can be retrieved or modified as desired.|

  </div>


**Return Value**

> Returns: `Listener`<br />

The newly created [`Listener`](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT).
  * `TypeError` : The `callback` parameter must be a function.


### `.emit(...)` {#emit}


Executes the callback function of all the [`Listener`](Listener) objects registered for
a given event. The callback functions are passed the additional arguments passed to `emit()`
(if any) followed by the arguments present in the [`arguments`](Listener#arguments) property of
the [`Listener`](Listener) object (if any).

If the [`eventsSuspended`](#eventsSuspended) property is `true` or the
[`Listener.suspended`](Listener#suspended) property is `true`, the callback functions
will not be executed.

This function returns an array containing the return values of each of the callbacks.

It should be noted that the regular listeners are triggered first followed by the global
listeners (those added with [`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT)).


  **Parameters**

  > Signature: `emit(event, ...args)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br /> ||The event|
    |**`args`** | *<br /> ||Arbitrary number of arguments to pass along to the callback functions|

  </div>


**Return Value**

> Returns: `Array`<br />

An array containing the return value of each of the executed listener
functions.


**Throws**:
  * `TypeError` : The `event` parameter must be a string.


### `.getListenerCount(...)` {#getListenerCount}


Returns the number of listeners registered for a specific event.

Please note that global events (those added with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT)) do not count towards the remaining
number for a "regular" event. To get the number of global listeners, specifically use
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the parameter.


  **Parameters**

  > Signature: `getListenerCount(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event which is usually a string but can also be the special [`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) symbol.|

  </div>


**Return Value**

> Returns: `number`<br />

An integer representing the number of listeners registered for the specified
event.




### `.getListeners(...)` {#getListeners}


Returns an array of all the [`Listener`](Listener) objects that have been registered for
a specific event.

Please note that global events (those added with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT)) are not returned for "regular"
events. To get the list of global listeners, specifically use
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the parameter.


  **Parameters**

  > Signature: `getListeners(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to get listeners for.|

  </div>


**Return Value**

> Returns: `Array.<Listener>`<br />

An array of [`Listener`](Listener) objects.




### `.hasListener(...)` {#hasListener}


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT)).

Note: to specifically check for global listeners added with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT), use
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] | string<br />EventEmitter.ANY_EVENT<br /> |(any event)|The event to check|
    |[**`callback`**] | function<br />Listener<br /> |(any callback)|The actual function that was added to the event or the [Listener](Listener) object returned by `addListener()`.|

  </div>


**Return Value**

> Returns: `boolean`<br />




### `.playNote(...)` {#playNote}


Plays a note or an array of notes on the channel. The first parameter is the note to play. It
can be a single value or an array of the following valid values:

 - A [`Note`](Note) object
 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)

The `playNote()` method sends a **note on** MIDI message for all specified notes. If a
`duration` is set in the `options` parameter or in the [`Note`](Note) object's
[`duration`](Note#duration) property, it will also schedule a **note off** message
to end the note after said duration. If no `duration` is set, the note will simply play until
a matching **note off** message is sent with [`stopNote()`](#OutputChannel+stopNote) or
[`sendNoteOff()`](#OutputChannel+sendNoteOff).

 The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [`Note`](Note) objects, the durations and velocities defined in the
[`Note`](Note) objects have precedence over the ones specified via the method's `options`
parameter.

**Note**: per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.


  **Parameters**

  > Signature: `playNote(note, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** | number<br />string<br />Note<br />Array.&lt;number&gt;<br />Array.&lt;string&gt;<br />Array.&lt;Note&gt;<br /> ||The note(s) to play. The notes can be specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`, `F-1`, `Db7`), a [`Note`](Note) object or an array of the previous types. When using a note identifier, the octave range must be between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest note is `G9` (MIDI note number `127`).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.duration`**] | number<br /> ||A positive decimal number larger than `0` representing the number of milliseconds to wait before sending a **note off** message. If invalid or left undefined, only a **note on** message will be sent.|
    |[**`options.attack`**] | number<br /> |0.5|The velocity at which to play the note (between `0` and `1`). If the `rawAttack` option is also defined, it will have priority. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.rawAttack`**] | number<br /> |0.5|The attack velocity at which to play the note (between `0` and `127`). This has priority over the `attack` property. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.release`**] | number<br /> |0.5|The velocity at which to release the note (between `0` and `1`). If the `rawRelease` option is also defined, it will have priority. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set.|
    |[**`options.rawRelease`**] | number<br /> |0.5|The velocity at which to release the note (between `0` and `127`). This has priority over the `release` property. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set.|
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.removeListener(...)` {#removeListener}


Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.


  **Parameters**

  > Signature: `removeListener([event], [callback], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] | string<br /> |(any events)|The event name.|
    |[**`callback`**] | EventEmitter~callback<br /> |(any callbacks)|Only remove the listeners that match this exact callback function.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | *<br /> |(any contexts)|Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] | number<br /> |(any number)|Only remove the listener if it has exactly that many remaining times to be executed.|

  </div>






### `.send(...)` {#send}


Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
sent immediately. The message should be an array of 8-bit unsigned integers (`0` - `225`),
a
[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
object or a [`Message`](Message) object.

It is usually not necessary to use this method directly as you can use one of the simpler
helper methods such as [`playNote()`](#playNote), [`stopNote()`](#stopNote),
[`sendControlChange()`](#sendControlChange), etc.

Details on the format of MIDI messages are available in the summary of
[MIDI messages](https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message)
from the MIDI Manufacturers Association.


  **Parameters**

  > Signature: `send(message, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`message`** | Array.&lt;number&gt;<br />Uint8Array<br />Message<br /> ||A `Message` object, an array of 8-bit unsigned integers or a `Uint8Array` object (not available in Node.js) containing the message bytes.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The first byte (status) must be an integer between 128 and 255.
  * `RangeError` : Data bytes must be integers between 0 and 255.


### `.sendAllNotesOff(...)` {#sendAllNotesOff}


Sends an **all notes off** channel mode message. This will make all currently playing notes
fade out just as if their key had been released. This is different from the
[`sendAllSoundOff()`](#sendAllSoundOff) method which mutes all sounds immediately.


  **Parameters**

  > Signature: `sendAllNotesOff([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendAllSoundOff(...)` {#sendAllSoundOff}


Sends an **all sound off** channel mode message. This will silence all sounds playing on that
channel but will not prevent new sounds from being triggered.


  **Parameters**

  > Signature: `sendAllSoundOff([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendChannelAftertouch(...)` {#sendChannelAftertouch}


Sends a MIDI **channel aftertouch** message. For key-specific aftertouch, you should instead
use [`sendKeyAftertouch()`](#sendKeyAftertouch).


  **Parameters**

  > Signature: `sendChannelAftertouch([pressure], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`pressure`**] | number<br /> ||The pressure level (between `0` and `1`). If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between `0` and `127`.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.rawValue`**] | boolean<br /> |false|A boolean indicating whether the value should be considered a float between `0` and `1.0` (default) or a raw integer between `0` and `127`.|
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * RangeError Invalid channel aftertouch value.


### `.sendChannelMode(...)` {#sendChannelMode}


Sends a MIDI **channel mode** message. The channel mode message to send can be specified
numerically or by using one of the following common names:

|  Type                |Number| Shortcut Method                                               |
| ---------------------|------|-------------------------------------------------------------- |
| `allsoundoff`        | 120  | [`sendAllSoundOff()`](#sendAllSoundOff)                 |
| `resetallcontrollers`| 121  | [`sendResetAllControllers()`](#sendResetAllControllers) |
| `localcontrol`       | 122  | [`sendLocalControl()`](#sendLocalControl)               |
| `allnotesoff`        | 123  | [`sendAllNotesOff()`](#sendAllNotesOff)                 |
| `omnimodeoff`        | 124  | [`sendOmniMode(false)`](#sendOmniMode)                  |
| `omnimodeon`         | 125  | [`sendOmniMode(true)`](#sendOmniMode)                   |
| `monomodeon`         | 126  | [`sendPolyphonicMode("mono")`](#sendPolyphonicMode)     |
| `polymodeon`         | 127  | [`sendPolyphonicMode("poly")`](#sendPolyphonicMode)     |

**Note**: as you can see above, to make it easier, all channel mode messages also have a matching
helper method.

It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may
require a value that's not zero. For that reason, the `value` parameter is optional and
defaults to 0.


  **Parameters**

  > Signature: `sendChannelMode(command, [value], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`command`** | number<br />string<br /> ||The numerical identifier of the channel mode message (integer between `120` and `127`) or its name as a string.|
    |[**`value`**] | number<br /> |0|The value to send (integer between `0` - `127`).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendControlChange(...)` {#sendControlChange}

**Since**: 3.0.0<br />

Sends a MIDI **control change** message to the channel at the scheduled time. The control
change message to send can be specified numerically (`0` to `127`) or by using one of the
following common names:

| Number | Name                          |
|--------|-------------------------------|
| 0      |`bankselectcoarse`             |
| 1      |`modulationwheelcoarse`        |
| 2      |`breathcontrollercoarse`       |
| 4      |`footcontrollercoarse`         |
| 5      |`portamentotimecoarse`         |
| 6      |`dataentrycoarse`              |
| 7      |`volumecoarse`                 |
| 8      |`balancecoarse`                |
| 10     |`pancoarse`                    |
| 11     |`expressioncoarse`             |
| 12     |`effectcontrol1coarse`         |
| 13     |`effectcontrol2coarse`         |
| 18     |`generalpurposeslider3`        |
| 19     |`generalpurposeslider4`        |
| 32     |`bankselectfine`               |
| 33     |`modulationwheelfine`          |
| 34     |`breathcontrollerfine`         |
| 36     |`footcontrollerfine`           |
| 37     |`portamentotimefine`           |
| 38     |`dataentryfine`                |
| 39     |`volumefine`                   |
| 40     |`balancefine`                  |
| 42     |`panfine`                      |
| 43     |`expressionfine`               |
| 44     |`effectcontrol1fine`           |
| 45     |`effectcontrol2fine`           |
| 64     |`holdpedal`                    |
| 65     |`portamento`                   |
| 66     |`sustenutopedal`               |
| 67     |`softpedal`                    |
| 68     |`legatopedal`                  |
| 69     |`hold2pedal`                   |
| 70     |`soundvariation`               |
| 71     |`resonance`                    |
| 72     |`soundreleasetime`             |
| 73     |`soundattacktime`              |
| 74     |`brightness`                   |
| 75     |`soundcontrol6`                |
| 76     |`soundcontrol7`                |
| 77     |`soundcontrol8`                |
| 78     |`soundcontrol9`                |
| 79     |`soundcontrol10`               |
| 80     |`generalpurposebutton1`        |
| 81     |`generalpurposebutton2`        |
| 82     |`generalpurposebutton3`        |
| 83     |`generalpurposebutton4`        |
| 91     |`reverblevel`                  |
| 92     |`tremololevel`                 |
| 93     |`choruslevel`                  |
| 94     |`celestelevel`                 |
| 95     |`phaserlevel`                  |
| 96     |`databuttonincrement`          |
| 97     |`databuttondecrement`          |
| 98     |`nonregisteredparametercoarse` |
| 99     |`nonregisteredparameterfine`   |
| 100    |`registeredparametercoarse`    |
| 101    |`registeredparameterfine`      |
| 120    |`allsoundoff`                  |
| 121    |`resetallcontrollers`          |
| 122    |`localcontrol`                 |
| 123    |`allnotesoff`                  |
| 124    |`omnimodeoff`                  |
| 125    |`omnimodeon`                   |
| 126    |`monomodeon`                   |
| 127    |`polymodeon`                   |

As you can see above, not all control change message have a matching name. This does not mean
you cannot use the others. It simply means you will need to use their number
(`0` to `127`) instead of their name. While you can still use them, numbers `120` to `127` are
usually reserved for *channel mode* messages. See
[`sendChannelMode()`](#OutputChannel+sendChannelMode) method for more info.

To view a detailed list of all available **control change** messages, please consult "Table 3 -
Control Change Messages" from the [MIDI Messages](
https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
specification.

**Note**: messages #0-31 (MSB) are paired with messages #32-63 (LSB). For example, message #1
(`modulationwheelcoarse`) can be accompanied by a second control change message for
`modulationwheelfine` to achieve a greater level of precision. if you want to specify both MSB
and LSB for messages between `0` and `31`, you can do so by passing a 2-value array as the
second parameter.


  **Parameters**

  > Signature: `sendControlChange(controller, value, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`controller`** | number<br />string<br /> ||The MIDI controller name or number (`0` - `127`).|
    |**`value`** | number<br />Array.&lt;number&gt;<br /> ||The value to send (0-127). You can also use a two-position array for controllers 0 to 31. In this scenario, the first value will be sent as usual and the second value will be sent to the matching LSB controller (which is obtained by adding 32 to the first controller)|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : Controller numbers must be between 0 and 127.
  * `RangeError` : Invalid controller name.
  * `TypeError` : The value array must have a length of 2.


### `.sendKeyAftertouch(...)` {#sendKeyAftertouch}


Sends a MIDI **key aftertouch** message at the scheduled time. This is a key-specific
aftertouch. For a channel-wide aftertouch message, use
[`sendChannelAftertouch()`](#sendChannelAftertouch).


  **Parameters**

  > Signature: `sendKeyAftertouch(note, [pressure], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** | number<br />Note<br />string<br />Array.&lt;number&gt;<br />Array.&lt;Note&gt;<br />Array.&lt;string&gt;<br /> ||The note(s) for which you are sending an aftertouch value. The notes can be specified by using a MIDI note number (`0` - `127`), a [`Note`](Note) object, a note identifier (e.g. `C3`, `G#4`, `F-1`, `Db7`) or an array of the previous types. When using a note identifier, octave range must be between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest note is `G9` (MIDI note number `127`). When using a note identifier, the octave value will be offset by the local [`octaveOffset`](#octaveOffset) and by [`Output.octaveOffset`](Output#octaveOffset) and [`WebMidi.octaveOffset`](WebMidi#octaveOffset) (if those values are not `0`). When using a key number, `octaveOffset` values are ignored.|
    |[**`pressure`**] | number<br /> |0.5|The pressure level (between `0` and `1`). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure is defined by using an integer between `0` and `127`.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.rawValue`**] | boolean<br /> |false|A boolean indicating whether the value should be considered a float between `0` and `1.0` (default) or a raw integer between `0` and `127`.|
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * RangeError Invalid key aftertouch value.


### `.sendLocalControl(...)` {#sendLocalControl}


Turns local control on or off. Local control is usually enabled by default. If you disable it,
the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
its out port.


  **Parameters**

  > Signature: `sendLocalControl([state], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`state`**] | boolean<br /> |false|Whether to activate local control (`true`) or disable it (`false`).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendMasterTuning(...)` {#sendMasterTuning}


Sends a **master tuning** message. The value is decimal and must be larger than -65 semitones
and smaller than 64 semitones.

Because of the way the MIDI specification works, the decimal portion of the value will be
encoded with a resolution of 14bit. The integer portion must be between -64 and 63
inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
a **Master Fine Tuning** RPN messages.


  **Parameters**

  > Signature: `sendMasterTuning([value], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`value`**] | number<br /> |0.0|The desired decimal adjustment value in semitones (-65 < x < 64)|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The value must be a decimal number between larger than -65 and smaller
than 64.


### `.sendModulationRange(...)` {#sendModulationRange}


Sends a **modulation depth range** message to adjust the depth of the modulation wheel's range.
The range can be specified with the `semitones` parameter, the `cents` parameter or by
specifying both parameters at the same time.


  **Parameters**

  > Signature: `sendModulationRange(semitones, [cents], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`semitones`** | number<br /> ||The desired adjustment value in semitones (integer between 0 and 127).|
    |[**`cents`**] | number<br /> |0|The desired adjustment value in cents (integer between 0 and 127).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendNoteOff(...)` {#sendNoteOff}


Sends a **note off** message for the specified notes on the channel. The first parameter is the
note. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [`Note`](Note) object

The execution of the **note off** command can be delayed by using the `time` property of the
`options` parameter.

When using [`Note`](Note) objects, the release velocity defined in the
[`Note`](Note) objects has precedence over the one specified via the method's `options`
parameter.


  **Parameters**

  > Signature: `sendNoteOff(note, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** | number<br />string<br />Note<br />Array.&lt;number&gt;<br />Array.&lt;string&gt;<br />Array.&lt;Note&gt;<br /> ||The note(s) to stop. The notes can be specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a [`Note`](Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.release`**] | number<br /> |0.5|The velocity at which to release the note (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have priority. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.rawRelease`**] | number<br /> |64|The velocity at which to release the note (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have priority. An invalid velocity value will silently trigger the default of `64`.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendNoteOn(...)` {#sendNoteOn}


Sends a **note on** message for the specified note(s) on the channel. The first parameter is
the note. It can be a single value or an array of the following valid values:

 - A [`Note`](Note) object
 - A MIDI note number (integer between `0` and `127`)
 - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)

 When passing a [`Note`](Note)object or a note name, the `octaveOffset` will be applied.
 This is not the case when using a note number. In this case, we assume you know exactly which
 MIDI note number should be sent out.

The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [`Note`](Note) objects, the attack velocity defined in the
[`Note`](Note) objects has precedence over the one specified via the method's `options`
parameter. Also, the `duration` is ignored. If you want to also send a **note off** message,
use the [`playNote()`](#playNote) method instead.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.


  **Parameters**

  > Signature: `sendNoteOn(note, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** | number<br />string<br />Note<br />Array.&lt;number&gt;<br />Array.&lt;string&gt;<br />Array.&lt;Note&gt;<br /> ||The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a [`Note`](Note) object or an array of the previous types.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.attack`**] | number<br /> |0.5|The velocity at which to play the note (between `0` and `1`).  If the `rawAttack` option is also defined, `rawAttack` will have priority. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.rawAttack`**] | number<br /> |64|The velocity at which to release the note (between `0` and `127`). If the `attack` option is also defined, `rawAttack` will have priority. An invalid velocity value will silently trigger the default of `64`.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendNrpnValue(...)` {#sendNrpnValue}


Sets a non-registered parameter (NRPN) to the specified value. The NRPN is selected by passing
in a two-position array specifying the values of the two control bytes. The value is specified
by passing in a single integer (most cases) or an array of two integers.

NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
they see fit. For example, according to the Roland GS specification, you can control the
**vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
would use:

```js
WebMidi.outputs[0].channels[0].sendNrpnValue([1, 8], 123);
```

In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
value to send was 10, you could use:

```js
WebMidi.outputs[0].channels[0].sendNrpnValue([2, 63], [0, 10]);
```

For further implementation details, refer to the manufacturer's documentation.


  **Parameters**

  > Signature: `sendNrpnValue(parameter, [data], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** | Array.&lt;number&gt;<br /> ||A two-position array specifying the two control bytes (0x63, 0x62) that identify the non-registered parameter.|
    |[**`data`**] | number<br />Array.&lt;number&gt;<br /> |[]|An integer or an array of integers with a length of 1 or 2 specifying the desired data.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The control value must be between 0 and 127.
  * `RangeError` : The msb value must be between 0 and 127


### `.sendOmniMode(...)` {#sendOmniMode}


Sets OMNI mode to `"on"` or `"off"`. MIDI's OMNI mode causes the instrument to respond to
messages from all channels.

It should be noted that support for OMNI mode is not as common as it used to be.


  **Parameters**

  > Signature: `sendOmniMode([state], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`state`**] | boolean<br /> |true|Whether to activate OMNI mode (`true`) or not (`false`).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `TypeError` : Invalid channel mode message name.
  * `RangeError` : Channel mode controller numbers must be between 120 and 127.
  * `RangeError` : Value must be an integer between 0 and 127.


### `.sendPitchBend(...)` {#sendPitchBend}


Sends a MIDI **pitch bend** message at the scheduled time. The resulting bend is relative to
the pitch bend range that has been defined. The range can be set with
[`sendPitchBendRange()`](#sendPitchBendRange). So, for example, if the pitch
bend range has been set to 12 semitones, using a bend value of -1 will bend the note 1 octave
below its nominal value.


  **Parameters**

  > Signature: `sendPitchBend([value], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`value`**] | number<br />Array.&lt;number&gt;<br /> ||The intensity of the bend (between -1.0 and 1.0). A value of zero means no bend. If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127 representing, respectively, the MSB (most significant byte) and the LSB (least significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64` bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents (1/100 of a semitone). An LSB of `64` also means no bend.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.rawValue`**] | boolean<br /> |false|A boolean indicating whether the value should be considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or an array of 2 integers if using both MSB and LSB).|
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendPitchBendRange(...)` {#sendPitchBendRange}


Sends a **pitch bend range** message at the scheduled time to adjust the range used by the
pitch bend lever. The range is specified by using the `semitones` and `cents` parameters. For
example, setting the `semitones` parameter to `12` means that the pitch bend range will be 12
semitones above and below the nominal pitch.


  **Parameters**

  > Signature: `sendPitchBendRange(semitones, [cents], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`semitones`** | number<br /> ||The desired adjustment value in semitones (between 0 and 127). While nothing imposes that in the specification, it is very common for manufacturers to limit the range to 2 octaves (-12 semitones to 12 semitones).|
    |[**`cents`**] | number<br /> |0|The desired adjustment value in cents (integer between 0-127).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The semitones value must be an integer between 0 and 127.
  * `RangeError` : The cents value must be an integer between 0 and 127.


### `.sendPolyphonicMode(...)` {#sendPolyphonicMode}


Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
multiple notes are being played.


  **Parameters**

  > Signature: `sendPolyphonicMode([mode], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`mode`**] | string<br /> |poly|The mode to use: `"mono"` or `"poly"`.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendProgramChange(...)` {#sendProgramChange}


Sends a MIDI **program change** message at the scheduled time.


  **Parameters**

  > Signature: `sendProgramChange([program], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`program`**] | number<br /> |1|The MIDI patch (program) number (integer between `0` and `127`).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `TypeError` : Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
than 0xFF.


### `.sendResetAllControllers(...)` {#sendResetAllControllers}


Sends a **reset all controllers** channel mode message. This resets all controllers, such as
the pitch bend, to their default value.


  **Parameters**

  > Signature: `sendResetAllControllers([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendRpnDecrement(...)` {#sendRpnDecrement}


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

  > Signature: `sendRpnDecrement(parameter, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** | String<br />Array.&lt;number&gt;<br /> ||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * TypeError The specified registered parameter is invalid.


### `.sendRpnIncrement(...)` {#sendRpnIncrement}


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

  > Signature: `sendRpnIncrement(parameter, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** | String<br />Array.&lt;number&gt;<br /> ||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * TypeError The specified registered parameter is invalid.


### `.sendRpnValue(...)` {#sendRpnValue}


Sets the specified MIDI registered parameter to the desired value. The value is defined with
up to two bytes of data (msb, lsb) that each can go from 0 to 127.

MIDI
[registered parameters](https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
extend the original list of control change messages. The MIDI 1.0 specification lists only a
limited number of them:

| Numbers      | Function                 |
|--------------|--------------------------|
| (0x00, 0x00) | `pitchbendrange`         |
| (0x00, 0x01) | `channelfinetuning`      |
| (0x00, 0x02) | `channelcoarsetuning`    |
| (0x00, 0x03) | `tuningprogram`          |
| (0x00, 0x04) | `tuningbank`             |
| (0x00, 0x05) | `modulationrange`        |
| (0x3D, 0x00) | `azimuthangle`           |
| (0x3D, 0x01) | `elevationangle`         |
| (0x3D, 0x02) | `gain`                   |
| (0x3D, 0x03) | `distanceratio`          |
| (0x3D, 0x04) | `maximumdistance`        |
| (0x3D, 0x05) | `maximumdistancegain`    |
| (0x3D, 0x06) | `referencedistanceratio` |
| (0x3D, 0x07) | `panspreadangle`         |
| (0x3D, 0x08) | `rollangle`              |

Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
Standard*, which is not widely implemented.


  **Parameters**

  > Signature: `sendRpnValue(rpn, [data], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`rpn`** | string<br />Array.&lt;number&gt;<br /> ||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the registered parameter.|
    |[**`data`**] | number<br />Array.&lt;number&gt;<br /> |[]|An single integer or an array of integers with a maximum length of 2 specifying the desired data.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.




### `.sendTuningBank(...)` {#sendTuningBank}


Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.


  **Parameters**

  > Signature: `sendTuningBank(value, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** | number<br /> ||The desired tuning bank (integer between `0` and `127`).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The bank value must be between 0 and 127.


### `.sendTuningProgram(...)` {#sendTuningProgram}


Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.


  **Parameters**

  > Signature: `sendTuningProgram(value, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** | number<br /> ||The desired tuning program (integer between `0` and `127`).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `OutputChannel`<br />

Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The program value must be between 0 and 127.


### `.stopNote(...)` {#stopNote}


Sends a **note off** message for the specified MIDI note number. The first parameter is the
note to stop. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [`Note`](Note) object

The execution of the **note off** command can be delayed by using the `time` property of the
`options` parameter.


  **Parameters**

  > Signature: `stopNote(note, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** | number<br />Note<br />string<br />Array.&lt;number&gt;<br />Array.&lt;Note&gt;<br />Array.&lt;string&gt;<br /> ||The note(s) to stop. The notes can be specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`, `F-1`, `Db7`) or an array of the previous types. When using a note identifier, octave range must be between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest note is `G9` (MIDI note number `127`).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.release`**] | number<br /> |0.5|The velocity at which to release the note (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have priority. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.rawRelease`**] | number<br /> |64|The velocity at which to release the note (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have priority. An invalid velocity value will silently trigger the default of `64`.|
    |[**`options.time`**] | number<br />string<br /> |(now)|If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([`DOMHighResTimeStamp`](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that time. The current time can be retrieved with [`WebMidi.time`](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.suspendEvent(...)` {#suspendEvent}


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) by passing
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) to `suspendEvent()`. Beware that this
will not suspend all callbacks but only those registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT). While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
listeners alone. If you truly want to suspends all callbacks for a specific
[`EventEmitter`](EventEmitter), simply set its `eventsSuspended` property to `true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event for which to suspend execution of all callback functions.|

  </div>






### `.unsuspendEvent(...)` {#unsuspendEvent}


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) by passing
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) to `unsuspendEvent()`. Beware that
this will not resume all callbacks but only those registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT). While this may seem
counter-intuitive, it allows the selective unsuspension of global listeners while leaving other
callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event for which to resume execution of all callback functions.|

  </div>






### `.waitFor(...)` {#waitFor}

**Attributes**: async

The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
when the specified event occurs. The event can be a regular event or
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) (if you want to resolve as soon as any
event is emitted).

If the `duration` option is set, the promise will only be fulfilled if the event is emitted
within the specified duration. If the event has not been fulfilled after the specified
duration, the promise is rejected. This makes it super easy to wait for an event and timeout
after a certain time if the event is not triggered.


  **Parameters**

  > Signature: `waitFor(event, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to wait for|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds to wait before the promise is automatically rejected.|

  </div>






