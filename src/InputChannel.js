import {EventEmitter} from "../node_modules/djipevents/dist/esm/djipevents.esm.min.js";
import {WebMidi} from "./WebMidi.js";
import {Utilities} from "./Utilities.js";
import {Note} from "./Note.js";
import {Enumerations} from "./Enumerations.js";

/**
 * The `InputChannel` class represents a MIDI input channel (1-16) from a single input device. This
 * object is derived from the host's MIDI subsystem and cannot be instantiated directly.
 *
 * All 16 `InputChannel` objects can be found inside the input's [channels](Input#channels)
 * property.
 *
 * @param {Input} input The `Input` object this channel belongs to
 * @param {number} number The MIDI channel's number (1-16)
 *
 * @fires InputChannel#midimessage
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
 *
 * @fires InputChannel#allnotesoff
 * @fires InputChannel#allsoundoff
 * @fires InputChannel#localcontrol
 * @fires InputChannel#monomode
 * @fires InputChannel#omnimode
 * @fires InputChannel#resetallcontrollers
 *
 * @fires InputChannel#event:nrpn
 * @fires InputChannel#nrpn-dataentrycoarse
 * @fires InputChannel#nrpn-dataentryfine
 * @fires InputChannel#nrpn-databuttonincrement
 * @fires InputChannel#nrpn-databuttondecrement
 * @fires InputChannel#event:rpn
 * @fires InputChannel#rpn-dataentrycoarse
 * @fires InputChannel#rpn-dataentryfine
 * @fires InputChannel#rpn-databuttonincrement
 * @fires InputChannel#rpn-databuttondecrement
 *
 * @extends EventEmitter
 * @license Apache-2.0
 * @since 3.0.0
 */
export class InputChannel extends EventEmitter {

  constructor(input, number) {

    super();

    /**
     * @type {Input}
     * @private
     */
    this._input = input;

    /**
     * @type {number}
     * @private
     */
    this._number = number;

    /**
     * @type {number}
     * @private
     */
    this._octaveOffset = 0;

    /**
     * An array of messages that form the current NRPN sequence
     * @private
     * @type {Message[]}
     */
    this._nrpnBuffer = [];

    /**
     * An array of messages that form the current RPN sequence
     * @private
     * @type {Message[]}
     */
    this._rpnBuffer = [];

    /**
     * Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
     * are composed of a sequence of specific **control change** messages. When a valid sequence of
     * such control change messages is received, an `nrpn` event will fire.
     *
     * If an invalid or
     * out-of-order control change message is received, it will fall through the collector logic and
     * all buffered control change messages will be discarded as incomplete.
     *
     * @type {boolean}
     */
    this.parameterNumberEventsEnabled = true;

    /**
     * Contains the current playing state of all MIDI notes of this channel (0-127). The state is
     * `true` for a currently playing note and `false` otherwise.
     * @type {boolean[]}
     */
    this.notesState = new Array(128).fill(false);

  }

  /**
   * Destroys the `Input` by removing all listeners and severing the link with the MIDI subsystem's
   * input.
   */
  destroy() {
    this._input = null;
    this._number = null;
    this._octaveOffset = 0;
    this._nrpnBuffer = [];
    this.notesState = new Array(128).fill(false);
    this.parameterNumberEventsEnabled = false;
    this.removeListener();
  }

  /**
   * @param e MIDIMessageEvent
   * @private
   */
  _processMidiMessageEvent(e) {

    // Create and emit a new 'midimessage' event based on the incoming one
    const event = Object.assign({}, e);
    event.target = this;
    event.type = "midimessage";

    /**
     * Event emitted when a MIDI message of any kind is received by an `InputChannel`
     *
     * @event InputChannel#midimessage
     *
     * @type {object}
     *
     * @property {Input} target The `InputChannel` that triggered the event.
     * @property {Message} message A `Message` object containing information about the incoming MIDI
     * message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"midimessage"`
     *
     * @property {Array} data The MIDI message as an array of 8 bit values (deprecated, use
     * the `message` object instead).
     * @property {Uint8Array} rawData The raw MIDI message as a Uint8Array  (deprecated, use
     * the `message` object instead).
     * @property {number} event.statusByte The message's status byte  (deprecated, use the `message`
     * object instead).
     * @property {?number[]} event.dataBytes The message's data bytes as an array of 0, 1 or 2
     * integers. This will be null for `sysex` messages (deprecated, use the `message` object
     * instead).
     */
    this.emit(event.type, event);

    // Parse the inbound event for regular MIDI messages
    this._parseEventForStandardMessages(event);

  }

  /**
   * Parses incoming channel events and emit standard MIDI message events (noteon, noteoff, etc.)
   * @param e Event
   * @private
   */
  _parseEventForStandardMessages(e) {

    const event = Object.assign({}, e);
    event.type = event.message.type || "unknownmidimessage";

    const data1 = e.message.dataBytes[0];
    const data2 = e.message.dataBytes[1];

    if ( event.type === "noteoff" || (event.type === "noteon" && data2 === 0) ) {

      this.notesState[data1] = false;

      /**
       * Event emitted when a **note off** MIDI message has been received on the channel.
       *
       * @event InputChannel#noteoff
       *
       * @type {object}
       * @property {string} type `"noteoff"`
       *
       * @property {InputChannel} target The object that triggered the event (the
       * [`InputChannel`](InputChannel) object).
       * @property {Message} message A [`Message`](Message) object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment
       * ([`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp))
       * when the event occurred (in milliseconds since the navigation start of the document).
       *
       * @property {object} note A [`Note`](Note) object containing information such as note name,
       * octave and release velocity.
       * @property {number} value The release velocity amount expressed as a float between 0 and 1.
       * @property {number} rawValue The release velocity amount expressed as an integer (between 0
       * and 127).
       */

      // The object created when a noteoff event arrives is a Note with an attack velocity of 0.
      event.note = new Note(
        Utilities.offsetNumber(
          data1, this.octaveOffset + this.input.octaveOffset + WebMidi.octaveOffset
        ),
        {
          rawAttack: 0,
          rawRelease: data2,
        }
      );

      event.value = Utilities.from7bitToFloat(data2);
      event.rawValue = data2;

      // Those are kept for backwards-compatibility but are gone from the documentation. They will
      // be removed in future versions (@deprecated).
      event.velocity = event.note.release;
      event.rawVelocity = event.note.rawRelease;

    } else if (event.type === "noteon") {

      this.notesState[data1] = true;

      /**
       * Event emitted when a **note on** MIDI message has been received.
       *
       * @event InputChannel#noteon
       *
       * @type {object}
       * @property {string} type `"noteon"`
       *
       * @property {InputChannel} channel The `InputChannel` object that triggered the event.
       * @property {Array} data The MIDI message as an array of 8 bit values.
       * @property {InputChannel} input The [`Input`](Input) object where through which the message
       * was received.
       * @property {Uint8Array} rawData The raw MIDI message as a `Uint8Array`.
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {Note} note A [`Note`](Note) object containing information such as note name,
       * octave and attack velocity.
       *
       * @property {number} value The attack velocity amount expressed as a float between 0 and 1.
       * @property {number} rawValue The attack velocity amount expressed as an integer (between 0
       * and 127).
       */
      event.note = new Note(
        Utilities.offsetNumber(
          data1, this.octaveOffset + this.input.octaveOffset + WebMidi.octaveOffset
        ),
        { rawAttack: data2 }
      );

      event.value = Utilities.from7bitToFloat(data2);
      event.rawValue = data2;

      // Those are kept for backwards-compatibility but are gone from the documentation. They will
      // be removed in future versions (@deprecated).
      event.velocity = event.note.attack;
      event.rawVelocity = event.note.rawAttack;

    } else if (event.type === "keyaftertouch") {

      /**
       * Event emitted when a **key-specific aftertouch** MIDI message has been received.
       *
       * @event InputChannel#keyaftertouch
       *
       * @type {object}
       * @property {string} type `"keyaftertouch"`
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {string} identifier The note identifier of the key to apply the aftertouch to.
       * This includes any octave offset applied at the channel, input or global level.
       * @property {number} key The MIDI note number of the key to apply the aftertouch to. This
       * includes any octave offset applied at the channel, input or global level.
       * @property {number} rawKey The MIDI note number of the key to apply the aftertouch to. This
       * excludes any octave offset defined at the channel, input or global level.
       * @property {number} value The aftertouch amount expressed as a float between 0 and 1.
       * @property {number} rawValue The aftertouch amount expressed as an integer (between 0 and
       * 127).
       */
      event.identifier = Utilities.toNoteIdentifier(
        data1, WebMidi.octaveOffset + this.input.octaveOffset + this.octaveOffset
      );

      event.key = Utilities.toNoteNumber(event.identifier);
      event.rawKey = data1;

      event.value = Utilities.from7bitToFloat(data2);
      event.rawValue = data2;

      // This is kept for backwards-compatibility but is gone from the documentation. It will be
      // removed from future versions (@deprecated).
      event.note = new Note(
        Utilities.offsetNumber(
          data1, this.octaveOffset + this.input.octaveOffset + WebMidi.octaveOffset
        )
      );

    } else if (event.type === "controlchange") {

      /**
       * Event emitted when a **control change** MIDI message has been received.
       *
       * @event InputChannel#controlchange
       *
       * @type {object}
       * @property {string} type `"controlchange"`
       * @property {string} subtype The type of control change message that was received.
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */
      event.controller = {
        number: data1,
        name: Utilities.getCcNameByNumber(data1)
      };

      event.subtype = event.controller.name || "controller" + data1;
      event.value = Utilities.from7bitToFloat(data2);
      event.rawValue = data2;

      /**
       * Event emitted when a **control change** MIDI message has been received and that message is
       * targeting the controller numbered "xxx". Of course, "xxx" should be replaced by a valid
       * controller number (0-127).
       *
       * @event InputChannel#controlchange-controllerxxx
       *
       * @type {object}
       * @property {string} type `controlchange-controllerxxx`
       * @property {string} subtype The type of control change message that was received.
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */
      const specificEvent = Object.assign({}, event);
      specificEvent.type = `${event.type}-controller${data1}`;
      delete specificEvent.subtype;
      this.emit(specificEvent.type, specificEvent);

      // Trigger channel mode message events (if appropriate)
      if (event.message.dataBytes[0] >= 120) this._parseChannelModeMessage(event);

      // Parse the inbound event to see if its part of an RPN/NRPN sequence
      if (
        this.parameterNumberEventsEnabled &&
        this._isRpnOrNrpnController(event.message.dataBytes[0])
      ) {
        this._parseEventForParameterNumber(event);
      }

    } else if (event.type === "programchange") {

      /**
       * Event emitted when a **program change** MIDI message has been received.
       *
       * @event InputChannel#programchange
       *
       * @type {object}
       * @property {string} type `"programchange"`
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {number} value The value expressed as an integer between 1 and 128.
       * @property {number} rawValue The value expressed as an integer between 0 and 127..
       */
      event.value = data1 + 1;
      event.rawValue = data1;

    } else if (event.type === "channelaftertouch") {

      /**
       * Event emitted when a control change MIDI message has been received.
       *
       * @event InputChannel#channelaftertouch
       *
       * @type {object}
       * @property {string} type `"channelaftertouch"`
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */
      event.value = Utilities.from7bitToFloat(data1);
      event.rawValue = data1;

    } else if (event.type === "pitchbend") {

      /**
       * Event emitted when a pitch bend MIDI message has been received.
       *
       * @event InputChannel#pitchbend
       *
       * @type {object}
       * @property {string} type `"pitchbend"`
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 16383).
       */
      event.value = ((data2 << 7) + data1 - 8192) / 8192;
      event.rawValue = (data2 << 7) + data1;

    } else {
      event.type = "unknownmessage";
    }

    this.emit(event.type, event);

  }

  _parseChannelModeMessage(e) {

    // Make a shallow copy of the incoming event so we can use it as the new event.
    const event = Object.assign({}, e);
    event.type = event.controller.name;

    /**
     * Event emitted when an "all sound off" channel-mode MIDI message has been received.
     *
     * @event InputChannel#allsoundoff
     *
     * @type {object}
     * @property {string} type `"allsoundoff"`
     *
     * @property {InputChannel} target The object that triggered the event (the `InputChannel`
     * object).
     * @property {Message} message A `Message` object containing information about the incoming
     * MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     */

    /**
     * Event emitted when a "reset all controllers" channel-mode MIDI message has been received.
     *
     * @event InputChannel#resetallcontrollers
     *
     * @type {object}
     * @property {string} type `"resetallcontrollers"`
     *
     * @property {InputChannel} target The object that triggered the event (the `InputChannel`
     * object).
     * @property {Message} message A `Message` object containing information about the incoming
     * MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     */

    /**
     * Event emitted when a "local control" channel-mode MIDI message has been received. The value
     * property of the event is set to either `true` (local control on) of `false` (local control
     * off).
     *
     * @event InputChannel#localcontrol
     *
     * @type {object}
     * @property {string} type `"localcontrol"`
     *
     * @property {InputChannel} target The object that triggered the event (the `InputChannel`
     * object).
     * @property {Message} message A `Message` object containing information about the incoming
     * MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     *
     * @property {boolean} value For local control on, the value is `true`. For local control off,
     * the value is `false`.
     */
    if (event.type === "localcontrol") {
      event.value = event.message.data[2] === 127 ? true : false;
    }

    /**
     * Event emitted when an "all notes off" channel-mode MIDI message has been received.
     *
     * @event InputChannel#allnotesoff
     *
     * @type {object}
     * @property {string} type `"allnotesoff"`
     *
     * @property {InputChannel} target The object that triggered the event (the `InputChannel`
     * object).
     * @property {Message} message A `Message` object containing information about the incoming
     * MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     */

    /**
     * Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
     * property of the event is set to either `true` (omni mode on) of `false` (omni mode off).
     *
     * @event InputChannel#omnimode
     *
     * @type {object}
     * @property {string} type `"omnimode"`
     *
     * @property {InputChannel} target The object that triggered the event (the `InputChannel`
     * object).
     * @property {Message} message A `Message` object containing information about the incoming
     * MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     *
     * @property {boolean} value The value is `true` for omni mode on and false for omni mode off.
     */
    if (event.type === "omnimodeon") {
      event.type = "omnimode";
      event.value = true;
    } else if (event.type === "omnimodeoff") {
      event.type = "omnimode";
      event.value = false;
    }

    /**
     * Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
     * the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
     * poly mode on).
     *
     * @event InputChannel#monomode
     *
     * @type {object}
     * @property {string} type `"monomode"`
     *
     * @property {InputChannel} target The object that triggered the event (the `InputChannel`
     * object).
     * @property {Message} message A `Message` object containing information about the incoming
     * MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     *
     * @property {boolean} value The value is `true` for omni mode on and false for omni mode off.
     */
    if (event.type === "monomodeon") {
      event.type = "monomode";
      event.value = true;
    } else if (event.type === "polymodeon") {
      event.type = "monomode";
      event.value = false;
    }

    this.emit(event.type, event);

  }

  /**
   * Parses inbound events to identify RPN/NRPN sequences.
   * @param e Event
   * @private
   */
  _parseEventForParameterNumber(event) {

    // To make it more legible
    const controller = event.message.dataBytes[0];
    const value = event.message.dataBytes[1];
    const list = Enumerations.MIDI_CONTROL_CHANGE_MESSAGES;

    // A. Check if the message is the start of an RPN (101) or NRPN (99) parameter declaration.
    if (
      controller === list.nonregisteredparameterfine ||         // 99
      controller === list.registeredparameterfine               // 101
    ) {

      this._nrpnBuffer = [];
      this._rpnBuffer = [];

      if (controller === list.nonregisteredparameterfine) {     // 99
        this._nrpnBuffer = [event.message];
      } else {                                                  // 101
        // 127 is a reset so we ignore it
        if (value !== 127) this._rpnBuffer = [event.message];
      }

    // B. Check if the message is the end of an RPN (100) or NRPN (98) parameter declaration.
    } else if (
      controller === list.nonregisteredparametercoarse ||       // 98
      controller === list.registeredparametercoarse             // 100
    ) {

      if (controller === list.nonregisteredparametercoarse) {   // 98

        // Flush the other buffer (they are mutually exclusive)
        this._rpnBuffer = [];

        // Check if we are in sequence
        if (this._nrpnBuffer.length === 1) {
          this._nrpnBuffer.push(event.message);
        } else {
          this._nrpnBuffer = []; // out of sequence
        }

      } else {                                                  // 100

        // Flush the other buffer (they are mutually exclusive)
        this._nrpnBuffer = [];

        // 127 is a reset so we ignore it
        if (this._rpnBuffer.length === 1 && value !== 127) {
          this._rpnBuffer.push(event.message);
        } else {
          this._rpnBuffer = []; // out of sequence or reset
        }

      }

    // C. Check if the message is for data entry (6, 38, 96 or 97). Those messages trigger events.
    } else if (
      controller === list.dataentrycoarse ||                    // 6
      controller === list.dataentryfine ||                      // 38
      controller === list.databuttonincrement ||                // 96
      controller === list.databuttondecrement                   // 97
    ) {

      if (this._rpnBuffer.length === 2) {
        this._dispatchParameterNumberEvent(
          "rpn",
          this._rpnBuffer[0].dataBytes[1],
          this._rpnBuffer[1].dataBytes[1],
          event
        );
      } else if (this._nrpnBuffer.length === 2) {
        this._dispatchParameterNumberEvent(
          "nrpn",
          this._nrpnBuffer[0].dataBytes[1],
          this._nrpnBuffer[1].dataBytes[1],
          event
        );
      } else {
        this._nrpnBuffer = [];
        this._rpnBuffer = [];
      }

    }

  }

  /**
   * Indicates whether the specified controller can be part of an RPN or NRPN sequence
   * @param controller
   * @returns {boolean}
   * @private
   */
  _isRpnOrNrpnController(controller) {

    return controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.dataentrycoarse ||        //   6
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.dataentryfine ||               //  38
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.databuttonincrement ||         //  96
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.databuttondecrement ||         //  97
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.nonregisteredparametercoarse ||//  98
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.nonregisteredparameterfine ||  //  99
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.registeredparametercoarse ||   // 100
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.registeredparameterfine;       // 101

  }

  _dispatchParameterNumberEvent(type, paramMsb, paramLsb, e) {

    type = type === "nrpn" ? "nrpn" : "rpn";

    /**
     * Event emitted when an **RPN data entry coarse** message is received on the input. The
     * specific parameter to which the message applies can be found in the event's `parameter`
     * property. It is one of the ones defined in
     * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
     *
     * @event InputChannel#rpn-dataentrycoarse
     *
     * @type {object}
     *
     * @property {string} type `rpn-dataentrycoarse`
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **RPN data entry fine** message is received on the input. The
     * specific parameter to which the message applies can be found in the event's `parameter`
     * property. It is one of the ones defined in
     * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
     *
     * @event InputChannel#rpn-dataentryfine
     *
     * @type {object}
     *
     * @property {string} type `rpn-dataentryfine`
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **RPN data button increment** message is received on the input. The
     * specific parameter to which the message applies can be found in the event's `parameter`
     * property. It is one of the ones defined in
     * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
     *
     * @event InputChannel#rpn-databuttonincrement
     *
     * @type {object}
     *
     * @property {string} type `rpn-databuttonincrement`
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **RPN data button decrement** message is received on the input. The
     * specific parameter to which the message applies can be found in the event's `parameter`
     * property. It is one of the ones defined in
     * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
     *
     * @event InputChannel#rpn-databuttondecrement
     *
     * @type {object}
     *
     * @property {string} type `rpn-databuttondecrement`
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **NRPN data entry coarse** message is received on the input. The
     * specific parameter to which the message applies can be found in the event's `parameter`
     * property. It is one of the ones defined in
     * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
     *
     * @event InputChannel#nrpn-dataentrycoarse
     *
     * @type {object}
     *
     * @property {string} type `nrpn-dataentrycoarse`
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **NRPN data entry fine** message is received on the input. The
     * specific parameter to which the message applies can be found in the event's `parameter`
     * property. It is one of the ones defined in
     * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
     *
     * @event InputChannel#nrpn-dataentryfine
     *
     * @type {object}
     *
     * @property {string} type `nrpn-dataentryfine`
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **NRPN data button increment** message is received on the input. The
     * specific parameter to which the message applies can be found in the event's `parameter`
     * property. It is one of the ones defined in
     * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
     *
     * @event InputChannel#nrpn-databuttonincrement
     *
     * @type {object}
     *
     * @property {string} type `nrpn-databuttonincrement`
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **NRPN data button decrement** message is received on the input. The
     * specific parameter to which the message applies can be found in the event's `parameter`
     * property. It is one of the ones defined in
     * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
     *
     * @event InputChannel#nrpn-databuttondecrement
     *
     * @type {object}
     *
     * @property {string} type `nrpn-databuttondecrement`
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    const event = {
      target: e.target,
      timestamp: e.timestamp,
      parameterMsb: paramMsb,
      parameterLsb: paramLsb,
      value: Utilities.from7bitToFloat(e.message.dataBytes[1]),
      rawValue: e.message.dataBytes[1],
    };

    // Identify the parameter (by name for RPN and by number for NRPN)
    if (type === "rpn") {

      event.parameter = Object.keys(Enumerations.MIDI_REGISTERED_PARAMETERS).find(key => {
        return Enumerations.MIDI_REGISTERED_PARAMETERS[key][0] === paramMsb &&
          Enumerations.MIDI_REGISTERED_PARAMETERS[key][1] === paramLsb;
      });

    } else {
      event.parameter = (paramMsb << 7) + paramLsb;
    }

    // Type and subtype
    const subtype = Utilities.getPropertyByValue(
      Enumerations.MIDI_CONTROL_CHANGE_MESSAGES,
      e.message.dataBytes[0]
    );

    // Emit specific event
    event.type = `${type}-${subtype}`;
    this.emit(event.type, event);


    /**
     * Event emitted when any NRPN message is received on the input. There are four types of NRPN
     * messages:
     *
     *   * data entry coarse
     *   * data entry fine
     *   * data button increment
     *   * data button decrement
     *
     * The parameter to which the message applies can be found in the event's `parameter` property.
     *
     * @event InputChannel#nrpn
     *
     * @type {object}
     *
     * @property {string} type `"nrpn"`
     * @property {string} subtype The precise type of NRPN message that was received.
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {number} parameter The non-registered parameter number (0-16383)
     * @property {number} parameterMsb The MSB portion of the non-registered parameter number
     * (0-127)
     * @property {number} parameterLsb: The LSB portion of the non-registered parameter number
     * (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when any RPN message is received on the input. There are four types of RPN
     * messages:
     *
     *   * data entry coarse
     *   * data entry fine
     *   * data button increment
     *   * data button decrement
     *
     * The parameter to which the message applies can be found in the event's `parameter` property.
     * It is one of the ones defined in
     * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
     *
     * @event InputChannel#rpn
     *
     * @type {object}
     *
     * @property {string} type `"rpn"`
     * @property {string} subtype The precise type of RPN message that was received.
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    // Emit general event
    event.type = type;
    event.subtype = subtype;
    this.emit(event.type, event);

  }

  /**
   * @deprecated since version 3.
   * @private
   */
  getChannelModeByNumber(number) {

    if (WebMidi.validation) {
      console.warn(
        "The 'getChannelModeByNumber()' method has been moved to the 'Utilities' class."
      );
      number = Math.floor(number);
    }

    return Utilities.getChannelModeByNumber(number);

  }

  /**
   * @deprecated since version 3.
   * @private
   */
  getCcNameByNumber(number) {

    if (WebMidi.validation) {
      console.warn(
        "The 'getCcNameByNumber()' method has been moved to the 'Utilities' class."
      );
      number = parseInt(number);
      if ( !(number >= 0 && number <= 127) ) throw new RangeError("Invalid control change number.");
    }

    return Utilities.getCcNameByNumber(number);

  }

  /**
   * Return the playing status of the specified note. The `note` parameter can be an unsigned
   * integer (0-127), a note identifier (`"C4"`, `"G#5"`, etc.) or a {@link Note} object.
   *
   * If a note identifier or Note object is passed in, the method will take into account any
   * `octaveOffset` defined.
   *
   * @param [input] {number|string|Note}
   * @returns {boolean}
   * @since version 3.0.0
   */
  getNoteState(note) {

    // If it's a note object, we simply use the identifier
    if (note instanceof Note) note = note.identifier;

    const number = Utilities.guessNoteNumber(
      note,
      WebMidi.octaveOffset + this.input.octaveOffset + this.octaveOffset
    );

    return this.notesState[number];

  }

  /**
   * An integer to offset the reported octave of incoming note-specific messages (`noteon`,
   * `noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
   * octave (C4).
   *
   * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
   * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
   *
   * Note that this value is combined with the global offset value defined on the `WebMidi` object
   * and with the value defined on the parent `Input` object.
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
   * The [`Input`](Input) this channel belongs to
   * @type {Input}
   * @since 3.0
   */
  get input() {
    return this._input;
  }

  /**
   * This channel's MIDI number (1-16)
   * @type {number}
   * @since 3.0
   */
  get number() {
    return this._number;
  }

  /**
   * Whether RPN/NRPN events are parsed and dispatched.
   * @type {boolean}
   * @since 3.0
   * @deprecated Use parameterNumberEventsEnabled instead.
   * @private
   */
  get nrpnEventsEnabled() {
    return this.parameterNumberEventsEnabled;
  }
  set nrpnEventsEnabled(value) {

    if (this.validation) {
      value = !!value;
    }

    this.parameterNumberEventsEnabled = value;

  }

  /**
   * Array of channel-specific event names that can be listened to.
   * @type {string[]}
   * @readonly
   */
  static get EVENTS() {

    return [

      // MIDI channel message events
      "noteoff",
      "controlchange",
      "noteon",
      "keyaftertouch",
      "programchange",
      "channelaftertouch",
      "pitchbend",

      // MIDI channel mode events
      "allnotesoff",
      "allsoundoff",
      "localcontrol",
      "monomode",
      "omnimode",
      "resetallcontrollers",

      // RPN/NRPN events
      "nrpn",
      "rpn"

    ];
  }

}
