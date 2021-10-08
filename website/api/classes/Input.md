<a name="Input"></a>

# Input ⇐ [<code>EventEmitter</code>](#EventEmitter)
The `Input` class represents a single MIDI input port. This object is derived from the host's
MIDI subsystem and cannot be instantiated directly.

You can find a list of all currently available `Input` objects in the [inputs](#WebMidi+inputs)
array.

The `Input` class extends the
[EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
[djipevents](https://djipco.github.io/djipevents/index.html) module. This means
it also includes methods such as
[getListeners()](https://djipco.github.io/djipevents/EventEmitter.html#getListeners),
[emit()](https://djipco.github.io/djipevents/EventEmitter.html#emit),
[suspendEvent()](https://djipco.github.io/djipevents/EventEmitter.html#suspendEvent) and several
others.

<!--**Kind**: global class  
-->
**Extends**: [<code>EventEmitter</code>](#EventEmitter)  
**Emits**: [<code>opened</code>](#Input+event_opened), [<code>disconnected</code>](#Input+event_disconnected), [<code>closed</code>](#Input+event_closed), [<code>midimessage</code>](#Input+event_midimessage), <code>Input#event:sysex</code>, <code>Input#event:timecode</code>, <code>Input#event:songposition</code>, <code>Input#event:songselect</code>, <code>Input#event:tunerequest</code>, <code>Input#event:clock</code>, <code>Input#event:start</code>, <code>Input#event:continue</code>, <code>Input#event:stop</code>, <code>Input#event:activesensing</code>, <code>Input#event:reset</code>, [<code>midimessage</code>](#Input+event_midimessage), <code>Input#event:unknownmidimessage</code>  
<!--**License**: Apache-2.0  
-->


* [Input](#Input) ⇐ [<code>EventEmitter</code>](#EventEmitter)

    * [new Input(midiInput)](#new_Input_new)

    * [.addListener(event, listener, [options])](#Input+addListener) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

    * [.addOneTimeListener(event, listener, [options])](#Input+addOneTimeListener) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

    * [.close()](#Input+close) ⇒ [<code>Promise.&lt;Input&gt;</code>](#Input)

    * [.destroy()](#Input+destroy) ⇒ <code>Promise.&lt;void&gt;</code>

    * [.emit(event, ...args)](#EventEmitter+emit) ⇒ <code>Array</code>

    * [.getListenerCount(event)](#EventEmitter+getListenerCount) ⇒ <code>number</code>

    * [.getListeners(event)](#EventEmitter+getListeners) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

    * [.hasListener(event, listener, [options])](#Input+hasListener) ⇒ <code>Boolean</code>

    * [.open()](#Input+open) ⇒ [<code>Promise.&lt;Input&gt;</code>](#Input)

    * [.removeListener([type], [listener], [options])](#Input+removeListener)

    * [.suspendEvent(event)](#EventEmitter+suspendEvent)

    * [.unsuspendEvent(event)](#EventEmitter+unsuspendEvent)

    * [.waitFor(event, [options])](#EventEmitter+waitFor)

    * [.channels](#Input+channels) : [<code>Array.&lt;InputChannel&gt;</code>](#InputChannel)

    * [.connection](#Input+connection) : <code>string</code>

    * [.eventCount](#EventEmitter+eventCount) : <code>number</code>

    * [.eventMap](#EventEmitter+eventMap) : <code>Object</code>

    * [.eventNames](#EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

    * [.eventsSuspended](#EventEmitter+eventsSuspended) : <code>boolean</code>

    * [.id](#Input+id) : <code>string</code>

    * [.manufacturer](#Input+manufacturer) : <code>string</code>

    * [.name](#Input+name) : <code>string</code>

    * [.octaveOffset](#Input+octaveOffset) : <code>number</code>

    * [.state](#Input+state) : <code>string</code>

    * [.type](#Input+type) : <code>string</code>

    * ["closed"](#Input+event_closed)

    * ["disconnected"](#Input+event_disconnected)

    * ["midimessage"](#Input+event_midimessage)

    * ["opened"](#Input+event_opened)


* * *

<a name="new_Input_new"></a>

## new Input(midiInput)
<!---->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| midiInput | <code>MIDIInput</code> | `MIDIInput` object as provided by the MIDI subsystem (Web MIDI API). |


* * *

<a name="Input+addListener"></a>

## input.addListener(event, listener, [options]) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Adds an event listener that will trigger a function callback when the specified event happens.
The event can be **channel-bound** or **input-wide**. Channel-bound events are dispatched by
[InputChannel](#InputChannel) objects and are tied to a specific MIDI channel while input-wide events
are dispatched by the [Input](#Input) object itself and are not tied to a specific channel.

When listening for an input-wide event, you must specify the event to listen for and the
callback function to trigger when the event happens:

```
WebMidi.inputs[0].addListener("midimessage", someFunction);
```

To listen for a channel-bound event, you must also specify the event to listen for and the
function to trigger but you have to add the channels you wish to listen on in the `options`
parameter:

```
WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
```

The code above will add a listener for the `"noteon"` event and call `someFunction` when the
event is triggered on MIDI channels `1`, `2` or `3`.

Note that, when adding events to channels, it is the [InputChannel](#InputChannel) instance that
actually gets a listener added and not the `[Input](#Input) instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the [InputChannel](#InputChannel) object itself.

There are 6 families of events you can listen to:

1. **MIDI System Common** Events (input-wide)

   * [songposition](Input#event:songposition)
   * [songselect](Input#event:songselect)
   * [sysex](Input#event:sysex)
   * [timecode](Input#event:timecode)
   * [tunerequest](Input#event:tunerequest)

2. **MIDI System Real-Time** Events (input-wide)

   * [clock](Input#event:clock)
   * [start](Input#event:start)
   * [continue](Input#event:continue)
   * [stop](Input#event:stop)
   * [activesensing](Input#event:activesensing)
   * [reset](Input#event:reset)

3. **State Change** Events (input-wide)

   * [opened](#Input+event_opened)
   * [closed](#Input+event_closed)
   * [disconnected](#Input+event_disconnected)

4. **Catch-All** Events (input-wide)

   * [midimessage](#Input+event_midimessage)
   * [unknownmidimessage](Input#event:unknownmidimessage)

5. **Channel Voice** Events (channel-specific)

   * [channelaftertouch](#InputChannel+event_channelaftertouch)
   * [controlchange](#InputChannel+event_controlchange)
   * [keyaftertouch](#InputChannel+event_keyaftertouch)
   * [noteoff](#InputChannel+event_noteoff)
   * [noteon](#InputChannel+event_noteon)
   * [nrpn](InputChannel#event:nrpn)
   * [pitchbend](#InputChannel+event_pitchbend)
   * [programchange](#InputChannel+event_programchange)

6. **Channel Mode** Events (channel-specific)

   * allnotesoff
   * allsoundoff
   * localcontrol
   * monomode
   * omnimode
   * resetallcontrollers

7. **NRPN** Events (channel-specific)

   * nrpndataentrycoarse
   * nrpndataentryfine
   * nrpndatabuttonincrement
   * nrpndatabuttondecrement

8. **RPN** Events (channel-specific)

   * rpndataentrycoarse
   * rpndataentryfine
   * rpndatabuttonincrement
   * rpndatabuttondecrement

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>addListener</code>](#EventEmitter+addListener)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of all `Listener` objects that were created.  
**Throws**:

- <code>Error</code> For channel-specific events, 'options.channels' must be defined.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The type of the event. |
| listener | <code>function</code> |  | A callback function to execute when the specified event is detected. This function will receive an event parameter object. For details on this object's properties, check out the documentation for the various events (links above). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the `arguments` property of the `Listener` object and can be retrieved or modified as desired. |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to listen on. This parameter is ignored for input-wide events. |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array. |
| [options.remaining] | <code>boolean</code> | <code>Infinity</code> | The number of times after which the callback should automatically be removed. |


* * *

<a name="Input+addOneTimeListener"></a>

## input.addOneTimeListener(event, listener, [options]) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Adds a one-time event listener that will trigger a function callback when the specified event
happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
dispatched by [InputChannel](#InputChannel) objects and are tied to a specific MIDI channel while
input-wide events are dispatched by the [Input](#Input) object itself and are not tied to a
specific channel.

When listening for an input-wide event, you must specify the event to listen for and the
callback function to trigger when the event happens:

```
WebMidi.inputs[0].addListener("midimessage", someFunction);
```

To listen for a channel-bound event, you must also specify the event to listen for and the
function to trigger but you have to add the channels you wish to listen on in the `options`
parameter:

```
WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
```

The code above will add a listener for the `"noteon"` event and call `someFunction` when the
event is triggered on MIDI channels `1`, `2` or `3`.

Note that, when adding events to channels, it is the [InputChannel](#InputChannel) instance that
actually gets a listener added and not the `[Input](#Input) instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the [InputChannel](#InputChannel) object itself.

There are 6 families of events you can listen to:

1. **MIDI System Common** Events (input-wide)

   * [songposition](Input#event:songposition)
   * [songselect](Input#event:songselect)
   * [sysex](Input#event:sysex)
   * [timecode](Input#event:timecode)
   * [tunerequest](Input#event:tunerequest)

2. **MIDI System Real-Time** Events (input-wide)

   * [clock](Input#event:clock)
   * [start](Input#event:start)
   * [continue](Input#event:continue)
   * [stop](Input#event:stop)
   * [activesensing](Input#event:activesensing)
   * [reset](Input#event:reset)

3. **State Change** Events (input-wide)

   * [opened](#Input+event_opened)
   * [closed](#Input+event_closed)
   * [disconnected](#Input+event_disconnected)

4. **Catch-All** Events (input-wide)

   * [midimessage](#Input+event_midimessage)
   * [unknownmidimessage](Input#event:unknownmidimessage)

5. **Channel Voice** Events (channel-specific)

   * [channelaftertouch](#InputChannel+event_channelaftertouch)
   * [controlchange](#InputChannel+event_controlchange)
   * [keyaftertouch](#InputChannel+event_keyaftertouch)
   * [noteoff](#InputChannel+event_noteoff)
   * [noteon](#InputChannel+event_noteon)
   * [nrpn](InputChannel#event:nrpn)
   * [pitchbend](#InputChannel+event_pitchbend)
   * [programchange](#InputChannel+event_programchange)

6. **Channel Mode** Events (channel-specific)

   * allnotesoff
   * allsoundoff
   * localcontrol
   * monomode
   * omnimode
   * resetallcontrollers

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>addOneTimeListener</code>](#EventEmitter+addOneTimeListener)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of all `Listener` objects that were created.  
**Throws**:

- <code>Error</code> For channel-specific events, 'options.channels' must be defined.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The type of the event. |
| listener | <code>function</code> |  | A callback function to execute when the specified event is detected. This function will receive an event parameter object. For details on this object's properties, check out the documentation for the various events (links above). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the `arguments` property of the `Listener` object and can be retrieved or modified as desired. |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to listen on. This parameter is ignored for input-wide events. |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array. |


* * *

<a name="Input+close"></a>

## input.close() ⇒ [<code>Promise.&lt;Input&gt;</code>](#Input)
Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
the input is opened again by calling [Input.open()](#Input+open).

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Returns**: [<code>Promise.&lt;Input&gt;</code>](#Input) - The promise is fulfilled with the `Input` object  
<!---->

* * *

<a name="Input+destroy"></a>

## input.destroy() ⇒ <code>Promise.&lt;void&gt;</code>
Destroys the `Input` by remove all listeners, emptying the `channels` array and unlinking the
MIDI subsystem.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
<!---->

* * *

<a name="EventEmitter+emit"></a>

## input.emit(event, ...args) ⇒ <code>Array</code>
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

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
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

## input.getListenerCount(event) ⇒ <code>number</code>
Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>getListenerCount</code>](#EventEmitter+getListenerCount)  
**Returns**: <code>number</code> - The number of listeners registered for the specified event.  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event |


* * *

<a name="EventEmitter+getListeners"></a>

## input.getListeners(event) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>getListeners</code>](#EventEmitter+getListeners)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of `Listener` objects  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to get listeners for |


* * *

<a name="Input+hasListener"></a>

## input.hasListener(event, listener, [options]) ⇒ <code>Boolean</code>
Checks if the specified event type is already defined to trigger the listener function. For
channel-specific events, the function will return `true` only if all channels have the listener
defined.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>hasListener</code>](#EventEmitter+hasListener)  
**Returns**: <code>Boolean</code> - Boolean value indicating whether or not the channel(s) already have this
listener defined.  
**Throws**:

- Error For channel-specific events, 'options.channels' must be defined.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The type of the event. |
| listener | <code>function</code> |  | The callback function to check for. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to check. This parameter is ignored for input-wide events. |


* * *

<a name="Input+open"></a>

## input.open() ⇒ [<code>Promise.&lt;Input&gt;</code>](#Input)
Opens the input for usage. This is usually unnecessary as the port is open automatically when
WebMidi is enabled.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Returns**: [<code>Promise.&lt;Input&gt;</code>](#Input) - The promise is fulfilled with the `Input` object  
<!---->

* * *

<a name="Input+removeListener"></a>

## input.removeListener([type], [listener], [options])
Removes the specified listener for the specified event. If no listener is specified, all
listeners for the specified event will be removed. If no event is specified, all listeners for
the `Input` as well as all listeners for all `InputChannels` will be removed.

By default, channel-specific listeners will be removed from all channels unless the
`options.channel` narrows it down.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>removeListener</code>](#EventEmitter+removeListener)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>String</code> |  | The type of the event. |
| [listener] | <code>function</code> |  | The callback function to check for. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to match. This parameter is ignored for input-wide events. |
| [options.context] | <code>\*</code> |  | Only remove the listeners that have this exact context. |
| [options.remaining] | <code>number</code> |  | Only remove the listener if it has exactly that many remaining times to be executed. |


* * *

<a name="EventEmitter+suspendEvent"></a>

## input.suspendEvent(event)
Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>suspendEvent</code>](#EventEmitter+suspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to suspend execution of all callback functions. |


* * *

<a name="EventEmitter+unsuspendEvent"></a>

## input.unsuspendEvent(event)
Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>unsuspendEvent</code>](#EventEmitter+unsuspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to resume execution of all callback functions. |


* * *

<a name="EventEmitter+waitFor"></a>

## input.waitFor(event, [options])
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

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>waitFor</code>](#EventEmitter+waitFor)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to wait for |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds to wait before the promise is automatically rejected. |


* * *

<a name="Input+channels"></a>

## input.channels : [<code>Array.&lt;InputChannel&gt;</code>](#InputChannel)
Array containing the 16 [InputChannel](#InputChannel) objects available for this `Input`. The
channels are numbered 1 through 16.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
<!---->

* * *

<a name="Input+connection"></a>

## input.connection : <code>string</code>
Input port's connection state: `"pending"`, `"open"` or `"closed"`.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventCount"></a>

## input.eventCount : <code>number</code>
The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>eventCount</code>](#EventEmitter+eventCount)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventMap"></a>

## input.eventMap : <code>Object</code>
An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>eventMap</code>](#EventEmitter+eventMap)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventNames"></a>

## input.eventNames : <code>Array.&lt;string&gt;</code>
An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>eventNames</code>](#EventEmitter+eventNames)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventsSuspended"></a>

## input.eventsSuspended : <code>boolean</code>
Whether or not the execution of function callbacks is currently suspended for this whole
emitter

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>eventsSuspended</code>](#EventEmitter+eventsSuspended)  
<!---->

* * *

<a name="Input+id"></a>

## input.id : <code>string</code>
ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
the same port.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input+manufacturer"></a>

## input.manufacturer : <code>string</code>
Name of the manufacturer of the device that makes this input port available.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input+name"></a>

## input.name : <code>string</code>
Name of the MIDI input

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input+octaveOffset"></a>

## input.octaveOffset : <code>number</code>
An integer to offset the reported octave of incoming notes. By default, middle C (MIDI note
number 60) is placed on the 4th octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
(if any).

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="Input+state"></a>

## input.state : <code>string</code>
State of the input port: `"connected"` or `"disconnected"`.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input+type"></a>

## input.type : <code>string</code>
Port type. In the case of `Input`, this is always: `"input"`.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input+event_closed"></a>

## "closed"
Event emitted when the [Input](#Input) has been closed by calling the [close](#Input+close)
method.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"closed"` |
| target | [<code>Input</code>](#Input) | The object that triggered the event |


* * *

<a name="Input+event_disconnected"></a>

## "disconnected"
Event emitted when the [Input](#Input) becomes unavailable. This event is typically fired
when the MIDI device is unplugged.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"disconnected"` |
| target | <code>Object</code> | Object with properties describing the [Input](#Input) that triggered the event. This is not the actual `Input` as it is no longer available. |
| target.connection | <code>string</code> | `"closed"` |
| target.id | <code>string</code> | ID of the input |
| target.manufacturer | <code>string</code> | Manufacturer of the device that provided the input |
| target.name | <code>string</code> | Name of the device that provided the input |
| target.state | <code>string</code> | `"disconnected"` |
| target.type | <code>string</code> | `"input"` |


* * *

<a name="Input+event_midimessage"></a>

## "midimessage"
Event emitted when any MIDI message is received on an `Input`

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Since**: 2.1  
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>Input</code>](#Input) | The `Input` that triggered the event. |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"midimessage"` |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead). |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array (deprecated, use the `message` object instead). |
| event.statusByte | <code>number</code> | The message's status byte  (deprecated, use the `message` object instead). |
| event.dataBytes | <code>Array.&lt;number&gt;</code> | The message's data bytes as an array of 0, 1 or 2 integers. This will be null for `sysex` messages (deprecated, use the `message` object instead). |


* * *

<a name="Input+event_opened"></a>

## "opened"
Event emitted when the [Input](#Input) has been opened by calling the [open](#Input+open)
method.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"opened"` |
| target | [<code>Input</code>](#Input) | The object that triggered the event |


* * *

