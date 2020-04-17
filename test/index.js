const expect = require('chai').expect;
const {isNative} = require("./support/Utils.js");
const MT = require("midi-test");
const {WebMidi, Note} = require("../dist/webmidi.cjs.min.js");

// Create virtual MIDI input and output ports using 'midi-test' and make them available globally.
const inputPort = new MT.MidiSrc("VIRTUAL MIDI-In");
const outputPort = new MT.MidiDst("VIRTUAL MIDI-Out");
global.inputPort = inputPort;
global.outputPort = outputPort;

// Make objects available globally. We do this so we can use the same test files for browser and
// Node.js
global.expect = expect;
global.isNative = isNative;
global.WebMidi = WebMidi;
global.Note = Note;

// Start tests...
describe("WebMidi.js Test Suite", function() {

  beforeEach(async function() {
    inputPort.connect();
    outputPort.connect();
  });

  afterEach(async function() {
    inputPort.disconnect();
    outputPort.disconnect();
  });

  // Fetch tests from appropriate files...
  require("./tests/Environment.test.js");
  require("./tests/WebMidi.test.js");
  require("./tests/Note.test.js");
  // require("./tests/Input.test.js");
  // require("./tests/Output.test.js");

});
