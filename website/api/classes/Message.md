
# Message

The `Message` class represents a single MIDI message. It has several properties that make it
easy to make sense of the binary data it contains.

**Since**: 3.0.0



### `Constructor`


  **Parameters**

  > `new Message(data)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`data`** | Uint8Array<br /> ||The raw data of the MIDI message as a [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) of integers between `0` and `255`.|

  </div>



***

## Properties

### `.channel` {#channel}

**Type**: number<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


The MIDI channel number (`1` - `16`) that the message is targeting. This is only for
channel-specific messages. For system messages, this will be left undefined.


### `.command` {#command}

**Type**: number<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


An integer identifying the MIDI command. For channel-specific messages, the value will be
between `8` and `14`. For system messages, the value will be between `240` and `255`.


### `.data` {#data}

**Type**: Array.&lt;number&gt;<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


An array containing the bytes of the MIDI message. Each byte is an integer between `0` and
`255`.


### `.dataBytes` {#dataBytes}

**Type**: Array.&lt;number&gt;<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


An array of the the data byte(s) of the MIDI message. When the message is a system exclusive
message (sysex), `dataBytes` explicitly excludes the manufacturer ID and the sysex end
byte so only the actual data is included.


### `.isChannelMessage` {#isChannelMessage}

**Type**: boolean<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


A boolean indicating whether the MIDI message is a channel-specific message.


### `.isSystemMessage` {#isSystemMessage}

**Type**: boolean<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


A boolean indicating whether the MIDI message is a system message (not specific to a
channel).


### `.manufacturerId` {#manufacturerId}

**Type**: Array.&lt;number&gt;<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


When the message is a system exclusive message (sysex), this property contains an array with
either 1 or 3 entries that identify the manufacturer targeted by the message.

To know how to translate these entries into manufacturer names, check out the official list:
https://www.midi.org/specifications-old/item/manufacturer-id-numbers


### `.rawData` {#rawData}

**Type**: Uint8Array<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


A
[`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
containing the bytes of the MIDI message. Each byte is an integer between `0` and `255`.


### `.rawDataBytes` {#rawDataBytes}

**Type**: Uint8Array<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


A
[`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
of the data byte(s) of the MIDI message. When the message is a system exclusive message
(sysex), `rawDataBytes` explicitly excludes the manufacturer ID and the sysex end byte so
only the actual data is included.


### `.statusByte` {#statusByte}

**Type**: number<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


The MIDI status byte of the message as an integer between `0` and `255`.


### `.type` {#type}

**Type**: string<br />
**Attributes**: read-only<br />

**Attributes**: read-only<br />


The type of message as a string (`"noteon"`, `"controlchange"`, `"sysex"`, etc.)



