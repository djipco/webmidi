# WebMidi

The `WebMidi` object makes it easier to work with the low-level Web MIDI API. Basically, it
simplifies sending outgoing MIDI messages and reacting to incoming MIDI messages.

When using the WebMidi.js library, you should know that the `WebMidi` class has already been
instantiated. You cannot instantiate it yourself. If you use the **IIFE** version, you should
simply use the global object called `WebMidi`. If you use the **CJS** (CommonJS) or **ESM** (ES6
module) version, you get an already-instantiated object.


**Extends**: EventEmitter

**Fires**: [`connected`](WebMidi#event:connected), [`disabled`](WebMidi#event:disabled), [`disconnected`](WebMidi#event:disconnected), [`enabled`](WebMidi#event:enabled), [`midiaccessgranted`](WebMidi#event:midiaccessgranted)


***

## Members

### `.defaults`

**Type**: Object<br />


Object containing system-wide default values that can be changed to customize how the library
works.


  **Properties**

  | Property     | Type         | Description  |
  | ------------ | ------------ | ------------ |
    |**`defaults.note`** |object|Default values relating to note|
    |**`defaults.note.attack`** |number|A number between 0 and 127 representing the default attack velocity of notes. Initial value is 64.|
    |**`defaults.note.release`** |number|A number between 0 and 127 representing the default release velocity of notes. Initial value is 64.|
    |**`defaults.note.duration`** |number|A number representing the default duration of notes (in seconds). Initial value is Infinity.|


### `.enabled`

**Type**: boolean<br />
**Attributes**: read-only<br />


Indicates whether access to the host's MIDI subsystem is active or not.


### `.inputs`

**Type**: Array<br />
**Attributes**: read-only<br />


An array of all currently available MIDI inputs.


### `.interface`

**Type**: MIDIAccess<br />
**Attributes**: read-only, nullable<br />


The `MIDIAccess` instance used to talk to the Web MIDI API. This should not be used directly
unless you know what you are doing.


### `.isBrowser`

**Type**: boolean<br />


Indicates whether the current environment is a browser environment or not. If you need to check
if we are in Node.js, use isNode. In certain environments (such as Electron and NW.js) isNode
and isBrowser can both be true at the same time.


### `.isNode`

**Type**: boolean<br />


Indicates whether the current environment is Node.js or not. If you need to check if we are in
browser, use isBrowser. In certain environments (such as Electron and NW.js) isNode and
isBrowser can both be true at the same time.


### `.octaveOffset`

**Type**: number<br />
**Since**: 2.1<br />


An integer to offset the octave of notes received from external devices or sent to external
devices.

When a MIDI message comes in on an input channel the reported note name will be offset. For
example, if the `octaveOffset` is set to `-1` and a **note on** message with MIDI number 60
comes in, the note will be reported as C3 (instead of C4).

By the same token, when `OutputChannel.playNote()` is called, the MIDI note number being sent
will be offset. If `octaveOffset` is set to `-1`, the MIDI note number sent will be 72 (instead
of 60).


### `.outputs`

**Type**: Array<br />
**Attributes**: read-only<br />


An array of all currently available MIDI outputs.


### `.supported`

**Type**: boolean<br />
**Attributes**: read-only<br />


Indicates whether the environment provides support for the Web MIDI API or not.

**Note**: in environments that do not offer built-in MIDI support, this will report `true` if
the `navigator.requestMIDIAccess` function is available. For example, if you have installed
WebMIDIAPIShim.js but no plugin, this property will be `true` even though actual support might
not be there.


### `.sysexEnabled`

**Type**: Boolean<br />
**Attributes**: read-only<br />


Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
enabled via the `enable()` method.


### `.time`

**Type**: DOMHighResTimeStamp<br />
**Attributes**: read-only<br />


The elapsed time, in milliseconds, since the time
[origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).
Said simply, it is the number of milliseconds that passed since the page was loaded. Being a
floating-point number, it has sub-millisecond accuracy. According to the
[documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), the
time should be accurate to 5 µs (microseconds). However, due to various constraints, the
browser might only be accurate to one millisecond.


### `.validation`

**Type**: boolean<br />


Indicates whether argument validation and backwards-compatibility checks are performed
throughout the WebMidi.js library for object methods and property setters.

This is an advanced setting that should be used carefully. Setting `validation` to `false`
improves performance but should only be done once the project has been thoroughly tested with
validation turned on.



***

## Methods

### `.disable()`

Completely disables `WebMidi.js` by unlinking the MIDI subsystem's interface and closing all
{@link Input} and {@link Output} objects that may be available. This also means that listeners
added to {@link Input} objects, {@link Output} objects or to `WebMidi` itself are also
destroyed.



**Returns: ** Promise.&lt;void&gt;<br />
**Since**: 2.0.0<br />

**Throws**:
  * `Error` : The Web MIDI API is not supported by your environment.

### `.enable(...)`

Checks if the Web MIDI API is available in the current environment and then tries to connect to
the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
be displayed to the user.

To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
`true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
and system exclusive messages are always enabled. You can check the
[sysexEnabled]{@link WebMidi#sysexEnabled} property to confirm.

To enable access to software synthesizers available on the host, you would set the `software`
option to `true`. However, this option is only there to future-proof the library as support for
software synths has not yet been implemented in any browser (as of September 2021).

There are 3 ways to execute code after `WebMidi` has been enabled:

- Pass a callback function in the `options`
- Listen to the `enabled` event
- Wait for the promise to resolve

In order, this is what happens towards the end of the enabling process:

1. `midiaccessgranted` event is triggered
2. `connected` events are triggered (for each available input and output)
3. `enabled` event is triggered when WebMidi.js is ready
4. specified callback (if any) is executed
5. promise is resolved

The promise is fulfilled with the WebMidi object.

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

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`options`**] |Object|||
    |[**`options.callback`**] |function||A function to execute once the operation completes. This function will receive an `Error` object if enabling the Web MIDI API failed.|
    |[**`options.sysex`**] |boolean|false|Whether to enable MIDI system exclusive messages or not.|
    |[**`options.validation`**] |boolean|true|Whether to enable library-wide validation of method arguments and setter values. This is an advanced setting that should be used carefully. Setting `validation` to `false` improves performance but should only be done once the project has been thoroughly tested with validation turned on.|
    |[**`options.software`**] |boolean|false|Whether to request access to software synthesizers on the host system. This is part of the spec but has not yet been implemented by most browsers as of April 2020.|



**Returns: ** Promise.&lt;Object&gt;<br />

**Throws**:
  * `Error` : The Web MIDI API is not supported in your environment.
  * `Error` : Jazz-Plugin must be installed to use WebMIDIAPIShim.

### `.getInputById(...)`

Returns the {@link Input} object that matches the specified ID string or `false` if no matching
input is found. As per the Web MIDI API specification, IDs are strings (not integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.


  **Parameters**

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`id`** |string||The ID string of the input. IDs can be viewed by looking at the [inputs]{@link WebMidi#inputs} array. Even though they sometimes look like integers, IDs are strings.|



**Returns: ** Input<br />
**Since**: 2.0.0<br />

**Throws**:
  * `Error` : WebMidi is not enabled.

### `.getInputByName(...)`

Returns the first {@link Input} object whose name **contains** the specified string. Note that
the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.


  **Parameters**

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`name`** |string||The non-empty string to look for within the name of MIDI inputs (such as those visible in the [inputs]{@link WebMidi#inputs} array).|



**Returns: ** Input<br />
**Since**: 2.0.0<br />

**Throws**:
  * `Error` : WebMidi is not enabled.

### `.getOutputById(...)`

Returns the {@link Output} object that matches the specified ID string or `false` if no
matching output is found. As per the Web MIDI API specification, IDs are strings (not
integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.


  **Parameters**

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`id`** |string||The ID string of the port. IDs can be viewed by looking at the [outputs]{@link WebMidi#outputs} array.|



**Returns: ** Output<br />
**Since**: 2.0.0<br />

**Throws**:
  * `Error` : WebMidi is not enabled.

### `.getOutputByName(...)`

Returns the first {@link Output} object whose name **contains** the specified string. Note that
the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.


  **Parameters**

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`name`** |string||The non-empty string to look for within the name of MIDI inputs (such as those visible in the [outputs]{@link WebMidi#outputs} array).|



**Returns: ** Output<br />
**Since**: 2.0.0<br />

**Throws**:
  * `Error` : WebMidi is not enabled.


***

## Events

  <h3 id="event:connected"><code>"connected"</code></h3>

Event emitted when an {@link Input} or {@link Output} becomes available. This event is
typically fired whenever a MIDI device is plugged in. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).



**Event Properties**

| Property     | Type         | Description  |
| ------------ | ------------ | ------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`connected`|
  |**`target`** |Input|The {@link Input} or {@link Output} object that triggered the event.|


  <h3 id="event:disabled"><code>"disabled"</code></h3>

Event emitted once `WebMidi` has been successfully disabled.



**Event Properties**

| Property     | Type         | Description  |
| ------------ | ------------ | ------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`disabled`|


  <h3 id="event:disconnected"><code>"disconnected"</code></h3>

Event emitted when an {@link Input} or {@link Output} becomes unavailable. This event is
typically fired whenever a MIDI device is unplugged. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).



**Event Properties**

| Property     | Type         | Description  |
| ------------ | ------------ | ------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`disconnected`|
  |**`target`** |Object|Object with properties describing the {@link Input} or {@Output} that triggered the event.|
  |**`target.connection`** |string|`"closed"`|
  |**`target.id`** |string|ID of the input|
  |**`target.manufacturer`** |string|Manufacturer of the device that provided the input|
  |**`target.name`** |string|Name of the device that provided the input|
  |**`target.state`** |string|`disconnected`|
  |**`target.type`** |string|`input` or `output`|


  <h3 id="event:enabled"><code>"enabled"</code></h3>

Event emitted once `WebMidi` has been fully enabled



**Event Properties**

| Property     | Type         | Description  |
| ------------ | ------------ | ------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`enabled`|


  <h3 id="event:error"><code>"error"</code></h3>

Event emitted when an error occurs trying to enable `WebMidi`



**Event Properties**

| Property     | Type         | Description  |
| ------------ | ------------ | ------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`error`|
  |**`error`** |*|Actual error that occurred|


  <h3 id="event:midiaccessgranted"><code>"midiaccessgranted"</code></h3>

Event emitted once the MIDI interface has been successfully created.



**Event Properties**

| Property     | Type         | Description  |
| ------------ | ------------ | ------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`midiaccessgranted`|



