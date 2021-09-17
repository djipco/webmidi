<a name="Input"></a>

# Input
The `Input` class represents a single MIDI input port. This object is derived from the host's
MIDI subsystem and cannot be instantiated directly.

You can find a list of all currently available `Input` objects in the [WebMidi#inputs](WebMidi#inputs)
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
**Emits**: [<code>opened</code>](#Input+event_opened), [<code>disconnected</code>](#Input+event_disconnected), [<code>closed</code>](#Input+event_closed), [<code>midimessage</code>](#Input+event_midimessage), [<code>sysex</code>](#Input+event_sysex), [<code>timecode</code>](#Input+event_timecode), [<code>songposition</code>](#Input+event_songposition), [<code>songselect</code>](#Input+event_songselect), [<code>tunerequest</code>](#Input+event_tunerequest), [<code>clock</code>](#Input+event_clock), [<code>start</code>](#Input+event_start), [<code>continue</code>](#Input+event_continue), [<code>stop</code>](#Input+event_stop), [<code>activesensing</code>](#Input+event_activesensing), [<code>reset</code>](#Input+event_reset), [<code>midimessage</code>](#Input+event_midimessage), [<code>unknownmidimessage</code>](#Input+event_unknownmidimessage)  


* [Input](#Input)

    * [`new Input(midiInput)`](#new_Input_new)

    * [`.channels`](#Input+channels) : <code>Array.&lt;InputChannel&gt;</code>

    * [`.name`](#Input+name) : <code>string</code>

    * [`.id`](#Input+id) : <code>string</code>

    * [`.connection`](#Input+connection) : <code>string</code>

    * [`.manufacturer`](#Input+manufacturer) : <code>string</code>

    * [`.octaveOffset`](#Input+octaveOffset) : <code>number</code>

    * [`.state`](#Input+state) : <code>string</code>

    * [`.type`](#Input+type) : <code>string</code>

    * [`.destroy()`](#Input+destroy) ⇒ <code>Promise.&lt;void&gt;</code>

    * [`.open()`](#Input+open) ⇒ [<code>Promise.&lt;Input&gt;</code>](#Input)

    * [`.close()`](#Input+close) ⇒ <code>Promise.&lt;(void\|\*)&gt;</code>

    * [`.addListener(event, listener, [options])`](#Input+addListener) ⇒ <code>Array.&lt;Listener&gt;</code>

    * [`.addOneTimeListener(event, listener, [options])`](#Input+addOneTimeListener) ⇒ <code>Array.&lt;Listener&gt;</code>

    * [`.hasListener(event, listener, [options])`](#Input+hasListener) ⇒ <code>Boolean</code>

    * [`.removeListener([type], [listener], [options])`](#Input+removeListener)

    * [`"opened"`](#Input+event_opened)

    * [`"closed"`](#Input+event_closed)

    * [`"disconnected"`](#Input+event_disconnected)

    * [`"midimessage"`](#Input+event_midimessage)

    * [`"sysex"`](#Input+event_sysex)

    * [`"timecode"`](#Input+event_timecode)

    * [`"songposition"`](#Input+event_songposition)

    * [`"songselect"`](#Input+event_songselect)

    * [`"tunerequest"`](#Input+event_tunerequest)

    * [`"clock"`](#Input+event_clock)

    * [`"start"`](#Input+event_start)

    * [`"continue"`](#Input+event_continue)

    * [`"stop"`](#Input+event_stop)

    * [`"activesensing"`](#Input+event_activesensing)

    * [`"reset"`](#Input+event_reset)

    * [`"unknownmidimessage"`](#Input+event_unknownmidimessage)


* * *

<a name="new_Input_new"></a>

## `new Input(midiInput)`
<!---->

| Param | Type | Description |
| --- | --- | --- |
| midiInput | <code>MIDIInput</code> | `MIDIInput` object as provided by the MIDI subsystem (Web MIDI API). |


* * *

<a name="Input+channels"></a>

## `input.channels` : <code>Array.&lt;InputChannel&gt;</code>
Array containing the 16 [InputChannel](InputChannel) objects available for this `Input`. The
channels are numbered 1 through 16.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->

* * *

<a name="Input+name"></a>

## `input.name` : <code>string</code>
Name of the MIDI input

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  

* * *

<a name="Input+id"></a>

## `input.id` : <code>string</code>
ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
the same port.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  

* * *

<a name="Input+connection"></a>

## `input.connection` : <code>string</code>
Input port's connection state: `"pending"`, `"open"` or `"closed"`.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  

* * *

<a name="Input+manufacturer"></a>

## `input.manufacturer` : <code>string</code>
Name of the manufacturer of the device that makes this input port available.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  

* * *

<a name="Input+octaveOffset"></a>

## `input.octaveOffset` : <code>number</code>
An integer to offset the reported octave of incoming notes. By default, middle C (MIDI note
number 60) is placed on the 4th octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
(if any).

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Since**: 3.0  

* * *

<a name="Input+state"></a>

## `input.state` : <code>string</code>
State of the input port: `"connected"` or `"disconnected"`.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  

* * *

<a name="Input+type"></a>

## `input.type` : <code>string</code>
Port type. In the case of `Input`, this is always: `"input"`.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  

* * *

<a name="Input+destroy"></a>

## `input.destroy()` ⇒ <code>Promise.&lt;void&gt;</code>
Destroys the `Input` by remove all listeners, emptying the `channels` array and unlinking the
MIDI subsystem.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->

* * *

<a name="Input+open"></a>

## `input.open()` ⇒ [<code>Promise.&lt;Input&gt;</code>](#Input)
Opens the input for usage.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Returns**: [<code>Promise.&lt;Input&gt;</code>](#Input) - The promise is fulfilled with the `Input`  

* * *

<a name="Input+close"></a>

## `input.close()` ⇒ <code>Promise.&lt;(void\|\*)&gt;</code>
Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
the input is opened again by calling [Input.open()](#Input+open).

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->

* * *

<a name="Input+addListener"></a>

## `input.addListener(event, listener, [options])` ⇒ <code>Array.&lt;Listener&gt;</code>
Adds an event listener that will trigger a function callback when the specified event happens.
The event can be **channel-bound** or **input-wide**. Channel-bound events are dispatched by
[InputChannel](InputChannel) objects and are tied to a specific MIDI channel while input-wide events
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

Note that, when adding events to channels, it is the [InputChannel](InputChannel) instance that
actually gets a listener added and not the `[Input](#Input) instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the [InputChannel](InputChannel) object itself.

There are 6 families of events you can listen to:

1. **MIDI System Common** Events (input-wide)

   * [songposition](#Input+event_songposition)
   * [songselect](#Input+event_songselect)
   * [sysex](#Input+event_sysex)
   * [timecode](#Input+event_timecode)
   * [tunerequest](#Input+event_tunerequest)

2. **MIDI System Real-Time** Events (input-wide)

   * [clock](#Input+event_clock)
   * [start](#Input+event_start)
   * [continue](#Input+event_continue)
   * [stop](#Input+event_stop)
   * [activesensing](#Input+event_activesensing)
   * [reset](#Input+event_reset)

3. **State Change** Events (input-wide)

   * [opened](#Input+event_opened)
   * [closed](#Input+event_closed)
   * [disconnected](#Input+event_disconnected)

4. **Catch-All** Events (input-wide)

   * [midimessage](#Input+event_midimessage)
   * [unknownmidimessage](#Input+event_unknownmidimessage)

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

   * [channelmode](InputChannel#event:channelmode)
   * To be completed...

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Returns**: <code>Array.&lt;Listener&gt;</code> - An array of all `Listener` objects that were created.  
**Throws**:

- <code>Error</code> For channel-specific events, 'options.channels' must be defined.


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

## `input.addOneTimeListener(event, listener, [options])` ⇒ <code>Array.&lt;Listener&gt;</code>
Adds a one-time event listener that will trigger a function callback when the specified event
happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
dispatched by [InputChannel](InputChannel) objects and are tied to a specific MIDI channel while
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

Note that, when adding events to channels, it is the [InputChannel](InputChannel) instance that
actually gets a listener added and not the `[Input](#Input) instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the [InputChannel](InputChannel) object itself.

There are 6 families of events you can listen to:

1. **MIDI System Common** Events (input-wide)

   * [songposition](#Input+event_songposition)
   * [songselect](#Input+event_songselect)
   * [sysex](#Input+event_sysex)
   * [timecode](#Input+event_timecode)
   * [tunerequest](#Input+event_tunerequest)

2. **MIDI System Real-Time** Events (input-wide)

   * [clock](#Input+event_clock)
   * [start](#Input+event_start)
   * [continue](#Input+event_continue)
   * [stop](#Input+event_stop)
   * [activesensing](#Input+event_activesensing)
   * [reset](#Input+event_reset)

3. **State Change** Events (input-wide)

   * [opened](#Input+event_opened)
   * [closed](#Input+event_closed)
   * [disconnected](#Input+event_disconnected)

4. **Catch-All** Events (input-wide)

   * [midimessage](#Input+event_midimessage)
   * [unknownmidimessage](#Input+event_unknownmidimessage)

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

   * [channelmode](InputChannel#event:channelmode)
   * To be completed...

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Returns**: <code>Array.&lt;Listener&gt;</code> - An array of all `Listener` objects that were created.  
**Throws**:

- <code>Error</code> For channel-specific events, 'options.channels' must be defined.


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

<a name="Input+hasListener"></a>

## `input.hasListener(event, listener, [options])` ⇒ <code>Boolean</code>
Checks if the specified event type is already defined to trigger the listener function. For
channel-specific events, the function will return `true` only if all channels have the listener
defined.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Returns**: <code>Boolean</code> - Boolean value indicating whether or not the channel(s) already have this
listener defined.  
**Throws**:

- Error For channel-specific events, 'options.channels' must be defined.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The type of the event. |
| listener | <code>function</code> |  | The callback function to check for. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to check. This parameter is ignored for input-wide events. |


* * *

<a name="Input+removeListener"></a>

## `input.removeListener([type], [listener], [options])`
Removes the specified listener for the specified event. If no listener is specified, all
listeners for the specified event will be removed. If no event is specified, all listeners for
the `Input` as well as all listeners for all `InputChannels` will be removed.

By default, channel-specific listeners will be removed from all channels unless the
`options.channel` narrows it down.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>String</code> |  | The type of the event. |
| [listener] | <code>function</code> |  | The callback function to check for. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to match. This parameter is ignored for input-wide events. |
| [options.context] | <code>\*</code> |  | Only remove the listeners that have this exact context. |
| [options.remaining] | <code>number</code> |  | Only remove the listener if it has exactly that many remaining times to be executed. |


* * *

<a name="Input+event_opened"></a>

## `"opened"`
Event emitted when the [Input](#Input) has been opened by calling the [open](#Input+open)
method.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"opened"` |
| target | [<code>Input</code>](#Input) | The object that triggered the event |


* * *

<a name="Input+event_closed"></a>

## `"closed"`
Event emitted when the [Input](#Input) has been closed by calling the [close](#Input+close)
method.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"closed"` |
| target | [<code>Input</code>](#Input) | The object that triggered the event |


* * *

<a name="Input+event_disconnected"></a>

## `"disconnected"`
Event emitted when the [Input](#Input) becomes unavailable. This event is typically fired
when the MIDI device is unplugged.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
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

## `"midimessage"`
Event emitted when a MIDI message is received on the `Input`

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Since**: 2.1  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>Input</code>](#Input) | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"midimessage"` |
| event.statusByte | <code>number</code> | The message's status byte. |
| event.dataBytes | <code>Array.&lt;number&gt;</code> | The message's data bytes as an array of 0, 1 or 2 integers. This will be null for `sysex` messages. |


* * *

<a name="Input+event_sysex"></a>

## `"sysex"`
Input-wide (system) event emitted when a **system exclusive** message has been received.
You should note that, to receive `sysex` events, you must call the `WebMidi.enable()`
method with the `sysex` option set to `true`:

```js
WebMidi.enable({sysex: true})
 .then(() => console.log("WebMidi has been enabled with sysex support."))
 .catch(err => console.log("WebMidi could not be enabled."))
```

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"sysex"` |


* * *

<a name="Input+event_timecode"></a>

## `"timecode"`
Input-wide (system) event emitted when a **time code quarter frame** message has been
received.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"sysextimecode"` |


* * *

<a name="Input+event_songposition"></a>

## `"songposition"`
Input-wide (system) event emitted when a **song position** message has been received.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"songposition"` |


* * *

<a name="Input+event_songselect"></a>

## `"songselect"`
Input-wide (system) event emitted when a **song select** message has been received.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"songselect"` |
| song | <code>string</code> | Song (or sequence) number to select (1-128) |


* * *

<a name="Input+event_tunerequest"></a>

## `"tunerequest"`
Input-wide (system) event emitted when a **tune request** message has been received.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"tunerequest"` |


* * *

<a name="Input+event_clock"></a>

## `"clock"`
Input-wide (system) event emitted when a **timing clock** message has been received.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"clock"` |


* * *

<a name="Input+event_start"></a>

## `"start"`
Input-wide (system) event emitted when a **start** message has been received.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"start"` |


* * *

<a name="Input+event_continue"></a>

## `"continue"`
Input-wide (system) event emitted when a **continue** message has been received.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"continue"` |


* * *

<a name="Input+event_stop"></a>

## `"stop"`
Input-wide (system) event emitted when a **stop** message has been received.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"stop"` |


* * *

<a name="Input+event_activesensing"></a>

## `"activesensing"`
Input-wide (system) event emitted when an **active sensing** message has been received.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"activesensing"` |


* * *

<a name="Input+event_reset"></a>

## `"reset"`
Input-wide (system) event emitted when a **reset** message has been received.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"reset"` |


* * *

<a name="Input+event_unknownmidimessage"></a>

## `"unknownmidimessage"`
Input-wide (system) event emitted when an unknown MIDI message has been received. It could
be, for example, one of the undefined/reserved messages.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>InputChannel</code> | The `Input` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"unknownmidimessage"` |


* * *

