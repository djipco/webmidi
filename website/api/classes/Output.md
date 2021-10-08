<a name="Output"></a>

# Output ⇐ [<code>EventEmitter</code>](#EventEmitter)
The `Output` class represents a MIDI output port. This object is derived from the host's MIDI
subsystem and cannot be instantiated directly.

You can find a list of all available `Output` objects in the
[WebMidi.outputs](#WebMidi+outputs) array.

The `Output` class extends the
[EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
[djipevents](https://djipco.github.io/djipevents/index.html) module. This means
it also includes methods such as
[addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
[removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
[hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
others.

<!--**Kind**: global class  
-->
**Extends**: [<code>EventEmitter</code>](#EventEmitter)  
**Emits**: [<code>opened</code>](#Output+event_opened), [<code>disconnected</code>](#Output+event_disconnected), [<code>closed</code>](#Output+event_closed)  
<!--**License**: Apache-2.0  
-->


* [Output](#Output) ⇐ [<code>EventEmitter</code>](#EventEmitter)

    * [new Output(midiOutput)](#new_Output_new)

    * [.channels](#Output+channels) : [<code>Array.&lt;OutputChannel&gt;</code>](#OutputChannel)

    * [.connection](#Output+connection) : <code>string</code>

    * [.eventCount](#EventEmitter+eventCount) : <code>number</code>

    * [.eventMap](#EventEmitter+eventMap) : <code>Object</code>

    * [.eventNames](#EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

    * [.eventsSuspended](#EventEmitter+eventsSuspended) : <code>boolean</code>

    * [.id](#Output+id) : <code>string</code>

    * [.manufacturer](#Output+manufacturer) : <code>string</code>

    * [.name](#Output+name) : <code>string</code>

    * [.octaveOffset](#Output+octaveOffset) : <code>number</code>

    * [.state](#Output+state) : <code>string</code>

    * [.type](#Output+type) : <code>string</code>

    * [.addListener(event, callback, [options])](#EventEmitter+addListener) ⇒ [<code>Listener</code>](#Listener)

    * [.addOneTimeListener(event, callback, [options])](#EventEmitter+addOneTimeListener) ⇒ [<code>Listener</code>](#Listener)

    * [.clear()](#Output+clear) ⇒ [<code>Output</code>](#Output)

    * [.close()](#Output+close) ⇒ <code>Promise.&lt;void&gt;</code>

    * [.decrementRegisteredParameter(parameter, [options])](#Output+decrementRegisteredParameter) ⇒ [<code>Output</code>](#Output)

    * [.destroy()](#Output+destroy) ⇒ <code>Promise.&lt;void&gt;</code>

    * [.emit(event, ...args)](#EventEmitter+emit) ⇒ <code>Array</code>

    * [.getListenerCount(event)](#EventEmitter+getListenerCount) ⇒ <code>number</code>

    * [.getListeners(event)](#EventEmitter+getListeners) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

    * [.hasListener([event], [callback])](#EventEmitter+hasListener) ⇒ <code>boolean</code>

    * [.incrementRegisteredParameter(parameter, [options])](#Output+incrementRegisteredParameter) ⇒ [<code>Output</code>](#Output)

    * [.open()](#Output+open) ⇒ [<code>Promise.&lt;Output&gt;</code>](#Output)

    * [.playNote(note, [options])](#Output+playNote) ⇒ [<code>Output</code>](#Output)

    * [.removeListener([event], [callback], [options])](#EventEmitter+removeListener)

    * [.resetAllControllers([options])](#Output+resetAllControllers) ⇒ [<code>Output</code>](#Output)

    * [.send(message, [options])](#Output+send) ⇒ [<code>Output</code>](#Output)

    * [.sendActiveSensing([options])](#Output+sendActiveSensing) ⇒ [<code>Output</code>](#Output)

    * [.sendChannelMode(command, [value], [options])](#Output+sendChannelMode) ⇒ [<code>Output</code>](#Output)

    * [.sendClock([options])](#Output+sendClock) ⇒ [<code>Output</code>](#Output)

    * [.sendContinue([options])](#Output+sendContinue) ⇒ [<code>Output</code>](#Output)

    * [.sendControlChange(controller, [value], [options])](#Output+sendControlChange) ⇒ [<code>Output</code>](#Output)

    * [.sendNoteOff(note, [options])](#Output+sendNoteOff) ⇒ [<code>Output</code>](#Output)

    * [.sendNoteOn(note, [options])](#Output+sendNoteOn) ⇒ [<code>Output</code>](#Output)

    * [.sendReset([options])](#Output+sendReset) ⇒ [<code>Output</code>](#Output)

    * [.sendStart([options])](#Output+sendStart) ⇒ [<code>Output</code>](#Output)

    * [.sendStop([options])](#Output+sendStop) ⇒ [<code>Output</code>](#Output)

    * [.sendSysex(manufacturer, [data], [options])](#Output+sendSysex) ⇒ [<code>Output</code>](#Output)

    * [.sendTimecodeQuarterFrame(value, [options])](#Output+sendTimecodeQuarterFrame) ⇒ [<code>Output</code>](#Output)

    * [.sendTuneRequest([options])](#Output+sendTuneRequest) ⇒ [<code>Output</code>](#Output)

    * [.setChannelAftertouch([pressure], [options])](#Output+setChannelAftertouch) ⇒ [<code>Output</code>](#Output)

    * [.setKeyAftertouch(note, [pressure], [options])](#Output+setKeyAftertouch) ⇒ [<code>Output</code>](#Output)

    * [.setLocalControl([state], [options])](#Output+setLocalControl) ⇒ [<code>Output</code>](#Output)

    * [.setMasterTuning([value], [options])](#Output+setMasterTuning) ⇒ [<code>Output</code>](#Output)

    * [.setModulationRange([semitones], [cents], [options])](#Output+setModulationRange) ⇒ [<code>Output</code>](#Output)

    * [.setNonRegisteredParameter(parameter, [data], [options])](#Output+setNonRegisteredParameter) ⇒ [<code>Output</code>](#Output)

    * [.setOmniMode([state], [options])](#Output+setOmniMode) ⇒ [<code>Output</code>](#Output)

    * [.setPitchBend(value, [options])](#Output+setPitchBend) ⇒ [<code>Output</code>](#Output)

    * [.setPitchBendRange(semitones, [cents], [options])](#Output+setPitchBendRange) ⇒ [<code>Output</code>](#Output)

    * [.setPolyphonicMode(mode, [options])](#Output+setPolyphonicMode) ⇒ [<code>Output</code>](#Output)

    * [.setProgram([program], [options])](#Output+setProgram) ⇒ [<code>Output</code>](#Output)

    * [.setRegisteredParameter(parameter, [data], [options])](#Output+setRegisteredParameter) ⇒ [<code>Output</code>](#Output)

    * [.setSong(value, [options])](#Output+setSong) ⇒ [<code>Output</code>](#Output)

    * [.setSongPosition([value], [options])](#Output+setSongPosition) ⇒ [<code>Output</code>](#Output)

    * [.setTuningBank(value, [options])](#Output+setTuningBank) ⇒ [<code>Output</code>](#Output)

    * [.setTuningProgram(value, [options])](#Output+setTuningProgram) ⇒ [<code>Output</code>](#Output)

    * [.stopNote(note, options)](#Output+stopNote) ⇒ [<code>Output</code>](#Output)

    * [.suspendEvent(event)](#EventEmitter+suspendEvent)

    * [.turnNotesOff([options])](#Output+turnNotesOff) ⇒ [<code>Output</code>](#Output)

    * [.turnSoundOff([options])](#Output+turnSoundOff) ⇒ [<code>Output</code>](#Output)

    * [.unsuspendEvent(event)](#EventEmitter+unsuspendEvent)

    * [.waitFor(event, [options])](#EventEmitter+waitFor)

    * ["closed"](#Output+event_closed)

    * ["disconnected"](#Output+event_disconnected)

    * ["opened"](#Output+event_opened)


* * *

<a name="new_Output_new"></a>

## new Output(midiOutput)
<!---->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| midiOutput | <code>MIDIOutput</code> | `MIDIOutput` object as provided by the MIDI subsystem |


* * *

<a name="Output+channels"></a>

## output.channels : [<code>Array.&lt;OutputChannel&gt;</code>](#OutputChannel)
Array containing the 16 [OutputChannel](#OutputChannel) objects available for this `Output`. The
channels are numbered 1 through 16.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
<!---->

* * *

<a name="Output+connection"></a>

## output.connection : <code>string</code>
Output port's connection state: `"pending"`, `"open"` or `"closed"`.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventCount"></a>

## output.eventCount : <code>number</code>
The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>eventCount</code>](#EventEmitter+eventCount)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventMap"></a>

## output.eventMap : <code>Object</code>
An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>eventMap</code>](#EventEmitter+eventMap)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventNames"></a>

## output.eventNames : <code>Array.&lt;string&gt;</code>
An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>eventNames</code>](#EventEmitter+eventNames)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventsSuspended"></a>

## output.eventsSuspended : <code>boolean</code>
Whether or not the execution of function callbacks is currently suspended for this whole
emitter

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>eventsSuspended</code>](#EventEmitter+eventsSuspended)  
<!---->

* * *

<a name="Output+id"></a>

## output.id : <code>string</code>
ID string of the MIDI output. The ID is host-specific. Do not expect the same ID on different
platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
the same port.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="Output+manufacturer"></a>

## output.manufacturer : <code>string</code>
Name of the manufacturer of the device that makes this output port available.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="Output+name"></a>

## output.name : <code>string</code>
Name of the MIDI output

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="Output+octaveOffset"></a>

## output.octaveOffset : <code>number</code>
An integer to offset the octave of outgoing notes. By default, middle C (MIDI note number 60)
is placed on the 4th octave (C4).

Note that this value is combined with the global offset value defined on the `WebMidi` object
(if any).

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="Output+state"></a>

## output.state : <code>string</code>
State of the output port: `"connected"` or `"disconnected"`.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="Output+type"></a>

## output.type : <code>string</code>
Type of the output port (`"output"`)

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+addListener"></a>

## output.addListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a listener for the specified event. It returns the [**Listener**](#Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>addListener</code>](#EventEmitter+addListener)  
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.remaining] | <code>boolean</code> | <code>Infinity</code> | The number of times after which the callback should automatically be removed. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+addOneTimeListener"></a>

## output.addOneTimeListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](#Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>addOneTimeListener</code>](#EventEmitter+addOneTimeListener)  
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The context to invoke the callback function in. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="Output+clear"></a>

## output.clear() ⇒ [<code>Output</code>](#Output)
Clears all messages that have been queued but not yet delivered.

Warning: this method has been defined in the specification but has not been implemented yet. As
soon as browsers implement it, it will work.

You can check out the current status of this feature for Chromium (Chrome) here:
https://bugs.chromium.org/p/chromium/issues/detail?id=471798

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

* * *

<a name="Output+close"></a>

## output.close() ⇒ <code>Promise.&lt;void&gt;</code>
Closes the output connection. When an output is closed, it cannot be used to send MIDI messages
until the output is opened again by calling [Output.open()](#Output+open). You can check
the connection status by looking at the [connection](#Output+connection) property.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
<!---->

* * *

<a name="Output+decrementRegisteredParameter"></a>

## output.decrementRegisteredParameter(parameter, [options]) ⇒ [<code>Output</code>](#Output)
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

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- TypeError The specified parameter is not available.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>String</code> \| <code>Array.&lt;number&gt;</code> |  | A string identifying the parameter"s name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+destroy"></a>

## output.destroy() ⇒ <code>Promise.&lt;void&gt;</code>
Destroys the `Output`. All listeners are removed, all channels are destroyed and the MIDI
subsystem is unlinked.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
<!---->

* * *

<a name="EventEmitter+emit"></a>

## output.emit(event, ...args) ⇒ <code>Array</code>
Executes the callback functions of all the `Listener` objects registered for a given event. The
callback functions are passed the additional arguments specifed for `emit()` (if any) followed
by the arguments present in the `arguments` property of the `Listener` object (if any). For
example:

```javascript
let myEmitter = new EventEmitter();
myEmitter.addListener("test", fn, {arguments: ["a", "b", "c"]});
myEmitter.emit("test", "y", "z");
```

In this example, the function will be called as such: `fn("y", "z", "a", "b", "c");`

If the `eventsSuspended` property of the `EventEmitter` or the `suspended` property of the
`Listener` is `true`, the callback functions will not be executed.

This function returns an array containing the return values of each of the callbacks.

It should be noted that the regular listeners are triggered first followed by the global
listeners (added with `EventEmitter.ANY_EVENT`).

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>emit</code>](#EventEmitter+emit)  
**Returns**: <code>Array</code> - An array containing the return value of each of the executed listener
functions  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string.

<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event |
| ...args | <code>\*</code> | Arbitrary number of arguments to pass along to the callback functions |


* * *

<a name="EventEmitter+getListenerCount"></a>

## output.getListenerCount(event) ⇒ <code>number</code>
Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>getListenerCount</code>](#EventEmitter+getListenerCount)  
**Returns**: <code>number</code> - The number of listeners registered for the specified event.  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event |


* * *

<a name="EventEmitter+getListeners"></a>

## output.getListeners(event) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>getListeners</code>](#EventEmitter+getListeners)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of `Listener` objects  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to get listeners for |


* * *

<a name="EventEmitter+hasListener"></a>

## output.hasListener([event], [callback]) ⇒ <code>boolean</code>
Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>hasListener</code>](#EventEmitter+hasListener)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [event] | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to check |
| [callback] | <code>function</code> \| [<code>Listener</code>](#Listener) | The actual function that was added to the event or the [Listener](#Listener) object returned by `addListener()`. |


* * *

<a name="Output+incrementRegisteredParameter"></a>

## output.incrementRegisteredParameter(parameter, [options]) ⇒ [<code>Output</code>](#Output)
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

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>String</code> \| <code>Array.&lt;number&gt;</code> |  | A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+open"></a>

## output.open() ⇒ [<code>Promise.&lt;Output&gt;</code>](#Output)
Opens the output for usage.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Promise.&lt;Output&gt;</code>](#Output) - The promise is fulfilled with the `Output`  
<!---->

* * *

<a name="Output+playNote"></a>

## output.playNote(note, [options]) ⇒ [<code>Output</code>](#Output)
Plays a note or an array of notes on one or more channels of this output. The first parameter
is the note to play. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [Note](#Note) object

The `playNote()` method sends a **note on** MIDI message for all specified notes on all
specified channels. If no channels are specified, it will send to all channels. If a `duration`
is set in the `options` parameter or in the [Note](#Note) object's
[duration](#Note+duration) property, it will also schedule a **note off** message to end
the note after said duration. If no `duration` is set, the note will simply play until a
matching **note off** message is sent with [stopNote()](#Output+stopNote) or
[sendNoteOff()](#Output+sendNoteOff).

The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](#Note) objects, the durations and velocities defined in the [Note](#Note)
objects have precedence over the ones specified via the method's `options` parameter.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  | The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](#Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to play the note on. The special value `"all"` can also be used to use all channels (default). |
| [options.duration] | <code>number</code> |  | The number of milliseconds (integer) after which a **note off** message will be scheduled. If left undefined, only a **note on** message is sent. |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | Controls whether the attack and release velocities are set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default). |
| [options.release] | <code>number</code> | <code>0.5</code> | The velocity at which to release the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set. |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The attack velocity to use when playing the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`. |


* * *

<a name="EventEmitter+removeListener"></a>

## output.removeListener([event], [callback], [options])
Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>removeListener</code>](#EventEmitter+removeListener)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [event] | <code>string</code> |  | The event name. |
| [callback] | [<code>callback</code>](#EventEmitter..callback) |  | Only remove the listeners that match this exact callback function. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>\*</code> |  | Only remove the listeners that have this exact context. |
| [options.remaining] | <code>number</code> |  | Only remove the listener if it has exactly that many remaining times to be executed. |


* * *

<a name="Output+resetAllControllers"></a>

## output.resetAllControllers([options]) ⇒ [<code>Output</code>](#Output)
Sends a **reset all controllers** channel mode message. This resets all controllers, such as
the pitch bend, to their default value.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+send"></a>

## output.send(message, [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
sent immediately. The message should be an array of 8 bit unsigned integers (0-225), a
[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
object or a `Message` object.

It is usually not necessary to use this method directly as you can use one of the simpler
helper methods such as [playNote()`, `stopNote()`, `sendControlChange()`, etc.

Details on the format of MIDI messages are available in the summary of
[MIDI messages](https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message)
from the MIDI Manufacturers Association.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The first byte (status) must be an integer between 128 and 255.

<!--**License**: Apache-2.0  
-->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>Array.&lt;number&gt;</code> \| <code>Uint8Array</code> \| [<code>Message</code>](#Message) |  | An array of 8bit unsigned integers, a `Uint8Array` object (not available in Node.js) containing the message bytes or a `Message` object. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([DOMHighResTimeStamp](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that point time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendActiveSensing"></a>

## output.sendActiveSensing([options]) ⇒ [<code>Output</code>](#Output)
Sends an **active sensing** real-time message. This tells the device connected to this port
that the connection is still good. Active sensing messages should be sent every 300 ms if there
was no other activity on the MIDI port.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendChannelMode"></a>

## output.sendChannelMode(command, [value], [options]) ⇒ [<code>Output</code>](#Output)
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

  - [turnSoundOff()](#OutputChannel+turnSoundOff)
  - [resetAllControllers()](#OutputChannel+resetAllControllers)
  - [setLocalControl()](#OutputChannel+turnSoundOff)
  - [turnNotesOff()](#OutputChannel+turnNotesOff)
  - [setOmniMode()](#OutputChannel+setOmniMode)
  - [setPolyphonicMode()](#OutputChannel+setPolyphonicMode)

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>TypeError</code> Invalid channel mode message name.
- <code>RangeError</code> Channel mode controller numbers must be between 120 and 127.
- <code>RangeError</code> Value must be an integer between 0 and 127.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>number</code> \| <code>string</code> |  | The numerical identifier of the channel mode message (integer between 120-127) or its name as a string. |
| [value] | <code>number</code> |  | The value to send (integer between 0-127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendClock"></a>

## output.sendClock([options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **clock* real-time message. According to the standard, there are 24 MIDI Clocks
for every quarter note.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendContinue"></a>

## output.sendContinue([options]) ⇒ [<code>Output</code>](#Output)
Sends a **continue** real-time message. This resumes song playback where it was previously
stopped or where it was last cued with a song position message. To start playback from the
start, use the [sendStart()](#Output+sendStart)` method.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendControlChange"></a>

## output.sendControlChange(controller, [value], [options]) ⇒ [<code>Output</code>](#Output)
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

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> Controller numbers must be between 0 and 127.
- <code>RangeError</code> Invalid controller name.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| controller | <code>number</code> \| <code>string</code> |  | The MIDI controller name or number (0-127). |
| [value] | <code>number</code> | <code>0</code> | The value to send (0-127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendNoteOff"></a>

## output.sendNoteOff(note, [options]) ⇒ [<code>Output</code>](#Output)
Sends a **note off** message for the specified notes on the specified channel(s). The first
parameter is the note. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [Note](#Note) object

 The execution of the **note off** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](#Note) objects, the release velocity defined in the [Note](#Note) objects has
precedence over the one specified via the method's `options` parameter.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  | The note(s) to stop. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](#Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | Controls whether the release velocity is set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |
| [options.release] | <code>number</code> | <code>0.5</code> | The velocity at which to release the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`. |


* * *

<a name="Output+sendNoteOn"></a>

## output.sendNoteOn(note, [options]) ⇒ [<code>Output</code>](#Output)
Sends a **note on** message for the specified notes on the specified channel(s). The first
parameter is the note. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [Note](#Note) object

 The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](#Note) objects, the attack velocity defined in the [Note](#Note) objects has
precedence over the one specified via the method's `options` parameter. Also, the `duration` is
ignored. If you want to also send a **note off** message, use the
[playNote()](#Output+playNote) method instead.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  | The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](#Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | Controls whether the attack velocity is set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The velocity at which to play the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`. |


* * *

<a name="Output+sendReset"></a>

## output.sendReset([options]) ⇒ [<code>Output</code>](#Output)
Sends a **reset** real-time message. This tells the device connected to this output that it
should reset itself to a default state.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendStart"></a>

## output.sendStart([options]) ⇒ [<code>Output</code>](#Output)
Sends a **start** real-time message. A MIDI Start message starts the playback of the current
song at beat 0. To start playback elsewhere in the song, use the
[sendContinue()](#Output+sendContinue) method.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendStop"></a>

## output.sendStop([options]) ⇒ [<code>Output</code>](#Output)
Sends a **stop** real-time message. This tells the device connected to this output to stop
playback immediately (or at the scheduled time).

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendSysex"></a>

## output.sendSysex(manufacturer, [data], [options]) ⇒ [<code>Output</code>](#Output)
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

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>DOMException</code> Failed to execute 'send' on 'MIDIOutput': System exclusive message is
not allowed.
- <code>TypeError</code> Failed to execute 'send' on 'MIDIOutput': The value at index x is greater
than 0xFF.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| manufacturer | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An unsigned integer or an array of three unsigned integers between 0 and 127 that identify the targeted manufacturer. The *MIDI Manufacturers Association* maintains a full list of [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers) . |
| [data] | <code>Array.&lt;number&gt;</code> \| <code>Uint8Array</code> | <code>[]</code> | A Uint8Array or an array of unsigned integers between 0 and 127. This is the data you wish to transfer. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendTimecodeQuarterFrame"></a>

## output.sendTimecodeQuarterFrame(value, [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **timecode quarter frame** message. Please note that no processing is being done
on the data. It is up to the developer to format the data according to the
[MIDI Timecode](https://en.wikipedia.org/wiki/MIDI_timecode) format.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The quarter frame message content (integer between 0 and 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendTuneRequest"></a>

## output.sendTuneRequest([options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **tune request** real-time message.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setChannelAftertouch"></a>

## output.setChannelAftertouch([pressure], [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **channel aftertouch** message to the specified channel(s). For key-specific
aftertouch, you should instead use [setKeyAftertouch()](#Output+setKeyAftertouch).

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [pressure] | <code>number</code> | <code>0.5</code> | The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127. |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setKeyAftertouch"></a>

## output.setKeyAftertouch(note, [pressure], [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **key aftertouch** message to the specified channel(s) at the scheduled time. This
is a key-specific aftertouch. For a channel-wide aftertouch message, use
[setChannelAftertouch()](#Output+setChannelAftertouch).

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| <code>Array</code> |  | The note for which you are sending an aftertouch value. The notes can be specified in one of two ways. The first way is by using the MIDI note number (an integer between 0 and 127). The second way is by using the note name followed by the octave (C3, G#4, F-1, Db7). The octave range should be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). It is also possible to use an array of note names and/or numbers. |
| [pressure] | <code>number</code> | <code>0.5</code> | The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127. |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setLocalControl"></a>

## output.setLocalControl([state], [options]) ⇒ [<code>Output</code>](#Output)
Turns local control on or off. Local control is usually enabled by default. If you disable it,
the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
its out port.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [state] | <code>boolean</code> | <code>false</code> | Whether to activate local control (`true`) or disable it (`false`). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setMasterTuning"></a>

## output.setMasterTuning([value], [options]) ⇒ [<code>Output</code>](#Output)
Sends a master tuning message to the specified channel(s). The value is decimal and must be
larger than -65 semitones and smaller than 64 semitones.

Because of the way the MIDI specification works, the decimal portion of the value will be
encoded with a resolution of 14bit. The integer portion must be between -64 and 63
inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
a **Master Fine Tuning** RPN messages.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The value must be a decimal number between larger than -65 and smaller
than 64.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>number</code> | <code>0.0</code> | The desired decimal adjustment value in semitones (-65 < x < 64) |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setModulationRange"></a>

## output.setModulationRange([semitones], [cents], [options]) ⇒ [<code>Output</code>](#Output)
Sends a **modulation depth range** message to the specified channel(s) so that they adjust the
depth of their modulation wheel's range. The range can be specified with the `semitones`
parameter, the `cents` parameter or by specifying both parameters at the same time.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The msb value must be between 0 and 127
- <code>RangeError</code> The lsb value must be between 0 and 127

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [semitones] | <code>number</code> | <code>0</code> | The desired adjustment value in semitones (integer between 0 and 127). |
| [cents] | <code>number</code> | <code>0</code> | The desired adjustment value in cents (integer between 0 and 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setNonRegisteredParameter"></a>

## output.setNonRegisteredParameter(parameter, [data], [options]) ⇒ [<code>Output</code>](#Output)
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

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The control value must be between 0 and 127.
- <code>RangeError</code> The msb value must be between 0 and 127

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>Array.&lt;number&gt;</code> |  | A two-position array specifying the two control bytes (0x63, 0x62) that identify the non-registered parameter. |
| [data] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | <code>[]</code> | An integer or an array of integers with a length of 1 or 2 specifying the desired data. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setOmniMode"></a>

## output.setOmniMode([state], [options]) ⇒ [<code>Output</code>](#Output)
Sets OMNI mode to `"on"` or `"off"` for the specified channel(s). MIDI's OMNI mode causes the
instrument to respond to messages from all channels.

It should be noted that support for OMNI mode is not as common as it used to be.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>TypeError</code> Invalid channel mode message name.
- <code>RangeError</code> Channel mode controller numbers must be between 120 and 127.
- <code>RangeError</code> Value must be an integer between 0 and 127.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [state] | <code>boolean</code> |  | Whether to activate OMNI mode (`true`) or not (`false`). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setPitchBend"></a>

## output.setPitchBend(value, [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **pitch bend** message to the specified channel(s) at the scheduled time.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | The intensity of the bend (between -1.0 and 1.0). A value of zero means no bend. The resulting bend is relative to the pitch bend range that has been defined. The range can be set with [setPitchBendRange()](#OutputChannel+setPitchBendRange) . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of -1 will bend the note 1 octave below its nominal value. If an invalid value is specified, the nearest valid value will be used instead. If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127 representing, respectively, the MSB (most significant byte) and the LSB (least significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64` bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents (1/100 of a semitone). An LSB of `64` also means no bend. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | A boolean indicating whether the value should be considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or an array of 2 integers if using both MSB and LSB). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setPitchBendRange"></a>

## output.setPitchBendRange(semitones, [cents], [options]) ⇒ [<code>Output</code>](#Output)
Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
adjust the range used by their pitch bend lever. The range is specified by using the
`semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
means that the pitch bend range will be 12 semitones above and below the nominal pitch.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The msb value must be between 0 and 127.
- <code>RangeError</code> The lsb value must be between 0 and 127.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| semitones | <code>number</code> |  | The desired adjustment value in semitones (between 0 and 127). While nothing imposes that in the specification, it is very common for manufacturers to limit the range to 2 octaves (-12 semitones to 12 semitones). |
| [cents] | <code>number</code> | <code>0</code> | The desired adjustment value in cents (integer between 0-127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setPolyphonicMode"></a>

## output.setPolyphonicMode(mode, [options]) ⇒ [<code>Output</code>](#Output)
Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
multiple notes are being played.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mode | <code>string</code> |  | The mode to use: `"mono"` or `"poly"`. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setProgram"></a>

## output.setProgram([program], [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **program change** message to the specified channel(s) at the scheduled time.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>TypeError</code> Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
than 0xFF.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [program] | <code>number</code> | <code>1</code> | The MIDI patch (program) number (1-128) |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setRegisteredParameter"></a>

## output.setRegisteredParameter(parameter, [data], [options]) ⇒ [<code>Output</code>](#Output)
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

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>string</code> \| <code>Array.&lt;number&gt;</code> |  | A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the registered parameter. |
| [data] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | <code>[]</code> | A single integer or an array of integers with a maximum length of 2 specifying the desired data. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setSong"></a>

## output.setSong(value, [options]) ⇒ [<code>Output</code>](#Output)
Sends a **song select** MIDI message.

**Note**: since version 3.0, the song number is an integer between 1 and 128. In versions 1.0
and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices that
use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- The song number must be between 1 and 128.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The number of the song to select (integer between 1 and 128). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setSongPosition"></a>

## output.setSongPosition([value], [options]) ⇒ [<code>Output</code>](#Output)
Sends a **ong position** MIDI message. The value is expressed in MIDI beats (between 0 and
16383) which are 16th note. Position 0 is always the start of the song.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>number</code> | <code>0</code> | The MIDI beat to cue to (integer between 0 and 16383). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setTuningBank"></a>

## output.setTuningBank(value, [options]) ⇒ [<code>Output</code>](#Output)
Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The bank value must be between 1 and 128.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The desired tuning bank (1-128). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setTuningProgram"></a>

## output.setTuningProgram(value, [options]) ⇒ [<code>Output</code>](#Output)
Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The program value must be between 1 and 128.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The desired tuning program (1-128). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+stopNote"></a>

## output.stopNote(note, options) ⇒ [<code>Output</code>](#Output)
This is an alias to the [sendNoteOff()](#Output+sendNoteOff) method.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**See**: [sendNoteOff](#Output+sendNoteOff)  
<!---->

| Param |
| --- |
| note | 
| options | 


* * *

<a name="EventEmitter+suspendEvent"></a>

## output.suspendEvent(event)
Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>suspendEvent</code>](#EventEmitter+suspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to suspend execution of all callback functions. |


* * *

<a name="Output+turnNotesOff"></a>

## output.turnNotesOff([options]) ⇒ [<code>Output</code>](#Output)
Sends an **all notes off** channel mode message. This will make all currently playing notes
fade out just as if their key had been released. This is different from the
[turnSoundOff()](#Output+turnSoundOff) method which mutes all sounds immediately.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+turnSoundOff"></a>

## output.turnSoundOff([options]) ⇒ [<code>Output</code>](#Output)
Sends an **all sound off** channel mode message. This will silence all sounds playing on that
channel but will not prevent new sounds from being triggered.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="EventEmitter+unsuspendEvent"></a>

## output.unsuspendEvent(event)
Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>unsuspendEvent</code>](#EventEmitter+unsuspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to resume execution of all callback functions. |


* * *

<a name="EventEmitter+waitFor"></a>

## output.waitFor(event, [options])
The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
when the specified event occurs. The event can be a regular event or `EventEmitter.ANY_EVENT`
(if you want to resolve as soon as any event is emitted).

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready").then(() => console.log("Ready!"));
```

```javascript
// async/await syntax
const ee = new EventEmitter();
await ee.waitFor("ready");
console.log("Ready!");
```

If the `duration` option is set, the promise will only be fulfilled if the event is emitted
within the specified duration. If the event has not been fulfilled after the specified
duration, the promise is rejected. This makes it super easy to wait for an event and timeout
after a certain time if the event is not triggered.

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready", {duration: 100})
.then(() => console.log("Ready!"))
.catch(err => console.log(err);
```

```javascript
// async/await syntax
const ee = new EventEmitter();
try {
 await ee.waitFor("ready", {duration: 100});
 console.log("Ready!");
} catch(err) {
  console.log(err);
}
```

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>waitFor</code>](#EventEmitter+waitFor)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to wait for |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds to wait before the promise is automatically rejected. |


* * *

<a name="Output+event_closed"></a>

## "closed"
Event emitted when the [Output](#Output) has been closed by calling the
[close()](#Output+close) method.

<!--**Kind**: event emitted by [<code>Output</code>](#Output)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"closed"` |
| target | [<code>Output</code>](#Output) | The object that triggered the event |


* * *

<a name="Output+event_disconnected"></a>

## "disconnected"
Event emitted when the [Output](#Output) becomes unavailable. This event is typically fired
when the MIDI device is unplugged.

<!--**Kind**: event emitted by [<code>Output</code>](#Output)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp0 when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"disconnected"` |
| target | <code>Object</code> | Object with properties describing the [Output](#Output) that triggered the event. This is not the actual `Output` as it is no longer available. |
| target.connection | <code>string</code> | `"closed"` |
| target.id | <code>string</code> | ID of the input |
| target.manufacturer | <code>string</code> | Manufacturer of the device that provided the input |
| target.name | <code>string</code> | Name of the device that provided the input |
| target.state | <code>string</code> | `"disconnected"` |
| target.type | <code>string</code> | `"output"` |


* * *

<a name="Output+event_opened"></a>

## "opened"
Event emitted when the [Output](#Output) has been opened by calling the
[open()](#Output+open) method.

<!--**Kind**: event emitted by [<code>Output</code>](#Output)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"opened"` |
| target | [<code>Output</code>](#Output) | The object that triggered the event |


* * *

