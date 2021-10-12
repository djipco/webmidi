
# Input

The `Input` class represents a single MIDI input port. This object is automatically instantiated
by the library according to the host's MIDI subsystem and should not be directly instantiated.
Instead, you can access all `Input` objects by referring to the [`WebMidi.inputs`](WebMidi#inputs)
array.

Note that a single device may expose several inputs and/or outputs.


**Extends**: EventEmitter

**Fires**: [`opened`](Input#event:opened), [`disconnected`](Input#event:disconnected), [`closed`](Input#event:closed), [`midimessage`](Input#event:midimessage), [`sysex`](Input#event:sysex), [`timecode`](Input#event:timecode), [`songposition`](Input#event:songposition), [`songselect`](Input#event:songselect), [`tunerequest`](Input#event:tunerequest), [`clock`](Input#event:clock), [`start`](Input#event:start), [`continue`](Input#event:continue), [`stop`](Input#event:stop), [`activesensing`](Input#event:activesensing), [`reset`](Input#event:reset), [`unknownmidimessage`](Input#event:unknownmidimessage)

### `new Input(...)`


  **Parameters**

  > `new Input(midiInput)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`midiInput`** |MIDIInput||`MIDIInput` object as provided by the MIDI subsystem (Web MIDI API).|



***

## Properties

### `.channels`

Array containing the 16 [`InputChannel`](InputChannel) objects available for this `Input`. The
channels are numbered 1 through 16.

**Type**: Array.&lt;InputChannel&gt;<br />


### `.connection`

Input port's connection state: `"pending"`, `"open"` or `"closed"`.

**Type**: string<br />
**Attributes**: read-only<br />


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

An integer to offset the reported octave of incoming notes. By default, middle C (MIDI note
number 60) is placed on the 4th octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
(if any).

**Type**: number<br />
**Since**: 3.0<br />


### `.state`

State of the input port: `"connected"` or `"disconnected"`.

**Type**: string<br />
**Attributes**: read-only<br />


### `.type`

Port type. In the case of `Input`, this is always: `"input"`.

**Type**: string<br />
**Attributes**: read-only<br />



***

## Methods

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

  > `addListener(event, listener, [options])`

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




**Returns**: Array.&lt;Listener&gt; - An array of all `Listener` objects that were created.



  **Returns: ** Array.&lt;Listener&gt; - An array of all `Listener` objects that were created.<br />

**Throws**:
  * `Error` : For channel-specific events, &#x27;options.channels&#x27; must be defined.

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

  > `addOneTimeListener(event, listener, [options])`

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




**Returns**: Array.&lt;Listener&gt; - An array of all `Listener` objects that were created.



  **Returns: ** Array.&lt;Listener&gt; - An array of all `Listener` objects that were created.<br />

**Throws**:
  * `Error` : For channel-specific events, &#x27;options.channels&#x27; must be defined.

### `.close()`

Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
the input is opened again by calling [Input.open()](#Input+open).




**Returns**: Promise.&lt;Input&gt; - The promise is fulfilled with the `Input` object



  **Returns: ** Promise.&lt;Input&gt; - The promise is fulfilled with the `Input` object<br />


### `.destroy()`

Destroys the `Input` by remove all listeners, emptying the `channels` array and unlinking the
MIDI subsystem.







  **Returns: ** Promise.&lt;void&gt;<br />


### `.hasListener(...)`

Checks if the specified event type is already defined to trigger the listener function. For
channel-specific events, the function will return `true` only if all channels have the listener
defined.


  **Parameters**

  > `hasListener(event, listener, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The type of the event.|
    |**`listener`** |function||The callback function to check for.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number||An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to check. This parameter is ignored for input-wide events.|




**Returns**: Boolean - Boolean value indicating whether or not the channel(s) already have this
listener defined.



  **Returns: ** Boolean - Boolean value indicating whether or not the channel(s) already have this
listener defined.<br />

**Throws**:
  * Error For channel-specific events, &#x27;options.channels&#x27; must be defined.

### `.open()`

Opens the input for usage. This is usually unnecessary as the port is open automatically when
WebMidi is enabled.




**Returns**: Promise.&lt;Input&gt; - The promise is fulfilled with the `Input` object



  **Returns: ** Promise.&lt;Input&gt; - The promise is fulfilled with the `Input` object<br />


### `.removeListener(...)`

Removes the specified listener for the specified event. If no listener is specified, all
listeners for the specified event will be removed. If no event is specified, all listeners for
the `Input` as well as all listeners for all `InputChannels` will be removed.

By default, channel-specific listeners will be removed from all channels unless the
`options.channel` narrows it down.


  **Parameters**

  > `removeListener([type], [listener], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`type`**] |String||The type of the event.|
    |[**`listener`**] |function||The callback function to check for.|
    |[**`options`**] |Object|{}||
    |[**`options.channels`**] |number||An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to match. This parameter is ignored for input-wide events.|
    |[**`options.context`**] |*||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] |number||Only remove the listener if it has exactly that many remaining times to be executed.|










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



