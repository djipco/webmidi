// Type definitions for WEBMIDI.js v3.0.14
// Project: https://webmidijs.org
// Definitions by: Jean-Philippe Côté <https://github.com/djipco/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * The `EventEmitter` class provides methods to implement the _observable_ design pattern. This
 * pattern allows one to _register_ a function to execute when a specific event is _emitted_ by the
 * emitter.
 *
 * It is intended to be an abstract class meant to be extended by (or mixed into) other objects.
 */
declare class EventEmitter {

  /**
   * Identifier (Symbol) to use when adding or removing a listener that should be triggered when any
   * events occur.
   *
   * @type {Symbol}
   */
  static get ANY_EVENT(): Symbol;

  /**
   * Creates a new `EventEmitter`object.
   *
   * @param {boolean} [eventsSuspended=false] Whether the `EventEmitter` is initially in a suspended
   * state (i.e. not executing callbacks).
   */
  constructor(eventsSuspended?: boolean);

  /**
   * An object containing a property for each event with at least one registered listener. Each
   * event property contains an array of all the [`Listener`]{@link Listener} objects registered
   * for the event.
   *
   * @type {Object}
   * @readonly
   */
  eventMap: any;

  /**
   * Whether or not the execution of callbacks is currently suspended for this emitter.
   *
   * @type {boolean}
   */
  eventsSuspended: boolean;

  /**
   * Adds a listener for the specified event. It returns the [`Listener`]{@link Listener} object
   * that was created and attached to the event.
   *
   * To attach a global listener that will be triggered for any events, use
   * [`EventEmitter.ANY_EVENT`]{@link #ANY_EVENT} as the first parameter. Note that a global
   * listener will also be triggered by non-registered events.
   *
   * @param {string|Symbol} event The event to listen to.
   * @param {EventEmitterCallback} callback The callback function to execute when the event occurs.
   * @param {Object} [options={}]
   * @param {Object} [options.context=this] The value of `this` in the callback function.
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array and thus executed first.
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   * @param {number} [options.remaining=Infinity] The number of times after which the callback
   * should automatically be removed.
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [`arguments`]{@link Listener#arguments}
   * property of the [`Listener`]{@link Listener} object and can be retrieved or modified as
   * desired.
   *
   * @returns {Listener} The newly created [`Listener`]{@link Listener} object.
   *
   * @throws {TypeError} The `event` parameter must be a string or
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}.
   * @throws {TypeError} The `callback` parameter must be a function.
   */
  addListener(event: string | Symbol, callback: EventEmitterCallback, options?: {
    context?: any;
    prepend?: boolean;
    duration?: number;
    remaining?: number;
    arguments?: any[];
  }): Listener | Listener[];

  /**
   * Adds a one-time listener for the specified event. The listener will be executed once and then
   * destroyed. It returns the [`Listener`]{@link Listener} object that was created and attached
   * to the event.
   *
   * To attach a global listener that will be triggered for any events, use
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} as the first parameter. Note that a
   * global listener will also be triggered by non-registered events.
   *
   * @param {string|Symbol} event The event to listen to
   * @param {EventEmitterCallback} callback The callback function to execute when the event occurs
   * @param {Object} [options={}]
   * @param {Object} [options.context=this] The context to invoke the callback function in.
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array and thus executed first.
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [`arguments`]{@link Listener#arguments}
   * property of the [`Listener`]{@link Listener} object and can be retrieved or modified as
   * desired.
   *
   * @returns {Listener} The newly created [`Listener`]{@link Listener} object.
   *
   * @throws {TypeError} The `event` parameter must be a string or
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}.
   * @throws {TypeError} The `callback` parameter must be a function.
   */
  addOneTimeListener(event: string | Symbol, callback: EventEmitterCallback, options?: {
    context?: any;
    prepend?: boolean;
    duration?: number;
    arguments?: any[];
  }): Listener | Listener[];

  /**
   * Returns `true` if the specified event has at least one registered listener. If no event is
   * specified, the method returns `true` if any event has at least one listener registered (this
   * includes global listeners registered to
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}).
   *
   * Note: to specifically check for global listeners added with
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}, use
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} as the parameter.
   *
   * @param {string|Symbol} [event=(any event)] The event to check
   * @param {function|Listener} [callback=(any callback)] The actual function that was added to the
   * event or the {@link Listener} object returned by `addListener()`.
   * @returns {boolean}
   */
  hasListener(event?: string | Symbol, callback?: Function | Listener): boolean;

  /**
   * An array of all the unique event names for which the emitter has at least one registered
   * listener.
   *
   * Note: this excludes global events registered with
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} because they are not tied to a
   * specific event.
   *
   * @type {string[]}
   * @readonly
   */
  get eventNames(): string[];

  /**
   * Returns an array of all the [`Listener`]{@link Listener} objects that have been registered for
   * a specific event.
   *
   * Please note that global events (those added with
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}) are not returned for "regular"
   * events. To get the list of global listeners, specifically use
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} as the parameter.
   *
   * @param {string|Symbol} event The event to get listeners for.
   * @returns {Listener[]} An array of [`Listener`]{@link Listener} objects.
   */
  getListeners(event: string | Symbol): Listener[];

  /**
   * Suspends execution of all callbacks functions registered for the specified event type.
   *
   * You can suspend execution of callbacks registered with
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} by passing
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} to `suspendEvent()`. Beware that this
   * will not suspend all callbacks but only those registered with
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}. While this may seem counter-intuitive
   * at first glance, it allows the selective suspension of global listeners while leaving other
   * listeners alone. If you truly want to suspends all callbacks for a specific
   * [`EventEmitter`]{@link EventEmitter}, simply set its `eventsSuspended` property to `true`.
   *
   * @param {string|Symbol} event The event name (or `EventEmitter.ANY_EVENT`) for which to suspend
   * execution of all callback functions.
   */
  suspendEvent(event: string | Symbol): void;

  /**
   * Resumes execution of all suspended callback functions registered for the specified event type.
   *
   * You can resume execution of callbacks registered with
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} by passing
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} to `unsuspendEvent()`. Beware that
   * this will not resume all callbacks but only those registered with
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}. While this may seem
   * counter-intuitive, it allows the selective unsuspension of global listeners while leaving other
   * callbacks alone.
   *
   * @param {string|Symbol} event The event name (or `EventEmitter.ANY_EVENT`) for which to resume
   * execution of all callback functions.
   */
  unsuspendEvent(event: string | Symbol): void;

  /**
   * Returns the number of listeners registered for a specific event.
   *
   * Please note that global events (those added with
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}) do not count towards the remaining
   * number for a "regular" event. To get the number of global listeners, specifically use
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} as the parameter.
   *
   * @param {string|Symbol} event The event which is usually a string but can also be the special
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} symbol.
   * @returns {number} An integer representing the number of listeners registered for the specified
   * event.
   */
  getListenerCount(event: string | Symbol): number;

  /**
   * Executes the callback function of all the [`Listener`]{@link Listener} objects registered for
   * a given event. The callback functions are passed the additional arguments passed to `emit()`
   * (if any) followed by the arguments present in the [`arguments`](Listener#arguments) property of
   * the [`Listener`](Listener) object (if any).
   *
   * If the [`eventsSuspended`]{@link #eventsSuspended} property is `true` or the
   * [`Listener.suspended`]{@link Listener#suspended} property is `true`, the callback functions
   * will not be executed.
   *
   * This function returns an array containing the return values of each of the callbacks.
   *
   * It should be noted that the regular listeners are triggered first followed by the global
   * listeners (those added with [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}).
   *
   * @param {string} event The event
   * @param {...*} args Arbitrary number of arguments to pass along to the callback functions
   *
   * @returns {Array} An array containing the return value of each of the executed listener
   * functions.
   *
   * @throws {TypeError} The `event` parameter must be a string.
   */
  emit(event: string, ...args: any[]): any[];

  /**
   * Removes all the listeners that match the specified criterias. If no parameters are passed, all
   * listeners will be removed. If only the `event` parameter is passed, all listeners for that
   * event will be removed. You can remove global listeners by using
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} as the first parameter.
   *
   * To use more granular options, you must at least define the `event`. Then, you can specify the
   * callback to match or one or more of the additional options.
   *
   * @param {string | Symbol} [event] The event name.
   * @param {EventEmitterCallback} [callback] Only remove the listeners that match this exact
   * callback function.
   * @param {Object} [options]
   * @param {*} [options.context] Only remove the listeners that have this exact context.
   * @param {number} [options.remaining] Only remove the listener if it has exactly that many
   * remaining times to be executed.
   */
  removeListener(
    event?: string | Symbol,
    callback?: EventEmitterCallback,
    options?: {
      context?: any;
      remaining?: number;
    }
  ): void;

  /**
   * The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
   * when the specified event occurs. The event can be a regular event or
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} (if you want to resolve as soon as any
   * event is emitted).
   *
   * If the `duration` option is set, the promise will only be fulfilled if the event is emitted
   * within the specified duration. If the event has not been fulfilled after the specified
   * duration, the promise is rejected. This makes it super easy to wait for an event and timeout
   * after a certain time if the event is not triggered.
   *
   * @param {string|Symbol} event The event to wait for
   * @param {Object} [options={}]
   * @param {number} [options.duration=Infinity] The number of milliseconds to wait before the
   * promise is automatically rejected.
   */
  waitFor(event: string | Symbol, options?: {
    duration?: number;
  }): Promise<any>;

  /**
   * The number of unique events that have registered listeners.
   *
   * Note: this excludes global events registered with
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} because they are not tied to a
   * specific event.
   *
   * @type {number}
   * @readonly
   */
  get eventCount(): number;

}

/**
 * The `Listener` class represents a single event listener object. Such objects keep all relevant
 * contextual information such as the event being listened to, the object the listener was attached
 * to, the callback function and so on.
 *
 */
declare class Listener {

  /**
   * Creates a new `Listener` object
   *
   * @param {string|Symbol} event The event being listened to
   * @param {EventEmitter} target The [`EventEmitter`]{@link EventEmitter} object that the listener
   * is attached to.
   * @param {EventEmitterCallback} callback The function to call when the listener is triggered
   * @param {Object} [options={}]
   * @param {Object} [options.context=target] The context to invoke the listener in (a.k.a. the
   * value of `this` inside the callback function).
   * @param {number} [options.remaining=Infinity] The remaining number of times after which the
   * callback should automatically be removed.
   * @param {array} [options.arguments] An array of arguments that will be passed separately to the
   * callback function upon execution. The array is stored in the [`arguments`]{@link #arguments}
   * property and can be retrieved or modified as desired.
   *
   * @throws {TypeError} The `event` parameter must be a string or
   * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}.
   * @throws {ReferenceError} The `target` parameter is mandatory.
   * @throws {TypeError} The `callback` must be a function.
   */
  constructor(event: string | Symbol, target: EventEmitter, callback: EventEmitterCallback, options?: {
    context?: any;
    remaining?: number;
    arguments?: any[];
  }, ...args: any[]);

  /**
   * An array of arguments to pass to the callback function upon execution.
   * @type {array}
   */
  arguments: any[];

  /**
   * The callback function to execute.
   * @type {Function}
   */
  callback: Function;

  /**
   * The context to execute the callback function in (a.k.a. the value of `this` inside the
   * callback function)
   * @type {Object}
   */
  context: any;

  /**
   * The number of times the listener function was executed.
   * @type {number}
   */
  count: number;

  /**
   * The event name.
   * @type {string}
   */
  event: string;

  /**
   * The remaining number of times after which the callback should automatically be removed.
   * @type {number}
   */
  remaining: number;

  /**
   * Whether this listener is currently suspended or not.
   * @type {boolean}
   */
  suspended: boolean;

  /**
   * The object that the event is attached to (or that emitted the event).
   * @type {EventEmitter}
   */
  target: EventEmitter;

  /**
   * Removes the listener from its target.
   */
  remove(): void;

}

/**
 * The `Enumerations` class contains enumerations and arrays of elements used throughout the
 * library. All properties are static and should be referenced using the class name. For example:
 * `Enumerations.MIDI_CHANNEL_MESSAGES`.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */
export class Enumerations {

  /**
   * Enumeration of all MIDI channel message names and their associated 4-bit numerical value:
   *
   * | Message Name        | Hexadecimal | Decimal |
   * |---------------------|-------------|---------|
   * | `noteoff`           | 0x8         | 8       |
   * | `noteon`            | 0x9         | 9       |
   * | `keyaftertouch`     | 0xA         | 10      |
   * | `controlchange`     | 0xB         | 11      |
   * | `programchange`     | 0xC         | 12      |
   * | `channelaftertouch` | 0xD         | 13      |
   * | `pitchbend`         | 0xE         | 14      |
   *
   * @enum {Object.<string, number>}
   * @readonly
   * @static
   */
  static get MIDI_CHANNEL_MESSAGES(): {
    noteoff: number;
    noteon: number;
    keyaftertouch: number;
    controlchange: number;
    programchange: number;
    channelaftertouch: number;
    pitchbend: number;
  };

  /**
   * A simple array of the 16 valid MIDI channel numbers (`1` to `16`):
   *
   * @type {number[]}
   * @readonly
   * @static
   */
  static get MIDI_CHANNEL_NUMBERS(): number[];

  /**
   * Enumeration of all MIDI channel mode message names and their associated numerical value:
   *
   *
   * | Message Name          | Hexadecimal | Decimal |
   * |-----------------------|-------------|---------|
   * | `allsoundoff`         | 0x78        | 120     |
   * | `resetallcontrollers` | 0x79        | 121     |
   * | `localcontrol`        | 0x7A        | 122     |
   * | `allnotesoff`         | 0x7B        | 123     |
   * | `omnimodeoff`         | 0x7C        | 124     |
   * | `omnimodeon`          | 0x7D        | 125     |
   * | `monomodeon`          | 0x7E        | 126     |
   * | `polymodeon`          | 0x7F        | 127     |
   *
   * @enum {Object.<string, number>}
   * @readonly
   * @static
   */
  static get MIDI_CHANNEL_MODE_MESSAGES(): {
    allsoundoff: number;
    resetallcontrollers: number;
    localcontrol: number;
    allnotesoff: number;
    omnimodeoff: number;
    omnimodeon: number;
    monomodeon: number;
    polymodeon: number;
  };

  /**
   * Enumeration of all control change messages identifying the control function associated to its
   * control number.
   *
   * Not all numbers have a preassigned control function. For those that don't, the control function
   * is identified as the word "controller" followed by the number (e.g. `controller123`).
   *
   * | Control Function               | Control Number |
   * |--------------------------------|----------------|
   * | `bankselectcoarse`             | 0              |
   * | `modulationwheelcoarse`        | 1              |
   * | `breathcontrollercoarse`       | 2              |
   * | `controller3`                  | 3              |
   * | `footcontrollercoarse`         | 4              |
   * | `portamentotimecoarse`         | 5              |
   * | `dataentrycoarse`              | 6              |
   * | `volumecoarse`                 | 7              |
   * | `balancecoarse`                | 8              |
   * | `controller9`                  | 9              |
   * | `pancoarse`                    | 10             |
   * | `expressioncoarse`             | 11             |
   * | `effectcontrol1coarse`         | 12             |
   * | `effectcontrol2coarse`         | 13             |
   * | `controller14`                 | 14             |
   * | `controller15`                 | 15             |
   * | `generalpurposeslider1`        | 16             |
   * | `generalpurposeslider2`        | 17             |
   * | `generalpurposeslider3`        | 18             |
   * | `generalpurposeslider4`        | 19             |
   * | `controller20`                 | 20             |
   * | `controller21`                 | 21             |
   * | `controller22`                 | 22             |
   * | `controller23`                 | 23             |
   * | `controller24`                 | 24             |
   * | `controller25`                 | 25             |
   * | `controller26`                 | 26             |
   * | `controller27`                 | 27             |
   * | `controller28`                 | 28             |
   * | `controller29`                 | 29             |
   * | `controller30`                 | 30             |
   * | `controller31`                 | 31             |
   * | `bankselectfine`               | 32             |
   * | `modulationwheelfine`          | 33             |
   * | `breathcontrollerfine`         | 34             |
   * | `controller35`                 | 35             |
   * | `footcontrollerfine`           | 36             |
   * | `portamentotimefine`           | 37             |
   * | `dataentryfine`                | 38             |
   * | `volumefine`                   | 39             |
   * | `balancefine`                  | 40             |
   * | `controller41`                 | 41             |
   * | `panfine`                      | 42             |
   * | `expressionfine`               | 43             |
   * | `effectcontrol1fine`           | 44             |
   * | `effectcontrol2fine`           | 45             |
   * | `controller46`                 | 46             |
   * | `controller47`                 | 47             |
   * | `controller48`                 | 48             |
   * | `controller49`                 | 49             |
   * | `controller50`                 | 50             |
   * | `controller51`                 | 51             |
   * | `controller52`                 | 52             |
   * | `controller53`                 | 53             |
   * | `controller54`                 | 54             |
   * | `controller55`                 | 55             |
   * | `controller56`                 | 56             |
   * | `controller57`                 | 57             |
   * | `controller58`                 | 58             |
   * | `controller59`                 | 59             |
   * | `controller60`                 | 60             |
   * | `controller61`                 | 61             |
   * | `controller62`                 | 62             |
   * | `controller63`                 | 63             |
   * | `holdpedal`                    | 64             |
   * | `portamento`                   | 65             |
   * | `sustenutopedal`               | 66             |
   * | `softpedal`                    | 67             |
   * | `legatopedal`                  | 68             |
   * | `hold2pedal`                   | 69             |
   * | `soundvariation`               | 70             |
   * | `resonance`                    | 71             |
   * | `soundreleasetime`             | 72             |
   * | `soundattacktime`              | 73             |
   * | `brightness`                   | 74             |
   * | `soundcontrol6`                | 75             |
   * | `soundcontrol7`                | 76             |
   * | `soundcontrol8`                | 77             |
   * | `soundcontrol9`                | 78             |
   * | `soundcontrol10`               | 79             |
   * | `generalpurposebutton1`        | 80             |
   * | `generalpurposebutton2`        | 81             |
   * | `generalpurposebutton3`        | 82             |
   * | `generalpurposebutton4`        | 83             |
   * | `controller84`                 | 84             |
   * | `controller85`                 | 85             |
   * | `controller86`                 | 86             |
   * | `controller87`                 | 87             |
   * | `controller88`                 | 88             |
   * | `controller89`                 | 89             |
   * | `controller90`                 | 90             |
   * | `reverblevel`                  | 91             |
   * | `tremololevel`                 | 92             |
   * | `choruslevel`                  | 93             |
   * | `celestelevel`                 | 94             |
   * | `phaserlevel`                  | 95             |
   * | `databuttonincrement`          | 96             |
   * | `databuttondecrement`          | 97             |
   * | `nonregisteredparametercoarse` | 98             |
   * | `nonregisteredparameterfine`   | 99             |
   * | `registeredparametercoarse`    | 100            |
   * | `registeredparameterfine`      | 101            |
   * | `controller102`                | 102            |
   * | `controller103`                | 103            |
   * | `controller104`                | 104            |
   * | `controller105`                | 105            |
   * | `controller106`                | 106            |
   * | `controller107`                | 107            |
   * | `controller108`                | 108            |
   * | `controller109`                | 109            |
   * | `controller110`                | 110            |
   * | `controller111`                | 111            |
   * | `controller112`                | 112            |
   * | `controller113`                | 113            |
   * | `controller114`                | 114            |
   * | `controller115`                | 115            |
   * | `controller116`                | 116            |
   * | `controller117`                | 117            |
   * | `controller118`                | 118            |
   * | `controller119`                | 119            |
   * | `allsoundoff`                  | 120            |
   * | `resetallcontrollers`          | 121            |
   * | `localcontrol`                 | 122            |
   * | `allnotesoff`                  | 123            |
   * | `omnimodeoff`                  | 124            |
   * | `omnimodeon`                   | 125            |
   * | `monomodeon`                   | 126            |
   * | `polymodeon`                   | 127            |
   *
   * @enum {Object.<string, number>}
   * @readonly
   * @static
   */
  static get MIDI_CONTROL_CHANGE_MESSAGES(): {
    bankselectcoarse: number;
    modulationwheelcoarse: number;
    breathcontrollercoarse: number;
    controller3: number;
    footcontrollercoarse: number;
    portamentotimecoarse: number;
    dataentrycoarse: number;
    volumecoarse: number;
    balancecoarse: number;
    controller9: number;
    pancoarse: number;
    expressioncoarse: number;
    effectcontrol1coarse: number;
    effectcontrol2coarse: number;
    controller14: number;
    controller15: number;
    generalpurposeslider1: number;
    generalpurposeslider2: number;
    generalpurposeslider3: number;
    generalpurposeslider4: number;
    controller20: number;
    controller21: number;
    controller22: number;
    controller23: number;
    controller24: number;
    controller25: number;
    controller26: number;
    controller27: number;
    controller28: number;
    controller29: number;
    controller30: number;
    controller31: number;
    bankselectfine: number;
    modulationwheelfine: number;
    breathcontrollerfine: number;
    controller35: number;
    footcontrollerfine: number;
    portamentotimefine: number;
    dataentryfine: number;
    volumefine: number;
    balancefine: number;
    controller41: number;
    panfine: number;
    expressionfine: number;
    effectcontrol1fine: number;
    effectcontrol2fine: number;
    controller46: number;
    controller47: number;
    controller48: number;
    controller49: number;
    controller50: number;
    controller51: number;
    controller52: number;
    controller53: number;
    controller54: number;
    controller55: number;
    controller56: number;
    controller57: number;
    controller58: number;
    controller59: number;
    controller60: number;
    controller61: number;
    controller62: number;
    controller63: number;
    holdpedal: number;
    portamento: number;
    sustenutopedal: number;
    softpedal: number;
    legatopedal: number;
    hold2pedal: number;
    soundvariation: number;
    resonance: number;
    soundreleasetime: number;
    soundattacktime: number;
    brightness: number;
    soundcontrol6: number;
    soundcontrol7: number;
    soundcontrol8: number;
    soundcontrol9: number;
    soundcontrol10: number;
    generalpurposebutton1: number;
    generalpurposebutton2: number;
    generalpurposebutton3: number;
    generalpurposebutton4: number;
    controller84: number;
    controller85: number;
    controller86: number;
    controller87: number;
    controller88: number;
    controller89: number;
    controller90: number;
    reverblevel: number;
    tremololevel: number;
    choruslevel: number;
    celestelevel: number;
    phaserlevel: number;
    databuttonincrement: number;
    databuttondecrement: number;
    nonregisteredparametercoarse: number;
    nonregisteredparameterfine: number;
    registeredparametercoarse: number;
    registeredparameterfine: number;
    controller102: number;
    controller103: number;
    controller104: number;
    controller105: number;
    controller106: number;
    controller107: number;
    controller108: number;
    controller109: number;
    controller110: number;
    controller111: number;
    controller112: number;
    controller113: number;
    controller114: number;
    controller115: number;
    controller116: number;
    controller117: number;
    controller118: number;
    controller119: number;
    allsoundoff: number;
    resetallcontrollers: number;
    localcontrol: number;
    allnotesoff: number;
    omnimodeoff: number;
    omnimodeon: number;
    monomodeon: number;
    polymodeon: number;
  };

  /**
   * Enumeration of all MIDI registered parameters and their associated pair of numerical values.
   * MIDI registered parameters extend the original list of control change messages. Currently,
   * there are only a limited number of them:
   *
   *
   * | Control Function             | [LSB, MSB]   |
   * |------------------------------|--------------|
   * | `pitchbendrange`             | [0x00, 0x00] |
   * | `channelfinetuning`          | [0x00, 0x01] |
   * | `channelcoarsetuning`        | [0x00, 0x02] |
   * | `tuningprogram`              | [0x00, 0x03] |
   * | `tuningbank`                 | [0x00, 0x04] |
   * | `modulationrange`            | [0x00, 0x05] |
   * | `azimuthangle`               | [0x3D, 0x00] |
   * | `elevationangle`             | [0x3D, 0x01] |
   * | `gain`                       | [0x3D, 0x02] |
   * | `distanceratio`              | [0x3D, 0x03] |
   * | `maximumdistance`            | [0x3D, 0x04] |
   * | `maximumdistancegain`        | [0x3D, 0x05] |
   * | `referencedistanceratio`     | [0x3D, 0x06] |
   * | `panspreadangle`             | [0x3D, 0x07] |
   * | `rollangle`                  | [0x3D, 0x08] |
   *
   * @enum {Object.<string, number[]>}
   * @readonly
   * @static
   */
  static get MIDI_REGISTERED_PARAMETERS(): {
    pitchbendrange: number[];
    channelfinetuning: number[];
    channelcoarsetuning: number[];
    tuningprogram: number[];
    tuningbank: number[];
    modulationrange: number[];
    azimuthangle: number[];
    elevationangle: number[];
    gain: number[];
    distanceratio: number[];
    maximumdistance: number[];
    maximumdistancegain: number[];
    referencedistanceratio: number[];
    panspreadangle: number[];
    rollangle: number[];
  };

  /**
   * Enumeration of all valid MIDI system messages and matching numerical values. WebMidi.js also
   * uses two additional custom messages.
   *
   * **System Common Messages**
   *
   * | Function               | Hexadecimal | Decimal |
   * |------------------------|-------------|---------|
   * | `sysex`                | 0xF0        |  240    |
   * | `timecode`             | 0xF1        |  241    |
   * | `songposition`         | 0xF2        |  242    |
   * | `songselect`           | 0xF3        |  243    |
   * | `tunerequest`          | 0xF6        |  246    |
   * | `sysexend`             | 0xF7        |  247    |
   *
   * The `sysexend` message is never actually received. It simply ends a sysex stream.
   *
   * **System Real-Time Messages**
   *
   * | Function               | Hexadecimal | Decimal |
   * |------------------------|-------------|---------|
   * | `clock`                | 0xF8        |  248    |
   * | `start`                | 0xFA        |  250    |
   * | `continue`             | 0xFB        |  251    |
   * | `stop`                 | 0xFC        |  252    |
   * | `activesensing`        | 0xFE        |  254    |
   * | `reset`                | 0xFF        |  255    |
   *
   * Values 249 and 253 are relayed by the
   * [Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API) but they do not
   * serve any specific purpose. The
   * [MIDI 1.0 spec](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
   * simply states that they are undefined/reserved.
   *
   * **Custom WebMidi.js Messages**
   *
   * These two messages are mostly for internal use. They are not MIDI messages and cannot be sent
   * or forwarded.
   *
   * | Function               | Hexadecimal | Decimal |
   * |------------------------|-------------|---------|
   * | `midimessage`          |             |  0      |
   * | `unknownsystemmessage` |             |  -1     |
   *
   * @enum {Object.<string, number>}
   * @readonly
   * @static
   */
  static get MIDI_SYSTEM_MESSAGES(): {
    sysex: number;
    timecode: number;
    songposition: number;
    songselect: number;
    tunerequest: number;
    tuningrequest: number;
    sysexend: number;
    clock: number;
    start: number;
    continue: number;
    stop: number;
    activesensing: number;
    reset: number;
    midimessage: number;
    unknownsystemmessage: number;
  };

  /**
   * Array of channel-specific event names that can be listened for. This includes channel mode
   * events and RPN/NRPN events.
   *
   * @type {string[]}
   * @readonly
   */
  static get CHANNEL_EVENTS(): string[];

}

/**
 * The `Forwarder` class allows the forwarding of MIDI messages to predetermined outputs. When you
 * call its [`forward()`](#forward) method, it will send the specified [`Message`](Message) object
 * to all the outputs listed in its [`destinations`](#destinations) property.
 *
 * If specific channels or message types have been defined in the [`channels`](#channels) or
 * [`types`](#types) properties, only messages matching the channels/types will be forwarded.
 *
 * While it can be manually instantiated, you are more likely to come across a `Forwarder` object as
 * the return value of the [`Input.addForwarder()`](Input#addForwarder) method.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */
export class Forwarder {

  /**
   * Creates a `Forwarder` object.
   *
   * @param {Output|Output[]} [destinations=\[\]] An [`Output`](Output) object, or an array of such
   * objects, to forward the message to.
   *
   * @param {object} [options={}]
   * @param {string|string[]} [options.types=(all messages)] A MIDI message type or an array of such
   * types (`"noteon"`, `"controlchange"`, etc.), that the specified message must match in order to
   * be forwarded. If this option is not specified, all types of messages will be forwarded. Valid
   * messages are the ones found in either
   * [`MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES)
   * or [`MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * A MIDI channel number or an array of channel numbers that the message must match in order to be
   * forwarded. By default all MIDI channels are included (`1` to `16`).
   */
  constructor(destinations?: Output | Output[], options?: {
    types?: string | string[];
    channels?: number | number[];
  });

  /**
   * An array of [`Output`](Output) objects to forward the message to.
   * @type {Output[]}
   */
  destinations: Output[];

  /**
   * An array of message types (`"noteon"`, `"controlchange"`, etc.) that must be matched in order
   * for messages to be forwarded. By default, this array includes all
   * [`Enumerations.MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES) and
   * [`Enumerations.MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).
   * @type {string[]}
   */
  types: string[];

  /**
   * An array of MIDI channel numbers that the message must match in order to be forwarded. By
   * default, this array includes all MIDI channels (`1` to `16`).
   * @type {number[]}
   */
  channels: number[];

  /**
   * Indicates whether message forwarding is currently suspended or not in this forwarder.
   * @type {boolean}
   */
  suspended: boolean;

  /**
   * Sends the specified message to the forwarder's destination(s) if it matches the specified
   * type(s) and channel(s).
   *
   * @param {Message} message The [`Message`](Message) object to forward.
   */
  forward(message: Message): void;

}

/**
 * The `Input` class represents a single MIDI input port. This object is automatically instantiated
 * by the library according to the host's MIDI subsystem and does not need to be directly
 * instantiated. Instead, you can access all `Input` objects by referring to the
 * [`WebMidi.inputs`](WebMidi#inputs) array. You can also retrieve inputs by using methods such as
 * [`WebMidi.getInputByName()`](WebMidi#getInputByName) and
 * [`WebMidi.getInputById()`](WebMidi#getInputById).
 *
 * Note that a single MIDI device may expose several inputs and/or outputs.
 *
 * **Important**: the `Input` class does not directly fire channel-specific MIDI messages
 * (such as [`noteon`](InputChannel#event:noteon) or
 * [`controlchange`](InputChannel#event:controlchange), etc.). The [`InputChannel`](InputChannel)
 * object does that. However, you can still use the
 * [`Input.addListener()`](#addListener) method to listen to channel-specific events on multiple
 * [`InputChannel`](InputChannel) objects at once.
 *
 * @fires Input#opened
 * @fires Input#disconnected
 * @fires Input#closed
 * @fires Input#midimessage
 *
 * @fires Input#sysex
 * @fires Input#timecode
 * @fires Input#songposition
 * @fires Input#songselect
 * @fires Input#tunerequest
 * @fires Input#clock
 * @fires Input#start
 * @fires Input#continue
 * @fires Input#stop
 * @fires Input#activesensing
 * @fires Input#reset
 *
 * @fires Input#unknownmidimessage
 *
 * @extends EventEmitter
 * @license Apache-2.0
 */
export class Input extends EventEmitter {

  /**
   * Creates an `Input` object.
   *
   * @param {WebMidi.MIDIInput} midiInput [`MIDIInput`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIInput)
   * object as provided by the MIDI subsystem (Web MIDI API).
   */
  constructor(midiInput: WebMidi.MIDIInput);

  private _forwarders;
  private _midiInput;
  private _octaveOffset;
  private _onMidiMessage;
  private _onStateChange;
  private _parseEvent;

  /**
   * Array containing the 16 [`InputChannel`](InputChannel) objects available for this `Input`. The
   * channels are numbered 1 through 16.
   *
   * @type {InputChannel[]}
   */
  channels: InputChannel[];

  /**
   * Adds a forwarder that will forward all incoming MIDI messages matching the criteria to the
   * specified [`Output`](Output) destination(s). This is akin to the hardware MIDI THRU port, with
   * the added benefit of being able to filter which data is forwarded.
   *
   * @param {Output|Output[]} output An [`Output`](Output) object, or an array of such
   * objects, to forward messages to.
   * @param {object} [options={}]
   * @param {string|string[]} [options.types=(all messages)] A message type, or an array of such
   * types (`noteon`, `controlchange`, etc.), that the message type must match in order to be
   * forwarded. If this option is not specified, all types of messages will be forwarded. Valid
   * messages are the ones found in either
   * [`MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES) or
   * [`MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * A MIDI channel number or an array of channel numbers that the message must match in order to be
   * forwarded. By default all MIDI channels are included (`1` to `16`).
   *
   * @returns {Forwarder} The [`Forwarder`](Forwarder) object created to handle the forwarding. This
   * is useful if you wish to manipulate or remove the [`Forwarder`](Forwarder) later on.
   */
  addForwarder(output: Output | Output[], options?: {
    types?: string | string[];
    channels?: number | number[];
  }): Forwarder;

  /**
   * Adds an event listener that will trigger a function callback when the specified event is
   * dispatched. The event usually is **input-wide** but can also be **channel-specific**.
   *
   * Input-wide events do not target a specific MIDI channel so it makes sense to listen for them
   * at the `Input` level and not at the [`InputChannel`](InputChannel) level. Channel-specific
   * events target a specific channel. Usually, in this case, you would add the listener to the
   * [`InputChannel`](InputChannel) object. However, as a convenience, you can also listen to
   * channel-specific events directly on an `Input`. This allows you to react to a channel-specific
   * event no matter which channel it actually came through.
   *
   * When listening for an event, you simply need to specify the event name and the function to
   * execute:
   *
   * ```javascript
   * const listener = WebMidi.inputs[0].addListener("midimessage", e => {
   *   console.log(e);
   * });
   * ```
   *
   * Calling the function with an input-wide event (such as
   * [`"midimessage"`]{@link #event:midimessage}), will return the [`Listener`](Listener) object
   * that was created.
   *
   * If you call the function with a channel-specific event (such as
   * [`"noteon"`]{@link InputChannel#event:noteon}), it will return an array of all
   * [`Listener`](Listener) objects that were created (one for each channel):
   *
   * ```javascript
   * const listeners = WebMidi.inputs[0].addListener("noteon", someFunction);
   * ```
   *
   * You can also specify which channels you want to add the listener to:
   *
   * ```javascript
   * const listeners = WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
   * ```
   *
   * In this case, `listeners` is an array containing 3 [`Listener`](Listener) objects.
   *
   * Note that, when adding channel-specific listeners, it is the [`InputChannel`](InputChannel)
   * instance that actually gets a listener added and not the `Input` instance. You can check that
   * by calling [`InputChannel.hasListener()`](InputChannel#hasListener()).
   *
   * There are 8 families of events you can listen to:
   *
   * 1. **MIDI System Common** Events (input-wide)
   *
   *    * [`songposition`]{@link Input#event:songposition}
   *    * [`songselect`]{@link Input#event:songselect}
   *    * [`sysex`]{@link Input#event:sysex}
   *    * [`timecode`]{@link Input#event:timecode}
   *    * [`tunerequest`]{@link Input#event:tunerequest}
   *
   * 2. **MIDI System Real-Time** Events (input-wide)
   *
   *    * [`clock`]{@link Input#event:clock}
   *    * [`start`]{@link Input#event:start}
   *    * [`continue`]{@link Input#event:continue}
   *    * [`stop`]{@link Input#event:stop}
   *    * [`activesensing`]{@link Input#event:activesensing}
   *    * [`reset`]{@link Input#event:reset}
   *
   * 3. **State Change** Events (input-wide)
   *
   *    * [`opened`]{@link Input#event:opened}
   *    * [`closed`]{@link Input#event:closed}
   *    * [`disconnected`]{@link Input#event:disconnected}
   *
   * 4. **Catch-All** Events (input-wide)
   *
   *    * [`midimessage`]{@link Input#event:midimessage}
   *    * [`unknownmidimessage`]{@link Input#event:unknownmidimessage}
   *
   * 5. **Channel Voice** Events (channel-specific)
   *
   *    * [`channelaftertouch`]{@link InputChannel#event:channelaftertouch}
   *    * [`controlchange`]{@link InputChannel#event:controlchange}
   *      * [`controlchange-controller0`]{@link InputChannel#event:controlchange-controller0}
   *      * [`controlchange-controller1`]{@link InputChannel#event:controlchange-controller1}
   *      * [`controlchange-controller2`]{@link InputChannel#event:controlchange-controller2}
   *      * (...)
   *      * [`controlchange-controller127`]{@link InputChannel#event:controlchange-controller127}
   *    * [`keyaftertouch`]{@link InputChannel#event:keyaftertouch}
   *    * [`noteoff`]{@link InputChannel#event:noteoff}
   *    * [`noteon`]{@link InputChannel#event:noteon}
   *    * [`pitchbend`]{@link InputChannel#event:pitchbend}
   *    * [`programchange`]{@link InputChannel#event:programchange}
   *
   *    Note: you can listen for a specific control change message by using an event name like this:
   *    `controlchange-controller23`, `controlchange-controller99`, `controlchange-controller122`,
   *    etc.
   *
   * 6. **Channel Mode** Events (channel-specific)
   *
   *    * [`allnotesoff`]{@link InputChannel#event:allnotesoff}
   *    * [`allsoundoff`]{@link InputChannel#event:allsoundoff}
   *    * [`localcontrol`]{@link InputChannel#event:localcontrol}
   *    * [`monomode`]{@link InputChannel#event:monomode}
   *    * [`omnimode`]{@link InputChannel#event:omnimode}
   *    * [`resetallcontrollers`]{@link InputChannel#event:resetallcontrollers}
   *
   * 7. **NRPN** Events (channel-specific)
   *
   *    * [`nrpn`]{@link InputChannel#event:nrpn}
   *    * [`nrpn-dataentrycoarse`]{@link InputChannel#event:nrpn-dataentrycoarse}
   *    * [`nrpn-dataentryfine`]{@link InputChannel#event:nrpn-dataentryfine}
   *    * [`nrpn-databuttonincrement`]{@link InputChannel#event:nrpn-databuttonincrement}
   *    * [`nrpn-databuttondecrement`]{@link InputChannel#event:nrpn-databuttondecrement}
   *
   * 8. **RPN** Events (channel-specific)
   *
   *    * [`rpn`]{@link InputChannel#event:rpn}
   *    * [`rpn-dataentrycoarse`]{@link InputChannel#event:rpn-dataentrycoarse}
   *    * [`rpn-dataentryfine`]{@link InputChannel#event:rpn-dataentryfine}
   *    * [`rpn-databuttonincrement`]{@link InputChannel#event:rpn-databuttonincrement}
   *    * [`rpn-databuttondecrement`]{@link InputChannel#event:rpn-databuttondecrement}
   *
   * @param event {string | Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} A callback function to execute when the specified event is detected.
   * This function will receive an event parameter object. For details on this object's properties,
   * check out the documentation for the various events (links above).
   *
   * @param {object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [`arguments`](Listener#arguments) property of
   * the [`Listener`](Listener) object and can be retrieved or modified as desired.
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to
   * listen on. If no channel is specified, all channels will be used. This parameter is ignored for
   * input-wide events.
   *
   * @param {object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array and thus be triggered before others.
   *
   * @param {number} [options.remaining=Infinity] The number of times after which the callback
   * should automatically be removed.
   *
   * @returns {Listener|Listener[]} If the event is input-wide, a single [`Listener`](Listener)
   * object is returned. If the event is channel-specific, an array of all the
   * [`Listener`](Listener) objects is returned (one for each channel).
   */
  addListener<T extends keyof InputEventMap>(
    e: Symbol | T,
    listener: InputEventMap[T],
    options?: {
      "arguments"?: any[];
      "channels"?: number | number[];
      "context"?: any;
      "duration"?: number;
      "prepend"?: boolean;
      "remaining"?: number;
    }
  ): Listener | Listener[];

  /**
   * Adds a one-time event listener that will trigger a function callback when the specified event
   * happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
   * dispatched by [`InputChannel`]{@link InputChannel} objects and are tied to a specific MIDI
   * channel while input-wide events are dispatched by the `Input` object itself and are not tied
   * to a specific channel.
   *
   * Calling the function with an input-wide event (such as
   * [`"midimessage"`]{@link #event:midimessage}), will return the [`Listener`](Listener) object
   * that was created.
   *
   * If you call the function with a channel-specific event (such as
   * [`"noteon"`]{@link InputChannel#event:noteon}), it will return an array of all
   * [`Listener`](Listener) objects that were created (one for each channel):
   *
   * ```javascript
   * const listeners = WebMidi.inputs[0].addOneTimeListener("noteon", someFunction);
   * ```
   *
   * You can also specify which channels you want to add the listener to:
   *
   * ```javascript
   * const listeners = WebMidi.inputs[0].addOneTimeListener("noteon", someFunction, {channels: [1, 2, 3]});
   * ```
   *
   * In this case, the `listeners` variable contains an array of 3 [`Listener`](Listener) objects.
   *
   * The code above will add a listener for the `"noteon"` event and call `someFunction` when the
   * event is triggered on MIDI channels `1`, `2` or `3`.
   *
   * Note that, when adding events to channels, it is the [`InputChannel`](InputChannel) instance
   * that actually gets a listener added and not the `Input` instance.
   *
   * Note: if you want to add a listener to a single MIDI channel you should probably do so directly
   * on the [`InputChannel`](InputChannel) object itself.
   *
   * There are 8 families of events you can listen to:
   *
   * 1. **MIDI System Common** Events (input-wide)
   *
   *    * [`songposition`]{@link Input#event:songposition}
   *    * [`songselect`]{@link Input#event:songselect}
   *    * [`sysex`]{@link Input#event:sysex}
   *    * [`timecode`]{@link Input#event:timecode}
   *    * [`tunerequest`]{@link Input#event:tunerequest}
   *
   * 2. **MIDI System Real-Time** Events (input-wide)
   *
   *    * [`clock`]{@link Input#event:clock}
   *    * [`start`]{@link Input#event:start}
   *    * [`continue`]{@link Input#event:continue}
   *    * [`stop`]{@link Input#event:stop}
   *    * [`activesensing`]{@link Input#event:activesensing}
   *    * [`reset`]{@link Input#event:reset}
   *
   * 3. **State Change** Events (input-wide)
   *
   *    * [`opened`]{@link Input#event:opened}
   *    * [`closed`]{@link Input#event:closed}
   *    * [`disconnected`]{@link Input#event:disconnected}
   *
   * 4. **Catch-All** Events (input-wide)
   *
   *    * [`midimessage`]{@link Input#event:midimessage}
   *    * [`unknownmidimessage`]{@link Input#event:unknownmidimessage}
   *
   * 5. **Channel Voice** Events (channel-specific)
   *
   *    * [`channelaftertouch`]{@link InputChannel#event:channelaftertouch}
   *    * [`controlchange`]{@link InputChannel#event:controlchange}
   *      * [`controlchange-controller0`]{@link InputChannel#event:controlchange-controller0}
   *      * [`controlchange-controller1`]{@link InputChannel#event:controlchange-controller1}
   *      * [`controlchange-controller2`]{@link InputChannel#event:controlchange-controller2}
   *      * (...)
   *      * [`controlchange-controller127`]{@link InputChannel#event:controlchange-controller127}
   *    * [`keyaftertouch`]{@link InputChannel#event:keyaftertouch}
   *    * [`noteoff`]{@link InputChannel#event:noteoff}
   *    * [`noteon`]{@link InputChannel#event:noteon}
   *    * [`pitchbend`]{@link InputChannel#event:pitchbend}
   *    * [`programchange`]{@link InputChannel#event:programchange}
   *
   *    Note: you can listen for a specific control change message by using an event name like this:
   *    `controlchange-controller23`, `controlchange-controller99`, `controlchange-controller122`,
   *    etc.
   *
   * 6. **Channel Mode** Events (channel-specific)
   *
   *    * [`allnotesoff`]{@link InputChannel#event:allnotesoff}
   *    * [`allsoundoff`]{@link InputChannel#event:allsoundoff}
   *    * [`localcontrol`]{@link InputChannel#event:localcontrol}
   *    * [`monomode`]{@link InputChannel#event:monomode}
   *    * [`omnimode`]{@link InputChannel#event:omnimode}
   *    * [`resetallcontrollers`]{@link InputChannel#event:resetallcontrollers}
   *
   * 7. **NRPN** Events (channel-specific)
   *
   *    * [`nrpn`]{@link InputChannel#event:nrpn}
   *    * [`nrpn-dataentrycoarse`]{@link InputChannel#event:nrpn-dataentrycoarse}
   *    * [`nrpn-dataentryfine`]{@link InputChannel#event:nrpn-dataentryfine}
   *    * [`nrpn-databuttonincrement`]{@link InputChannel#event:nrpn-databuttonincrement}
   *    * [`nrpn-databuttondecrement`]{@link InputChannel#event:nrpn-databuttondecrement}
   *
   * 8. **RPN** Events (channel-specific)
   *
   *    * [`rpn`]{@link InputChannel#event:rpn}
   *    * [`rpn-dataentrycoarse`]{@link InputChannel#event:rpn-dataentrycoarse}
   *    * [`rpn-dataentryfine`]{@link InputChannel#event:rpn-dataentryfine}
   *    * [`rpn-databuttonincrement`]{@link InputChannel#event:rpn-databuttonincrement}
   *    * [`rpn-databuttondecrement`]{@link InputChannel#event:rpn-databuttondecrement}
   *
   * @param event {string} The type of the event.
   *
   * @param listener {EventEmitterCallback} A callback function to execute when the specified event
   * is detected. This function will receive an event parameter object. For details on this object's
   * properties, check out the documentation for the various events (links above).
   *
   * @param {object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [`arguments`](Listener#arguments) property of
   * the [`Listener`](Listener) object and can be retrieved or modified as desired.
   *
   * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
   * such integers representing the MIDI channel(s) to listen on. This parameter is ignored for
   * input-wide events.
   *
   * @param {object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array and thus be triggered before others.
   *
   * @returns {Listener|Listener[]} An array of all [`Listener`](Listener) objects that were
   * created.
   */
  addOneTimeListener<T extends keyof InputEventMap>(
    e: Symbol | T,
    listener: InputEventMap[T],
    options?: {
      "arguments"?: any[];
      "channels"?: number | number[];
      "context"?: any;
      "duration"?: number;
      "prepend"?: boolean;
    }
  ): Listener | Listener[];

  /**
   * Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
   * the input is opened again by calling [`Input.open()`](Input#open).
   *
   * **Note**: if what you want to do is stop events from being dispatched, you should use
   * [`eventsSuspended`](#eventsSuspended) instead.
   *
   * @returns {Promise<Input>} The promise is fulfilled with the `Input` object
   */
  close(): Promise<Input>;

  /**
   * Destroys the `Input` by removing all listeners, emptying the [`channels`](#channels) array and
   * unlinking the MIDI subsystem. This is mostly for internal use.
   *
   * @returns {Promise<void>}
   */
  destroy(): Promise<void>;

  /**
   * Checks whether the specified [`Forwarder`](Forwarder) object has already been attached to this
   * input.
   *
   * @param {Forwarder} forwarder The [`Forwarder`](Forwarder) to check for (the
   * [`Forwarder`](Forwarder) object is returned when calling [`addForwarder()`](#addForwarder).
   * @returns {boolean}
   */
  hasForwarder(forwarder: Forwarder): boolean;

  /**
   * Checks if the specified event type is already defined to trigger the specified callback
   * function. For channel-specific events, the function will return `true` only if all channels
   * have the listener defined.
   *
   * @param event {string|Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} The callback function to check for.
   *
   * @param {object} [options={}]
   *
   * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of such
   * integers representing the MIDI channel(s) to check. This parameter is ignored for input-wide
   * events.
   *
   * @returns {boolean} Boolean value indicating whether or not the `Input` or `InputChannel`
   * already has this listener defined.
   */
  hasListener<T extends keyof InputEventMap>(
    e: Symbol | T,
    listener: InputEventMap[T],
    options?: {
      "channels"?: number | number[];
    }
  ): boolean;

  /**
   * Opens the input for usage. This is usually unnecessary as the port is opened automatically when
   * WebMidi is enabled.
   *
   * @returns {Promise<Input>} The promise is fulfilled with the `Input` object.
   */
  open(): Promise<Input>;

  /**
   * Removes the specified [`Forwarder`](Forwarder) object from the input.
   *
   * @param {Forwarder} forwarder The [`Forwarder`](Forwarder) to remove (the
   * [`Forwarder`](Forwarder) object is returned when calling `addForwarder()`.
   */
  removeForwarder(forwarder: Forwarder): void;

  /**
   * Removes the specified listener for the specified event. If no listener is specified, all
   * listeners for the specified event will be removed. If no event is specified, all listeners for
   * the `Input` as well as all listeners for all [`InputChannel`]{@link InputChannel} objects will
   * be removed.
   *
   * By default, channel-specific listeners will be removed from all channels unless the
   * `options.channel` narrows it down.
   *
   * @param [type] {string} The type of the event.
   *
   * @param [listener] {EventEmitterCallback} The callback function to check for.
   *
   * @param {object} [options={}]
   *
   * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
   * such integers representing the MIDI channel(s) to match. This parameter is ignored for
   * input-wide events.
   *
   * @param {*} [options.context] Only remove the listeners that have this exact context.
   *
   * @param {number} [options.remaining] Only remove the listener if it has exactly that many
   * remaining times to be executed.
   */
  removeListener<T extends keyof InputEventMap>(
    type?: Symbol | T,
    listener?: InputEventMap[T],
    options?: {
      "channels"?: number | number[];
      "context"?: any;
      "remaining"?: number;
    }
  ): void;

  /**
   * Input port's connection state: `pending`, `open` or `closed`.
   *
   * @type {string}
   * @readonly
   */
  get connection(): string;

  /**
   * ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
   * platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
   * the same port.
   *
   * @type {string}
   * @readonly
   */
  get id(): string;

  /**
   * Name of the manufacturer of the device that makes this input port available.
   *
   * @type {string}
   * @readonly
   */
  get manufacturer(): string;

  /**
   * Name of the MIDI input.
   *
   * @type {string}
   * @readonly
   */
  get name(): string;

  /**
   * An integer to offset the reported octave of incoming notes. By default, middle C (MIDI note
   * number 60) is placed on the 4th octave (C4).
   *
   * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
   * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
   *
   * Note that this value is combined with the global offset value defined in the
   * [`WebMidi.octaveOffset`](WebMidi#octaveOffset) property (if any).
   *
   * @type {number}
   *
   * @since 3.0
   */
  set octaveOffset(arg: number);
  get octaveOffset(): number;

  /**
   * State of the input port: `connected` or `disconnected`.
   *
   * @type {string}
   * @readonly
   */
  get state(): string;

  /**
   * The port type. In the case of the `Input` object, this is always: `input`.
   *
   * @type {string}
   * @readonly
   */
  get type(): string;

}

/**
 * The `InputChannel` class represents a single MIDI input channel (1-16) from a single input
 * device. This object is derived from the host's MIDI subsystem and should not be instantiated
 * directly.
 *
 * All 16 `InputChannel` objects can be found inside the input's [`channels`](Input#channels)
 * property.
 *
 * @fires InputChannel#midimessage
 * @fires InputChannel#unknownmessage
 *
 * @fires InputChannel#noteoff
 * @fires InputChannel#noteon
 * @fires InputChannel#keyaftertouch
 * @fires InputChannel#programchange
 * @fires InputChannel#event:controlchange-controllerxxx
 * @fires InputChannel#channelaftertouch
 * @fires InputChannel#pitchbend
 * @fires InputChannel#controlchange
 *
 * @fires InputChannel#allnotesoff
 * @fires InputChannel#allsoundoff
 * @fires InputChannel#localcontrol
 * @fires InputChannel#monomode
 * @fires InputChannel#omnimode
 * @fires InputChannel#resetallcontrollers
 *
 * @fires InputChannel#event:nrpn
 * @fires InputChannel#event:nrpn-dataentrycoarse
 * @fires InputChannel#event:nrpn-dataentryfine
 * @fires InputChannel#event:nrpn-databuttonincrement
 * @fires InputChannel#event:nrpn-databuttondecrement
 * @fires InputChannel#event:rpn
 * @fires InputChannel#event:rpn-dataentrycoarse
 * @fires InputChannel#event:rpn-dataentryfine
 * @fires InputChannel#event:rpn-databuttonincrement
 * @fires InputChannel#event:rpn-databuttondecrement
 *
 * @extends EventEmitter
 * @license Apache-2.0
 * @since 3.0.0
 */
export class InputChannel extends EventEmitter {

  /**
   * Creates an `InputChannel` object.
   *
   * @param {Input} input The [`Input`](Input) object this channel belongs to.
   * @param {number} number The channel's MIDI number (1-16).
   */
  constructor(input: Input, number: number);

  private _dispatchParameterNumberEvent;
  private _input;
  private _isRpnOrNrpnController;
  private _number;
  private _octaveOffset;
  private _parseChannelModeMessage;
  private _parseEventForParameterNumber;
  private _parseEventForStandardMessages;
  private _processMidiMessageEvent;
  private _nrpnBuffer;
  private _rpnBuffer;

  /**
   * Contains the current playing state of all MIDI notes of this channel (0-127). The state is
   * `true` for a currently playing note and `false` otherwise.
   * @type {boolean[]}
   */
  notesState: boolean[];

  /**
   * Indicates whether events for **Registered Parameter Number** and **Non-Registered Parameter
   * Number** should be dispatched. RPNs and NRPNs are composed of a sequence of specific
   * **control change** messages. When a valid sequence of such control change messages is
   * received, an [`rpn`](#event-rpn) or [`nrpn`](#event-nrpn) event will fire.
   *
   * If an invalid or out-of-order **control change** message is received, it will fall through
   * the collector logic and all buffered **control change** messages will be discarded as
   * incomplete.
   *
   * @type {boolean}
   */
  parameterNumberEventsEnabled: boolean;

  /**
   * Adds an event listener that will trigger a function callback when the specified event is
   * dispatched.
   *
   * Here are the events you can listen to:
   *
   * **Channel Voice** Events
   *
   *    * [`channelaftertouch`]{@link InputChannel#event:channelaftertouch}
   *    * [`controlchange`]{@link InputChannel#event:controlchange}
   *      * [`controlchange-controller0`]{@link InputChannel#event:controlchange-controller0}
   *      * [`controlchange-controller1`]{@link InputChannel#event:controlchange-controller1}
   *      * [`controlchange-controller2`]{@link InputChannel#event:controlchange-controller2}
   *      * (...)
   *      * [`controlchange-controller127`]{@link InputChannel#event:controlchange-controller127}
   *    * [`keyaftertouch`]{@link InputChannel#event:keyaftertouch}
   *    * [`noteoff`]{@link InputChannel#event:noteoff}
   *    * [`noteon`]{@link InputChannel#event:noteon}
   *    * [`pitchbend`]{@link InputChannel#event:pitchbend}
   *    * [`programchange`]{@link InputChannel#event:programchange}
   *
   *    Note: you can listen for a specific control change message by using an event name like this:
   *    `controlchange-controller23`, `controlchange-controller99`, `controlchange-controller122`,
   *    etc.
   *
   * **Channel Mode** Events
   *
   *    * [`allnotesoff`]{@link InputChannel#event:allnotesoff}
   *    * [`allsoundoff`]{@link InputChannel#event:allsoundoff}
   *    * [`localcontrol`]{@link InputChannel#event:localcontrol}
   *    * [`monomode`]{@link InputChannel#event:monomode}
   *    * [`omnimode`]{@link InputChannel#event:omnimode}
   *    * [`resetallcontrollers`]{@link InputChannel#event:resetallcontrollers}
   *
   * **NRPN** Events
   *
   *    * [`nrpn`]{@link InputChannel#event:nrpn}
   *    * [`nrpn-dataentrycoarse`]{@link InputChannel#event:nrpn-dataentrycoarse}
   *    * [`nrpn-dataentryfine`]{@link InputChannel#event:nrpn-dataentryfine}
   *    * [`nrpn-databuttonincrement`]{@link InputChannel#event:nrpn-databuttonincrement}
   *    * [`nrpn-databuttondecrement`]{@link InputChannel#event:nrpn-databuttondecrement}
   *
   * **RPN** Events
   *
   *    * [`rpn`]{@link InputChannel#event:rpn}
   *    * [`rpn-dataentrycoarse`]{@link InputChannel#event:rpn-dataentrycoarse}
   *    * [`rpn-dataentryfine`]{@link InputChannel#event:rpn-dataentryfine}
   *    * [`rpn-databuttonincrement`]{@link InputChannel#event:rpn-databuttonincrement}
   *    * [`rpn-databuttondecrement`]{@link InputChannel#event:rpn-databuttondecrement}
   *
   * @param event {string | Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} A callback function to execute when the specified event
   * is detected. This function will receive an event parameter object. For details on this object's
   * properties, check out the documentation for the various events (links above).
   *
   * @param {object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [`arguments`](Listener#arguments) property of
   * the [`Listener`](Listener) object and can be retrieved or modified as desired.
   *
   * @param {object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array and thus be triggered before others.
   *
   * @param {number} [options.remaining=Infinity] The number of times after which the callback
   * should automatically be removed.
   *
   * @returns {Listener} The listener object that was created
   */
  addListener<T extends keyof InputChannelEventMap>(
    e: Symbol | T,
    listener: InputChannelEventMap[T],
    options?: {
      "arguments"?: any[];
      "context"?: any;
      "duration"?: number;
      "prepend"?: boolean;
      "remaining"?: number;
    }
  ): Listener | Listener[];

  /**
   * Adds a one-time event listener that will trigger a function callback when the specified event
   * is dispatched.
   *
   * Here are the events you can listen to:
   *
   * **Channel Voice** Events
   *
   *    * [`channelaftertouch`]{@link InputChannel#event:channelaftertouch}
   *    * [`controlchange`]{@link InputChannel#event:controlchange}
   *      * [`controlchange-controller0`]{@link InputChannel#event:controlchange-controller0}
   *      * [`controlchange-controller1`]{@link InputChannel#event:controlchange-controller1}
   *      * [`controlchange-controller2`]{@link InputChannel#event:controlchange-controller2}
   *      * (...)
   *      * [`controlchange-controller127`]{@link InputChannel#event:controlchange-controller127}
   *    * [`keyaftertouch`]{@link InputChannel#event:keyaftertouch}
   *    * [`noteoff`]{@link InputChannel#event:noteoff}
   *    * [`noteon`]{@link InputChannel#event:noteon}
   *    * [`pitchbend`]{@link InputChannel#event:pitchbend}
   *    * [`programchange`]{@link InputChannel#event:programchange}
   *
   *    Note: you can listen for a specific control change message by using an event name like this:
   *    `controlchange-controller23`, `controlchange-controller99`, `controlchange-controller122`,
   *    etc.
   *
   * **Channel Mode** Events
   *
   *    * [`allnotesoff`]{@link InputChannel#event:allnotesoff}
   *    * [`allsoundoff`]{@link InputChannel#event:allsoundoff}
   *    * [`localcontrol`]{@link InputChannel#event:localcontrol}
   *    * [`monomode`]{@link InputChannel#event:monomode}
   *    * [`omnimode`]{@link InputChannel#event:omnimode}
   *    * [`resetallcontrollers`]{@link InputChannel#event:resetallcontrollers}
   *
   * **NRPN** Events
   *
   *    * [`nrpn`]{@link InputChannel#event:nrpn}
   *    * [`nrpn-dataentrycoarse`]{@link InputChannel#event:nrpn-dataentrycoarse}
   *    * [`nrpn-dataentryfine`]{@link InputChannel#event:nrpn-dataentryfine}
   *    * [`nrpn-databuttonincrement`]{@link InputChannel#event:nrpn-databuttonincrement}
   *    * [`nrpn-databuttondecrement`]{@link InputChannel#event:nrpn-databuttondecrement}
   *
   * **RPN** Events
   *
   *    * [`rpn`]{@link InputChannel#event:rpn}
   *    * [`rpn-dataentrycoarse`]{@link InputChannel#event:rpn-dataentrycoarse}
   *    * [`rpn-dataentryfine`]{@link InputChannel#event:rpn-dataentryfine}
   *    * [`rpn-databuttonincrement`]{@link InputChannel#event:rpn-databuttonincrement}
   *    * [`rpn-databuttondecrement`]{@link InputChannel#event:rpn-databuttondecrement}
   *
   * @param event {string | Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} A callback function to execute when the specified event
   * is detected. This function will receive an event parameter object. For details on this object's
   * properties, check out the documentation for the various events (links above).
   *
   * @param {object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [`arguments`](Listener#arguments) property of
   * the [`Listener`](Listener) object and can be retrieved or modified as desired.
   *
   * @param {object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array and thus be triggered before others.
   *
   * @param {number} [options.remaining=Infinity] The number of times after which the callback
   * should automatically be removed.
   *
   * @returns {Listener} The listener object that was created
   */
   addOneTimeListener<T extends keyof InputChannelEventMap>(
    e: Symbol | T,
    listener: InputChannelEventMap[T],
    options?: {
      "arguments"?: any[];
      "context"?: any;
      "duration"?: number;
      "prepend"?: boolean;
    }
  ): Listener | Listener[];

  /**
   * Destroys the `InputChannel` by removing all listeners and severing the link with the MIDI
   * subsystem's input.
   */
  destroy(): void;

  /**
   * Returns the playing status of the specified note (`true` if the note is currently playing,
   * `false` if it is not). The `note` parameter can be an unsigned integer (0-127), a note
   * identifier (`"C4"`, `"G#5"`, etc.) or a [`Note`]{@link Note} object.
   *
   * IF the note is specified using an integer (0-127), no octave offset will be applied.
   *
   * @param {number|string|Note} note The note to get the state for. The
   * [`octaveOffset`](#octaveOffset) (channel, input and global) will be factored in for note
   * identifiers and [`Note`]{@link Note} objects.
   * @returns {boolean}
   * @since version 3.0.0
   */
  getNoteState(note: number | string | Note): boolean;

  /**
   * Checks if the specified event type is already defined to trigger the specified callback
   * function.
   *
   * @param event {string|Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} The callback function to check for.
   *
   * @param {object} [options={}]
   *
   * @returns {boolean} Boolean value indicating whether or not the `Input` or `InputChannel`
   * already has this listener defined.
   */
  hasListener<T extends keyof InputChannelEventMap>(
    e: Symbol | T,
    listener: InputChannelEventMap[T]
  ): boolean;

  /**
   * Removes the specified listener for the specified event. If no listener is specified, all
   * listeners for the specified event will be removed. If no event is specified, all listeners
   * will be removed.
   *
   * @param [type] {string} The type of the event.
   *
   * @param [listener] {EventEmitterCallback} The callback function to check for.
   *
   * @param {object} [options={}]
   *
   * @param {*} [options.context] Only remove the listeners that have this exact context.
   *
   * @param {number} [options.remaining] Only remove the listener if it has exactly that many
   * remaining times to be executed.
   */
  removeListener<T extends keyof InputChannelEventMap>(
    type?: Symbol | T,
    listener?: InputChannelEventMap[T],
    options?: {
      "channels"?: number | number[];
      "context"?: any;
      "remaining"?: number;
    }
  ): void;

  /**
   * The [`Input`](Input) this channel belongs to.
   * @type {Input}
   * @since 3.0
   */
  get input(): Input;

  /**
   * This channel's MIDI number (1-16).
   * @type {number}
   * @since 3.0
   */
  get number(): number;

  /**
   * An integer to offset the reported octave of incoming note-specific messages (`noteon`,
   * `noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
   * octave (C4).
   *
   * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
   * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
   *
   * Note that this value is combined with the global offset value defined by
   * [`WebMidi.octaveOffset`](WebMidi#octaveOffset) object and with the value defined on the parent
   * input object with [`Input.octaveOffset`](Input#octaveOffset).
   *
   * @type {number}
   *
   * @since 3.0
   */
  set octaveOffset(arg: number);
  get octaveOffset(): number;

}

/**
 * The `Message` class represents a single MIDI message. It has several properties that make it
 * easy to make sense of the binary data it contains.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */
export class Message {

  /**
   * Creates a new `Message` object from raw MIDI data.
   *
   * @param {Uint8Array} data The raw data of the MIDI message as a
   * [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
   * of integers between `0` and `255`.
   */
  constructor(data: Uint8Array);

  /**
   * The MIDI channel number (`1` - `16`) that the message is targeting. This is only for
   * channel-specific messages. For system messages, this will be left `undefined`.
   *
   * @type {number}
   * @readonly
   */
  channel: number;

  /**
   * An integer identifying the MIDI command. For channel-specific messages, the value is 4-bit
   * and will be between `8` and `14`. For system messages, the value will be between `240` and
   * `255`.
   *
   * @type {number}
   * @readonly
   */
  command: number;

  /**
   * An array containing all the bytes of the MIDI message. Each byte is an integer between `0`
   * and `255`.
   *
   * @type {number[]}
   * @readonly
   */
  data: number[];

  /**
   * An array of the the data byte(s) of the MIDI message (as opposed to the status byte). When
   * the message is a system exclusive message (sysex), `dataBytes` explicitly excludes the
   * manufacturer ID and the sysex end byte so only the actual data is included.
   *
   * @type {number[]}
   * @readonly
   */
  dataBytes: number[];

  /**
   * A boolean indicating whether the MIDI message is a channel-specific message.
   *
   * @type {boolean}
   * @readonly
   */
  isChannelMessage: boolean;

  /**
   * A boolean indicating whether the MIDI message is a system message (not specific to a
   * channel).
   *
   * @type {boolean}
   * @readonly
   */
  isSystemMessage: boolean;

  /**
   * When the message is a system exclusive message (sysex), this property contains an array with
   * either 1 or 3 entries that identify the manufacturer targeted by the message.
   *
   * To know how to translate these entries into manufacturer names, check out the official list:
   * https://www.midi.org/specifications-old/item/manufacturer-id-numbers
   *
   * @type {number[]}
   * @readonly
   */
  manufacturerId: number[];

  /**
   * A
   * [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
   * containing the bytes of the MIDI message. Each byte is an integer between `0` and `255`.
   *
   * @type {Uint8Array}
   * @readonly
   */
  rawData: Uint8Array;

  /**
   * A
   * [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
   * of the data byte(s) of the MIDI message. When the message is a system exclusive message
   * (sysex), `rawDataBytes` explicitly excludes the manufacturer ID and the sysex end byte so
   * only the actual data is included.
   *
   * @type {Uint8Array}
   * @readonly
   */
  rawDataBytes: Uint8Array;

  /**
   * The MIDI status byte of the message as an integer between `0` and `255`.
   *
   * @type {number}
   * @readonly
   */
  statusByte: number;

  /**
   * The type of message as a string (`"noteon"`, `"controlchange"`, `"sysex"`, etc.)
   *
   * @type {string}
   * @readonly
   */
  type: string;

}

/**
 * The `Note` class represents a single musical note such as `"D3"`, `"G#4"`, `"F-1"`, `"Gb7"`, etc.
 *
 * `Note` objects can be played back on a single channel by calling
 * [`OutputChannel.playNote()`]{@link OutputChannel#playNote} or, on multiple channels of the same
 * output, by calling [`Output.playNote()`]{@link Output#playNote}.
 *
 * The note has [`attack`](#attack) and [`release`](#release) velocities set at `0.5` by default.
 * These can be changed by passing in the appropriate option. It is also possible to set a
 * system-wide default for attack and release velocities by using the
 * [`WebMidi.defaults`](WebMidi#defaults) property.
 *
 * If you prefer to work with raw MIDI values (`0` to `127`), you can use [`rawAttack`](#rawAttack) and
 * [`rawRelease`](#rawRelease) to both get and set the values.
 *
 * The note may have a [`duration`](#duration). If it does, playback will be automatically stopped
 * when the duration has elapsed by sending a `"noteoff"` event. By default, the duration is set to
 * `Infinity`. In this case, it will never stop playing unless explicitly stopped by calling a
 * method such as [`OutputChannel.stopNote()`]{@link OutputChannel#stopNote},
 * [`Output.stopNote()`]{@link Output#stopNote} or similar.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */
export class Note {

  private _accidental: string;
  private _attack: number;
  private _duration: number;
  private _name: string;
  private _octave: number;
  private _release: number;

  /**
   * Creates a `Note` object.
   *
   * @param value {string|number} The value used to create the note. If an identifier string is used,
   * it must start with the note letter, optionally followed by an accidental and followed by the
   * octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). If a number is used, it must be an
   * integer between 0 and 127. In this case, middle C is considered to be C4 (note number 60).
   *
   * @param {object} [options={}]
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the note should be
   * explicitly stopped.
   *
   * @param {number} [options.attack=0.5] The note's attack velocity as a float between 0 and 1. If
   * you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both
   * `attack` and `rawAttack` are specified, the latter has precedence.
   *
   * @param {number} [options.release=0.5] The note's release velocity as a float between 0 and 1. If
   * you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both
   * `release` and `rawRelease` are specified, the latter has precedence.
   *
   * @param {number} [options.rawAttack=64] The note's attack velocity as an integer between 0 and
   * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
   * `attack` and `rawAttack` are specified, the latter has precedence.
   *
   * @param {number} [options.rawRelease=64] The note's release velocity as an integer between 0 and
   * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
   * `release` and `rawRelease` are specified, the latter has precedence.
   *
   * @throws {Error} Invalid note identifier
   * @throws {RangeError} Invalid name value
   * @throws {RangeError} Invalid accidental value
   * @throws {RangeError} Invalid octave value
   * @throws {RangeError} Invalid duration value
   * @throws {RangeError} Invalid attack value
   * @throws {RangeError} Invalid release value
   */
  constructor(value: string | number, options?: {
    duration?: number;
    attack?: number;
    release?: number;
    rawAttack?: number;
    rawRelease?: number;
  });

  /**
   * Returns a MIDI note number offset by octave and/or semitone. If the calculated value is less
   * than 0, 0 will be returned. If the calculated value is more than 127, 127 will be returned. If
   * an invalid value is supplied, 0 will be used.
   *
   * @param [octaveOffset] {number} An integer to offset the note number by octave.
   * @param [semitoneOffset] {number} An integer to offset the note number by semitone.
   * @returns {number} An integer between 0 and 127
   */
  getOffsetNumber(octaveOffset?: number, semitoneOffset?: number): number;

  /**
   * The accidental (#, ##, b or bb) of the note.
   * @type {string}
   * @since 3.0.0
   */
  get accidental(): string;
  set accidental(arg: string);

  /**
   * The attack velocity of the note as an integer between 0 and 1.
   * @type {number}
   * @since 3.0.0
   */
  set attack(arg: number);
  get attack(): number;

  /**
   * The duration of the note as a positive decimal number representing the number of milliseconds
   * that the note should play for.
   *
   * @type {number}
   * @since 3.0.0
   */
  set duration(arg: number);
  get duration(): number;

  /**
   * The name, optional accidental and octave of the note, as a string.
   * @type {string}
   * @since 3.0.0
   */
  set identifier(arg: string);
  get identifier(): string;

  /**
   * The name (letter) of the note
   * @type {string}
   * @since 3.0.0
   */
  get name(): string;
  set name(arg: string);

  /**
   * The MIDI number of the note (`0` - `127`). This number is derived from the note identifier
   * using C4 as a reference for middle C.
   *
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  get number(): number;

  /**
   * The octave of the note.
   * @type {number}
   * @since 3.0.0
   */
  get octave(): number;
  set octave(arg: number);

  /**
   * The attack velocity of the note as a positive integer between 0 and 127.
   * @type {number}
   * @since 3.0.0
   */
  get rawAttack(): number;
  set rawAttack(arg: number);

  /**
   * The release velocity of the note as a positive integer between 0 and 127.
   * @type {number}
   * @since 3.0.0
   */
  get rawRelease(): number;
  set rawRelease(arg: number);

  /**
   * The release velocity of the note as an integer between 0 and 1.
   * @type {number}
   * @since 3.0.0
   */
  set release(arg: number);
  get release(): number;

}

/**
 * The `Output` class represents a single MIDI output port (not to be confused with a MIDI channel).
 * A port is made available by a MIDI device. A MIDI device can advertise several input and output
 * ports. Each port has 16 MIDI channels which can be accessed via the [`channels`](#channels)
 * property.
 *
 * The `Output` object is automatically instantiated by the library according to the host's MIDI
 * subsystem and should not be directly instantiated.
 *
 * You can access all available `Output` objects by referring to the
 * [`WebMidi.outputs`](WebMidi#outputs) array or by using methods such as
 * [`WebMidi.getOutputByName()`](WebMidi#getOutputByName) or
 * [`WebMidi.getOutputById()`](WebMidi#getOutputById).
 *
 * @fires Output#opened
 * @fires Output#disconnected
 * @fires Output#closed
 *
 * @extends EventEmitter
 * @license Apache-2.0
 */
export class Output extends EventEmitter {

  /**
   * Creates an `Output` object.
   *
   * @param {WebMidi.MIDIOutput} midiOutput [`MIDIOutput`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIOutput)
   * object as provided by the MIDI subsystem.
   */
  constructor(midiOutput: WebMidi.MIDIOutput);

  private _midiOutput;
  private _octaveOffset;
  private _onStateChange;

  /**
   * Array containing the 16 [`OutputChannel`]{@link OutputChannel} objects available provided by
   * this `Output`. The channels are numbered 1 through 16.
   *
   * @type {OutputChannel[]}
   */
  channels: OutputChannel[];

  /**
   * Adds an event listener that will trigger a function callback when the specified event is
   * dispatched.
   *
   * Here are the events you can listen to: closed, disconnected, open.
   *
   * @param event {string | Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} A callback function to execute when the specified event
   * is detected. This function will receive an event parameter object. For details on this object's
   * properties, check out the documentation for the various events (links above).
   *
   * @param {object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [`arguments`](Listener#arguments) property of
   * the [`Listener`](Listener) object and can be retrieved or modified as desired.
   *
   * @param {object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array and thus be triggered before others.
   *
   * @param {number} [options.remaining=Infinity] The number of times after which the callback
   * should automatically be removed.
   *
   * @returns {Listener} The listener object that was created
   */
  addListener<T extends keyof OutputEventMap>(
    e: Symbol | T,
    listener: OutputEventMap[T],
    options?: {
      "arguments"?: any[];
      "context"?: any;
      "duration"?: number;
      "prepend"?: boolean;
      "remaining"?: number;
    }
  ): Listener | Listener[];

  /**
   * Adds a one-time event listener that will trigger a function callback when the specified event
   * is dispatched.
   *
   * Here are the events you can listen to: closed, disconnected, open.
   *
   * @param event {string | Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} A callback function to execute when the specified event
   * is detected. This function will receive an event parameter object. For details on this object's
   * properties, check out the documentation for the various events (links above).
   *
   * @param {object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [`arguments`](Listener#arguments) property of
   * the [`Listener`](Listener) object and can be retrieved or modified as desired.
   *
   * @param {object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array and thus be triggered before others.
   *
   * @returns {Listener} The listener object that was created
   */
  addOneTimeListener<T extends keyof OutputEventMap>(
    e: Symbol | T,
    listener: OutputEventMap[T],
    options?: {
      "arguments"?: any[];
      "context"?: any;
      "duration"?: number;
      "prepend"?: boolean;
    }
  ): Listener | Listener[];

  /**
   * Clears all messages that have been queued but not yet delivered.
   *
   * **Warning**: this method has been defined in the specification but has not been implemented
   * yet. As soon as browsers implement it, it will work.
   *
   * You can check out the current status of this feature for Chromium (Chrome) here:
   * https://bugs.chromium.org/p/chromium/issues/detail?id=471798
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  clear(): Output;

  /**
   * Closes the output connection. When an output is closed, it cannot be used to send MIDI messages
   * until the output is opened again by calling [`open()`]{@link #open}. You can check
   * the connection status by looking at the [`connection`]{@link #connection} property.
   *
   * @returns {Promise<void>}
   */
  close(): Promise<void>;

  /**
   * Destroys the `Output`. All listeners are removed, all channels are destroyed and the MIDI
   * subsystem is unlinked.
   * @returns {Promise<void>}
   */
  destroy(): Promise<void>;

  /**
   * Checks if the specified event type is already defined to trigger the specified callback
   * function.
   *
   * @param event {string|Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} The callback function to check for.
   *
   * @param {object} [options={}]
   *
   * @returns {boolean} Boolean value indicating whether or not the `Input` or `InputChannel`
   * already has this listener defined.
   */
  hasListener<T extends keyof OutputEventMap>(
    e: Symbol | T,
    listener: OutputEventMap[T]
  ): boolean;

  /**
   * Opens the output for usage. When the library is enabled, all ports are automatically opened.
   * This method is only useful for ports that have been manually closed.
   *
   * @returns {Promise<Output>} The promise is fulfilled with the `Output` object.
   */
  open(): Promise<Output>;

  /**
   * Plays a note or an array of notes on one or more channels of this output. If you intend to play
   * notes on a single channel, you should probably use
   * [`OutputChannel.playNote()`](OutputChannel#playNote) instead.
   *
   * The first parameter is the note to play. It can be a single value or an array of the following
   * valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A [`Note`]{@link Note} object
   *
   * The `playNote()` method sends a **note on** MIDI message for all specified notes on all
   * specified channels. If no channel is specified, it will send to all channels. If a `duration`
   * is set in the `options` parameter or in the [`Note`]{@link Note} object's
   * [`duration`]{@link Note#duration} property, it will also schedule a **note off** message to end
   * the note after said duration. If no `duration` is set, the note will simply play until a
   * matching **note off** message is sent with [`stopNote()`]{@link #stopNote}.
   *
   * The execution of the **note on** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * When using [`Note`]{@link Note} objects, the durations and velocities defined in the
   * [`Note`]{@link Note} objects have precedence over the ones specified via the method's `options`
   * parameter.
   *
   * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
   * functionally equivalent to a **note off** message.
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
   * specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a
   * [`Note`]{@link Note} object or an array of the previous types. When using a note identifier,
   * octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number `0`) and the
   * highest note is G9 (MIDI note number `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number} [options.duration=undefined] The number of milliseconds after which a
   * **note off** message will be scheduled. If left undefined, only a **note on** message is sent.
   *
   * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
   * `1`). If the `rawAttack` option is also defined, it will have priority. An invalid velocity
   * value will silently trigger the default of `0.5`.
   *
   * @param {number} [options.rawAttack=64] The attack velocity at which to play the note (between
   * `0` and `127`). This has priority over the `attack` property. An invalid velocity value will
   * silently trigger the default of 64.
   *
   * @param {number} [options.release=0.5] The velocity at which to release the note (between `0`
   * and `1`). If the `rawRelease` option is also defined, it will have priority. An invalid
   * velocity value will silently trigger the default of `0.5`. This is only used with the
   * **note off** event triggered when `options.duration` is set.
   *
   * @param {number} [options.rawRelease=64] The velocity at which to release the note (between `0`
   * and `127`). This has priority over the `release` property. An invalid velocity value will
   * silently trigger the default of 64. This is only used with the **note off** event triggered
   * when `options.duration` is set.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  playNote(note: number | string | Note | number[] | string[] | Note[], options?: {
    channels?: number | number[];
    duration?: number;
    attack?: number;
    rawAttack?: number;
    release?: number;
    rawRelease?: number;
    time?: number | string;
  }): Output;

  /**
   * Removes the specified listener for the specified event. If no listener is specified, all
   * listeners for the specified event will be removed.
   *
   * @param [type] {string} The type of the event.
   *
   * @param [listener] {EventEmitterCallback} The callback function to check for.
   *
   * @param {object} [options={}]
   *
   * @param {*} [options.context] Only remove the listeners that have this exact context.
   *
   * @param {number} [options.remaining] Only remove the listener if it has exactly that many
   * remaining times to be executed.
   */
  removeListener<T extends keyof OutputEventMap>(
    type?: Symbol | T,
    listener?: OutputEventMap[T],
    options?: {
      "context"?: any;
      "remaining"?: number;
    }
  ): void;

  /**
   * Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
   * sent immediately. The message should be an array of 8 bit unsigned integers (0-225), a
   * [`Uint8Array`]{@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array}
   * object or a [`Message`](Message) object.
   *
   * It is usually not necessary to use this method directly as you can use one of the simpler
   * helper methods such as [`playNote()`](#playNote), [`stopNote()`](#stopNote),
   * [`sendControlChange()`](#sendControlChange), etc.
   *
   * Details on the format of MIDI messages are available in the summary of
   * [MIDI messages]{@link https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message}
   * from the MIDI Manufacturers Association.
   *
   * @param message {number[]|Uint8Array|Message} An array of 8bit unsigned integers, a `Uint8Array`
   * object (not available in Node.js) containing the message bytes or a `Message` object.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The first byte (status) must be an integer between 128 and 255.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @license Apache-2.0
   */
  send(message: number[] | Uint8Array | Message, options?: {
    time?: number | string;
  }, legacy?: number): Output;

  /**
   * Sends a MIDI [**system exclusive**]{@link
    * https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages}
   * (*sysex*) message. The `data` parameter should only contain the data of the message. When
   * sending out the actual MIDI message, WEBMIDI.js will automatically prepend the data with the
   * **sysex byte** (`0xF0`) and the manufacturer ID byte(s). It will also automatically terminate
   * the message with the **sysex end byte** (`0xF7`).
   *
   * The data can be an array of unsigned integers (`0` - `127`) or a `Uint8Array` object.
   *
   * To use the `sendSysex()` method, system exclusive message support must have been enabled. To
   * do so, you must set the `sysex` option to `true` when calling
   * [`WebMidi.enable()`]{@link WebMidi#enable}:
   *
   * ```js
   * WebMidi.enable({sysex: true})
   *   .then(() => console.log("System exclusive messages are enabled");
   * ```
   *
   * ##### Examples
   *
   * If you want to send a sysex message to a Korg device connected to the first output, you would
   * use the following code:
   *
   * ```js
   * WebMidi.outputs[0].sendSysex(0x42, [0x1, 0x2, 0x3, 0x4, 0x5]);
   * ```
   * In this case `0x42` is the ID of the manufacturer (Korg) and `[0x1, 0x2, 0x3, 0x4, 0x5]` is the
   * data being sent.
   *
   * The parameters can be specified using any number notation (decimal, hex, binary, etc.).
   * Therefore, the code above is equivalent to this code:
   *
   * ```js
   * WebMidi.outputs[0].sendSysex(66, [1, 2, 3, 4, 5]);
   * ```
   *
   * Some manufacturers are identified using 3 bytes. In this case, you would use a 3-position array
   * as the first parameter. For example, to send the same sysex message to a
   * *Native Instruments* device:
   *
   * ```js
   * WebMidi.outputs[0].sendSysex([0x00, 0x21, 0x09], [0x1, 0x2, 0x3, 0x4, 0x5]);
   * ```
   *
   * The **MIDI Manufacturers Association** is in charge of maintaining the full updated list of
   * [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers).
   *
   * There is no limit for the length of the data array. However, it is generally suggested to keep
   * system exclusive messages to 64Kb or less.
   *
   * @param manufacturer {number|number[]} An unsigned integer or an array of three unsigned
   * integers between `0` and `127` that identify the targeted manufacturer. The *MIDI Manufacturers
   * Association* maintains a full list of
   * [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers).
   *
   * @param {number[]|Uint8Array} [data=[]] A `Uint8Array` or an array of unsigned integers between
   * `0` and `127`. This is the data you wish to transfer.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {DOMException} Failed to execute 'send' on 'MIDIOutput': System exclusive message is
   * not allowed.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index x is greater
   * than 0xFF.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendSysex(manufacturer: number | number[], data?: number[] | Uint8Array, options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends a MIDI **timecode quarter frame** message. Please note that no processing is being done
   * on the data. It is up to the developer to format the data according to the
   * [MIDI Timecode](https://en.wikipedia.org/wiki/MIDI_timecode) format.
   *
   * @param value {number} The quarter frame message content (integer between 0 and 127).
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendTimecodeQuarterFrame(value: number, options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends a **song position** MIDI message. The value is expressed in MIDI beats (between `0` and
   * `16383`) which are 16th note. Position `0` is always the start of the song.
   *
   * @param {number} [value=0] The MIDI beat to cue to (integer between `0` and `16383`).
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendSongPosition(value?: number, options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends a **song select** MIDI message.
   *
   * @param {number} [value=0] The number of the song to select (integer between `0` and `127`).
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws The song number must be between 0 and 127.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendSongSelect(value?: number, options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends a MIDI **tune request** real-time message.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendTuneRequest(options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends a MIDI **clock** real-time message. According to the standard, there are 24 MIDI clocks
   * for every quarter note.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendClock(options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends a **start** real-time message. A MIDI Start message starts the playback of the current
   * song at beat 0. To start playback elsewhere in the song, use the
   * [`sendContinue()`]{@link #sendContinue} method.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendStart(options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends a **continue** real-time message. This resumes song playback where it was previously
   * stopped or where it was last cued with a song position message. To start playback from the
   * start, use the [`sendStart()`]{@link Output#sendStart}` method.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendContinue(options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends a **stop** real-time message. This tells the device connected to this output to stop
   * playback immediately (or at the scheduled time, if specified).
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendStop(options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends an **active sensing** real-time message. This tells the device connected to this port
   * that the connection is still good. Active sensing messages are often sent every 300 ms if there
   * was no other activity on the MIDI port.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendActiveSensing(options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends a **reset** real-time message. This tells the device connected to this output that it
   * should reset itself to a default state.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendReset(options?: {
    time?: number | string;
  }): Output;

  /**
   * Sends a MIDI **key aftertouch** message to the specified channel(s) at the scheduled time. This
   * is a key-specific aftertouch. For a channel-wide aftertouch message, use
   * [`setChannelAftertouch()`]{@link #setChannelAftertouch}.
   *
   * @param note {number|Note|string|number[]|Note[]|string[]} The note(s) for which you are sending
   * an aftertouch value. The notes can be specified by using a MIDI note number (`0` - `127`), a
   * [`Note`](Note) object, a note identifier (e.g. `C3`, `G#4`, `F-1`, `Db7`) or an array of the
   * previous types. When using a note identifier, octave range must be between `-1` and `9`. The
   * lowest note is `C-1` (MIDI note number `0`) and the highest note is `G9` (MIDI note number
   * `127`).
   *
   * @param [pressure=0.5] {number} The pressure level (between 0 and 1). An invalid pressure value
   * will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the
   * pressure can be defined by using an integer between 0 and 127.
   *
   * @param {object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered a float between `0` and `1.0` (default) or a raw integer between `0` and `127`.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendKeyAftertouch(note: number | Note | string | number[] | Note[] | string[], pressure?: number, options?: {
    channels?: number | number[];
    rawValue?: boolean;
    time?: number | string;
  }): Output;

  /**
   * Sends a MIDI **control change** message to the specified channel(s) at the scheduled time. The
   * control change message to send can be specified numerically (0-127) or by using one of the
   * following common names:
   *
   * | Number | Name                          |
   * |--------|-------------------------------|
   * | 0      |`bankselectcoarse`             |
   * | 1      |`modulationwheelcoarse`        |
   * | 2      |`breathcontrollercoarse`       |
   * | 4      |`footcontrollercoarse`         |
   * | 5      |`portamentotimecoarse`         |
   * | 6      |`dataentrycoarse`              |
   * | 7      |`volumecoarse`                 |
   * | 8      |`balancecoarse`                |
   * | 10     |`pancoarse`                    |
   * | 11     |`expressioncoarse`             |
   * | 12     |`effectcontrol1coarse`         |
   * | 13     |`effectcontrol2coarse`         |
   * | 18     |`generalpurposeslider3`        |
   * | 19     |`generalpurposeslider4`        |
   * | 32     |`bankselectfine`               |
   * | 33     |`modulationwheelfine`          |
   * | 34     |`breathcontrollerfine`         |
   * | 36     |`footcontrollerfine`           |
   * | 37     |`portamentotimefine`           |
   * | 38     |`dataentryfine`                |
   * | 39     |`volumefine`                   |
   * | 40     |`balancefine`                  |
   * | 42     |`panfine`                      |
   * | 43     |`expressionfine`               |
   * | 44     |`effectcontrol1fine`           |
   * | 45     |`effectcontrol2fine`           |
   * | 64     |`holdpedal`                    |
   * | 65     |`portamento`                   |
   * | 66     |`sustenutopedal`               |
   * | 67     |`softpedal`                    |
   * | 68     |`legatopedal`                  |
   * | 69     |`hold2pedal`                   |
   * | 70     |`soundvariation`               |
   * | 71     |`resonance`                    |
   * | 72     |`soundreleasetime`             |
   * | 73     |`soundattacktime`              |
   * | 74     |`brightness`                   |
   * | 75     |`soundcontrol6`                |
   * | 76     |`soundcontrol7`                |
   * | 77     |`soundcontrol8`                |
   * | 78     |`soundcontrol9`                |
   * | 79     |`soundcontrol10`               |
   * | 80     |`generalpurposebutton1`        |
   * | 81     |`generalpurposebutton2`        |
   * | 82     |`generalpurposebutton3`        |
   * | 83     |`generalpurposebutton4`        |
   * | 91     |`reverblevel`                  |
   * | 92     |`tremololevel`                 |
   * | 93     |`choruslevel`                  |
   * | 94     |`celestelevel`                 |
   * | 95     |`phaserlevel`                  |
   * | 96     |`databuttonincrement`          |
   * | 97     |`databuttondecrement`          |
   * | 98     |`nonregisteredparametercoarse` |
   * | 99     |`nonregisteredparameterfine`   |
   * | 100    |`registeredparametercoarse`    |
   * | 101    |`registeredparameterfine`      |
   * | 120    |`allsoundoff`                  |
   * | 121    |`resetallcontrollers`          |
   * | 122    |`localcontrol`                 |
   * | 123    |`allnotesoff`                  |
   * | 124    |`omnimodeoff`                  |
   * | 125    |`omnimodeon`                   |
   * | 126    |`monomodeon`                   |
   * | 127    |`polymodeon`                   |
   *
   * Note: as you can see above, not all control change message have a matching name. This does not
   * mean you cannot use the others. It simply means you will need to use their number (`0` - `127`)
   * instead of their name. While you can still use them, numbers `120` to `127` are usually
   * reserved for *channel mode* messages. See [`sendChannelMode()`]{@link #sendChannelMode} method
   * for more info.
   *
   * To view a list of all available **control change** messages, please consult [Table 3 - Control
   * Change Messages](https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
   * from the MIDI specification.
   *
   * @param controller {number|string} The MIDI controller name or number (0-127).
   *
   * @param [value=0] {number} The value to send (0-127).
   *
   * @param {object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} Controller numbers must be between 0 and 127.
   * @throws {RangeError} Invalid controller name.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  sendControlChange(controller: number | string, value?: number, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sends a **pitch bend range** message to the specified channel(s) at the scheduled time so that
   * they adjust the range used by their pitch bend lever. The range is specified by using the
   * `semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
   * means that the pitch bend range will be 12 semitones above and below the nominal pitch.
   *
   * @param {number} [semitones=0] The desired adjustment value in semitones (between `0` and `127`).
   * While nothing imposes that in the specification, it is very common for manufacturers to limit
   * the range to 2 octaves (-12 semitones to 12 semitones).
   *
   * @param {number} [cents=0] The desired adjustment value in cents (integer between `0` and
   * `127`).
   *
   * @param {object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The msb value must be between 0 and 127.
   * @throws {RangeError} The lsb value must be between 0 and 127.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendPitchBendRange(semitones?: number, cents?: number, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sets the specified MIDI registered parameter to the desired value. The value is defined with
   * up to two bytes of data (msb, lsb) that each can go from `0` to `127`.
   *
   * MIDI
   * [registered parameters](https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
   * extend the original list of control change messages. The MIDI 1.0 specification lists only a
   * limited number of them:
   *
   * | Numbers      | Function                 |
   * |--------------|--------------------------|
   * | (0x00, 0x00) | `pitchbendrange`         |
   * | (0x00, 0x01) | `channelfinetuning`      |
   * | (0x00, 0x02) | `channelcoarsetuning`    |
   * | (0x00, 0x03) | `tuningprogram`          |
   * | (0x00, 0x04) | `tuningbank`             |
   * | (0x00, 0x05) | `modulationrange`        |
   * | (0x3D, 0x00) | `azimuthangle`           |
   * | (0x3D, 0x01) | `elevationangle`         |
   * | (0x3D, 0x02) | `gain`                   |
   * | (0x3D, 0x03) | `distanceratio`          |
   * | (0x3D, 0x04) | `maximumdistance`        |
   * | (0x3D, 0x05) | `maximumdistancegain`    |
   * | (0x3D, 0x06) | `referencedistanceratio` |
   * | (0x3D, 0x07) | `panspreadangle`         |
   * | (0x3D, 0x08) | `rollangle`              |
   *
   * Note that the `tuningprogram` and `tuningbank` parameters are part of the *MIDI Tuning
   * Standard*, which is not widely implemented.
   *
   * @param parameter {string|number[]} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the
   * registered parameter.
   *
   * @param [data=[]] {number|number[]} A single integer or an array of integers with a maximum
   * length of 2 specifying the desired data.
   *
   * @param {object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendRpnValue(parameter: string | number[], data?: number | number[], options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sends a MIDI **channel aftertouch** message to the specified channel(s). For key-specific
   * aftertouch, you should instead use [`setKeyAftertouch()`]{@link #setKeyAftertouch}.
   *
   * @param [pressure=0.5] {number} The pressure level (between `0` and `1`). An invalid pressure
   * value will silently trigger the default behaviour. If the `rawValue` option is set to `true`,
   * the pressure can be defined by using an integer between `0` and `127`.
   *
   * @param {object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered a float between `0` and `1.0` (default) or a raw integer between `0` and `127`.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   * @since 3.0.0
   */
  sendChannelAftertouch(pressure?: number, options?: {
    channels?: number | number[];
    rawValue?: boolean;
    time?: number | string;
  }): Output;

  /**
   * Sends a MIDI **pitch bend** message to the specified channel(s) at the scheduled time.
   *
   * The resulting bend is relative to the pitch bend range that has been defined. The range can be
   * set with [`sendPitchBendRange()`]{@link #sendPitchBendRange}. So, for example, if the pitch
   * bend range has been set to 12 semitones, using a bend value of `-1` will bend the note 1 octave
   * below its nominal value.
   *
   * @param {number|number[]} value The intensity of the bend (between `-1.0` and `1.0`). A value of
   * `0` means no bend. If an invalid value is specified, the nearest valid value will be used
   * instead. If the `rawValue` option is set to `true`, the intensity of the bend can be defined by
   * either using a single integer between `0` and `127` (MSB) or an array of two integers between
   * `0` and `127` representing, respectively, the MSB (most significant byte) and the LSB (least
   * significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower
   * than `64` bends downwards while a value higher than `64` bends upwards. The LSB is expressed
   * in cents (1/100 of a semitone). An LSB of `64` also means no bend.
   *
   * @param {object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered as a float between `-1.0` and `1.0` (default) or as raw integer between `0` and
   * 127` (or an array of 2 integers if using both MSB and LSB).
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendPitchBend(value: number | number[], options?: {
    channels?: number | number[];
    rawValue?: boolean;
    time?: number | string;
  }): Output;

  /**
   * Sends a MIDI **program change** message to the specified channel(s) at the scheduled time.
   *
   * @param {number} [program=0] The MIDI patch (program) number (integer between `0` and `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
   * than 0xFF.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendProgramChange(program?: number, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sends a **modulation depth range** message to the specified channel(s) so that they adjust the
   * depth of their modulation wheel's range. The range can be specified with the `semitones`
   * parameter, the `cents` parameter or by specifying both parameters at the same time.
   *
   * @param [semitones=0] {number} The desired adjustment value in semitones (integer between
   * 0 and 127).
   *
   * @param [cents=0] {number} The desired adjustment value in cents (integer between 0 and 127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The msb value must be between 0 and 127
   * @throws {RangeError} The lsb value must be between 0 and 127
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendModulationRange(semitones?: number, cents?: number, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sends a master tuning message to the specified channel(s). The value is decimal and must be
   * larger than `-65` semitones and smaller than `64` semitones.
   *
   * Because of the way the MIDI specification works, the decimal portion of the value will be
   * encoded with a resolution of 14bit. The integer portion must be between -64 and 63
   * inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
   * a **Master Fine Tuning** RPN messages.
   *
   * @param [value=0.0] {number} The desired decimal adjustment value in semitones (-65 < x < 64)
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The value must be a decimal number between larger than -65 and smaller
   * than 64.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendMasterTuning(value?: number, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * @param value {number} The desired tuning program (integer between `0` and `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The program value must be between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendTuningProgram(value: number, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * @param {number} [value=0] The desired tuning bank (integer between `0` and `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The bank value must be between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendTuningBank(value?: number, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sends a MIDI **channel mode** message to the specified channel(s). The channel mode message to
   * send can be specified numerically or by using one of the following common names:
   *
   * |  Type                |Number| Shortcut Method                                               |
   * | ---------------------|------|-------------------------------------------------------------- |
   * | `allsoundoff`        | 120  | [`sendAllSoundOff()`]{@link #sendAllSoundOff}                 |
   * | `resetallcontrollers`| 121  | [`sendResetAllControllers()`]{@link #sendResetAllControllers} |
   * | `localcontrol`       | 122  | [`sendLocalControl()`]{@link #sendLocalControl}               |
   * | `allnotesoff`        | 123  | [`sendAllNotesOff()`]{@link #sendAllNotesOff}                 |
   * | `omnimodeoff`        | 124  | [`sendOmniMode(false)`]{@link #sendOmniMode}                  |
   * | `omnimodeon`         | 125  | [`sendOmniMode(true)`]{@link #sendOmniMode}                   |
   * | `monomodeon`         | 126  | [`sendPolyphonicMode("mono")`]{@link #sendPolyphonicMode}     |
   * | `polymodeon`         | 127  | [`sendPolyphonicMode("poly")`]{@link #sendPolyphonicMode}     |
   *
   * Note: as you can see above, to make it easier, all channel mode messages also have a matching
   * helper method.
   *
   * It should also be noted that, per the MIDI specification, only `localcontrol` and `monomodeon`
   * may require a value that's not zero. For that reason, the `value` parameter is optional and
   * defaults to 0.
   *
   * @param {number|string} command The numerical identifier of the channel mode message (integer
   * between 120-127) or its name as a string.
   *
   * @param {number} [value=0] The value to send (integer between 0-127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {TypeError} Invalid channel mode message name.
   * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
   * @throws {RangeError} Value must be an integer between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   */
  sendChannelMode(command: number | string, value?: number, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sends an **all sound off** channel mode message. This will silence all sounds playing on that
   * channel but will not prevent new sounds from being triggered.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output}
   *
   * @since 3.0.0
   */
  sendAllSoundOff(options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sends an **all notes off** channel mode message. This will make all currently playing notes
   * fade out just as if their key had been released. This is different from the
   * [`turnSoundOff()`]{@link #turnSoundOff} method which mutes all sounds immediately.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output}
   *
   * @since 3.0.0
   */
  sendAllNotesOff(options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sends a **reset all controllers** channel mode message. This resets all controllers, such as
   * the pitch bend, to their default value.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output}
   */
  sendResetAllControllers(options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sets the polyphonic mode. In `poly` mode (usually the default), multiple notes can be played
   * and heard at the same time. In `mono` mode, only one note will be heard at once even if
   * multiple notes are being played.
   *
   * @param mode {string} The mode to use: `mono` or `poly`.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendPolyphonicMode(mode: string, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Turns local control on or off. Local control is usually enabled by default. If you disable it,
   * the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
   * its out port.
   *
   * @param [state=false] {boolean} Whether to activate local control (`true`) or disable it
   * (`false`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendLocalControl(state?: boolean, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sets OMNI mode to **on** or **off** for the specified channel(s). MIDI's OMNI mode causes the
   * instrument to respond to messages from all channels.
   *
   * It should be noted that support for OMNI mode is not as common as it used to be.
   *
   * @param [state] {boolean} Whether to activate OMNI mode (`true`) or not (`false`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {TypeError} Invalid channel mode message name.
   * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
   * @throws {RangeError} Value must be an integer between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendOmniMode(state?: boolean, options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sets a non-registered parameter to the specified value. The NRPN is selected by passing a
   * two-position array specifying the values of the two control bytes. The value is specified by
   * passing a single integer (most cases) or an array of two integers.
   *
   * NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
   * they see fit. For example, according to the Roland GS specification, you can control the
   * **vibrato rate** using NRPN (`1`, `8`). Therefore, to set the **vibrato rate** value to `123`
   * you would use:
   *
   * ```js
   * WebMidi.outputs[0].sendNrpnValue([1, 8], 123);
   * ```
   *
   * You probably want to should select a channel so the message is not sent to all channels. For
   * instance, to send to channel `1` of the first output port, you would use:
   *
   * ```js
   * WebMidi.outputs[0].sendNrpnValue([1, 8], 123, 1);
   * ```
   *
   * In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
   * would use a 2-position array. For example, for its **ClockBPM** parameter (`2`, `63`), Novation
   * uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
   * value to send was `10`, you could use:
   *
   * ```js
   * WebMidi.outputs[0].sendNrpnValue([2, 63], [0, 10], 1);
   * ```
   *
   * For further implementation details, refer to the manufacturer's documentation.
   *
   * @param parameter {number[]} A two-position array specifying the two control bytes (`0x63`,
   * `0x62`) that identify the non-registered parameter.
   *
   * @param [data=[]] {number|number[]} An integer or an array of integers with a length of 1 or 2
   * specifying the desired data.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The control value must be between 0 and 127.
   * @throws {RangeError} The msb value must be between 0 and 127
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendNrpnValue(parameter: number[], data?: number | number[], options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Increments the specified MIDI registered parameter by 1. Here is the full list of parameter
   * names that can be used with this method:
   *
   *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
   *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
   *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
   *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
   *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
   *  * Modulation Range (0x00, 0x05): `"modulationrange"`
   *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
   *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
   *  * Gain (0x3D, 0x02): `"gain"`
   *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
   *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
   *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
   *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
   *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
   *  * Roll Angle (0x3D, 0x08): `"rollangle"`
   *
   * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendRpnIncrement(parameter: string | number[], options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Decrements the specified MIDI registered parameter by 1. Here is the full list of parameter
   * names that can be used with this method:
   *
   *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
   *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
   *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
   *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
   *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
   *  * Modulation Range (0x00, 0x05): `"modulationrange"`
   *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
   *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
   *  * Gain (0x3D, 0x02): `"gain"`
   *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
   *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
   *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
   *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
   *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
   *  * Roll Angle (0x3D, 0x08): `"rollangle"`
   *
   * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws TypeError The specified parameter is not available.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendRpnDecrement(parameter: string | number[], options?: {
    channels?: number | number[];
    time?: number | string;
  }): Output;

  /**
   * Sends a **note off** message for the specified MIDI note number on the specified channel(s).
   * The first parameter is the note to stop. It can be a single value or an array of the following
   * valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A [`Note`](Note) object
   *
   * The execution of the **note off** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * @param note {number|Note|string|number[]|Note[]|string[]} The note(s) to stop. The notes can be
   * specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`,
   * `F-1`, `Db7`) or an array of the previous types. When using a note identifier, octave range
   * must be between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest
   * note is `G9` (MIDI note number `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number} [options.release=0.5] The velocity at which to release the note
   * (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have
   * priority. An invalid velocity value will silently trigger the default of `0.5`.
   *
   * @param {number} [options.rawRelease=64] The velocity at which to release the note
   * (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have
   * priority. An invalid velocity value will silently trigger the default of `64`.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendNoteOff(note: number | Note | string | number[] | Note[] | string[], options?: {
    channels?: number | number[];
    release?: number;
    rawRelease?: number;
    time?: number | string;
  }): Output;

  /**
   * Sends a **note off** message for the specified MIDI note number on the specified channel(s).
   * The first parameter is the note to stop. It can be a single value or an array of the following
   * valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A [`Note`](Note) object
   *
   * The execution of the **note off** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * @param note {number|Note|string|number[]|Note[]|string[]} The note(s) to stop. The notes can be
   * specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`, `F-1`,
   * `Db7`) or an array of the previous types. When using a note identifier, octave range must be
   * between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest note is
   * `G9` (MIDI note number `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number} [options.release=0.5] The velocity at which to release the note
   * (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have
   * priority. An invalid velocity value will silently trigger the default of `0.5`.
   *
   * @param {number} [options.rawRelease=64] The velocity at which to release the note
   * (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have
   * priority. An invalid velocity value will silently trigger the default of `64`.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  stopNote(note: number | Note | string | number[] | Note[] | string[], options?: {
    channels?: number | number[];
    release?: number;
    rawRelease?: number;
    time?: number | string;
  }): Output;



  /**
   * Sends a **note on** message for the specified MIDI note number on the specified channel(s). The
   * first parameter is the number. It can be a single value or an array of the following valid
   * values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A [`Note`](Note) object
   *
   *  The execution of the **note on** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
   * functionally equivalent to a **note off** message.
   *
   * @param note {number|Note|string|number[]|Note[]|string[]} The note(s) to stop. The notes can be
   * specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`, `F-1`,
   * `Db7`) or an array of the previous types. When using a note identifier, octave range must be
   * between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest note is
   * `G9` (MIDI note number `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
   * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
   * channel is specified, all channels will be used.
   *
   * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
   * `1`).  If the `rawAttack` option is also defined, `rawAttack` will have priority. An invalid
   * velocity value will silently trigger the default of `0.5`.
   *
   * @param {number} [options.rawAttack=64] The velocity at which to release the note (between `0`
   * and `127`). If the `attack` option is also defined, `rawAttack` will have priority. An invalid
   * velocity value will silently trigger the default of `64`.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendNoteOn(note: number | Note | string | number[] | Note[] | string[], options?: {
    channels?: number | number[];
    attack?: number;
    rawAttack?: number;
    time?: number | string;
  }): Output;

  /**
   * Output port's connection state: `pending`, `open` or `closed`.
   *
   * @type {string}
   * @readonly
   */
  get connection(): string;

  /**
   * ID string of the MIDI output. The ID is host-specific. Do not expect the same ID on different
   * platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
   * the same port.
   *
   * @type {string}
   * @readonly
   */
  get id(): string;

  /**
   * Name of the manufacturer of the device that makes this output port available.
   *
   * @type {string}
   * @readonly
   */
  get manufacturer(): string;

  /**
   * Name of the MIDI output.
   *
   * @type {string}
   * @readonly
   */
  get name(): string;

  /**
   * An integer to offset the octave of outgoing notes. By default, middle C (MIDI note number 60)
   * is placed on the 4th octave (C4).
   *
   * Note that this value is combined with the global offset value defined in
   * [`WebMidi.octaveOffset`](WebMidi#octaveOffset) (if any).
   *
   * @type {number}
   *
   * @since 3.0
   */
  set octaveOffset(arg: number);
  get octaveOffset(): number;

  /**
   * State of the output port: `connected` or `disconnected`.
   *
   * @type {string}
   * @readonly
   */
  get state(): string;

  /**
   * Type of the output port (it will always be: `output`).
   *
   * @type {string}
   * @readonly
   */
  get type(): string;

}

/**
 * The `OutputChannel` class represents a single output MIDI channel. `OutputChannel` objects are
 * provided by an [`Output`](Output) port which, itself, is made available by a device. The
 * `OutputChannel` object is derived from the host's MIDI subsystem and should not be instantiated
 * directly.
 *
 * All 16 `OutputChannel` objects can be found inside the parent output's
 * [`channels`]{@link Output#channels} property.
 *
 * @param {Output} output The [`Output`](Output) this channel belongs to.
 * @param {number} number The MIDI channel number (`1` - `16`).
 *
 * @extends EventEmitter
 * @license Apache-2.0
 * @since 3.0.0
 */
export class OutputChannel extends EventEmitter {

  /**
   * Creates an `OutputChannel` object.
   *
   * @param {Output} output The [`Output`](Output) this channel belongs to.
   * @param {number} number The MIDI channel number (`1` - `16`).
   */
  constructor(output: Output, number: number);

  private _output;
  private _number;
  private _octaveOffset;
  private destroy;

  /**
   * Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
   * sent immediately. The message should be an array of 8-bit unsigned integers (`0` - `225`),
   * a
   * [`Uint8Array`]{@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array}
   * object or a [`Message`](Message) object.
   *
   * It is usually not necessary to use this method directly as you can use one of the simpler
   * helper methods such as [`playNote()`](#playNote), [`stopNote()`](#stopNote),
   * [`sendControlChange()`](#sendControlChange), etc.
   *
   * Details on the format of MIDI messages are available in the summary of
   * [MIDI messages]{@link https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message}
   * from the MIDI Manufacturers Association.
   *
   * @param message {number[]|Uint8Array|Message} A `Message` object, an array of 8-bit unsigned
   * integers or a `Uint8Array` object (not available in Node.js) containing the message bytes.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The first byte (status) must be an integer between 128 and 255.
   *
   * @throws {RangeError} Data bytes must be integers between 0 and 255.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  send(message: number[] | Uint8Array | Message, options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends a MIDI **key aftertouch** message at the scheduled time. This is a key-specific
   * aftertouch. For a channel-wide aftertouch message, use
   * [`sendChannelAftertouch()`]{@link #sendChannelAftertouch}.
   *
   * @param target {number|Note|string|number[]|Note[]|string[]} The note(s) for which you are sending
   * an aftertouch value. The notes can be specified by using a MIDI note number (`0` - `127`), a
   * [`Note`](Note) object, a note identifier (e.g. `C3`, `G#4`, `F-1`, `Db7`) or an array of the
   * previous types. When using a note identifier, octave range must be between `-1` and `9`. The
   * lowest note is `C-1` (MIDI note number `0`) and the highest note is `G9` (MIDI note number
   * `127`).
   *
   * When using a note identifier, the octave value will be offset by the local
   * [`octaveOffset`](#octaveOffset) and by
   * [`Output.octaveOffset`](Output#octaveOffset) and [`WebMidi.octaveOffset`](WebMidi#octaveOffset)
   * (if those values are not `0`). When using a key number, `octaveOffset` values are ignored.
   *
   * @param [pressure=0.5] {number} The pressure level (between `0` and `1`). An invalid pressure
   * value will silently trigger the default behaviour. If the `rawValue` option is set to `true`,
   * the pressure is defined by using an integer between `0` and `127`.
   *
   * @param {object} [options={}]
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered a float between `0` and `1.0` (default) or a raw integer between `0` and `127`.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @return {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   *
   * @throws RangeError Invalid key aftertouch value.
   */
  sendKeyAftertouch(target: number | Note | string | number[] | Note[] | string[], pressure?: number, options?: {
    rawValue?: boolean;
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends a MIDI **control change** message to the channel at the scheduled time. The control
   * change message to send can be specified numerically (`0` to `127`) or by using one of the
   * following common names:
   *
   * | Number | Name                          |
   * |--------|-------------------------------|
   * | 0      |`bankselectcoarse`             |
   * | 1      |`modulationwheelcoarse`        |
   * | 2      |`breathcontrollercoarse`       |
   * | 4      |`footcontrollercoarse`         |
   * | 5      |`portamentotimecoarse`         |
   * | 6      |`dataentrycoarse`              |
   * | 7      |`volumecoarse`                 |
   * | 8      |`balancecoarse`                |
   * | 10     |`pancoarse`                    |
   * | 11     |`expressioncoarse`             |
   * | 12     |`effectcontrol1coarse`         |
   * | 13     |`effectcontrol2coarse`         |
   * | 18     |`generalpurposeslider3`        |
   * | 19     |`generalpurposeslider4`        |
   * | 32     |`bankselectfine`               |
   * | 33     |`modulationwheelfine`          |
   * | 34     |`breathcontrollerfine`         |
   * | 36     |`footcontrollerfine`           |
   * | 37     |`portamentotimefine`           |
   * | 38     |`dataentryfine`                |
   * | 39     |`volumefine`                   |
   * | 40     |`balancefine`                  |
   * | 42     |`panfine`                      |
   * | 43     |`expressionfine`               |
   * | 44     |`effectcontrol1fine`           |
   * | 45     |`effectcontrol2fine`           |
   * | 64     |`holdpedal`                    |
   * | 65     |`portamento`                   |
   * | 66     |`sustenutopedal`               |
   * | 67     |`softpedal`                    |
   * | 68     |`legatopedal`                  |
   * | 69     |`hold2pedal`                   |
   * | 70     |`soundvariation`               |
   * | 71     |`resonance`                    |
   * | 72     |`soundreleasetime`             |
   * | 73     |`soundattacktime`              |
   * | 74     |`brightness`                   |
   * | 75     |`soundcontrol6`                |
   * | 76     |`soundcontrol7`                |
   * | 77     |`soundcontrol8`                |
   * | 78     |`soundcontrol9`                |
   * | 79     |`soundcontrol10`               |
   * | 80     |`generalpurposebutton1`        |
   * | 81     |`generalpurposebutton2`        |
   * | 82     |`generalpurposebutton3`        |
   * | 83     |`generalpurposebutton4`        |
   * | 91     |`reverblevel`                  |
   * | 92     |`tremololevel`                 |
   * | 93     |`choruslevel`                  |
   * | 94     |`celestelevel`                 |
   * | 95     |`phaserlevel`                  |
   * | 96     |`databuttonincrement`          |
   * | 97     |`databuttondecrement`          |
   * | 98     |`nonregisteredparametercoarse` |
   * | 99     |`nonregisteredparameterfine`   |
   * | 100    |`registeredparametercoarse`    |
   * | 101    |`registeredparameterfine`      |
   * | 120    |`allsoundoff`                  |
   * | 121    |`resetallcontrollers`          |
   * | 122    |`localcontrol`                 |
   * | 123    |`allnotesoff`                  |
   * | 124    |`omnimodeoff`                  |
   * | 125    |`omnimodeon`                   |
   * | 126    |`monomodeon`                   |
   * | 127    |`polymodeon`                   |
   *
   * As you can see above, not all control change message have a matching name. This does not mean
   * you cannot use the others. It simply means you will need to use their number
   * (`0` to `127`) instead of their name. While you can still use them, numbers `120` to `127` are
   * usually reserved for *channel mode* messages. See
   * [`sendChannelMode()`]{@link OutputChannel#sendChannelMode} method for more info.
   *
   * To view a detailed list of all available **control change** messages, please consult "Table 3 -
   * Control Change Messages" from the [MIDI Messages](
   * https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
   * specification.
   *
   * **Note**: messages #0-31 (MSB) are paired with messages #32-63 (LSB). For example, message #1
   * (`modulationwheelcoarse`) can be accompanied by a second control change message for
   * `modulationwheelfine` to achieve a greater level of precision. if you want to specify both MSB
   * and LSB for messages between `0` and `31`, you can do so by passing a 2-value array as the
   * second parameter.
   *
   * @param {number|string} controller The MIDI controller name or number (`0` - `127`).
   *
   * @param {number|number[]} value The value to send (0-127). You can also use a two-position array
   * for controllers 0 to 31. In this scenario, the first value will be sent as usual and the second
   * value will be sent to the matching LSB controller (which is obtained by adding 32 to the first
   * controller)
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} Controller numbers must be between 0 and 127.
   * @throws {RangeError} Invalid controller name.
   * @throws {TypeError} The value array must have a length of 2.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   *
   * @license Apache-2.0
   * @since 3.0.0
   */
  sendControlChange(controller: number | string, value: number | number[], options?: {
    time?: number | string;
  }): OutputChannel;

  private _selectNonRegisteredParameter;
  private _deselectRegisteredParameter;
  private _deselectNonRegisteredParameter;
  private _selectRegisteredParameter;
  private _setCurrentParameter;

  /**
   * Decrements the specified MIDI registered parameter by 1. Here is the full list of parameter
   * names that can be used with this function:
   *
   *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
   *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
   *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
   *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
   *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
   *  * Modulation Range (0x00, 0x05): `"modulationrange"`
   *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
   *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
   *  * Gain (0x3D, 0x02): `"gain"`
   *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
   *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
   *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
   *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
   *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
   *  * Roll Angle (0x3D, 0x08): `"rollangle"`
   *
   * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws TypeError The specified registered parameter is invalid.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendRpnDecrement(parameter: string | number[], options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Increments the specified MIDI registered parameter by 1. Here is the full list of parameter
   * names that can be used with this function:
   *
   *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
   *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
   *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
   *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
   *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
   *  * Modulation Range (0x00, 0x05): `"modulationrange"`
   *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
   *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
   *  * Gain (0x3D, 0x02): `"gain"`
   *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
   *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
   *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
   *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
   *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
   *  * Roll Angle (0x3D, 0x08): `"rollangle"`
   *
   * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws TypeError The specified registered parameter is invalid.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendRpnIncrement(parameter: string | number[], options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Plays a note or an array of notes on the channel. The first parameter is the note to play. It
   * can be a single value or an array of the following valid values:
   *
   *  - A [`Note`]{@link Note} object
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *
   * The `playNote()` method sends a **note on** MIDI message for all specified notes. If a
   * `duration` is set in the `options` parameter or in the [`Note`]{@link Note} object's
   * [`duration`]{@link Note#duration} property, it will also schedule a **note off** message
   * to end the note after said duration. If no `duration` is set, the note will simply play until
   * a matching **note off** message is sent with [`stopNote()`]{@link OutputChannel#stopNote} or
   * [`sendNoteOff()`]{@link OutputChannel#sendNoteOff}.
   *
   *  The execution of the **note on** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * When using [`Note`]{@link Note} objects, the durations and velocities defined in the
   * [`Note`]{@link Note} objects have precedence over the ones specified via the method's `options`
   * parameter.
   *
   * **Note**: per the MIDI standard, a **note on** message with an attack velocity of `0` is
   * functionally equivalent to a **note off** message.
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
   * specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`,
   * `F-1`, `Db7`), a [`Note`]{@link Note} object or an array of the previous types. When using a
   * note identifier, the octave range must be between `-1` and `9`. The lowest note is `C-1` (MIDI
   * note number `0`) and the highest note is `G9` (MIDI note number `127`).
   *
   * @param {object} [options={}]
   *
   * @param {number} [options.duration] A positive decimal number larger than `0` representing the
   * number of milliseconds to wait before sending a **note off** message. If invalid or left
   * undefined, only a **note on** message will be sent.
   *
   * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
   * `1`). If the `rawAttack` option is also defined, it will have priority. An invalid velocity
   * value will silently trigger the default of `0.5`.
   *
   * @param {number} [options.rawAttack=64] The attack velocity at which to play the note (between
   * `0` and `127`). This has priority over the `attack` property. An invalid velocity value will
   * silently trigger the default of 64.
   *
   * @param {number} [options.release=0.5] The velocity at which to release the note (between `0`
   * and `1`). If the `rawRelease` option is also defined, it will have priority. An invalid
   * velocity value will silently trigger the default of `0.5`. This is only used with the
   * **note off** event triggered when `options.duration` is set.
   *
   * @param {number} [options.rawRelease=64] The velocity at which to release the note (between `0`
   * and `127`). This has priority over the `release` property. An invalid velocity value will
   * silently trigger the default of 64. This is only used with the **note off** event triggered
   * when `options.duration` is set.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  playNote(note: number | string | Note | number[] | string[] | Note[], options?: {
    duration?: number;
    attack?: number;
    rawAttack?: number;
    release?: number;
    rawRelease?: number;
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends a **note off** message for the specified notes on the channel. The first parameter is the
   * note. It can be a single value or an array of the following valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A [`Note`]{@link Note} object
   *
   * The execution of the **note off** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * When using [`Note`]{@link Note} objects, the release velocity defined in the
   * [`Note`]{@link Note} objects has precedence over the one specified via the method's `options`
   * parameter.
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to stop. The notes can be
   * specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a
   * [`Note`]{@link Note} object or an array of the previous types. When using a note name, octave
   * range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
   * note is G9 (MIDI note number 127).
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @param {number} [options.release=0.5] The velocity at which to release the note
   * (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have
   * priority. An invalid velocity value will silently trigger the default of `0.5`.
   *
   * @param {number} [options.rawRelease=64] The velocity at which to release the note
   * (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have
   * priority. An invalid velocity value will silently trigger the default of `64`.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendNoteOff(note: number | string | Note | number[] | string[] | Note[], options?: {
    time?: number | string;
    release?: number;
    rawRelease?: number;
  }): OutputChannel;
  /**
   * Sends a **note off** message for the specified MIDI note number. The first parameter is the
   * note to stop. It can be a single value or an array of the following valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A [`Note`](Note) object
   *
   * The execution of the **note off** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * @param note {number|Note|string|number[]|Note[]|string[]} The note(s) to stop. The notes can be
   * specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`, `F-1`,
   * `Db7`) or an array of the previous types. When using a note identifier, octave range must be
   * between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest note is
   * `G9` (MIDI note number `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number} [options.release=0.5] The velocity at which to release the note
   * (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have
   * priority. An invalid velocity value will silently trigger the default of `0.5`.
   *
   * @param {number} [options.rawRelease=64] The velocity at which to release the note
   * (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have
   * priority. An invalid velocity value will silently trigger the default of `64`.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  stopNote(note: number | Note | string | number[] | Note[] | string[], options?: {
    release?: number;
    rawRelease?: number;
    time?: number | string;
  }): Output;
  /**
   * Sends a **note on** message for the specified note(s) on the channel. The first parameter is
   * the note. It can be a single value or an array of the following valid values:
   *
   *  - A [`Note`]{@link Note} object
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *
   *  When passing a [`Note`]{@link Note}object or a note name, the `octaveOffset` will be applied.
   *  This is not the case when using a note number. In this case, we assume you know exactly which
   *  MIDI note number should be sent out.
   *
   * The execution of the **note on** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * When using [`Note`]{@link Note} objects, the attack velocity defined in the
   * [`Note`]{@link Note} objects has precedence over the one specified via the method's `options`
   * parameter. Also, the `duration` is ignored. If you want to also send a **note off** message,
   * use the [`playNote()`]{@link #playNote} method instead.
   *
   * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
   * functionally equivalent to a **note off** message.
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
   * specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a
   * [`Note`]{@link Note} object or an array of the previous types.
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
   * `1`).  If the `rawAttack` option is also defined, `rawAttack` will have priority. An invalid
   * velocity value will silently trigger the default of `0.5`.
   *
   * @param {number} [options.rawAttack=64] The velocity at which to release the note (between `0`
   * and `127`). If the `attack` option is also defined, `rawAttack` will have priority. An invalid
   * velocity value will silently trigger the default of `64`.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendNoteOn(note: number | string | Note | number[] | string[] | Note[], options?: {
    time?: number | string;
    attack?: number;
    rawAttack?: number;
  }): OutputChannel;
  /**
   * Sends a MIDI **channel mode** message. The channel mode message to send can be specified
   * numerically or by using one of the following common names:
   *
   * |  Type                |Number| Shortcut Method                                               |
   * | ---------------------|------|-------------------------------------------------------------- |
   * | `allsoundoff`        | 120  | [`sendAllSoundOff()`]{@link #sendAllSoundOff}                 |
   * | `resetallcontrollers`| 121  | [`sendResetAllControllers()`]{@link #sendResetAllControllers} |
   * | `localcontrol`       | 122  | [`sendLocalControl()`]{@link #sendLocalControl}               |
   * | `allnotesoff`        | 123  | [`sendAllNotesOff()`]{@link #sendAllNotesOff}                 |
   * | `omnimodeoff`        | 124  | [`sendOmniMode(false)`]{@link #sendOmniMode}                  |
   * | `omnimodeon`         | 125  | [`sendOmniMode(true)`]{@link #sendOmniMode}                   |
   * | `monomodeon`         | 126  | [`sendPolyphonicMode("mono")`]{@link #sendPolyphonicMode}     |
   * | `polymodeon`         | 127  | [`sendPolyphonicMode("poly")`]{@link #sendPolyphonicMode}     |
   *
   * **Note**: as you can see above, to make it easier, all channel mode messages also have a matching
   * helper method.
   *
   * It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may
   * require a value that's not zero. For that reason, the `value` parameter is optional and
   * defaults to 0.
   *
   * @param {number|string} command The numerical identifier of the channel mode message (integer
   * between `120` and `127`) or its name as a string.
   *
   * @param {number} [value=0] The value to send (integer between `0` - `127`).
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendChannelMode(command: number | string, value?: number, options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sets OMNI mode to `"on"` or `"off"`. MIDI's OMNI mode causes the instrument to respond to
   * messages from all channels.
   *
   * It should be noted that support for OMNI mode is not as common as it used to be.
   *
   * @param [state=true] {boolean} Whether to activate OMNI mode (`true`) or not (`false`).
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {TypeError} Invalid channel mode message name.
   * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
   * @throws {RangeError} Value must be an integer between 0 and 127.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendOmniMode(state?: boolean, options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends a MIDI **channel aftertouch** message. For key-specific aftertouch, you should instead
   * use [`sendKeyAftertouch()`]{@link #sendKeyAftertouch}.
   *
   * @param [pressure] {number} The pressure level (between `0` and `1`). If the `rawValue` option
   * is set to `true`, the pressure can be defined by using an integer between `0` and `127`.
   *
   * @param {object} [options={}]
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered a float between `0` and `1.0` (default) or a raw integer between `0` and `127`.
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   *
   * @throws RangeError Invalid channel aftertouch value.
   */
  sendChannelAftertouch(pressure?: number, options?: {
    rawValue?: boolean;
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends a **master tuning** message. The value is decimal and must be larger than -65 semitones
   * and smaller than 64 semitones.
   *
   * Because of the way the MIDI specification works, the decimal portion of the value will be
   * encoded with a resolution of 14bit. The integer portion must be between -64 and 63
   * inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
   * a **Master Fine Tuning** RPN messages.
   *
   * @param [value=0.0] {number} The desired decimal adjustment value in semitones (-65 < x < 64)
   *
   * @param {object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The value must be a decimal number between larger than -65 and smaller
   * than 64.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendMasterTuning(value?: number, options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends a **modulation depth range** message to adjust the depth of the modulation wheel's range.
   * The range can be specified with the `semitones` parameter, the `cents` parameter or by
   * specifying both parameters at the same time.
   *
   * @param {number} semitones The desired adjustment value in semitones (integer between 0 and
   * 127).
   *
   * @param {number} [cents=0] The desired adjustment value in cents (integer between 0 and 127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendModulationRange(semitones: number, cents?: number, options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sets a non-registered parameter (NRPN) to the specified value. The NRPN is selected by passing
   * in a two-position array specifying the values of the two control bytes. The value is specified
   * by passing in a single integer (most cases) or an array of two integers.
   *
   * NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
   * they see fit. For example, according to the Roland GS specification, you can control the
   * **vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
   * would use:
   *
   * ```js
   * WebMidi.outputs[0].channels[0].sendNrpnValue([1, 8], 123);
   * ```
   *
   * In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
   * would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
   * uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
   * value to send was 10, you could use:
   *
   * ```js
   * WebMidi.outputs[0].channels[0].sendNrpnValue([2, 63], [0, 10]);
   * ```
   *
   * For further implementation details, refer to the manufacturer's documentation.
   *
   * @param nrpn {number[]} A two-position array specifying the two control bytes (0x63,
   * 0x62) that identify the non-registered parameter.
   *
   * @param [data=[]] {number|number[]} An integer or an array of integers with a length of 1 or 2
   * specifying the desired data.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The control value must be between 0 and 127.
   * @throws {RangeError} The msb value must be between 0 and 127
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendNrpnValue(nrpn: number[], data?: number | number[], options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends a MIDI **pitch bend** message at the scheduled time. The resulting bend is relative to
   * the pitch bend range that has been defined. The range can be set with
   * [`sendPitchBendRange()`]{@link #sendPitchBendRange}. So, for example, if the pitch
   * bend range has been set to 12 semitones, using a bend value of -1 will bend the note 1 octave
   * below its nominal value.
   *
   * @param {number|number[]} [value] The intensity of the bend (between -1.0 and 1.0). A value of
   * zero means no bend. If the `rawValue` option is set to `true`, the intensity of the bend can be
   * defined by either using a single integer between 0 and 127 (MSB) or an array of two integers
   * between 0 and 127 representing, respectively, the MSB (most significant byte) and the LSB
   * (least significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value
   * lower than `64` bends downwards while a value higher than `64` bends upwards. The LSB is
   * expressed in cents (1/100 of a semitone). An LSB of `64` also means no bend.
   *
   * @param {Object} [options={}]
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or
   * an array of 2 integers if using both MSB and LSB).
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendPitchBend(value?: number | number[], options?: {
    rawValue?: boolean;
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends a **pitch bend range** message at the scheduled time to adjust the range used by the
   * pitch bend lever. The range is specified by using the `semitones` and `cents` parameters. For
   * example, setting the `semitones` parameter to `12` means that the pitch bend range will be 12
   * semitones above and below the nominal pitch.
   *
   * @param semitones {number} The desired adjustment value in semitones (between 0 and 127). While
   * nothing imposes that in the specification, it is very common for manufacturers to limit the
   * range to 2 octaves (-12 semitones to 12 semitones).
   *
   * @param [cents=0] {number} The desired adjustment value in cents (integer between 0-127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The semitones value must be an integer between 0 and 127.
   * @throws {RangeError} The cents value must be an integer between 0 and 127.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendPitchBendRange(semitones: number, cents?: number, options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends a MIDI **program change** message at the scheduled time.
   *
   * @param [program=1] {number} The MIDI patch (program) number (integer between `0` and `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
   * than 0xFF.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   *
   */
  sendProgramChange(program?: number, options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sets the specified MIDI registered parameter to the desired value. The value is defined with
   * up to two bytes of data (msb, lsb) that each can go from 0 to 127.
   *
   * MIDI
   * [registered parameters](https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
   * extend the original list of control change messages. The MIDI 1.0 specification lists only a
   * limited number of them:
   *
   * | Numbers      | Function                 |
   * |--------------|--------------------------|
   * | (0x00, 0x00) | `pitchbendrange`         |
   * | (0x00, 0x01) | `channelfinetuning`      |
   * | (0x00, 0x02) | `channelcoarsetuning`    |
   * | (0x00, 0x03) | `tuningprogram`          |
   * | (0x00, 0x04) | `tuningbank`             |
   * | (0x00, 0x05) | `modulationrange`        |
   * | (0x3D, 0x00) | `azimuthangle`           |
   * | (0x3D, 0x01) | `elevationangle`         |
   * | (0x3D, 0x02) | `gain`                   |
   * | (0x3D, 0x03) | `distanceratio`          |
   * | (0x3D, 0x04) | `maximumdistance`        |
   * | (0x3D, 0x05) | `maximumdistancegain`    |
   * | (0x3D, 0x06) | `referencedistanceratio` |
   * | (0x3D, 0x07) | `panspreadangle`         |
   * | (0x3D, 0x08) | `rollangle`              |
   *
   * Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
   * Standard*, which is not widely implemented.
   *
   * @param rpn {string|number[]} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the
   * registered parameter.
   *
   * @param [data=[]] {number|number[]} An single integer or an array of integers with a maximum
   * length of 2 specifying the desired data.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendRpnValue(rpn: string | number[], data?: number | number[], options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * @param value {number} The desired tuning bank (integer between `0` and `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The bank value must be between 0 and 127.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendTuningBank(value: number, options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * @param value {number} The desired tuning program (integer between `0` and `127`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The program value must be between 0 and 127.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendTuningProgram(value: number, options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Turns local control on or off. Local control is usually enabled by default. If you disable it,
   * the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
   * its out port.
   *
   * @param [state=false] {boolean} Whether to activate local control (`true`) or disable it
   * (`false`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendLocalControl(state?: boolean, options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends an **all notes off** channel mode message. This will make all currently playing notes
   * fade out just as if their key had been released. This is different from the
   * [`sendAllSoundOff()`]{@link #sendAllSoundOff} method which mutes all sounds immediately.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendAllNotesOff(options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends an **all sound off** channel mode message. This will silence all sounds playing on that
   * channel but will not prevent new sounds from being triggered.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendAllSoundOff(options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sends a **reset all controllers** channel mode message. This resets all controllers, such as
   * the pitch bend, to their default value.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendResetAllControllers(options?: {
    time?: number | string;
  }): OutputChannel;
  /**
   * Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
   * and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
   * multiple notes are being played.
   *
   * @param {string} [mode=poly] The mode to use: `"mono"` or `"poly"`.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
   * followed by a number, the message will be delayed by that many milliseconds. If the value is a
   * positive number
   * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
   * the operation will be scheduled for that time. The current time can be retrieved with
   * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
   * operation will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendPolyphonicMode(mode?: string, options?: {
    time?: number | string;
  }): OutputChannel;
  set octaveOffset(arg: number);
  /**
   * An integer to offset the reported octave of outgoing note-specific messages (`noteon`,
   * `noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
   * octave (C4).
   *
   * Note that this value is combined with the global offset value defined in
   * [`WebMidi.octaveOffset`](WebMidi#octaveOffset) and with the parent value defined in
   * [`Output.octaveOffset`]{@link Output#octaveOffset}.
   *
   * @type {number}
   *
   * @since 3.0
   */
  get octaveOffset(): number;
  /**
   * The parent [`Output`]{@link Output} this channel belongs to.
   * @type {Output}
   * @since 3.0
   */
  get output(): Output;
  /**
   * This channel's MIDI number (`1` - `16`).
   * @type {number}
   * @since 3.0
   */
  get number(): number;
}

/**
 * The `Utilities` class contains general-purpose utility methods. All methods are static and
 * should be called using the class name. For example: `Utilities.getNoteDetails("C4")`.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */
export class Utilities {

  /**
   * Converts the `input` parameter to a valid [`Note`]{@link Note} object. The input usually is an
   * unsigned integer (0-127) or a note identifier (`"C4"`, `"G#5"`, etc.). If the input is a
   * [`Note`]{@link Note} object, it will be returned as is.
   *
   * If the input is a note number or identifier, it is possible to specify options by providing the
   * `options` parameter.
   *
   * @param [input] {number|string|Note}
   *
   * @param {object} [options={}]
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the note should
   * be explicitly stopped.
   *
   * @param {number} [options.attack=0.5] The note's attack velocity as a float between 0 and 1. If
   * you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both
   * `attack` and `rawAttack` are specified, the latter has precedence.
   *
   * @param {number} [options.release=0.5] The note's release velocity as a float between 0 and 1. If
   * you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both
   * `release` and `rawRelease` are specified, the latter has precedence.
   *
   * @param {number} [options.rawAttack=64] The note's attack velocity as an integer between 0 and
   * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
   * `attack` and `rawAttack` are specified, the latter has precedence.
   *
   * @param {number} [options.rawRelease=64] The note's release velocity as an integer between 0 and
   * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
   * `release` and `rawRelease` are specified, the latter has precedence.
   *
   * @param {number} [options.octaveOffset=0] An integer to offset the octave by. **This is only
   * used when the input value is a note identifier.**
   *
   * @returns {Note}
   *
   * @throws TypeError The input could not be parsed to a note
   *
   * @since version 3.0.0
   * @static
   */
  static buildNote(input?: number | string | Note, options?: {
    duration?: number;
    attack?: number;
    release?: number;
    rawAttack?: number;
    rawRelease?: number;
    octaveOffset?: number;
  }): Note;

  /**
   * Converts an input value, which can be an unsigned integer (0-127), a note identifier, a
   * [`Note`]{@link Note}  object or an array of the previous types, to an array of
   * [`Note`]{@link Note}  objects.
   *
   * [`Note`]{@link Note}  objects are returned as is. For note numbers and identifiers, a
   * [`Note`]{@link Note} object is created with the options specified. An error will be thrown when
   * encountering invalid input.
   *
   * Note: if both the `attack` and `rawAttack` options are specified, the later has priority. The
   * same goes for `release` and `rawRelease`.
   *
   * @param [notes] {number|string|Note|number[]|string[]|Note[]}
   *
   * @param {object} [options={}]
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the note should
   * be explicitly stopped.
   *
   * @param {number} [options.attack=0.5] The note's attack velocity as a float between 0 and 1. If
   * you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both
   * `attack` and `rawAttack` are specified, the latter has precedence.
   *
   * @param {number} [options.release=0.5] The note's release velocity as a float between 0 and 1. If
   * you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both
   * `release` and `rawRelease` are specified, the latter has precedence.
   *
   * @param {number} [options.rawAttack=64] The note's attack velocity as an integer between 0 and
   * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
   * `attack` and `rawAttack` are specified, the latter has precedence.
   *
   * @param {number} [options.rawRelease=64] The note's release velocity as an integer between 0 and
   * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
   * `release` and `rawRelease` are specified, the latter has precedence.
   *
   * @param {number} [options.octaveOffset=0] An integer to offset the octave by. **This is only
   * used when the input value is a note identifier.**
   *
   * @returns {Note[]}
   *
   * @throws TypeError An element could not be parsed as a note.
   *
   * @since 3.0.0
   * @static
   */
  static buildNoteArray(notes?: number | string | Note | number[] | string[] | Note[], options?: {
    duration?: number;
    attack?: number;
    release?: number;
    rawAttack?: number;
    rawRelease?: number;
    octaveOffset?: number;
  }): Note[];

  /**
   * Returns a number between 0 and 1 representing the ratio of the input value divided by 127 (7
   * bit). The returned value is restricted between 0 and 1 even if the input is greater than 127 or
   * smaller than 0.
   *
   * Passing `Infinity` will return `1` and passing `-Infinity` will return `0`. Otherwise, when the
   * input value cannot be converted to an integer, the method returns 0.
   *
   * @param value {number} A positive integer between 0 and 127 (inclusive)
   * @returns {number} A number between 0 and 1 (inclusive)
   * @static
   */
  static from7bitToFloat(value: number): number;

  /**
   * Returns an integer between 0 and 127 which is the result of multiplying the input value by
   * 127. The input value should be a number between 0 and 1 (inclusively). The returned value is
   * restricted between 0 and 127 even if the input is greater than 1 or smaller than 0.
   *
   * Passing `Infinity` will return `127` and passing `-Infinity` will return `0`. Otherwise, when
   * the input value cannot be converted to a number, the method returns 0.
   *
   * @param value {number} A positive float between 0 and 1 (inclusive)
   * @returns {number} A number between 0 and 127 (inclusive)
   * @static
   */
  static fromFloatTo7Bit(value: number): number;

  /**
   * Extracts 7bit MSB and LSB values from the supplied float.
   *
   * @param value {number} A float between 0 and 1
   * @returns {{lsb: number, msb: number}}
   */
  static fromFloatToMsbLsb(value: number): {
    lsb: number;
    msb: number;
  };

  /**
   * Combines and converts MSB and LSB values (0-127) to a float between 0 and 1. The returned value
   * is within between 0 and 1 even if the result is greater than 1 or smaller than 0.
   *
   * @param msb {number} The most significant byte as a integer between 0 and 127.
   * @param [lsb=0] {number} The least significant byte as a integer between 0 and 127.
   * @returns {number} A float between 0 and 1.
   */
  static fromMsbLsbToFloat(msb: number, lsb?: number): number;

  /**
   * Returns the name of a control change message matching the specified number (0-127). Some valid
   * control change numbers do not have a specific name or purpose assigned in the MIDI
   * [spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
   * In these cases, the method returns `controllerXXX` (where XXX is the number).
   *
   * @param {number} number An integer (0-127) representing the control change message
   * @returns {string|undefined} The matching control change name or `undefined` if no match was
   * found.
   *
   * @static
   */
  static getCcNameByNumber(number: number): string | undefined;

  /**
   * Returns the channel mode name matching the specified number. If no match is found, the function
   * returns `false`.
   *
   * @param {number} number An integer representing the channel mode message (120-127)
   * @returns {string|false} The name of the matching channel mode or `false` if no match could be
   * found.
   *
   * @since 2.0.0
   */
  static getChannelModeByNumber(number: number): string | false;

  /**
   * Given a proper note identifier (`C#4`, `Gb-1`, etc.) or a valid MIDI note number (0-127), this
   * method returns an object containing broken down details about the specified note (uppercase
   * letter, accidental and octave).
   *
   * When a number is specified, the translation to note is done using a value of 60 for middle C
   * (C4 = middle C).
   *
   * @param value {string|number} A note identifier A  atring ("C#4", "Gb-1", etc.) or a MIDI note
   * number (0-127).
   *
   * @returns {{accidental: string, identifier: string, name: string, octave: number }}
   *
   * @throws TypeError Invalid note identifier
   *
   * @since 3.0.0
   * @static
   */
  static getNoteDetails(value: string | number): {
    accidental: string;
    identifier: string;
    name: string;
    octave: number;
  };

  /**
   * Returns the name of the first property of the supplied object whose value is equal to the one
   * supplied. If nothing is found, `undefined` is returned.
   *
   * @param object {object} The object to look for the property in.
   * @param value {*} Any value that can be expected to be found in the object's properties.
   * @returns {string|undefined} The name of the matching property or `undefined` if nothing is
   * found.
   * @static
   */
  static getPropertyByValue(object: object, value: any): string | undefined;

  /**
   * Returns a valid MIDI note number (0-127) given the specified input. The input usually is a
   * string containing a note identifier (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer
   * between 0 and 127 is passed, it will simply be returned as is (for convenience). Other strings
   * will be parsed for integer value, if possible.
   *
   * If the input is an identifier, the resulting note number is offset by the `octaveOffset`
   * parameter. For example, if you pass in "C4" (note number 60) and the `octaveOffset` value is
   * -2, the resulting MIDI note number will be 36.
   *
   * @param input {string|number} A string or number to extract the MIDI note number from.
   * @param octaveOffset {number} An integer to offset the octave by
   *
   * @returns {number|false} A valid MIDI note number (0-127) or `false` if the input could not
   * successfully be parsed to a note number.
   *
   * @since 3.0.0
   * @static
   */
  static guessNoteNumber(input: string | number, octaveOffset: number): number | false;

  /**
   * Indicates whether the execution environment is Node.js (`true`) or not (`false`)
   * @type {boolean}
   */
  static get isNode(): boolean;

  /**
   * Indicates whether the execution environment is a browser (`true`) or not (`false`)
   * @type {boolean}
   */
  static get isBrowser(): boolean;

  /**
   * Returns the supplied MIDI note number offset by the requested octave and semitone values. If
   * the calculated value is less than 0, 0 will be returned. If the calculated value is more than
   * 127, 127 will be returned. If an invalid offset value is supplied, 0 will be used.
   *
   * @param number {number} The MIDI note to offset as an integer between 0 and 127.
   * @param octaveOffset {number} An integer to offset the note by (in octave)
   * @param octaveOffset {number} An integer to offset the note by (in semitones)
   * @returns {number} An integer between 0 and 127
   *
   * @throws {Error} Invalid note number
   * @static
   */
  static offsetNumber(number: number, octaveOffset?: number, semitoneOffset?: number): number;

  /**
   * Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be a
   * single integer or an array of integers.
   *
   * For backwards-compatibility, passing `undefined` as a parameter to this method results in all
   * channels being returned (1-16). Otherwise, parameters that cannot successfully be parsed to
   * integers between 1 and 16 are silently ignored.
   *
   * @param [channel] {number|number[]} An integer or an array of integers to parse as channel
   * numbers.
   *
   * @returns {number[]} An array of 0 or more valid MIDI channel numbers.
   *
   * @since 3.0.0
   * @static
   */
  static sanitizeChannels(channel?: number | number[]): number[];

  /**
   * Returns an identifier string representing a note name (with optional accidental) followed by an
   * octave number. The octave can be offset by using the `octaveOffset` parameter.
   *
   * @param {number} number The MIDI note number to convert to a note identifier
   * @param {number} octaveOffset An offset to apply to the resulting octave
   *
   * @returns {string}
   *
   * @throws RangeError Invalid note number
   * @throws RangeError Invalid octaveOffset value
   *
   * @since 3.0.0
   * @static
   */
  static toNoteIdentifier(number: number, octaveOffset: number): string;

  /**
   * Returns a MIDI note number matching the identifier passed in the form of a string. The
   * identifier must include the octave number. The identifier also optionally include a sharp (#),
   * a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
   * identifiers: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.
   *
   * When converting note identifiers to numbers, C4 is considered to be middle C (MIDI note number
   * 60) as per the scientific pitch notation standard.
   *
   * The resulting note number can be offset by using the `octaveOffset` parameter.
   *
   * @param identifier {string} The identifier in the form of a letter, followed by an optional "#",
   * "##", "b" or "bb" followed by the octave number. For exemple: C5, G4, D#-1, F0, Gb7, Eb-1,
   * Abb4, B##6, etc.
   *
   * @param {number} [octaveOffset=0] A integer to offset the octave by.
   *
   * @returns {number} The MIDI note number (an integer between 0 and 127).
   *
   * @throws RangeError Invalid 'octaveOffset' value
   *
   * @throws TypeError Invalid note identifier
   *
   * @license Apache-2.0
   * @since 3.0.0
   * @static
   */
  static toNoteNumber(identifier: string, octaveOffset?: number): number;

  /**
   * Returns a valid timestamp, relative to the navigation start of the document, derived from the
   * `time` parameter. If the parameter is a string starting with the "+" sign and followed by a
   * number, the resulting timestamp will be the sum of the current timestamp plus that number. If
   * the parameter is a positive number, it will be returned as is. Otherwise, false will be
   * returned.
   *
   * @param [time] {number|string} The time string (e.g. `"+2000"`) or number to parse
   * @return {number|false} A positive number or `false` (if the time cannot be converted)
   *
   * @since 3.0.0
   * @static
   */
  static toTimestamp(time?: number | string): number | false;

}

/**
 * The `WebMidi` object makes it easier to work with the low-level Web MIDI API. Basically, it
 * simplifies sending outgoing MIDI messages and reacting to incoming MIDI messages.
 *
 * When using the WebMidi.js library, you should know that the `WebMidi` class has already been
 * instantiated. You cannot instantiate it yourself. If you use the **IIFE** version, you should
 * simply use the global object called `WebMidi`. If you use the **CJS** (CommonJS) or **ESM** (ES6
 * module) version, you get an already-instantiated object when you import the module.
 *
 * @fires WebMidi#connected
 * @fires WebMidi#disabled
 * @fires WebMidi#disconnected
 * @fires WebMidi#enabled
 * @fires WebMidi#error
 * @fires WebMidi#midiaccessgranted
 * @fires WebMidi#portschanged
 *
 * @extends EventEmitter
 * @license Apache-2.0
 */
declare class WebMidi extends EventEmitter {

  /**
   * The WebMidi class is a singleton and you cannot instantiate it directly. It has already been
   * instantiated for you.
   */
  constructor();

  private _destroyInputsAndOutputs;
  private _disconnectedInputs;
  private _disconnectedOutputs;
  private _inputs;
  private _octaveOffset;
  private _onInterfaceStateChange;
  private _outputs;
  private _updateInputs;
  private _updateInputsAndOutputs;
  private _updateOutputs;
  private _stateChangeQueue;

  /**
   * Object containing system-wide default values that can be changed to customize how the library
   * works.
   *
   * @type {object}
   *
   * @property {object}  defaults.note - Default values relating to note
   * @property {number}  defaults.note.attack - A number between 0 and 127 representing the
   * default attack velocity of notes. Initial value is 64.
   * @property {number}  defaults.note.release - A number between 0 and 127 representing the
   * default release velocity of notes. Initial value is 64.
   * @property {number}  defaults.note.duration - A number representing the default duration of
   * notes (in seconds). Initial value is Infinity.
   */
  defaults: object;

  /**
   * The [`MIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
   * instance used to talk to the lower-level Web MIDI API. This should not be used directly
   * unless you know what you are doing.
   *
   * @type {WebMidi.MIDIAccess}
   * @readonly
   */
  interface: WebMidi.MIDIAccess;

  /**
   * Indicates whether argument validation and backwards-compatibility checks are performed
   * throughout the WebMidi.js library for object methods and property setters.
   *
   * This is an advanced setting that should be used carefully. Setting `validation` to `false`
   * improves performance but should only be done once the project has been thoroughly tested with
   * `validation` turned on.
   *
   * @type {boolean}
   */
  validation: boolean;

  /**
   * Adds an event listener that will trigger a function callback when the specified event is
   * dispatched.
   *
   * Here are the events you can listen to:   connected, disabled, disconnected, enabled,
   * midiaccessgranted, portschanged, error
   *
   * @param event {string | Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} A callback function to execute when the specified event
   * is detected. This function will receive an event parameter object. For details on this object's
   * properties, check out the documentation for the various events (links above).
   *
   * @param {object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [`arguments`](Listener#arguments) property of
   * the [`Listener`](Listener) object and can be retrieved or modified as desired.
   *
   * @param {object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array and thus be triggered before others.
   *
   * @param {number} [options.remaining=Infinity] The number of times after which the callback
   * should automatically be removed.
   *
   * @returns {Listener} The listener object that was created
   */
  addListener<T extends keyof WebMidiEventMap>(
    e: Symbol | T,
    listener: WebMidiEventMap[T],
    options?: {
      "arguments"?: any[];
      "context"?: any;
      "duration"?: number;
      "prepend"?: boolean;
      "remaining"?: number;
    }
  ): Listener | Listener[];

  /**
   * Adds a one-time event listener that will trigger a function callback when the specified event
   * is dispatched.
   *
   * Here are the events you can listen to:   connected, disabled, disconnected, enabled,
   * midiaccessgranted, portschanged, error
   *
   * @param event {string | Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} A callback function to execute when the specified event
   * is detected. This function will receive an event parameter object. For details on this object's
   * properties, check out the documentation for the various events (links above).
   *
   * @param {object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [`arguments`](Listener#arguments) property of
   * the [`Listener`](Listener) object and can be retrieved or modified as desired.
   *
   * @param {object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array and thus be triggered before others.
   *
   * @returns {Listener} The listener object that was created
   */
  addOneTimeListener<T extends keyof WebMidiEventMap>(
    e: Symbol | T,
    listener: WebMidiEventMap[T],
    options?: {
      "arguments"?: any[];
      "context"?: any;
      "duration"?: number;
      "prepend"?: boolean;
    }
  ): Listener | Listener[];

  /**
   * Completely disables **WebMidi.js** by unlinking the MIDI subsystem's interface and closing all
   * [`Input`](Input) and [`Output`](Output) objects that may have been opened. This also means that
   * listeners added to [`Input`](Input) objects, [`Output`](Output) objects or to `WebMidi` itself
   * are also destroyed.
   *
   * @async
   * @returns {Promise<Array>}
   *
   * @throws {Error} The Web MIDI API is not supported by your environment.
   *
   * @since 2.0.0
   */
  disable(): Promise<any[]>;

  /**
   * Checks if the Web MIDI API is available in the current environment and then tries to connect to
   * the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
   * be displayed to the user.
   *
   * To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
   * `true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
   * and system exclusive messages are always enabled. You can check the
   * [`sysexEnabled`](#sysexEnabled) property to confirm.
   *
   * To enable access to software synthesizers available on the host, you would set the `software`
   * option to `true`. However, this option is only there to future-proof the library as support for
   * software synths has not yet been implemented in any browser (as of September 2021).
   *
   * By the way, if you call the [`enable()`](#enable) method while WebMidi.js is already enabled,
   * the callback function will be executed (if any), the promise will resolve but the events
   * ([`"midiaccessgranted"`](#event:midiaccessgranted), [`"connected"`](#event:connected) and
   * [`"enabled"`](#event:enabled)) will not be fired.
   *
   * There are 3 ways to execute code after `WebMidi` has been enabled:
   *
   * - Pass a callback function in the `options`
   * - Listen to the [`"enabled"`](#event:enabled) event
   * - Wait for the promise to resolve
   *
   * In order, this is what happens towards the end of the enabling process:
   *
   * 1. [`"midiaccessgranted"`](#event:midiaccessgranted) event is triggered once the user has
   * granted access to use MIDI.
   * 2. [`"connected"`](#event:connected) events are triggered (for each available input and output)
   * 3. [`"enabled"`](#event:enabled) event is triggered when WebMidi.js is fully ready
   * 4. specified callback (if any) is executed
   * 5. promise is resolved and fulfilled with the `WebMidi` object.
   *
   * **Important note**: starting with Chrome v77, a page using Web MIDI API must be hosted on a
   * secure origin (`https://`, `localhost` or `file:///`) and the user will always be prompted to
   * authorize the operation (no matter if the `sysex` option is `true` or not).
   *
   * ##### Example
   * ```js
   * // Enabling WebMidi and using the promise
   * WebMidi.enable().then(() => {
   *   console.log("WebMidi.js has been enabled!");
   * })
   * ```
   *
   * @param [options] {object}
   *
   * @param [options.callback] {function} A function to execute once the operation completes. This
   * function will receive an `Error` object if enabling the Web MIDI API failed.
   *
   * @param [options.sysex=false] {boolean} Whether to enable MIDI system exclusive messages or not.
   *
   * @param [options.validation=true] {boolean} Whether to enable library-wide validation of method
   * arguments and setter values. This is an advanced setting that should be used carefully. Setting
   * [`validation`](#validation) to `false` improves performance but should only be done once the
   * project has been thoroughly tested with [`validation`](#validation)  turned on.
   *
   * @param [options.software=false] {boolean} Whether to request access to software synthesizers on
   * the host system. This is part of the spec but has not yet been implemented by most browsers as
   * of April 2020.
   *
   * @async
   *
   * @returns {Promise.<WebMidi>} The promise is fulfilled with the `WebMidi` object fro
   * chainability
   *
   * @throws {Error} The Web MIDI API is not supported in your environment.
   * @throws {Error} Jazz-Plugin must be installed to use WebMIDIAPIShim.
   */
  enable(options?: {
    callback?: Function;
    sysex?: boolean;
    validation?: boolean;
    software?: boolean;
  }): Promise<WebMidi>;

  /**
   * Returns the [`Input`](Input) object that matches the specified ID string or `false` if no
   * matching input is found. As per the Web MIDI API specification, IDs are strings (not integers).
   *
   * Please note that IDs change from one host to another. For example, Chrome does not use the same
   * kind of IDs as Jazz-Plugin.
   *
   * @param id {string} The ID string of the input. IDs can be viewed by looking at the
   * [`WebMidi.inputs`](WebMidi#inputs) array. Even though they sometimes look like integers, IDs
   * are strings.
   * @param [options] {object}
   * @param [options.disconnected] {boolean} Whether to retrieve a disconnected input
   *
   * @returns {Input} An [`Input`](Input) object matching the specified ID string or `undefined`
   * if no matching input can be found.
   *
   * @throws {Error} WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getInputById(id: string, options?: {
    disconnected?: boolean;
  }): Input;

  /**
   * Returns the first [`Input`](Input) object whose name **contains** the specified string. Note
   * that the port names change from one environment to another. For example, Chrome does not report
   * input names in the same way as the Jazz-Plugin does.
   *
   * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
   * those visible in the [inputs](WebMidi#inputs) array).
   *
   * @returns {Input} The [`Input`](Input) that was found or `undefined` if no input contained the
   * specified name.
   * @param [options] {object}
   * @param [options.disconnected] {boolean} Whether to retrieve a disconnected input
   *
   * @throws {Error} WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getInputByName(name: string, options?: {
    disconnected?: boolean;
  }): Input;

  /**
   * Returns the [`Output`](Output) object that matches the specified ID string or `false` if no
   * matching output is found. As per the Web MIDI API specification, IDs are strings (not
   * integers).
   *
   * Please note that IDs change from one host to another. For example, Chrome does not use the same
   * kind of IDs as Jazz-Plugin.
   *
   * @param id {string} The ID string of the port. IDs can be viewed by looking at the
   * [`WebMidi.outputs`](WebMidi#outputs) array.
   * @param [options] {object}
   * @param [options.disconnected] {boolean} Whether to retrieve a disconnected output
   *
   * @returns {Output} An [`Output`](Output) object matching the specified ID string. If no
   * matching output can be found, the method returns `undefined`.
   *
   * @throws {Error} WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getOutputById(id: string, options?: {
    disconnected?: boolean;
  }): Output;

  /**
   * Returns the first [`Output`](Output) object whose name **contains** the specified string. Note
   * that the port names change from one environment to another. For example, Chrome does not report
   * input names in the same way as the Jazz-Plugin does.
   *
   * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
   * those visible in the [`outputs`](#outputs) array).
   * @param [options] {object}
   * @param [options.disconnected] {boolean} Whether to retrieve a disconnected output
   *
   * @returns {Output} The [`Output`](Output) that was found or `undefined` if no output matched
   * the specified name.
   *
   * @throws {Error} WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getOutputByName(name: string, options?: {
    disconnected?: boolean;
  }): Output;

  /**
   * Checks if the specified event type is already defined to trigger the specified callback
   * function.
   *
   * @param event {string|Symbol} The type of the event.
   *
   * @param listener {EventEmitterCallback} The callback function to check for.
   *
   * @param {object} [options={}]
   *
   * @returns {boolean} Boolean value indicating whether or not the `Input` or `InputChannel`
   * already has this listener defined.
   */
  hasListener<T extends keyof WebMidiEventMap>(
    e: Symbol | T,
    listener: WebMidiEventMap[T]
  ): boolean;

  /**
   * Removes the specified listener for the specified event. If no listener is specified, all
   * listeners for the specified event will be removed.
   *
   * @param [type] {string} The type of the event.
   *
   * @param [listener] {EventEmitterCallback} The callback function to check for.
   *
   * @param {object} [options={}]
   *
   * @param {*} [options.context] Only remove the listeners that have this exact context.
   *
   * @param {number} [options.remaining] Only remove the listener if it has exactly that many
   * remaining times to be executed.
   */
  removeListener<T extends keyof WebMidiEventMap>(
    type?: Symbol | T,
    listener?: WebMidiEventMap[T],
    options?: {
      "context"?: any;
      "remaining"?: number;
    }
  ): void;

  /**
   * Indicates whether access to the host's MIDI subsystem is active or not.
   *
   * @readonly
   * @type {boolean}
   */
  get enabled(): boolean;

  /**
   * An array of all currently available MIDI inputs.
   *
   * @readonly
   * @type {Input[]}
   */
  get inputs(): Input[];

  /**
   * An integer to offset the octave of notes received from external devices or sent to external
   * devices.
   *
   * When a MIDI message comes in on an input channel the reported note name will be offset. For
   * example, if the `octaveOffset` is set to `-1` and a [`"noteon"`](InputChannel#event:noteon)
   * message with MIDI number 60 comes in, the note will be reported as C3 (instead of C4).
   *
   * By the same token, when [`OutputChannel.playNote()`](OutputChannel#playNote) is called, the
   * MIDI note number being sent will be offset. If `octaveOffset` is set to `-1`, the MIDI note
   * number sent will be 72 (instead of 60).
   *
   * @type {number}
   *
   * @since 2.1
   */
  set octaveOffset(arg: number);
  get octaveOffset(): number;

  /**
   * An array of all currently available MIDI outputs as [`Output`](Output) objects.
   *
   * @readonly
   * @type {Output[]}
   */
  get outputs(): Output[];

  /**
   * Indicates whether the environment provides support for the Web MIDI API or not.
   *
   * **Note**: in environments that do not offer built-in MIDI support, this will report `true` if
   * the
   * [`navigator.requestMIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
   * function is available. For example, if you have installed WebMIDIAPIShim.js but no plugin, this
   * property will be `true` even though actual support might not be there.
   *
   * @readonly
   * @type {boolean}
   */
  get supported(): boolean;

  /**
   * Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
   * enabled via the [`enable()`](#enable) method.
   *
   * @readonly
   * @type boolean
   */
  get sysexEnabled(): boolean;

  /**
   * The elapsed time, in milliseconds, since the time
   * [origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).
   * Said simply, it is the number of milliseconds that passed since the page was loaded. Being a
   * floating-point number, it has sub-millisecond accuracy. According to the
   * [documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), the
   * time should be accurate to 5 µs (microseconds). However, due to various constraints, the
   * browser might only be accurate to one millisecond.
   *
   * Note: `WebMidi.time` is simply an alias to `performance.now()`.
   *
   * @type {DOMHighResTimeStamp}
   * @readonly
   */
  get time(): number;

  /**
   * The version of the library as a [semver](https://semver.org/) string.
   *
   * @readonly
   * @type string
   */
  get version(): string;

}

declare const wm: WebMidi;
export { wm as WebMidi };




/**
 * The callback function is executed when the associated event is triggered via [`emit()`](#emit).
 * The [`emit()`](#emit) method relays all additional arguments it received to the callback
 * functions. Since [`emit()`](#emit) can be passed a variable number of arguments, it is up to
 * the developer to make sure the arguments match those of the associated callback. In addition,
 * the callback also separately receives all the arguments present in the listener's
 * [`arguments`](Listener#arguments) property. This makes it easy to pass data from where the
 * listener is added to where the listener is executed.
 *
 * @callback EventEmitterCallback
 * @param {...*} [args] A variable number of arguments matching the ones (if any) that were passed
 * to the [`emit()`](#emit) method (except, the first one) followed by the arguments found in the
 * listener's [`arguments`](Listener#arguments) array.
 */
export type EventEmitterCallback = (...args: any[]) => void;

/**
 * The `Event` object is transmitted when state change events occur.
 *
 * WebMidi
 *  * disabled
 *  * enabled
 *  * midiaccessgranted
 *
 * @property {WebMidi} target The object that dispatched the event.
 * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
 * milliseconds since the navigation start of the document).
 * @property {string} type The type of the event
 *
 */
export interface Event {
  target: Input | InputChannel | Output | WebMidi;
  timestamp: DOMHighResTimeStamp;
  type: string;
}

/**
 * The `ErrorEvent` object is transmitted when an error occurs. Only the `WebMidi` object dispatches
 * this type of event.
 *
 * @property {Input} target The object that dispatched the event.
 * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
 * milliseconds since the navigation start of the document).
 * @property {string} type The type of the event
 *
 * @property {*} error The type of the event
 *
 */
export interface ErrorEvent extends Event {
  error: any;
  target: WebMidi;
}

/**
 * The `PortEvent` object is transmitted when an event occurs on an `Input` or `Output` port.
 *
 * Input
 *  * closed
 *  * disconnected
 *  * opened
 *
 * Output
 *  * closed
 *  * disconnected
 *  * opened
 *
 * WebMidi
 *  * connected
 *  * disconnected
 *  * portschanged
 *
 * @property {Input|Output} port The `Input` or `Output` that triggered the event
 * @property {Input | InputChannel | Output | WebMidi} target The object that dispatched the event.
 * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
 * milliseconds since the navigation start of the document).
 * @property {string} type The type of the event
 *
 */
export interface PortEvent extends Event {
  port: Input | Output;
}

/**
 * The `MessageEvent` object is transmitted when a MIDI message has been received. These events
 * are dispatched by `Input` and `InputChannel` classes:
 *
 * `Input`: activesensing, clock, continue, midimessage, reset, songposition, songselect, start,
 * stop, sysex, timecode, tunerequest, unknownmessage
 *
 * `InputChannel`: allnotesoff, allsoundoff, midimessage, resetallcontrollers, channelaftertouch,
 * localcontrol, monomode, omnimode, pitchbend, programchange
 *
 * @property {Input} port The `Input` that triggered the event.
 * @property {Input | InputChannel} target The object that dispatched the event.
 * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
 * milliseconds since the navigation start of the document).
 * @property {string} type The type of the event
 *
 * @property {Message} message An object containing details about the actual MIDI message content.
 * @property {number} [rawValue] The raw value of the message (if any) between 0-127.
 * @property {number | boolean} [value] The value of the message (if any)
 */
export interface MessageEvent extends PortEvent {
  message: Message;
  port: Input;
  rawValue?: number;
  target: Input | InputChannel;
  value?: number | boolean;
}

/**
 * The `ControlChangeMessageEvent` object is transmitted when a control change MIDI message has been
 * received. There is a general `controlchange` event and a specific `controlchange-controllerxxx`
 * for each controller.
 *
 * @property {Input} port The `Input` that triggered the event.
 * @property {Input | InputChannel} target The object that dispatched the event.
 * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
 * milliseconds since the navigation start of the document).
 * @property {string} type The type of the event
 *
 * @property {Message} message An object containing details about the actual MIDI message content.
 * @property {number} [rawValue] The raw value of the message (if any) between 0-127.
 * @property {number | boolean} [value] The value of the message (if any)
 *
 * @property {object} controller
 * @property {string} controller.name The name of the controller
 * @property {number} controller.number The number of the controller (between 0-127)
 * @property {string} [subtype] The actual controller event type
 */
export interface ControlChangeMessageEvent extends MessageEvent {
  channel: number;
  controller: {
    name: string;
    number: number;
  };
  port: Input;
  subtype?: string;
  target: Input | InputChannel;
}

/**
 * The `NoteMessageEvent` object is transmitted when a note-related MIDI message (`noteoff`,
 * `noteon` or `keyaftertouch`) is received on an input channel
 *
 * @property {Input} port The `Input` that triggered the event.
 * @property {Input | InputChannel} target The object that dispatched the event.
 * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
 * milliseconds since the navigation start of the document).
 * @property {string} type The type of the event
 *
 * @property {Message} message An object containing details about the actual MIDI message content.
 * @property {number} [rawValue] The raw value of the message (if any) between 0-127.
 * @property {number | boolean} [value] The value of the message (if any)
 *
 * @property {Note} note A Note object with details about the triggered note.
 */
export interface NoteMessageEvent extends MessageEvent {
  channel: number;
  note: Note;
  port: Input;
  target: Input | InputChannel;
}

/**
 * The `ParameterNumberMessageEvent` object is transmitted when an RPN or NRPN message is received
 * on an input channel.
 *
 *  * nrpn
 *  * nrpn-databuttondecrement
 *  * nrpn-databuttonincrement
 *  * nrpn-dataentrycoarse
 *  * nrpn-dataentryfine
 *
 *  * rpn
 *  * rpn-databuttondecrement
 *  * rpn-databuttonincrement
 *  * rpn-dataentrycoarse
 *  * rpn-dataentryfine
 *
 * @property {Input} port The `Input` that triggered the event.
 * @property {Input | InputChannel} target The object that dispatched the event.
 * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
 * milliseconds since the navigation start of the document).
 * @property {string} type The type of the event
 *
 * @property {Message} message An object containing details about the actual MIDI message content.
 * @property {number} [rawValue] The raw value of the message (if any) between 0-127.
 * @property {number | boolean} [value] The value of the message (if any)
 *
 * @property {string} parameter The parameter
 * @property {number} parameterMsb The parameter' MSB value (0-127)
 * @property {number} parameterLsb The parameter' LSB value (0-127)
 *
 */
export interface ParameterNumberMessageEvent extends MessageEvent {
  channel: number;
  parameter: string;
  parameterMsb: number;
  parameterLsb: number;
  port: Input;
  target: Input | InputChannel;
}

/**
 * A map of all the events that can be passed to `Input.addListener()`.
 */
export interface InputEventMap {

  // Stage Change
  "closed": (e: PortEvent) => void;
  "disconnected": (e: PortEvent) => void;
  "opened": (e: PortEvent) => void;

  // System Common and System Real-Time
  "activesensing": (e: MessageEvent) => void;
  "clock": (e: MessageEvent) => void;
  "continue": (e: MessageEvent) => void;
  "reset": (e: MessageEvent) => void;
  "songposition": (e: MessageEvent) => void;
  "songselect": (e: MessageEvent) => void;
  "start": (e: MessageEvent) => void;
  "stop": (e: MessageEvent) => void;
  "sysex": (e: MessageEvent) => void;
  "timecode": (e: MessageEvent) => void;
  "tunerequest": (e: MessageEvent) => void;

  // Catch-ALl
  "midimessage": (e: MessageEvent) => void;
  "unknownmessage": (e: MessageEvent) => void;

  // Channel Mode
  "channelaftertouch": (e: MessageEvent) => void;
  "keyaftertouch": (e: NoteMessageEvent) => void;
  "noteoff": (e: NoteMessageEvent) => void;
  "noteon": (e: NoteMessageEvent) => void;
  "pitchbend": (e: MessageEvent) => void;
  "programchange": (e: MessageEvent) => void;

  // Control Change
  "controlchange": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller0": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller1": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller2": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller3": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller4": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller5": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller6": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller7": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller8": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller9": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller10": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller11": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller12": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller13": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller14": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller15": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller16": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller17": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller18": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller19": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller20": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller21": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller22": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller23": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller24": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller25": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller26": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller27": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller28": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller29": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller30": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller31": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller32": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller33": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller34": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller35": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller36": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller37": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller38": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller39": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller40": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller41": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller42": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller43": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller44": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller45": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller46": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller47": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller48": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller49": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller50": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller51": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller52": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller53": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller54": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller55": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller56": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller57": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller58": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller59": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller60": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller61": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller62": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller63": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller64": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller65": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller66": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller67": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller68": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller69": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller70": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller71": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller72": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller73": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller74": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller75": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller76": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller77": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller78": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller79": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller80": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller81": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller82": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller83": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller84": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller85": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller86": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller87": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller88": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller89": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller90": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller91": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller92": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller93": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller94": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller95": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller96": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller97": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller98": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller99": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller100": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller101": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller102": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller103": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller104": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller105": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller106": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller107": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller108": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller109": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller110": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller111": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller112": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller113": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller114": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller115": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller116": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller117": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller118": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller119": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller120": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller121": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller122": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller123": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller124": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller125": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller126": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller127": (e: ControlChangeMessageEvent) => void;

  // Channel Voice
  "allnotesoff": (e: MessageEvent) => void;
  "allsoundoff": (e: MessageEvent) => void;
  "localcontrol": (e: MessageEvent) => void;
  "monomode": (e: MessageEvent) => void;
  "omnimode": (e: MessageEvent) => void;
  "resetallcontrollers": (e: MessageEvent) => void;

  // NRPN
  "nrpn": (e: ParameterNumberMessageEvent) => void;
  "nrpn-databuttondecrement": (e: ParameterNumberMessageEvent) => void;
  "nrpn-databuttonincrement": (e: ParameterNumberMessageEvent) => void;
  "nrpn-dataentrycoarse": (e: ParameterNumberMessageEvent) => void;
  "nrpn-dataentryfine": (e: ParameterNumberMessageEvent) => void;

  // RPN
  "rpn": (e: ParameterNumberMessageEvent) => void;
  "rpn-databuttondecrement": (e: ParameterNumberMessageEvent) => void;
  "rpn-databuttonincrement": (e: ParameterNumberMessageEvent) => void;
  "rpn-dataentrycoarse": (e: ParameterNumberMessageEvent) => void;
  "rpn-dataentryfine": (e: ParameterNumberMessageEvent) => void;

}

/**
 * A map of all the events that can be passed to `InputChannel.addListener()`.
 */
export interface InputChannelEventMap {

  // Catch-ALl
  "midimessage": (e: MessageEvent) => void;

  // Channel Mode
  "channelaftertouch": (e: MessageEvent) => void;
  "keyaftertouch": (e: NoteMessageEvent) => void;
  "noteoff": (e: NoteMessageEvent) => void;
  "noteon": (e: NoteMessageEvent) => void;
  "pitchbend": (e: MessageEvent) => void;
  "programchange": (e: MessageEvent) => void;

  // Control Change
  "controlchange": (e: ControlChangeMessageEvent) => void;

  "controlchange-controller0": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller1": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller2": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller3": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller4": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller5": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller6": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller7": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller8": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller9": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller10": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller11": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller12": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller13": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller14": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller15": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller16": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller17": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller18": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller19": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller20": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller21": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller22": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller23": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller24": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller25": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller26": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller27": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller28": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller29": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller30": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller31": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller32": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller33": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller34": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller35": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller36": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller37": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller38": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller39": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller40": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller41": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller42": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller43": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller44": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller45": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller46": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller47": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller48": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller49": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller50": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller51": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller52": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller53": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller54": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller55": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller56": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller57": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller58": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller59": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller60": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller61": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller62": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller63": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller64": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller65": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller66": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller67": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller68": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller69": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller70": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller71": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller72": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller73": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller74": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller75": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller76": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller77": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller78": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller79": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller80": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller81": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller82": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller83": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller84": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller85": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller86": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller87": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller88": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller89": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller90": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller91": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller92": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller93": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller94": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller95": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller96": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller97": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller98": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller99": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller100": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller101": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller102": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller103": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller104": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller105": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller106": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller107": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller108": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller109": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller110": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller111": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller112": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller113": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller114": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller115": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller116": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller117": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller118": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller119": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller120": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller121": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller122": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller123": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller124": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller125": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller126": (e: ControlChangeMessageEvent) => void;
  "controlchange-controller127": (e: ControlChangeMessageEvent) => void;

  // Channel Voice
  "allnotesoff": (e: MessageEvent) => void;
  "allsoundoff": (e: MessageEvent) => void;
  "localcontrol": (e: MessageEvent) => void;
  "monomode": (e: MessageEvent) => void;
  "omnimode": (e: MessageEvent) => void;
  "resetallcontrollers": (e: MessageEvent) => void;

  // NRPN
  "nrpn": (e: ParameterNumberMessageEvent) => void;
  "nrpn-databuttondecrement": (e: ParameterNumberMessageEvent) => void;
  "nrpn-databuttonincrement": (e: ParameterNumberMessageEvent) => void;
  "nrpn-dataentrycoarse": (e: ParameterNumberMessageEvent) => void;
  "nrpn-dataentryfine": (e: ParameterNumberMessageEvent) => void;

  // RPN
  "rpn": (e: ParameterNumberMessageEvent) => void;
  "rpn-databuttondecrement": (e: ParameterNumberMessageEvent) => void;
  "rpn-databuttonincrement": (e: ParameterNumberMessageEvent) => void;
  "rpn-dataentrycoarse": (e: ParameterNumberMessageEvent) => void;
  "rpn-dataentryfine": (e: ParameterNumberMessageEvent) => void;

}

/**
 * A map of all the events that can be passed to `Output.addListener()`.
 */
export interface OutputEventMap {
  "closed": (e: PortEvent) => void;
  "disconnected": (e: PortEvent) => void;
  "opened": (e: PortEvent) => void;
}

/**
 * A map of all the events that can be passed to `Output.addListener()`.
 */
export interface WebMidiEventMap {
  "connected": (e: PortEvent) => void;
  "disabled": (e: Event) => void;
  "disconnected": (e: PortEvent) => void;
  "enabled": (e: Event) => void;
  "midiaccessgranted": (e: Event) => void;
  "portschanged": (e: PortEvent) => void;
  "error": (e: ErrorEvent) => void;
}
