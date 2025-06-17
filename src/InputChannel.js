import {EventEmitter} from "../node_modules/djipevents/src/djipevents.js";
import {WebMidi} from "./WebMidi.js";
import {Utilities} from "./Utilities.js";
import {Note} from "./Note.js";
import {Enumerations} from "./Enumerations.js";

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
 * @fires InputChannel#channelaftertouch
 * @fires InputChannel#pitchbend
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
 * @fires InputChannel#event:nrpn-dataincrement
 * @fires InputChannel#event:nrpn-datadecrement
 * @fires InputChannel#event:rpn
 * @fires InputChannel#event:rpn-dataentrycoarse
 * @fires InputChannel#event:rpn-dataentryfine
 * @fires InputChannel#event:rpn-dataincrement
 * @fires InputChannel#event:rpn-datadecrement
 *
 * @fires InputChannel#controlchange
 * @fires InputChannel#event:controlchange-controllerxxx
 * @fires InputChannel#event:controlchange-bankselectcoarse
 * @fires InputChannel#event:controlchange-modulationwheelcoarse
 * @fires InputChannel#event:controlchange-breathcontrollercoarse
 * @fires InputChannel#event:controlchange-footcontrollercoarse
 * @fires InputChannel#event:controlchange-portamentotimecoarse
 * @fires InputChannel#event:controlchange-dataentrycoarse
 * @fires InputChannel#event:controlchange-volumecoarse
 * @fires InputChannel#event:controlchange-balancecoarse
 * @fires InputChannel#event:controlchange-pancoarse
 * @fires InputChannel#event:controlchange-expressioncoarse
 * @fires InputChannel#event:controlchange-effectcontrol1coarse
 * @fires InputChannel#event:controlchange-effectcontrol2coarse
 * @fires InputChannel#event:controlchange-generalpurposecontroller1
 * @fires InputChannel#event:controlchange-generalpurposecontroller2
 * @fires InputChannel#event:controlchange-generalpurposecontroller3
 * @fires InputChannel#event:controlchange-generalpurposecontroller4
 * @fires InputChannel#event:controlchange-bankselectfine
 * @fires InputChannel#event:controlchange-modulationwheelfine
 * @fires InputChannel#event:controlchange-breathcontrollerfine
 * @fires InputChannel#event:controlchange-footcontrollerfine
 * @fires InputChannel#event:controlchange-portamentotimefine
 * @fires InputChannel#event:controlchange-dataentryfine
 * @fires InputChannel#event:controlchange-channelvolumefine
 * @fires InputChannel#event:controlchange-balancefine
 * @fires InputChannel#event:controlchange-panfine
 * @fires InputChannel#event:controlchange-expressionfine
 * @fires InputChannel#event:controlchange-effectcontrol1fine
 * @fires InputChannel#event:controlchange-effectcontrol2fine
 * @fires InputChannel#event:controlchange-damperpedal
 * @fires InputChannel#event:controlchange-portamento
 * @fires InputChannel#event:controlchange-sostenuto
 * @fires InputChannel#event:controlchange-softpedal
 * @fires InputChannel#event:controlchange-legatopedal
 * @fires InputChannel#event:controlchange-hold2
 * @fires InputChannel#event:controlchange-soundvariation
 * @fires InputChannel#event:controlchange-resonance
 * @fires InputChannel#event:controlchange-releasetime
 * @fires InputChannel#event:controlchange-attacktime
 * @fires InputChannel#event:controlchange-brightness
 * @fires InputChannel#event:controlchange-decaytime
 * @fires InputChannel#event:controlchange-vibratorate
 * @fires InputChannel#event:controlchange-vibratodepth
 * @fires InputChannel#event:controlchange-vibratodelay
 * @fires InputChannel#event:controlchange-generalpurposecontroller5
 * @fires InputChannel#event:controlchange-generalpurposecontroller6
 * @fires InputChannel#event:controlchange-generalpurposecontroller7
 * @fires InputChannel#event:controlchange-generalpurposecontroller8
 * @fires InputChannel#event:controlchange-portamentocontrol
 * @fires InputChannel#event:controlchange-highresolutionvelocityprefix
 * @fires InputChannel#event:controlchange-effect1depth
 * @fires InputChannel#event:controlchange-effect2depth
 * @fires InputChannel#event:controlchange-effect3depth
 * @fires InputChannel#event:controlchange-effect4depth
 * @fires InputChannel#event:controlchange-effect5depth
 * @fires InputChannel#event:controlchange-dataincrement
 * @fires InputChannel#event:controlchange-datadecrement
 * @fires InputChannel#event:controlchange-nonregisteredparameterfine
 * @fires InputChannel#event:controlchange-nonregisteredparametercoarse
 * @fires InputChannel#event:controlchange-registeredparameterfine
 * @fires InputChannel#event:controlchange-registeredparametercoarse
 * @fires InputChannel#event:controlchange-allsoundoff
 * @fires InputChannel#event:controlchange-resetallcontrollers
 * @fires InputChannel#event:controlchange-localcontrol
 * @fires InputChannel#event:controlchange-allnotesoff
 * @fires InputChannel#event:controlchange-omnimodeoff
 * @fires InputChannel#event:controlchange-omnimodeon
 * @fires InputChannel#event:controlchange-monomodeon
 * @fires InputChannel#event:controlchange-polymodeon
 * @fires InputChannel#event:
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
    this.parameterNumberEventsEnabled = true;

    /**
     * Contains the current playing state of all MIDI notes of this channel (0-127). The state is
     * `true` for a currently playing note and `false` otherwise.
     * @type {boolean[]}
     */
    this.notesState = new Array(128).fill(false);

  }

  /**
   * Destroys the `InputChannel` by removing all listeners and severing the link with the MIDI
   * subsystem's input.
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
    event.port = this.input;
    event.target = this;
    event.type = "midimessage";

    /**
     * Event emitted when a MIDI message of any kind is received by an `InputChannel`
     *
     * @event InputChannel#midimessage
     *
     * @type {object}
     *
     * @property {string} type `midimessage`
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
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
    event.type = event.message.type || "unknownmessage";

    const data1 = e.message.dataBytes[0];
    const data2 = e.message.dataBytes[1];

    if ( event.type === "noteoff" || (event.type === "noteon" && data2 === 0) ) {

      this.notesState[data1] = false;
      event.type = "noteoff"; // necessary for note on with 0 velocity

      /**
       * Event emitted when a **note off** MIDI message has been received on the channel.
       *
       * @event InputChannel#noteoff
       *
       * @type {object}
       * @property {string} type `noteoff`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
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
       * @property {string} type `noteon`
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} note A [`Note`](Note) object containing information such as note name,
       * octave and release velocity.
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
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} note A [`Note`](Note) object containing information such as note name
       * and number.
       * @property {number} value The aftertouch amount expressed as a float between 0 and 1.
       * @property {number} rawValue The aftertouch amount expressed as an integer (between 0 and
       * 127).
       */
      event.note = new Note(
        Utilities.offsetNumber(
          data1, this.octaveOffset + this.input.octaveOffset + WebMidi.octaveOffset
        )
      );

      // Aftertouch value
      event.value = Utilities.from7bitToFloat(data2);
      event.rawValue = data2;

      // @deprecated
      event.identifier = event.note.identifier;
      event.key = event.note.number;
      event.rawKey = data1;

    } else if (event.type === "controlchange") {

      /**
       * Event emitted when a **control change** MIDI message has been received.
       *
       * @event InputChannel#controlchange
       *
       * @type {object}
       * @property {string} type `controlchange`
       * @property {string} subtype The type of control change message that was received.
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */
      event.controller = {
        number: data1,
        name: Enumerations.CONTROL_CHANGE_MESSAGES[data1].name,
        description: Enumerations.CONTROL_CHANGE_MESSAGES[data1].description,
        position: Enumerations.CONTROL_CHANGE_MESSAGES[data1].position,
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
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */
      const numberedEvent = Object.assign({}, event);
      numberedEvent.type = `${event.type}-controller${data1}`;
      delete numberedEvent.subtype;
      this.emit(numberedEvent.type, numberedEvent);

      /**
       * Event emitted when a **controlchange-bankselectcoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-bankselectcoarse
       *
       * @type {object}
       * @property {string} type `controlchange-bankselectcoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-modulationwheelcoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-modulationwheelcoarse
       *
       * @type {object}
       * @property {string} type `controlchange-modulationwheelcoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-breathcontrollercoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-breathcontrollercoarse
       *
       * @type {object}
       * @property {string} type `controlchange-breathcontrollercoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-footcontrollercoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-footcontrollercoarse
       *
       * @type {object}
       * @property {string} type `controlchange-footcontrollercoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-portamentotimecoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-portamentotimecoarse
       *
       * @type {object}
       * @property {string} type `controlchange-portamentotimecoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-dataentrycoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-dataentrycoarse
       *
       * @type {object}
       * @property {string} type `controlchange-dataentrycoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-volumecoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-volumecoarse
       *
       * @type {object}
       * @property {string} type `controlchange-volumecoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-balancecoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-balancecoarse
       *
       * @type {object}
       * @property {string} type `controlchange-balancecoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-pancoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-pancoarse
       *
       * @type {object}
       * @property {string} type `controlchange-pancoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-expressioncoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-expressioncoarse
       *
       * @type {object}
       * @property {string} type `controlchange-expressioncoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-effectcontrol1coarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-effectcontrol1coarse
       *
       * @type {object}
       * @property {string} type `controlchange-effectcontrol1coarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-effectcontrol2coarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-effectcontrol2coarse
       *
       * @type {object}
       * @property {string} type `controlchange-effectcontrol2coarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-generalpurposecontroller1** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-generalpurposecontroller1
       *
       * @type {object}
       * @property {string} type `controlchange-generalpurposecontroller1`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-generalpurposecontroller2** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-generalpurposecontroller2
       *
       * @type {object}
       * @property {string} type `controlchange-generalpurposecontroller2`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-generalpurposecontroller3** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-generalpurposecontroller3
       *
       * @type {object}
       * @property {string} type `controlchange-generalpurposecontroller3`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-generalpurposecontroller4** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-generalpurposecontroller4
       *
       * @type {object}
       * @property {string} type `controlchange-generalpurposecontroller4`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-bankselectfine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-bankselectfine
       *
       * @type {object}
       * @property {string} type `controlchange-bankselectfine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-modulationwheelfine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-modulationwheelfine
       *
       * @type {object}
       * @property {string} type `controlchange-modulationwheelfine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-breathcontrollerfine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-breathcontrollerfine
       *
       * @type {object}
       * @property {string} type `controlchange-breathcontrollerfine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-footcontrollerfine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-footcontrollerfine
       *
       * @type {object}
       * @property {string} type `controlchange-footcontrollerfine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-portamentotimefine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-portamentotimefine
       *
       * @type {object}
       * @property {string} type `controlchange-portamentotimefine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-dataentryfine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-dataentryfine
       *
       * @type {object}
       * @property {string} type `controlchange-dataentryfine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-channelvolumefine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-channelvolumefine
       *
       * @type {object}
       * @property {string} type `controlchange-channelvolumefine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-balancefine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-balancefine
       *
       * @type {object}
       * @property {string} type `controlchange-balancefine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-panfine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-panfine
       *
       * @type {object}
       * @property {string} type `controlchange-panfine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-expressionfine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-expressionfine
       *
       * @type {object}
       * @property {string} type `controlchange-expressionfine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-effectcontrol1fine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-effectcontrol1fine
       *
       * @type {object}
       * @property {string} type `controlchange-effectcontrol1fine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-effectcontrol2fine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-effectcontrol2fine
       *
       * @type {object}
       * @property {string} type `controlchange-effectcontrol2fine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-damperpedal** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-damperpedal
       *
       * @type {object}
       * @property {string} type `controlchange-damperpedal`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-portamento** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-portamento
       *
       * @type {object}
       * @property {string} type `controlchange-portamento`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-sostenuto** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-sostenuto
       *
       * @type {object}
       * @property {string} type `controlchange-sostenuto`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-softpedal** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-softpedal
       *
       * @type {object}
       * @property {string} type `controlchange-softpedal`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-legatopedal** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-legatopedal
       *
       * @type {object}
       * @property {string} type `controlchange-legatopedal`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-hold2** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-hold2
       *
       * @type {object}
       * @property {string} type `controlchange-hold2`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-soundvariation** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-soundvariation
       *
       * @type {object}
       * @property {string} type `controlchange-soundvariation`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-resonance** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-resonance
       *
       * @type {object}
       * @property {string} type `controlchange-resonance`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-releasetime** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-releasetime
       *
       * @type {object}
       * @property {string} type `controlchange-releasetime`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-attacktime** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-attacktime
       *
       * @type {object}
       * @property {string} type `controlchange-attacktime`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-brightness** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-brightness
       *
       * @type {object}
       * @property {string} type `controlchange-brightness`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-decaytime** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-decaytime
       *
       * @type {object}
       * @property {string} type `controlchange-decaytime`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-vibratorate** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-vibratorate
       *
       * @type {object}
       * @property {string} type `controlchange-vibratorate`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-vibratodepth** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-vibratodepth
       *
       * @type {object}
       * @property {string} type `controlchange-vibratodepth`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-vibratodelay** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-vibratodelay
       *
       * @type {object}
       * @property {string} type `controlchange-vibratodelay`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-generalpurposecontroller5** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-generalpurposecontroller5
       *
       * @type {object}
       * @property {string} type `controlchange-generalpurposecontroller5`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-generalpurposecontroller6** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-generalpurposecontroller6
       *
       * @type {object}
       * @property {string} type `controlchange-generalpurposecontroller6`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-generalpurposecontroller7** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-generalpurposecontroller7
       *
       * @type {object}
       * @property {string} type `controlchange-generalpurposecontroller7`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-generalpurposecontroller8** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-generalpurposecontroller8
       *
       * @type {object}
       * @property {string} type `controlchange-generalpurposecontroller8`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-portamentocontrol** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-portamentocontrol
       *
       * @type {object}
       * @property {string} type `controlchange-portamentocontrol`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-highresolutionvelocityprefix** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-highresolutionvelocityprefix
       *
       * @type {object}
       * @property {string} type `controlchange-highresolutionvelocityprefix`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-effect1depth** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-effect1depth
       *
       * @type {object}
       * @property {string} type `controlchange-effect1depth`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-effect2depth** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-effect2depth
       *
       * @type {object}
       * @property {string} type `controlchange-effect2depth`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-effect3depth** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-effect3depth
       *
       * @type {object}
       * @property {string} type `controlchange-effect3depth`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-effect4depth** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-effect4depth
       *
       * @type {object}
       * @property {string} type `controlchange-effect4depth`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-effect5depth** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-effect5depth
       *
       * @type {object}
       * @property {string} type `controlchange-effect5depth`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-dataincrement** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-dataincrement
       *
       * @type {object}
       * @property {string} type `controlchange-dataincrement`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-datadecrement** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-datadecrement
       *
       * @type {object}
       * @property {string} type `controlchange-datadecrement`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-nonregisteredparameterfine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-nonregisteredparameterfine
       *
       * @type {object}
       * @property {string} type `controlchange-nonregisteredparameterfine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-nonregisteredparametercoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-nonregisteredparametercoarse
       *
       * @type {object}
       * @property {string} type `controlchange-nonregisteredparametercoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-registeredparameterfine** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-registeredparameterfine
       *
       * @type {object}
       * @property {string} type `controlchange-registeredparameterfine`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-registeredparametercoarse** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-registeredparametercoarse
       *
       * @type {object}
       * @property {string} type `controlchange-registeredparametercoarse`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-allsoundoff** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-allsoundoff
       *
       * @type {object}
       * @property {string} type `controlchange-allsoundoff`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-resetallcontrollers** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-resetallcontrollers
       *
       * @type {object}
       * @property {string} type `controlchange-resetallcontrollers`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-localcontrol** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-localcontrol
       *
       * @type {object}
       * @property {string} type `controlchange-localcontrol`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-allnotesoff** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-allnotesoff
       *
       * @type {object}
       * @property {string} type `controlchange-allnotesoff`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-omnimodeoff** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-omnimodeoff
       *
       * @type {object}
       * @property {string} type `controlchange-omnimodeoff`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-omnimodeon** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-omnimodeon
       *
       * @type {object}
       * @property {string} type `controlchange-omnimodeon`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-monomodeon** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-monomodeon
       *
       * @type {object}
       * @property {string} type `controlchange-monomodeon`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      /**
       * Event emitted when a **controlchange-polymodeon** MIDI message has been
       * received.
       *
       * @event InputChannel#controlchange-polymodeon
       *
       * @type {object}
       * @property {string} type `controlchange-polymodeon`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {object} controller
       * @property {object} controller.number The number of the controller.
       * @property {object} controller.name The usual name or function of the controller.
       * @property {object} controller.description A user-friendly representation of the
       * controller's default function
       * @property {string} controller.position Whether the controller is meant to be an `msb` or `lsb`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */

      const namedEvent = Object.assign({}, event);
      namedEvent.type = `${event.type}-` + Enumerations.CONTROL_CHANGE_MESSAGES[data1].name;
      delete namedEvent.subtype;

      // Dispatch controlchange-"function" events only if the "function" is defined (not the generic
      // controllerXXX nomenclature)
      if (namedEvent.type.indexOf("controller") !== 0) {
        this.emit(namedEvent.type, namedEvent);
      }

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
       * @property {string} type `programchange`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {number} value The value expressed as an integer between 0 and 127.
       * @property {number} rawValue  The raw MIDI value expressed as an integer between 0 and 127.
       */
      event.value = data1;
      event.rawValue = event.value;

    } else if (event.type === "channelaftertouch") {

      /**
       * Event emitted when a control change MIDI message has been received.
       *
       * @event InputChannel#channelaftertouch
       *
       * @type {object}
       * @property {string} type `channelaftertouch`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The raw MIDI value expressed as an integer between 0 and 127.
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
       * @property {string} type `pitchbend`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The raw MIDI value expressed as an integer (between 0 and
       * 16383).
       */
      event.value = ((data2 << 7) + data1 - 8192) / 8192;
      event.rawValue = (data2 << 7) + data1;

    } else {
      event.type = "unknownmessage";
    }

    this.emit(event.type, event);

  }

  /**
   * @param e {Object}
   * @private
   */
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
     * @property {string} type `allsoundoff`
     *
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     */

    /**
     * Event emitted when a "reset all controllers" channel-mode MIDI message has been received.
     *
     * @event InputChannel#resetallcontrollers
     *
     * @type {object}
     *
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
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
     * @property {string} type `localcontrol`
     *
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     *
     * @property {boolean} value For local control on, the value is `true`. For local control off,
     * the value is `false`.
     * @property {boolean} rawValue For local control on, the value is `127`. For local control off,
     * the value is `0`.
     */
    if (event.type === "localcontrol") {
      event.value = event.message.data[2] === 127 ? true : false;
      event.rawValue = event.message.data[2];
    }

    /**
     * Event emitted when an "all notes off" channel-mode MIDI message has been received.
     *
     * @event InputChannel#allnotesoff
     *
     * @type {object}
     * @property {string} type `allnotesoff`
     *
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
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
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     *
     * @property {boolean} value The value is `true` for omni mode on and false for omni mode off.
     * @property {boolean} rawValue The raw MIDI value
     */
    if (event.type === "omnimodeon") {
      event.type = "omnimode";
      event.value = true;
      event.rawValue = event.message.data[2];
    } else if (event.type === "omnimodeoff") {
      event.type = "omnimode";
      event.value = false;
      event.rawValue = event.message.data[2];
    }


    /**
     * Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
     * the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
     * poly mode on).
     *
     * @event InputChannel#monomode
     *
     * @type {object}
     * @property {string} type `monomode`
     *
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     *
     * @property {boolean} value The value is `true` for omni mode on and false for omni mode off.
     * @property {boolean} rawValue The raw MIDI value
     */
    if (event.type === "monomodeon") {
      event.type = "monomode";
      event.value = true;
      event.rawValue = event.message.data[2];
    } else if (event.type === "polymodeon") {
      event.type = "monomode";
      event.value = false;
      event.rawValue = event.message.data[2];
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

    // A. Check if the message is the start of an RPN (101) or NRPN (99) parameter declaration.
    if (controller === 99 || controller === 101) {

      this._nrpnBuffer = [];
      this._rpnBuffer = [];

      if (controller === 99) {                          // 99
        this._nrpnBuffer = [event.message];
      } else {                                          // 101
        // 127 is a reset so we ignore it
        if (value !== 127) this._rpnBuffer = [event.message];
      }

    // B. Check if the message is the end of an RPN (100) or NRPN (98) parameter declaration.
    } else if (controller === 98 || controller === 100) {

      if (controller === 98) {                          // 98

        // Flush the other buffer (they are mutually exclusive)
        this._rpnBuffer = [];

        // Check if we are in sequence
        if (this._nrpnBuffer.length === 1) {
          this._nrpnBuffer.push(event.message);
        } else {
          this._nrpnBuffer = []; // out of sequence
        }

      } else {                                          // 100

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
      controller === 6 ||
      controller === 38 ||
      controller === 96 ||
      controller === 97
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

    return controller === 6 ||
      controller === 38 ||
      controller === 96 ||
      controller === 97 ||
      controller === 98 ||
      controller === 99 ||
      controller === 100 ||
      controller === 101;

  }

  /**
   * @private
   */
  _dispatchParameterNumberEvent(type, paramMsb, paramLsb, e) {

    type = type === "nrpn" ? "nrpn" : "rpn";

    /**
     * Event emitted when an **RPN data entry coarse** message is received on the input. The
     * specific parameter to which the message applies can be found in the event's `parameter`
     * property. It is one of the ones defined in
     * [`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).
     *
     * @event InputChannel#rpn-dataentrycoarse
     *
     * @type {object}
     *
     * @property {string} type `rpn-dataentrycoarse`
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
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
     * [`EnumerationsREGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).
     *
     * @event InputChannel#rpn-dataentryfine
     *
     * @type {object}
     *
     * @property {string} type `rpn-dataentryfine`
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **RPN data increment** message is received on the input. The specific
     * parameter to which the message applies can be found in the event's `parameter` property. It
     * is one of the ones defined in
     * [`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).
     *
     * @event InputChannel#rpn-dataincrement
     *
     * @type {object}
     *
     * @property {string} type `rpn-dataincrement`
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **RPN data decrement** message is received on the input. The specific
     * parameter to which the message applies can be found in the event's `parameter` property. It
     * is one of the ones defined in
     * [`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).
     *
     * @event InputChannel#rpn-datadecrement
     *
     * @type {object}
     *
     * @property {string} type `rpn-datadecrement`
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
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
     * [`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).
     *
     * @event InputChannel#nrpn-dataentrycoarse
     *
     * @type {object}
     *
     * @property {string} type `nrpn-dataentrycoarse`
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
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
     * [`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).
     *
     * @event InputChannel#nrpn-dataentryfine
     *
     * @type {object}
     *
     * @property {string} type `nrpn-dataentryfine`
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **NRPN data increment** message is received on the input. The specific
     * parameter to which the message applies can be found in the event's `parameter` property. It
     * is one of the ones defined in
     * [`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).
     *
     * @event InputChannel#nrpn-dataincrement
     *
     * @type {object}
     *
     * @property {string} type `nrpn-dataincrement`
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when an **NRPN data decrement** message is received on the input. The specific
     * parameter to which the message applies can be found in the event's `parameter` property. It
     * is one of the ones defined in
     * [`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).
     *
     * @event InputChannel#nrpn-datadecrement
     *
     * @type {object}
     *
     * @property {string} type `nrpn-datadecrement`
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {string} parameter The registered parameter's name
     * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
     * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    const event = {
      target: e.target,
      timestamp: e.timestamp,
      message: e.message,
      parameterMsb: paramMsb,
      parameterLsb: paramLsb,
      value: Utilities.from7bitToFloat(e.message.dataBytes[1]),
      rawValue: e.message.dataBytes[1],
    };

    // Identify the parameter (by name for RPN and by number for NRPN)
    if (type === "rpn") {

      event.parameter = Object.keys(Enumerations.REGISTERED_PARAMETERS).find(key => {
        return Enumerations.REGISTERED_PARAMETERS[key][0] === paramMsb &&
          Enumerations.REGISTERED_PARAMETERS[key][1] === paramLsb;
      });

    } else {
      event.parameter = (paramMsb << 7) + paramLsb;
    }

    // Type and subtype
    const subtype = Enumerations.CONTROL_CHANGE_MESSAGES[e.message.dataBytes[0]].name;

    // Emit specific event
    event.type = `${type}-${subtype}`;
    this.emit(event.type, event);

    // Begin Legacy Block (remove in v4)
    const legacyEvent = Object.assign({}, event);
    if (legacyEvent.type === "nrpn-dataincrement") {
      legacyEvent.type = "nrpn-databuttonincrement";
    } else if (legacyEvent.type === "nrpn-datadecrement") {
      legacyEvent.type = "nrpn-databuttondecrement";
    } else if (legacyEvent.type === "rpn-dataincrement") {
      legacyEvent.type = "rpn-databuttonincrement";
    } else if (legacyEvent.type === "rpn-datadecrement") {
      legacyEvent.type = "rpn-databuttondecrement";
    }
    this.emit(legacyEvent.type, legacyEvent);
    // End Legacy Block

    /**
     * Event emitted when any NRPN message is received on the input. There are four subtypes of NRPN
     * messages:
     *
     *   * `nrpn-dataentrycoarse`
     *   * `nrpn-dataentryfine`
     *   * `nrpn-dataincrement`
     *   * `nrpn-datadecrement`
     *
     * The parameter to which the message applies can be found in the event's `parameter` property.
     *
     * @event InputChannel#nrpn
     *
     * @type {object}
     *
     * @property {string} type `nrpn`
     * @property {string} subtype The precise type of NRPN message that was received.
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
     * @property {number} parameter The non-registered parameter number (0-16383)
     * @property {number} parameterMsb The MSB portion of the non-registered parameter number
     * (0-127)
     * @property {number} parameterLsb: The LSB portion of the non-registered parameter number
     * (0-127)
     * @property {number} value The received value as a normalized number between 0 and 1.
     * @property {number} rawValue The value as received (0-127)
     */

    /**
     * Event emitted when any RPN message is received on the input. There are four subtypes of RPN
     * messages:
     *
     *   * `rpn-dataentrycoarse`
     *   * `rpn-dataentryfine`
     *   * `rpn-dataincrement`
     *   * `rpn-datadecrement`
     *
     * The parameter to which the message applies can be found in the event's `parameter` property.
     * It is one of the ones defined in
     * [`Enumerations.REGISTERED_PARAMETERS`](Enumerations#REGISTERED_PARAMETERS).
     *
     * @event InputChannel#rpn
     *
     * @type {object}
     *
     * @property {string} type `rpn`
     * @property {string} subtype The precise type of RPN message that was received.
     * @property {InputChannel} target The object that dispatched the event.
     * @property {Input} port The `Input` that triggered the event.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {Message} message A [`Message`](Message) object containing information about the
     * incoming MIDI message.
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
   * Note that this value is combined with the global offset value defined by
   * [`WebMidi.octaveOffset`](WebMidi#octaveOffset) object and with the value defined on the parent
   * input object with [`Input.octaveOffset`](Input#octaveOffset).
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
   * The [`Input`](Input) this channel belongs to.
   * @type {Input}
   * @since 3.0
   */
  get input() {
    return this._input;
  }

  /**
   * This channel's MIDI number (1-16).
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

}
