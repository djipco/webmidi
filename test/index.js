const expect = require("chai").expect;
const {isNative} = require("./support/Utils.cjs.js");
const midi = require("midi");
const sinon = require("sinon");
const {WebMidi, Note} = require("../dist/webmidi.cjs.min.js");

// Create virtual MIDI input and output ports and make them available globally.
const inputPort = new midi.Input();
inputPort.ignoreTypes(false, false, false); // include sysex, timing and active sensing
const outputPort = new midi.Output();
global.inputPort = inputPort;
global.outputPort = outputPort;

// Make objects available globally. We do this so we can use the same test files for browser and
// Node.js
global.expect = expect;
global.sinon = sinon;
global.isNative = isNative;
global.WebMidi = WebMidi;
global.Note = Note;

// Start tests...
describe("WebMidi.js Test Suite", function() {

  before(function () {
    inputPort.openVirtualPort("Virtual Input");
    outputPort.openVirtualPort("Virtual Output");
  });

  after(function () {
    inputPort.closePort();
    outputPort.closePort();
  });

  // Fetch tests from appropriate files...
  require("./tests/Environment.test.js");
  require("./tests/WebMidi.test.js");
  require("./tests/Note.test.js");
  require("./tests/Input.test.js");
  require("./tests/Output.test.js");
  // require("./tests/InputChannel.test.js");
  // require("./tests/OutputChannel.test.js");

});
