import {EventEmitter} from "./EventEmitter.js";

/**
 * The `Listener` class represents a single event listener object. Such objects keep all relevant
 * contextual information such as the event being listened to, the object the listener was attached
 * to, the callback function and so on.
 *
 * @param {string|EventEmitter.ANY_EVENT} event The event being listened to
 * @param {EventEmitter} target The `EventEmitter` object that the listener is attached to
 * @param {EventEmitter~callback} callback The function to call when the listener is triggered
 * @param {Object} [options={}]
 * @param {Object} [options.context=target] The context to invoke the listener in (a.k.a. the
 * value of `this` inside the callback function).
 * @param {number} [options.remaining=Infinity] The remaining number of times after which the
 * callback should automatically be removed.
 * @param {array} [options.arguments] An array of arguments that will be passed separately to the
 * callback function upon execution. The array is stored in the `arguments` property and can be
 * retrieved or modified as desired.
 *
 * @throws {TypeError} The `event` parameter must be a string or `EventEmitter.ANY_EVENT`.
 * @throws {ReferenceError} The `target` parameter is mandatory.
 * @throws {TypeError} The `callback` must be a function.
 */
export class Listener {

  constructor(event, target, callback, options = {}) {

    if (
      typeof event !== "string" &&
      !(event instanceof String) &&
      event !== EventEmitter.ANY_EVENT
    ) {
      throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");
    }

    if (!target) {
      throw new ReferenceError("The 'target' parameter is mandatory.");
    }

    if (typeof callback !== "function") {
      throw new TypeError("The 'callback' must be a function.");
    }

    // Convert single value argument to array
    if (options.arguments !== undefined && !Array.isArray(options.arguments)) {
      options.arguments = [options.arguments];
    }

    // Define default options and merge declared options into them,
    options = Object.assign({
      context: target,
      remaining: Infinity,
      arguments: undefined,
      duration: Infinity,
    }, options);

    // Make sure it is eventually deleted if a duration is supplied
    if (options.duration !== Infinity) {
      setTimeout(() => this.remove(), options.duration);
    }

    /**
     * The event name
     * @type {string}
     */
    this.event = event;

    /**
     * The object that the event is attached to (or that emitted the event)
     * @type {EventEmitter}
     */
    this.target = target;

    /**
     * The callback function
     * @type {Function}
     */
    this.callback = callback;

    /**
     * The context to execute the context function in (a.k.a. the value of `this` inside the
     * callback function)
     * @type {Object}
     */
    this.context = options.context;

    /**
     * The remaining number of times after which the callback should automatically be removed.
     * @type {number}
     */
    this.remaining = parseInt(options.remaining) >= 1 ? parseInt(options.remaining) : Infinity;

    /**
     * The number of times the listener function was executed
     * @type {number}
     */
    this.count = 0;

    /**
     * Arguments to pass separately to the callback function upon execution
     * @type {array}
     */
    this.arguments = options.arguments;

    /**
     * Whether this listener is currently suspended
     * @type {boolean}
     */
    this.suspended = false;

  }

  /**
   * Removes the listener from its target.
   */
  remove() {
    this.target.removeListener(
      this.event,
      this.callback,
      {context: this.context, remaining: this.remaining}
    );
  }

}
