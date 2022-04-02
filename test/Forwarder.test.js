const expect = require("chai").expect;
const {Message, WebMidi, Note, Forwarder} = require("../dist/cjs/webmidi.cjs.js");
const WMT = require("web-midi-test");

// The virtual port is an "external" device so an input is seen as an output by WebMidi. To avoid
// confusion, the naming scheme adopts WebMidi's perspective.
let VIRTUAL_OUTPUT_NAME = "Virtual Output";
let VIRTUAL_OUTPUT = new WMT.MidiDst(VIRTUAL_OUTPUT_NAME);
/** @type {import("../dist/cjs/webmidi.cjs.js").Output} */
let WEBMIDI_OUTPUT;

function noop() {}

describe("Forwarder Object", function() {

  before(function () {
    VIRTUAL_OUTPUT.connect();
    // VIRTUAL_OUTPUT.ignoreTypes(false, false, false); // enable sysex, timing & active sensing
  });

  after(function () {
    VIRTUAL_OUTPUT.disconnect();
  });

  beforeEach("Check support and enable WebMidi.js", async function () {
    await WebMidi.enable({sysex: true, requestMIDIAccessFunction: WMT.requestMIDIAccess});
    WEBMIDI_OUTPUT = WebMidi.getOutputByName(VIRTUAL_OUTPUT_NAME);
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  describe("constructor()", function() {

    it("should throw when an invalid destination is specified", function() {

      // Arrange
      const items = [
        "abc",
        123,
        new Note(64),
      ];

      // Act

      // Assert
      items.forEach(item => {
        expect(() => new Forwarder(item)).to.throw(TypeError);
      });

    });

    it("should throw when an invalid type is specified", function() {

      // Arrange
      const types = [
        "abc",
        123,
      ];

      // Act

      // Assert
      types.forEach(type => {
        expect(() => {
          new Forwarder(WEBMIDI_OUTPUT, {types: type});
        }).to.throw(TypeError);
      });

    });

    it("should throw when an invalid channel is specified", function() {

      // Arrange
      const items = [
        0,
        -1,
        17,
      ];

      // Act

      // Assert
      items.forEach(item => {
        expect(() => {
          new Forwarder(WEBMIDI_OUTPUT, {channels: item});
        }).to.throw(TypeError);
      });

    });

  });

  describe("forward()", function() {

    it("should forward the message to the forwarder's destination(s)", function(done) {

      // Arrange
      const data = [0x90, 64, 127];
      const msg = new Message(data);
      const forwarder = new Forwarder(WEBMIDI_OUTPUT);
      VIRTUAL_OUTPUT.receive = assert;

      // Act
      forwarder.forward(msg);

      // Assert
      function assert(message) {
        expect(message).to.have.ordered.members(msg.data);
        VIRTUAL_OUTPUT.receive = noop;
        done();
      }


    });

    it("should not forward messages when 'suspended' is true", function(done) {

      // Arrange
      const data = [0x90, 64, 127];
      const msg = new Message(data);
      const forwarder = new Forwarder(WEBMIDI_OUTPUT);
      forwarder.suspended = true;
      VIRTUAL_OUTPUT.receive = assert;

      // Act
      forwarder.forward(msg);

      const id = setTimeout(() => {
        VIRTUAL_OUTPUT.receive = noop;
        done();
      }, 250);

      // Assert
      function assert(deltaTime, message) {
        VIRTUAL_OUTPUT.receive = noop;
        clearTimeout(id);
        done(new Error("Callback should not have been triggered. " + message));
      }

    });

    it("should not forward message if it does not match channel", function(done) {

      // Arrange
      const msg1 = new Message([0x90, 64, 127]); // note on on ch. 1
      const msg2 = new Message([0x94, 64, 127]); // note on on ch. 5
      const msg3 = new Message([0x9A, 64, 127]); // note on on ch. 11
      const msg4 = new Message([0x9F, 64, 127]); // note on on ch. 16
      const channel = 10;
      const forwarder = new Forwarder(WEBMIDI_OUTPUT, {channels: channel});
      VIRTUAL_OUTPUT.receive = assert;

      // Act
      const id = setTimeout(() => {
        VIRTUAL_OUTPUT.receive = noop;
        done();
      }, 250);

      forwarder.forward(msg1);
      forwarder.forward(msg2);
      forwarder.forward(msg3);
      forwarder.forward(msg4);

      // Assert
      function assert(deltaTime, message) {
        VIRTUAL_OUTPUT.receive = noop;
        clearTimeout(id);
        done(new Error("Callback should not have been triggered. " + message));
      }

    });

    it("should not forward message if it does not match type", function(done) {

      // Arrange
      const target = {name: "pitchbend", number: 0xE0}; // pitchbend
      const messages = [
        0x80,
        0x90,
        0xA0,
        0xB0,
        0xC0,
        0xD0
      ];
      const forwarder = new Forwarder(WEBMIDI_OUTPUT, {types: target.name});
      VIRTUAL_OUTPUT.receive = assert;

      // Act
      const id = setTimeout(() => {
        VIRTUAL_OUTPUT.receive = noop;
        done();
      }, 250);

      messages.forEach(i => {
        forwarder.forward(new Message([i, 64, 127]));
      });

      // Assert
      function assert(deltaTime, message) {
        VIRTUAL_OUTPUT.receive = noop;
        clearTimeout(id);
        done(new Error("Callback should not have been triggered. " + message));
      }

    });

  });

});


