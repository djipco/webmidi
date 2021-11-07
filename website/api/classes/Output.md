
# Output

The `Output` class represents a single MIDI output port. This object is automatically
instantiated by the library according to the host's MIDI subsystem and should not be directly
instantiated. Instead, you can access all available `Output` objects by referring to the
[`WebMidi.outputs`](WebMidi#outputs) array.


**Extends**: [`EventEmitter`](EventEmitter)
<!--**Extends**: EventEmitter-->

**Fires**: [`closed`](#event:closed), [`disconnected`](#event:disconnected), [`opened`](#event:opened)

### `Constructor`


  **Parameters**

  > `new Output(midiOutput)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`midiOutput`** | MIDIOutput<br /> ||[`MIDIOutput`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIOutput) object as provided by the MIDI subsystem.|

  </div>



***

## Properties

### `.channels` {#channels}
**Type**: Array.&lt;OutputChannel&gt;<br />


Array containing the 16 [OutputChannel](OutputChannel) objects available for this `Output`. The
channels are numbered 1 through 16.


### `.connection` {#connection}
**Type**: string<br />
**Attributes**: read-only<br />


Output port's connection state: `"pending"`, `"open"` or `"closed"`.


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

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.


### `.eventsSuspended` {#eventsSuspended}
**Type**: boolean<br />


Whether or not the execution of function callbacks is currently suspended for this whole
emitter


### `.id` {#id}
**Type**: string<br />
**Attributes**: read-only<br />


ID string of the MIDI output. The ID is host-specific. Do not expect the same ID on different
platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
the same port.


### `.manufacturer` {#manufacturer}
**Type**: string<br />
**Attributes**: read-only<br />


Name of the manufacturer of the device that makes this output port available.


### `.name` {#name}
**Type**: string<br />
**Attributes**: read-only<br />


Name of the MIDI output


### `.octaveOffset` {#octaveOffset}
**Since**: 3.0<br />
**Type**: number<br />


An integer to offset the octave of outgoing notes. By default, middle C (MIDI note number 60)
is placed on the 4th octave (C4).

Note that this value is combined with the global offset value defined on the `WebMidi` object
(if any).


### `.state` {#state}
**Type**: string<br />
**Attributes**: read-only<br />


State of the output port: `"connected"` or `"disconnected"`.


### `.type` {#type}
**Type**: string<br />
**Attributes**: read-only<br />


Type of the output port (`"output"`)



***

## Methods


### `.addListener(...)` {#addListener}


Adds a listener for the specified event. It returns the [`Listener`](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use
[`EventEmitter.ANY_EVENT`](#ANY_EVENT) as the first parameter. Note that a global listener will
also be triggered by non-registered events.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to listen to|
    |**`callback`** | EventEmitter~callback<br /> ||The callback function to execute when the event occurs.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |this|The value of `this` in the callback function.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] | boolean<br /> |Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [`arguments`](Listener#arguments) property of the [`Listener`](Listener) object and can be retrieved or modified as desired.|

  </div>


**Return Value**

> Returns: `Listener`<br />

The newly created [`Listener`](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)` {#addOneTimeListener}


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [`Listener`](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the first parameter. Note that a global
listener will also be triggered by non-registered events.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to listen to|
    |**`callback`** | EventEmitter~callback<br /> ||The callback function to execute when the event occurs|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |this|The context to invoke the callback function in.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [`arguments`](Listener#arguments) property of the [`Listener`](Listener) object and can be retrieved or modified as desired.|

  </div>


**Return Value**

> Returns: `Listener`<br />

The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.clear()` {#clear}


Clears all messages that have been queued but not yet delivered.

Warning: this method has been defined in the specification but has not been implemented yet. As
soon as browsers implement it, it will work.

You can check out the current status of this feature for Chromium (Chrome) here:
https://bugs.chromium.org/p/chromium/issues/detail?id=471798


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.close()` {#close}

**Attributes**: async

Closes the output connection. When an output is closed, it cannot be used to send MIDI messages
until the output is opened again by calling [Output.open()](#Output+open). You can check
the connection status by looking at the [connection](Output#connection) property.


**Return Value**

> Returns: `Promise.<void>`<br />




### `.decrementRegisteredParameter(...)` {#decrementRegisteredParameter}


Decrements the specified MIDI registered parameter by 1. Here is the full list of parameter
names that can be used with this method:

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

  > Signature: `decrementRegisteredParameter(parameter, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** | String<br />Array.&lt;number&gt;<br /> ||A string identifying the parameter"s name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * TypeError The specified parameter is not available.


### `.destroy()` {#destroy}

**Attributes**: async

Destroys the `Output`. All listeners are removed, all channels are destroyed and the MIDI
subsystem is unlinked.


**Return Value**

> Returns: `Promise.<void>`<br />




### `.emit(...)` {#emit}


Executes the callback function of all the [`Listener`](Listener) objects registered for
a given event. The callback functions are passed the additional arguments passed to `emit()`
(if any) followed by the arguments present in the [`arguments`](Listener#arguments) property of
the [`Listener`](Listener) object (if any).

If the [`eventsSuspended`](#eventsSuspended) property or the
[`suspended`](Listener#suspended) property of the [`Listener`](Listener) is `true`,
the callback functions will not be executed.

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
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to get listeners for|

  </div>


**Return Value**

> Returns: `Array.<Listener>`<br />

An array of [`Listener`](Listener) objects




### `.hasListener(...)` {#hasListener}


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to [`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT)).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] | string<br />EventEmitter.ANY_EVENT<br /> ||The event to check|
    |[**`callback`**] | function<br />Listener<br /> ||The actual function that was added to the event or the [Listener](Listener) object returned by `addListener()`.|

  </div>


**Return Value**

> Returns: `boolean`<br />




### `.incrementRegisteredParameter(...)` {#incrementRegisteredParameter}


Increments the specified MIDI registered parameter by 1. Here is the full list of parameter
names that can be used with this method:

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

  > Signature: `incrementRegisteredParameter(parameter, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** | String<br />Array.&lt;number&gt;<br /> ||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.open()` {#open}

**Attributes**: async

Opens the output for usage.


**Return Value**

> Returns: `Promise.<Output>`<br />

The promise is fulfilled with the `Output`




### `.playNote(...)` {#playNote}


Plays a note or an array of notes on one or more channels of this output. The first parameter
is the note to play. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [Note](Note) object

The `playNote()` method sends a **note on** MIDI message for all specified notes on all
specified channels. If no channels are specified, it will send to all channels. If a `duration`
is set in the `options` parameter or in the [Note](Note) object's
[duration](Note#duration) property, it will also schedule a **note off** message to end
the note after said duration. If no `duration` is set, the note will simply play until a
matching **note off** message is sent with [stopNote()](#Output+stopNote) or
[sendNoteOff()](#Output+sendNoteOff).

The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](Note) objects, the durations and velocities defined in the [Note](Note)
objects have precedence over the ones specified via the method's `options` parameter.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.


  **Parameters**

  > Signature: `playNote(note, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** | number<br />string<br />Note<br />Array.&lt;number&gt;<br />Array.&lt;string&gt;<br />Array.&lt;Note&gt;<br /> ||The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to play the note on. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.duration`**] | number<br /> ||The number of milliseconds (integer) after which a **note off** message will be scheduled. If left undefined, only a **note on** message is sent.|
    |[**`options.rawValue`**] | boolean<br /> |false|Controls whether the attack and release velocities are set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default).|
    |[**`options.release`**] | number<br /> |0.5|The velocity at which to release the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set.|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.attack`**] | number<br /> |0.5|The attack velocity to use when playing the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.removeListener(...)` {#removeListener}


Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.


  **Parameters**

  > Signature: `removeListener([event], [callback], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] | string<br /> ||The event name.|
    |[**`callback`**] | EventEmitter~callback<br /> ||Only remove the listeners that match this exact callback function.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | *<br /> ||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] | number<br /> ||Only remove the listener if it has exactly that many remaining times to be executed.|

  </div>






### `.resetAllControllers(...)` {#resetAllControllers}


Sends a **reset all controllers** channel mode message. This resets all controllers, such as
the pitch bend, to their default value.


  **Parameters**

  > Signature: `resetAllControllers([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />




### `.send(...)` {#send}


Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
sent immediately. The message should be an array of 8 bit unsigned integers (0-225), a
[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
object or a `Message` object.

It is usually not necessary to use this method directly as you can use one of the simpler
helper methods such as [playNote()`, `stopNote()`, `sendControlChange()`, etc.

Details on the format of MIDI messages are available in the summary of
[MIDI messages](https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message)
from the MIDI Manufacturers Association.


  **Parameters**

  > Signature: `send(message, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`message`** | Array.&lt;number&gt;<br />Uint8Array<br />Message<br /> ||An array of 8bit unsigned integers, a `Uint8Array` object (not available in Node.js) containing the message bytes or a `Message` object.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([DOMHighResTimeStamp](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that point time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The first byte (status) must be an integer between 128 and 255.


### `.sendActiveSensing(...)` {#sendActiveSensing}


Sends an **active sensing** real-time message. This tells the device connected to this port
that the connection is still good. Active sensing messages should be sent every 300 ms if there
was no other activity on the MIDI port.


  **Parameters**

  > Signature: `sendActiveSensing([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.sendChannelMode(...)` {#sendChannelMode}


Sends a MIDI **channel mode** message to the specified channel(s). The channel mode message to
send can be specified numerically or by using one of the following common names:

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

  - [turnSoundOff()](OutputChannel#turnSoundOff)
  - [resetAllControllers()](OutputChannel#resetAllControllers)
  - [setLocalControl()](OutputChannel#turnSoundOff)
  - [turnNotesOff()](OutputChannel#turnNotesOff)
  - [setOmniMode()](OutputChannel#setOmniMode)
  - [setPolyphonicMode()](OutputChannel#setPolyphonicMode)


  **Parameters**

  > Signature: `sendChannelMode(command, [value], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`command`** | number<br />string<br /> ||The numerical identifier of the channel mode message (integer between 120-127) or its name as a string.|
    |[**`value`**] | number<br /> ||The value to send (integer between 0-127).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `TypeError` : Invalid channel mode message name.
  * `RangeError` : Channel mode controller numbers must be between 120 and 127.
  * `RangeError` : Value must be an integer between 0 and 127.


### `.sendClock(...)` {#sendClock}


Sends a MIDI **clock* real-time message. According to the standard, there are 24 MIDI Clocks
for every quarter note.


  **Parameters**

  > Signature: `sendClock([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.sendContinue(...)` {#sendContinue}


Sends a **continue** real-time message. This resumes song playback where it was previously
stopped or where it was last cued with a song position message. To start playback from the
start, use the [sendStart()](#Output+sendStart)` method.


  **Parameters**

  > Signature: `sendContinue([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.sendControlChange(...)` {#sendControlChange}


Sends a MIDI **control change** message to the specified channel(s) at the scheduled time. The
control change message to send can be specified numerically (0-127) or by using one of the
following common names:

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

Note: as you can see above, not all control change message have a matching common name. This
does not mean you cannot use the others. It simply means you will need to use their number
(0-127) instead of their name. While you can still use them, numbers 120 to 127 are usually
reserved for *channel mode* messages. See [sendChannelMode()](#Output+sendChannelMode)
method for more info.

To view a list of all available `control change` messages, please consult "Table 3 - Control
Change Messages" from the [MIDI Messages](
https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
specification.


  **Parameters**

  > Signature: `sendControlChange(controller, [value], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`controller`** | number<br />string<br /> ||The MIDI controller name or number (0-127).|
    |[**`value`**] | number<br /> |0|The value to send (0-127).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : Controller numbers must be between 0 and 127.
  * `RangeError` : Invalid controller name.


### `.sendNoteOff(...)` {#sendNoteOff}


Sends a **note off** message for the specified MIDI note number on the specified channel(s).
The first parameter is the number. It can be a single value or an array of the following valid
values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)

 The execution of the **note off** command can be delayed by using the `time` property of the
`options` parameter.


  **Parameters**

  > Signature: `sendNoteOff(note, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** | number<br />string<br />Array.&lt;number&gt;<br />Array.&lt;string&gt;<br /> ||The note(s) to stop. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7) or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.rawValue`**] | boolean<br /> |false|Controls whether the release velocity is set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.release`**] | number<br /> |0.5|The velocity at which to release the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.sendNoteOn(...)` {#sendNoteOn}


Sends a **note on** message for the specified MIDI note number on the specified channel(s). The
first parameter is the number. It can be a single value or an array of the following valid
values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)

 The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.


  **Parameters**

  > Signature: `sendNoteOn(note, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** | number<br />string<br />Array.&lt;number&gt;<br />Array.&lt;string&gt;<br /> ||The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7) or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.rawValue`**] | boolean<br /> |false|Controls whether the attack velocity is set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.attack`**] | number<br /> |0.5|The velocity at which to play the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.sendReset(...)` {#sendReset}


Sends a **reset** real-time message. This tells the device connected to this output that it
should reset itself to a default state.


  **Parameters**

  > Signature: `sendReset([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.sendStart(...)` {#sendStart}


Sends a **start** real-time message. A MIDI Start message starts the playback of the current
song at beat 0. To start playback elsewhere in the song, use the
[sendContinue()](#Output+sendContinue) method.


  **Parameters**

  > Signature: `sendStart([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.sendStop(...)` {#sendStop}


Sends a **stop** real-time message. This tells the device connected to this output to stop
playback immediately (or at the scheduled time).


  **Parameters**

  > Signature: `sendStop([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.sendSysex(...)` {#sendSysex}


Sends a MIDI [system exclusive](https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages)
(*sysex*) message. The `data` parameter should only contain the data of the message. When
sending out the actual MIDI message, WebMidi.js will automatically prepend the data with the
*sysex byte* (`0xF0`) and the manufacturer ID byte(s). It will also automatically terminate
the message with the *sysex end byte* (`0xF7`).

The data can be an array of unsigned integers (0-127) or a `Uint8Array` object.

To use the `sendSysex()` method, system exclusive message support must have been enabled. To
do so, you must set the `sysex` option to `true` when calling `WebMidi.enable()`:

```js
WebMidi.enable({sysex: true})
  .then(() => console.log("System exclusive messages are enabled");
```

Note that, depending on browser, version and platform, it is generally necessary to serve the
page over HTTPS to enable sysex support.

##### Examples

If you want to send a sysex message to a Korg device connected to the first output, you would
use the following code:

```js
WebMidi.outputs[0].sendSysex(0x42, [0x1, 0x2, 0x3, 0x4, 0x5]);
```

The parameters can be specified using any number notation (decimal, hex, binary, etc.).
Therefore, the code below is equivalent to the code above:

```js
WebMidi.outputs[0].sendSysex(66, [1, 2, 3, 4, 5]);
```

The above code sends the byte values 1, 2, 3, 4 and 5 to Korg devices (hex 42 is the same as
decimal 66).

Some manufacturers are identified using 3 bytes. In this case, you would use a 3-position array
as the first parameter. For example, to send the same sysex message to a
*Native Instruments* device:

```js
WebMidi.outputs[0].sendSysex([0x00, 0x21, 0x09], [0x1, 0x2, 0x3, 0x4, 0x5]);
```
There is no limit for the length of the data array. However, it is generally suggested to keep
system exclusive messages to 64Kb or less.


  **Parameters**

  > Signature: `sendSysex(manufacturer, [data], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`manufacturer`** | number<br />Array.&lt;number&gt;<br /> ||An unsigned integer or an array of three unsigned integers between 0 and 127 that identify the targeted manufacturer. The *MIDI Manufacturers Association* maintains a full list of [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers) .|
    |[**`data`**] | Array.&lt;number&gt;<br />Uint8Array<br /> |[]|A Uint8Array or an array of unsigned integers between 0 and 127. This is the data you wish to transfer.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `DOMException` : Failed to execute 'send' on 'MIDIOutput': System exclusive message is
not allowed.
  * `TypeError` : Failed to execute 'send' on 'MIDIOutput': The value at index x is greater
than 0xFF.


### `.sendTimecodeQuarterFrame(...)` {#sendTimecodeQuarterFrame}


Sends a MIDI **timecode quarter frame** message. Please note that no processing is being done
on the data. It is up to the developer to format the data according to the
[MIDI Timecode](https://en.wikipedia.org/wiki/MIDI_timecode) format.


  **Parameters**

  > Signature: `sendTimecodeQuarterFrame(value, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** | number<br /> ||The quarter frame message content (integer between 0 and 127).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.sendTuneRequest(...)` {#sendTuneRequest}

**Since**: 3.0.0<br />

Sends a MIDI **tune request** real-time message.


  **Parameters**

  > Signature: `sendTuneRequest([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.setChannelAftertouch(...)` {#setChannelAftertouch}

**Since**: 3.0.0<br />

Sends a MIDI **channel aftertouch** message to the specified channel(s). For key-specific
aftertouch, you should instead use [setKeyAftertouch()](#Output+setKeyAftertouch).


  **Parameters**

  > Signature: `setChannelAftertouch([pressure], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`pressure`**] | number<br /> |0.5|The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.rawValue`**] | boolean<br /> |false|A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.setKeyAftertouch(...)` {#setKeyAftertouch}

**Since**: 3.0.0<br />

Sends a MIDI **key aftertouch** message to the specified channel(s) at the scheduled time. This
is a key-specific aftertouch. For a channel-wide aftertouch message, use
[setChannelAftertouch()](#Output+setChannelAftertouch).


  **Parameters**

  > Signature: `setKeyAftertouch(note, [pressure], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** | number<br />string<br />Array<br /> ||The note for which you are sending an aftertouch value. The notes can be specified in one of two ways. The first way is by using the MIDI note number (an integer between 0 and 127). The second way is by using the note name followed by the octave (C3, G#4, F-1, Db7). The octave range should be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). It is also possible to use an array of note names and/or numbers.|
    |[**`pressure`**] | number<br /> |0.5|The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.rawValue`**] | boolean<br /> |false|A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.setLocalControl(...)` {#setLocalControl}

**Since**: 3.0.0<br />

Turns local control on or off. Local control is usually enabled by default. If you disable it,
the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
its out port.


  **Parameters**

  > Signature: `setLocalControl([state], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`state`**] | boolean<br /> |false|Whether to activate local control (`true`) or disable it (`false`).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.setMasterTuning(...)` {#setMasterTuning}

**Since**: 3.0.0<br />

Sends a master tuning message to the specified channel(s). The value is decimal and must be
larger than -65 semitones and smaller than 64 semitones.

Because of the way the MIDI specification works, the decimal portion of the value will be
encoded with a resolution of 14bit. The integer portion must be between -64 and 63
inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
a **Master Fine Tuning** RPN messages.


  **Parameters**

  > Signature: `setMasterTuning([value], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`value`**] | number<br /> |0.0|The desired decimal adjustment value in semitones (-65 < x < 64)|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The value must be a decimal number between larger than -65 and smaller
than 64.


### `.setModulationRange(...)` {#setModulationRange}

**Since**: 3.0.0<br />

Sends a **modulation depth range** message to the specified channel(s) so that they adjust the
depth of their modulation wheel's range. The range can be specified with the `semitones`
parameter, the `cents` parameter or by specifying both parameters at the same time.


  **Parameters**

  > Signature: `setModulationRange([semitones], [cents], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`semitones`**] | number<br /> |0|The desired adjustment value in semitones (integer between 0 and 127).|
    |[**`cents`**] | number<br /> |0|The desired adjustment value in cents (integer between 0 and 127).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The msb value must be between 0 and 127
  * `RangeError` : The lsb value must be between 0 and 127


### `.setNonRegisteredParameter(...)` {#setNonRegisteredParameter}


Sets a non-registered parameter to the specified value. The NRPN is selected by passing in a
two-position array specifying the values of the two control bytes. The value is specified by
passing in a single integer (most cases) or an array of two integers.

NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
they see fit. For example, according to the Roland GS specification, you can control the
**vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
would use:

```js
WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123);
```

Obviously, you should select a channel so the message is not sent to all channels. For
instance, to send to channel 1 of the first output port, you would use:

```js
WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123, 1);
```

In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
value to send was 10, you could use:

```js
WebMidi.outputs[0].setNonRegisteredParameter([2, 63], [0, 10], [1]);
```

For further implementation details, refer to the manufacturer"s documentation.


  **Parameters**

  > Signature: `setNonRegisteredParameter(parameter, [data], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** | Array.&lt;number&gt;<br /> ||A two-position array specifying the two control bytes (0x63, 0x62) that identify the non-registered parameter.|
    |[**`data`**] | number<br />Array.&lt;number&gt;<br /> |[]|An integer or an array of integers with a length of 1 or 2 specifying the desired data.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The control value must be between 0 and 127.
  * `RangeError` : The msb value must be between 0 and 127


### `.setOmniMode(...)` {#setOmniMode}

**Since**: 3.0.0<br />

Sets OMNI mode to `"on"` or `"off"` for the specified channel(s). MIDI's OMNI mode causes the
instrument to respond to messages from all channels.

It should be noted that support for OMNI mode is not as common as it used to be.


  **Parameters**

  > Signature: `setOmniMode([state], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`state`**] | boolean<br /> ||Whether to activate OMNI mode (`true`) or not (`false`).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `TypeError` : Invalid channel mode message name.
  * `RangeError` : Channel mode controller numbers must be between 120 and 127.
  * `RangeError` : Value must be an integer between 0 and 127.


### `.setPitchBend(...)` {#setPitchBend}

**Since**: 3.0.0<br />

Sends a MIDI **pitch bend** message to the specified channel(s) at the scheduled time.


  **Parameters**

  > Signature: `setPitchBend(value, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** | number<br />Array.&lt;number&gt;<br /> ||The intensity of the bend (between -1.0 and 1.0). A value of zero means no bend. The resulting bend is relative to the pitch bend range that has been defined. The range can be set with [setPitchBendRange()](OutputChannel#setPitchBendRange) . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of -1 will bend the note 1 octave below its nominal value. If an invalid value is specified, the nearest valid value will be used instead. If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127 representing, respectively, the MSB (most significant byte) and the LSB (least significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64` bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents (1/100 of a semitone). An LSB of `64` also means no bend.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.rawValue`**] | boolean<br /> |false|A boolean indicating whether the value should be considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or an array of 2 integers if using both MSB and LSB).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.setPitchBendRange(...)` {#setPitchBendRange}

**Since**: 3.0.0<br />

Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
adjust the range used by their pitch bend lever. The range is specified by using the
`semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
means that the pitch bend range will be 12 semitones above and below the nominal pitch.


  **Parameters**

  > Signature: `setPitchBendRange(semitones, [cents], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`semitones`** | number<br /> ||The desired adjustment value in semitones (between 0 and 127). While nothing imposes that in the specification, it is very common for manufacturers to limit the range to 2 octaves (-12 semitones to 12 semitones).|
    |[**`cents`**] | number<br /> |0|The desired adjustment value in cents (integer between 0-127).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The msb value must be between 0 and 127.
  * `RangeError` : The lsb value must be between 0 and 127.


### `.setPolyphonicMode(...)` {#setPolyphonicMode}

**Since**: 3.0.0<br />

Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
multiple notes are being played.


  **Parameters**

  > Signature: `setPolyphonicMode(mode, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`mode`** | string<br /> ||The mode to use: `"mono"` or `"poly"`.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.setProgram(...)` {#setProgram}

**Since**: 3.0.0<br />

Sends a MIDI **program change** message to the specified channel(s) at the scheduled time.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setProgram([program], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`program`**] | number<br /> |1|The MIDI patch (program) number (1-128)|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `TypeError` : Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
than 0xFF.


### `.setRegisteredParameter(...)` {#setRegisteredParameter}


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

  > Signature: `setRegisteredParameter(parameter, [data], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** | string<br />Array.&lt;number&gt;<br /> ||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the registered parameter.|
    |[**`data`**] | number<br />Array.&lt;number&gt;<br /> |[]|A single integer or an array of integers with a maximum length of 2 specifying the desired data.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.setSong(...)` {#setSong}

**Since**: 3.0.0<br />

Sends a **song select** MIDI message.

**Note**: since version 3.0, the song number is an integer between 1 and 128. In versions 1.0
and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices that
use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setSong(value, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** | number<br /> ||The number of the song to select (integer between 1 and 128).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * The song number must be between 1 and 128.


### `.setSongPosition(...)` {#setSongPosition}

**Since**: 3.0.0<br />

Sends a **ong position** MIDI message. The value is expressed in MIDI beats (between 0 and
16383) which are 16th note. Position 0 is always the start of the song.


  **Parameters**

  > Signature: `setSongPosition([value], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`value`**] | number<br /> |0|The MIDI beat to cue to (integer between 0 and 16383).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.




### `.setTuningBank(...)` {#setTuningBank}

**Since**: 3.0.0<br />

Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setTuningBank(value, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** | number<br /> ||The desired tuning bank (1-128).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The bank value must be between 1 and 128.


### `.setTuningProgram(...)` {#setTuningProgram}

**Since**: 3.0.0<br />

Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setTuningProgram(value, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** | number<br /> ||The desired tuning program (1-128).|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />

Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The program value must be between 1 and 128.


### `.stopNote(...)` {#stopNote}


This is an alias to the [sendNoteOff()](#Output+sendNoteOff) method.


  **Parameters**

  > Signature: `stopNote(note, options)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |  |||
    |**`options`** |  |||

  </div>


**Return Value**

> Returns: `Output`<br />




### `.suspendEvent(...)` {#suspendEvent}


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) by passing
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) to `suspendEvent()`. Beware that this
will not suspend all callbacks but only those registered with `EventEmitter.ANY_EVENT`. While
this may seem counter-intuitive at first glance, it allows the selective suspension of global
listeners while leaving other liseners alone. If you truly want to suspends all callbacks for a
specific [`EventEmitter`](EventEmitter), simply set its `eventsSuspended` property to
`true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event for which to suspend execution of all callback functions.|

  </div>






### `.turnNotesOff(...)` {#turnNotesOff}

**Since**: 3.0.0<br />

Sends an **all notes off** channel mode message. This will make all currently playing notes
fade out just as if their key had been released. This is different from the
[turnSoundOff()](#Output+turnSoundOff) method which mutes all sounds immediately.


  **Parameters**

  > Signature: `turnNotesOff([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />




### `.turnSoundOff(...)` {#turnSoundOff}

**Since**: 3.0.0<br />

Sends an **all sound off** channel mode message. This will silence all sounds playing on that
channel but will not prevent new sounds from being triggered.


  **Parameters**

  > Signature: `turnSoundOff([options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | Object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br />&quot;all&quot;<br /> |&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] | number<br />string<br /> ||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|

  </div>


**Return Value**

> Returns: `Output`<br />




### `.unsuspendEvent(...)` {#unsuspendEvent}


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) by passing
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) to `unsuspendEvent()`. Beware that
this will not resume all callbacks but only those registered with `EventEmitter.ANY_EVENT`.
While this may seem counter-intuitive,it allows the selective unsuspension of global listeners
while leaving other callbacks alone.


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






***

## Events

### `closed` {#event-closed}

<a id="event:closed"></a>


Event emitted when the [Output](Output) has been closed by calling the
[close()](Output#close) method.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"closed"`|
  |**`target`** |Output|The object that triggered the event|


### `disconnected` {#event-disconnected}

<a id="event:disconnected"></a>


Event emitted when the [Output](Output) becomes unavailable. This event is typically fired
when the MIDI device is unplugged.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp0 when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"disconnected"`|
  |**`target`** |object|Object with properties describing the {@link Output} that triggered the event. This is not the actual `Output` as it is no longer available.|
  |**`target.connection`** |string|`"closed"`|
  |**`target.id`** |string|ID of the input|
  |**`target.manufacturer`** |string|Manufacturer of the device that provided the input|
  |**`target.name`** |string|Name of the device that provided the input|
  |**`target.state`** |string|`"disconnected"`|
  |**`target.type`** |string|`"output"`|


### `opened` {#event-opened}

<a id="event:opened"></a>


Event emitted when the [Output](Output) has been opened by calling the
[open()](Output#open) method.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"opened"`|
  |**`target`** |Output|The object that triggered the event|



