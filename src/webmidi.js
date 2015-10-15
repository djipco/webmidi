(function(scope) {

  "use strict";

  /**
   * The `WebMidi` object makes it easier to work with the Web MIDI API. Basically, it
   * simplifies two things: sending and receiving MIDI messages.
   *
   * To send MIDI messages, you simply need to pick the appropriate method and all the
   * native MIDI communication will be handled for you. The only additional thing that
   * needs to be done is enable `WebMidi`. Here is an example:
   *
   *      WebMidi.enable(function() {
   *        WebMidi.playNote(2, 76, 0.5);
   *      });
   *
   * The code above, calls the `WebMidi.enable()` method. Upon success, this method
   * executes the handler specified as a parameter. IThe handler, in this case, sends a
   * 'noteon' MIDI message to the device on channel 2 so it plays note number 76 at half
   *
   * Receiving messages is just as easy. You simply have to set a callback function to be
   * triggered when a specific MIDI message is received. For example, to listen for pitch
   * bend events on any input MIDI channels:
   *
   *      WebMidi.addEventListener('pitchbend', function(e) {
   *        console.log("Pitch value: " + e.value);
   *      });
   *
   * As you can see, this library makes it much easier to use the Web MIDI API. No need to
   * manually craft or decode binary MIDI messages anymore!
   *
   * @class WebMidi
   * @static
   *
   * @todo  Allow triggering notes using usual name and octave
   * @todo  Yuidoc does not allow multiple exceptions (@throws) for a single method ?!
   * @todo  Add specific events for channel mode messages ?
   * @todo  Ability to listen to one controller in particular (by name or by number).
   */
  function WebMidi() {

    Object.defineProperties(this, {

      /**
       * [read-only] Indicates whether the browser supports the Web MIDI API or not.
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
       * [read-only] Indicates whether the interface to the host's MIDI subsystem is still
       * active.
       *
       * @property connected
       * @type Boolean
       * @static
       */
      connected: {
        enumerable: true,
        get: function() {
          return this.interface !== undefined;
        }
      },

      /**
       * [read-only] An array of all currently available MIDI inputs.
       *
       * @property inputs
       * @type MIDIInput[]
       * @static
       */
      inputs: {
        enumerable: true,
        get: function() {
          var inputs = [];
          if (this.connected) {
            var ins = this.interface.inputs.values();
            for (var input = ins.next(); input && !input.done; input = ins.next()) {
              inputs.push(input.value);
            }
          }
          return inputs;
        }
      },

      /**
       * [read-only] An array of all currently available MIDI outputs.
       *
       * @property inputs
       * @type MIDIOutput[]
       * @static
       */
      outputs: {
        enumerable: true,
        get: function() {
          var outputs = [];
          if (this.connected) {
            var outs = this.interface.outputs.values();
            for (var input = outs.next(); input && !input.done; input = outs.next()) {
              outputs.push(input.value);
            }
          }
          return outputs;
        }
      },

      /**
       * [read-only] Current MIDI performance time in milliseconds. This can be used to
       * queue events in the future.
       *
       * @property time
       * @type DOMHighResTimeStamp
       * @static
       */
      time: {
        enumerable: true,
        get: function() {
          return window.performance.now();
        }
      }

    });

    _initializeUserHandlers();

  }

  /******************************* PRIVATE PROPERTIES ***********************************/

  // User-defined handlers list
  var _userHandlers = { "channel": {}, "system": {} };

  // List of valid channel MIDI messages and matching value
  var _channelMessages = {
    "noteoff": 0x8,           // 8
    "noteon": 0x9,            // 9
    "keyaftertouch": 0xA,     // 10
    "controlchange": 0xB,     // 11
    "channelmode": 0xB,       // 11
    "programchange": 0xC,     // 12
    "channelaftertouch": 0xD, // 13
    "pitchbend": 0xE         // 14
  };

  // List of valid system MIDI messages and matching value (249 and 253 are actually
  // dispatched by the Web MIDI API but I do not know what they are for and they are not
  // part of the online MIDI 1.0 spec. (http://www.midi.org/techspecs/midimessages.php)
  var _systemMessages = {
    "sysex": 0xF0,            // 240
    "timecode": 0xF1,         // 241
    "songposition": 0xF2,     // 242
    "songselect": 0xF3,       // 243
    "tuningrequest": 0xF6,    // 246
    //"sysexend": 0xF7,       // 247 (never actually received - simply ends a sysex)
    "clock": 0xF8,            // 248
    "start": 0xFA,            // 250
    "continue": 0xFB,         // 251
    "stop": 0xFC,             // 252
    "activesensing": 0xFE,    // 254
    "reset": 0xFF,            // 255
    "unknownsystemmessage": -1
  };

  var _notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  /******************************** PRIVATE METHODS *************************************/

  function _initializeUserHandlers() {

    _userHandlers.system.statechange = [];

    for (var prop1 in _channelMessages) {
      if (_channelMessages.hasOwnProperty(prop1)) {
        _userHandlers.channel[prop1] = [
          [], [], [], [], [], [], [], [], // 16 arrays of listeners (for each channel)
          [], [], [], [], [], [], [], []
        ];
      }
    }

    for (var prop2 in _systemMessages) {
      if (_systemMessages.hasOwnProperty(prop2)) {
        _userHandlers.system[prop2] = [];
      }
    }

  }

  /** @private */
  function _onInterfaceStateChange(e) {

    /**
     * Event emitted when the interface's state changes. Typically, this happens when a
     * MIDI device is being plugged or unplugged. This event cannot be listened on a
     * specific MIDI channel, it is intended to be interface-wide. If a channel is
     * specified, it will be silently ignored.
     *
     * @event statechange
     */
    _userHandlers.system.statechange.forEach(function(handler){
        handler(e);
    });

  }

  /** @private */
  function _onMidiMessage(e) {

    if (e.data[0] < 240) {          // channel message
      _parseChannelEvent(e);
    } else if (e.data[0] <= 255) {  // system message
      _parseSystemEvent(e);
    }

  }

  /** @private */
  function _parseChannelEvent(e) {

    var command = e.data[0] >> 4;
    var channel = e.data[0] & 0xf;
    var data1, data2;

    if (e.data.length > 1) {
      data1 = e.data[1];
      data2 = e.data.length > 2 ? e.data[2] : undefined;
    }

    // Returned event
    var event = {
      "target": e.currentTarget,
      "data": e.data,
      "receivedTime": e.receivedTime,
      "timeStamp": e.timeStamp,
      "channel": channel
    };

    if (
      command === _channelMessages.noteoff ||
      (command === _channelMessages.noteon && data2 === 0)
    ) {

      /**
       * Event emitted when a note off MIDI message has been received on a specific
       * channel.
       *
       * @event noteoff
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {uint} event.channel        The channel where the event occurred (between
       *                                    0 and 15).
       * @param {String} event.type         The type of event that occurred.
       * @param {Object} event.note
       * @param {uint} event.note.number    The MIDI note number.
       * @param {String} event.note.name    The usual note name (C, C#, D, D#, etc.).
       * @param {uint} event.note.octave    The octave (between -3 and 5).
       * @param {Number} event.velocity     The release velocity (between 0 and 1).
       */
      event.type = 'noteoff';
      event.note = {
        "number": data1,
        "name": _notes[data1 % 12],
        "octave": Math.floor(data1 / 12 - 1) - 3
      };
      event.velocity = data2 / 127;

    } else if (command === _channelMessages.noteon) {

      /**
       * Event emitted when a note on MIDI message has been received on a specific
       * channel.
       *
       * @event noteon
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {uint} event.channel        The channel where the event occurred (between
       *                                    0 and 15).
       * @param {String} event.type         The type of event that occurred.
       * @param {Object} event.note
       * @param {uint} event.note.number    The MIDI note number.
       * @param {String} event.note.name    The usual note name (C, C#, D, D#, etc.).
       * @param {uint} event.note.octave    The octave (between -3 and 5).
       * @param {Number} event.velocity     The attack velocity (between 0 and 1).
       */
      event.type = 'noteon';
      event.note = {
        "number": data1,
        "name": _notes[data1 % 12],
        "octave": Math.floor(data1 / 12 - 1) - 3
      };
      event.velocity = data2 / 127;

    } else if (command === _channelMessages.keyaftertouch) {

      /**
       * Event emitted when a key-specific aftertouch MIDI message has been received on a
       * specific channel.
       *
       * @event keyaftertouch
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {uint} event.channel        The channel where the event occurred (between
       *                                    0 and 15).
       * @param {String} event.type         The type of event that occurred.
       * @param {Object} event.note
       * @param {uint} event.note.number    The MIDI note number.
       * @param {String} event.note.name    The usual note name (C, C#, D, D#, etc.).
       * @param {uint} event.note.octave    The octave (between -3 and 5).
       * @param {Number} event.value        The aftertouch amount (between 0 and 1).
       */
      event.type = 'keyaftertouch';
      event.note = {
        "number": data1,
        "name": _notes[data1 % 12],
        "octave": Math.floor(data1 / 12 - 1) - 3
      };
      event.value = data2 / 127;

    } else if (
      command === _channelMessages.controlchange &&
      data1 >= 0 && data1 <= 119
    ) {

      /**
       * Event emitted when a control change MIDI message has been received on a specific
       * channel.
       *
       * @event controlchange
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {uint} event.channel        The channel where the event occurred (between
       *                                    0 and 15).
       * @param {String} event.type         The type of event that occurred.
       * @param {Object} event.controller
       * @param {uint} event.controller.number     The number of the controller.
       * @param {String} event.controller.name     The number of the controller.
       * @param {uint} event.value          The value received (between 0 and 127).
       */
      event.type = 'controlchange';
      event.controller = {
        "number": data1,
        "name": ""
      };
      event.value = data2;

    } else if (
      command === _channelMessages.channelmode &&
      data1 >= 120 && data1 <= 127
    ) {

      /**
       * Event emitted when a channel mode MIDI message has been received on a specific
       * channel.
       *
       * @event channelmode
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {uint} event.channel        The channel where the event occurred (between
       *                                    0 and 15).
       * @param {String} event.type         The type of event that occurred.
       * @param {Object} event.controller
       * @param {uint} event.controller.number     The number of the controller.
       * @param {String} event.controller.name     The number of the controller.
       * @param {uint} event.value          The value received (between 0 and 127).
       */
      event.type = 'channelmode';
      event.controller = {
        "number": data1,
        "name": ""
      };
      event.value = data2;

    } else if (command === _channelMessages.programchange) {

      /**
       * Event emitted when a program change MIDI message has been received on a specific
       * channel.
       *
       * @event programchange
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {uint} event.channel        The channel where the event occurred (between
       *                                    0 and 15).
       * @param {String} event.type         The type of event that occurred.
       * @param {uint} event.value          The value received (between 0 and 127).
       */
      event.type = 'programchange';
      event.value = data1;

    } else if (command === _channelMessages.channelaftertouch) {

      /**
       * Event emitted when a channel-wide aftertouch MIDI message has been received on a
       * specific channel.
       *
       * @event channelaftertouch
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {uint} event.channel        The channel where the event occurred (between
       *                                    0 and 15).
       * @param {String} event.type         The type of event that occurred.
       * @param {Number} event.value        The aftertouch value received (between 0 and
       *                                    1).
       */
      event.type = 'channelaftertouch';
      event.value = data1 / 127;

    } else if (command === _channelMessages.pitchbend) {

      /**
       * Event emitted when a pitch bend MIDI message has been received on a specific
       * channel.
       *
       * @event pitchbend
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {uint} event.channel        The channel where the event occurred (between
       *                                    0 and 15).
       * @param {String} event.type         The type of event that occurred.
       * @param {Number} event.value        The pitch bend value received (between -1 and
       *                                    1).
       */
      event.type = 'pitchbend';
      event.value = ((data2 << 7) + data1 - 8192) / 8192;
    } else {
      event.type = 'unknownchannelmessage';
    }

    // If some callbacks have been defined for this event on that channel, execute them.
    if (_userHandlers.channel[event.type][channel]) {
      _userHandlers.channel[event.type][channel].forEach(
        function(callback) { callback(event); }
      );
    }

  }

  function _parseSystemEvent(e) {

    var command = e.data[0];

    // Returned event
    var event = {
      "target": e.currentTarget,
      "data": e.data,
      "receivedTime": e.receivedTime,
      "timeStamp": e.timeStamp
    };

    if (command === _systemMessages.sysex) {

      /**
       * Event emitted when a system exclusive MIDI message has been received.
       *
       * @event sysex
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'sysex';

    } else if (command === _systemMessages.timecode) {

      /**
       * Event emitted when a system MIDI time code quarter frame message has been
       * received.
       *
       * @event timecode
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'timecode';

      //@todo calculate time values and make them directly available

    } else if (command === _systemMessages.songposition) {

      /**
       * Event emitted when a system song position pointer MIDI message has been received.
       *
       * @event songposition
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'songposition';

      //@todo calculate position value and make it directly available

    } else if (command === _systemMessages.songselect) {

      /**
       * Event emitted when a system song select MIDI message has been received.
       *
       * @event songselect
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       * @param {String} event.song         Song (or sequence) number to select.
       */
      event.type = 'songselect';
      event.song = e.data[1];

    } else if (command === _systemMessages.tuningrequest) {

      /**
       * Event emitted when a system tune request MIDI message has been received.
       *
       * @event tuningrequest
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'tuningrequest';

    } else if (command === _systemMessages.clock) {

      /**
       * Event emitted when a system timing clock MIDI message has been received.
       *
       * @event clock
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'clock';

    } else if (command === _systemMessages.start) {

      /**
       * Event emitted when a system start MIDI message has been received.
       *
       * @event start
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'start';

    } else if (command === _systemMessages.continue) {

      /**
       * Event emitted when a system continue MIDI message has been received.
       *
       * @event continue
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'continue';

    } else if (command === _systemMessages.stop) {

      /**
       * Event emitted when a system stop MIDI message has been received.
       *
       * @event stop
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'stop';

    } else if (command === _systemMessages.activesensing) {

      /**
       * Event emitted when a system active sensing MIDI message has been received.
       *
       * @event activesensing
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'activesensing';

    } else if (command === _systemMessages.reset) {

      /**
       * Event emitted when a system reset MIDI message has been received.
       *
       * @event reset
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'reset';

    } else {

      /**
       * Event emitted when an unknown system MIDI message has been received. It could be,
       * for example, one of the undefined/reserved messages.
       *
       * @event unknownsystemmessage
       *
       * @param {Object} event
       * @param {MIDIInput} event.target    The target MIDI input where the event
       *                                    occurred.
       * @param {Uint8Array} event.data     The raw MIDI message as an array of 8 bit
       *                                    values.
       * @param {Number} event.receivedTime The time when the event occurred (in
       *                                    milliseconds since start).
       * @param {uint} event.timeStamp      The timestamp when the event occurred
       *                                    (in milliseconds since the epoch).
       * @param {String} event.type         The type of event that occurred.
       */
      event.type = 'unknownsystemmessage';

    }

    // If some callbacks have been defined for this event on that channel, execute them.
    if (_userHandlers.system[event.type]) {
      _userHandlers.system[event.type].forEach(
        function(callback) { callback(event); }
      );
    }

  }



  /**
   * Checks if the Web MIDI API is available and then tries to connect to the host's MIDI
   * subsystem. If the operation succeeds, the `successHandler` callback is executed.
   * If not, the `errorHandler` callback is executed and passed a string describing the
   * error.
   *
   * Depending on the host environment, calling this method may prompt the user for
   * authorization.
   *
   * @method enable
   * @static
   *
   * @param successHandler {Function}   A function to execute upon success.
   * @param [errorHandler] {Function}   A function to execute upon error. This function
   *                                    will be passed a string describing the error.
   * @param [sysex=false] {Boolean}     Whether to enable sysex or not
   */
  WebMidi.prototype.enable = function(successHandler, errorHandler, sysex) {

    var that = this;

    if (!this.supported && errorHandler) {
      errorHandler("The Web MIDI API is not supported by your browser.");
      return;
    }

    var options = {"sysex": sysex};

    navigator.requestMIDIAccess(options).then(

      function(midiAccess) {
        that.interface = midiAccess;

        that.interface.onstatechange = _onInterfaceStateChange;

        that.inputs.forEach(function(input) {
          input.onmidimessage = _onMidiMessage;
        });

        successHandler();

      },
      errorHandler
    );

  };

  /**
   * Adds an event listener that will trigger a function callback when the specified event
   * happens. By default, the listener is system-wide (it will listen on all MIDI
   * channels) but this can be changed by passing one or more specific channel(s) as the
   * 3rd parameter.
   *
   * Here is a list of events that are dispatched by the `WebMidi` object and that can be
   * listened to.
   *
   * Channel-specific MIDI events:
   *
   *    * noteoff
   *    * noteon
   *    * keyaftertouch
   *    * controlchange
   *    * channelmode
   *    * programchange
   *    * channelaftertouch
   *    * pitchbend
   *
   * System-wide MIDI events:
   *
   *    * sysex
   *    * timecode
   *    * songposition
   *    * songselect
   *    * tuningrequest
   *    * clock
   *    * start
   *    * continue
   *    * stop
   *    * activesensing
   *    * reset
   *    * unknownsystemmessage
   *
   * Interface event:
   *
   *    * statechange
   *
   * For system-wide events, the specified channel (if any) will be silently ignored. The
   * value "all" will be used instead.
   *
   * @method addEventListener
   * @static
   * @chainable
   *
   * @param type {String}                     The type of the event.
   * @param listener {Function}               A callback function to execute when the
   *                                          specified event is detected.
   * @param [channel=all] {uint|Array|"all"}  The MIDI channel or array of channels to
   *                                          listen on. If set to 'all', all channels
   *                                          will trigger the callback function.
   * @throws {Error}                          WebMidi must be enabled before adding event
   *                                          listeners.
   * @throws {RangeError}                     The channel must be an integer between 0 and
   *                                          15 or the value 'all'.
   * @throws {TypeError}                      The specified event type is not supported.
   *
   * @return {WebMidi}                        Returns the `WebMidi` object so methods can
   *                                          be chained.
   */
  WebMidi.prototype.addEventListener = function(type, listener, channel) {


    //console.log("add, debut", _userHandlers.channel[type]);

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before adding event listeners.");
    }

    if (channel === undefined) { channel = "all"; }
    if (channel.constructor !== Array) { channel = [channel]; }

    // Check if channel entries are valid
    channel.forEach(function(item){
      if (item !== "all" && !(item >= 0 && item <= 15)) {
        throw new RangeError(
          "The channel must be an integer between 0 and 15 or the value 'all'."
        );
      }
    });

    // System events and the special 'statechange' event are automatically system-wide (no
    // channel).
    if (type === "statechange" || _systemMessages[type]) {

      _userHandlers.system[type].push(listener);

    } else if (_channelMessages[type]) {

      // If "all" is present anywhere in the array, use all channels
      if (channel.indexOf("all") > -1) {
        channel = [];
        for (var i = 0; i < 16; i++) { channel.push(i); }
      }

      // Push new listener in array
      channel.forEach(function(item){
        if (!_userHandlers.channel[type][item]) {
          _userHandlers.channel[type][item] = [];
        }
        _userHandlers.channel[type][item].push(listener);
      });

    } else {
      throw new TypeError("The specified event type is not supported.");
    }

    //console.log("add, fin", _userHandlers.channel[type]);

    return this;

  };

  /**
   * Checks if the specified event type is already defined to trigger the listener
   * function on the specified channel. If the special value "all" is used for the
   * channel, the function will return `true` only  if all channels have the listener
   * defined.
   *
   * For system-wide events (`onstatechange`, `sysex`, `start`, etc.), the channel
   * parameter is silently ignored.
   *
   * @method hasEventListener
   * @static
   *
   * @param type {String}               The type of the event.
   * @param listener {Function}         The callback function to check for.
   * @param [channel=all] {uint|"all"}  The MIDI channel to check on. It can be a uint
   *                                    (between 0 and 15) or the special value "all".
   * @throws {Error}                    WebMidi must be enabled before checking event
   *                                    listeners.
   *
   * @returns {Boolean}                 Boolean value indicating whether or not the
   *                                    channel(s) already have this listener defined.
   */
  WebMidi.prototype.hasEventListener = function(type, listener, channel) {

    //console.log("has, debut", _userHandlers.channel[type]);

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before checking event listeners.");
    }

    if (channel === undefined) { channel = "all"; }

    if (type === "statechange" || _systemMessages[type]) {

      for (var i = 0; i < _userHandlers.system[type].length; i++) {
        if (_userHandlers.system[type][i] === listener) { return true; }
      }

    } else if (_channelMessages[type] && channel === "all") {

      for (var k = 0; k < _userHandlers.channel[type].length; k++) {

        var ch = _userHandlers.channel[type][k];

        if (ch.length < 1) { return false; }

        for (var l = 0; l < ch.length; l++) {
          if (ch[l] !== listener) { return false; }
        }

      }

      return true;

    } else if (_channelMessages[type]) {

      for (var j = 0; j < _userHandlers.channel[type][channel].length; j++) {
        if (_userHandlers.channel[type][channel][j] === listener) {
          return true;
        }
      }

    }

    return false;

  };

  /**
   * Removes the specified listener from the requested channel(s). If the special value
   * "all" is used for the channel parameter, the function will remove the listener from
   * all channels.
   *
   * For system-wide events (`onstatechange`, `sysex`, `start`, etc.), the channel
   * parameter is silently ignored.
   *
   * @method removeEventListener
   * @static
   *
   * @param type {String}               The type of the event.
   * @param listener {Function}         The callback function to check for.
   * @param [channel=all] {uint|"all"}  The MIDI channel to check on. It can be a uint
   *                                    (between 0 and 15) or the special value "all".
   *
   * @throws {Error}                    WebMidi must be enabled before removing event
   *                                    listeners.
   */
  WebMidi.prototype.removeEventListener = function(type, listener, channel) {

    //console.log("remove, debut", _userHandlers.channel[type]);

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before removing event listeners.");
    }

    if (channel === undefined) { channel = "all"; }

    if (type === "statechange" || _systemMessages[type]) {

      for (var i = 0; i < _userHandlers.system[type].length; i++) {
        if (_userHandlers.system[type][i] === listener) {
          _userHandlers.system[type].splice(i, 1);
        }
      }

    } else if (_channelMessages[type] && channel === "all") {

      for (var k = 0; k < _userHandlers.channel[type].length; k++) {
        var ch = _userHandlers.channel[type][k];
        for (var l = 0; l < ch.length; l++) {
          if (ch[l] === listener) { ch.splice(l, 1); }
          //if (ch.length < 1) { ch = []; }
        }
      }

    } else if (_channelMessages[type]) {

      for (var j = 0; j < _userHandlers.channel[type][channel].length; j++) {
        if (_userHandlers.channel[type][channel][j] === listener) {
          _userHandlers.channel[type][channel].splice(j, 1);
        }
      }

    }

    //console.log("remove, fin", _userHandlers.channel[type]);

  };

  /**
   * Sends a MIDI message to one or all channels at the specified timestamp. Unless, you
   * are familiar with the details of the MIDI message format, you should not use this
   * method directly. Instead, use one of the helper methods: `playNote()`, `stopNote()`,
   * `sendControlChange()`, `sendSystemMessage()`, etc.
   *
   * @method send
   * @static
   * @chainable
   *
   * @param channel {"all"|uint}      The MIDI channel number (between 0 and 15) or the
   *                                  string "all". You can view the available channels in
   *                                  `WebMidi.outputs`.
   * @param command {uint}            The command number. Check out the constants in the
   *                                  WebMidi object for a list of available commands
   *                                  (0-255).
   * @param [data=[]] {Array}         Array of data bytes. The number of data bytes varies
   *                                  depending on the command.
   * @param [timestamp=0] {DOMHighResTimeStamp}      The timestamp at which to schedule
   *                                  the event. You can use `WebMidi.time` to retrieve
   *                                  the current timestamp.
   *
   * @throws {Error}                  WebMidi must be enabled before sending messages.
   * @throws {ReferenceError}         The requested channel (XX) is not available.
   * @throws {RangeError}             The command must be an integer between 0 and 255.
   *
   * @return {WebMidi}                Returns the `WebMidi` object so methods can be
   *                                  chained.
   */
  WebMidi.prototype.send = function(channel, command, data, timestamp) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before sending messages.");
    }

    // Check channel availability
    if (
      channel !== "all" &&
      (!this.outputs[channel] || this.outputs[channel].state !== "connected")
    ) {
      throw new ReferenceError(
        "The requested channel (" + channel + ") is not available."
      );
    }

    if (command < 0 || command > 255) {
      throw new RangeError("The command must be an integer between 0 and 255.");
    }

    if (data === undefined || data.constructor !== Array) { data = []; }
    if (timestamp === undefined) { timestamp = 0; }

    var message = [];

    data.forEach(function(item){
      if (item !== undefined) { message.push(item); }
    });

    if (channel === "all") {
      message.unshift(command);
      this.outputs.forEach(function(output) {
        output.send(message, timestamp);
      });
    } else {
      message.unshift((command << 4) + channel);
      this.outputs[channel].send(message, timestamp);
    }

    return this;

  };

  /**
   * Sends a MIDI real-time or common system message to all available outputs. The
   * available messages are as follows:
   *
   * System common messages:
   *
   *    sysex
   *    timecode
   *    songposition
   *    songselect
   *    tuningrequest
   *    sysexend
   *
   * System real-time messages:
   *
   *    clock
   *    start
   *    continue
   *    stop
   *    activesensing
   *    reset
   *
   * @method sendSystemMessage
   * @static
   * @chainable
   *
   * @param command {String}    A string representing the command to send. The available
   *                            system commands are: sysex, timecode, songposition,
   *                            songselect, tuningrequest, sysexend, clock, start,
   *                            continue, stop, activesensing and reset.
   * @param [data=[]] {Array}   An array of data bytes to insert in the message. The
   *                            number of data bytes varies depending on the command.
   * @param [delay=0] {uint}    The number of milliseconds to wait before actually sending
   *                            the command (using 0 will send the command immediately).
   *
   * @throws {Error}            WebMidi must be enabled sending messages.
   * @throws {RangeError}       The requested system command is not supported.
   *
   * @return {WebMidi}          Returns the `WebMidi` object so methods can be chained.
   *
   * @todo tuning request does not work ?!
   */
  WebMidi.prototype.sendSystemMessage = function(command, data, delay) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled sending messages.");
    }

    if (!_systemMessages[command]) {
      throw new RangeError(
        "The requested system command (" + command + ") is not supported"
      );
    }

    if (!data || data.constructor !== Array) { data = []; }

    if (delay === undefined) { delay = 0; }

    this.send("all", _systemMessages[command], data, this.time + delay);

    return this;
  };

  /**
   * Sends a system exclusive message to all connected devices. The message will
   * automatically be properly terminated. It is generally suggested to keep system
   * exclusive messages to 64Kb or less.
   *
   * @method sendSystemMessage
   * @static
   * @chainable
   *
   * @param manufacturer {uint|Array} A uint or an array of three uints between 0 and 127
   *                                  that identifies the targeted manufacturer.
   * @param [data=[]] {Array}         An array of uints between 0 and 127. This is the
   *                                  data you wish to transfer.
   * @param [delay=0] {uint}          The number of milliseconds to wait before actually
   *                                  sending the command (using 0 will send the command
   *                                  immediately).
   *
   * @throws                          WebMidi must be enabled sending messages.
   *
   * @return {WebMidi}                Returns the `WebMidi` object so methods can be
   *                                  chained.
   */
  WebMidi.prototype.sendSysexMessage = function(manufacturer, data, delay) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before sending messages.");
    }

    if (manufacturer.prototype !== Array) { manufacturer = [manufacturer]; }
    if (delay === undefined) { delay = 0; }

    data = manufacturer.concat(data, _systemMessages.sysexend);
    this.send("all", _systemMessages.sysex, data, this.time + delay);

    return this;

  };

  /**
   * Sends a MIDI `note off` message to the specified channel. A `note off` message simply
   * means to stop playing a note. You can delay the execution of the `note off` command
   * by using the `delay` parameter (milliseconds).
   *
   * @method stopNote
   * @static
   * @chainable
   *
   * @param channel {uint}          The MIDI channel number (between 0 and 15). You can
   *                                view available channels in the `WebMidi.outputs`
   *                                array.
   * @param note {uint}             The MIDI number of the note to stop (between 0 and
   *                                127).
   * @param [velocity=0.5] {Number} The velocity at which to release the note (between 0
   *                                and 1).
   * @param [delay=0] {int}         The number of milliseconds to wait before actually
   *                                sending the `note off` message (using a negative
   *                                number or 0 will stop the note immediately).
   *
   * @throws {Error}                WebMidi must be enabled before stopping notes.
   * @throws {RangeError}           The note number must be between 0 and 127.
   *
   * @return {WebMidi}              Returns the `WebMidi` object so methods can be
   *                                chained.
   */
  WebMidi.prototype.stopNote = function(channel, note, velocity, delay) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before stopping notes.");
    }

    if (note === undefined || note < 0 || note > 127) {
      throw new RangeError("The note number must be between 0 and 127.");
    }
    if (velocity === undefined) { velocity = 0.5; }
    if (delay === undefined) { delay = 0; }

    var nVelocity = Math.round(velocity * 127);
    this.send(channel, _channelMessages.noteoff, [note, nVelocity], this.time + delay);

    return this;

  };

  /**
   * Sends a MIDI `note on` message to the specified channel. A `note on` message simply
   * means to play a note. You can delay the execution of the `note on` command
   * by using the `delay` parameter (milliseconds).
   *
   * If no duration is specified, the note will play until a matching `note off` is sent.
   * If a duration is specified, a `note off` will be automatically executed after said
   * duration.
   *
   * Please note that if you do use a duration, the release velocity will always be 64. If
   * you want to tailor the release velocity, you need to use separate `playNote()` and
   * `stopNote()` calls.
   *
   * @method playNote
   * @static
   * @chainable
   *
   * @param channel {uint}              The MIDI channel number (between 0 and 15). You
   *                                    can view available channels in the
   *                                    `WebMidi.outputs` array.
   * @param note {uint}                 The MIDI number of the note to play (between 0 and
   *                                    127).
   * @param [velocity=0.5] {Number}     The velocity at which to play the note (between 0
   *                                    and 1).
   * @param [duration=undefined] {int}  The number of milliseconds to wait before sending
   *                                    a matching note off event. If left undefined, only
   *                                    a note on is sent.
   * @param [delay=0] {int}             The number of milliseconds to wait before actually
   *                                    sending the `note on` command (using a negative
   *                                    number or 0 will send the command immediately).
   *
   * @throws {Error}                    WebMidi must be enabled before playing notes.
   * @throws {RangeError}               The note number must be between 0 and 127.
   *
   * @return {WebMidi}                  Returns the `WebMidi` object so methods can be
   *                                    chained.
   */
  WebMidi.prototype.playNote = function(channel, note, velocity, duration, delay) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before playing notes.");
    }

    if (note === undefined || note < 0 || note > 127) {
      throw new RangeError("The note number must be between 0 and 127.");
    }

    // Set defaults
    if (velocity === undefined) { velocity = 0.5; }
    if (delay === undefined) { delay = 0; }
    var nVelocity = Math.round(velocity * 127);

    // Send note on
    var timestamp = this.time + delay;
    this.send(channel, _channelMessages.noteon, [note, nVelocity], timestamp);

    // Send note off (only if a duration has been defined)
    if (duration !== undefined) {
      this.send(channel, _channelMessages.noteoff, [note, 64], timestamp + duration);
    }

    return this;

  };

  /**
   * Sends a MIDI `key aftertouch` message to the specified channel. This is a
   * key-specific aftertouch. For a channel-wide aftertouch message, use
   * `sendChannelAftertouch()`.
   *
   * @method sendKeyAftertouch
   * @static
   * @chainable
   *
   * @param channel {uint}        The MIDI channel number (between 0 and 15). You can view
   *                              available channels in the `WebMidi.outputs` array.
   * @param note {uint}           The MIDI number of the note whose pressure data is being
   *                              sent (0-127).
   * @param [pressure=0] {Number} The pressure level to send (between 0 and 1)
   * @param [delay=0] {int}       The number of milliseconds to wait before actually
   *                              sending the `key aftertouch` command (using a negative
   *                              number or 0 will send the command immediately).
   *
   * @throws {Error}              WebMidi must be enabled before sending messages.
   * @throws {RangeError}         The note number must be between 0 and 127.
   *
   * @return {WebMidi}            Returns the `WebMidi` object so methods can be chained.
   */
  WebMidi.prototype.sendKeyAftertouch = function(channel, note, pressure, delay) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before sending messages.");
    }

    if (note === undefined || note < 0 || note > 127) {
      throw new RangeError("The note number must be between 0 and 127.");
    }

    if (delay === undefined) { delay = 0; }
    var nPressure = Math.round(pressure * 127);
    this.send(
      channel, _channelMessages.keyaftertouch, [note, nPressure], this.time + delay
    );

    return this;

  };

  /**
   * Sends a MIDI `control change` message to the specified channel.
   *
   * @method sendControlChange
   * @static
   * @chainable
   *
   * @param channel {uint}      The MIDI channel number (between 0 and 15). You can view
   *                            available channels in the `WebMidi.outputs` array.
   * @param controller {uint}   The MIDI controller number (0-119)
   * @param value {uint}        The value to send (0-127).
   * @param [delay=0] {int}     The number of milliseconds to wait before actually sending
   *                            the `key aftertouch` command (using a negative number or 0
   *                            will send the command immediately).
   *
   * @throws {Error}            WebMidi must be enabled before sending messages.
   * @throws {RangeError}       Controller numbers must be between 0 and 119.
   * @throws {RangeError}       Value must be between 0 and 127.
   *
   * @return {WebMidi}          Returns the `WebMidi` object so methods can be chained.
   */
  WebMidi.prototype.sendControlChange = function(channel, controller, value, delay) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before sending messages.");
    }

    if (controller === undefined || controller < 0 || controller > 119) {
      throw new RangeError("Controller numbers must be between 0 and 119.");
    }
    if (value === undefined || value < 0 || value > 127) {
      throw new RangeError("Value must be between 0 and 127.");
    }
    if (delay === undefined) { delay = 0; }
    this.send(channel, _channelMessages.controlchange, [controller, value], this.time + delay);

    return this;

  };

  /**
   * Sends a MIDI `channel mode` message to the specified channel.
   *
   * @method sendChannelMode
   * @static
   * @chainable
   *
   * @param channel {uint}      The MIDI channel number (between 0 and 15). You can view
   *                            available channels in the `WebMidi.outputs` array.
   * @param command {uint}      The MIDI channel mode command (120-127)
   * @param value {uint}        The value to send (0-127)
   * @param [delay=0] {int}     The number of milliseconds to wait before actually sending
   *                            the `key aftertouch` command (using a negative number or 0
   *                            will send the command immediately).
   *
   * @throws {Error}            WebMidi must be enabled before sending messages.
   * @throws {RangeError}       Channel mode controller numbers must be between 120 and
   *                            127.
   * @throws {RangeError}       Value must be between 0 and 127.
   *
   * @return {WebMidi}          Returns the `WebMidi` object so methods can be chained.
   *
   * @todo  il faut décortiquer les channel mode en fonctions distinctes
   */
  WebMidi.prototype.sendChannelMode = function(channel, command, value, delay) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before sending messages");
    }

    if (command === undefined || command < 120 || command > 127) {
      throw new RangeError("Channel mode controller numbers must be between 120 and 127.");
    }
    if (value === undefined || value < 0 || value > 127) {
      throw new RangeError("Value must be between 0 and 127.");
    }
    if (delay === undefined) { delay = 0; }

    this.send(channel, _channelMessages.channelmode, [command, value], this.time + delay);

    return this;

  };

  /**
   * Sends a MIDI `program change` message to the specified channel.
   *
   * @method sendProgramChange
   * @static
   * @chainable
   *
   * @param channel {uint}      The MIDI channel number (between 0 and 15). You can view
   *                            available channels in the `WebMidi.outputs` array.
   * @param program {uint}      The MIDI patch (program) number (0-127)
   * @param [delay=0] {int}     The number of milliseconds to wait before actually sending
   *                            the `key aftertouch` command (using a negative number or 0
   *                            will send the command immediately).
   *
   * @throws {Error}            WebMidi must be enabled before sending messages.
   * @throws {RangeError}       Program numbers must be between 0 and 127.
   *
   * @return {WebMidi}          Returns the `WebMidi` object so methods can be chained.
   *
   */
  WebMidi.prototype.sendProgramChange = function(channel, program, delay) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before sending messages.");
    }

    if (program === undefined || program < 0 || program > 127) {
      throw new RangeError("Program numbers must be between 0 and 127.");
    }
    if (delay === undefined) { delay = 0; }

    this.send(channel, _channelMessages.programchange, [program], this.time + delay);

    return this;

  };

  /**
   * Sends a MIDI `channel aftertouch` message to the specified channel. For key-specific
   * aftertouch, instead use `sendKeyAftertouch()`.
   *
   * @method sendChannelAftertouch
   * @static
   * @chainable
   *
   * @param channel {uint}        The MIDI channel number (between 0 and 15). You can view
   *                              available channels in the `WebMidi.outputs` array.
   * @param [pressure=0] {Number} The pressure level (between 0 and 1)
   * @param [delay=0] {int}       The number of milliseconds to wait before actually
   *                              sending the `key aftertouch` command (using a negative
   *                              number or 0 will send the command immediately).
   *
   * @throws {Error}              WebMidi must be enabled before sending messages.
   *
   * @return {WebMidi}            Returns the `WebMidi` object so methods can be chained.
   */
  WebMidi.prototype.sendChannelAftertouch = function(channel, pressure, delay) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before sending messages.");
    }

    if (delay === undefined) { delay = 0; }

    var nPressure = Math.round(pressure * 127);
    this.send(
      channel, _channelMessages.channelaftertouch, [nPressure], this.time + delay
    );

    return this;

  };

  /**
   * Sends a MIDI `pitch bend` message to the specified channel.
   *
   * @method sendPitchBend
   * @static
   * @chainable
   *
   * @param channel {uint}      The MIDI channel number (between 0 and 15). You can view
   *                            available channels in the `WebMidi.outputs` array.
   * @param [level=-1] {Number} The intensity level of the bend (between -1 and 1)
   * @param [delay=0] {int}     The number of milliseconds to wait before actually sending
   *                            the `key aftertouch` command (using a negative number or 0
   *                            will send the command immediately).
   *
   * @throws {Error}            WebMidi must be enabled before sending messages.
   * @throws {RangeError}       Pitch bend value must be between -1 and 1.
   *
   * @return {WebMidi}          Returns the `WebMidi` object so methods can be chained.
   */
  WebMidi.prototype.sendPitchBend = function(channel, level, delay) {

    if (!this.connected || !this.supported) {
      throw new Error("WebMidi must be enabled before sending messages.");
    }

    if (delay === undefined) { delay = 0; }
    if (level < -1 || level > 1) {
      throw new RangeError("Pitch bend value must be between -1 and 1.");
    }

    var nLevel = Math.round((level + 1) / 2 * 16383);
    var msb = (nLevel >> 7) & 0x7F;
    var lsb = nLevel & 0x7F;
    this.send(channel, _channelMessages.pitchbend, [lsb, msb], this.time + delay);

    return this;

  };

  // Check if RequireJS/AMD is used. If it is, use it to define our module instead of
  // polluting the global space.
  if ( typeof define === "function" && typeof define.amd === "object") {
    define([], function () {
      return new WebMidi();
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = WebMidi;
  } else {
    if (!scope.WebMidi) { scope.WebMidi = new WebMidi(); }
  }

}(this));
