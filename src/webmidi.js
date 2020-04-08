import {EventEmitter} from "../node_modules/djipevents/dist/djipevents.esm.min.js";
import {Input} from "./Input.js";
import {Output} from "./Output.js";

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
 * [EventEmitter]{@link https://djipco.github.io/djipevents/EventEmitter.html} class from the
 * [djipevents module]{@link https://djipco.github.io/djipevents/index.html}.
 *
 * @fires WebMidi#connected
 * @fires WebMidi#disconnected
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
    this.octaveOffset = 0;

    /**
     * Object to hold all user-defined handlers for interface-wide events (connected, disconnected,
     * etc.)
     *
     * @type {{}}
     * @private
     */
    this._userHandlers = {};

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
     * Indicates whether we are currently processing a `statechange` event (in which case new events
     * are to be queued).
     *
     * @type {boolean}
     * @private
     */
    this._processingStateChange = false;

    /**
     * An array of the current NRPNs being constructed (by channel)
     *
     * @type {string[][]}
     * @private
     */
    this._nrpnBuffer = [[],[],[],[], [],[],[],[], [],[],[],[], [],[],[],[]];

    this.nrpnEventsEnabled = true;

  }

  /**
   * Checks if the Web MIDI API is available in the current environment and then tries to connect to
   * the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
   * be displayed to the user.
   *
   * Since version 3, this method returns a `Promise`. We encourage users to use the promise-based
   * approach. When using such an approach, you can omit the `callback` option altogether.
   *
   * To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
   * `true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
   * and system exclusive messages are always enabled.
   *
   * To enable access to software synthesizers available on the host, you would set the `software`
   * option to `true`. However, note that this option is only there to future-proof the library as
   * support for software synths has not yet been implemented in any browser (April 2020).
   *
   * **Important note**: starting with Chrome v77, a page using Web MIDI API must be hosted on a
   * secure origin (`https://`, `localhost` or `file:///`) and the user will always be prompted to
   * authorize the operation (no matter if the `sysex` option is `true` or not).
   *
   * @example
   * // Enabling WebMidi while leaving `sysex` off
   * WebMidi.enable().then(() => {
   *   console.log("WebMidi.js has been enabled!");
   * })
   *
   * @example
   * // Enabling WebMidi while turning `sysex` on
   * WebMidi.enable({sysex: true}).then(() => {
   *   console.log("WebMidi.js has been enabled and sysex is active!");
   * })
   *
   * @param [options] {Object} Options
   * @param [options.callback] {function} A function to execute once the operation completes. This
   * function will receive an `Error` object if enabling the Web MIDI API failed.
   * @param [options.sysex=false] {boolean} Whether to enable MIDI system exclusive messages or not.
   * @param [options.software=false] {boolean} Whether to request access to software synthesizers on
   * the host system. This is part of the spec but has not yet been implemented by most browsers.
   *
   * @async
   * @returns {Promise}
   *
   * @throws Error The Web MIDI API is not supported in your environment.
   * @throws Error Jazz-Plugin must be installed to use WebMIDIAPIShim.
   */
  async enable(options = {}, sysex = false) {

    if (!this.supported) {
      let error = new Error("Error The Web MIDI API is not supported in your environment.");
      if (typeof options.callback === "function") options.callback(error);
      return Promise.reject(error);
    }

    if (this.enabled) return Promise.resolve();

    // Backwards-compatibility. Previous syntax was: enable(callback, sysex)
    if (typeof options === "function") options = {callback: options, sysex: sysex};
    if (sysex) options.sysex = true;

    // Request MIDI access
    try {
      this.interface = await navigator.requestMIDIAccess(
        {sysex: options.sysex, software: options.software}
      );
    } catch(err) {
      return Promise.reject(err);
    }

    this._resetInterfaceUserHandlers();

    let events = [];
    let promises = [];
    // let promiseTimeout;

    // We setup a temporary `statechange` handler that will catch all events triggered while we
    // setup. Those events will be re-triggered after calling the user's callback. This will allow
    // the user to listen to "connected" events (which can be very convenient).
    this.interface.onstatechange = e => events.push(e);

    // Here we manually open all the inputs and outputs. Usually, this is optional. When the ports
    // are not explicitly opened, they will be opened automatically (and asynchronously) by setting
    // a listener on `midimessage` (MIDIInput) or calling `send()` (MIDIOutput). However, we do not
    // want that here. We want to be sure that "connected" events will be available in the user's
    // callback. So, what we do is open all input and output ports and wait until all promises are
    // resolved. Then, we re-trigger the events after the user's callback has been executed. This
    // seems like the most sensible and practical way.
    let inputs = this.interface.inputs.values();
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      promises.push(input.value.open());
    }

    let outputs = this.interface.outputs.values();
    for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
      promises.push(output.value.open());
    }

    // Wait for all input and output ports to be open
    try {
      await Promise.all(promises);
    } catch (err) {
      console.warn(err);
    }

    // clearTimeout(promiseTimeout);

    this._updateInputsAndOutputs();
    this.interface.onstatechange = this._onInterfaceStateChange.bind(this);

    // We execute the callback and then re-trigger the statechange events.
    if (typeof options.callback === "function") options.callback();
    events.forEach(event => this._onInterfaceStateChange(event));

    return Promise.resolve();


    // Since this library might be used in environments without support for promises (such as
    // Jazz-Midi) or in environments that are not properly opening the ports (such as Web MIDI
    // Browser), we fall back to a timer-based approach if the promise-based approach fails.
    // function onPortsOpen() {
    //
    // }

    // promiseTimeout = setTimeout(onPortsOpen.bind(this), 200);
    //
    // if (Promise) {
    //
    // }

    // When MIDI access is requested, all input and output ports have their "state" set to
    // "connected". However, the value of their "connection" property is "closed".
    //
    // A `MIDIInput` becomes `open` when you explicitly call its `open()` method or when you
    // assign a listener to its `onmidimessage` property. A `MIDIOutput` becomes `open` when you
    // use the `send()` method or when you can explicitly call its `open()` method.
    //
    // Calling `_updateInputsAndOutputs()` attaches listeners to all inputs. As per the spec,
    // this triggers a `statechange` event on MIDIAccess.

  }

  /**
   * Completely disables `WebMidi.js` by unlinking the MIDI subsystem's interface and destroying all
   * {@link Input} and {@link Output} objects that may be available. This also means that any
   * listener that may have been defined on {@link Input} or {@link Output} objects will be
   * destroyed.
   *
   * @throws Error The Web MIDI API is not supported by your environment.
   *
   * @since 2.0.0
   */
  disable() {
    if (!this.supported) throw new Error("The Web MIDI API is not supported by your environment.");
    if (this.interface) this.interface.onstatechange = undefined;
    this.interface = null; // also resets enabled, sysexEnabled, nrpnEventsEnabled
    this._inputs = [];
    this._outputs = [];
    this._nrpnEventsEnabled = true;
    this._resetInterfaceUserHandlers();
  };

  /**
   * Returns the {@link Input} object that matches the specified ID string or `false` if no matching
   * input is found. As per the Web MIDI API specification, IDs are strings (not integers).
   *
   * Please note that IDs change from one host to another. For example, Chrome does not use the same
   * kind of IDs as Jazz-Plugin.
   *
   * @param id {string} The ID string of the port. IDs can be viewed by looking at the
   * [inputs]{@link WebMidi#inputs} array.
   *
   * @returns {Input|false} An {@link Input} object matching the specified ID string. If no matching
   * input can be found, the method returns `false`.
   *
   * @throws Error WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getInputById(id) {

    if (!this.enabled) throw new Error("WebMidi is not enabled.");

    id = String(id);

    for (let i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i].id === id) return this.inputs[i];
    }

    return false;

  };

  /**
   * Returns the first {@link Input} object whose name **contains** the specified string. Note that
   * the port names change from one environment to another. For example, Chrome does not report
   * input names in the same way as the Jazz-Plugin does.
   *
   * @param name {string} The string to look for within the name of MIDI inputs (such as those
   * visible in the [inputs]{@link WebMidi#inputs} array).
   *
   * @returns {Input|false} The {@link Input} that was found or `false` if no input contained the
   * specified name.
   *
   * @throws {Error} WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getInputByName(name) {

    if (!this.enabled) throw new Error("WebMidi is not enabled.");

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
   * @param name {string} The string to look for within the name of MIDI inputs (such as those
   * visible in the [outputs]{@link WebMidi#outputs} array).
   *
   * @returns {Output|false} The {@link Output} that was found or `false` if no output matched the
   * specified name.
   *
   * @throws Error WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  getOutputByName(name) {

    if (!this.enabled) throw new Error("WebMidi is not enabled.");

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

    if (!this.enabled) throw new Error("WebMidi is not enabled.");

    id = String(id);

    for (let i = 0; i < this.outputs.length; i++) {
      if (this.outputs[i].id === id) return this.outputs[i];
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
  noteNameToNumber(name) {

    if (typeof name !== "string") name = "";

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

    if (number != null && number >= 0 && number <= 127) {
      return Math.floor(Math.floor(number) / 12 - 1) + Math.floor(this.octaveOffset);
    } else {
      return false;
    }

  };

  /**
   * Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be one of
   * the following:
   *
   * * a single integer
   * * an array of integers
   * * the special value `"all"`
   * * the special value `"none"`
   *
   * Passing `"all"` or `undefined` as a parameter to this function results in all channels being
   * returned (1-16). Passing `"none"` results in no channel being returned (as an empty array).
   *
   * Note: parameters that cannot successfully be parsed to integers between 1 and 16 are silently
   * ignored.
   *
   * @param [channel="all"] {number|number[]|"all"|"none"} The channel(s) to parse.
   *
   * @returns {array} An array of 0 or more valid MIDI channel numbers
   */
  toMIDIChannels(channel) {

    let channels;

    if (channel === "all" || channel === undefined) {
      channels = ["all"];
    } else if (channel === "none") {
      return [];
    } else if (!Array.isArray(channel)) {
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

  };

  /**
   * Returns a valid MIDI note number (0-127) given the specified input. The parameter usually is a
   * string containing a note name (C3, F#4, D-2, G8, etc.). If an integer between 0 and 127 is
   * passed, it will simply be returned as is (for convenience).
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

    if (input && input.toFixed && input >= 0 && input <= 127) {         // uint
      output = Math.round(input);
    } else if (parseInt(input) >= 0 && parseInt(input) <= 127) {        // uint as string
      output = parseInt(input);
    } else if (typeof input === "string" || input instanceof String) {  // string
      output = this.noteNameToNumber(input);
    }

    if (output === false) return false;
    return output;

  };

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
     * @property {number} timestamp The moment when the event occurred (in milliseconds since the
     * epoch).
     * @property {string} type `connected`
     * @property {boolean} isTrusted Indicates whether the event was generated by a user action
     * (`true`) or if it was created or modified by a script (`false`).
     * @property {?Input} input The actual {@link Input} object that triggered the event. If the
     * event was triggered by an {@link Output}, this will be `null`.
     * @property {?Output} output The actual {@link Output} object that triggered the event. If the
     * event was triggered by an {@link Input}, this will be `null`.
     */

    /**
     * Event emitted when an {@link Input} or {@link Output} becomes unavailable. This event is
     * typically fired whenever a MIDI device is unplugged. Please note that it may fire several
     * times if a device possesses multiple inputs and/or outputs (which is often the case).
     *
     * @event WebMidi#disconnected
     * @type {Object}
     * @property {number} timestamp The moment when the event occurred (in milliseconds since the
     * epoch).
     * @property {string} type `disconnected`
     * @property {boolean} isTrusted Indicates whether the event was generated by a user action
     * (`true`) or if it was created or modified by a script (`false`).
     * @property {?Object} input Object with properties describing the {@link Input} that triggered
     * the event. If the event was triggered by an {@link Output}, this will be `null`.
     * @property {string} input.connection `closed`
     * @property {string} input.id ID of the input
     * @property {string} input.manufacturer Manufacturer of the device that provided the input
     * @property {string} input.name Name of the device that provided the input
     * @property {string} input.state `disconnected`
     * @property {string} input.type `input`
     * @property {?Object} output Object with properties describing the {@link Output} that
     * triggered the event. If the event was triggered by an {@link Input}, this will be `null`.
     * @property {string} output.connection `closed`
     * @property {string} output.id The input's ID
     * @property {string} output.manufacturer Manufacturer of the device
     * @property {string} output.name Name of the device
     * @property {string} output.state `disconnected`
     * @property {string} output.type `output`
     */
    let event = {
      timestamp: e.timeStamp,
      type: e.port.state,
      isTrusted: e.isTrusted
    };

    if (this.interface && e.port.state === "connected") {

      if (e.port.type === "output") {
        event.port = this.getOutputById(e.port.id); // legacy
        event.output = event.port;
      } else if (e.port.type === "input") {
        event.port = this.getInputById(e.port.id); // legacy
        event.input = event.port;
      }

    } else {

      // It feels more logical to include an `output` or an `input` property instead of a `port`
      // property. This is the terminology used everywhere in the library. I find the word "port"
      // to be problematic. Therefore, I am discontinuing the use of the `port` property.
      event.port = {
        connection: "closed",
        id: e.port.id,
        manufacturer: e.port.manufacturer,
        name: e.port.name,
        state: e.port.state,
        type: e.port.type
      };

      if (e.port.type === "output") {
        event.output = event.port;
      } else if (e.port.type === "input") {
        event.input = event.port;
      }

    }


    ///////////////// TO DO!!!!!
    this._userHandlers[e.port.state].forEach(function (handler) {
      handler(event);
    });

  };

  /**
   * @private
   */
  _updateInputsAndOutputs() {
    this._updateInputs();
    this._updateOutputs();
  };

  /**
   * @private
   */
  _updateInputs() {

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

      if (add) this._inputs.push( new Input(nInput) );

    });

  };

  /**
   * @private
   */
  _updateOutputs() {

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

      if (remove) this._outputs.splice(i, 1);

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

      if (add) this._outputs.push( new Output(nOutput) );

    });

  };

  /**
   * Removes all handlers defined on the interface
   * @private
   */
  _resetInterfaceUserHandlers() {

    for (let i = 0; i < WebMidi.MIDI_INTERFACE_EVENTS.length; i++) {
      this._userHandlers[WebMidi.MIDI_INTERFACE_EVENTS[i]] = [];
    }

  }

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
    return navigator && navigator.requestMIDIAccess;
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
   * An array of all currently available MIDI outputs.
   *
   * @readonly
   * @type {Array}
   */
  get outputs() {
    return this._outputs;
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
   * Indicates whether WebMidi.js should dispatch **Non-Registered Parameter Number** events. This
   * is a system-wide setting. NRPNs are composed of a sequence of specific **control change**
   * messages. When a valid sequence of such control change messages is received, an `nrpn` event
   * will fire. If an invalid or out of order control change message is received, it will fall
   * through the collector logic and all buffered control change messages will be discarded as
   * incomplete.
   *
   * @type Boolean
   */
  get nrpnEventsEnabled() {
    return this._nrpnEventsEnabled;
  }
  set nrpnEventsEnabled(enabled) {
    this._nrpnEventsEnabled = !!enabled;
  }

  /**
   * Current MIDI performance time in milliseconds. This can be used to queue events in the future.
   *
   * @type {DOMHighResTimeStamp}
   * @readonly
   */
  get time() {
    return performance.now();
  }

  /**
   * Array of valid events triggered at the interface level.
   *
   * @type {string[]}
   * @readonly
   */
  static get MIDI_INTERFACE_EVENTS() {
    return ["connected", "disconnected"];
  }

  /**
   * Array of standard note names
   *
   * @type {string[]}
   * @readonly
   */
  static get NOTES() {
    return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
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
   * - `tuningrequest`: 0xF6 (246)
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
   * @enum {number}
   * @readonly
   *
   * @since 2.0.0
   */
  static get MIDI_SYSTEM_MESSAGES() {

    return {

      // System common messages
      sysex: 0xF0,            // 240
      timecode: 0xF1,         // 241
      songposition: 0xF2,     // 242
      songselect: 0xF3,       // 243
      tuningrequest: 0xF6,    // 246
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
   * @enum {number}
   * @readonly
   *
   * @since 3.0.0
   */
  static get MIDI_CHANNEL_VOICE_MESSAGES() {

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
   * @enum {number}
   * @readonly
   * @deprecated since version 3.0 (will be dropped in version 4.0)
   *
   * @since 2.0.0
   */
  static get MIDI_CHANNEL_MESSAGES() {
    return WebMidi.MIDI_CHANNEL_VOICE_MESSAGES;
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
   * @enum {number[]}
   * @readonly
   *
   * @since 2.0.0
   */
  static get MIDI_REGISTERED_PARAMETER() {

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
   * @enum {number[]}
   * @readonly
   *
   * @since 2.0.0
   */
  static get MIDI_CONTROL_CHANGE_MESSAGES() {

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
   * @enum {number}
   * @readonly
   *
   * @since 2.0.0
   */
  static get MIDI_NRPN_MESSAGES() {

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
   * @enum {number}
   * @readonly
   *
   * @since 2.0.0
   */
  static get MIDI_CHANNEL_MODE_MESSAGES() {

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

}


// /**
//  * Adds an event listener on the `WebMidi` object that will trigger a function callback when the
//  * specified event happens.
//  *
//  * WebMidi must be enabled before adding event listeners.
//  *
//  * Currently, only one event is being dispatched by the `WebMidi` object:
//  *
//  *    * {{#crossLink "WebMidi/statechange:event"}}statechange{{/crossLink}}
//  *
//  * @param type {String} The type of the event.
//  *
//  * @param listener {Function} A callback function to execute when the specified event is detected.
//  * This function will receive an event parameter object. For details on this object"s properties,
//  * check out the documentation for the various events (links above).
//  *
//  * @throws {Error} WebMidi must be enabled before adding event listeners.
//  * @throws {TypeError} The specified event type is not supported.
//  * @throws {TypeError} The "listener" parameter must be a function.
//  *
//  * @return {WebMidi} Returns the `WebMidi` object so methods can be chained.
//  */
// WebMidi.prototype.addListener = function(type, listener) {
//
//   if (!this.enabled) {
//     throw new Error("WebMidi must be enabled before adding event listeners.");
//   }
//
//   if (typeof listener !== "function") {
//     throw new TypeError("The 'listener' parameter must be a function.");
//   }
//
//   if (WebMidi.MIDI_INTERFACE_EVENTS.indexOf(type) >= 0) {
//     this._userHandlers[type].push(listener);
//   } else {
//     throw new TypeError("The specified event type is not supported.");
//   }
//
//   return this;
//
// };

// /**
//  * Checks if the specified event type is already defined to trigger the specified listener
//  * function.
//  *
//  * @method hasListener
//  * @static
//  *
//  * @param {String} type The type of the event.
//  * @param {Function} listener The callback function to check for.
//  *
//  * @throws {Error} WebMidi must be enabled before checking event listeners.
//  * @throws {TypeError} The "listener" parameter must be a function.
//  * @throws {TypeError} The specified event type is not supported.
//  *
//  * @return {Boolean} Boolean value indicating whether or not a callback is already defined for
//  * this event type.
//  */
// WebMidi.prototype.hasListener = function(type, listener) {
//
//   if (!this.enabled) {
//     throw new Error("WebMidi must be enabled before checking event listeners.");
//   }
//
//   if (typeof listener !== "function") {
//     throw new TypeError("The 'listener' parameter must be a function.");
//   }
//
//   if (WebMidi.MIDI_INTERFACE_EVENTS.indexOf(type) >= 0) {
//
//     for (var o = 0; o < this._userHandlers[type].length; o++) {
//       if (this._userHandlers[type][o] === listener) {
//         return true;
//       }
//     }
//
//   } else {
//     throw new TypeError("The specified event type is not supported.");
//   }
//
//   return false;
//
// };

// /**
//  * Removes the specified listener(s). If the `listener` parameter is left undefined, all listeners
//  * for the specified `type` will be removed. If both the `listener` and the `type` parameters are
//  * omitted, all listeners attached to the `WebMidi` object will be removed.
//  *
//  * @method removeListener
//  * @static
//  * @chainable
//  *
//  * @param {String} [type] The type of the event.
//  * @param {Function} [listener] The callback function to check for.
//  *
//  * @throws {Error} WebMidi must be enabled before removing event listeners.
//  * @throws {TypeError} The "listener" parameter must be a function.
//  * @throws {TypeError} The specified event type is not supported.
//  *
//  * @return {WebMidi} The `WebMidi` object for easy method chaining.
//  */
// WebMidi.prototype.removeListener = function(type, listener) {
//
//   if (!this.enabled) {
//     throw new Error("WebMidi must be enabled before removing event listeners.");
//   }
//
//   if (listener !== undefined && typeof listener !== "function") {
//     throw new TypeError("The 'listener' parameter must be a function.");
//   }
//
//   if (WebMidi.MIDI_INTERFACE_EVENTS.indexOf(type) >= 0) {
//
//     if (listener) {
//
//       for (var o = 0; o < this._userHandlers[type].length; o++) {
//         if (this._userHandlers[type][o] === listener) {
//           this._userHandlers[type].splice(o, 1);
//         }
//       }
//
//     } else {
//       this._userHandlers[type] = [];
//     }
//
//   } else if (type === undefined) {
//
//     this._resetInterfaceUserHandlers();
//
//   } else {
//     throw new TypeError("The specified event type is not supported.");
//   }
//
//   return this;
//
// };



// Export instance of WebMidi class. We null the 'constructor' property so that it cannot be used to
// instantiate a new WebMidi object or extend it. We do not freeze so it remains extensible
// (properties can be added at will).
const wm = new WebMidi();
wm.constructor = null;
export {wm as WebMidi};
