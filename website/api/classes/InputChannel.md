<a name="InputChannel"></a>

# InputChannel
The `InputChannel` class represents a single input MIDI channel (1-16) from a single input
device. This object is derived from the host's MIDI subsystem and cannot be instantiated
directly.

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

**Kind**: global class  
**Emits**: [<code>midimessage</code>](#InputChannel+event_midimessage), [<code>noteoff</code>](#InputChannel+event_noteoff), [<code>noteon</code>](#InputChannel+event_noteon), [<code>keyaftertouch</code>](#InputChannel+event_keyaftertouch), [<code>controlchange</code>](#InputChannel+event_controlchange), [<code>channelmode</code>](#InputChannel+event_channelmode), [<code>programchange</code>](#InputChannel+event_programchange), [<code>channelaftertouch</code>](#InputChannel+event_channelaftertouch), [<code>pitchbend</code>](#InputChannel+event_pitchbend), [<code>allnotesoff</code>](#InputChannel+event_allnotesoff), [<code>allsoundoff</code>](#InputChannel+event_allsoundoff), [<code>localcontrol</code>](#InputChannel+event_localcontrol), [<code>monomode</code>](#InputChannel+event_monomode), [<code>omnimode</code>](#InputChannel+event_omnimode), [<code>resetallcontrollers</code>](#InputChannel+event_resetallcontrollers)  
**Since**: 3.0.0  

* [InputChannel](#InputChannel)
    * [new InputChannel(input, number)](#new_InputChannel_new)
    * [.input](#InputChannel+input) : <code>Input</code>
    * [.number](#InputChannel+number) : <code>number</code>
    * [._parseEvent(e)](#InputChannel+_parseEvent)
    * [.getChannelModeByNumber(number)](#InputChannel+getChannelModeByNumber) ⇒ <code>string</code> \| <code>false</code>
    * [.getCcNameByNumber(number)](#InputChannel+getCcNameByNumber) ⇒ <code>string</code> \| <code>false</code>
    * ["midimessage"](#InputChannel+event_midimessage)
    * ["noteoff"](#InputChannel+event_noteoff)
    * ["noteon"](#InputChannel+event_noteon)
    * ["keyaftertouch"](#InputChannel+event_keyaftertouch)
    * ["controlchange"](#InputChannel+event_controlchange)
    * ["channelmode"](#InputChannel+event_channelmode)
    * ["programchange"](#InputChannel+event_programchange)
    * ["channelaftertouch"](#InputChannel+event_channelaftertouch)
    * ["pitchbend"](#InputChannel+event_pitchbend)
    * ["allsoundoff"](#InputChannel+event_allsoundoff)
    * ["resetallcontrollers"](#InputChannel+event_resetallcontrollers)
    * ["localcontrol"](#InputChannel+event_localcontrol)
    * ["allnotesoff"](#InputChannel+event_allnotesoff)
    * ["omnimode"](#InputChannel+event_omnimode)
    * ["monomode"](#InputChannel+event_monomode)

<a name="new_InputChannel_new"></a>

## new InputChannel(input, number)

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Input</code> | The `Input` this channel belongs to |
| number | <code>number</code> | The MIDI channel's number (1-16) |

<a name="InputChannel+input"></a>

## inputChannel.input : <code>Input</code>
The [Input](Input) this channel belongs to

**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
<a name="InputChannel+number"></a>

## inputChannel.number : <code>number</code>
This channel's number (1-16)

**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
<a name="InputChannel+_parseEvent"></a>

## inputChannel.\_parseEvent(e)
**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
**Access**: protected  

| Param | Description |
| --- | --- |
| e | Event |

<a name="InputChannel+getChannelModeByNumber"></a>

## inputChannel.getChannelModeByNumber(number) ⇒ <code>string</code> \| <code>false</code>
Returns the channel mode name matching the specified number. If no match is found, the function
returns `false`.

**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
**Returns**: <code>string</code> \| <code>false</code> - The name of the matching channel mode or `false` if not match could be
found.  
**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | An integer representing the channel mode message. |

<a name="InputChannel+getCcNameByNumber"></a>

## inputChannel.getCcNameByNumber(number) ⇒ <code>string</code> \| <code>false</code>
Returns the name of a control change message matching the specified number. Some valid control
change numbers do not have a specific name or purpose assigned in the MIDI
[spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
In this case, the method returns `false`.

**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
**Returns**: <code>string</code> \| <code>false</code> - The matching control change name or `false` if not match was found  
**Throws**:

- <code>RangeError</code> Invalid control change number.

**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | An integer representing the control change message |

<a name="InputChannel+event_midimessage"></a>

## "midimessage"
Event emitted when a MIDI message of any kind is received by the `InputChannel`.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| event.statusByte | <code>number</code> | The message's status byte. |
| event.dataBytes | <code>Array.&lt;number&gt;</code> | The message's data bytes as an array of 0, 1 or 2 integers. This will be null for `sysex` messages. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"midimessage"` |

<a name="InputChannel+event_noteoff"></a>

## "noteoff"
Event emitted when a **note off** MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a `Uint8Array`. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"noteoff"` |
| note | <code>Object</code> | A [Note](Note) object containing information such as note number, note name and octave. |
| release | <code>number</code> | The release velocity expressed as a float between 0 and 1. |
| rawRelease | <code>number</code> | The release velocity expressed as an integer (between 0 and 127). |

<a name="InputChannel+event_noteon"></a>

## "noteon"
Event emitted when a **note on** MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"noteon"` |
| note | <code>Object</code> | A [Note](Note) object containing information such as note number, note name and octave. |
| attack | <code>number</code> | The attack velocity expressed as a float between 0 and 1. |
| rawAttack | <code>number</code> | The attack velocity expressed as an integer (between 0 and 127). |

<a name="InputChannel+event_keyaftertouch"></a>

## "keyaftertouch"
Event emitted when a **key-specific aftertouch** MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a `Uint8Array`. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"keyaftertouch"` |
| note | <code>Object</code> | A [Note](Note) object containing information such as note number, note name and octave. |
| value | <code>number</code> | The aftertouch amount expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The aftertouch amount expressed as an integer (between 0 and 127). |

<a name="InputChannel+event_controlchange"></a>

## "controlchange"
Event emitted when a **control change** MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"controlchange"` |
| controller | <code>Object</code> |  |
| controller.number | <code>Object</code> | The number of the controller. |
| controller.name | <code>Object</code> | The usual name or function of the controller. |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 127). |

<a name="InputChannel+event_channelmode"></a>

## "channelmode"
Event emitted when a **channel mode** MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"channelmode"` |
| controller | <code>Object</code> |  |
| controller.number | <code>Object</code> | The number of the controller. |
| controller.name | <code>Object</code> | The usual name or function of the controller. |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 127). |

<a name="InputChannel+event_programchange"></a>

## "programchange"
Event emitted when a **program change** MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"programchange"` |
| value | <code>number</code> | The value expressed as an integer between 1 and 128. |
| rawValue | <code>number</code> | The value expressed as an integer between 0 and 127. |

<a name="InputChannel+event_channelaftertouch"></a>

## "channelaftertouch"
Event emitted when a control change MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"channelaftertouch"` |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 127). |

<a name="InputChannel+event_pitchbend"></a>

## "pitchbend"
Event emitted when a pitch bend MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"pitchbend"` |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 16383). |

<a name="InputChannel+event_allsoundoff"></a>

## "allsoundoff"
Event emitted when an "all sound off" channel-mode MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"allsoundoff"` |

<a name="InputChannel+event_resetallcontrollers"></a>

## "resetallcontrollers"
Event emitted when a "reset all controllers" channel-mode MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"resetallcontrollers"` |

<a name="InputChannel+event_localcontrol"></a>

## "localcontrol"
Event emitted when a "local control" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (local control on) of `false` (local control
off).

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"localcontrol"` |
| value | <code>boolean</code> | For local control on, the value is `true`. For local control off, the value is `false`. |

<a name="InputChannel+event_allnotesoff"></a>

## "allnotesoff"
Event emitted when an "all notes off" channel-mode MIDI message has been received.

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"allnotesoff"` |

<a name="InputChannel+event_omnimode"></a>

## "omnimode"
Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (omni mode on) of `false` (omni mode off).

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"omnimode"` |
| value | <code>boolean</code> | The value is `true` for omni mode on and false for omni mode off. |

<a name="InputChannel+event_monomode"></a>

## "monomode"
Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
poly mode on).

**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"monomode"` |
| value | <code>boolean</code> | The value is `true` for omni mode on and false for omni mode off. |

