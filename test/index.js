const expect = require('chai').expect;
const JZZ = require("jzz");
const MT = require("midi-test");
const {performance} = require('perf_hooks');
const {WebMidi, Note} = require("../dist/webmidi.cjs.min.js");
const {isNative} = require("./support/Utils.js");

// Make library objects available globally
global.WebMidi = WebMidi;
global.Note = Note;

// Make some utility methods available globally
global.expect = expect;
global.isNative = isNative;

// Polyfill the browser's 'performance.now()' and 'navigator.requestMIDIAccess()' methods
global.performance = performance;
global.navigator = JZZ;

// Create virtual MIDI input and output ports using 'midi-test'
const inputPort = new MT.MidiSrc("VIRTUAL MIDI-In");
const outputPort = new MT.MidiDst("VIRTUAL MIDI-Out");

// Start tests...
describe("WebMidi.js Test Suite", function() {

  beforeEach(async function() {
    inputPort.connect();
    outputPort.connect();
  });

  afterEach(async function() {
    inputPort.disconnect();
    outputPort.disconnect();
    navigator.close(); // required by jzz ? doc seems to say so...
  });

  // Fetch tests from appropriate files...
  require("./tests/Environment.test.js");
  require("./tests/WebMidi.test.js");
  require("./tests/Note.test.js");
  // require("./tests/Input.test.js");
  // require("./tests/Output.test.js");

});
