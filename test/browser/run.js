// Load all tests
import WebMidiTests from "./WebMidi.test.js"
import NoteTests from "./Note.test.js"
import OoutputTests from "./Output.test.js"

describe("WebMidi.js Test Suite", function() {

  WebMidiTests();
  NoteTests();
  // OoutputTests();

});

// Run tests
mocha.checkLeaks();
mocha.run();
