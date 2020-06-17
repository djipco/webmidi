/**
 * WebMidi.js v3.0.0-alpha.2
 * A JavaScript library to kickstart your MIDI projects
 * https://webmidijs.org
 *
 * This build was generated on June 17th 2020.
 *
 *
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015-2020, Jean-Philippe Côté
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

class e{constructor(e=!1){this.eventMap={},this.eventsSuspended=1==e;}addListener(n,r,i={}){if("string"==typeof n&&n.length<1||n instanceof String&&n.length<1||"string"!=typeof n&&!(n instanceof String)&&n!==e.ANY_EVENT)throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");if("function"!=typeof r)throw new TypeError("The callback must be a function.");const s=new t(n,this,r,i);return this.eventMap[n]||(this.eventMap[n]=[]),i.prepend?this.eventMap[n].unshift(s):this.eventMap[n].push(s),s}addOneTimeListener(e,t,n={}){n.remaining=1,this.addListener(e,t,n);}static get ANY_EVENT(){return Symbol.for("Any event")}hasListener(n,r){if(void 0===n)return !!(this.eventMap[e.ANY_EVENT]&&this.eventMap[e.ANY_EVENT].length>0)||Object.entries(this.eventMap).some(([,e])=>e.length>0);if(this.eventMap[n]&&this.eventMap[n].length>0){if(r instanceof t){return this.eventMap[n].filter(e=>e===r).length>0}if("function"==typeof r){return this.eventMap[n].filter(e=>e.callback===r).length>0}return null==r}return !1}get eventNames(){return Object.keys(this.eventMap)}getListeners(e){return this.eventMap[e]||[]}suspendEvent(e){this.getListeners(e).forEach(e=>{e.suspended=!0;});}unsuspendEvent(e){this.getListeners(e).forEach(e=>{e.suspended=!1;});}getListenerCount(e){return this.getListeners(e).length}emit(t,...n){if("string"!=typeof t&&!(t instanceof String))throw new TypeError("The 'event' parameter must be a string.");if(this.eventsSuspended)return;let r=[],i=this.eventMap[e.ANY_EVENT]||[];return this.eventMap[t]&&(i=i.concat(this.eventMap[t])),i.forEach(e=>{if(e.suspended)return;let t=[...n];Array.isArray(e.arguments)&&(t=t.concat(e.arguments)),e.remaining>0&&(r.push(e.callback.apply(e.context,t)),e.count++),--e.remaining<1&&e.remove();}),r}removeListener(e,t,n={}){if(void 0===e)return void(this.eventMap={});if(!this.eventMap[e])return;let r=this.eventMap[e].filter(e=>t&&e.callback!==t||n.remaining&&n.remaining!==e.remaining||n.context&&n.context!==e.context);r.length?this.eventMap[e]=r:delete this.eventMap[e];}async waitFor(e,t={}){return t.duration=parseInt(t.duration),(isNaN(t.duration)||t.duration<=0)&&(t.duration=1/0),new Promise((n,r)=>{let i,s=this.addListener(e,()=>{clearTimeout(i),n();},{remaining:1});t.duration!==1/0&&(i=setTimeout(()=>{s.remove(),r("The duration expired before the event was emitted.");},t.duration));})}get eventCount(){return Object.keys(this.eventMap).length}}class t{constructor(t,n,r,i={}){if("string"!=typeof t&&!(t instanceof String)&&t!==e.ANY_EVENT)throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");if(!n)throw new ReferenceError("The 'target' parameter is mandatory.");if("function"!=typeof r)throw new TypeError("The 'callback' must be a function.");void 0===i.arguments||Array.isArray(i.arguments)||(i.arguments=[i.arguments]),(i=Object.assign({context:n,remaining:1/0,arguments:void 0,duration:1/0},i)).duration!==1/0&&setTimeout(()=>this.remove(),i.duration),this.event=t,this.target=n,this.callback=r,this.context=i.context,this.remaining=parseInt(i.remaining)>=1?parseInt(i.remaining):1/0,this.count=0,this.arguments=i.arguments,this.suspended=!1;}remove(){this.target.removeListener(this.event,this.callback,{context:this.context,remaining:this.remaining});}}

/**
 * The `InputChannel` class represents a single input MIDI channel (1-16) from a single input
 * device. This object is derived from the host's MIDI subsystem and cannot be instantiated
 * directly.
 *
 * All 16 `InputChannel` objects can be found inside the input's [channels]{@link Input#channels}
 * property.
 *
 * The `InputChannel` class extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
 * [removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
 * [hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
 * others. Check out the
 * [documentation for EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) for more
 * details.
 *
 * @param {Input} input The `Input` this channel belongs to
 * @param {number} number The MIDI channel's number (1-16)
 *
 * @fires InputChannel#midimessage
 *
 * @fires InputChannel#noteoff
 * @fires InputChannel#noteon
 * @fires InputChannel#keyaftertouch
 * @fires InputChannel#controlchange
 * @fires InputChannel#channelmode
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
 * @since 3.0.0
 */
class InputChannel extends e {

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

    // /**
    //  * An array of the current NRPNs being constructed for this channel
    //  *
    //  * @private
    //  *
    //  * @type {string[]}
    //  */
    // this._nrpnBuffer = [];
    //
    // // Enable NRPN events by default
    // this.nrpnEventsEnabled = true;

  }

  destroy() {
    this.input = null;
    this.number = null;
    // this._nrpnBuffer = null;
    // this._nrpnEventsEnabled = false;
    this.removeListener();
  }

  /**
   * @param e Event
   * @protected
   */
  _parseEvent(e) {

    // Extract data bytes (unless it's a sysex message)
    let dataBytes = null;
    if (e.data[0] !== wm.MIDI_SYSTEM_MESSAGES.sysex) dataBytes = e.data.slice(1);

    /**
     * Event emitted when a MIDI message of any kind is received by the `InputChannel`.
     *
     * @event InputChannel#midimessage
     * @type {Object}
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {Array} event.data The MIDI message as an array of 8 bit values.
     * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
     * @property {number} event.statusByte The message's status byte.
     * @property {?number[]} event.dataBytes The message's data bytes as an array of 0, 1 or 2
     * integers. This will be null for `sysex` messages.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"midimessage"`
     */
    let midiMessageEvent = {
      target: this,
      data: Array.from(e.data),
      rawData: e.data,
      statusByte: e.data[0],
      dataBytes: dataBytes,
      timestamp: e.timeStamp,
      type: "midimessage"
    };

    this.emit("midimessage", midiMessageEvent);

    // Parse the event to see if its part of an NRPN sequence
    // this._parseEventForNrpnMessage(e);

    // Parse the inbound event for regular messages
    this._parseEventForStandardMessages(e);

  }

  getStructuredMidiMessage(data) {

    return {
      command: data[0] >> 4,
      data1: data.length > 1 ? data[1] : undefined,
      data2: data.length > 2 ? data[2] : undefined
    };

  }

  /**
   * Parses channel events for standard (non-NRPN) events.
   * @param e Event
   * @private
   */
  _parseEventForStandardMessages(e) {

    let {command, data1, data2} = this.getStructuredMidiMessage(e.data);

    // Returned event
    let event = {
      target: this,
      data: Array.from(e.data),
      rawData: e.data,
      timestamp: e.timeStamp
    };

    if (
      command === wm.MIDI_CHANNEL_VOICE_MESSAGES.noteoff ||
      (command === wm.MIDI_CHANNEL_VOICE_MESSAGES.noteon && data2 === 0)
    ) {

      /**
       * Event emitted when a **note off** MIDI message has been received.
       *
       * @event InputChannel#noteoff
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a `Uint8Array`.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"noteoff"`
       * @property {Object} note A {@link Note} object containing information such as note number,
       * note name and octave.
       * @property {number} release The release velocity expressed as a float between 0 and 1.
       * @property {number} rawRelease The release velocity expressed as an integer (between 0 and
       * 127).
       */
      event.type = "noteoff";
      event.note = new Note(data1, {rawRelease: data2});
      event.release = event.note.release;
      event.rawRelease = event.note.rawRelease;

    } else if (command === wm.MIDI_CHANNEL_VOICE_MESSAGES.noteon) {

      /**
       * Event emitted when a **note on** MIDI message has been received.
       *
       * @event InputChannel#noteon
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"noteon"`
       * @property {Object} note A {@link Note} object containing information such as note number,
       * note name and octave.
       * @property {number} attack The attack velocity expressed as a float between 0 and 1.
       * @property {number} rawAttack The attack velocity expressed as an integer (between 0 and
       * 127).
       */
      event.type = "noteon";
      event.note = new Note(data1, {rawAttack: data2});
      event.attack = event.note.attack;
      event.rawAttack = event.note.rawAttack;

    } else if (command === wm.MIDI_CHANNEL_VOICE_MESSAGES.keyaftertouch) {

      /**
       * Event emitted when a **key-specific aftertouch** MIDI message has been received.
       *
       * @event InputChannel#keyaftertouch
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a `Uint8Array`.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"keyaftertouch"`
       * @property {Object} note A {@link Note} object containing information such as note number,
       * note name and octave.
       * @property {number} value The aftertouch amount expressed as a float between 0 and 1.
       * @property {number} rawValue The aftertouch amount expressed as an integer (between 0 and
       * 127).
       */
      event.type = "keyaftertouch";
      event.note = new Note(data1);
      event.value = data2 / 127;
      event.rawValue = data2;

    } else if (
      command === wm.MIDI_CHANNEL_VOICE_MESSAGES.controlchange &&
      data1 >= 0 && data1 <= 119
    ) {

      /**
       * Event emitted when a **control change** MIDI message has been received.
       *
       * @event InputChannel#controlchange
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
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
      command === wm.MIDI_CHANNEL_VOICE_MESSAGES.channelmode &&
      data1 >= 120 && data1 <= 127
    ) {

      /**
       * Event emitted when a **channel mode** MIDI message has been received.
       *
       * @event InputChannel#channelmode
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"channelmode"`
       * @property {Object} controller
       * @property {Object} controller.number The number of the controller.
       * @property {Object} controller.name The usual name or function of the controller.
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */
      event.type = "channelmode";
      event.controller = {
        number: data1,
        name: this.getChannelModeByNumber(data1)
      };
      event.value = data2;

      // Also dispatch specific channel mode events
      this._parseChannelModeMessage(e);

    } else if (command === wm.MIDI_CHANNEL_VOICE_MESSAGES.programchange) {

      /**
       * Event emitted when a **program change** MIDI message has been received.
       *
       * @event InputChannel#programchange
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"programchange"`
       * @property {number} value The value expressed as an integer between 1 and 128.
       * @property {number} rawValue The value expressed as an integer between 0 and 127.
       */
      event.type = "programchange";
      event.value = data1 + 1;
      event.rawValue = data1;

    } else if (command === wm.MIDI_CHANNEL_VOICE_MESSAGES.channelaftertouch) {

      /**
       * Event emitted when a control change MIDI message has been received.
       *
       * @event InputChannel#channelaftertouch
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"channelaftertouch"`
       * @property {number} value The value expressed as a float between 0 and 1.
       * @property {number} rawValue The value expressed as an integer (between 0 and 127).
       */
      event.type = "channelaftertouch";
      event.value = data1 / 127;
      event.rawValue = data1;

    } else if (command === wm.MIDI_CHANNEL_VOICE_MESSAGES.pitchbend) {

      /**
       * Event emitted when a pitch bend MIDI message has been received.
       *
       * @event InputChannel#pitchbend
       * @type {Object}
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
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

    if (wm.validation) {
      number = Math.floor(number);
    }

    if ( !(number >= 120 && number <= 127) ) return false;

    for (let cm in wm.MIDI_CHANNEL_MODE_MESSAGES) {

      if (
        wm.MIDI_CHANNEL_MODE_MESSAGES.hasOwnProperty(cm) &&
        number === wm.MIDI_CHANNEL_MODE_MESSAGES[cm]
      ) {
        return cm;
      }

    }

  }

  _parseChannelModeMessage(e) {

    let data1, data2;

    if (e.data.length > 1) {
      data1 = e.data[1];
      data2 = e.data.length > 2 ? e.data[2] : undefined;
    }

    // Basis for the returned event
    let event = {
      target: this,
      data: Array.from(e.data),
      rawData: e.data,
      timestamp: e.timeStamp,
      type: this.getChannelModeByNumber(data1)
    };

    /**
     * Event emitted when an "all sound off" channel-mode MIDI message has been received.
     *
     * @event InputChannel#allsoundoff
     * @type {Object}
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {Array} event.data The MIDI message as an array of 8 bit values.
     * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"allsoundoff"`
     */

    /**
     * Event emitted when a "reset all controllers" channel-mode MIDI message has been received.
     *
     * @event InputChannel#resetallcontrollers
     * @type {Object}
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {Array} event.data The MIDI message as an array of 8 bit values.
     * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"resetallcontrollers"`
     */

    /**
     * Event emitted when a "local control" channel-mode MIDI message has been received. The value
     * property of the event is set to either `true` (local control on) of `false` (local control
     * off).
     *
     * @event InputChannel#localcontrol
     * @type {Object}
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {Array} event.data The MIDI message as an array of 8 bit values.
     * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"localcontrol"`
     * @property {boolean} value For local control on, the value is `true`. For local control off,
     * the value is `false`.
     */
    if (event.type === "localcontrol") {
      event.value = data2 === 127 ? true : false;
    }

    /**
     * Event emitted when an "all notes off" channel-mode MIDI message has been received.
     *
     * @event InputChannel#allnotesoff
     * @type {Object}
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {Array} event.data The MIDI message as an array of 8 bit values.
     * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"allnotesoff"`
     */

    /**
     * Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
     * property of the event is set to either `true` (omni mode on) of `false` (omni mode off).
     *
     * @event InputChannel#omnimode
     * @type {Object}
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {Array} event.data The MIDI message as an array of 8 bit values.
     * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"omnimode"`
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
     * @type {Object}
     * @property {InputChannel} target The `InputChannel` that triggered the event.
     * @property {Array} event.data The MIDI message as an array of 8 bit values.
     * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"monomode"`
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

  // /**
  //  * Parses channel events and constructs NRPN message parts in valid sequences.
  //  * Keeps a separate NRPN buffer for each channel.
  //  * Emits an event after it receives the final CC parts msb 127 lsb 127.
  //  * If a message is incomplete and other messages are received before
  //  * the final 127 bytes, the incomplete message is cleared.
  //  * @param e Event
  //  * @private
  //  *
  //  *
  //  * Uint8Array [ 176, 99, 12 ]
  //  * Uint8Array [ 176, 98, 34 ]
  //  * Uint8Array [ 176, 6, 56 ]
  //  * Uint8Array [ 176, 38, 78 ]
  //  * Uint8Array [ 176, 101, 127 ]
  //  * Uint8Array [ 176, 100, 127 ]
  //  */
  // _parseEventForNrpnMessage(e) {
  //
  //   if (!this.nrpnEventsEnabled) return;
  //
  //   // Extract basic data
  //   let command = e.data[0] >> 4;
  //   let channel = (e.data[0] & 0xf) + 1;
  //   let data1;
  //   let data2;
  //
  //   if (e.data.length > 1) {
  //     data1 = e.data[1];
  //     data2 = e.data.length > 2 ? e.data[2] : undefined;
  //   }
  //
  //   // Message not valid for NRPN
  //   if (
  //     !(
  //       command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.controlchange &&
  //       (
  //         (
  //           data1 >= WebMidi.MIDI_NRPN_MESSAGES.increment &&
  //           data1 <= WebMidi.MIDI_NRPN_MESSAGES.parammsb
  //         ) ||
  //         data1 === WebMidi.MIDI_NRPN_MESSAGES.entrymsb ||
  //         data1 === WebMidi.MIDI_NRPN_MESSAGES.entrylsb
  //       )
  //     )
  //   ) {
  //     return;
  //   }
  //
  //   // set up a CC event to parse as NRPN part
  //   let ccEvent = {
  //     target: this,
  //     type: "controlchange",
  //     data: Array.from(e.data),
  //     rawData: e.data,
  //     timestamp: e.timeStamp,
  //     channel: channel,
  //     controller: {
  //       number: data1,
  //       name: this.getCcNameByNumber(data1)
  //     },
  //     value: data2
  //   };
  //
  //   if (
  //     // if we get a starting MSB (CC99 - 0-126) vs an end MSB (CC99 - 127), destroy incomplete
  //     // NRPN and begin building again
  //     ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.parammsb &&
  //     ccEvent.value != WebMidi.MIDI_NRPN_MESSAGES.nullactiveparameter
  //   ) {
  //     this._nrpnBuffer = [];
  //     this._nrpnBuffer[0] = ccEvent;
  //   } else if(
  //     // add the param LSB
  //     this._nrpnBuffer.length === 1 &&
  //     ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.paramlsb
  //   ) {
  //     this._nrpnBuffer.push(ccEvent);
  //
  //   } else if(
  //     // add data inc/dec or value MSB for 14bit
  //     this._nrpnBuffer.length === 2 &&
  //     (ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.increment ||
  //       ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.decrement ||
  //       ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.entrymsb)
  //   ) {
  //     this._nrpnBuffer.push(ccEvent);
  //   } else if(
  //     // if we have a value MSB, only add an LSB to pair with that
  //     this._nrpnBuffer.length === 3 &&
  //     this._nrpnBuffer[2].number === WebMidi.MIDI_NRPN_MESSAGES.entrymsb &&
  //     ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.entrylsb
  //   ) {
  //     this._nrpnBuffer.push(ccEvent);
  //
  //   } else if(
  //     // add an end MSB (CC99 - 127)
  //     this._nrpnBuffer.length >= 3 &&
  //     this._nrpnBuffer.length <= 4 &&
  //     ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.parammsb &&
  //     ccEvent.value === WebMidi.MIDI_NRPN_MESSAGES.nullactiveparameter
  //   ) {
  //     this._nrpnBuffer.push(ccEvent);
  //   } else if(
  //     // add an end LSB (CC99 - 127)
  //     this._nrpnBuffer.length >= 4 &&
  //     this._nrpnBuffer.length <= 5 &&
  //     ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.paramlsb &&
  //     ccEvent.value === WebMidi.MIDI_NRPN_MESSAGES.nullactiveparameter
  //   ) {
  //     this._nrpnBuffer.push(ccEvent);
  //     // now we have a full inc or dec NRPN message, lets create that event!
  //
  //     let rawData = [];
  //
  //     this._nrpnBuffer.forEach(ev => rawData.push(ev.data));
  //
  //     let nrpnNumber = (this._nrpnBuffer[0].value<<7) | (this._nrpnBuffer[1].value);
  //     let nrpnValue = this._nrpnBuffer[2].value;
  //     if (this._nrpnBuffer.length === 6) {
  //       nrpnValue = (this._nrpnBuffer[2].value<<7) | (this._nrpnBuffer[3].value);
  //     }
  //
  //     let nrpnControllerType = "";
  //
  //     switch (this._nrpnBuffer[2].controller.number) {
  //     case WebMidi.MIDI_NRPN_MESSAGES.entrymsb:
  //       nrpnControllerType = InputChannel.NRPN_TYPES[0];
  //       break;
  //     case WebMidi.MIDI_NRPN_MESSAGES.increment:
  //       nrpnControllerType = InputChannel.NRPN_TYPES[1];
  //       break;
  //     case WebMidi.MIDI_NRPN_MESSAGES.decrement:
  //       nrpnControllerType = InputChannel.NRPN_TYPES[2];
  //       break;
  //     default:
  //       throw new Error("The NPRN type was unidentifiable.");
  //     }
  //
  //     // now we are done building an NRPN, so clear the NRPN buffer
  //     this._nrpnBuffer = [];
  //
  //     /**
  //      * Event emitted when a valid NRPN message sequence has been received.
  //      *
  //      * @event InputChannel#nrpn
  //      * @type {Object}
  //      * @property {InputChannel} target The `InputChannel` that triggered the event.
  //      * @property {Array} event.data The MIDI message as an array of 8 bit values.
  //      * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
  //      * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred
  //      * (in milliseconds since the navigation start of the document).
  //      * @property {string} type `"nrpn"`
  //      * @property {Object} controller
  //      * @property {Object} controller.number The number of the NRPN.
  //      * @property {Object} controller.name The usual name or function of the controller.
  //      * @property {number} value The aftertouch amount expressed as a float between 0 and 1.
  //      * @property {number} rawValue The aftertouch amount expressed as an integer (between 0 and
  //      * 65535).
  //      */
  //     let nrpnEvent = {
  //       timestamp: ccEvent.timestamp,
  //       channel: ccEvent.channel,
  //       type: "nrpn",
  //       data: Array.from(rawData),
  //       rawData: rawData,
  //       controller: {
  //         number: nrpnNumber,
  //         type: nrpnControllerType,
  //         name: "Non-Registered Parameter " + nrpnNumber
  //       },
  //       value: nrpnValue / 65535,
  //       rawValue: nrpnValue
  //     };
  //
  //     this.emit(nrpnEvent.type, nrpnEvent);
  //
  //   } else {
  //     // something didn't match, clear the incomplete NRPN message buffer
  //     this._nrpnBuffer = [];
  //   }
  // }

  /**
   * Returns the name of a control change message matching the specified number. Some valid control
   * change numbers do not have a specific name or purpose assigned in the MIDI
   * [spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
   * In this case, the method returns `false`.
   *
   * @param {number} number An integer representing the control change message
   * @returns {string|false} The matching control change name or `false` if not match was found
   *
   * @throws {RangeError} Invalid control change number.
   *
   * @since 2.0.0
   */
  getCcNameByNumber(number) {

    if (wm.validation) {
      number = parseInt(number);
      if ( !(number >= 0 && number <= 119) ) {
        throw new RangeError("Invalid control change number.");
      }
    }

    for (let cc in wm.MIDI_CONTROL_CHANGE_MESSAGES) {

      if (
        wm.MIDI_CONTROL_CHANGE_MESSAGES.hasOwnProperty(cc) &&
        number === wm.MIDI_CONTROL_CHANGE_MESSAGES[cc]
      ) {
        return cc;
      }

    }

    return false;

  }


  // /**
  //  * Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
  //  * are composed of a sequence of specific **control change** messages. When a valid sequence of
  //  * such control change messages is received, an `nrpn` event will fire. If an invalid or out of
  //  * order control change message is received, it will fall through the collector logic and all
  //  * buffered control change messages will be discarded as incomplete.
  //  *
  //  * @type Boolean
  //  */
  // get nrpnEventsEnabled() {
  //   return this._nrpnEventsEnabled;
  // }
  // set nrpnEventsEnabled(enabled) {
  //   this._nrpnEventsEnabled = !!enabled;
  // }

  // /**
  //  * Array of valid **non-registered parameter number** (NRPNs) types.
  //  *
  //  * @type {string[]}
  //  * @readonly
  //  */
  // static get NRPN_TYPES() {
  //   return ["entry", "increment", "decrement"];
  // }

}

/**
 * The `Input` class represents a single MIDI input port. This object is derived from the host's
 * MIDI subsystem and cannot be instantiated directly.
 *
 * You can find a list of all currently available `Input` objects in the {@link WebMidi#inputs}
 * array.
 *
 * The `Input` class extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [getListeners()](https://djipco.github.io/djipevents/EventEmitter.html#getListeners),
 * [emit()](https://djipco.github.io/djipevents/EventEmitter.html#emit),
 * [suspendEvent()](https://djipco.github.io/djipevents/EventEmitter.html#suspendEvent) and several
 * others.
 *
 * @param {MIDIInput} midiInput `MIDIInput` object as provided by the MIDI subsystem (Web MIDI API).
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
class Input extends e {

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
   * Destroys the `Input` by remove all listeners, emptying the `channels` array and unlinking the
   * MIDI subsystem.
   *
   * @returns {Promise<void>}
   */
  async destroy() {
    this.removeListener();
    this.channels.forEach(ch => ch.destroy());
    this.channels = [];
    this._midiInput.onstatechange = null;
    this._midiInput.onmidimessage = null;
    await this.close();
    this._midiInput = null;
  }

  /**
   * Executed when a `"statechange"` event occurs.
   *
   * @param e
   * @private
   */
  _onStateChange(e) {

    let event = {
      timestamp: wm.time,
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

    } else if (e.port.connection === "pending" && e.port.state === "disconnected") ; else {
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
    if (e.data[0] !== wm.MIDI_SYSTEM_MESSAGES.sysex) dataBytes = e.data.slice(1);

    /**
     * Event emitted when a MIDI message is received on the `Input`
     *
     * @event Input#midimessage
     * @type {Object}
     * @property {Input} target The `Input` that triggered the event.
     * @property {Array} event.data The MIDI message as an array of 8 bit values.
     * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
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
      data: Array.from(e.data),
      rawData: e.data,
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
      data: Array.from(e.data),
      rawData: e.data,
      timestamp: e.timeStamp
    };

    if (command === wm.MIDI_SYSTEM_MESSAGES.sysex) {

      /**
       * Input-wide (system) event emitted when a **system exclusive** message has been received.
       * You should note that, to receive `sysex` events, you must call the `WebMidi.enable()`
       * method with the `sysex` option set to `true`:
       *
       * ```js
       * WebMidi.enable({sysex: true})
       *  .then(() => console.log("WebMidi has been enabled with sysex support."))
       *  .catch(err => console.log("WebMidi could not be enabled."))
       * ```
       *
       * @event Input#sysex
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"sysex"`
       */
      event.type = "sysex";

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.timecode) {

      /**
       * Input-wide (system) event emitted when a **time code quarter frame** message has been
       * received.
       *
       * @event Input#timecode
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"sysextimecode"`
       */
      event.type = "timecode";

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.songposition) {

      /**
       * Input-wide (system) event emitted when a **song position** message has been received.
       *
       * @event Input#songposition
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"songposition"`
       */
      event.type = "songposition";

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.songselect) {

      /**
       * Input-wide (system) event emitted when a **song select** message has been received.
       *
       * @event Input#songselect
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"songselect"`
       * @property {string} song Song (or sequence) number to select (1-128)
       */
      event.type = "songselect";
      event.song = e.data[1] + 1;

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.tunerequest) {

      /**
       * Input-wide (system) event emitted when a **tune request** message has been received.
       *
       * @event Input#tunerequest
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"tunerequest"`
       */
      event.type = "tunerequest";

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.clock) {

      /**
       * Input-wide (system) event emitted when a **timing clock** message has been received.
       *
       * @event Input#clock
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"clock"`
       */
      event.type = "clock";

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.start) {

      /**
       * Input-wide (system) event emitted when a **start** message has been received.
       *
       * @event Input#start
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"start"`
       */
      event.type = "start";

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.continue) {

      /**
       * Input-wide (system) event emitted when a **continue** message has been received.
       *
       * @event Input#continue
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"continue"`
       */
      event.type = "continue";

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.stop) {

      /**
       * Input-wide (system) event emitted when a **stop** message has been received.
       *
       * @event Input#stop
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"stop"`
       */
      event.type = "stop";

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.activesensing) {

      /**
       * Input-wide (system) event emitted when an **active sensing** message has been received.
       *
       * @event Input#activesensing
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"activesensing"`
       */
      event.type = "activesensing";

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.reset) {

      /**
       * Input-wide (system) event emitted when a **reset** message has been received.
       *
       * @event Input#reset
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"reset"`
       */
      event.type = "reset";

    } else {

      /**
       * Input-wide (system) event emitted when an unknown MIDI message has been received. It could
       * be, for example, one of the undefined/reserved messages.
       *
       * @event Input#unknownmidimessage
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
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
   * @private
   * @deprecated since v3.0.0 (moved to 'InputChannel' class)
   */
  getChannelModeByNumber() {
    if (wm.validation) {
      console.warn(
        "The 'getChannelModeByNumber()' method has been moved to the 'InputChannel' class."
      );
    }
  }

  /**
   * Adds an event listener that will trigger a function callback when the specified event happens.
   * The event can be **channel-bound** or **input-wide**. Channel-bound events are dispatched by
   * {@link InputChannel} objects and are tied to a specific MIDI channel while input-wide events
   * are dispatched by the {@link Input} object itself and are not tied to a specific channel.
   *
   * When listening for an input-wide event, you must specify the event to listen for and the
   * callback function to trigger when the event happens:
   *
   * ```
   * WebMidi.inputs[0].addListener("midimessage", someFunction);
   * ```
   *
   * To listen for a channel-bound event, you must also specify the event to listen for and the
   * function to trigger but you have to add the channels you wish to listen on in the `options`
   * parameter:
   *
   * ```
   * WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
   * ```
   *
   * The code above will add a listener for the `"noteon"` event and call `someFunction` when the
   * event is triggered on MIDI channels `1`, `2` or `3`.
   *
   * Note that, when adding events to channels, it is the {@link InputChannel} instance that
   * actually gets a listener added and not the `{@link Input} instance.
   *
   * Note: if you want to add a listener to a single MIDI channel you should probably do so directly
   * on the {@link InputChannel} object itself.
   *
   * There are 6 families of events you can listen to:
   *
   * 1. **MIDI System Common** Events (input-wide)
   *
   *    * [songposition]{@link Input#event:songposition}
   *    * [songselect]{@link Input#event:songselect}
   *    * [sysex]{@link Input#event:sysex}
   *    * [timecode]{@link Input#event:timecode}
   *    * [tunerequest]{@link Input#event:tunerequest}
   *
   * 2. **MIDI System Real-Time** Events (input-wide)
   *
   *    * [clock]{@link Input#event:clock}
   *    * [start]{@link Input#event:start}
   *    * [continue]{@link Input#event:continue}
   *    * [stop]{@link Input#event:stop}
   *    * [activesensing]{@link Input#event:activesensing}
   *    * [reset]{@link Input#event:reset}
   *
   * 3. **State Change** Events (input-wide)
   *
   *    * [opened]{@link Input#event:opened}
   *    * [closed]{@link Input#event:closed}
   *    * [disconnected]{@link Input#event:disconnected}
   *
   * 4. **Catch-All** Events (input-wide)
   *
   *    * [midimessage]{@link Input#event:midimessage}
   *    * [unknownmidimessage]{@link Input#event:unknownmidimessage}
   *
   * 5. **Channel Voice** Events (channel-specific)
   *
   *    * [channelaftertouch]{@link InputChannel#event:channelaftertouch}
   *    * [controlchange]{@link InputChannel#event:controlchange}
   *    * [keyaftertouch]{@link InputChannel#event:keyaftertouch}
   *    * [noteoff]{@link InputChannel#event:noteoff}
   *    * [noteon]{@link InputChannel#event:noteon}
   *    * [nrpn]{@link InputChannel#event:nrpn}
   *    * [pitchbend]{@link InputChannel#event:pitchbend}
   *    * [programchange]{@link InputChannel#event:programchange}
   *
   * 6. **Channel Mode** Events (channel-specific)
   *
   *    * [channelmode]{@link InputChannel#event:channelmode}
   *    * To be completed...
   *
   * @param event {string} The type of the event.
   *
   * @param listener {function} A callback function to execute when the specified event is detected.
   * This function will receive an event parameter object. For details on this object's properties,
   * check out the documentation for the various events (links above).
   *
   * @param {Object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the `arguments` property of the `Listener` object
   * and can be retrieved or modified as desired.
   *
   * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
   * such integers representing the MIDI channel(s) to listen on. This parameter is ignored for
   * input-wide events.
   *
   * @param {Object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array.
   *
   * @param {boolean} [options.remaining=Infinity] The number of times after which the callback
   * should automatically be removed.
   *
   * @throws {Error} For channel-specific events, 'options.channels' must be defined.
   *
   * @returns {Listener[]} An array of all `Listener` objects that were created.
   */
  addListener(event, listener, options) {

    if (wm.validation) {

      // Legacy compatibility
      if (typeof options === "function") {
        let channels = (listener != undefined) ? [].concat(listener) : undefined; // clone
        listener = options;
        options = {channels: channels};
      }

      // Validation
      if (
        wm.MIDI_CHANNEL_VOICE_MESSAGES[event] !== undefined &&
        options.channels === undefined
      ) {
        throw new Error("For channel-specific events, 'options.channels' must be defined.");
      }

    }

    let listeners = [];

    // Check if the event is channel-specific or input-wide
    if (wm.MIDI_CHANNEL_VOICE_MESSAGES[event] === undefined) {
      listeners.push(super.addListener(event, listener, options));
    } else {
      wm.sanitizeChannels(options.channels).forEach(ch => {
        listeners.push(this.channels[ch].addListener(event, listener, options));
      });
    }

    return listeners;

  }

  /**
   * Adds a one-time event listener that will trigger a function callback when the specified event
   * happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
   * dispatched by {@link InputChannel} objects and are tied to a specific MIDI channel while
   * input-wide events are dispatched by the {@link Input} object itself and are not tied to a
   * specific channel.
   *
   * When listening for an input-wide event, you must specify the event to listen for and the
   * callback function to trigger when the event happens:
   *
   * ```
   * WebMidi.inputs[0].addListener("midimessage", someFunction);
   * ```
   *
   * To listen for a channel-bound event, you must also specify the event to listen for and the
   * function to trigger but you have to add the channels you wish to listen on in the `options`
   * parameter:
   *
   * ```
   * WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
   * ```
   *
   * The code above will add a listener for the `"noteon"` event and call `someFunction` when the
   * event is triggered on MIDI channels `1`, `2` or `3`.
   *
   * Note that, when adding events to channels, it is the {@link InputChannel} instance that
   * actually gets a listener added and not the `{@link Input} instance.
   *
   * Note: if you want to add a listener to a single MIDI channel you should probably do so directly
   * on the {@link InputChannel} object itself.
   *
   * There are 6 families of events you can listen to:
   *
   * 1. **MIDI System Common** Events (input-wide)
   *
   *    * [songposition]{@link Input#event:songposition}
   *    * [songselect]{@link Input#event:songselect}
   *    * [sysex]{@link Input#event:sysex}
   *    * [timecode]{@link Input#event:timecode}
   *    * [tunerequest]{@link Input#event:tunerequest}
   *
   * 2. **MIDI System Real-Time** Events (input-wide)
   *
   *    * [clock]{@link Input#event:clock}
   *    * [start]{@link Input#event:start}
   *    * [continue]{@link Input#event:continue}
   *    * [stop]{@link Input#event:stop}
   *    * [activesensing]{@link Input#event:activesensing}
   *    * [reset]{@link Input#event:reset}
   *
   * 3. **State Change** Events (input-wide)
   *
   *    * [opened]{@link Input#event:opened}
   *    * [closed]{@link Input#event:closed}
   *    * [disconnected]{@link Input#event:disconnected}
   *
   * 4. **Catch-All** Events (input-wide)
   *
   *    * [midimessage]{@link Input#event:midimessage}
   *    * [unknownmidimessage]{@link Input#event:unknownmidimessage}
   *
   * 5. **Channel Voice** Events (channel-specific)
   *
   *    * [channelaftertouch]{@link InputChannel#event:channelaftertouch}
   *    * [controlchange]{@link InputChannel#event:controlchange}
   *    * [keyaftertouch]{@link InputChannel#event:keyaftertouch}
   *    * [noteoff]{@link InputChannel#event:noteoff}
   *    * [noteon]{@link InputChannel#event:noteon}
   *    * [nrpn]{@link InputChannel#event:nrpn}
   *    * [pitchbend]{@link InputChannel#event:pitchbend}
   *    * [programchange]{@link InputChannel#event:programchange}
   *
   * 6. **Channel Mode** Events (channel-specific)
   *
   *    * [channelmode]{@link InputChannel#event:channelmode}
   *    * To be completed...
   *
   * @param event {string} The type of the event.
   *
   * @param listener {function} A callback function to execute when the specified event is detected.
   * This function will receive an event parameter object. For details on this object's properties,
   * check out the documentation for the various events (links above).
   *
   * @param {Object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the `arguments` property of the `Listener` object
   * and can be retrieved or modified as desired.
   *
   * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
   * such integers representing the MIDI channel(s) to listen on. This parameter is ignored for
   * input-wide events.
   *
   * @param {Object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array.
   *
   * @throws {Error} For channel-specific events, 'options.channels' must be defined.
   *
   * @returns {Listener[]} An array of all `Listener` objects that were created.
   */
  addOneTimeListener(event, listener, options = {}) {
    options.remaining = 1;
    return this.addListener(event, listener, options);
  }

  /**
   * This is an alias to the [Input.addListener()]{@link Input#addListener} method.
   * @since 2.0.0
   * @deprecated since v3.0
   * @private
   */
  on(event, channel, listener, options) {
    return this.addListener(event, channel, listener, options);
  }

  /**
   * Checks if the specified event type is already defined to trigger the listener function. For
   * channel-specific events, the function will return `true` only if all channels have the listener
   * defined.
   *
   * @param event {string} The type of the event.
   *
   * @param listener {function} The callback function to check for.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
   * such integers representing the MIDI channel(s) to check. This parameter is ignored for
   * input-wide events.
   *
   * @returns {Boolean} Boolean value indicating whether or not the channel(s) already have this
   * listener defined.
   *
   * @throws Error For channel-specific events, 'options.channels' must be defined.
   */
  hasListener(event, listener, options = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (typeof options === "function") {
        let channels = [].concat(listener); // clone
        listener = options;
        options = {channels: channels};
      }

      // Validation
      if (
        wm.MIDI_CHANNEL_VOICE_MESSAGES[event] !== undefined &&
        options.channels === undefined
      ) {
        throw new Error("For channel-specific events, 'options.channels' must be defined.");
      }

    }

    if (wm.MIDI_CHANNEL_VOICE_MESSAGES[event] !== undefined) {

      return wm.sanitizeChannels(options.channels).every(ch => {
        return this.channels[ch].hasListener(event, listener);
      });

    } else {
      return super.hasListener(event, listener);
    }

  }

  /**
   * Removes the specified listener for the specified event. If no listener is specified, all
   * listeners for the specified event will be removed. If no event is specified, all listeners for
   * the `Input` as well as all listeners for all `InputChannels` will be removed.
   *
   * By default, channel-specific listeners will be removed from all channels unless the
   * `options.channel` narrows it down.
   *
   * @param [type] {String} The type of the event.
   *
   * @param [listener] {Function} The callback function to check for.
   *
   * @param {Object} [options={}]
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
  removeListener(event, listener, options = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (typeof options === "function") {
        let channels = [].concat(listener); // clone
        listener = options;
        options = {channels: channels};
      }

    }

    if (options.channels === undefined) {
      options.channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    }

    // If the event is not specified, remove everything (channel-specific and input-wide)!
    if (event == undefined) {
      wm.sanitizeChannels(options.channels).forEach(ch => this.channels[ch].removeListener());
      return super.removeListener();
    }

    // If the event is specified, check if it's channel-specific or input-wide.
    if (wm.MIDI_CHANNEL_VOICE_MESSAGES[event] !== undefined) {

      wm.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].removeListener(event, listener, options);
      });

    } else {

      super.removeListener(event, listener, options);

    }

  }

  /**
   * Name of the MIDI input
   *
   * @type {string}
   * @readonly
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
   * Port type. In the case of `Input`, this is always: `"input"`.
   *
   * @type {string}
   * @readonly
   */
  get type() {
    return this._midiInput.type;
  }

  /**
   * @type {boolean}
   * @private
   * @deprecated since v3.0.0 (moved to 'InputChannel' class)
   */
  get nrpnEventsEnabled() {
    if (wm.validation) {
      console.warn("The 'nrpnEventsEnabled' property has been moved to the 'InputChannel' class.");
    }
    return false;
  }

}

/**
 * The `OutputChannel` class represents a single output channel (1-16) from an output device. This
 * object is derived from the host's MIDI subsystem and cannot be instantiated directly.
 *
 * All 16 `OutputChannel` objects can be found inside the output's [channels]{@link Output#channels}
 * property.
 *
 * The `OutputChannel` class extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
 * [removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
 * [hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
 * others.
 *
 * @param {Output} output The output this channel belongs to
 * @param {number} number The channel's number (1-16)
 *
 * @since 3.0.0
 */
class OutputChannel extends e {

  constructor(output, number) {

    super();

    /**
     * The {@link Output} this channel belongs to
     * @type {Output}
     */
    this.output = output;

    /**
     * The channel's number (1-16)
     * @type {number}
     */
    this.number = number;

  }

  /**
   * Unlinks the MIDI subsystem, removes all listeners attached to the channel and nulls the channel
   * number. This method is mostly for internal use. It has not been prefixed with an underscore
   * since it is called by other objects such as the `Output` object.
   *
   * @private
   */
  destroy() {
    this.output = null;
    this.number = null;
    this.removeListener();
  }

  /**
   * Sends a MIDI message at the scheduled timestamp. It is usually not necessary to use this method
   * directly as you can use one of the simpler helper methods such as `playNote()`, `stopNote()`,
   * `sendControlChange()`, etc.
   *
   * Details on the format of MIDI messages are available in the summary of
   * [MIDI messages]{@link https://www.midi.org/specifications/item/table-1-summary-of-midi-message}
   * from the MIDI Manufacturers Association.
   *
   * @param status {Number} The MIDI status byte of the message (128-255). This is a combination of
   * the command and the channel.
   *
   * @param {number[]} [data] An array of unsigned integers for the message. The number of data
   * bytes varies depending on the status byte. It is perfectly legal to send no data for some
   * message types (use `undefined` or an empty array in this case). Each byte must be between 0 and
   * 255.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 0 is greater
   * than 0xFF.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 2 is greater
   * than 0xFF.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Running status is not allowed at
   * index 0.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Message is incomplete.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Reserved status is not allowed at
   * index 0.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': System exclusive message is not
   * allowed at index 0.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Unexpected end of system
   * exclusive message at index 0.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Unexpected status byte at index
   * 1.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Unexpected status byte at index
   * 2.
   *
   * @throw {TypeError} Failed to execute 'send' on 'MIDIOutput': ? is not a UInt8 value.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  send(status, data = [], options = {}) {
    this.output.send(status, data, options);
    return this;
  }

  /**
   * Sends a MIDI **key aftertouch** message at the scheduled time. This is a key-specific
   * aftertouch. For a channel-wide aftertouch message, use
   * [setChannelAftertouch()]{@link Output#setChannelAftertouch}.
   *
   * The note can be a single value or an array of the following valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A {@link Note} object
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) for which you are sending
   * an aftertouch value. The notes can be specified by using a MIDI note number (0-127), a note
   * name (e.g. C3, G#4, F-1, Db7), a {@link Note} object or an array of the previous types. When
   * using a note name, octave range must be between -1 and 9. The lowest note is C-1 (MIDI note
   * number 0) and the highest note is G9 (MIDI note number 127).
   *
   * @param [pressure=0.5] {number} The pressure level (between 0 and 1). An invalid pressure value
   * will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the
   * pressure is defined by using an integer between 0 and 127.
   *
   * @param {Object} [options={}]
   *
   * @param {boolean} [options.useRawValue=false] A boolean indicating whether the value should be
   * considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @return {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   *
   * @throws RangeError Invalid key aftertouch value.
   */
  setKeyAftertouch(note, pressure, options = {}) {

    if (wm.validation) {

      // Legacy support
      if (options.useRawValue) options.rawValue = options.useRawValue;

      if (isNaN(parseFloat(pressure))) {
        throw new RangeError("Invalid key aftertouch value.");
      }
      if (options.rawValue) {
        if (!(pressure >= 0 && pressure <= 127 && Number.isInteger(pressure))) {
          throw new RangeError("Key aftertouch raw value must be an integer between 0 and 127.");
        }
      } else {
        if (!(pressure >= 0 && pressure <= 1)) {
          throw new RangeError("Key aftertouch value must be a float between 0 and 1.");
        }
      }

    }

    // Normalize to integer
    if (!options.rawValue) pressure = Math.round(pressure * 127);

    wm.getValidNoteArray(note, options).forEach(n => {
      this.send(
        (wm.MIDI_CHANNEL_VOICE_MESSAGES.keyaftertouch << 4) + (this.number - 1),
        [n.number, pressure],
        wm.convertToTimestamp(options.time)
      );
    });

    return this;

  }

  /**
   * Sends a MIDI **control change** message to the channel at the scheduled time. The control
   * change message to send can be specified numerically or by using one of the following common
   * names:
   *
   *  * `bankselectcoarse` (#0)
   *  * `modulationwheelcoarse` (#1)
   *  * `breathcontrollercoarse` (#2)
   *  * `footcontrollercoarse` (#4)
   *  * `portamentotimecoarse` (#5)
   *  * `dataentrycoarse` (#6)
   *  * `volumecoarse` (#7)
   *  * `balancecoarse` (#8)
   *  * `pancoarse` (#10)
   *  * `expressioncoarse` (#11)
   *  * `effectcontrol1coarse` (#12)
   *  * `effectcontrol2coarse` (#13)
   *  * `generalpurposeslider1` (#16)
   *  * `generalpurposeslider2` (#17)
   *  * `generalpurposeslider3` (#18)
   *  * `generalpurposeslider4` (#19)
   *  * `bankselectfine` (#32)
   *  * `modulationwheelfine` (#33)
   *  * `breathcontrollerfine` (#34)
   *  * `footcontrollerfine` (#36)
   *  * `portamentotimefine` (#37)
   *  * `dataentryfine` (#38)
   *  * `volumefine` (#39)
   *  * `balancefine` (#40)
   *  * `panfine` (#42)
   *  * `expressionfine` (#43)
   *  * `effectcontrol1fine` (#44)
   *  * `effectcontrol2fine` (#45)
   *  * `holdpedal` (#64)
   *  * `portamento` (#65)
   *  * `sustenutopedal` (#66)
   *  * `softpedal` (#67)
   *  * `legatopedal` (#68)
   *  * `hold2pedal` (#69)
   *  * `soundvariation` (#70)
   *  * `resonance` (#71)
   *  * `soundreleasetime` (#72)
   *  * `soundattacktime` (#73)
   *  * `brightness` (#74)
   *  * `soundcontrol6` (#75)
   *  * `soundcontrol7` (#76)
   *  * `soundcontrol8` (#77)
   *  * `soundcontrol9` (#78)
   *  * `soundcontrol10` (#79)
   *  * `generalpurposebutton1` (#80)
   *  * `generalpurposebutton2` (#81)
   *  * `generalpurposebutton3` (#82)
   *  * `generalpurposebutton4` (#83)
   *  * `reverblevel` (#91)
   *  * `tremololevel` (#92)
   *  * `choruslevel` (#93)
   *  * `celestelevel` (#94)
   *  * `phaserlevel` (#95)
   *  * `databuttonincrement` (#96)
   *  * `databuttondecrement` (#97)
   *  * `nonregisteredparametercoarse` (#98)
   *  * `nonregisteredparameterfine` (#99)
   *  * `registeredparametercoarse` (#100)
   *  * `registeredparameterfine` (#101)
   *
   * Note: as you can see above, not all control change message have a matching common name. This
   * does not mean you cannot use the others. It simply means you will need to use their number
   * instead of their name.
   *
   * To view a detailed list of all available **control change** messages, please consult "Table 3 -
   * Control Change Messages" from the [MIDI Messages](
   * https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
   * specification.
   *
   * @param {number|string} controller The MIDI controller name or number (0-119).
   *
   * @param {number} value The value to send (0-127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws {RangeError} Controller numbers must be between 0 and 119.
   * @throws {RangeError} Invalid controller name.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendControlChange(controller, value, options = {}) {

    if (typeof controller === "string") {
      controller = wm.MIDI_CONTROL_CHANGE_MESSAGES[controller];
    }

    if (wm.validation) {
      if (controller === undefined) {
        throw new TypeError(
          "Control change must be identified with a valid name or an integer between 0 and 119."
        );
      }

      if (!Number.isInteger(controller) || !(controller >= 0 && controller <= 119)) {
        throw new TypeError("Control change number must be an integer between 0 and 119.");
      }

      if (!Number.isInteger(value) || !(value >= 0 && value <= 127)) {
        throw new TypeError("Control change value must be an integer between 0 and 127");
      }
    }

    this.send(
      (wm.MIDI_CHANNEL_VOICE_MESSAGES.controlchange << 4) + (this.number - 1),
      [controller, value],
      wm.convertToTimestamp(options.time)
    );

    return this;

  }

  /**
   * Selects a MIDI non-registered parameter so it is affected by upcoming data entry, data
   * increment and data decrement messages.
   *
   * @param parameter {number[]} A two-position array specifying the two control bytes that identify
   * the registered parameter. The NRPN MSB (99 or 0x63) is a position 0. The NRPN LSB (98 or 0x62)
   * is at position 1.
   *
   * @private
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  _selectNonRegisteredParameter(parameter, options = {}) {

    // parameter[0] = Math.floor(parameter[0]);
    // if (!(parameter[0] >= 0 && parameter[0] <= 127)) {
    //   throw new RangeError("The control63 value must be between 0 and 127.");
    // }
    //
    // parameter[1] = Math.floor(parameter[1]);
    // if (!(parameter[1] >= 0 && parameter[1] <= 127)) {
    //   throw new RangeError("The control62 value must be between 0 and 127.");
    // }

    this.sendControlChange(0x63, parameter[0], options);
    this.sendControlChange(0x62, parameter[1], options);

    return this;

  }

  /**
   * Deselects the currently active MIDI registered parameter so it is no longer affected by data
   * entry, data increment and data decrement messages.
   *
   * Current best practice recommends doing that after each call to
   * [_setCurrentParameter()]{@link OutputChannel#_setCurrentParameter}.
   *
   * @private
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  _deselectRegisteredParameter(options = {}) {
    this.sendControlChange(0x65, 0x7F, options);
    this.sendControlChange(0x64, 0x7F, options);
    return this;
  }

  /**
   * Deselects the currently active MIDI non-registered parameter so it is no longer affected by
   * data entry, data increment and data decrement messages.
   *
   * @private
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  _deselectNonRegisteredParameter(options = {}) {
    this.sendControlChange(0x65, 0x7F, options);
    this.sendControlChange(0x64, 0x7F, options);
    return this;
  }

  /**
   * Selects a MIDI registered parameter so it is affected by upcoming data entry, data increment
   * and data decrement messages.
   *
   * @private
   *
   * @param parameter {number[]} A two-position array of integers specifying the two control bytes
   * (0x65, 0x64) that identify the registered parameter. The integers must be between 0 and 127.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  _selectRegisteredParameter(parameter, options = {}) {
    this.sendControlChange(0x65, parameter[0], options);
    this.sendControlChange(0x64, parameter[1], options);
    return this;
  }

  /**
   * Sets the value of the currently selected MIDI registered parameter.
   *
   * @private
   *
   * @param data {number|number[]}
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  _setCurrentParameter(data, options = {}) {

    data = [].concat(data);

    // MSB
    // data[0] = parseInt(data[0]);
    // if (!isNaN(data[0]) && data[0] >= 0 && data[0] <= 127) {
    this.sendControlChange(0x06, data[0], options);
    // } else {
    //   throw new RangeError("The msb value must be between 0 and 127.");
    // }

    if (data.length < 2) return this;

    // LSB
    // data[1] = parseInt(data[1]);

    // if (!isNaN(data[1]) && data[1] >= 0 && data[1] <= 127) {
    this.sendControlChange(0x26, data[1], options);
    // } else {
    //   throw new RangeError("The lsb value must be between 0 and 127.");
    // }

    return this;

  }

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
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws TypeError The specified registered parameter is invalid.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  decrementRegisteredParameter(parameter, options = {}) {

    if (!Array.isArray(parameter)) parameter = wm.MIDI_REGISTERED_PARAMETER[parameter];

    if (wm.validation) {
      if (parameter === undefined) {
        throw new TypeError("The specified registered parameter is invalid.");
      }

      let valid = false;

      Object.getOwnPropertyNames(wm.MIDI_REGISTERED_PARAMETER).forEach(p => {
        if (
          wm.MIDI_REGISTERED_PARAMETER[p][0] === parameter[0] &&
          wm.MIDI_REGISTERED_PARAMETER[p][1] === parameter[1]
        ) {
          valid = true;
        }
      });

      if (!valid) throw new TypeError("The specified registered parameter is invalid.");
    }

    this._selectRegisteredParameter(parameter, options);
    this.sendControlChange(0x61, 0, options);
    this._deselectRegisteredParameter(options);

    return this;

  }

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
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws TypeError The specified registered parameter is invalid.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  incrementRegisteredParameter(parameter, options = {}) {

    if (!Array.isArray(parameter)) parameter = wm.MIDI_REGISTERED_PARAMETER[parameter];

    if (wm.validation) {
      if (parameter === undefined) {
        throw new TypeError("The specified registered parameter is invalid.");
      }

      let valid = false;

      Object.getOwnPropertyNames(wm.MIDI_REGISTERED_PARAMETER).forEach(p => {
        if (
          wm.MIDI_REGISTERED_PARAMETER[p][0] === parameter[0] &&
          wm.MIDI_REGISTERED_PARAMETER[p][1] === parameter[1]
        ) {
          valid = true;
        }
      });

      if (!valid) throw new TypeError("The specified registered parameter is invalid.");
    }

    this._selectRegisteredParameter(parameter, options);
    this.sendControlChange(0x60, 0, options);
    this._deselectRegisteredParameter(options);

    return this;

  }

  /**
   * Plays a note or an array of notes on the channel. The first parameter is the note to play. It
   * can be a single value or an array of the following valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A {@link Note} object
   *
   * The `playNote()` method sends a **note on** MIDI message for all specified notes on all
   * specified channels. If a `duration` is set in the `options` parameter or in the {@link Note}
   * object's [duration]{@link Note#duration} property, it will also schedule a **note off** message
   * to end the note after said duration. If no `duration` is set, the note will simply play until
   * a matching **note off** message is sent with [stopNote()]{@link OutputChannel#stopNote} or
   * [sendNoteOff()]{@link OutputChannel#sendNoteOff}.
   *
   *  The execution of the **note on** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * When using {@link Note} objects, the durations and velocities defined in the {@link Note}
   * objects have precedence over the ones specified via the method's `options` parameter.
   *
   * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
   * functionally equivalent to a **note off** message.
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
   * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
   * {@link Note} object or an array of the previous types. When using a note name, octave range
   * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
   * note is G9 (MIDI note number 127).
   *
   * @param {Object} [options={}]
   *
   * @param {number} [options.duration] A positive number larger than 0 representing the number of
   * milliseconds to wait before sending a **note off** message. If invalid or left undefined, only
   * a **note on** message will be sent.
   *
   * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
   * `1`). If the `rawAttack` option is also defined, it will have priority. An invalid velocity
   * value will silently trigger the default of `0.5`.
   *
   * @param {number} [options.rawAttack=0.5] The attack velocity at which to play the note (between
   * `0` and `127`). This has priority over the `attack` property. An invalid velocity value will
   * silently trigger the default of `0.5`.
   *
   * @param {number} [options.release=0.5] The velocity at which to release the note (between `0`
   * and `1`). If the `rawRelease` option is also defined, it will have priority. An invalid
   * velocity value will silently trigger the default of `0.5`. This is only used with the
   * **note off** event triggered when `options.duration` is set.
   *
   * @param {number} [options.rawRelease=0.5] The velocity at which to release the note (between `0`
   * and `127`). This has priority over the `release` property. An invalid velocity value will
   * silently trigger the default of `0.5`. This is only used with the **note off** event triggered
   * when `options.duration` is set.
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  playNote(note, options = {}) {

    // Send note on and, optionally, note off message (if duration is a positive number)
    this.sendNoteOn(note, options);

    // https://stackoverflow.com/questions/600763#answer-601877
    if (options.duration > 0 && isFinite(String(options.duration).trim() || NaN)) {

      let noteOffOptions = {
        time: wm.convertToTimestamp(options.time) + options.duration,
        release: options.release,
        rawRelease: options.rawRelease,
      };

      this.sendNoteOff(note, noteOffOptions);

    }

    return this;

  }

  /**
   * Sends a **note off** message for the specified notes on the channel. The first parameter is the
   * note. It can be a single value or an array of the following valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A {@link Note} object
   *
   *  The execution of the **note off** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * When using {@link Note} objects, the release velocity defined in the {@link Note} objects has
   * precedence over the one specified via the method's `options` parameter.
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to stop. The notes can be
   * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
   * {@link Note} object or an array of the previous types. When using a note name, octave range
   * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
   * note is G9 (MIDI note number 127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
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
  sendNoteOff(note, options = {}) {

    if (wm.validation) {

      if (
        options.rawRelease != undefined &&
        !(options.rawRelease >= 0 && options.rawRelease <= 127)
      ) {
        throw new RangeError("The 'rawRelease' option must be an integer between 0 and 127");
      }

      if (options.release != undefined && !(options.release >= 0 && options.release <= 1)) {
        throw new RangeError("The 'release' option must be an number between 0 and 1");
      }

      // Legacy compatibility warnings
      if (options.rawVelocity) {
        options.rawRelease = options.velocity;
        console.warn("The 'rawVelocity' option is deprecated. Use 'rawRelease' instead.");
      }
      if (options.velocity) {
        options.release = options.velocity;
        console.warn("The 'velocity' option is deprecated. Use 'attack' instead.");
      }

    }



    let nVelocity = 64;

    if (options.rawRelease != undefined) {
      nVelocity = options.rawRelease;
    } else {
      if (!isNaN(options.release)) nVelocity = Math.round(options.release * 127);
    }

    // Send note off messages
    let o = {rawRelease: parseInt(nVelocity)};

    wm.getValidNoteArray(note, o).forEach(n => {
      this.send(
        (wm.MIDI_CHANNEL_VOICE_MESSAGES.noteoff << 4) + (this.number - 1),
        [n.number, n.rawRelease],
        wm.convertToTimestamp(options.time)
      );
    });

    return this;

  }

  /**
   * This is an alias to the [sendNoteOff()]{@link OutputChannel#sendNoteOff} method.
   *
   * @see {@link OutputChannel#sendNoteOff}
   *
   * @param note
   * @param options
   * @returns {Output}
   */
  stopNote(note, options = {}) {
    return this.sendNoteOff(note, options);
  }

  /**
   * Sends a **note on** message for the specified notes on the channel. The first parameter is the
   * note. It can be a single value or an array of the following valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A {@link Note} object
   *
   *  The execution of the **note on** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * When using {@link Note} objects, the attack velocity defined in the {@link Note} objects has
   * precedence over the one specified via the method's `options` parameter. Also, the `duration` is
   * ignored. If you want to also send a **note off** message, use the
   * [playNote()]{@link Output#playNote} method instead.
   *
   * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
   * functionally equivalent to a **note off** message.
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
   * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
   * {@link Note} object or an array of the previous types. When using a note name, octave range
   * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
   * note is G9 (MIDI note number 127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
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
  sendNoteOn(note, options = {}) {

    if (wm.validation) {

      if (options.rawAttack != undefined && !(options.rawAttack >= 0 && options.rawAttack <= 127)) {
        throw new RangeError("The 'rawAttack' option must be an integer between 0 and 127");
      }

      if (options.attack != undefined && !(options.attack >= 0 && options.attack <= 1)) {
        throw new RangeError("The 'attack' option must be an number between 0 and 1");
      }

      // Legacy compatibility warnings
      if (options.rawVelocity) {
        options.rawAttack = options.velocity;
        options.rawRelease = options.release;
        console.warn("The 'rawVelocity' option is deprecated. Use 'rawAttack' or 'rawRelease'.");
      }
      if (options.velocity) {
        options.attack = options.velocity;
        console.warn("The 'velocity' option is deprecated. Use 'attack' instead.");
      }

    }

    let nVelocity = 64;

    if (options.rawAttack != undefined) {
      nVelocity = options.rawAttack;
    } else {
      if (!isNaN(options.attack)) nVelocity = Math.round(options.attack * 127);
    }

    let o = {rawAttack: nVelocity};

    wm.getValidNoteArray(note, o).forEach(n => {
      this.send(
        (wm.MIDI_CHANNEL_VOICE_MESSAGES.noteon << 4) + (this.number - 1),
        [n.number, n.rawAttack],
        wm.convertToTimestamp(options.time)
      );
    });

    return this;

  }

  /**
   * Sends a MIDI **channel mode** message. The channel mode message to send can be specified
   * numerically or by using one of the following common names:
   *
   *   * `"allsoundoff"` (#120)
   *   * `"resetallcontrollers"` (#121)
   *   * `"localcontrol"` (#122)
   *   * `"allnotesoff"` (#123)
   *   * `"omnimodeoff"` (#124)
   *   * `"omnimodeon"` (#125)
   *   * `"monomodeon"` (#126)
   *   * `"polymodeon"` (#127)
   *
   * It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may
   * require a value that's not zero. For that reason, the `value` parameter is optional and
   * defaults to 0.
   *
   * To make it easier, all channel mode messages have a matching helper method:
   *
   *   - [turnSoundOff()]{@link Output#turnSoundOff}
   *   - [resetAllControllers()]{@link Output#resetAllControllers}
   *   - [setLocalControl()]{@link Output#turnSoundOff}
   *   - [turnNotesOff()]{@link Output#turnNotesOff}
   *   - [setOmniMode()]{@link Output#setOmniMode}
   *   - [setPolyphonicMode()]{@link Output#setPolyphonicMode}
   *
   * @param command {number|string} The numerical identifier of the channel mode message (integer
   * between 120-127) or its name as a string.
   *
   * @param value {number} The value to send (integer between 0-127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendChannelMode(command, value, options = {}) {

    // Normalize command to integer
    if (typeof command === "string") command = wm.MIDI_CHANNEL_MODE_MESSAGES[command];

    if (wm.validation) {

      if (command === undefined) {
        throw new TypeError("Invalid channel mode message name or number.");
      }

      if (isNaN(command) || !(command >= 120 && command <= 127)) {
        throw new TypeError("Invalid channel mode message number.");
      }

      if (isNaN(parseInt(value)) || value < 0 || value > 127) {
        throw new RangeError("Value must be an integer between 0 and 127.");
      }

    }

    this.send(
      (wm.MIDI_CHANNEL_VOICE_MESSAGES.channelmode << 4) + (this.number - 1),
      [command, value],
      wm.convertToTimestamp(options.time)
    );

    return this;

  }

  /**
   * Sets OMNI mode to `"on"` or `"off"`. MIDI's OMNI mode causes the instrument to respond to
   * messages from all channels.
   *
   * It should be noted that support for OMNI mode is not as common as it used to be.
   *
   * @param [state=true] {boolean} Whether to activate OMNI mode (`true`) or not (`false`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws {TypeError} Invalid channel mode message name.
   * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
   * @throws {RangeError} Value must be an integer between 0 and 127.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setOmniMode(state, options = {}) {

    if (state === undefined || state) {
      this.sendChannelMode("omnimodeon", 0, options);
    } else {
      this.sendChannelMode("omnimodeoff", 0, options);
    }

    return this;

  }

  /**
   * Sends a MIDI **channel aftertouch** message. For key-specific aftertouch, you should instead
   * use [setKeyAftertouch()]{@link Output#setKeyAftertouch}.
   *
   * @param [pressure] {number} The pressure level (between 0 and 1). If the `rawValue` option is
   * set to `true`, the pressure can be defined by using an integer between 0 and 127.
   *
   * @param {Object} [options={}]
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   *
   * @throws RangeError Invalid channel aftertouch value.
   */
  setChannelAftertouch(pressure, options = {}) {

    if (wm.validation) {

      if (isNaN(parseFloat(pressure))) {
        throw new RangeError("Invalid channel aftertouch value.");
      }

      if (options.rawValue) {
        if (!(pressure >= 0 && pressure <= 127 && Number.isInteger(pressure))) {
          throw new RangeError(
            "Channel aftertouch raw value must be an integer between 0 and 127.")
          ;
        }
      } else {
        if (!(pressure >= 0 && pressure <= 1)) {
          throw new RangeError("Channel aftertouch value must be a float between 0 and 1.");
        }
      }

    }

    this.send(
      (wm.MIDI_CHANNEL_VOICE_MESSAGES.channelaftertouch << 4) + (this.number - 1),
      [Math.round(pressure * 127)],
      wm.convertToTimestamp(options.time)
    );

    return this;

  }

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
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws {RangeError} The value must be a decimal number between larger than -65 and smaller
   * than 64.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setMasterTuning(value, options = {}) {

    value = parseFloat(value) || 0.0;

    if (wm.validation) {

      if (!(value > -65 && value < 64)) {
        throw new RangeError(
          "The value must be a decimal number larger than -65 and smaller than 64."
        );
      }

    }

    let coarse = Math.floor(value) + 64;
    let fine = value - Math.floor(value);

    // Calculate MSB and LSB for fine adjustment (14bit resolution)
    fine = Math.round((fine + 1) / 2 * 16383);
    let msb = (fine >> 7) & 0x7F;
    let lsb = fine & 0x7F;

    this.setRegisteredParameter("channelcoarsetuning", coarse, options);
    this.setRegisteredParameter("channelfinetuning", [msb, lsb], options);

    return this;

  }

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
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setModulationRange(semitones, cents, options = {}) {

    if (wm.validation) {

      if (!Number.isInteger(semitones) || !(semitones >= 0 && semitones <= 127)) {
        throw new RangeError("The semitones value must be an integer between 0 and 127.");
      }

      if (!(cents == undefined) && (!Number.isInteger(cents) || !(cents >= 0 && cents <= 127))) {
        throw new RangeError("If specified, the cents value must be an integer between 0 and 127.");
      }

    }

    // Default value for cents
    if (!(cents >= 0 && cents <= 127)) cents = 0;

    this.setRegisteredParameter("modulationrange", [semitones, cents], options);

    return this;

  }

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
   * WebMidi.outputs[0].channels[0].setNonRegisteredParameter([1, 8], 123);
   * ```
   *
   * In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
   * would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
   * uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
   * value to send was 10, you could use:
   *
   * ```js
   * WebMidi.outputs[0].channels[0].setNonRegisteredParameter([2, 63], [0, 10]);
   * ```
   *
   * For further implementation details, refer to the manufacturer's documentation.
   *
   * @param parameter {number[]} A two-position array specifying the two control bytes (0x63,
   * 0x62) that identify the non-registered parameter.
   *
   * @param [data=[]] {number|number[]} An integer or an array of integers with a length of 1 or 2
   * specifying the desired data.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws {RangeError} The control value must be between 0 and 127.
   * @throws {RangeError} The msb value must be between 0 and 127
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setNonRegisteredParameter(nrpn, data, options = {}) {

    data = [].concat(data);

    if (wm.validation) {

      if (!Array.isArray(nrpn) || !Number.isInteger(nrpn[0]) || !Number.isInteger(nrpn[1])) {
        throw new TypeError("The specified NRPN is invalid.");
      }

      if (!(nrpn[0] >= 0 && nrpn[0] <= 127)) {
        throw new RangeError("The first byte of the NRPN must be between 0 and 127.");
      }

      if (!(nrpn[1] >= 0 && nrpn[1] <= 127)) {
        throw new RangeError("The second byte of the NRPN must be between 0 and 127.");
      }

      data.forEach(value => {
        if (!(value >= 0 && value <= 127)) {
          throw new RangeError("The data bytes of the NRPN must be between 0 and 127.");
        }
      });

    }

    this._selectNonRegisteredParameter(nrpn, options);
    this._setCurrentParameter(data, options);
    this._deselectNonRegisteredParameter(options);

    return this;

  }

  /**
   * Sends a MIDI **pitch bend** message at the scheduled time.
   *
   * @param {number|number[]} [value] The intensity of the bend (between -1.0 and 1.0). A value of
   * zero means no bend. The resulting bend is relative to the pitch bend range that has been
   * defined. The range can be set with [setPitchBendRange()]{@link OutputChannel#setPitchBendRange}
   * . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of
   * -1 will bend the note 1 octave below its nominal value.
   *
   * If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either
   * using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127
   * representing, respectively, the MSB (most significant byte) and the LSB (least significant
   * byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64`
   * bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents
   * (1/100 of a semitone). An LSB of `64` also means no bend.
   *
   * @param {Object} [options={}]
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or
   * an array of 2 integers if using both MSB and LSB).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setPitchBend(value, options = {}) {

    if (wm.validation) {

      if (options.rawValue && Array.isArray(value)) {

        if (!(value[0] >= 0 && value[0] <= 127)) {
          throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");
        }
        if (!(value[1] >= 0 && value[1] <= 127)) {
          throw new RangeError("The pitch bend LSB must be an integer between 0 and 127.");
        }

      } else if (options.rawValue && !Array.isArray(value)) {

        if (!(value >= 0 && value <= 127)) {
          throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");
        }

      } else {

        if (isNaN(value) || value === null) {
          throw new RangeError("Invalid pitch bend value.");
        }

        if (!(value >= -1 && value <= 1)) {
          throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");
        }

      }

    }

    let msb = 0;
    let lsb = 0;

    // Calculate MSB and LSB for both scenarios
    if (options.rawValue && Array.isArray(value)) {
      msb = value[0];
      lsb = value[1];
    } else if (options.rawValue && !Array.isArray(value)) {
      msb = value;
    } else {
      let nLevel = Math.round((value + 1) / 2 * 16383);
      msb = (nLevel >> 7) & 0x7F;
      lsb = nLevel & 0x7F;
    }

    this.send(
      (wm.MIDI_CHANNEL_VOICE_MESSAGES.pitchbend << 4) + (this.number - 1),
      [lsb, msb],
      wm.convertToTimestamp(options.time)
    );

    return this;

  }

  /**
   * Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
   * adjust the range used by their pitch bend lever. The range is specified by using the
   * `semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
   * means that the pitch bend range will be 12 semitones above and below the nominal pitch.
   *
   * @param semitones {number} The desired adjustment value in semitones (between 0 and 127). While
   * nothing imposes that in the specification, it is very common for manufacturers to limit the
   * range to 2 octaves (-12 semitones to 12 semitones).
   *
   * @param [cents=0] {number} The desired adjustment value in cents (integer between 0-127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws {RangeError} The msb value must be between 0 and 127.
   * @throws {RangeError} The lsb value must be between 0 and 127.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setPitchBendRange(semitones, cents, options = {}) {

    if (wm.validation) {

      if (!Number.isInteger(semitones) || !(semitones >= 0 && semitones <= 127)) {
        throw new RangeError("The semitones value must be an integer between 0 and 127.");
      }

      if (!Number.isInteger(cents) || !(cents >= 0 && cents <= 127)) {
        throw new RangeError("The cents value must be an integer between 0 and 127.");
      }

    }

    this.setRegisteredParameter("pitchbendrange", [semitones, cents], options);
    return this;

  }

  /**
   * Sends a MIDI **program change** message at the scheduled time.
   *
   * **Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
   * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
   * that use a numbering scheme starting at 1.
   *
   * @param [program=1] {number} The MIDI patch (program) number (1-128)
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
   * than 0xFF.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   *
   */
  setProgram(program, options = {}) {

    program = parseInt(program) || 1;

    if (wm.validation) {

      if (!(program >= 1 && program <= 128)) {
        throw new RangeError("The program number must be between 1 and 128.");
      }

    }

    this.send(
      (wm.MIDI_CHANNEL_VOICE_MESSAGES.programchange << 4) + (this.number - 1),
      [program - 1],
      wm.convertToTimestamp(options.time)
    );

    return this;

  }

  /**
   * Sets the specified MIDI registered parameter to the desired value. The value is defined with
   * up to two bytes of data (msb, lsb) that each can go from 0 to 127.
   *
   * MIDI
   * [registered parameters]
   * (https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
   * extend the original list of control change messages. The MIDI 1.0 specification lists only a
   * limited number of them. Here are the original registered parameters with the identifier that
   * can be used as the first parameter of this function:
   *
   *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
   *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
   *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
   *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
   *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
   *  * Modulation Range (0x00, 0x05): `"modulationrange"`
   *
   * Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
   * Standard*, which is not widely implemented.
   *
   * Another set of extra parameters have been later added for 3D sound controllers. They are:
   *
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
   * @param parameter {string|number[]} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the
   * registered parameter.
   *
   * @param [data=[]] {number|number[]} An single integer or an array of integers with a maximum
   * length of 2 specifying the desired data.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setRegisteredParameter(rpn, data, options = {}) {

    if (!Array.isArray(rpn)) rpn = wm.MIDI_REGISTERED_PARAMETER[rpn];

    if (wm.validation) {

      if (!Number.isInteger(rpn[0]) || !Number.isInteger(rpn[1])) {
        throw new TypeError("The specified NRPN is invalid.");
      }

      if (!(rpn[0] >= 0 && rpn[0] <= 127)) {
        throw new RangeError("The first byte of the RPN must be between 0 and 127.");
      }

      if (!(rpn[1] >= 0 && rpn[1] <= 127)) {
        throw new RangeError("The second byte of the RPN must be between 0 and 127.");
      }

      [].concat(data).forEach(value => {
        if (!(value >= 0 && value <= 127)) {
          throw new RangeError("The data bytes of the RPN must be between 0 and 127.");
        }
      });

    }

    this._selectRegisteredParameter(rpn, options);
    this._setCurrentParameter(data, options);
    this._deselectRegisteredParameter(options);

    return this;

  }

  /**
   * Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * **Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
   * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
   * that use a numbering scheme starting at 1.
   *
   * @param value {number} The desired tuning bank (1-128).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws {RangeError} The bank value must be between 1 and 128.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setTuningBank(value, options = {}) {

    if (wm.validation) {

      if (!Number.isInteger(value) || !(value >= 1 && value <= 128)) {
        throw new RangeError("The tuning bank number must be between 1 and 128.");
      }

    }

    this.setRegisteredParameter("tuningbank", value - 1, options);
    return this;

  }

  /**
   * Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * **Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
   * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
   * that use a numbering scheme starting at 1.
   *
   * @param value {number} The desired tuning program (1-128).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws {RangeError} The program value must be between 1 and 128.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setTuningProgram(value, options = {}) {

    if (wm.validation) {

      if (!Number.isInteger(value) || !(value >= 1 && value <= 128)) {
        throw new RangeError("The tuning program number must be between 1 and 128.");
      }

    }

    this.setRegisteredParameter("tuningprogram", value - 1, options);
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
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setLocalControl(state, options = {}) {
    if (state) {
      return this.sendChannelMode("localcontrol", 127, options);
    } else {
      return this.sendChannelMode("localcontrol", 0, options);
    }
  }

  /**
   * Sends an **all notes off** channel mode message. This will turn all currently playing notes
   * off. However, this does not prevent new notes from being played.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  turnNotesOff(options = {}) {
    return this.sendChannelMode("allnotesoff", 0, options);
  }

  /**
   * Sends an **all sound off** channel mode message. This will silence all sounds playing on that
   * channel but will not prevent new sounds from being triggered.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  turnSoundOff(options = {}) {
    return this.sendChannelMode("allsoundoff", 0, options);
  }

  /**
   * Sends a **reset all controllers** channel mode message. This resets all controllers, such as
   * the pitch bend, to their default value.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  resetAllControllers(options = {}) {
    return this.sendChannelMode("resetallcontrollers", 0, options);
  }

  /**
   * Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
   * and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
   * multiple notes are being played.
   *
   * @param {string} [mode=poly] The mode to use: `"mono"` or `"poly"`.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  setPolyphonicMode(mode, options = {}) {
    if (mode === "mono") {
      return this.sendChannelMode("monomodeon", 0, options);
    } else {
      return this.sendChannelMode("polymodeon", 0, options);
    }
  }

}

/**
 * The `Output` class represents a MIDI output port. This object is derived from the host's MIDI
 * subsystem and cannot be instantiated directly.
 *
 * You can find a list of all available `Output` objects in the
 * [WebMidi.outputs]{@link WebMidi#outputs} array.
 *
 * The `Output` class extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
 * [removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
 * [hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
 * others.
 *
 * @param {MIDIOutput} midiOutput `MIDIOutput` object as provided by the MIDI subsystem
 *
 * @fires Output#opened
 * @fires Output#disconnected
 * @fires Output#closed
 */
class Output extends e {

  constructor(midiOutput) {

    super();

    if (wm.validation) {

      if (!midiOutput || midiOutput.type !== "output") {
        throw new TypeError("The supplied MIDIOutput is invalid.");
      }

    }

    /**
     * A reference to the `MIDIOutput` object
     * @type {MIDIOutput}
     * @private
     */
    this._midiOutput = midiOutput;

    /**
     * Array containing the 16 {@link OutputChannel} objects available for this `Output`. The
     * channels are numbered 1 through 16.
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
    this._midiOutput.onstatechange = null;
    await this.close();
    this._midiOutput = null;
  }

  /**
   * @private
   */
  _onStateChange(e) {

    let event = {
      timestamp: wm.time
    };

    if (e.port.connection === "open") {

      /**
       * Event emitted when the {@link Output} has been opened by calling the
       * [open()]{@link Output#open} method.
       *
       * @event Output#opened
       * @type {Object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"opened"`
       * @property {Output} target The object that triggered the event
       */
      event.type = "opened";
      event.target = this;
      this.emit("opened", event);

    } else if (e.port.connection === "closed" && e.port.state === "connected") {

      /**
       * Event emitted when the {@link Output} has been closed by calling the
       * [close()]{@link Output#close} method.
       *
       * @event Output#closed
       * @type {Object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"closed"`
       * @property {Output} target The object that triggered the event
       */
      event.type = "closed";
      event.target = this;
      this.emit("closed", event);

    } else if (e.port.connection === "closed" && e.port.state === "disconnected") {

      /**
       * Event emitted when the {@link Output} becomes unavailable. This event is typically fired
       * when the MIDI device is unplugged.
       *
       * @event Output#disconnected
       * @type {Object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp0 when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"disconnected"`
       * @property {Object} target Object with properties describing the {@link Output} that
       * triggered the event. This is not the actual `Output` as it is no longer available.
       * @property {string} target.connection `"closed"`
       * @property {string} target.id ID of the input
       * @property {string} target.manufacturer Manufacturer of the device that provided the input
       * @property {string} target.name Name of the device that provided the input
       * @property {string} target.state `"disconnected"`
       * @property {string} target.type `"output"`
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

    } else if (e.port.connection === "pending" && e.port.state === "disconnected") ; else {
      console.warn("This statechange event was not caught:", e.port.connection, e.port.state);
    }

  }

  /**
   * Opens the output for usage.
   *
   * @returns {Promise<Output>} The promise is fulfilled with the `Output`
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
   * until the output is opened again by calling [Output.open()]{@link Output#open}. You can check
   * the connection status by looking at the [connection]{@link Output#connection} property.
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
   * Sends a MIDI message on the MIDI output port, at the scheduled timestamp. It is usually not
   * necessary to use this method directly since it is often simpler to use one of the helper
   * methods such as `playNote()`, `stopNote()`, `sendControlChange()`, etc.
   *
   * Details on the format of MIDI messages are available in the summary of
   * [MIDI messages]{@link https://www.midi.org/specifications/item/table-1-summary-of-midi-message}
   * from the MIDI Manufacturers Association.
   *
   * @param status {Number} The MIDI status byte of the message (integer between 128-255).
   *
   * @param [data=[]] {number[]} An array of unsigned integers for the message. The number of data
   * bytes varies depending on the status byte. It is perfectly legal to send no data for some
   * message types (use `undefined` or an empty array in this case). Each byte must be between 0 and
   * 255.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 0 is greater
   * than 0xFF.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 2 is greater
   * than 0xFF.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Running status is not allowed at
   * index 2.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Message is incomplete.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Reserved status is not allowed at
   * index 0.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': System exclusive message is not
   * allowed at index 0.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Unexpected end of system
   * exclusive message at index 0.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Unexpected status byte at index
   * 1.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': Unexpected status byte at index
   * 2.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  send(status, data = [], options= {}) {

    if (!Array.isArray(data)) data = [data];

    if (wm.validation) {

      if (!(parseInt(status) >= 128 && parseInt(status) <= 255)) {
        throw new RangeError("The status must be an integer between 128 and 255.");
      }

      data.forEach(value => {
        value = parseInt(value);
        if (isNaN(value)) throw new TypeError("Data bytes must be integers.");
        if (!(parseInt(value) >= 0 && parseInt(value) <= 255)) {
          throw new RangeError("The data bytes must be integers between 0 and 255.");
        }
      });

      // Legacy-compatibility
      if (typeof options === "number") options = {time: options};

    }

    // Actually send the message
    this._midiOutput.send([status].concat(data), wm.convertToTimestamp(options.time));

    return this;

  }

  /**
   * Sends a MIDI [system exclusive]{@link
    * https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages}
   * (*sysex*) message. The generated message will automatically be prepended with the *sysex byte*
   * (0xF0) and terminated with the *end of sysex byte* (0xF7).
   *
   * To use the `sendSysex()` method, system exclusive message support must have been enabled. To
   * do so, you must set the `sysex` option to `true` when calling `WebMidi.enable()`:
   *
   * ```js
   * WebMidi.enable({sysex: true})
   *   .then(() => console.log("System exclusive messages are enabled");
   * ```
   *
   * Note that, depending on browser, version and platform, it is generally necessary to serve the
   * page over HTTPS to enable sysex support.
   *
   * ##### Examples
   *
   * If you want to send a sysex message to a Korg device connected to the first output, you would
   * use the following code:
   *
   * ```js
   * WebMidi.outputs[0].sendSysex(0x42, [0x1, 0x2, 0x3, 0x4, 0x5]);
   * ```
   *
   * The parameters can be specified using any number notation (decimal, hex, binary, etc.).
   * Therefore, the code below is equivalent to the code above:
   *
   * ```js
   * WebMidi.outputs[0].sendSysex(66, [1, 2, 3, 4, 5]);
   * ```
   *
   * The above code sends the byte values 1, 2, 3, 4 and 5 to Korg devices (hex 42 is the same as
   * decimal 66).
   *
   * Some manufacturers are identified using 3 bytes. In this case, you would use a 3-position array
   * as the first parameter. For example, to send the same sysex message to a
   * *Native Instruments* device:
   *
   * ```js
   * WebMidi.outputs[0].sendSysex([0x00, 0x21, 0x09], [0x1, 0x2, 0x3, 0x4, 0x5]);
   * ```
   * There is no limit for the length of the data array. However, it is generally suggested to keep
   * system exclusive messages to 64Kb or less.
   *
   * @param manufacturer {number|number[]} An unsigned integer or an array of three unsigned
   * integers between 0 and 127 that identify the targeted manufacturer. The *MIDI Manufacturers
   * Association* maintains a full list of
   * [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers)
   * .
   *
   * @param [data=number[]] {Array} An array of unsigned integers between 0 and 127. This is the
   * data you wish to transfer.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {DOMException} Failed to execute 'send' on 'MIDIOutput': System exclusive message is
   * not allowed.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index x is greater
   * than 0xFF.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendSysex(manufacturer, data, options = {}) {

    manufacturer = [].concat(manufacturer);

    data = manufacturer.concat(data, wm.MIDI_SYSTEM_MESSAGES.sysexend);
    this.send(wm.MIDI_SYSTEM_MESSAGES.sysex, data, {time: options.time});

    return this;

  };

  /**
   * Clears all messages that have been queued but not yet delivered.
   *
   * Warning: this method has been defined in the specification but has not been implemented yet. As
   * soon as browsers implement it, it will work.
   *
   * You can check out the current status of this feature for Chromium (Chrome) here:
   * https://bugs.chromium.org/p/chromium/issues/detail?id=471798
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  clear() {

    if (this._midiOutput.clear) {

      this._midiOutput.clear();

    } else {

      if (wm.validation) {
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
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendTimecodeQuarterFrame(value, options = {}) {

    if (wm.validation) {
      value = parseInt(value);
      if (isNaN(value) || !(value >= 0 && value <= 127)) {
        throw new RangeError("The value must be an integer between 0 and 127.");
      }
    }

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.timecode,
      value,
      {time: options.time}
    );

    return this;

  };

  /**
   * Sends a **ong position** MIDI message. The value is expressed in MIDI beats (between 0 and
   * 16383) which are 16th note. Position 0 is always the start of the song.
   *
   * @param [value=0] {number} The MIDI beat to cue to (integer between 0 and 16383).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setSongPosition(value, options = {}) {

    value = Math.floor(value) || 0;

    var msb = (value >> 7) & 0x7F;
    var lsb = value & 0x7F;

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.songposition,
      [msb, lsb],
      {time: options.time}
    );
    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  sendSongPosition(value, options = {}) {

    if (wm.validation) {
      console.warn(
        "The sendSongPosition() method has been deprecated. Use setSongPosition() instead."
      );
    }

    return this.setSongPosition(value, options);

  }

  /**
   * Sends a **song select** MIDI message.
   *
   * **Note**: since version 3.0, the song number is an integer between 1 and 128. In versions 1.0
   * and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices that
   * use a numbering scheme starting at 1.
   *
   * @param value {number} The number of the song to select (integer between 1 and 128).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws The song number must be between 1 and 128.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setSong(value, options = {}) {

    if (wm.validation) {

      value = parseInt(value);

      if (isNaN(value) || !(value >= 1 && value <= 128)) {
        throw new RangeError("The program value must be between 1 and 128");
      }

    }

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.songselect,
      [value],
      {time: options.time}
    );

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  sendSongSelect(value, options = {}) {

    if (wm.validation) {
      console.warn(
        "The sendSongSelect() method has been deprecated. Use setSong() instead."
      );
    }

    return this.setSong(value, options);

  }

  /**
   * Sends a MIDI **tune request** real-time message.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  sendTuneRequest(options = {}) {

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.tunerequest,
      undefined,
      {time: options.time}
    );

    return this;

  }

  /**
   * Sends a MIDI **clock* real-time message. According to the standard, there are 24 MIDI Clocks
   * for every quarter note.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendClock(options = {}) {

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.clock,
      undefined,
      {time: options.time}
    );

    return this;

  }

  /**
   * Sends a **start** real-time message. A MIDI Start message starts the playback of the current
   * song at beat 0. To start playback elsewhere in the song, use the
   * [sendContinue()]{@link Output#sendContinue} method.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendStart(options = {}) {

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.start,
      undefined,
      {time: options.time}
    );

    return this;

  }

  /**
   * Sends a **continue** real-time message. This resumes song playback where it was previously
   * stopped or where it was last cued with a song position message. To start playback from the
   * start, use the [sendStart()]{@link Output#sendStart}` method.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {WebMidi} Returns the `WebMidi` object so methods can be chained.
   */
  sendContinue(options = {}) {

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.continue,
      undefined,
      {time: options.time}
    );

    return this;

  }

  /**
   * Sends a **stop** real-time message. This tells the device connected to this output to stop
   * playback immediately (or at the scheduled time).
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendStop(options = {}) {

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.stop,
      undefined,
      {time: options.time}
    );

    return this;

  }

  /**
   * Sends an **active sensing** real-time message. This tells the device connected to this port
   * that the connection is still good. Active sensing messages should be sent every 300 ms if there
   * was no other activity on the MIDI port.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendActiveSensing(options = {}) {

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.activesensing,
      [],
      {time: options.time}
    );

    return this;

  }

  /**
   * Sends a **reset** real-time message. This tells the device connected to this output that it
   * should reset itself to a default state.
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendReset(options = {}) {

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.reset,
      undefined,
      {time: options.time}
    );

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  sendTuningRequest(options = {}) {


    if (wm.validation) {
      console.warn(
        "The sendTuningRequest() method has been deprecated. Use sendTuningRequest() instead."
      );
    }

    return this.sendTuneRequest(options);

  }

  /**
   * Sends a MIDI **key aftertouch** message to the specified channel(s) at the scheduled time. This
   * is a key-specific aftertouch. For a channel-wide aftertouch message, use
   * [setChannelAftertouch()]{@link Output#setChannelAftertouch}.
   *
   * @param note {number|string|Array}  The note for which you are sending an aftertouch value. The
   * notes can be specified in one of two ways. The first way is by using the MIDI note number (an
   * integer between 0 and 127). The second way is by using the note name followed by the octave
   * (C3, G#4, F-1, Db7). The octave range should be between -1 and 9. The lowest note is C-1 (MIDI
   * note number 0) and the highest note is G9 (MIDI note number 127). It is also possible to use
   * an array of note names and/or numbers.
   *
   * @param [pressure=0.5] {number} The pressure level (between 0 and 1). An invalid pressure value
   * will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the
   * pressure can be defined by using an integer between 0 and 127.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setKeyAftertouch(note, pressure, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(pressure) || Number.isInteger(pressure) || pressure === "all") {
        let channels = pressure;
        pressure = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setKeyAftertouch(note, pressure, options);
    });

    return this;

  };

  /**
   * @private
   * @deprecated since version 3.0
   */
  sendKeyAftertouch(note, channel, pressure, options = {}) {

    if (wm.validation) {
      console.warn(
        "The sendKeyAftertouch() method has been deprecated. Use setKeyAftertouch() instead."
      );
    }

    options.channels = channel;
    return this.setKeyAftertouch(note, pressure, options);

  }

  /**
   * Sends a MIDI **control change** message to the specified channel(s) at the scheduled time. The
   * control change message to send can be specified numerically or by using one of the following
   * common names:
   *
   *  * `bankselectcoarse` (#0)
   *  * `modulationwheelcoarse` (#1)
   *  * `breathcontrollercoarse` (#2)
   *  * `footcontrollercoarse` (#4)
   *  * `portamentotimecoarse` (#5)
   *  * `dataentrycoarse` (#6)
   *  * `volumecoarse` (#7)
   *  * `balancecoarse` (#8)
   *  * `pancoarse` (#10)
   *  * `expressioncoarse` (#11)
   *  * `effectcontrol1coarse` (#12)
   *  * `effectcontrol2coarse` (#13)
   *  * `generalpurposeslider1` (#16)
   *  * `generalpurposeslider2` (#17)
   *  * `generalpurposeslider3` (#18)
   *  * `generalpurposeslider4` (#19)
   *  * `bankselectfine` (#32)
   *  * `modulationwheelfine` (#33)
   *  * `breathcontrollerfine` (#34)
   *  * `footcontrollerfine` (#36)
   *  * `portamentotimefine` (#37)
   *  * `dataentryfine` (#38)
   *  * `volumefine` (#39)
   *  * `balancefine` (#40)
   *  * `panfine` (#42)
   *  * `expressionfine` (#43)
   *  * `effectcontrol1fine` (#44)
   *  * `effectcontrol2fine` (#45)
   *  * `holdpedal` (#64)
   *  * `portamento` (#65)
   *  * `sustenutopedal` (#66)
   *  * `softpedal` (#67)
   *  * `legatopedal` (#68)
   *  * `hold2pedal` (#69)
   *  * `soundvariation` (#70)
   *  * `resonance` (#71)
   *  * `soundreleasetime` (#72)
   *  * `soundattacktime` (#73)
   *  * `brightness` (#74)
   *  * `soundcontrol6` (#75)
   *  * `soundcontrol7` (#76)
   *  * `soundcontrol8` (#77)
   *  * `soundcontrol9` (#78)
   *  * `soundcontrol10` (#79)
   *  * `generalpurposebutton1` (#80)
   *  * `generalpurposebutton2` (#81)
   *  * `generalpurposebutton3` (#82)
   *  * `generalpurposebutton4` (#83)
   *  * `reverblevel` (#91)
   *  * `tremololevel` (#92)
   *  * `choruslevel` (#93)
   *  * `celestelevel` (#94)
   *  * `phaserlevel` (#95)
   *  * `databuttonincrement` (#96)
   *  * `databuttondecrement` (#97)
   *  * `nonregisteredparametercoarse` (#98)
   *  * `nonregisteredparameterfine` (#99)
   *  * `registeredparametercoarse` (#100)
   *  * `registeredparameterfine` (#101)
   *
   * Note: as you can see above, not all control change message have a matching common name. This
   * does not mean you cannot use the others. It simply means you will need to use their number
   * instead of their name.
   *
   * To view a list of all available `control change` messages, please consult "Table 3 - Control
   * Change Messages" from the [MIDI Messages](
   * https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
   * specification.
   *
   * @param controller {number|string} The MIDI controller name or number (0-119).
   *
   * @param [value=0] {number} The value to send (0-127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {RangeError} Controller numbers must be between 0 and 119.
   * @throws {RangeError} Invalid controller name.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  sendControlChange(controller, value, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendControlChange(controller, value, options);
    });

    return this;

  };

  /**
   * Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
   * adjust the range used by their pitch bend lever. The range is specified by using the
   * `semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
   * means that the pitch bend range will be 12 semitones above and below the nominal pitch.
   *
   * @param semitones {number} The desired adjustment value in semitones (between 0 and 127). While
   * nothing imposes that in the specification, it is very common for manufacturers to limit the
   * range to 2 octaves (-12 semitones to 12 semitones).
   *
   * @param [cents=0] {number} The desired adjustment value in cents (integer between 0-127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The msb value must be between 0 and 127.
   * @throws {RangeError} The lsb value must be between 0 and 127.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setPitchBendRange(semitones, cents, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setPitchBendRange(semitones, cents, options);
    });

    return this;

  }

  /**
   * Sets the specified MIDI registered parameter to the desired value. The value is defined with
   * up to two bytes of data (msb, lsb) that each can go from 0 to 127.
   *
   * MIDI
   * [registered parameters]
   * (https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
   * extend the original list of control change messages. The MIDI 1.0 specification lists only a
   * limited number of them. Here are the original registered parameters with the identifier that
   * can be used as the first parameter of this function:
   *
   *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
   *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
   *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
   *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
   *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
   *  * Modulation Range (0x00, 0x05): `"modulationrange"`
   *
   * Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
   * Standard*, which is not widely implemented.
   *
   * Another set of extra parameters have been later added for 3D sound controllers. They are:
   *
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
   * @param parameter {string|number[]} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the
   * registered parameter.
   *
   * @param [data=[]] {number|number[]} A single integer or an array of integers with a maximum
   * length of 2 specifying the desired data.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  setRegisteredParameter(parameter, data, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setRegisteredParameter(parameter, data, options);
    });

    return this;

  }

  /**
   * Sends a MIDI **channel aftertouch** message to the specified channel(s). For key-specific
   * aftertouch, you should instead use [setKeyAftertouch()]{@link Output#setKeyAftertouch}.
   *
   * @param [pressure=0.5] {number} The pressure level (between 0 and 1). An invalid pressure value
   * will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the
   * pressure can be defined by using an integer between 0 and 127.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   * @since 3.0.0
   */
  setChannelAftertouch(pressure, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";
    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setChannelAftertouch(pressure, options);
    });

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  sendChannelAftertouch(pressure, channel, options = {}) {

    if (wm.validation) {
      console.warn(
        "The sendChannelAftertouch() method has been deprecated. Use setChannelAftertouch()."
      );
    }

    options.channels = channel;
    return this.setChannelAftertouch(pressure, options);

  }

  /**
   * Sends a MIDI **pitch bend** message to the specified channel(s) at the scheduled time.
   *
   * @param {number|number[]} value The intensity of the bend (between -1.0 and 1.0). A value of
   * zero means no bend. The resulting bend is relative to the pitch bend range that has been
   * defined. The range can be set with [setPitchBendRange()]{@link OutputChannel#setPitchBendRange}
   * . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of
   * -1 will bend the note 1 octave below its nominal value.
   *
   * If an invalid value is specified, the nearest valid value will be used instead.
   *
   * If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either
   * using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127
   * representing, respectively, the MSB (most significant byte) and the LSB (least significant
   * byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64`
   * bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents
   * (1/100 of a semitone). An LSB of `64` also means no bend.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
   * considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or
   * an array of 2 integers if using both MSB and LSB).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setPitchBend(value, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setPitchBend(value, options);
    });

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  sendPitchBend(bend, channel, options = {}) {

    if (wm.validation) {
      console.warn(
        "The sendPitchBend() method has been deprecated. Use setPitchBend() instead."
      );
    }

    options.channels = channel;
    return this.setPitchBend(bend, options);

  }

  /**
   * Sends a MIDI **program change** message to the specified channel(s) at the scheduled time.
   *
   * **Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
   * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
   * that use a numbering scheme starting at 1.
   *
   * @param [program=1] {number} The MIDI patch (program) number (1-128)
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
   * than 0xFF.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setProgram(program, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setProgram(program, options);
    });

    return this;

  }

  /**
   * @private
   * @deprecated since version 3.0
   */
  sendProgramChange(program, channel, options = {}) {

    if (wm.validation) {
      console.warn(
        "The sendProgramChange() method has been deprecated. Use setProgram() instead."
      );
    }

    options.channels = channel;
    return this.setProgram(program, options);

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
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The msb value must be between 0 and 127
   * @throws {RangeError} The lsb value must be between 0 and 127
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setModulationRange(semitones, cents, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setModulationRange(semitones, cents, options);
    });

    return this;

  };

  /**
   * Sends a master tuning message to the specified channel(s). The value is decimal and must be
   * larger than -65 semitones and smaller than 64 semitones.
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
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The value must be a decimal number between larger than -65 and smaller
   * than 64.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setMasterTuning(value, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setMasterTuning(value, options);
    });

    return this;

  }

  /**
   * Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * **Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
   * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
   * that use a numbering scheme starting at 1.
   *
   * @param value {number} The desired tuning program (1-128).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The program value must be between 1 and 128.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setTuningProgram(value, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setTuningProgram(value, options);
    });

    return this;

  }

  /**
   * Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * **Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
   * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
   * that use a numbering scheme starting at 1.
   *
   * @param value {number} The desired tuning bank (1-128).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The bank value must be between 1 and 128.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setTuningBank(value, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setTuningBank(value, options);
    });

    return this;

  };

  /**
   * Sends a MIDI **channel mode** message to the specified channel(s). The channel mode message to
   * send can be specified numerically or by using one of the following common names:
   *
   *   * `"allsoundoff"` (#120)
   *   * `"resetallcontrollers"` (#121)
   *   * `"localcontrol"` (#122)
   *   * `"allnotesoff"` (#123)
   *   * `"omnimodeoff"` (#124)
   *   * `"omnimodeon"` (#125)
   *   * `"monomodeon"` (#126)
   *   * `"polymodeon"` (#127)
   *
   * It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may
   * require a value that's not zero. For that reason, the `value` parameter is optional and
   * defaults to 0.
   *
   * To make it easier, all channel mode messages have a matching helper method:
   *
   *   - [turnSoundOff()]{@link OutputChannel#turnSoundOff}
   *   - [resetAllControllers()]{@link OutputChannel#resetAllControllers}
   *   - [setLocalControl()]{@link OutputChannel#turnSoundOff}
   *   - [turnNotesOff()]{@link OutputChannel#turnNotesOff}
   *   - [setOmniMode()]{@link OutputChannel#setOmniMode}
   *   - [setPolyphonicMode()]{@link OutputChannel#setPolyphonicMode}
   *
   * @param command {number|string} The numerical identifier of the channel mode message (integer
   * between 120-127) or its name as a string.
   *
   * @param [value] {number} The value to send (integer between 0-127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {TypeError} Invalid channel mode message name.
   * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
   * @throws {RangeError} Value must be an integer between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   */
  sendChannelMode(command, value, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
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
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output}
   *
   * @since 3.0.0
   */
  turnSoundOff(options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].turnSoundOff(options);
    });

    return this;

  }

  /**
   * Sends an **all note soff** channel mode message. This will turn all currently playing notes
   * off. However, this does not prevent new notes from being played.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output}
   *
   * @since 3.0.0
   */
  turnNotesOff(options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].turnNotesOff(options);
    });

    return this;

  }

  /**
   * Sends a **reset all controllers** channel mode message. This resets all controllers, such as
   * the pitch bend, to their default value.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output}
   */
  resetAllControllers(options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].resetAllControllers(options);
    });

    return this;

  }

  /**
   * Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
   * and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
   * multiple notes are being played.
   *
   * @param mode {string} The mode to use: `"mono"` or `"poly"`.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setPolyphonicMode(mode, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setPolyphonicMode(mode, options);
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
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setLocalControl(state, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setLocalControl(state, options);
    });

    return this;

  }

  /**
   * Sets OMNI mode to `"on"` or `"off"` for the specified channel(s). MIDI's OMNI mode causes the
   * instrument to respond to messages from all channels.
   *
   * It should be noted that support for OMNI mode is not as common as it used to be.
   *
   * @param [state] {boolean} Whether to activate OMNI mode (`true`) or not (`false`).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {TypeError} Invalid channel mode message name.
   * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
   * @throws {RangeError} Value must be an integer between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   * @since 3.0.0
   */
  setOmniMode(state, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setOmniMode(state, options);
    });

    return this;

  }

  /**
   * Sets a non-registered parameter to the specified value. The NRPN is selected by passing in a
   * two-position array specifying the values of the two control bytes. The value is specified by
   * passing in a single integer (most cases) or an array of two integers.
   *
   * NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
   * they see fit. For example, according to the Roland GS specification, you can control the
   * **vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
   * would use:
   *
   * ```js
   * WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123);
   * ```
   *
   * Obviously, you should select a channel so the message is not sent to all channels. For
   * instance, to send to channel 1 of the first output port, you would use:
   *
   * ```js
   * WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123, 1);
   * ```
   *
   * In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
   * would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
   * uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
   * value to send was 10, you could use:
   *
   * ```js
   * WebMidi.outputs[0].setNonRegisteredParameter([2, 63], [0, 10], [1]);
   * ```
   *
   * For further implementation details, refer to the manufacturer"s documentation.
   *
   * @param parameter {number[]} A two-position array specifying the two control bytes (0x63,
   * 0x62) that identify the non-registered parameter.
   *
   * @param [data=[]] {number|number[]} An integer or an array of integers with a length of 1 or 2
   * specifying the desired data.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws {RangeError} The control value must be between 0 and 127.
   * @throws {RangeError} The msb value must be between 0 and 127
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  setNonRegisteredParameter(parameter, data, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].setNonRegisteredParameter(parameter, data, options);
    });

    return this;

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
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  incrementRegisteredParameter(parameter, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].incrementRegisteredParameter(parameter, options);
    });

    return this;

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
   * @param parameter {String|number[]} A string identifying the parameter"s name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @throws TypeError The specified parameter is not available.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  decrementRegisteredParameter(parameter, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].decrementRegisteredParameter(parameter, options);
    });

    return this;

  }

  /**
   * Sends a **note off** message for the specified notes on the specified channel(s). The first
   * parameter is the note. It can be a single value or an array of the following valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A {@link Note} object
   *
   *  The execution of the **note off** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * When using {@link Note} objects, the release velocity defined in the {@link Note} objects has
   * precedence over the one specified via the method's `options` parameter.
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to stop. The notes can be
   * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
   * {@link Note} object or an array of the previous types. When using a note name, octave range
   * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
   * note is G9 (MIDI note number 127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {boolean} [options.rawValue=false] Controls whether the release velocity is set using
   * integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`,
   * default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @param {number} [options.release=0.5] The velocity at which to release the note (between `0`
   * and `1`). If the `rawValue` option is `true`, the value should be specified as an integer
   * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendNoteOff(note, options= {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendNoteOff(note, options);
    });

    return this;

  }

  /**
   * This is an alias to the [sendNoteOff()]{@link Output#sendNoteOff} method.
   *
   * @see {@link Output#sendNoteOff}
   *
   * @param note
   * @param options
   * @returns {Output}
   */
  stopNote(note, options) {
    return this.sendNoteOff(note, options);
  }

  /**
   * Plays a note or an array of notes on one or more channels of this output. The first parameter
   * is the note to play. It can be a single value or an array of the following valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A {@link Note} object
   *
   * The `playNote()` method sends a **note on** MIDI message for all specified notes on all
   * specified channels. If no channels are specified, it will send to all channels. If a `duration`
   * is set in the `options` parameter or in the {@link Note} object's
   * [duration]{@link Note#duration} property, it will also schedule a **note off** message to end
   * the note after said duration. If no `duration` is set, the note will simply play until a
   * matching **note off** message is sent with [stopNote()]{@link Output#stopNote} or
   * [sendNoteOff()]{@link Output#sendNoteOff}.
   *
   * The execution of the **note on** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * When using {@link Note} objects, the durations and velocities defined in the {@link Note}
   * objects have precedence over the ones specified via the method's `options` parameter.
   *
   * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
   * functionally equivalent to a **note off** message.
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
   * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
   * {@link Note} object or an array of the previous types. When using a note name, octave range
   * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
   * note is G9 (MIDI note number 127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to play the note on. The special value `"all"` can
   * also be used to use all channels (default).
   *
   * @param {number} [options.duration=undefined] The number of milliseconds (integer) after which a
   * **note off** message will be scheduled. If left undefined, only a **note on** message is sent.
   *
   * @param {boolean} [options.rawValue=false] Controls whether the attack and release velocities
   * are set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1`
   * (`false`, default).
   *
   * @param {number} [options.release=0.5] The velocity at which to release the note (between `0`
   * and `1`). If the `rawValue` option is `true`, the value should be specified as an integer
   * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
   * This is only used with the **note off** event triggered when `options.duration` is set.
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @param {number} [options.attack=0.5] The attack velocity to use when playing the note (between
   * `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer
   * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  playNote(note, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy-compatibility warnings
      if (options.rawVelocity) {
        console.warn("The 'rawVelocity' option is deprecated. Use 'rawAttack' instead.");
      }

      if (options.velocity) {
        console.warn("The 'velocity' option is deprecated. Use 'velocity' instead.");
      }

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].playNote(note, options);
    });

    return this;

  }

  /**
   * Sends a **note on** message for the specified notes on the specified channel(s). The first
   * parameter is the note. It can be a single value or an array of the following valid values:
   *
   *  - A MIDI note number (integer between `0` and `127`)
   *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
   *  - A {@link Note} object
   *
   *  The execution of the **note on** command can be delayed by using the `time` property of the
   * `options` parameter.
   *
   * When using {@link Note} objects, the attack velocity defined in the {@link Note} objects has
   * precedence over the one specified via the method's `options` parameter. Also, the `duration` is
   * ignored. If you want to also send a **note off** message, use the
   * [playNote()]{@link Output#playNote} method instead.
   *
   * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
   * functionally equivalent to a **note off** message.
   *
   * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
   * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
   * {@link Note} object or an array of the previous types. When using a note name, octave range
   * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
   * note is G9 (MIDI note number 127).
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
   * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
   * use all channels (default).
   *
   * @param {boolean} [options.rawValue=false] Controls whether the attack velocity is set using
   * integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`,
   * default).
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number
   * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
   * in the past, the operation will be carried out as soon as possible.
   *
   * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
   * `1`). If the `rawValue` option is `true`, the value should be specified as an integer
   * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  sendNoteOn(note, options = {}, legacy = {}) {

    if (wm.validation) {

      // Legacy compatibility
      if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
        let channels = options;
        options = legacy;
        options.channels = channels;
      }

    }

    if (options.channels == undefined) options.channels = "all";

    wm.sanitizeChannels(options.channels).forEach(ch => {
      this.channels[ch].sendNoteOn(note, options);
    });

    return this;

  }

  /**
   * Name of the MIDI output
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
   * Output port's connection state: `"pending"`, `"open"` or `"closed"`.
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
   * State of the output port: `"connected"` or `"disconnected"`.
   *
   * @type {string}
   * @readonly
   */
  get state() {
    return this._midiOutput.state;
  }

  /**
   * Type of the output port (`"output"`)
   *
   * @type {string}
   * @readonly
   */
  get type() {
    return this._midiOutput.type;
  }

}

/**
 * The `Note` class represents a single note to be played. The `Note` can be played on a single
 * channel by using [OutputChannel.playNote()]{@link OutputChannel#playNote} or on multiple
 * channels at once by using [Output.playNote()]{@link Output#playNote}.
 *
 * If the note's `duration` property is set, the note will be stopped at the end of the duration. If
 * no duration is set, it will play until it is explicitly stopped using
 * [OutputChannel.stopNote()]{@link OutputChannel#stopNote} or
 * [Output.stopNote()]{@link Output#stopNote}.
 *
 * @param value {string|number} The name or note number of the note to create. If a number is used,
 * it must be an integer between 0 and 127. If a string is used, it must be the note name followed
 * by the octave (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). The octave range must be between -1 and
 * 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).
 *
 * @param {Object} [options={}]
 *
 * @param {number} [options.duration=Infinity] The number of milliseconds before the note should be
 * explicitly stopped.
 *
 * @param {number} [options.attack=0.5] The note's attack velocity as a decimal number between 0 and
 * 1.
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
 * @throws {Error} Invalid note name.
 * @throws {Error} Invalid note number.
 * @throws {RangeError} Invalid duration.
 * @throws {RangeError} Invalid attack value.
 * @throws {RangeError} Invalid rawAttack value.
 * @throws {RangeError} Invalid release value.
 * @throws {RangeError} Invalid rawRelease value.
 *
 * @since 3.0.0
 */
class Note {

  constructor(value, options = {}) {

    if (Number.isInteger(value)) {
      this.number = value;
    } else {
      this.name = value;
    }

    this.duration = (options.duration == undefined) ? Infinity : options.duration;
    this.attack = (options.attack == undefined) ? 0.5 : options.attack;
    this.release = (options.release == undefined) ? 0.5 : options.release;
    if (options.rawAttack != undefined) this.rawAttack = options.rawAttack;
    if (options.rawRelease != undefined) this.rawRelease = options.rawRelease;

  }

  /**
   * The name of the note with the octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.)
   *
   * @type {string}
   */
  get name() {
    return wm.NOTES[this._number % 12] + wm.getOctave(this.number);
  }
  set name(value) {

    if (wm.validation) {
      if (wm.guessNoteNumber(value) === false) throw new Error("Invalid note name.");
    }

    this._number = wm.guessNoteNumber(value);

  }

  /**
   * The MIDI note number as an integer between 0 and 127
   * @type {number}
   */
  get number() {
    return this._number;
  }
  set number(value) {

    if (wm.validation) {
      if (wm.guessNoteNumber(value) === false) throw new Error("Invalid note number.");
    }

    this._number = wm.guessNoteNumber(value);

  }

  /**
   * The duration of the note as a positive decimal number representing the number of milliseconds
   * that the note should play for.
   *
   * @type {number}
   */
  get duration() {
    return this._duration;
  }
  set duration(value) {

    if (wm.validation) {
      value = parseFloat(value);
      if (isNaN(value) || value === null || value < 0) throw new RangeError("Invalid duration.");
    }

    this._duration = value;

  }

  /**
   * The attack velocity of the note as a decimal number between 0 and 1.
   * @type {number}
   */
  get attack() {
    return this._rawAttack / 127;
  }
  set attack(value) {

    if (wm.validation) {
      value = parseFloat(value);
      if (isNaN(value) || value === null || !(value >= 0 && value <= 1)) {
        throw new RangeError("Invalid attack value.");
      }
    }

    this._rawAttack = Math.round(value * 127);

  }

  /**
   * The raw attack velocity of the note as an integer between 0 and 127.
   * @type {number}
   */
  get rawAttack() {
    return this._rawAttack;
  }
  set rawAttack(value) {

    if (wm.validation) {
      value = parseFloat(value);
      if (isNaN(value) || value === null || !(value >= 0 && value <= 127)) {
        throw new RangeError("Invalid rawAttack value.");
      }
    }

    this._rawAttack = value;

  }

  /**
   * The release velocity of the note as a decimal number between 0 and 1.
   * @type {number}
   */
  get release() {
    return this._rawRelease / 127;
  }
  set release(value) {

    if (wm.validation) {
      value = parseFloat(value);
      if (isNaN(value) || value === null || !(value >= 0 && value <= 1)) {
        throw new RangeError("Invalid release value.");
      }
    }

    this._rawRelease = Math.round(value * 127);

  }

  /**
   * The raw release velocity of the note as an integer between 0 and 127.
   * @type {number}
   */
  get rawRelease() {
    return this._rawRelease;
  }
  set rawRelease(value) {

    if (wm.validation) {
      value = parseFloat(value);
      if (isNaN(value) || value === null || !(value >= 0 && value <= 127)) {
        throw new RangeError("Invalid rawRelease value.");
      }
    }

    this._rawRelease = value;

  }

  /**
   * The octave of the note as an integer between -1 and 9.
   * @type {number}
   */
  get octave() {
    return Math.floor(Math.floor(this._number) / 12 - 1);
  }

}

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
class WebMidi extends e {

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

    this._octaveOffset = 0;

    // If we are inside Node.js, polyfill navigator.requestMIDIAccess() and import performance.now()
    if (this.isNode) {

      // Important: performance must be imported before jzz because jzz checks for its existence at
      // startup and falls back to something less precise if absent.
      global.performance = require("perf_hooks").performance;
      global.navigator = require("jzz");

    }

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
    // fired). Therefore, we wait a little while to give it time to load.
    if (!this.supported) {

      await new Promise((resolve, reject) => {

        const start = this.time;

        const intervalID = setInterval(() => {

          if (this.supported) {
            clearInterval(intervalID);
            resolve();
          } else {
            if (this.time > start + 1500) {
              clearInterval(intervalID);
              let error = new Error("Web MIDI API support is not available in your environment.");
              if (typeof options.callback === "function") options.callback(error);
              reject(error);
            }
          }

        }, 25);

      });

    }

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

    if (!this.supported) throw new Error("The Web MIDI API is not supported by your environment.");

    return this._destroyInputsAndOutputs().then(() => {

      if (this.isNode) navigator.close();

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

      // Finally, trigger the 'disabled' event and remove all listeners
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
   * Indicates whether the current environment is Node.js or not
   * @type {boolean}
   */
  get isNode() {

    return (Object.prototype.toString.call(
      typeof process !== "undefined" ? process : 0
    ) === "[object process]");

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
    return (navigator && navigator.requestMIDIAccess) ? true : false;
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

export { Note, wm as WebMidi };
