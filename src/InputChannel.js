import {EventEmitter} from "../node_modules/djipevents/dist/djipevents.esm.min.js";
import {WebMidi} from "./WebMidi.js";

/**
 * The `InputChannel` class represents a single input channel (1-16) from an input device. This
 * object is derived from the host's MIDI subsystem and cannot be instantiated directly.
 *
 * All 16 `InputChannel` objects can be found inside the input's [channels]{@link Input#channels}
 * property.
 *
 * @param {Input} input The `Input` this channel belongs to
 * @param {number} number The channel's number (1-16)
 *
 * @fires InputChannel#midimessage
 * @fires InputChannel#noteoff
 * @fires InputChannel#noteon
 * @fires InputChannel#keyaftertouch
 * @fires InputChannel#controlchange
 * @fires InputChannel#channelmode
 * @fires InputChannel#programchange
 * @fires InputChannel#channelaftertouch
 * @fires InputChannel#pitchbend
 */
export class InputChannel extends EventEmitter {

  constructor(input, number) {

    super();

    /**
     * The {@link Input} this channel belongs to
     * @type {Input}
     */
    this.input = input;

    /**
     * This channel's number (1-16)
     * @type {number}
     */
    this.number = number;

    /**
     * An array of the current NRPNs being constructed for this channel
     *
     * @private
     *
     * @type {string[]}
     */
    this._nrpnBuffer = [];

    // Enable NRPN events by default
    this.nrpnEventsEnabled = true;

  }

  destroy() {
    this.input = null;
    this.removeListener();
  }

  /**
   * @param e Event
   * @protected
   */
  _parseEvent(e) {

    // Extract data bytes (unless it's a sysex message)
    let dataBytes = null;
    if (e.data[0] !== WebMidi.MIDI_SYSTEM_MESSAGES.sysex) dataBytes = e.data.slice(1);

    /**
     * Event emitted when a MIDI message is received on the `InputChannel`
     *
     * @event InputChannel#midimessage
     * @type {Object}
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
     * @property {number} event.statusByte The message's status byte.
     * @property {?number[]} event.dataBytes The message's data bytes as an array of 0, 1 or 2
     * integers. This will be null for `sysex` messages.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"midimessage"`
     */
    let midiMessageEvent = {
      target: this,
      statusByte: e.data[0],
      dataBytes: dataBytes,
      data: e.data,
      timestamp: e.timeStamp,
      type: "midimessage"
    };

    this.emit("midimessage", midiMessageEvent);

    // Parse the event to see if its part of an NRPN sequence
    this._parseEventForNrpnMessage(e);

    // Parse the inbound event for regular messages
    this._parseEventForStandardMessages(e);

  }

  _parseEventForStandardMessages(e) {

    let command = e.data[0] >> 4;
    let data1, data2;

    if (e.data.length > 1) {
      data1 = e.data[1];
      data2 = e.data.length > 2 ? e.data[2] : undefined;
    }

    // Returned event
    let event = {
      target: this,
      data: e.data,
      timestamp: e.timeStamp
    };

    if (
      command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.noteoff ||
      (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.noteon && data2 === 0)
    ) {

      /**
       * Event emitted when a **note off** MIDI message has been received.
       *
       * @event InputChannel#noteoff
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Uint8Array} data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"noteoff"`
       * @property {Object} note
       * @property {Object} note.number The MIDI note number.
       * @property {Object} note.name The usual note name (C, C#, D, D#, etc.).
       * @property {Object} note.octave The octave (between -2 and 8).
       * @property {number} release The release velocity expressed as a float between 0 and 1.
       * @property {number} rawRelease The release velocity expressed as an integer (between 0 and
       * 127).
       */
      event.type = "noteoff";
      event.note = {
        number: data1,
        name: WebMidi.NOTES[data1 % 12],
        octave: WebMidi.getOctave(data1)
      };
      event.release = data2 / 127;
      event.rawRelease = data2;

    } else if (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.noteon) {

      /**
       * Event emitted when a **note on** MIDI message has been received.
       *
       * @event InputChannel#noteon
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Uint8Array} data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"noteon"`
       * @property {Object} note
       * @property {Object} note.number The MIDI note number.
       * @property {Object} note.name The usual note name (C, C#, D, D#, etc.).
       * @property {Object} note.octave The octave (between -2 and 8).
       * @property {number} attack The attack velocity expressed as a float between 0 and 1.
       * @property {number} rawAttack The attack velocity expressed as an integer (between 0 and
       * 127).
       */
      event.type = "noteon";
      event.note = {
        number: data1,
        name: WebMidi.NOTES[data1 % 12],
        octave: WebMidi.getOctave(data1)
      };
      event.attack = data2 / 127;
      event.rawVAttack = data2;

    } else if (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.keyaftertouch) {

      /**
       * Event emitted when a key-specific aftertouch MIDI message has been received.
       *
       * @event InputChannel#keyaftertouch
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Uint8Array} data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"keyaftertouch"`
       * @property {Object} note
       * @property {Object} note.number The MIDI note number.
       * @property {Object} note.name The usual note name (C, C#, D, D#, etc.).
       * @property {Object} note.octave The octave (between -2 and 8).
       * @property {number} value The aftertouch amount expressed as a float between 0 and 1.
       * @property {number} rawValue The aftertouch amount expressed as an integer (between 0 and
       * 127).
       */
      event.type = "keyaftertouch";
      event.note = {
        number: data1,
        name: WebMidi.NOTES[data1 % 12],
        octave: WebMidi.getOctave(data1)
      };
      event.value = data2 / 127;
      event.rawValue = data2;

    } else if (
      command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.controlchange &&
      data1 >= 0 && data1 <= 119
    ) {

      /**
       * Event emitted when a control change MIDI message has been received.
       *
       * @event InputChannel#controlchange
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Uint8Array} data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"controlchange"`
       * @property {Object} controller
       * @property {Object} controller.number The number of the controller.
       * @property {Object} controller.name The usual name or function of the controller.
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */
      event.type = "controlchange";
      event.controller = {
        number: data1,
        name: this.getCcNameByNumber(data1)
      };
      event.value = data2 / 127;
      event.rawValue = data2;

    } else if (
      command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.channelmode &&
      data1 >= 120 && data1 <= 127
    ) {

      /**
       * Event emitted when a channel mode MIDI message has been received.
       *
       * @event InputChannel#channelmode
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Uint8Array} data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"channelmode"`
       * @property {Object} controller
       * @property {Object} controller.number The number of the controller.
       * @property {Object} controller.name The usual name or function of the controller.
       * @property {number} value The value expressed as a float between 0 and 1.
       */
      event.type = "channelmode";
      event.controller = {
        number: data1,
        name: this.getChannelModeByNumber(data1)
      };
      event.value = data2;

    } else if (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.programchange) {

      /**
       * Event emitted when a program change MIDI message has been received.
       *
       * @event InputChannel#programchange
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Uint8Array} data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"programchange"`
       * @property {number} value The value expressed as a float between 0 and 1.
       */

      /**
       * @param {uint} event.value The value received (between 0 and 127).
       */
      event.type = "programchange";
      event.value = data1;

    } else if (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.channelaftertouch) {

      /**
       * Event emitted when a control change MIDI message has been received.
       *
       * @event InputChannel#channelaftertouch
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Uint8Array} data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"channelaftertouch"`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */
      event.type = "channelaftertouch";
      event.value = data1 / 127;
      event.rawValue = data1;

    } else if (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.pitchbend) {

      /**
       * Event emitted when a pitch bend MIDI message has been received.
       *
       * @event InputChannel#pitchbend
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Uint8Array} data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"pitchbend"`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 16383).
       */
      event.type = "pitchbend";
      event.value = ((data2 << 7) + data1 - 8192) / 8192;
      event.rawValue = (data2 << 7) + data1;

    } else {
      event.type = "unknownmessage";
    }

    this.emit(event.type, event);

  }

  /**
   * Returns the channel mode name matching the specified number. If no match is found, the function
   * returns `false`.
   *
   * @param {number} number An integer representing the channel mode message.
   * @returns {string|false} The name of the matching channel mode or `false` if not match could be
   * found.
   *
   * @since 2.0.0
   */
  getChannelModeByNumber(number) {

    number = Math.floor(number);

    if ( !(number >= 120 && status <= 127) ) return false;

    for (let cm in WebMidi.MIDI_CHANNEL_MODE_MESSAGES) {

      if (
        WebMidi.MIDI_CHANNEL_MODE_MESSAGES.hasOwnProperty(cm) &&
        number === WebMidi.MIDI_CHANNEL_MODE_MESSAGES[cm]
      ) {
        return cm;
      }

    }

  }

  /**
   * Parses channel events and constructs NRPN message parts in valid sequences.
   * Keeps a separate NRPN buffer for each channel.
   * Emits an event after it receives the final CC parts msb 127 lsb 127.
   * If a message is incomplete and other messages are received before
   * the final 127 bytes, the incomplete message is cleared.
   * @param e Event
   * @private
   */
  _parseEventForNrpnMessage(e) {

    if (!this.nrpnEventsEnabled) return;

    // Extract basic data
    let command = e.data[0] >> 4;
    let channel = (e.data[0] & 0xf) + 1;
    let data1;
    let data2;

    if (e.data.length > 1) {
      data1 = e.data[1];
      data2 = e.data.length > 2 ? e.data[2] : undefined;
    }

    // Message not valid for NRPN
    if (
      !(
        command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.controlchange &&
        (
          (
            data1 >= WebMidi.MIDI_NRPN_MESSAGES.increment &&
            data1 <= WebMidi.MIDI_NRPN_MESSAGES.parammsb
          ) ||
          data1 === WebMidi.MIDI_NRPN_MESSAGES.entrymsb ||
          data1 === WebMidi.MIDI_NRPN_MESSAGES.entrylsb
        )
      )
    ) {
      return;
    }

    // set up a CC event to parse as NRPN part
    let ccEvent = {
      target: this,
      type: "controlchange",
      data: e.data,
      timestamp: e.timeStamp,
      channel: channel,
      controller: {
        number: data1,
        name: this.getCcNameByNumber(data1)
      },
      value: data2
    };

    if (
      // if we get a starting MSB (CC99 - 0-126) vs an end MSB (CC99 - 127), destroy incomplete NRPN
      // and begin building again
      ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.parammsb &&
      ccEvent.value != WebMidi.MIDI_NRPN_MESSAGES.nullactiveparameter
    ) {
      this._nrpnBuffer = [];
      this._nrpnBuffer[0] = ccEvent;
    } else if(
      // add the param LSB
      this._nrpnBuffer.length === 1 &&
      ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.paramlsb
    ) {
      this._nrpnBuffer.push(ccEvent);

    } else if(
      // add data inc/dec or value MSB for 14bit
      this._nrpnBuffer.length === 2 &&
      (ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.increment ||
        ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.decrement ||
        ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.entrymsb)
    ) {
      this._nrpnBuffer.push(ccEvent);
    } else if(
      // if we have a value MSB, only add an LSB to pair with that
      this._nrpnBuffer.length === 3 &&
      this._nrpnBuffer[2].number === WebMidi.MIDI_NRPN_MESSAGES.entrymsb &&
      ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.entrylsb
    ) {
      this._nrpnBuffer.push(ccEvent);

    } else if(
      // add an end MSB (CC99 - 127)
      this._nrpnBuffer.length >= 3 &&
      this._nrpnBuffer.length <= 4 &&
      ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.parammsb &&
      ccEvent.value === WebMidi.MIDI_NRPN_MESSAGES.nullactiveparameter
    ) {
      this._nrpnBuffer.push(ccEvent);
    } else if(
      // add an end LSB (CC99 - 127)
      this._nrpnBuffer.length >= 4 &&
      this._nrpnBuffer.length <= 5 &&
      ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.paramlsb &&
      ccEvent.value === WebMidi.MIDI_NRPN_MESSAGES.nullactiveparameter
    ) {
      this._nrpnBuffer.push(ccEvent);
      // now we have a full inc or dec NRPN message, lets create that event!

      let rawData = [];

      this._nrpnBuffer.forEach(ev => rawData.push(ev.data));

      let nrpnNumber = (this._nrpnBuffer[0].value<<7) | (this._nrpnBuffer[1].value);
      let nrpnValue = this._nrpnBuffer[2].value;
      if (this._nrpnBuffer.length === 6) {
        nrpnValue = (this._nrpnBuffer[2].value<<7) | (this._nrpnBuffer[3].value);
      }

      let nrpnControllerType = "";

      switch (this._nrpnBuffer[2].controller.number) {
      case WebMidi.MIDI_NRPN_MESSAGES.entrymsb:
        nrpnControllerType = InputChannel.NRPN_TYPES[0];
        break;
      case WebMidi.MIDI_NRPN_MESSAGES.increment:
        nrpnControllerType = InputChannel.NRPN_TYPES[1];
        break;
      case WebMidi.MIDI_NRPN_MESSAGES.decrement:
        nrpnControllerType = InputChannel.NRPN_TYPES[2];
        break;
      default:
        throw new Error("The NPRN type was unidentifiable.");
      }

      // now we are done building an NRPN, so clear the NRPN buffer
      this._nrpnBuffer = [];

      /**
       * Event emitted when a valid NRPN message sequence has been received.
       *
       * @event InputChannel#nrpn
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Uint8Array} data The raw MIDI message as an array of 8 bit values.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"nrpn"`
       * @property {Object} controller
       * @property {Object} controller.number The number of the NRPN.
       * @property {Object} controller.name The usual name or function of the controller.
       * @property {number} value The aftertouch amount expressed as a float between 0 and 1.
       * @property {number} rawValue The aftertouch amount expressed as an integer (between 0 and
       * 65535).
       */
      let nrpnEvent = {
        timestamp: ccEvent.timestamp,
        channel: ccEvent.channel,
        type: "nrpn",
        data: rawData,
        controller: {
          number: nrpnNumber,
          type: nrpnControllerType,
          name: "Non-Registered Parameter " + nrpnNumber
        },
        value: nrpnValue / 65535,
        rawValue: nrpnValue
      };

      this.emit(nrpnEvent.type, nrpnEvent);

    } else {
      // something didn't match, clear the incomplete NRPN message buffer
      this._nrpnBuffer = [];
    }
  }

  /**
   * Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
   * are composed of a sequence of specific **control change** messages. When a valid sequence of
   * such control change messages is received, an `nrpn` event will fire. If an invalid or out of
   * order control change message is received, it will fall through the collector logic and all
   * buffered control change messages will be discarded as incomplete.
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
   * Array of valid **non-registered parameter number** (NRPNs) types.
   *
   * @type {string[]}
   * @readonly
   */
  static get NRPN_TYPES() {
    return ["entry", "increment", "decrement"];
  }

}
