const WebMidi = require("../../src/webmidi");

const JZZ = require("jzz");
const mt = require("midi-test");
const {expect} = require("chai");

global.navigator = null;
global.performance = null;
let jz = null;

const expectedInputDriverName = "Virtual MIDI-In";
const inputPort = mt.MidiSrc(expectedInputDriverName);

describe("Input", function() {

  beforeEach(function(done) {
    global.navigator = {
      requestMIDIAccess: JZZ.requestMIDIAccess
    };
    global.performance = {
      now: e => e
    };
    jz = JZZ;
    inputPort.connect();
    WebMidi.disable();

    WebMidi.enable(function() {

      if (WebMidi.inputs.length > 0) {
        done();
      } else {

        // Calling this.skip() throws an error. We catch it so it does not up show in the console
        try {
          this.skip();
        } catch (err) {
          // console.warn(err.message)
        }

      }

    }.bind(this));
  });

  afterEach(function(done) {
    WebMidi.disable();
    inputPort.disconnect();
    global.navigator = null;
    global.performance = null;
    jz= null;
    done();
  });
  describe("addListener()", function() {

    it("should throw error if listener is not a function", function() {

      expect(function () {
        WebMidi.inputs[0].addListener("noteon");
      }).to.throw(TypeError);

    });

    it("should throw error if type is invalid", function() {

      ["prout", "", undefined, null, function() {}].forEach(function (param) {
        expect(function () {
          WebMidi.inputs[0].addListener(param, 1, function() {});
        }).to.throw(TypeError);
      });

    });

    it("should throw error if channel is invalid", function() {

      expect(function () {
        WebMidi.inputs[0].addListener("noteon", "abc", function() {});
      }).to.throw(RangeError);

      expect(function () {
        WebMidi.inputs[0].addListener("noteon", 123, function() {});
      }).to.throw(RangeError);

    });

    it("should actually add the listener(s)", function() {

      function a() {}
      function b() {}

      WebMidi.inputs[0].addListener("noteoff", 10, a);
      expect(WebMidi.inputs[0].hasListener("noteoff", 10, a)).to.equal(true);

      WebMidi.inputs[0].addListener("noteon", 10, a);
      expect(WebMidi.inputs[0].hasListener("noteon", 10, b)).to.equal(false);

      WebMidi.inputs[0].addListener("keyaftertouch", "all", a);
      expect(WebMidi.inputs[0].hasListener("keyaftertouch", 3, a)).to.equal(true);

      WebMidi.inputs[0].addListener("controlchange", [1, 2, 3], a);
      expect(WebMidi.inputs[0].hasListener("controlchange", 3, a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("controlchange", [1, 3], a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("controlchange", [1, 2, 3], a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("controlchange", "all", a)).to.equal(false);

      WebMidi.inputs[0].addListener("nrpn", [1, 2, 3], a);
      expect(WebMidi.inputs[0].hasListener("nrpn", 3, a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("nrpn", [1, 3], a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("nrpn", [1, 2, 3], a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("nrpn", "all", a)).to.equal(false);

      WebMidi.inputs[0].addListener("channelmode", "all", a);
      expect(WebMidi.inputs[0].hasListener("channelmode", 3, a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("channelmode", "all", a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("channelmode", "all", b)).to.equal(false);
      expect(WebMidi.inputs[0].hasListener("channelmode", 5, a)).to.equal(true);

    });

  });

  describe("hasListener()", function() {

    it("should throw error if listener is not a function", function(done) {

      ["prout", undefined, null].forEach(function (param) {
        expect(function () {
          WebMidi.inputs[0].hasListener("noteon", param);
        }).to.throw(TypeError);
      });

      done();

    });

    it("should correctly check for listeners", function(done) {

      function a() {}
      function b() {}

      WebMidi.inputs[0].addListener("noteoff", 10, a);
      expect(WebMidi.inputs[0].hasListener("noteoff", 10, a)).to.equal(true);

      WebMidi.inputs[0].addListener("noteon", 10, a);
      expect(WebMidi.inputs[0].hasListener("noteon", 10, b)).to.equal(false);

      WebMidi.inputs[0].addListener("keyaftertouch", "all", a);
      expect(WebMidi.inputs[0].hasListener("keyaftertouch", 3, a)).to.equal(true);

      WebMidi.inputs[0].addListener("controlchange", [1, 2, 3], a);
      expect(WebMidi.inputs[0].hasListener("controlchange", 3, a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("controlchange", [1, 3], a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("controlchange", [1, 2, 3], a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("controlchange", "all", a)).to.equal(false);

      WebMidi.inputs[0].addListener("nrpn", [1, 2, 3], a);
      expect(WebMidi.inputs[0].hasListener("nrpn", 3, a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("nrpn", [1, 3], a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("nrpn", [1, 2, 3], a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("nrpn", "all", a)).to.equal(false);

      WebMidi.inputs[0].addListener("channelmode", "all", a);
      expect(WebMidi.inputs[0].hasListener("channelmode", 3, a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("channelmode", "all", a)).to.equal(true);
      expect(WebMidi.inputs[0].hasListener("channelmode", "all", b)).to.equal(false);
      expect(WebMidi.inputs[0].hasListener("channelmode", "all", a)).to.equal(true);

      done();

    });

  });

  describe("removeListener()", function() {

    it("should throw error if type is not supported", function() {

      ["xxx", null].forEach(function (param) {
        expect(function () {
          WebMidi.inputs[0].removeListener(param);
        }).to.throw(TypeError);
      });

    });

    it("should throw error if listener is defined but not a function", function() {

      ["prout", null, {}].forEach(function (param) {
        expect(function () {
          WebMidi.inputs[0].removeListener("start", "all", param);
        }).to.throw(TypeError);
      });

    });

    it("should throw error if filters param is defined but not an object", function() {

      ["prout", undefined, null, 123].forEach(function () {
        expect(function () {
          WebMidi.inputs[0].removeListener("start", function() {}, 123);
        }).to.throw(TypeError);
      });

    });

    it("should correctly remove listeners", function() {

      function a() {}
      function b() {}

      WebMidi.inputs[0].addListener("programchange", 10, a);
      WebMidi.inputs[0].removeListener("programchange", 10, a);
      expect(WebMidi.inputs[0].hasListener("programchange", 10, a)).to.equal(false);

      WebMidi.inputs[0].addListener("sysex", undefined, a);
      WebMidi.inputs[0].removeListener("sysex", undefined, a);
      expect(WebMidi.inputs[0].hasListener("sysex", undefined, a)).to.equal(false);

      WebMidi.inputs[0].addListener("channelaftertouch", 10, a);
      WebMidi.inputs[0].removeListener("channelaftertouch", "all", a);
      expect(WebMidi.inputs[0].hasListener("channelaftertouch", 10, a)).to.equal(false);

      WebMidi.inputs[0].addListener("pitchbend", "all", a);
      WebMidi.inputs[0].removeListener("pitchbend", 10, a);
      expect(WebMidi.inputs[0].hasListener("pitchbend", 10, a)).to.equal(false);
      expect(WebMidi.inputs[0].hasListener("pitchbend", 11, a)).to.equal(true);

      WebMidi.inputs[0].addListener("noteoff", "all", a);
      WebMidi.inputs[0].addListener("noteoff", "all", b);
      WebMidi.inputs[0].removeListener("noteoff");
      expect(WebMidi.inputs[0].hasListener("noteoff", 10, a)).to.equal(false);
      expect(WebMidi.inputs[0].hasListener("noteoff", 11, b)).to.equal(false);

      WebMidi.inputs[0].addListener("keyaftertouch", "all", a);
      WebMidi.inputs[0].addListener("keyaftertouch", "all", b);
      WebMidi.inputs[0].removeListener();
      expect(WebMidi.inputs[0].hasListener("keyaftertouch", 10, a)).to.equal(false);
      expect(WebMidi.inputs[0].hasListener("keyaftertouch", "all", b)).to.equal(false);

      WebMidi.inputs[0].addListener("stop", "all", a);
      WebMidi.inputs[0].addListener("stop", "all", b);
      WebMidi.inputs[0].removeListener("stop");
      expect(WebMidi.inputs[0].hasListener("stop", "all", a)).to.equal(false);
      expect(WebMidi.inputs[0].hasListener("stop", "all", b)).to.equal(false);

    });

  });

  describe("getCcNameByNumber()", function() {

    it("should throw an error when an invalid CC number is provided", function () {

      [-1, 120, function() {}].forEach(function (param) {
        expect(function () {
          WebMidi.inputs[0].getCcNameByNumber(param);
        }).to.throw(RangeError);
      });

    });

    it("should return undefined when there is no defined name for a valid number", function () {
      expect(WebMidi.inputs[0].getCcNameByNumber(3)).to.equal(undefined);
    });

    it("should return correct name", function (done) {

      for (var key in WebMidi.MIDI_CONTROL_CHANGE_MESSAGES) {
        if (WebMidi.MIDI_CONTROL_CHANGE_MESSAGES.hasOwnProperty(key)) {
          expect(
            WebMidi.inputs[0].getCcNameByNumber(WebMidi.MIDI_CONTROL_CHANGE_MESSAGES[key])
          ).to.equal(key);
        }
      }

      done();

    });

  });

  describe("getChannelModeByNumber()", function() {

    it("should throw an error when an invalid channel mode number is provided", function () {

      expect(function () {

        [-1, 0, 119, 128, undefined, null, function() {}].forEach(function (param) {
          WebMidi.inputs[0].getChannelModeByNumber(param);
        });

      }).to.throw(RangeError);

    });

    // it.skip("should return correct channel mode name", function () {

    //   for (var key in WebMidi.MIDI_CHANNEL_MODE_MESSAGES) {
    //     if (WebMidi.MIDI_CHANNEL_MODE_MESSAGES.hasOwnProperty(key)) {
    //       expect(
    //         WebMidi.inputs[0].getChannelModeByNumber(WebMidi.MIDI_CHANNEL_MODE_MESSAGES[key])
    //       ).to.equal(key);
    //     }
    //   }

    // });

  });

});
