
# InputChannel

The `InputChannel` class represents a single MIDI input channel (1-16) from a single input
device. This object is derived from the host's MIDI subsystem and should not be instantiated
directly.

All 16 `InputChannel` objects can be found inside the input's [`channels`](Input#channels)
property.

**Since**: 3.0.0

**Extends**: [`EventEmitter`](EventEmitter)
<!--**Extends**: EventEmitter-->

**Fires**: [`allnotesoff`](#event:allnotesoff), [`allsoundoff`](#event:allsoundoff), [`channelaftertouch`](#event:channelaftertouch), [`controlchange`](#event:controlchange), [`controlchange-allnotesoff`](#event:controlchange-allnotesoff), [`controlchange-allsoundoff`](#event:controlchange-allsoundoff), [`controlchange-attacktime`](#event:controlchange-attacktime), [`controlchange-balancecoarse`](#event:controlchange-balancecoarse), [`controlchange-balancefine`](#event:controlchange-balancefine), [`controlchange-bankselectcoarse`](#event:controlchange-bankselectcoarse), [`controlchange-bankselectfine`](#event:controlchange-bankselectfine), [`controlchange-breathcontrollercoarse`](#event:controlchange-breathcontrollercoarse), [`controlchange-breathcontrollerfine`](#event:controlchange-breathcontrollerfine), [`controlchange-brightness`](#event:controlchange-brightness), [`controlchange-channelvolumefine`](#event:controlchange-channelvolumefine), [`controlchange-controllerxxx`](#event:controlchange-controllerxxx), [`controlchange-damperpedal`](#event:controlchange-damperpedal), [`controlchange-datadecrement`](#event:controlchange-datadecrement), [`controlchange-dataentrycoarse`](#event:controlchange-dataentrycoarse), [`controlchange-dataentryfine`](#event:controlchange-dataentryfine), [`controlchange-dataincrement`](#event:controlchange-dataincrement), [`controlchange-decaytime`](#event:controlchange-decaytime), [`controlchange-effect1depth`](#event:controlchange-effect1depth), [`controlchange-effect2depth`](#event:controlchange-effect2depth), [`controlchange-effect3depth`](#event:controlchange-effect3depth), [`controlchange-effect4depth`](#event:controlchange-effect4depth), [`controlchange-effect5depth`](#event:controlchange-effect5depth), [`controlchange-effectcontrol1coarse`](#event:controlchange-effectcontrol1coarse), [`controlchange-effectcontrol1fine`](#event:controlchange-effectcontrol1fine), [`controlchange-effectcontrol2coarse`](#event:controlchange-effectcontrol2coarse), [`controlchange-effectcontrol2fine`](#event:controlchange-effectcontrol2fine), [`controlchange-expressioncoarse`](#event:controlchange-expressioncoarse), [`controlchange-expressionfine`](#event:controlchange-expressionfine), [`controlchange-footcontrollercoarse`](#event:controlchange-footcontrollercoarse), [`controlchange-footcontrollerfine`](#event:controlchange-footcontrollerfine), [`controlchange-generalpurposecontroller1`](#event:controlchange-generalpurposecontroller1), [`controlchange-generalpurposecontroller2`](#event:controlchange-generalpurposecontroller2), [`controlchange-generalpurposecontroller3`](#event:controlchange-generalpurposecontroller3), [`controlchange-generalpurposecontroller4`](#event:controlchange-generalpurposecontroller4), [`controlchange-generalpurposecontroller5`](#event:controlchange-generalpurposecontroller5), [`controlchange-generalpurposecontroller6`](#event:controlchange-generalpurposecontroller6), [`controlchange-generalpurposecontroller7`](#event:controlchange-generalpurposecontroller7), [`controlchange-generalpurposecontroller8`](#event:controlchange-generalpurposecontroller8), [`controlchange-highresolutionvelocityprefix`](#event:controlchange-highresolutionvelocityprefix), [`controlchange-hold2`](#event:controlchange-hold2), [`controlchange-legatopedal`](#event:controlchange-legatopedal), [`controlchange-localcontrol`](#event:controlchange-localcontrol), [`controlchange-modulationwheelcoarse`](#event:controlchange-modulationwheelcoarse), [`controlchange-modulationwheelfine`](#event:controlchange-modulationwheelfine), [`controlchange-monomodeon`](#event:controlchange-monomodeon), [`controlchange-nonregisteredparametercoarse`](#event:controlchange-nonregisteredparametercoarse), [`controlchange-nonregisteredparameterfine`](#event:controlchange-nonregisteredparameterfine), [`controlchange-omnimodeoff`](#event:controlchange-omnimodeoff), [`controlchange-omnimodeon`](#event:controlchange-omnimodeon), [`controlchange-pancoarse`](#event:controlchange-pancoarse), [`controlchange-panfine`](#event:controlchange-panfine), [`controlchange-polymodeon`](#event:controlchange-polymodeon), [`controlchange-portamento`](#event:controlchange-portamento), [`controlchange-portamentocontrol`](#event:controlchange-portamentocontrol), [`controlchange-portamentotimecoarse`](#event:controlchange-portamentotimecoarse), [`controlchange-portamentotimefine`](#event:controlchange-portamentotimefine), [`controlchange-registeredparametercoarse`](#event:controlchange-registeredparametercoarse), [`controlchange-registeredparameterfine`](#event:controlchange-registeredparameterfine), [`controlchange-releasetime`](#event:controlchange-releasetime), [`controlchange-resetallcontrollers`](#event:controlchange-resetallcontrollers), [`controlchange-resonance`](#event:controlchange-resonance), [`controlchange-softpedal`](#event:controlchange-softpedal), [`controlchange-sostenuto`](#event:controlchange-sostenuto), [`controlchange-soundvariation`](#event:controlchange-soundvariation), [`controlchange-vibratodelay`](#event:controlchange-vibratodelay), [`controlchange-vibratodepth`](#event:controlchange-vibratodepth), [`controlchange-vibratorate`](#event:controlchange-vibratorate), [`controlchange-volumecoarse`](#event:controlchange-volumecoarse), [`event`](#event:event), [`keyaftertouch`](#event:keyaftertouch), [`localcontrol`](#event:localcontrol), [`midimessage`](#event:midimessage), [`monomode`](#event:monomode), [`noteoff`](#event:noteoff), [`noteon`](#event:noteon), [`nrpn`](#event:nrpn), [`nrpn-datadecrement`](#event:nrpn-datadecrement), [`nrpn-dataentrycoarse`](#event:nrpn-dataentrycoarse), [`nrpn-dataentryfine`](#event:nrpn-dataentryfine), [`nrpn-dataincrement`](#event:nrpn-dataincrement), [`omnimode`](#event:omnimode), [`pitchbend`](#event:pitchbend), [`programchange`](#event:programchange), [`resetallcontrollers`](#event:resetallcontrollers), [`rpn`](#event:rpn), [`rpn-datadecrement`](#event:rpn-datadecrement), [`rpn-dataentrycoarse`](#event:rpn-dataentrycoarse), [`rpn-dataentryfine`](#event:rpn-dataentryfine), [`rpn-dataincrement`](#event:rpn-dataincrement), [`unknownmessage`](#event:unknownmessage)

### `Constructor`

Creates an `InputChannel` object.


  **Parameters**

  > `new InputChannel(input, number)`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`input`** | Input<br /> ||The [`Input`](Input) object this channel belongs to.|
    |**`number`** | number<br /> ||The channel's MIDI number (1-16).|

  </div>



***

## Properties

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


### `.input` {#input}
**Since**: 3.0<br />
**Type**: Input<br />


The [`Input`](Input) this channel belongs to.


### `.notesState` {#notesState}
**Type**: Array.&lt;boolean&gt;<br />


Contains the current playing state of all MIDI notes of this channel (0-127). The state is
`true` for a currently playing note and `false` otherwise.


### `.number` {#number}
**Since**: 3.0<br />
**Type**: number<br />


This channel's MIDI number (1-16).


### `.octaveOffset` {#octaveOffset}
**Since**: 3.0<br />
**Type**: number<br />


An integer to offset the reported octave of incoming note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined by
[`WebMidi.octaveOffset`](WebMidi#octaveOffset) object and with the value defined on the parent
input object with [`Input.octaveOffset`](Input#octaveOffset).


### `.parameterNumberEventsEnabled` {#parameterNumberEventsEnabled}
**Type**: boolean<br />


Indicates whether events for **Registered Parameter Number** and **Non-Registered Parameter
Number** should be dispatched. RPNs and NRPNs are composed of a sequence of specific
**control change** messages. When a valid sequence of such control change messages is
received, an [`rpn`](#event-rpn) or [`nrpn`](#event-nrpn) event will fire.

If an invalid or out-of-order **control change** message is received, it will fall through
the collector logic and all buffered **control change** messages will be discarded as
incomplete.



***

## Methods


### `.addListener(...)` {#addListener}


Adds a listener for the specified event. It returns the [`Listener`](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use
[`EventEmitter.ANY_EVENT`](#ANY_EVENT) as the first parameter. Note that a global
listener will also be triggered by non-registered events.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />Symbol<br /> ||The event to listen to.|
    |**`callback`** | EventEmitter~callback<br /> ||The callback function to execute when the event occurs.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |this|The value of `this` in the callback function.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array and thus executed first.|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] | number<br /> |Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [`arguments`](Listener#arguments) property of the [`Listener`](Listener) object and can be retrieved or modified as desired.|

  </div>


**Return Value**

> Returns: `Listener`<br />

The newly created [`Listener`](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT).
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)` {#addOneTimeListener}


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [`Listener`](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the first parameter. Note that a
global listener will also be triggered by non-registered events.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />Symbol<br /> ||The event to listen to|
    |**`callback`** | EventEmitter~callback<br /> ||The callback function to execute when the event occurs|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |this|The context to invoke the callback function in.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array and thus executed first.|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [`arguments`](Listener#arguments) property of the [`Listener`](Listener) object and can be retrieved or modified as desired.|

  </div>


**Return Value**

> Returns: `Listener`<br />

The newly created [`Listener`](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT).
  * `TypeError` : The `callback` parameter must be a function.


### `.destroy()` {#destroy}


Destroys the `InputChannel` by removing all listeners and severing the link with the MIDI
subsystem's input.






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




### `.getNoteState(...)` {#getNoteState}

**Since**: version 3.0.0<br />

Returns the playing status of the specified note (`true` if the note is currently playing,
`false` if it is not). The `note` parameter can be an unsigned integer (0-127), a note
identifier (`"C4"`, `"G#5"`, etc.) or a [`Note`](Note) object.

IF the note is specified using an integer (0-127), no octave offset will be applied.


  **Parameters**

  > Signature: `getNoteState(note)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`note`** | number<br />string<br />Note<br /> ||The note to get the state for. The [`octaveOffset`](#octaveOffset) (channel, input and global) will be factored in for note identifiers and [`Note`](Note) objects.|

  </div>


**Return Value**

> Returns: `boolean`<br />




### `.hasListener(...)` {#hasListener}


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT)).

Note: to specifically check for global listeners added with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT), use
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] | string<br />Symbol<br /> |(any event)|The event to check|
    |[**`callback`**] | function<br />Listener<br /> |(any callback)|The actual function that was added to the event or the [Listener](Listener) object returned by `addListener()`.|

  </div>


**Return Value**

> Returns: `boolean`<br />




### `.removeListener(...)` {#removeListener}


Removes all the listeners that were added to the object upon which the method is called and
that match the specified criterias. If no parameters are passed, all listeners added to this
object will be removed. If only the `event` parameter is passed, all listeners for that event
will be removed from that object. You can remove global listeners by using
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.


  **Parameters**

  > Signature: `removeListener([event], [callback], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] | string<br /> ||The event name.|
    |[**`callback`**] | EventEmitter~callback<br /> ||Only remove the listeners that match this exact callback function.|
    |[**`options`**] | Object<br /> |||
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

### `allnotesoff` {#event-allnotesoff}

<a id="event:allnotesoff"></a>


Event emitted when an "all notes off" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`allnotesoff`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `allsoundoff` {#event-allsoundoff}

<a id="event:allsoundoff"></a>


Event emitted when an "all sound off" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`allsoundoff`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `channelaftertouch` {#event-channelaftertouch}

<a id="event:channelaftertouch"></a>


Event emitted when a control change MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`channelaftertouch`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The raw MIDI value expressed as an integer between 0 and 127.|


### `controlchange` {#event-controlchange}

<a id="event:controlchange"></a>


Event emitted when a **control change** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange`|
  |**`subtype`** |string|The type of control change message that was received.|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-allnotesoff` {#event-controlchange-allnotesoff}

<a id="event:controlchange-allnotesoff"></a>


Event emitted when a **controlchange-allnotesoff** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-allnotesoff`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-allsoundoff` {#event-controlchange-allsoundoff}

<a id="event:controlchange-allsoundoff"></a>


Event emitted when a **controlchange-allsoundoff** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-allsoundoff`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-attacktime` {#event-controlchange-attacktime}

<a id="event:controlchange-attacktime"></a>


Event emitted when a **controlchange-attacktime** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-attacktime`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-balancecoarse` {#event-controlchange-balancecoarse}

<a id="event:controlchange-balancecoarse"></a>


Event emitted when a **controlchange-balancecoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-balancecoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-balancefine` {#event-controlchange-balancefine}

<a id="event:controlchange-balancefine"></a>


Event emitted when a **controlchange-balancefine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-balancefine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-bankselectcoarse` {#event-controlchange-bankselectcoarse}

<a id="event:controlchange-bankselectcoarse"></a>


Event emitted when a **controlchange-bankselectcoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-bankselectcoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-bankselectfine` {#event-controlchange-bankselectfine}

<a id="event:controlchange-bankselectfine"></a>


Event emitted when a **controlchange-bankselectfine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-bankselectfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-breathcontrollercoarse` {#event-controlchange-breathcontrollercoarse}

<a id="event:controlchange-breathcontrollercoarse"></a>


Event emitted when a **controlchange-breathcontrollercoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-breathcontrollercoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-breathcontrollerfine` {#event-controlchange-breathcontrollerfine}

<a id="event:controlchange-breathcontrollerfine"></a>


Event emitted when a **controlchange-breathcontrollerfine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-breathcontrollerfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-brightness` {#event-controlchange-brightness}

<a id="event:controlchange-brightness"></a>


Event emitted when a **controlchange-brightness** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-brightness`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-channelvolumefine` {#event-controlchange-channelvolumefine}

<a id="event:controlchange-channelvolumefine"></a>


Event emitted when a **controlchange-channelvolumefine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-channelvolumefine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-controllerxxx` {#event-controlchange-controllerxxx}

<a id="event:controlchange-controllerxxx"></a>


Event emitted when a **control change** MIDI message has been received and that message is
targeting the controller numbered "xxx". Of course, "xxx" should be replaced by a valid
controller number (0-127).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-controllerxxx`|
  |**`subtype`** |string|The type of control change message that was received.|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-damperpedal` {#event-controlchange-damperpedal}

<a id="event:controlchange-damperpedal"></a>


Event emitted when a **controlchange-damperpedal** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-damperpedal`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-datadecrement` {#event-controlchange-datadecrement}

<a id="event:controlchange-datadecrement"></a>


Event emitted when a **controlchange-datadecrement** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-datadecrement`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-dataentrycoarse` {#event-controlchange-dataentrycoarse}

<a id="event:controlchange-dataentrycoarse"></a>


Event emitted when a **controlchange-dataentrycoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-dataentrycoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-dataentryfine` {#event-controlchange-dataentryfine}

<a id="event:controlchange-dataentryfine"></a>


Event emitted when a **controlchange-dataentryfine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-dataentryfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-dataincrement` {#event-controlchange-dataincrement}

<a id="event:controlchange-dataincrement"></a>


Event emitted when a **controlchange-dataincrement** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-dataincrement`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-decaytime` {#event-controlchange-decaytime}

<a id="event:controlchange-decaytime"></a>


Event emitted when a **controlchange-decaytime** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-decaytime`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-effect1depth` {#event-controlchange-effect1depth}

<a id="event:controlchange-effect1depth"></a>


Event emitted when a **controlchange-effect1depth** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-effect1depth`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-effect2depth` {#event-controlchange-effect2depth}

<a id="event:controlchange-effect2depth"></a>


Event emitted when a **controlchange-effect2depth** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-effect2depth`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-effect3depth` {#event-controlchange-effect3depth}

<a id="event:controlchange-effect3depth"></a>


Event emitted when a **controlchange-effect3depth** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-effect3depth`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-effect4depth` {#event-controlchange-effect4depth}

<a id="event:controlchange-effect4depth"></a>


Event emitted when a **controlchange-effect4depth** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-effect4depth`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-effect5depth` {#event-controlchange-effect5depth}

<a id="event:controlchange-effect5depth"></a>


Event emitted when a **controlchange-effect5depth** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-effect5depth`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-effectcontrol1coarse` {#event-controlchange-effectcontrol1coarse}

<a id="event:controlchange-effectcontrol1coarse"></a>


Event emitted when a **controlchange-effectcontrol1coarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-effectcontrol1coarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-effectcontrol1fine` {#event-controlchange-effectcontrol1fine}

<a id="event:controlchange-effectcontrol1fine"></a>


Event emitted when a **controlchange-effectcontrol1fine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-effectcontrol1fine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-effectcontrol2coarse` {#event-controlchange-effectcontrol2coarse}

<a id="event:controlchange-effectcontrol2coarse"></a>


Event emitted when a **controlchange-effectcontrol2coarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-effectcontrol2coarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-effectcontrol2fine` {#event-controlchange-effectcontrol2fine}

<a id="event:controlchange-effectcontrol2fine"></a>


Event emitted when a **controlchange-effectcontrol2fine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-effectcontrol2fine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-expressioncoarse` {#event-controlchange-expressioncoarse}

<a id="event:controlchange-expressioncoarse"></a>


Event emitted when a **controlchange-expressioncoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-expressioncoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-expressionfine` {#event-controlchange-expressionfine}

<a id="event:controlchange-expressionfine"></a>


Event emitted when a **controlchange-expressionfine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-expressionfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-footcontrollercoarse` {#event-controlchange-footcontrollercoarse}

<a id="event:controlchange-footcontrollercoarse"></a>


Event emitted when a **controlchange-footcontrollercoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-footcontrollercoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-footcontrollerfine` {#event-controlchange-footcontrollerfine}

<a id="event:controlchange-footcontrollerfine"></a>


Event emitted when a **controlchange-footcontrollerfine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-footcontrollerfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-generalpurposecontroller1` {#event-controlchange-generalpurposecontroller1}

<a id="event:controlchange-generalpurposecontroller1"></a>


Event emitted when a **controlchange-generalpurposecontroller1** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-generalpurposecontroller1`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-generalpurposecontroller2` {#event-controlchange-generalpurposecontroller2}

<a id="event:controlchange-generalpurposecontroller2"></a>


Event emitted when a **controlchange-generalpurposecontroller2** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-generalpurposecontroller2`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-generalpurposecontroller3` {#event-controlchange-generalpurposecontroller3}

<a id="event:controlchange-generalpurposecontroller3"></a>


Event emitted when a **controlchange-generalpurposecontroller3** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-generalpurposecontroller3`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-generalpurposecontroller4` {#event-controlchange-generalpurposecontroller4}

<a id="event:controlchange-generalpurposecontroller4"></a>


Event emitted when a **controlchange-generalpurposecontroller4** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-generalpurposecontroller4`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-generalpurposecontroller5` {#event-controlchange-generalpurposecontroller5}

<a id="event:controlchange-generalpurposecontroller5"></a>


Event emitted when a **controlchange-generalpurposecontroller5** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-generalpurposecontroller5`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-generalpurposecontroller6` {#event-controlchange-generalpurposecontroller6}

<a id="event:controlchange-generalpurposecontroller6"></a>


Event emitted when a **controlchange-generalpurposecontroller6** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-generalpurposecontroller6`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-generalpurposecontroller7` {#event-controlchange-generalpurposecontroller7}

<a id="event:controlchange-generalpurposecontroller7"></a>


Event emitted when a **controlchange-generalpurposecontroller7** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-generalpurposecontroller7`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-generalpurposecontroller8` {#event-controlchange-generalpurposecontroller8}

<a id="event:controlchange-generalpurposecontroller8"></a>


Event emitted when a **controlchange-generalpurposecontroller8** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-generalpurposecontroller8`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-highresolutionvelocityprefix` {#event-controlchange-highresolutionvelocityprefix}

<a id="event:controlchange-highresolutionvelocityprefix"></a>


Event emitted when a **controlchange-highresolutionvelocityprefix** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-highresolutionvelocityprefix`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-hold2` {#event-controlchange-hold2}

<a id="event:controlchange-hold2"></a>


Event emitted when a **controlchange-hold2** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-hold2`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-legatopedal` {#event-controlchange-legatopedal}

<a id="event:controlchange-legatopedal"></a>


Event emitted when a **controlchange-legatopedal** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-legatopedal`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-localcontrol` {#event-controlchange-localcontrol}

<a id="event:controlchange-localcontrol"></a>


Event emitted when a **controlchange-localcontrol** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-localcontrol`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-modulationwheelcoarse` {#event-controlchange-modulationwheelcoarse}

<a id="event:controlchange-modulationwheelcoarse"></a>


Event emitted when a **controlchange-modulationwheelcoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-modulationwheelcoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-modulationwheelfine` {#event-controlchange-modulationwheelfine}

<a id="event:controlchange-modulationwheelfine"></a>


Event emitted when a **controlchange-modulationwheelfine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-modulationwheelfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-monomodeon` {#event-controlchange-monomodeon}

<a id="event:controlchange-monomodeon"></a>


Event emitted when a **controlchange-monomodeon** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-monomodeon`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-nonregisteredparametercoarse` {#event-controlchange-nonregisteredparametercoarse}

<a id="event:controlchange-nonregisteredparametercoarse"></a>


Event emitted when a **controlchange-nonregisteredparametercoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-nonregisteredparametercoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-nonregisteredparameterfine` {#event-controlchange-nonregisteredparameterfine}

<a id="event:controlchange-nonregisteredparameterfine"></a>


Event emitted when a **controlchange-nonregisteredparameterfine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-nonregisteredparameterfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-omnimodeoff` {#event-controlchange-omnimodeoff}

<a id="event:controlchange-omnimodeoff"></a>


Event emitted when a **controlchange-omnimodeoff** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-omnimodeoff`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-omnimodeon` {#event-controlchange-omnimodeon}

<a id="event:controlchange-omnimodeon"></a>


Event emitted when a **controlchange-omnimodeon** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-omnimodeon`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-pancoarse` {#event-controlchange-pancoarse}

<a id="event:controlchange-pancoarse"></a>


Event emitted when a **controlchange-pancoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-pancoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-panfine` {#event-controlchange-panfine}

<a id="event:controlchange-panfine"></a>


Event emitted when a **controlchange-panfine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-panfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-polymodeon` {#event-controlchange-polymodeon}

<a id="event:controlchange-polymodeon"></a>


Event emitted when a **controlchange-polymodeon** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-polymodeon`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-portamento` {#event-controlchange-portamento}

<a id="event:controlchange-portamento"></a>


Event emitted when a **controlchange-portamento** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-portamento`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-portamentocontrol` {#event-controlchange-portamentocontrol}

<a id="event:controlchange-portamentocontrol"></a>


Event emitted when a **controlchange-portamentocontrol** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-portamentocontrol`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-portamentotimecoarse` {#event-controlchange-portamentotimecoarse}

<a id="event:controlchange-portamentotimecoarse"></a>


Event emitted when a **controlchange-portamentotimecoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-portamentotimecoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-portamentotimefine` {#event-controlchange-portamentotimefine}

<a id="event:controlchange-portamentotimefine"></a>


Event emitted when a **controlchange-portamentotimefine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-portamentotimefine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-registeredparametercoarse` {#event-controlchange-registeredparametercoarse}

<a id="event:controlchange-registeredparametercoarse"></a>


Event emitted when a **controlchange-registeredparametercoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-registeredparametercoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-registeredparameterfine` {#event-controlchange-registeredparameterfine}

<a id="event:controlchange-registeredparameterfine"></a>


Event emitted when a **controlchange-registeredparameterfine** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-registeredparameterfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-releasetime` {#event-controlchange-releasetime}

<a id="event:controlchange-releasetime"></a>


Event emitted when a **controlchange-releasetime** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-releasetime`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-resetallcontrollers` {#event-controlchange-resetallcontrollers}

<a id="event:controlchange-resetallcontrollers"></a>


Event emitted when a **controlchange-resetallcontrollers** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-resetallcontrollers`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-resonance` {#event-controlchange-resonance}

<a id="event:controlchange-resonance"></a>


Event emitted when a **controlchange-resonance** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-resonance`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-softpedal` {#event-controlchange-softpedal}

<a id="event:controlchange-softpedal"></a>


Event emitted when a **controlchange-softpedal** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-softpedal`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-sostenuto` {#event-controlchange-sostenuto}

<a id="event:controlchange-sostenuto"></a>


Event emitted when a **controlchange-sostenuto** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-sostenuto`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-soundvariation` {#event-controlchange-soundvariation}

<a id="event:controlchange-soundvariation"></a>


Event emitted when a **controlchange-soundvariation** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-soundvariation`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-vibratodelay` {#event-controlchange-vibratodelay}

<a id="event:controlchange-vibratodelay"></a>


Event emitted when a **controlchange-vibratodelay** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-vibratodelay`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-vibratodepth` {#event-controlchange-vibratodepth}

<a id="event:controlchange-vibratodepth"></a>


Event emitted when a **controlchange-vibratodepth** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-vibratodepth`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-vibratorate` {#event-controlchange-vibratorate}

<a id="event:controlchange-vibratorate"></a>


Event emitted when a **controlchange-vibratorate** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-vibratorate`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `controlchange-volumecoarse` {#event-controlchange-volumecoarse}

<a id="event:controlchange-volumecoarse"></a>


Event emitted when a **controlchange-volumecoarse** MIDI message has been
received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`controlchange-volumecoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`controller`** |object||
  |**`controller.number`** |object|The number of the controller.|
  |**`controller.name`** |object|The usual name or function of the controller.|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The value expressed as an integer (between 0 and 127).|


### `keyaftertouch` {#event-keyaftertouch}

<a id="event:keyaftertouch"></a>


Event emitted when a **key-specific aftertouch** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"keyaftertouch"`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`note`** |object|A [`Note`](Note) object containing information such as note name and number.|
  |**`value`** |number|The aftertouch amount expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The aftertouch amount expressed as an integer (between 0 and 127).|


### `localcontrol` {#event-localcontrol}

<a id="event:localcontrol"></a>


Event emitted when a "local control" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (local control on) of `false` (local control
off).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`localcontrol`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |boolean|For local control on, the value is `true`. For local control off, the value is `false`.|
  |**`rawValue`** |boolean|For local control on, the value is `127`. For local control off, the value is `0`.|


### `midimessage` {#event-midimessage}

<a id="event:midimessage"></a>


Event emitted when a MIDI message of any kind is received by an `InputChannel`



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`midimessage`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `monomode` {#event-monomode}

<a id="event:monomode"></a>


Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
poly mode on).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`monomode`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |boolean|The value is `true` for omni mode on and false for omni mode off.|
  |**`rawValue`** |boolean|The raw MIDI value|


### `noteoff` {#event-noteoff}

<a id="event:noteoff"></a>


Event emitted when a **note off** MIDI message has been received on the channel.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`noteoff`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment ([`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`note`** |object|A [`Note`](Note) object containing information such as note name, octave and release velocity.|
  |**`value`** |number|The release velocity amount expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The release velocity amount expressed as an integer (between 0 and 127).|


### `noteon` {#event-noteon}

<a id="event:noteon"></a>


Event emitted when a **note on** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`noteon`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`note`** |object|A [`Note`](Note) object containing information such as note name, octave and release velocity.|
  |**`value`** |number|The attack velocity amount expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The attack velocity amount expressed as an integer (between 0 and 127).|


### `nrpn` {#event-nrpn}

<a id="event:nrpn"></a>


Event emitted when any NRPN message is received on the input. There are four subtypes of NRPN
messages:

  * `nrpn-dataentrycoarse`
  * `nrpn-dataentryfine`
  * `nrpn-dataincrement`
  * `nrpn-datadecrement`

The parameter to which the message applies can be found in the event's `parameter` property.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`nrpn`|
  |**`subtype`** |string|The precise type of NRPN message that was received.|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`parameter`** |number|The non-registered parameter number (0-16383)|
  |**`parameterMsb`** |number|The MSB portion of the non-registered parameter number (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the non-registered parameter number (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `nrpn-datadecrement` {#event-nrpn-datadecrement}

<a id="event:nrpn-datadecrement"></a>


Event emitted when an **NRPN data decrement** message is received on the input. The specific
parameter to which the message applies can be found in the event's `parameter` property. It
is one of the ones defined in
[`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`nrpn-datadecrement`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `nrpn-dataentrycoarse` {#event-nrpn-dataentrycoarse}

<a id="event:nrpn-dataentrycoarse"></a>


Event emitted when an **NRPN data entry coarse** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`nrpn-dataentrycoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `nrpn-dataentryfine` {#event-nrpn-dataentryfine}

<a id="event:nrpn-dataentryfine"></a>


Event emitted when an **NRPN data entry fine** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`nrpn-dataentryfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `nrpn-dataincrement` {#event-nrpn-dataincrement}

<a id="event:nrpn-dataincrement"></a>


Event emitted when an **NRPN data increment** message is received on the input. The specific
parameter to which the message applies can be found in the event's `parameter` property. It
is one of the ones defined in
[`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`nrpn-dataincrement`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `omnimode` {#event-omnimode}

<a id="event:omnimode"></a>


Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (omni mode on) of `false` (omni mode off).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`"omnimode"`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |boolean|The value is `true` for omni mode on and false for omni mode off.|
  |**`rawValue`** |boolean|The raw MIDI value|


### `pitchbend` {#event-pitchbend}

<a id="event:pitchbend"></a>


Event emitted when a pitch bend MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`pitchbend`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |number|The value expressed as a float between 0 and 1.|
  |**`rawValue`** |number|The raw MIDI value expressed as an integer (between 0 and 16383).|


### `programchange` {#event-programchange}

<a id="event:programchange"></a>


Event emitted when a **program change** MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`programchange`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`value`** |number|The value expressed as an integer between 0 and 127.|
  |**`rawValue`** |number|The raw MIDI value expressed as an integer between 0 and 127.|


### `resetallcontrollers` {#event-resetallcontrollers}

<a id="event:resetallcontrollers"></a>


Event emitted when a "reset all controllers" channel-mode MIDI message has been received.



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|


### `rpn` {#event-rpn}

<a id="event:rpn"></a>


Event emitted when any RPN message is received on the input. There are four subtypes of RPN
messages:

  * `rpn-dataentrycoarse`
  * `rpn-dataentryfine`
  * `rpn-dataincrement`
  * `rpn-datadecrement`

The parameter to which the message applies can be found in the event's `parameter` property.
It is one of the ones defined in
[`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`rpn`|
  |**`subtype`** |string|The precise type of RPN message that was received.|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `rpn-datadecrement` {#event-rpn-datadecrement}

<a id="event:rpn-datadecrement"></a>


Event emitted when an **RPN data decrement** message is received on the input. The specific
parameter to which the message applies can be found in the event's `parameter` property. It
is one of the ones defined in
[`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`rpn-datadecrement`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `rpn-dataentrycoarse` {#event-rpn-dataentrycoarse}

<a id="event:rpn-dataentrycoarse"></a>


Event emitted when an **RPN data entry coarse** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`rpn-dataentrycoarse`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `rpn-dataentryfine` {#event-rpn-dataentryfine}

<a id="event:rpn-dataentryfine"></a>


Event emitted when an **RPN data entry fine** message is received on the input. The
specific parameter to which the message applies can be found in the event's `parameter`
property. It is one of the ones defined in
[`EnumerationsREGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`rpn-dataentryfine`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|


### `rpn-dataincrement` {#event-rpn-dataincrement}

<a id="event:rpn-dataincrement"></a>


Event emitted when an **RPN data increment** message is received on the input. The specific
parameter to which the message applies can be found in the event's `parameter` property. It
is one of the ones defined in
[`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).



**Event Properties**

| Property                 | Type                     | Description              |
| ------------------------ | ------------------------ | ------------------------ |
  |**`type`** |string|`rpn-dataincrement`|
  |**`target`** |InputChannel|The object that dispatched the event.|
  |**`port`** |Input|The `Input` that triggered the event.|
  |**`timestamp`** |number|The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document).|
  |**`message`** |Message|A [`Message`](Message) object containing information about the incoming MIDI message.|
  |**`parameter`** |string|The registered parameter's name|
  |**`parameterMsb`** |number|The MSB portion of the registered parameter (0-127)|
  |**`parameterLsb:`** |number|The LSB portion of the registered parameter (0-127)|
  |**`value`** |number|The received value as a normalized number between 0 and 1.|
  |**`rawValue`** |number|The value as received (0-127)|



