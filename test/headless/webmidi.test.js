const sinon = require("sinon");
const WebMidi = require("../../src/webmidi");
const JZZ = require("jzz");
const mt = require("midi-test");
const { expect } = require("chai");
const Utils = require("./util.common");

global.navigator = null;
global.performance = null;
let jz = null;

const expectedOutputDriverName = "Virtual MIDI-Out";
const outputPort = mt.MidiDst(expectedOutputDriverName);

const expectedInputDriverName = "Virtual MIDI-In";
const inputPort = mt.MidiSrc(expectedInputDriverName);

describe("WebMidi", function() {
  beforeEach(function(done) {
    global.navigator = {
      requestMIDIAccess: JZZ.requestMIDIAccess
    };
    global.performance = {
      now: (e) => e
    };
    jz = JZZ;
    outputPort.connect();
    inputPort.connect();
    done();
  });

  afterEach(function(done) {
    WebMidi.disable();
    inputPort.disconnect();
    outputPort.disconnect();
    global.navigator = null;
    global.performance = null;
    jz = null;
    done();
  });

  it("should not allow direct user instantiation", function() {
    expect(function() {
      new WebMidi.constructor();
    }).to.throw(Error);
  });

  it("should adapt to Electron, NW.js or pure Node.js environments", (done) => done());

  it('should dispatch "connected" even upon device connection');

  it('should dispatch "disconnected" even upon device disconnection');

  it("should be accessible in the global window scope (if running in a browser)", function() {
    if (typeof window === "object") {
      expect(WebMidi).to.be.instanceOf(WebMidi.constructor);
    }
  });

  describe("addListener()", function() {
    beforeEach("Enable WebMidi.js", function(done) {
      WebMidi.disable();
      WebMidi.enable(function() {
        done();
      });
    });

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();

      expect(function() {
        WebMidi.addListener("disconnected", function() {});
      }).to.throw(Error);
    });

    it("should throw error if event type is not supported", function() {
      ["", undefined, null, {}, "abc", function() {}].forEach(function(param) {
        expect(function() {
          WebMidi.addListener(param, function() {});
        }).to.throw(TypeError);
      });
    });

    it("should throw error if listener is not a function", function() {
      ["", undefined, null, {}, "abc"].forEach(function(param) {
        expect(function() {
          WebMidi.addListener("statechange", param);
        }).to.throw(TypeError);
      });
    });

    it("should actually add the listener", function() {
      function f() {}
      WebMidi.addListener("connected", f);
      expect(WebMidi.hasListener("connected", f)).to.equal(true);
    });
  });

  describe("disable()", function() {
    beforeEach("Enable WebMidi.js", function() {
      WebMidi.disable();
    });

    it("should set the enabled property to false", function() {
      expect(WebMidi.enabled).to.equal(false);
    });

    it("should set the sysexEnabled property to false", function() {
      expect(WebMidi.sysexEnabled).to.equal(false);
    });

    it("should trim input and output array lengths to 0", function() {
      expect(WebMidi.inputs.length).to.equal(0);
      expect(WebMidi.outputs.length).to.equal(0);
    });

    it("should remove all user handlers", function() {
      for (var i = 0; i < WebMidi._midiInterfaceEvents.length; i++) {
        expect(WebMidi._userHandlers[WebMidi._midiInterfaceEvents[i]].length).to.equal(0);
      }
    });

    it("should throw error if Web MIDI API is not supported", (done) => done());

    // it("should throw error if Web MIDI API is not supported", match(function() {
    //
    // }));
  });

  describe("enable()", function() {
    beforeEach("Make sure WebMidi is not already enabled.", function() {
      WebMidi.disable();
    });

    it("should pass error to callback if Web MIDI API not supported", function(done) {
      if (navigator && navigator.requestMIDIAccess) {
        var rma = sinon.stub(navigator, "requestMIDIAccess");
        rma.returns(Promise.reject(new Error("Simulated failure!")));
      }

      WebMidi.enable(function(err) {
        expect(err).to.be.instanceof(Error);
        done();
      });
    });

    it("should set 'enabled' property to false if it fails", function(done) {
      if (navigator && navigator.requestMIDIAccess) {
        const spys = sinon.stub(navigator, "requestMIDIAccess");
        spys.returns(Promise.reject(new Error("Simulated failure!")));
      }
      WebMidi.enable(function() {
        expect(WebMidi.enabled).to.equal(false);
        done();
      });
    });

    it("should set the enabled property to true if successful", function(done) {
      WebMidi.enable(function(err) {
        if (err) {
          // This could happen if WebMIDIAPIShim is there but not the Jazz-Plugin
          expect(WebMidi.enabled).to.equal(false);
        } else {
          expect(WebMidi.enabled).to.equal(true);
        }

        done();
      });
    });

    it("should execute the callback", function(done) {
      WebMidi.enable(function() {
        done();
      });
    });

    it("should enable sysex only if requested (for browsers with native MIDI)", function(done) {
      WebMidi.enable(function(err) {
        if (err) {
          expect(false, true);
        }

        if (Utils.isNative(navigator.requestMIDIAccess)) {
          expect(WebMidi.sysexEnabled).to.equal(true);
          done();
        } else {
          expect(WebMidi.sysexEnabled).to.be.oneOf([true, false]);
          done();
        }
      }, true);
    });

    it("should not enable sysex unless requested (for browsers with native MIDI)", function(done) {
      WebMidi.enable(function() {
        if (Utils.isNative(navigator.requestMIDIAccess)) {
          expect(WebMidi.sysexEnabled).to.equal(false);
        } else {
          expect(WebMidi.sysexEnabled).to.be.oneOf([true, false]);
        }

        done();
      }, false);
    });

    it("should create as many inputs and outputs as are available on the host", (done) => done());
  });

  describe("getInputById()", function() {
    beforeEach("Enable WebMidi.js", function(done) {
      WebMidi.disable();
      WebMidi.enable(function() {
        done();
      });
    });

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();
      expect(function() {
        WebMidi.getInputById();
      }).to.throw(Error);
    });

    it("should return false if no device is found", function() {
      expect(WebMidi.getInputById("0000000")).to.equal(false);
    });

    it("should return the right input", function() {
      if (WebMidi.inputs.length > 0) {
        var id = WebMidi.inputs[0].id;
        expect(WebMidi.getInputById(id)).to.equal(WebMidi.inputs[0]);
      } else {
        this.skip();
      }
    });

    it("should return instance of Input", function() {
      if (WebMidi.inputs.length > 0) {
        expect(WebMidi.getInputById(WebMidi.inputs[0].id)).to.be.instanceOf(
          WebMidi.inputs[0].constructor
        );
      } else {
        this.skip();
      }
    });
  });

  describe("getInputByName()", function() {
    beforeEach("Enable WebMidi.js", function(done) {
      WebMidi.disable();
      WebMidi.enable(function() {
        done();
      });
    });

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();
      expect(function() {
        WebMidi.getInputByName();
      }).to.throw(Error);
    });

    it("should return false if no device is found", function() {
      expect(WebMidi.getInputByName("0000000")).to.equal(false);
    });

    it("should return the right input", function() {
      if (WebMidi.inputs.length > 0) {
        var name = WebMidi.inputs[0].name;
        expect(WebMidi.getInputByName(name).name).to.equal(WebMidi.inputs[0].name);
      } else {
        this.skip();
      }
    });

    it("should return instance of Output", function() {
      if (WebMidi.inputs.length > 0) {
        expect(
          WebMidi.getInputByName(WebMidi.inputs[WebMidi.inputs.length - 1].name)
        ).to.be.instanceOf(WebMidi.inputs[WebMidi.inputs.length - 1].constructor);
      } else {
        this.skip();
      }
    });
  });

  describe("getOctave()", function() {
    beforeEach("Enable WebMidi.js", function() {
      WebMidi.disable();
    });

    it("should return undefined if number is invalid", function() {
      ["abc", null, undefined, -1, 128, function() {}, {}, "555"].forEach(function(param) {
        expect(WebMidi.getOctave(param)).to.equal(undefined);
      });
    });

    it("should return an signed integer", function() {
      for (var i = 0; i <= 127; i++) {
        var result = WebMidi.getOctave(i);
        expect(result % 1).to.be.equal(0);
      }
    });

    it("should place MIDI note number 60 (C4/middle C) at octave 4", function() {
      expect(WebMidi.getOctave(60)).to.be.equal(4);
    });

    it("should take into account desired octaveOffset value", function() {
      WebMidi.octaveOffset = 2;
      expect(WebMidi.getOctave(60)).to.be.equal(6);
      WebMidi.octaveOffset = -4;
      expect(WebMidi.getOctave(60)).to.be.equal(0);
      WebMidi.octaveOffset = -11;
      expect(WebMidi.getOctave(60)).to.be.equal(-7);
      WebMidi.octaveOffset = 0;
    });
  });

  describe("getOutputById()", function() {
    // beforeEach('Make sure WebMidi is not already enabled.', function() {
    //   WebMidi.disable();
    // });

    beforeEach("Enable WebMidi.js", function(done) {
      WebMidi.disable();
      WebMidi.enable(function() {
        done();
      });
    });

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();
      expect(function() {
        WebMidi.getOutputById();
      }).to.throw(Error);
    });

    it("should return false if no device is found", function() {
      expect(WebMidi.getOutputById("0000000")).to.equal(false);
    });

    it("should return the right output id", function() {
      if (WebMidi.outputs.length > 0) {
        var id = WebMidi.outputs[0].id;
        expect(WebMidi.getOutputById(id)).to.equal(WebMidi.outputs[0]);
      } else {
        this.skip();
      }
    });

    it("should return instance of Output", function() {
      if (WebMidi.outputs.length > 0) {
        expect(WebMidi.getOutputById(WebMidi.outputs[0].id)).to.be.instanceOf(
          WebMidi.outputs[0].constructor
        );
      } else {
        this.skip();
      }
    });
  });

  describe("getOutputByName()", function() {
    beforeEach("Enable WebMidi.js", function(done) {
      WebMidi.disable();
      WebMidi.enable(function() {
        done();
      });
    });

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();
      expect(function() {
        WebMidi.getOutputByName();
      }).to.throw(Error);
    });

    it("should return false if no device is found", function() {
      expect(WebMidi.getOutputByName("0000000")).to.equal(false);
    });

    it("should return the right output", function() {
      if (WebMidi.outputs.length > 0) {
        var name = WebMidi.outputs[0].name;
        expect(WebMidi.getOutputByName(name).name).to.equal(WebMidi.outputs[0].name);
      } else {
        this.skip();
      }
    });

    it("should return instance of Output", function() {
      if (WebMidi.outputs.length > 0) {
        expect(
          WebMidi.getOutputByName(WebMidi.outputs[WebMidi.outputs.length - 1].name)
        ).to.be.instanceOf(WebMidi.outputs[WebMidi.outputs.length - 1].constructor);
      } else {
        this.skip();
      }
    });
  });

  describe("guessNoteNumber()", function() {
    it("should throw error if invalid input is provided", function() {
      ["abc", null, undefined, -1, 128, function() {}, {}, "555", "H3", "Z#8"].forEach(function(
        param
      ) {
        expect(function() {
          WebMidi.guessNoteNumber(param);
        }).to.throw(Error);
      });
    });

    it("should provide the correct value for numerical values", function() {
      for (var i = 0; i <= 127; i++) {
        expect(WebMidi.guessNoteNumber(i)).to.equal(i);
        expect(WebMidi.guessNoteNumber(i + "")).to.equal(i);
        expect(WebMidi.guessNoteNumber(i + 0.1)).to.equal(i);
        expect(WebMidi.guessNoteNumber(i + 0.5)).to.equal(Math.min(i + 1, 127));
      }
    });

    it("should provide the correct value for note names with varying octave offsets", function() {
      var value = 0;
      // var offset = 2;

      [-20, -15, -9, 0, 7, 13, 20].forEach(function(offset) {
        WebMidi.octaveOffset = offset;

        // Sharps
        for (var octave = -1 + offset; octave <= 9 + offset; octave++) {
          for (var k = 0; k < WebMidi._notes.length; k++) {
            if (value > 127) break;
            expect(WebMidi.guessNoteNumber(WebMidi._notes[k] + octave)).to.equal(value);
            value++;
          }
        }

        // Flats
        var flats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
        value = 0;

        for (octave = -1 + offset; octave <= 9 + offset; octave++) {
          for (k = 0; k < flats.length; k++) {
            if (value > 127) break;
            expect(WebMidi.guessNoteNumber(flats[k] + octave)).to.equal(value);
            value++;
          }
        }
      });

      WebMidi.octaveOffset = 0;
    });

    it("should throw error if note is outside range given the current octave offset", function() {
      WebMidi.octaveOffset = 0;

      expect(function() {
        WebMidi.guessNoteNumber("C-2");
        WebMidi.guessNoteNumber("G#9");
        WebMidi.guessNoteNumber("C10");
      }).to.throw(Error);

      WebMidi.octaveOffset = -1;

      expect(function() {
        WebMidi.guessNoteNumber("C-3");
        WebMidi.guessNoteNumber("G#8");
        WebMidi.guessNoteNumber("C9");
      }).to.throw(Error);

      WebMidi.octaveOffset = 0;
    });
  });

  describe("hasListener()", function() {
    beforeEach("Enable WebMidi.js", function(done) {
      WebMidi.disable();
      WebMidi.enable(function() {
        done();
      });
    });

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();
      expect(function() {
        WebMidi.hasListener("abc", function() {});
      }).to.throw(Error);
    });

    it("should throw error if event type is not supported", function() {
      expect(function() {
        WebMidi.hasListener("abc", undefined);
      }).to.throw(TypeError);
    });

    it("should throw error if listener is not a function", function() {
      expect(function() {
        WebMidi.hasListener("connected", undefined);
      }).to.throw(TypeError);
    });

    it("should report true if listener is present", function() {
      function f() {}
      WebMidi.addListener("connected", function() {});
      WebMidi.addListener("connected", f);
      WebMidi.addListener("connected", function() {});
      expect(WebMidi.hasListener("connected", f)).to.equal(true);
    });

    it("should report false if listener is not present", function() {
      WebMidi.addListener("connected", function() {});
      expect(WebMidi.hasListener("connected", function() {})).to.equal(false);
    });
  });

  describe("noteNameToNumber()", function() {
    it("should throw error if invalid input is provided", function() {
      [
        "",
        "abc",
        null,
        undefined,
        "G#9",
        "Cb-1",
        "X2",
        function() {},
        {},
        "555",
        "C-3",
        "Cbb-1/",
        "H3",
        "G##9"
      ].forEach(function(param) {
        expect(function() {
          WebMidi.noteNameToNumber(param);
        }).to.throw(RangeError);
      });
    });
  });

  describe("removeListener()", function() {
    beforeEach("Enable WebMidi.js", function(done) {
      WebMidi.disable();
      WebMidi.enable(function() {
        done();
      });
    });

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();
      expect(function() {
        WebMidi.removeListener("abc", function() {});
      }).to.throw(Error);
    });

    it("should throw error if event type is defined but not supported", function() {
      expect(function() {
        WebMidi.removeListener("abc", function() {});
      }).to.throw(TypeError);
    });

    it("should throw error if listener is defined but not a function", function() {
      expect(function() {
        WebMidi.removeListener("connected", "abc");
      }).to.throw(TypeError);
    });

    it("should actually remove the listener", function() {
      function f() {}
      WebMidi.addListener("connected", f);
      WebMidi.removeListener("connected", f);
      expect(WebMidi.hasListener("connected", f)).to.equal(false);
    });

    it("should remove all listeners of the type when no listener is specified", function() {
      function a() {}
      function b() {}
      function c() {}
      WebMidi.addListener("connected", a);
      WebMidi.addListener("connected", b);
      WebMidi.addListener("connected", c);
      WebMidi.removeListener("connected");
      expect(WebMidi.hasListener("connected", a)).to.equal(false);
      expect(WebMidi.hasListener("connected", b)).to.equal(false);
      expect(WebMidi.hasListener("connected", c)).to.equal(false);
    });

    it("should remove all listeners when no type and no listener is specified", function() {
      function a() {}
      function b() {}
      function c() {}
      WebMidi.addListener("connected", a);
      WebMidi.addListener("connected", b);
      WebMidi.addListener("connected", c);
      WebMidi.removeListener();
      expect(WebMidi.hasListener("connected", a)).to.equal(false);
      expect(WebMidi.hasListener("connected", b)).to.equal(false);
      expect(WebMidi.hasListener("connected", c)).to.equal(false);
    });
  });

  describe("toMIDIChannels()", function() {
    it("should return only valid MIDI channel numbers", function() {
      // Valid values are 1, 8 and 16
      var channels = [
        1,
        -1,
        -2.3,
        0,
        17,
        "x",
        NaN,
        null,
        Infinity,
        8,
        -Infinity,
        {},
        true,
        false,
        [undefined],
        4e2,
        16
      ];
      expect(WebMidi.toMIDIChannels(channels).length).to.equal(3);
      expect(WebMidi.toMIDIChannels([]).length).to.equal(0);
      expect(WebMidi.toMIDIChannels([9.7])[0]).to.equal(9);
      expect(WebMidi.toMIDIChannels([1e1])[0]).to.equal(10);
      expect(WebMidi.toMIDIChannels("none").length).to.equal(0);
    });

    it("should return all channels when 'all' or undefined is specified", function() {
      expect(WebMidi.toMIDIChannels("all").length).to.equal(16);
      expect(WebMidi.toMIDIChannels().length).to.equal(16);
    });
  });
});
