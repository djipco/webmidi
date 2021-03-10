import {EventEmitter} from "../node_modules/djipevents/dist/djipevents.esm.min.js";
import {Input} from "./Input.js";
import {Output} from "./Output.js";
import {Note} from "./Note.js";

/**
 * The `WebMidi` object makes it easier to work with the Web MIDI API. Basically, it simplifies
 * sending outgoing MIDI messages and reacting to incoming MIDI messages.
 *
 * When using the WebMidi.js library, the `WebMidi` class has already been instantiated for you.
 * If you use the **IIFE** version, you should simply use the global object called `WebMidi`. If you
 * use the **CJS** (CommonJS) or **ESM** (ES6 module) version, you get an already-instantiated
 * object. This means there is no need to instantiate a new `WebMidi` object directly.
 *
 * The `WebMidi` object extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
 * [removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
 * [hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
 * others.
 *
 * @fires WebMidi#connected
 * @fires WebMidi#disconnected
 * @fires WebMidi#enabled
 * @fires WebMidi#disabled
 *
 * @extends EventEmitter
 */
class WebMidi extends EventEmitter {

  constructor() {

    super();

    /**
     * The `MIDIAccess` instance used to talk to the Web MIDI API. This should not be used directly
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
     * validation turned on.
     *
     * @type {boolean}
     */
    this.validation = true;

    /**
     * Array of all {@link Input} objects
     * @type {Input[]}
     * @private
     */
    this._inputs = [];

    /**
     * Array of all {@link Output} objects
     * @type {Output[]}
     * @private
     */
    this._outputs = [];

    /**
     * Array of statechange events to process. These events must be parsed synchronously so they do
     * not override each other.
     *
     * @type {string[]}
     * @private
     */
    this._stateChangeQueue = [];

    /**
     *
     * @type {number}
     * @private
     */
    this._octaveOffset = 0;

    // Check if performance.now() is available. In a modern browser, it should be. In Node.js, we
    // must require the perf_hooks module which is available in v8.5+.
    if (
      !(
        typeof window !== "undefined" &&
        typeof window.performance !== "undefined" &&
        typeof window.performance.now === "function"
      )
    ) {
      if (this.isNode) global.performance = require("perf_hooks").performance;
    }

    // If we are inside Node.js, polyfill navigator.requestMIDIAccess() using jzz. This takes a
    // while. This is why we check for it again in enable().
    if (this.isNode) global.navigator = require("jzz");

  }

  /**
   * Checks if the Web MIDI API is available in the current environment and then tries to connect to
   * the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
   * be displayed to the user.
   *
   * To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
   * `true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
   * and system exclusive messages are always enabled. You can check the
   * [sysexEnabled]{@link WebMidi#sysexEnabled} property to confirm.
   *
   * To enable access to software synthesizers available on the host, you would set the `software`
   * option to `true`. However, this option is only there to future-proof the library as support for
   * software synths has not yet been implemented in any browser (as of April 2020).
   *
   * There are 3 ways to execute code after `WebMidi` has been enabled:
   *
   * - Pass a callback function in the options
   * - Listen to the `enabled` event
   * - Wait for the promise to resolve
   *
   * In order, this is what happens towards the end of the enabling process:
   *
   * 1. callback is executed
   * 2. `enabled` event is triggered
   * 3. `connected` events from available inputs and outputs are triggered
   * 4. promise is resolved
   *
   * The promise is fulfilled with an object containing two properties (`inputs` and `outputs`) that
   * contain arrays of available inputs and outputs, respectively.
   *
   * **Important note**: starting with Chrome v77, a page using Web MIDI API must be hosted on a
   * secure origin (`https://`, `localhost` or `file:///`) and the user will always be prompted to
   * authorize the operation (no matter if the `sysex` option is `true` or not).
   *
   * ##### Examples
   * ```js
   * // Enabling WebMidi and using the promise
   * WebMidi.enable().then(ports => {
   *   console.log("WebMidi.js has been enabled!");
   *   console.log("Inputs: ", ports.inputs);
   *   console.log("Outputs: ", ports.outputs);
   * })
   * ```
   *
   * ```js
   * // Enabling WebMidi and listening to 'enabled' event
   * WebMidi.addListener("enabled", e => {
   *   console.log("WebMidi.js has been enabled!");
   * });
   * WebMidi.enable();
   * ```
   *
   * ```js
   * // Enabling WebMidi and using callback function
   * WebMidi.enable({callback: e => {
   *   console.log("WebMidi.js has been enabled!");
   * });
   * ```
   *
   * @param [options] {Object}
   *
   * @param [options.callback] {function} A function to execute once the operation completes. This
   * function will receive an `Error` object if enabling the Web MIDI API failed.
   *
   * @param [options.sysex=false] {boolean} Whether to enable MIDI system exclusive messages or not.
   *
   * @param [options.validation=true] {boolean} Whether to enable library-wide validation of method
   * arguments and setter values. This is an advanced setting that should be used carefully. Setting
   * `validation` to `false` improves performance but should only be done once the project has been
   * thoroughly tested with validation turned on.
   *
   * @param [options.software=false] {boolean} Whether to request access to software synthesizers on
   * the host system. This is part of the spec but has not yet been implemented by most browsers as
   * of April 2020.
   *
   * @async
   *
   * @returns {Promise<Object>} The promise is fulfilled with an object containing two properties
   * (`inputs` and `outputs`) that contain arrays of available inputs and outputs, respectively.
   *
   * @throws Error The Web MIDI API is not supported in your environment.
   * @throws Error Jazz-Plugin must be installed to use WebMIDIAPIShim.
   */
  async enable(options = {}, sysex = false) {

    if (this.enabled) return Promise.resolve();

    this.validation = (options.validation !== false);

    if (this.validation) {
      // Backwards-compatibility. Previous syntax was: enable(callback, sysex)
      if (typeof options === "function") options = {callback: options, sysex: sysex};
      if (sysex) options.sysex = true;
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

    // Request MIDI access
    try {
      this.interface = await navigator.requestMIDIAccess(
        {sysex: options.sysex, software: options.software}
      );
    } catch(err) {
      if (typeof options.callback === "function") options.callback(err);
      return Promise.reject(err);
    }

    /**
     * Event emitted once `WebMidi` has been successfully enabled.
     *
     * @event WebMidi#enabled
     * @type {Object}
     * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
     * since the navigation start of the document).
     * @property {WebMidi} target The object that triggered the event
     * @property {string} type `enabled`
     */
    let event = {
      timestamp: this.time,
      target: this,
      type: "enabled"
    };

    // Trigger the 'enabled' event. We do it before emitting the 'connected' events so that they can
    // be listened to in callbacks tied to the 'enabled' event.
    this.emit("enabled", event);
    if (typeof options.callback === "function") options.callback();

    // We setup the statechange listener before creating the ports so that if properly catches the
    // the ports' `connected` events
    this.interface.onstatechange = this._onInterfaceStateChange.bind(this);

    // Update inputs and outputs (this is where `Input` and `Output` objects are created). If
    // successful, we return a promise fulfilled with all the input/output ports that were found.
    try {
      let ports = await this._updateInputsAndOutputs();
      return Promise.resolve({
        inputs: ports[0],
        outputs: ports[1]
      });
    } catch (err) {
      return Promise.reject(err);
    }

  }

  /**
   * Completely disables `WebMidi.js` by unlinking the MIDI subsystem's interface and closing all
   * {@link Input} and {@link Output} objects that may be available. This also means that listeners
   * added to {@link Input} objects, {@link Output} objects or to `WebMidi` itself are also
   * destroyed.
   *
   * @async
   * @returns {Promise<void>}
   *
   * @throws Error The Web MIDI API is not supported by your environment.
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
       * @type {Object}
       * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {WebMidi} target The object that triggered the event
       * @property {string} type `disabled`
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
   * Returns the {@link Input} object that matches the specified ID string or `false` if no matching
   * input is found. As per the Web MIDI API specification, IDs are strings (not integers).
   *
   * Please note that IDs change from one host to another. For example, Chrome does not use the same
   * kind of IDs as Jazz-Plugin.
   *
   * @param id {string} The ID string of the input. IDs can be viewed by looking at the
   * [inputs]{@link WebMidi#inputs} array. Even though they sometimes look like integers, IDs are
   * strings.
   *
   * @returns {Input|false} An {@link Input} object matching the specified ID string. If no matching
   * input can be found, the method returns `false`.
   *
   * @throws Error WebMidi is not enabled.
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
   * Returns the first {@link Input} object whose name **contains** the specified string. Note that
   * the port names change from one environment to another. For example, Chrome does not report
   * input names in the same way as the Jazz-Plugin does.
   *
   * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
   * those visible in the [inputs]{@link WebMidi#inputs} array).
   *
   * @returns {Input|false} The {@link Input} that was found or `false` if no input contained the
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
   * Returns the first {@link Output} object whose name **contains** the specified string. Note that
   * the port names change from one environment to another. For example, Chrome does not report
   * input names in the same way as the Jazz-Plugin does.
   *
   * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
   * those visible in the [outputs]{@link WebMidi#outputs} array).
   *
   * @returns {Output|false} The {@link Output} that was found or `false` if no output matched the
   * specified name.
   *
   * @throws Error WebMidi is not enabled.
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
   * Returns the {@link Output} object that matches the specified ID string or `false` if no
   * matching output is found. As per the Web MIDI API specification, IDs are strings (not
   * integers).
   *
   * Please note that IDs change from one host to another. For example, Chrome does not use the same
   * kind of IDs as Jazz-Plugin.
   *
   * @param id {string} The ID string of the port. IDs can be viewed by looking at the
   * [outputs]{@link WebMidi#outputs} array.
   *
   * @returns {Output|false} An {@link Output} object matching the specified ID string. If no
   * matching output can be found, the method returns `false`.
   *
   * @throws Error WebMidi is not enabled.
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
   * Returns a MIDI note number matching the note name passed in the form of a string parameter. The
   * note name must include the octave number. The name can also optionally include a sharp (#),
   * a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
   * names: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.
   *
   * When converting note names to numbers, C4 is considered to be middle C (MIDI note number 60) as
   * per the scientific pitch notation standard.
   *
   * The resulting note number is offset by the [octaveOffset]{@link WebMidi#octaveOffset} value (if
   * not zero). For example, if you pass in "C4" and the [octaveOffset]{@link WebMidi#octaveOffset}
   * value is 2, the resulting MIDI note number will be 36.
   *
   * **Note**: since v3.x, this function returns `false` instead of throwing an error when it cannot
   * parse the name to a number.
   *
   * @param name {string} The name of the note in the form of a letter, followed by an optional "#",
   * "##", "b" or "bb" followed by the octave number.
   *
   * @returns {number|false} The MIDI note number (an integer between 0 and 127) or `false` if the
   * name could not successfully be parsed to a number.
   */
  getNoteNumberByName(name) {

    if (this.validation) {
      if (typeof name !== "string") name = "";
    }

    let matches = name.match(/([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)/i);
    if(!matches) return false;

    let semitones = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    let semitone = semitones[matches[1].toUpperCase()];
    let octave = parseInt(matches[3]);
    let result = ((octave + 1 - Math.floor(this.octaveOffset)) * 12) + semitone;

    if (matches[2].toLowerCase().indexOf("b") > -1) {
      result -= matches[2].length;
    } else if (matches[2].toLowerCase().indexOf("#") > -1) {
      result += matches[2].length;
    }

    if (result < 0 || result > 127) return false;

    return result;

  };

  /**
   * @private
   * @deprecated since version 3.0. Use getNoteNumberByName() instead.
   */
  noteNameToNumber(name) {
    console.warn(
      "The noteNameToNumber() method has been deprecated. Use getNoteNumberByName() instead."
    );
    return this.getNoteNumberByName(name);
  }

  /**
   * Returns the octave number for the specified MIDI note number (0-127). By default, the value is
   * based on middle C (note number 60) being placed on the 4th octave (C4). However, by using the
   * [octaveOffset]{@link WebMidi#octaveOffset} property, you can offset the result as desired.
   *
   * **Note**: since v3.x, this method returns `false` instead of `undefined` when the value cannot
   * be parsed to a valid octave.
   *
   * @param number {number} An integer representing a valid MIDI note number (between 0 and 127).
   *
   * @returns {number|false} The octave (as a signed integer) or `false` if the value could not be
   * parsed to a valid octave.
   *
   * @since 2.0.0-rc.6
   */
  getOctave(number) {

    if (this.validation) {
      number = parseInt(number);
    }

    if (!isNaN(number) && number >= 0 && number <= 127) {
      return Math.floor(number / 12 - 1) + this.octaveOffset;
    } else {
      return false;
    }

  }

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
   * @returns {Array} An array of 0 or more valid MIDI channel numbers.
   */
  sanitizeChannels(channel) {

    let channels;

    if (this.validation) {

      if (channel === "all") { // backwards-compatibility
        channels = ["all"];
      } else if (channel === "none") { // backwards-compatibility
        return [];
      }

    }

    if (!Array.isArray(channel)) {
      channels = [channel];
    } else {
      channels = channel;
    }

    // In order to preserve backwards-compatibility, we let this assignment as it is.
    if (channels.indexOf("all") > -1) {
      channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    }

    return channels
      .map(function(ch) {
        return parseInt(ch);
      })
      .filter(function(ch) {
        return (ch >= 1 && ch <= 16);
      });

  }

  /**
   * @private
   * @deprecated since version 3.0. Use sanitizeChannels() instead.
   */
  toMIDIChannels(channel) {

    if (this.validation) {
      console.warn(
        "The toMIDIChannels() method has been deprecated. Use sanitizeChannels() instead."
      );
    }

    return this.sanitizeChannels(channel);

  }

  /**
   * Returns a valid MIDI note number (0-127) given the specified input. The parameter usually is a
   * string containing a note name (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer between 0
   * and 127 is passed, it will simply be returned as is (for convenience). Other strings will be
   * parsed for integer, if possible.
   *
   * **Note**: since v3.x, this method returns `false` instead of throwing an error when the input
   * is invalid.
   *
   * @param input {string|number} A string to extract the note number from. An integer can also be
   * used, in this case it will simply be returned as is (if between 0 and 127).
   *
   * @returns {number|false} A valid MIDI note number (0-127) or `false` if the input could not
   * successfully be parsed to a note number.
   */
  guessNoteNumber(input) {

    let output = false;

    if (Number.isInteger(input) && input >= 0 && input <= 127) {        // uint
      output = parseInt(input);
    } else if (parseInt(input) >= 0 && parseInt(input) <= 127) {        // float or uint as string
      output = parseInt(input);
    } else if (typeof input === "string" || input instanceof String) {  // string
      output = this.getNoteNumberByName(input);
    }

    if (output === false) return false;
    return output;

  }

  /**
   * Converts an input value, which can be an unsigned integer (0-127), a note name, a {@link Note}
   * object or an array of the previous types, to an array of {@link Note} objects.
   *
   * {@link Note} objects are returned as is. For note numbers and names, a {@link Note} object is
   * created with the options specified. An error will be thrown when encountering invalid input.
   *
   * @param [notes] {number|string|Note|number[]|string[]|Note[]}
   *
   * @param {Object} [options={}]
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the note should
   * be explicitly stopped.
   *
   * @param {number} [options.attack=0.5] The note's attack velocity as a decimal number between 0
   * and 1.
   *
   * @param {number} [options.release=0.5] The note's release velocity as a decimal number between 0
   * and 1.
   *
   * @param {number} [options.rawAttack=64] The note's attack velocity as an integer between 0 and
   * 127.
   *
   * @param {number} [options.rawRelease=64] The note's release velocity as an integer between 0 and
   * 127.
   *
   * @returns {Note[]}
   *
   * @throws TypeError An element could not be parsed as a note.
   */
  getValidNoteArray(notes, options = {}) {

    let result = [];
    if (!Array.isArray(notes)) notes = [notes];

    notes.forEach(note => {
      result.push(this.getNoteObject(note, options));
    });

    return result;

  }

  /**
   * Converts the `note` parameter to a valid {@link Note} object. The input usually is an unsigned
   * integer (0-127) or a note name (`"C4"`, `"G#5"`, etc.). If the input is a {@link Note} object,
   * it will be returned as is.
   *
   * If the input is a note number or name, it is possible to specify options by providing the
   * optional `options` parameter.
   *
   * An error is thrown for invalid input.
   *
   * @param [notes] {number|string|Note}
   *
   * @param {Object} [options={}]
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the note should
   * be explicitly stopped.
   *
   * @param {number} [options.attack=0.5] The note's attack velocity as a decimal number between 0
   * and 1.
   *
   * @param {number} [options.release=0.5] The note's release velocity as a decimal number between 0
   * and 1.
   *
   * @param {number} [options.rawAttack=64] The note's attack velocity as an integer between 0 and
   * 127.
   *
   * @param {number} [options.rawRelease=64] The note's release velocity as an integer between 0 and
   * 127.
   *
   * @returns {Note}
   *
   * @throws TypeError The input could not be parsed as a note
   */
  getNoteObject(note, options) {

    if (note instanceof Note) {
      return note;
    } else {
      let number = this.guessNoteNumber(note);
      if (number !== false) {
        return new Note(number, options);
      } else {
        throw new TypeError(`The input could not be parsed as a note (${note})`);
      }
    }

  }

  /**
   * Returns a valid timestamp, relative to the navigation start of the document, derived from the
   * `time` parameter. If the parameter is a string starting with the "+" sign and followed by a
   * number, the resulting timestamp will be the sum of the current timestamp plus that number. If
   * the parameter is a positive number, it will be returned as is. Otherwise, false will be
   * returned.
   *
   * @param [time] {number|string} The time string (e.g. `"+2000"`) or number to parse
   * @return {number} A positive number
   */
  convertToTimestamp(time) {

    let value = false;
    let parsed = parseFloat(time);
    if (isNaN(parsed)) return false;

    if (typeof time === "string" && time.substring(0, 1) === "+") {
      if (parsed >= 0) value = this.time + parsed;
    } else {
      if (parsed >= 0) value = parsed;
    }

    return value;

  };

  /**
   *
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
     * Event emitted when an {@link Input} or {@link Output} becomes available. This event is
     * typically fired whenever a MIDI device is plugged in. Please note that it may fire several
     * times if a device possesses multiple inputs and/or outputs (which is often the case).
     *
     * @event WebMidi#connected
     * @type {Object}
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred
     * (in milliseconds since the navigation start of the document).
     * @property {string} type `connected`
     * @property {Input|Output} target The {@link Input} or {@link Output} object that triggered the
     * event.
     */

    /**
     * Event emitted when an {@link Input} or {@link Output} becomes unavailable. This event is
     * typically fired whenever a MIDI device is unplugged. Please note that it may fire several
     * times if a device possesses multiple inputs and/or outputs (which is often the case).
     *
     * @event WebMidi#disconnected
     * @type {Object}
     * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
     * since the navigation start of the document).
     * @property {string} type `disconnected`
     * @property {Object} target Object with properties describing the {@link Input} or {@Output}
     * that triggered the event.
     * @property {string} target.connection `"closed"`
     * @property {string} target.id ID of the input
     * @property {string} target.manufacturer Manufacturer of the device that provided the input
     * @property {string} target.name Name of the device that provided the input
     * @property {string} target.state `disconnected`
     * @property {string} target.type `input` or `output`
     */
    let event = {
      timestamp: e.timeStamp,
      type: e.port.state
    };

    if (this.interface && e.port.state === "connected") {

      if (e.port.type === "output") {
        event.port = this.getOutputById(e.port.id); // legacy
        event.target = event.port;
      } else if (e.port.type === "input") {
        event.port = this.getInputById(e.port.id); // legacy
        event.target = event.port;
      }

    } else {

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

    }

    this.emit(e.port.state, event);

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

    let promises = [];

    // Check for items to remove from the existing array (because they are no longer being reported
    // by the MIDI back-end).
    for (let i = 0; i < this._inputs.length; i++) {

      let remove = true;

      let updated = this.interface.inputs.values();

      for (let input = updated.next(); input && !input.done; input = updated.next()) {
        if (this._inputs[i]._midiInput === input.value) {
          remove = false;
          break;
        }
      }

      if (remove) this._inputs.splice(i, 1);

    }

    // Check for items to add in the existing inputs array because they just appeared in the MIDI
    // back-end inputs list. We must check for the existence of this.interface because it might
    // have been closed via WebMidi.disable().
    this.interface && this.interface.inputs.forEach(nInput => {

      let add = true;

      for (let j = 0; j < this._inputs.length; j++) {
        if (this._inputs[j]._midiInput === nInput) {
          add = false;
        }
      }

      if (add) {
        let input = new Input(nInput);
        this._inputs.push(input);
        promises.push(input.open());
      }

    });

    return Promise.all(promises);

  };

  /**
   * @private
   */
  async _updateOutputs() {

    let promises = [];

    // Check for items to remove from the existing array (because they are no longer being reported
    // by the MIDI back-end).
    for (let i = 0; i < this._outputs.length; i++) {

      let remove = true;

      let updated = this.interface.outputs.values();

      for (let output = updated.next(); output && !output.done; output = updated.next()) {
        if (this._outputs[i]._midiOutput === output.value) {
          remove = false;
          break;
        }
      }

      if (remove) {
        this._outputs[i].close();
        this._outputs.splice(i, 1);
      }

    }

    // Check for items to add in the existing inputs array because they just appeared in the MIDI
    // back-end outputs list. We must check for the existence of this.interface because it might
    // have been closed via WebMidi.disable().
    this.interface && this.interface.outputs.forEach(nOutput => {

      let add = true;

      for (let j = 0; j < this._outputs.length; j++) {
        if (this._outputs[j]._midiOutput === nOutput) {
          add = false;
        }
      }

      if (add) {
        let output = new Output(nOutput);
        this._outputs.push(output);
        promises.push(output.open());
      }

    });

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
   * browser, use isBrowser. In certain environments (such as Electron and NW.js) isNode and
   * isBrowser can both be true at the same time.
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
   * if we are in Node.js, use isNode. In certain environments (such as Electron and NW.js) isNode
   * and isBrowser can both be true at the same time.
   * @type {boolean}
   */
  get isBrowser() {
    return typeof window !== "undefined" && typeof window.document !== "undefined";
  }

  /**
   * An integer to offset the octave both in inbound and outbound messages. By default, middle C
   * (MIDI note number 60) is placed on the 4th octave (C4).
   *
   * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
   * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
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
      if (isNaN(value)) throw new TypeError("The 'octaveOffset' property must be a valid number.");
    }

    this._octaveOffset = value;

  }

  /**
   * An array of all currently available MIDI outputs.
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
   * the `navigator.requestMIDIAccess` function is available. For example, if you have installed
   * WebMIDIAPIShim.js but no plugin, this property will be `true` even though actual support might
   * not be there.
   *
   * @readonly
   * @type {boolean}
   */
  get supported() {
    return (typeof navigator !== "undefined" && navigator.requestMIDIAccess);
  }

  /**
   * Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
   * enabled via the `enable()` method.
   *
   * @readonly
   * @type Boolean
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
   * Enum of all MIDI channel voice messages and their associated numerical value:
   *
   * - `noteoff`: 0x8 (8)
   * - `noteon`: 0x9 (9)
   * - `keyaftertouch`: 0xA (10)
   * - `controlchange`: 0xB (11)
   * - `channelmode`: 0xB (11)
   * - `nrpn`: 0xB (11)
   * - `programchange`: 0xC (12)
   * - `channelaftertouch`: 0xD (13)
   * - `pitchbend`: 0xE (14)
   *
   * @enum {Object.<string, number>}
   * @readonly
   *
   * @since 3.0.0
   */
  get MIDI_CHANNEL_VOICE_MESSAGES() {

    return {
      noteoff: 0x8,           // 8
      noteon: 0x9,            // 9
      keyaftertouch: 0xA,     // 10
      controlchange: 0xB,     // 11
      channelmode: 0xB,       // 11
      nrpn: 0xB,              // 11
      programchange: 0xC,     // 12
      channelaftertouch: 0xD, // 13
      pitchbend: 0xE          // 14
    };

  }

  /**
   * Enum of all MIDI channel voice messages and their associated numerical value. Note that it
   * has been deprecated since v3.0. You should now use
   * [MIDI_CHANNEL_VOICE_MESSAGES]{@link WebMidi.MIDI_CHANNEL_VOICE_MESSAGES}.
   *
   * @enum {Object.<string, number>}
   * @readonly
   * @deprecated since version 3.0 (will be dropped in version 4.0)
   *
   * @since 2.0.0
   */
  get MIDI_CHANNEL_MESSAGES() {
    console.warn(
      "MIDI_CHANNEL_MESSAGES has been deprecated. Use MIDI_CHANNEL_VOICE_MESSAGES instead."
    );
    return this.MIDI_CHANNEL_VOICE_MESSAGES;
  }

  /**
   * Enum of all channel mode messages and their associated numerical value:
   *
   * - `allsoundoff`: 120
   * - `resetallcontrollers`: 121
   * - `localcontrol`: 122
   * - `allnotesoff`: 123
   * - `omnimodeoff`: 124
   * - `omnimodeon`: 125
   * - `monomodeon`: 126
   * - `polymodeon`: 127
   *
   * @enum {Object.<string, number>}
   * @readonly
   *
   * @since 2.0.0
   */
  get MIDI_CHANNEL_MODE_MESSAGES() {

    return {
      allsoundoff: 120,
      resetallcontrollers: 121,
      localcontrol: 122,
      allnotesoff: 123,
      omnimodeoff: 124,
      omnimodeon: 125,
      monomodeon: 126,
      polymodeon: 127
    };

  }

  /**
   * Enum of all control change messages and their associated numerical value:
   *
   * - `bankselectcoarse`: 0
   * - `modulationwheelcoarse`: 1
   * - `breathcontrollercoarse`: 2
   * - `footcontrollercoarse`: 4
   * - `portamentotimecoarse`: 5
   * - `dataentrycoarse`: 6
   * - `volumecoarse`: 7
   * - `balancecoarse`: 8
   * - `pancoarse`: 10
   * - `expressioncoarse`: 11
   * - `effectcontrol1coarse`: 12
   * - `effectcontrol2coarse`: 13
   * - `generalpurposeslider1`: 16
   * - `generalpurposeslider2`: 17
   * - `generalpurposeslider3`: 18
   * - `generalpurposeslider4`: 19
   * - `bankselectfine`: 32
   * - `modulationwheelfine`: 33
   * - `breathcontrollerfine`: 34
   * - `footcontrollerfine`: 36
   * - `portamentotimefine`: 37
   * - `dataentryfine`: 38
   * - `volumefine`: 39
   * - `balancefine`: 40
   * - `panfine`: 42
   * - `expressionfine`: 43
   * - `effectcontrol1fine`: 44
   * - `effectcontrol2fine`: 45
   * - `holdpedal`: 64
   * - `portamento`: 65
   * - `sustenutopedal`: 66
   * - `softpedal`: 67
   * - `legatopedal`: 68
   * - `hold2pedal`: 69
   * - `soundvariation`: 70
   * - `resonance`: 71
   * - `soundreleasetime`: 72
   * - `soundattacktime`: 73
   * - `brightness`: 74
   * - `soundcontrol6`: 75
   * - `soundcontrol7`: 76
   * - `soundcontrol8`:`77
   * - `soundcontrol9`: 78
   * - `soundcontrol10`: 79
   * - `generalpurposebutton1`: 80
   * - `generalpurposebutton2`: 81
   * - `generalpurposebutton3`: 82
   * - `generalpurposebutton4`: 83
   * - `reverblevel`: 91
   * - `tremololevel`: 92
   * - `choruslevel`: 93
   * - `celestelevel`: 94
   * - `phaserlevel`: 95
   * - `databuttonincrement`: 96
   * - `databuttondecrement`: 97
   * - `nonregisteredparametercoarse`: 98
   * - `nonregisteredparameterfine`: 99
   * - `registeredparametercoarse`: 100
   * - `registeredparameterfine`: 101
   *
   * @enum {Object.<string, number>}
   * @readonly
   *
   * @since 2.0.0
   */
  get MIDI_CONTROL_CHANGE_MESSAGES() {

    return {
      bankselectcoarse: 0,
      modulationwheelcoarse: 1,
      breathcontrollercoarse: 2,
      footcontrollercoarse: 4,
      portamentotimecoarse: 5,
      dataentrycoarse: 6,
      volumecoarse: 7,
      balancecoarse: 8,
      pancoarse: 10,
      expressioncoarse: 11,
      effectcontrol1coarse: 12,
      effectcontrol2coarse: 13,
      generalpurposeslider1: 16,
      generalpurposeslider2: 17,
      generalpurposeslider3: 18,
      generalpurposeslider4: 19,
      bankselectfine: 32,
      modulationwheelfine: 33,
      breathcontrollerfine: 34,
      footcontrollerfine: 36,
      portamentotimefine: 37,
      dataentryfine: 38,
      volumefine: 39,
      balancefine: 40,
      panfine: 42,
      expressionfine: 43,
      effectcontrol1fine: 44,
      effectcontrol2fine: 45,
      holdpedal: 64,
      portamento: 65,
      sustenutopedal: 66,
      softpedal: 67,
      legatopedal: 68,
      hold2pedal: 69,
      soundvariation: 70,
      resonance: 71,
      soundreleasetime: 72,
      soundattacktime: 73,
      brightness: 74,
      soundcontrol6: 75,
      soundcontrol7: 76,
      soundcontrol8: 77,
      soundcontrol9: 78,
      soundcontrol10: 79,
      generalpurposebutton1: 80,
      generalpurposebutton2: 81,
      generalpurposebutton3: 82,
      generalpurposebutton4: 83,
      reverblevel: 91,
      tremololevel: 92,
      choruslevel: 93,
      celestelevel: 94,
      phaserlevel: 95,
      databuttonincrement: 96,
      databuttondecrement: 97,
      nonregisteredparametercoarse: 98,
      nonregisteredparameterfine: 99,
      registeredparametercoarse: 100,
      registeredparameterfine: 101
    };

  }

  /**
   * Array of valid events triggered at the interface level.
   *
   * @type {string[]}
   * @readonly
   */
  get MIDI_INTERFACE_EVENTS() {
    return ["connected", "disconnected"];
  }

  /**
   * Enum of all control change messages that are used to create NRPN messages and their associated
   * numerical value:
   *
   * - `entrymsb`: 6
   * - `entrylsb`: 38
   * - `increment`: 96
   * - `decrement`: 97
   * - `paramlsb`: 98
   * - `parammsb`: 99
   * - `nullactiveparameter`: 127
   *
   * @enum {Object.<string, number>}
   * @readonly
   *
   * @since 2.0.0
   */
  get MIDI_NRPN_MESSAGES() {

    return {
      entrymsb: 6,
      entrylsb: 38,
      increment: 96,
      decrement: 97,
      paramlsb: 98,
      parammsb: 99,
      nullactiveparameter: 127
    };

  }

  /**
   * Enum of all registered parameters and their associated pair of numerical values. MIDI
   * registered parameters extend the original list of control change messages. Currently, there are
   * only a limited number of them:
   *
   * - `pitchbendrange`: [0x00, 0x00]
   * - `channelfinetuning`: [0x00, 0x01]
   * - `channelcoarsetuning`: [0x00, 0x02]
   * - `tuningprogram`: [0x00, 0x03]
   * - `tuningbank`: [0x00, 0x04]
   * - `modulationrange`: [0x00, 0x05]
   * - `azimuthangle`: [0x3D, 0x00]
   * - `elevationangle`: [0x3D, 0x01]
   * - `gain`: [0x3D, 0x02]
   * - `distanceratio`: [0x3D, 0x03]
   * - `maximumdistance`: [0x3D, 0x04]
   * - `maximumdistancegain`: [0x3D, 0x05]
   * - `referencedistanceratio`: [0x3D, 0x06]
   * - `panspreadangle`: [0x3D, 0x07]
   * - `rollangle`: [0x3D, 0x08]
   *
   * @enum {Object.<string, number>}
   * @readonly
   *
   * @since 2.0.0
   */
  get MIDI_REGISTERED_PARAMETER() {

    return {
      pitchbendrange: [0x00, 0x00],
      channelfinetuning: [0x00, 0x01],
      channelcoarsetuning: [0x00, 0x02],
      tuningprogram: [0x00, 0x03],
      tuningbank: [0x00, 0x04],
      modulationrange: [0x00, 0x05],
      azimuthangle: [0x3D, 0x00],
      elevationangle: [0x3D, 0x01],
      gain: [0x3D, 0x02],
      distanceratio: [0x3D, 0x03],
      maximumdistance: [0x3D, 0x04],
      maximumdistancegain: [0x3D, 0x05],
      referencedistanceratio: [0x3D, 0x06],
      panspreadangle: [0x3D, 0x07],
      rollangle: [0x3D, 0x08]
    };

  }

  /**
   * Enum of all valid MIDI system messages and matching numerical values. WebMidi.js also uses
   * two custom messages.
   *
   * **System common messages**
   * - `sysex`: 0xF0 (240)
   * - `timecode`: 0xF1 (241)
   * - `songposition`: 0xF2 (242)
   * - `songselect`: 0xF3 (243)
   * - `tunerequest`: 0xF6 (246)
   * - `sysexend`: 0xF7 (247)
   *
   * The `sysexend` message is never actually received. It simply ends a sysex stream.
   *
   * **System real-time messages**
   *
   * - `clock`: 0xF8 (248)
   * - `start`: 0xFA (250)
   * - `continue`: 0xFB (251)
   * - `stop`: 0xFC (252)
   * - `activesensing`: 0xFE (254)
   * - `reset`: 0xFF (255)
   *
   * Values 249 and 253 are actually relayed by the Web MIDI API but they do not serve a specific
   * purpose. The
   * [MIDI 1.0 spec](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
   * simply states that they are undefined/reserved.
   *
   * **Custom WebMidi.js messages**
   *
   * - `midimessage`: 0
   * - `unknownsystemmessage`: -1
   *
   * @enum {Object.<string, number>}
   * @readonly
   *
   * @since 2.0.0
   */
  get MIDI_SYSTEM_MESSAGES() {

    return {

      // System common messages
      sysex: 0xF0,            // 240
      timecode: 0xF1,         // 241
      songposition: 0xF2,     // 242
      songselect: 0xF3,       // 243
      tunerequest: 0xF6,      // 246
      tuningrequest: 0xF6,    // for backwards-compatibility (deprecated in version 3.0)
      sysexend: 0xF7,         // 247 (never actually received - simply ends a sysex)

      // System real-time messages
      clock: 0xF8,            // 248
      start: 0xFA,            // 250
      continue: 0xFB,         // 251
      stop: 0xFC,             // 252
      activesensing: 0xFE,    // 254
      reset: 0xFF,            // 255

      // Custom WebMidi.js messages
      midimessage: 0,
      unknownsystemmessage: -1

    };

  }

  /**
   * Array of standard note names
   *
   * @type {string[]}
   * @readonly
   */
  get NOTES() {
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
