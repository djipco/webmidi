import {EventEmitter} from "../node_modules/djipevents/dist/esm/djipevents.esm.min.js";
import {Input} from "./Input.js";
import {Output} from "./Output.js";
import {Utilities} from "./Utilities.js";
import {Enumerations} from "./Enumerations.js";
import {InputChannel} from "./InputChannel.js";

/*START-CJS*/
// This is the way to import the necessary modules under Node.js when using "type: commonjs" in the
// package.json file. This block will be stripped in IIFE and ESM versions.
global["performance"] = require("perf_hooks").performance;
global["navigator"] = require("jzz");
/*END-CJS*/

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
 * @fires WebMidi#midiaccessgranted
 *
 * @extends EventEmitter
 * @license Apache-2.0
 */
class WebMidi extends EventEmitter {

  constructor() {

    super();

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
    this.defaults = {
      note: {
        attack: Utilities.from7bitToFloat(64),
        release: Utilities.from7bitToFloat(64),
        duration: Infinity
      }
    };

    /**
     * The [`MIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
     * instance used to talk to the lower-level Web MIDI API. This should not be used directly
     * unless you know what you are doing.
     *
     * @type {?MIDIAccess}
     * @readonly
     */
    this.interface = null;

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
    this.validation = true;

    /**
     * Array of all (Input) objects
     * @type {Input[]}
     * @private
     */
    this._inputs = [];

    /**
     * Array of disconnected [`Input`](Input) objects. This is used when inputs are plugged back in
     * to retain their previous state.
     * @type {Input[]}
     * @private
     */
    this._disconnectedInputs = [];

    /**
     * Array of all [`Output`](Output) objects
     * @type {Output[]}
     * @private
     */
    this._outputs = [];

    /**
     * Array of disconnected [`Output`](Output) objects. This is used when outputs are plugged back
     * in to retain their previous state.
     * @type {Output[]}
     * @private
     */
    this._disconnectedOutputs = [];

    /**
     * Array of statechange events to process. These events must be parsed synchronously so they do
     * not override each other.
     *
     * @type {string[]}
     * @private
     */
    this._stateChangeQueue = [];

    /**
     * @type {number}
     * @private
     */
    this._octaveOffset = 0;

  }

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
  async enable(options = {}, legacy = false) {

    /*START-ESM*/
    // This is the way to import the necessary modules under Node.js when using "type: module" in
    // the package.json file. This block will be stripped in IIFE and CJS versions.
    try {
      const perf_hooks = await import("perf_hooks");
      global["performance"] = perf_hooks.performance;
      // eslint-disable-next-line no-empty
    } catch (err) {} // ignored because it means we already have the modules

    try {
      const jzz = await import("jzz");
      global["navigator"] = jzz.default;
      // eslint-disable-next-line no-empty
    } catch (err) {} // ignored because it means we already have the modules
    /*END-ESM*/

    this.validation = (options.validation !== false);

    if (this.validation) {
      // Backwards-compatibility. Previous syntax was: enable(callback, sysex)
      if (typeof options === "function") options = {callback: options, sysex: legacy};
      if (legacy) options.sysex = true;
    }

    // If already enabled, trigger callback and resolve promise but do not dispatch events.
    if (this.enabled) {
      if (typeof options.callback === "function") options.callback();
      return Promise.resolve();
    }

    // The Jazz-Plugin takes a while to be available (even after the Window's 'load' event has been
    // fired). Therefore, we wait a little while to give it time to finish loading (initiqted in
    // constructor).
    // if (!this.supported) {
    //
    //   await new Promise((resolve, reject) => {
    //
    //     const start = this.time;
    //
    //     const intervalID = setInterval(() => {
    //
    //       if (this.supported) {
    //         clearInterval(intervalID);
    //         resolve();
    //       } else {
    //         if (this.time > start + 1500) {
    //           clearInterval(intervalID);
    //           let error = new Error("The Web MIDI API is not available in your environment.");
    //           if (typeof options.callback === "function") options.callback(error);
    //           reject(error);
    //         }
    //       }
    //
    //     }, 25);
    //
    //   });
    //
    // }

    /**
     * Event emitted when an error occurs trying to enable `WebMidi`
     *
     * @event WebMidi#error
     * @type {object}
     * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {WebMidi} target The object that triggered the event
     * @property {string} type `error`
     * @property {*} error Actual error that occurred
     */
    const errorEvent = {
      timestamp: this.time,
      target: this,
      type: "error",
      error: undefined
    };

    /**
     * Event emitted once the MIDI interface has been successfully created (which implies user has
     * granted access to MIDI).
     *
     * @event WebMidi#midiaccessgranted
     * @type {object}
     * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
     * since the navigation start of the document).
     * @property {WebMidi} target The object that triggered the event
     * @property {string} type `midiaccessgranted`
     */
    const midiAccessGrantedEvent = {
      timestamp: this.time,
      target: this,
      type: "midiaccessgranted"
    };

    /**
     * Event emitted once `WebMidi` has been fully enabled
     *
     * @event WebMidi#enabled
     * @type {object}
     * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
     * since the navigation start of the document).
     * @property {WebMidi} target The object that triggered the event
     * @property {string} type `"enabled"`
     */
    const enabledEvent = {
      timestamp: this.time,
      target: this,
      type: "enabled"
    };

    // Request MIDI access (this iw where the prompt will appear)
    try {
      this.interface = await navigator.requestMIDIAccess(
        {sysex: options.sysex, software: options.software}
      );
    } catch(err) {
      errorEvent.error = err;
      this.emit("error", errorEvent);
      if (typeof options.callback === "function") options.callback(err);
      return Promise.reject(err);
    }

    // Now that the Web MIDI API interface has been created, we trigger the 'midiaccessgranted'
    // event. This allows the developer an occasion to assign listeners on 'connected' events.
    this.emit("midiaccessgranted", midiAccessGrantedEvent);

    // We setup the state change listener before creating the ports so that it properly catches the
    // the ports' `connected` events
    this.interface.onstatechange = this._onInterfaceStateChange.bind(this);

    // Update inputs and outputs (this is where `Input` and `Output` objects are created).
    try {
      await this._updateInputsAndOutputs();
    } catch (err) {
      errorEvent.error = err;
      this.emit("error", errorEvent);
      if (typeof options.callback === "function") options.callback(err);
      return Promise.reject(err);
    }

    // If we make it here, the ports have been successfully created, so we trigger the 'enabled'
    // event.
    this.emit("enabled", enabledEvent);

    // Execute the callback (if any) and resolve the promise with 'this' (for chainability)
    if (typeof options.callback === "function") options.callback();
    return Promise.resolve(this);

  }

  /**
   * Completely disables **WebMidi.js** by unlinking the MIDI subsystem's interface and closing all
   * [`Input`](Input) and [`Output`](Output) objects that may have been opened. This also means that
   * listeners added to [`Input`](Input) objects, [`Output`](Output) objects or to `WebMidi` itself
   * are also destroyed.
   *
   * @async
   * @returns {Promise}
   *
   * @throws {Error} The Web MIDI API is not supported by your environment.
   *
   * @since 2.0.0
   */
  async disable() {

    return this._destroyInputsAndOutputs().then(() => {

      if (typeof navigator.close === "function") navigator.close();

      if (this.interface) this.interface.onstatechange = undefined;
      this.interface = null; // also resets enabled, sysexEnabled

      /**
       * Event emitted once `WebMidi` has been successfully disabled.
       *
       * @event WebMidi#disabled
       * @type {object}
       * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {WebMidi} target The object that triggered the event
       * @property {string} type `"disabled"`
       */
      let event = {
        timestamp: this.time,
        target: this,
        type: "disabled"
      };

      // Finally, trigger the 'disabled' event and then remove all listeners.
      this.emit("disabled", event);
      this.removeListener();

    });

  };

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
   *
   * @returns {Input|false} An [`Input`](Input) object matching the specified ID string or `false`
   * if no matching input can be found.
   *
   * @throws {Error} WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getInputById(id) {

    if (this.validation) {
      if (!this.enabled) throw new Error("WebMidi is not enabled.");
      if (!id) return false;
    }

    for (let i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i].id === id.toString()) return this.inputs[i];
    }

    return false;

  };

  /**
   * Returns the first [`Input`](Input) object whose name **contains** the specified string. Note
   * that the port names change from one environment to another. For example, Chrome does not report
   * input names in the same way as the Jazz-Plugin does.
   *
   * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
   * those visible in the [inputs](WebMidi#inputs) array).
   *
   * @returns {Input|false} The [`Input`](Input) that was found or `false` if no input contained the
   * specified name.
   *
   * @throws {Error} WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getInputByName(name) {

    if (this.validation) {
      if (!this.enabled) throw new Error("WebMidi is not enabled.");
      if (!name) return false;
      name = name.toString();
    }

    for (let i = 0; i < this.inputs.length; i++) {
      if (~this.inputs[i].name.indexOf(name)) return this.inputs[i];
    }

    return false;

  };

  /**
   * Returns the first [`Output`](Output) object whose name **contains** the specified string. Note
   * that the port names change from one environment to another. For example, Chrome does not report
   * input names in the same way as the Jazz-Plugin does.
   *
   * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
   * those visible in the [`outputs`](#outputs) array).
   *
   * @returns {Output|false} The [`Output`](Output) that was found or `false` if no output matched
   * the specified name.
   *
   * @throws {Error} WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getOutputByName(name) {

    if (this.validation) {
      if (!this.enabled) throw new Error("WebMidi is not enabled.");
      if (!name) return false;
      name = name.toString();
    }

    for (let i = 0; i < this.outputs.length; i++) {
      if (~this.outputs[i].name.indexOf(name)) return this.outputs[i];
    }

    return false;

  };

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
   *
   * @returns {Output|false} An [`Output`](Output) object matching the specified ID string. If no
   * matching output can be found, the method returns `false`.
   *
   * @throws {Error} WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getOutputById(id) {

    if (this.validation) {
      if (!this.enabled) throw new Error("WebMidi is not enabled.");
      if (!id) return false;
    }

    for (let i = 0; i < this.outputs.length; i++) {
      if (this.outputs[i].id === id.toString()) return this.outputs[i];
    }

    return false;

  };

  /**
   * @private
   * @deprecated since version 3.0.0, use Utilities.toNoteNumber() instead.
   */
  noteNameToNumber(name) {
    if (this.validation) {
      console.warn(
        "The noteNameToNumber() method is deprecated. Use " +
        "Utilities.toNoteNumber() instead."
      );
    }
    return Utilities.toNoteNumber(name, this.octaveOffset);
  }

  /**
   * @private
   * @deprecated since 3.0.0, use Utilities.getNoteDetails() instead.
   */
  getOctave(number) {

    if (this.validation) {
      console.warn("The getOctave()is deprecated. Use Utilities.getNoteDetails() instead");
      number = parseInt(number);
    }

    if (!isNaN(number) && number >= 0 && number <= 127) {
      return Utilities.getNoteDetails(Utilities.offsetNumber(number, this.octaveOffset)).octave;
    } else {
      return false;
    }

  }

  /**
   * @private
   * @deprecated since 3.0.0, use Utilities.sanitizeChannels() instead.
   */
  sanitizeChannels(channel) {

    if (this.validation) {
      console.warn("The sanitizeChannels() method has been moved to the utilities class.");
    }

    return Utilities.sanitizeChannels(channel);

  }

  /**
   * @private
   * @deprecated since version 3.0.0, use Utilities.sanitizeChannels() instead.
   */
  toMIDIChannels(channel) {

    if (this.validation) {
      console.warn(
        "The toMIDIChannels() method has been deprecated. Use Utilities.sanitizeChannels() instead."
      );
    }

    return Utilities.sanitizeChannels(channel);

  }

  /**
   * @private
   * @deprecated since version 3.0.0, use Utilities.guessNoteNumber() instead.
   */
  guessNoteNumber(input) {

    if (this.validation) {
      console.warn(
        "The guessNoteNumber() method has been deprecated. Use Utilities.guessNoteNumber() instead."
      );
    }

    return Utilities.guessNoteNumber(input, this.octaveOffset);

  }

  /**
   * @private
   * @deprecated since version 3.0.0, use Utilities.buildNoteArray() instead.
   */
  getValidNoteArray(notes, options = {}) {
    if (this.validation) {
      console.warn(
        "The getValidNoteArray() method has been moved to the Utilities.buildNoteArray()"
      );
    }
    return Utilities.buildNoteArray(notes, options);
  }

  /**
   * @private
   * @deprecated since version 3.0.0, use Utilities.toTimestamp() instead.
   */
  convertToTimestamp(time) {

    if (this.validation) {
      console.warn(
        "The convertToTimestamp() method has been moved to Utilities.toTimestamp()."
      );
    }

    return Utilities.toTimestamp(time);

  }

  /**
   * @return {Promise<void>}
   * @private
   */
  async _destroyInputsAndOutputs() {

    let promises = [];

    this.inputs.forEach(input => promises.push(input.destroy()));
    this.outputs.forEach(output => promises.push(output.destroy()));

    return Promise.all(promises).then(() => {
      this._inputs = [];
      this._outputs = [];
    });

  }

  /**
   * @private
   */
  _onInterfaceStateChange(e) {

    this._updateInputsAndOutputs();

    /**
     * Event emitted when an [`Input`](Input) or [`Output`](Output) port is connected or
     * disconnected. This event is typically fired whenever a MIDI device is plugged in or
     * unplugged. Please note that it may fire several times if a device possesses multiple inputs
     * and/or outputs (which is often the case).
     *
     * @event WebMidi#portschanged
     * @type {object}
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred
     * (in milliseconds since the navigation start of the document).
     * @property {string} type `portschanged`
     * @property {Input|Output} target The [`Input`](Input) or [`Output`](Output) object that
     * triggered the event.
     */

    /**
     * Event emitted when an [`Input`](Input) or [`Output`](Output) becomes available. This event is
     * typically fired whenever a MIDI device is plugged in. Please note that it may fire several
     * times if a device possesses multiple inputs and/or outputs (which is often the case).
     *
     * @event WebMidi#connected
     * @type {object}
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred
     * (in milliseconds since the navigation start of the document).
     * @property {string} type `connected`
     * @property {Input|Output} target The [`Input`](Input) or [`Output`](Output) object that
     * triggered the event.
     */

    /**
     * Event emitted when an [`Input`](Input) or [`Output`](Output) becomes unavailable. This event
     * is typically fired whenever a MIDI device is unplugged. Please note that it may fire several
     * times if a device possesses multiple inputs and/or outputs (which is often the case).
     *
     * @event WebMidi#disconnected
     * @type {object}
     * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
     * since the navigation start of the document).
     * @property {string} type `disconnected`
     * @property {object} target Object with properties describing the [`Input`](Input) or
     * [`Output`](Output) that triggered the event.
     */
    let event = {
      timestamp: e.timeStamp,
      type: e.port.state
    };

    // We check if "connection" is "open" because connected events are also triggered with
    // "connection=closed"
    if (e.port.state === "connected" && e.port.connection === "open") {

      if (e.port.type === "output") {
        event.port = this.getOutputById(e.port.id); // legacy
        event.target = event.port;
      } else if (e.port.type === "input") {
        event.port = this.getInputById(e.port.id); // legacy
        event.target = event.port;
      }

      this.emit(e.port.state, event);

      event.type = "portschanged";
      this.emit(event.type, event);

      // We check if "connection" is "pending" because we do not always get the "closed" event
    } else if (e.port.state === "disconnected" && e.port.connection === "pending") {

      // It feels more logical to include a `target` property instead of a `port` property. This is
      // the terminology used everywhere in the library.
      event.port = {
        connection: "closed",
        id: e.port.id,
        manufacturer: e.port.manufacturer,
        name: e.port.name,
        state: e.port.state,
        type: e.port.type
      };

      event.target = event.port;

      this.emit(e.port.state, event);

      event.type = "portschanged";
      this.emit(event.type, event);

    }

  };

  /**
   * @private
   */
  async _updateInputsAndOutputs() {

    return Promise.all([
      this._updateInputs(),
      this._updateOutputs()
    ]);

  };

  /**
   * @private
   */
  async _updateInputs() {

    // We must check for the existence of this.interface because it might have been closed via
    // WebMidi.disable().
    if (!this.interface) return;

    // Check for items to remove from the existing array (because they are no longer being reported
    // by the MIDI back-end).
    for (let i = this._inputs.length - 1; i >= 0; i--) {
      const current = this._inputs[i];
      const inputs = Array.from(this.interface.inputs.values());
      if (! inputs.find(input => input === current._midiInput)) {
        // Instead of destroying removed inputs, we stash them in case they come back (which is the
        // case when the computer goes to sleep and is later brought back online).
        this._disconnectedInputs.push(current);
        this._inputs.splice(i, 1);
      }
    }

    // Array to hold pending promises from trying to open all input ports
    let promises = [];

    // Add new inputs (if not already present)
    this.interface.inputs.forEach(nInput => {

      // Check if the input is currently absent from the 'inputs' array.
      if (! this._inputs.find(input => input._midiInput === nInput) ) {

        // If the input has previously been stashed away, reuse it. If not, create a new one.
        let input = this._disconnectedInputs.find(input => input._midiInput === nInput);
        if (!input) input = new Input(nInput);
        this._inputs.push(input);
        promises.push(input.open());

      }

    });

    // Return a promise that resolves when all promises have resolved
    return Promise.all(promises);

  };

  /**
   * @private
   */
  async _updateOutputs() {

    // We must check for the existence of this.interface because it might have been closed via
    // WebMidi.disable().
    if (!this.interface) return;

    // Check for items to remove from the existing array (because they are no longer being reported
    // by the MIDI back-end).
    for (let i = this._outputs.length - 1; i >= 0; i--) {
      const current = this._outputs[i];
      const outputs = Array.from(this.interface.outputs.values());
      if (! outputs.find(output => output === current._midiOutput)) {
        // Instead of destroying removed inputs, we stash them in case they come back (which is the
        // case when the computer goes to sleep and is later brought back online).
        this._disconnectedOutputs.push(current);
        this._outputs.splice(i, 1);
      }
    }

    // Array to hold pending promises from trying to open all output ports
    let promises = [];

    // Add new outputs (if not already present)
    this.interface.outputs.forEach(nOutput => {

      // Check if the output is currently absent from the 'outputs' array.
      if (! this._outputs.find(output => output._midiOutput === nOutput) ) {

        // If the output has previously been stashed away, reuse it. If not, create a new one.
        let output = this._disconnectedOutputs.find(output => output._midiOutput === nOutput);
        if (!output) output = new Output(nOutput);
        this._outputs.push(output);
        promises.push(output.open());

      }

    });

    // Return a promise that resolves when all sub-promises have resolved
    return Promise.all(promises);

  };

  // injectPluginMarkup(parent) {
  //
  //   // Silently ignore on Node.js
  //   if (this.isNode) return;
  //
  //   // Default to <body> if no parent is specified
  //   if (!(parent instanceof Element) && !(parent instanceof HTMLDocument)) {
  //     parent = document.body;
  //   }
  //
  //   // IE10 needs this:
  //   // <meta http-equiv="X-UA-Compatible" content="requiresActiveX=true"/>
  //
  //   // Create markup and add to parent
  //   const obj = document.createElement("object");
  //   obj.classid = "CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90"; // IE
  //   if (!obj.isJazz) obj.type = "audio/x-jazz";                 // Standards-compliant
  //   obj.style.visibility = "hidden";
  //   obj.style.width = obj.style.height = "0px";
  //   parent.appendChild(obj);
  //
  // }

  /**
   * Indicates whether access to the host's MIDI subsystem is active or not.
   *
   * @readonly
   * @type {boolean}
   */
  get enabled() {
    return this.interface !== null;
  }

  /**
   * An array of all currently available MIDI inputs.
   *
   * @readonly
   * @type {Array}
   */
  get inputs() {
    return this._inputs;
  }

  /**
   * Indicates whether the current environment is Node.js or not. If you need to check if we are in
   * browser, use [`isBrowser`](#isBrowser). In certain environments (such as Electron and NW.js)
   * [`isNode`](#isNode) and [`isBrowser`](#isBrowser) can both be true at the same time.
   * @type {boolean}
   */
  get isNode() {

    return (Object.prototype.toString.call(
      typeof process !== "undefined" ? process : 0
    ) === "[object process]");

    // Alternative way to try
    // return typeof process !== "undefined" &&
    //   process.versions != null &&
    //   process.versions.node != null;

  }

  /**
   * Indicates whether the current environment is a browser environment or not. If you need to check
   * if we are in Node.js, use [`isNode`](#isNode). In certain environments (such as Electron and
   * NW.js) [`isNode`](#isNode) and [`isBrowser`](#isBrowser) can both be true at the same time.
   * @type {boolean}
   */
  get isBrowser() {
    return typeof window !== "undefined" && typeof window.document !== "undefined";
  }

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
  get octaveOffset() {
    return this._octaveOffset;
  }
  set octaveOffset(value) {

    if (this.validation) {
      value = parseInt(value);
      if (isNaN(value)) throw new TypeError("The 'octaveOffset' property must be an integer.");
    }

    this._octaveOffset = value;

  }

  /**
   * An array of all currently available MIDI outputs as [`Output`](Output) objects.
   *
   * @readonly
   * @type {Array}
   */
  get outputs() {
    return this._outputs;
  }

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
  get supported() {
    return (typeof navigator !== "undefined" && navigator.requestMIDIAccess);
  }

  /**
   * Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
   * enabled via the [`enable()`](#enable) method.
   *
   * @readonly
   * @type boolean
   */
  get sysexEnabled() {
    return !!(this.interface && this.interface.sysexEnabled);
  }

  /**
   * The elapsed time, in milliseconds, since the time
   * [origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).
   * Said simply, it is the number of milliseconds that passed since the page was loaded. Being a
   * floating-point number, it has sub-millisecond accuracy. According to the
   * [documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), the
   * time should be accurate to 5 µs (microseconds). However, due to various constraints, the
   * browser might only be accurate to one millisecond.
   *
   * @type {DOMHighResTimeStamp}
   * @readonly
   */
  get time() {
    return performance.now();
  }

  /**
   * The version of the library as a [semver](https://semver.org/) string.
   *
   * @readonly
   * @type string
   */
  get version() {
    return "[VI]{version}[/VI]";
  }

  /**
   * @private
   * @deprecated since 3.0.0. Use InputChannel.EVENTS instead.
   */
  get CHANNEL_EVENTS() {
    if (this.validation) {
      console.warn(
        "The CHANNEL_EVENTS enum has been moved to InputChannel.EVENTS."
      );
    }
    return InputChannel.EVENTS;
  }

  /**
   * @private
   * @deprecated since 3.0.0. Use Enumerations.MIDI_SYSTEM_MESSAGES instead.
   */
  get MIDI_SYSTEM_MESSAGES() {

    if (this.validation) {
      console.warn(
        "The MIDI_SYSTEM_MESSAGES enum has been moved to " +
        "Enumerations.MIDI_SYSTEM_MESSAGES."
      );
    }

    return Enumerations.MIDI_SYSTEM_MESSAGES;

  }

  /**
   * @private
   * @deprecated since 3.0.0. Use Enumerations.MIDI_CHANNEL_MODE_MESSAGES instead
   */
  get MIDI_CHANNEL_MODE_MESSAGES() {

    if (this.validation) {
      console.warn(
        "The MIDI_CHANNEL_MODE_MESSAGES enum has been moved to " +
        "Enumerations.MIDI_CHANNEL_MODE_MESSAGES."
      );
    }

    return Enumerations.MIDI_CHANNEL_MODE_MESSAGES;

  }

  /**
   * @private
   * @deprecated since 3.0.0. Use Enumerations.MIDI_CONTROL_CHANGE_MESSAGES instead.
   */
  get MIDI_CONTROL_CHANGE_MESSAGES() {

    if (this.validation) {
      console.warn(
        "The MIDI_CONTROL_CHANGE_MESSAGES enum has been moved to " +
        "Enumerations.MIDI_CONTROL_CHANGE_MESSAGES."
      );
    }

    return Enumerations.MIDI_CONTROL_CHANGE_MESSAGES;

  }

  /**
   * @deprecated since 3.0.0. Use Enumerations.MIDI_REGISTERED_PARAMETERS instead.
   * @private
   */
  get MIDI_REGISTERED_PARAMETER() {

    if (this.validation) {
      console.warn(
        "The MIDI_REGISTERED_PARAMETER enum has been moved to " +
        "Enumerations.MIDI_REGISTERED_PARAMETERS."
      );
    }

    return this.MIDI_REGISTERED_PARAMETERS;

  }

  /**
   * @deprecated since 3.0.0.
   * @private
   */
  get NOTES() {

    if (this.validation) {
      console.warn("The NOTES enum has been deprecated.");
    }

    return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  }

}

// Export singleton instance of WebMidi class. The 'constructor' is nulled so that it cannot be used
// to instantiate a new WebMidi object or extend it. However, it is not freezed so it remains
// extensible (properties can be added at will).
const wm = new WebMidi();
wm.constructor = null;
export {wm as WebMidi};

export {Note} from "./Note.js";
export {Utilities} from "./Utilities.js";
export {Enumerations} from "./Enumerations.js";
export {Message} from "./Message.js";
export {Forwarder} from "./Forwarder.js";
