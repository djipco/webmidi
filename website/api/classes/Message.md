<a name="Message"></a>

# Message
The `Message` class represents a single MIDI message. It has several properties that make it
easy to make sense of the binaru data it contains.

<!--**Kind**: global class  
-->
**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->


* [Message](#Message)

    * [new Message(data)](#new_Message_new)

    * [.rawData](#Message+rawData) : <code>Uint8Array</code>

    * [.data](#Message+data) : <code>Array.&lt;number&gt;</code>

    * [.statusByte](#Message+statusByte) : <code>number</code>

    * [.rawDataBytes](#Message+rawDataBytes) : <code>Uint8Array</code>

    * [.dataBytes](#Message+dataBytes) : <code>Array.&lt;number&gt;</code>

    * [.isChannelMessage](#Message+isChannelMessage) : <code>boolean</code>

    * [.isSystemMessage](#Message+isSystemMessage) : <code>boolean</code>

    * [.command](#Message+command) : <code>number</code>

    * [.channel](#Message+channel) : <code>number</code>

    * [.manufacturerId](#Message+manufacturerId) : <code>Array.&lt;number&gt;</code>


* * *

<a name="new_Message_new"></a>

## new Message(data)
<!---->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Uint8Array</code> | The raw data of the MIDI message as a Uint8Array of integers between 0 and 255. |


* * *

<a name="Message+rawData"></a>

## message.rawData : <code>Uint8Array</code>
A Uint8Array containing the bytes of the MIDI message. Each byte is an integer between 0 and
255.

<!--**Kind**: instance property of [<code>Message</code>](#Message)  
-->
**Read only**: true  
<!---->

* * *

<a name="Message+data"></a>

## message.data : <code>Array.&lt;number&gt;</code>
An array containing the bytes of the MIDI message. Each byte is an integer is between 0 and
255.

<!--**Kind**: instance property of [<code>Message</code>](#Message)  
-->
**Read only**: true  
<!---->

* * *

<a name="Message+statusByte"></a>

## message.statusByte : <code>number</code>
The MIDI status byte of the message as an integer between 0 and 255.

<!--**Kind**: instance property of [<code>Message</code>](#Message)  
-->
**Read only**: true  
<!---->

* * *

<a name="Message+rawDataBytes"></a>

## message.rawDataBytes : <code>Uint8Array</code>
A Uint8Array of the data byte(s) of the MIDI message. When the message is a system exclusive
message (sysex), `rawDataBytes` explicitly excludes the manufacturer ID and the sysex end
byte so only the actual data is included.

<!--**Kind**: instance property of [<code>Message</code>](#Message)  
-->
**Read only**: true  
<!---->

* * *

<a name="Message+dataBytes"></a>

## message.dataBytes : <code>Array.&lt;number&gt;</code>
An array of the the data byte(s) of the MIDI message. When the message is a system exclusive
message (sysex), `dataBytes` explicitly excludes the manufacturer ID and the sysex end
byte so only the actual data is included.

<!--**Kind**: instance property of [<code>Message</code>](#Message)  
-->
**Read only**: true  
<!---->

* * *

<a name="Message+isChannelMessage"></a>

## message.isChannelMessage : <code>boolean</code>
A boolean indicating whether the MIDI message is a channel-specific message.

<!--**Kind**: instance property of [<code>Message</code>](#Message)  
-->
**Read only**: true  
<!---->

* * *

<a name="Message+isSystemMessage"></a>

## message.isSystemMessage : <code>boolean</code>
A boolean indicating whether the MIDI message is a system message (not specific to a
channel).

<!--**Kind**: instance property of [<code>Message</code>](#Message)  
-->
**Read only**: true  
<!---->

* * *

<a name="Message+command"></a>

## message.command : <code>number</code>
An integer identifying the MIDI command. For channel-specific messages, the value will be
between 8 and 14. For system messages, the value will be between 240 and 255.

<!--**Kind**: instance property of [<code>Message</code>](#Message)  
-->
**Read only**: true  
<!---->

* * *

<a name="Message+channel"></a>

## message.channel : <code>number</code>
The MIDI channel number (1-16) that the message is targeting. This is only for
channel-specific messages. For system messages, this will be left undefined.

<!--**Kind**: instance property of [<code>Message</code>](#Message)  
-->
**Read only**: true  
<!---->

* * *

<a name="Message+manufacturerId"></a>

## message.manufacturerId : <code>Array.&lt;number&gt;</code>
When the message is a system exclusive message (sysex), this property contains an array with
either 1 or 3 entries that identify the manufacturer targeted by the message.

To know how to translate these entries into manufacturer names, check out the official list:
https://www.midi.org/specifications-old/item/manufacturer-id-numbers

<!--**Kind**: instance property of [<code>Message</code>](#Message)  
-->
**Read only**: true  
<!---->

* * *

