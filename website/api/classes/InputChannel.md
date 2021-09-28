<a name="InputChannel"></a>

# InputChannel
The `InputChannel` class represents a MIDI input channel (1-16) from a single input device. This
object is derived from the host's MIDI subsystem and cannot be instantiated directly.

All 16 `InputChannel` objects can be found inside the input's [channels](Input#channels)
property.

The `InputChannel` class extends the
[EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
[djipevents](https://djipco.github.io/djipevents/index.html) module. This means
it also includes methods such as
[addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
[removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
[hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
others. Check out the
[documentation for EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) for more
details.

<!--**Kind**: global class  
-->
**Emits**: [<code>midimessage</code>](#InputChannel+event_midimessage), [<code>noteoff</code>](#InputChannel+event_noteoff), [<code>noteon</code>](#InputChannel+event_noteon), [<code>keyaftertouch</code>](#InputChannel+event_keyaftertouch), [<code>controlchange</code>](#InputChannel+event_controlchange), [<code>programchange</code>](#InputChannel+event_programchange), [<code>channelaftertouch</code>](#InputChannel+event_channelaftertouch), [<code>pitchbend</code>](#InputChannel+event_pitchbend), [<code>allnotesoff</code>](#InputChannel+event_allnotesoff), [<code>allsoundoff</code>](#InputChannel+event_allsoundoff), [<code>localcontrol</code>](#InputChannel+event_localcontrol), [<code>monomode</code>](#InputChannel+event_monomode), [<code>omnimode</code>](#InputChannel+event_omnimode), [<code>resetallcontrollers</code>](#InputChannel+event_resetallcontrollers), [<code>nrpndataentrycoarse</code>](#InputChannel+event_nrpndataentrycoarse), [<code>nrpndataentryfine</code>](#InputChannel+event_nrpndataentryfine), [<code>nrpndatabuttonincrement</code>](#InputChannel+event_nrpndatabuttonincrement), [<code>nrpndatabuttondecrement</code>](#InputChannel+event_nrpndatabuttondecrement), [<code>rpndataentrycoarse</code>](#InputChannel+event_rpndataentrycoarse), [<code>rpndataentryfine</code>](#InputChannel+event_rpndataentryfine), [<code>rpndatabuttonincrement</code>](#InputChannel+event_rpndatabuttonincrement), [<code>rpndatabuttondecrement</code>](#InputChannel+event_rpndatabuttondecrement)  
**Since**: 3.0.0  


* [InputChannel](#InputChannel)

    * [`new InputChannel(input, number)`](#new_InputChannel_new)

    * [`.parameterNumberEventsEnabled`](#InputChannel+parameterNumberEventsEnabled) : <code>boolean</code>

    * [`.octaveOffset`](#InputChannel+octaveOffset) : <code>number</code>

    * [`.input`](#InputChannel+input) : <code>Input</code>

    * [`.number`](#InputChannel+number) : <code>number</code>

    * [`.destroy()`](#InputChannel+destroy)

    * [`.getChannelModeByNumber(number)`](#InputChannel+getChannelModeByNumber) ⇒ <code>string</code> \| <code>false</code>

    * [`.getCcNameByNumber(number)`](#InputChannel+getCcNameByNumber) ⇒ <code>string</code> \| <code>undefined</code>

    * [`"midimessage"`](#InputChannel+event_midimessage)

    * [`"noteoff"`](#InputChannel+event_noteoff)

    * [`"noteon"`](#InputChannel+event_noteon)

    * [`"keyaftertouch"`](#InputChannel+event_keyaftertouch)

    * [`"controlchange"`](#InputChannel+event_controlchange)

    * [`"programchange"`](#InputChannel+event_programchange)

    * [`"channelaftertouch"`](#InputChannel+event_channelaftertouch)

    * [`"pitchbend"`](#InputChannel+event_pitchbend)

    * [`"allsoundoff"`](#InputChannel+event_allsoundoff)

    * [`"resetallcontrollers"`](#InputChannel+event_resetallcontrollers)

    * [`"localcontrol"`](#InputChannel+event_localcontrol)

    * [`"allnotesoff"`](#InputChannel+event_allnotesoff)

    * [`"omnimode"`](#InputChannel+event_omnimode)

    * [`"monomode"`](#InputChannel+event_monomode)

    * [`"nrpndataentrycoarse"`](#InputChannel+event_nrpndataentrycoarse)

    * [`"nrpndataentryfine"`](#InputChannel+event_nrpndataentryfine)

    * [`"nrpndatabuttonincrement"`](#InputChannel+event_nrpndatabuttonincrement)

    * [`"nrpndatabuttondecrement"`](#InputChannel+event_nrpndatabuttondecrement)

    * [`"rpndataentrycoarse"`](#InputChannel+event_rpndataentrycoarse)

    * [`"rpndataentryfine"`](#InputChannel+event_rpndataentryfine)

    * [`"rpndatabuttonincrement"`](#InputChannel+event_rpndatabuttonincrement)

    * [`"rpndatabuttondecrement"`](#InputChannel+event_rpndatabuttondecrement)


* * *

<a name="new_InputChannel_new"></a>

## `new InputChannel(input, number)`
<!---->

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Input</code> | The `Input` object this channel belongs to |
| number | <code>number</code> | The MIDI channel's number (1-16) |


* * *

<a name="InputChannel+parameterNumberEventsEnabled"></a>

## `inputChannel.parameterNumberEventsEnabled` : <code>boolean</code>
Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
are composed of a sequence of specific **control change** messages. When a valid sequence of
such control change messages is received, an `nrpn` event will fire.

If an invalid or
out-of-order control change message is received, it will fall through the collector logic and
all buffered control change messages will be discarded as incomplete.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->

* * *

<a name="InputChannel+octaveOffset"></a>

## `inputChannel.octaveOffset` : <code>number</code>
An integer to offset the reported octave of incoming note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
and with the value defined on the parent `Input` object.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Since**: 3.0  

* * *

<a name="InputChannel+input"></a>

## `inputChannel.input` : <code>Input</code>
The [Input](Input) this channel belongs to

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Since**: 3.0  

* * *

<a name="InputChannel+number"></a>

## `inputChannel.number` : <code>number</code>
This channel's MIDI number (1-16)

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Since**: 3.0  

* * *

<a name="InputChannel+destroy"></a>

## `inputChannel.destroy()`
Destroys the `Input` by removing all listeners and severing the link with the MIDI subsystem's
input.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->

* * *

<a name="InputChannel+getChannelModeByNumber"></a>

## `inputChannel.getChannelModeByNumber(number)` ⇒ <code>string</code> \| <code>false</code>
Returns the channel mode name matching the specified number. If no match is found, the function
returns `false`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Returns**: <code>string</code> \| <code>false</code> - The name of the matching channel mode or `false` if not match could be
found.  
**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | An integer representing the channel mode message. |


* * *

<a name="InputChannel+getCcNameByNumber"></a>

## `inputChannel.getCcNameByNumber(number)` ⇒ <code>string</code> \| <code>undefined</code>
Returns the name of a control change message matching the specified number. Some valid control
change numbers do not have a specific name or purpose assigned in the MIDI
[spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
In this case, the method returns `false`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Returns**: <code>string</code> \| <code>undefined</code> - The matching control change name or `undefined` if not match was
found.  
**Throws**:

- <code>RangeError</code> Invalid control change number.

**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | An integer representing the control change message |


* * *

<a name="InputChannel+event_midimessage"></a>

## `"midimessage"`
Event emitted when a MIDI message of any kind is received by an `InputChannel`

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>Input</code> | The `InputChannel` that triggered the event. |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"midimessage"` |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead). |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead). |
| event.statusByte | <code>number</code> | The message's status byte  (deprecated, use the `message` object instead). |
| event.dataBytes | <code>Array.&lt;number&gt;</code> | The message's data bytes as an array of 0, 1 or 2 integers. This will be null for `sysex` messages (deprecated, use the `message` object instead). |


* * *

<a name="InputChannel+event_noteoff"></a>

## `"noteoff"`
Event emitted when a **note off** MIDI message has been received on the channel.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"noteoff"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| note | <code>Object</code> | A [Note](Note) object containing information such as note name, octave and release velocity. |
| value | <code>number</code> | The release velocity amount expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The release velocity amount expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_noteon"></a>

## `"noteon"`
Event emitted when a **note on** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"noteon"` |
| channel | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` object that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| input | [<code>InputChannel</code>](#InputChannel) | The `Input` object where through which the message was received. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a `Uint8Array`. |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| note | <code>Object</code> | A [Note](Note) object containing information such as note name, octave and attack velocity. |
| value | <code>number</code> | The attack velocity amount expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The attack velocity amount expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_keyaftertouch"></a>

## `"keyaftertouch"`
Event emitted when a **key-specific aftertouch** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"keyaftertouch"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| identifier | <code>string</code> | The note identifier of the key to apply the aftertouch to. This includes any octave offset applied at the channel, input or global level. |
| key | <code>number</code> | The MIDI note number of the key to apply the aftertouch to. This includes any octave offset applied at the channel, input or global level. |
| rawKey | <code>number</code> | The MIDI note number of the key to apply the aftertouch to. This excludes any octave offset defined at the channel, input or global level. |
| value | <code>number</code> | The aftertouch amount expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The aftertouch amount expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_controlchange"></a>

## `"controlchange"`
Event emitted when a **control change** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"controlchange"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| controller | <code>Object</code> |  |
| controller.number | <code>Object</code> | The number of the controller. |
| controller.name | <code>Object</code> | The usual name or function of the controller. |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_programchange"></a>

## `"programchange"`
Event emitted when a **program change** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"programchange"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>number</code> | The value expressed as an integer between 1 and 128. |
| rawValue | <code>number</code> | The value expressed as an integer between 0 and 127.. |


* * *

<a name="InputChannel+event_channelaftertouch"></a>

## `"channelaftertouch"`
Event emitted when a control change MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"channelaftertouch"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_pitchbend"></a>

## `"pitchbend"`
Event emitted when a pitch bend MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"pitchbend"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 16383). |


* * *

<a name="InputChannel+event_allsoundoff"></a>

## `"allsoundoff"`
Event emitted when an "all sound off" channel-mode MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"allsoundoff"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |


* * *

<a name="InputChannel+event_resetallcontrollers"></a>

## `"resetallcontrollers"`
Event emitted when a "reset all controllers" channel-mode MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"resetallcontrollers"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |


* * *

<a name="InputChannel+event_localcontrol"></a>

## `"localcontrol"`
Event emitted when a "local control" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (local control on) of `false` (local control
off).

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"localcontrol"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>boolean</code> | For local control on, the value is `true`. For local control off, the value is `false`. |


* * *

<a name="InputChannel+event_allnotesoff"></a>

## `"allnotesoff"`
Event emitted when an "all notes off" channel-mode MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"allnotesoff"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |


* * *

<a name="InputChannel+event_omnimode"></a>

## `"omnimode"`
Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (omni mode on) of `false` (omni mode off).

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"omnimode"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>boolean</code> | The value is `true` for omni mode on and false for omni mode off. |


* * *

<a name="InputChannel+event_monomode"></a>

## `"monomode"`
Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
poly mode on).

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"monomode"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | <code>Message</code> | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>boolean</code> | The value is `true` for omni mode on and false for omni mode off. |


* * *

<a name="InputChannel+event_nrpndataentrycoarse"></a>

## `"nrpndataentrycoarse"`
Event emitted when a 'dataentrycoarse' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndataentrycoarse"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_nrpndataentryfine"></a>

## `"nrpndataentryfine"`
Event emitted when a 'dataentryfine' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndataentryfine"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_nrpndatabuttonincrement"></a>

## `"nrpndatabuttonincrement"`
Event emitted when a 'databuttonincrement' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndatabuttonincrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_nrpndatabuttondecrement"></a>

## `"nrpndatabuttondecrement"`
Event emitted when a 'databuttondecrement' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndatabuttondecrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndataentrycoarse"></a>

## `"rpndataentrycoarse"`
Event emitted when a 'dataentrycoarse' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndataentrycoarse"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndataentryfine"></a>

## `"rpndataentryfine"`
Event emitted when a 'dataentryfine' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndataentryfine"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndatabuttonincrement"></a>

## `"rpndatabuttonincrement"`
Event emitted when a 'databuttonincrement' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndatabuttonincrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndatabuttondecrement"></a>

## `"rpndatabuttondecrement"`
Event emitted when a 'databuttondecrement' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndatabuttondecrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

