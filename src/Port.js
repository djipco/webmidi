import { EventEmitter } from "../node_modules/djipevents/src/djipevents.js";
import { WebMidi } from "./WebMidi.js";

/**
 * The `Port` class is a parallel to the [`MIDIPort`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIPort)
 * provided by the [`Web MIDI API`](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API). It provides
 * a base for the [`Input`](Input) and [`Output`](Output) classes encpasulating common code and enabling
 * polymorphism.
 *
 * Note that a single MIDI device may expose several input and/or output ports.
 *
 *
 * @fires Port#opened
 * @fires Port#disconnected
 * @fires Port#closed
 *
 * @extends EventEmitter
 * @license Apache-2.0
 */
export class Port extends EventEmitter {
  /**
   * Creates an `Port` object.
   *
   * @param {MIDIPort} port [`MIDIInput`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIInput) or
   * [`MIDIOutput`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIOutput) object as provided by the MIDI
   * subsystem (Web MIDI API).
   */
  constructor(port) {
    super();
    /**
     * Reference to the actual MIDIPort object
     * @type {MIDIPort}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIPort}
     * @private
     */
    this._port = port;

    /**
     * @type {number}
     * @private
     */
    this._octaveOffset = 0;

    /**
     * Array containing the 16 [`OutputChannel`]{@link OutputChannel} or [`InputChannel`](@link InputChannel) for
     * this `Port`. The channels are numbered 1 through 16.
     *
     * @type {OutputChannel[]|InputChannel[]}
     */
    this.channels = [];

    // Setup listeners
    this._port.onstatechange = this._onStateChange.bind(this);
  }

  /**
   * Destroys the `Port` by removing all listeners, emptying the [`channels`](#channels) array and
   * unlinking the MIDI subsystem. This is mostly for internal use.
   *
   * @returns {Promise<void>}
   */
  async destroy() {
    this.removeListener();
    this.channels.forEach((ch) => ch.destroy());
    this.channels = [];
    if (this._port) {
      this._port.onstatechange = null;
    }
    await this.close();
    this._port = null;
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
      target: this,
      port: this, // for consistency
    };

    if (e.port.connection === "open") {
      /**
       * Event emitted when the `Port` has been opened by calling the [`open()`]{@link #open}
       * method.
       *
       * @event Port#opened
       * @type {object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `opened`
       * @property {Port} target The object that dispatched the event.
       * @property {Port} port The `Port` that triggered the event.
       */
      event.type = "opened";
      this.emit("opened", event);
    } else if (e.port.connection === "closed" && e.port.state === "connected") {
      /**
       * Event emitted when the `Port` has been closed by calling the
       * [`close()`]{@link #close} method.
       *
       * @event Port#closed
       * @type {object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `closed`
       * @property {Port} target The object that dispatched the event.
       * @property {Port} port The `Port` that triggered the event.
       */
      event.type = "closed";
      this.emit("closed", event);
    } else if (e.port.connection === "closed" && e.port.state === "disconnected") {
      /**
       * Event emitted when the `Port` becomes unavailable. This event is typically fired
       * when the MIDI device is unplugged.
       *
       * @event Port#disconnected
       * @type {object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `disconnected`
       * @property {Port} port Object with properties describing the {@link Port} that was
       * disconnected. This is not the actual `Port` as it is no longer available.
       * @property {Port} target The object that dispatched the event.
       */
      event.type = "disconnected";
      event.port = {
        connection: e.port.connection,
        id: e.port.id,
        manufacturer: e.port.manufacturer,
        name: e.port.name,
        state: e.port.state,
        type: e.port.type,
      };
      this.emit("disconnected", event);
    } else if (e.port.connection === "pending" && e.port.state === "disconnected") {
      // I don't see the need to forward that...
    } else {
      console.warn("This statechange event was not caught: ", e.port.connection, e.port.state);
    }
  }

  /**
   * Name of the MIDI Port.
   *
   * @type {string}
   * @readonly
   */
  get name() {
    return this._port.name;
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
    return this._port.id;
  }

  /**
   * Port's connection state: `pending`, `open` or `closed`.
   *
   * @type {'open'|'closed'|'pending'}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIPort/connection}
   * @readonly
   */
  get connection() {
    return this._port.connection;
  }

  /**
   * Name of the manufacturer of the device that makes this port available.
   *
   * @type {string}
   * @readonly
   */
  get manufacturer() {
    return this._port.manufacturer;
  }

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
   * State of the port: `connected` or `disconnected`.
   *
   * @type {'connected'|'disconnected'}
   * @readonly
   */
  get state() {
    return this._port.state;
  }

  /**
   * The port type, one of 'input' or 'output'
   *
   * @type {'input'|'output'}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIPort/type}
   * @readonly
   */
  get type() {
    return this._port.type;
  }
}
