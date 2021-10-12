
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
the `navigator.requestMIDIAccess` function is available. For example, if you have installed
WebMIDIAPIShim.js but no plugin, this property will be `true` even though actual support might
not be there.

**Type**: boolean<br />
**Attributes**: read-only<br />


### `.sysexEnabled`


Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
enabled via the `enable()` method.

**Type**: Boolean<br />
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
validation turned on.

**Type**: boolean<br />



***

## Methods


### `.disable()`

**Since**: 2.0.0<br />
**Attributes**: async

Completely disables `WebMidi.js` by unlinking the MIDI subsystem's interface and closing all
[`Input`](Input) and [`Output`](Output) objects that may be available. This also means that
listeners added to [`Input`](Input) objects, [`Output`](Output) objects or to `WebMidi` itself
are also destroyed.


**Returns**: `Promise.<void>`

**Throws**:
  * `Error` : The Web MIDI API is not supported by your environment.


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

There are 3 ways to execute code after `WebMidi` has been enabled:

- Pass a callback function in the `options`
- Listen to the `enabled` event
- Wait for the promise to resolve

In order, this is what happens towards the end of the enabling process:

1. `"midiaccessgranted"` event is triggered
2. `"connected"` events are triggered (for each available input and output)
3. `"enabled"` event is triggered when WebMidi.js is ready
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
> The promise is fulfilled with the `WebMidi` object


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


***

## Events

### `"connected"`<a id="event:connected"></a>

Event emitted when an [`Input`](Input) or [`Output`](Output) becomes available. This event is
typically fired whenever a MIDI device is plugged in. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`connected`|
  |**`target`** |Input|The [`Input`](Input) or [`Output`](Output) object that triggered the event.|


### `"disabled"`<a id="event:disabled"></a>

Event emitted once `WebMidi` has been successfully disabled.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`target`** |WebMidi|The object that triggered the event|
  |**`type`** |string|`disabled`|


### `"disconnected"`<a id="event:disconnected"></a>

Event emitted when an [`Input`](Input) or [`Output`](Output) becomes unavailable. This event
is typically fired whenever a MIDI device is unplugged. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |DOMHighResTimeStamp|The moment when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`disconnected`|
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
  |**`type`** |string|`enabled`|


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



