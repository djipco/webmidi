<a name="InputChannel"></a>

# ABCInputChannel ⇐ [<code>EventEmitter</code>](#EventEmitter)
The `InputChannel` class represents a MIDI input channel (1-16) from a single input device. This
object is derived from the host's MIDI subsystem and cannot be instantiated directly.

All 16 `InputChannel` objects can be found inside the input's [channels](#Input+channels)
property.

<!--**Kind**: global class  
-->
**Extends**: [<code>EventEmitter</code>](#EventEmitter)  
**Emits**: [<code>midimessage</code>](#InputChannel+event_midimessage), [<code>noteoff</code>](#InputChannel+event_noteoff), [<code>noteon</code>](#InputChannel+event_noteon), [<code>keyaftertouch</code>](#InputChannel+event_keyaftertouch), [<code>controlchange</code>](#InputChannel+event_controlchange), [<code>programchange</code>](#InputChannel+event_programchange), [<code>channelaftertouch</code>](#InputChannel+event_channelaftertouch), [<code>pitchbend</code>](#InputChannel+event_pitchbend), [<code>allnotesoff</code>](#InputChannel+event_allnotesoff), [<code>allsoundoff</code>](#InputChannel+event_allsoundoff), [<code>localcontrol</code>](#InputChannel+event_localcontrol), [<code>monomode</code>](#InputChannel+event_monomode), [<code>omnimode</code>](#InputChannel+event_omnimode), [<code>resetallcontrollers</code>](#InputChannel+event_resetallcontrollers), [<code>nrpndataentrycoarse</code>](#InputChannel+event_nrpndataentrycoarse), [<code>nrpndataentryfine</code>](#InputChannel+event_nrpndataentryfine), [<code>nrpndatabuttonincrement</code>](#InputChannel+event_nrpndatabuttonincrement), [<code>nrpndatabuttondecrement</code>](#InputChannel+event_nrpndatabuttondecrement), [<code>rpndataentrycoarse</code>](#InputChannel+event_rpndataentrycoarse), [<code>rpndataentryfine</code>](#InputChannel+event_rpndataentryfine), [<code>rpndatabuttonincrement</code>](#InputChannel+event_rpndatabuttonincrement), [<code>rpndatabuttondecrement</code>](#InputChannel+event_rpndatabuttondecrement)  
**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->


* [InputChannel](#InputChannel) ⇐ [<code>EventEmitter</code>](#EventEmitter)

    * [new InputChannel(input, number)](#new_InputChannel_new)

    * _instance_

        * [.addListener(event, callback, [options])](#EventEmitter+addListener) ⇒ [<code>Listener</code>](#Listener)

        * [.addOneTimeListener(event, callback, [options])](#EventEmitter+addOneTimeListener) ⇒ [<code>Listener</code>](#Listener)

        * [.destroy()](#InputChannel+destroy)

        * [.emit(event, ...args)](#EventEmitter+emit) ⇒ <code>Array</code>

        * [.getCcNameByNumber(number)](#InputChannel+getCcNameByNumber) ⇒ <code>string</code> \| <code>undefined</code>

        * [.getChannelModeByNumber(number)](#InputChannel+getChannelModeByNumber) ⇒ <code>string</code> \| <code>false</code>

        * [.getListenerCount(event)](#EventEmitter+getListenerCount) ⇒ <code>number</code>

        * [.getListeners(event)](#EventEmitter+getListeners) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

        * [.hasListener([event], [callback])](#EventEmitter+hasListener) ⇒ <code>boolean</code>

        * [.removeListener([event], [callback], [options])](#EventEmitter+removeListener)

        * [.suspendEvent(event)](#EventEmitter+suspendEvent)

        * [.unsuspendEvent(event)](#EventEmitter+unsuspendEvent)

        * [.waitFor(event, [options])](#EventEmitter+waitFor)

    * _static_

        * [.EVENTS](#InputChannel.EVENTS) : <code>Array.&lt;string&gt;</code>

    * _instance_

        * [.eventCount](#EventEmitter+eventCount) : <code>number</code>

        * [.eventMap](#EventEmitter+eventMap) : <code>Object</code>

        * [.eventNames](#EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

        * [.eventsSuspended](#EventEmitter+eventsSuspended) : <code>boolean</code>

        * [.input](#InputChannel+input) : [<code>Input</code>](#Input)

        * [.number](#InputChannel+number) : <code>number</code>

        * [.octaveOffset](#InputChannel+octaveOffset) : <code>number</code>

        * [.parameterNumberEventsEnabled](#InputChannel+parameterNumberEventsEnabled) : <code>boolean</code>

        * ["allnotesoff"](#InputChannel+event_allnotesoff)

        * ["allsoundoff"](#InputChannel+event_allsoundoff)

        * ["channelaftertouch"](#InputChannel+event_channelaftertouch)

        * ["controlchange"](#InputChannel+event_controlchange)

        * ["keyaftertouch"](#InputChannel+event_keyaftertouch)

        * ["localcontrol"](#InputChannel+event_localcontrol)

        * ["midimessage"](#InputChannel+event_midimessage)

        * ["monomode"](#InputChannel+event_monomode)

        * ["noteoff"](#InputChannel+event_noteoff)

        * ["noteon"](#InputChannel+event_noteon)

        * ["nrpndatabuttondecrement"](#InputChannel+event_nrpndatabuttondecrement)

        * ["nrpndatabuttonincrement"](#InputChannel+event_nrpndatabuttonincrement)

        * ["nrpndataentrycoarse"](#InputChannel+event_nrpndataentrycoarse)

        * ["nrpndataentryfine"](#InputChannel+event_nrpndataentryfine)

        * ["omnimode"](#InputChannel+event_omnimode)

        * ["pitchbend"](#InputChannel+event_pitchbend)

        * ["programchange"](#InputChannel+event_programchange)

        * ["resetallcontrollers"](#InputChannel+event_resetallcontrollers)

        * ["rpndatabuttondecrement"](#InputChannel+event_rpndatabuttondecrement)

        * ["rpndatabuttonincrement"](#InputChannel+event_rpndatabuttonincrement)

        * ["rpndataentrycoarse"](#InputChannel+event_rpndataentrycoarse)

        * ["rpndataentryfine"](#InputChannel+event_rpndataentryfine)


* * *

<a name="new_InputChannel_new"></a>

## ABCnew InputChannel(input, number)
<!---->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| input | [<code>Input</code>](#Input) | The `Input` object this channel belongs to |
| number | <code>number</code> | The MIDI channel's number (1-16) |


* * *

<a name="EventEmitter+addListener"></a>

## ABCinputChannel.addListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a listener for the specified event. It returns the [**Listener**](#Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
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

## ABCinputChannel.addOneTimeListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](#Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
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

<a name="InputChannel+destroy"></a>

## ABCinputChannel.destroy()
Destroys the `Input` by removing all listeners and severing the link with the MIDI subsystem's
input.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
<!---->

* * *

<a name="EventEmitter+emit"></a>

## ABCinputChannel.emit(event, ...args) ⇒ <code>Array</code>
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

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
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

<a name="InputChannel+getCcNameByNumber"></a>

## ABCinputChannel.getCcNameByNumber(number) ⇒ <code>string</code> \| <code>undefined</code>
Returns the name of a control change message matching the specified number. Some valid control
change numbers do not have a specific name or purpose assigned in the MIDI
[spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
In this case, the method returns `false`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Returns**: <code>string</code> \| <code>undefined</code> - The matching control change name or `undefined` if not match was
found.  
**Throws**:

- <code>RangeError</code> Invalid control change number.

**Since**: 2.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | An integer representing the control change message |


* * *

<a name="InputChannel+getChannelModeByNumber"></a>

## ABCinputChannel.getChannelModeByNumber(number) ⇒ <code>string</code> \| <code>false</code>
Returns the channel mode name matching the specified number. If no match is found, the function
returns `false`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Returns**: <code>string</code> \| <code>false</code> - The name of the matching channel mode or `false` if not match could be
found.  
**Since**: 2.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | An integer representing the channel mode message. |


* * *

<a name="EventEmitter+getListenerCount"></a>

## ABCinputChannel.getListenerCount(event) ⇒ <code>number</code>
Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>getListenerCount</code>](#EventEmitter+getListenerCount)  
**Returns**: <code>number</code> - The number of listeners registered for the specified event.  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event |


* * *

<a name="EventEmitter+getListeners"></a>

## ABCinputChannel.getListeners(event) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>getListeners</code>](#EventEmitter+getListeners)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of `Listener` objects  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to get listeners for |


* * *

<a name="EventEmitter+hasListener"></a>

## ABCinputChannel.hasListener([event], [callback]) ⇒ <code>boolean</code>
Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>hasListener</code>](#EventEmitter+hasListener)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [event] | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to check |
| [callback] | <code>function</code> \| [<code>Listener</code>](#Listener) | The actual function that was added to the event or the [Listener](#Listener) object returned by `addListener()`. |


* * *

<a name="EventEmitter+removeListener"></a>

## ABCinputChannel.removeListener([event], [callback], [options])
Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
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

<a name="EventEmitter+suspendEvent"></a>

## ABCinputChannel.suspendEvent(event)
Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>suspendEvent</code>](#EventEmitter+suspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to suspend execution of all callback functions. |


* * *

<a name="EventEmitter+unsuspendEvent"></a>

## ABCinputChannel.unsuspendEvent(event)
Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>unsuspendEvent</code>](#EventEmitter+unsuspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to resume execution of all callback functions. |


* * *

<a name="EventEmitter+waitFor"></a>

## ABCinputChannel.waitFor(event, [options])
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

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>waitFor</code>](#EventEmitter+waitFor)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to wait for |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds to wait before the promise is automatically rejected. |


* * *

<a name="InputChannel.EVENTS"></a>

## ABCInputChannel.EVENTS : <code>Array.&lt;string&gt;</code>
Array of channel-specific event names that can be listened to.

<!--**Kind**: static property of [<code>InputChannel</code>](#InputChannel)  
-->
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventCount"></a>

## ABCinputChannel.eventCount : <code>number</code>
The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>eventCount</code>](#EventEmitter+eventCount)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventMap"></a>

## ABCinputChannel.eventMap : <code>Object</code>
An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>eventMap</code>](#EventEmitter+eventMap)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventNames"></a>

## ABCinputChannel.eventNames : <code>Array.&lt;string&gt;</code>
An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>eventNames</code>](#EventEmitter+eventNames)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventsSuspended"></a>

## ABCinputChannel.eventsSuspended : <code>boolean</code>
Whether or not the execution of function callbacks is currently suspended for this whole
emitter

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>eventsSuspended</code>](#EventEmitter+eventsSuspended)  
<!---->

* * *

<a name="InputChannel+input"></a>

## ABCinputChannel.input : [<code>Input</code>](#Input)
The [Input](#Input) this channel belongs to

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="InputChannel+number"></a>

## ABCinputChannel.number : <code>number</code>
This channel's MIDI number (1-16)

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="InputChannel+octaveOffset"></a>

## ABCinputChannel.octaveOffset : <code>number</code>
An integer to offset the reported octave of incoming note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
and with the value defined on the parent `Input` object.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="InputChannel+parameterNumberEventsEnabled"></a>

## ABCinputChannel.parameterNumberEventsEnabled : <code>boolean</code>
Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
are composed of a sequence of specific **control change** messages. When a valid sequence of
such control change messages is received, an `nrpn` event will fire.

If an invalid or
out-of-order control change message is received, it will fall through the collector logic and
all buffered control change messages will be discarded as incomplete.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
<!---->

* * *

<a name="InputChannel+event_allnotesoff"></a>

## ABC"allnotesoff"
Event emitted when an "all notes off" channel-mode MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"allnotesoff"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |


* * *

<a name="InputChannel+event_allsoundoff"></a>

## ABC"allsoundoff"
Event emitted when an "all sound off" channel-mode MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"allsoundoff"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |


* * *

<a name="InputChannel+event_channelaftertouch"></a>

## ABC"channelaftertouch"
Event emitted when a control change MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"channelaftertouch"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_controlchange"></a>

## ABC"controlchange"
Event emitted when a **control change** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"controlchange"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| controller | <code>Object</code> |  |
| controller.number | <code>Object</code> | The number of the controller. |
| controller.name | <code>Object</code> | The usual name or function of the controller. |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_keyaftertouch"></a>

## ABC"keyaftertouch"
Event emitted when a **key-specific aftertouch** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"keyaftertouch"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| identifier | <code>string</code> | The note identifier of the key to apply the aftertouch to. This includes any octave offset applied at the channel, input or global level. |
| key | <code>number</code> | The MIDI note number of the key to apply the aftertouch to. This includes any octave offset applied at the channel, input or global level. |
| rawKey | <code>number</code> | The MIDI note number of the key to apply the aftertouch to. This excludes any octave offset defined at the channel, input or global level. |
| value | <code>number</code> | The aftertouch amount expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The aftertouch amount expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_localcontrol"></a>

## ABC"localcontrol"
Event emitted when a "local control" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (local control on) of `false` (local control
off).

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"localcontrol"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>boolean</code> | For local control on, the value is `true`. For local control off, the value is `false`. |


* * *

<a name="InputChannel+event_midimessage"></a>

## ABC"midimessage"
Event emitted when a MIDI message of any kind is received by an `InputChannel`

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>Input</code>](#Input) | The `InputChannel` that triggered the event. |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"midimessage"` |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead). |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead). |
| event.statusByte | <code>number</code> | The message's status byte  (deprecated, use the `message` object instead). |
| event.dataBytes | <code>Array.&lt;number&gt;</code> | The message's data bytes as an array of 0, 1 or 2 integers. This will be null for `sysex` messages (deprecated, use the `message` object instead). |


* * *

<a name="InputChannel+event_monomode"></a>

## ABC"monomode"
Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
poly mode on).

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"monomode"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>boolean</code> | The value is `true` for omni mode on and false for omni mode off. |


* * *

<a name="InputChannel+event_noteoff"></a>

## ABC"noteoff"
Event emitted when a **note off** MIDI message has been received on the channel.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"noteoff"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| note | <code>Object</code> | A [Note](#Note) object containing information such as note name, octave and release velocity. |
| value | <code>number</code> | The release velocity amount expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The release velocity amount expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_noteon"></a>

## ABC"noteon"
Event emitted when a **note on** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"noteon"` |
| channel | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` object that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| input | [<code>InputChannel</code>](#InputChannel) | The `Input` object where through which the message was received. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a `Uint8Array`. |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| note | <code>Object</code> | A [Note](#Note) object containing information such as note name, octave and attack velocity. |
| value | <code>number</code> | The attack velocity amount expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The attack velocity amount expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_nrpndatabuttondecrement"></a>

## ABC"nrpndatabuttondecrement"
Event emitted when a 'databuttondecrement' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndatabuttondecrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_nrpndatabuttonincrement"></a>

## ABC"nrpndatabuttonincrement"
Event emitted when a 'databuttonincrement' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndatabuttonincrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_nrpndataentrycoarse"></a>

## ABC"nrpndataentrycoarse"
Event emitted when a 'dataentrycoarse' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndataentrycoarse"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_nrpndataentryfine"></a>

## ABC"nrpndataentryfine"
Event emitted when a 'dataentryfine' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndataentryfine"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_omnimode"></a>

## ABC"omnimode"
Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (omni mode on) of `false` (omni mode off).

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"omnimode"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>boolean</code> | The value is `true` for omni mode on and false for omni mode off. |


* * *

<a name="InputChannel+event_pitchbend"></a>

## ABC"pitchbend"
Event emitted when a pitch bend MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"pitchbend"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 16383). |


* * *

<a name="InputChannel+event_programchange"></a>

## ABC"programchange"
Event emitted when a **program change** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"programchange"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>number</code> | The value expressed as an integer between 1 and 128. |
| rawValue | <code>number</code> | The value expressed as an integer between 0 and 127.. |


* * *

<a name="InputChannel+event_resetallcontrollers"></a>

## ABC"resetallcontrollers"
Event emitted when a "reset all controllers" channel-mode MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"resetallcontrollers"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |


* * *

<a name="InputChannel+event_rpndatabuttondecrement"></a>

## ABC"rpndatabuttondecrement"
Event emitted when a 'databuttondecrement' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndatabuttondecrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndatabuttonincrement"></a>

## ABC"rpndatabuttonincrement"
Event emitted when a 'databuttonincrement' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndatabuttonincrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndataentrycoarse"></a>

## ABC"rpndataentrycoarse"
Event emitted when a 'dataentrycoarse' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndataentrycoarse"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndataentryfine"></a>

## ABC"rpndataentryfine"
Event emitted when a 'dataentryfine' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndataentryfine"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

