<a name="WebMidi"></a>

# WebMidi ⇐ <code>djipevents/EventEmitter</code>
The `WebMidi` object makes it easier to work with the low-level Web MIDI API. Basically, it
simplifies sending outgoing MIDI messages and reacting to incoming MIDI messages.

When using the WebMidi.js library, you should know that the `WebMidi` class has already been
instantiated. If you use the **IIFE** version, you should simply use the global object called
`WebMidi`. If you use the **CJS** (CommonJS) or **ESM** (ES6 module) version, you get an
already-instantiated object. This means there is no need to instantiate a new `WebMidi` object
directly.

<!--**Kind**: global class  
-->
**Extends**: <code>djipevents/EventEmitter</code>  
**Emits**: [<code>connected</code>](#WebMidi+event_connected), [<code>disabled</code>](#WebMidi+event_disabled), [<code>disconnected</code>](#WebMidi+event_disconnected), [<code>enabled</code>](#WebMidi+event_enabled), [<code>midiaccessgranted</code>](#WebMidi+event_midiaccessgranted)  
**License**: Apache-2.0  


* [WebMidi](#WebMidi) ⇐ <code>djipevents/EventEmitter</code>

    * [.defaults](#WebMidi+defaults) : <code>Object</code>

    * [.interface](#WebMidi+interface) : <code>MIDIAccess</code>

    * [.validation](#WebMidi+validation) : <code>boolean</code>

    * [.enabled](#WebMidi+enabled) : <code>boolean</code>

    * [.inputs](#WebMidi+inputs) : <code>Array</code>

    * [.isNode](#WebMidi+isNode) : <code>boolean</code>

    * [.isBrowser](#WebMidi+isBrowser) : <code>boolean</code>

    * [.octaveOffset](#WebMidi+octaveOffset) : <code>number</code>

    * [.outputs](#WebMidi+outputs) : <code>Array</code>

    * [.supported](#WebMidi+supported) : <code>boolean</code>

    * [.sysexEnabled](#WebMidi+sysexEnabled) : <code>Boolean</code>

    * [.time](#WebMidi+time) : <code>DOMHighResTimeStamp</code>

    * [.enable([options])](#WebMidi+enable) ⇒ <code>Promise.&lt;Object&gt;</code>

    * [.disable()](#WebMidi+disable) ⇒ <code>Promise.&lt;void&gt;</code>

    * [.getInputById(id)](#WebMidi+getInputById) ⇒ <code>Input</code> \| <code>false</code>

    * [.getInputByName(name)](#WebMidi+getInputByName) ⇒ <code>Input</code> \| <code>false</code>

    * [.getOutputByName(name)](#WebMidi+getOutputByName) ⇒ <code>Output</code> \| <code>false</code>

    * [.getOutputById(id)](#WebMidi+getOutputById) ⇒ <code>Output</code> \| <code>false</code>

    * ["error"](#WebMidi+event_error)

    * ["midiaccessgranted"](#WebMidi+event_midiaccessgranted)

    * ["enabled"](#WebMidi+event_enabled)

    * ["disabled"](#WebMidi+event_disabled)

    * ["connected"](#WebMidi+event_connected)

    * ["disconnected"](#WebMidi+event_disconnected)


* * *

<a name="WebMidi+defaults"></a>

## webMidi.defaults : <code>Object</code>
Object containing system-wide default values that can be changed to customize how the library
works.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| defaults.note | <code>object</code> | Default values relating to note |
| defaults.note.attack | <code>number</code> | A number between 0 and 127 representing the default attack velocity of notes. Initial value is 64. |
| defaults.note.release | <code>number</code> | A number between 0 and 127 representing the default release velocity of notes. Initial value is 64. |
| defaults.note.duration | <code>number</code> | A number representing the default duration of notes (in seconds). Initial value is Infinity. |


* * *

<a name="WebMidi+interface"></a>

## webMidi.interface : <code>MIDIAccess</code>
The `MIDIAccess` instance used to talk to the Web MIDI API. This should not be used directly
unless you know what you are doing.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  

* * *

<a name="WebMidi+validation"></a>

## webMidi.validation : <code>boolean</code>
Indicates whether argument validation and backwards-compatibility checks are performed
throughout the WebMidi.js library for object methods and property setters.

This is an advanced setting that should be used carefully. Setting `validation` to `false`
improves performance but should only be done once the project has been thoroughly tested with
validation turned on.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->

* * *

<a name="WebMidi+enabled"></a>

## webMidi.enabled : <code>boolean</code>
Indicates whether access to the host's MIDI subsystem is active or not.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  

* * *

<a name="WebMidi+inputs"></a>

## webMidi.inputs : <code>Array</code>
An array of all currently available MIDI inputs.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  

* * *

<a name="WebMidi+isNode"></a>

## webMidi.isNode : <code>boolean</code>
Indicates whether the current environment is Node.js or not. If you need to check if we are in
browser, use isBrowser. In certain environments (such as Electron and NW.js) isNode and
isBrowser can both be true at the same time.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->

* * *

<a name="WebMidi+isBrowser"></a>

## webMidi.isBrowser : <code>boolean</code>
Indicates whether the current environment is a browser environment or not. If you need to check
if we are in Node.js, use isNode. In certain environments (such as Electron and NW.js) isNode
and isBrowser can both be true at the same time.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->

* * *

<a name="WebMidi+octaveOffset"></a>

## webMidi.octaveOffset : <code>number</code>
An integer to offset the octave of notes received from external devices or sent to external
devices.

When a MIDI message comes in on an input channel the reported note name will be offset. For
example, if the `octaveOffset` is set to `-1` and a **note on** message with MIDI number 60
comes in, the note will be reported as C3 (instead of C4).

By the same token, when `OutputChannel.playNote()` is called, the MIDI note number being sent
will be offset. If `octaveOffset` is set to `-1`, the MIDI note number sent will be 72 (instead
of 60).

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Since**: 2.1  

* * *

<a name="WebMidi+outputs"></a>

## webMidi.outputs : <code>Array</code>
An array of all currently available MIDI outputs.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  

* * *

<a name="WebMidi+supported"></a>

## webMidi.supported : <code>boolean</code>
Indicates whether the environment provides support for the Web MIDI API or not.

**Note**: in environments that do not offer built-in MIDI support, this will report `true` if
the `navigator.requestMIDIAccess` function is available. For example, if you have installed
WebMIDIAPIShim.js but no plugin, this property will be `true` even though actual support might
not be there.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  

* * *

<a name="WebMidi+sysexEnabled"></a>

## webMidi.sysexEnabled : <code>Boolean</code>
Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
enabled via the `enable()` method.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  

* * *

<a name="WebMidi+time"></a>

## webMidi.time : <code>DOMHighResTimeStamp</code>
The elapsed time, in milliseconds, since the time
[origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).
Said simply, it is the number of milliseconds that passed since the page was loaded. Being a
floating-point number, it has sub-millisecond accuracy. According to the
[documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), the
time should be accurate to 5 µs (microseconds). However, due to various constraints, the
browser might only be accurate to one millisecond.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  

* * *

<a name="WebMidi+enable"></a>

## webMidi.enable([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Checks if the Web MIDI API is available in the current environment and then tries to connect to
the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
be displayed to the user.

To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
`true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
and system exclusive messages are always enabled. You can check the
[sysexEnabled](#WebMidi+sysexEnabled) property to confirm.

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

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Returns**: <code>Promise.&lt;Object&gt;</code> - The promise is fulfilled with the `WebMidi` object  
**Throws**:

- Error The Web MIDI API is not supported in your environment.
- Error Jazz-Plugin must be installed to use WebMIDIAPIShim.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.callback] | <code>function</code> |  | A function to execute once the operation completes. This function will receive an `Error` object if enabling the Web MIDI API failed. |
| [options.sysex] | <code>boolean</code> | <code>false</code> | Whether to enable MIDI system exclusive messages or not. |
| [options.validation] | <code>boolean</code> | <code>true</code> | Whether to enable library-wide validation of method arguments and setter values. This is an advanced setting that should be used carefully. Setting `validation` to `false` improves performance but should only be done once the project has been thoroughly tested with validation turned on. |
| [options.software] | <code>boolean</code> | <code>false</code> | Whether to request access to software synthesizers on the host system. This is part of the spec but has not yet been implemented by most browsers as of April 2020. |


* * *

<a name="WebMidi+disable"></a>

## webMidi.disable() ⇒ <code>Promise.&lt;void&gt;</code>
Completely disables `WebMidi.js` by unlinking the MIDI subsystem's interface and closing all
[Input](Input) and [Output](Output) objects that may be available. This also means that listeners
added to [Input](Input) objects, [Output](Output) objects or to `WebMidi` itself are also
destroyed.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Throws**:

- Error The Web MIDI API is not supported by your environment.

**Since**: 2.0.0  

* * *

<a name="WebMidi+getInputById"></a>

## webMidi.getInputById(id) ⇒ <code>Input</code> \| <code>false</code>
Returns the [Input](Input) object that matches the specified ID string or `false` if no matching
input is found. As per the Web MIDI API specification, IDs are strings (not integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Returns**: <code>Input</code> \| <code>false</code> - An [Input](Input) object matching the specified ID string. If no matching
input can be found, the method returns `false`.  
**Throws**:

- Error WebMidi is not enabled.

**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID string of the input. IDs can be viewed by looking at the [inputs](#WebMidi+inputs) array. Even though they sometimes look like integers, IDs are strings. |


* * *

<a name="WebMidi+getInputByName"></a>

## webMidi.getInputByName(name) ⇒ <code>Input</code> \| <code>false</code>
Returns the first [Input](Input) object whose name **contains** the specified string. Note that
the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Returns**: <code>Input</code> \| <code>false</code> - The [Input](Input) that was found or `false` if no input contained the
specified name.  
**Throws**:

- <code>Error</code> WebMidi is not enabled.

**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The non-empty string to look for within the name of MIDI inputs (such as those visible in the [inputs](#WebMidi+inputs) array). |


* * *

<a name="WebMidi+getOutputByName"></a>

## webMidi.getOutputByName(name) ⇒ <code>Output</code> \| <code>false</code>
Returns the first [Output](Output) object whose name **contains** the specified string. Note that
the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Returns**: <code>Output</code> \| <code>false</code> - The [Output](Output) that was found or `false` if no output matched the
specified name.  
**Throws**:

- Error WebMidi is not enabled.

**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The non-empty string to look for within the name of MIDI inputs (such as those visible in the [outputs](#WebMidi+outputs) array). |


* * *

<a name="WebMidi+getOutputById"></a>

## webMidi.getOutputById(id) ⇒ <code>Output</code> \| <code>false</code>
Returns the [Output](Output) object that matches the specified ID string or `false` if no
matching output is found. As per the Web MIDI API specification, IDs are strings (not
integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Returns**: <code>Output</code> \| <code>false</code> - An [Output](Output) object matching the specified ID string. If no
matching output can be found, the method returns `false`.  
**Throws**:

- Error WebMidi is not enabled.

**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID string of the port. IDs can be viewed by looking at the [outputs](#WebMidi+outputs) array. |


* * *

<a name="WebMidi+event_error"></a>

## "error"
Event emitted when an error occurs trying to enable `WebMidi`

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| target | [<code>WebMidi</code>](#WebMidi) | The object that triggered the event |
| type | <code>string</code> | `error` |
| error | <code>\*</code> | Actual error that occurred |


* * *

<a name="WebMidi+event_midiaccessgranted"></a>

## "midiaccessgranted"
Event emitted once the MIDI interface has been successfully created.

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| target | [<code>WebMidi</code>](#WebMidi) | The object that triggered the event |
| type | <code>string</code> | `midiaccessgranted` |


* * *

<a name="WebMidi+event_enabled"></a>

## "enabled"
Event emitted once `WebMidi` has been fully enabled

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| target | [<code>WebMidi</code>](#WebMidi) | The object that triggered the event |
| type | <code>string</code> | `enabled` |


* * *

<a name="WebMidi+event_disabled"></a>

## "disabled"
Event emitted once `WebMidi` has been successfully disabled.

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| target | [<code>WebMidi</code>](#WebMidi) | The object that triggered the event |
| type | <code>string</code> | `disabled` |


* * *

<a name="WebMidi+event_connected"></a>

## "connected"
Event emitted when an [Input](Input) or [Output](Output) becomes available. This event is
typically fired whenever a MIDI device is plugged in. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `connected` |
| target | <code>Input</code> \| <code>Output</code> | The [Input](Input) or [Output](Output) object that triggered the event. |


* * *

<a name="WebMidi+event_disconnected"></a>

## "disconnected"
Event emitted when an [Input](Input) or [Output](Output) becomes unavailable. This event is
typically fired whenever a MIDI device is unplugged. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `disconnected` |
| target | <code>Object</code> | Object with properties describing the [Input](Input) or {@Output} that triggered the event. |
| target.connection | <code>string</code> | `"closed"` |
| target.id | <code>string</code> | ID of the input |
| target.manufacturer | <code>string</code> | Manufacturer of the device that provided the input |
| target.name | <code>string</code> | Name of the device that provided the input |
| target.state | <code>string</code> | `disconnected` |
| target.type | <code>string</code> | `input` or `output` |


* * *

