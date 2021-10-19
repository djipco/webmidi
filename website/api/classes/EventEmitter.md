
# EventEmitter

The `EventEmitter` class provides methods to implement the _observable_ design pattern. This
pattern allows one to _register_ a function to execute when a specific event is _emitted_ by the
emitter.

It is a mostly abstract class meant to be extended by (or mixed into) other objects.




### `new EventEmitter(...)` {#constructor}


  **Parameters**

  > `new EventEmitter([eventsSuspended])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`eventsSuspended`**] |boolean|false|Whether the `EventEmitter` is initially in a suspended state (i.e. not executing callbacks).|



***

## Properties

### `.ANY_EVENT` {#ANY_EVENT}


Identifier to use when trying to add or remove a listener that should be triggered when any
events occur.

**Type**: Symbol<br />
  **Attributes**: static


### `.eventCount` {#eventCount}


The number of unique events that have registered listeners

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: number<br />
**Attributes**: read-only<br />


### `.eventMap` {#eventMap}


An object containing a property for each event with at least one registered listener. Each
event property contains an array of all the `Listener` objects registered for the event.

**Type**: Object<br />
**Attributes**: read-only<br />


### `.eventNames` {#eventNames}


An array of all the unique event names for which the emitter has at least one registered
listener.

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.

**Type**: Array.&lt;string&gt;<br />
**Attributes**: read-only<br />


### `.eventsSuspended` {#eventsSuspended}


Whether or not the execution of function callbacks is currently suspended for this whole
emitter

**Type**: boolean<br />



***

## Methods


### `.addListener(...)` {#addListener}


Adds a listener for the specified event. It returns the [**Listener**](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The value of `this` in the callback function.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] |boolean|Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)` {#addOneTimeListener}


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [**Listener**](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use `EventEmitter.ANY_EVENT`
as the first parameter. Note that a global listener will also be triggered by non-registered
events. For example, this will trigger global listeners: `myEmitter.emit('bogus')`.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to listen to|
    |**`callback`** |EventEmitter~callback||The callback function to execute when the event occurs|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|this|The context to invoke the callback function in.|
    |[**`options.prepend`**] |boolean|false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] |number|Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] |array||An array of arguments which will be passed separately to the callback function. This array is stored in the [**arguments**](Listener#arguments) property of the [**Listener**](Listener) object and can be retrieved or modified as desired.|


**Returns**: `Listener`
> The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.emit(...)` {#emit}


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


  **Parameters**

  > Signature: `emit(event, ...args)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|
    |**`args`** |*||Arbitrary number of arguments to pass along to the callback functions|


**Returns**: `Array`
> An array containing the return value of each of the executed listener
functions


**Throws**:
  * `TypeError` : The `event` parameter must be a string.


### `.getListenerCount(...)` {#getListenerCount}


Returns the number of listeners registered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) do not count
towards the remaining number for a "regular" event. To get the number of global listeners,
specifically use `EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListenerCount(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event|


**Returns**: `number`
> The number of listeners registered for the specified event.




### `.getListeners(...)` {#getListeners}


Returns an array of all the `Listener` objects that will be triggered for a specific event.

Please note that global events (those added with `EventEmitter.ANY_EVENT`) are not returned for
"regular" events. To get the list of global listeners, specifically use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `getListeners(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to get listeners for|


**Returns**: `Array.<Listener>`
> An array of `Listener` objects




### `.hasListener(...)` {#hasListener}


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to `EventEmitter.ANY_EVENT`).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event to check|
    |[**`callback`**] |function||The actual function that was added to the event or the [Listener](Listener) object returned by `addListener()`.|


**Returns**: `boolean`



### `.removeListener(...)` {#removeListener}


Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.


  **Parameters**

  > Signature: `removeListener([event], [callback], [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] |string||The event name.|
    |[**`callback`**] |EventEmitter~callback||Only remove the listeners that match this exact callback function.|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |*||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] |number||Only remove the listener if it has exactly that many remaining times to be executed.|






### `.suspendEvent(...)` {#suspendEvent}


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `suspendEvent()`. Beware that this will not suspend all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive
at first glance, it allows the selective suspension of global listeners while leaving other
liseners alone. If you truly want to suspends all callbacks for a specific `EventEmitter`,
simply set its `eventsSuspended` property to `true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to suspend execution of all callback functions.|






### `.unsuspendEvent(...)` {#unsuspendEvent}


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with `EventEmitter.ANY_EVENT` by passing
`EventEmitter.ANY_EVENT` to `unsuspendEvent()`. Beware that this will not resume all callbacks
but only those registered with `EventEmitter.ANY_EVENT`. While this may seem counter-intuitive,
it allows the selective unsuspension of global listeners while leaving other callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event for which to resume execution of all callback functions.|






### `.waitFor(...)` {#waitFor}

**Attributes**: async

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


  **Parameters**

  > Signature: `waitFor(event, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event to wait for|
    |[**`options`**] |Object|{}||
    |[**`options.duration`**] |number|Infinity|The number of milliseconds to wait before the promise is automatically rejected.|






