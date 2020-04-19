import {EventEmitter} from "../node_modules/djipevents/dist/djipevents.esm.min.js";
import {WebMidi} from "./WebMidi.js";
import {InputChannel} from "./InputChannel.js";

/**
 * The `Input` class represents a MIDI input port. This object is derived from the host's MIDI
 * subsystem and cannot be instantiated directly.
 *
 * You can find a list of all available `Input` objects in the {@link WebMidi#inputs} array.
 *
 * @param {MIDIInput} midiInput `MIDIInput` object as provided by the MIDI subsystem.
 *
 * @fires Input#opened
 * @fires Input#disconnected
 * @fires Input#closed
 * @fires Input#midimessage
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
 * @fires Input#midimessage
 * @fires Input#unknownmidimessage
 */
export class Input extends EventEmitter {

  constructor(midiInput) {

    super();

    /**
     * Reference to the actual MIDIInput object
     * @private
     */
    this._midiInput = midiInput;

    /**
     * Array containing the 16 {@link InputChannel} objects available for this `Input`. The
     * channels are numbered 1 through 16.
     *
     * @type {InputChannel[]}
     */
    this.channels = [];
    for (let i = 1; i <= 16; i++) this.channels[i] = new InputChannel(this, i);

    // Setup listeners
    this._midiInput.onstatechange = this._onStateChange.bind(this);
    this._midiInput.onmidimessage = this._onMidiMessage.bind(this);

  }

  /**
   * Executed when a `"statechange"` event occurs.
   *
   * @param e
   * @private
   */
  _onStateChange(e) {

    let event = {
      timestamp: WebMidi.time,
      target: this
    };

    if (e.port.connection === "open") {

      /**
       * Event emitted when the {@link Input} has been opened by calling the {@link Input#open}
       * method.
       *
       * @event Input#opened
       * @type {Object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"opened"`
       * @property {Input} target The object that triggered the event
       */
      event.type = "opened";
      this.emit("opened", event);

    } else if (e.port.connection === "closed" && e.port.state === "connected") {

      /**
       * Event emitted when the {@link Input} has been closed by calling the {@link Input#close}
       * method.
       *
       * @event Input#closed
       * @type {Object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"closed"`
       * @property {Input} target The object that triggered the event
       */
      event.type = "closed";
      this.emit("closed", event);

    } else if (e.port.connection === "closed" && e.port.state === "disconnected") {

      /**
       * Event emitted when the {@link Input} becomes unavailable. This event is typically fired
       * when the MIDI device is unplugged.
       *
       * @event Input#disconnected
       * @type {Object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"disconnected"`
       * @property {Object} target Object with properties describing the {@link Input} that
       * triggered the event. This is not the actual `Input` as it is no longer available.
       * @property {string} target.connection `"closed"`
       * @property {string} target.id ID of the input
       * @property {string} target.manufacturer Manufacturer of the device that provided the input
       * @property {string} target.name Name of the device that provided the input
       * @property {string} target.state `"disconnected"`
       * @property {string} target.type `"input"`
       */
      event.type = "disconnected";
      event.target = {
        connection: e.port.connection,
        id: e.port.id,
        manufacturer: e.port.manufacturer,
        name: e.port.name,
        state: e.port.state,
        type: e.port.type
      };
      this.emit("disconnected", event);

    } else if (e.port.connection === "pending" && e.port.state === "disconnected") {
      // I don't see the need to forward that...
    } else {
      console.warn("This statechange event was not caught: ", e.port.connection, e.port.state);
    }

  }

  /**
   * Executed when a `"midimessage"` event is received
   * @param e
   * @private
   */
  _onMidiMessage(e) {

    // Extract data bytes (unless it's a sysex message)
    let dataBytes = null;
    if (e.data[0] !== WebMidi.MIDI_SYSTEM_MESSAGES.sysex) dataBytes = e.data.slice(1);

    /**
     * Event emitted when a MIDI message is received on the `Input`
     *
     * @event Input#midimessage
     * @type {Object}
     * @property {Input} target The `Input` that triggered the event.
     * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"midimessage"`
     * @property {number} event.statusByte The message's status byte.
     * @property {?number[]} event.dataBytes The message's data bytes as an array of 0, 1 or 2
     * integers. This will be null for `sysex` messages.
     *
     * @since 2.1
     */
    let event = {
      target: this,
      data: e.data,
      statusByte: e.data[0],
      dataBytes: dataBytes,
      timestamp: e.timeStamp,
      type: "midimessage"
    };

    this.emit("midimessage", event);

    // Messages are forwarded to InputChannel if they are targeted at a channel or parsed locally
    // for system messages.
    if (e.data[0] < 240) {          // channel-specific message
      let channel = (e.data[0] & 0xf) + 1;
      this.channels[channel]._parseEvent(e);
    } else if (e.data[0] <= 255) {  // system message
      this._parseEvent(e);
    }

  }

  /**
   * @private
   */
  _parseEvent(e) {

    let command = e.data[0];

    // Returned event
    var event = {
      target: this,
      data: e.data,
      timestamp: e.timeStamp
    };

    if (command === WebMidi.MIDI_SYSTEM_MESSAGES.sysex) {

      /**
       * Event emitted when a **system exclusive** message has been received. You should note that,
       * to receive `sysex` events, you must call the `WebMidi.enable()` method with the `sysex`
       * option set to `true`:
       *
       * ```js
       * WebMidi.enable({sysex: true})
       *  .then(() => console.log("WebMidi has been enabled with sysex support."))
       *  .catch(err => console.log("WebMidi could not be enabled."))
       * ```
       *
       * @event InputChannel#sysex
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"sysex"`
       */
      event.type = "sysex";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.timecode) {

      /**
       * Event emitted when a **time code quarter frame** message has been received.
       *
       * @event InputChannel#timecode
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"sysextimecode"`
       */
      event.type = "timecode";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.songposition) {

      /**
       * Event emitted when a **song position** message has been received.
       *
       * @event InputChannel#songposition
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"songposition"`
       */
      event.type = "songposition";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.songselect) {

      /**
       * Event emitted when a **song select** message has been received.
       *
       * @event InputChannel#songselect
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"songselect"`
       * @property {string} song Song (or sequence) number to select (1-128)
       */
      event.type = "songselect";
      event.song = e.data[1] + 1;

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.tunerequest) {

      /**
       * Event emitted when a **tune request** message has been received.
       *
       * @event InputChannel#tunerequest
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"tunerequest"`
       */
      event.type = "tunerequest";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.clock) {

      /**
       * Event emitted when a **timing clock** message has been received.
       *
       * @event InputChannel#clock
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"clock"`
       */
      event.type = "clock";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.start) {

      /**
       * Event emitted when a **start** message has been received.
       *
       * @event InputChannel#start
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"start"`
       */
      event.type = "start";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.continue) {

      /**
       * Event emitted when a **continue** message has been received.
       *
       * @event InputChannel#continue
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"continue"`
       */
      event.type = "continue";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.stop) {

      /**
       * Event emitted when a **stop** message has been received.
       *
       * @event InputChannel#stop
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"stop"`
       */
      event.type = "stop";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.activesensing) {

      /**
       * Event emitted when an **active sensing** message has been received.
       *
       * @event InputChannel#activesensing
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"activesensing"`
       */
      event.type = "activesensing";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.reset) {

      /**
       * Event emitted when a **reset** message has been received.
       *
       * @event InputChannel#reset
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"reset"`
       */
      event.type = "reset";

    } else {

      /**
       * Event emitted when an unknown MIDI message has been received. It could be, for example, one
       * of the undefined/reserved messages.
       *
       * @event InputChannel#unknownmidimessage
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"unknownmidimessage"`
       */
      event.type = "unknownmidimessage";

    }

    this.emit(event.type, event);

  }

  /**
   * Opens the input for usage.
   *
   * @returns {Promise<Input>} The promise is fulfilled with the `Input`
   */
  async open() {

    // Explicitly opens the port for usage. This is not mandatory. When the port is not explicitly
    // opened, it is implicitly opened (asynchronously) when assigning a listener to the
    // `onmidimessage` property of the `MIDIInput`. We do it explicitly so that 'connected' events
    // are dispatched immediately and that we are ready to listen.
    try {
      await this._midiInput.open();
      return Promise.resolve(this);
    } catch (err) {
      return Promise.reject(err);
    }

  }

  /**
   * Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
   * the input is opened again by calling [Input.open()]{@link Input#open}.
   *
   * @returns {Promise<void|*>}
   */
  async close() {

    // We close the port. This triggers a statechange event which, in turn, will emit the 'closed'
    // event.
    if (this._midiInput) {
      return this._midiInput.close();
    } else {
      return Promise.resolve();
    }

  }

  /**
   * Returns the name of a control change message matching the specified number. If no match is
   * found, the function returns `false`.
   *
   * @param {number} number An integer representing the control change message
   * @returns {string|false} The matching control change name or `false` if not match was found
   *
   * @since 2.0.0
   */
  getCcNameByNumber(number) {

    number = Math.floor(number);

    if ( !(number >= 0 && number <= 119) ) return false;

    for (let cc in WebMidi.MIDI_CONTROL_CHANGE_MESSAGES) {

      if (
        WebMidi.MIDI_CONTROL_CHANGE_MESSAGES.hasOwnProperty(cc) &&
        number === WebMidi.MIDI_CONTROL_CHANGE_MESSAGES[cc]
      ) {
        return cc;
      }

    }

    return false;

  };

  /**
   * @async
   * @return {Promise<void>}
   */
  async destroy() {

    return this._midiInput.close().then(() => {

      if (this._midiInput) {
        this._midiInput.onmidimessage = null;
        this._midiInput.onstatechange = null;
      }

      this._midiInput = null;

    });

  }

  /**
   * Adds an event listener that will trigger a function callback when the specified event happens.
   * The events that are listened to can be channel-specific or input-wide.
   *
   * This method overrides the one in
   * [djipevents.EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html#addListener)
   * by adding a `channel` parameter that makes it possible to add a listener to one or several
   * channels at once. Invalid channels will be silently ignored.
   *
   * If you want to add a listener to a single channel, use
   * [InputChannel.addListener()]{@link InputChannel#addListener()} instead.
   *
   * Here is a list of events that are directly dispatched by `Input` objects and that can be
   * listened to:
   *
   *    * [sysex]{@link Input#event:sysex}
   *    * [timecode]{@link Input#event:timecode}
   *    * [songposition]{@link Input#event:songposition}
   *    * [songselect]{@link Input#event:songselect}
   *    * [tunerequest]{@link Input#event:tunerequest}
   *    * [clock]{@link Input#event:clock}
   *    * [start]{@link Input#event:start}
   *    * [continue]{@link Input#event:continue}
   *    * [stop]{@link Input#event:stop}
   *    * [activesensing]{@link Input#event:activesensing}
   *    * [reset]{@link Input#event:reset}
   *    * [midimessage]{@link Input#event:midimessage}
   *    * [unknownmidimessage]{@link Input#event:unknownmidimessage}
   *
   *  For input-wide events, the `channel` parameter will be silently ignored. You can simply use
   * `undefined` in that case.
   *
   * If you want to view all incoming MIDI traffic, you can listen to the `midimessage` event. This
   * event is dispatched for every single message that is received on that `Input`.
   *
   * By using the `channel` property, you can also add listeners to all channels in the `channel`
   * parameter. These are the events dispatched by {@link InputChannel} objects:
   *
   *    * [noteoff]{@link InputChannel#event:noteoff}
   *    * [noteon]{@link InputChannel#event:noteon}
   *    * [keyaftertouch]{@link InputChannel#event:keyaftertouch}
   *    * [controlchange]{@link InputChannel#event:controlchange}
   *    * [nrpn]{@link InputChannel#event:nrpn}
   *    * [channelmode]{@link InputChannel#event:channelmode}
   *    * [programchange]{@link InputChannel#event:programchange}
   *    * [channelaftertouch]{@link InputChannel#event:channelaftertouch}
   *    * [pitchbend]{@link InputChannel#event:pitchbend}
   *    * [midimessage]{@link InputChannel#event:midimessage}
   *
   * @param event {string} The type of the event.
   *
   * @param channel {number|number[]} An integer between 1 and 16 or an array of such integers
   * representing the channel(s) to listen on.
   *
   * @param listener {function} A callback function to execute when the specified event is detected.
   * This function will receive an event parameter object. For details on this object"s properties,
   * check out the documentation for the various events (links above).
   *
   * @param {Object} [options={}]
   *
   * @param {Object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.remaining=Infinity] The number of times after which the callback
   * should automatically be removed.
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [**arguments**]{@link Listener#arguments}
   * property of the [**Listener**]{@link Listener} object and can be retrieved or modified as
   * desired.
   *
   * @throws {TypeError} The callback must be a function.
   * @throws {TypeError} The 'event' parameter must be a string or EventEmitter.ANY_EVENT.
   *
   * @return {Listener[]} An array of all `Listener` objects that were created.
   */
  addListener(event, channel, listener, options) {

    let listeners = [];

    if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[event] === undefined) {
      listeners.push(super.addListener(event, listener, options));
    } else {
      WebMidi.sanitizeChannels(channel).forEach(ch => {
        listeners.push(this.channels[ch].addListener(event, listener, options));
      });
    }

    return listeners;

  }

  /**
   * Adds a one-time event listener that will trigger a function callback when the specified event
   * happens. The events that are dispatched can be channel-specific or input-wide.
   *
   * This method overrides the one in `djipevents.EventEmitter` by adding a `channel` parameter that
   * makes it possible to add a single listener to one or several channels at once. If you want to
   * add a listener to a single channel, use
   * [InputChannel.addListener()]{@link InputChannel#addListener()} instead.
   *
   * Here is a list of events that are dispatched by `Input` objects and that can be listened to.
   *
   * Channel-specific MIDI events:
   *
   *    * [noteoff]{@link InputChannel#event:noteoff}
   *    * [noteon]{@link InputChannel#event:noteon}
   *    * [keyaftertouch]{@link InputChannel#event:keyaftertouch}
   *    * [controlchange]{@link InputChannel#event:controlchange}
   *    * [nrpn]{@link InputChannel#event:nrpn}
   *    * [channelmode]{@link InputChannel#event:channelmode}
   *    * [programchange]{@link InputChannel#event:programchange}
   *    * [channelaftertouch]{@link InputChannel#event:channelaftertouch}
   *    * [pitchbend]{@link InputChannel#event:pitchbend}
   *    * [midimessage]{@link InputChannel#event:midimessage}
   *
   * Input-level MIDI events:
   *
   *    * [sysex]{@link Input#event:sysex}
   *    * [timecode]{@link Input#event:timecode}
   *    * [songposition]{@link Input#event:songposition}
   *    * [songselect]{@link Input#event:songselect}
   *    * [tunerequest]{@link Input#event:tunerequest}
   *    * [clock]{@link Input#event:clock}
   *    * [start]{@link Input#event:start}
   *    * [continue]{@link Input#event:continue}
   *    * [stop]{@link Input#event:stop}
   *    * [activesensing]{@link Input#event:activesensing}
   *    * [reset]{@link Input#event:reset}
   *    * [midimessage]{@link Input#event:midimessage}
   *    * [unknownmidimessage]{@link Input#event:unknownmidimessage}
   *
   * For input-wide events, the `channel` parameter will be silently ignored. You can simply use
   * `undefined` in that case.
   *
   * If you want to view all incoming MIDI traffic, you can listen to the input-level `midimessage`
   * event. This event is dispatched for every single message that is received on that input.
   *
   * @param type {string} The type of the event.
   *
   * @param channel {number|number[]} An integer between 1 and 16 or an array of such integers
   * representing the channel(s) to listen on.
   *
   * @param listener {function} A callback function to execute when the specified event is detected.
   * This function will receive an event parameter object. For details on this object"s properties,
   * check out the documentation for the various events (links above).
   *
   * @param {Object} [options={}]
   *
   * @param {Object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the [**arguments**]{@link Listener#arguments}
   * property of the [**Listener**]{@link Listener} object and can be retrieved or modified as
   * desired.
   *
   * @throws {RangeError} The "channel" parameter is invalid.
   * @throws {TypeError} The "listener" parameter must be a function.
   * @throws {TypeError} The specified event type is not supported.
   *
   * @return {Listener[]} An array of all `Listener` objects that were created.
   */
  addOneTimeListener(type, channel, listener, options = {}) {
    options.remaining = 1;
    return this.addListener(type, channel, listener, options);
  }

  /**
   * This is an alias to the [Input.addListener()]{@link Input#addListener} method.
   * @since 2.0.0
   * @deprecated since v3.0
   * @private
   */
  on(type, channel, listener, options) {
    return this.addListener(type, channel, listener, options);
  }

  /**
   * Checks if the specified event type is already defined to trigger the listener function on the
   * specified channel(s). If more than one channel is specified, the function will return `true`
   * only if all channels have the listener defined.
   *
   * For input-level events (`sysex`, `start`, etc.), the `channel` parameter is silently ignored.
   * We suggest you use `undefined` in such cases.
   *
   * @param type {string} The type of the event.
   *
   * @param channel {number|number[]} An integer between 1 and 16 or an array of such integers
   * representing the channel(s) to listen on.
   *
   * @param listener {function} The callback function to check for.
   *
   * @throws {TypeError} The "listener" parameter must be a function.
   *
   * @returns {Boolean} Boolean value indicating whether or not the channel(s) already have this
   * listener defined.
   */
  hasListener(type, channel, listener) {

    if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[type] !== undefined) {

      return WebMidi.sanitizeChannels(channel).every(ch => {
        return this.channels[ch].hasListener(type, listener);
      });

    } else {
      return super.hasListener(type, listener);
    }

  }

  /**
   * Removes the specified listener from the specified channel(s). If the `listener` parameter is
   * left undefined, all listeners for the specified `type` will be removed from all channels. If
   * the `channel` is also omitted, all listeners of the specified type will be removed from all
   * channels. If no parameters are defined, all listeners attached to any channel of the `Input`
   * will be removed.
   *
   * For input-level events (`sysex`, `start`, etc.), the `channel` parameter is silently ignored.
   * You can use `undefined` in such cases.
   *
   * @param [type] {String} The type of the event.
   *
   * @param channel {number|number[]} An integer between 1 and 16 or an array of such integers
   * representing the channel(s) to listen on.
   *
   * @param [listener] {Function} The callback function to check for.
   *
   * @param {Object} [options={}]
   * @param {*} [options.context] Only remove the listeners that have this exact context.
   * @param {number} [options.remaining] Only remove the listener if it has exactly that many
   * remaining times to be executed.
   *
   * @throws {TypeError} The specified event type is not supported.
   * @throws {TypeError} The "listener" parameter must be a function..
   */
  removeListener(type, channel, listener, options) {

    if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[type] !== undefined) {
      WebMidi.sanitizeChannels(channel).forEach(ch => {
        this.channels[ch].removeListener(type, listener, options);
      });
    } else if (type != undefined) {
      return super.removeListener(type, listener, options);
    } else if (type == undefined) {
      return super.removeListener();
    }

  }

  /**
   * Name of the MIDI input
   *
   * @property name
   * @type String
   */
  get name() {
    return this._midiInput.name;
  }

  /**
   * ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
   * platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
   * the same port.
   *
   * @type {string}
   * @readonly
   */
  get id() {
    return this._midiInput.id;
  }

  /**
   * Input port's connection state: `"pending"`, `"open"` or `"closed"`.
   *
   * @type {string}
   * @readonly
   */
  get connection() {
    return this._midiInput.connection;
  }

  /**
   * Name of the manufacturer of the device that makes this input port available.
   *
   * @type {string}
   * @readonly
   */
  get manufacturer() {
    return this._midiInput.manufacturer;
  }

  /**
   * State of the input port: `"connected"` or `"disconnected"`.
   *
   * @type {string}
   * @readonly
   */
  get state() {
    return this._midiInput.state;
  }

  /**
   * Type of the input port (`"input"`)
   *
   * @type {string}
   * @readonly
   */
  get type() {
    return this._midiInput.type;
  }

  get nrpnEventsEnabled() {
    console.warn("The 'nrpnEventsEnabled' property has been moved to the 'InputChannel' class.");
    return false;
  }

}
