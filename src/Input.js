/**
 * Input class...
 */
export class Input {

  constructor() {

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



// /**
//  * The `Input` object represents a MIDI input port on the host system. This object is created by
//  * the MIDI subsystem and cannot be instantiated directly.
//  *
//  * You will find all available `Input` objects in the `WebMidi.inputs` array.
//  *
//  * @class Input
//  * @param {MIDIInput} midiInput `MIDIInput` object
//  */
// function Input(midiInput) {
//
//   var that = this;
//
//   // User-defined handlers list
//   this._userHandlers = { channel: {}, system: {} };
//
//   // Reference to the actual MIDIInput object
//   this._midiInput = midiInput;
//
//   Object.defineProperties(this, {
//
//     /**
//      * [read-only] Status of the MIDI port"s connection (`pending`, `open` or `closed`)
//      *
//      * @property connection
//      * @type String
//      */
//     connection: {
//       enumerable: true,
//       get: function () {
//         return that._midiInput.connection;
//       }
//     },
//
//     /**
//      * [read-only] ID string of the MIDI port. The ID is host-specific. Do not expect the same ID
//      * on different platforms. For example, Google Chrome and the Jazz-Plugin report completely
//      * different IDs for the same port.
//      *
//      * @property id
//      * @type String
//      */
//     id: {
//       enumerable: true,
//       get: function () {
//         return that._midiInput.id;
//       }
//     },
//
//     /**
//      * [read-only] Name of the manufacturer of the device that makes this port available.
//      *
//      * @property manufacturer
//      * @type String
//      */
//     manufacturer: {
//       enumerable: true,
//       get: function () {
//         return that._midiInput.manufacturer;
//       }
//     },
//
//     /**
//      * [read-only] Name of the MIDI port
//      *
//      * @property name
//      * @type String
//      */
//     name: {
//       enumerable: true,
//       get: function () {
//         return that._midiInput.name;
//       }
//     },
//
//     /**
//      * [read-only] State of the MIDI port (`connected` or `disconnected`)
//      *
//      * @property state
//      * @type String
//      */
//     state: {
//       enumerable: true,
//       get: function () {
//         return that._midiInput.state;
//       }
//     },
//
//     /**
//      * [read-only] Type of the MIDI port (`input`)
//      *
//      * @property type
//      * @type String
//      */
//     type: {
//       enumerable: true,
//       get: function () {
//         return that._midiInput.type;
//       }
//     }
//
//   });
//
//   this._initializeUserHandlers();
//   this._midiInput.onmidimessage = this._onMidiMessage.bind(this);
//
// }
//
// /**
//  * Adds an event listener to the `Input` that will trigger a function callback when the specified
//  * event happens. The events that are dispatched can be channel-specific or Input-wide.
//  *
//  * Here is a list of events that are dispatched by `Input` objects and that can be listened to.
//  *
//  * Channel-specific MIDI events:
//  *
//  *    * {{#crossLink "Input/noteoff:event"}}noteoff{{/crossLink}}
//  *    * {{#crossLink "Input/noteon:event"}}noteon{{/crossLink}}
//  *    * {{#crossLink "Input/keyaftertouch:event"}}keyaftertouch{{/crossLink}}
//  *    * {{#crossLink "Input/controlchange:event"}}controlchange{{/crossLink}}
//  *    * {{#crossLink "Input/nrpn:event"}}nrpn{{/crossLink}}
//  *    * {{#crossLink "Input/channelmode:event"}}channelmode{{/crossLink}}
//  *    * {{#crossLink "Input/programchange:event"}}programchange{{/crossLink}}
//  *    * {{#crossLink "Input/channelaftertouch:event"}}channelaftertouch{{/crossLink}}
//  *    * {{#crossLink "Input/pitchbend:event"}}pitchbend{{/crossLink}}
//  *
//  * Input-wide MIDI events:
//  *
//  *    * {{#crossLink "Input/sysex:event"}}sysex{{/crossLink}}
//  *    * {{#crossLink "Input/timecode:event"}}timecode{{/crossLink}}
//  *    * {{#crossLink "Input/songposition:event"}}songposition{{/crossLink}}
//  *    * {{#crossLink "Input/songselect:event"}}songselect{{/crossLink}}
//  *    * {{#crossLink "Input/tuningrequest:event"}}tuningrequest{{/crossLink}}
//  *    * {{#crossLink "Input/clock:event"}}clock{{/crossLink}}
//  *    * {{#crossLink "Input/start:event"}}start{{/crossLink}}
//  *    * {{#crossLink "Input/continue:event"}}continue{{/crossLink}}
//  *    * {{#crossLink "Input/stop:event"}}stop{{/crossLink}}
//  *    * {{#crossLink "Input/activesensing:event"}}activesensing{{/crossLink}}
//  *    * {{#crossLink "Input/reset:event"}}reset{{/crossLink}}
//  *    * {{#crossLink "Input/midimessage:event"}}midimessage{{/crossLink}}
//  *    * {{#crossLink "Input/unknownsystemmessage:event"}}unknownsystemmessage{{/crossLink}}
//  *
//  * For device-wide events, the `channel` parameter will be silently ignored. You can simply use
//  * `undefined` in that case.
//  *
//  * If you want to view all incoming MIDI traffic, you can listen to the input-wide `midimessage`
//  * event. This event is dispatched for every single message that is received on that input.
//  *
//  * @method addListener
//  * @chainable
//  *
//  * @param type {String} The type of the event.
//  *
//  * @param channel {Number|Array|String} The MIDI channel to listen on (integer between 1 and 16).
//  * You can also specify an array of channel numbers or the value "all" (or leave it undefined for
//  * input-wide events).
//  *
//  * @param listener {Function} A callback function to execute when the specified event is detected.
//  * This function will receive an event parameter object. For details on this object"s properties,
//  * check out the documentation for the various events (links above).
//  *
//  * @throws {RangeError} The "channel" parameter is invalid.
//  * @throws {TypeError} The "listener" parameter must be a function.
//  * @throws {TypeError} The specified event type is not supported.
//  *
//  * @return {WebMidi} Returns the `WebMidi` object so methods can be chained.
//  */
// Input.prototype.addListener = function(type, channel, listener) {
//
//   var that = this;
//
//   if (channel === undefined) { channel = "all"; }
//   if (!Array.isArray(channel)) { channel = [channel]; }
//
//   // Check if channel entries are valid
//   channel.forEach(function(item){
//     if (item !== "all" && !(item >= 1 && item <= 16)) {
//       throw new RangeError(
//         "The 'channel' parameter is invalid."
//       );
//     }
//   });
//
//   if (typeof listener !== "function") {
//     throw new TypeError("The 'listener' parameter must be a function.");
//   }
//
//   if (WebMidi.MIDI_SYSTEM_MESSAGES[type] !== undefined) {
//
//     if (!this._userHandlers.system[type]) this._userHandlers.system[type] = [];
//     this._userHandlers.system[type].push(listener);
//
//   } else if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[type] !== undefined) {
//
//     // If "all" is present anywhere in the channel array, use all 16 channels
//     if (channel.indexOf("all") > -1) {
//       channel = [];
//       for (var j = 1; j <= 16; j++) { channel.push(j); }
//     }
//
//     if (!this._userHandlers.channel[type]) { this._userHandlers.channel[type] = []; }
//
//     // Push all channel listeners in the array
//     channel.forEach(function(ch){
//
//       if (!that._userHandlers.channel[type][ch]) {
//         that._userHandlers.channel[type][ch] = [];
//       }
//
//       that._userHandlers.channel[type][ch].push(listener);
//
//     });
//
//   } else {
//     throw new TypeError("The specified event type is not supported.");
//   }
//
//   return this;
//
// };
//
// /**
//  * This is an alias to the {{#crossLink "Input/addListener"}}Input.addListener(){{/crossLink}}
//  * function.
//  *
//  * @method on
//  * @since 2.0.0
//  */
// Input.prototype.on = Input.prototype.addListener;
//
// /**
//  * Checks if the specified event type is already defined to trigger the listener function on the
//  * specified channel(s). If more than one channel is specified, the function will return `true`
//  * only if all channels have the listener defined.
//  *
//  * For device-wide events (`sysex`, `start`, etc.), the `channel` parameter is silently ignored.
//  * We suggest you use `undefined` in such cases.
//  *
//  * @method hasListener
//  *
//  * @param type {String} The type of the event.
//  * @param channel {Number|Array|String} The MIDI channel to check on (between 1 and 16). You
//  * can also specify an array of channel numbers or the string "all".
//  * @param listener {Function} The callback function to check for.
//  *
//  * @throws {TypeError} The "listener" parameter must be a function.
//  *
//  * @return {Boolean} Boolean value indicating whether or not the channel(s) already have this
//  * listener defined.
//  */
// Input.prototype.hasListener = function(type, channel, listener) {
//
//   var that = this;
//
//   if (typeof listener !== "function") {
//     throw new TypeError("The 'listener' parameter must be a function.");
//   }
//
//   if (channel === undefined) { channel = "all"; }
//   if (channel.constructor !== Array) { channel = [channel]; }
//
//   if (WebMidi.MIDI_SYSTEM_MESSAGES[type] !== undefined) {
//
//     for (var o = 0; o < this._userHandlers.system[type].length; o++) {
//       if (this._userHandlers.system[type][o] === listener) { return true; }
//     }
//
//   } else if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[type] !== undefined) {
//
//     // If "all" is present anywhere in the channel array, use all 16 channels
//     if (channel.indexOf("all") > -1) {
//       channel = [];
//       for (var j = 1; j <= 16; j++) { channel.push(j); }
//     }
//
//     if (!this._userHandlers.channel[type]) { return false; }
//
//     // Go through all specified channels
//     return channel.every(function(chNum) {
//       var listeners = that._userHandlers.channel[type][chNum];
//       return listeners && listeners.indexOf(listener) > -1;
//     });
//
//   }
//
//   return false;
//
// };
//
// /**
//  * Removes the specified listener from the specified channel(s). If the `listener` parameter is
//  * left undefined, all listeners for the specified `type` will be removed from all channels. If
//  * the `channel` is also omitted, all listeners of the specified type will be removed from all
//  * channels. If no parameters are defined, all listeners attached to any channel of the `Input`
//  * will be removed.
//  *
//  * For device-wide events (`sysex`, `start`, etc.), the `channel` parameter is silently ignored.
//  * You can use `undefined` in such cases.
//  *
//  * @method removeListener
//  * @chainable
//  *
//  * @param [type] {String} The type of the event.
//  * @param [channel] {Number|String|Array} The MIDI channel(s) to check on. It can be a uint
//  * (between 1 and 16) an array of channel numbers or the special value "all".
//  * @param [listener] {Function} The callback function to check for.
//  *
//  * @throws {TypeError} The specified event type is not supported.
//  * @throws {TypeError} The "listener" parameter must be a function..
//  *
//  * @return {Input} The `Input` object for easy method chaining.
//  */
// Input.prototype.removeListener = function(type, channel, listener) {
//
//   var that = this;
//
//   if (listener !== undefined && typeof listener !== "function") {
//     throw new TypeError("The 'listener' parameter must be a function.");
//   }
//
//   if (channel === undefined) { channel = "all"; }
//   if (channel.constructor !== Array) { channel = [channel]; }
//
//   if (WebMidi.MIDI_SYSTEM_MESSAGES[type] !== undefined) {
//
//     if (listener === undefined) {
//
//       this._userHandlers.system[type] = [];
//
//     } else {
//
//       for (var o = 0; o < this._userHandlers.system[type].length; o++) {
//         if (this._userHandlers.system[type][o] === listener) {
//           this._userHandlers.system[type].splice(o, 1);
//         }
//       }
//
//     }
//
//   } else if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[type] !== undefined) {
//
//     // If "all" is present anywhere in the channel array, use all 16 channels
//     if (channel.indexOf("all") > -1) {
//       channel = [];
//       for (var j = 1; j <= 16; j++) { channel.push(j); }
//     }
//
//     if (!this._userHandlers.channel[type]) { return this; }
//
//     // Go through all specified channels
//     channel.forEach(function(chNum) {
//       var listeners = that._userHandlers.channel[type][chNum];
//       if (!listeners) { return; }
//
//       if (listener === undefined) {
//         that._userHandlers.channel[type][chNum] = [];
//       } else {
//         for (var l = 0; l < listeners.length; l++) {
//           if (listeners[l] === listener) { listeners.splice(l, 1); }
//         }
//       }
//
//     });
//
//   } else if (type === undefined) {
//     this._initializeUserHandlers();
//   } else {
//     throw new TypeError("The specified event type is not supported.");
//   }
//
//   return this;
//
// };
//
// /**
//  * @method _initializeUserHandlers
//  * @protected
//  */
// Input.prototype._initializeUserHandlers = function() {
//
//   for (var prop1 in WebMidi.MIDI_CHANNEL_VOICE_MESSAGES) {
//     if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.hasOwnProperty(prop1)) {
//       this._userHandlers.channel[prop1] = {};
//     }
//   }
//
//   for (var prop2 in WebMidi.MIDI_SYSTEM_MESSAGES) {
//     if (WebMidi.MIDI_SYSTEM_MESSAGES.hasOwnProperty(prop2)) {
//       this._userHandlers.system[prop2] = [];
//     }
//   }
//
// };
//
// /**
//  * @method _onMidiMessage
//  * @protected
//  */
// Input.prototype._onMidiMessage = function(e) {
//
//   // Execute "midimessage" listeners (if any)
//   if (this._userHandlers.system["midimessage"].length > 0) {
//
//     var event = {
//       target: this,
//       data: e.data,
//       timestamp: e.timeStamp,
//       type: "midimessage"
//     };
//
//     /**
//      * Event emitted when a MIDI message is received. This should be used primarily for debugging
//      * purposes.
//      *
//      * @event midimessage
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
//      * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)).
//      * @param {String} event.type The type of event that occurred.
//      * @since 2.1
//      */
//     this._userHandlers.system["midimessage"].forEach(
//       function(callback) { callback(event); }
//     );
//
//   }
//
//   if (e.data[0] < 240) {          // channel-specific message
//     this._parseChannelEvent(e);
//     this._parseNrpnEvent(e);
//   } else if (e.data[0] <= 255) {  // system message
//     this._parseSystemEvent(e);
//   }
//
// };
//
// /**
//  * Parses channel events and constructs NRPN message parts in valid sequences.
//  * Keeps a separate NRPN buffer for each channel.
//  * Emits an event after it receives the final CC parts msb 127 lsb 127.
//  * If a message is incomplete and other messages are received before
//  * the final 127 bytes, the incomplete message is cleared.
//  * @method _parseNrpnEvent
//  * @param e Event
//  * @protected
//  */
// Input.prototype._parseNrpnEvent = function(e) {
//
//   var command = e.data[0] >> 4;
//   var channelBufferIndex = (e.data[0] & 0xf); // use this for index of channel in _nrpnBuffer
//   var channel = channelBufferIndex + 1;
//   var data1, data2;
//
//   if (e.data.length > 1) {
//     data1 = e.data[1];
//     data2 = e.data.length > 2 ? e.data[2] : undefined;
//   }
//
//   // nrpn disabled
//   if(!wm.nrpnEventsEnabled) {
//     return;
//   }
//
//   // nrpn enabled, message not valid for nrpn
//   if(
//     !(
//       command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.controlchange &&
//       (
//         (data1 >= WebMidi.MIDI_NRPN_MESSAGES.increment && data1 <= WebMidi.MIDI_NRPN_MESSAGES.parammsb) ||
//         data1 === WebMidi.MIDI_NRPN_MESSAGES.entrymsb ||
//         data1 === WebMidi.MIDI_NRPN_MESSAGES.entrylsb
//       )
//     )
//   ) {
//     return;
//   }
//
//   // set up a CC event to parse as NRPN part
//   var ccEvent = {
//     target: this,
//     type: "controlchange",
//     data: e.data,
//     timestamp: e.timeStamp,
//     channel: channel,
//     controller: {
//       number: data1,
//       name: this.getCcNameByNumber(data1)
//     },
//     value: data2
//   };
//   if(
//     // if we get a starting MSB(CC99 - 0-126) vs an end MSB(CC99 - 127)
//     // destroy inclomplete NRPN and begin building again
//     ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.parammsb &&
//     ccEvent.value != WebMidi.MIDI_NRPN_MESSAGES.nullactiveparameter
//   ) {
//     wm._nrpnBuffer[channelBufferIndex] = [];
//     wm._nrpnBuffer[channelBufferIndex][0] = ccEvent;
//   } else if(
//     // add the param LSB
//     wm._nrpnBuffer[channelBufferIndex].length === 1 &&
//     ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.paramlsb
//   ) {
//     wm._nrpnBuffer[channelBufferIndex].push(ccEvent);
//
//   } else if(
//     // add data inc/dec or value MSB for 14bit
//     wm._nrpnBuffer[channelBufferIndex].length === 2 &&
//     (ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.increment ||
//       ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.decrement ||
//       ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.entrymsb)
//   ) {
//     wm._nrpnBuffer[channelBufferIndex].push(ccEvent);
//
//   } else if(
//     // if we have a value MSB, only add an LSB to pair with that
//     wm._nrpnBuffer[channelBufferIndex].length === 3 &&
//     wm._nrpnBuffer[channelBufferIndex][2].number === WebMidi.MIDI_NRPN_MESSAGES.entrymsb &&
//     ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.entrylsb
//   ) {
//     wm._nrpnBuffer[channelBufferIndex].push(ccEvent);
//
//   } else if(
//     // add an end MSB(CC99 - 127)
//     wm._nrpnBuffer[channelBufferIndex].length >= 3 &&
//     wm._nrpnBuffer[channelBufferIndex].length <= 4 &&
//     ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.parammsb &&
//     ccEvent.value === WebMidi.MIDI_NRPN_MESSAGES.nullactiveparameter
//   ) {
//     wm._nrpnBuffer[channelBufferIndex].push(ccEvent);
//
//   } else if(
//     // add an end LSB(CC99 - 127)
//     wm._nrpnBuffer[channelBufferIndex].length >= 4 &&
//     wm._nrpnBuffer[channelBufferIndex].length <= 5 &&
//     ccEvent.controller.number === WebMidi.MIDI_NRPN_MESSAGES.paramlsb &&
//     ccEvent.value === WebMidi.MIDI_NRPN_MESSAGES.nullactiveparameter
//   ) {
//     wm._nrpnBuffer[channelBufferIndex].push(ccEvent);
//     // now we have a full inc or dec NRPN message, lets create that event!
//
//     var rawData = [];
//
//     wm._nrpnBuffer[channelBufferIndex].forEach(function(ev) {
//       rawData.push(ev.data);
//     });
//
//     var nrpnNumber = (wm._nrpnBuffer[channelBufferIndex][0].value<<7) |
//       (wm._nrpnBuffer[channelBufferIndex][1].value);
//     var nrpnValue = wm._nrpnBuffer[channelBufferIndex][2].value;
//     if(wm._nrpnBuffer[channelBufferIndex].length === 6) {
//       nrpnValue = (wm._nrpnBuffer[channelBufferIndex][2].value<<7) |
//         (wm._nrpnBuffer[channelBufferIndex][3].value);
//     }
//     var nrpnControllerType = "";
//     switch (wm._nrpnBuffer[channelBufferIndex][2].controller.number) {
//       case WebMidi.MIDI_NRPN_MESSAGES.entrymsb:
//         nrpnControllerType = Input.NRPN_TYPES[0];
//         break;
//       case WebMidi.MIDI_NRPN_MESSAGES.increment:
//         nrpnControllerType = Input.NRPN_TYPES[1];
//         break;
//       case WebMidi.MIDI_NRPN_MESSAGES.decrement:
//         nrpnControllerType = Input.NRPN_TYPES[2];
//         break;
//       default:
//         throw new Error("The NPRN type was unidentifiable.");
//     }
//
//     /**
//      * Event emitted when a valid NRPN message sequence has been received on a specific device and
//      * channel.
//      *
//      * @event nrpn
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Array} event.data The raw MIDI message as arrays of 8 bit values( Uint8Array ).
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
//      * @param {String} event.type The type of event that occurred.
//      * @param {Object} event.controller
//      * @param {uint} event.controller.number The number of the NRPN.
//      * @param {String} event.controller.name The usual name or function of the controller.
//      * @param {uint} event.value The value received (between 0 and 65535).
//      */
//
//     var nrpnEvent = {
//       timestamp: ccEvent.timestamp,
//       channel: ccEvent.channel,
//       type: "nrpn",
//       data: rawData,
//       controller: {
//         number: nrpnNumber,
//         type: nrpnControllerType,
//         name: "Non-Registered Parameter " + nrpnNumber
//       },
//       value: nrpnValue
//     };
//
//     // now we are done building an NRPN, so clear the NRPN buffer for this channel
//     wm._nrpnBuffer[channelBufferIndex] = [];
//     // If some callbacks have been defined for this event, on that device and channel, execute
//     // them.
//     if (
//       this._userHandlers.channel[nrpnEvent.type] &&
//       this._userHandlers.channel[nrpnEvent.type][nrpnEvent.channel]
//     ) {
//       this._userHandlers.channel[nrpnEvent.type][nrpnEvent.channel].forEach(
//         function(callback) { callback(nrpnEvent); }
//       );
//     }
//   } else {
//     // something didn't match, clear the incomplete NRPN message by
//     wm._nrpnBuffer[channelBufferIndex] = [];
//   }
// };
//
// /**
//  * @method _parseChannelEvent
//  * @param e Event
//  * @protected
//  */
// Input.prototype._parseChannelEvent = function(e) {
//
//   var command = e.data[0] >> 4;
//   var channel = (e.data[0] & 0xf) + 1;
//   var data1, data2;
//
//   if (e.data.length > 1) {
//     data1 = e.data[1];
//     data2 = e.data.length > 2 ? e.data[2] : undefined;
//   }
//
//   // Returned event
//   var event = {
//     target: this,
//     data: e.data,
//     timestamp: e.timeStamp,
//     channel: channel
//   };
//
//   if (
//     command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.noteoff ||
//     (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.noteon && data2 === 0)
//   ) {
//
//     /**
//      * Event emitted when a note off MIDI message has been received on a specific device and
//      * channel.
//      *
//      * @event noteoff
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
//      * @param {String} event.type The type of event that occurred.
//      * @param {Object} event.note
//      * @param {uint} event.note.number The MIDI note number.
//      * @param {String} event.note.name The usual note name (C, C#, D, D#, etc.).
//      * @param {uint} event.note.octave The octave (between -2 and 8).
//      * @param {Number} event.velocity The release velocity (between 0 and 1).
//      * @param {Number} event.rawVelocity The attack velocity expressed as a 7-bit integer (between
//      * 0 and 127).
//      */
//     event.type = "noteoff";
//     event.note = {
//       number: data1,
//       name: WebMidi.NOTES[data1 % 12],
//       octave: wm.getOctave(data1)
//     };
//     event.velocity = data2 / 127;
//     event.rawVelocity = data2;
//
//   } else if (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.noteon) {
//
//     /**
//      * Event emitted when a note on MIDI message has been received on a specific device and
//      * channel.
//      *
//      * @event noteon
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
//      * @param {String} event.type The type of event that occurred.
//      * @param {Object} event.note
//      * @param {uint} event.note.number The MIDI note number.
//      * @param {String} event.note.name The usual note name (C, C#, D, D#, etc.).
//      * @param {uint} event.note.octave The octave (between -2 and 8).
//      * @param {Number} event.velocity The attack velocity (between 0 and 1).
//      * @param {Number} event.rawVelocity The attack velocity expressed as a 7-bit integer (between
//      * 0 and 127).
//      */
//     event.type = "noteon";
//     event.note = {
//       number: data1,
//       name: WebMidi.NOTES[data1 % 12],
//       octave: wm.getOctave(data1)
//     };
//     event.velocity = data2 / 127;
//     event.rawVelocity = data2;
//
//   } else if (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.keyaftertouch) {
//
//     /**
//      * Event emitted when a key-specific aftertouch MIDI message has been received on a specific
//      * device and channel.
//      *
//      * @event keyaftertouch
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
//      * @param {String} event.type The type of event that occurred.
//      * @param {Object} event.note
//      * @param {uint} event.note.number The MIDI note number.
//      * @param {String} event.note.name The usual note name (C, C#, D, D#, etc.).
//      * @param {uint} event.note.octave The octave (between -2 and 8).
//      * @param {Number} event.value The aftertouch amount (between 0 and 1).
//      */
//     event.type = "keyaftertouch";
//     event.note = {
//       number: data1,
//       name: WebMidi.NOTES[data1 % 12],
//       octave: wm.getOctave(data1)
//     };
//     event.value = data2 / 127;
//
//   } else if (
//     command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.controlchange &&
//     data1 >= 0 && data1 <= 119
//   ) {
//
//     /**
//      * Event emitted when a control change MIDI message has been received on a specific device and
//      * channel.
//      *
//      * @event controlchange
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
//      * @param {String} event.type The type of event that occurred.
//      * @param {Object} event.controller
//      * @param {uint} event.controller.number The number of the controller.
//      * @param {String} event.controller.name The usual name or function of the controller.
//      * @param {uint} event.value The value received (between 0 and 127).
//      */
//     event.type = "controlchange";
//     event.controller = {
//       number: data1,
//       name: this.getCcNameByNumber(data1)
//     };
//     event.value = data2;
//
//   } else if (
//     command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.channelmode &&
//     data1 >= 120 && data1 <= 127
//   ) {
//
//     /**
//      * Event emitted when a channel mode MIDI message has been received on a specific device and
//      * channel.
//      *
//      * @event channelmode
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
//      * @param {String} event.type The type of event that occurred.
//      * @param {Object} event.controller
//      * @param {uint} event.controller.number The number of the controller.
//      * @param {String} event.controller.name The usual name or function of the controller.
//      * @param {uint} event.value The value received (between 0 and 127).
//      */
//     event.type = "channelmode";
//     event.controller = {
//       number: data1,
//       name: this.getChannelModeByNumber(data1)
//     };
//     event.value = data2;
//
//   } else if (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.programchange) {
//
//     /**
//      * Event emitted when a program change MIDI message has been received on a specific device and
//      * channel.
//      *
//      * @event programchange
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
//      * @param {String} event.type The type of event that occurred.
//      * @param {uint} event.value The value received (between 0 and 127).
//      */
//     event.type = "programchange";
//     event.value = data1;
//
//   } else if (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.channelaftertouch) {
//
//     /**
//      * Event emitted when a channel-wide aftertouch MIDI message has been received on a specific
//      * device and channel.
//      *
//      * @event channelaftertouch
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
//      * @param {String} event.type The type of event that occurred.
//      * @param {Number} event.value The aftertouch value received (between 0 and 1).
//      */
//     event.type = "channelaftertouch";
//     event.value = data1 / 127;
//
//   } else if (command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.pitchbend) {
//
//     /**
//      * Event emitted when a pitch bend MIDI message has been received on a specific device and
//      * channel.
//      *
//      * @event pitchbend
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
//      * @param {String} event.type The type of event that occurred.
//      * @param {Number} event.value The pitch bend value received (between -1 and 1).
//      */
//     event.type = "pitchbend";
//     event.value = ((data2 << 7) + data1 - 8192) / 8192;
//   } else {
//     event.type = "unknownchannelmessage";
//   }
//
//   // If some callbacks have been defined for this event, on that device and channel, execute them.
//   if (
//     this._userHandlers.channel[event.type] &&
//     this._userHandlers.channel[event.type][channel]
//   ) {
//
//     this._userHandlers.channel[event.type][channel].forEach(
//       function(callback) { callback(event); }
//     );
//   }
//
// };
//
// /**
//  * Returns the name of a control change message matching the specified number. If no match is
//  * found, the function returns `undefined`.
//  *
//  * @method getCcNameByNumber
//  *
//  * @param number {Number} The number of the control change message.
//  * @returns {String|undefined} The matching control change name or `undefined`.
//  *
//  * @throws RangeError The control change number must be between 0 and 119.
//  *
//  * @since 2.0.0
//  */
// Input.prototype.getCcNameByNumber = function(number) {
//
//   number = Math.floor(number);
//
//   if ( !(number >= 0 && number <= 119) ) {
//     throw new RangeError("The control change number must be between 0 and 119.");
//   }
//
//   for (var cc in WebMidi.MIDI_CONTROL_CHANGE_MESSAGES) {
//
//     if (
//       WebMidi.MIDI_CONTROL_CHANGE_MESSAGES.hasOwnProperty(cc) &&
//       number === WebMidi.MIDI_CONTROL_CHANGE_MESSAGES[cc]
//     ) {
//       return cc;
//     }
//
//   }
//
//   return undefined;
//
// };
//
// /**
//  * Returns the channel mode name matching the specified number. If no match is found, the function
//  * returns `undefined`.
//  *
//  * @method getChannelModeByNumber
//  *
//  * @param number {Number} The number of the channel mode message.
//  * @returns {String|undefined} The matching channel mode message"s name or `undefined`;
//  *
//  * @throws RangeError The channel mode number must be between 120 and 127.
//  *
//  * @since 2.0.0
//  */
// Input.prototype.getChannelModeByNumber = function(number) {
//
//   number = Math.floor(number);
//
//   if ( !(number >= 120 && status <= 127) ) {
//     throw new RangeError("The control change number must be between 120 and 127.");
//   }
//
//   for (var cm in WebMidi.MIDI_CHANNEL_MODE_MESSAGES) {
//
//     if (
//       WebMidi.MIDI_CHANNEL_MODE_MESSAGES.hasOwnProperty(cm) &&
//       number === WebMidi.MIDI_CHANNEL_MODE_MESSAGES[cm]
//     ) {
//       return cm;
//     }
//
//   }
//
// };
//
// /**
//  * @method _parseSystemEvent
//  * @protected
//  */
// Input.prototype._parseSystemEvent = function(e) {
//
//   var command = e.data[0];
//
//   // Returned event
//   var event = {
//     target: this,
//     data: e.data,
//     timestamp: e.timeStamp
//   };
//
//   if (command === WebMidi.MIDI_SYSTEM_MESSAGES.sysex) {
//
//     /**
//      * Event emitted when a system exclusive MIDI message has been received. You should note that,
//      * to receive `sysex` events, you must call the `WebMidi.enable()` method with a second
//      * parameter set to `true`:
//      *
//      *     WebMidi.enable(function(err) {
//      *
//      *        if (err) {
//      *          console.log("WebMidi could not be enabled.");
//      *        }
//      *
//      *        var input = WebMidi.inputs[0];
//      *
//      *        input.addListener("sysex", "all", function (e) {
//      *          console.log(e);
//      *        });
//      *
//      *     }, true);
//      *
//      * @event sysex
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type The type of event that occurred.
//      *
//      */
//     event.type = "sysex";
//
//   } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.timecode) {
//
//     /**
//      * Event emitted when a system MIDI time code quarter frame message has been received.
//      *
//      * @event timecode
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type The type of event that occurred.
//      */
//     event.type = "timecode";
//
//   } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.songposition) {
//
//     /**
//      * Event emitted when a system song position pointer MIDI message has been received.
//      *
//      * @event songposition
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type The type of event that occurred.
//      */
//     event.type = "songposition";
//
//   } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.songselect) {
//
//     /**
//      * Event emitted when a system song select MIDI message has been received.
//      *
//      * @event songselect
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type The type of event that occurred.
//      * @param {String} event.song Song (or sequence) number to select.
//      */
//     event.type = "songselect";
//     event.song = e.data[1];
//
//   } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.tuningrequest) {
//
//     /**
//      * Event emitted when a system tune request MIDI message has been received.
//      *
//      * @event tuningrequest
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
//      *                                    values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type         The type of event that occurred.
//      */
//     event.type = "tuningrequest";
//
//   } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.clock) {
//
//     /**
//      * Event emitted when a system timing clock MIDI message has been received.
//      *
//      * @event clock
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
//      *                                    values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type         The type of event that occurred.
//      */
//     event.type = "clock";
//
//   } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.start) {
//
//     /**
//      * Event emitted when a system start MIDI message has been received.
//      *
//      * @event start
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
//      *                                    values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type         The type of event that occurred.
//      */
//     event.type = "start";
//
//   } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.continue) {
//
//     /**
//      * Event emitted when a system continue MIDI message has been received.
//      *
//      * @event continue
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
//      *                                    values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type         The type of event that occurred.
//      */
//     event.type = "continue";
//
//   } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.stop) {
//
//     /**
//      * Event emitted when a system stop MIDI message has been received.
//      *
//      * @event stop
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
//      *                                    values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type         The type of event that occurred.
//      */
//     event.type = "stop";
//
//   } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.activesensing) {
//
//     /**
//      * Event emitted when a system active sensing MIDI message has been received.
//      *
//      * @event activesensing
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type         The type of event that occurred.
//      */
//     event.type = "activesensing";
//
//   } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.reset) {
//
//     /**
//      * Event emitted when a system reset MIDI message has been received.
//      *
//      * @event reset
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type         The type of event that occurred.
//      */
//     event.type = "reset";
//
//   } else {
//
//     /**
//      * Event emitted when an unknown system MIDI message has been received. It could be, for
//      * example, one of the undefined/reserved messages.
//      *
//      * @event unknownsystemmessage
//      *
//      * @param {Object} event
//      * @param {Input} event.target The `Input` that triggered the event.
//      * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
//      * @param {Number} event.timestamp The time when the event occurred (in milliseconds)
//      * @param {String} event.type The type of event that occurred.
//      */
//     event.type = "unknownsystemmessage";
//
//   }
//
//   // If some callbacks have been defined for this event, execute them.
//   if (this._userHandlers.system[event.type]) {
//     this._userHandlers.system[event.type].forEach(
//       function(callback) { callback(event); }
//     );
//   }
//
// };
