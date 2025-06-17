
# Input

The `Input` class represents a single MIDI input port. This object is automatically instantiated
by the library according to the host's MIDI subsystem and does not need to be directly
instantiated. Instead, you can access all `Input` objects by referring to the
[`WebMidi.inputs`](WebMidi#inputs) array. You can also retrieve inputs by using methods such as
[`WebMidi.getInputByName()`](WebMidi#getInputByName) and
[`WebMidi.getInputById()`](WebMidi#getInputById).

Note that a single MIDI device may expose several inputs and/or outputs.

**Important**: the `Input` class does not directly fire channel-specific MIDI messages
(such as [`noteon`](InputChannel#event:noteon) or
[`controlchange`](InputChannel#event:controlchange), etc.). The [`InputChannel`](InputChannel)
object does that. However, you can still use the
[`Input.addListener()`](#addListener) method to listen to channel-specific events on multiple
[`InputChannel`](InputChannel) objects at once.


**Extends**: [`EventEmitter`](EventEmitter)
<!--**Extends**: EventEmitter-->

**Fires**: [`activesensing`](#event:activesensing), [`clock`](#event:clock), [`closed`](#event:closed), [`continue`](#event:continue), [`disconnected`](#event:disconnected), [`midimessage`](#event:midimessage), [`opened`](#event:opened), [`reset`](#event:reset), [`songposition`](#event:songposition), [`songselect`](#event:songselect), [`start`](#event:start), [`stop`](#event:stop), [`sysex`](#event:sysex), [`timecode`](#event:timecode), [`tunerequest`](#event:tunerequest), [`unknownmidimessage`](#event:unknownmidimessage)

### `Constructor`

Creates an `Input` object.


  **Parameters**

  > `new Input(midiInput)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`midiInput`** | MIDIInput<br /> ||[`MIDIInput`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIInput) object as provided by the MIDI subsystem (Web MIDI API).|

  </div>



***

## Properties

### `.channels` {#channels}
**Type**: Array.&lt;InputChannel&gt;<br />


Array containing the 16 [`InputChannel`](InputChannel) objects available for this `Input`. The
channels are numbered 1 through 16.


### `.connection` {#connection}
**Type**: string<br />
**Attributes**: read-only<br />


Input port's connection state: `pending`, `open` or `closed`.


### `.eventCount` {#eventCount}
**Type**: number<br />
**Attributes**: read-only<br />


The number of unique events that have registered listeners.

Note: this excludes global events registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) because they are not tied to a
specific event.


### `.eventMap` {#eventMap}
**Type**: Object<br />
**Attributes**: read-only<br />


An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the [`Listener`](Listener) objects registered
for the event.


### `.eventNames` {#eventNames}
**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />


An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) because they are not tied to a
specific event.


### `.eventsSuspended` {#eventsSuspended}
**Type**: boolean<br />


Whether or not the execution of callbacks is currently suspended for this emitter.


### `.id` {#id}
**Type**: string<br />
**Attributes**: read-only<br />


ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
the same port.


### `.manufacturer` {#manufacturer}
**Type**: string<br />
**Attributes**: read-only<br />


Name of the manufacturer of the device that makes this input port available.


### `.name` {#name}
**Type**: string<br />
**Attributes**: read-only<br />


Name of the MIDI input.


### `.octaveOffset` {#octaveOffset}
**Since**: 3.0<br />
**Type**: number<br />


An integer to offset the reported octave of incoming notes. By default, middle C (MIDI note
number 60) is placed on the 4th octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined in the
[`WebMidi.octaveOffset`](WebMidi#octaveOffset) property (if any).


### `.state` {#state}
**Type**: string<br />
**Attributes**: read-only<br />


State of the input port: `connected` or `disconnected`.


### `.type` {#type}
**Type**: string<br />
**Attributes**: read-only<br />


The port type. In the case of the `Input` object, this is always: `input`.



***

## Methods


### `.addForwarder(...)` {#addForwarder}


Adds a forwarder that will forward all incoming MIDI messages matching the criteria to the
specified [`Output`](Output) destination(s). This is akin to the hardware MIDI THRU port, with
the added benefit of being able to filter which data is forwarded.


  **Parameters**

  > Signature: `addForwarder(output, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`output`** | Output<br />Array.&lt;Output&gt;<br /> ||An [`Output`](Output) object, or an array of such objects, to forward messages to.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.types`**] | string<br />Array.&lt;string&gt;<br /> |(all messages)|A message type, or an array of such types (`noteon`, `controlchange`, etc.), that the message type must match in order to be forwarded. If this option is not specified, all types of messages will be forwarded. Valid messages are the ones found in either [`SYSTEM_MESSAGES`](Enumerations#SYSTEM_MESSAGES) or [`CHANNEL_MESSAGES`](Enumerations#CHANNEL_MESSAGES).|
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br /> |[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]|A MIDI channel number or an array of channel numbers that the message must match in order to be forwarded. By default all MIDI channels are included (`1` to `16`).|

  </div>


**Return Value**

> Returns: `Forwarder`<br />

The [`Forwarder`](Forwarder) object created to handle the forwarding. This
is useful if you wish to manipulate or remove the [`Forwarder`](Forwarder) later on.




### `.addListener(...)` {#addListener}


Adds an event listener that will trigger a function callback when the specified event is
dispatched. The event usually is **input-wide** but can also be **channel-specific**.

Input-wide events do not target a specific MIDI channel so it makes sense to listen for them
at the `Input` level and not at the [`InputChannel`](InputChannel) level. Channel-specific
events target a specific channel. Usually, in this case, you would add the listener to the
[`InputChannel`](InputChannel) object. However, as a convenience, you can also listen to
channel-specific events directly on an `Input`. This allows you to react to a channel-specific
event no matter which channel it actually came through.

When listening for an event, you simply need to specify the event name and the function to
execute:

```javascript
const listener = WebMidi.inputs[0].addListener("midimessage", e => {
  console.log(e);
});
```

Calling the function with an input-wide event (such as
[`"midimessage"`](#event:midimessage)), will return the [`Listener`](Listener) object
that was created.

If you call the function with a channel-specific event (such as
[`"noteon"`](InputChannel#event:noteon)), it will return an array of all
[`Listener`](Listener) objects that were created (one for each channel):

```javascript
const listeners = WebMidi.inputs[0].addListener("noteon", someFunction);
```

You can also specify which channels you want to add the listener to:

```javascript
const listeners = WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
```

In this case, `listeners` is an array containing 3 [`Listener`](Listener) objects. The order of
the listeners in the array follows the order the channels were specified in.

Note that, when adding channel-specific listeners, it is the [`InputChannel`](InputChannel)
instance that actually gets a listener added and not the `Input` instance. You can check that
by calling [`InputChannel.hasListener()`](InputChannel#hasListener()).

There are 8 families of events you can listen to:

1. **MIDI System Common** Events (input-wide)

   * [`songposition`](Input#event:songposition)
   * [`songselect`](Input#event:songselect)
   * [`sysex`](Input#event:sysex)
   * [`timecode`](Input#event:timecode)
   * [`tunerequest`](Input#event:tunerequest)

2. **MIDI System Real-Time** Events (input-wide)

   * [`clock`](Input#event:clock)
   * [`start`](Input#event:start)
   * [`continue`](Input#event:continue)
   * [`stop`](Input#event:stop)
   * [`activesensing`](Input#event:activesensing)
   * [`reset`](Input#event:reset)

3. **State Change** Events (input-wide)

   * [`opened`](Input#event:opened)
   * [`closed`](Input#event:closed)
   * [`disconnected`](Input#event:disconnected)

4. **Catch-All** Events (input-wide)

   * [`midimessage`](Input#event:midimessage)
   * [`unknownmidimessage`](Input#event:unknownmidimessage)

5. **Channel Voice** Events (channel-specific)

   * [`channelaftertouch`](InputChannel#event:channelaftertouch)
   * [`controlchange`](InputChannel#event:controlchange)
     * [`controlchange-controller0`](InputChannel#event:controlchange-controller0)
     * [`controlchange-controller1`](InputChannel#event:controlchange-controller1)
     * [`controlchange-controller2`](InputChannel#event:controlchange-controller2)
     * (...)
     * [`controlchange-controller127`](InputChannel#event:controlchange-controller127)
   * [`keyaftertouch`](InputChannel#event:keyaftertouch)
   * [`noteoff`](InputChannel#event:noteoff)
   * [`noteon`](InputChannel#event:noteon)
   * [`pitchbend`](InputChannel#event:pitchbend)
   * [`programchange`](InputChannel#event:programchange)

   Note: you can listen for a specific control change message by using an event name like this:
   `controlchange-controller23`, `controlchange-controller99`, `controlchange-controller122`,
   etc.

6. **Channel Mode** Events (channel-specific)

   * [`allnotesoff`](InputChannel#event:allnotesoff)
   * [`allsoundoff`](InputChannel#event:allsoundoff)
   * [`localcontrol`](InputChannel#event:localcontrol)
   * [`monomode`](InputChannel#event:monomode)
   * [`omnimode`](InputChannel#event:omnimode)
   * [`resetallcontrollers`](InputChannel#event:resetallcontrollers)

7. **NRPN** Events (channel-specific)

   * [`nrpn`](InputChannel#event:nrpn)
   * [`nrpn-dataentrycoarse`](InputChannel#event:nrpn-dataentrycoarse)
   * [`nrpn-dataentryfine`](InputChannel#event:nrpn-dataentryfine)
   * [`nrpn-dataincrement`](InputChannel#event:nrpn-dataincrement)
   * [`nrpn-datadecrement`](InputChannel#event:nrpn-datadecrement)

8. **RPN** Events (channel-specific)

   * [`rpn`](InputChannel#event:rpn)
   * [`rpn-dataentrycoarse`](InputChannel#event:rpn-dataentrycoarse)
   * [`rpn-dataentryfine`](InputChannel#event:rpn-dataentryfine)
   * [`rpn-dataincrement`](InputChannel#event:rpn-dataincrement)
   * [`rpn-datadecrement`](InputChannel#event:rpn-datadecrement)


  **Parameters**

  > Signature: `addListener(event, listener, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The type of the event.|
    |**`listener`** | function<br /> ||A callback function to execute when the specified event is detected. This function will receive an event parameter object. For details on this object's properties, check out the documentation for the various events (links above).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [`arguments`](Listener#arguments) property of the [`Listener`](Listener) object and can be retrieved or modified as desired.|
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br /> |[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]|An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to listen on. If no channel is specified, all channels will be used. This parameter is ignored for input-wide events.|
    |[**`options.context`**] | object<br /> |this|The value of `this` in the callback function.|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array and thus be triggered before others.|
    |[**`options.remaining`**] | number<br /> |Infinity|The number of times after which the callback should automatically be removed.|

  </div>


**Return Value**

> Returns: `Listener` or `Array.<Listener>`<br />

If the event is input-wide, a single [`Listener`](Listener)
object is returned. If the event is channel-specific, an array of all the
[`Listener`](Listener) objects is returned (one for each channel).




### `.addOneTimeListener(...)` {#addOneTimeListener}


Adds a one-time event listener that will trigger a function callback when the specified event
happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
dispatched by [`InputChannel`](InputChannel) objects and are tied to a specific MIDI
channel while input-wide events are dispatched by the `Input` object itself and are not tied
to a specific channel.

Calling the function with an input-wide event (such as
[`"midimessage"`](#event:midimessage)), will return the [`Listener`](Listener) object
that was created.

If you call the function with a channel-specific event (such as
[`"noteon"`](InputChannel#event:noteon)), it will return an array of all
[`Listener`](Listener) objects that were created (one for each channel):

```javascript
const listeners = WebMidi.inputs[0].addOneTimeListener("noteon", someFunction);
```

You can also specify which channels you want to add the listener to:

```javascript
const listeners = WebMidi.inputs[0].addOneTimeListener("noteon", someFunction, {channels: [1, 2, 3]});
```

In this case, the `listeners` variable contains an array of 3 [`Listener`](Listener) objects.

The code above will add a listener for the `"noteon"` event and call `someFunction` when the
event is triggered on MIDI channels `1`, `2` or `3`.

Note that, when adding events to channels, it is the [`InputChannel`](InputChannel) instance
that actually gets a listener added and not the `Input` instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the [`InputChannel`](InputChannel) object itself.

There are 8 families of events you can listen to:

1. **MIDI System Common** Events (input-wide)

   * [`songposition`](Input#event:songposition)
   * [`songselect`](Input#event:songselect)
   * [`sysex`](Input#event:sysex)
   * [`timecode`](Input#event:timecode)
   * [`tunerequest`](Input#event:tunerequest)

2. **MIDI System Real-Time** Events (input-wide)

   * [`clock`](Input#event:clock)
   * [`start`](Input#event:start)
   * [`continue`](Input#event:continue)
   * [`stop`](Input#event:stop)
   * [`activesensing`](Input#event:activesensing)
   * [`reset`](Input#event:reset)

3. **State Change** Events (input-wide)

   * [`opened`](Input#event:opened)
   * [`closed`](Input#event:closed)
   * [`disconnected`](Input#event:disconnected)

4. **Catch-All** Events (input-wide)

   * [`midimessage`](Input#event:midimessage)
   * [`unknownmidimessage`](Input#event:unknownmidimessage)

5. **Channel Voice** Events (channel-specific)

   * [`channelaftertouch`](InputChannel#event:channelaftertouch)
   * [`controlchange`](InputChannel#event:controlchange)
     * [`controlchange-controller0`](InputChannel#event:controlchange-controller0)
     * [`controlchange-controller1`](InputChannel#event:controlchange-controller1)
     * [`controlchange-controller2`](InputChannel#event:controlchange-controller2)
     * (...)
     * [`controlchange-controller127`](InputChannel#event:controlchange-controller127)
   * [`keyaftertouch`](InputChannel#event:keyaftertouch)
   * [`noteoff`](InputChannel#event:noteoff)
   * [`noteon`](InputChannel#event:noteon)
   * [`pitchbend`](InputChannel#event:pitchbend)
   * [`programchange`](InputChannel#event:programchange)

   Note: you can listen for a specific control change message by using an event name like this:
   `controlchange-controller23`, `controlchange-controller99`, `controlchange-controller122`,
   etc.

6. **Channel Mode** Events (channel-specific)

   * [`allnotesoff`](InputChannel#event:allnotesoff)
   * [`allsoundoff`](InputChannel#event:allsoundoff)
   * [`localcontrol`](InputChannel#event:localcontrol)
   * [`monomode`](InputChannel#event:monomode)
   * [`omnimode`](InputChannel#event:omnimode)
   * [`resetallcontrollers`](InputChannel#event:resetallcontrollers)

7. **NRPN** Events (channel-specific)

   * [`nrpn`](InputChannel#event:nrpn)
   * [`nrpn-dataentrycoarse`](InputChannel#event:nrpn-dataentrycoarse)
   * [`nrpn-dataentryfine`](InputChannel#event:nrpn-dataentryfine)
   * [`nrpn-dataincrement`](InputChannel#event:nrpn-dataincrement)
   * [`nrpn-datadecrement`](InputChannel#event:nrpn-datadecrement)

8. **RPN** Events (channel-specific)

   * [`rpn`](InputChannel#event:rpn)
   * [`rpn-dataentrycoarse`](InputChannel#event:rpn-dataentrycoarse)
   * [`rpn-dataentryfine`](InputChannel#event:rpn-dataentryfine)
   * [`rpn-dataincrement`](InputChannel#event:rpn-dataincrement)
   * [`rpn-datadecrement`](InputChannel#event:rpn-datadecrement)


  **Parameters**

  > Signature: `addOneTimeListener(event, listener, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br /> ||The type of the event.|
    |**`listener`** | function<br /> ||A callback function to execute when the specified event is detected. This function will receive an event parameter object. For details on this object's properties, check out the documentation for the various events (links above).|
    |[**`options`**] | object<br /> |{}||
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [`arguments`](Listener#arguments) property of the [`Listener`](Listener) object and can be retrieved or modified as desired.|
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br /> ||An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to listen on. This parameter is ignored for input-wide events.|
    |[**`options.context`**] | object<br /> |this|The value of `this` in the callback function.|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array and thus be triggered before others.|

  </div>


**Return Value**

> Returns: `Array.<Listener>`<br />

An array of all [`Listener`](Listener) objects that were created.




### `.close()` {#close}

**Attributes**: async

Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
the input is opened again by calling [`Input.open()`](Input#open).

**Note**: if what you want to do is stop events from being dispatched, you should use
[`eventsSuspended`](#eventsSuspended) instead.


**Return Value**

> Returns: `Promise.<Input>`<br />

The promise is fulfilled with the `Input` object




### `.destroy()` {#destroy}

**Attributes**: async

Destroys the `Input` by removing all listeners, emptying the [`channels`](#channels) array and
unlinking the MIDI subsystem. This is mostly for internal use.


**Return Value**

> Returns: `Promise.<void>`<br />




### `.emit(...)` {#emit}


Executes the callback function of all the [`Listener`](Listener) objects registered for
a given event. The callback functions are passed the additional arguments passed to `emit()`
(if any) followed by the arguments present in the [`arguments`](Listener#arguments) property of
the [`Listener`](Listener) object (if any).

If the [`eventsSuspended`](#eventsSuspended) property is `true` or the
[`Listener.suspended`](Listener#suspended) property is `true`, the callback functions
will not be executed.

This function returns an array containing the return values of each of the callbacks.

It should be noted that the regular listeners are triggered first followed by the global
listeners (those added with [`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT)).


  **Parameters**

  > Signature: `emit(event, ...args)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br /> ||The event|
    |**`args`** | *<br /> ||Arbitrary number of arguments to pass along to the callback functions|

  </div>


**Return Value**

> Returns: `Array`<br />

An array containing the return value of each of the executed listener
functions.


**Throws**:
  * `TypeError` : The `event` parameter must be a string.


### `.getListenerCount(...)` {#getListenerCount}


Returns the number of listeners registered for a specific event.

Please note that global events (those added with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT)) do not count towards the remaining
number for a "regular" event. To get the number of global listeners, specifically use
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the parameter.


  **Parameters**

  > Signature: `getListenerCount(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />Symbol<br /> ||The event which is usually a string but can also be the special [`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) symbol.|

  </div>


**Return Value**

> Returns: `number`<br />

An integer representing the number of listeners registered for the specified
event.




### `.getListeners(...)` {#getListeners}


Returns an array of all the [`Listener`](Listener) objects that have been registered for
a specific event.

Please note that global events (those added with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT)) are not returned for "regular"
events. To get the list of global listeners, specifically use
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the parameter.


  **Parameters**

  > Signature: `getListeners(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />Symbol<br /> ||The event to get listeners for.|

  </div>


**Return Value**

> Returns: `Array.<Listener>`<br />

An array of [`Listener`](Listener) objects.




### `.hasForwarder(...)` {#hasForwarder}


Checks whether the specified [`Forwarder`](Forwarder) object has already been attached to this
input.


  **Parameters**

  > Signature: `hasForwarder(forwarder)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`forwarder`** | Forwarder<br /> ||The [`Forwarder`](Forwarder) to check for (the [`Forwarder`](Forwarder) object is returned when calling [`addForwarder()`](#addForwarder).|

  </div>


**Return Value**

> Returns: `boolean`<br />




### `.hasListener(...)` {#hasListener}


Checks if the specified event type is already defined to trigger the specified callback
function. For channel-specific events, the function will return `true` only if all channels
have the listener defined.


  **Parameters**

  > Signature: `hasListener(event, listener, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />Symbol<br /> ||The type of the event.|
    |**`listener`** | function<br /> ||The callback function to check for.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br /> ||An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to check. This parameter is ignored for input-wide events.|

  </div>


**Return Value**

> Returns: `boolean`<br />

Boolean value indicating whether or not the `Input` or
[`InputChannel`](InputChannel) already has this listener defined.




### `.open()` {#open}

**Attributes**: async

Opens the input for usage. This is usually unnecessary as the port is opened automatically when
WebMidi is enabled.


**Return Value**

> Returns: `Promise.<Input>`<br />

The promise is fulfilled with the `Input` object.




### `.removeForwarder(...)` {#removeForwarder}


Removes the specified [`Forwarder`](Forwarder) object from the input.


  **Parameters**

  > Signature: `removeForwarder(forwarder)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`forwarder`** | Forwarder<br /> ||The [`Forwarder`](Forwarder) to remove (the [`Forwarder`](Forwarder) object is returned when calling `addForwarder()`.|

  </div>






### `.removeListener(...)` {#removeListener}


Removes the specified event listener. If no listener is specified, all listeners matching the
specified event will be removed. If the event is channel-specific, the listener will be removed
from all [`InputChannel`](InputChannel) objects belonging to that channel. If no event is
specified, all listeners for the `Input` as well as all listeners for all
[`InputChannel`](InputChannel) objects belonging to the `Input` will be removed.

By default, channel-specific listeners will be removed from all
[`InputChannel`](InputChannel) objects unless the `options.channel` narrows it down.


  **Parameters**

  > Signature: `removeListener([type], [listener], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`type`**] | string<br /> ||The type of the event.|
    |[**`listener`**] | function<br /> ||The callback function to check for.|
    |[**`options`**] | object<br /> |{}||
    |[**`options.channels`**] | number<br />Array.&lt;number&gt;<br /> ||An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to match. This parameter is ignored for input-wide events.|
    |[**`options.context`**] | *<br /> ||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] | number<br /> ||Only remove the listener if it has exactly that many remaining times to be executed.|

  </div>






### `.suspendEvent(...)` {#suspendEvent}


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) by passing
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) to `suspendEvent()`. Beware that this
will not suspend all callbacks but only those registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT). While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
listeners alone. If you truly want to suspends all callbacks for a specific
[`EventEmitter`](EventEmitter), simply set its `eventsSuspended` property to `true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />Symbol<br /> ||The event name (or `EventEmitter.ANY_EVENT`) for which to suspend execution of all callback functions.|

  </div>






### `.unsuspendEvent(...)` {#unsuspendEvent}


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) by passing
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) to `unsuspendEvent()`. Beware that
this will not resume all callbacks but only those registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT). While this may seem
counter-intuitive, it allows the selective unsuspension of global listeners while leaving other
callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />Symbol<br /> ||The event name (or `EventEmitter.ANY_EVENT`) for which to resume execution of all callback functions.|

  </div>






### `.waitFor(...)` {#waitFor}

**Attributes**: async

The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
when the specified event occurs. The event can be a regular event or
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) (if you want to resolve as soon as any
event is emitted).

If the `duration` option is set, the promise will only be fulfilled if the event is emitted
within the specified duration. If the event has not been fulfilled after the specified
duration, the promise is rejected. This makes it super easy to wait for an event and timeout
after a certain time if the event is not triggered.


  **Parameters**

  > Signature: `waitFor(event, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />Symbol<br /> ||The event to wait for|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds to wait before the promise is automatically rejected.|

  </div>






***

## Events

### `activesensing` {#event-activesensing}

<a id="event:activesensing"></a>


Input-wide (system) event emitted when an **active sensing** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`activesensing`|


### `clock` {#event-clock}

<a id="event:clock"></a>


Input-wide (system) event emitted when a **timing clock** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`clock`|


### `closed` {#event-closed}

<a id="event:closed"></a>


Event emitted when the `Input` has been closed by calling the
[`close()`](#close) method.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`closed`|
  |**`target`** |Input|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|


### `continue` {#event-continue}

<a id="event:continue"></a>


Input-wide (system) event emitted when a **continue** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`continue`|


### `disconnected` {#event-disconnected}

<a id="event:disconnected"></a>


Event emitted when the `Input` becomes unavailable. This event is typically fired
when the MIDI device is unplugged.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`disconnected`|
  |**`port`** |Input|Object with properties describing the [Input](Input) that was disconnected. This is not the actual `Input` as it is no longer available.|
  |**`target`** |Input|The object that dispatched the event.|


### `midimessage` {#event-midimessage}

<a id="event:midimessage"></a>


Event emitted when any MIDI message is received on an `Input`.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`midimessage`|


### `opened` {#event-opened}

<a id="event:opened"></a>


Event emitted when the `Input` has been opened by calling the [`open()`](#open)
method.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`opened`|
  |**`target`** |Input|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|


### `reset` {#event-reset}

<a id="event:reset"></a>


Input-wide (system) event emitted when a **reset** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`reset`|


### `songposition` {#event-songposition}

<a id="event:songposition"></a>


Input-wide (system) event emitted when a **song position** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`songposition`|


### `songselect` {#event-songselect}

<a id="event:songselect"></a>


Input-wide (system) event emitted when a **song select** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |string|Song (or sequence) number to select (0-127)|
  |**`rawValue`** |string|Song (or sequence) number to select (0-127)|


### `start` {#event-start}

<a id="event:start"></a>


Input-wide (system) event emitted when a **start** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`start`|


### `stop` {#event-stop}

<a id="event:stop"></a>


Input-wide (system) event emitted when a **stop** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`stop`|


### `sysex` {#event-sysex}

<a id="event:sysex"></a>


Input-wide (system) event emitted when a **system exclusive** message has been received.
You should note that, to receive `sysex` events, you must call the
[`WebMidi.enable()`](WebMidi#enable()) method with the `sysex` option set to `true`:

```js
WebMidi.enable({sysex: true})
 .then(() => console.log("WebMidi has been enabled with sysex support."))
```



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`sysex`|


### `timecode` {#event-timecode}

<a id="event:timecode"></a>


Input-wide (system) event emitted when a **time code quarter frame** message has been
received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`timecode`|


### `tunerequest` {#event-tunerequest}

<a id="event:tunerequest"></a>


Input-wide (system) event emitted when a **tune request** message has been received.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`tunerequest`|


### `unknownmessage` {#event-unknownmessage}

<a id="event:unknownmessage"></a>


Input-wide (system) event emitted when an unknown MIDI message has been received. It could
be, for example, one of the undefined/reserved messages.

**Since**: 2.1


**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`target`** |Input|The object that dispatched the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`type`** |string|`unknownmessage`|



