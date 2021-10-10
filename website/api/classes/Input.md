# Input

The `Input` class represents a single MIDI input port. This object is derived from the host's
MIDI subsystem and should not be directly instantiated. Instead, you can access to inputs by
referring to the [`WebMidi.inputs`](WebMidi#inputs) array.

Note that a single device may expose several inputs.


**Extends**: [`EventEmitter`](EventEmitter)

**Fires**: [`opened`](Input#event:opened), [`disconnected`](Input#event:disconnected), [`closed`](Input#event:closed), [`midimessage`](Input#event:midimessage), [`sysex`](Input#event:sysex), [`timecode`](Input#event:timecode), [`songposition`](Input#event:songposition), [`songselect`](Input#event:songselect), [`tunerequest`](Input#event:tunerequest), [`clock`](Input#event:clock), [`start`](Input#event:start), [`continue`](Input#event:continue), [`stop`](Input#event:stop), [`activesensing`](Input#event:activesensing), [`reset`](Input#event:reset), [`unknownmidimessage`](Input#event:unknownmidimessage)


### `new Input(...)`


**Parameters**

| Parameter    | Type      | Default      | Description  |
| ------------ | ------------ | ------------ | ------------ |
|**`midiInput`** |MIDIInput||`MIDIInput` object as provided by the MIDI subsystem (Web MIDI API).|



***

## Properties

### `.channels`

**Type**: Array.&lt;InputChannel&gt;<br />


Array containing the 16 [`InputChannel`](InputChannel) objects available for this `Input`. The
channels are numbered 1 through 16.

### `.connection`

**Type**: string<br />
**Attributes**: read-only


Input port's connection state: `"pending"`, `"open"` or `"closed"`.

### `.id`

**Type**: string<br />
**Attributes**: read-only


ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
the same port.

### `.manufacturer`

**Type**: string<br />
**Attributes**: read-only


Name of the manufacturer of the device that makes this input port available.

### `.name`

**Type**: string<br />
**Attributes**: read-only


Name of the MIDI input

### `.octaveOffset`

**Type**: number<br />


An integer to offset the reported octave of incoming notes. By default, middle C (MIDI note
number 60) is placed on the 4th octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
(if any).

### `.state`

**Type**: string<br />
**Attributes**: read-only


State of the input port: `"connected"` or `"disconnected"`.

### `.type`

**Type**: string<br />
**Attributes**: read-only


Port type. In the case of `Input`, this is always: `"input"`.


***

## Methods

### `.addListener(...)`

Adds an event listener that will trigger a function callback when the specified event happens.
The event can be **channel-bound** or **input-wide**. Channel-bound events are dispatched by
{@link InputChannel} objects and are tied to a specific MIDI channel while input-wide events
are dispatched by the {@link Input} object itself and are not tied to a specific channel.

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

Note that, when adding events to channels, it is the {@link InputChannel} instance that
actually gets a listener added and not the `{@link Input} instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the {@link InputChannel} object itself.

There are 6 families of events you can listen to:

1. **MIDI System Common** Events (input-wide)

   * [songposition]{@link Input#event:songposition}
   * [songselect]{@link Input#event:songselect}
   * [sysex]{@link Input#event:sysex}
   * [timecode]{@link Input#event:timecode}
   * [tunerequest]{@link Input#event:tunerequest}

2. **MIDI System Real-Time** Events (input-wide)

   * [clock]{@link Input#event:clock}
   * [start]{@link Input#event:start}
   * [continue]{@link Input#event:continue}
   * [stop]{@link Input#event:stop}
   * [activesensing]{@link Input#event:activesensing}
   * [reset]{@link Input#event:reset}

3. **State Change** Events (input-wide)

   * [opened]{@link Input#event:opened}
   * [closed]{@link Input#event:closed}
   * [disconnected]{@link Input#event:disconnected}

4. **Catch-All** Events (input-wide)

   * [midimessage]{@link Input#event:midimessage}
   * [unknownmidimessage]{@link Input#event:unknownmidimessage}

5. **Channel Voice** Events (channel-specific)

   * [channelaftertouch]{@link InputChannel#event:channelaftertouch}
   * [controlchange]{@link InputChannel#event:controlchange}
   * [keyaftertouch]{@link InputChannel#event:keyaftertouch}
   * [noteoff]{@link InputChannel#event:noteoff}
   * [noteon]{@link InputChannel#event:noteon}
   * [nrpn]{@link InputChannel#event:nrpn}
   * [pitchbend]{@link InputChannel#event:pitchbend}
   * [programchange]{@link InputChannel#event:programchange}

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

**Returns: ** Array.&lt;Listener&gt;

### `.addOneTimeListener(...)`

Adds a one-time event listener that will trigger a function callback when the specified event
happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
dispatched by {@link InputChannel} objects and are tied to a specific MIDI channel while
input-wide events are dispatched by the {@link Input} object itself and are not tied to a
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

Note that, when adding events to channels, it is the {@link InputChannel} instance that
actually gets a listener added and not the `{@link Input} instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the {@link InputChannel} object itself.

There are 6 families of events you can listen to:

1. **MIDI System Common** Events (input-wide)

   * [songposition]{@link Input#event:songposition}
   * [songselect]{@link Input#event:songselect}
   * [sysex]{@link Input#event:sysex}
   * [timecode]{@link Input#event:timecode}
   * [tunerequest]{@link Input#event:tunerequest}

2. **MIDI System Real-Time** Events (input-wide)

   * [clock]{@link Input#event:clock}
   * [start]{@link Input#event:start}
   * [continue]{@link Input#event:continue}
   * [stop]{@link Input#event:stop}
   * [activesensing]{@link Input#event:activesensing}
   * [reset]{@link Input#event:reset}

3. **State Change** Events (input-wide)

   * [opened]{@link Input#event:opened}
   * [closed]{@link Input#event:closed}
   * [disconnected]{@link Input#event:disconnected}

4. **Catch-All** Events (input-wide)

   * [midimessage]{@link Input#event:midimessage}
   * [unknownmidimessage]{@link Input#event:unknownmidimessage}

5. **Channel Voice** Events (channel-specific)

   * [channelaftertouch]{@link InputChannel#event:channelaftertouch}
   * [controlchange]{@link InputChannel#event:controlchange}
   * [keyaftertouch]{@link InputChannel#event:keyaftertouch}
   * [noteoff]{@link InputChannel#event:noteoff}
   * [noteon]{@link InputChannel#event:noteon}
   * [nrpn]{@link InputChannel#event:nrpn}
   * [pitchbend]{@link InputChannel#event:pitchbend}
   * [programchange]{@link InputChannel#event:programchange}

6. **Channel Mode** Events (channel-specific)

   * allnotesoff
   * allsoundoff
   * localcontrol
   * monomode
   * omnimode
   * resetallcontrollers


**Parameters**

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

**Returns: ** Array.&lt;Listener&gt;

### `.close()`

Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
the input is opened again by calling [Input.open()]{@link Input#open}.

**Returns: ** Promise.&lt;Input&gt;

### `.destroy()`

Destroys the `Input` by remove all listeners, emptying the `channels` array and unlinking the
MIDI subsystem.

**Returns: ** Promise.&lt;void&gt;

### `.hasListener(...)`

Checks if the specified event type is already defined to trigger the listener function. For
channel-specific events, the function will return `true` only if all channels have the listener
defined.


**Parameters**

| Parameter    | Type      | Default      | Description  |
| ------------ | ------------ | ------------ | ------------ |
|**`event`** |string||The type of the event.|
|**`listener`** |function||The callback function to check for.|
|[**`options`**] |Object|{}||
|[**`options.channels`**] |number||An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to check. This parameter is ignored for input-wide events.|

**Returns: ** Boolean

### `.open()`

Opens the input for usage. This is usually unnecessary as the port is open automatically when
WebMidi is enabled.

**Returns: ** Promise.&lt;Input&gt;

### `.removeListener(...)`

Removes the specified listener for the specified event. If no listener is specified, all
listeners for the specified event will be removed. If no event is specified, all listeners for
the `Input` as well as all listeners for all `InputChannels` will be removed.

By default, channel-specific listeners will be removed from all channels unless the
`options.channel` narrows it down.


**Parameters**

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

### `"activesensing"`
Type: Object

Input-wide (system) event emitted when an **active sensing** message has been received.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"clock"`
Type: Object

Input-wide (system) event emitted when a **timing clock** message has been received.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"closed"`
Type: Object

Event emitted when the {@link Input} has been closed by calling the {@link Input#close}
method.

**timestamp**:number

**type**:string

**target**:Input


### `"continue"`
Type: Object

Input-wide (system) event emitted when a **continue** message has been received.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"disconnected"`
Type: Object

Event emitted when the {@link Input} becomes unavailable. This event is typically fired
when the MIDI device is unplugged.

**timestamp**:number

**type**:string

**target**:Object

**target.connection**:string

**target.id**:string

**target.manufacturer**:string

**target.name**:string

**target.state**:string

**target.type**:string


### `"midimessage"`
Type: Object

Event emitted when any MIDI message is received on an `Input`

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array

**event.statusByte**:number

**event.dataBytes**:Array.&lt;number&gt;


### `"opened"`
Type: Object

Event emitted when the {@link Input} has been opened by calling the {@link Input#open}
method.

**timestamp**:number

**type**:string

**target**:Input


### `"reset"`
Type: Object

Input-wide (system) event emitted when a **reset** message has been received.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"songposition"`
Type: Object

Input-wide (system) event emitted when a **song position** message has been received.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"songselect"`
Type: Object

Input-wide (system) event emitted when a **song select** message has been received.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**song**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"start"`
Type: Object

Input-wide (system) event emitted when a **start** message has been received.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"stop"`
Type: Object

Input-wide (system) event emitted when a **stop** message has been received.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"sysex"`
Type: Object

Input-wide (system) event emitted when a **system exclusive** message has been received.
You should note that, to receive `sysex` events, you must call the `WebMidi.enable()`
method with the `sysex` option set to `true`:

```js
WebMidi.enable({sysex: true})
 .then(() => console.log("WebMidi has been enabled with sysex support."))
 .catch(err => console.log("WebMidi could not be enabled."))
```

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"timecode"`
Type: Object

Input-wide (system) event emitted when a **time code quarter frame** message has been
received.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"tunerequest"`
Type: Object

Input-wide (system) event emitted when a **tune request** message has been received.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array


### `"unknownmidimessage"`
Type: Object

Input-wide (system) event emitted when an unknown MIDI message has been received. It could
be, for example, one of the undefined/reserved messages.

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array



