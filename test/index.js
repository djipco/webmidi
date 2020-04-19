const expect = require('chai').expect;
const {isNative} = require("./support/Utils.cjs.js");
const MT = require("midi-test");
const {WebMidi, Note} = require("../dist/webmidi.cjs.min.js");

// Create virtual MIDI input and output ports using 'midi-test' and make them available globally.
const inputPort = new MT.MidiSrc("VIRTUAL MIDI-In");
global.inputPort = inputPort;
const outputPort = new MT.MidiDst("VIRTUAL MIDI-Out");
global.outputPort = outputPort;
global.outputPort.receive = () => {}; // this is to prevent stdout to the console

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
  require("./tests/Input.test.js");
  // require("./tests/InputChannel.test.js");
  // require("./tests/Output.test.js");
  // require("./tests/OutputChannel.test.js");

});
