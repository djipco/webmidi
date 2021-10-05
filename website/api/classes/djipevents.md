<a name="module_djipevents"></a>

# djipevents
djipevents

<!---->


* [djipevents](#module_djipevents)

    * [~EventEmitter](#module_djipevents..EventEmitter)

        * [new EventEmitter([eventsSuspended])](#new_module_djipevents..EventEmitter_new)

        * _instance_

            * [.eventMap](#module_djipevents..EventEmitter+eventMap) : <code>Object</code>

            * [.eventsSuspended](#module_djipevents..EventEmitter+eventsSuspended) : <code>boolean</code>

            * [.eventNames](#module_djipevents..EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

            * [.eventCount](#module_djipevents..EventEmitter+eventCount) : <code>number</code>

            * [.addListener(event, callback, [options])](#module_djipevents..EventEmitter+addListener) ⇒ <code>Listener</code>

            * [.addOneTimeListener(event, callback, [options])](#module_djipevents..EventEmitter+addOneTimeListener) ⇒ <code>Listener</code>

            * [.hasListener([event], [callback])](#module_djipevents..EventEmitter+hasListener) ⇒ <code>boolean</code>

            * [.getListeners(event)](#module_djipevents..EventEmitter+getListeners) ⇒ <code>Array.&lt;Listener&gt;</code>

            * [.suspendEvent(event)](#module_djipevents..EventEmitter+suspendEvent)

            * [.unsuspendEvent(event)](#module_djipevents..EventEmitter+unsuspendEvent)

            * [.getListenerCount(event)](#module_djipevents..EventEmitter+getListenerCount) ⇒ <code>number</code>

            * [.emit(event, ...args)](#module_djipevents..EventEmitter+emit) ⇒ <code>Array</code>

            * [.removeListener([event], [callback], [options])](#module_djipevents..EventEmitter+removeListener)

            * [.waitFor(event, [options])](#module_djipevents..EventEmitter+waitFor)

        * _static_

            * [.ANY_EVENT](#module_djipevents..EventEmitter.ANY_EVENT) : <code>Symbol</code>

    * [~Listener](#module_djipevents..Listener)

        * [new Listener(event, target, callback, [options])](#new_module_djipevents..Listener_new)

        * [.event](#module_djipevents..Listener+event) : <code>string</code>

        * [.target](#module_djipevents..Listener+target) : <code>EventEmitter</code>

        * [.callback](#module_djipevents..Listener+callback) : <code>function</code>

        * [.context](#module_djipevents..Listener+context) : <code>Object</code>

        * [.remaining](#module_djipevents..Listener+remaining) : <code>number</code>

        * [.count](#module_djipevents..Listener+count) : <code>number</code>

        * [.arguments](#module_djipevents..Listener+arguments) : <code>array</code>

        * [.suspended](#module_djipevents..Listener+suspended) : <code>boolean</code>

        * [.remove()](#module_djipevents..Listener+remove)


* * *

<a name="module_djipevents..EventEmitter"></a>

## djipevents~EventEmitter
The `EventEmitter` class provides methods to implement the _observable_ design pattern. This
pattern allows one to _register_ a function to execute when a specific event is _emitted_ by the
emitter.

It is a mostly abstract class meant to be extended by (or mixed into) other objects.

<!--**Kind**: inner class of [<code>djipevents</code>](#module_djipevents)  
-->


* [~EventEmitter](#module_djipevents..EventEmitter)

    * [new EventEmitter([eventsSuspended])](#new_module_djipevents..EventEmitter_new)

    * _instance_

        * [.eventMap](#module_djipevents..EventEmitter+eventMap) : <code>Object</code>

        * [.eventsSuspended](#module_djipevents..EventEmitter+eventsSuspended) : <code>boolean</code>

        * [.eventNames](#module_djipevents..EventEmitter+eventNames) : <code>Array.&lt;string&gt;</code>

        * [.eventCount](#module_djipevents..EventEmitter+eventCount) : <code>number</code>

        * [.addListener(event, callback, [options])](#module_djipevents..EventEmitter+addListener) ⇒ <code>Listener</code>

        * [.addOneTimeListener(event, callback, [options])](#module_djipevents..EventEmitter+addOneTimeListener) ⇒ <code>Listener</code>

        * [.hasListener([event], [callback])](#module_djipevents..EventEmitter+hasListener) ⇒ <code>boolean</code>

        * [.getListeners(event)](#module_djipevents..EventEmitter+getListeners) ⇒ <code>Array.&lt;Listener&gt;</code>

        * [.suspendEvent(event)](#module_djipevents..EventEmitter+suspendEvent)

        * [.unsuspendEvent(event)](#module_djipevents..EventEmitter+unsuspendEvent)

        * [.getListenerCount(event)](#module_djipevents..EventEmitter+getListenerCount) ⇒ <code>number</code>

        * [.emit(event, ...args)](#module_djipevents..EventEmitter+emit) ⇒ <code>Array</code>

        * [.removeListener([event], [callback], [options])](#module_djipevents..EventEmitter+removeListener)

        * [.waitFor(event, [options])](#module_djipevents..EventEmitter+waitFor)

    * _static_

        * [.ANY_EVENT](#module_djipevents..EventEmitter.ANY_EVENT) : <code>Symbol</code>


* * *

<a name="new_module_djipevents..EventEmitter_new"></a>

### new EventEmitter([eventsSuspended])
<!---->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [eventsSuspended] | <code>boolean</code> | <code>false</code> | Whether the `EventEmitter` is initially in a suspended state (i.e. not executing callbacks). |


* * *

<a name="module_djipevents..EventEmitter+eventMap"></a>

### eventEmitter.eventMap : <code>Object</code>
An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

<!--**Kind**: instance property of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->
**Read only**: true  

* * *

<a name="module_djipevents..EventEmitter+eventsSuspended"></a>

### eventEmitter.eventsSuspended : <code>boolean</code>
Whether or not the execution of function callbacks is currently suspended for this whole
emitter

<!--**Kind**: instance property of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->

* * *

<a name="module_djipevents..EventEmitter+eventNames"></a>

### eventEmitter.eventNames : <code>Array.&lt;string&gt;</code>
An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->
**Read only**: true  

* * *

<a name="module_djipevents..EventEmitter+eventCount"></a>

### eventEmitter.eventCount : <code>number</code>
The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

<!--**Kind**: instance property of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->
**Read only**: true  

* * *

<a name="module_djipevents..EventEmitter+addListener"></a>

### eventEmitter.addListener(event, callback, [options]) ⇒ <code>Listener</code>
Adds a listener for the specified event. It returns the [**Listener**](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->
**Returns**: <code>Listener</code> - The newly created [**Listener**](Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| <code>EventEmitter.ANY\_EVENT</code> |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The value of `this` in the callback function. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.remaining] | <code>boolean</code> | <code>Infinity</code> | The number of times after which the callback should automatically be removed. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired. |


* * *

<a name="module_djipevents..EventEmitter+addOneTimeListener"></a>

### eventEmitter.addOneTimeListener(event, callback, [options]) ⇒ <code>Listener</code>
Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->
**Returns**: <code>Listener</code> - The newly created [**Listener**](Listener) object.  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>TypeError</code> The `callback` parameter must be a function.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| <code>EventEmitter.ANY\_EVENT</code> |  | The event to listen to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The callback function to execute when the event occurs |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>this</code> | The context to invoke the callback function in. |
| [options.prepend] | <code>boolean</code> | <code>false</code> | Whether the listener should be added at the beginning of the listeners array |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the listener automatically expires. |
| [options.arguments] | <code>array</code> |  | An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired. |


* * *

<a name="module_djipevents..EventEmitter+hasListener"></a>

### eventEmitter.hasListener([event], [callback]) ⇒ <code>boolean</code>
Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->

| Param | Type | Description |
| --- | --- | --- |
| [event] | <code>string</code> \| <code>EventEmitter.ANY\_EVENT</code> | The event to check |
| [callback] | <code>function</code> \| <code>Listener</code> | The actual function that was added to the event or the [Listener](Listener) object returned by `addListener()`. |


* * *

<a name="module_djipevents..EventEmitter+getListeners"></a>

### eventEmitter.getListeners(event) ⇒ <code>Array.&lt;Listener&gt;</code>
Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->
**Returns**: <code>Array.&lt;Listener&gt;</code> - An array of `Listener` objects  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| <code>EventEmitter.ANY\_EVENT</code> | The event to get listeners for |


* * *

<a name="module_djipevents..EventEmitter+suspendEvent"></a>

### eventEmitter.suspendEvent(event)
Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| <code>EventEmitter.ANY\_EVENT</code> | The event for which to suspend execution of all callback functions. |


* * *

<a name="module_djipevents..EventEmitter+unsuspendEvent"></a>

### eventEmitter.unsuspendEvent(event)
Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| <code>EventEmitter.ANY\_EVENT</code> | The event for which to resume execution of all callback functions. |


* * *

<a name="module_djipevents..EventEmitter+getListenerCount"></a>

### eventEmitter.getListenerCount(event) ⇒ <code>number</code>
Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->
**Returns**: <code>number</code> - The number of listeners registered for the specified event.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| <code>EventEmitter.ANY\_EVENT</code> | The event |


* * *

<a name="module_djipevents..EventEmitter+emit"></a>

### eventEmitter.emit(event, ...args) ⇒ <code>Array</code>
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

<!--**Kind**: instance method of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->
**Returns**: <code>Array</code> - An array containing the return value of each of the executed listener
functions  
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string.


| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event |
| ...args | <code>\*</code> | Arbitrary number of arguments to pass along to the callback functions |


* * *

<a name="module_djipevents..EventEmitter+removeListener"></a>

### eventEmitter.removeListener([event], [callback], [options])
Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.

<!--**Kind**: instance method of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [event] | <code>string</code> |  | The event name. |
| [callback] | [<code>callback</code>](#EventEmitter..callback) |  | Only remove the listeners that match this exact callback function. |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>\*</code> |  | Only remove the listeners that have this exact context. |
| [options.remaining] | <code>number</code> |  | Only remove the listener if it has exactly that many remaining times to be executed. |


* * *

<a name="module_djipevents..EventEmitter+waitFor"></a>

### eventEmitter.waitFor(event, [options])
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

<!--**Kind**: instance method of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| <code>EventEmitter.ANY\_EVENT</code> |  | The event to wait for |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds to wait before the promise is automatically rejected. |


* * *

<a name="module_djipevents..EventEmitter.ANY_EVENT"></a>

### EventEmitter.ANY\_EVENT : <code>Symbol</code>
Identifier to use when trying to add or remove a listener that should be triggered when any
events occur.

<!--**Kind**: static property of [<code>EventEmitter</code>](#module_djipevents..EventEmitter)  
-->

* * *

<a name="module_djipevents..Listener"></a>

## djipevents~Listener
The `Listener` class represents a single event listener object. Such objects keep all relevant
contextual information such as the event being listened to, the object the listener was attached
to, the callback function and so on.

<!--**Kind**: inner class of [<code>djipevents</code>](#module_djipevents)  
-->


* [~Listener](#module_djipevents..Listener)

    * [new Listener(event, target, callback, [options])](#new_module_djipevents..Listener_new)

    * [.event](#module_djipevents..Listener+event) : <code>string</code>

    * [.target](#module_djipevents..Listener+target) : <code>EventEmitter</code>

    * [.callback](#module_djipevents..Listener+callback) : <code>function</code>

    * [.context](#module_djipevents..Listener+context) : <code>Object</code>

    * [.remaining](#module_djipevents..Listener+remaining) : <code>number</code>

    * [.count](#module_djipevents..Listener+count) : <code>number</code>

    * [.arguments](#module_djipevents..Listener+arguments) : <code>array</code>

    * [.suspended](#module_djipevents..Listener+suspended) : <code>boolean</code>

    * [.remove()](#module_djipevents..Listener+remove)


* * *

<a name="new_module_djipevents..Listener_new"></a>

### new Listener(event, target, callback, [options])
<!---->
**Throws**:

- <code>TypeError</code> The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
- <code>ReferenceError</code> The `target` parameter is mandatory.
- <code>TypeError</code> The `callback` must be a function.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| <code>EventEmitter.ANY\_EVENT</code> |  | The event being listened to |
| target | <code>EventEmitter</code> |  | The `EventEmitter` object that the listener is attached to |
| callback | [<code>callback</code>](#EventEmitter..callback) |  | The function to call when the listener is triggered |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.context] | <code>Object</code> | <code>target</code> | The context to invoke the listener in (a.k.a. the value of `this` inside the callback function). |
| [options.remaining] | <code>number</code> | <code>Infinity</code> | The remaining number of times after which the callback should automatically be removed. |
| [options.arguments] | <code>array</code> |  | An array of arguments that will be passed separately to the callback function upon execution. The array is stored in the `arguments` property and can be retrieved or modified as desired. |


* * *

<a name="module_djipevents..Listener+event"></a>

### listener.event : <code>string</code>
The event name

<!--**Kind**: instance property of [<code>Listener</code>](#module_djipevents..Listener)  
-->

* * *

<a name="module_djipevents..Listener+target"></a>

### listener.target : <code>EventEmitter</code>
The object that the event is attached to (or that emitted the event)

<!--**Kind**: instance property of [<code>Listener</code>](#module_djipevents..Listener)  
-->

* * *

<a name="module_djipevents..Listener+callback"></a>

### listener.callback : <code>function</code>
The callback function

<!--**Kind**: instance property of [<code>Listener</code>](#module_djipevents..Listener)  
-->

* * *

<a name="module_djipevents..Listener+context"></a>

### listener.context : <code>Object</code>
The context to execute the context function in (a.k.a. the value of `this` inside the
callback function)

<!--**Kind**: instance property of [<code>Listener</code>](#module_djipevents..Listener)  
-->

* * *

<a name="module_djipevents..Listener+remaining"></a>

### listener.remaining : <code>number</code>
The remaining number of times after which the callback should automatically be removed.

<!--**Kind**: instance property of [<code>Listener</code>](#module_djipevents..Listener)  
-->

* * *

<a name="module_djipevents..Listener+count"></a>

### listener.count : <code>number</code>
The number of times the listener function was executed

<!--**Kind**: instance property of [<code>Listener</code>](#module_djipevents..Listener)  
-->

* * *

<a name="module_djipevents..Listener+arguments"></a>

### listener.arguments : <code>array</code>
Arguments to pass separately to the callback function upon execution

<!--**Kind**: instance property of [<code>Listener</code>](#module_djipevents..Listener)  
-->

* * *

<a name="module_djipevents..Listener+suspended"></a>

### listener.suspended : <code>boolean</code>
Whether this listener is currently suspended

<!--**Kind**: instance property of [<code>Listener</code>](#module_djipevents..Listener)  
-->

* * *

<a name="module_djipevents..Listener+remove"></a>

### listener.remove()
Removes the listener from its target.

<!--**Kind**: instance method of [<code>Listener</code>](#module_djipevents..Listener)  
-->

* * *

