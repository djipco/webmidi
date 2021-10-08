# Classes

<dl>
<dt><a href="#EventEmitter">EventEmitter</a></dt>
<dd><p>The <code>EventEmitter</code> class provides methods to implement the <em>observable</em> design pattern. This
pattern allows one to <em>register</em> a function to execute when a specific event is <em>emitted</em> by the
emitter.</p>
</dd>
<dt><a href="#Listener">Listener</a></dt>
<dd><p>The <code>Listener</code> class represents a single event listener object. Such objects keep all relevant
contextual information such as the event being listened to, the object the listener was attached
to, the callback function and so on.</p>
</dd>
<dt><a href="#Enumerations">Enumerations</a></dt>
<dd><p>The <code>Enumerations</code> class contains enumerations of elements used throughout the library. All
enumerations are static and should be referenced using the class name. For example:
<code>Enumerations.MIDI_CHANNEL_MESSAGES</code>.</p>
</dd>
<dt><a href="#Input">Input</a> ⇐ <code><a href="#EventEmitter">EventEmitter</a></code></dt>
<dd><p>The <code>Input</code> class represents a single MIDI input port. This object is derived from the host&#39;s
MIDI subsystem and cannot be instantiated directly.</p>
<p>You can find a list of all currently available <code>Input</code> objects in the <a href="#WebMidi+inputs">inputs</a>
array.</p>
<p>The <code>Input</code> class extends the
<a href="https://djipco.github.io/djipevents/EventEmitter.html">EventEmitter</a> class from the
<a href="https://djipco.github.io/djipevents/index.html">djipevents</a> module. This means
it also includes methods such as
<a href="https://djipco.github.io/djipevents/EventEmitter.html#getListeners">getListeners()</a>,
<a href="https://djipco.github.io/djipevents/EventEmitter.html#emit">emit()</a>,
<a href="https://djipco.github.io/djipevents/EventEmitter.html#suspendEvent">suspendEvent()</a> and several
others.</p>
</dd>
<dt><a href="#InputChannel">InputChannel</a> ⇐ <code><a href="#EventEmitter">EventEmitter</a></code></dt>
<dd><p>The <code>InputChannel</code> class represents a MIDI input channel (1-16) from a single input device. This
object is derived from the host&#39;s MIDI subsystem and cannot be instantiated directly.</p>
<p>All 16 <code>InputChannel</code> objects can be found inside the input&#39;s <a href="#Input+channels">channels</a>
property.</p>
<p>The <code>InputChannel</code> class extends the
<a href="https://djipco.github.io/djipevents/EventEmitter.html">EventEmitter</a> class from the
<a href="https://djipco.github.io/djipevents/index.html">djipevents</a> module. This means
it also includes methods such as
<a href="https://djipco.github.io/djipevents/EventEmitter.html#addListener">addListener()</a>,
<a href="https://djipco.github.io/djipevents/EventEmitter.html#removeListener">removeListener()</a>,
<a href="https://djipco.github.io/djipevents/EventEmitter.html#hasListener">hasListener()</a> and several
others. Check out the
<a href="https://djipco.github.io/djipevents/EventEmitter.html">documentation for EventEmitter</a> for more
details.</p>
</dd>
<dt><a href="#Message">Message</a></dt>
<dd><p>The <code>Message</code> class represents a single MIDI message. It has several properties that make it
easy to make sense of the binaru data it contains.</p>
</dd>
<dt><a href="#Note">Note</a></dt>
<dd><p>The <code>Note</code> class represents a single musical note such as <code>&quot;D3&quot;</code>, <code>&quot;G#4&quot;</code>, <code>&quot;F-1&quot;</code>, <code>&quot;Gb7&quot;</code>, etc.</p>
<p><code>Note</code> objects can be played back on a single channel by calling
<a href="#OutputChannel+playNote">OutputChannel.playNote()</a> or on multiple channels of the same
output by calling <a href="#Output+playNote">Output.playNote()</a>.</p>
<p>The note has attack and release velocities set at 0.5 by default. These can be changed by passing
in the appropriate option. It is also possible to set a system-wide default for attack and
release velocities by using the <code>WebMidi.defaults</code> property.</p>
<p>The note may have a duration. If it does, playback will be automatically stopped when the
duration has elapsed by sending a <strong>noteoff</strong> event. By default, the duration is set to
<code>Infinity</code>. In this case, it will never stop playing unless explicitly stopped by calling a
method such as <a href="#OutputChannel+stopNote">OutputChannel.stopNote()</a>,
<a href="#Output+stopNote">Output.stopNote()</a> or similar.</p>
</dd>
<dt><a href="#Output">Output</a> ⇐ <code><a href="#EventEmitter">EventEmitter</a></code></dt>
<dd><p>The <code>Output</code> class represents a MIDI output port. This object is derived from the host&#39;s MIDI
subsystem and cannot be instantiated directly.</p>
<p>You can find a list of all available <code>Output</code> objects in the
<a href="#WebMidi+outputs">WebMidi.outputs</a> array.</p>
<p>The <code>Output</code> class extends the
<a href="https://djipco.github.io/djipevents/EventEmitter.html">EventEmitter</a> class from the
<a href="https://djipco.github.io/djipevents/index.html">djipevents</a> module. This means
it also includes methods such as
<a href="https://djipco.github.io/djipevents/EventEmitter.html#addListener">addListener()</a>,
<a href="https://djipco.github.io/djipevents/EventEmitter.html#removeListener">removeListener()</a>,
<a href="https://djipco.github.io/djipevents/EventEmitter.html#hasListener">hasListener()</a> and several
others.</p>
</dd>
<dt><a href="#OutputChannel">OutputChannel</a> ⇐ <code><a href="#EventEmitter">EventEmitter</a></code></dt>
<dd><p>The <code>OutputChannel</code> class represents a single output channel (1-16) from an output device. This
object is derived from the host&#39;s MIDI subsystem and cannot be instantiated directly.</p>
<p>All 16 <code>OutputChannel</code> objects can be found inside the parent output&#39;s
<a href="#Output+channels">channels</a> property.</p>
<p>The <code>OutputChannel</code> class extends the
<a href="https://djipco.github.io/djipevents/EventEmitter.html">EventEmitter</a> class from the
<a href="https://djipco.github.io/djipevents/index.html">djipevents</a> module. This means
it also includes methods such as
<a href="https://djipco.github.io/djipevents/EventEmitter.html#addListener">addListener()</a>,
<a href="https://djipco.github.io/djipevents/EventEmitter.html#removeListener">removeListener()</a>,
<a href="https://djipco.github.io/djipevents/EventEmitter.html#hasListener">hasListener()</a> and several
others.</p>
</dd>
<dt><a href="#Utilities">Utilities</a></dt>
<dd><p>The <code>Utilities</code> class contains general-purpose utility methods. All methods are static and
should be called using the class name. For example: <code>Utilities.getNoteDetails(&quot;C4&quot;)</code>.</p>
</dd>
<dt><a href="#WebMidi">WebMidi</a> ⇐ <code><a href="#EventEmitter">EventEmitter</a></code></dt>
<dd><p>The <code>WebMidi</code> object makes it easier to work with the low-level Web MIDI API. Basically, it
simplifies sending outgoing MIDI messages and reacting to incoming MIDI messages.</p>
<p>When using the WebMidi.js library, you should know that the <code>WebMidi</code> class has already been
instantiated. If you use the <strong>IIFE</strong> version, you should simply use the global object called
<code>WebMidi</code>. If you use the <strong>CJS</strong> (CommonJS) or <strong>ESM</strong> (ES6 module) version, you get an
already-instantiated object. This means there is no need to instantiate a new <code>WebMidi</code> object
directly.</p>
</dd>
</dl>

<a name="EventEmitter"></a>

# EventEmitter
The `EventEmitter` class provides methods to implement the _observable_ design pattern. This
pattern allows one to _register_ a function to execute when a specific event is _emitted_ by the
emitter.

<!--**Kind**: global class  
-->
<!---->


* [EventEmitter](#EventEmitter)

    * [new EventEmitter([eventsSuspended])](#new_EventEmitter_new)

    * _instance_

        * [.eventMap](#EventEmitter+eventMap) : <code>Object</code>

        * [.eventsSuspended](#EventEmitter+eventsSuspended) : <code>boolean</code>

        * [.eventNames](#EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

        * [.eventCount](#EventEmitter+eventCount) : <code>number</code>

        * [.addListener(event, callback, [options])](#EventEmitter+addListener) ⇒ [<code>Listener</code>](#Listener)

        * [.addOneTimeListener(event, callback, [options])](#EventEmitter+addOneTimeListener) ⇒ [<code>Listener</code>](#Listener)

        * [.hasListener([event], [callback])](#EventEmitter+hasListener) ⇒ <code>boolean</code>

        * [.getListeners(event)](#EventEmitter+getListeners) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

        * [.suspendEvent(event)](#EventEmitter+suspendEvent)

        * [.unsuspendEvent(event)](#EventEmitter+unsuspendEvent)

        * [.getListenerCount(event)](#EventEmitter+getListenerCount) ⇒ <code>number</code>

        * [.emit(event, ...args)](#EventEmitter+emit) ⇒ <code>Array</code>

        * [.removeListener([event], [callback], [options])](#EventEmitter+removeListener)

        * [.waitFor(event, [options])](#EventEmitter+waitFor)

    * _static_

        * [.ANY_EVENT](#EventEmitter.ANY_EVENT) : <code>Symbol</code>

    * _inner_

        * [~callback](#EventEmitter..callback) : <code>function</code>


* * *

<a name="new_EventEmitter_new"></a>

## new EventEmitter([eventsSuspended])
<!---->
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [eventsSuspended] | <code>boolean</code> | <code>false</code> | Whether the `EventEmitter` is initially in a suspended state (i.e. not executing callbacks). It is a mostly abstract class meant to be extended by (or mixed into) other objects. |


* * *

<a name="EventEmitter+eventMap"></a>

## eventEmitter.eventMap : <code>Object</code>
An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

<!--**Kind**: instance property of [<code>EventEmitter</code>](#EventEmitter)  
-->
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventsSuspended"></a>

## eventEmitter.eventsSuspended : <code>boolean</code>
Whether or not the execution of function callbacks is currently suspended for this whole
emitter

<!--**Kind**: instance property of [<code>EventEmitter</code>](#EventEmitter)  
-->
<!---->

* * *

<a name="EventEmitter+eventNames"></a>

## eventEmitter.eventNames : <code>Array.&lt;string&gt;</code>
An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>EventEmitter</code>](#EventEmitter)  
-->
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventCount"></a>

## eventEmitter.eventCount : <code>number</code>
The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>EventEmitter</code>](#EventEmitter)  
-->
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+addListener"></a>

## eventEmitter.addListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a listener for the specified event. It returns the [**Listener**](#Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
-->
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.remaining] | <code>boolean</code> | <code>Infinity</code> | The number of times after which the callback should automatically be removed. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+addOneTimeListener"></a>

## eventEmitter.addOneTimeListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](#Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
-->
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The context to invoke the callback function in. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+hasListener"></a>

## eventEmitter.hasListener([event], [callback]) ⇒ <code>boolean</code>
Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
-->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [event] | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to check |
| [callback] | <code>function</code> \| [<code>Listener</code>](#Listener) | The actual function that was added to the event or the [Listener](#Listener) object returned by `addListener()`. |


* * *

<a name="EventEmitter+getListeners"></a>

## eventEmitter.getListeners(event) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
-->
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of `Listener` objects  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to get listeners for |


* * *

<a name="EventEmitter+suspendEvent"></a>

## eventEmitter.suspendEvent(event)
Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
-->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to suspend execution of all callback functions. |


* * *

<a name="EventEmitter+unsuspendEvent"></a>

## eventEmitter.unsuspendEvent(event)
Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
-->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to resume execution of all callback functions. |


* * *

<a name="EventEmitter+getListenerCount"></a>

## eventEmitter.getListenerCount(event) ⇒ <code>number</code>
Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
-->
**Returns**: <code>number</code> - The number of listeners registered for the specified event.  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event |


* * *

<a name="EventEmitter+emit"></a>

## eventEmitter.emit(event, ...args) ⇒ <code>Array</code>
Executes the callback functions of all the `Listener` objects registered for a given event. The
callback functions are passed the additional arguments specifed for `emit()` (if any) followed
by the arguments present in the `arguments` property of the `Listener` object (if any). For
example:

```javascript
let myEmitter = new EventEmitter();
myEmitter.addListener("test", fn, {arguments: ["a", "b", "c"]});
myEmitter.emit("test", "y", "z");
```

In this example, the function will be called as such: `fn("y", "z", "a", "b", "c");`

If the `eventsSuspended` property of the `EventEmitter` or the `suspended` property of the
`Listener` is `true`, the callback functions will not be executed.

This function returns an array containing the return values of each of the callbacks.

It should be noted that the regular listeners are triggered first followed by the global
listeners (added with `EventEmitter.ANY_EVENT`).

<!--**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
-->
**Returns**: <code>Array</code> - An array containing the return value of each of the executed listener
functions  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string.

<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event |
| ...args | <code>\*</code> | Arbitrary number of arguments to pass along to the callback functions |


* * *

<a name="EventEmitter+removeListener"></a>

## eventEmitter.removeListener([event], [callback], [options])
Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
-->
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [event] | <code>string</code> |  | The event name. |
| [callback] | [<code>callback</code>](#EventEmitter..callback) |  | Only remove the listeners that match this exact callback function. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>\*</code> |  | Only remove the listeners that have this exact context. |
| [options.remaining] | <code>number</code> |  | Only remove the listener if it has exactly that many remaining times to be executed. |


* * *

<a name="EventEmitter+waitFor"></a>

## eventEmitter.waitFor(event, [options])
The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
when the specified event occurs. The event can be a regular event or `EventEmitter.ANY_EVENT`
(if you want to resolve as soon as any event is emitted).

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready").then(() => console.log("Ready!"));
```

```javascript
// async/await syntax
const ee = new EventEmitter();
await ee.waitFor("ready");
console.log("Ready!");
```

If the `duration` option is set, the promise will only be fulfilled if the event is emitted
within the specified duration. If the event has not been fulfilled after the specified
duration, the promise is rejected. This makes it super easy to wait for an event and timeout
after a certain time if the event is not triggered.

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready", {duration: 100})
.then(() => console.log("Ready!"))
.catch(err => console.log(err);
```

```javascript
// async/await syntax
const ee = new EventEmitter();
try {
 await ee.waitFor("ready", {duration: 100});
 console.log("Ready!");
} catch(err) {
  console.log(err);
}
```

<!--**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
-->
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to wait for |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds to wait before the promise is automatically rejected. |


* * *

<a name="EventEmitter.ANY_EVENT"></a>

## EventEmitter.ANY\_EVENT : <code>Symbol</code>
Identifier to use when trying to add or remove a listener that should be triggered when any
events occur.

<!--**Kind**: static property of [<code>EventEmitter</code>](#EventEmitter)  
-->
<!---->

* * *

<a name="EventEmitter..callback"></a>

## EventEmitter~callback : <code>function</code>
The callback function is executed when the associated event is triggered via `emit()`. The
`emit()` method relays all additional arguments it received to the callback functions. Since
`emit()` can be passed a variable number of arguments, it is up to the developer to make sure
the arguments match those of the associated callback. In addition, the callback also separately
receives all the arguments present in the listener's `arguments` property. This makes it
easy to pass data from where the listener is added to where the listener is executed.

<!--**Kind**: inner typedef of [<code>EventEmitter</code>](#EventEmitter)  
-->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [...args] | <code>\*</code> | A variable number of arguments matching the ones (if any) that were passed to the `emit()` method (except, the first one) followed by the arguments found in the listener's `arguments` array. |


* * *

<a name="Listener"></a>

# Listener
The `Listener` class represents a single event listener object. Such objects keep all relevant
contextual information such as the event being listened to, the object the listener was attached
to, the callback function and so on.

<!--**Kind**: global class  
-->
<!---->


* [Listener](#Listener)

    * [new Listener(event, target, callback, [options])](#new_Listener_new)

    * [.event](#Listener+event) : <code>string</code>

    * [.target](#Listener+target) : [<code>EventEmitter</code>](#EventEmitter)

    * [.callback](#Listener+callback) : <code>function</code>

    * [.context](#Listener+context) : <code>Object</code>

    * [.remaining](#Listener+remaining) : <code>number</code>

    * [.count](#Listener+count) : <code>number</code>

    * [.arguments](#Listener+arguments) : <code>array</code>

    * [.suspended](#Listener+suspended) : <code>boolean</code>

    * [.remove()](#Listener+remove)


* * *

<a name="new_Listener_new"></a>

## new Listener(event, target, callback, [options])
<!---->
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>ReferenceError</code> The `target` parameter is mandatory.
- <code>TypeError</code> The `callback` must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event being listened to |
| target | [<code>EventEmitter</code>](#EventEmitter) |  | The `EventEmitter` object that the listener is attached to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The function to call when the listener is triggered |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>target</code> | The context to invoke the listener in (a.k.a. the value of `this` inside the callback function). |
| [options.remaining] | <code>number</code> | <code>Infinity</code> | The remaining number of times after which the callback should automatically be removed. |
| [options.arguments] | <code>array</code> |  | An array of arguments that will be passed separately to the callback function upon execution. The array is stored in the `arguments` property and can be retrieved or modified as desired. |


* * *

<a name="Listener+event"></a>

## listener.event : <code>string</code>
The event name

<!--**Kind**: instance property of [<code>Listener</code>](#Listener)  
-->
<!---->

* * *

<a name="Listener+target"></a>

## listener.target : [<code>EventEmitter</code>](#EventEmitter)
The object that the event is attached to (or that emitted the event)

<!--**Kind**: instance property of [<code>Listener</code>](#Listener)  
-->
<!---->

* * *

<a name="Listener+callback"></a>

## listener.callback : <code>function</code>
The callback function

<!--**Kind**: instance property of [<code>Listener</code>](#Listener)  
-->
<!---->

* * *

<a name="Listener+context"></a>

## listener.context : <code>Object</code>
The context to execute the context function in (a.k.a. the value of `this` inside the
callback function)

<!--**Kind**: instance property of [<code>Listener</code>](#Listener)  
-->
<!---->

* * *

<a name="Listener+remaining"></a>

## listener.remaining : <code>number</code>
The remaining number of times after which the callback should automatically be removed.

<!--**Kind**: instance property of [<code>Listener</code>](#Listener)  
-->
<!---->

* * *

<a name="Listener+count"></a>

## listener.count : <code>number</code>
The number of times the listener function was executed

<!--**Kind**: instance property of [<code>Listener</code>](#Listener)  
-->
<!---->

* * *

<a name="Listener+arguments"></a>

## listener.arguments : <code>array</code>
Arguments to pass separately to the callback function upon execution

<!--**Kind**: instance property of [<code>Listener</code>](#Listener)  
-->
<!---->

* * *

<a name="Listener+suspended"></a>

## listener.suspended : <code>boolean</code>
Whether this listener is currently suspended

<!--**Kind**: instance property of [<code>Listener</code>](#Listener)  
-->
<!---->

* * *

<a name="Listener+remove"></a>

## listener.remove()
Removes the listener from its target.

<!--**Kind**: instance method of [<code>Listener</code>](#Listener)  
-->
<!---->

* * *

<a name="Enumerations"></a>

# Enumerations
The `Enumerations` class contains enumerations of elements used throughout the library. All
enumerations are static and should be referenced using the class name. For example:
`Enumerations.MIDI_CHANNEL_MESSAGES`.

<!--**Kind**: global class  
-->
**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->


* [Enumerations](#Enumerations)

    * [.MIDI_CHANNEL_MESSAGES](#Enumerations.MIDI_CHANNEL_MESSAGES) : <code>enum</code>

    * [.MIDI_CHANNEL_MODE_MESSAGES](#Enumerations.MIDI_CHANNEL_MODE_MESSAGES) : <code>enum</code>

    * [.MIDI_CONTROL_CHANGE_MESSAGES](#Enumerations.MIDI_CONTROL_CHANGE_MESSAGES) : <code>enum</code>

    * [.MIDI_REGISTERED_PARAMETERS](#Enumerations.MIDI_REGISTERED_PARAMETERS) : <code>enum</code>

    * [.MIDI_SYSTEM_MESSAGES](#Enumerations.MIDI_SYSTEM_MESSAGES) : <code>enum</code>


* * *

<a name="Enumerations.MIDI_CHANNEL_MESSAGES"></a>

## Enumerations.MIDI\_CHANNEL\_MESSAGES : <code>enum</code>
Enumeration of all MIDI channel messages and their associated 4-bit numerical value:

- `noteoff`: 0x8 (8)
- `noteon`: 0x9 (9)
- `keyaftertouch`: 0xA (10)
- `controlchange`: 0xB (11)
- `nrpn`: 0xB (11)
- `programchange`: 0xC (12)
- `channelaftertouch`: 0xD (13)
- `pitchbend`: 0xE (14)

<!--**Kind**: static enum of [<code>Enumerations</code>](#Enumerations)  
-->
**Read only**: true  
<!---->

* * *

<a name="Enumerations.MIDI_CHANNEL_MODE_MESSAGES"></a>

## Enumerations.MIDI\_CHANNEL\_MODE\_MESSAGES : <code>enum</code>
Enumeration of all channel mode messages and their associated numerical value:

- `allsoundoff`: 120
- `resetallcontrollers`: 121
- `localcontrol`: 122
- `allnotesoff`: 123
- `omnimodeoff`: 124
- `omnimodeon`: 125
- `monomodeon`: 126
- `polymodeon`: 127

<!--**Kind**: static enum of [<code>Enumerations</code>](#Enumerations)  
-->
**Read only**: true  
<!---->

* * *

<a name="Enumerations.MIDI_CONTROL_CHANGE_MESSAGES"></a>

## Enumerations.MIDI\_CONTROL\_CHANGE\_MESSAGES : <code>enum</code>
Enumeration of most control change messages and their associated numerical value. Note that
some control change numbers do not have a predefined purpose and are absent from this list.

- `bankselectcoarse`: 0
- `modulationwheelcoarse`: 1
- `breathcontrollercoarse`: 2
- `footcontrollercoarse`: 4
- `portamentotimecoarse`: 5
- `dataentrycoarse`: 6
- `volumecoarse`: 7
- `balancecoarse`: 8
- `pancoarse`: 10
- `expressioncoarse`: 11
- `effectcontrol1coarse`: 12
- `effectcontrol2coarse`: 13
- `generalpurposeslider1`: 16
- `generalpurposeslider2`: 17
- `generalpurposeslider3`: 18
- `generalpurposeslider4`: 19
- `bankselectfine`: 32
- `modulationwheelfine`: 33
- `breathcontrollerfine`: 34
- `footcontrollerfine`: 36
- `portamentotimefine`: 37
- `dataentryfine`: 38
- `volumefine`: 39
- `balancefine`: 40
- `panfine`: 42
- `expressionfine`: 43
- `effectcontrol1fine`: 44
- `effectcontrol2fine`: 45
- `holdpedal`: 64
- `portamento`: 65
- `sustenutopedal`: 66
- `softpedal`: 67
- `legatopedal`: 68
- `hold2pedal`: 69
- `soundvariation`: 70
- `resonance`: 71
- `soundreleasetime`: 72
- `soundattacktime`: 73
- `brightness`: 74
- `soundcontrol6`: 75
- `soundcontrol7`: 76
- `soundcontrol8`:`77
- `soundcontrol9`: 78
- `soundcontrol10`: 79
- `generalpurposebutton1`: 80
- `generalpurposebutton2`: 81
- `generalpurposebutton3`: 82
- `generalpurposebutton4`: 83
- `reverblevel`: 91
- `tremololevel`: 92
- `choruslevel`: 93
- `celestelevel`: 94
- `phaserlevel`: 95
- `databuttonincrement`: 96
- `databuttondecrement`: 97
- `nonregisteredparametercoarse`: 98
- `nonregisteredparameterfine`: 99
- `registeredparametercoarse`: 100
- `registeredparameterfine`: 101

- `allsoundoff`: 120
- `resetallcontrollers`: 121
- `localcontrol`: 122
- `allnotesoff`: 123
- `omnimodeoff`: 124
- `omnimodeon`: 125
- `monomodeon`: 126
- `polymodeon`: 127

<!--**Kind**: static enum of [<code>Enumerations</code>](#Enumerations)  
-->
**Read only**: true  
<!---->

* * *

<a name="Enumerations.MIDI_REGISTERED_PARAMETERS"></a>

## Enumerations.MIDI\_REGISTERED\_PARAMETERS : <code>enum</code>
Enumeration of all registered parameters and their associated pair of numerical values. MIDI
registered parameters extend the original list of control change messages. Currently, there are
only a limited number of them:

- `pitchbendrange`: [0x00, 0x00]
- `channelfinetuning`: [0x00, 0x01]
- `channelcoarsetuning`: [0x00, 0x02]
- `tuningprogram`: [0x00, 0x03]
- `tuningbank`: [0x00, 0x04]
- `modulationrange`: [0x00, 0x05]
- `azimuthangle`: [0x3D, 0x00]
- `elevationangle`: [0x3D, 0x01]
- `gain`: [0x3D, 0x02]
- `distanceratio`: [0x3D, 0x03]
- `maximumdistance`: [0x3D, 0x04]
- `maximumdistancegain`: [0x3D, 0x05]
- `referencedistanceratio`: [0x3D, 0x06]
- `panspreadangle`: [0x3D, 0x07]
- `rollangle`: [0x3D, 0x08]

<!--**Kind**: static enum of [<code>Enumerations</code>](#Enumerations)  
-->
**Read only**: true  
<!---->

* * *

<a name="Enumerations.MIDI_SYSTEM_MESSAGES"></a>

## Enumerations.MIDI\_SYSTEM\_MESSAGES : <code>enum</code>
Enumeration of all valid MIDI system messages and matching numerical values. WebMidi.js also
uses two custom messages.

**System common messages**
- `sysex`: 0xF0 (240)
- `timecode`: 0xF1 (241)
- `songposition`: 0xF2 (242)
- `songselect`: 0xF3 (243)
- `tunerequest`: 0xF6 (246)
- `sysexend`: 0xF7 (247)

The `sysexend` message is never actually received. It simply ends a sysex stream.

**System real-time messages**

- `clock`: 0xF8 (248)
- `start`: 0xFA (250)
- `continue`: 0xFB (251)
- `stop`: 0xFC (252)
- `activesensing`: 0xFE (254)
- `reset`: 0xFF (255)

Values 249 and 253 are actually relayed by the Web MIDI API but they do not serve a specific
purpose. The
[MIDI 1.0 spec](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
simply states that they are undefined/reserved.

**Custom WebMidi.js messages**

- `midimessage`: 0
- `unknownsystemmessage`: -1

<!--**Kind**: static enum of [<code>Enumerations</code>](#Enumerations)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input"></a>

# Input ⇐ [<code>EventEmitter</code>](#EventEmitter)
The `Input` class represents a single MIDI input port. This object is derived from the host's
MIDI subsystem and cannot be instantiated directly.

You can find a list of all currently available `Input` objects in the [inputs](#WebMidi+inputs)
array.

The `Input` class extends the
[EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
[djipevents](https://djipco.github.io/djipevents/index.html) module. This means
it also includes methods such as
[getListeners()](https://djipco.github.io/djipevents/EventEmitter.html#getListeners),
[emit()](https://djipco.github.io/djipevents/EventEmitter.html#emit),
[suspendEvent()](https://djipco.github.io/djipevents/EventEmitter.html#suspendEvent) and several
others.

<!--**Kind**: global class  
-->
**Extends**: [<code>EventEmitter</code>](#EventEmitter)  
**Emits**: [<code>opened</code>](#Input+event_opened), [<code>disconnected</code>](#Input+event_disconnected), [<code>closed</code>](#Input+event_closed), [<code>midimessage</code>](#Input+event_midimessage), <code>Input#event:sysex</code>, <code>Input#event:timecode</code>, <code>Input#event:songposition</code>, <code>Input#event:songselect</code>, <code>Input#event:tunerequest</code>, <code>Input#event:clock</code>, <code>Input#event:start</code>, <code>Input#event:continue</code>, <code>Input#event:stop</code>, <code>Input#event:activesensing</code>, <code>Input#event:reset</code>, [<code>midimessage</code>](#Input+event_midimessage), <code>Input#event:unknownmidimessage</code>  
<!--**License**: Apache-2.0  
-->


* [Input](#Input) ⇐ [<code>EventEmitter</code>](#EventEmitter)

    * [new Input(midiInput)](#new_Input_new)

    * [.channels](#Input+channels) : [<code>Array.&lt;InputChannel&gt;</code>](#InputChannel)

    * [.name](#Input+name) : <code>string</code>

    * [.id](#Input+id) : <code>string</code>

    * [.connection](#Input+connection) : <code>string</code>

    * [.manufacturer](#Input+manufacturer) : <code>string</code>

    * [.octaveOffset](#Input+octaveOffset) : <code>number</code>

    * [.state](#Input+state) : <code>string</code>

    * [.type](#Input+type) : <code>string</code>

    * [.eventMap](#EventEmitter+eventMap) : <code>Object</code>

    * [.eventsSuspended](#EventEmitter+eventsSuspended) : <code>boolean</code>

    * [.eventNames](#EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

    * [.eventCount](#EventEmitter+eventCount) : <code>number</code>

    * [.destroy()](#Input+destroy) ⇒ <code>Promise.&lt;void&gt;</code>

    * [.open()](#Input+open) ⇒ [<code>Promise.&lt;Input&gt;</code>](#Input)

    * [.close()](#Input+close) ⇒ [<code>Promise.&lt;Input&gt;</code>](#Input)

    * [.addListener(event, listener, [options])](#Input+addListener) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

    * [.addOneTimeListener(event, listener, [options])](#Input+addOneTimeListener) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

    * [.hasListener(event, listener, [options])](#Input+hasListener) ⇒ <code>Boolean</code>

    * [.removeListener([type], [listener], [options])](#Input+removeListener)

    * [.getListeners(event)](#EventEmitter+getListeners) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

    * [.suspendEvent(event)](#EventEmitter+suspendEvent)

    * [.unsuspendEvent(event)](#EventEmitter+unsuspendEvent)

    * [.getListenerCount(event)](#EventEmitter+getListenerCount) ⇒ <code>number</code>

    * [.emit(event, ...args)](#EventEmitter+emit) ⇒ <code>Array</code>

    * [.waitFor(event, [options])](#EventEmitter+waitFor)

    * ["opened"](#Input+event_opened)

    * ["closed"](#Input+event_closed)

    * ["disconnected"](#Input+event_disconnected)

    * ["midimessage"](#Input+event_midimessage)


* * *

<a name="new_Input_new"></a>

## new Input(midiInput)
<!---->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| midiInput | <code>MIDIInput</code> | `MIDIInput` object as provided by the MIDI subsystem (Web MIDI API). |


* * *

<a name="Input+channels"></a>

## input.channels : [<code>Array.&lt;InputChannel&gt;</code>](#InputChannel)
Array containing the 16 [InputChannel](#InputChannel) objects available for this `Input`. The
channels are numbered 1 through 16.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
<!---->

* * *

<a name="Input+name"></a>

## input.name : <code>string</code>
Name of the MIDI input

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input+id"></a>

## input.id : <code>string</code>
ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
the same port.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input+connection"></a>

## input.connection : <code>string</code>
Input port's connection state: `"pending"`, `"open"` or `"closed"`.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input+manufacturer"></a>

## input.manufacturer : <code>string</code>
Name of the manufacturer of the device that makes this input port available.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input+octaveOffset"></a>

## input.octaveOffset : <code>number</code>
An integer to offset the reported octave of incoming notes. By default, middle C (MIDI note
number 60) is placed on the 4th octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
(if any).

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="Input+state"></a>

## input.state : <code>string</code>
State of the input port: `"connected"` or `"disconnected"`.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="Input+type"></a>

## input.type : <code>string</code>
Port type. In the case of `Input`, this is always: `"input"`.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventMap"></a>

## input.eventMap : <code>Object</code>
An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>eventMap</code>](#EventEmitter+eventMap)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventsSuspended"></a>

## input.eventsSuspended : <code>boolean</code>
Whether or not the execution of function callbacks is currently suspended for this whole
emitter

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>eventsSuspended</code>](#EventEmitter+eventsSuspended)  
<!---->

* * *

<a name="EventEmitter+eventNames"></a>

## input.eventNames : <code>Array.&lt;string&gt;</code>
An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>eventNames</code>](#EventEmitter+eventNames)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventCount"></a>

## input.eventCount : <code>number</code>
The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>eventCount</code>](#EventEmitter+eventCount)  
**Read only**: true  
<!---->

* * *

<a name="Input+destroy"></a>

## input.destroy() ⇒ <code>Promise.&lt;void&gt;</code>
Destroys the `Input` by remove all listeners, emptying the `channels` array and unlinking the
MIDI subsystem.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
<!---->

* * *

<a name="Input+open"></a>

## input.open() ⇒ [<code>Promise.&lt;Input&gt;</code>](#Input)
Opens the input for usage. This is usually unnecessary as the port is open automatically when
WebMidi is enabled.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Returns**: [<code>Promise.&lt;Input&gt;</code>](#Input) - The promise is fulfilled with the `Input` object  
<!---->

* * *

<a name="Input+close"></a>

## input.close() ⇒ [<code>Promise.&lt;Input&gt;</code>](#Input)
Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
the input is opened again by calling [Input.open()](#Input+open).

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Returns**: [<code>Promise.&lt;Input&gt;</code>](#Input) - The promise is fulfilled with the `Input` object  
<!---->

* * *

<a name="Input+addListener"></a>

## input.addListener(event, listener, [options]) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Adds an event listener that will trigger a function callback when the specified event happens.
The event can be **channel-bound** or **input-wide**. Channel-bound events are dispatched by
[InputChannel](#InputChannel) objects and are tied to a specific MIDI channel while input-wide events
are dispatched by the [Input](#Input) object itself and are not tied to a specific channel.

When listening for an input-wide event, you must specify the event to listen for and the
callback function to trigger when the event happens:

```
WebMidi.inputs[0].addListener("midimessage", someFunction);
```

To listen for a channel-bound event, you must also specify the event to listen for and the
function to trigger but you have to add the channels you wish to listen on in the `options`
parameter:

```
WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
```

The code above will add a listener for the `"noteon"` event and call `someFunction` when the
event is triggered on MIDI channels `1`, `2` or `3`.

Note that, when adding events to channels, it is the [InputChannel](#InputChannel) instance that
actually gets a listener added and not the `[Input](#Input) instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the [InputChannel](#InputChannel) object itself.

There are 6 families of events you can listen to:

1. **MIDI System Common** Events (input-wide)

   * [songposition](Input#event:songposition)
   * [songselect](Input#event:songselect)
   * [sysex](Input#event:sysex)
   * [timecode](Input#event:timecode)
   * [tunerequest](Input#event:tunerequest)

2. **MIDI System Real-Time** Events (input-wide)

   * [clock](Input#event:clock)
   * [start](Input#event:start)
   * [continue](Input#event:continue)
   * [stop](Input#event:stop)
   * [activesensing](Input#event:activesensing)
   * [reset](Input#event:reset)

3. **State Change** Events (input-wide)

   * [opened](#Input+event_opened)
   * [closed](#Input+event_closed)
   * [disconnected](#Input+event_disconnected)

4. **Catch-All** Events (input-wide)

   * [midimessage](#Input+event_midimessage)
   * [unknownmidimessage](Input#event:unknownmidimessage)

5. **Channel Voice** Events (channel-specific)

   * [channelaftertouch](#InputChannel+event_channelaftertouch)
   * [controlchange](#InputChannel+event_controlchange)
   * [keyaftertouch](#InputChannel+event_keyaftertouch)
   * [noteoff](#InputChannel+event_noteoff)
   * [noteon](#InputChannel+event_noteon)
   * [nrpn](InputChannel#event:nrpn)
   * [pitchbend](#InputChannel+event_pitchbend)
   * [programchange](#InputChannel+event_programchange)

6. **Channel Mode** Events (channel-specific)

   * allnotesoff
   * allsoundoff
   * localcontrol
   * monomode
   * omnimode
   * resetallcontrollers

7. **NRPN** Events (channel-specific)

   * nrpndataentrycoarse
   * nrpndataentryfine
   * nrpndatabuttonincrement
   * nrpndatabuttondecrement

8. **RPN** Events (channel-specific)

   * rpndataentrycoarse
   * rpndataentryfine
   * rpndatabuttonincrement
   * rpndatabuttondecrement

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>addListener</code>](#EventEmitter+addListener)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of all `Listener` objects that were created.  
**Throws**:

- <code>Error</code> For channel-specific events, 'options.channels' must be defined.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The type of the event. |
| listener | <code>function</code> |  | A callback function to execute when the specified event is detected. This function will receive an event parameter object. For details on this object's properties, check out the documentation for the various events (links above). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the `arguments` property of the `Listener` object and can be retrieved or modified as desired. |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to listen on. This parameter is ignored for input-wide events. |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array. |
| [options.remaining] | <code>boolean</code> | <code>Infinity</code> | The number of times after which the callback should automatically be removed. |


* * *

<a name="Input+addOneTimeListener"></a>

## input.addOneTimeListener(event, listener, [options]) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Adds a one-time event listener that will trigger a function callback when the specified event
happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
dispatched by [InputChannel](#InputChannel) objects and are tied to a specific MIDI channel while
input-wide events are dispatched by the [Input](#Input) object itself and are not tied to a
specific channel.

When listening for an input-wide event, you must specify the event to listen for and the
callback function to trigger when the event happens:

```
WebMidi.inputs[0].addListener("midimessage", someFunction);
```

To listen for a channel-bound event, you must also specify the event to listen for and the
function to trigger but you have to add the channels you wish to listen on in the `options`
parameter:

```
WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
```

The code above will add a listener for the `"noteon"` event and call `someFunction` when the
event is triggered on MIDI channels `1`, `2` or `3`.

Note that, when adding events to channels, it is the [InputChannel](#InputChannel) instance that
actually gets a listener added and not the `[Input](#Input) instance.

Note: if you want to add a listener to a single MIDI channel you should probably do so directly
on the [InputChannel](#InputChannel) object itself.

There are 6 families of events you can listen to:

1. **MIDI System Common** Events (input-wide)

   * [songposition](Input#event:songposition)
   * [songselect](Input#event:songselect)
   * [sysex](Input#event:sysex)
   * [timecode](Input#event:timecode)
   * [tunerequest](Input#event:tunerequest)

2. **MIDI System Real-Time** Events (input-wide)

   * [clock](Input#event:clock)
   * [start](Input#event:start)
   * [continue](Input#event:continue)
   * [stop](Input#event:stop)
   * [activesensing](Input#event:activesensing)
   * [reset](Input#event:reset)

3. **State Change** Events (input-wide)

   * [opened](#Input+event_opened)
   * [closed](#Input+event_closed)
   * [disconnected](#Input+event_disconnected)

4. **Catch-All** Events (input-wide)

   * [midimessage](#Input+event_midimessage)
   * [unknownmidimessage](Input#event:unknownmidimessage)

5. **Channel Voice** Events (channel-specific)

   * [channelaftertouch](#InputChannel+event_channelaftertouch)
   * [controlchange](#InputChannel+event_controlchange)
   * [keyaftertouch](#InputChannel+event_keyaftertouch)
   * [noteoff](#InputChannel+event_noteoff)
   * [noteon](#InputChannel+event_noteon)
   * [nrpn](InputChannel#event:nrpn)
   * [pitchbend](#InputChannel+event_pitchbend)
   * [programchange](#InputChannel+event_programchange)

6. **Channel Mode** Events (channel-specific)

   * allnotesoff
   * allsoundoff
   * localcontrol
   * monomode
   * omnimode
   * resetallcontrollers

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>addOneTimeListener</code>](#EventEmitter+addOneTimeListener)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of all `Listener` objects that were created.  
**Throws**:

- <code>Error</code> For channel-specific events, 'options.channels' must be defined.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The type of the event. |
| listener | <code>function</code> |  | A callback function to execute when the specified event is detected. This function will receive an event parameter object. For details on this object's properties, check out the documentation for the various events (links above). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the `arguments` property of the `Listener` object and can be retrieved or modified as desired. |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to listen on. This parameter is ignored for input-wide events. |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array. |


* * *

<a name="Input+hasListener"></a>

## input.hasListener(event, listener, [options]) ⇒ <code>Boolean</code>
Checks if the specified event type is already defined to trigger the listener function. For
channel-specific events, the function will return `true` only if all channels have the listener
defined.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>hasListener</code>](#EventEmitter+hasListener)  
**Returns**: <code>Boolean</code> - Boolean value indicating whether or not the channel(s) already have this
listener defined.  
**Throws**:

- Error For channel-specific events, 'options.channels' must be defined.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The type of the event. |
| listener | <code>function</code> |  | The callback function to check for. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to check. This parameter is ignored for input-wide events. |


* * *

<a name="Input+removeListener"></a>

## input.removeListener([type], [listener], [options])
Removes the specified listener for the specified event. If no listener is specified, all
listeners for the specified event will be removed. If no event is specified, all listeners for
the `Input` as well as all listeners for all `InputChannels` will be removed.

By default, channel-specific listeners will be removed from all channels unless the
`options.channel` narrows it down.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>removeListener</code>](#EventEmitter+removeListener)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>String</code> |  | The type of the event. |
| [listener] | <code>function</code> |  | The callback function to check for. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to match. This parameter is ignored for input-wide events. |
| [options.context] | <code>\*</code> |  | Only remove the listeners that have this exact context. |
| [options.remaining] | <code>number</code> |  | Only remove the listener if it has exactly that many remaining times to be executed. |


* * *

<a name="EventEmitter+getListeners"></a>

## input.getListeners(event) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>getListeners</code>](#EventEmitter+getListeners)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of `Listener` objects  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to get listeners for |


* * *

<a name="EventEmitter+suspendEvent"></a>

## input.suspendEvent(event)
Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>suspendEvent</code>](#EventEmitter+suspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to suspend execution of all callback functions. |


* * *

<a name="EventEmitter+unsuspendEvent"></a>

## input.unsuspendEvent(event)
Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>unsuspendEvent</code>](#EventEmitter+unsuspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to resume execution of all callback functions. |


* * *

<a name="EventEmitter+getListenerCount"></a>

## input.getListenerCount(event) ⇒ <code>number</code>
Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>getListenerCount</code>](#EventEmitter+getListenerCount)  
**Returns**: <code>number</code> - The number of listeners registered for the specified event.  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event |


* * *

<a name="EventEmitter+emit"></a>

## input.emit(event, ...args) ⇒ <code>Array</code>
Executes the callback functions of all the `Listener` objects registered for a given event. The
callback functions are passed the additional arguments specifed for `emit()` (if any) followed
by the arguments present in the `arguments` property of the `Listener` object (if any). For
example:

```javascript
let myEmitter = new EventEmitter();
myEmitter.addListener("test", fn, {arguments: ["a", "b", "c"]});
myEmitter.emit("test", "y", "z");
```

In this example, the function will be called as such: `fn("y", "z", "a", "b", "c");`

If the `eventsSuspended` property of the `EventEmitter` or the `suspended` property of the
`Listener` is `true`, the callback functions will not be executed.

This function returns an array containing the return values of each of the callbacks.

It should be noted that the regular listeners are triggered first followed by the global
listeners (added with `EventEmitter.ANY_EVENT`).

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>emit</code>](#EventEmitter+emit)  
**Returns**: <code>Array</code> - An array containing the return value of each of the executed listener
functions  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string.

<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event |
| ...args | <code>\*</code> | Arbitrary number of arguments to pass along to the callback functions |


* * *

<a name="EventEmitter+waitFor"></a>

## input.waitFor(event, [options])
The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
when the specified event occurs. The event can be a regular event or `EventEmitter.ANY_EVENT`
(if you want to resolve as soon as any event is emitted).

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready").then(() => console.log("Ready!"));
```

```javascript
// async/await syntax
const ee = new EventEmitter();
await ee.waitFor("ready");
console.log("Ready!");
```

If the `duration` option is set, the promise will only be fulfilled if the event is emitted
within the specified duration. If the event has not been fulfilled after the specified
duration, the promise is rejected. This makes it super easy to wait for an event and timeout
after a certain time if the event is not triggered.

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready", {duration: 100})
.then(() => console.log("Ready!"))
.catch(err => console.log(err);
```

```javascript
// async/await syntax
const ee = new EventEmitter();
try {
 await ee.waitFor("ready", {duration: 100});
 console.log("Ready!");
} catch(err) {
  console.log(err);
}
```

<!--**Kind**: instance method of [<code>Input</code>](#Input)  
-->
**Overrides**: [<code>waitFor</code>](#EventEmitter+waitFor)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to wait for |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds to wait before the promise is automatically rejected. |


* * *

<a name="Input+event_opened"></a>

## "opened"
Event emitted when the [Input](#Input) has been opened by calling the [open](#Input+open)
method.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"opened"` |
| target | [<code>Input</code>](#Input) | The object that triggered the event |


* * *

<a name="Input+event_closed"></a>

## "closed"
Event emitted when the [Input](#Input) has been closed by calling the [close](#Input+close)
method.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"closed"` |
| target | [<code>Input</code>](#Input) | The object that triggered the event |


* * *

<a name="Input+event_disconnected"></a>

## "disconnected"
Event emitted when the [Input](#Input) becomes unavailable. This event is typically fired
when the MIDI device is unplugged.

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"disconnected"` |
| target | <code>Object</code> | Object with properties describing the [Input](#Input) that triggered the event. This is not the actual `Input` as it is no longer available. |
| target.connection | <code>string</code> | `"closed"` |
| target.id | <code>string</code> | ID of the input |
| target.manufacturer | <code>string</code> | Manufacturer of the device that provided the input |
| target.name | <code>string</code> | Name of the device that provided the input |
| target.state | <code>string</code> | `"disconnected"` |
| target.type | <code>string</code> | `"input"` |


* * *

<a name="Input+event_midimessage"></a>

## "midimessage"
Event emitted when any MIDI message is received on an `Input`

<!--**Kind**: event emitted by [<code>Input</code>](#Input)  
-->
**Since**: 2.1  
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>Input</code>](#Input) | The `Input` that triggered the event. |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"midimessage"` |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead). |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array (deprecated, use the `message` object instead). |
| event.statusByte | <code>number</code> | The message's status byte  (deprecated, use the `message` object instead). |
| event.dataBytes | <code>Array.&lt;number&gt;</code> | The message's data bytes as an array of 0, 1 or 2 integers. This will be null for `sysex` messages (deprecated, use the `message` object instead). |


* * *

<a name="InputChannel"></a>

# InputChannel ⇐ [<code>EventEmitter</code>](#EventEmitter)
The `InputChannel` class represents a MIDI input channel (1-16) from a single input device. This
object is derived from the host's MIDI subsystem and cannot be instantiated directly.

All 16 `InputChannel` objects can be found inside the input's [channels](#Input+channels)
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

<!--**Kind**: global class  
-->
**Extends**: [<code>EventEmitter</code>](#EventEmitter)  
**Emits**: [<code>midimessage</code>](#InputChannel+event_midimessage), [<code>noteoff</code>](#InputChannel+event_noteoff), [<code>noteon</code>](#InputChannel+event_noteon), [<code>keyaftertouch</code>](#InputChannel+event_keyaftertouch), [<code>controlchange</code>](#InputChannel+event_controlchange), [<code>programchange</code>](#InputChannel+event_programchange), [<code>channelaftertouch</code>](#InputChannel+event_channelaftertouch), [<code>pitchbend</code>](#InputChannel+event_pitchbend), [<code>allnotesoff</code>](#InputChannel+event_allnotesoff), [<code>allsoundoff</code>](#InputChannel+event_allsoundoff), [<code>localcontrol</code>](#InputChannel+event_localcontrol), [<code>monomode</code>](#InputChannel+event_monomode), [<code>omnimode</code>](#InputChannel+event_omnimode), [<code>resetallcontrollers</code>](#InputChannel+event_resetallcontrollers), [<code>nrpndataentrycoarse</code>](#InputChannel+event_nrpndataentrycoarse), [<code>nrpndataentryfine</code>](#InputChannel+event_nrpndataentryfine), [<code>nrpndatabuttonincrement</code>](#InputChannel+event_nrpndatabuttonincrement), [<code>nrpndatabuttondecrement</code>](#InputChannel+event_nrpndatabuttondecrement), [<code>rpndataentrycoarse</code>](#InputChannel+event_rpndataentrycoarse), [<code>rpndataentryfine</code>](#InputChannel+event_rpndataentryfine), [<code>rpndatabuttonincrement</code>](#InputChannel+event_rpndatabuttonincrement), [<code>rpndatabuttondecrement</code>](#InputChannel+event_rpndatabuttondecrement)  
**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->


* [InputChannel](#InputChannel) ⇐ [<code>EventEmitter</code>](#EventEmitter)

    * [new InputChannel(input, number)](#new_InputChannel_new)

    * _instance_

        * [.parameterNumberEventsEnabled](#InputChannel+parameterNumberEventsEnabled) : <code>boolean</code>

        * [.octaveOffset](#InputChannel+octaveOffset) : <code>number</code>

        * [.input](#InputChannel+input) : [<code>Input</code>](#Input)

        * [.number](#InputChannel+number) : <code>number</code>

        * [.eventMap](#EventEmitter+eventMap) : <code>Object</code>

        * [.eventsSuspended](#EventEmitter+eventsSuspended) : <code>boolean</code>

        * [.eventNames](#EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

        * [.eventCount](#EventEmitter+eventCount) : <code>number</code>

        * [.destroy()](#InputChannel+destroy)

        * [.getChannelModeByNumber(number)](#InputChannel+getChannelModeByNumber) ⇒ <code>string</code> \| <code>false</code>

        * [.getCcNameByNumber(number)](#InputChannel+getCcNameByNumber) ⇒ <code>string</code> \| <code>undefined</code>

        * [.addListener(event, callback, [options])](#EventEmitter+addListener) ⇒ [<code>Listener</code>](#Listener)

        * [.addOneTimeListener(event, callback, [options])](#EventEmitter+addOneTimeListener) ⇒ [<code>Listener</code>](#Listener)

        * [.hasListener([event], [callback])](#EventEmitter+hasListener) ⇒ <code>boolean</code>

        * [.getListeners(event)](#EventEmitter+getListeners) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

        * [.suspendEvent(event)](#EventEmitter+suspendEvent)

        * [.unsuspendEvent(event)](#EventEmitter+unsuspendEvent)

        * [.getListenerCount(event)](#EventEmitter+getListenerCount) ⇒ <code>number</code>

        * [.emit(event, ...args)](#EventEmitter+emit) ⇒ <code>Array</code>

        * [.removeListener([event], [callback], [options])](#EventEmitter+removeListener)

        * [.waitFor(event, [options])](#EventEmitter+waitFor)

        * ["midimessage"](#InputChannel+event_midimessage)

        * ["noteoff"](#InputChannel+event_noteoff)

        * ["noteon"](#InputChannel+event_noteon)

        * ["keyaftertouch"](#InputChannel+event_keyaftertouch)

        * ["controlchange"](#InputChannel+event_controlchange)

        * ["programchange"](#InputChannel+event_programchange)

        * ["channelaftertouch"](#InputChannel+event_channelaftertouch)

        * ["pitchbend"](#InputChannel+event_pitchbend)

        * ["allsoundoff"](#InputChannel+event_allsoundoff)

        * ["resetallcontrollers"](#InputChannel+event_resetallcontrollers)

        * ["localcontrol"](#InputChannel+event_localcontrol)

        * ["allnotesoff"](#InputChannel+event_allnotesoff)

        * ["omnimode"](#InputChannel+event_omnimode)

        * ["monomode"](#InputChannel+event_monomode)

        * ["nrpndataentrycoarse"](#InputChannel+event_nrpndataentrycoarse)

        * ["nrpndataentryfine"](#InputChannel+event_nrpndataentryfine)

        * ["nrpndatabuttonincrement"](#InputChannel+event_nrpndatabuttonincrement)

        * ["nrpndatabuttondecrement"](#InputChannel+event_nrpndatabuttondecrement)

        * ["rpndataentrycoarse"](#InputChannel+event_rpndataentrycoarse)

        * ["rpndataentryfine"](#InputChannel+event_rpndataentryfine)

        * ["rpndatabuttonincrement"](#InputChannel+event_rpndatabuttonincrement)

        * ["rpndatabuttondecrement"](#InputChannel+event_rpndatabuttondecrement)

    * _static_

        * [.EVENTS](#InputChannel.EVENTS) : <code>Array.&lt;string&gt;</code>


* * *

<a name="new_InputChannel_new"></a>

## new InputChannel(input, number)
<!---->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| input | [<code>Input</code>](#Input) | The `Input` object this channel belongs to |
| number | <code>number</code> | The MIDI channel's number (1-16) |


* * *

<a name="InputChannel+parameterNumberEventsEnabled"></a>

## inputChannel.parameterNumberEventsEnabled : <code>boolean</code>
Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
are composed of a sequence of specific **control change** messages. When a valid sequence of
such control change messages is received, an `nrpn` event will fire.

If an invalid or
out-of-order control change message is received, it will fall through the collector logic and
all buffered control change messages will be discarded as incomplete.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
<!---->

* * *

<a name="InputChannel+octaveOffset"></a>

## inputChannel.octaveOffset : <code>number</code>
An integer to offset the reported octave of incoming note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

Note that this value is combined with the global offset value defined on the `WebMidi` object
and with the value defined on the parent `Input` object.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="InputChannel+input"></a>

## inputChannel.input : [<code>Input</code>](#Input)
The [Input](#Input) this channel belongs to

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="InputChannel+number"></a>

## inputChannel.number : <code>number</code>
This channel's MIDI number (1-16)

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="EventEmitter+eventMap"></a>

## inputChannel.eventMap : <code>Object</code>
An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>eventMap</code>](#EventEmitter+eventMap)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventsSuspended"></a>

## inputChannel.eventsSuspended : <code>boolean</code>
Whether or not the execution of function callbacks is currently suspended for this whole
emitter

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>eventsSuspended</code>](#EventEmitter+eventsSuspended)  
<!---->

* * *

<a name="EventEmitter+eventNames"></a>

## inputChannel.eventNames : <code>Array.&lt;string&gt;</code>
An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>eventNames</code>](#EventEmitter+eventNames)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventCount"></a>

## inputChannel.eventCount : <code>number</code>
The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>eventCount</code>](#EventEmitter+eventCount)  
**Read only**: true  
<!---->

* * *

<a name="InputChannel+destroy"></a>

## inputChannel.destroy()
Destroys the `Input` by removing all listeners and severing the link with the MIDI subsystem's
input.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
<!---->

* * *

<a name="InputChannel+getChannelModeByNumber"></a>

## inputChannel.getChannelModeByNumber(number) ⇒ <code>string</code> \| <code>false</code>
Returns the channel mode name matching the specified number. If no match is found, the function
returns `false`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Returns**: <code>string</code> \| <code>false</code> - The name of the matching channel mode or `false` if not match could be
found.  
**Since**: 2.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | An integer representing the channel mode message. |


* * *

<a name="InputChannel+getCcNameByNumber"></a>

## inputChannel.getCcNameByNumber(number) ⇒ <code>string</code> \| <code>undefined</code>
Returns the name of a control change message matching the specified number. Some valid control
change numbers do not have a specific name or purpose assigned in the MIDI
[spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
In this case, the method returns `false`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Returns**: <code>string</code> \| <code>undefined</code> - The matching control change name or `undefined` if not match was
found.  
**Throws**:

- <code>RangeError</code> Invalid control change number.

**Since**: 2.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | An integer representing the control change message |


* * *

<a name="EventEmitter+addListener"></a>

## inputChannel.addListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a listener for the specified event. It returns the [**Listener**](#Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>addListener</code>](#EventEmitter+addListener)  
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.remaining] | <code>boolean</code> | <code>Infinity</code> | The number of times after which the callback should automatically be removed. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+addOneTimeListener"></a>

## inputChannel.addOneTimeListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](#Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>addOneTimeListener</code>](#EventEmitter+addOneTimeListener)  
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The context to invoke the callback function in. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+hasListener"></a>

## inputChannel.hasListener([event], [callback]) ⇒ <code>boolean</code>
Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>hasListener</code>](#EventEmitter+hasListener)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [event] | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to check |
| [callback] | <code>function</code> \| [<code>Listener</code>](#Listener) | The actual function that was added to the event or the [Listener](#Listener) object returned by `addListener()`. |


* * *

<a name="EventEmitter+getListeners"></a>

## inputChannel.getListeners(event) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>getListeners</code>](#EventEmitter+getListeners)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of `Listener` objects  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to get listeners for |


* * *

<a name="EventEmitter+suspendEvent"></a>

## inputChannel.suspendEvent(event)
Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>suspendEvent</code>](#EventEmitter+suspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to suspend execution of all callback functions. |


* * *

<a name="EventEmitter+unsuspendEvent"></a>

## inputChannel.unsuspendEvent(event)
Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>unsuspendEvent</code>](#EventEmitter+unsuspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to resume execution of all callback functions. |


* * *

<a name="EventEmitter+getListenerCount"></a>

## inputChannel.getListenerCount(event) ⇒ <code>number</code>
Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>getListenerCount</code>](#EventEmitter+getListenerCount)  
**Returns**: <code>number</code> - The number of listeners registered for the specified event.  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event |


* * *

<a name="EventEmitter+emit"></a>

## inputChannel.emit(event, ...args) ⇒ <code>Array</code>
Executes the callback functions of all the `Listener` objects registered for a given event. The
callback functions are passed the additional arguments specifed for `emit()` (if any) followed
by the arguments present in the `arguments` property of the `Listener` object (if any). For
example:

```javascript
let myEmitter = new EventEmitter();
myEmitter.addListener("test", fn, {arguments: ["a", "b", "c"]});
myEmitter.emit("test", "y", "z");
```

In this example, the function will be called as such: `fn("y", "z", "a", "b", "c");`

If the `eventsSuspended` property of the `EventEmitter` or the `suspended` property of the
`Listener` is `true`, the callback functions will not be executed.

This function returns an array containing the return values of each of the callbacks.

It should be noted that the regular listeners are triggered first followed by the global
listeners (added with `EventEmitter.ANY_EVENT`).

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>emit</code>](#EventEmitter+emit)  
**Returns**: <code>Array</code> - An array containing the return value of each of the executed listener
functions  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string.

<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event |
| ...args | <code>\*</code> | Arbitrary number of arguments to pass along to the callback functions |


* * *

<a name="EventEmitter+removeListener"></a>

## inputChannel.removeListener([event], [callback], [options])
Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>removeListener</code>](#EventEmitter+removeListener)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [event] | <code>string</code> |  | The event name. |
| [callback] | [<code>callback</code>](#EventEmitter..callback) |  | Only remove the listeners that match this exact callback function. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>\*</code> |  | Only remove the listeners that have this exact context. |
| [options.remaining] | <code>number</code> |  | Only remove the listener if it has exactly that many remaining times to be executed. |


* * *

<a name="EventEmitter+waitFor"></a>

## inputChannel.waitFor(event, [options])
The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
when the specified event occurs. The event can be a regular event or `EventEmitter.ANY_EVENT`
(if you want to resolve as soon as any event is emitted).

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready").then(() => console.log("Ready!"));
```

```javascript
// async/await syntax
const ee = new EventEmitter();
await ee.waitFor("ready");
console.log("Ready!");
```

If the `duration` option is set, the promise will only be fulfilled if the event is emitted
within the specified duration. If the event has not been fulfilled after the specified
duration, the promise is rejected. This makes it super easy to wait for an event and timeout
after a certain time if the event is not triggered.

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready", {duration: 100})
.then(() => console.log("Ready!"))
.catch(err => console.log(err);
```

```javascript
// async/await syntax
const ee = new EventEmitter();
try {
 await ee.waitFor("ready", {duration: 100});
 console.log("Ready!");
} catch(err) {
  console.log(err);
}
```

<!--**Kind**: instance method of [<code>InputChannel</code>](#InputChannel)  
-->
**Overrides**: [<code>waitFor</code>](#EventEmitter+waitFor)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to wait for |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds to wait before the promise is automatically rejected. |


* * *

<a name="InputChannel+event_midimessage"></a>

## "midimessage"
Event emitted when a MIDI message of any kind is received by an `InputChannel`

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>Input</code>](#Input) | The `InputChannel` that triggered the event. |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"midimessage"` |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values (deprecated, use the `message` object instead). |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a Uint8Array  (deprecated, use the `message` object instead). |
| event.statusByte | <code>number</code> | The message's status byte  (deprecated, use the `message` object instead). |
| event.dataBytes | <code>Array.&lt;number&gt;</code> | The message's data bytes as an array of 0, 1 or 2 integers. This will be null for `sysex` messages (deprecated, use the `message` object instead). |


* * *

<a name="InputChannel+event_noteoff"></a>

## "noteoff"
Event emitted when a **note off** MIDI message has been received on the channel.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"noteoff"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| note | <code>Object</code> | A [Note](#Note) object containing information such as note name, octave and release velocity. |
| value | <code>number</code> | The release velocity amount expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The release velocity amount expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_noteon"></a>

## "noteon"
Event emitted when a **note on** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"noteon"` |
| channel | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` object that triggered the event. |
| event.data | <code>Array</code> | The MIDI message as an array of 8 bit values. |
| input | [<code>InputChannel</code>](#InputChannel) | The `Input` object where through which the message was received. |
| event.rawData | <code>Uint8Array</code> | The raw MIDI message as a `Uint8Array`. |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| note | <code>Object</code> | A [Note](#Note) object containing information such as note name, octave and attack velocity. |
| value | <code>number</code> | The attack velocity amount expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The attack velocity amount expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_keyaftertouch"></a>

## "keyaftertouch"
Event emitted when a **key-specific aftertouch** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"keyaftertouch"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| identifier | <code>string</code> | The note identifier of the key to apply the aftertouch to. This includes any octave offset applied at the channel, input or global level. |
| key | <code>number</code> | The MIDI note number of the key to apply the aftertouch to. This includes any octave offset applied at the channel, input or global level. |
| rawKey | <code>number</code> | The MIDI note number of the key to apply the aftertouch to. This excludes any octave offset defined at the channel, input or global level. |
| value | <code>number</code> | The aftertouch amount expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The aftertouch amount expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_controlchange"></a>

## "controlchange"
Event emitted when a **control change** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"controlchange"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| controller | <code>Object</code> |  |
| controller.number | <code>Object</code> | The number of the controller. |
| controller.name | <code>Object</code> | The usual name or function of the controller. |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_programchange"></a>

## "programchange"
Event emitted when a **program change** MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"programchange"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>number</code> | The value expressed as an integer between 1 and 128. |
| rawValue | <code>number</code> | The value expressed as an integer between 0 and 127.. |


* * *

<a name="InputChannel+event_channelaftertouch"></a>

## "channelaftertouch"
Event emitted when a control change MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"channelaftertouch"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 127). |


* * *

<a name="InputChannel+event_pitchbend"></a>

## "pitchbend"
Event emitted when a pitch bend MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"pitchbend"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>number</code> | The value expressed as a float between 0 and 1. |
| rawValue | <code>number</code> | The value expressed as an integer (between 0 and 16383). |


* * *

<a name="InputChannel+event_allsoundoff"></a>

## "allsoundoff"
Event emitted when an "all sound off" channel-mode MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"allsoundoff"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |


* * *

<a name="InputChannel+event_resetallcontrollers"></a>

## "resetallcontrollers"
Event emitted when a "reset all controllers" channel-mode MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"resetallcontrollers"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |


* * *

<a name="InputChannel+event_localcontrol"></a>

## "localcontrol"
Event emitted when a "local control" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (local control on) of `false` (local control
off).

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"localcontrol"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>boolean</code> | For local control on, the value is `true`. For local control off, the value is `false`. |


* * *

<a name="InputChannel+event_allnotesoff"></a>

## "allnotesoff"
Event emitted when an "all notes off" channel-mode MIDI message has been received.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"allnotesoff"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |


* * *

<a name="InputChannel+event_omnimode"></a>

## "omnimode"
Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
property of the event is set to either `true` (omni mode on) of `false` (omni mode off).

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"omnimode"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>boolean</code> | The value is `true` for omni mode on and false for omni mode off. |


* * *

<a name="InputChannel+event_monomode"></a>

## "monomode"
Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
poly mode on).

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"monomode"` |
| target | [<code>InputChannel</code>](#InputChannel) | The object that triggered the event (the `InputChannel` object). |
| message | [<code>Message</code>](#Message) | A `Message` object containing information about the incoming MIDI message. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| value | <code>boolean</code> | The value is `true` for omni mode on and false for omni mode off. |


* * *

<a name="InputChannel+event_nrpndataentrycoarse"></a>

## "nrpndataentrycoarse"
Event emitted when a 'dataentrycoarse' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndataentrycoarse"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_nrpndataentryfine"></a>

## "nrpndataentryfine"
Event emitted when a 'dataentryfine' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndataentryfine"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_nrpndatabuttonincrement"></a>

## "nrpndatabuttonincrement"
Event emitted when a 'databuttonincrement' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndatabuttonincrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_nrpndatabuttondecrement"></a>

## "nrpndatabuttondecrement"
Event emitted when a 'databuttondecrement' NRPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"nrpndatabuttondecrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>number</code> | The non-registered parameter number (0-16383) |
| parameterMsb | <code>number</code> | The MSB portion of the non-registered parameter number (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the non-registered parameter number (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndataentrycoarse"></a>

## "rpndataentrycoarse"
Event emitted when a 'dataentrycoarse' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndataentrycoarse"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndataentryfine"></a>

## "rpndataentryfine"
Event emitted when a 'dataentryfine' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndataentryfine"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndatabuttonincrement"></a>

## "rpndatabuttonincrement"
Event emitted when a 'databuttonincrement' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndatabuttonincrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel+event_rpndatabuttondecrement"></a>

## "rpndatabuttondecrement"
Event emitted when a 'databuttondecrement' RPN message has been received on the input.

<!--**Kind**: event emitted by [<code>InputChannel</code>](#InputChannel)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | `"rpndatabuttondecrement"` |
| target | [<code>InputChannel</code>](#InputChannel) | The `InputChannel` that triggered the event. |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| parameter | <code>string</code> | The registered parameter's name |
| parameterMsb | <code>number</code> | The MSB portion of the registered parameter (0-127) |
| parameterLsb: | <code>number</code> | The LSB portion of the registered parameter (0-127) |
| value | <code>number</code> | The received value as a normalized number between 0 and 1. |
| rawValue | <code>number</code> | The value as received (0-127) |


* * *

<a name="InputChannel.EVENTS"></a>

## InputChannel.EVENTS : <code>Array.&lt;string&gt;</code>
Array of channel-specific event names that can be listened to.

<!--**Kind**: static property of [<code>InputChannel</code>](#InputChannel)  
-->
**Read only**: true  
<!---->

* * *

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

<a name="Note"></a>

# Note
The `Note` class represents a single musical note such as `"D3"`, `"G#4"`, `"F-1"`, `"Gb7"`, etc.

`Note` objects can be played back on a single channel by calling
[OutputChannel.playNote()](#OutputChannel+playNote) or on multiple channels of the same
output by calling [Output.playNote()](#Output+playNote).

The note has attack and release velocities set at 0.5 by default. These can be changed by passing
in the appropriate option. It is also possible to set a system-wide default for attack and
release velocities by using the `WebMidi.defaults` property.

The note may have a duration. If it does, playback will be automatically stopped when the
duration has elapsed by sending a **noteoff** event. By default, the duration is set to
`Infinity`. In this case, it will never stop playing unless explicitly stopped by calling a
method such as [OutputChannel.stopNote()](#OutputChannel+stopNote),
[Output.stopNote()](#Output+stopNote) or similar.

<!--**Kind**: global class  
-->
**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->


* [Note](#Note)

    * [new Note(value, [options])](#new_Note_new)

    * [.identifier](#Note+identifier) : <code>string</code>

    * [.name](#Note+name) : <code>string</code>

    * [.accidental](#Note+accidental) : <code>string</code>

    * [.octave](#Note+octave) : <code>number</code>

    * [.duration](#Note+duration) : <code>number</code>

    * [.attack](#Note+attack) : <code>number</code>

    * [.release](#Note+release) : <code>number</code>

    * [.rawAttack](#Note+rawAttack) : <code>number</code>

    * [.rawRelease](#Note+rawRelease) : <code>number</code>

    * [.number](#Note+number) : <code>number</code>

    * [.getOffsetNumber(offset)](#Note+getOffsetNumber) ⇒ <code>number</code>


* * *

<a name="new_Note_new"></a>

## new Note(value, [options])
<!---->
**Throws**:

- <code>Error</code> Invalid note identifier
- <code>RangeError</code> Invalid name value
- <code>RangeError</code> Invalid accidental value
- <code>RangeError</code> Invalid octave value
- <code>RangeError</code> Invalid duration value
- <code>RangeError</code> Invalid attack value
- <code>RangeError</code> Invalid release value

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>string</code> \| <code>number</code> |  | The value used to create the note. If an identifier string is used, it must start with the note letter, optionally followed by an accidental and followed by the octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). If a number is used, it must be an integer between 0 and 127. In this case, middle C is considered to be C4 (note number 60). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the note should be explicitly stopped. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The note's attack velocity as a float between 0 and 1. If you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both `attack` and `rawAttack` are specified, the latter has precedence. |
| [options.release] | <code>number</code> | <code>0.5</code> | The note's release velocity as a float between 0 and 1. If you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both `release` and `rawRelease` are specified, the latter has precedence. |
| [options.rawAttack] | <code>number</code> | <code>64</code> | The note's attack velocity as an integer between 0 and 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both `attack` and `rawAttack` are specified, the latter has precedence. |
| [options.rawRelease] | <code>number</code> | <code>64</code> | The note's release velocity as an integer between 0 and 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both `release` and `rawRelease` are specified, the latter has precedence. |


* * *

<a name="Note+identifier"></a>

## note.identifier : <code>string</code>
The name, optional accidental and octave of the note, as a string.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+name"></a>

## note.name : <code>string</code>
The name (letter) of the note

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+accidental"></a>

## note.accidental : <code>string</code>
The accidental (#, ##, b or bb) of the note

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+octave"></a>

## note.octave : <code>number</code>
The octave of the note

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+duration"></a>

## note.duration : <code>number</code>
The duration of the note as a positive decimal number representing the number of milliseconds
that the note should play for.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+attack"></a>

## note.attack : <code>number</code>
The attack velocity of the note as an integer between 0 and 127.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+release"></a>

## note.release : <code>number</code>
The release velocity of the note as an integer between 0 and 127.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+rawAttack"></a>

## note.rawAttack : <code>number</code>
The attack velocity of the note as a positive integer between 0 and 127.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+rawRelease"></a>

## note.rawRelease : <code>number</code>
The release velocity of the note as a positive integer between 0 and 127.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+number"></a>

## note.number : <code>number</code>
The MIDI number of the note. This number is derived from the note identifier using C4 as a
reference for middle C.

<!--**Kind**: instance property of [<code>Note</code>](#Note)  
-->
**Since**: 3.0.0  
<!---->

* * *

<a name="Note+getOffsetNumber"></a>

## note.getOffsetNumber(offset) ⇒ <code>number</code>
Returns a MIDI note number offset by the integer specified in the parameter. If the calculated
value is less than 0, 0 will be returned. If the calculated value is more than 127, 127 will be
returned. If an invalid value is supplied, 0 will be used.

<!--**Kind**: instance method of [<code>Note</code>](#Note)  
-->
**Returns**: <code>number</code> - An integer between 0 and 127  
<!---->

| Param |
| --- |
| offset | 


* * *

<a name="Output"></a>

# Output ⇐ [<code>EventEmitter</code>](#EventEmitter)
The `Output` class represents a MIDI output port. This object is derived from the host's MIDI
subsystem and cannot be instantiated directly.

You can find a list of all available `Output` objects in the
[WebMidi.outputs](#WebMidi+outputs) array.

The `Output` class extends the
[EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
[djipevents](https://djipco.github.io/djipevents/index.html) module. This means
it also includes methods such as
[addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
[removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
[hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
others.

<!--**Kind**: global class  
-->
**Extends**: [<code>EventEmitter</code>](#EventEmitter)  
**Emits**: [<code>opened</code>](#Output+event_opened), [<code>disconnected</code>](#Output+event_disconnected), [<code>closed</code>](#Output+event_closed)  
<!--**License**: Apache-2.0  
-->


* [Output](#Output) ⇐ [<code>EventEmitter</code>](#EventEmitter)

    * [new Output(midiOutput)](#new_Output_new)

    * [.channels](#Output+channels) : [<code>Array.&lt;OutputChannel&gt;</code>](#OutputChannel)

    * [.name](#Output+name) : <code>string</code>

    * [.id](#Output+id) : <code>string</code>

    * [.connection](#Output+connection) : <code>string</code>

    * [.manufacturer](#Output+manufacturer) : <code>string</code>

    * [.state](#Output+state) : <code>string</code>

    * [.type](#Output+type) : <code>string</code>

    * [.octaveOffset](#Output+octaveOffset) : <code>number</code>

    * [.eventMap](#EventEmitter+eventMap) : <code>Object</code>

    * [.eventsSuspended](#EventEmitter+eventsSuspended) : <code>boolean</code>

    * [.eventNames](#EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

    * [.eventCount](#EventEmitter+eventCount) : <code>number</code>

    * [.destroy()](#Output+destroy) ⇒ <code>Promise.&lt;void&gt;</code>

    * [.open()](#Output+open) ⇒ [<code>Promise.&lt;Output&gt;</code>](#Output)

    * [.close()](#Output+close) ⇒ <code>Promise.&lt;void&gt;</code>

    * [.send(message, [options])](#Output+send) ⇒ [<code>Output</code>](#Output)

    * [.sendSysex(manufacturer, [data], [options])](#Output+sendSysex) ⇒ [<code>Output</code>](#Output)

    * [.clear()](#Output+clear) ⇒ [<code>Output</code>](#Output)

    * [.sendTimecodeQuarterFrame(value, [options])](#Output+sendTimecodeQuarterFrame) ⇒ [<code>Output</code>](#Output)

    * [.setSongPosition([value], [options])](#Output+setSongPosition) ⇒ [<code>Output</code>](#Output)

    * [.setSong(value, [options])](#Output+setSong) ⇒ [<code>Output</code>](#Output)

    * [.sendTuneRequest([options])](#Output+sendTuneRequest) ⇒ [<code>Output</code>](#Output)

    * [.sendClock([options])](#Output+sendClock) ⇒ [<code>Output</code>](#Output)

    * [.sendStart([options])](#Output+sendStart) ⇒ [<code>Output</code>](#Output)

    * [.sendContinue([options])](#Output+sendContinue) ⇒ [<code>Output</code>](#Output)

    * [.sendStop([options])](#Output+sendStop) ⇒ [<code>Output</code>](#Output)

    * [.sendActiveSensing([options])](#Output+sendActiveSensing) ⇒ [<code>Output</code>](#Output)

    * [.sendReset([options])](#Output+sendReset) ⇒ [<code>Output</code>](#Output)

    * [.setKeyAftertouch(note, [pressure], [options])](#Output+setKeyAftertouch) ⇒ [<code>Output</code>](#Output)

    * [.sendControlChange(controller, [value], [options])](#Output+sendControlChange) ⇒ [<code>Output</code>](#Output)

    * [.setPitchBendRange(semitones, [cents], [options])](#Output+setPitchBendRange) ⇒ [<code>Output</code>](#Output)

    * [.setRegisteredParameter(parameter, [data], [options])](#Output+setRegisteredParameter) ⇒ [<code>Output</code>](#Output)

    * [.setChannelAftertouch([pressure], [options])](#Output+setChannelAftertouch) ⇒ [<code>Output</code>](#Output)

    * [.setPitchBend(value, [options])](#Output+setPitchBend) ⇒ [<code>Output</code>](#Output)

    * [.setProgram([program], [options])](#Output+setProgram) ⇒ [<code>Output</code>](#Output)

    * [.setModulationRange([semitones], [cents], [options])](#Output+setModulationRange) ⇒ [<code>Output</code>](#Output)

    * [.setMasterTuning([value], [options])](#Output+setMasterTuning) ⇒ [<code>Output</code>](#Output)

    * [.setTuningProgram(value, [options])](#Output+setTuningProgram) ⇒ [<code>Output</code>](#Output)

    * [.setTuningBank(value, [options])](#Output+setTuningBank) ⇒ [<code>Output</code>](#Output)

    * [.sendChannelMode(command, [value], [options])](#Output+sendChannelMode) ⇒ [<code>Output</code>](#Output)

    * [.turnSoundOff([options])](#Output+turnSoundOff) ⇒ [<code>Output</code>](#Output)

    * [.turnNotesOff([options])](#Output+turnNotesOff) ⇒ [<code>Output</code>](#Output)

    * [.resetAllControllers([options])](#Output+resetAllControllers) ⇒ [<code>Output</code>](#Output)

    * [.setPolyphonicMode(mode, [options])](#Output+setPolyphonicMode) ⇒ [<code>Output</code>](#Output)

    * [.setLocalControl([state], [options])](#Output+setLocalControl) ⇒ [<code>Output</code>](#Output)

    * [.setOmniMode([state], [options])](#Output+setOmniMode) ⇒ [<code>Output</code>](#Output)

    * [.setNonRegisteredParameter(parameter, [data], [options])](#Output+setNonRegisteredParameter) ⇒ [<code>Output</code>](#Output)

    * [.incrementRegisteredParameter(parameter, [options])](#Output+incrementRegisteredParameter) ⇒ [<code>Output</code>](#Output)

    * [.decrementRegisteredParameter(parameter, [options])](#Output+decrementRegisteredParameter) ⇒ [<code>Output</code>](#Output)

    * [.sendNoteOff(note, [options])](#Output+sendNoteOff) ⇒ [<code>Output</code>](#Output)

    * [.stopNote(note, options)](#Output+stopNote) ⇒ [<code>Output</code>](#Output)

    * [.playNote(note, [options])](#Output+playNote) ⇒ [<code>Output</code>](#Output)

    * [.sendNoteOn(note, [options])](#Output+sendNoteOn) ⇒ [<code>Output</code>](#Output)

    * [.addListener(event, callback, [options])](#EventEmitter+addListener) ⇒ [<code>Listener</code>](#Listener)

    * [.addOneTimeListener(event, callback, [options])](#EventEmitter+addOneTimeListener) ⇒ [<code>Listener</code>](#Listener)

    * [.hasListener([event], [callback])](#EventEmitter+hasListener) ⇒ <code>boolean</code>

    * [.getListeners(event)](#EventEmitter+getListeners) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

    * [.suspendEvent(event)](#EventEmitter+suspendEvent)

    * [.unsuspendEvent(event)](#EventEmitter+unsuspendEvent)

    * [.getListenerCount(event)](#EventEmitter+getListenerCount) ⇒ <code>number</code>

    * [.emit(event, ...args)](#EventEmitter+emit) ⇒ <code>Array</code>

    * [.removeListener([event], [callback], [options])](#EventEmitter+removeListener)

    * [.waitFor(event, [options])](#EventEmitter+waitFor)

    * ["opened"](#Output+event_opened)

    * ["closed"](#Output+event_closed)

    * ["disconnected"](#Output+event_disconnected)


* * *

<a name="new_Output_new"></a>

## new Output(midiOutput)
<!---->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| midiOutput | <code>MIDIOutput</code> | `MIDIOutput` object as provided by the MIDI subsystem |


* * *

<a name="Output+channels"></a>

## output.channels : [<code>Array.&lt;OutputChannel&gt;</code>](#OutputChannel)
Array containing the 16 [OutputChannel](#OutputChannel) objects available for this `Output`. The
channels are numbered 1 through 16.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
<!---->

* * *

<a name="Output+name"></a>

## output.name : <code>string</code>
Name of the MIDI output

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="Output+id"></a>

## output.id : <code>string</code>
ID string of the MIDI output. The ID is host-specific. Do not expect the same ID on different
platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
the same port.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="Output+connection"></a>

## output.connection : <code>string</code>
Output port's connection state: `"pending"`, `"open"` or `"closed"`.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="Output+manufacturer"></a>

## output.manufacturer : <code>string</code>
Name of the manufacturer of the device that makes this output port available.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="Output+state"></a>

## output.state : <code>string</code>
State of the output port: `"connected"` or `"disconnected"`.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="Output+type"></a>

## output.type : <code>string</code>
Type of the output port (`"output"`)

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Read only**: true  
<!---->

* * *

<a name="Output+octaveOffset"></a>

## output.octaveOffset : <code>number</code>
An integer to offset the octave of outgoing notes. By default, middle C (MIDI note number 60)
is placed on the 4th octave (C4).

Note that this value is combined with the global offset value defined on the `WebMidi` object
(if any).

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="EventEmitter+eventMap"></a>

## output.eventMap : <code>Object</code>
An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>eventMap</code>](#EventEmitter+eventMap)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventsSuspended"></a>

## output.eventsSuspended : <code>boolean</code>
Whether or not the execution of function callbacks is currently suspended for this whole
emitter

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>eventsSuspended</code>](#EventEmitter+eventsSuspended)  
<!---->

* * *

<a name="EventEmitter+eventNames"></a>

## output.eventNames : <code>Array.&lt;string&gt;</code>
An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>eventNames</code>](#EventEmitter+eventNames)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventCount"></a>

## output.eventCount : <code>number</code>
The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>eventCount</code>](#EventEmitter+eventCount)  
**Read only**: true  
<!---->

* * *

<a name="Output+destroy"></a>

## output.destroy() ⇒ <code>Promise.&lt;void&gt;</code>
Destroys the `Output`. All listeners are removed, all channels are destroyed and the MIDI
subsystem is unlinked.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
<!---->

* * *

<a name="Output+open"></a>

## output.open() ⇒ [<code>Promise.&lt;Output&gt;</code>](#Output)
Opens the output for usage.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Promise.&lt;Output&gt;</code>](#Output) - The promise is fulfilled with the `Output`  
<!---->

* * *

<a name="Output+close"></a>

## output.close() ⇒ <code>Promise.&lt;void&gt;</code>
Closes the output connection. When an output is closed, it cannot be used to send MIDI messages
until the output is opened again by calling [Output.open()](#Output+open). You can check
the connection status by looking at the [connection](#Output+connection) property.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
<!---->

* * *

<a name="Output+send"></a>

## output.send(message, [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
sent immediately. The message should be an array of 8 bit unsigned integers (0-225), a
[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
object or a `Message` object.

It is usually not necessary to use this method directly as you can use one of the simpler
helper methods such as [playNote()`, `stopNote()`, `sendControlChange()`, etc.

Details on the format of MIDI messages are available in the summary of
[MIDI messages](https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message)
from the MIDI Manufacturers Association.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The first byte (status) must be an integer between 128 and 255.

<!--**License**: Apache-2.0  
-->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>Array.&lt;number&gt;</code> \| <code>Uint8Array</code> \| [<code>Message</code>](#Message) |  | An array of 8bit unsigned integers, a `Uint8Array` object (not available in Node.js) containing the message bytes or a `Message` object. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([DOMHighResTimeStamp](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that point time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendSysex"></a>

## output.sendSysex(manufacturer, [data], [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI [system exclusive](https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages)
(*sysex*) message. The `data` parameter should only contain the data of the message. When
sending out the actual MIDI message, WebMidi.js will automatically prepend the data with the
*sysex byte* (`0xF0`) and the manufacturer ID byte(s). It will also automatically terminate
the message with the *sysex end byte* (`0xF7`).

The data can be an array of unsigned integers (0-127) or a `Uint8Array` object.

To use the `sendSysex()` method, system exclusive message support must have been enabled. To
do so, you must set the `sysex` option to `true` when calling `WebMidi.enable()`:

```js
WebMidi.enable({sysex: true})
  .then(() => console.log("System exclusive messages are enabled");
```

Note that, depending on browser, version and platform, it is generally necessary to serve the
page over HTTPS to enable sysex support.

##### Examples

If you want to send a sysex message to a Korg device connected to the first output, you would
use the following code:

```js
WebMidi.outputs[0].sendSysex(0x42, [0x1, 0x2, 0x3, 0x4, 0x5]);
```

The parameters can be specified using any number notation (decimal, hex, binary, etc.).
Therefore, the code below is equivalent to the code above:

```js
WebMidi.outputs[0].sendSysex(66, [1, 2, 3, 4, 5]);
```

The above code sends the byte values 1, 2, 3, 4 and 5 to Korg devices (hex 42 is the same as
decimal 66).

Some manufacturers are identified using 3 bytes. In this case, you would use a 3-position array
as the first parameter. For example, to send the same sysex message to a
*Native Instruments* device:

```js
WebMidi.outputs[0].sendSysex([0x00, 0x21, 0x09], [0x1, 0x2, 0x3, 0x4, 0x5]);
```
There is no limit for the length of the data array. However, it is generally suggested to keep
system exclusive messages to 64Kb or less.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>DOMException</code> Failed to execute 'send' on 'MIDIOutput': System exclusive message is
not allowed.
- <code>TypeError</code> Failed to execute 'send' on 'MIDIOutput': The value at index x is greater
than 0xFF.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| manufacturer | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | An unsigned integer or an array of three unsigned integers between 0 and 127 that identify the targeted manufacturer. The *MIDI Manufacturers Association* maintains a full list of [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers) . |
| [data] | <code>Array.&lt;number&gt;</code> \| <code>Uint8Array</code> | <code>[]</code> | A Uint8Array or an array of unsigned integers between 0 and 127. This is the data you wish to transfer. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+clear"></a>

## output.clear() ⇒ [<code>Output</code>](#Output)
Clears all messages that have been queued but not yet delivered.

Warning: this method has been defined in the specification but has not been implemented yet. As
soon as browsers implement it, it will work.

You can check out the current status of this feature for Chromium (Chrome) here:
https://bugs.chromium.org/p/chromium/issues/detail?id=471798

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

* * *

<a name="Output+sendTimecodeQuarterFrame"></a>

## output.sendTimecodeQuarterFrame(value, [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **timecode quarter frame** message. Please note that no processing is being done
on the data. It is up to the developer to format the data according to the
[MIDI Timecode](https://en.wikipedia.org/wiki/MIDI_timecode) format.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The quarter frame message content (integer between 0 and 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setSongPosition"></a>

## output.setSongPosition([value], [options]) ⇒ [<code>Output</code>](#Output)
Sends a **ong position** MIDI message. The value is expressed in MIDI beats (between 0 and
16383) which are 16th note. Position 0 is always the start of the song.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>number</code> | <code>0</code> | The MIDI beat to cue to (integer between 0 and 16383). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setSong"></a>

## output.setSong(value, [options]) ⇒ [<code>Output</code>](#Output)
Sends a **song select** MIDI message.

**Note**: since version 3.0, the song number is an integer between 1 and 128. In versions 1.0
and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices that
use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- The song number must be between 1 and 128.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The number of the song to select (integer between 1 and 128). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendTuneRequest"></a>

## output.sendTuneRequest([options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **tune request** real-time message.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendClock"></a>

## output.sendClock([options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **clock* real-time message. According to the standard, there are 24 MIDI Clocks
for every quarter note.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendStart"></a>

## output.sendStart([options]) ⇒ [<code>Output</code>](#Output)
Sends a **start** real-time message. A MIDI Start message starts the playback of the current
song at beat 0. To start playback elsewhere in the song, use the
[sendContinue()](#Output+sendContinue) method.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendContinue"></a>

## output.sendContinue([options]) ⇒ [<code>Output</code>](#Output)
Sends a **continue** real-time message. This resumes song playback where it was previously
stopped or where it was last cued with a song position message. To start playback from the
start, use the [sendStart()](#Output+sendStart)` method.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendStop"></a>

## output.sendStop([options]) ⇒ [<code>Output</code>](#Output)
Sends a **stop** real-time message. This tells the device connected to this output to stop
playback immediately (or at the scheduled time).

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendActiveSensing"></a>

## output.sendActiveSensing([options]) ⇒ [<code>Output</code>](#Output)
Sends an **active sensing** real-time message. This tells the device connected to this port
that the connection is still good. Active sensing messages should be sent every 300 ms if there
was no other activity on the MIDI port.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendReset"></a>

## output.sendReset([options]) ⇒ [<code>Output</code>](#Output)
Sends a **reset** real-time message. This tells the device connected to this output that it
should reset itself to a default state.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setKeyAftertouch"></a>

## output.setKeyAftertouch(note, [pressure], [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **key aftertouch** message to the specified channel(s) at the scheduled time. This
is a key-specific aftertouch. For a channel-wide aftertouch message, use
[setChannelAftertouch()](#Output+setChannelAftertouch).

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| <code>Array</code> |  | The note for which you are sending an aftertouch value. The notes can be specified in one of two ways. The first way is by using the MIDI note number (an integer between 0 and 127). The second way is by using the note name followed by the octave (C3, G#4, F-1, Db7). The octave range should be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). It is also possible to use an array of note names and/or numbers. |
| [pressure] | <code>number</code> | <code>0.5</code> | The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127. |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendControlChange"></a>

## output.sendControlChange(controller, [value], [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **control change** message to the specified channel(s) at the scheduled time. The
control change message to send can be specified numerically (0-127) or by using one of the
following common names:

 * `bankselectcoarse` (#0)
 * `modulationwheelcoarse` (#1)
 * `breathcontrollercoarse` (#2)
 * `footcontrollercoarse` (#4)
 * `portamentotimecoarse` (#5)
 * `dataentrycoarse` (#6)
 * `volumecoarse` (#7)
 * `balancecoarse` (#8)
 * `pancoarse` (#10)
 * `expressioncoarse` (#11)
 * `effectcontrol1coarse` (#12)
 * `effectcontrol2coarse` (#13)
 * `generalpurposeslider1` (#16)
 * `generalpurposeslider2` (#17)
 * `generalpurposeslider3` (#18)
 * `generalpurposeslider4` (#19)
 * `bankselectfine` (#32)
 * `modulationwheelfine` (#33)
 * `breathcontrollerfine` (#34)
 * `footcontrollerfine` (#36)
 * `portamentotimefine` (#37)
 * `dataentryfine` (#38)
 * `volumefine` (#39)
 * `balancefine` (#40)
 * `panfine` (#42)
 * `expressionfine` (#43)
 * `effectcontrol1fine` (#44)
 * `effectcontrol2fine` (#45)
 * `holdpedal` (#64)
 * `portamento` (#65)
 * `sustenutopedal` (#66)
 * `softpedal` (#67)
 * `legatopedal` (#68)
 * `hold2pedal` (#69)
 * `soundvariation` (#70)
 * `resonance` (#71)
 * `soundreleasetime` (#72)
 * `soundattacktime` (#73)
 * `brightness` (#74)
 * `soundcontrol6` (#75)
 * `soundcontrol7` (#76)
 * `soundcontrol8` (#77)
 * `soundcontrol9` (#78)
 * `soundcontrol10` (#79)
 * `generalpurposebutton1` (#80)
 * `generalpurposebutton2` (#81)
 * `generalpurposebutton3` (#82)
 * `generalpurposebutton4` (#83)
 * `reverblevel` (#91)
 * `tremololevel` (#92)
 * `choruslevel` (#93)
 * `celestelevel` (#94)
 * `phaserlevel` (#95)
 * `databuttonincrement` (#96)
 * `databuttondecrement` (#97)
 * `nonregisteredparametercoarse` (#98)
 * `nonregisteredparameterfine` (#99)
 * `registeredparametercoarse` (#100)
 * `registeredparameterfine` (#101)

 * `allsoundoff` (#120)
 * `resetallcontrollers` (#121)
 * `localcontrol` (#122)
 * `allnotesoff` (#123)
 * `omnimodeoff` (#124)
 * `omnimodeon` (#125)
 * `monomodeon` (#126)
 * `polymodeon` (#127)

Note: as you can see above, not all control change message have a matching common name. This
does not mean you cannot use the others. It simply means you will need to use their number
(0-127) instead of their name. While you can still use them, numbers 120 to 127 are usually
reserved for *channel mode* messages. See [sendChannelMode()](#Output+sendChannelMode)
method for more info.

To view a list of all available `control change` messages, please consult "Table 3 - Control
Change Messages" from the [MIDI Messages](
https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
specification.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> Controller numbers must be between 0 and 127.
- <code>RangeError</code> Invalid controller name.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| controller | <code>number</code> \| <code>string</code> |  | The MIDI controller name or number (0-127). |
| [value] | <code>number</code> | <code>0</code> | The value to send (0-127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setPitchBendRange"></a>

## output.setPitchBendRange(semitones, [cents], [options]) ⇒ [<code>Output</code>](#Output)
Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
adjust the range used by their pitch bend lever. The range is specified by using the
`semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
means that the pitch bend range will be 12 semitones above and below the nominal pitch.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The msb value must be between 0 and 127.
- <code>RangeError</code> The lsb value must be between 0 and 127.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| semitones | <code>number</code> |  | The desired adjustment value in semitones (between 0 and 127). While nothing imposes that in the specification, it is very common for manufacturers to limit the range to 2 octaves (-12 semitones to 12 semitones). |
| [cents] | <code>number</code> | <code>0</code> | The desired adjustment value in cents (integer between 0-127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setRegisteredParameter"></a>

## output.setRegisteredParameter(parameter, [data], [options]) ⇒ [<code>Output</code>](#Output)
Sets the specified MIDI registered parameter to the desired value. The value is defined with
up to two bytes of data (msb, lsb) that each can go from 0 to 127.

MIDI
[registered parameters]
(https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
extend the original list of control change messages. The MIDI 1.0 specification lists only a
limited number of them. Here are the original registered parameters with the identifier that
can be used as the first parameter of this function:

 * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
 * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
 * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
 * Tuning Program (0x00, 0x03): `"tuningprogram"`
 * Tuning Bank (0x00, 0x04): `"tuningbank"`
 * Modulation Range (0x00, 0x05): `"modulationrange"`

Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
Standard*, which is not widely implemented.

Another set of extra parameters have been later added for 3D sound controllers. They are:

 * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
 * Elevation Angle (0x3D, 0x01): `"elevationangle"`
 * Gain (0x3D, 0x02): `"gain"`
 * Distance Ratio (0x3D, 0x03): `"distanceratio"`
 * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
 * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
 * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
 * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
 * Roll Angle (0x3D, 0x08): `"rollangle"`

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>string</code> \| <code>Array.&lt;number&gt;</code> |  | A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the registered parameter. |
| [data] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | <code>[]</code> | A single integer or an array of integers with a maximum length of 2 specifying the desired data. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setChannelAftertouch"></a>

## output.setChannelAftertouch([pressure], [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **channel aftertouch** message to the specified channel(s). For key-specific
aftertouch, you should instead use [setKeyAftertouch()](#Output+setKeyAftertouch).

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [pressure] | <code>number</code> | <code>0.5</code> | The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127. |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setPitchBend"></a>

## output.setPitchBend(value, [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **pitch bend** message to the specified channel(s) at the scheduled time.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | The intensity of the bend (between -1.0 and 1.0). A value of zero means no bend. The resulting bend is relative to the pitch bend range that has been defined. The range can be set with [setPitchBendRange()](#OutputChannel+setPitchBendRange) . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of -1 will bend the note 1 octave below its nominal value. If an invalid value is specified, the nearest valid value will be used instead. If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127 representing, respectively, the MSB (most significant byte) and the LSB (least significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64` bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents (1/100 of a semitone). An LSB of `64` also means no bend. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | A boolean indicating whether the value should be considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or an array of 2 integers if using both MSB and LSB). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setProgram"></a>

## output.setProgram([program], [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **program change** message to the specified channel(s) at the scheduled time.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>TypeError</code> Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
than 0xFF.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [program] | <code>number</code> | <code>1</code> | The MIDI patch (program) number (1-128) |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setModulationRange"></a>

## output.setModulationRange([semitones], [cents], [options]) ⇒ [<code>Output</code>](#Output)
Sends a **modulation depth range** message to the specified channel(s) so that they adjust the
depth of their modulation wheel's range. The range can be specified with the `semitones`
parameter, the `cents` parameter or by specifying both parameters at the same time.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The msb value must be between 0 and 127
- <code>RangeError</code> The lsb value must be between 0 and 127

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [semitones] | <code>number</code> | <code>0</code> | The desired adjustment value in semitones (integer between 0 and 127). |
| [cents] | <code>number</code> | <code>0</code> | The desired adjustment value in cents (integer between 0 and 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setMasterTuning"></a>

## output.setMasterTuning([value], [options]) ⇒ [<code>Output</code>](#Output)
Sends a master tuning message to the specified channel(s). The value is decimal and must be
larger than -65 semitones and smaller than 64 semitones.

Because of the way the MIDI specification works, the decimal portion of the value will be
encoded with a resolution of 14bit. The integer portion must be between -64 and 63
inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
a **Master Fine Tuning** RPN messages.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The value must be a decimal number between larger than -65 and smaller
than 64.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>number</code> | <code>0.0</code> | The desired decimal adjustment value in semitones (-65 < x < 64) |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setTuningProgram"></a>

## output.setTuningProgram(value, [options]) ⇒ [<code>Output</code>](#Output)
Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The program value must be between 1 and 128.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The desired tuning program (1-128). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setTuningBank"></a>

## output.setTuningBank(value, [options]) ⇒ [<code>Output</code>](#Output)
Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The bank value must be between 1 and 128.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The desired tuning bank (1-128). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendChannelMode"></a>

## output.sendChannelMode(command, [value], [options]) ⇒ [<code>Output</code>](#Output)
Sends a MIDI **channel mode** message to the specified channel(s). The channel mode message to
send can be specified numerically or by using one of the following common names:

  * `"allsoundoff"` (#120)
  * `"resetallcontrollers"` (#121)
  * `"localcontrol"` (#122)
  * `"allnotesoff"` (#123)
  * `"omnimodeoff"` (#124)
  * `"omnimodeon"` (#125)
  * `"monomodeon"` (#126)
  * `"polymodeon"` (#127)

It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may
require a value that's not zero. For that reason, the `value` parameter is optional and
defaults to 0.

To make it easier, all channel mode messages have a matching helper method:

  - [turnSoundOff()](#OutputChannel+turnSoundOff)
  - [resetAllControllers()](#OutputChannel+resetAllControllers)
  - [setLocalControl()](#OutputChannel+turnSoundOff)
  - [turnNotesOff()](#OutputChannel+turnNotesOff)
  - [setOmniMode()](#OutputChannel+setOmniMode)
  - [setPolyphonicMode()](#OutputChannel+setPolyphonicMode)

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>TypeError</code> Invalid channel mode message name.
- <code>RangeError</code> Channel mode controller numbers must be between 120 and 127.
- <code>RangeError</code> Value must be an integer between 0 and 127.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>number</code> \| <code>string</code> |  | The numerical identifier of the channel mode message (integer between 120-127) or its name as a string. |
| [value] | <code>number</code> |  | The value to send (integer between 0-127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+turnSoundOff"></a>

## output.turnSoundOff([options]) ⇒ [<code>Output</code>](#Output)
Sends an **all sound off** channel mode message. This will silence all sounds playing on that
channel but will not prevent new sounds from being triggered.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+turnNotesOff"></a>

## output.turnNotesOff([options]) ⇒ [<code>Output</code>](#Output)
Sends an **all notes off** channel mode message. This will make all currently playing notes
fade out just as if their key had been released. This is different from the
[turnSoundOff()](#Output+turnSoundOff) method which mutes all sounds immediately.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+resetAllControllers"></a>

## output.resetAllControllers([options]) ⇒ [<code>Output</code>](#Output)
Sends a **reset all controllers** channel mode message. This resets all controllers, such as
the pitch bend, to their default value.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setPolyphonicMode"></a>

## output.setPolyphonicMode(mode, [options]) ⇒ [<code>Output</code>](#Output)
Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
multiple notes are being played.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mode | <code>string</code> |  | The mode to use: `"mono"` or `"poly"`. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setLocalControl"></a>

## output.setLocalControl([state], [options]) ⇒ [<code>Output</code>](#Output)
Turns local control on or off. Local control is usually enabled by default. If you disable it,
the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
its out port.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [state] | <code>boolean</code> | <code>false</code> | Whether to activate local control (`true`) or disable it (`false`). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setOmniMode"></a>

## output.setOmniMode([state], [options]) ⇒ [<code>Output</code>](#Output)
Sets OMNI mode to `"on"` or `"off"` for the specified channel(s). MIDI's OMNI mode causes the
instrument to respond to messages from all channels.

It should be noted that support for OMNI mode is not as common as it used to be.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>TypeError</code> Invalid channel mode message name.
- <code>RangeError</code> Channel mode controller numbers must be between 120 and 127.
- <code>RangeError</code> Value must be an integer between 0 and 127.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [state] | <code>boolean</code> |  | Whether to activate OMNI mode (`true`) or not (`false`). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+setNonRegisteredParameter"></a>

## output.setNonRegisteredParameter(parameter, [data], [options]) ⇒ [<code>Output</code>](#Output)
Sets a non-registered parameter to the specified value. The NRPN is selected by passing in a
two-position array specifying the values of the two control bytes. The value is specified by
passing in a single integer (most cases) or an array of two integers.

NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
they see fit. For example, according to the Roland GS specification, you can control the
**vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
would use:

```js
WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123);
```

Obviously, you should select a channel so the message is not sent to all channels. For
instance, to send to channel 1 of the first output port, you would use:

```js
WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123, 1);
```

In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
value to send was 10, you could use:

```js
WebMidi.outputs[0].setNonRegisteredParameter([2, 63], [0, 10], [1]);
```

For further implementation details, refer to the manufacturer"s documentation.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The control value must be between 0 and 127.
- <code>RangeError</code> The msb value must be between 0 and 127

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>Array.&lt;number&gt;</code> |  | A two-position array specifying the two control bytes (0x63, 0x62) that identify the non-registered parameter. |
| [data] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | <code>[]</code> | An integer or an array of integers with a length of 1 or 2 specifying the desired data. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+incrementRegisteredParameter"></a>

## output.incrementRegisteredParameter(parameter, [options]) ⇒ [<code>Output</code>](#Output)
Increments the specified MIDI registered parameter by 1. Here is the full list of parameter
names that can be used with this method:

 * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
 * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
 * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
 * Tuning Program (0x00, 0x03): `"tuningprogram"`
 * Tuning Bank (0x00, 0x04): `"tuningbank"`
 * Modulation Range (0x00, 0x05): `"modulationrange"`
 * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
 * Elevation Angle (0x3D, 0x01): `"elevationangle"`
 * Gain (0x3D, 0x02): `"gain"`
 * Distance Ratio (0x3D, 0x03): `"distanceratio"`
 * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
 * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
 * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
 * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
 * Roll Angle (0x3D, 0x08): `"rollangle"`

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>String</code> \| <code>Array.&lt;number&gt;</code> |  | A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+decrementRegisteredParameter"></a>

## output.decrementRegisteredParameter(parameter, [options]) ⇒ [<code>Output</code>](#Output)
Decrements the specified MIDI registered parameter by 1. Here is the full list of parameter
names that can be used with this method:

 * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
 * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
 * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
 * Tuning Program (0x00, 0x03): `"tuningprogram"`
 * Tuning Bank (0x00, 0x04): `"tuningbank"`
 * Modulation Range (0x00, 0x05): `"modulationrange"`
 * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
 * Elevation Angle (0x3D, 0x01): `"elevationangle"`
 * Gain (0x3D, 0x02): `"gain"`
 * Distance Ratio (0x3D, 0x03): `"distanceratio"`
 * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
 * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
 * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
 * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
 * Roll Angle (0x3D, 0x08): `"rollangle"`

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
**Throws**:

- TypeError The specified parameter is not available.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>String</code> \| <code>Array.&lt;number&gt;</code> |  | A string identifying the parameter"s name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="Output+sendNoteOff"></a>

## output.sendNoteOff(note, [options]) ⇒ [<code>Output</code>](#Output)
Sends a **note off** message for the specified notes on the specified channel(s). The first
parameter is the note. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [Note](#Note) object

 The execution of the **note off** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](#Note) objects, the release velocity defined in the [Note](#Note) objects has
precedence over the one specified via the method's `options` parameter.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  | The note(s) to stop. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](#Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | Controls whether the release velocity is set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |
| [options.release] | <code>number</code> | <code>0.5</code> | The velocity at which to release the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`. |


* * *

<a name="Output+stopNote"></a>

## output.stopNote(note, options) ⇒ [<code>Output</code>](#Output)
This is an alias to the [sendNoteOff()](#Output+sendNoteOff) method.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**See**: [sendNoteOff](#Output+sendNoteOff)  
<!---->

| Param |
| --- |
| note | 
| options | 


* * *

<a name="Output+playNote"></a>

## output.playNote(note, [options]) ⇒ [<code>Output</code>](#Output)
Plays a note or an array of notes on one or more channels of this output. The first parameter
is the note to play. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [Note](#Note) object

The `playNote()` method sends a **note on** MIDI message for all specified notes on all
specified channels. If no channels are specified, it will send to all channels. If a `duration`
is set in the `options` parameter or in the [Note](#Note) object's
[duration](#Note+duration) property, it will also schedule a **note off** message to end
the note after said duration. If no `duration` is set, the note will simply play until a
matching **note off** message is sent with [stopNote()](#Output+stopNote) or
[sendNoteOff()](#Output+sendNoteOff).

The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](#Note) objects, the durations and velocities defined in the [Note](#Note)
objects have precedence over the ones specified via the method's `options` parameter.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  | The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](#Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to play the note on. The special value `"all"` can also be used to use all channels (default). |
| [options.duration] | <code>number</code> |  | The number of milliseconds (integer) after which a **note off** message will be scheduled. If left undefined, only a **note on** message is sent. |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | Controls whether the attack and release velocities are set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default). |
| [options.release] | <code>number</code> | <code>0.5</code> | The velocity at which to release the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set. |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The attack velocity to use when playing the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`. |


* * *

<a name="Output+sendNoteOn"></a>

## output.sendNoteOn(note, [options]) ⇒ [<code>Output</code>](#Output)
Sends a **note on** message for the specified notes on the specified channel(s). The first
parameter is the note. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [Note](#Note) object

 The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](#Note) objects, the attack velocity defined in the [Note](#Note) objects has
precedence over the one specified via the method's `options` parameter. Also, the `duration` is
ignored. If you want to also send a **note off** message, use the
[playNote()](#Output+playNote) method instead.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Returns**: [<code>Output</code>](#Output) - Returns the `Output` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  | The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](#Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.channels] | <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>&quot;all&quot;</code> | <code>&quot;all&quot;</code> | The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to use all channels (default). |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | Controls whether the attack velocity is set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The velocity at which to play the note (between `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`. |


* * *

<a name="EventEmitter+addListener"></a>

## output.addListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a listener for the specified event. It returns the [**Listener**](#Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>addListener</code>](#EventEmitter+addListener)  
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.remaining] | <code>boolean</code> | <code>Infinity</code> | The number of times after which the callback should automatically be removed. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+addOneTimeListener"></a>

## output.addOneTimeListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](#Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>addOneTimeListener</code>](#EventEmitter+addOneTimeListener)  
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The context to invoke the callback function in. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+hasListener"></a>

## output.hasListener([event], [callback]) ⇒ <code>boolean</code>
Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>hasListener</code>](#EventEmitter+hasListener)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [event] | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to check |
| [callback] | <code>function</code> \| [<code>Listener</code>](#Listener) | The actual function that was added to the event or the [Listener](#Listener) object returned by `addListener()`. |


* * *

<a name="EventEmitter+getListeners"></a>

## output.getListeners(event) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>getListeners</code>](#EventEmitter+getListeners)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of `Listener` objects  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to get listeners for |


* * *

<a name="EventEmitter+suspendEvent"></a>

## output.suspendEvent(event)
Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>suspendEvent</code>](#EventEmitter+suspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to suspend execution of all callback functions. |


* * *

<a name="EventEmitter+unsuspendEvent"></a>

## output.unsuspendEvent(event)
Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>unsuspendEvent</code>](#EventEmitter+unsuspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to resume execution of all callback functions. |


* * *

<a name="EventEmitter+getListenerCount"></a>

## output.getListenerCount(event) ⇒ <code>number</code>
Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>getListenerCount</code>](#EventEmitter+getListenerCount)  
**Returns**: <code>number</code> - The number of listeners registered for the specified event.  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event |


* * *

<a name="EventEmitter+emit"></a>

## output.emit(event, ...args) ⇒ <code>Array</code>
Executes the callback functions of all the `Listener` objects registered for a given event. The
callback functions are passed the additional arguments specifed for `emit()` (if any) followed
by the arguments present in the `arguments` property of the `Listener` object (if any). For
example:

```javascript
let myEmitter = new EventEmitter();
myEmitter.addListener("test", fn, {arguments: ["a", "b", "c"]});
myEmitter.emit("test", "y", "z");
```

In this example, the function will be called as such: `fn("y", "z", "a", "b", "c");`

If the `eventsSuspended` property of the `EventEmitter` or the `suspended` property of the
`Listener` is `true`, the callback functions will not be executed.

This function returns an array containing the return values of each of the callbacks.

It should be noted that the regular listeners are triggered first followed by the global
listeners (added with `EventEmitter.ANY_EVENT`).

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>emit</code>](#EventEmitter+emit)  
**Returns**: <code>Array</code> - An array containing the return value of each of the executed listener
functions  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string.

<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event |
| ...args | <code>\*</code> | Arbitrary number of arguments to pass along to the callback functions |


* * *

<a name="EventEmitter+removeListener"></a>

## output.removeListener([event], [callback], [options])
Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>removeListener</code>](#EventEmitter+removeListener)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [event] | <code>string</code> |  | The event name. |
| [callback] | [<code>callback</code>](#EventEmitter..callback) |  | Only remove the listeners that match this exact callback function. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>\*</code> |  | Only remove the listeners that have this exact context. |
| [options.remaining] | <code>number</code> |  | Only remove the listener if it has exactly that many remaining times to be executed. |


* * *

<a name="EventEmitter+waitFor"></a>

## output.waitFor(event, [options])
The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
when the specified event occurs. The event can be a regular event or `EventEmitter.ANY_EVENT`
(if you want to resolve as soon as any event is emitted).

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready").then(() => console.log("Ready!"));
```

```javascript
// async/await syntax
const ee = new EventEmitter();
await ee.waitFor("ready");
console.log("Ready!");
```

If the `duration` option is set, the promise will only be fulfilled if the event is emitted
within the specified duration. If the event has not been fulfilled after the specified
duration, the promise is rejected. This makes it super easy to wait for an event and timeout
after a certain time if the event is not triggered.

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready", {duration: 100})
.then(() => console.log("Ready!"))
.catch(err => console.log(err);
```

```javascript
// async/await syntax
const ee = new EventEmitter();
try {
 await ee.waitFor("ready", {duration: 100});
 console.log("Ready!");
} catch(err) {
  console.log(err);
}
```

<!--**Kind**: instance method of [<code>Output</code>](#Output)  
-->
**Overrides**: [<code>waitFor</code>](#EventEmitter+waitFor)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to wait for |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds to wait before the promise is automatically rejected. |


* * *

<a name="Output+event_opened"></a>

## "opened"
Event emitted when the [Output](#Output) has been opened by calling the
[open()](#Output+open) method.

<!--**Kind**: event emitted by [<code>Output</code>](#Output)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"opened"` |
| target | [<code>Output</code>](#Output) | The object that triggered the event |


* * *

<a name="Output+event_closed"></a>

## "closed"
Event emitted when the [Output](#Output) has been closed by calling the
[close()](#Output+close) method.

<!--**Kind**: event emitted by [<code>Output</code>](#Output)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"closed"` |
| target | [<code>Output</code>](#Output) | The object that triggered the event |


* * *

<a name="Output+event_disconnected"></a>

## "disconnected"
Event emitted when the [Output](#Output) becomes unavailable. This event is typically fired
when the MIDI device is unplugged.

<!--**Kind**: event emitted by [<code>Output</code>](#Output)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp0 when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `"disconnected"` |
| target | <code>Object</code> | Object with properties describing the [Output](#Output) that triggered the event. This is not the actual `Output` as it is no longer available. |
| target.connection | <code>string</code> | `"closed"` |
| target.id | <code>string</code> | ID of the input |
| target.manufacturer | <code>string</code> | Manufacturer of the device that provided the input |
| target.name | <code>string</code> | Name of the device that provided the input |
| target.state | <code>string</code> | `"disconnected"` |
| target.type | <code>string</code> | `"output"` |


* * *

<a name="OutputChannel"></a>

# OutputChannel ⇐ [<code>EventEmitter</code>](#EventEmitter)
The `OutputChannel` class represents a single output channel (1-16) from an output device. This
object is derived from the host's MIDI subsystem and cannot be instantiated directly.

All 16 `OutputChannel` objects can be found inside the parent output's
[channels](#Output+channels) property.

The `OutputChannel` class extends the
[EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
[djipevents](https://djipco.github.io/djipevents/index.html) module. This means
it also includes methods such as
[addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
[removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
[hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
others.

<!--**Kind**: global class  
-->
**Extends**: [<code>EventEmitter</code>](#EventEmitter)  
**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->


* [OutputChannel](#OutputChannel) ⇐ [<code>EventEmitter</code>](#EventEmitter)

    * [new OutputChannel(output, number)](#new_OutputChannel_new)

    * [.octaveOffset](#OutputChannel+octaveOffset) : <code>number</code>

    * [.output](#OutputChannel+output) : [<code>Output</code>](#Output)

    * [.number](#OutputChannel+number) : <code>number</code>

    * [.eventMap](#EventEmitter+eventMap) : <code>Object</code>

    * [.eventsSuspended](#EventEmitter+eventsSuspended) : <code>boolean</code>

    * [.eventNames](#EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

    * [.eventCount](#EventEmitter+eventCount) : <code>number</code>

    * [.send(message, [options])](#OutputChannel+send) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setKeyAftertouch(target, [pressure], [options])](#OutputChannel+setKeyAftertouch) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.sendControlChange(controller, value, [options])](#OutputChannel+sendControlChange) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.decrementRegisteredParameter(parameter, [options])](#OutputChannel+decrementRegisteredParameter) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.incrementRegisteredParameter(parameter, [options])](#OutputChannel+incrementRegisteredParameter) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.playNote(note, [options])](#OutputChannel+playNote) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.sendNoteOff(note, [options])](#OutputChannel+sendNoteOff) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.stopNote(note, options)](#OutputChannel+stopNote) ⇒ [<code>Output</code>](#Output)

    * [.sendNoteOn(note, [options])](#OutputChannel+sendNoteOn) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.sendChannelMode(command, value, [options])](#OutputChannel+sendChannelMode) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setOmniMode([state], [options])](#OutputChannel+setOmniMode) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setChannelAftertouch([pressure], [options])](#OutputChannel+setChannelAftertouch) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setMasterTuning([value], [options])](#OutputChannel+setMasterTuning) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setModulationRange(semitones, [cents], [options])](#OutputChannel+setModulationRange) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setNonRegisteredParameter(parameter, [data], [options])](#OutputChannel+setNonRegisteredParameter) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setPitchBend([value], [options])](#OutputChannel+setPitchBend) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setPitchBendRange(semitones, [cents], [options])](#OutputChannel+setPitchBendRange) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setProgram([program], [options])](#OutputChannel+setProgram) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setRegisteredParameter(parameter, [data], [options])](#OutputChannel+setRegisteredParameter) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setTuningBank(value, [options])](#OutputChannel+setTuningBank) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setTuningProgram(value, [options])](#OutputChannel+setTuningProgram) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setLocalControl([state], [options])](#OutputChannel+setLocalControl) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.turnNotesOff([options])](#OutputChannel+turnNotesOff) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.turnSoundOff([options])](#OutputChannel+turnSoundOff) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.resetAllControllers([options])](#OutputChannel+resetAllControllers) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.setPolyphonicMode([mode], [options])](#OutputChannel+setPolyphonicMode) ⇒ [<code>OutputChannel</code>](#OutputChannel)

    * [.addListener(event, callback, [options])](#EventEmitter+addListener) ⇒ [<code>Listener</code>](#Listener)

    * [.addOneTimeListener(event, callback, [options])](#EventEmitter+addOneTimeListener) ⇒ [<code>Listener</code>](#Listener)

    * [.hasListener([event], [callback])](#EventEmitter+hasListener) ⇒ <code>boolean</code>

    * [.getListeners(event)](#EventEmitter+getListeners) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

    * [.suspendEvent(event)](#EventEmitter+suspendEvent)

    * [.unsuspendEvent(event)](#EventEmitter+unsuspendEvent)

    * [.getListenerCount(event)](#EventEmitter+getListenerCount) ⇒ <code>number</code>

    * [.emit(event, ...args)](#EventEmitter+emit) ⇒ <code>Array</code>

    * [.removeListener([event], [callback], [options])](#EventEmitter+removeListener)

    * [.waitFor(event, [options])](#EventEmitter+waitFor)


* * *

<a name="new_OutputChannel_new"></a>

## new OutputChannel(output, number)
<!---->
<!---->

| Param | Type | Description |
| --- | --- | --- |
| output | [<code>Output</code>](#Output) | The output this channel belongs to |
| number | <code>number</code> | The channel number (1-16) |


* * *

<a name="OutputChannel+octaveOffset"></a>

## outputChannel.octaveOffset : <code>number</code>
An integer to offset the reported octave of outgoing note-specific messages (`noteon`,
`noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
octave (C4).

Note that this value is combined with the global offset value defined on the `WebMidi` object
and with the value defined on the parent `Output` object.

<!--**Kind**: instance property of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="OutputChannel+output"></a>

## outputChannel.output : [<code>Output</code>](#Output)
The parent [Output](#Output) this channel belongs to

<!--**Kind**: instance property of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="OutputChannel+number"></a>

## outputChannel.number : <code>number</code>
This channel's MIDI number (1-16)

<!--**Kind**: instance property of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Since**: 3.0  
<!---->

* * *

<a name="EventEmitter+eventMap"></a>

## outputChannel.eventMap : <code>Object</code>
An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

<!--**Kind**: instance property of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>eventMap</code>](#EventEmitter+eventMap)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventsSuspended"></a>

## outputChannel.eventsSuspended : <code>boolean</code>
Whether or not the execution of function callbacks is currently suspended for this whole
emitter

<!--**Kind**: instance property of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>eventsSuspended</code>](#EventEmitter+eventsSuspended)  
<!---->

* * *

<a name="EventEmitter+eventNames"></a>

## outputChannel.eventNames : <code>Array.&lt;string&gt;</code>
An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>eventNames</code>](#EventEmitter+eventNames)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventCount"></a>

## outputChannel.eventCount : <code>number</code>
The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>eventCount</code>](#EventEmitter+eventCount)  
**Read only**: true  
<!---->

* * *

<a name="OutputChannel+send"></a>

## outputChannel.send(message, [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
sent immediately. The message should be an array of 8 bit unsigned integers (0-225), a
[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
object or a `Message` object.

It is usually not necessary to use this method directly as you can use one of the simpler
helper methods such as `playNote()`, `stopNote()`, `sendControlChange()`, etc.

Details on the format of MIDI messages are available in the summary of
[MIDI messages](https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message)
from the MIDI Manufacturers Association.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The first byte (status) must be an integer between 128 and 255.
- <code>RangeError</code> Data bytes must be integers between 0 and 255.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>Array.&lt;number&gt;</code> \| <code>Uint8Array</code> \| [<code>Message</code>](#Message) |  | An array of 8bit unsigned integers, a `Uint8Array` object (not available in Node.js) containing the message bytes or a `Message` object. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a positive number ([DOMHighResTimeStamp](https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp)), the operation will be scheduled for that point time. If `time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setKeyAftertouch"></a>

## outputChannel.setKeyAftertouch(target, [pressure], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a MIDI **key aftertouch** message at the scheduled time. This is a key-specific
aftertouch. For a channel-wide aftertouch message, use
[setChannelAftertouch()](#Output+setChannelAftertouch).

The key can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note identifier such as `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- RangeError Invalid key aftertouch value.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | <code>number</code> \| <code>string</code> \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> |  | The key(s) for which you are sending an aftertouch value. The notes can be specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), or an array of the previous types. When using a note identifier, the octave value will be offset by the combined value of `InputChannel.octaveOffset`, `Input.octaveOffset` and `WebMidi.octaveOffset` (if those values are not `0`). When using a key number, octaveOffset values are ignored. |
| [pressure] | <code>number</code> | <code>0.5</code> | The pressure level (between 0 and 1). An invalid pressure value will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the pressure is defined by using an integer between 0 and 127. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.useRawValue] | <code>boolean</code> | <code>false</code> | A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127. |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+sendControlChange"></a>

## outputChannel.sendControlChange(controller, value, [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a MIDI **control change** message to the channel at the scheduled time. The control
change message to send can be specified numerically (0 to 127) or by using one of the following
common names:

 * `bankselectcoarse` (#0)
 * `modulationwheelcoarse` (#1)
 * `breathcontrollercoarse` (#2)
 * `footcontrollercoarse` (#4)
 * `portamentotimecoarse` (#5)
 * `dataentrycoarse` (#6)
 * `volumecoarse` (#7)
 * `balancecoarse` (#8)
 * `pancoarse` (#10)
 * `expressioncoarse` (#11)
 * `effectcontrol1coarse` (#12)
 * `effectcontrol2coarse` (#13)
 * `generalpurposeslider1` (#16)
 * `generalpurposeslider2` (#17)
 * `generalpurposeslider3` (#18)
 * `generalpurposeslider4` (#19)
 * `bankselectfine` (#32)
 * `modulationwheelfine` (#33)
 * `breathcontrollerfine` (#34)
 * `footcontrollerfine` (#36)
 * `portamentotimefine` (#37)
 * `dataentryfine` (#38)
 * `volumefine` (#39)
 * `balancefine` (#40)
 * `panfine` (#42)
 * `expressionfine` (#43)
 * `effectcontrol1fine` (#44)
 * `effectcontrol2fine` (#45)
 * `holdpedal` (#64)
 * `portamento` (#65)
 * `sustenutopedal` (#66)
 * `softpedal` (#67)
 * `legatopedal` (#68)
 * `hold2pedal` (#69)
 * `soundvariation` (#70)
 * `resonance` (#71)
 * `soundreleasetime` (#72)
 * `soundattacktime` (#73)
 * `brightness` (#74)
 * `soundcontrol6` (#75)
 * `soundcontrol7` (#76)
 * `soundcontrol8` (#77)
 * `soundcontrol9` (#78)
 * `soundcontrol10` (#79)
 * `generalpurposebutton1` (#80)
 * `generalpurposebutton2` (#81)
 * `generalpurposebutton3` (#82)
 * `generalpurposebutton4` (#83)
 * `reverblevel` (#91)
 * `tremololevel` (#92)
 * `choruslevel` (#93)
 * `celestelevel` (#94)
 * `phaserlevel` (#95)
 * `databuttonincrement` (#96)
 * `databuttondecrement` (#97)
 * `nonregisteredparametercoarse` (#98)
 * `nonregisteredparameterfine` (#99)
 * `registeredparametercoarse` (#100)
 * `registeredparameterfine` (#101)

 * `allsoundoff` (#120)
 * `resetallcontrollers` (#121)
 * `localcontrol` (#122)
 * `allnotesoff` (#123)
 * `omnimodeoff` (#124)
 * `omnimodeon` (#125)
 * `monomodeon` (#126)
 * `polymodeon` (#127)

As you can see above, not all control change message have a matching common name. This
does not mean you cannot use the others. It simply means you will need to use their number
(0-127) instead of their name. While you can still use them, numbers 120 to 127 are usually
reserved for *channel mode* messages. See
[sendChannelMode()](#OutputChannel+sendChannelMode) method for more info.

To view a detailed list of all available **control change** messages, please consult "Table 3 -
Control Change Messages" from the [MIDI Messages](
https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
specification.

Note: messages #0-31 (MSB) are paired with messages #32-63 (LSB). For example, message #1
(modulationwheelcoarse) can be accompanied by a second control change message for
modulationwheelfine to achieve a greater level of precision. if you want to specify both MSB
and LSB for messages between 0 and 31, you can do so by passing a 2-value array as the second
parameter.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> Controller numbers must be between 0 and 127.
- <code>RangeError</code> Invalid controller name.
- <code>TypeError</code> The value array must have a length of 2.

**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| controller | <code>number</code> \| <code>string</code> |  | The MIDI controller name or number (0-127). |
| value | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | The value to send (0-127). You can also use a two-position array for controllers 0 to 31. In this scenario, the first value will be sent as usual and the second calue will be sent to the matching LSB controller (which is obtained by adding 32 to the first controller) |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+decrementRegisteredParameter"></a>

## outputChannel.decrementRegisteredParameter(parameter, [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Decrements the specified MIDI registered parameter by 1. Here is the full list of parameter
names that can be used with this function:

 * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
 * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
 * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
 * Tuning Program (0x00, 0x03): `"tuningprogram"`
 * Tuning Bank (0x00, 0x04): `"tuningbank"`
 * Modulation Range (0x00, 0x05): `"modulationrange"`
 * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
 * Elevation Angle (0x3D, 0x01): `"elevationangle"`
 * Gain (0x3D, 0x02): `"gain"`
 * Distance Ratio (0x3D, 0x03): `"distanceratio"`
 * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
 * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
 * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
 * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
 * Roll Angle (0x3D, 0x08): `"rollangle"`

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- TypeError The specified registered parameter is invalid.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>String</code> \| <code>Array.&lt;number&gt;</code> |  | A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+incrementRegisteredParameter"></a>

## outputChannel.incrementRegisteredParameter(parameter, [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Increments the specified MIDI registered parameter by 1. Here is the full list of parameter
names that can be used with this function:

 * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
 * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
 * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
 * Tuning Program (0x00, 0x03): `"tuningprogram"`
 * Tuning Bank (0x00, 0x04): `"tuningbank"`
 * Modulation Range (0x00, 0x05): `"modulationrange"`
 * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
 * Elevation Angle (0x3D, 0x01): `"elevationangle"`
 * Gain (0x3D, 0x02): `"gain"`
 * Distance Ratio (0x3D, 0x03): `"distanceratio"`
 * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
 * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
 * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
 * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
 * Roll Angle (0x3D, 0x08): `"rollangle"`

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- TypeError The specified registered parameter is invalid.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>String</code> \| <code>Array.&lt;number&gt;</code> |  | A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (0x65, 0x64) that identify the registered parameter. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+playNote"></a>

## outputChannel.playNote(note, [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Plays a note or an array of notes on the channel. The first parameter is the note to play. It
can be a single value or an array of the following valid values:

 - A [Note](#Note) object
 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)

The `playNote()` method sends a **note on** MIDI message for all specified notes on all
specified channels. If a `duration` is set in the `options` parameter or in the [Note](#Note)
object's [duration](#Note+duration) property, it will also schedule a **note off** message
to end the note after said duration. If no `duration` is set, the note will simply play until
a matching **note off** message is sent with [stopNote()](#OutputChannel+stopNote) or
[sendNoteOff()](#OutputChannel+sendNoteOff).

 The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](#Note) objects, the durations and velocities defined in the [Note](#Note)
objects have precedence over the ones specified via the method's `options` parameter.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  | The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](#Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> |  | A positive number larger than 0 representing the number of milliseconds to wait before sending a **note off** message. If invalid or left undefined, only a **note on** message will be sent. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The velocity at which to play the note (between `0` and `1`). If the `rawAttack` option is also defined, it will have priority. An invalid velocity value will silently trigger the default of `0.5`. |
| [options.rawAttack] | <code>number</code> | <code>0.5</code> | The attack velocity at which to play the note (between `0` and `127`). This has priority over the `attack` property. An invalid velocity value will silently trigger the default of `0.5`. |
| [options.release] | <code>number</code> | <code>0.5</code> | The velocity at which to release the note (between `0` and `1`). If the `rawRelease` option is also defined, it will have priority. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set. |
| [options.rawRelease] | <code>number</code> | <code>0.5</code> | The velocity at which to release the note (between `0` and `127`). This has priority over the `release` property. An invalid velocity value will silently trigger the default of `0.5`. This is only used with the **note off** event triggered when `options.duration` is set. |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+sendNoteOff"></a>

## outputChannel.sendNoteOff(note, [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a **note off** message for the specified notes on the channel. The first parameter is the
note. It can be a single value or an array of the following valid values:

 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
 - A [Note](#Note) object

 The execution of the **note off** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](#Note) objects, the release velocity defined in the [Note](#Note) objects has
precedence over the one specified via the method's `options` parameter.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  | The note(s) to stop. The notes can be specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a [Note](#Note) object or an array of the previous types. When using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |
| [options.release] | <code>number</code> | <code>0.5</code> | The velocity at which to release the note (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have priority. An invalid velocity value will silently trigger the default of `0.5`. |
| [options.rawRelease] | <code>number</code> | <code>64</code> | The velocity at which to release the note (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have priority. An invalid velocity value will silently trigger the default of `64`. |


* * *

<a name="OutputChannel+stopNote"></a>

## outputChannel.stopNote(note, options) ⇒ [<code>Output</code>](#Output)
This is an alias to the [sendNoteOff()](#OutputChannel+sendNoteOff) method.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**See**: [sendNoteOff](#OutputChannel+sendNoteOff)  
<!---->

| Param |
| --- |
| note | 
| options | 


* * *

<a name="OutputChannel+sendNoteOn"></a>

## outputChannel.sendNoteOn(note, [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a **note on** message for the specified note(s) on the channel. The first parameter is
the note. It can be a single value or an array of the following valid values:

 - A [Note](#Note) object
 - A MIDI note number (integer between `0` and `127`)
 - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)

 When passing a [Note](#Note) object or a note name, the `octaveOffset` will be applied. This is
 not the case when using a note number number. In this case, we assume you know exactly which
 MIDI note number should be sent out.


 The execution of the **note on** command can be delayed by using the `time` property of the
`options` parameter.

When using [Note](#Note) objects, the attack velocity defined in the [Note](#Note) objects has
precedence over the one specified via the method's `options` parameter. Also, the `duration` is
ignored. If you want to also send a **note off** message, use the
[playNote()](#Output+playNote) method instead.

**Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
functionally equivalent to a **note off** message.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| note | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  | The note(s) to play. The notes can be specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a [Note](#Note) object or an array of the previous types. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The velocity at which to play the note (between `0` and `1`).  If the `rawAttack` option is also defined, `rawAttack` will have priority. An invalid velocity value will silently trigger the default of `0.5`. |
| [options.rawAttack] | <code>number</code> | <code>64</code> | The velocity at which to release the note (between `0` and `127`). If the `attack` option is also defined, `rawAttack` will have priority. An invalid velocity value will silently trigger the default of `64`. |


* * *

<a name="OutputChannel+sendChannelMode"></a>

## outputChannel.sendChannelMode(command, value, [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a MIDI **channel mode** message. The channel mode message to send can be specified
numerically or by using one of the following common names:

  * `"allsoundoff"` (#120)
  * `"resetallcontrollers"` (#121)
  * `"localcontrol"` (#122)
  * `"allnotesoff"` (#123)
  * `"omnimodeoff"` (#124)
  * `"omnimodeon"` (#125)
  * `"monomodeon"` (#126)
  * `"polymodeon"` (#127)

It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may
require a value that's not zero. For that reason, the `value` parameter is optional and
defaults to 0.

To make it easier, all channel mode messages have a matching helper method:

  - [turnSoundOff()](#Output+turnSoundOff)
  - [resetAllControllers()](#Output+resetAllControllers)
  - [setLocalControl()](#Output+turnSoundOff)
  - [turnNotesOff()](#Output+turnNotesOff)
  - [setOmniMode()](#Output+setOmniMode)
  - [setPolyphonicMode()](#Output+setPolyphonicMode)

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>number</code> \| <code>string</code> |  | The numerical identifier of the channel mode message (integer between 120-127) or its name as a string. |
| value | <code>number</code> |  | The value to send (integer between 0-127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setOmniMode"></a>

## outputChannel.setOmniMode([state], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sets OMNI mode to `"on"` or `"off"`. MIDI's OMNI mode causes the instrument to respond to
messages from all channels.

It should be noted that support for OMNI mode is not as common as it used to be.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- <code>TypeError</code> Invalid channel mode message name.
- <code>RangeError</code> Channel mode controller numbers must be between 120 and 127.
- <code>RangeError</code> Value must be an integer between 0 and 127.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [state] | <code>boolean</code> | <code>true</code> | Whether to activate OMNI mode (`true`) or not (`false`). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setChannelAftertouch"></a>

## outputChannel.setChannelAftertouch([pressure], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a MIDI **channel aftertouch** message. For key-specific aftertouch, you should instead
use [setKeyAftertouch()](#Output+setKeyAftertouch).

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- RangeError Invalid channel aftertouch value.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [pressure] | <code>number</code> |  | The pressure level (between 0 and 1). If the `rawValue` option is set to `true`, the pressure can be defined by using an integer between 0 and 127. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | A boolean indicating whether the value should be considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127. |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setMasterTuning"></a>

## outputChannel.setMasterTuning([value], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a **master tuning** message. The value is decimal and must be larger than -65 semitones
and smaller than 64 semitones.

Because of the way the MIDI specification works, the decimal portion of the value will be
encoded with a resolution of 14bit. The integer portion must be between -64 and 63
inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
a **Master Fine Tuning** RPN messages.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The value must be a decimal number between larger than -65 and smaller
than 64.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>number</code> | <code>0.0</code> | The desired decimal adjustment value in semitones (-65 < x < 64) |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setModulationRange"></a>

## outputChannel.setModulationRange(semitones, [cents], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a **modulation depth range** message to adjust the depth of the modulation wheel's range.
The range can be specified with the `semitones` parameter, the `cents` parameter or by
specifying both parameters at the same time.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| semitones | <code>number</code> |  | The desired adjustment value in semitones (integer between 0 and 127). |
| [cents] | <code>number</code> | <code>0</code> | The desired adjustment value in cents (integer between 0 and 127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setNonRegisteredParameter"></a>

## outputChannel.setNonRegisteredParameter(parameter, [data], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sets a non-registered parameter (NRPN) to the specified value. The NRPN is selected by passing
in a two-position array specifying the values of the two control bytes. The value is specified
by passing in a single integer (most cases) or an array of two integers.

NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
they see fit. For example, according to the Roland GS specification, you can control the
**vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
would use:

```js
WebMidi.outputs[0].channels[0].setNonRegisteredParameter([1, 8], 123);
```

In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
value to send was 10, you could use:

```js
WebMidi.outputs[0].channels[0].setNonRegisteredParameter([2, 63], [0, 10]);
```

For further implementation details, refer to the manufacturer's documentation.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The control value must be between 0 and 127.
- <code>RangeError</code> The msb value must be between 0 and 127

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>Array.&lt;number&gt;</code> |  | A two-position array specifying the two control bytes (0x63, 0x62) that identify the non-registered parameter. |
| [data] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | <code>[]</code> | An integer or an array of integers with a length of 1 or 2 specifying the desired data. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setPitchBend"></a>

## outputChannel.setPitchBend([value], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a MIDI **pitch bend** message at the scheduled time.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>number</code> \| <code>Array.&lt;number&gt;</code> |  | The intensity of the bend (between -1.0 and 1.0). A value of zero means no bend. The resulting bend is relative to the pitch bend range that has been defined. The range can be set with [setPitchBendRange()](#OutputChannel+setPitchBendRange) . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of -1 will bend the note 1 octave below its nominal value. If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127 representing, respectively, the MSB (most significant byte) and the LSB (least significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64` bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents (1/100 of a semitone). An LSB of `64` also means no bend. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.rawValue] | <code>boolean</code> | <code>false</code> | A boolean indicating whether the value should be considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or an array of 2 integers if using both MSB and LSB). |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setPitchBendRange"></a>

## outputChannel.setPitchBendRange(semitones, [cents], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
adjust the range used by their pitch bend lever. The range is specified by using the
`semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
means that the pitch bend range will be 12 semitones above and below the nominal pitch.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The msb value must be between 0 and 127.
- <code>RangeError</code> The lsb value must be between 0 and 127.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| semitones | <code>number</code> |  | The desired adjustment value in semitones (between 0 and 127). While nothing imposes that in the specification, it is very common for manufacturers to limit the range to 2 octaves (-12 semitones to 12 semitones). |
| [cents] | <code>number</code> | <code>0</code> | The desired adjustment value in cents (integer between 0-127). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setProgram"></a>

## outputChannel.setProgram([program], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a MIDI **program change** message at the scheduled time.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- <code>TypeError</code> Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
than 0xFF.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [program] | <code>number</code> | <code>1</code> | The MIDI patch (program) number (1-128) |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setRegisteredParameter"></a>

## outputChannel.setRegisteredParameter(parameter, [data], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sets the specified MIDI registered parameter to the desired value. The value is defined with
up to two bytes of data (msb, lsb) that each can go from 0 to 127.

MIDI
[registered parameters]
(https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
extend the original list of control change messages. The MIDI 1.0 specification lists only a
limited number of them. Here are the original registered parameters with the identifier that
can be used as the first parameter of this function:

 * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
 * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
 * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
 * Tuning Program (0x00, 0x03): `"tuningprogram"`
 * Tuning Bank (0x00, 0x04): `"tuningbank"`
 * Modulation Range (0x00, 0x05): `"modulationrange"`

Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
Standard*, which is not widely implemented.

Another set of extra parameters have been later added for 3D sound controllers. They are:

 * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
 * Elevation Angle (0x3D, 0x01): `"elevationangle"`
 * Gain (0x3D, 0x02): `"gain"`
 * Distance Ratio (0x3D, 0x03): `"distanceratio"`
 * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
 * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
 * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
 * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
 * Roll Angle (0x3D, 0x08): `"rollangle"`

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parameter | <code>string</code> \| <code>Array.&lt;number&gt;</code> |  | A string identifying the parameter's name (see above) or a two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the registered parameter. |
| [data] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | <code>[]</code> | An single integer or an array of integers with a maximum length of 2 specifying the desired data. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setTuningBank"></a>

## outputChannel.setTuningBank(value, [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The bank value must be between 1 and 128.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The desired tuning bank (1-128). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setTuningProgram"></a>

## outputChannel.setTuningProgram(value, [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
*MIDI Tuning Standard*, which is not widely implemented.

**Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
that use a numbering scheme starting at 1.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
**Throws**:

- <code>RangeError</code> The program value must be between 1 and 128.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The desired tuning program (1-128). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setLocalControl"></a>

## outputChannel.setLocalControl([state], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Turns local control on or off. Local control is usually enabled by default. If you disable it,
the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
its out port.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [state] | <code>boolean</code> | <code>false</code> | Whether to activate local control (`true`) or disable it (`false`). |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+turnNotesOff"></a>

## outputChannel.turnNotesOff([options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends an **all notes off** channel mode message. This will make all currently playing notes
fade out just as if their key had been released. This is different from the
[turnSoundOff()](#OutputChannel+turnSoundOff) method which mutes all sounds immediately.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+turnSoundOff"></a>

## outputChannel.turnSoundOff([options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends an **all sound off** channel mode message. This will silence all sounds playing on that
channel but will not prevent new sounds from being triggered.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+resetAllControllers"></a>

## outputChannel.resetAllControllers([options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sends a **reset all controllers** channel mode message. This resets all controllers, such as
the pitch bend, to their default value.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="OutputChannel+setPolyphonicMode"></a>

## outputChannel.setPolyphonicMode([mode], [options]) ⇒ [<code>OutputChannel</code>](#OutputChannel)
Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
multiple notes are being played.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Returns**: [<code>OutputChannel</code>](#OutputChannel) - Returns the `OutputChannel` object so methods can be chained.  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [mode] | <code>string</code> | <code>&quot;poly&quot;</code> | The mode to use: `"mono"` or `"poly"`. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.time] | <code>number</code> \| <code>string</code> |  | If `time` is a string prefixed with `"+"` and followed by a number, the message will be delayed by that many milliseconds. If the value is a number, the operation will be scheduled for that time. The current time can be retrieved with [WebMidi.time](#WebMidi+time). If `options.time` is omitted, or in the past, the operation will be carried out as soon as possible. |


* * *

<a name="EventEmitter+addListener"></a>

## outputChannel.addListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a listener for the specified event. It returns the [**Listener**](#Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>addListener</code>](#EventEmitter+addListener)  
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.remaining] | <code>boolean</code> | <code>Infinity</code> | The number of times after which the callback should automatically be removed. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+addOneTimeListener"></a>

## outputChannel.addOneTimeListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](#Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>addOneTimeListener</code>](#EventEmitter+addOneTimeListener)  
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The context to invoke the callback function in. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+hasListener"></a>

## outputChannel.hasListener([event], [callback]) ⇒ <code>boolean</code>
Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>hasListener</code>](#EventEmitter+hasListener)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [event] | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to check |
| [callback] | <code>function</code> \| [<code>Listener</code>](#Listener) | The actual function that was added to the event or the [Listener](#Listener) object returned by `addListener()`. |


* * *

<a name="EventEmitter+getListeners"></a>

## outputChannel.getListeners(event) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>getListeners</code>](#EventEmitter+getListeners)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of `Listener` objects  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to get listeners for |


* * *

<a name="EventEmitter+suspendEvent"></a>

## outputChannel.suspendEvent(event)
Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>suspendEvent</code>](#EventEmitter+suspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to suspend execution of all callback functions. |


* * *

<a name="EventEmitter+unsuspendEvent"></a>

## outputChannel.unsuspendEvent(event)
Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>unsuspendEvent</code>](#EventEmitter+unsuspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to resume execution of all callback functions. |


* * *

<a name="EventEmitter+getListenerCount"></a>

## outputChannel.getListenerCount(event) ⇒ <code>number</code>
Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>getListenerCount</code>](#EventEmitter+getListenerCount)  
**Returns**: <code>number</code> - The number of listeners registered for the specified event.  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event |


* * *

<a name="EventEmitter+emit"></a>

## outputChannel.emit(event, ...args) ⇒ <code>Array</code>
Executes the callback functions of all the `Listener` objects registered for a given event. The
callback functions are passed the additional arguments specifed for `emit()` (if any) followed
by the arguments present in the `arguments` property of the `Listener` object (if any). For
example:

```javascript
let myEmitter = new EventEmitter();
myEmitter.addListener("test", fn, {arguments: ["a", "b", "c"]});
myEmitter.emit("test", "y", "z");
```

In this example, the function will be called as such: `fn("y", "z", "a", "b", "c");`

If the `eventsSuspended` property of the `EventEmitter` or the `suspended` property of the
`Listener` is `true`, the callback functions will not be executed.

This function returns an array containing the return values of each of the callbacks.

It should be noted that the regular listeners are triggered first followed by the global
listeners (added with `EventEmitter.ANY_EVENT`).

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>emit</code>](#EventEmitter+emit)  
**Returns**: <code>Array</code> - An array containing the return value of each of the executed listener
functions  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string.

<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event |
| ...args | <code>\*</code> | Arbitrary number of arguments to pass along to the callback functions |


* * *

<a name="EventEmitter+removeListener"></a>

## outputChannel.removeListener([event], [callback], [options])
Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>removeListener</code>](#EventEmitter+removeListener)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [event] | <code>string</code> |  | The event name. |
| [callback] | [<code>callback</code>](#EventEmitter..callback) |  | Only remove the listeners that match this exact callback function. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>\*</code> |  | Only remove the listeners that have this exact context. |
| [options.remaining] | <code>number</code> |  | Only remove the listener if it has exactly that many remaining times to be executed. |


* * *

<a name="EventEmitter+waitFor"></a>

## outputChannel.waitFor(event, [options])
The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
when the specified event occurs. The event can be a regular event or `EventEmitter.ANY_EVENT`
(if you want to resolve as soon as any event is emitted).

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready").then(() => console.log("Ready!"));
```

```javascript
// async/await syntax
const ee = new EventEmitter();
await ee.waitFor("ready");
console.log("Ready!");
```

If the `duration` option is set, the promise will only be fulfilled if the event is emitted
within the specified duration. If the event has not been fulfilled after the specified
duration, the promise is rejected. This makes it super easy to wait for an event and timeout
after a certain time if the event is not triggered.

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready", {duration: 100})
.then(() => console.log("Ready!"))
.catch(err => console.log(err);
```

```javascript
// async/await syntax
const ee = new EventEmitter();
try {
 await ee.waitFor("ready", {duration: 100});
 console.log("Ready!");
} catch(err) {
  console.log(err);
}
```

<!--**Kind**: instance method of [<code>OutputChannel</code>](#OutputChannel)  
-->
**Overrides**: [<code>waitFor</code>](#EventEmitter+waitFor)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to wait for |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds to wait before the promise is automatically rejected. |


* * *

<a name="Utilities"></a>

# Utilities
The `Utilities` class contains general-purpose utility methods. All methods are static and
should be called using the class name. For example: `Utilities.getNoteDetails("C4")`.

<!--**Kind**: global class  
-->
**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->


* [Utilities](#Utilities)

    * [.toNoteNumber(identifier, [octaveOffset])](#Utilities.toNoteNumber) ⇒ <code>number</code>

    * [.getNoteDetails(value)](#Utilities.getNoteDetails) ⇒ <code>Object</code>

    * [.sanitizeChannels([channel])](#Utilities.sanitizeChannels) ⇒ <code>Array</code>

    * [.toTimestamp([time])](#Utilities.toTimestamp) ⇒ <code>number</code> \| <code>false</code>

    * [.guessNoteNumber(input)](#Utilities.guessNoteNumber) ⇒ <code>number</code> \| <code>false</code>

    * [.toNoteIdentifier(The, An)](#Utilities.toNoteIdentifier) ⇒ <code>string</code>

    * [.buildNote([input], [options])](#Utilities.buildNote) ⇒ [<code>Note</code>](#Note)

    * [.buildNoteArray([notes], [options])](#Utilities.buildNoteArray) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)

    * [.toNormalized(value)](#Utilities.toNormalized) ⇒ <code>number</code>

    * [.to7Bit(value)](#Utilities.to7Bit) ⇒ <code>number</code>

    * [.offsetNumber(offset)](#Utilities.offsetNumber) ⇒ <code>number</code>

    * [.getPropertyByValue(object, value)](#Utilities.getPropertyByValue) ⇒ <code>string</code>


* * *

<a name="Utilities.toNoteNumber"></a>

## Utilities.toNoteNumber(identifier, [octaveOffset]) ⇒ <code>number</code>
Returns a MIDI note number matching the identifier passed in the form of a string. The
identifier must include the octave number. The identifier also optionally include a sharp (#),
a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
identifiers: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.

When converting note identifiers to numbers, C4 is considered to be middle C (MIDI note number
60) as per the scientific pitch notation standard.

The resulting note number can be offset by using the `octaveOffset` parameter.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> - The MIDI note number (an integer between 0 and 127).  
**Throws**:

- RangeError Invalid 'octaveOffset' value
- TypeError Invalid note identifier

**Since**: 3.0.0  
<!--**License**: Apache-2.0  
-->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| identifier | <code>string</code> |  | The identifier in the form of a letter, followed by an optional "#", "##", "b" or "bb" followed by the octave number. For exemple: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc. |
| [octaveOffset] | <code>number</code> | <code>0</code> | A integer to offset the octave by. |


* * *

<a name="Utilities.getNoteDetails"></a>

## Utilities.getNoteDetails(value) ⇒ <code>Object</code>
Given a proper note identifier ("C#4", "Gb-1", etc.) or a valid MIDI note number (9-127), this
method returns an object containing broken down details about the specified note (uppercase
letter, accidental and octave).

When a number is specified, the translation to note is done using a value of 60 for middle C
(C4 = middle C).

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Throws**:

- TypeError Invalid note identifier

**Since**: 3.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> \| <code>number</code> | A note identifier A  atring ("C#4", "Gb-1", etc.) or a MIDI note number (0-127). |


* * *

<a name="Utilities.sanitizeChannels"></a>

## Utilities.sanitizeChannels([channel]) ⇒ <code>Array</code>
Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be a
single integer or an array of integers.

For backwards-compatibility, passing `undefined` as a parameter to this method results in all
channels being returned (1-16). Otherwise, parameters that cannot successfully be parsed to
integers between 1 and 16 are silently ignored.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>Array</code> - An array of 0 or more valid MIDI channel numbers.  
**Since**: 3.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [channel] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | An integer or an array of integers to parse as channel numbers. |


* * *

<a name="Utilities.toTimestamp"></a>

## Utilities.toTimestamp([time]) ⇒ <code>number</code> \| <code>false</code>
Returns a valid timestamp, relative to the navigation start of the document, derived from the
`time` parameter. If the parameter is a string starting with the "+" sign and followed by a
number, the resulting timestamp will be the sum of the current timestamp plus that number. If
the parameter is a positive number, it will be returned as is. Otherwise, false will be
returned.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> \| <code>false</code> - A positive number or `false` (if the time cannot be converted)  
**Since**: 3.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [time] | <code>number</code> \| <code>string</code> | The time string (e.g. `"+2000"`) or number to parse |


* * *

<a name="Utilities.guessNoteNumber"></a>

## Utilities.guessNoteNumber(input) ⇒ <code>number</code> \| <code>false</code>
Returns a valid MIDI note number (0-127) given the specified input. The input usually is a
string containing a note identifier (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer
between 0 and 127 is passed, it will simply be returned as is (for convenience). Other strings
will be parsed for integer value, if possible.

If the input is an identifier, the resulting note number is offset by the `octaveOffset`
parameter. For example, if you pass in "C4" (note number 60) and the `octaveOffset` value is
-2, the resulting MIDI note number will be 36.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> \| <code>false</code> - A valid MIDI note number (0-127) or `false` if the input could not
successfully be parsed to a note number.  
**Since**: 3.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>number</code> | A string or number to extract the MIDI note number from. |


* * *

<a name="Utilities.toNoteIdentifier"></a>

## Utilities.toNoteIdentifier(The, An) ⇒ <code>string</code>
Returns an identifier string representing a note name (with optional accidental) followed by an
octave number. The octave can be offset by using the `octaveOffset` parameter.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Throws**:

- RangeError Invalid note number
- RangeError Invalid octaveOffset value

**Since**: 3.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | MIDI note number to convert to a note identifier |
| An | <code>octaveOffset</code> | offset to apply to the resulting octave |


* * *

<a name="Utilities.buildNote"></a>

## Utilities.buildNote([input], [options]) ⇒ [<code>Note</code>](#Note)
Converts the `input` parameter to a valid [Note](#Note) object. The input usually is an unsigned
integer (0-127) or a note identifier (`"C4"`, `"G#5"`, etc.). If the input is a [Note](#Note)
object, it will be returned as is.

If the input is a note number or identifier, it is possible to specify options by providing the
`options` parameter.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Throws**:

- TypeError The input could not be parsed to a note

**Since**: version 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [input] | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) |  |  |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the note should be explicitly stopped. |
| [options.attack] | <code>number</code> | <code>64</code> | The note's attack velocity as an integer between 0 and 127. |
| [options.release] | <code>number</code> | <code>64</code> | The note's release velocity as an integer between 0 and 127. |
| [options.octaveOffset] | <code>number</code> | <code>0</code> | An integer to offset the octave by. **This is only used when the input value is a note identifier.** |


* * *

<a name="Utilities.buildNoteArray"></a>

## Utilities.buildNoteArray([notes], [options]) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
Converts an input value, which can be an unsigned integer (0-127), a note identifier, a
[Note](#Note) object or an array of the previous types, to an array of [Note](#Note) objects.

[Note](#Note) objects are returned as is. For note numbers and identifiers, a [Note](#Note)
object is created with the options specified. An error will be thrown when encountering invalid
input.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Throws**:

- TypeError An element could not be parsed as a note.

**Since**: 3.0.0  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [notes] | <code>number</code> \| <code>string</code> \| [<code>Note</code>](#Note) \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| [<code>Array.&lt;Note&gt;</code>](#Note) |  |  |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the note should be explicitly stopped. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The note's attack velocity as a decimal number between 0 and 1. |
| [options.release] | <code>number</code> | <code>0.5</code> | The note's release velocity as a decimal number between 0 and 1. |
| [options.rawAttack] | <code>number</code> | <code>64</code> | The note's attack velocity as an integer between 0 and 127. |
| [options.rawRelease] | <code>number</code> | <code>64</code> | The note's release velocity as an integer between 0 and 127. |
| [options.octaveOffset] | <code>number</code> | <code>0</code> | An integer to offset the octave by. **This is only used when the input value is a note identifier.** |


* * *

<a name="Utilities.toNormalized"></a>

## Utilities.toNormalized(value) ⇒ <code>number</code>
Returns a number between 0 and 1 representing the ratio of the input value divided by 127 (7
bit). The returned value is restricted between 0 and 1 even if the input is greater than 127 or
smaller than 0.

Passing `Infinity` will return `1` and passing `-Infinity` will return `0`. Otherwise, when the
input value cannot be converted to an integer, the method returns 0.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> - A number between 0 and 1 (inclusive)  
<!---->

| Param | Description |
| --- | --- |
| value | A positive integer between 0 and 127 (inclusive) |


* * *

<a name="Utilities.to7Bit"></a>

## Utilities.to7Bit(value) ⇒ <code>number</code>
Returns a number between 0 and 127 which is the result of multiplying the input value by 127.
The input value should be number between 0 and 1 (inclusively). The returned value is
restricted between 0 and 127 even if the input is greater than 1 or smaller than 0.

Passing `Infinity` will return `127` and passing `-Infinity` will return `0`. Otherwise, when
the input value cannot be converted to a number, the method returns 0.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> - A number between 0 and 1 (inclusive)  
<!---->

| Param | Description |
| --- | --- |
| value | A positive integer between 0 and 127 (inclusive) |


* * *

<a name="Utilities.offsetNumber"></a>

## Utilities.offsetNumber(offset) ⇒ <code>number</code>
Returns the supplied MIDI note number offset by the requested octave and semitone values. If
the calculated value is less than 0, 0 will be returned. If the calculated value is more than
127, 127 will be returned. If an invalid offset value is supplied, 0 will be used.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>number</code> - An integer between 0 and 127  
**Throws**:

- <code>Error</code> Invalid note number

<!---->

| Param |
| --- |
| offset | 


* * *

<a name="Utilities.getPropertyByValue"></a>

## Utilities.getPropertyByValue(object, value) ⇒ <code>string</code>
Returns the name of the first property of the supplied object whose value is equal to the one
supplied.

<!--**Kind**: static method of [<code>Utilities</code>](#Utilities)  
-->
**Returns**: <code>string</code> - The name of the matching property  
<!---->

| Param | Type |
| --- | --- |
| object | <code>Object</code> | 
| value | <code>\*</code> | 


* * *

<a name="WebMidi"></a>

# WebMidi ⇐ [<code>EventEmitter</code>](#EventEmitter)
The `WebMidi` object makes it easier to work with the low-level Web MIDI API. Basically, it
simplifies sending outgoing MIDI messages and reacting to incoming MIDI messages.

When using the WebMidi.js library, you should know that the `WebMidi` class has already been
instantiated. If you use the **IIFE** version, you should simply use the global object called
`WebMidi`. If you use the **CJS** (CommonJS) or **ESM** (ES6 module) version, you get an
already-instantiated object. This means there is no need to instantiate a new `WebMidi` object
directly.

<!--**Kind**: global class  
-->
**Extends**: [<code>EventEmitter</code>](#EventEmitter)  
**Emits**: [<code>connected</code>](#WebMidi+event_connected), [<code>disabled</code>](#WebMidi+event_disabled), [<code>disconnected</code>](#WebMidi+event_disconnected), [<code>enabled</code>](#WebMidi+event_enabled), [<code>midiaccessgranted</code>](#WebMidi+event_midiaccessgranted)  
<!--**License**: Apache-2.0  
-->


* [WebMidi](#WebMidi) ⇐ [<code>EventEmitter</code>](#EventEmitter)

    * [.defaults](#WebMidi+defaults) : <code>Object</code>

    * [.interface](#WebMidi+interface) : <code>MIDIAccess</code>

    * [.validation](#WebMidi+validation) : <code>boolean</code>

    * [.enabled](#WebMidi+enabled) : <code>boolean</code>

    * [.inputs](#WebMidi+inputs) : <code>Array</code>

    * [.isNode](#WebMidi+isNode) : <code>boolean</code>

    * [.isBrowser](#WebMidi+isBrowser) : <code>boolean</code>

    * [.octaveOffset](#WebMidi+octaveOffset) : <code>number</code>

    * [.outputs](#WebMidi+outputs) : <code>Array</code>

    * [.supported](#WebMidi+supported) : <code>boolean</code>

    * [.sysexEnabled](#WebMidi+sysexEnabled) : <code>Boolean</code>

    * [.time](#WebMidi+time) : <code>DOMHighResTimeStamp</code>

    * [.eventMap](#EventEmitter+eventMap) : <code>Object</code>

    * [.eventsSuspended](#EventEmitter+eventsSuspended) : <code>boolean</code>

    * [.eventNames](#EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

    * [.eventCount](#EventEmitter+eventCount) : <code>number</code>

    * [.enable([options])](#WebMidi+enable) ⇒ <code>Promise.&lt;Object&gt;</code>

    * [.disable()](#WebMidi+disable) ⇒ <code>Promise.&lt;void&gt;</code>

    * [.getInputById(id)](#WebMidi+getInputById) ⇒ [<code>Input</code>](#Input) \| <code>false</code>

    * [.getInputByName(name)](#WebMidi+getInputByName) ⇒ [<code>Input</code>](#Input) \| <code>false</code>

    * [.getOutputByName(name)](#WebMidi+getOutputByName) ⇒ [<code>Output</code>](#Output) \| <code>false</code>

    * [.getOutputById(id)](#WebMidi+getOutputById) ⇒ [<code>Output</code>](#Output) \| <code>false</code>

    * [.addListener(event, callback, [options])](#EventEmitter+addListener) ⇒ [<code>Listener</code>](#Listener)

    * [.addOneTimeListener(event, callback, [options])](#EventEmitter+addOneTimeListener) ⇒ [<code>Listener</code>](#Listener)

    * [.hasListener([event], [callback])](#EventEmitter+hasListener) ⇒ <code>boolean</code>

    * [.getListeners(event)](#EventEmitter+getListeners) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)

    * [.suspendEvent(event)](#EventEmitter+suspendEvent)

    * [.unsuspendEvent(event)](#EventEmitter+unsuspendEvent)

    * [.getListenerCount(event)](#EventEmitter+getListenerCount) ⇒ <code>number</code>

    * [.emit(event, ...args)](#EventEmitter+emit) ⇒ <code>Array</code>

    * [.removeListener([event], [callback], [options])](#EventEmitter+removeListener)

    * [.waitFor(event, [options])](#EventEmitter+waitFor)

    * ["error"](#WebMidi+event_error)

    * ["midiaccessgranted"](#WebMidi+event_midiaccessgranted)

    * ["enabled"](#WebMidi+event_enabled)

    * ["disabled"](#WebMidi+event_disabled)

    * ["connected"](#WebMidi+event_connected)

    * ["disconnected"](#WebMidi+event_disconnected)


* * *

<a name="WebMidi+defaults"></a>

## webMidi.defaults : <code>Object</code>
Object containing system-wide default values that can be changed to customize how the library
works.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| defaults.note | <code>object</code> | Default values relating to note |
| defaults.note.attack | <code>number</code> | A number between 0 and 127 representing the default attack velocity of notes. Initial value is 64. |
| defaults.note.release | <code>number</code> | A number between 0 and 127 representing the default release velocity of notes. Initial value is 64. |
| defaults.note.duration | <code>number</code> | A number representing the default duration of notes (in seconds). Initial value is Infinity. |


* * *

<a name="WebMidi+interface"></a>

## webMidi.interface : <code>MIDIAccess</code>
The `MIDIAccess` instance used to talk to the Web MIDI API. This should not be used directly
unless you know what you are doing.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  
<!---->

* * *

<a name="WebMidi+validation"></a>

## webMidi.validation : <code>boolean</code>
Indicates whether argument validation and backwards-compatibility checks are performed
throughout the WebMidi.js library for object methods and property setters.

This is an advanced setting that should be used carefully. Setting `validation` to `false`
improves performance but should only be done once the project has been thoroughly tested with
validation turned on.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
<!---->

* * *

<a name="WebMidi+enabled"></a>

## webMidi.enabled : <code>boolean</code>
Indicates whether access to the host's MIDI subsystem is active or not.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  
<!---->

* * *

<a name="WebMidi+inputs"></a>

## webMidi.inputs : <code>Array</code>
An array of all currently available MIDI inputs.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  
<!---->

* * *

<a name="WebMidi+isNode"></a>

## webMidi.isNode : <code>boolean</code>
Indicates whether the current environment is Node.js or not. If you need to check if we are in
browser, use isBrowser. In certain environments (such as Electron and NW.js) isNode and
isBrowser can both be true at the same time.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
<!---->

* * *

<a name="WebMidi+isBrowser"></a>

## webMidi.isBrowser : <code>boolean</code>
Indicates whether the current environment is a browser environment or not. If you need to check
if we are in Node.js, use isNode. In certain environments (such as Electron and NW.js) isNode
and isBrowser can both be true at the same time.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
<!---->

* * *

<a name="WebMidi+octaveOffset"></a>

## webMidi.octaveOffset : <code>number</code>
An integer to offset the octave of notes received from external devices or sent to external
devices.

When a MIDI message comes in on an input channel the reported note name will be offset. For
example, if the `octaveOffset` is set to `-1` and a **note on** message with MIDI number 60
comes in, the note will be reported as C3 (instead of C4).

By the same token, when `OutputChannel.playNote()` is called, the MIDI note number being sent
will be offset. If `octaveOffset` is set to `-1`, the MIDI note number sent will be 72 (instead
of 60).

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Since**: 2.1  
<!---->

* * *

<a name="WebMidi+outputs"></a>

## webMidi.outputs : <code>Array</code>
An array of all currently available MIDI outputs.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  
<!---->

* * *

<a name="WebMidi+supported"></a>

## webMidi.supported : <code>boolean</code>
Indicates whether the environment provides support for the Web MIDI API or not.

**Note**: in environments that do not offer built-in MIDI support, this will report `true` if
the `navigator.requestMIDIAccess` function is available. For example, if you have installed
WebMIDIAPIShim.js but no plugin, this property will be `true` even though actual support might
not be there.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  
<!---->

* * *

<a name="WebMidi+sysexEnabled"></a>

## webMidi.sysexEnabled : <code>Boolean</code>
Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
enabled via the `enable()` method.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  
<!---->

* * *

<a name="WebMidi+time"></a>

## webMidi.time : <code>DOMHighResTimeStamp</code>
The elapsed time, in milliseconds, since the time
[origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).
Said simply, it is the number of milliseconds that passed since the page was loaded. Being a
floating-point number, it has sub-millisecond accuracy. According to the
[documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), the
time should be accurate to 5 µs (microseconds). However, due to various constraints, the
browser might only be accurate to one millisecond.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventMap"></a>

## webMidi.eventMap : <code>Object</code>
An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>eventMap</code>](#EventEmitter+eventMap)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventsSuspended"></a>

## webMidi.eventsSuspended : <code>boolean</code>
Whether or not the execution of function callbacks is currently suspended for this whole
emitter

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>eventsSuspended</code>](#EventEmitter+eventsSuspended)  
<!---->

* * *

<a name="EventEmitter+eventNames"></a>

## webMidi.eventNames : <code>Array.&lt;string&gt;</code>
An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>eventNames</code>](#EventEmitter+eventNames)  
**Read only**: true  
<!---->

* * *

<a name="EventEmitter+eventCount"></a>

## webMidi.eventCount : <code>number</code>
The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>eventCount</code>](#EventEmitter+eventCount)  
**Read only**: true  
<!---->

* * *

<a name="WebMidi+enable"></a>

## webMidi.enable([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Checks if the Web MIDI API is available in the current environment and then tries to connect to
the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
be displayed to the user.

To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
`true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
and system exclusive messages are always enabled. You can check the
[sysexEnabled](#WebMidi+sysexEnabled) property to confirm.

To enable access to software synthesizers available on the host, you would set the `software`
option to `true`. However, this option is only there to future-proof the library as support for
software synths has not yet been implemented in any browser (as of September 2021).

There are 3 ways to execute code after `WebMidi` has been enabled:

- Pass a callback function in the `options`
- Listen to the `enabled` event
- Wait for the promise to resolve

In order, this is what happens towards the end of the enabling process:

1. `midiaccessgranted` event is triggered
2. `connected` events are triggered (for each available input and output)
3. `enabled` event is triggered when WebMidi.js is ready
4. specified callback (if any) is executed
5. promise is resolved

The promise is fulfilled with the WebMidi object.

**Important note**: starting with Chrome v77, a page using Web MIDI API must be hosted on a
secure origin (`https://`, `localhost` or `file:///`) and the user will always be prompted to
authorize the operation (no matter if the `sysex` option is `true` or not).

##### Example
```js
// Enabling WebMidi and using the promise
WebMidi.enable().then(ports => {
  console.log("WebMidi.js has been enabled!");
  console.log("Inputs: ", ports.inputs);
  console.log("Outputs: ", ports.outputs);
})
```

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Returns**: <code>Promise.&lt;Object&gt;</code> - The promise is fulfilled with the `WebMidi` object  
**Throws**:

- Error The Web MIDI API is not supported in your environment.
- Error Jazz-Plugin must be installed to use WebMIDIAPIShim.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.callback] | <code>function</code> |  | A function to execute once the operation completes. This function will receive an `Error` object if enabling the Web MIDI API failed. |
| [options.sysex] | <code>boolean</code> | <code>false</code> | Whether to enable MIDI system exclusive messages or not. |
| [options.validation] | <code>boolean</code> | <code>true</code> | Whether to enable library-wide validation of method arguments and setter values. This is an advanced setting that should be used carefully. Setting `validation` to `false` improves performance but should only be done once the project has been thoroughly tested with validation turned on. |
| [options.software] | <code>boolean</code> | <code>false</code> | Whether to request access to software synthesizers on the host system. This is part of the spec but has not yet been implemented by most browsers as of April 2020. |


* * *

<a name="WebMidi+disable"></a>

## webMidi.disable() ⇒ <code>Promise.&lt;void&gt;</code>
Completely disables `WebMidi.js` by unlinking the MIDI subsystem's interface and closing all
[Input](#Input) and [Output](#Output) objects that may be available. This also means that listeners
added to [Input](#Input) objects, [Output](#Output) objects or to `WebMidi` itself are also
destroyed.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Throws**:

- Error The Web MIDI API is not supported by your environment.

**Since**: 2.0.0  
<!---->

* * *

<a name="WebMidi+getInputById"></a>

## webMidi.getInputById(id) ⇒ [<code>Input</code>](#Input) \| <code>false</code>
Returns the [Input](#Input) object that matches the specified ID string or `false` if no matching
input is found. As per the Web MIDI API specification, IDs are strings (not integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Returns**: [<code>Input</code>](#Input) \| <code>false</code> - An [Input](#Input) object matching the specified ID string. If no matching
input can be found, the method returns `false`.  
**Throws**:

- Error WebMidi is not enabled.

**Since**: 2.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID string of the input. IDs can be viewed by looking at the [inputs](#WebMidi+inputs) array. Even though they sometimes look like integers, IDs are strings. |


* * *

<a name="WebMidi+getInputByName"></a>

## webMidi.getInputByName(name) ⇒ [<code>Input</code>](#Input) \| <code>false</code>
Returns the first [Input](#Input) object whose name **contains** the specified string. Note that
the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Returns**: [<code>Input</code>](#Input) \| <code>false</code> - The [Input](#Input) that was found or `false` if no input contained the
specified name.  
**Throws**:

- <code>Error</code> WebMidi is not enabled.

**Since**: 2.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The non-empty string to look for within the name of MIDI inputs (such as those visible in the [inputs](#WebMidi+inputs) array). |


* * *

<a name="WebMidi+getOutputByName"></a>

## webMidi.getOutputByName(name) ⇒ [<code>Output</code>](#Output) \| <code>false</code>
Returns the first [Output](#Output) object whose name **contains** the specified string. Note that
the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Returns**: [<code>Output</code>](#Output) \| <code>false</code> - The [Output](#Output) that was found or `false` if no output matched the
specified name.  
**Throws**:

- Error WebMidi is not enabled.

**Since**: 2.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The non-empty string to look for within the name of MIDI inputs (such as those visible in the [outputs](#WebMidi+outputs) array). |


* * *

<a name="WebMidi+getOutputById"></a>

## webMidi.getOutputById(id) ⇒ [<code>Output</code>](#Output) \| <code>false</code>
Returns the [Output](#Output) object that matches the specified ID string or `false` if no
matching output is found. As per the Web MIDI API specification, IDs are strings (not
integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Returns**: [<code>Output</code>](#Output) \| <code>false</code> - An [Output](#Output) object matching the specified ID string. If no
matching output can be found, the method returns `false`.  
**Throws**:

- Error WebMidi is not enabled.

**Since**: 2.0.0  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID string of the port. IDs can be viewed by looking at the [outputs](#WebMidi+outputs) array. |


* * *

<a name="EventEmitter+addListener"></a>

## webMidi.addListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a listener for the specified event. It returns the [**Listener**](#Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>addListener</code>](#EventEmitter+addListener)  
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.remaining] | <code>boolean</code> | <code>Infinity</code> | The number of times after which the callback should automatically be removed. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+addOneTimeListener"></a>

## webMidi.addOneTimeListener(event, callback, [options]) ⇒ [<code>Listener</code>](#Listener)
Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](#Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>addOneTimeListener</code>](#EventEmitter+addOneTimeListener)  
**Returns**: [<code>Listener</code>](#Listener) - The newly created [**Listener**](#Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.

<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The context to invoke the callback function in. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](#Listener+arguments) property of the [**Listener**](#Listener) object and can be retrieved or modified as desired. |


* * *

<a name="EventEmitter+hasListener"></a>

## webMidi.hasListener([event], [callback]) ⇒ <code>boolean</code>
Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>hasListener</code>](#EventEmitter+hasListener)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| [event] | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to check |
| [callback] | <code>function</code> \| [<code>Listener</code>](#Listener) | The actual function that was added to the event or the [Listener](#Listener) object returned by `addListener()`. |


* * *

<a name="EventEmitter+getListeners"></a>

## webMidi.getListeners(event) ⇒ [<code>Array.&lt;Listener&gt;</code>](#Listener)
Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>getListeners</code>](#EventEmitter+getListeners)  
**Returns**: [<code>Array.&lt;Listener&gt;</code>](#Listener) - An array of `Listener` objects  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event to get listeners for |


* * *

<a name="EventEmitter+suspendEvent"></a>

## webMidi.suspendEvent(event)
Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>suspendEvent</code>](#EventEmitter+suspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to suspend execution of all callback functions. |


* * *

<a name="EventEmitter+unsuspendEvent"></a>

## webMidi.unsuspendEvent(event)
Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>unsuspendEvent</code>](#EventEmitter+unsuspendEvent)  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event for which to resume execution of all callback functions. |


* * *

<a name="EventEmitter+getListenerCount"></a>

## webMidi.getListenerCount(event) ⇒ <code>number</code>
Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>getListenerCount</code>](#EventEmitter+getListenerCount)  
**Returns**: <code>number</code> - The number of listeners registered for the specified event.  
<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) | The event |


* * *

<a name="EventEmitter+emit"></a>

## webMidi.emit(event, ...args) ⇒ <code>Array</code>
Executes the callback functions of all the `Listener` objects registered for a given event. The
callback functions are passed the additional arguments specifed for `emit()` (if any) followed
by the arguments present in the `arguments` property of the `Listener` object (if any). For
example:

```javascript
let myEmitter = new EventEmitter();
myEmitter.addListener("test", fn, {arguments: ["a", "b", "c"]});
myEmitter.emit("test", "y", "z");
```

In this example, the function will be called as such: `fn("y", "z", "a", "b", "c");`

If the `eventsSuspended` property of the `EventEmitter` or the `suspended` property of the
`Listener` is `true`, the callback functions will not be executed.

This function returns an array containing the return values of each of the callbacks.

It should be noted that the regular listeners are triggered first followed by the global
listeners (added with `EventEmitter.ANY_EVENT`).

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>emit</code>](#EventEmitter+emit)  
**Returns**: <code>Array</code> - An array containing the return value of each of the executed listener
functions  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string.

<!---->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event |
| ...args | <code>\*</code> | Arbitrary number of arguments to pass along to the callback functions |


* * *

<a name="EventEmitter+removeListener"></a>

## webMidi.removeListener([event], [callback], [options])
Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>removeListener</code>](#EventEmitter+removeListener)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [event] | <code>string</code> |  | The event name. |
| [callback] | [<code>callback</code>](#EventEmitter..callback) |  | Only remove the listeners that match this exact callback function. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>\*</code> |  | Only remove the listeners that have this exact context. |
| [options.remaining] | <code>number</code> |  | Only remove the listener if it has exactly that many remaining times to be executed. |


* * *

<a name="EventEmitter+waitFor"></a>

## webMidi.waitFor(event, [options])
The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
when the specified event occurs. The event can be a regular event or `EventEmitter.ANY_EVENT`
(if you want to resolve as soon as any event is emitted).

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready").then(() => console.log("Ready!"));
```

```javascript
// async/await syntax
const ee = new EventEmitter();
await ee.waitFor("ready");
console.log("Ready!");
```

If the `duration` option is set, the promise will only be fulfilled if the event is emitted
within the specified duration. If the event has not been fulfilled after the specified
duration, the promise is rejected. This makes it super easy to wait for an event and timeout
after a certain time if the event is not triggered.

```javascript
// then/catch syntax
const ee = new EventEmitter();
ee.waitFor("ready", {duration: 100})
.then(() => console.log("Ready!"))
.catch(err => console.log(err);
```

```javascript
// async/await syntax
const ee = new EventEmitter();
try {
 await ee.waitFor("ready", {duration: 100});
 console.log("Ready!");
} catch(err) {
  console.log(err);
}
```

<!--**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
-->
**Overrides**: [<code>waitFor</code>](#EventEmitter+waitFor)  
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| [<code>ANY\_EVENT</code>](#EventEmitter.ANY_EVENT) |  | The event to wait for |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds to wait before the promise is automatically rejected. |


* * *

<a name="WebMidi+event_error"></a>

## "error"
Event emitted when an error occurs trying to enable `WebMidi`

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| target | [<code>WebMidi</code>](#WebMidi) | The object that triggered the event |
| type | <code>string</code> | `error` |
| error | <code>\*</code> | Actual error that occurred |


* * *

<a name="WebMidi+event_midiaccessgranted"></a>

## "midiaccessgranted"
Event emitted once the MIDI interface has been successfully created.

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| target | [<code>WebMidi</code>](#WebMidi) | The object that triggered the event |
| type | <code>string</code> | `midiaccessgranted` |


* * *

<a name="WebMidi+event_enabled"></a>

## "enabled"
Event emitted once `WebMidi` has been fully enabled

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| target | [<code>WebMidi</code>](#WebMidi) | The object that triggered the event |
| type | <code>string</code> | `enabled` |


* * *

<a name="WebMidi+event_disabled"></a>

## "disabled"
Event emitted once `WebMidi` has been successfully disabled.

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| target | [<code>WebMidi</code>](#WebMidi) | The object that triggered the event |
| type | <code>string</code> | `disabled` |


* * *

<a name="WebMidi+event_connected"></a>

## "connected"
Event emitted when an [Input](#Input) or [Output](#Output) becomes available. This event is
typically fired whenever a MIDI device is plugged in. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `connected` |
| target | [<code>Input</code>](#Input) \| [<code>Output</code>](#Output) | The [Input](#Input) or [Output](#Output) object that triggered the event. |


* * *

<a name="WebMidi+event_disconnected"></a>

## "disconnected"
Event emitted when an [Input](#Input) or [Output](#Output) becomes unavailable. This event is
typically fired whenever a MIDI device is unplugged. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).

<!--**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
-->
<!---->
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `disconnected` |
| target | <code>Object</code> | Object with properties describing the [Input](#Input) or {@Output} that triggered the event. |
| target.connection | <code>string</code> | `"closed"` |
| target.id | <code>string</code> | ID of the input |
| target.manufacturer | <code>string</code> | Manufacturer of the device that provided the input |
| target.name | <code>string</code> | Name of the device that provided the input |
| target.state | <code>string</code> | `disconnected` |
| target.type | <code>string</code> | `input` or `output` |


* * *

