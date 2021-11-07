
# EventEmitter

The `EventEmitter` class provides methods to implement the _observable_ design pattern. This
pattern allows one to _register_ a function to execute when a specific event is _emitted_ by the
emitter.

It is a mostly abstract class meant to be extended by (or mixed into) other objects.




### `Constructor`


  **Parameters**

  > `new EventEmitter([eventsSuspended])`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`eventsSuspended`**] | boolean<br /> |false|Whether the `EventEmitter` is initially in a suspended state (i.e. not executing callbacks).|

  </div>



***

## Properties

### `.ANY_EVENT` {#ANY_EVENT}
**Type**: Symbol<br />


Identifier to use when trying to add or remove a listener that should be triggered when any
events occur.


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

Note: this excludes global events registered with `EventEmitter.ANY_EVENT` because they are not
tied to a specific event.


### `.eventsSuspended` {#eventsSuspended}
**Type**: boolean<br />


Whether or not the execution of function callbacks is currently suspended for this whole
emitter



***

## Methods


### `.addListener(...)` {#addListener}


Adds a listener for the specified event. It returns the [`Listener`](Listener) object
that was created and attached to the event.

To attach a global listener that will be triggered for any events, use
[`EventEmitter.ANY_EVENT`](#ANY_EVENT) as the first parameter. Note that a global listener will
also be triggered by non-registered events.


  **Parameters**

  > Signature: `addListener(event, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to listen to|
    |**`callback`** | EventEmitter~callback<br /> ||The callback function to execute when the event occurs.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |this|The value of `this` in the callback function.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.remaining`**] | boolean<br /> |Infinity|The number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [`arguments`]{@link Listener#arguments} property of the [`Listener`]{@link Listener} object and can be retrieved or modified as desired.|

  </div>


**Return Value**

> Returns: `Listener`<br />

The newly created [`Listener`](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.addOneTimeListener(...)` {#addOneTimeListener}


Adds a one-time listener for the specified event. The listener will be executed once and then
destroyed. It returns the [`Listener`](Listener) object that was created and attached
to the event.

To attach a global listener that will be triggered for any events, use
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) as the first parameter. Note that a global
listener will also be triggered by non-registered events.


  **Parameters**

  > Signature: `addOneTimeListener(event, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to listen to|
    |**`callback`** | EventEmitter~callback<br /> ||The callback function to execute when the event occurs|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |this|The context to invoke the callback function in.|
    |[**`options.prepend`**] | boolean<br /> |false|Whether the listener should be added at the beginning of the listeners array|
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds before the listener automatically expires.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments which will be passed separately to the callback function. This array is stored in the [`arguments`]{@link Listener#arguments} property of the [`Listener`]{@link Listener} object and can be retrieved or modified as desired.|

  </div>


**Return Value**

> Returns: `Listener`<br />

The newly created [**Listener**](Listener) object.


**Throws**:
  * `TypeError` : The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
  * `TypeError` : The `callback` parameter must be a function.


### `.emit(...)` {#emit}


Executes the callback function of all the [`Listener`](Listener) objects registered for
a given event. The callback functions are passed the additional arguments passed to `emit()`
(if any) followed by the arguments present in the [`arguments`](Listener#arguments) property of
the [`Listener`](Listener) object (if any).

If the [`eventsSuspended`](#eventsSuspended) property or the
[`suspended`](Listener#suspended) property of the [`Listener`](Listener) is `true`,
the callback functions will not be executed.

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
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event which is usually a string but can also be the special [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} symbol.|

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
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to get listeners for|

  </div>


**Return Value**

> Returns: `Array.<Listener>`<br />

An array of [`Listener`](Listener) objects




### `.hasListener(...)` {#hasListener}


Returns `true` if the specified event has at least one registered listener. If no event is
specified, the method returns `true` if any event has at least one listener registered (this
includes global listeners registered to [`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT)).

Note: to specifically check for global listeners added with `EventEmitter.ANY_EVENT`, use
`EventEmitter.ANY_EVENT` as the parameter.


  **Parameters**

  > Signature: `hasListener([event], [callback])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] | string<br />EventEmitter.ANY_EVENT<br /> ||The event to check|
    |[**`callback`**] | function<br />Listener<br /> ||The actual function that was added to the event or the {@link Listener} object returned by `addListener()`.|

  </div>


**Return Value**

> Returns: `boolean`<br />




### `.removeListener(...)` {#removeListener}


Removes all the listeners that match the specified criterias. If no parameters are passed, all
listeners will be removed. If only the `event` parameter is passed, all listeners for that
event will be removed. You can remove global listeners by using `EventEmitter.ANY_EVENT` as the
first parameter.

To use more granular options, you must at least define the `event`. Then, you can specify the
callback to match or one or more of the additional options.


  **Parameters**

  > Signature: `removeListener([event], [callback], [options])`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |[**`event`**] | string<br /> ||The event name.|
    |[**`callback`**] | EventEmitter~callback<br /> ||Only remove the listeners that match this exact callback function.|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | *<br /> ||Only remove the listeners that have this exact context.|
    |[**`options.remaining`**] | number<br /> ||Only remove the listener if it has exactly that many remaining times to be executed.|

  </div>






### `.suspendEvent(...)` {#suspendEvent}


Suspends execution of all callbacks functions registered for the specified event type.

You can suspend execution of callbacks registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) by passing
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) to `suspendEvent()`. Beware that this
will not suspend all callbacks but only those registered with `EventEmitter.ANY_EVENT`. While
this may seem counter-intuitive at first glance, it allows the selective suspension of global
listeners while leaving other liseners alone. If you truly want to suspends all callbacks for a
specific [`EventEmitter`](EventEmitter), simply set its `eventsSuspended` property to
`true`.


  **Parameters**

  > Signature: `suspendEvent(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event for which to suspend execution of all callback functions.|

  </div>






### `.unsuspendEvent(...)` {#unsuspendEvent}


Resumes execution of all suspended callback functions registered for the specified event type.

You can resume execution of callbacks registered with
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) by passing
[`EventEmitter.ANY_EVENT`](EventEmitter#ANY_EVENT) to `unsuspendEvent()`. Beware that
this will not resume all callbacks but only those registered with `EventEmitter.ANY_EVENT`.
While this may seem counter-intuitive,it allows the selective unsuspension of global listeners
while leaving other callbacks alone.


  **Parameters**

  > Signature: `unsuspendEvent(event)`

  <div class="parameter-table-container">

  | Parameter    | Type(s)      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event for which to resume execution of all callback functions.|

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
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event to wait for|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.duration`**] | number<br /> |Infinity|The number of milliseconds to wait before the promise is automatically rejected.|

  </div>






