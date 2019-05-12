const assert = require("assert");
const JZZ = require("jzz");
const mt = require("midi-test");
const webmidi = require("../../src/webmidi");

global.navigator = null;
global.performance = null;
let jz = null;

const expectedOutputDriverName = "Virtual MIDI-Out";
const outputPort = mt.MidiDst(expectedOutputDriverName);

const expectedInputDriverName = "Virtual MIDI-In";
const inputPort = mt.MidiSrc(expectedInputDriverName);

describe("WebMIDI Headless Tests", function() {
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
    webmidi.disable();
    inputPort.disconnect();
    outputPort.disconnect();
    global.navigator = null;
    global.performance = null;
    jz = null;
    done();
  });

  it("virtual-midi-in driver was created and found by webmidi", function(done) {
    webmidi.enable((err) => {
      if (err) throw new Error(err);
      const inp = webmidi.getInputByName(expectedInputDriverName);
      assert.equal(inp.name, expectedInputDriverName);
      done();
    });
  });

  it("virtual-midi-out driver was created and found by webmidi", function(done) {
    webmidi.enable((err) => {
      if (err) throw new Error(err);
      const out = webmidi.getOutputByName(expectedOutputDriverName);
      assert.equal(out.name, expectedOutputDriverName);
      out &&
        out.playNote([63], "all", {
          rawVelocity: true,
          velocity: 120
        });
      done();
    });
  });
});
