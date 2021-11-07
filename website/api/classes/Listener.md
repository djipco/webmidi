
# Listener

The `Listener` class represents a single event listener object. Such objects keep all relevant
contextual information such as the event being listened to, the object the listener was attached
to, the callback function and so on.




### `Constructor`


  **Parameters**

  > `new Listener(event, target, callback, [options])`

  <div class="parameter-table-container">

  | Parameter    | Type         | Default      | Description  |
  | ------------ | ------------ | ------------ | ------------ |
    |**`event`** | string<br />EventEmitter.ANY_EVENT<br /> ||The event being listened to|
    |**`target`** | EventEmitter<br /> ||The `EventEmitter` object that the listener is attached to|
    |**`callback`** | EventEmitter~callback<br /> ||The function to call when the listener is triggered|
    |[**`options`**] | Object<br /> |{}||
    |[**`options.context`**] | Object<br /> |target|The context to invoke the listener in (a.k.a. the value of `this` inside the callback function).|
    |[**`options.remaining`**] | number<br /> |Infinity|The remaining number of times after which the callback should automatically be removed.|
    |[**`options.arguments`**] | array<br /> ||An array of arguments that will be passed separately to the callback function upon execution. The array is stored in the `arguments` property and can be retrieved or modified as desired.|

  </div>


**Throws**:
* `TypeError` : The &#x60;event&#x60; parameter must be a string or
[&#x60;EventEmitter.ANY_EVENT&#x60;](EventEmitter#ANY_EVENT).
* `ReferenceError` : The &#x60;target&#x60; parameter is mandatory.
* `TypeError` : The &#x60;callback&#x60; must be a function.

***

## Properties

### `.arguments` {#arguments}
**Type**: array<br />


Arguments to pass separately to the callback function upon execution


### `.callback` {#callback}
**Type**: function<br />


The callback function


### `.context` {#context}
**Type**: Object<br />


The context to execute the context function in (a.k.a. the value of `this` inside the
callback function)


### `.count` {#count}
**Type**: number<br />


The number of times the listener function was executed


### `.event` {#event}
**Type**: string<br />


The event name


### `.remaining` {#remaining}
**Type**: number<br />


The remaining number of times after which the callback should automatically be removed.


### `.suspended` {#suspended}
**Type**: boolean<br />


Whether this listener is currently suspended


### `.target` {#target}
**Type**: EventEmitter<br />


The object that the event is attached to (or that emitted the event)



***

## Methods


### `.remove()` {#remove}


Removes the listener from its target.






