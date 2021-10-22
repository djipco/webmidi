
# Forwarder

The `Forwarder` class allows the forwarding of a MIDI message to predetermined list of
[`Output`](Output) objects according to certain conditions.

**Since**: 3.0.0



### `Constructor`


  **Parameters**

  > `new Forwarder(destinations, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`destinations`** | Output<br />Array.&lt;Output&gt;<br /> ||An [`Output`](Output) object, or an array of such objects, to forward messages to.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.types`**] | string<br />Array.&lt;string&gt;<br /> ||A message type (`"noteon"`, `"controlchange"`, etc.), or an array of such types, that the message must match in order to be forwarded. If this option is not specified, all types of messages will be forwarded. Valid messages are the ones found in either [`MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES) or [`MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).|
    |[**`options.channels`**] | number<br /> |[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]|A MIDI channel number or an array of channel numbers that the message must match in order to be forwarded. By default all MIDI channels are included (`1` to `16`).|

  </div>



***

## Properties

### `.channels` {#channels}


An array of MIDI channel numbers that the message must match in order to be forwarded. By
default, this array includes all MIDI channels (`1` to `16`).

**Type**: Array.&lt;number&gt;<br />


### `.destinations` {#destinations}


An array of [`Output`](Output) objects to forward the messages to.

**Type**: Array.&lt;Output&gt;<br />


### `.suspended` {#suspended}


Indicates whether message forwarding should be suspended or not

**Type**: boolean<br />


### `.types` {#types}


An array of message types (`"noteon"`, `"controlchange"`, etc.) that must be matched in order
for messages to be forwarded. By default, this array includes all
[`Enumerations.MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES) and
[`Enumerations.MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).

**Type**: Array.&lt;string&gt;<br />



***

## Methods


### `.forward(...)` {#forward}


Sends the specified message to the forwarder's destination(s) if it matches the specified
type(s) and channel(s).


  **Parameters**

  > Signature: `forward(message)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`message`** | Message<br /> ||The MIDI message to forward.|

  </div>






