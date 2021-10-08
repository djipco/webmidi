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

    * [.target](#Listener+target) : <code>EventEmitter</code>

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
| event | <code>string</code> \| <code>EventEmitter.ANY\_EVENT</code> |  | The event being listened to |
| target | <code>EventEmitter</code> |  | The `EventEmitter` object that the listener is attached to |
| callback | <code>EventEmitter~callback</code> |  | The function to call when the listener is triggered |
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

## listener.target : <code>EventEmitter</code>
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

