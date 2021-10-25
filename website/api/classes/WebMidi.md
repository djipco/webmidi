
# WebMidi

The `WebMidi` object makes it easier to work with the low-level Web MIDI API. Basically, it
simplifies sending outgoing MIDI messages and reacting to incoming MIDI messages.

When using the WebMidi.js library, you should know that the `WebMidi` class has already been
instantiated. You cannot instantiate it yourself. If you use the **IIFE** version, you should
simply use the global object called `WebMidi`. If you use the **CJS** (CommonJS) or **ESM** (ES6
module) version, you get an already-instantiated object when you import the module.


**Extends**: EventEmitter

**Fires**: [`connected`](WebMidi#event:connected), [`disabled`](WebMidi#event:disabled), [`disconnected`](WebMidi#event:disconnected), [`enabled`](WebMidi#event:enabled), [`midiaccessgranted`](WebMidi#event:midiaccessgranted)
***

## Properties

### `.defaults` {#defaults}


Object containing system-wide default values that can be changed to customize how the library
works.

**Type**: object<br />


  **Properties**

  | Property     | Type         | Description  |
  | ------------ | ------------ | ------------ |
    |**`defaults.note`** |object|Default values relating to note|
    |**`defaults.note.attack`** |number|A number between 0 and 127 representing the default attack velocity of notes. Initial value is 64.|
    |**`defaults.note.release`** |number|A number between 0 and 127 representing the default release velocity of notes. Initial value is 64.|
    |**`defaults.note.duration`** |number|A number representing the default duration of notes (in seconds). Initial value is Infinity.|


### `.enabled` {#enabled}


Indicates whether access to the host's MIDI subsystem is active or not.

**Type**: boolean<br />
**Attributes**: read-only<br />


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


### `.inputs` {#inputs}


An array of all currently available MIDI inputs.

**Type**: Array<br />
**Attributes**: read-only<br />


### `.interface` {#interface}


The [`MIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
instance used to talk to the lower-level Web MIDI API. This should not be used directly
unless you know what you are doing.

**Type**: MIDIAccess<br />
**Attributes**: read-only, nullable<br />


### `.isBrowser` {#isBrowser}


Indicates whether the current environment is a browser environment or not. If you need to check
if we are in Node.js, use [`isNode`](#isNode). In certain environments (such as Electron and
NW.js) [`isNode`](#isNode) and [`isBrowser`](#isBrowser) can both be true at the same time.

**Type**: boolean<br />


### `.isNode` {#isNode}


Indicates whether the current environment is Node.js or not. If you need to check if we are in
browser, use [`isBrowser`](#isBrowser). In certain environments (such as Electron and
NW.js) [`isNode`](#isNode) and [`isBrowser`](#isBrowser) can both be true at the
same time.

**Type**: boolean<br />


### `.octaveOffset` {#octaveOffset}

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


### `.outputs` {#outputs}


An array of all currently available MIDI outputs as [`Output`](Output) objects.

**Type**: Array<br />
**Attributes**: read-only<br />


### `.supported` {#supported}


Indicates whether the environment provides support for the Web MIDI API or not.

**Note**: in environments that do not offer built-in MIDI support, this will report `true` if
the
[`navigator.requestMIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
function is available. For example, if you have installed WebMIDIAPIShim.js but no plugin, this
property will be `true` even though actual support might not be there.

**Type**: boolean<br />
**Attributes**: read-only<br />


### `.sysexEnabled` {#sysexEnabled}


Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
enabled via the [`enable()`](#enable) method.

**Type**: boolean<br />
**Attributes**: read-only<br />


### `.time` {#time}


The elapsed time, in milliseconds, since the time
[origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).
Said simply, it is the number of milliseconds that passed since the page was loaded. Being a
floating-point number, it has sub-millisecond accuracy. According to the
[documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), the
time should be accurate to 5 µs (microseconds). However, due to various constraints, the
browser might only be accurate to one millisecond.

**Type**: DOMHighResTimeStamp<br />
**Attributes**: read-only<br />


### `.validation` {#validation}


Indicates whether argument validation and backwards-compatibility checks are performed
throughout the WebMidi.js library for object methods and property setters.

This is an advanced setting that should be used carefully. Setting `validation` to `false`
improves performance but should only be done once the project has been thoroughly tested with
`validation` turned on.

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


### `.disable()` {#disable}

**Since**: 2.0.0<br />
**Attributes**: async

Completely disables **WebMidi.js** by unlinking the MIDI subsystem's interface and closing all
[`Input`](Input) and [`Output`](Output) objects that may have been opened. This also means that
listeners added to [`Input`](Input) objects, [`Output`](Output) objects or to `WebMidi` itself
are also destroyed.


**Returns**: `Promise`

**Throws**:
  * `Error` : The Web MIDI API is not supported by your environment.


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


### `.enable(...)` {#enable}

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

1. [`"midiaccessgranted"`](#event:midiaccessgranted) event is triggered once the user has
granted access to use MIDI.
2. [`"connected"`](#event:connected) events are triggered (for each available input and output)
3. [`"enabled"`](#event:enabled) event is triggered when WebMidi.js is fully ready
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

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] | object<br /> |||
    |[**`options.callback`**] | function<br /> ||A function to execute once the operation completes. This function will receive an `Error` object if enabling the Web MIDI API failed.|
    |[**`options.sysex`**] | boolean<br /> |false|Whether to enable MIDI system exclusive messages or not.|
    |[**`options.validation`**] | boolean<br /> |true|Whether to enable library-wide validation of method arguments and setter values. This is an advanced setting that should be used carefully. Setting [`validation`](#validation) to `false` improves performance but should only be done once the project has been thoroughly tested with [`validation`](#validation)  turned on.|
    |[**`options.software`**] | boolean<br /> |false|Whether to request access to software synthesizers on the host system. This is part of the spec but has not yet been implemented by most browsers as of April 2020.|

  </div>


**Returns**: `Promise.<WebMidi>`
> The promise is fulfilled with the `WebMidi` object fro
chainability


**Throws**:
  * `Error` : The Web MIDI API is not supported in your environment.
  * `Error` : Jazz-Plugin must be installed to use WebMIDIAPIShim.


### `.getInputById(...)` {#getInputById}

**Since**: 2.0.0<br />

Returns the [`Input`](Input) object that matches the specified ID string or `false` if no
matching input is found. As per the Web MIDI API specification, IDs are strings (not integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.


  **Parameters**

  > Signature: `getInputById(id)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`id`** | string<br /> ||The ID string of the input. IDs can be viewed by looking at the [`WebMidi.inputs`](WebMidi#inputs) array. Even though they sometimes look like integers, IDs are strings.|

  </div>


**Returns**: `Input` or `false`
> An [`Input`](Input) object matching the specified ID string or `false`
if no matching input can be found.


**Throws**:
  * `Error` : WebMidi is not enabled.


### `.getInputByName(...)` {#getInputByName}

**Since**: 2.0.0<br />

Returns the first [`Input`](Input) object whose name **contains** the specified string. Note
that the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.


  **Parameters**

  > Signature: `getInputByName(name)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`name`** | string<br /> ||The non-empty string to look for within the name of MIDI inputs (such as those visible in the [inputs](WebMidi#inputs) array).|

  </div>


**Returns**: `Input` or `false`
> The [`Input`](Input) that was found or `false` if no input contained the
specified name.


**Throws**:
  * `Error` : WebMidi is not enabled.


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




### `.getOutputById(...)` {#getOutputById}

**Since**: 2.0.0<br />

Returns the [`Output`](Output) object that matches the specified ID string or `false` if no
matching output is found. As per the Web MIDI API specification, IDs are strings (not
integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.


  **Parameters**

  > Signature: `getOutputById(id)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`id`** | string<br /> ||The ID string of the port. IDs can be viewed by looking at the [`WebMidi.outputs`](WebMidi#outputs) array.|

  </div>


**Returns**: `Output` or `false`
> An [`Output`](Output) object matching the specified ID string. If no
matching output can be found, the method returns `false`.


**Throws**:
  * `Error` : WebMidi is not enabled.


### `.getOutputByName(...)` {#getOutputByName}

**Since**: 2.0.0<br />

Returns the first [`Output`](Output) object whose name **contains** the specified string. Note
that the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.


  **Parameters**

  > Signature: `getOutputByName(name)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`name`** | string<br /> ||The non-empty string to look for within the name of MIDI inputs (such as those visible in the [outputs](WebMidi#outputs) array).|

  </div>


**Returns**: `Output` or `false`
> The [`Output`](Output) that was found or `false` if no output matched
the specified name.


**Throws**:
  * `Error` : WebMidi is not enabled.


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

### `"connected"` {#event-connected}

<!--<a id="event:connected"></a>-->


Event emitted when an [`Input`](Input) or [`Output`](Output) becomes available. This event is
typically fired whenever a MIDI device is plugged in. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"connected"`|
  |**`target`** |Input|The [`Input`](Input) or [`Output`](Output) object that triggered the event.|


### `"disabled"` {#event-disabled}

<!--<a id="event:disabled"></a>-->


Event emitted once `WebMidi` has been successfully disabled.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`"disabled"`|


### `"disconnected"` {#event-disconnected}

<!--<a id="event:disconnected"></a>-->


Event emitted when an [`Input`](Input) or [`Output`](Output) becomes unavailable. This event
is typically fired whenever a MIDI device is unplugged. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`"disconnected"`|
  |**`target`** |object|Object with properties describing the [`Input`](Input) or [`Output`](Output) that triggered the event.|
  |**`target.connection`** |string|`"closed"`|
  |**`target.id`** |string|ID of the input|
  |**`target.manufacturer`** |string|Manufacturer of the device that provided the input|
  |**`target.name`** |string|Name of the device that provided the input|
  |**`target.state`** |string|`disconnected`|
  |**`target.type`** |string|`input` or `output`|


### `"enabled"` {#event-enabled}

<!--<a id="event:enabled"></a>-->


Event emitted once `WebMidi` has been fully enabled



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`"enabled"`|


### `"error"` {#event-error}

<!--<a id="event:error"></a>-->


Event emitted when an error occurs trying to enable `WebMidi`



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`error`|
  |**`error`** |*|Actual error that occurred|


### `"midiaccessgranted"` {#event-midiaccessgranted}

<!--<a id="event:midiaccessgranted"></a>-->


Event emitted once the MIDI interface has been successfully created (which implies user has
granted access to MIDI).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`midiaccessgranted`|



