
# Listener

The `Listener` class represents a single event listener object. Such objects keep all relevant
contextual information such as the event being listened to, the object the listener was attached
to, the callback function and so on.




### `new Listener(...)`


  **Parameters**

  > `new Listener(event, target, callback, [options])`

  | Parameter    | Type      | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** |string||The event being listened to|
    |**`target`** |EventEmitter||The `EventEmitter` object that the listener is attached to|
    |**`callback`** |EventEmitter~callback||The function to call when the listener is triggered|
    |[**`options`**] |Object|{}||
    |[**`options.context`**] |Object|target|The context to invoke the listener in (a.k.a. the value of `this` inside the callback function).|
    |[**`options.remaining`**] |number|Infinity|The remaining number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] |array||An array of arguments that will be passed separately to the callback function upon execution. The array is stored in the `arguments` property and can be retrieved or modified as desired.|


**Throws**:
* `TypeError` : The &#x60;event&#x60; parameter must be a string or &#x60;EventEmitter.ANY_EVENT&#x60;.
* `ReferenceError` : The &#x60;target&#x60; parameter is mandatory.
* `TypeError` : The &#x60;callback&#x60; must be a function.

***

## Properties

### `.arguments`


Arguments to pass separately to the callback function upon execution

**Type**: array<br />


### `.callback`


The callback function

**Type**: function<br />


### `.context`


The context to execute the context function in (a.k.a. the value of `this` inside the
callback function)

**Type**: Object<br />


### `.count`


The number of times the listener function was executed

**Type**: number<br />


### `.event`


The event name

**Type**: string<br />


### `.remaining`


The remaining number of times after which the callback should automatically be removed.

**Type**: number<br />


### `.suspended`


Whether this listener is currently suspended

**Type**: boolean<br />


### `.target`


The object that the event is attached to (or that emitted the event)

**Type**: EventEmitter<br />



***

## Methods


### `.remove()`


Removes the listener from its target.






