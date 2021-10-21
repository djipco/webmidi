
# Forwarder

The `Forwarder` class allows the forwarding of MIDI messages to an [`Output`](Output) object
according to certain conditions.

**Since**: 3.0.0



### `Constructor`


  **Parameters**

  > `new Forwarder(destinations, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`destinations`** |Output||An [`Output`](Output) object, or an array of such objects, to forward messages to.|
    |[**`options`**] |object|{}||
    |[**`options.type`**] |string||A message type (`"noteon"`, `"controlchange"`, etc.), or an array of types, that the message must match in order to be forwarded. If this option is not specified, all types of messages will be forwarded. Valid messages are either [`Enumerations.MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES) or [`Enumerations.MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).|
    |[**`options.channel`**] |number||A MIDI channel number or an array of channel numbers that the message must match in order to be forwarded. If this option is not specified, messages from all channels will be forwarded.|



***

## Properties

### `.channels` {#channels}


An array of message types that must be matched in order for messages to be forwarded.

**Type**: <br />


### `.destinations` {#destinations}


An array of [`Output`](Output) objects to forward the messages to.

**Type**: Array.&lt;Output&gt;<br />


### `.suspended` {#suspended}


Indicates whether message forwarding should be suspended or not

**Type**: boolean<br />


### `.types` {#types}


An array of message types that must be matched in order for messages to be forwarded.

**Type**: Array.&lt;string&gt;<br />



***

## Methods


### `.forward(...)` {#forward}


Sends the specified message to the forwarder's destination(s) if it matches the type(s) and
channel(s).


  **Parameters**

  > Signature: `forward(message)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`message`** |Message|||






