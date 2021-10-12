
# InputChannel

The `InputChannel` class represents a MIDI input channel (1-16) from a single input device. This
object is derived from the host's MIDI subsystem and cannot be instantiated directly.

All 16 `InputChannel` objects can be found inside the input's [channels](Input#channels)
property.

**Since**: 3.0.0

**Extends**: EventEmitter

**Fires**: [`midimessage`](InputChannel#event:midimessage), [`noteoff`](InputChannel#event:noteoff), [`noteon`](InputChannel#event:noteon), [`keyaftertouch`](InputChannel#event:keyaftertouch), [`controlchange`](InputChannel#event:controlchange), [`programchange`](InputChannel#event:programchange), [`channelaftertouch`](InputChannel#event:channelaftertouch), [`pitchbend`](InputChannel#event:pitchbend), [`allnotesoff`](InputChannel#event:allnotesoff), [`allsoundoff`](InputChannel#event:allsoundoff), [`localcontrol`](InputChannel#event:localcontrol), [`monomode`](InputChannel#event:monomode), [`omnimode`](InputChannel#event:omnimode), [`resetallcontrollers`](InputChannel#event:resetallcontrollers), [`nrpndataentrycoarse`](InputChannel#event:nrpndataentrycoarse), [`nrpndataentryfine`](InputChannel#event:nrpndataentryfine), [`nrpndatabuttonincrement`](InputChannel#event:nrpndatabuttonincrement), [`nrpndatabuttondecrement`](InputChannel#event:nrpndatabuttondecrement), [`rpndataentrycoarse`](InputChannel#event:rpndataentrycoarse), [`rpndataentryfine`](InputChannel#event:rpndataentryfine), [`rpndatabuttonincrement`](InputChannel#event:rpndatabuttonincrement), [`rpndatabuttondecrement`](InputChannel#event:rpndatabuttondecrement)

### `new InputChannel(...)`


  **Parameters**

  > `new InputChannel(input, number)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`input`** |Input||The `Input` object this channel belongs to|
    |**`number`** |number||The MIDI channel's number (1-16)|



***

## Properties

### `.EVENTS`

Array of channel-specific event names that can be listened to.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />
  **Attributes**: static


### `.input`

The [`Input`](Input) this channel belongs to

**Type**: Input<br />
**Since**: 3.0<br />


### `.number`

This channel's MIDI number (1-16)

**Type**: number<br />
**Since**: 3.0<br />


### `.octaveOffset`

An integer to offset the reported octave of incoming note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
and with the value defined on the parent `Input` object.

**Type**: number<br />
**Since**: 3.0<br />


### `.parameterNumberEventsEnabled`

Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
are composed of a sequence of specific **control change** messages. When a valid sequence of
such control change messages is received, an `nrpn` event will fire.

If an invalid or
out-of-order control change message is received, it will fall through the collector logic and
all buffered control change messages will be discarded as incomplete.

**Type**: boolean<br />



***

## Methods

### `.destroy()`

Destroys the `Input` by removing all listeners and severing the link with the MIDI subsystem's
input.





### `.getCcNameByNumber(...)`

Returns the name of a control change message matching the specified number. Some valid control
change numbers do not have a specific name or purpose assigned in the MIDI
[spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
In this case, the method returns `false`.


  **Parameters**

  > `getCcNameByNumber(number)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** |number||An integer representing the control change message|


**Returns**: `string` or `undefined`> The matching control change name or `undefined` if not match was
found.


**Since**: 2.0.0<br />

**Throws**:
  * `RangeError` : Invalid control change number.

### `.getChannelModeByNumber(...)`

Returns the channel mode name matching the specified number. If no match is found, the function
returns `false`.


  **Parameters**

  > `getChannelModeByNumber(number)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`number`** |number||An integer representing the channel mode message.|


**Returns**: `string` or `false`> The name of the matching channel mode or `false` if not match could be
found.


**Since**: 2.0.0<br />



***

## Events

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



