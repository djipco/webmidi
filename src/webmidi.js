import {EventEmitter} from "../node_modules/djipevents/dist/djipevents.esm.min.js";

class WebMidi extends EventEmitter {

  constructor() {
    super();
  }

  enable() {

  }

}

// Export instance (singleton)
const wm = new WebMidi();
export {wm as WebMidi};


// function WebMidi() {
//
//   // MIDI inputs and outputs
//   this._inputs = [];
//   this._outputs = [];
//
//   // Object to hold all user-defined handlers for interface-wide events (connected, disconnected,
//   // etc.)
//   this._userHandlers = {};
//
//   // Array of statechange events to process. These events must be parsed synchronously so they do
//   // not override each other.
//   this._stateChangeQueue = [];
//
//   // Indicates whether we are currently processing a statechange event (in which case new events
//   // are to be queued).
//   this._processingStateChange = false;
//
//   // Events triggered at the interface level (WebMidi)
//   this._midiInterfaceEvents = ["connected", "disconnected"];
//
//   // the current nrpns being constructed, by channel
//   this._nrpnBuffer = [[],[],[],[], [],[],[],[], [],[],[],[], [],[],[],[]];
//
//   // Enable/Disable NRPN event dispatch
//   this._nrpnEventsEnabled = true;
//
//   // NRPN message types
//   this._nrpnTypes = ["entry", "increment", "decrement"];
//
//   // Notes and semitones for note guessing
//   this._notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
//   this._semitones = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
//
//   // Define some "static" properties
//   Object.defineProperties(this, {
//
//     /**
//      * [read-only] List of valid MIDI system messages and matching hexadecimal values.
//      *
//      * Note: values 249 and 253 are actually dispatched by the Web MIDI API but I do not know what
//      * they are used for. They are not part of the online
//      * [MIDI 1.0 spec](http://www.midi.org/techspecs/midimessages.php).
//      *
//      * @property MIDI_SYSTEM_MESSAGES
//      * @type Object
//      * @static
//      *
//      * @since 2.0.0
//      */
//     MIDI_SYSTEM_MESSAGES: {
//       value: {
//
//         // System common messages
//         sysex: 0xF0,            // 240
//         timecode: 0xF1,         // 241
//         songposition: 0xF2,     // 242
//         songselect: 0xF3,       // 243
//         tuningrequest: 0xF6,    // 246
//         sysexend: 0xF7,         // 247 (never actually received - simply ends a sysex)
//
//         // System real-time messages
//         clock: 0xF8,            // 248
//         start: 0xFA,            // 250
//         continue: 0xFB,         // 251
//         stop: 0xFC,             // 252
//         activesensing: 0xFE,    // 254
//         reset: 0xFF,            // 255
//
//         // Custom WebMidi.js messages
//         midimessage: 0,
//         unknownsystemmessage: -1
//       },
//       writable: false,
//       enumerable: true,
//       configurable: false
//     },
//
//     /**
//      * [read-only] An object containing properties for each MIDI channel messages and their
//      * associated hexadecimal value.
//      *
//      * @property MIDI_CHANNEL_MESSAGES
//      * @type Object
//      * @static
//      *
//      * @since 2.0.0
//      */
//     MIDI_CHANNEL_MESSAGES: {
//       value: {
//         noteoff: 0x8,           // 8
//         noteon: 0x9,            // 9
//         keyaftertouch: 0xA,     // 10
//         controlchange: 0xB,     // 11
//         channelmode: 0xB,       // 11
//         nrpn: 0xB,              // 11
//         programchange: 0xC,     // 12
//         channelaftertouch: 0xD, // 13
//         pitchbend: 0xE          // 14
//       },
//       writable: false,
//       enumerable: true,
//       configurable: false
//     },
//
//     /**
//      * [read-only] An object containing properties for each registered parameters and their
//      * associated pair of hexadecimal values. MIDI registered parameters extend the original list
//      * of control change messages (a.k.a. CC messages). Currently, there are only a limited number
//      * of them.
//      *
//      * @property MIDI_REGISTERED_PARAMETER
//      * @type Object
//      * @static
//      *
//      * @since 2.0.0
//      */
//     MIDI_REGISTERED_PARAMETER: {
//       value: {
//         pitchbendrange: [0x00, 0x00],
//         channelfinetuning: [0x00, 0x01],
//         channelcoarsetuning: [0x00, 0x02],
//         tuningprogram: [0x00, 0x03],
//         tuningbank: [0x00, 0x04],
//         modulationrange: [0x00, 0x05],
//
//         azimuthangle: [0x3D, 0x00],
//         elevationangle: [0x3D, 0x01],
//         gain: [0x3D, 0x02],
//         distanceratio: [0x3D, 0x03],
//         maximumdistance: [0x3D, 0x04],
//         maximumdistancegain: [0x3D, 0x05],
//         referencedistanceratio: [0x3D, 0x06],
//         panspreadangle: [0x3D, 0x07],
//         rollangle: [0x3D, 0x08]
//       },
//       writable: false,
//       enumerable: true,
//       configurable: false
//     },
//
//     /**
//      * [read-only] An object containing properties for each MIDI control change messages (a.k.a.
//      * CC messages) and their associated hexadecimal value.
//      *
//      * @property MIDI_CONTROL_CHANGE_MESSAGES
//      * @type Object
//      * @static
//      *
//      * @since 2.0.0
//      */
//     MIDI_CONTROL_CHANGE_MESSAGES: {
//       value: {
//         bankselectcoarse: 0,
//         modulationwheelcoarse: 1,
//         breathcontrollercoarse: 2,
//         footcontrollercoarse: 4,
//         portamentotimecoarse: 5,
//         dataentrycoarse: 6,
//         volumecoarse: 7,
//         balancecoarse: 8,
//         pancoarse: 10,
//         expressioncoarse: 11,
//         effectcontrol1coarse: 12,
//         effectcontrol2coarse: 13,
//         generalpurposeslider1: 16,
//         generalpurposeslider2: 17,
//         generalpurposeslider3: 18,
//         generalpurposeslider4: 19,
//         bankselectfine: 32,
//         modulationwheelfine: 33,
//         breathcontrollerfine: 34,
//         footcontrollerfine: 36,
//         portamentotimefine: 37,
//         dataentryfine: 38,
//         volumefine: 39,
//         balancefine: 40,
//         panfine: 42,
//         expressionfine: 43,
//         effectcontrol1fine: 44,
//         effectcontrol2fine: 45,
//         holdpedal: 64,
//         portamento: 65,
//         sustenutopedal: 66,
//         softpedal: 67,
//         legatopedal: 68,
//         hold2pedal: 69,
//         soundvariation: 70,
//         resonance: 71,
//         soundreleasetime: 72,
//         soundattacktime: 73,
//         brightness: 74,
//         soundcontrol6: 75,
//         soundcontrol7: 76,
//         soundcontrol8: 77,
//         soundcontrol9: 78,
//         soundcontrol10: 79,
//         generalpurposebutton1: 80,
//         generalpurposebutton2: 81,
//         generalpurposebutton3: 82,
//         generalpurposebutton4: 83,
//         reverblevel: 91,
//         tremololevel: 92,
//         choruslevel: 93,
//         celestelevel: 94,
//         phaserlevel: 95,
//         databuttonincrement: 96,
//         databuttondecrement: 97,
//         nonregisteredparametercoarse: 98,
//         nonregisteredparameterfine: 99,
//         registeredparametercoarse: 100,
//         registeredparameterfine: 101
//       },
//       writable: false,
//       enumerable: true,
//       configurable: false
//     },
//
//     /**
//      * [read-only] An object containing properties for MIDI control change messages
//      * that make up NRPN messages
//      *
//      * @property MIDI_NRPN_MESSAGES
//      * @type Object
//      * @static
//      *
//      * @since 2.0.0
//      */
//     MIDI_NRPN_MESSAGES: {
//       value: {
//         entrymsb: 6,
//         entrylsb: 38,
//         increment: 96,
//         decrement: 97,
//         paramlsb: 98,
//         parammsb: 99,
//         nullactiveparameter: 127
//       },
//       writable: false,
//       enumerable: true,
//       configurable: false
//     },
//
//     /**
//      * [read-only] List of MIDI channel mode messages as defined in the official MIDI
//      * specification.
//      *
//      * @property MIDI_CHANNEL_MODE_MESSAGES
//      * @type Object
//      * @static
//      *
//      * @since 2.0.0
//      */
//     MIDI_CHANNEL_MODE_MESSAGES: {
//       value: {
//         allsoundoff: 120,
//         resetallcontrollers: 121,
//         localcontrol: 122,
//         allnotesoff: 123,
//         omnimodeoff: 124,
//         omnimodeon: 125,
//         monomodeon: 126,
//         polymodeon: 127
//       },
//       writable: false,
//       enumerable: true,
//       configurable: false
//     },
//
//     /**
//      * An integer to offset the octave both in inbound and outbound messages. By default, middle C
//      * (MIDI note number 60) is placed on the 4th octave (C4).
//      *
//      * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
//      * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
//      *
//      * @property octaveOffset
//      * @type Number
//      * @static
//      *
//      * @since 2.1
//      */
//     octaveOffset: {
//       value: 0,
//       writable: true,
//       enumerable: true,
//       configurable: false
//     }
//
//   });
//
//   // Define getters/setters
//   Object.defineProperties(this, {
//
//     /**
//      * [read-only] Indicates whether the environment supports the Web MIDI API or not.
//      *
//      * Note: in environments that do not offer built-in MIDI support, this will report true if the
//      * `navigator.requestMIDIAccess` function is available. For example, if you have installed
//      * WebMIDIAPIShim but no plugin, this property will be true even though actual support might
//      * not be there.
//      *
//      * @property supported
//      * @type Boolean
//      * @static
//      */
//     supported: {
//       enumerable: true,
//       get: function() {
//         return "requestMIDIAccess" in navigator;
//       }
//     },
//
//     /**
//      * [read-only] Indicates whether the interface to the host"s MIDI subsystem is currently
//      * enabled.
//      *
//      * @property enabled
//      * @type Boolean
//      * @static
//      */
//     enabled: {
//       enumerable: true,
//       get: function() {
//         return this.interface !== undefined;
//       }.bind(this)
//     },
//
//     /**
//      * [read-only] An array of all currently available MIDI input ports.
//      *
//      * @property inputs
//      * @type {Array}
//      * @static
//      */
//     inputs: {
//       enumerable: true,
//       get: function() {
//         return this._inputs;
//       }.bind(this)
//     },
//
//     /**
//      * [read-only] An array of all currently available MIDI output ports.
//      *
//      * @property outputs
//      * @type {Array}
//      * @static
//      */
//     outputs: {
//       enumerable: true,
//       get: function() {
//         return this._outputs;
//       }.bind(this)
//     },
//
//     /**
//      * [read-only] Indicates whether the interface to the host"s MIDI subsystem is currently
//      * active.
//      *
//      * @property sysexEnabled
//      * @type Boolean
//      * @static
//      */
//     sysexEnabled: {
//       enumerable: true,
//       get: function() {
//         return !!(this.interface && this.interface.sysexEnabled);
//       }.bind(this)
//     },
//
//     /**
//      * [read-only] Indicates whether WebMidi should dispatch Non-Registered
//      * Parameter Number events (which are generally groups of CC messages)
//      * If correct sequences of CC messages are received, NRPN events will
//      * fire. The first out of order NRPN CC will fall through the collector
//      * logic and all CC messages buffered will be discarded as incomplete.
//      *
//      * @property nrpnEventsEnabled
//      * @type Boolean
//      * @static
//      */
//     nrpnEventsEnabled: {
//       enumerable: true,
//       get: function() {
//         return !!(this._nrpnEventsEnabled);
//       }.bind(this),
//       set: function(enabled) {
//         this._nrpnEventsEnabled = enabled;
//         return this._nrpnEventsEnabled;
//       }
//     },
//
//     /**
//      * [read-only] NRPN message types
//      *
//      * @property nrpnTypes
//      * @type Array
//      * @static
//      */
//     nrpnTypes: {
//       enumerable: true,
//       get: function() {
//         return this._nrpnTypes;
//       }.bind(this)
//     },
//
//     /**
//      * [read-only] Current MIDI performance time in milliseconds. This can be used to queue events
//      * in the future.
//      *
//      * @property time
//      * @type DOMHighResTimeStamp
//      * @static
//      */
//     time: {
//       enumerable: true,
//       get: function() {
//         return performance.now();
//       }
//     }
//
//   });
//
// }

// /**
//  * Checks if the Web MIDI API is available and then tries to connect to the host's MIDI subsystem.
//  * This is an asynchronous operation. When it's done, the specified handler callback will be
//  * executed. If an error occurred, the callback function will receive an `Error` object as its
//  * sole parameter.
//  *
//  * To enable the use of system exclusive messages, the `sysex` parameter should be set to true.
//  * However, under some environments (e.g. Jazz-Plugin), the sysex parameter is ignored and sysex
//  * is always enabled.
//  *
//  * Warning: starting with Chrome v77, the Web MIDI API must be hosted on a secure origin
//  * (`https://`, `localhost` or `file:///`) and the user will always be prompted to authorize the
//  * operation (no matter if `sysex` is requested or not).
//  *
//  * @method enable
//  * @static
//  *
//  * @param [callback] {Function} A function to execute upon success. This function will receive an
//  * `Error` object upon failure to enable the Web MIDI API.
//  * @param [sysex=false] {Boolean} Whether to enable MIDI system exclusive messages or not.
//  *
//  * @throws Error The Web MIDI API is not supported by your browser.
//  * @throws Error Jazz-Plugin must be installed to use WebMIDIAPIShim.
//  */
// // WebMidi.prototype.enable = function(callback, sysex) {
// //
// //   // Why are you not using a Promise-based API for the enable() method?
// //   //
// //   // Short answer: because of IE.
// //   //
// //   // Long answer:
// //   //
// //   // IE 11 and below still do not support promises. Therefore, WebMIDIAPIShim has to implement a
// //   // simple Promise look-alike object to handle the call to requestMIDIAccess(). This look-alike
// //   // is not a fully-fledged Promise object. It does not support using catch() for example. This
// //   // means that, to provide a real Promise-based interface for the enable() method, we would need
// //   // to add a dependency in the form of a Promise polyfill. So, to keep things simpler, we will
// //   // stick to the good old callback based enable() function.
// //
// //   if (this.enabled) return;
// //
// //   if ( !this.supported) {
// //
// //     if (typeof callback === "function") {
// //       callback( new Error("The Web MIDI API is not supported by your browser.") );
// //     }
// //
// //     return;
// //
// //   }
// //
// //   navigator.requestMIDIAccess({sysex: sysex}).then(
// //
// //     function(midiAccess) {
// //
// //       var events = [],
// //         promises = [],
// //         promiseTimeout;
// //
// //       this.interface = midiAccess;
// //       this._resetInterfaceUserHandlers();
// //
// //       // We setup a temporary `statechange` handler that will catch all events triggered while we
// //       // setup. Those events will be re-triggered after calling the user"s callback. This will
// //       // allow the user to listen to "connected" events which can be very convenient.
// //       this.interface.onstatechange = function (e) {
// //         events.push(e);
// //       };
// //
// //       // Here we manually open the inputs and outputs. Usually, this is optional. When the ports
// //       // are not explicitely opened, they will be opened automatically (and asynchonously) by
// //       // setting a listener on `midimessage` (MIDIInput) or calling `send()` (MIDIOutput).
// //       // However, we do not want that here. We want to be sure that "connected" events will be
// //       // available in the user"s callback. So, what we do is open all input and output ports and
// //       // wait until all promises are resolved. Then, we re-trigger the events after the user"s
// //       // callback has been executed. This seems like the most sensible and practical way.
// //       var inputs = midiAccess.inputs.values();
// //       for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
// //         promises.push(input.value.open());
// //       }
// //
// //       var outputs = midiAccess.outputs.values();
// //       for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
// //         promises.push(output.value.open());
// //       }
// //
// //       // Since this library might be used in environments without support for promises (such as
// //       // Jazz-Midi) or in environments that are not properly opening the ports (such as Web MIDI
// //       // Browser), we fall back to a timer-based approach if the promise-based approach fails.
// //       function onPortsOpen() {
// //
// //         clearTimeout(promiseTimeout);
// //
// //         this._updateInputsAndOutputs();
// //         this.interface.onstatechange = this._onInterfaceStateChange.bind(this);
// //
// //         // We execute the callback and then re-trigger the statechange events.
// //         if (typeof callback === "function") { callback.call(this); }
// //
// //         events.forEach(function (event) {
// //           this._onInterfaceStateChange(event);
// //         }.bind(this));
// //
// //       }
// //
// //       promiseTimeout = setTimeout(onPortsOpen.bind(this), 200);
// //
// //       if (Promise) {
// //         Promise
// //           .all(promises)
// //           .catch(function(err) { console.warn(err); })
// //           .then(onPortsOpen.bind(this));
// //       }
// //
// //       // When MIDI access is requested, all input and output ports have their "state" set to
// //       // "connected". However, the value of their "connection" property is "closed".
// //       //
// //       // A `MIDIInput` becomes `open` when you explicitely call its `open()` method or when you
// //       // assign a listener to its `onmidimessage` property. A `MIDIOutput` becomes `open` when you
// //       // use the `send()` method or when you can explicitely call its `open()` method.
// //       //
// //       // Calling `_updateInputsAndOutputs()` attaches listeners to all inputs. As per the spec,
// //       // this triggers a `statechange` event on MIDIAccess.
// //
// //     }.bind(this),
// //
// //     function (err) {
// //       if (typeof callback === "function") { callback.call(this, err); }
// //     }.bind(this)
// //
// //   );
// //
// // };
// //
// // /**
// //  * Completely disables `WebMidi` by unlinking the MIDI subsystem"s interface and destroying all
// //  * `Input` and `Output` objects that may be available. This also means that any listener that may
// //  * have been defined on `Input` or `Output` objects will be destroyed.
// //  *
// //  * @method disable
// //  * @static
// //  *
// //  * @since 2.0.0
// //  */
// // WebMidi.prototype.disable = function() {
// //
// //   if ( !this.supported ) {
// //     throw new Error("The Web MIDI API is not supported by your browser.");
// //   }
// //
// //   if (this.interface) this.interface.onstatechange = undefined;
// //   this.interface = undefined; // also resets enabled, sysexEnabled, nrpnEventsEnabled
// //   this._inputs = [];
// //   this._outputs = [];
// //   this._nrpnEventsEnabled = true;
// //   this._resetInterfaceUserHandlers();
// //
// // };
// //
// // /**
// //  * Adds an event listener on the `WebMidi` object that will trigger a function callback when the
// //  * specified event happens.
// //  *
// //  * WebMidi must be enabled before adding event listeners.
// //  *
// //  * Currently, only one event is being dispatched by the `WebMidi` object:
// //  *
// //  *    * {{#crossLink "WebMidi/statechange:event"}}statechange{{/crossLink}}
// //  *
// //  * @method addListener
// //  * @static
// //  * @chainable
// //  *
// //  * @param type {String} The type of the event.
// //  *
// //  * @param listener {Function} A callback function to execute when the specified event is detected.
// //  * This function will receive an event parameter object. For details on this object"s properties,
// //  * check out the documentation for the various events (links above).
// //  *
// //  * @throws {Error} WebMidi must be enabled before adding event listeners.
// //  * @throws {TypeError} The specified event type is not supported.
// //  * @throws {TypeError} The "listener" parameter must be a function.
// //  *
// //  * @return {WebMidi} Returns the `WebMidi` object so methods can be chained.
// //  */
// // WebMidi.prototype.addListener = function(type, listener) {
// //
// //   if (!this.enabled) {
// //     throw new Error("WebMidi must be enabled before adding event listeners.");
// //   }
// //
// //   if (typeof listener !== "function") {
// //     throw new TypeError("The 'listener' parameter must be a function.");
// //   }
// //
// //   if (this._midiInterfaceEvents.indexOf(type) >= 0) {
// //     this._userHandlers[type].push(listener);
// //   } else {
// //     throw new TypeError("The specified event type is not supported.");
// //   }
// //
// //   return this;
// //
// // };
// //
// // /**
// //  * Checks if the specified event type is already defined to trigger the specified listener
// //  * function.
// //  *
// //  * @method hasListener
// //  * @static
// //  *
// //  * @param {String} type The type of the event.
// //  * @param {Function} listener The callback function to check for.
// //  *
// //  * @throws {Error} WebMidi must be enabled before checking event listeners.
// //  * @throws {TypeError} The "listener" parameter must be a function.
// //  * @throws {TypeError} The specified event type is not supported.
// //  *
// //  * @return {Boolean} Boolean value indicating whether or not a callback is already defined for
// //  * this event type.
// //  */
// // WebMidi.prototype.hasListener = function(type, listener) {
// //
// //   if (!this.enabled) {
// //     throw new Error("WebMidi must be enabled before checking event listeners.");
// //   }
// //
// //   if (typeof listener !== "function") {
// //     throw new TypeError("The 'listener' parameter must be a function.");
// //   }
// //
// //   if (this._midiInterfaceEvents.indexOf(type) >= 0) {
// //
// //     for (var o = 0; o < this._userHandlers[type].length; o++) {
// //       if (this._userHandlers[type][o] === listener) {
// //         return true;
// //       }
// //     }
// //
// //   } else {
// //     throw new TypeError("The specified event type is not supported.");
// //   }
// //
// //   return false;
// //
// // };
// //
// // /**
// //  * Removes the specified listener(s). If the `listener` parameter is left undefined, all listeners
// //  * for the specified `type` will be removed. If both the `listener` and the `type` parameters are
// //  * omitted, all listeners attached to the `WebMidi` object will be removed.
// //  *
// //  * @method removeListener
// //  * @static
// //  * @chainable
// //  *
// //  * @param {String} [type] The type of the event.
// //  * @param {Function} [listener] The callback function to check for.
// //  *
// //  * @throws {Error} WebMidi must be enabled before removing event listeners.
// //  * @throws {TypeError} The "listener" parameter must be a function.
// //  * @throws {TypeError} The specified event type is not supported.
// //  *
// //  * @return {WebMidi} The `WebMidi` object for easy method chaining.
// //  */
// // WebMidi.prototype.removeListener = function(type, listener) {
// //
// //   if (!this.enabled) {
// //     throw new Error("WebMidi must be enabled before removing event listeners.");
// //   }
// //
// //   if (listener !== undefined && typeof listener !== "function") {
// //     throw new TypeError("The 'listener' parameter must be a function.");
// //   }
// //
// //   if (this._midiInterfaceEvents.indexOf(type) >= 0) {
// //
// //     if (listener) {
// //
// //       for (var o = 0; o < this._userHandlers[type].length; o++) {
// //         if (this._userHandlers[type][o] === listener) {
// //           this._userHandlers[type].splice(o, 1);
// //         }
// //       }
// //
// //     } else {
// //       this._userHandlers[type] = [];
// //     }
// //
// //   } else if (type === undefined) {
// //
// //     this._resetInterfaceUserHandlers();
// //
// //   } else {
// //     throw new TypeError("The specified event type is not supported.");
// //   }
// //
// //   return this;
// //
// // };
// //
// // /**
// //  * Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be one of
// //  * the following:
// //  *
// //  * * a single integer
// //  * * an array of integers
// //  * * the special value `"all"`
// //  * * the special value `"none"`
// //  *
// //  * Passing `"all"` or `undefined` as a parameter to this function results in all channels being
// //  * returned (1-16). Passing `"none"` results in no channel being returned (as an empty array).
// //  *
// //  * Note: parameters that cannot successfully be parsed to integers between 1 and 16 are silently
// //  * ignored.
// //  *
// //  * @method toMIDIChannels
// //  * @static
// //  *
// //  * @param [channel="all"] {Number|Array|"all"|"none"}
// //  * @returns {Array} An array of 0 or more valid MIDI channel numbers
// //  */
// // WebMidi.prototype.toMIDIChannels = function(channel) {
// //
// //   var channels;
// //
// //   if (channel === "all" || channel === undefined) {
// //     channels = ["all"];
// //   } else if (channel === "none") {
// //     channels = [];
// //     return channels;
// //   } else if (!Array.isArray(channel)) {
// //     channels = [channel];
// //   } else {
// //     channels = channel;
// //   }
// //
// //   // In order to preserve backwards-compatibility, we let this assignment as it is.
// //   if (channels.indexOf("all") > -1) {
// //     channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// //   }
// //
// //   return channels
// //     .map(function(ch) {
// //       return parseInt(ch);
// //     })
// //     .filter(function(ch) {
// //       return (ch >= 1 && ch <= 16);
// //     });
// //
// // };
// //
// // /**
// //  *
// //  * Returns the `Input` object that matches the specified ID string or `false` if no matching input
// //  * is found. As per the Web MIDI API specification, IDs are strings (not integers).
// //  *
// //  * Please note that IDs change from one host to another. For example, Chrome does not use the same
// //  * kind of IDs as Jazz-Plugin.
// //  *
// //  * @method getInputById
// //  * @static
// //  *
// //  * @param id {String} The ID string of the port. IDs can be viewed by looking at the
// //  * `WebMidi.inputs` array.
// //  *
// //  * @returns {Input|false} A MIDIInput port matching the specified ID string. If no matching port
// //  * can be found, the method returns `false`.
// //  *
// //  * @throws Error WebMidi is not enabled.
// //  *
// //  * @since 2.0.0
// //  */
// // WebMidi.prototype.getInputById = function(id) {
// //
// //   if (!this.enabled) throw new Error("WebMidi is not enabled.");
// //
// //   id = String(id);
// //
// //   for (var i = 0; i < this.inputs.length; i++) {
// //     if (this.inputs[i].id === id) return this.inputs[i];
// //   }
// //
// //   return false;
// //
// // };
// //
// // /**
// //  * Returns the `Output` object that matches the specified ID string or `false` if no matching
// //  * output is found. As per the Web MIDI API specification, IDs are strings (not integers).
// //  *
// //  * Please note that IDs change from one host to another. For example, Chrome does not use the same
// //  * kind of IDs as Jazz-Plugin.
// //  *
// //  * @method getOutputById
// //  * @static
// //  *
// //  * @param id {String} The ID string of the port. IDs can be viewed by looking at the
// //  * `WebMidi.outputs` array.
// //  *
// //  * @returns {Output|false} A MIDIOutput port matching the specified ID string. If no matching port
// //  * can be found, the method returns `false`.
// //  *
// //  * @throws Error WebMidi is not enabled.
// //  *
// //  * @since 2.0.0
// //  */
// // WebMidi.prototype.getOutputById = function(id) {
// //
// //   if (!this.enabled) throw new Error("WebMidi is not enabled.");
// //
// //   id = String(id);
// //
// //   for (var i = 0; i < this.outputs.length; i++) {
// //     if (this.outputs[i].id === id) return this.outputs[i];
// //   }
// //
// //   return false;
// //
// // };
// //
// // /**
// //  * Returns the first MIDI `Input` whose name *contains* the specified string.
// //  *
// //  * Please note that the port names change from one host to another. For example, Chrome does
// //  * not report port names in the same way as the Jazz-Plugin does.
// //  *
// //  * @method getInputByName
// //  * @static
// //  *
// //  * @param name {String} The name of a MIDI input port such as those visible in the
// //  * `WebMidi.inputs` array.
// //  *
// //  * @returns {Input|False} The `Input` that was found or `false` if no input matched the specified
// //  * name.
// //  *
// //  * @throws Error WebMidi is not enabled.
// //  * @throws TypeError The name must be a string.
// //  *
// //  * @since 2.0.0
// //  */
// // WebMidi.prototype.getInputByName = function(name) {
// //
// //   if (!this.enabled) {
// //     throw new Error("WebMidi is not enabled.");
// //   }
// //
// //   for (var i = 0; i < this.inputs.length; i++) {
// //     if (~this.inputs[i].name.indexOf(name)) { return this.inputs[i]; }
// //   }
// //
// //   return false;
// //
// // };
// //
// // /**
// //  * Returns the octave number for the specified MIDI note number (0-127). By default, the value is
// //  * based on middle C (note number 60) being placed on the 4th octave (C4). However, by using the
// //  * <a href="#property_octaveOffset">octaveOffset</a> property, you can offset the result as much
// //  * as you want.
// //  *
// //  * @method getOctave
// //  * @static
// //  *
// //  * @param number {Number} An integer representing a valid MIDI note number (between 0 and 127).
// //  *
// //  * @returns {Number} The octave (as a signed integer) or `undefined`.
// //  *
// //  * @since 2.0.0-rc.6
// //  */
// // WebMidi.prototype.getOctave = function(number) {
// //
// //   if (number != null && number >= 0 && number <= 127) {
// //     return Math.floor(Math.floor(number) / 12 - 1) + Math.floor(wm.octaveOffset);
// //   }
// //
// // };
// //
// // /**
// //  * Returns the first MIDI `Output` that matches the specified name.
// //  *
// //  * Please note that the port names change from one host to another. For example, Chrome does
// //  * not report port names in the same way as the Jazz-Plugin does.
// //  *
// //  * @method getOutputByName
// //  * @static
// //  *
// //  * @param name {String} The name of a MIDI output port such as those visible in the
// //  * `WebMidi.outputs` array.
// //  *
// //  * @returns {Output|False} The `Output` that was found or `false` if no output matched the
// //  * specified name.
// //  *
// //  * @throws Error WebMidi is not enabled.
// //  *
// //  * @since 2.0.0
// //  */
// // WebMidi.prototype.getOutputByName = function(name) {
// //
// //   if (!this.enabled) {
// //     throw new Error("WebMidi is not enabled.");
// //   }
// //
// //   for (var i = 0; i < this.outputs.length; i++) {
// //     if (~this.outputs[i].name.indexOf(name)) { return this.outputs[i]; }
// //   }
// //
// //   return false;
// //
// // };
// //
// // /**
// //  * Returns a valid MIDI note number (0-127) given the specified input. The input usually is a note
// //  * name (C3, F#4, D-2, G8, etc.). If an integer between 0 and 127, it will simply be returned as
// //  * is.
// //  *
// //  * @method guessNoteNumber
// //  * @static
// //  *
// //  * @param input {Number|String} A string to extract the note number from. An integer can also be
// //  * used, in which case it will simply be returned (if between 0 and 127).
// //  * @throws {Error} Invalid input value
// //  * @returns {Number} A valid MIDI note number (0-127).
// //  */
// // WebMidi.prototype.guessNoteNumber = function(input) {
// //
// //   var output = false;
// //
// //   if (input && input.toFixed && input >= 0 && input <= 127) {         // uint
// //     output = Math.round(input);
// //   } else if (parseInt(input) >= 0 && parseInt(input) <= 127) {        // uint as string
// //     output = parseInt(input);
// //   } else if (typeof input === "string" || input instanceof String) {  // string
// //     output = this.noteNameToNumber(input);
// //   }
// //
// //   if (output === false) throw new Error("Invalid input value (" + input + ").");
// //   return output;
// //
// // };
// //
// // /**
// //  * Returns a MIDI note number matching the note name passed in the form of a string parameter. The
// //  * note name must include the octave number. The name can also optionally include a sharp (#),
// //  * a double sharp (##), a flat (b) or a double flat (bb) symbol: C5, G4, D#-1, F0, Gb7, Eb-1,
// //  * Abb4, B##6, etc.
// //  *
// //  * Note that, in converting note names to numbers, C4 is considered to be middle C (MIDI note
// //  * number 60) as per the scientific pitch notation standard.
// //  *
// //  * Also note that the resulting note number is offset by the `octaveOffset` value (if not zero).
// //  * For example, if you pass in "C4" and the `octaveOffset` value is 2 the resulting MIDI note
// //  * number will be 36.
// //  *
// //  * @method noteNameToNumber
// //  * @static
// //  *
// //  * @param name {String} The name of the note in the form of a letter, followed by an optional "#",
// //  * "##", "b" or "bb" followed by the octave number.
// //  *
// //  * @throws {RangeError} Invalid note name.
// //  * @throws {RangeError} Invalid note name or note outside valid range.
// //  * @return {Number} The MIDI note number (between 0 and 127)
// //  */
// // WebMidi.prototype.noteNameToNumber = function(name) {
// //
// //   if (typeof name !== "string") name = "";
// //
// //   var matches = name.match(/([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)/i);
// //   if(!matches) throw new RangeError("Invalid note name.");
// //
// //   var semitones = wm._semitones[matches[1].toUpperCase()];
// //   var octave = parseInt(matches[3]);
// //   var result = ((octave + 1 - Math.floor(wm.octaveOffset)) * 12) + semitones;
// //
// //
// //   if (matches[2].toLowerCase().indexOf("b") > -1) {
// //     result -= matches[2].length;
// //   } else if (matches[2].toLowerCase().indexOf("#") > -1) {
// //     result += matches[2].length;
// //   }
// //
// //   if (result < 0 || result > 127) {
// //     throw new RangeError("Invalid note name or note outside valid range.");
// //   }
// //
// //   return result;
// //
// // };
// //
// // /**
// //  * @method _updateInputsAndOutputs
// //  * @static
// //  * @protected
// //  */
// // WebMidi.prototype._updateInputsAndOutputs = function() {
// //   this._updateInputs();
// //   this._updateOutputs();
// // };
// //
// // /**
// //  * @method _updateInputs
// //  * @static
// //  * @protected
// //  */
// // WebMidi.prototype._updateInputs = function() {
// //
// //   // Check for items to remove from the existing array (because they are no longer being reported
// //   // by the MIDI back-end).
// //   for (var i = 0; i < this._inputs.length; i++) {
// //
// //     var remove = true;
// //
// //     var updated = this.interface.inputs.values();
// //     for (var input = updated.next(); input && !input.done; input = updated.next()) {
// //       if (this._inputs[i]._midiInput === input.value) {
// //         remove = false;
// //         break;
// //       }
// //     }
// //
// //     if (remove) {
// //       this._inputs.splice(i, 1);
// //     }
// //
// //   }
// //
// //   // Check for items to add in the existing inputs array because they just appeared in the MIDI
// //   // back-end inputs list. We must check for the existence of this.interface because it might
// //   // have been closed via WebMidi.disable().
// //   this.interface && this.interface.inputs.forEach(function (nInput) {
// //
// //     var add = true;
// //
// //     for (var j = 0; j < this._inputs.length; j++) {
// //       if (this._inputs[j]._midiInput === nInput) {
// //         add = false;
// //       }
// //     }
// //
// //     if (add) {
// //       this._inputs.push( new Input(nInput) );
// //     }
// //
// //   }.bind(this));
// //
// // };
// //
// // /**
// //  * @method _updateOutputs
// //  * @static
// //  * @protected
// //  */
// // WebMidi.prototype._updateOutputs = function() {
// //
// //   // Check for items to remove from the existing array (because they are no longer being reported
// //   // by the MIDI back-end).
// //   for (var i = 0; i < this._outputs.length; i++) {
// //
// //     var remove = true;
// //
// //     var updated = this.interface.outputs.values();
// //     for (var output = updated.next(); output && !output.done; output = updated.next()) {
// //       if (this._outputs[i]._midiOutput === output.value) {
// //         remove = false;
// //         break;
// //       }
// //     }
// //
// //     if (remove) {
// //       this._outputs.splice(i, 1);
// //     }
// //
// //   }
// //
// //   // Check for items to add in the existing inputs array because they just appeared in the MIDI
// //   // back-end outputs list. We must check for the existence of this.interface because it might
// //   // have been closed via WebMidi.disable().
// //   this.interface && this.interface.outputs.forEach(function (nOutput) {
// //
// //     var add = true;
// //
// //     for (var j = 0; j < this._outputs.length; j++) {
// //       if (this._outputs[j]._midiOutput === nOutput) {
// //         add = false;
// //       }
// //     }
// //
// //     if (add) {
// //       this._outputs.push( new Output(nOutput) );
// //     }
// //
// //   }.bind(this));
// //
// // };
// //
// // /**
// //  * @method _onInterfaceStateChange
// //  * @static
// //  * @protected
// //  */
// // WebMidi.prototype._onInterfaceStateChange = function(e) {
// //
// //   this._updateInputsAndOutputs();
// //
// //   /**
// //    * Event emitted when a MIDI port becomes available. This event is typically fired whenever a
// //    * MIDI device is plugged in. Please note that it may fire several times if a device possesses
// //    * multiple input/output ports.
// //    *
// //    * @event connected
// //    * @param {Object} event
// //    * @param {Number} event.timestamp The timestamp when the event occurred (in milliseconds since
// //    * the epoch).
// //    * @param {String} event.type The type of event that occurred.
// //    * @param {String} event.port The actual `Input` or `Output` object associated to the event.
// //    */
// //
// //   /**
// //    * Event emitted when a MIDI port becomes unavailable. This event is typically fired whenever a
// //    * MIDI device is unplugged. Please note that it may fire several times if a device possesses
// //    * multiple input/output ports.
// //    *
// //    * @event disconnected
// //    * @param {Object} event
// //    * @param {Number} event.timestamp The timestamp when the event occurred (in milliseconds since
// //    * the epoch).
// //    * @param {String} event.type The type of event that occurred.
// //    * @param {String} event.port An generic object containing details about the port that triggered
// //    * the event.
// //    */
// //   var event = {
// //     timestamp: e.timeStamp,
// //     type: e.port.state
// //   };
// //
// //   if (this.interface && e.port.state === "connected") {
// //
// //     if (e.port.type === "output") {
// //       event.port = this.getOutputById(e.port.id);
// //     } else if (e.port.type === "input") {
// //       event.port = this.getInputById(e.port.id);
// //     }
// //
// //   } else {
// //
// //     event.port = {
// //       connection: "closed",
// //       id: e.port.id,
// //       manufacturer: e.port.manufacturer,
// //       name: e.port.name,
// //       state: e.port.state,
// //       type: e.port.type
// //     };
// //
// //   }
// //
// //   this._userHandlers[e.port.state].forEach(function (handler) {
// //     handler(event);
// //   });
// //
// // };
// //
// // /**
// //  * @method _resetInterfaceUserHandlers
// //  * @static
// //  * @protected
// //  */
// // WebMidi.prototype._resetInterfaceUserHandlers = function() {
// //
// //   for (var i = 0; i < this._midiInterfaceEvents.length; i++) {
// //     this._userHandlers[this._midiInterfaceEvents[i]] = [];
// //   }
// //
// // };
