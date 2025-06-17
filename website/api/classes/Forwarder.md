
# Forwarder

The `Forwarder` class allows the forwarding of MIDI messages to predetermined outputs. When you
call its [`forward()`](#forward) method, it will send the specified [`Message`](Message) object
to all the outputs listed in its [`destinations`](#destinations) property.

If specific channels or message types have been defined in the [`channels`](#channels) or
[`types`](#types) properties, only messages matching the channels/types will be forwarded.

While it can be manually instantiated, you are more likely to come across a `Forwarder` object as
the return value of the [`Input.addForwarder()`](Input#addForwarder) method.

**Since**: 3.0.0



### `Constructor`

Creates a `Forwarder` object.


  **Parameters**

  > `new Forwarder([destinations], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`destinations`**] | Output<br />Array.&lt;Output&gt;<br /> |\[\]|An [`Output`](Output) object, or an array of such objects, to forward the message to.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.types`**] | string<br />Array.&lt;string&gt;<br /> |(all messages)|A MIDI message type or an array of such types (`"noteon"`, `"controlchange"`, etc.), that the specified message must match in order to be forwarded. If this option is not specified, all types of messages will be forwarded. Valid messages are the ones found in either [`SYSTEM_MESSAGES`](Enumerations#SYSTEM_MESSAGES) or [`CHANNEL_MESSAGES`](Enumerations#CHANNEL_MESSAGES).|
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br /> |[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]|A MIDI channel number or an array of channel numbers that the message must match in order to be forwarded. By default all MIDI channels are included (`1` to `16`).|

  </div>



***

## Properties

### `.channels` {#channels}
**Type**: Array.&lt;number&gt;<br />


An array of MIDI channel numbers that the message must match in order to be forwarded. By
default, this array includes all MIDI channels (`1` to `16`).


### `.destinations` {#destinations}
**Type**: Array.&lt;Output&gt;<br />


An array of [`Output`](Output) objects to forward the message to.


### `.suspended` {#suspended}
**Type**: boolean<br />


Indicates whether message forwarding is currently suspended or not in this forwarder.


### `.types` {#types}
**Type**: Array.&lt;string&gt;<br />


An array of message types (`"noteon"`, `"controlchange"`, etc.) that must be matched in order
for messages to be forwarded. By default, this array includes all
[`Enumerations.SYSTEM_MESSAGES`](Enumerations#SYSTEM_MESSAGES) and
[`Enumerations.CHANNEL_MESSAGES`](Enumerations#CHANNEL_MESSAGES).



***

## Methods


### `.forward(...)` {#forward}


Sends the specified message to the forwarder's destination(s) if it matches the specified
type(s) and channel(s).


  **Parameters**

  > Signature: `forward(message)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`message`** | Message<br /> ||The [`Message`](Message) object to forward.|

  </div>






