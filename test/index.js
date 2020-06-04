const expect = require("chai").expect;
const {isNative} = require("./support/Utils.cjs.js");
const midi = require("midi");
const sinon = require("sinon");
const {WebMidi, Note} = require("../dist/webmidi.cjs.js");

// Create virtual MIDI input and output ports and make them available globally. Being an external,
// the virtual device's input is seen as an output from WebMidi's perspective (same thing happens
// with the output. To avoid confusion, the property names adopt WebMidi's point of view.
global.config = {
  output: {
    port: new midi.Input(),
    name: "Virtual Output"
  },
  input: {
    port: new midi.Output(),
    name: "Virtual input"
  }
};

// Tell RTMidi to include 'sysex', 'timing' and 'active sensing' messages
config.output.port.ignoreTypes(false, false, false);

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
    config.input.port.openVirtualPort(config.input.name);
    config.output.port.openVirtualPort(config.output.name);
  });

  after(function () {
    config.input.port.closePort();
    config.output.port.closePort();
  });

  // Fetch tests from appropriate files...
  require("./tests/WebMidi.test.js");
  require("./tests/Note.test.js");
  require("./tests/Input.test.js");
  // require("./tests/InputChannel.test.js");
  require("./tests/Output.test.js");
  require("./tests/OutputChannel.test.js");

});
