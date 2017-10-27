(function(scope) {

  "use strict";

  /**
   * The `WebMidi` object makes it easier to work with the Web MIDI API. Basically, it simplifies
   * two things: sending outgoing MIDI messages and reacting to incoming MIDI messages.
   *
   * Sending MIDI messages is done via an `Output` object. All available outputs can be accessed in
   * the `WebMidi.outputs` array. There is one `Output` object for each output port available on
   * your system. Similarly, reacting to MIDI messages as they are coming in is simply a matter of
   * adding a listener to an `Input` object. Similarly, all inputs can be found in the
   * `WebMidi.inputs` array.
   *
   * Please note that a single hardware device might create more than one input and/or output ports.
   *
   * #### Sending messages
   *
   * To send MIDI messages, you simply need to call the desired method (`playNote()`,
   * `sendPitchBend()`, `stopNote()`, etc.) from an `Output` object and pass in the appropriate
   * parameters. All the native MIDI communication will be handled for you. The only additional
   * thing that needs to be done is to first enable `WebMidi`. Here is an example:
   *
   *      WebMidi.enable(function(err) {
   *        if (err) console.log("An error occurred", err);
   *        WebMidi.outputs[0].playNote("C3");
   *      });
   *
   * The code above, calls the `WebMidi.enable()` method. Upon success, this method executes the
   * callback function specified as a parameter. In this case, the callback calls the `playnote()`
   * function to play a 3rd octave C on the first available output port.
   *
   * #### Receiving messages
   *
   * Receiving messages is just as easy. You simply have to set a callback function to be triggered
   * when a specific MIDI message is received. For example, here's how to listen for pitch bend
   * events on the first input port:
   *
   *      WebMidi.enable(function(err) {
   *        if (err) console.log("An error occurred", err);
   *
   *        WebMidi.inputs[0].addListener('pitchbend', "all", function(e) {
   *          console.log("Pitch value: " + e.value);
   *        });
   *
   *      });
   *
   * As you can see, this library is much easier to use than the native Web MIDI API. No need to
   * manually craft or decode binary MIDI messages anymore!
   *
   * @class WebMidi
   * @static
   *
   * @throws Error WebMidi is a singleton, it cannot be instantiated directly.
   *
   * @todo  Implement port statechange events.
   * @todo  Test with the Node.js version of Jazz Plugin. Initial tests are promising.
   * @todo  Complete tests
   * @todo  Refine "options" param of addListener. Allow listening for specific controller change.
   * @todo  Add once() function.
   * @todo  Yuidoc does not allow multiple exceptions (@throws) for a single method ?!
   * @todo  Should the sendsysex method allow Uint8Array param ?
   * @todo  allow adjustment of the start point for octaves (-2, -1, 0, etc.). See:
   *        https://en.wikipedia.org/wiki/Scientific_pitch_notation
   * @todo  Add explicit support for universal system exclusive messages, real time (0x7F and non-real time)
   * @todo  Implement the show control protocol subset.
   * @todo  Add methods for channel mode messages
   *
   */
  function WebMidi() {

    // Singleton. Prevent instantiation through WebMidi.__proto__.constructor()
    if (WebMidi.prototype._singleton) {
      throw new Error("WebMidi is a singleton, it cannot be instantiated directly.");
    }
    WebMidi.prototype._singleton = this;

    // MIDI inputs and outputs
    this._inputs = [];
    this._outputs = [];

    // Object to hold all user-defined handlers for interface-wide events (connected, disconnected,
    // etc.)
    this._userHandlers = {};

    // Array of statechange events to process. These events must be parsed synchronously so they do
    // not override each other.
    this._stateChangeQueue = [];

    // Indicates whether we are currently processing a statechange event (in which case new events
    // are to be queued).
    this._processingStateChange = false;

    // Events triggered at the interface level (WebMidi)
    this._midiInterfaceEvents = ["connected", "disconnected"];

    // Notes and semitones for note guessing
    this._notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    this._semitones = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11 };

    // Define some "static" properties
    Object.defineProperties(this, {

      /**
       * [read-only] List of valid MIDI system messages and matching hexadecimal values.
       *
       * Note: values 249 and 253 are actually dispatched by the Web MIDI API but I do not know what
       * they are used for. They are not part of the online
       * [MIDI 1.0 spec](http://www.midi.org/techspecs/midimessages.php).
       *
       * @property MIDI_SYSTEM_MESSAGES
       * @type Object
       * @static
       *
       * @since 2.0.0
       */
      MIDI_SYSTEM_MESSAGES: {
        value: {

          // System common messages
          "sysex": 0xF0,            // 240
          "timecode": 0xF1,         // 241
          "songposition": 0xF2,     // 242
          "songselect": 0xF3,       // 243
          "tuningrequest": 0xF6,    // 246
          "sysexend": 0xF7,         // 247 (never actually received - simply ends a sysex)

          // System real-time messages
          "clock": 0xF8,            // 248
          "start": 0xFA,            // 250
          "continue": 0xFB,         // 251
          "stop": 0xFC,             // 252
          "activesensing": 0xFE,    // 254
          "reset": 0xFF,            // 255
          "unknownsystemmessage": -1
        },
        writable: false,
        enumerable: true,
        configurable: false
      },

      /**
       * [read-only] List of valid MIDI channel messages and matching hexadecimal values.
       *
       * @property MIDI_CHANNEL_MESSAGES
       * @type Object
       * @static
       *
       * @since 2.0.0
       */
      MIDI_CHANNEL_MESSAGES: {
        value: {
          "noteoff": 0x8,           // 8
          "noteon": 0x9,            // 9
          "keyaftertouch": 0xA,     // 10
          "controlchange": 0xB,     // 11
          "channelmode": 0xB,       // 11
          "programchange": 0xC,     // 12
          "channelaftertouch": 0xD, // 13
          "pitchbend": 0xE          // 14
        },
        writable: false,
        enumerable: true,
        configurable: false
      },

      /**
       * [read-only] List of valid MIDI registered parameters and their matching pair of hexadecimal
       * values. MIDI registered parameters extend the original list of control change messages.
       * Currently, there are only a limited number of them.
       *
       * @property MIDI_REGISTERED_PARAMETER
       * @type Object
       * @static
       *
       * @since 2.0.0
       */
      MIDI_REGISTERED_PARAMETER: {
        value: {
          'pitchbendrange': [0x00, 0x00],
          'channelfinetuning': [0x00, 0x01],
          'channelcoarsetuning': [0x00, 0x02],
          'tuningprogram': [0x00, 0x03],
          'tuningbank': [0x00, 0x04],
          'modulationrange': [0x00, 0x05],

          'azimuthangle': [0x3D, 0x00],
          'elevationangle': [0x3D, 0x01],
          'gain': [0x3D, 0x02],
          'distanceratio': [0x3D, 0x03],
          'maximumdistance': [0x3D, 0x04],
          'maximumdistancegain': [0x3D, 0x05],
          'referencedistanceratio': [0x3D, 0x06],
          'panspreadangle': [0x3D, 0x07],
          'rollangle': [0x3D, 0x08]
        },
        writable: false,
        enumerable: true,
        configurable: false
      },

      /**
       * [read-only] List of MIDI control change messages
       *
       * valid MIDI registered parameterS and their matching pair of hexadecimal
       * values. MIDI registered parameters extend the original list of control change messages.
       * Currently, there are only a limited number of them.
       *
       * @property MIDI_CONTROL_CHANGE_MESSAGES
       * @type Object
       * @static
       *
       * @since 2.0.0
       */
      MIDI_CONTROL_CHANGE_MESSAGES: {
        value: {
          'bankselectcoarse': 0,
          'modulationwheelcoarse': 1,
          'breathcontrollercoarse': 2,
          'footcontrollercoarse': 4,
          'portamentotimecoarse': 5,
          'dataentrycoarse': 6,
          'volumecoarse': 7,
          'balancecoarse': 8,
          'pancoarse': 10,
          'expressioncoarse': 11,
          'effectcontrol1coarse': 12,
          'effectcontrol2coarse': 13,
          'generalpurposeslider1': 16,
          'generalpurposeslider2': 17,
          'generalpurposeslider3': 18,
          'generalpurposeslider4': 19,
          'bankselectfine': 32,
          'modulationwheelfine': 33,
          'breathcontrollerfine': 34,
          'footcontrollerfine': 36,
          'portamentotimefine': 37,
          'dataentryfine': 38,
          'volumefine': 39,
          'balancefine': 40,
          'panfine': 42,
          'expressionfine': 43,
          'effectcontrol1fine': 44,
          'effectcontrol2fine': 45,
          'holdpedal': 64,
          'portamento': 65,
          'sustenutopedal': 66,
          'softpedal': 67,
          'legatopedal': 68,
          'hold2pedal': 69,
          'soundvariation': 70,
          'resonance': 71,
          'soundreleasetime': 72,
          'soundattacktime': 73,
          'brightness': 74,
          'soundcontrol6': 75,
          'soundcontrol7': 76,
          'soundcontrol8': 77,
          'soundcontrol9': 78,
          'soundcontrol10': 79,
          'generalpurposebutton1': 80,
          'generalpurposebutton2': 81,
          'generalpurposebutton3': 82,
          'generalpurposebutton4': 83,
          'reverblevel': 91,
          'tremololevel': 92,
          'choruslevel': 93,
          'celestelevel': 94,
          'phaserlevel': 95,
          'databuttonincrement': 96,
          'databuttondecrement': 97,
          'nonregisteredparametercoarse': 98,
          'nonregisteredparameterfine': 99,
          'registeredparametercoarse': 100,
          'registeredparameterfine': 101
        },
        writable: false,
        enumerable: true,
        configurable: false
      },

      /**
       * [read-only] List of MIDI channel mode messages as defined in the official MIDI
       * specification.
       *
       * @property MIDI_CHANNEL_MODE_MESSAGES
       * @type Object
       * @static
       *
       * @since 2.0.0
       */
      MIDI_CHANNEL_MODE_MESSAGES: {
        value: {
          "allsoundoff": 120,
          "resetallcontrollers": 121,
          "localcontrol": 122,
          "allnotesoff": 123,
          "omnimodeoff": 124,
          "omnimodeon": 125,
          "monomodeon": 126,
          "polymodeon": 127
        },
        writable: false,
        enumerable: true,
        configurable: false
      }

    });

    // Define getters
    Object.defineProperties(this, {

      /**
       * [read-only] Indicates whether the environment supports the Web MIDI API or not.
       *
       * Note: in environments that do not offer built-in MIDI support, this will report true if the
       * `navigator.requestMIDIAccess` function is available. For example, if you have installed
       * WebMIDIAPIShim but no plugin, this property will be true even though actual support might
       * not be there.
       *
       * @property supported
       * @type Boolean
       * @static
       */
      supported: {
        enumerable: true,
        get: function() {
          return "requestMIDIAccess" in navigator;
        }
      },

      /**
       * [read-only] Indicates whether the interface to the host's MIDI subsystem is currently
       * enabled.
       *
       * @property enabled
       * @type Boolean
       * @static
       */
      enabled: {
        enumerable: true,
        get: function() {
          return this.interface !== undefined;
        }.bind(this)
      },

      /**
       * [read-only] An array of all currently available MIDI input ports.
       *
       * @property inputs
       * @type {Array}
       * @static
       */
      inputs: {
        enumerable: true,
        get: function() {
          return this._inputs;
        }.bind(this)
      },

      /**
       * [read-only] An array of all currently available MIDI output ports.
       *
       * @property outputs
       * @type {Array}
       * @static
       */
      outputs: {
        enumerable: true,
        get: function() {
          return this._outputs;
        }.bind(this)
      },

      /**
       * [read-only] Indicates whether the interface to the host's MIDI subsystem is currently
       * active.
       *
       * @property sysexEnabled
       * @type Boolean
       * @static
       */
      sysexEnabled: {
        enumerable: true,
        get: function() {
          return !!(this.interface && this.interface.sysexEnabled);
        }.bind(this)
      },

      /**
       * [read-only] Current MIDI performance time in milliseconds. This can be used to queue events
       * in the future.
       *
       * @property time
       * @type DOMHighResTimeStamp
       * @static
       */
      time: {
        enumerable: true,
        get: function() {
          return performance.now();
        }
      }

    });

  }

  // WebMidi is a singleton so we instantiate it ourselves and keep it in a var for internal
  // reference.
  var wm = new WebMidi();

  /**
   * Checks if the Web MIDI API is available and then tries to connect to the host's MIDI subsystem.
   * This is an asynchronous operation. When it's done, the specified handler callback will be
   * executed. If an error occurred, the callback function will receive an `Error` object as its
   * sole parameter.
   *
   * To enable the use of system exclusive messages, the `sysex` parameter should be set to true.
   * However, under some environments (e.g. Jazz-Plugin), the sysex parameter is ignored and sysex
   * is always enabled.
   *
   * @method enable
   * @static
   *
   * @param [callback] {Function} A function to execute upon success. This function will receive an
   * `Error` object upon failure to enable the Web MIDI API.
   * @param [sysex=false] {Boolean} Whether to enable MIDI system exclusive messages or not.
   *
   * @throws Error The Web MIDI API is not supported by your browser.
   * @throws Error Jazz-Plugin must be installed to use WebMIDIAPIShim.
   */
  WebMidi.prototype.enable = function(callback, sysex) {

    // Why are you not using a Promise-based API for the enable() method?
    //
    // Short answer: because of IE.
    //
    // Long answer:
    //
    // IE 11 and below still do not support promises. Therefore, WebMIDIAPIShim has to implement a
    // simple Promise look-alike object to handle the call to requestMIDIAccess(). This look-alike
    // is not a fully-fledged Promise object. It does not support using catch() for example. This
    // means that, to provide a real Promise-based interface for the enable() method, we would need
    // to add a dependency in the form of a Promise polyfill. So, to keep things simpler, we will
    // stick to the good old callback based enable() function.

    if (this.enabled) return;

    if ( !this.supported) {

      if (typeof callback === "function") {
        callback( new Error("The Web MIDI API is not supported by your browser.") );
      }

      return;

    }

    navigator.requestMIDIAccess({"sysex": sysex}).then(

      function(midiAccess) {

        var events = [],
            promises = [];

        this.interface = midiAccess;
        this._resetInterfaceUserHandlers();

        // We setup a temporary `statechange` handler that will catch all events triggered while we
        // setup. Those events will be re-triggered after calling the user's callback. This will
        // allow the user to listen to "connected" events which can be very convenient.
        this.interface.onstatechange = function (e) {
          events.push(e);
        };

        // Here we manually open the inputs and outputs. Usually, this is optional. When the ports
        // are not explicitely opened, they will be opened automatically (and asynchonously) by
        // setting a listener on `midimessage` (MIDIInput) or calling `send()` (MIDIOutput).
        // However, we do not want that here. We want to be sure that "connected" events will be
        // available in the user's callback. So, what we do is open all input and output ports and
        // wait until all promises are resolved. Then, we re-trigger the events after the user's
        // callback has been executed. This seems like the most sensible and practical way.
        var inputs = midiAccess.inputs.values();
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
          promises.push(input.value.open());
        }

        var outputs = midiAccess.outputs.values();
        for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
          promises.push(output.value.open());
        }

        // Since this library can be used with JazzMidi with no support for promises, we must make
        // sure it still works. The workaround is to use a timer to wait a little. Once the Web MIDI
        // API is well implanted, we'll get rid of that.
        if (Promise) {
          Promise.all(promises).then(onPortsOpen.bind(this));
        } else {
          setTimeout(onPortsOpen.bind(this), 200);
        }

        function onPortsOpen() {

          this._updateInputsAndOutputs();
          this.interface.onstatechange = this._onInterfaceStateChange.bind(this);

          // We execute the callback and then re-trigger the statechange events.
          if (typeof callback === "function") { callback.call(this); }

          events.forEach(function (event) {
            this._onInterfaceStateChange(event);
          }.bind(this));

        }

        // When MIDI access is requested, all input and output ports have their "state" set to
        // "connected". However, the value of their "connection" property is "closed".
        //
        // A `MIDIInput` becomes `open` when you explicitely call its `open()` method or when you
        // assign a listener to its `onmidimessage` property. A `MIDIOutput` becomes `open` when you
        // use the `send()` method or when you can explicitely call its `open()` method.
        //
        // Calling `_updateInputsAndOutputs()` attaches listeners to all inputs. As per the spec,
        // this triggers a `statechange` event on MIDIAccess.

      }.bind(this),

      function (err) {
        if (typeof callback === "function") { callback.call(this, err); }
      }.bind(this)

    );

  };

  /**
   * Completely disables `WebMidi` by unlinking the MIDI subsystem's interface and destroying all
   * `Input` and `Output` objects that may be available. This also means that any listener that may
   * have been defined on `Input` or `Output` objects will be destroyed.
   *
   * @method disable
   * @static
   *
   * @since 2.0.0
   */
  WebMidi.prototype.disable = function() {

    if ( !this.supported ) {
      throw new Error("The Web MIDI API is not supported by your browser.");
    }

    if (this.interface) this.interface.onstatechange = undefined;
    this.interface = undefined; // also resets enabled, sysexEnabled
    this._inputs = [];
    this._outputs = [];
    this._resetInterfaceUserHandlers();

  };

  /**
   * Adds an event listener on the `WebMidi` object that will trigger a function callback when the
   * specified event happens.
   *
   * WebMidi must be enabled before adding event listeners.
   *
   * Currently, only one event is being dispatched by the `WebMidi` object:
   *
   *    * {{#crossLink "WebMidi/statechange:event"}}statechange{{/crossLink}}
   *
   * @method addListener
   * @static
   * @chainable
   *
   * @param type {String} The type of the event.
   *
   * @param listener {Function} A callback function to execute when the specified event is detected.
   * This function will receive an event parameter object. For details on this object's properties,
   * check out the documentation for the various events (links above).
   *
   * @throws {Error} WebMidi must be enabled before adding event listeners.
   * @throws {TypeError} The specified event type is not supported.
   * @throws {TypeError} The 'listener' parameter must be a function.
   *
   * @return {WebMidi} Returns the `WebMidi` object so methods can be chained.
   */
  WebMidi.prototype.addListener = function(type, listener) {

      if (!this.enabled) {
        throw new Error("WebMidi must be enabled before adding event listeners.");
      }

      if (typeof listener !== "function") {
        throw new TypeError("The 'listener' parameter must be a function.");
      }

      if (this._midiInterfaceEvents.indexOf(type) >= 0) {
        this._userHandlers[type].push(listener);
      } else {
        throw new TypeError("The specified event type is not supported.");
      }

      return this;

  };

  /**
   * Checks if the specified event type is already defined to trigger the specified listener
   * function.
   *
   * @method hasListener
   * @static
   *
   * @param {String} type The type of the event.
   * @param {Function} listener The callback function to check for.
   *
   * @throws {Error} WebMidi must be enabled before checking event listeners.
   * @throws {TypeError} The 'listener' parameter must be a function.
   * @throws {TypeError} The specified event type is not supported.
   *
   * @return {Boolean} Boolean value indicating whether or not a callback is already defined for
   * this event type.
   */
  WebMidi.prototype.hasListener = function(type, listener) {

    if (!this.enabled) {
      throw new Error("WebMidi must be enabled before checking event listeners.");
    }

    if (typeof listener !== "function") {
      throw new TypeError("The 'listener' parameter must be a function.");
    }

    if (this._midiInterfaceEvents.indexOf(type) >= 0) {

      for (var o = 0; o < this._userHandlers[type].length; o++) {
        if (this._userHandlers[type][o] === listener) {
          return true;
        }
      }

    } else {
      throw new TypeError("The specified event type is not supported.");
    }

    return false;

  };

  /**
   * Removes the specified listener(s). If the `listener` parameter is left undefined, all listeners
   * for the specified `type` will be removed. If both the `listener` and the `type` parameters are
   * omitted, all listeners attached to the `WebMidi` object will be removed.
   *
   * @method removeListener
   * @static
   * @chainable
   *
   * @param {String} [type] The type of the event.
   * @param {Function} [listener] The callback function to check for.
   *
   * @throws {Error} WebMidi must be enabled before removing event listeners.
   * @throws {TypeError} The 'listener' parameter must be a function.
   * @throws {TypeError} The specified event type is not supported.
   *
   * @return {WebMidi} The `WebMidi` object for easy method chaining.
   */
  WebMidi.prototype.removeListener = function(type, listener) {

    if (!this.enabled) {
      throw new Error("WebMidi must be enabled before removing event listeners.");
    }

    if (listener !== undefined && typeof listener !== "function") {
      throw new TypeError("The 'listener' parameter must be a function.");
    }

    if (this._midiInterfaceEvents.indexOf(type) >= 0) {

      if (listener) {

        for (var o = 0; o < this._userHandlers[type].length; o++) {
          if (this._userHandlers[type][o] === listener) {
            this._userHandlers[type].splice(o, 1);
          }
        }

      } else {
        this._userHandlers[type] = [];
      }

    } else if (type === undefined) {

      this._resetInterfaceUserHandlers();

    } else {
      throw new TypeError("The specified event type is not supported.");
    }

    return this;

  };

  /**
   *
   * Returns an `Input` object representing the input port with the specified id.
   *
   * Please note that the IDs change from one host to another. For example, Chrome does not use the
   * same kind of IDs as the Jazz-Plugin.
   *
   * @method getInputById
   * @static
   *
   * @param id {String} The id of the port. IDs can be viewed by looking at the `WebMidi.inputs`
   * array.
   *
   * @returns {Input|false} A MIDIInput port matching the specified id. If no matching port
   * can be found, the method returns `false`.
   *
   * @since 2.0.0
   */
  WebMidi.prototype.getInputById = function(id) {

    if (!this.enabled) {
      throw new Error("WebMidi is not enabled.");
    }

    for (var i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i].id === id) { return this.inputs[i]; }
    }

    return false;

  };

  /**
   *
   * Returns an `Output` object representing the output port matching the specified id.
   *
   * Please note that the IDs change from one host to another. For example, Chrome does not use the
   * same kind of IDs as the Jazz-Plugin.
   *
   * @method getOutputById
   * @static
   *
   * @param id {String} The id of the port. Ids can be viewed by looking at the `WebMidi.outputs`
   * array.
   *
   * @returns {Output|false} A MIDIOutput port matching the specified id. If no matching
   * port can be found, the method returns `false`.
   *
   * @since 2.0.0
   */
  WebMidi.prototype.getOutputById = function(id) {

    if (!this.enabled) {
      throw new Error("WebMidi is not enabled.");
    }

    for (var i = 0; i < this.outputs.length; i++) {
      if (this.outputs[i].id === id) { return this.outputs[i]; }
    }

    return false;

  };

  /**
   * Returns the first MIDI `Input` whose name *contains* the specified string.
   *
   * Please note that the port names change from one host to another. For example, Chrome does
   * not report port names in the same way as the Jazz-Plugin does.
   *
   * @method getInputByName
   * @static
   *
   * @param name {String} The name of a MIDI input port such as those visible in the
   * `WebMidi.inputs` array.
   *
   * @returns {Input|False} The `Input` that was found or `false` if no input matched the specified
   * name.
   *
   * @throws Error WebMidi is not enabled.
   * @throws TypeError The name must be a string.
   *
   * @since 2.0.0
   */
  WebMidi.prototype.getInputByName = function(name) {

    if (!this.enabled) {
      throw new Error("WebMidi is not enabled.");
    }

    for (var i = 0; i < this.inputs.length; i++) {
      if (~this.inputs[i].name.indexOf(name)) { return this.inputs[i]; }
    }

    return false;

  };

  /**
   * Returns the octave number for the specified MIDI note number. The returned value will be
   * between -2 and 8.
   *
   * @method getOctave
   * @static
   *
   * @param number {Number} An integer representing a valid MIDI note number (between 0 and 127).
   *
   * @returns {Number} The octave as an integer between -2 and 8. If the note number passed to
   * `getOctave()` is invalid, `undefined` will be returned.
   *
   * @since 2.0.0-rc.6
   */
  WebMidi.prototype.getOctave = function(number) {

    if (number && number >= 0 && number <= 127) {
      return Math.floor(parseInt(number) / 12 - 1) - 1;
    }

  };

  /**
   * Returns the first MIDI `Output` that matches the specified name.
   *
   * Please note that the port names change from one host to another. For example, Chrome does
   * not report port names in the same way as the Jazz-Plugin does.
   *
   * @method getOutputByName
   * @static
   *
   * @param name {String} The name of a MIDI output port such as those visible in the
   * `WebMidi.outputs` array.
   *
   * @returns {Output|False} The `Output` that was found or `false` if no output matched the
   * specified name.
   *
   * @throws Error WebMidi is not enabled.
   *
   * @since 2.0.0
   */
  WebMidi.prototype.getOutputByName = function(name) {

    if (!this.enabled) {
      throw new Error("WebMidi is not enabled.");
    }

    for (var i = 0; i < this.outputs.length; i++) {
      if (~this.outputs[i].name.indexOf(name)) { return this.outputs[i]; }
    }

    return false;

  };

  /**
   * Returns a valid MIDI note number given the specified input. The input can be a note name (C3,
   * F#4, D-2, G8, etc.) or an int between 0 and 127.
   *
   * @method guessNoteNumber
   * @static
   *
   * @param input {Number|String} A string to extract the note number from. An integer can also be
   * used, in which case it will simply be returned (if between 0 and 127).
   * @throws {Error} Invalid note number.
   * @returns {Number} A valid MIDI note number (0-127).
   */
  WebMidi.prototype.guessNoteNumber = function(input) {
  
    var output = false;
  
    if (input && input.toFixed && input >= 0 && input <= 127) {         // uint
      output = Math.round(input);
    } else if (parseInt(input) >= 0 && parseInt(input) <= 127) {        // uint as string
      output = parseInt(input);
    } else if (typeof input === 'string' || input instanceof String) {  // string
      output = this.noteNameToNumber(input);
    }
  
    if (output === false) {
      throw new Error("Invalid note number (" + input + ").");
    }

    return output;

  };

  /**
   * Returns a MIDI note number matching the note name passed in the form of a string parameter. The
   * note name must include the octave number which should be between -2 and 8. The name can also
   * optionally include a sharp "#" or double sharp "##" symbol and a flat "b" or double flat "bb"
   * symbol: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.
   *
   * The lowest note is C-2 (MIDI note number 0) and the highest note is G8 (MIDI note number 127).
   *
   * @method noteNameToNumber
   * @static
   *
   * @param name {String} The name of the note in the form of a letter, followed by an optional "#",
   * "##", "b" or "bb" followed by the octave number (between -2 and 8).
   *
   * @throws {RangeError} Invalid note name.
   * @throws {RangeError} Invalid note name or note outside valid range.
   * @return {Number} The MIDI note number (between 0 and 127)
   */
  WebMidi.prototype.noteNameToNumber = function(name) {

    if (typeof name !== "string") { name = ''; }

    var matches = name.match(/([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)/i);
    if(!matches) { throw new RangeError("Invalid note name."); }

    var semitones = wm._semitones[matches[1].toUpperCase()];
    var octave = parseInt(matches[3]);
    var result = ((octave + 2) * 12) + semitones;

    if (matches[2].toLowerCase().indexOf("b") > -1) {
      result -= matches[2].length;
    } else if (matches[2].toLowerCase().indexOf("#") > -1) {
      result += matches[2].length;
    }

    if (semitones < 0 || octave < -2 || octave > 8 || result < 0 || result > 127) {
      throw new RangeError("Invalid note name or note outside valid range.");
    }

    return result;

  };

  /**
   * @method _updateInputsAndOutputs
   * @static
   * @protected
   */
  WebMidi.prototype._updateInputsAndOutputs = function() {
    this._updateInputs();
    this._updateOutputs();
  };

  /**
   * @method _updateInputs
   * @static
   * @protected
   */
  WebMidi.prototype._updateInputs = function() {

    // Check for items to remove from the existing array (because they are no longer being reported
    // by the MIDI back-end).
    for (var i = 0; i < this._inputs.length; i++) {

      var remove = true;

      var updated = this.interface.inputs.values();
      for (var input = updated.next(); input && !input.done; input = updated.next()) {
        if (this._inputs[i]._midiInput === input.value) {
          remove = false;
          break;
        }
      }

      if (remove) {
        this._inputs.splice(i, 1);
      }

    }

    // Check for items to add in the existing inputs array because they just appeared in the MIDI
    // back-end inputs list. We must check for the existence of this.interface because it might
    // have been closed via WebMidi.disable().
    this.interface && this.interface.inputs.forEach(function (nInput) {

      var add = true;

      for (var j = 0; j < this._inputs.length; j++) {
        if (this._inputs[j]._midiInput === nInput) {
          add = false;
        }
      }

      if (add) {
        this._inputs.push( this._createInput(nInput) );
      }

    }.bind(this));

  };

  /**
   * @method _updateOutputs
   * @static
   * @protected
   */
  WebMidi.prototype._updateOutputs = function() {

    // Check for items to remove from the existing array (because they are no longer being reported
    // by the MIDI back-end).
    for (var i = 0; i < this._outputs.length; i++) {

      var remove = true;

      var updated = this.interface.outputs.values();
      for (var output = updated.next(); output && !output.done; output = updated.next()) {
        if (this._outputs[i]._midiOutput === output.value) {
          remove = false;
          break;
        }
      }

      if (remove) {
        this._outputs.splice(i, 1);
      }

    }

    // Check for items to add in the existing inputs array because they just appeared in the MIDI
    // back-end outputs list. We must check for the existence of this.interface because it might
    // have been closed via WebMidi.disable().
    this.interface && this.interface.outputs.forEach(function (nOutput) {

      var add = true;

      for (var j = 0; j < this._outputs.length; j++) {
        if (this._outputs[j]._midiOutput === nOutput) {
          add = false;
        }
      }

      if (add) {
        this._outputs.push( this._createOutput(nOutput) );
      }

    }.bind(this));

  };

  /**
   * @method _createInput
   * @static
   * @protected
   */
  WebMidi.prototype._createInput = function (midiInput) {
    var input = new Input(midiInput);
    input._midiInput.onmidimessage = input._onMidiMessage.bind(input);
    return input;
  };

  /**
   * @method _createOutput
   * @static
   * @protected
   */
  WebMidi.prototype._createOutput = function (midiOutput) {
    var output = new Output(midiOutput);
    output._midiOutput.onmidimessage = output._onMidiMessage.bind(output);
    return output;
  };

  /**
   * @method _onInterfaceStateChange
   * @static
   * @protected
   */
   WebMidi.prototype._onInterfaceStateChange = function(e) {

    this._updateInputsAndOutputs();

    /**
     * Event emitted when a MIDI port becomes available. This event is typically fired whenever a
     * MIDI device is plugged in. Please note that it may fire several times if a device possesses
     * multiple input/output ports.
     *
     * @event connected
     * @param {Object} event
     * @param {Number} event.timestamp The timestamp when the event occurred (in milliseconds since
     * the epoch).
     * @param {String} event.type The type of event that occurred.
     * @param {String} event.port The actual `Input` or `Output` object associated to the event.
     */

    /**
     * Event emitted when a MIDI port becomes unavailable. This event is typically fired whenever a
     * MIDI device is unplugged. Please note that it may fire several times if a device possesses
     * multiple input/output ports.
     *
     * @event disconnected
     * @param {Object} event
     * @param {Number} event.timestamp The timestamp when the event occurred (in milliseconds since
     * the epoch).
     * @param {String} event.type The type of event that occurred.
     * @param {String} event.port An generic object containing details about the port that triggered
     * the event.
     */
    var event = {
      timestamp: e.timeStamp,
      type: e.port.state
    };

    if (this.interface && e.port.state === "connected") {

      if (e.port.type === "output") {
        event.port = this.getOutputById(e.port.id);
      } else if (e.port.type === "input") {
        event.port = this.getInputById(e.port.id);
      }

    } else {

      event.port = {
        connection: "closed",
        id: e.port.id,
        manufacturer: e.port.manufacturer,
        name: e.port.name,
        state: e.port.state,
        type: e.port.type
      }

    }

    this._userHandlers[e.port.state].forEach(function (handler) {
      handler(event);
    });

  };

  /**
   * @method _resetInterfaceUserHandlers
   * @static
   * @protected
   */
  WebMidi.prototype._resetInterfaceUserHandlers = function() {

    for (var i = 0; i < this._midiInterfaceEvents.length; i++) {
      this._userHandlers[this._midiInterfaceEvents[i]] = [];
    }

  };

  /**
   * The `Input` object represents a MIDI input port on the host system. This object is created by
   * the MIDI subsystem and cannot be instantiated directly.
   *
   * You will find all available `Input` objects in the `WebMidi.inputs` array.
   *
   * @class Input
   * @param {MIDIInput} midiInput `MIDIInput` object
   */
  function Input(midiInput) {

    var that = this;

    // User-defined handlers list
    this._userHandlers = { "channel": {}, "system": {} };

    // Reference to the actual MIDIInput object
    this._midiInput = midiInput;

    Object.defineProperties(this, {

      /**
       * [read-only] Status of the MIDI port's connection (`pending`, `open` or `closed`)
       *
       * @property connection
       * @type String
       */
      connection: {
        enumerable: true,
        get: function () {
          return that._midiInput.connection;
        }
      },

      /**
       * [read-only] ID string of the MIDI port. The ID is host-specific. Do not expect the same ID
       * on different platforms. For example, Google Chrome and the Jazz-Plugin report completely
       * different IDs for the same port.
       *
       * @property id
       * @type String
       */
      id: {
        enumerable: true,
        get: function () {
          return that._midiInput.id;
        }
      },

      /**
       * [read-only] Name of the manufacturer of the device that makes this port available.
       *
       * @property manufacturer
       * @type String
       */
      manufacturer: {
        enumerable: true,
        get: function () {
          return that._midiInput.manufacturer;
        }
      },

      /**
       * [read-only] Name of the MIDI port
       *
       * @property name
       * @type String
       */
      name: {
        enumerable: true,
        get: function () {
          return that._midiInput.name;
        }
      },

      /**
       * [read-only] State of the MIDI port (`connected` or `disconnected`)
       *
       * @property state
       * @type String
       */
      state: {
        enumerable: true,
        get: function () {
          return that._midiInput.state;
        }
      },

      /**
       * [read-only] Type of the MIDI port (`input`)
       *
       * @property state
       * @type String
       */
      type: {
        enumerable: true,
        get: function () {
          return that._midiInput.type;
        }
      }

    });

    this._initializeUserHandlers();

  }

  /**
   * Adds an event listener to the `Input` that will trigger a function callback when the specified
   * event happens on the specified channel(s). Here is a list of events that are dispatched by
   * `Input` objects and that can be listened to.
   *
   * Channel-specific MIDI events:
   *
   *    * {{#crossLink "Input/noteoff:event"}}noteoff{{/crossLink}}
   *    * {{#crossLink "Input/noteon:event"}}noteon{{/crossLink}}
   *    * {{#crossLink "Input/keyaftertouch:event"}}keyaftertouch{{/crossLink}}
   *    * {{#crossLink "Input/controlchange:event"}}controlchange{{/crossLink}}
   *    * {{#crossLink "Input/channelmode:event"}}channelmode{{/crossLink}}
   *    * {{#crossLink "Input/programchange:event"}}programchange{{/crossLink}}
   *    * {{#crossLink "Input/channelaftertouch:event"}}channelaftertouch{{/crossLink}}
   *    * {{#crossLink "Input/pitchbend:event"}}pitchbend{{/crossLink}}
   *
   * Device-wide MIDI events:
   *
   *    * {{#crossLink "Input/sysex:event"}}sysex{{/crossLink}}
   *    * {{#crossLink "Input/timecode:event"}}timecode{{/crossLink}}
   *    * {{#crossLink "Input/songposition:event"}}songposition{{/crossLink}}
   *    * {{#crossLink "Input/songselect:event"}}songselect{{/crossLink}}
   *    * {{#crossLink "Input/tuningrequest:event"}}tuningrequest{{/crossLink}}
   *    * {{#crossLink "Input/clock:event"}}clock{{/crossLink}}
   *    * {{#crossLink "Input/start:event"}}start{{/crossLink}}
   *    * {{#crossLink "Input/continue:event"}}continue{{/crossLink}}
   *    * {{#crossLink "Input/stop:event"}}stop{{/crossLink}}
   *    * {{#crossLink "Input/activesensing:event"}}activesensing{{/crossLink}}
   *    * {{#crossLink "Input/reset:event"}}reset{{/crossLink}}
   *    * {{#crossLink "Input/unknownsystemmessage:event"}}unknownsystemmessage{{/crossLink}}
   *
   * For device-wide events, the `channel` parameter will be silently ignored. You can simply use
   * `undefined` in that case.
   *
   * @method addListener
   * @chainable
   *
   * @param type {String} The type of the event.
   *
   * @param channel {Number|Array|String} The MIDI channel to listen on (integer between 1 and 16).
   * You can also specify an array of channel numbers or the value 'all'.
   *
   * @param listener {Function} A callback function to execute when the specified event is detected.
   * This function will receive an event parameter object. For details on this object's properties,
   * check out the documentation for the various events (links above).
   *
   * @throws {RangeError} The 'channel' parameter is invalid.
   * @throws {TypeError} The 'listener' parameter must be a function.
   * @throws {TypeError} The specified event type is not supported.
   *
   * @return {WebMidi} Returns the `WebMidi` object so methods can be chained.
   */
  Input.prototype.addListener = function(type, channel, listener) {

    var that = this;

    if (channel === undefined) { channel = "all"; }
    if (!Array.isArray(channel)) { channel = [channel]; }

    // Check if channel entries are valid
    channel.forEach(function(item){
      if (item !== "all" && !(item >= 1 && item <= 16)) {
        throw new RangeError(
            "The 'channel' parameter is invalid."
        );
      }
    });

    if (typeof listener !== "function") {
      throw new TypeError("The 'listener' parameter must be a function.");
    }

    if (wm.MIDI_SYSTEM_MESSAGES[type]) {

      if (!this._userHandlers.system[type]) {
        this._userHandlers.system[type] = [];
      }

      this._userHandlers.system[type].push(listener);

    } else if (wm.MIDI_CHANNEL_MESSAGES[type]) {

      // If "all" is present anywhere in the channel array, use all 16 channels
      if (channel.indexOf("all") > -1) {
        channel = [];
        for (var j = 1; j <= 16; j++) { channel.push(j); }
      }

      if (!this._userHandlers.channel[type]) { this._userHandlers.channel[type] = []; }

      // Push all channel listeners in the array
      channel.forEach(function(ch){

        if (!that._userHandlers.channel[type][ch]) {
          that._userHandlers.channel[type][ch] = [];
        }

        that._userHandlers.channel[type][ch].push(listener);

      });

    } else {
      throw new TypeError("The specified event type is not supported.");
    }

    return this;

  };



  /**
   * This is an alias to the {{#crossLink "Input/addListener"}}Input.addListener(){{/crossLink}}
   * function.
   *
   * @method on
   * @since 2.0.0
   */
  Input.prototype.on = Input.prototype.addListener;

  /**
   * Checks if the specified event type is already defined to trigger the listener function on the
   * specified channel(s). If more than one channel is specified, the function will return `true`
   * only if all channels have the listener defined.
   *
   * For device-wide events (`sysex`, `start`, etc.), the `channel` parameter is silently ignored.
   * We suggest you use `undefined` in such cases.
   *
   * @method hasListener
   *
   * @param type {String} The type of the event.
   * @param channel {Number|Array|String} The MIDI channel to check on (between 1 and 16). You
   * can also specify an array of channel numbers or the string 'all'.
   * @param listener {Function} The callback function to check for.
   *
   * @throws {TypeError} The 'listener' parameter must be a function.
   *
   * @return {Boolean} Boolean value indicating whether or not the channel(s) already have this
   * listener defined.
   */
  Input.prototype.hasListener = function(type, channel, listener) {

    var that = this;

    if (typeof listener !== "function") {
      throw new TypeError("The 'listener' parameter must be a function.");
    }


    if (channel === undefined) { channel = "all"; }
    if (channel.constructor !== Array) { channel = [channel]; }

    if (wm.MIDI_SYSTEM_MESSAGES[type]) {

      for (var o = 0; o < this._userHandlers.system[type].length; o++) {
        if (this._userHandlers.system[type][o] === listener) { return true; }
      }

    } else if (wm.MIDI_CHANNEL_MESSAGES[type]) {

      // If "all" is present anywhere in the channel array, use all 16 channels
      if (channel.indexOf("all") > -1) {
        channel = [];
        for (var j = 1; j <= 16; j++) { channel.push(j); }
      }

      if (!this._userHandlers.channel[type]) { return false; }

      // Go through all specified channels
      return channel.every(function(chNum) {
        var listeners = that._userHandlers.channel[type][chNum];
        return listeners && listeners.indexOf(listener) > -1;
      });

    }

    return false;

  };

  /**
   * Removes the specified listener from the specified channel(s). If the `listener` parameter is
   * left undefined, all listeners for the specified `type` will be removed from all channels. If
   * the `channel` is also omitted, all listeners of the specified type will be removed from all
   * channels. If no parameters are defined, all listeners attached to any channel of the `Input`
   * will be removed.
   *
   * For device-wide events (`sysex`, `start`, etc.), the `channel` parameter is silently ignored.
   * You can use `undefined` in such cases.
   *
   * @method removeListener
   * @chainable
   *
   * @param [type] {String} The type of the event.
   * @param [channel] {Number|String|Array} The MIDI channel(s) to check on. It can be a uint
   * (between 1 and 16) an array of channel numbers or the special value "all".
   * @param [listener] {Function} The callback function to check for.
   *
   * @throws {TypeError} The specified event type is not supported.
   * @throws {TypeError} The 'listener' parameter must be a function..
   *
   * @return {Input} The `Input` object for easy method chaining.
   */
  Input.prototype.removeListener = function(type, channel, listener) {

    var that = this;

    if (listener !== undefined && typeof listener !== "function") {
      throw new TypeError("The 'listener' parameter must be a function.");
    }

    if (channel === undefined) { channel = "all"; }
    if (channel.constructor !== Array) { channel = [channel]; }

    if (wm.MIDI_SYSTEM_MESSAGES[type]) {

      if (listener === undefined) {

        this._userHandlers.system[type] = [];

      } else {

        for (var o = 0; o < this._userHandlers.system[type].length; o++) {
          if (this._userHandlers.system[type][o] === listener) {
            this._userHandlers.system[type].splice(o, 1);
          }
        }

      }

    } else if (wm.MIDI_CHANNEL_MESSAGES[type]) {

      // If "all" is present anywhere in the channel array, use all 16 channels
      if (channel.indexOf("all") > -1) {
        channel = [];
        for (var j = 1; j <= 16; j++) { channel.push(j); }
      }

      if (!this._userHandlers.channel[type]) { return this; }

      // Go through all specified channels
      channel.forEach(function(chNum) {
        var listeners = that._userHandlers.channel[type][chNum];
        if (!listeners) { return; }

        if (listener === undefined) {
          that._userHandlers.channel[type][chNum] = [];
        } else {
          for (var l = 0; l < listeners.length; l++) {
            if (listeners[l] === listener) { listeners.splice(l, 1); }
          }
        }

      });

    } else if (type === undefined) {
      this._initializeUserHandlers();
    } else {
      throw new TypeError("The specified event type is not supported.");
    }

    return this;

  };

  /**
   * @method _initializeUserHandlers
   * @protected
   */
  Input.prototype._initializeUserHandlers = function() {

    for (var prop1 in wm.MIDI_CHANNEL_MESSAGES) {
      if (wm.MIDI_CHANNEL_MESSAGES.hasOwnProperty(prop1)) {
        this._userHandlers.channel[prop1] = {};
      }
    }

    for (var prop2 in wm.MIDI_SYSTEM_MESSAGES) {
      if (wm.MIDI_SYSTEM_MESSAGES.hasOwnProperty(prop2)) {
        this._userHandlers.system[prop2] = [];
      }
    }

  };

  /**
   * @method _onMidiMessage
   * @protected
   */
  Input.prototype._onMidiMessage = function(e) {

    if (e.data[0] < 240) {          // channel-specific message
      this._parseChannelEvent(e);
    } else if (e.data[0] <= 255) {  // system message
      this._parseSystemEvent(e);
    }

  };

  /**
   * @method _parseChannelEvent
   * @param e Event
   * @protected
   */
  Input.prototype._parseChannelEvent = function(e) {

    var command = e.data[0] >> 4;
    var channel = (e.data[0] & 0xf) + 1;
    var data1, data2;

    if (e.data.length > 1) {
      data1 = e.data[1];
      data2 = e.data.length > 2 ? e.data[2] : undefined;
    }

    // Returned event
    var event = {
      "target": this,
      "data": e.data,
      "timestamp": e.timeStamp,
      "channel": channel
    };

    if (
        command === wm.MIDI_CHANNEL_MESSAGES.noteoff ||
        (command === wm.MIDI_CHANNEL_MESSAGES.noteon && data2 === 0)
    ) {

      /**
       * Event emitted when a note off MIDI message has been received on a specific device and
       * channel.
       *
       * @event noteoff
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)).
       * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
       * @param {String} event.type The type of event that occurred.
       * @param {Object} event.note
       * @param {uint} event.note.number The MIDI note number.
       * @param {String} event.note.name The usual note name (C, C#, D, D#, etc.).
       * @param {uint} event.note.octave The octave (between -2 and 8).
       * @param {Number} event.velocity The release velocity (between 0 and 1).
       * @param {Number} event.rawVelocity The attack velocity expressed as a 7-bit integer (between
       * 0 and 127).
       */
      event.type = 'noteoff';
      event.note = {
        "number": data1,
        "name": wm._notes[data1 % 12],
        "octave": wm.getOctave(data1)
      };
      event.velocity = data2 / 127;
      event.rawVelocity = data2;

    } else if (command === wm.MIDI_CHANNEL_MESSAGES.noteon) {

      /**
       * Event emitted when a note on MIDI message has been received on a specific device and
       * channel.
       *
       * @event noteon
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)).
       * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
       * @param {String} event.type The type of event that occurred.
       * @param {Object} event.note
       * @param {uint} event.note.number The MIDI note number.
       * @param {String} event.note.name The usual note name (C, C#, D, D#, etc.).
       * @param {uint} event.note.octave The octave (between -2 and 8).
       * @param {Number} event.velocity The attack velocity (between 0 and 1).
       * @param {Number} event.rawVelocity The attack velocity expressed as a 7-bit integer (between
       * 0 and 127).
       */
      event.type = 'noteon';
      event.note = {
        "number": data1,
        "name": wm._notes[data1 % 12],
        "octave": wm.getOctave(data1)
      };
      event.velocity = data2 / 127;
      event.rawVelocity = data2;

    } else if (command === wm.MIDI_CHANNEL_MESSAGES.keyaftertouch) {

      /**
       * Event emitted when a key-specific aftertouch MIDI message has been received on a specific
       * device and channel.
       *
       * @event keyaftertouch
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)).
       * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
       * @param {String} event.type The type of event that occurred.
       * @param {Object} event.note
       * @param {uint} event.note.number The MIDI note number.
       * @param {String} event.note.name The usual note name (C, C#, D, D#, etc.).
       * @param {uint} event.note.octave The octave (between -2 and 8).
       * @param {Number} event.value The aftertouch amount (between 0 and 1).
       */
      event.type = 'keyaftertouch';
      event.note = {
        "number": data1,
        "name": wm._notes[data1 % 12],
        "octave": wm.getOctave(data1)
      };
      event.value = data2 / 127;

    } else if (
        command === wm.MIDI_CHANNEL_MESSAGES.controlchange &&
        data1 >= 0 && data1 <= 119
    ) {

      /**
       * Event emitted when a control change MIDI message has been received on a specific device and
       * channel.
       *
       * @event controlchange
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)).
       * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
       * @param {String} event.type The type of event that occurred.
       * @param {Object} event.controller
       * @param {uint} event.controller.number The number of the controller.
       * @param {String} event.controller.name The usual name or function of the controller.
       * @param {uint} event.value The value received (between 0 and 127).
       */
      event.type = 'controlchange';
      event.controller = {
        "number": data1,
        "name": this.getCcNameByNumber(data1)
      };
      event.value = data2;

    } else if (
        command === wm.MIDI_CHANNEL_MESSAGES.channelmode &&
        data1 >= 120 && data1 <= 127
    ) {

      /**
       * Event emitted when a channel mode MIDI message has been received on a specific device and
       * channel.
       *
       * @event channelmode
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)).
       * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
       * @param {String} event.type The type of event that occurred.
       * @param {Object} event.controller
       * @param {uint} event.controller.number The number of the controller.
       * @param {String} event.controller.name The usual name or function of the controller.
       * @param {uint} event.value The value received (between 0 and 127).
       */
      event.type = 'channelmode';
      event.controller = {
        "number": data1,
        "name": this.getChannelModeByNumber(data1)
      };
      event.value = data2;

    } else if (command === wm.MIDI_CHANNEL_MESSAGES.programchange) {

      /**
       * Event emitted when a program change MIDI message has been received on a specific device and
       * channel.
       *
       * @event programchange
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)).
       * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
       * @param {String} event.type The type of event that occurred.
       * @param {uint} event.value The value received (between 0 and 127).
       */
      event.type = 'programchange';
      event.value = data1;

    } else if (command === wm.MIDI_CHANNEL_MESSAGES.channelaftertouch) {

      /**
       * Event emitted when a channel-wide aftertouch MIDI message has been received on a specific
       * device and channel.
       *
       * @event channelaftertouch
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)).
       * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
       * @param {String} event.type The type of event that occurred.
       * @param {Number} event.value The aftertouch value received (between 0 and 1).
       */
      event.type = 'channelaftertouch';
      event.value = data1 / 127;

    } else if (command === wm.MIDI_CHANNEL_MESSAGES.pitchbend) {

      /**
       * Event emitted when a pitch bend MIDI message has been received on a specific device and
       * channel.
       *
       * @event pitchbend
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)).
       * @param {uint} event.channel The channel where the event occurred (between 1 and 16).
       * @param {String} event.type The type of event that occurred.
       * @param {Number} event.value The pitch bend value received (between -1 and 1).
       */
      event.type = 'pitchbend';
      event.value = ((data2 << 7) + data1 - 8192) / 8192;
    } else {
      event.type = 'unknownchannelmessage';
    }

    // If some callbacks have been defined for this event, on that device and channel, execute them.
    if (
        this._userHandlers.channel[event.type] &&
        this._userHandlers.channel[event.type][channel]
    ) {

      this._userHandlers.channel[event.type][channel].forEach(
          function(callback) { callback(event); }
      );
    }

  };

  /**
   * Returns the name of a control change message matching the specified number. If no match is
   * found, the function returns `undefined`.
   *
   * @method getCcNameByNumber
   *
   * @param number {Number} The number of the control change message.
   * @returns {String|undefined} The matching control change name or `undefined`.
   *
   * @throws RangeError The control change number must be between 0 and 119.
   *
   * @since 2.0.0
   */
  Input.prototype.getCcNameByNumber = function(number) {

    number = parseInt(number);

    if ( !(number >= 0 && number <= 119) ) {
      throw new RangeError("The control change number must be between 0 and 119.");
    }

    for (var cc in wm.MIDI_CONTROL_CHANGE_MESSAGES) {
      if (number === wm.MIDI_CONTROL_CHANGE_MESSAGES[cc]) {
        return cc;
      }
    }

    return undefined;

  };

  /**
   * Returns the channel mode name matching the specified number. If no match is found, the function
   * returns `undefined`.
   *
   * @method getChannelModeByNumber
   *
   * @param number {Number} The number of the channel mode message.
   * @returns {String|undefined} The matching channel mode message's name or `undefined`;
   *
   * @throws RangeError The channel mode number must be between 120 and 127.
   *
   * @since 2.0.0
   */
  Input.prototype.getChannelModeByNumber = function(number) {

    number = parseInt(number);

    if ( !(number >= 120 && status <= 127) ) {
      throw new RangeError("The control change number must be between 120 and 127.");
    }

    for (var cm in wm.MIDI_CHANNEL_MODE_MESSAGES) {
      if (number === wm.MIDI_CHANNEL_MODE_MESSAGES[cm]) {
        return cm;
      }
    }

  };

  /**
   * @method _parseSystemEvent
   * @protected
   */
  Input.prototype._parseSystemEvent = function(e) {

    var command = e.data[0];

    // Returned event
    var event = {
      "target": this,
      "data": e.data,
      "timestamp": e.timeStamp
    };

    if (command === wm.MIDI_SYSTEM_MESSAGES.sysex) {

      /**
       * Event emitted when a system exclusive MIDI message has been received. You should note that,
       * to receive `sysex` events, you must call the `WebMidi.enable()` method with a second
       * parameter set to `true`:
       *
       *     WebMidi.enable(function(err) {
       *
       *        if (err) {
       *          console.log("WebMidi could not be enabled.");
       *        }
       *
       *        var input = WebMidi.inputs[0];
       *
       *        input.addListener('sysex', "all", function (e) {
       *          console.log(e);
       *        });
       *
       *     }, true);
       *
       * @event sysex
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the epoch).
       * @param {String} event.type The type of event that occurred.
       *
       */
      event.type = 'sysex';

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.timecode) {

      /**
       * Event emitted when a system MIDI time code quarter frame message has been received.
       *
       * @event timecode
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the epoch).
       * @param {String} event.type The type of event that occurred.
       */
      event.type = 'timecode';

      //@todo calculate time values and make them directly available

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.songposition) {

      /**
       * Event emitted when a system song position pointer MIDI message has been received.
       *
       * @event songposition
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds
       * since the epoch).
       * @param {String} event.type The type of event that occurred.
       */
      event.type = 'songposition';

      //@todo calculate position value and make it directly available

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.songselect) {

      /**
       * Event emitted when a system song select MIDI message has been received.
       *
       * @event songselect
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the epoch).
       * @param {String} event.type The type of event that occurred.
       * @param {String} event.song Song (or sequence) number to select.
       */
      event.type = 'songselect';
      event.song = e.data[1];

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.tuningrequest) {

      /**
       * Event emitted when a system tune request MIDI message has been received.
       *
       * @event tuningrequest
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timestamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'tuningrequest';

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.clock) {

      /**
       * Event emitted when a system timing clock MIDI message has been received.
       *
       * @event clock
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timestamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'clock';

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.start) {

      /**
       * Event emitted when a system start MIDI message has been received.
       *
       * @event start
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timestamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'start';

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.continue) {

      /**
       * Event emitted when a system continue MIDI message has been received.
       *
       * @event continue
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timestamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'continue';

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.stop) {

      /**
       * Event emitted when a system stop MIDI message has been received.
       *
       * @event stop
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timestamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'stop';

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.activesensing) {

      /**
       * Event emitted when a system active sensing MIDI message has been received.
       *
       * @event activesensing
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp      The timestamp when the event occurred (in milliseconds
       * since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'activesensing';

    } else if (command === wm.MIDI_SYSTEM_MESSAGES.reset) {

      /**
       * Event emitted when a system reset MIDI message has been received.
       *
       * @event reset
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp      The timestamp when the event occurred (in milliseconds
       * since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'reset';

    } else {

      /**
       * Event emitted when an unknown system MIDI message has been received. It could be, for
       * example, one of the undefined/reserved messages.
       *
       * @event unknownsystemmessage
       *
       * @param {Object} event
       * @param {Input} event.target The `Input` that triggered the event.
       * @param {Uint8Array} event.data The raw MIDI message as an array of 8 bit values.
       * @param {Number} event.receivedTime The time when the event occurred (in milliseconds since
       * start).
       * @param {uint} event.timestamp The timestamp when the event occurred (in milliseconds since
       * the epoch).
       *
       * @param {String} event.type The type of event that occurred.
       */
      event.type = 'unknownsystemmessage';

    }

    // If some callbacks have been defined for this event, execute them.
    if (this._userHandlers.system[event.type]) {
      this._userHandlers.system[event.type].forEach(
        function(callback) { callback(event); }
      );
    }

  };

  /**
   * The `Output` object represents a MIDI output port on the host system. This object is created by
   * the MIDI subsystem and cannot be instantiated directly.
   *
   * You will find all available `Output` objects in the `WebMidi.outputs` array.
   *
   * @class Output
   * @param {MIDIOutput} midiOutput Actual `MIDIOutput` object as defined by the MIDI subsystem
   */
  function Output(midiOutput) {

    var that = this;

    this._midiOutput = midiOutput;

    Object.defineProperties(this, {

      /**
       * [read-only] Status of the MIDI port's connection
       *
       * @property connection
       * @type String
       */
      connection: {
        enumerable: true,
        get: function () {
          return that._midiOutput.connection;
        }
      },

      /**
       * [read-only] ID string of the MIDI port
       *
       * @property id
       * @type String
       */
      id: {
        enumerable: true,
        get: function () {
          return that._midiOutput.id;
        }
      },

      /**
       * [read-only] Manufacturer of the device to which this port belongs
       *
       * @property manufacturer
       * @type String
       */
      manufacturer: {
        enumerable: true,
        get: function () {
          return that._midiOutput.manufacturer;
        }
      },

      /**
       * [read-only] Name of the MIDI port
       *
       * @property name
       * @type String
       */
      name: {
        enumerable: true,
        get: function () {
          return that._midiOutput.name;
        }
      },

      /**
       * [read-only] State of the MIDI port
       *
       * @property state
       * @type String
       */
      state: {
        enumerable: true,
        get: function () {
          return that._midiOutput.state;
        }
      },

      /**
       * [read-only] Type of the MIDI port (`output`)
       *
       * @property state
       * @type String
       */
      type: {
        enumerable: true,
        get: function () {
          return that._midiInput.type;
        }
      }

    });

  }

  /**
   * Sends a MIDI message on the MIDI output port, at the scheduled timestamp.
   *
   * Unless, you are familiar with the details of the MIDI message format, you should not use this
   * method directly. Instead, use one of the simpler helper methods: `playNote()`, `stopNote()`,
   * `sendControlChange()`, `sendSystemMessage()`, etc.
   *
   * Details on the format of MIDI messages are available in the
   * <a href="http://www.midi.org/techspecs/midimessages.php">summary of MIDI messages</a> of the
   * MIDI Manufacturers Association.
   *
   * @method send
   * @chainable
   *
   * @param status {Number} The MIDI status byte of the message (128-255).
   *
   * @param [data=[]] {Array} An array of uints for the message. The number of data bytes varies
   * depending on the status byte. It is perfectly legal to send no data for some message types.
   * Each byte must be between 0 and 255.
   *
   * @param [timestamp=0] {DOMHighResTimeStamp} The timestamp at which to send the message. You can
   * use `WebMidi.time` to retrieve the current timestamp. To send immediately, leave blank or use
   * 0.
   *
   * @throws {RangeError} The status byte must be an integer between 128 (0x80) and 255 (0xFF).
   * @throws {RangeError} The data bytes must be integers between 0 (0x00) and 255 (0xFF).
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.send = function(status, data, timestamp) {

    if ( !(status >= 128 && status <= 255) ) {
      throw new RangeError("The status byte must be an integer between 128 (0x80) and 255 (0xFF).");
    }

    if ( !Array.isArray(data) ) {
      if ( parseInt(data) >= 0 && parseInt(data) <= 127 ) {
        data = [parseInt(data)];
      } else {
        data = [];
      }
    }

    var message = [status];

    data.forEach(function(item){
      if (item >= 0 && item <= 255) {
        message.push(item);
      } else {
        throw new RangeError("The data bytes must be integers between 0 (0x00) and 255 (0xFF).");
      }
    });

    this._midiOutput.send(message, parseFloat(timestamp) || 0);

    return this;

  };

  /**
   * Sends a MIDI *system exclusive* message. The generated message will automatically be prepended
   * with the *SysEx* byte (0xF0) and terminated with the *End of SysEx* byte (0xF7).
   *
   * For example, if you want to send a SysEx message to a Korg device connected to the first
   * output, you would use the following code:
   *
   *     WebMidi.outputs[0].sendSysex(0x42, [1, 2, 3, 4, 5]);
   *
   * The above code sends the byte values 1, 2, 3, 4 and 5 to Korg (ID 0x42) devices. Some
   * manufacturers are identified using 3 bytes. In this case, you would use a 3-position array as
   * the first parameter. For example, to send the same SysEx message to a *Native Instruments*
   * device:
   *
   *     WebMidi.outputs[0].sendSysex([0x00, 0x21, 0x09], [1, 2, 3, 4, 5]);
   *
   * There is no limit for the length of the data array. However, it is generally suggested to keep
   * system exclusive messages to 64Kb or less.
   *
   * @method sendSysex
   * @chainable
   *
   * @param manufacturer {Number|Array} An unsigned integer or an array of three unsigned integers
   * between 0 and 127 that identify the targeted manufacturer. The *MIDI Manufacturers Association*
   * maintains a full list of
   * [Manufacturer ID Numbers](https://www.midi.org/specifications/item/manufacturer-id-numbers).
   *
   * @param [data=[]] {Array} An array of uints between 0 and 127. This is the data you wish to
   * transfer.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throw SysEx message support must first be activated.
   * @throw The data bytes of a SysEx message must be integers between 0 (0x00) and 127 (0x7F).
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendSysex = function(manufacturer, data, options) {

    if (!wm.sysexEnabled) {
      throw new Error("SysEx message support must first be activated.");
    }

    options = options || {};

    manufacturer = [].concat(manufacturer);

    data.forEach(function(item){
      if (item < 0 || item > 127) {
        throw new RangeError(
            "The data bytes of a SysEx message must be integers between 0 (0x00) and 127 (0x7F)."
        );
      }
    });

    data = manufacturer.concat(data, wm.MIDI_SYSTEM_MESSAGES.sysexend);
    this.send(wm.MIDI_SYSTEM_MESSAGES.sysex, data, this._parseTimeParameter(options.time));

    return this;

  };

  /**
   * Sends a *MIDI Timecode Quarter Frame* message. Please note that no processing is being done on
   * the data. It is up to the developer to format the data according to the
   * [MIDI Timecode](https://en.wikipedia.org/wiki/MIDI_timecode) format.
   *
   * @method sendTimecodeQuarterFrame
   * @chainable
   *
   * @param value {Number} The quarter frame message content (integer between 0 and 127).
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendTimecodeQuarterFrame = function(value, options) {
    options = options || {};
    this.send(wm.MIDI_SYSTEM_MESSAGES.timecode, value, this._parseTimeParameter(options.time));
    return this;
  };

  /**
   * Sends a *Song Position* MIDI message. The value is expressed in MIDI beats (between 0 and
   * 16383) which are 16th note. Position 0 is always the start of the song.
   *
   * @method sendSongPosition
   * @chainable
   *
   * @param [value=0] {Number} The MIDI beat to cue to (int between 0 and 16383).
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendSongPosition = function(value, options) {

    value = parseInt(value) || 0;

    options = options || {};

    var msb = (value >> 7) & 0x7F;
    var lsb = value & 0x7F;

    this.send(
      wm.MIDI_SYSTEM_MESSAGES.songposition,
      [msb, lsb],
      this._parseTimeParameter(options.time)
    );
    return this;

  };

  /**
   * Sends a *Song Select* MIDI message. Beware that some devices will display position 0 as
   * position 1 for user-friendlyness.
   *
   * @method sendSongSelect
   * @chainable
   *
   * @param value {Number} The number of the song to select (integer between 0 and 127).
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throw The song number must be between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendSongSelect = function(value,  options) {

    value = parseInt(value);

    options = options || {};

    if ( !(value >= 0 && value <= 127) ) {
      throw new RangeError("The song number must be between 0 and 127.");
    }

    this.send(wm.MIDI_SYSTEM_MESSAGES.songselect, [value], this._parseTimeParameter(options.time));

    return this;

  };

  /**
   * Sends a *MIDI tuning request* real-time message.
   *
   * Note: there is currently a bug in Chrome's MIDI implementation. If you try to use this
   * function, Chrome will actually throw a "Message is incomplete" error. The bug is
   * [scheduled to be fixed](https://bugs.chromium.org/p/chromium/issues/detail?id=610116).
   *
   * @method sendTuningRequest
   * @chainable
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendTuningRequest = function(options) {
    options = options || {};
    this.send(
      wm.MIDI_SYSTEM_MESSAGES.tuningrequest,
      undefined,
      this._parseTimeParameter(options.time)
    );
    return this;
  };

  /**
   * Sends a *MIDI Clock* real-time message. According to the standard, there are 24 MIDI Clocks
   * for every quarter note.
   *
   * @method sendClock
   * @chainable
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendClock = function(options) {
    options = options || {};
    this.send(wm.MIDI_SYSTEM_MESSAGES.clock, undefined, this._parseTimeParameter(options.time));
    return this;
  };

  /**
   * Sends a *Start* real-time message. A MIDI Start message starts the playback of the current
   * song at beat 0. To start playback elsewhere in the song, use the `sendContinue()` function.
   *
   * @method sendStart
   * @chainable
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendStart = function(options) {
    options = options || {};
    this.send(wm.MIDI_SYSTEM_MESSAGES.start, undefined, this._parseTimeParameter(options.time));
    return this;
  };

  /**
   * Sends a *Continue* real-time message. This resumes song playback where it was previously
   * stopped or where it was last cued with a song position message. To start playback from the
   * start, use the `sendStart()` function.
   *
   * @method sendContinue
   * @chainable
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {WebMidi} Returns the `WebMidi` object so methods can be chained.
   */
  Output.prototype.sendContinue = function(options) {
    options = options || {};
    this.send(wm.MIDI_SYSTEM_MESSAGES.continue, undefined, this._parseTimeParameter(options.time));
    return this;
  };

  /**
   * Sends a *Stop* real-time message. This tells the device connected to this port to stop playback
   * immediately (or at the scheduled time).
   *
   * @method sendStop
   * @chainable
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendStop = function(options) {
    options = options || {};
    this.send(wm.MIDI_SYSTEM_MESSAGES.stop, undefined, this._parseTimeParameter(options.time));
    return this;
  };

  /**
   * Sends an *Active Sensing* real-time message. This tells the device connected to this port that
   * the connection is still good. Active sensing messages should be sent every 300 ms if there was
   * no other activity on the MIDI port.
   *
   * @method sendActiveSensing
   * @chainable
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendActiveSensing = function(options) {
    options = options || {};
    this.send(
      wm.MIDI_SYSTEM_MESSAGES.activesensing,
      undefined,
      this._parseTimeParameter(options.time)
    );
    return this;
  };

  /**
   * Sends *Reset* real-time message. This tells the device connected to this port that is should
   * reset itself to a default state.
   *
   * @method sendReset
   * @chainable
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendReset = function(options) {
    options = options || {};
    this.send(wm.MIDI_SYSTEM_MESSAGES.reset, undefined, this._parseTimeParameter(options.time));
    return this;
  };

  /**
   * Sends a MIDI **note off** message to the specified channel(s) for a single note or multiple
   * simultaneous notes (chord). You can delay the execution of the **note off** command by using
   * the `time` property of the `options` parameter (in milliseconds).
   *
   * @method stopNote
   * @chainable
   *
   * @param note {Number|Array|String}  The note(s) you wish to stop. The notes can be specified in
   * one of three ways. The first way is by using the MIDI note number (an integer between `0` and
   * `127`). The second way is by using the note name followed by the octave (C3, G#4, F-1, Db7).
   * The octave range should be between -2 and 8. The lowest note is C-2 (MIDI note number 0) and
   * the highest note is G8 (MIDI note number 127). It is also possible to specify an array of note
   * numbers and/or names. The final way is to use the special value `all` to send an 'allnotesoff'
   * channel message.
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between `1` and `16`) or an
   * array of channel numbers. If the special value `all` is used (default), the message will be
   * sent to all 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {Boolean} [options.rawVelocity=false] Controls whether the release velocity is set using
   * an integer between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`,
   * default).
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @param {Number} [options.velocity=0.5] The velocity at which to release the note (between `0`
   * and `1`). If the `rawVelocity` option is `true`, the value should be specified as an integer
   * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
   * Note that when the first parameter to `stopNote()` is `all`, the release velocity is silently
   * ignored.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.stopNote = function(note, channel, options) {

    if (note === 'all') {
      return this.sendChannelMode('allnotesoff', 0, channel, options);
    }

    var nVelocity = 64;

    options = options || {};

    options.velocity = parseFloat(options.velocity);

    if (options.rawVelocity) {

      if (!isNaN(options.velocity) && options.velocity >= 0 && options.velocity <= 127) {
        nVelocity = options.velocity;
      }

    } else {

      if (!isNaN(options.velocity) && options.velocity >= 0 && options.velocity <= 1) {
        nVelocity = options.velocity * 127;
      }

    }

    // Send note off messages
    this._convertNoteToArray(note).forEach(function(item) {

      this._convertChannelToArray(channel).forEach(function(ch) {

        this.send(
            (wm.MIDI_CHANNEL_MESSAGES.noteoff << 4) + (ch - 1),
            [item, Math.round(nVelocity)],
            this._parseTimeParameter(options.time)
        );

      }.bind(this));

    }.bind(this));

    return this;

  };

  /**
   * Requests the playback of a single note or multiple notes on the specified channel(s). You can
   * delay the execution of the **note on** command by using the `time` property of the `options`
   * parameter (milliseconds).
   *
   * If no duration is specified in the `options`, the note will play until a matching **note off**
   * is sent. If a duration is specified, a **note off** will be automatically sent after said
   * duration.
   *
   * Note: As per the MIDI standard, a **note on** event with a velocity of `0` is considered to be
   * a **note off**.
   *
   * @method playNote
   * @chainable
   *
   * @param note {Number|String|Array}  The note(s) you wish to play. The notes can be specified in
   * one of two ways. The first way is by using the MIDI note number (an integer between 0 and 127).
   * The second way is by using the note name followed by the octave (C3, G#4, F-1, Db7). The octave
   * range should be between -2 and 8. The lowest note is C-2 (MIDI note number 0) and the highest
   * note is G8 (MIDI note number 127). It is also possible to specify an array of note numbers
   * and/or names.
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between `1` and `16`) or an
   * array of channel numbers. If the special value **all** is used (default), the message will be
   * sent to all 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {Number} [options.duration=undefined] The number of milliseconds (integer) to wait
   * before sending a matching **note off** event. If left undefined, only a **note on** message is
   * sent.
   *
   * @param {Boolean} [options.rawVelocity=false] Controls whether the attack and release velocities
   * are set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1`
   * (`false`, default).
   *
   * @param {Number} [options.release=0.5] The velocity at which to release the note (between `0`
   * and `1`). If the `rawVelocity` option is `true`, the value should be specified as an integer
   * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
   * This is only used with the **note off** event triggered when `options.duration` is set.
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @param {Number} [options.velocity=0.5] The velocity at which to play the note (between `0` and
   * `1`). If the `rawVelocity` option is `true`, the value should be specified as an integer
   * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.playNote = function(note, channel, options) {

    var nVelocity = 64;

    options = options || {};

    options.velocity = parseFloat(options.velocity);

    if (options.rawVelocity) {

      if (!isNaN(options.velocity) && options.velocity >= 0 && options.velocity <= 127) {
        nVelocity = options.velocity;
      }

    } else {

      if (!isNaN(options.velocity) && options.velocity >= 0 && options.velocity <= 1) {
        nVelocity = options.velocity * 127;
      }

    }

    options.time = this._parseTimeParameter(options.time);

    // Send note on messages
    this._convertNoteToArray(note).forEach(function(item) {

      this._convertChannelToArray(channel).forEach(function(ch) {
        this.send(
          (wm.MIDI_CHANNEL_MESSAGES.noteon << 4) + (ch - 1),
          [item, Math.round(nVelocity)],
          options.time
        );
      }.bind(this));

    }.bind(this));


    // Send note off messages (only if a valid duration has been defined)
    options.duration = parseFloat(options.duration);

    if (options.duration) {

      if (options.duration <= 0) { options.duration = 0; }

      var nRelease = 64;

      options.release = parseFloat(options.release);

      if (options.rawVelocity) {

        if (!isNaN(options.release) && options.release >= 0 && options.release <= 127) {
          nRelease = options.release;
        }

      } else {

        if (!isNaN(options.release) && options.release >= 0 && options.release <= 1) {
          nRelease = options.release * 127;
        }

      }

      this._convertNoteToArray(note).forEach(function(item) {

        this._convertChannelToArray(channel).forEach(function(ch) {
          this.send(
            (wm.MIDI_CHANNEL_MESSAGES.noteoff << 4) + (ch - 1),
            [item, Math.round(nRelease)],
            (options.time || wm.time) + options.duration
          );
        }.bind(this));

      }.bind(this));

    }

    return this;

  };

  /**
   * Sends a MIDI `key aftertouch` message to the specified channel(s) at the scheduled time. This
   * is a key-specific aftertouch. For a channel-wide aftertouch message, use
   * {{#crossLink "WebMidi/sendChannelAftertouch:method"}}sendChannelAftertouch(){{/crossLink}}.
   *
   * @method sendKeyAftertouch
   * @chainable
   *
   * @param note {Number|String|Array}  The note for which you are sending an aftertouch value. The
   * notes can be specified in one of two ways. The first way is by using the MIDI note number (an
   * integer between 0 and 127). The second way is by using the note name followed by the octave
   * (C3, G#4, F-1, Db7). The octave range should be between -2 and 8. The lowest note is C-2 (MIDI
   * note number 0) and the highest note is G8 (MIDI note number 127). It is also possible to use
   * an array of note names and/or numbers.
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Number} [pressure=0.5] The pressure level to send (between 0 and 1).
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throws {RangeError} The channel must be between 1 and 16.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendKeyAftertouch = function(note, channel, pressure, options) {

    var that = this;

    options = options || {};

    if (channel < 1 || channel > 16) {
      throw new RangeError("The channel must be between 1 and 16.");
    }

    pressure = parseFloat(pressure);
    if (isNaN(pressure) || pressure < 0 || pressure > 1) {
      pressure = 0.5;
    }

    var nPressure = Math.round(pressure * 127);

    this._convertNoteToArray(note).forEach(function(item) {

      that._convertChannelToArray(channel).forEach(function(ch) {
        that.send(
          (wm.MIDI_CHANNEL_MESSAGES.keyaftertouch << 4) + (ch - 1),
          [item, nPressure],
          that._parseTimeParameter(options.time)
        );
      });

    });

    return this;

  };

  /**
   * Sends a MIDI `control change` message to the specified channel(s) at the scheduled time. The
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
   * Change Messages" from the
   * [MIDI Messages](https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
   * specification.
   *
   * @method sendControlChange
   * @chainable
   *
   * @param controller {Number|String} The MIDI controller number (0-119) or name.
   *
   * @param [value=0] {Number} The value to send (0-127).
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throws {RangeError} Controller numbers must be between 0 and 119.
   * @throws {RangeError} Value must be between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendControlChange = function(controller, value, channel, options) {

    options = options || {};

    if (typeof controller === "string") {

      controller = wm.MIDI_CONTROL_CHANGE_MESSAGES[controller];
      if (!controller) {
        throw new TypeError("Invalid controller name.");
      }

    } else {

      controller = parseInt(controller);
      if ( !(controller >= 0 && controller <= 119) ) {
        throw new RangeError("Controller numbers must be between 0 and 119.");
      }

    }

    value = parseInt(value) || 0;
    if ( !(value >= 0 && value <= 127) ) {
      throw new RangeError("Controller value must be between 0 and 127.");
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      this.send(
        (wm.MIDI_CHANNEL_MESSAGES.controlchange << 4) + (ch - 1),
        [controller, value],
        this._parseTimeParameter(options.time)
      );
    }.bind(this));

    return this;

  };

  /**
   * Selects a MIDI registered parameter so it is affected by data entry, data increment and data
   * decrement messages.
   *
   * @method _selectRegisteredParameter
   * @protected
   *
   * @param parameter {Array} A two-position array specifying the two control bytes (0x65, 0x64)
   * that identify the registered parameter.
   * @param channel
   * @param time
   *
   * @returns {Output}
   */
  Output.prototype._selectRegisteredParameter = function(parameter, channel, time) {

    var that = this;

    parameter[0] = parseInt(parameter[0]);
    if ( !(parameter[0] >= 0 && parameter[0] <= 127) ) {
      throw new RangeError("The control65 value must be between 0 and 127");
    }

    parameter[1] = parseInt(parameter[1]);
    if ( !(parameter[1] >= 0 && parameter[1] <= 127) ) {
      throw new RangeError("The control64 value must be between 0 and 127");
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.sendControlChange(0x65, parameter[0], channel, {time: time});
      that.sendControlChange(0x64, parameter[1], channel, {time: time});
    });

    return this;

  };

  /**
   * Selects a MIDI non-registered parameter so it is affected by data entry, data increment and
   * data decrement messages.
   *
   * @method _selectNonRegisteredParameter
   * @protected
   *
   * @param parameter {Array} A two-position array specifying the two control bytes (0x63, 0x62)
   * that identify the registered parameter.
   * @param channel
   * @param time
   *
   * @returns {Output}
   */
  Output.prototype._selectNonRegisteredParameter = function(parameter, channel, time) {

    var that = this;

    parameter[0] = parseInt(parameter[0]);
    if ( !(parameter[0] >= 0 && parameter[0] <= 127) ) {
      throw new RangeError("The control63 value must be between 0 and 127");
    }

    parameter[1] = parseInt(parameter[1]);
    if ( !(parameter[1] >= 0 && parameter[1] <= 127) ) {
      throw new RangeError("The control62 value must be between 0 and 127");
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.sendControlChange(0x63, parameter[0], channel, {time: time});
      that.sendControlChange(0x62, parameter[1], channel, {time: time});
    });

    return this;

  };

  /**
   * Sets the value of the currently selected MIDI registered parameter.
   *
   * @method _setCurrentRegisteredParameter
   * @protected
   *
   * @param data {int|Array}
   * @param channel
   * @param time
   *
   * @returns {Output}
   */
  Output.prototype._setCurrentRegisteredParameter = function(data, channel, time) {

    var that = this;

    data = [].concat(data);

    data[0] = parseInt(data[0]);
    if ( !(data[0] >= 0 && data[0] <= 127) ) {
      throw new RangeError("The msb value must be between 0 and 127");
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.sendControlChange(0x06, data[0], channel, {time: time});
    });

    data[1] = parseInt(data[1]);
    if(data[1] >= 0 && data[1] <= 127) {
      this._convertChannelToArray(channel).forEach(function(ch) {
        that.sendControlChange(0x26, data[1], channel, {time: time});
      });
    }

    return this;

  };

  /**
   * Deselects the currently active MIDI registered parameter so it is no longer affected by data
   * entry, data increment and data decrement messages.
   *
   * Current best practice recommends doing that after each call to
   * `_setCurrentRegisteredParameter()`.
   *
   * @method _deselectRegisteredParameter
   * @protected
   *
   * @param channel
   * @param time
   *
   * @returns {Output}
   */
  Output.prototype._deselectRegisteredParameter = function(channel, time) {

    var that = this;

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.sendControlChange(0x65, 0x7F, channel, {time: time});
      that.sendControlChange(0x64, 0x7F, channel, {time: time});
    });

    return this;

  };

  /**
   * Sets the specified MIDI registered parameter to the desired value. The value is defined with
   * up to two bytes of data that each can go from 0 to 127.
   *
   * >Unless you are very familiar with the MIDI standard you probably should favour one of the
   * >simpler to use functions such as: `setPitchbendRange()`, `setModulationRange()`,
   * >`setMasterTuning()`, etc.
   *
   * MIDI registered parameters extend the original list of control change messages. Currently,
   * there are only a limited number of them. Here are the original registered parameters with the
   * identifier that can be used as the first parameter of this function:
   *
   *  * Pitchbend Range (0x00, 0x00): `pitchbendrange`
   *  * Channel Fine Tuning (0x00, 0x01): `channelfinetuning`
   *  * Channel Coarse Tuning (0x00, 0x02): `channelcoarsetuning`
   *  * Tuning Program (0x00, 0x03): `tuningprogram`
   *  * Tuning Bank (0x00, 0x04): `tuningbank`
   *  * Modulation Range (0x00, 0x05): `modulationrange`
   *
   * Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
   * Standard*, which is not widely implemented.
   *
   * Another set of extra parameters have been later added for 3D sound controllers. They are:
   *
   *  * Azimuth Angle (0x3D, 0x00): `azimuthangle`
   *  * Elevation Angle (0x3D, 0x01): `elevationangle`
   *  * Gain (0x3D, 0x02): `gain`
   *  * Distance Ratio (0x3D, 0x03): `distanceratio`
   *  * Maximum Distance (0x3D, 0x04): `maximumdistance`
   *  * Maximum Distance Gain (0x3D, 0x05): `maximumdistancegain`
   *  * Reference Distance Ratio (0x3D, 0x06): `referencedistanceratio`
   *  * Pan Spread Angle (0x3D, 0x07): `panspreadangle`
   *  * Roll Angle (0x3D, 0x08): `rollangle`
   *
   * @method setRegisteredParameter
   * @chainable
   *
   * @param parameter {String|Array} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   *
   * @param [data=[]] {Number|Array} An single integer or an array of integers with a maximum length
   * of 2 specifying the desired data.
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.setRegisteredParameter = function(parameter, data, channel, options) {

    var that = this;

    options = options || {};

    if ( !Array.isArray(parameter) ) {
      if ( !wm.MIDI_REGISTERED_PARAMETER[parameter]) {
        throw new Error("The specified parameter is not available.");
      }
      parameter = wm.MIDI_REGISTERED_PARAMETER[parameter];
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      that._selectRegisteredParameter(parameter, channel, options.time);
      that._setCurrentRegisteredParameter(data, channel, options.time);
      that._deselectRegisteredParameter(channel, options.time);
    });

    return this;

  };

  /**
   * Sets a non-registered parameter to the specified value. The NRPN is selected by passing in a
   * two-position array specifying the values of the two control bytes. The value is specified by
   * passing in an single integer (most cases) or an array of two integers.
   *
   * NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
   * they see fit. For example, according to the Roland GS specification, you can control the
   * **vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
   * would use:
   *
   *     WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123);
   *
   * Obviously, you should select a channel so the message is not sent to all channels. For
   * instance, to send to channel 1 of the first output port, you would use:
   *
   *     WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123, 1);
   *
   * In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
   * would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
   * uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
   * value to send was 10, you could use:
   *
   *     WebMidi.outputs[0].setNonRegisteredParameter([2, 63], [0, 10]);
   *
   * For further implementation details, refer to the manufacturer's documentation.
   *
   * @method setNonRegisteredParameter
   * @chainable
   *
   * @param parameter {Array} A two-position array specifying the two control bytes (0x63,
   * 0x62) that identify the non-registered parameter.
   *
   * @param [data=[]] {Number|Array} An integer or an array of integers with a length of 1 or 2
   * specifying the desired data.
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.setNonRegisteredParameter = function(parameter, data, channel, options) {

    var that = this;

    options = options || {};

    if (
        !(parameter[0] >= 0 && parameter[0] <= 127) ||
        !(parameter[1] >= 0 && parameter[1] <= 127)
    ) {
      throw new Error(
          "Position 0 and 1 of the 2-position parameter array must both be between 0 and 127."
      );
    }

    data = [].concat(data);

    this._convertChannelToArray(channel).forEach(function(ch) {
      that._selectNonRegisteredParameter(parameter, channel, options.time);
      that._setCurrentRegisteredParameter(data, channel, options.time);
      that._deselectRegisteredParameter(channel, options.time);
    });

    return this;

  };

  /**
   * Increments the specified MIDI registered parameter by 1. For more specific MIDI usage
   * information, check out [RP-18](http://dev.midi.org/techspecs/rp18.php) regarding the usage of
   * increment and decrement controllers.
   *
   * >Unless you are very familiar with the MIDI standard you probably should favour one of the
   * >simpler to use functions such as: `setPitchbendRange()`, `setModulationRange()`,
   * >`setMasterTuning()`, etc.
   *
   * Here is the full list of parameter names that can be used with this function:
   *
   *  * Pitchbend Range (0x00, 0x00): `pitchbendrange`
   *  * Channel Fine Tuning (0x00, 0x01): `channelfinetuning`
   *  * Channel Coarse Tuning (0x00, 0x02): `channelcoarsetuning`
   *  * Tuning Program (0x00, 0x03): `tuningprogram`
   *  * Tuning Bank (0x00, 0x04): `tuningbank`
   *  * Modulation Range (0x00, 0x05): `modulationrange`
   *  * Azimuth Angle (0x3D, 0x00): `azimuthangle`
   *  * Elevation Angle (0x3D, 0x01): `elevationangle`
   *  * Gain (0x3D, 0x02): `gain`
   *  * Distance Ratio (0x3D, 0x03): `distanceratio`
   *  * Maximum Distance (0x3D, 0x04): `maximumdistance`
   *  * Maximum Distance Gain (0x3D, 0x05): `maximumdistancegain`
   *  * Reference Distance Ratio (0x3D, 0x06): `referencedistanceratio`
   *  * Pan Spread Angle (0x3D, 0x07): `panspreadangle`
   *  * Roll Angle (0x3D, 0x08): `rollangle`
   *
   * @method incrementRegisteredParameter
   * @chainable
   *
   * @param parameter {String|Array} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   *
   * @param [channel=all] {uint|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.incrementRegisteredParameter = function(parameter, channel, options) {

    var that = this;

    options = options || {};

    if ( !Array.isArray(parameter) ) {
      if ( !wm.MIDI_REGISTERED_PARAMETER[parameter]) {
        throw new Error("The specified parameter is not available.");
      }
      parameter = wm.MIDI_REGISTERED_PARAMETER[parameter];
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      that._selectRegisteredParameter(parameter, channel, options.time);
      that.sendControlChange(0x60, 0, channel, {time: options.time});
      that._deselectRegisteredParameter(channel, options.time);
    });

    return this;

  };

  /**
   * Decrements the specified MIDI registered parameter by 1. For more specific MIDI usage
   * information, check out [RP-18](http://dev.midi.org/techspecs/rp18.php) regarding the usage of
   * increment and decrement controllers.
   *
   * >Unless you are very familiar with the MIDI standard you probably should favour one of the
   * >simpler to use functions such as: `setPitchbendRange()`, `setModulationRange()`,
   * >`setMasterTuning()`, etc.
   *
   * Here is the full list of parameter names that can be used with this function:
   *
   *  * Pitchbend Range (0x00, 0x00): `pitchbendrange`
   *  * Channel Fine Tuning (0x00, 0x01): `channelfinetuning`
   *  * Channel Coarse Tuning (0x00, 0x02): `channelcoarsetuning`
   *  * Tuning Program (0x00, 0x03): `tuningprogram`
   *  * Tuning Bank (0x00, 0x04): `tuningbank`
   *  * Modulation Range (0x00, 0x05): `modulationrange`
   *  * Azimuth Angle (0x3D, 0x00): `azimuthangle`
   *  * Elevation Angle (0x3D, 0x01): `elevationangle`
   *  * Gain (0x3D, 0x02): `gain`
   *  * Distance Ratio (0x3D, 0x03): `distanceratio`
   *  * Maximum Distance (0x3D, 0x04): `maximumdistance`
   *  * Maximum Distance Gain (0x3D, 0x05): `maximumdistancegain`
   *  * Reference Distance Ratio (0x3D, 0x06): `referencedistanceratio`
   *  * Pan Spread Angle (0x3D, 0x07): `panspreadangle`
   *  * Roll Angle (0x3D, 0x08): `rollangle`
   *
   * @method decrementRegisteredParameter
   * @chainable
   *
   * @param parameter {String|Array} A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throws TypeError The specified parameter is not available.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.decrementRegisteredParameter = function(parameter, channel, options) {

    options = options || {};

    if ( !Array.isArray(parameter) ) {
      if ( !wm.MIDI_REGISTERED_PARAMETER[parameter]) {
        throw new TypeError("The specified parameter is not available.");
      }
      parameter = wm.MIDI_REGISTERED_PARAMETER[parameter];
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      this._selectRegisteredParameter(parameter, channel, options.time);
      this.sendControlChange(0x61, 0, channel, {time: options.time});
      this._deselectRegisteredParameter(channel, options.time);
    }.bind(this));

    return this;

  };

  /**
   * Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
   * adjust the range used by their pitch bend lever. The range can be specified with the `semitones`
   * parameter, the `cents` parameter or by specifying both parameters at the same time.
   *
   * @method setPitchBendRange
   * @chainable
   *
   * @param [semitones=0] {Number} The desired adjustment value in semitones (integer between
   * 0-127). While nothing imposes that in the specification, it is very common for manufacturers to
   * limit the range to 2 octaves (-12 semitones to 12 semitones).
   *
   * @param [cents=0] {Number} The desired adjustment value in cents (integer between 0-127).
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throws {RangeError} The semitones value must be between 0 and 127.
   * @throws {RangeError} The cents value must be between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.setPitchBendRange = function(semitones, cents, channel, options) {

    var that = this;

    options = options || {};

    semitones = parseInt(semitones) || 0;
    if ( !(semitones >= 0 && semitones <= 127) ) {
      throw new RangeError("The semitones value must be between 0 and 127");
    }

    cents = parseInt(cents) || 0;
    if ( !(cents >= 0 && cents <= 127) ) {
      throw new RangeError("The cents value must be between 0 and 127");
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.setRegisteredParameter(
        "pitchbendrange", [semitones, cents], channel, {time: options.time}
      );
    });

    return this;

  };

  /**
   * Sends a modulation depth range message to the specified channel(s) so that they adjust the
   * depth of their modulation wheel's range. The range can be specified with the `semitones`
   * parameter, the `cents` parameter or by specifying both parameters at the same time.
   *
   * @method setModulationRange
   * @chainable
   *
   * @param [semitones=0] {Number} The desired adjustment value in semitones (integer between
   * 0-127).
   *
   * @param [cents=0] {Number} The desired adjustment value in cents (0-127).
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throws {RangeError} The semitones value must be between 0 and 127.
   * @throws {RangeError} The cents value must be between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.setModulationRange = function(semitones, cents, channel, options) {

    var that = this;

    options = options || {};

    semitones = parseInt(semitones) || 0;
    if ( !(semitones >= 0 && semitones <= 127) ) {
      throw new RangeError("The semitones value must be between 0 and 127");
    }

    cents = parseInt(cents) || 0;
    if ( !(cents >= 0 && cents <= 127) ) {
      throw new RangeError("The cents value must be between 0 and 127");
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.setRegisteredParameter(
        "modulationrange", [semitones, cents], channel, {time: options.time}
      );
    });

    return this;

  };

  /**
   * Sends a master tuning message to the specified channel(s). The value is decimal and must be
   * larger than -65 semitones and smaller than 64 semitones.
   *
   * >Because of the way the MIDI specification works, the decimal portion of the value will be
   * >encoded with a resolution of 14bit. The integer portion must be between -64 and 63
   * >inclusively. For those familiar with the MIDI protocol, this function actually generates
   * >**Master Coarse Tuning** and **Master Fine Tuning** RPN messages.
   *
   * @method setMasterTuning
   * @chainable
   *
   * @param [value=0.0] {Number} The desired decimal adjustment value in semitones (-65 < x < 64)
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throws {RangeError} The value must be a decimal number between larger than -65 and smaller
   * than 64.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.setMasterTuning = function(value, channel, options) {

    var that = this;

    options = options || {};

    value = parseFloat(value) || 0.0;

    if (value <= -65 || value >= 64) {
      throw new RangeError(
          "The value must be a decimal number larger than -65 and smaller than 64."
      );
    }

    var coarse = parseInt(value) + 64;
    var fine = value - parseInt(value);

    // Calculate MSB and LSB for fine adjustment (14bit resolution)
    fine = Math.round((fine + 1) / 2 * 16383);
    var msb = (fine >> 7) & 0x7F;
    var lsb = fine & 0x7F;

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.setRegisteredParameter("channelcoarsetuning", coarse, channel, {time: options.time});
      that.setRegisteredParameter("channelfinetuning", [msb, lsb], channel, {time: options.time});
    });

    return this;

  };

  /**
   * Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * @method setTuningProgram
   * @chainable
   *
   * @param value {Number} The desired tuning program (0-127).
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throws {RangeError} The program value must be between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.setTuningProgram = function(value, channel, options) {

    var that = this;

    options = options || {};

    value = parseInt(value) || 0;
    if ( !(value >= 0 && value <= 127) ) {
      throw new RangeError("The program value must be between 0 and 127");
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.setRegisteredParameter("tuningprogram", value, channel, {time: options.time});
    });

    return this;

  };

  /**
   * Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * @method setTuningBank
   * @chainable
   *
   * @param value {Number} The desired tuning bank (0-127).
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throws {RangeError} The bank value must be between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.setTuningBank = function(value, channel, options) {

    var that = this;

    options = options || {};

    value = parseInt(value) || 0;
    if ( !(value >= 0 && value <= 127) ) {
      throw new RangeError("The bank value must be between 0 and 127");
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.setRegisteredParameter("tuningbank", value, channel, {time: options.time});
    });

    return this;

  };

  /**
   * Sends a MIDI `channel mode` message to the specified channel(s). The channel mode message to send can be specified
   * numerically or by using one of the following common names:
   *
   *   * `allsoundoff` (#120)
   *   * `resetallcontrollers` (#121)
   *   * `localcontrol` (#122)
   *   * `allnotesoff` (#123)
   *   * `omnimodeoff` (#124)
   *   * `omnimodeon` (#125)
   *   * `monomodeon` (#126)
   *   * `polymodeon` (#127)
   *
   * It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may require a value
   * that's not zero. For that reason, the `value` parameter is optional and defaults to 0.
   *
   * @method sendChannelMode
   * @chainable
   *
   * @param command {Number|String} The numerical identifier of the channel mode message (integer between 120-127) or
   * its name as a string.
   * @param [value=0] {Number} The value to send (integer between 0-127).
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an array of channel
   * numbers. If the special value "all" is used, the message will be sent to all 16 channels.
   * @param {Object} [options={}]
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two things. If the value is
   * a string starting with the + sign and followed by a number, the request will be delayed by the specified number
   * (in milliseconds). Otherwise, the value is considered a timestamp and the request will be scheduled at that
   * timestamp. The `DOMHighResTimeStamp` value is relative to the navigation start of the document. To retrieve the
   * current time, you can use `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is
   * to be sent as soon as possible.
   *
   * @throws {TypeError} Invalid channel mode message name.
   * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
   * @throws {RangeError} Value must be an integer between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   */
  Output.prototype.sendChannelMode = function(command, value, channel, options) {

    options = options || {};

    if (typeof command === "string") {

      command = wm.MIDI_CHANNEL_MODE_MESSAGES[command];

      if (!command) {
        throw new TypeError("Invalid channel mode message name.");
      }

    } else {

      command = parseInt(command);

      if ( !(command >= 120 && command <= 127) ) {
        throw new RangeError("Channel mode numerical identifiers must be between 120 and 127.");
      }

    }

    value = parseInt(value) || 0;

    if (value < 0 || value > 127) {
      throw new RangeError("Value must be an integer between 0 and 127.");
    }

    this._convertChannelToArray(channel).forEach(function(ch) {

      this.send(
          (wm.MIDI_CHANNEL_MESSAGES.channelmode << 4) + (ch - 1),
          [command, value],
          this._parseTimeParameter(options.time)
      );

    }.bind(this));

    return this;

  };

  /**
   * Sends a MIDI `program change` message to the specified channel(s) at the scheduled time.
   *
   * @method sendProgramChange
   * @chainable
   *
   * @param program {Number} The MIDI patch (program) number (0-127)
   *
   * @param [channel=all] {Number|Array|String} The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throws {RangeError} Program numbers must be between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   *
   */
  Output.prototype.sendProgramChange = function(program, channel, options) {

    var that = this;

    options = options || {};

    program = parseInt(program);
    if (isNaN(program) || program < 0 || program > 127) {
      throw new RangeError("Program numbers must be between 0 and 127.");
    }

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.send(
        (wm.MIDI_CHANNEL_MESSAGES.programchange << 4) + (ch - 1),
        [program],
        that._parseTimeParameter(options.time)
      );
    });

    return this;

  };

  /**
   * Sends a MIDI `channel aftertouch` message to the specified channel(s). For key-specific
   * aftertouch, you should instead use `sendKeyAftertouch()`.
   *
   * @method sendChannelAftertouch
   * @chainable
   *
   * @param [pressure=0.5] {Number} The pressure level (between 0 and 1). An invalid pressure value
   * will silently trigger the default behaviour.
   *
   * @param [channel=all] {Number|Array|String}  The MIDI channel number (between 1 and 16) or
   * an array of channel numbers. If the special value "all" is used, the message will be sent to
   * all 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendChannelAftertouch = function(pressure, channel, options) {

    var that = this;

    options = options || {};

    pressure = parseFloat(pressure);
    if (isNaN(pressure) || pressure < 0 || pressure > 1) { pressure = 0.5; }

    var nPressure = Math.round(pressure * 127);

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.send(
          (wm.MIDI_CHANNEL_MESSAGES.channelaftertouch << 4) + (ch - 1),
          [nPressure],
          that._parseTimeParameter(options.time)
      );
    });

    return this;

  };

  /**
   * Sends a MIDI `pitch bend` message to the specified channel(s) at the scheduled time.
   *
   * @method sendPitchBend
   * @chainable
   *
   * @param bend {Number} The intensity level of the bend (between -1 and 1). A value of zero means
   * no bend.
   *
   * @param [channel=all] {Number|Array|String}  The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @throws {RangeError} Pitch bend value must be between -1 and 1.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  Output.prototype.sendPitchBend = function(bend, channel, options) {

    var that = this;

    options = options || {};

    bend = parseFloat(bend);
    if (isNaN(bend) || bend < -1 || bend > 1) {
      throw new RangeError("Pitch bend value must be between -1 and 1.");
    }

    var nLevel = Math.round((bend + 1) / 2 * 16383);
    var msb = (nLevel >> 7) & 0x7F;
    var lsb = nLevel & 0x7F;

    this._convertChannelToArray(channel).forEach(function(ch) {
      that.send(
        (wm.MIDI_CHANNEL_MESSAGES.pitchbend << 4) + (ch - 1),
        [lsb, msb],
        that._parseTimeParameter(options.time)
      );
    });

    return this;

  };

  /**
   * Returns a timestamp, relative to the navigation start of the document, derived from the `time`
   * parameter. If the parameter is a string starting with the "+" sign and followed by a number,
   * the resulting value will be the sum of the current timestamp plus that number. Otherwise, the
   * value will be returned as is.
   *
   * If the calculated return value is 0, less than zero or an otherwise invalid value, `undefined`
   * will be returned.
   *
   * @method _parseTimeParameter
   * @param [time] {Number|String}
   * @return DOMHighResTimeStamp
   * @protected
   */
  Output.prototype._parseTimeParameter = function(time) {

    var parsed, value;

    if (typeof time === 'string' &&  time.substring(0, 1) === "+") {
      parsed = parseFloat(time);
      if (parsed && parsed > 0) { value = wm.time + parsed; }
    } else {
      parsed = parseFloat(time);
      if (parsed > wm.time) { value = parsed; }
    }

    return value;

  };

  /**
   * Converts an input value (which can be a uint, a string or an array of the previous two) to an
   * array of MIDI note numbers.
   *
   * @method _convertNoteToArray
   * @param [note] {Number|Array|String}
   * @protected
   */
  Output.prototype._convertNoteToArray = function(note) {

    var notes = [];

    if ( !Array.isArray(note) ) { note = [note]; }

    note.forEach(function(item) {
      notes.push(wm.guessNoteNumber(item));
    });

    return notes;

  };

  /**
   * Converts an input value (which can be an int, an array or the value "all" to an array of valid
   * MIDI channels. If `undefined` is provided as the channel, an array of all channels will be
   * returned.
   *
   * @method _convertChannelToArray
   * @param [channel] {uint|Array}
   * @protected
   */
  Output.prototype._convertChannelToArray = function(channel) {

    if (channel === 'all' || channel === undefined) { channel = ['all']; }

    if ( !Array.isArray(channel) ) { channel = [channel]; }

    if (channel.indexOf('all') > -1) {
      channel = [];
      for (var i = 1; i <= 16; i++) { channel.push(i); }
    }

    channel.forEach(function(ch) {
      if ( !(ch >= 1 && ch <= 16) ) {
        throw new RangeError("MIDI channels must be between 1 and 16.");
      }
    });

    return channel;

  };

  /**
   * @method _onMidiMessage
   * @protected
   */
  Output.prototype._onMidiMessage = function(e) {
    // Not implemented.
  };

  // Check if RequireJS/AMD is used. If it is, use it to define our module instead of
  // polluting the global space.
  if ( typeof define === "function" && typeof define.amd === "object") {
    define([], function () {
      return wm;
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = wm;
  } else {
    if (!scope.WebMidi) { scope.WebMidi = wm; }
  }

}(this));
