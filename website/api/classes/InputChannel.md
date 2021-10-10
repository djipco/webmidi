# InputChannel

The `InputChannel` class represents a MIDI input channel (1-16) from a single input device. This
object is derived from the host's MIDI subsystem and cannot be instantiated directly.

All 16 `InputChannel` objects can be found inside the input's [channels]{@link Input#channels}
property.

**Since**: 3.0.0

**Extends**: [`EventEmitter`](EventEmitter)

**Fires**: [`midimessage`](InputChannel#event:midimessage), [`noteoff`](InputChannel#event:noteoff), [`noteon`](InputChannel#event:noteon), [`keyaftertouch`](InputChannel#event:keyaftertouch), [`controlchange`](InputChannel#event:controlchange), [`programchange`](InputChannel#event:programchange), [`channelaftertouch`](InputChannel#event:channelaftertouch), [`pitchbend`](InputChannel#event:pitchbend), [`allnotesoff`](InputChannel#event:allnotesoff), [`allsoundoff`](InputChannel#event:allsoundoff), [`localcontrol`](InputChannel#event:localcontrol), [`monomode`](InputChannel#event:monomode), [`omnimode`](InputChannel#event:omnimode), [`resetallcontrollers`](InputChannel#event:resetallcontrollers), [`nrpndataentrycoarse`](InputChannel#event:nrpndataentrycoarse), [`nrpndataentryfine`](InputChannel#event:nrpndataentryfine), [`nrpndatabuttonincrement`](InputChannel#event:nrpndatabuttonincrement), [`nrpndatabuttondecrement`](InputChannel#event:nrpndatabuttondecrement), [`rpndataentrycoarse`](InputChannel#event:rpndataentrycoarse), [`rpndataentryfine`](InputChannel#event:rpndataentryfine), [`rpndatabuttonincrement`](InputChannel#event:rpndatabuttonincrement), [`rpndatabuttondecrement`](InputChannel#event:rpndatabuttondecrement)


### `new InputChannel(...)`

**Signature**

> InputChannel(input, number)

**Parameters**

***

## Properties

### `.EVENTS`
**Type**: Array.&lt;string&gt;

Array of channel-specific event names that can be listened to.



### `.input`
**Type**: Input

The {@link Input} this channel belongs to



### `.number`
**Type**: number

This channel's MIDI number (1-16)



### `.octaveOffset`
**Type**: number

An integer to offset the reported octave of incoming note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
and with the value defined on the parent `Input` object.



### `.parameterNumberEventsEnabled`
**Type**: boolean

Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
are composed of a sequence of specific **control change** messages. When a valid sequence of
such control change messages is received, an `nrpn` event will fire.

If an invalid or
out-of-order control change message is received, it will fall through the collector logic and
all buffered control change messages will be discarded as incomplete.




***

## Methods

### `.destroy()`

Destroys the `Input` by removing all listeners and severing the link with the MIDI subsystem's
input.

**Signature**

> destroy()

**Parameters**

### `.getCcNameByNumber(...)`

Returns the name of a control change message matching the specified number. Some valid control
change numbers do not have a specific name or purpose assigned in the MIDI
[spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
In this case, the method returns `false`.

**Signature**

> getCcNameByNumber(number) ⇒ string

**Parameters**


| Parameter    | Default      | Description  |
| ------------ | ------------ | ------------ |
|**`number`**  : number|<br />Default: |An integer representing the control change message|

### `.getChannelModeByNumber(...)`

Returns the channel mode name matching the specified number. If no match is found, the function
returns `false`.

**Signature**

> getChannelModeByNumber(number) ⇒ string

**Parameters**


| Parameter    | Default      | Description  |
| ------------ | ------------ | ------------ |
|**`number`**  : number|<br />Default: |An integer representing the channel mode message.|


***

## Events

### `"allnotesoff"`
Type: Object

Event emitted when an "all notes off" channel-mode MIDI message has been received.

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number


### `"allsoundoff"`
Type: Object

Event emitted when an "all sound off" channel-mode MIDI message has been received.

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number


### `"channelaftertouch"`
Type: Object

Event emitted when a control change MIDI message has been received.

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number

**value**:number

**rawValue**:number


### `"controlchange"`
Type: Object

Event emitted when a **control change** MIDI message has been received.

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number

**controller**:Object

**controller.number**:Object

**controller.name**:Object

**value**:number

**rawValue**:number


### `"keyaftertouch"`
Type: Object

Event emitted when a **key-specific aftertouch** MIDI message has been received.

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number

**identifier**:string

**key**:number

**rawKey**:number

**value**:number

**rawValue**:number


### `"localcontrol"`
Type: Object

Event emitted when a "local control" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (local control on) of `false` (local control
off).

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number

**value**:boolean


### `"midimessage"`
Type: Object

Event emitted when a MIDI message of any kind is received by an `InputChannel`

**target**:Input

**message**:Message

**timestamp**:number

**type**:string

**event.data**:Array

**event.rawData**:Uint8Array

**event.statusByte**:number

**event.dataBytes**:Array.&lt;number&gt;


### `"monomode"`
Type: Object

Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
poly mode on).

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number

**value**:boolean


### `"noteoff"`
Type: Object

Event emitted when a **note off** MIDI message has been received on the channel.

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number

**note**:Object

**value**:number

**rawValue**:number


### `"noteon"`
Type: Object

Event emitted when a **note on** MIDI message has been received.

**type**:string

**channel**:InputChannel

**event.data**:Array

**input**:InputChannel

**event.rawData**:Uint8Array

**target**:InputChannel

**timestamp**:number

**note**:Object

**value**:number

**rawValue**:number


### `"nrpndatabuttondecrement"`
Type: Object

Event emitted when a 'databuttondecrement' NRPN message has been received on the input.

**type**:string

**target**:InputChannel

**timestamp**:number

**parameter**:number

**parameterMsb**:number

**parameterLsb:**:number

**value**:number

**rawValue**:number


### `"nrpndatabuttonincrement"`
Type: Object

Event emitted when a 'databuttonincrement' NRPN message has been received on the input.

**type**:string

**target**:InputChannel

**timestamp**:number

**parameter**:number

**parameterMsb**:number

**parameterLsb:**:number

**value**:number

**rawValue**:number


### `"nrpndataentrycoarse"`
Type: Object

Event emitted when a 'dataentrycoarse' NRPN message has been received on the input.

**type**:string

**target**:InputChannel

**timestamp**:number

**parameter**:number

**parameterMsb**:number

**parameterLsb:**:number

**value**:number

**rawValue**:number


### `"nrpndataentryfine"`
Type: Object

Event emitted when a 'dataentryfine' NRPN message has been received on the input.

**type**:string

**target**:InputChannel

**timestamp**:number

**parameter**:number

**parameterMsb**:number

**parameterLsb:**:number

**value**:number

**rawValue**:number


### `"omnimode"`
Type: Object

Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (omni mode on) of `false` (omni mode off).

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number

**value**:boolean


### `"pitchbend"`
Type: Object

Event emitted when a pitch bend MIDI message has been received.

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number

**value**:number

**rawValue**:number


### `"programchange"`
Type: Object

Event emitted when a **program change** MIDI message has been received.

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number

**value**:number

**rawValue**:number


### `"resetallcontrollers"`
Type: Object

Event emitted when a "reset all controllers" channel-mode MIDI message has been received.

**type**:string

**target**:InputChannel

**message**:Message

**timestamp**:number


### `"rpndatabuttondecrement"`
Type: Object

Event emitted when a 'databuttondecrement' RPN message has been received on the input.

**type**:string

**target**:InputChannel

**timestamp**:number

**parameter**:string

**parameterMsb**:number

**parameterLsb:**:number

**value**:number

**rawValue**:number


### `"rpndatabuttonincrement"`
Type: Object

Event emitted when a 'databuttonincrement' RPN message has been received on the input.

**type**:string

**target**:InputChannel

**timestamp**:number

**parameter**:string

**parameterMsb**:number

**parameterLsb:**:number

**value**:number

**rawValue**:number


### `"rpndataentrycoarse"`
Type: Object

Event emitted when a 'dataentrycoarse' RPN message has been received on the input.

**type**:string

**target**:InputChannel

**timestamp**:number

**parameter**:string

**parameterMsb**:number

**parameterLsb:**:number

**value**:number

**rawValue**:number


### `"rpndataentryfine"`
Type: Object

Event emitted when a 'dataentryfine' RPN message has been received on the input.

**type**:string

**target**:InputChannel

**timestamp**:number

**parameter**:string

**parameterMsb**:number

**parameterLsb:**:number

**value**:number

**rawValue**:number



