import {EventEmitter} from "../node_modules/djipevents/src/djipevents.js";
import {OutputChannel} from "./OutputChannel.js";
import {Enumerations, Message, WebMidi} from "./WebMidi.js";
import {Utilities} from "./Utilities.js";

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
   * @param {MIDIOutput} midiOutput [`MIDIOutput`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIOutput)
   * object as provided by the MIDI subsystem.
   */
  constructor(midiOutput) {

    super();

    /**
     * A reference to the `MIDIOutput` object
     * @type {MIDIOutput}
     * @private
     */
    this._midiOutput = midiOutput;

    /**
     * @type {number}
     * @private
     */
    this._octaveOffset = 0;

    /**
     * Array containing the 16 [`OutputChannel`]{@link OutputChannel} objects available provided by
     * this `Output`. The channels are numbered 1 through 16.
     *
     * @type {OutputChannel[]}
     */
    this.channels = [];
    for (let i = 1; i <= 16; i++) this.channels[i] = new OutputChannel(this, i);

    this._midiOutput.onstatechange = this._onStateChange.bind(this);

  }

  /**
   * Destroys the `Output`. All listeners are removed, all channels are destroyed and the MIDI
   * subsystem is unlinked.
   * @returns {Promise<void>}
   */
  async destroy() {
    this.removeListener();
    this.channels.forEach(ch => ch.destroy());
    this.channels = [];
    if (this._midiOutput) this._midiOutput.onstatechange = null;
    await this.close();
    this._midiOutput = null;
  }

  /**
   * @private
   */
  _onStateChange(e) {

    let event = {
      timestamp: WebMidi.time
    };

    if (e.port.connection === "open") {

      /**
       * Event emitted when the {@link Output} has been opened by calling the
       * [open()]{@link Output#open} method.
       *
       * @event Output#opened
       * @type {object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"opened"`
       * @property {Output} target The object to which the listener was originally added (`Output`).
       * @property {Output} port The port that was opened
       */
      event.type = "opened";
      event.target = this;
      event.port = event.target; // for consistency
      this.emit("opened", event);

    } else if (e.port.connection === "closed" && e.port.state === "connected") {

      /**
       * Event emitted when the {@link Output} has been closed by calling the
       * [close()]{@link Output#close} method.
       *
       * @event Output#closed
       * @type {object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"closed"`
       * @property {Output} target The object to which the listener was originally added (`Output`).
       * @property {Output} port The port that was closed
       */
      event.type = "closed";
      event.target = this;
      event.port = event.target; // for consistency
      this.emit("closed", event);

    } else if (e.port.connection === "closed" && e.port.state === "disconnected") {

      /**
       * Event emitted when the {@link Output} becomes unavailable. This event is typically fired
       * when the MIDI device is unplugged.
       *
       * @event Output#disconnected
       * @type {object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp0 when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"disconnected"`
       * @property {Output} target The object to which the listener was originally added (`Output`).
       * @property {object} port Object with properties describing the {@link Output} that was
       * disconnected. This is not the actual `Output` as it is no longer available.
       */
      event.type = "disconnected";
      event.port = {
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
      console.warn("This statechange event was not caught:", e.port.connection, e.port.state);
    }

  }

  /**
   * Opens the output for usage. When the library is enabled, all ports are automatically opened.
   * This method is only useful for ports that have been manually closed.
   *
   * @returns {Promise<Output>} The promise is fulfilled with the `Output` object.
   */
  async open() {

    // Explicitly opens the port for usage. This is not mandatory. When the port is not explicitly
    // opened, it is implicitly opened (asynchronously) when calling `send()` on the `MIDIOutput`.
    // We do it explicitly so that 'connected' events are dispatched immediately and we are ready to
    // send.
    try {
      await this._midiOutput.open();
      return Promise.resolve(this);
    } catch (err) {
      return Promise.reject(err);
    }

  }

  /**
   * Closes the output connection. When an output is closed, it cannot be used to send MIDI messages
   * until the output is opened again by calling [`open()`]{@link #open}. You can check
   * the connection status by looking at the [`connection`]{@link #connection} property.
   *
   * @returns {Promise<void>}
   */
  async close() {

    // We close the port. This triggers a 'statechange' event which we listen to to re-trigger the
    // 'closed' event.
    if (this._midiOutput) {
      await this._midiOutput.close();
    } else {
      await Promise.resolve();
    }

  }

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
  send(message, options = {time: 0}, legacy = 0) {

    // If a Message object is passed in we extract the message data (the jzz plugin used on Node.js
    // does not support using Uint8Array).
    if (message instanceof Message) {
      message = Utilities.isNode ? message.data : message.rawData;
    }

    // If the data is a Uint8Array and we are on Node, we must convert it to array so it works with
    // the jzz module.
    if (message instanceof Uint8Array && Utilities.isNode) {
      message = Array.from(message);
    }

    // Validation
    if (WebMidi.validation) {

      // If message is neither an array nor a Uint8Array, then we are in legacy mode
      if (!Array.isArray(message) && !(message instanceof Uint8Array)) {
        message = [message];
        if (Array.isArray(options)) message = message.concat(options);
        options = isNaN(legacy) ? {time: 0} : {time: legacy};
      }

      if (!(parseInt(message[0]) >= 128 && parseInt(message[0]) <= 255)) {
        throw new RangeError("The first byte (status) must be an integer between 128 and 255.");
      }

      message.slice(1).forEach(value => {
        value = parseInt(value);
        if (!(value >= 0 && value <= 255)) {
          throw new RangeError("Data bytes must be integers between 0 and 255.");
        }
      });

      if (!options) options = {time: 0};

    }

    // Send message and return `Output` for chaining
    this._midiOutput.send(message, Utilities.toTimestamp(options.time));
    return this;

  }

  /**
   * Sends a MIDI [**system exclusive**]{@link
    * https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages}
   * (*sysex*) message. There are two categories of system exclusive messages: manufacturer-specific
   * messages and universal messages. Universal messages are further divided into three subtypes:
   *
   *   * Universal non-commercial (for research and testing): `0x7D`
   *   * Universal non-realtime: `0x7E`
   *   * Universal realtime: `0x7F`
   *
   * The method's first parameter (`identification`) identifies the type of message. If the value of
   * `identification` is `0x7D` (125), `0x7E` (126) or `0x7F` (127), the message will be identified
   * as a **universal non-commercial**, **universal non-realtime** or **universal realtime** message
   * (respectively).
   *
   * If the `identification` value is an array or an integer between 0 and 124, it will be used to
   * identify the manufacturer targeted by the message. The *MIDI Manufacturers Association*
   * maintains a full list of
   * [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers).
   *
   * The `data` parameter should only contain the data of the message. When sending out the actual
   * MIDI message, WEBMIDI.js will automatically prepend the data with the **sysex byte** (`0xF0`)
   * and the identification byte(s). It will also automatically terminate the message with the
   * **sysex end byte** (`0xF7`).
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
   * ##### Examples of manufacturer-specific system exclusive messages
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
   * There is no limit for the length of the data array. However, it is generally suggested to keep
   * system exclusive messages to 64Kb or less.
   *
   * ##### Example of universal system exclusive message
   *
   * If you want to send a universal sysex message, simply assign the correct identification number
   * in the first parameter. Number `0x7D` (125) is for non-commercial, `0x7E` (126) is for
   * non-realtime and `0x7F` (127) is for realtime.
   *
   * So, for example, if you wanted to send an identity request non-realtime message (`0x7E`), you
   * could use the following:
   *
   * ```js
   * WebMidi.outputs[0].sendSysex(0x7E, [0x7F, 0x06, 0x01]);
   * ```
   *
   * For more details on the format of universal messages, consult the list of
   * [universal sysex messages](https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages).
   *
   * @param {number|number[]} identification An unsigned integer or an array of three unsigned
   * integers between `0` and `127` that either identify the manufacturer or sets the message to be
   * a **universal non-commercial message** (`0x7D`), a **universal non-realtime message** (`0x7E`)
   * or a **universal realtime message** (`0x7F`). The *MIDI Manufacturers Association* maintains a
   * full list of
   * [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers).
   *
   * @param {number[]|Uint8Array} [data] A `Uint8Array` or an array of unsigned integers between `0`
   * and `127`. This is the data you wish to transfer.
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
  sendSysex(identification, data= [], options = {}) {

    identification = [].concat(identification);

    // Check if data is Uint8Array
    if (data instanceof Uint8Array) {
      const merged = new Uint8Array(1 + identification.length + data.length + 1);
      merged[0] = Enumerations.SYSTEM_MESSAGES.sysex;
      merged.set(Uint8Array.from(identification), 1);
      merged.set(data, 1 + identification.length);
      merged[merged.length - 1] = Enumerations.SYSTEM_MESSAGES.sysexend;
      this.send(merged, {time: options.time});
    } else {
      const merged = identification.concat(data, Enumerations.SYSTEM_MESSAGES.sysexend);
      this.send([Enumerations.SYSTEM_MESSAGES.sysex].concat(merged), {time: options.time});
    }

    return this;

  };

  /**
   * Clears all MIDI messages that have been queued and scheduled but not yet sent.
   *
   * **Warning**: this method is defined in the
   * [Web MIDI API specification](https://www.w3.org/TR/webmidi/#MIDIOutput) but has not been
   * implemented by all browsers yet. You can follow
   * [this issue](https://github.com/djipco/webmidi/issues/52) for more info.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  clear() {

    if (this._midiOutput.clear) {

      this._midiOutput.clear();

    } else {

      if (WebMidi.validation) {
        console.warn(
          "The 'clear()' method has not yet been implemented in your environment."
        );
      }

    }

    return this;

  }

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
  sendTimecodeQuarterFrame(value, options = {}) {

    if (WebMidi.validation) {
      value = parseInt(value);
      if (isNaN(value) || !(value >= 0 && value <= 127)) {
        throw new RangeError("The value must be an integer between 0 and 127.");
      }
    }

    this.send(
      [
        Enumerations.SYSTEM_MESSAGES.timecode,
        value
      ],
      {time: options.time}
    );

    return this;

  };

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
  sendSongPosition(value = 0, options = {}) {

    // @todo allow passing in 2-entries array for msb/lsb

    value = Math.floor(value) || 0;

    var msb = (value >> 7) & 0x7F;
    var lsb = value & 0x7F;

    this.send(
      [
        Enumerations.SYSTEM_MESSAGES.songposition,
        msb,
        lsb
      ],
      {time: options.time}
    );

    return this;

  }

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
  sendSongSelect(value = 0, options = {}) {

    if (WebMidi.validation) {

      value = parseInt(value);

      if (isNaN(value) || !(value >= 0 && value <= 127)) {
        throw new RangeError("The program value must be between 0 and 127");
      }

    }

    this.send(
      [
        Enumerations.SYSTEM_MESSAGES.songselect,
        value
      ],
      {time: options.time}
    );

    return this;

  }

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
  sendTuneRequest(options = {}) {

    this.send(
      [Enumerations.SYSTEM_MESSAGES.tunerequest],
      {time: options.time}
    );

    return this;

  }

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
  sendClock(options = {}) {

    this.send(
      [Enumerations.SYSTEM_MESSAGES.clock],
      {time: options.time}
    );

    return this;

  }

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
  sendStart(options = {}) {

    this.send(
      [Enumerations.SYSTEM_MESSAGES.start],
      {time: options.time}
    );

    return this;

  }

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
  sendContinue(options = {}) {

    this.send(
      [Enumerations.SYSTEM_MESSAGES.continue],
      {time: options.time}
    );

    return this;

  }

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
  sendStop(options = {}) {

    this.send(
      [Enumerations.SYSTEM_MESSAGES.stop],
      {time: options.time}
    );

    return this;

  }

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
  sendActiveSensing(options = {}) {

    this.send(
      [Enumerations.SYSTEM_MESSAGES.activesensing],
      {time: options.time}
    );

    return this;

  }

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
  sendReset(options = {}) {

    this.send(
      [Enumerations.SYSTEM_MESSAGES.reset],
      {time: options.time}
    );

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  sendTuningRequest(options = {}) {

    if (WebMidi.validation) {
      console.warn(
        "The sendTuningRequest() method has been deprecated. Use sendTuningRequest() instead."
      );
    }

    return this.sendTuneRequest(options);

  }

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
  sendKeyAftertouch(note, pressure, options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendKeyAftertouch(note, pressure, options);
    });

    return this;

  };

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
   * | 96     |`dataincrement`                |
   * | 97     |`datadecrement`                |
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
  sendControlChange(controller, value, options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendControlChange(controller, value, options);
    });

    return this;

  };

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
  sendPitchBendRange(semitones= 0, cents = 0, options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendPitchBendRange(semitones, cents, options);
    });

    return this;

  }


  /**
   * @private
   * @deprecated since version 3.0
   */
  setPitchBendRange(semitones = 0, cents = 0, channel = "all", options = {}) {

    if (WebMidi.validation) {

      console.warn(
        "The setPitchBendRange() method is deprecated. Use sendPitchBendRange() instead."
      );

      options.channels = channel;
      if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    }

    return this.sendPitchBendRange(semitones, cents, options);

  }

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
  sendRpnValue(parameter, data, options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendRpnValue(parameter, data, options);
    });

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  setRegisteredParameter(parameter, data = [], channel = "all", options = {}) {

    if (WebMidi.validation) {

      console.warn(
        "The setRegisteredParameter() method is deprecated. Use sendRpnValue() instead."
      );

      options.channels = channel;
      if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    }

    return this.sendRpnValue(parameter, data, options);

  }

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
  sendChannelAftertouch(pressure, options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendChannelAftertouch(pressure, options);
    });

    return this;

  }

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
  sendPitchBend(value, options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendPitchBend(value, options);
    });

    return this;

  }

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
  sendProgramChange(program = 0, options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendProgramChange(program, options);
    });

    return this;

  }

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
  sendModulationRange(semitones, cents, options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendModulationRange(semitones, cents, options);
    });

    return this;

  };

  /**
   * @private
   * @deprecated since version 3.0
   */
  setModulationRange(semitones = 0, cents = 0, channel = "all", options = {}) {

    if (WebMidi.validation) {

      console.warn(
        "The setModulationRange() method is deprecated. Use sendModulationRange() instead."
      );

      options.channels = channel;
      if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    }

    return this.sendModulationRange(semitones, cents, options);

  }

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
  sendMasterTuning(value, options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendMasterTuning(value, options);
    });

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  setMasterTuning(value, channel = {}, options = {}) {

    if (WebMidi.validation) {

      console.warn(
        "The setMasterTuning() method is deprecated. Use sendMasterTuning() instead."
      );

      options.channels = channel;
      if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    }

    return this.sendMasterTuning(value, options);

  }

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
  sendTuningProgram(value, options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendTuningProgram(value, options);
    });

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  setTuningProgram(value, channel = "all", options = {}) {

    if (WebMidi.validation) {

      console.warn(
        "The setTuningProgram() method is deprecated. Use sendTuningProgram() instead."
      );

      options.channels = channel;
      if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    }

    return this.sendTuningProgram(value, options);

  }

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
  sendTuningBank(value= 0, options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendTuningBank(value, options);
    });

    return this;

  };

  /**
   * @private
   * @deprecated since version 3.0
   */
  setTuningBank(parameter, channel = "all", options = {}) {

    if (WebMidi.validation) {

      console.warn(
        "The setTuningBank() method is deprecated. Use sendTuningBank() instead."
      );

      options.channels = channel;
      if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    }

    return this.sendTuningBank(parameter, options);

  }

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
  sendChannelMode(command, value = 0, options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendChannelMode(command, value, options);
    });

    return this;

  }

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
  sendAllSoundOff(options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendAllSoundOff(options);
    });

    return this;

  }

  /**
   * Sends an **all notes off** channel mode message. This will make all currently playing notes
   * fade out just as if their key had been released. This is different from the
   * [`sendAllSoundOff()`]{@link #sendAllSoundOff} method which mutes all sounds immediately.
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
  sendAllNotesOff(options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendAllNotesOff(options);
    });

    return this;

  }

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
  sendResetAllControllers(options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendResetAllControllers(options);
    });

    return this;

  }

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
  sendPolyphonicMode(mode, options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendPolyphonicMode(mode, options);
    });

    return this;

  }

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
  sendLocalControl(state, options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendLocalControl(state, options);
    });

    return this;

  }

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
  sendOmniMode(state, options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendOmniMode(state, options);
    });

    return this;

  }

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
  sendNrpnValue(parameter, data, options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendNrpnValue(parameter, data, options);
    });

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  setNonRegisteredParameter(parameter, data = [], channel = "all", options = {}) {

    if (WebMidi.validation) {

      console.warn(
        "The setNonRegisteredParameter() method is deprecated. Use sendNrpnValue() instead."
      );

      options.channels = channel;
      if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    }

    return this.sendNrpnValue(parameter, data, options);

  }

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
  sendRpnIncrement(parameter, options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendRpnIncrement(parameter, options);
    });

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  incrementRegisteredParameter(parameter, channel = "all", options = {}) {

    if (WebMidi.validation) {

      console.warn(
        "The incrementRegisteredParameter() method is deprecated. Use sendRpnIncrement() instead."
      );

      options.channels = channel;
      if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    }

    return this.sendRpnIncrement(parameter, options);

  }

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
  sendRpnDecrement(parameter, options = {}) {

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendRpnDecrement(parameter, options);
    });

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  decrementRegisteredParameter(parameter, channel = "all", options = {}) {

    if (WebMidi.validation) {

      console.warn(
        "The decrementRegisteredParameter() method is deprecated. Use sendRpnDecrement() instead."
      );

      options.channels = channel;
      if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    }

    return this.sendRpnDecrement(parameter, options);

  }

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
  sendNoteOff(note, options= {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendNoteOff(note, options);
    });

    return this;

  }

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
  stopNote(note, options) {
    return this.sendNoteOff(note, options);
  }

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
  playNote(note, options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy-compatibility warnings
      if (options.rawVelocity) {
        console.warn("The 'rawVelocity' option is deprecated. Use 'rawAttack' instead.");
      }

      if (options.velocity) {
        console.warn("The 'velocity' option is deprecated. Use 'velocity' instead.");
      }

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].playNote(note, options);
    });

    return this;

  }

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
  sendNoteOn(note, options = {}, legacy = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        const channels = options;
        options = legacy;
        options.channels = channels;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

    }

    if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    // This actually supports passing a Note object even if, semantically, this does not make sense.
    Utilities.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendNoteOn(note, options);
    });

    return this;

  }

  /**
   * Name of the MIDI output.
   *
   * @type {string}
   * @readonly
   */
  get name() {
    return this._midiOutput.name;
  }

  /**
   * ID string of the MIDI output. The ID is host-specific. Do not expect the same ID on different
   * platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
   * the same port.
   *
   * @type {string}
   * @readonly
   */
  get id() {
    return this._midiOutput.id;
  }

  /**
   * Output port's connection state: `pending`, `open` or `closed`.
   *
   * @type {string}
   * @readonly
   */
  get connection() {
    return this._midiOutput.connection;
  }

  /**
   * Name of the manufacturer of the device that makes this output port available.
   *
   * @type {string}
   * @readonly
   */
  get manufacturer() {
    return this._midiOutput.manufacturer;
  }

  /**
   * State of the output port: `connected` or `disconnected`.
   *
   * @type {string}
   * @readonly
   */
  get state() {
    return this._midiOutput.state;
  }

  /**
   * Type of the output port (it will always be: `output`).
   *
   * @type {string}
   * @readonly
   */
  get type() {
    return this._midiOutput.type;
  }

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

}
