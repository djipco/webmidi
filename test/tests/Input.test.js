let preset = {
  empties: [undefined, null, "", NaN, [], {}, 0],
  booleans: [true, false],
  listener: () => {},
  channels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
};

describe("Input", function() {

  beforeEach("Check support and enable WebMidi.js", async function () {
    if (!WebMidi.supported) {
      console.warn("The Web MIDI API is not supported in this environment.");
      this.skip();
    }
    await WebMidi.enable();
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  describe("constructor()", function() {

    it("should set up all 'InputChannel' objects", function() {

      expect(WebMidi.inputs[0].channels.length).to.equal(16+1);

      for (let i = 1; i <= 16; i++) {
        expect(WebMidi.inputs[0].channels[i].number).to.equal(i);
      }

    });

  });

  describe("open()", function() {
    it("should open the port");
  });

  describe("close()", function() {
    it("should close the port");
  });

  describe("getCcNameByNumber()", function() {
    it("should close the port");
  });

  describe("destroy()", function() {
    it("???");
  });

  describe("addListener()", function() {

    it("should add listeners to all specified channels", function() {

      let l1 = () => {};
      WebMidi.inputs[0].addListener("noteon", preset.channels, l1);

      WebMidi.inputs[0].channels.forEach(ch => {
        expect(ch.hasListener("noteon", l1)).to.be.true;
      });

    });

    it("should add listeners for system messages", function() {

      let l1 = () => {};

      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(function(key) {
        WebMidi.inputs[0].addListener(key, undefined, l1);
      });

      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(function(key) {
        expect(WebMidi.inputs[0].hasListener(key, l1)).to.be.true;
      });

    });

    it("should throw error for invalid event types", function() {

      preset.empties.forEach(event => {
        expect(() => {
          WebMidi.inputs[0].addListener(event, preset.channels, preset.listener);
        }).to.throw(TypeError);
      });

    });

    it("should return array of 'Listener' objects (of length 1) for system messages", function() {

      let callbacks = [];
      let listeners = [];

      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(function(key, index) {
        callbacks[index] = () => {};
        listeners[index] = WebMidi.inputs[0].addListener(key, undefined, callbacks[index]);
      });

      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(function(key, index) {
        expect(listeners[index].length).to.equal(1);
        expect(listeners[index][0].callback === callbacks[index]).to.be.true;
      });

    });

    it("should return an array of 'Listener' objects for channel messages", function() {

      let callbacks = [];
      let listeners = [];

      Object.keys(WebMidi.MIDI_CHANNEL_VOICE_MESSAGES).forEach(function(key, index) {
        callbacks[index] = () => {};
        listeners[index] = WebMidi.inputs[0].addListener(key, preset.channels, callbacks[index]);
      });

      Object.keys(WebMidi.MIDI_CHANNEL_VOICE_MESSAGES).forEach(function(key, index) {
        expect(listeners[index].length === preset.channels.length);
        expect(listeners[index][0].callback === callbacks[index]).to.be.true;
      });

    });

    it("should throw error if channels are specified but listener is not a function", function() {

      expect(() => {
        WebMidi.inputs[0].addListener("noteon", preset.channels);
      }).to.throw(TypeError);

    });

    it("should ignore invalid channels", function() {
      let channels = preset.channels.concat(preset.empties);
      let listeners = WebMidi.inputs[0].addListener("noteon", channels, () => {});
      expect(listeners.length).to.equal(preset.channels.length);
    });

  });

  describe("addOneTimeListener()", function() {
    it("???");
  });

  describe("hasListener()", function() {

    // it("should throw error if listener is not a function", function(done) {
    //
      // ["prout", undefined, null].forEach(function (param) {
      //   expect(function () {
      //     WebMidi.inputs[0].hasListener("noteon", param);
      //   }).to.throw(TypeError);
      // });
      //
      // done();
    //
    // });

    // it("should correctly check for listeners", function(done) {

      // function a() {}
      // function b() {}
      //
      // WebMidi.inputs[0].addListener("noteoff", 10, a);
      // expect(WebMidi.inputs[0].hasListener("noteoff", 10, a)).to.equal(true);
      //
      // WebMidi.inputs[0].addListener("noteon", 10, a);
      // expect(WebMidi.inputs[0].hasListener("noteon", 10, b)).to.equal(false);
      //
      // WebMidi.inputs[0].addListener("keyaftertouch", "all", a);
      // expect(WebMidi.inputs[0].hasListener("keyaftertouch", 3, a)).to.equal(true);
      //
      // WebMidi.inputs[0].addListener("controlchange", [1, 2, 3], a);
      // expect(WebMidi.inputs[0].hasListener("controlchange", 3, a)).to.equal(true);
      // expect(WebMidi.inputs[0].hasListener("controlchange", [1, 3], a)).to.equal(true);
      // expect(WebMidi.inputs[0].hasListener("controlchange", [1, 2, 3], a)).to.equal(true);
      // expect(WebMidi.inputs[0].hasListener("controlchange", "all", a)).to.equal(false);
      //
      // WebMidi.inputs[0].addListener("nrpn", [1, 2, 3], a);
      // expect(WebMidi.inputs[0].hasListener("nrpn", 3, a)).to.equal(true);
      // expect(WebMidi.inputs[0].hasListener("nrpn", [1, 3], a)).to.equal(true);
      // expect(WebMidi.inputs[0].hasListener("nrpn", [1, 2, 3], a)).to.equal(true);
      // expect(WebMidi.inputs[0].hasListener("nrpn", "all", a)).to.equal(false);
      //
      // WebMidi.inputs[0].addListener("channelmode", "all", a);
      // expect(WebMidi.inputs[0].hasListener("channelmode", 3, a)).to.equal(true);
      // expect(WebMidi.inputs[0].hasListener("channelmode", "all", a)).to.equal(true);
      // expect(WebMidi.inputs[0].hasListener("channelmode", "all", b)).to.equal(false);
      // expect(WebMidi.inputs[0].hasListener("channelmode", "all", a)).to.equal(true);
      //
      // done();

    // });

  });

  describe("removeListener()", function() {

    // it("should throw error if type is not supported", function() {
    //
    //   ["xxx", null].forEach(function (param) {
    //     expect(function () {
    //       WebMidi.inputs[0].removeListener(param);
    //     }).to.throw(TypeError);
    //   });
    //
    // });
    //
    // it("should throw error if listener is defined but not a function", function() {
    //
    //   ["prout", null, {}].forEach(function (param) {
    //     expect(function () {
    //       WebMidi.inputs[0].removeListener("start", "all", param);
    //     }).to.throw(TypeError);
    //   });
    //
    // });
    //
    // it("should throw error if filters param is defined but not an object", function() {
    //
    //   ["prout", undefined, null, 123].forEach(function () {
    //     expect(function () {
    //       WebMidi.inputs[0].removeListener("start", function() {}, 123);
    //     }).to.throw(TypeError);
    //   });
    //
    // });
    //
    // it("should correctly remove listeners", function() {
    //
    //   function a() {}
    //   function b() {}
    //
    //   WebMidi.inputs[0].addListener("programchange", 10, a);
    //   WebMidi.inputs[0].removeListener("programchange", 10, a);
    //   expect(WebMidi.inputs[0].hasListener("programchange", 10, a)).to.equal(false);
    //
    //   WebMidi.inputs[0].addListener("sysex", undefined, a);
    //   WebMidi.inputs[0].removeListener("sysex", undefined, a);
    //   expect(WebMidi.inputs[0].hasListener("sysex", undefined, a)).to.equal(false);
    //
    //   WebMidi.inputs[0].addListener("channelaftertouch", 10, a);
    //   WebMidi.inputs[0].removeListener("channelaftertouch", "all", a);
    //   expect(WebMidi.inputs[0].hasListener("channelaftertouch", 10, a)).to.equal(false);
    //
    //   WebMidi.inputs[0].addListener("pitchbend", "all", a);
    //   WebMidi.inputs[0].removeListener("pitchbend", 10, a);
    //   expect(WebMidi.inputs[0].hasListener("pitchbend", 10, a)).to.equal(false);
    //   expect(WebMidi.inputs[0].hasListener("pitchbend", 11, a)).to.equal(true);
    //
    //   WebMidi.inputs[0].addListener("noteoff", "all", a);
    //   WebMidi.inputs[0].addListener("noteoff", "all", b);
    //   WebMidi.inputs[0].removeListener("noteoff");
    //   expect(WebMidi.inputs[0].hasListener("noteoff", 10, a)).to.equal(false);
    //   expect(WebMidi.inputs[0].hasListener("noteoff", 11, b)).to.equal(false);
    //
    //   WebMidi.inputs[0].addListener("keyaftertouch", "all", a);
    //   WebMidi.inputs[0].addListener("keyaftertouch", "all", b);
    //   WebMidi.inputs[0].removeListener();
    //   expect(WebMidi.inputs[0].hasListener("keyaftertouch", 10, a)).to.equal(false);
    //   expect(WebMidi.inputs[0].hasListener("keyaftertouch", "all", b)).to.equal(false);
    //
    //   WebMidi.inputs[0].addListener("stop", "all", a);
    //   WebMidi.inputs[0].addListener("stop", "all", b);
    //   WebMidi.inputs[0].removeListener("stop");
    //   expect(WebMidi.inputs[0].hasListener("stop", "all", a)).to.equal(false);
    //   expect(WebMidi.inputs[0].hasListener("stop", "all", b)).to.equal(false);
    //
    // });

  });

  describe("getCcNameByNumber()", function() {

  //   it("should throw an error when an invalid CC number is provided", function () {
  //
  //     [-1, 120, function() {}].forEach(function (param) {
  //       expect(function () {
  //         WebMidi.inputs[0].getCcNameByNumber(param);
  //       }).to.throw(RangeError);
  //     });
  //
  //   });
  //
  //   it("should return undefined when there is no defined name for a valid number", function () {
  //     expect(WebMidi.inputs[0].getCcNameByNumber(3)).to.equal(undefined);
  //   });
  //
  //   it("should return correct name", function (done) {
  //
  //     for (var key in WebMidi.MIDI_CONTROL_CHANGE_MESSAGES) {
  //       if (WebMidi.MIDI_CONTROL_CHANGE_MESSAGES.hasOwnProperty(key)) {
  //         expect(
  //           WebMidi.inputs[0].getCcNameByNumber(WebMidi.MIDI_CONTROL_CHANGE_MESSAGES[key])
  //         ).to.equal(key);
  //       }
  //     }
  //
  //     done();
  //
  //   });

  });

  describe("getChannelModeByNumber()", function() {

  //   it("should throw an error when an invalid channel mode number is provided", function () {
  //
  //     expect(function () {
  //
  //       [-1, 0, 119, 128, undefined, null, function() {}].forEach(function (param) {
  //         WebMidi.inputs[0].getChannelModeByNumber(param);
  //       });
  //
  //     }).to.throw(RangeError);
  //
  //   });
  //
  //   it("should return correct channel mode name", function () {
  //
  //     for (var key in WebMidi.MIDI_CHANNEL_MODE_MESSAGES) {
  //       if (WebMidi.MIDI_CHANNEL_MODE_MESSAGES.hasOwnProperty(key)) {
  //         expect(
  //           WebMidi.inputs[0].getChannelModeByNumber(WebMidi.MIDI_CHANNEL_MODE_MESSAGES[key])
  //         ).to.equal(key);
  //       }
  //     }
  //
  //   });

  });

});
