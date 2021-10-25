
# InputChannel

The `InputChannel` class represents a MIDI input channel (1-16) from a single input device. This
object is derived from the host's MIDI subsystem and cannot be instantiated directly.

All 16 `InputChannel` objects can be found inside the input's [channels](Input#channels)
property.

**Since**: 3.0.0

**Extends**: EventEmitter

**Fires**: [`midimessage`](InputChannel#event:midimessage), [`noteoff`](InputChannel#event:noteoff), [`noteon`](InputChannel#event:noteon), [`keyaftertouch`](InputChannel#event:keyaftertouch), [`controlchange`](InputChannel#event:controlchange), [`programchange`](InputChannel#event:programchange), [`channelaftertouch`](InputChannel#event:channelaftertouch), [`pitchbend`](InputChannel#event:pitchbend), [`allnotesoff`](InputChannel#event:allnotesoff), [`allsoundoff`](InputChannel#event:allsoundoff), [`localcontrol`](InputChannel#event:localcontrol), [`monomode`](InputChannel#event:monomode), [`omnimode`](InputChannel#event:omnimode), [`resetallcontrollers`](InputChannel#event:resetallcontrollers), [`dataentrycoarse`](InputChannel#nrpn~event:dataentrycoarse), [`dataentryfine`](InputChannel#nrpn~event:dataentryfine), [`databuttonincrement`](InputChannel#nrpn~event:databuttonincrement), [`databuttondecrement`](InputChannel#nrpn~event:databuttondecrement), [`dataentrycoarse`](InputChannel#rpn~event:dataentrycoarse), [`dataentryfine`](InputChannel#rpn~event:dataentryfine), [`databuttonincrement`](InputChannel#rpn~event:databuttonincrement), [`databuttondecrement`](InputChannel#rpn~event:databuttondecrement)

### `Constructor`


  **Parameters**

  > `new InputChannel(input, number)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`input`** | Input<br /> ||The `Input` object this channel belongs to|
    |**`number`** | number<br /> ||The MIDI channel's number (1-16)|

  </div>



***

## Properties

### `.EVENTS` {#EVENTS}


Array of channel-specific event names that can be listened to.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />
  **Attributes**: static


### `.eventCount` {#eventCount}


The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: number<br />
**Attributes**: read-only<br />


### `.eventMap` {#eventMap}


An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

**Type**: Object<br />
**Attributes**: read-only<br />


### `.eventNames` {#eventNames}


An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />


### `.eventsSuspended` {#eventsSuspended}


Whether or not the execution of function callbacks is currently suspended for this whole
emitter

**Type**: boolean<br />


### `.input` {#input}

**Since**: 3.0<br />

The [`Input`](Input) this channel belongs to

**Type**: Input<br />


### `.notesState` {#notesState}


Contains the current playing state of all MIDI notes of this channel (0-127). The state is
`true` for a currently playing note and `false` otherwise.

**Type**: Array.&lt;boolean&gt;<br />


### `.number` {#number}

**Since**: 3.0<br />

This channel's MIDI number (1-16)

**Type**: number<br />


### `.octaveOffset` {#octaveOffset}

**Since**: 3.0<br />

An integer to offset the reported octave of incoming note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
and with the value defined on the parent `Input` object.

**Type**: number<br />


### `.parameterNumberEventsEnabled` {#parameterNumberEventsEnabled}


Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
are composed of a sequence of specific **control change** messages. When a valid sequence of
such control change messages is received, an `nrpn` event will fire.

If an invalid or
out-of-order control change message is received, it will fall through the collector logic and
all buffered control change messages will be discarded as incomplete.

**Type**: boolean<br />



***

## Methods


### `.addListener(...)` {#addListener}


Adds a listener for the specified event. It returns the [**Listener**](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to listen to|
    |**`callback`** | EventEmitter~callback<br /> ||The callback function to execute when the event occurs.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |this|The value of `this` in the callback function.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] | boolean<br /> |Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**]{@link Listener#arguments} property of the [**Listener**]{@link Listener} object and can be retrieved or modified as desired.|

  </div>


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)` {#addOneTimeListener}


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to listen to|
    |**`callback`** | EventEmitter~callback<br /> ||The callback function to execute when the event occurs|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |this|The context to invoke the callback function in.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**]{@link Listener#arguments} property of the [**Listener**]{@link Listener} object and can be retrieved or modified as desired.|

  </div>


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.destroy()` {#destroy}


Destroys the `Input` by removing all listeners and severing the link with the MIDI subsystem's
input.






### `.emit(...)` {#emit}


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


  **Parameters**

  > Signature: `emit(event, ...args)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br /> ||The event|
    |**`args`** | *<br /> ||Arbitrary number of arguments to pass along to the callback functions|

  </div>


**Returns**: `Array`
> An array containing the return value of each of the executed listener
functions


**Throws**:
  * `TypeError` : The `event` parameter must be a string.


### `.getCcNameByNumber(...)` {#getCcNameByNumber}

**Since**: 2.0.0<br />

Returns the name of a control change message matching the specified number. Some valid control
change numbers do not have a specific name or purpose assigned in the MIDI
[spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
In this case, the method returns `false`.


  **Parameters**

  > Signature: `getCcNameByNumber(number)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** | number<br /> ||An integer representing the control change message|

  </div>


**Returns**: `string` or `undefined`
> The matching control change name or `undefined` if not match was
found.


**Throws**:
  * `RangeError` : Invalid control change number.


### `.getChannelModeByNumber(...)` {#getChannelModeByNumber}

**Since**: 2.0.0<br />

Returns the channel mode name matching the specified number. If no match is found, the function
returns `false`.


  **Parameters**

  > Signature: `getChannelModeByNumber(number)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** | number<br /> ||An integer representing the channel mode message.|

  </div>


**Returns**: `string` or `false`
> The name of the matching channel mode or `false` if not match could be
found.




### `.getListenerCount(...)` {#getListenerCount}


Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListenerCount(event)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event|

  </div>


**Returns**: `number`
> The number of listeners registered for the specified event.




### `.getListeners(...)` {#getListeners}


Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListeners(event)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to get listeners for|

  </div>


**Returns**: `Array.<Listener>`
> An array of `Listener` objects




### `.getNoteState(...)` {#getNoteState}

**Since**: version 3.0.0<br />

Return the playing status of the specified note. The `note` parameter can be an unsigned
integer (0-127), a note identifier (`"C4"`, `"G#5"`, etc.) or a [Note](Note) object.

If a note identifier or Note object is passed in, the method will take into account any
`octaveOffset` defined.


  **Parameters**

  > Signature: `getNoteState([input])`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`input`**] | number<br />string<br />Note<br /> |||

  </div>


**Returns**: `boolean`



### `.hasListener(...)` {#hasListener}


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] | string<br />EventEmitter.ANY_EVENT<br /> ||The event to check|
    |[**`callback`**] | function<br />Listener<br /> ||The actual function that was added to the event or the {@link Listener} object returned by `addListener()`.|

  </div>


**Returns**: `boolean`



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

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] | string<br /> ||The event name.|
    |[**`callback`**] | EventEmitter~callback<br /> ||Only remove the listeners that match this exact callback function.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | *<br /> ||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] | number<br /> ||Only remove the listener if it has exactly that many remaining times to be executed.|

  </div>






### `.suspendEvent(...)` {#suspendEvent}


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event for which to suspend execution of all callback functions.|

  </div>






### `.unsuspendEvent(...)` {#unsuspendEvent}


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event for which to resume execution of all callback functions.|

  </div>






### `.waitFor(...)` {#waitFor}

**Attributes**: async

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


  **Parameters**

  > Signature: `waitFor(event, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to wait for|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds to wait before the promise is automatically rejected.|

  </div>






***

## Events

### `"allnotesoff"` {#allnotesoff}

<a id="event:allnotesoff"></a>


Event emitted when an "all notes off" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"allnotesoff"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `"allsoundoff"` {#allsoundoff}

<a id="event:allsoundoff"></a>


Event emitted when an "all sound off" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"allsoundoff"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `"channelaftertouch"` {#channelaftertouch}

<a id="event:channelaftertouch"></a>


Event emitted when a control change MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"channelaftertouch"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `"controlchange"` {#controlchange}

<a id="event:controlchange"></a>


Event emitted when a **control change** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"controlchange"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `"keyaftertouch"` {#keyaftertouch}

<a id="event:keyaftertouch"></a>


Event emitted when a **key-specific aftertouch** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"keyaftertouch"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`identifier`** |string|The note identifier of the key to apply the aftertouch to. This includes any octave offset applied at the channel, input or global level.|
  |**`key`** |number|The MIDI note number of the key to apply the aftertouch to. This includes any octave offset applied at the channel, input or global level.|
  |**`rawKey`** |number|The MIDI note number of the key to apply the aftertouch to. This excludes any octave offset defined at the channel, input or global level.|
  |**`value`** |number|The aftertouch amount expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The aftertouch amount expressed as an integer (between 0 and 127).|


### `"localcontrol"` {#localcontrol}

<a id="event:localcontrol"></a>


Event emitted when a "local control" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (local control on) of `false` (local control
off).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"localcontrol"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |boolean|For local control on, the value is `true`. For local control off, the value is `false`.|


### `"midimessage"` {#midimessage}

<a id="event:midimessage"></a>


Event emitted when a MIDI message of any kind is received by an `InputChannel`



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `InputChannel` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"midimessage"`|
  |**`data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|
  |**`event.statusByte`** |number|The message's status byte  (deprecated, use the `message` object instead).|
  |**`event.dataBytes`** |Array.&lt;number&gt;|The message's data bytes as an array of 0, 1 or 2 integers. This will be null for `sysex` messages (deprecated, use the `message` object instead).|


### `"monomode"` {#monomode}

<a id="event:monomode"></a>


Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
poly mode on).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"monomode"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |boolean|The value is `true` for omni mode on and false for omni mode off.|


### `"noteoff"` {#noteoff}

<a id="event:noteoff"></a>


Event emitted when a **note off** MIDI message has been received on the channel.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"noteoff"`|
  |**`target`** |InputChannel|The object that triggered the event (the [`InputChannel`](InputChannel) object).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment ([`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`note`** |object|A [`Note`](Note) object containing information such as note name, octave and release velocity.|
  |**`value`** |number|The release velocity amount expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The release velocity amount expressed as an integer (between 0 and 127).|


### `"noteon"` {#noteon}

<a id="event:noteon"></a>


Event emitted when a **note on** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"noteon"`|
  |**`channel`** |InputChannel|The `InputChannel` object that triggered the event.|
  |**`data`** |Array|The MIDI message as an array of 8 bit values.|
  |**`input`** |InputChannel|The [`Input`](Input) object where through which the message was received.|
  |**`rawData`** |Uint8Array|The raw MIDI message as a `Uint8Array`.|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`note`** |Note|A [`Note`](Note) object containing information such as note name, octave and attack velocity.|
  |**`value`** |number|The attack velocity amount expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The attack velocity amount expressed as an integer (between 0 and 127).|


### `"omnimode"` {#omnimode}

<a id="event:omnimode"></a>


Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (omni mode on) of `false` (omni mode off).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"omnimode"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |boolean|The value is `true` for omni mode on and false for omni mode off.|


### `"pitchbend"` {#pitchbend}

<a id="event:pitchbend"></a>


Event emitted when a pitch bend MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"pitchbend"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 16383).|


### `"programchange"` {#programchange}

<a id="event:programchange"></a>


Event emitted when a **program change** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"programchange"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |number|The value expressed as an integer between 1 and 128.|
  |**`rawValue`** |number|The value expressed as an integer between 0 and 127..|


### `"resetallcontrollers"` {#resetallcontrollers}

<a id="event:resetallcontrollers"></a>


Event emitted when a "reset all controllers" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"resetallcontrollers"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|



