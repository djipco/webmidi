
# InputChannel

The `InputChannel` class represents a MIDI input channel (1-16) from a single input device. This
object is derived from the host's MIDI subsystem and cannot be instantiated directly.

All 16 `InputChannel` objects can be found inside the input's [channels](Input#channels)
property.

**Since**: 3.0.0

**Extends**: [`EventEmitter`](EventEmitter)
<!--**Extends**: EventEmitter-->

**Fires**: [`allnotesoff`](#event:allnotesoff), [`allsoundoff`](#event:allsoundoff), [`channelaftertouch`](#event:channelaftertouch), [`controlchange`](#event:controlchange), [`controlchange-0`](#event:controlchange-0), [`controlchange-1`](#event:controlchange-1), [`controlchange-10`](#event:controlchange-10), [`controlchange-100`](#event:controlchange-100), [`controlchange-101`](#event:controlchange-101), [`controlchange-102`](#event:controlchange-102), [`controlchange-103`](#event:controlchange-103), [`controlchange-104`](#event:controlchange-104), [`controlchange-105`](#event:controlchange-105), [`controlchange-106`](#event:controlchange-106), [`controlchange-107`](#event:controlchange-107), [`controlchange-108`](#event:controlchange-108), [`controlchange-109`](#event:controlchange-109), [`controlchange-11`](#event:controlchange-11), [`controlchange-110`](#event:controlchange-110), [`controlchange-111`](#event:controlchange-111), [`controlchange-112`](#event:controlchange-112), [`controlchange-113`](#event:controlchange-113), [`controlchange-114`](#event:controlchange-114), [`controlchange-115`](#event:controlchange-115), [`controlchange-116`](#event:controlchange-116), [`controlchange-117`](#event:controlchange-117), [`controlchange-118`](#event:controlchange-118), [`controlchange-119`](#event:controlchange-119), [`controlchange-12`](#event:controlchange-12), [`controlchange-120`](#event:controlchange-120), [`controlchange-121`](#event:controlchange-121), [`controlchange-122`](#event:controlchange-122), [`controlchange-123`](#event:controlchange-123), [`controlchange-124`](#event:controlchange-124), [`controlchange-125`](#event:controlchange-125), [`controlchange-126`](#event:controlchange-126), [`controlchange-127`](#event:controlchange-127), [`controlchange-13`](#event:controlchange-13), [`controlchange-14`](#event:controlchange-14), [`controlchange-15`](#event:controlchange-15), [`controlchange-16`](#event:controlchange-16), [`controlchange-17`](#event:controlchange-17), [`controlchange-18`](#event:controlchange-18), [`controlchange-19`](#event:controlchange-19), [`controlchange-2`](#event:controlchange-2), [`controlchange-20`](#event:controlchange-20), [`controlchange-21`](#event:controlchange-21), [`controlchange-22`](#event:controlchange-22), [`controlchange-23`](#event:controlchange-23), [`controlchange-24`](#event:controlchange-24), [`controlchange-25`](#event:controlchange-25), [`controlchange-26`](#event:controlchange-26), [`controlchange-27`](#event:controlchange-27), [`controlchange-28`](#event:controlchange-28), [`controlchange-29`](#event:controlchange-29), [`controlchange-3`](#event:controlchange-3), [`controlchange-30`](#event:controlchange-30), [`controlchange-31`](#event:controlchange-31), [`controlchange-32`](#event:controlchange-32), [`controlchange-33`](#event:controlchange-33), [`controlchange-34`](#event:controlchange-34), [`controlchange-35`](#event:controlchange-35), [`controlchange-36`](#event:controlchange-36), [`controlchange-37`](#event:controlchange-37), [`controlchange-38`](#event:controlchange-38), [`controlchange-39`](#event:controlchange-39), [`controlchange-4`](#event:controlchange-4), [`controlchange-40`](#event:controlchange-40), [`controlchange-41`](#event:controlchange-41), [`controlchange-42`](#event:controlchange-42), [`controlchange-43`](#event:controlchange-43), [`controlchange-44`](#event:controlchange-44), [`controlchange-45`](#event:controlchange-45), [`controlchange-46`](#event:controlchange-46), [`controlchange-47`](#event:controlchange-47), [`controlchange-48`](#event:controlchange-48), [`controlchange-49`](#event:controlchange-49), [`controlchange-5`](#event:controlchange-5), [`controlchange-50`](#event:controlchange-50), [`controlchange-51`](#event:controlchange-51), [`controlchange-52`](#event:controlchange-52), [`controlchange-53`](#event:controlchange-53), [`controlchange-54`](#event:controlchange-54), [`controlchange-55`](#event:controlchange-55), [`controlchange-56`](#event:controlchange-56), [`controlchange-57`](#event:controlchange-57), [`controlchange-58`](#event:controlchange-58), [`controlchange-59`](#event:controlchange-59), [`controlchange-6`](#event:controlchange-6), [`controlchange-60`](#event:controlchange-60), [`controlchange-61`](#event:controlchange-61), [`controlchange-62`](#event:controlchange-62), [`controlchange-63`](#event:controlchange-63), [`controlchange-64`](#event:controlchange-64), [`controlchange-65`](#event:controlchange-65), [`controlchange-66`](#event:controlchange-66), [`controlchange-67`](#event:controlchange-67), [`controlchange-68`](#event:controlchange-68), [`controlchange-69`](#event:controlchange-69), [`controlchange-7`](#event:controlchange-7), [`controlchange-70`](#event:controlchange-70), [`controlchange-71`](#event:controlchange-71), [`controlchange-72`](#event:controlchange-72), [`controlchange-73`](#event:controlchange-73), [`controlchange-74`](#event:controlchange-74), [`controlchange-75`](#event:controlchange-75), [`controlchange-76`](#event:controlchange-76), [`controlchange-77`](#event:controlchange-77), [`controlchange-78`](#event:controlchange-78), [`controlchange-79`](#event:controlchange-79), [`controlchange-8`](#event:controlchange-8), [`controlchange-80`](#event:controlchange-80), [`controlchange-81`](#event:controlchange-81), [`controlchange-82`](#event:controlchange-82), [`controlchange-83`](#event:controlchange-83), [`controlchange-84`](#event:controlchange-84), [`controlchange-85`](#event:controlchange-85), [`controlchange-86`](#event:controlchange-86), [`controlchange-87`](#event:controlchange-87), [`controlchange-88`](#event:controlchange-88), [`controlchange-89`](#event:controlchange-89), [`controlchange-9`](#event:controlchange-9), [`controlchange-90`](#event:controlchange-90), [`controlchange-91`](#event:controlchange-91), [`controlchange-92`](#event:controlchange-92), [`controlchange-93`](#event:controlchange-93), [`controlchange-94`](#event:controlchange-94), [`controlchange-95`](#event:controlchange-95), [`controlchange-96`](#event:controlchange-96), [`controlchange-97`](#event:controlchange-97), [`controlchange-98`](#event:controlchange-98), [`controlchange-99`](#event:controlchange-99), [`keyaftertouch`](#event:keyaftertouch), [`localcontrol`](#event:localcontrol), [`midimessage`](#event:midimessage), [`monomode`](#event:monomode), [`noteoff`](#event:noteoff), [`noteon`](#event:noteon), [`nrpn`](#event:nrpn), [`nrpn-databuttondecrement`](#event:nrpn-databuttondecrement), [`nrpn-databuttonincrement`](#event:nrpn-databuttonincrement), [`nrpn-dataentrycoarse`](#event:nrpn-dataentrycoarse), [`nrpn-dataentryfine`](#event:nrpn-dataentryfine), [`omnimode`](#event:omnimode), [`pitchbend`](#event:pitchbend), [`programchange`](#event:programchange), [`resetallcontrollers`](#event:resetallcontrollers), [`rpn`](#event:rpn), [`rpn-databuttondecrement`](#event:rpn-databuttondecrement), [`rpn-databuttonincrement`](#event:rpn-databuttonincrement), [`rpn-dataentrycoarse`](#event:rpn-dataentrycoarse), [`rpn-dataentryfine`](#event:rpn-dataentryfine)

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

### `"allnotesoff"` {#event-allnotesoff}

<a id="event:allnotesoff"></a>


Event emitted when an "all notes off" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"allnotesoff"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `"allsoundoff"` {#event-allsoundoff}

<a id="event:allsoundoff"></a>


Event emitted when an "all sound off" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"allsoundoff"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `"channelaftertouch"` {#event-channelaftertouch}

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


### `"controlchange"` {#event-controlchange}

<a id="event:controlchange"></a>


Event emitted when a **control change** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"controlchange"`|
  |**`subtype`** |string|The type of control change message that was received.|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `"keyaftertouch"` {#event-keyaftertouch}

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


### `"localcontrol"` {#event-localcontrol}

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


### `"midimessage"` {#event-midimessage}

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


### `"monomode"` {#event-monomode}

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


### `"noteoff"` {#event-noteoff}

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


### `"noteon"` {#event-noteon}

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


### `"nrpn"` {#event-nrpn}

<a id="event:nrpn"></a>


Event emitted when any NRPN message is received on the input. There are four types of NRPN
messages:

  * data entry coarse
  * data entry fine
  * data button increment
  * data button decrement

The parameter to which the message applies can be found in the event's `parameter` property.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"nrpn"`|
  |**`subtype`** |string|The precise type of NRPN message that was received.|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |number|The non-registered parameter number (0-16383)|
  |**`parameterMsb`** |number|The MSB portion of the non-registered parameter number (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the non-registered parameter number (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"nrpn-databuttondecrement"` {#event-nrpn-databuttondecrement}

<a id="event:nrpn-databuttondecrement"></a>


Event emitted when an **NRPN data button decrement** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`nrpn-databuttondecrement`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"nrpn-databuttonincrement"` {#event-nrpn-databuttonincrement}

<a id="event:nrpn-databuttonincrement"></a>


Event emitted when an **NRPN data button increment** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`nrpn-databuttonincrement`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"nrpn-dataentrycoarse"` {#event-nrpn-dataentrycoarse}

<a id="event:nrpn-dataentrycoarse"></a>


Event emitted when an **NRPN data entry coarse** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`nrpn-dataentrycoarse`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"nrpn-dataentryfine"` {#event-nrpn-dataentryfine}

<a id="event:nrpn-dataentryfine"></a>


Event emitted when an **NRPN data entry fine** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`nrpn-dataentryfine`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"omnimode"` {#event-omnimode}

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


### `"pitchbend"` {#event-pitchbend}

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


### `"programchange"` {#event-programchange}

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


### `"resetallcontrollers"` {#event-resetallcontrollers}

<a id="event:resetallcontrollers"></a>


Event emitted when a "reset all controllers" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"resetallcontrollers"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `"rpn"` {#event-rpn}

<a id="event:rpn"></a>


Event emitted when any RPN message is received on the input. There are four types of RPN
messages:

  * data entry coarse
  * data entry fine
  * data button increment
  * data button decrement

The parameter to which the message applies can be found in the event's `parameter` property.
It is one of the ones defined in
[`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"rpn"`|
  |**`subtype`** |string|The precise type of RPN message that was received.|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"rpn-databuttondecrement"` {#event-rpn-databuttondecrement}

<a id="event:rpn-databuttondecrement"></a>


Event emitted when an **RPN data button decrement** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`rpn-databuttondecrement`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"rpn-databuttonincrement"` {#event-rpn-databuttonincrement}

<a id="event:rpn-databuttonincrement"></a>


Event emitted when an **RPN data button increment** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`rpn-databuttonincrement`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"rpn-dataentrycoarse"` {#event-rpn-dataentrycoarse}

<a id="event:rpn-dataentrycoarse"></a>


Event emitted when an **RPN data entry coarse** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`rpn-dataentrycoarse`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"rpn-dataentryfine"` {#event-rpn-dataentryfine}

<a id="event:rpn-dataentryfine"></a>


Event emitted when an **RPN data entry fine** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`rpn-dataentryfine`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|



