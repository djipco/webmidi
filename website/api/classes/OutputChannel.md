
# Enumerations

The `Enumerations` class contains enumerations of elements used throughout the library. All
enumerations are static and should be referenced using the class name. For example:
`Enumerations.MIDI_CHANNEL_MESSAGES`.

**Since**: 3.0.0



### `new EventEmitter(...)`


  **Parameters**

  > `new EventEmitter([eventsSuspended])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`eventsSuspended`**] |boolean|false|Whether the `EventEmitter` is initially in a suspended state (i.e. not executing callbacks).|



***

## Properties

### `.ANY_EVENT`


Identifier to use when trying to add or remove a listener that should be triggered when any
events occur.

**Type**: Symbol<br />
  **Attributes**: static


### `.eventCount`


The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: number<br />
**Attributes**: read-only<br />


### `.eventMap`


An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

**Type**: Object<br />
**Attributes**: read-only<br />


### `.eventNames`


An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />


### `.eventsSuspended`


Whether or not the execution of function callbacks is currently suspended for this whole
emitter

**Type**: boolean<br />


### `.channels`


Array containing the 16 [`InputChannel`](InputChannel) objects available for this `Input`. The
channels are numbered 1 through 16.

**Type**: Array.&lt;InputChannel&gt;<br />


### `.connection`


Input port's connection state: `"pending"`, `"open"` or `"closed"`.

**Type**: string<br />
**Attributes**: read-only<br />


### `.eventCount`


The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: number<br />
**Attributes**: read-only<br />


### `.eventMap`


An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

**Type**: Object<br />
**Attributes**: read-only<br />


### `.eventNames`


An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />


### `.eventsSuspended`


Whether or not the execution of function callbacks is currently suspended for this whole
emitter

**Type**: boolean<br />


### `.id`


ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
the same port.

**Type**: string<br />
**Attributes**: read-only<br />


### `.manufacturer`


Name of the manufacturer of the device that makes this input port available.

**Type**: string<br />
**Attributes**: read-only<br />


### `.name`


Name of the MIDI input

**Type**: string<br />
**Attributes**: read-only<br />


### `.octaveOffset`

**Since**: 3.0<br />

An integer to offset the reported octave of incoming notes. By default, middle C (MIDI note
number 60) is placed on the 4th octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
(if any).

**Type**: number<br />


### `.state`


State of the input port: `"connected"` or `"disconnected"`.

**Type**: string<br />
**Attributes**: read-only<br />


### `.type`


Port type. In the case of `Input`, this is always: `"input"`.

**Type**: string<br />
**Attributes**: read-only<br />


### `.EVENTS`


Array of channel-specific event names that can be listened to.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />
  **Attributes**: static


### `.eventCount`


The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: number<br />
**Attributes**: read-only<br />


### `.eventMap`


An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

**Type**: Object<br />
**Attributes**: read-only<br />


### `.eventNames`


An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />


### `.eventsSuspended`


Whether or not the execution of function callbacks is currently suspended for this whole
emitter

**Type**: boolean<br />


### `.input`

**Since**: 3.0<br />

The [`Input`](Input) this channel belongs to

**Type**: Input<br />


### `.number`

**Since**: 3.0<br />

This channel's MIDI number (1-16)

**Type**: number<br />


### `.octaveOffset`

**Since**: 3.0<br />

An integer to offset the reported octave of incoming note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
and with the value defined on the parent `Input` object.

**Type**: number<br />


### `.parameterNumberEventsEnabled`


Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
are composed of a sequence of specific **control change** messages. When a valid sequence of
such control change messages is received, an `nrpn` event will fire.

If an invalid or
out-of-order control change message is received, it will fall through the collector logic and
all buffered control change messages will be discarded as incomplete.

**Type**: boolean<br />


### `.arguments`


Arguments to pass separately to the callback function upon execution

**Type**: array<br />


### `.callback`


The callback function

**Type**: function<br />


### `.context`


The context to execute the context function in (a.k.a. the value of `this` inside the
callback function)

**Type**: Object<br />


### `.count`


The number of times the listener function was executed

**Type**: number<br />


### `.event`


The event name

**Type**: string<br />


### `.remaining`


The remaining number of times after which the callback should automatically be removed.

**Type**: number<br />


### `.suspended`


Whether this listener is currently suspended

**Type**: boolean<br />


### `.target`


The object that the event is attached to (or that emitted the event)

**Type**: EventEmitter<br />


### `.channel`


The MIDI channel number (1-16) that the message is targeting. This is only for
channel-specific messages. For system messages, this will be left undefined.

**Type**: number<br />
**Attributes**: read-only<br />


### `.command`


An integer identifying the MIDI command. For channel-specific messages, the value will be
between 8 and 14. For system messages, the value will be between 240 and 255.

**Type**: number<br />
**Attributes**: read-only<br />


### `.data`


An array containing the bytes of the MIDI message. Each byte is an integer is between 0 and
255.

**Type**: Array.&lt;number&gt;<br />
**Attributes**: read-only<br />


### `.dataBytes`


An array of the the data byte(s) of the MIDI message. When the message is a system exclusive
message (sysex), `dataBytes` explicitly excludes the manufacturer ID and the sysex end
byte so only the actual data is included.

**Type**: Array.&lt;number&gt;<br />
**Attributes**: read-only<br />


### `.isChannelMessage`


A boolean indicating whether the MIDI message is a channel-specific message.

**Type**: boolean<br />
**Attributes**: read-only<br />


### `.isSystemMessage`


A boolean indicating whether the MIDI message is a system message (not specific to a
channel).

**Type**: boolean<br />
**Attributes**: read-only<br />


### `.manufacturerId`


When the message is a system exclusive message (sysex), this property contains an array with
either 1 or 3 entries that identify the manufacturer targeted by the message.

To know how to translate these entries into manufacturer names, check out the official list:
https://www.midi.org/specifications-old/item/manufacturer-id-numbers

**Type**: Array.&lt;number&gt;<br />
**Attributes**: read-only<br />


### `.rawData`


A Uint8Array containing the bytes of the MIDI message. Each byte is an integer between 0 and
255.

**Type**: Uint8Array<br />
**Attributes**: read-only<br />


### `.rawDataBytes`


A Uint8Array of the data byte(s) of the MIDI message. When the message is a system exclusive
message (sysex), `rawDataBytes` explicitly excludes the manufacturer ID and the sysex end
byte so only the actual data is included.

**Type**: Uint8Array<br />
**Attributes**: read-only<br />


### `.statusByte`


The MIDI status byte of the message as an integer between 0 and 255.

**Type**: number<br />
**Attributes**: read-only<br />


### `.accidental`

**Since**: 3.0.0<br />

The accidental (#, ##, b or bb) of the note

**Type**: string<br />


### `.attack`

**Since**: 3.0.0<br />

The attack velocity of the note as an integer between 0 and 127.

**Type**: number<br />


### `.duration`

**Since**: 3.0.0<br />

The duration of the note as a positive decimal number representing the number of milliseconds
that the note should play for.

**Type**: number<br />


### `.identifier`

**Since**: 3.0.0<br />

The name, optional accidental and octave of the note, as a string.

**Type**: string<br />


### `.name`

**Since**: 3.0.0<br />

The name (letter) of the note

**Type**: string<br />


### `.number`

**Since**: 3.0.0<br />

The MIDI number of the note. This number is derived from the note identifier using C4 as a
reference for middle C.

**Type**: number<br />


### `.octave`

**Since**: 3.0.0<br />

The octave of the note

**Type**: number<br />


### `.rawAttack`

**Since**: 3.0.0<br />

The attack velocity of the note as a positive integer between 0 and 127.

**Type**: number<br />


### `.rawRelease`

**Since**: 3.0.0<br />

The release velocity of the note as a positive integer between 0 and 127.

**Type**: number<br />


### `.release`

**Since**: 3.0.0<br />

The release velocity of the note as an integer between 0 and 127.

**Type**: number<br />


### `.channels`


Array containing the 16 [OutputChannel](OutputChannel) objects available for this `Output`. The
channels are numbered 1 through 16.

**Type**: Array.&lt;OutputChannel&gt;<br />


### `.connection`


Output port's connection state: `"pending"`, `"open"` or `"closed"`.

**Type**: string<br />
**Attributes**: read-only<br />


### `.eventCount`


The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: number<br />
**Attributes**: read-only<br />


### `.eventMap`


An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

**Type**: Object<br />
**Attributes**: read-only<br />


### `.eventNames`


An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />


### `.eventsSuspended`


Whether or not the execution of function callbacks is currently suspended for this whole
emitter

**Type**: boolean<br />


### `.id`


ID string of the MIDI output. The ID is host-specific. Do not expect the same ID on different
platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
the same port.

**Type**: string<br />
**Attributes**: read-only<br />


### `.manufacturer`


Name of the manufacturer of the device that makes this output port available.

**Type**: string<br />
**Attributes**: read-only<br />


### `.name`


Name of the MIDI output

**Type**: string<br />
**Attributes**: read-only<br />


### `.octaveOffset`

**Since**: 3.0<br />

An integer to offset the octave of outgoing notes. By default, middle C (MIDI note number 60)
is placed on the 4th octave (C4).

Note that this value is combined with the global offset value defined on the `WebMidi` object
(if any).

**Type**: number<br />


### `.state`


State of the output port: `"connected"` or `"disconnected"`.

**Type**: string<br />
**Attributes**: read-only<br />


### `.type`


Type of the output port (`"output"`)

**Type**: string<br />
**Attributes**: read-only<br />


### `.eventCount`


The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: number<br />
**Attributes**: read-only<br />


### `.eventMap`


An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

**Type**: Object<br />
**Attributes**: read-only<br />


### `.eventNames`


An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />


### `.eventsSuspended`


Whether or not the execution of function callbacks is currently suspended for this whole
emitter

**Type**: boolean<br />


### `.number`

**Since**: 3.0<br />

This channel's MIDI number (1-16)

**Type**: number<br />


### `.octaveOffset`

**Since**: 3.0<br />

An integer to offset the reported octave of outgoing note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

Note that this value is combined with the global offset value defined on the `WebMidi` object
and with the value defined on the parent [Output](Output) object.

**Type**: number<br />


### `.output`

**Since**: 3.0<br />

The parent [Output](Output) this channel belongs to

**Type**: Output<br />


### `.defaults`


Object containing system-wide default values that can be changed to customize how the library
works.

**Type**: Object<br />


  **Properties**

  | Property     | Type         | Description  |
  | ------------ | ------------ | ------------ |
    |**`defaults.note`** |object|Default values relating to note|
    |**`defaults.note.attack`** |number|A number between 0 and 127 representing the default attack velocity of notes. Initial value is 64.|
    |**`defaults.note.release`** |number|A number between 0 and 127 representing the default release velocity of notes. Initial value is 64.|
    |**`defaults.note.duration`** |number|A number representing the default duration of notes (in seconds). Initial value is Infinity.|


### `.enabled`


Indicates whether access to the host's MIDI subsystem is active or not.

**Type**: boolean<br />
**Attributes**: read-only<br />


### `.eventCount`


The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: number<br />
**Attributes**: read-only<br />


### `.eventMap`


An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

**Type**: Object<br />
**Attributes**: read-only<br />


### `.eventNames`


An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />


### `.eventsSuspended`


Whether or not the execution of function callbacks is currently suspended for this whole
emitter

**Type**: boolean<br />


### `.inputs`


An array of all currently available MIDI inputs.

**Type**: Array<br />
**Attributes**: read-only<br />


### `.interface`


The [`MIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
instance used to talk to the lower-level Web MIDI API. This should not be used directly
unless you know what you are doing.

**Type**: MIDIAccess<br />
**Attributes**: read-only, nullable<br />


### `.isBrowser`


Indicates whether the current environment is a browser environment or not. If you need to check
if we are in Node.js, use [`isNode`](#isNode). In certain environments (such as Electron and
NW.js) [`isNode`](#isNode) and [`isBrowser`](#isBrowser) can both be true at the same time.

**Type**: boolean<br />


### `.isNode`


Indicates whether the current environment is Node.js or not. If you need to check if we are in
browser, use [`isBrowser`](#isBrowser). In certain environments (such as Electron and
NW.js) [`isNode`](#isNode) and [`isBrowser`](#isBrowser) can both be true at the
same time.

**Type**: boolean<br />


### `.octaveOffset`

**Since**: 2.1<br />

An integer to offset the octave of notes received from external devices or sent to external
devices.

When a MIDI message comes in on an input channel the reported note name will be offset. For
example, if the `octaveOffset` is set to `-1` and a [`"noteon"`](InputChannel#event:noteon)
message with MIDI number 60 comes in, the note will be reported as C3 (instead of C4).

By the same token, when [`OutputChannel.playNote()`](OutputChannel#playNote) is called, the
MIDI note number being sent will be offset. If `octaveOffset` is set to `-1`, the MIDI note
number sent will be 72 (instead of 60).

**Type**: number<br />


### `.outputs`


An array of all currently available MIDI outputs as [`Output`](Output) objects.

**Type**: Array<br />
**Attributes**: read-only<br />


### `.supported`


Indicates whether the environment provides support for the Web MIDI API or not.

**Note**: in environments that do not offer built-in MIDI support, this will report `true` if
the
[`navigator.requestMIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
function is available. For example, if you have installed WebMIDIAPIShim.js but no plugin, this
property will be `true` even though actual support might not be there.

**Type**: boolean<br />
**Attributes**: read-only<br />


### `.sysexEnabled`


Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
enabled via the [`enable()`](#enable) method.

**Type**: boolean<br />
**Attributes**: read-only<br />


### `.time`


The elapsed time, in milliseconds, since the time
[origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).
Said simply, it is the number of milliseconds that passed since the page was loaded. Being a
floating-point number, it has sub-millisecond accuracy. According to the
[documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), the
time should be accurate to 5 µs (microseconds). However, due to various constraints, the
browser might only be accurate to one millisecond.

**Type**: DOMHighResTimeStamp<br />
**Attributes**: read-only<br />


### `.validation`


Indicates whether argument validation and backwards-compatibility checks are performed
throughout the WebMidi.js library for object methods and property setters.

This is an advanced setting that should be used carefully. Setting `validation` to `false`
improves performance but should only be done once the project has been thoroughly tested with
`validation` turned on.

**Type**: boolean<br />



***

## Methods


### `.addListener(...)`


Adds a listener for the specified event. It returns the [**Listener**](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The value of `this` in the callback function.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] |boolean|Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)`


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The context to invoke the callback function in.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.emit(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|
    |**`args`** |*||Arbitrary number of arguments to pass along to the callback functions|


**Returns**: `Array`
> An array containing the return value of each of the executed listener
functions


**Throws**:
  * `TypeError` : The `event` parameter must be a string.


### `.getListenerCount(...)`


Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListenerCount(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|


**Returns**: `number`
> The number of listeners registered for the specified event.




### `.getListeners(...)`


Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListeners(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to get listeners for|


**Returns**: `Array.<Listener>`
> An array of `Listener` objects




### `.hasListener(...)`


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event to check|
    |[**`callback`**] |function||The actual function that was added to the event or the [Listener](Listener) object returned by `addListener()`.|


**Returns**: `boolean`



### `.removeListener(...)`


Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.


  **Parameters**

  > Signature: `removeListener([event], [callback], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event name.|
    |[**`callback`**] |EventEmitter~callback||Only remove the listeners that match this exact callback function.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |*||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] |number||Only remove the listener if it has exactly that many remaining times to be executed.|






### `.suspendEvent(...)`


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to suspend execution of all callback functions.|






### `.unsuspendEvent(...)`


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to resume execution of all callback functions.|






### `.waitFor(...)`

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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to wait for|
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds to wait before the promise is automatically rejected.|






### `.addListener(...)`


Adds an event listener that will trigger a function callback when the specified event happens.
The event can be **channel-bound** or **input-wide**. Channel-bound events are dispatched by
[InputChannel](InputChannel) objects and are tied to a specific MIDI channel while input-wide events
are dispatched by the [Input](Input) object itself and are not tied to a specific channel.

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

Note that, when adding events to channels, it is the [InputChannel](InputChannel) instance that
actually gets a listener added and not the `[Input](Input) instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the [InputChannel](InputChannel) object itself.

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

   * [opened](Input#event:opened)
   * [closed](Input#event:closed)
   * [disconnected](Input#event:disconnected)

4. **Catch-All** Events (input-wide)

   * [midimessage](Input#event:midimessage)
   * [unknownmidimessage](Input#event:unknownmidimessage)

5. **Channel Voice** Events (channel-specific)

   * [channelaftertouch](InputChannel#event:channelaftertouch)
   * [controlchange](InputChannel#event:controlchange)
   * [keyaftertouch](InputChannel#event:keyaftertouch)
   * [noteoff](InputChannel#event:noteoff)
   * [noteon](InputChannel#event:noteon)
   * [nrpn](InputChannel#event:nrpn)
   * [pitchbend](InputChannel#event:pitchbend)
   * [programchange](InputChannel#event:programchange)

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


  **Parameters**

  > Signature: `addListener(event, listener, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The type of the event.|
    |**`listener`** |function||A callback function to execute when the specified event is detected. This function will receive an event parameter object. For details on this object's properties, check out the documentation for the various events (links above).|
    |[**`options`**] |Object|{}||
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the `arguments` property of the `Listener` object and can be retrieved or modified as desired.|
    |[**`options.channels`**] |number||An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to listen on. This parameter is ignored for input-wide events.|
    |[**`options.context`**] |Object|this|The value of `this` in the callback function.|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array.|
    |[**`options.remaining`**] |boolean|Infinity|The number of times after which the callback should automatically be removed.|


**Returns**: `Array.<Listener>`
> An array of all `Listener` objects that were created.


**Throws**:
  * `Error` : For channel-specific events, 'options.channels' must be defined.


### `.addOneTimeListener(...)`


Adds a one-time event listener that will trigger a function callback when the specified event
happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
dispatched by [InputChannel](InputChannel) objects and are tied to a specific MIDI channel while
input-wide events are dispatched by the [Input](Input) object itself and are not tied to a
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

Note that, when adding events to channels, it is the [InputChannel](InputChannel) instance that
actually gets a listener added and not the `[Input](Input) instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the [InputChannel](InputChannel) object itself.

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

   * [opened](Input#event:opened)
   * [closed](Input#event:closed)
   * [disconnected](Input#event:disconnected)

4. **Catch-All** Events (input-wide)

   * [midimessage](Input#event:midimessage)
   * [unknownmidimessage](Input#event:unknownmidimessage)

5. **Channel Voice** Events (channel-specific)

   * [channelaftertouch](InputChannel#event:channelaftertouch)
   * [controlchange](InputChannel#event:controlchange)
   * [keyaftertouch](InputChannel#event:keyaftertouch)
   * [noteoff](InputChannel#event:noteoff)
   * [noteon](InputChannel#event:noteon)
   * [nrpn](InputChannel#event:nrpn)
   * [pitchbend](InputChannel#event:pitchbend)
   * [programchange](InputChannel#event:programchange)

6. **Channel Mode** Events (channel-specific)

   * allnotesoff
   * allsoundoff
   * localcontrol
   * monomode
   * omnimode
   * resetallcontrollers


  **Parameters**

  > Signature: `addOneTimeListener(event, listener, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The type of the event.|
    |**`listener`** |function||A callback function to execute when the specified event is detected. This function will receive an event parameter object. For details on this object's properties, check out the documentation for the various events (links above).|
    |[**`options`**] |Object|{}||
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the `arguments` property of the `Listener` object and can be retrieved or modified as desired.|
    |[**`options.channels`**] |number||An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to listen on. This parameter is ignored for input-wide events.|
    |[**`options.context`**] |Object|this|The value of `this` in the callback function.|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array.|


**Returns**: `Array.<Listener>`
> An array of all `Listener` objects that were created.


**Throws**:
  * `Error` : For channel-specific events, 'options.channels' must be defined.


### `.close()`

**Attributes**: async

Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
the input is opened again by calling [Input.open()](#Input+open).


**Returns**: `Promise.<Input>`
> The promise is fulfilled with the `Input` object




### `.destroy()`

**Attributes**: async

Destroys the `Input` by removing all listeners, emptying the `channels` array and unlinking the
MIDI subsystem.


**Returns**: `Promise.<void>`



### `.emit(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|
    |**`args`** |*||Arbitrary number of arguments to pass along to the callback functions|


**Returns**: `Array`
> An array containing the return value of each of the executed listener
functions


**Throws**:
  * `TypeError` : The `event` parameter must be a string.


### `.getListenerCount(...)`


Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListenerCount(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|


**Returns**: `number`
> The number of listeners registered for the specified event.




### `.getListeners(...)`


Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListeners(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to get listeners for|


**Returns**: `Array.<Listener>`
> An array of `Listener` objects




### `.hasListener(...)`


Checks if the specified event type is already defined to trigger the listener function. For
channel-specific events, the function will return `true` only if all channels have the listener
defined.


  **Parameters**

  > Signature: `hasListener(event, listener, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The type of the event.|
    |**`listener`** |function||The callback function to check for.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number||An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to check. This parameter is ignored for input-wide events.|


**Returns**: `Boolean`
> Boolean value indicating whether or not the channel(s) already have this
listener defined.


**Throws**:
  * Error For channel-specific events, 'options.channels' must be defined.


### `.open()`

**Attributes**: async

Opens the input for usage. This is usually unnecessary as the port is open automatically when
WebMidi is enabled.


**Returns**: `Promise.<Input>`
> The promise is fulfilled with the `Input` object




### `.removeListener(...)`


Removes the specified listener for the specified event. If no listener is specified, all
listeners for the specified event will be removed. If no event is specified, all listeners for
the `Input` as well as all listeners for all `InputChannels` will be removed.

By default, channel-specific listeners will be removed from all channels unless the
`options.channel` narrows it down.


  **Parameters**

  > Signature: `removeListener([type], [listener], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`type`**] |String||The type of the event.|
    |[**`listener`**] |function||The callback function to check for.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number||An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to match. This parameter is ignored for input-wide events.|
    |[**`options.context`**] |*||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] |number||Only remove the listener if it has exactly that many remaining times to be executed.|






### `.suspendEvent(...)`


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to suspend execution of all callback functions.|






### `.unsuspendEvent(...)`


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to resume execution of all callback functions.|






### `.waitFor(...)`

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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to wait for|
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds to wait before the promise is automatically rejected.|






### `.addListener(...)`


Adds a listener for the specified event. It returns the [**Listener**](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The value of `this` in the callback function.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] |boolean|Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)`


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The context to invoke the callback function in.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.destroy()`


Destroys the `Input` by removing all listeners and severing the link with the MIDI subsystem's
input.






### `.emit(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|
    |**`args`** |*||Arbitrary number of arguments to pass along to the callback functions|


**Returns**: `Array`
> An array containing the return value of each of the executed listener
functions


**Throws**:
  * `TypeError` : The `event` parameter must be a string.


### `.getCcNameByNumber(...)`

**Since**: 2.0.0<br />

Returns the name of a control change message matching the specified number. Some valid control
change numbers do not have a specific name or purpose assigned in the MIDI
[spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
In this case, the method returns `false`.


  **Parameters**

  > Signature: `getCcNameByNumber(number)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** |number||An integer representing the control change message|


**Returns**: `string` or `undefined`
> The matching control change name or `undefined` if not match was
found.


**Throws**:
  * `RangeError` : Invalid control change number.


### `.getChannelModeByNumber(...)`

**Since**: 2.0.0<br />

Returns the channel mode name matching the specified number. If no match is found, the function
returns `false`.


  **Parameters**

  > Signature: `getChannelModeByNumber(number)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** |number||An integer representing the channel mode message.|


**Returns**: `string` or `false`
> The name of the matching channel mode or `false` if not match could be
found.




### `.getListenerCount(...)`


Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListenerCount(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|


**Returns**: `number`
> The number of listeners registered for the specified event.




### `.getListeners(...)`


Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListeners(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to get listeners for|


**Returns**: `Array.<Listener>`
> An array of `Listener` objects




### `.hasListener(...)`


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event to check|
    |[**`callback`**] |function||The actual function that was added to the event or the [Listener](Listener) object returned by `addListener()`.|


**Returns**: `boolean`



### `.removeListener(...)`


Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.


  **Parameters**

  > Signature: `removeListener([event], [callback], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event name.|
    |[**`callback`**] |EventEmitter~callback||Only remove the listeners that match this exact callback function.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |*||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] |number||Only remove the listener if it has exactly that many remaining times to be executed.|






### `.suspendEvent(...)`


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to suspend execution of all callback functions.|






### `.unsuspendEvent(...)`


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to resume execution of all callback functions.|






### `.waitFor(...)`

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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to wait for|
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds to wait before the promise is automatically rejected.|






### `.remove()`


Removes the listener from its target.






### `.getOffsetNumber(...)`


Returns a MIDI note number offset by octave and/or semitone. If the calculated value is less
than 0, 0 will be returned. If the calculated value is more than 127, 127 will be returned. If
an invalid value is supplied, 0 will be used.


  **Parameters**

  > Signature: `getOffsetNumber([octaveOffset], [semitoneOffset])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`octaveOffset`**] |number|0|An integer to offset the note number by octave.|
    |[**`semitoneOffset`**] |number|0|An integer to offset the note number by semitone.|


**Returns**: `number`
> An integer between 0 and 127




### `.addListener(...)`


Adds a listener for the specified event. It returns the [**Listener**](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The value of `this` in the callback function.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] |boolean|Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)`


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The context to invoke the callback function in.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.clear()`


Clears all messages that have been queued but not yet delivered.

Warning: this method has been defined in the specification but has not been implemented yet. As
soon as browsers implement it, it will work.

You can check out the current status of this feature for Chromium (Chrome) here:
https://bugs.chromium.org/p/chromium/issues/detail?id=471798


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.close()`

**Attributes**: async

Closes the output connection. When an output is closed, it cannot be used to send MIDI messages
until the output is opened again by calling [Output.open()](#Output+open). You can check
the connection status by looking at the [connection](Output#connection) property.


**Returns**: `Promise.<void>`



### `.decrementRegisteredParameter(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |String||A string identifying the parameter"s name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * TypeError The specified parameter is not available.


### `.destroy()`

**Attributes**: async

Destroys the `Output`. All listeners are removed, all channels are destroyed and the MIDI
subsystem is unlinked.


**Returns**: `Promise.<void>`



### `.emit(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|
    |**`args`** |*||Arbitrary number of arguments to pass along to the callback functions|


**Returns**: `Array`
> An array containing the return value of each of the executed listener
functions


**Throws**:
  * `TypeError` : The `event` parameter must be a string.


### `.getListenerCount(...)`


Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListenerCount(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|


**Returns**: `number`
> The number of listeners registered for the specified event.




### `.getListeners(...)`


Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListeners(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to get listeners for|


**Returns**: `Array.<Listener>`
> An array of `Listener` objects




### `.hasListener(...)`


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event to check|
    |[**`callback`**] |function||The actual function that was added to the event or the [Listener](Listener) object returned by `addListener()`.|


**Returns**: `boolean`



### `.incrementRegisteredParameter(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |String||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.open()`

**Attributes**: async

Opens the output for usage.


**Returns**: `Promise.<Output>`
> The promise is fulfilled with the `Output`




### `.playNote(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |number||The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to play the note on. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.duration`**] |number||The number of milliseconds (integer) after which a **note off** message will be scheduled. If left undefined, only a **note on** message is sent.|
    |[**`options.rawValue`**] |boolean|false|Controls whether the attack and release velocities are set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default).|
    |[**`options.release`**] |number|0.5|The velocity at which to release the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set.|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.attack`**] |number|0.5|The attack velocity to use when playing the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.removeListener(...)`


Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.


  **Parameters**

  > Signature: `removeListener([event], [callback], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event name.|
    |[**`callback`**] |EventEmitter~callback||Only remove the listeners that match this exact callback function.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |*||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] |number||Only remove the listener if it has exactly that many remaining times to be executed.|






### `.resetAllControllers(...)`


Sends a **reset all controllers** channel mode message. This resets all controllers, such as
the pitch bend, to their default value.


  **Parameters**

  > Signature: `resetAllControllers([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`



### `.send(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`message`** |Array.&lt;number&gt;||An array of 8bit unsigned integers, a `Uint8Array` object (not available in Node.js) containing the message bytes or a `Message` object.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([DOMHighResTimeStamp](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that point time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The first byte (status) must be an integer between 128 and 255.


### `.sendActiveSensing(...)`


Sends an **active sensing** real-time message. This tells the device connected to this port
that the connection is still good. Active sensing messages should be sent every 300 ms if there
was no other activity on the MIDI port.


  **Parameters**

  > Signature: `sendActiveSensing([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.sendChannelMode(...)`


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


  **Parameters**

  > Signature: `sendChannelMode(command, [value], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`command`** |number||The numerical identifier of the channel mode message (integer between 120-127) or its name as a string.|
    |[**`value`**] |number||The value to send (integer between 0-127).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `TypeError` : Invalid channel mode message name.
  * `RangeError` : Channel mode controller numbers must be between 120 and 127.
  * `RangeError` : Value must be an integer between 0 and 127.


### `.sendClock(...)`


Sends a MIDI **clock* real-time message. According to the standard, there are 24 MIDI Clocks
for every quarter note.


  **Parameters**

  > Signature: `sendClock([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.sendContinue(...)`


Sends a **continue** real-time message. This resumes song playback where it was previously
stopped or where it was last cued with a song position message. To start playback from the
start, use the [sendStart()](#Output+sendStart)` method.


  **Parameters**

  > Signature: `sendContinue([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.sendControlChange(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`controller`** |number||The MIDI controller name or number (0-127).|
    |[**`value`**] |number|0|The value to send (0-127).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : Controller numbers must be between 0 and 127.
  * `RangeError` : Invalid controller name.


### `.sendNoteOff(...)`


Sends a **note off** message for the specified MIDI note number on the specified channel(s).
The first parameter is the number. It can be a single value or an array of the following valid
values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)

 The execution of the **note off** command can be delayed by using the `time` property of the
`options` parameter.


  **Parameters**

  > Signature: `sendNoteOff(note, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |number||The note(s) to stop. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7) or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.rawValue`**] |boolean|false|Controls whether the release velocity is set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.release`**] |number|0.5|The velocity at which to release the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.sendNoteOn(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |number||The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7) or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.rawValue`**] |boolean|false|Controls whether the attack velocity is set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.attack`**] |number|0.5|The velocity at which to play the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.sendReset(...)`


Sends a **reset** real-time message. This tells the device connected to this output that it
should reset itself to a default state.


  **Parameters**

  > Signature: `sendReset([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.sendStart(...)`


Sends a **start** real-time message. A MIDI Start message starts the playback of the current
song at beat 0. To start playback elsewhere in the song, use the
[sendContinue()](#Output+sendContinue) method.


  **Parameters**

  > Signature: `sendStart([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.sendStop(...)`


Sends a **stop** real-time message. This tells the device connected to this output to stop
playback immediately (or at the scheduled time).


  **Parameters**

  > Signature: `sendStop([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.sendSysex(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`manufacturer`** |number||An unsigned integer or an array of three unsigned integers between 0 and 127 that identify the targeted manufacturer. The *MIDI Manufacturers Association* maintains a full list of [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers) .|
    |[**`data`**] |Array.&lt;number&gt;|[]|A Uint8Array or an array of unsigned integers between 0 and 127. This is the data you wish to transfer.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `DOMException` : Failed to execute 'send' on 'MIDIOutput': System exclusive message is
not allowed.
  * `TypeError` : Failed to execute 'send' on 'MIDIOutput': The value at index x is greater
than 0xFF.


### `.sendTimecodeQuarterFrame(...)`


Sends a MIDI **timecode quarter frame** message. Please note that no processing is being done
on the data. It is up to the developer to format the data according to the
[MIDI Timecode](https://en.wikipedia.org/wiki/MIDI_timecode) format.


  **Parameters**

  > Signature: `sendTimecodeQuarterFrame(value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |number||The quarter frame message content (integer between 0 and 127).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.sendTuneRequest(...)`

**Since**: 3.0.0<br />

Sends a MIDI **tune request** real-time message.


  **Parameters**

  > Signature: `sendTuneRequest([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.setChannelAftertouch(...)`

**Since**: 3.0.0<br />

Sends a MIDI **channel aftertouch** message to the specified channel(s). For key-specific
aftertouch, you should instead use [setKeyAftertouch()](#Output+setKeyAftertouch).


  **Parameters**

  > Signature: `setChannelAftertouch([pressure], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`pressure`**] |number|0.5|The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.rawValue`**] |boolean|false|A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.setKeyAftertouch(...)`

**Since**: 3.0.0<br />

Sends a MIDI **key aftertouch** message to the specified channel(s) at the scheduled time. This
is a key-specific aftertouch. For a channel-wide aftertouch message, use
[setChannelAftertouch()](#Output+setChannelAftertouch).


  **Parameters**

  > Signature: `setKeyAftertouch(note, [pressure], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |number||The note for which you are sending an aftertouch value. The notes can be specified in one of two ways. The first way is by using the MIDI note number (an integer between 0 and 127). The second way is by using the note name followed by the octave (C3, G#4, F-1, Db7). The octave range should be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). It is also possible to use an array of note names and/or numbers.|
    |[**`pressure`**] |number|0.5|The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.rawValue`**] |boolean|false|A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.setLocalControl(...)`

**Since**: 3.0.0<br />

Turns local control on or off. Local control is usually enabled by default. If you disable it,
the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
its out port.


  **Parameters**

  > Signature: `setLocalControl([state], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`state`**] |boolean|false|Whether to activate local control (`true`) or disable it (`false`).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.setMasterTuning(...)`

**Since**: 3.0.0<br />

Sends a master tuning message to the specified channel(s). The value is decimal and must be
larger than -65 semitones and smaller than 64 semitones.

Because of the way the MIDI specification works, the decimal portion of the value will be
encoded with a resolution of 14bit. The integer portion must be between -64 and 63
inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
a **Master Fine Tuning** RPN messages.


  **Parameters**

  > Signature: `setMasterTuning([value], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`value`**] |number|0.0|The desired decimal adjustment value in semitones (-65 < x < 64)|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The value must be a decimal number between larger than -65 and smaller
than 64.


### `.setModulationRange(...)`

**Since**: 3.0.0<br />

Sends a **modulation depth range** message to the specified channel(s) so that they adjust the
depth of their modulation wheel's range. The range can be specified with the `semitones`
parameter, the `cents` parameter or by specifying both parameters at the same time.


  **Parameters**

  > Signature: `setModulationRange([semitones], [cents], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`semitones`**] |number|0|The desired adjustment value in semitones (integer between 0 and 127).|
    |[**`cents`**] |number|0|The desired adjustment value in cents (integer between 0 and 127).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The msb value must be between 0 and 127
  * `RangeError` : The lsb value must be between 0 and 127


### `.setNonRegisteredParameter(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |Array.&lt;number&gt;||A two-position array specifying the two control bytes (0x63, 0x62) that identify the non-registered parameter.|
    |[**`data`**] |number|[]|An integer or an array of integers with a length of 1 or 2 specifying the desired data.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The control value must be between 0 and 127.
  * `RangeError` : The msb value must be between 0 and 127


### `.setOmniMode(...)`

**Since**: 3.0.0<br />

Sets OMNI mode to `"on"` or `"off"` for the specified channel(s). MIDI's OMNI mode causes the
instrument to respond to messages from all channels.

It should be noted that support for OMNI mode is not as common as it used to be.


  **Parameters**

  > Signature: `setOmniMode([state], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`state`**] |boolean||Whether to activate OMNI mode (`true`) or not (`false`).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `TypeError` : Invalid channel mode message name.
  * `RangeError` : Channel mode controller numbers must be between 120 and 127.
  * `RangeError` : Value must be an integer between 0 and 127.


### `.setPitchBend(...)`

**Since**: 3.0.0<br />

Sends a MIDI **pitch bend** message to the specified channel(s) at the scheduled time.


  **Parameters**

  > Signature: `setPitchBend(value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |number||The intensity of the bend (between -1.0 and 1.0). A value of zero means no bend. The resulting bend is relative to the pitch bend range that has been defined. The range can be set with [setPitchBendRange()](#OutputChannel+setPitchBendRange) . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of -1 will bend the note 1 octave below its nominal value. If an invalid value is specified, the nearest valid value will be used instead. If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127 representing, respectively, the MSB (most significant byte) and the LSB (least significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64` bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents (1/100 of a semitone). An LSB of `64` also means no bend.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.rawValue`**] |boolean|false|A boolean indicating whether the value should be considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or an array of 2 integers if using both MSB and LSB).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.setPitchBendRange(...)`

**Since**: 3.0.0<br />

Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
adjust the range used by their pitch bend lever. The range is specified by using the
`semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
means that the pitch bend range will be 12 semitones above and below the nominal pitch.


  **Parameters**

  > Signature: `setPitchBendRange(semitones, [cents], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`semitones`** |number||The desired adjustment value in semitones (between 0 and 127). While nothing imposes that in the specification, it is very common for manufacturers to limit the range to 2 octaves (-12 semitones to 12 semitones).|
    |[**`cents`**] |number|0|The desired adjustment value in cents (integer between 0-127).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The msb value must be between 0 and 127.
  * `RangeError` : The lsb value must be between 0 and 127.


### `.setPolyphonicMode(...)`

**Since**: 3.0.0<br />

Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
multiple notes are being played.


  **Parameters**

  > Signature: `setPolyphonicMode(mode, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`mode`** |string||The mode to use: `"mono"` or `"poly"`.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.setProgram(...)`

**Since**: 3.0.0<br />

Sends a MIDI **program change** message to the specified channel(s) at the scheduled time.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setProgram([program], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`program`**] |number|1|The MIDI patch (program) number (1-128)|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `TypeError` : Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
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

  > Signature: `setRegisteredParameter(parameter, [data], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |string||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the registered parameter.|
    |[**`data`**] |number|[]|A single integer or an array of integers with a maximum length of 2 specifying the desired data.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.setSong(...)`

**Since**: 3.0.0<br />

Sends a **song select** MIDI message.

**Note**: since version 3.0, the song number is an integer between 1 and 128. In versions 1.0
and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices that
use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setSong(value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |number||The number of the song to select (integer between 1 and 128).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * The song number must be between 1 and 128.


### `.setSongPosition(...)`

**Since**: 3.0.0<br />

Sends a **ong position** MIDI message. The value is expressed in MIDI beats (between 0 and
16383) which are 16th note. Position 0 is always the start of the song.


  **Parameters**

  > Signature: `setSongPosition([value], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`value`**] |number|0|The MIDI beat to cue to (integer between 0 and 16383).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.




### `.setTuningBank(...)`

**Since**: 3.0.0<br />

Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setTuningBank(value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |number||The desired tuning bank (1-128).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The bank value must be between 1 and 128.


### `.setTuningProgram(...)`

**Since**: 3.0.0<br />

Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setTuningProgram(value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |number||The desired tuning program (1-128).|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`
> Returns the `Output` object so methods can be chained.


**Throws**:
  * `RangeError` : The program value must be between 1 and 128.


### `.stopNote(...)`


This is an alias to the [sendNoteOff()](#Output+sendNoteOff) method.


  **Parameters**

  > Signature: `stopNote(note, options)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** ||||
    |**`options`** ||||


**Returns**: `Output`



### `.suspendEvent(...)`


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to suspend execution of all callback functions.|






### `.turnNotesOff(...)`

**Since**: 3.0.0<br />

Sends an **all notes off** channel mode message. This will make all currently playing notes
fade out just as if their key had been released. This is different from the
[turnSoundOff()](#Output+turnSoundOff) method which mutes all sounds immediately.


  **Parameters**

  > Signature: `turnNotesOff([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`



### `.turnSoundOff(...)`

**Since**: 3.0.0<br />

Sends an **all sound off** channel mode message. This will silence all sounds playing on that
channel but will not prevent new sounds from being triggered.


  **Parameters**

  > Signature: `turnSoundOff([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number|&quot;all&quot;|The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `Output`



### `.unsuspendEvent(...)`


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to resume execution of all callback functions.|






### `.waitFor(...)`

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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to wait for|
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds to wait before the promise is automatically rejected.|






### `.addListener(...)`


Adds a listener for the specified event. It returns the [**Listener**](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The value of `this` in the callback function.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] |boolean|Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)`


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The context to invoke the callback function in.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


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

  > Signature: `decrementRegisteredParameter(parameter, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |String||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * TypeError The specified registered parameter is invalid.


### `.emit(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|
    |**`args`** |*||Arbitrary number of arguments to pass along to the callback functions|


**Returns**: `Array`
> An array containing the return value of each of the executed listener
functions


**Throws**:
  * `TypeError` : The `event` parameter must be a string.


### `.getListenerCount(...)`


Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListenerCount(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|


**Returns**: `number`
> The number of listeners registered for the specified event.




### `.getListeners(...)`


Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListeners(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to get listeners for|


**Returns**: `Array.<Listener>`
> An array of `Listener` objects




### `.hasListener(...)`


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event to check|
    |[**`callback`**] |function||The actual function that was added to the event or the [Listener](Listener) object returned by `addListener()`.|


**Returns**: `boolean`



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

  > Signature: `incrementRegisteredParameter(parameter, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |String||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


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

  > Signature: `playNote(note, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |number||The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number||A positive number larger than 0 representing the number of milliseconds to wait before sending a **note off** message. If invalid or left undefined, only a **note on** message will be sent.|
    |[**`options.attack`**] |number|0.5|The velocity at which to play the note (between `0` and `1`). If the `rawAttack` option is also defined, it will have priority. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.rawAttack`**] |number|0.5|The attack velocity at which to play the note (between `0` and `127`). This has priority over the `attack` property. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.release`**] |number|0.5|The velocity at which to release the note (between `0` and `1`). If the `rawRelease` option is also defined, it will have priority. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set.|
    |[**`options.rawRelease`**] |number|0.5|The velocity at which to release the note (between `0` and `127`). This has priority over the `release` property. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set.|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




### `.removeListener(...)`


Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.


  **Parameters**

  > Signature: `removeListener([event], [callback], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event name.|
    |[**`callback`**] |EventEmitter~callback||Only remove the listeners that match this exact callback function.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |*||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] |number||Only remove the listener if it has exactly that many remaining times to be executed.|






### `.resetAllControllers(...)`


Sends a **reset all controllers** channel mode message. This resets all controllers, such as
the pitch bend, to their default value.


  **Parameters**

  > Signature: `resetAllControllers([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




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

  > Signature: `send(message, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`message`** |Array.&lt;number&gt;||An array of 8bit unsigned integers, a `Uint8Array` object (not available in Node.js) containing the message bytes or a `Message` object.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([DOMHighResTimeStamp](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that point time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


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

  - [turnSoundOff()](#Output+turnSoundOff)
  - [resetAllControllers()](#Output+resetAllControllers)
  - [setLocalControl()](#Output+turnSoundOff)
  - [turnNotesOff()](#Output+turnNotesOff)
  - [setOmniMode()](#Output+setOmniMode)
  - [setPolyphonicMode()](#Output+setPolyphonicMode)


  **Parameters**

  > Signature: `sendChannelMode(command, value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`command`** |number||The numerical identifier of the channel mode message (integer between 120-127) or its name as a string.|
    |**`value`** |number||The value to send (integer between 0-127).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




### `.sendControlChange(...)`

**Since**: 3.0.0<br />

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

  > Signature: `sendControlChange(controller, value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`controller`** |number||The MIDI controller name or number (0-127).|
    |**`value`** |number||The value to send (0-127). You can also use a two-position array for controllers 0 to 31. In this scenario, the first value will be sent as usual and the second calue will be sent to the matching LSB controller (which is obtained by adding 32 to the first controller)|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


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

  > Signature: `sendNoteOff(note, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |number||The note(s) to stop. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.release`**] |number|0.5|The velocity at which to release the note (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have priority. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.rawRelease`**] |number|64|The velocity at which to release the note (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have priority. An invalid velocity value will silently trigger the default of `64`.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




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
[playNote()](#Output+playNote) method instead.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.


  **Parameters**

  > Signature: `sendNoteOn(note, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** |number||The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a [Note](Note) object or an array of the previous types.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|
    |[**`options.attack`**] |number|0.5|The velocity at which to play the note (between `0` and `1`).  If the `rawAttack` option is also defined, `rawAttack` will have priority. An invalid velocity value will silently trigger the default of `0.5`.|
    |[**`options.rawAttack`**] |number|64|The velocity at which to release the note (between `0` and `127`). If the `attack` option is also defined, `rawAttack` will have priority. An invalid velocity value will silently trigger the default of `64`.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




### `.setChannelAftertouch(...)`


Sends a MIDI **channel aftertouch** message. For key-specific aftertouch, you should instead
use [setKeyAftertouch()](#Output+setKeyAftertouch).


  **Parameters**

  > Signature: `setChannelAftertouch([pressure], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`pressure`**] |number||The pressure level (between 0 and 1). If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127.|
    |[**`options`**] |Object|{}||
    |[**`options.rawValue`**] |boolean|false|A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * RangeError Invalid channel aftertouch value.


### `.setKeyAftertouch(...)`


Sends a MIDI **key aftertouch** message at the scheduled time. This is a key-specific
aftertouch. For a channel-wide aftertouch message, use
[setChannelAftertouch()](#Output+setChannelAftertouch).

The key can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note identifier such as `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.


  **Parameters**

  > Signature: `setKeyAftertouch(target, [pressure], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`target`** |number||The key(s) for which you are sending an aftertouch value. The notes can be specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), or an array of the previous types. When using a note identifier, the octave value will be offset by the combined value of `InputChannel.octaveOffset`, `Input.octaveOffset` and `WebMidi.octaveOffset` (if those values are not `0`). When using a key number, octaveOffset values are ignored.|
    |[**`pressure`**] |number|0.5|The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure is defined by using an integer between 0 and 127.|
    |[**`options`**] |Object|{}||
    |[**`options.useRawValue`**] |boolean|false|A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * RangeError Invalid key aftertouch value.


### `.setLocalControl(...)`


Turns local control on or off. Local control is usually enabled by default. If you disable it,
the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
its out port.


  **Parameters**

  > Signature: `setLocalControl([state], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`state`**] |boolean|false|Whether to activate local control (`true`) or disable it (`false`).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




### `.setMasterTuning(...)`


Sends a **master tuning** message. The value is decimal and must be larger than -65 semitones
and smaller than 64 semitones.

Because of the way the MIDI specification works, the decimal portion of the value will be
encoded with a resolution of 14bit. The integer portion must be between -64 and 63
inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
a **Master Fine Tuning** RPN messages.


  **Parameters**

  > Signature: `setMasterTuning([value], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`value`**] |number|0.0|The desired decimal adjustment value in semitones (-65 < x < 64)|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The value must be a decimal number between larger than -65 and smaller
than 64.


### `.setModulationRange(...)`


Sends a **modulation depth range** message to adjust the depth of the modulation wheel's range.
The range can be specified with the `semitones` parameter, the `cents` parameter or by
specifying both parameters at the same time.


  **Parameters**

  > Signature: `setModulationRange(semitones, [cents], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`semitones`** |number||The desired adjustment value in semitones (integer between 0 and 127).|
    |[**`cents`**] |number|0|The desired adjustment value in cents (integer between 0 and 127).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




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

  > Signature: `setNonRegisteredParameter(parameter, [data], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |Array.&lt;number&gt;||A two-position array specifying the two control bytes (0x63, 0x62) that identify the non-registered parameter.|
    |[**`data`**] |number|[]|An integer or an array of integers with a length of 1 or 2 specifying the desired data.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The control value must be between 0 and 127.
  * `RangeError` : The msb value must be between 0 and 127


### `.setOmniMode(...)`


Sets OMNI mode to `"on"` or `"off"`. MIDI's OMNI mode causes the instrument to respond to
messages from all channels.

It should be noted that support for OMNI mode is not as common as it used to be.


  **Parameters**

  > Signature: `setOmniMode([state], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`state`**] |boolean|true|Whether to activate OMNI mode (`true`) or not (`false`).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `TypeError` : Invalid channel mode message name.
  * `RangeError` : Channel mode controller numbers must be between 120 and 127.
  * `RangeError` : Value must be an integer between 0 and 127.


### `.setPitchBend(...)`


Sends a MIDI **pitch bend** message at the scheduled time.


  **Parameters**

  > Signature: `setPitchBend([value], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`value`**] |number||The intensity of the bend (between -1.0 and 1.0). A value of zero means no bend. The resulting bend is relative to the pitch bend range that has been defined. The range can be set with [setPitchBendRange()](#OutputChannel+setPitchBendRange) . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of -1 will bend the note 1 octave below its nominal value. If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127 representing, respectively, the MSB (most significant byte) and the LSB (least significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64` bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents (1/100 of a semitone). An LSB of `64` also means no bend.|
    |[**`options`**] |Object|{}||
    |[**`options.rawValue`**] |boolean|false|A boolean indicating whether the value should be considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or an array of 2 integers if using both MSB and LSB).|
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




### `.setPitchBendRange(...)`


Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
adjust the range used by their pitch bend lever. The range is specified by using the
`semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
means that the pitch bend range will be 12 semitones above and below the nominal pitch.


  **Parameters**

  > Signature: `setPitchBendRange(semitones, [cents], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`semitones`** |number||The desired adjustment value in semitones (between 0 and 127). While nothing imposes that in the specification, it is very common for manufacturers to limit the range to 2 octaves (-12 semitones to 12 semitones).|
    |[**`cents`**] |number|0|The desired adjustment value in cents (integer between 0-127).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The msb value must be between 0 and 127.
  * `RangeError` : The lsb value must be between 0 and 127.


### `.setPolyphonicMode(...)`


Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
multiple notes are being played.


  **Parameters**

  > Signature: `setPolyphonicMode([mode], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`mode`**] |string|poly|The mode to use: `"mono"` or `"poly"`.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




### `.setProgram(...)`


Sends a MIDI **program change** message at the scheduled time.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setProgram([program], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`program`**] |number|1|The MIDI patch (program) number (1-128)|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `TypeError` : Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
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

  > Signature: `setRegisteredParameter(parameter, [data], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`parameter`** |string||A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the registered parameter.|
    |[**`data`**] |number|[]|An single integer or an array of integers with a maximum length of 2 specifying the desired data.|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




### `.setTuningBank(...)`


Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setTuningBank(value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |number||The desired tuning bank (1-128).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The bank value must be between 1 and 128.


### `.setTuningProgram(...)`


Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.


  **Parameters**

  > Signature: `setTuningProgram(value, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |number||The desired tuning program (1-128).|
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.


**Throws**:
  * `RangeError` : The program value must be between 1 and 128.


### `.stopNote(...)`


This is an alias to the [sendNoteOff()](#OutputChannel+sendNoteOff) method.


  **Parameters**

  > Signature: `stopNote(note, options)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** ||||
    |**`options`** ||||


**Returns**: `Output`



### `.suspendEvent(...)`


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to suspend execution of all callback functions.|






### `.turnNotesOff(...)`


Sends an **all notes off** channel mode message. This will make all currently playing notes
fade out just as if their key had been released. This is different from the
[turnSoundOff()](#OutputChannel+turnSoundOff) method which mutes all sounds immediately.


  **Parameters**

  > Signature: `turnNotesOff([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




### `.turnSoundOff(...)`


Sends an **all sound off** channel mode message. This will silence all sounds playing on that
channel but will not prevent new sounds from being triggered.


  **Parameters**

  > Signature: `turnSoundOff([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|{}||
    |[**`options.time`**] |number||If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](WebMidi#time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible.|


**Returns**: `OutputChannel`
> Returns the `OutputChannel` object so methods can be chained.




### `.unsuspendEvent(...)`


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to resume execution of all callback functions.|






### `.waitFor(...)`

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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to wait for|
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds to wait before the promise is automatically rejected.|






### `.buildNote(...)`

**Since**: version 3.0.0<br />

Converts the `input` parameter to a valid [Note](Note) object. The input usually is an unsigned
integer (0-127) or a note identifier (`"C4"`, `"G#5"`, etc.). If the input is a [Note](Note)
object, it will be returned as is.

If the input is a note number or identifier, it is possible to specify options by providing the
`options` parameter.


  **Parameters**

  > Signature: `buildNote([input], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`input`**] |number|||
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the note should be explicitly stopped.|
    |[**`options.attack`**] |number|64|The note's attack velocity as an integer between 0 and 127.|
    |[**`options.release`**] |number|64|The note's release velocity as an integer between 0 and 127.|
    |[**`options.octaveOffset`**] |number|0|An integer to offset the octave by. **This is only used when the input value is a note identifier.**|


**Returns**: `Note`

**Attributes**: static

**Throws**:
  * TypeError The input could not be parsed to a note


### `.buildNoteArray(...)`

**Since**: 3.0.0<br />

Converts an input value, which can be an unsigned integer (0-127), a note identifier, a
[Note](Note) object or an array of the previous types, to an array of [Note](Note) objects.

[Note](Note) objects are returned as is. For note numbers and identifiers, a [Note](Note)
object is created with the options specified. An error will be thrown when encountering invalid
input.


  **Parameters**

  > Signature: `buildNoteArray([notes], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`notes`**] |number|||
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the note should be explicitly stopped.|
    |[**`options.attack`**] |number|0.5|The note's attack velocity as a decimal number between 0 and 1.|
    |[**`options.release`**] |number|0.5|The note's release velocity as a decimal number between 0 and 1.|
    |[**`options.rawAttack`**] |number|64|The note's attack velocity as an integer between 0 and 127.|
    |[**`options.rawRelease`**] |number|64|The note's release velocity as an integer between 0 and 127.|
    |[**`options.octaveOffset`**] |number|0|An integer to offset the octave by. **This is only used when the input value is a note identifier.**|


**Returns**: `Array.<Note>`

**Attributes**: static

**Throws**:
  * TypeError An element could not be parsed as a note.


### `.getNoteDetails(...)`

**Since**: 3.0.0<br />

Given a proper note identifier ("C#4", "Gb-1", etc.) or a valid MIDI note number (9-127), this
method returns an object containing broken down details about the specified note (uppercase
letter, accidental and octave).

When a number is specified, the translation to note is done using a value of 60 for middle C
(C4 = middle C).


  **Parameters**

  > Signature: `getNoteDetails(value)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |string||A note identifier A  atring ("C#4", "Gb-1", etc.) or a MIDI note number (0-127).|


**Returns**: `Object`

**Attributes**: static

**Throws**:
  * TypeError Invalid note identifier


### `.getPropertyByValue(...)`


Returns the name of the first property of the supplied object whose value is equal to the one
supplied.


  **Parameters**

  > Signature: `getPropertyByValue(object, value)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`object`** |Object|||
    |**`value`** |*|||


**Returns**: `string`
> The name of the matching property


**Attributes**: static



### `.guessNoteNumber(...)`

**Since**: 3.0.0<br />

Returns a valid MIDI note number (0-127) given the specified input. The input usually is a
string containing a note identifier (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer
between 0 and 127 is passed, it will simply be returned as is (for convenience). Other strings
will be parsed for integer value, if possible.

If the input is an identifier, the resulting note number is offset by the `octaveOffset`
parameter. For example, if you pass in "C4" (note number 60) and the `octaveOffset` value is
-2, the resulting MIDI note number will be 36.


  **Parameters**

  > Signature: `guessNoteNumber(input)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`input`** |string||A string or number to extract the MIDI note number from.|


**Returns**: `number` or `false`
> A valid MIDI note number (0-127) or `false` if the input could not
successfully be parsed to a note number.


**Attributes**: static



### `.offsetNumber(...)`


Returns the supplied MIDI note number offset by the requested octave and semitone values. If
the calculated value is less than 0, 0 will be returned. If the calculated value is more than
127, 127 will be returned. If an invalid offset value is supplied, 0 will be used.


  **Parameters**

  > Signature: `offsetNumber(offset)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`offset`** ||||


**Returns**: `number`
> An integer between 0 and 127


**Attributes**: static

**Throws**:
  * `Error` : Invalid note number


### `.sanitizeChannels(...)`

**Since**: 3.0.0<br />

Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be a
single integer or an array of integers.

For backwards-compatibility, passing `undefined` as a parameter to this method results in all
channels being returned (1-16). Otherwise, parameters that cannot successfully be parsed to
integers between 1 and 16 are silently ignored.


  **Parameters**

  > Signature: `sanitizeChannels([channel])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`channel`**] |number||An integer or an array of integers to parse as channel numbers.|


**Returns**: `Array`
> An array of 0 or more valid MIDI channel numbers.


**Attributes**: static



### `.to7Bit(...)`


Returns a number between 0 and 127 which is the result of multiplying the input value by 127.
The input value should be number between 0 and 1 (inclusively). The returned value is
restricted between 0 and 127 even if the input is greater than 1 or smaller than 0.

Passing `Infinity` will return `127` and passing `-Infinity` will return `0`. Otherwise, when
the input value cannot be converted to a number, the method returns 0.


  **Parameters**

  > Signature: `to7Bit(value)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |||A positive integer between 0 and 127 (inclusive)|


**Returns**: `number`
> A number between 0 and 1 (inclusive)


**Attributes**: static



### `.toNormalized(...)`


Returns a number between 0 and 1 representing the ratio of the input value divided by 127 (7
bit). The returned value is restricted between 0 and 1 even if the input is greater than 127 or
smaller than 0.

Passing `Infinity` will return `1` and passing `-Infinity` will return `0`. Otherwise, when the
input value cannot be converted to an integer, the method returns 0.


  **Parameters**

  > Signature: `toNormalized(value)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`value`** |||A positive integer between 0 and 127 (inclusive)|


**Returns**: `number`
> A number between 0 and 1 (inclusive)


**Attributes**: static



### `.toNoteIdentifier(...)`

**Since**: 3.0.0<br />

Returns an identifier string representing a note name (with optional accidental) followed by an
octave number. The octave can be offset by using the `octaveOffset` parameter.


  **Parameters**

  > Signature: `toNoteIdentifier(number, octaveOffset)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** |number||The MIDI note number to convert to a note identifier|
    |**`octaveOffset`** |number||An offset to apply to the resulting octave|


**Returns**: `string`

**Attributes**: static

**Throws**:
  * RangeError Invalid note number
  * RangeError Invalid octaveOffset value


### `.toNoteNumber(...)`

**Since**: 3.0.0<br />

Returns a MIDI note number matching the identifier passed in the form of a string. The
identifier must include the octave number. The identifier also optionally include a sharp (#),
a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
identifiers: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.

When converting note identifiers to numbers, C4 is considered to be middle C (MIDI note number
60) as per the scientific pitch notation standard.

The resulting note number can be offset by using the `octaveOffset` parameter.


  **Parameters**

  > Signature: `toNoteNumber(identifier, [octaveOffset])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`identifier`** |string||The identifier in the form of a letter, followed by an optional "#", "##", "b" or "bb" followed by the octave number. For exemple: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.|
    |[**`octaveOffset`**] |number|0|A integer to offset the octave by.|


**Returns**: `number`
> The MIDI note number (an integer between 0 and 127).


**Attributes**: static

**Throws**:
  * RangeError Invalid 'octaveOffset' value
  * TypeError Invalid note identifier


### `.toTimestamp(...)`

**Since**: 3.0.0<br />

Returns a valid timestamp, relative to the navigation start of the document, derived from the
`time` parameter. If the parameter is a string starting with the "+" sign and followed by a
number, the resulting timestamp will be the sum of the current timestamp plus that number. If
the parameter is a positive number, it will be returned as is. Otherwise, false will be
returned.


  **Parameters**

  > Signature: `toTimestamp([time])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`time`**] |number||The time string (e.g. `"+2000"`) or number to parse|


**Returns**: `number` or `false`
> A positive number or `false` (if the time cannot be converted)


**Attributes**: static



### `.addListener(...)`


Adds a listener for the specified event. It returns the [**Listener**](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The value of `this` in the callback function.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] |boolean|Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)`


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The context to invoke the callback function in.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.disable()`

**Since**: 2.0.0<br />
**Attributes**: async

Completely disables **WebMidi.js** by unlinking the MIDI subsystem's interface and closing all
[`Input`](Input) and [`Output`](Output) objects that may have been opened. This also means that
listeners added to [`Input`](Input) objects, [`Output`](Output) objects or to `WebMidi` itself
are also destroyed.


**Returns**: `Promise`

**Throws**:
  * `Error` : The Web MIDI API is not supported by your environment.


### `.emit(...)`


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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|
    |**`args`** |*||Arbitrary number of arguments to pass along to the callback functions|


**Returns**: `Array`
> An array containing the return value of each of the executed listener
functions


**Throws**:
  * `TypeError` : The `event` parameter must be a string.


### `.enable(...)`

**Attributes**: async

Checks if the Web MIDI API is available in the current environment and then tries to connect to
the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
be displayed to the user.

To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
`true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
and system exclusive messages are always enabled. You can check the
[`sysexEnabled`](#sysexEnabled) property to confirm.

To enable access to software synthesizers available on the host, you would set the `software`
option to `true`. However, this option is only there to future-proof the library as support for
software synths has not yet been implemented in any browser (as of September 2021).

By the way, if you call the [`enable()`](#enable) method while WebMidi.js is already enabled,
the callback function will be executed (if any), the promise will resolve but the events
([`"midiaccessgranted"`](#event:midiaccessgranted), [`"connected"`](#event:connected) and
[`"enabled"`](#event:enabled)) will not be fired.

There are 3 ways to execute code after `WebMidi` has been enabled:

- Pass a callback function in the `options`
- Listen to the [`"enabled"`](#event:enabled) event
- Wait for the promise to resolve

In order, this is what happens towards the end of the enabling process:

1. [`"midiaccessgranted"`](#event:midiaccessgranted) event is triggered
2. [`"connected"`](#event:connected) events are triggered (for each available input and output)
3. [`"enabled"`](#event:enabled) event is triggered when WebMidi.js is ready
4. specified callback (if any) is executed
5. promise is resolved and fulfilled with the `WebMidi` object.

**Important note**: starting with Chrome v77, a page using Web MIDI API must be hosted on a
secure origin (`https://`, `localhost` or `file:///`) and the user will always be prompted to
authorize the operation (no matter if the `sysex` option is `true` or not).

##### Example
```js
// Enabling WebMidi and using the promise
WebMidi.enable().then(ports => {
  console.log("WebMidi.js has been enabled!");
  console.log("Inputs: ", ports.inputs);
  console.log("Outputs: ", ports.outputs);
})
```


  **Parameters**

  > Signature: `enable([options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|||
    |[**`options.callback`**] |function||A function to execute once the operation completes. This function will receive an `Error` object if enabling the Web MIDI API failed.|
    |[**`options.sysex`**] |boolean|false|Whether to enable MIDI system exclusive messages or not.|
    |[**`options.validation`**] |boolean|true|Whether to enable library-wide validation of method arguments and setter values. This is an advanced setting that should be used carefully. Setting [`validation`](#validation) to `false` improves performance but should only be done once the project has been thoroughly tested with [`validation`](#validation)  turned on.|
    |[**`options.software`**] |boolean|false|Whether to request access to software synthesizers on the host system. This is part of the spec but has not yet been implemented by most browsers as of April 2020.|


**Returns**: `Promise.<WebMidi>`
> The promise is fulfilled with the `WebMidi` object fro
chainability


**Throws**:
  * `Error` : The Web MIDI API is not supported in your environment.
  * `Error` : Jazz-Plugin must be installed to use WebMIDIAPIShim.


### `.getInputById(...)`

**Since**: 2.0.0<br />

Returns the [`Input`](Input) object that matches the specified ID string or `false` if no
matching input is found. As per the Web MIDI API specification, IDs are strings (not integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.


  **Parameters**

  > Signature: `getInputById(id)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`id`** |string||The ID string of the input. IDs can be viewed by looking at the [`WebMidi.inputs`](WebMidi#inputs) array. Even though they sometimes look like integers, IDs are strings.|


**Returns**: `Input` or `false`
> An [`Input`](Input) object matching the specified ID string or `false`
if no matching input can be found.


**Throws**:
  * `Error` : WebMidi is not enabled.


### `.getInputByName(...)`

**Since**: 2.0.0<br />

Returns the first [`Input`](Input) object whose name **contains** the specified string. Note
that the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.


  **Parameters**

  > Signature: `getInputByName(name)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`name`** |string||The non-empty string to look for within the name of MIDI inputs (such as those visible in the [inputs](WebMidi#inputs) array).|


**Returns**: `Input` or `false`
> The [`Input`](Input) that was found or `false` if no input contained the
specified name.


**Throws**:
  * `Error` : WebMidi is not enabled.


### `.getListenerCount(...)`


Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListenerCount(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|


**Returns**: `number`
> The number of listeners registered for the specified event.




### `.getListeners(...)`


Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListeners(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to get listeners for|


**Returns**: `Array.<Listener>`
> An array of `Listener` objects




### `.getOutputById(...)`

**Since**: 2.0.0<br />

Returns the [`Output`](Output) object that matches the specified ID string or `false` if no
matching output is found. As per the Web MIDI API specification, IDs are strings (not
integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.


  **Parameters**

  > Signature: `getOutputById(id)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`id`** |string||The ID string of the port. IDs can be viewed by looking at the [`WebMidi.outputs`](WebMidi#outputs) array.|


**Returns**: `Output` or `false`
> An [`Output`](Output) object matching the specified ID string. If no
matching output can be found, the method returns `false`.


**Throws**:
  * `Error` : WebMidi is not enabled.


### `.getOutputByName(...)`

**Since**: 2.0.0<br />

Returns the first [`Output`](Output) object whose name **contains** the specified string. Note
that the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.


  **Parameters**

  > Signature: `getOutputByName(name)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`name`** |string||The non-empty string to look for within the name of MIDI inputs (such as those visible in the [outputs](WebMidi#outputs) array).|


**Returns**: `Output` or `false`
> The [`Output`](Output) that was found or `false` if no output matched
the specified name.


**Throws**:
  * `Error` : WebMidi is not enabled.


### `.hasListener(...)`


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event to check|
    |[**`callback`**] |function||The actual function that was added to the event or the [Listener](Listener) object returned by `addListener()`.|


**Returns**: `boolean`



### `.removeListener(...)`


Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.


  **Parameters**

  > Signature: `removeListener([event], [callback], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event name.|
    |[**`callback`**] |EventEmitter~callback||Only remove the listeners that match this exact callback function.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |*||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] |number||Only remove the listener if it has exactly that many remaining times to be executed.|






### `.suspendEvent(...)`


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to suspend execution of all callback functions.|






### `.unsuspendEvent(...)`


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to resume execution of all callback functions.|






### `.waitFor(...)`

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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to wait for|
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds to wait before the promise is automatically rejected.|






***

## Events

### `"activesensing"`<a id="event:activesensing"></a>

Input-wide (system) event emitted when an **active sensing** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"activesensing"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"clock"`<a id="event:clock"></a>

Input-wide (system) event emitted when a **timing clock** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"clock"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"closed"`<a id="event:closed"></a>

Event emitted when the [Input](Input) has been closed by calling the [Input#close](Input#close)
method.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"closed"`|
  |**`target`** |Input|The object that triggered the event|


### `"continue"`<a id="event:continue"></a>

Input-wide (system) event emitted when a **continue** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"continue"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"disconnected"`<a id="event:disconnected"></a>

Event emitted when the [Input](Input) becomes unavailable. This event is typically fired
when the MIDI device is unplugged.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"disconnected"`|
  |**`target`** |Object|Object with properties describing the {@link Input} that triggered the event. This is not the actual `Input` as it is no longer available.|
  |**`target.connection`** |string|`"closed"`|
  |**`target.id`** |string|ID of the input|
  |**`target.manufacturer`** |string|Manufacturer of the device that provided the input|
  |**`target.name`** |string|Name of the device that provided the input|
  |**`target.state`** |string|`"disconnected"`|
  |**`target.type`** |string|`"input"`|


### `"midimessage"`<a id="event:midimessage"></a>

Event emitted when any MIDI message is received on an `Input`

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"midimessage"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array (deprecated, use the `message` object instead).|
  |**`event.statusByte`** |number|The message's status byte  (deprecated, use the `message` object instead).|
  |**`event.dataBytes`** |Array.&lt;number&gt;|The message's data bytes as an array of 0, 1 or 2 integers. This will be null for `sysex` messages (deprecated, use the `message` object instead).|


### `"opened"`<a id="event:opened"></a>

Event emitted when the [Input](Input) has been opened by calling the [Input#open](Input#open)
method.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"opened"`|
  |**`target`** |Input|The object that triggered the event|


### `"reset"`<a id="event:reset"></a>

Input-wide (system) event emitted when a **reset** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"reset"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"songposition"`<a id="event:songposition"></a>

Input-wide (system) event emitted when a **song position** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"songposition"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"songselect"`<a id="event:songselect"></a>

Input-wide (system) event emitted when a **song select** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"songselect"`|
  |**`song`** |string|Song (or sequence) number to select (1-128)|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"start"`<a id="event:start"></a>

Input-wide (system) event emitted when a **start** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"start"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"stop"`<a id="event:stop"></a>

Input-wide (system) event emitted when a **stop** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"stop"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"sysex"`<a id="event:sysex"></a>

Input-wide (system) event emitted when a **system exclusive** message has been received.
You should note that, to receive `sysex` events, you must call the `WebMidi.enable()`
method with the `sysex` option set to `true`:

```js
WebMidi.enable({sysex: true})
 .then(() => console.log("WebMidi has been enabled with sysex support."))
 .catch(err => console.log("WebMidi could not be enabled."))
```



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"sysex"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values.|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array.|


### `"timecode"`<a id="event:timecode"></a>

Input-wide (system) event emitted when a **time code quarter frame** message has been
received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"timecode"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"tunerequest"`<a id="event:tunerequest"></a>

Input-wide (system) event emitted when a **tune request** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"tunerequest"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"unknownmidimessage"`<a id="event:unknownmidimessage"></a>

Input-wide (system) event emitted when an unknown MIDI message has been received. It could
be, for example, one of the undefined/reserved messages.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"unknownmidimessage"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|


### `"allnotesoff"`<a id="event:allnotesoff"></a>

Event emitted when an "all notes off" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"allnotesoff"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `"allsoundoff"`<a id="event:allsoundoff"></a>

Event emitted when an "all sound off" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"allsoundoff"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `"channelaftertouch"`<a id="event:channelaftertouch"></a>

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


### `"controlchange"`<a id="event:controlchange"></a>

Event emitted when a **control change** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"controlchange"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |Object||
  |**`controller.number`** |Object|The number of the controller.|
  |**`controller.name`** |Object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `"keyaftertouch"`<a id="event:keyaftertouch"></a>

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


### `"localcontrol"`<a id="event:localcontrol"></a>

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


### `"midimessage"`<a id="event:midimessage"></a>

Event emitted when a MIDI message of any kind is received by an `InputChannel`



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |Input|The `InputChannel` that triggered the event.|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"midimessage"`|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead).|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead).|
  |**`event.statusByte`** |number|The message's status byte  (deprecated, use the `message` object instead).|
  |**`event.dataBytes`** |Array.&lt;number&gt;|The message's data bytes as an array of 0, 1 or 2 integers. This will be null for `sysex` messages (deprecated, use the `message` object instead).|


### `"monomode"`<a id="event:monomode"></a>

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


### `"noteoff"`<a id="event:noteoff"></a>

Event emitted when a **note off** MIDI message has been received on the channel.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"noteoff"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`note`** |Object|A [`Note`](Note) object containing information such as note name, octave and release velocity.|
  |**`value`** |number|The release velocity amount expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The release velocity amount expressed as an integer (between 0 and 127).|


### `"noteon"`<a id="event:noteon"></a>

Event emitted when a **note on** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"noteon"`|
  |**`channel`** |InputChannel|The `InputChannel` object that triggered the event.|
  |**`event.data`** |Array|The MIDI message as an array of 8 bit values.|
  |**`input`** |InputChannel|The [`Input`](Input) object where through which the message was received.|
  |**`event.rawData`** |Uint8Array|The raw MIDI message as a `Uint8Array`.|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`note`** |Note|A [`Note`](Note) object containing information such as note name, octave and attack velocity.|
  |**`value`** |number|The attack velocity amount expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The attack velocity amount expressed as an integer (between 0 and 127).|


### `"nrpndatabuttondecrement"`<a id="event:nrpndatabuttondecrement"></a>

Event emitted when a 'databuttondecrement' NRPN message has been received on the input.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"nrpndatabuttondecrement"`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |number|The non-registered parameter number (0-16383)|
  |**`parameterMsb`** |number|The MSB portion of the non-registered parameter number (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the non-registered parameter number (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"nrpndatabuttonincrement"`<a id="event:nrpndatabuttonincrement"></a>

Event emitted when a 'databuttonincrement' NRPN message has been received on the input.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"nrpndatabuttonincrement"`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |number|The non-registered parameter number (0-16383)|
  |**`parameterMsb`** |number|The MSB portion of the non-registered parameter number (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the non-registered parameter number (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"nrpndataentrycoarse"`<a id="event:nrpndataentrycoarse"></a>

Event emitted when a 'dataentrycoarse' NRPN message has been received on the input.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"nrpndataentrycoarse"`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |number|The non-registered parameter number (0-16383)|
  |**`parameterMsb`** |number|The MSB portion of the non-registered parameter number (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the non-registered parameter number (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"nrpndataentryfine"`<a id="event:nrpndataentryfine"></a>

Event emitted when a 'dataentryfine' NRPN message has been received on the input.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"nrpndataentryfine"`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |number|The non-registered parameter number (0-16383)|
  |**`parameterMsb`** |number|The MSB portion of the non-registered parameter number (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the non-registered parameter number (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"omnimode"`<a id="event:omnimode"></a>

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


### `"pitchbend"`<a id="event:pitchbend"></a>

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


### `"programchange"`<a id="event:programchange"></a>

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


### `"resetallcontrollers"`<a id="event:resetallcontrollers"></a>

Event emitted when a "reset all controllers" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"resetallcontrollers"`|
  |**`target`** |InputChannel|The object that triggered the event (the `InputChannel` object).|
  |**`message`** |Message|A `Message` object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `"rpndatabuttondecrement"`<a id="event:rpndatabuttondecrement"></a>

Event emitted when a 'databuttondecrement' RPN message has been received on the input.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"rpndatabuttondecrement"`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"rpndatabuttonincrement"`<a id="event:rpndatabuttonincrement"></a>

Event emitted when a 'databuttonincrement' RPN message has been received on the input.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"rpndatabuttonincrement"`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"rpndataentrycoarse"`<a id="event:rpndataentrycoarse"></a>

Event emitted when a 'dataentrycoarse' RPN message has been received on the input.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"rpndataentrycoarse"`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"rpndataentryfine"`<a id="event:rpndataentryfine"></a>

Event emitted when a 'dataentryfine' RPN message has been received on the input.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"rpndataentryfine"`|
  |**`target`** |InputChannel|The `InputChannel` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `"closed"`<a id="event:closed"></a>

Event emitted when the [Output](Output) has been closed by calling the
[close()](Output#close) method.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"closed"`|
  |**`target`** |Output|The object that triggered the event|


### `"disconnected"`<a id="event:disconnected"></a>

Event emitted when the [Output](Output) becomes unavailable. This event is typically fired
when the MIDI device is unplugged.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp0 when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"disconnected"`|
  |**`target`** |Object|Object with properties describing the {@link Output} that triggered the event. This is not the actual `Output` as it is no longer available.|
  |**`target.connection`** |string|`"closed"`|
  |**`target.id`** |string|ID of the input|
  |**`target.manufacturer`** |string|Manufacturer of the device that provided the input|
  |**`target.name`** |string|Name of the device that provided the input|
  |**`target.state`** |string|`"disconnected"`|
  |**`target.type`** |string|`"output"`|


### `"opened"`<a id="event:opened"></a>

Event emitted when the [Output](Output) has been opened by calling the
[open()](Output#open) method.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"opened"`|
  |**`target`** |Output|The object that triggered the event|


### `"connected"`<a id="event:connected"></a>

Event emitted when an [`Input`](Input) or [`Output`](Output) becomes available. This event is
typically fired whenever a MIDI device is plugged in. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"connected"`|
  |**`target`** |Input|The [`Input`](Input) or [`Output`](Output) object that triggered the event.|


### `"disabled"`<a id="event:disabled"></a>

Event emitted once `WebMidi` has been successfully disabled.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`"disabled"`|


### `"disconnected"`<a id="event:disconnected"></a>

Event emitted when an [`Input`](Input) or [`Output`](Output) becomes unavailable. This event
is typically fired whenever a MIDI device is unplugged. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"disconnected"`|
  |**`target`** |Object|Object with properties describing the [`Input`](Input) or [`Output`](Output) that triggered the event.|
  |**`target.connection`** |string|`"closed"`|
  |**`target.id`** |string|ID of the input|
  |**`target.manufacturer`** |string|Manufacturer of the device that provided the input|
  |**`target.name`** |string|Name of the device that provided the input|
  |**`target.state`** |string|`disconnected`|
  |**`target.type`** |string|`input` or `output`|


### `"enabled"`<a id="event:enabled"></a>

Event emitted once `WebMidi` has been fully enabled



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`"enabled"`|


### `"error"`<a id="event:error"></a>

Event emitted when an error occurs trying to enable `WebMidi`



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`error`|
  |**`error`** |*|Actual error that occurred|


### `"midiaccessgranted"`<a id="event:midiaccessgranted"></a>

Event emitted once the MIDI interface has been successfully created.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`midiaccessgranted`|



***

## Enums

### `.MIDI_CHANNEL_MESSAGES`
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of all MIDI channel messages and their associated 4-bit numerical value:

- `noteoff`: 0x8 (8)
- `noteon`: 0x9 (9)
- `keyaftertouch`: 0xA (10)
- `controlchange`: 0xB (11)
- `nrpn`: 0xB (11)
- `programchange`: 0xC (12)
- `channelaftertouch`: 0xD (13)
- `pitchbend`: 0xE (14)
### `.MIDI_CHANNEL_MODE_MESSAGES`
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of all channel mode messages and their associated numerical value:

- `allsoundoff`: 120
- `resetallcontrollers`: 121
- `localcontrol`: 122
- `allnotesoff`: 123
- `omnimodeoff`: 124
- `omnimodeon`: 125
- `monomodeon`: 126
- `polymodeon`: 127
### `.MIDI_CONTROL_CHANGE_MESSAGES`
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of most control change messages and their associated numerical value. Note that
some control change numbers do not have a predefined purpose and are absent from this list.

- `bankselectcoarse`: 0
- `modulationwheelcoarse`: 1
- `breathcontrollercoarse`: 2
- `footcontrollercoarse`: 4
- `portamentotimecoarse`: 5
- `dataentrycoarse`: 6
- `volumecoarse`: 7
- `balancecoarse`: 8
- `pancoarse`: 10
- `expressioncoarse`: 11
- `effectcontrol1coarse`: 12
- `effectcontrol2coarse`: 13
- `generalpurposeslider1`: 16
- `generalpurposeslider2`: 17
- `generalpurposeslider3`: 18
- `generalpurposeslider4`: 19
- `bankselectfine`: 32
- `modulationwheelfine`: 33
- `breathcontrollerfine`: 34
- `footcontrollerfine`: 36
- `portamentotimefine`: 37
- `dataentryfine`: 38
- `volumefine`: 39
- `balancefine`: 40
- `panfine`: 42
- `expressionfine`: 43
- `effectcontrol1fine`: 44
- `effectcontrol2fine`: 45
- `holdpedal`: 64
- `portamento`: 65
- `sustenutopedal`: 66
- `softpedal`: 67
- `legatopedal`: 68
- `hold2pedal`: 69
- `soundvariation`: 70
- `resonance`: 71
- `soundreleasetime`: 72
- `soundattacktime`: 73
- `brightness`: 74
- `soundcontrol6`: 75
- `soundcontrol7`: 76
- `soundcontrol8`:`77
- `soundcontrol9`: 78
- `soundcontrol10`: 79
- `generalpurposebutton1`: 80
- `generalpurposebutton2`: 81
- `generalpurposebutton3`: 82
- `generalpurposebutton4`: 83
- `reverblevel`: 91
- `tremololevel`: 92
- `choruslevel`: 93
- `celestelevel`: 94
- `phaserlevel`: 95
- `databuttonincrement`: 96
- `databuttondecrement`: 97
- `nonregisteredparametercoarse`: 98
- `nonregisteredparameterfine`: 99
- `registeredparametercoarse`: 100
- `registeredparameterfine`: 101

- `allsoundoff`: 120
- `resetallcontrollers`: 121
- `localcontrol`: 122
- `allnotesoff`: 123
- `omnimodeoff`: 124
- `omnimodeon`: 125
- `monomodeon`: 126
- `polymodeon`: 127
### `.MIDI_REGISTERED_PARAMETERS`
**Type**: Object.&lt;string, Array.&lt;number&gt;&gt;<br />
**Attributes**: static

Enumeration of all registered parameters and their associated pair of numerical values. MIDI
registered parameters extend the original list of control change messages. Currently, there are
only a limited number of them:

- `pitchbendrange`: [0x00, 0x00]
- `channelfinetuning`: [0x00, 0x01]
- `channelcoarsetuning`: [0x00, 0x02]
- `tuningprogram`: [0x00, 0x03]
- `tuningbank`: [0x00, 0x04]
- `modulationrange`: [0x00, 0x05]
- `azimuthangle`: [0x3D, 0x00]
- `elevationangle`: [0x3D, 0x01]
- `gain`: [0x3D, 0x02]
- `distanceratio`: [0x3D, 0x03]
- `maximumdistance`: [0x3D, 0x04]
- `maximumdistancegain`: [0x3D, 0x05]
- `referencedistanceratio`: [0x3D, 0x06]
- `panspreadangle`: [0x3D, 0x07]
- `rollangle`: [0x3D, 0x08]
### `.MIDI_SYSTEM_MESSAGES`
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of all valid MIDI system messages and matching numerical values. WebMidi.js also
uses two custom messages.

**System common messages**
- `sysex`: 0xF0 (240)
- `timecode`: 0xF1 (241)
- `songposition`: 0xF2 (242)
- `songselect`: 0xF3 (243)
- `tunerequest`: 0xF6 (246)
- `sysexend`: 0xF7 (247)

The `sysexend` message is never actually received. It simply ends a sysex stream.

**System real-time messages**

- `clock`: 0xF8 (248)
- `start`: 0xFA (250)
- `continue`: 0xFB (251)
- `stop`: 0xFC (252)
- `activesensing`: 0xFE (254)
- `reset`: 0xFF (255)

Values 249 and 253 are actually relayed by the Web MIDI API but they do not serve a specific
purpose. The
[MIDI 1.0 spec](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
simply states that they are undefined/reserved.

**Custom WebMidi.js messages**

- `midimessage`: 0
- `unknownsystemmessage`: -1

