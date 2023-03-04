const expect = require("chai").expect;
const midi = require("midi");
const sinon = require("sinon");
const {WebMidi, Note, Utilities, Message, Enumerations} = require("../dist/cjs/webmidi.cjs.js");

// The virtual port is an "external" device so an input is seen as an output by WebMidi. To avoid
// confusion, the naming scheme adopts WebMidi's perspective.
let VIRTUAL_OUTPUT = new midi.Input();
let VIRTUAL_OUTPUT_NAME = "Virtual Output";
let WEBMIDI_OUTPUT;

/**
 * Caution: the tests below are executed against the "development" version of the library. The
 * development version, throws more errors than the production version for performance reasons.
 */

describe("OutputChannel Object", function() {

  before(function () {
    VIRTUAL_OUTPUT.openVirtualPort(VIRTUAL_OUTPUT_NAME);
    VIRTUAL_OUTPUT.ignoreTypes(false, false, false); // enable sysex, timing & active sensing
  });

  after(function () {
    VIRTUAL_OUTPUT.closePort();
  });

  beforeEach("Check support and enable", async function () {
    await WebMidi.enable();
    WEBMIDI_OUTPUT = WebMidi.getOutputByName(VIRTUAL_OUTPUT_NAME);
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  describe("sendRpnDecrement()", function () {

    it("should throw error if parameter, specified by name, is invalid", function () {

      // Arrange
      let invalid = ["xxx", undefined, null, ""];

      // Act
      invalid.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendRpnDecrement(value);
        }).to.throw(TypeError);
      }

    });

    it("should throw error if parameter, specified by array, is invalid", function () {

      // Arrange
      let values = [
        [],
        [-1, -1],
        [0x3d, 1111],
        undefined,
        null
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendRpnDecrement(value);
        }).to.throw();
      };

    });

    it("should send correct MIDI messages for all valid named parameters", function(done) {

      // Arrange
      let index = 0;

      let parameters = [
        {name: "pitchbendrange", value: [0x00, 0x00]},
        {name: "channelfinetuning", value: [0x00, 0x01]},
        {name: "channelcoarsetuning", value: [0x00, 0x02]},
        {name: "tuningprogram", value: [0x00, 0x03]},
        {name: "tuningbank", value: [0x00, 0x04]},
        {name: "modulationrange", value: [0x00, 0x05]},
        {name: "azimuthangle", value: [0x3D, 0x00]},
        {name: "elevationangle", value: [0x3D, 0x01]},
        {name: "gain", value: [0x3D, 0x02]},
        {name: "distanceratio", value: [0x3D, 0x03]},
        {name: "maximumdistance", value: [0x3D, 0x04]},
        {name: "maximumdistancegain", value: [0x3D, 0x05]},
        {name: "referencedistanceratio", value: [0x3D, 0x06]},
        {name: "panspreadangle", value: [0x3D, 0x07]},
        {name: "rollangle", value: [0x3D, 0x08]},
      ];

      let expected = [];

      parameters.forEach(param => {
        expected.push([176, 101, param.value[0]]);  // select rpn
        expected.push([176, 100, param.value[1]]);  // select rpn
        expected.push([176, 97, 0]);                // decrement
        expected.push([176, 101, 127]);             // deselect rpn
        expected.push([176, 100, 127]);             // deselect rpn
      });

      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      parameters.forEach(param => {
        WEBMIDI_OUTPUT.channels[1].sendRpnDecrement(param.name);
      });

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send correct MIDI messages for all valid array parameters", function(done) {

      // Arrange
      let index = 0;

      let parameters = [
        {name: "pitchbendrange", value: [0x00, 0x00]},
        {name: "channelfinetuning", value: [0x00, 0x01]},
        {name: "channelcoarsetuning", value: [0x00, 0x02]},
        {name: "tuningprogram", value: [0x00, 0x03]},
        {name: "tuningbank", value: [0x00, 0x04]},
        {name: "modulationrange", value: [0x00, 0x05]},
        {name: "azimuthangle", value: [0x3D, 0x00]},
        {name: "elevationangle", value: [0x3D, 0x01]},
        {name: "gain", value: [0x3D, 0x02]},
        {name: "distanceratio", value: [0x3D, 0x03]},
        {name: "maximumdistance", value: [0x3D, 0x04]},
        {name: "maximumdistancegain", value: [0x3D, 0x05]},
        {name: "referencedistanceratio", value: [0x3D, 0x06]},
        {name: "panspreadangle", value: [0x3D, 0x07]},
        {name: "rollangle", value: [0x3D, 0x08]},
      ];

      let expected = [];

      parameters.forEach(param => {
        expected.push([176, 101, param.value[0]]);  // select rpn
        expected.push([176, 100, param.value[1]]);  // select rpn
        expected.push([176, 97, 0]);                // decrement
        expected.push([176, 101, 127]);             // deselect rpn
        expected.push([176, 100, 127]);             // deselect rpn
      });

      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      parameters.forEach(param => {
        WEBMIDI_OUTPUT.channels[1].sendRpnDecrement(param.value);
      });

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should properly call '_selectRegisteredParameter()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "_selectRegisteredParameter");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnDecrement("pitchbendrange", options);

      // Assert
      expect(
        spy.calledOnceWithExactly(
          Enumerations.REGISTERED_PARAMETERS["pitchbendrange"],
          options
        )
      ).to.be.true;

    });

    it("should properly call 'sendControlChange()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendControlChange");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnDecrement("pitchbendrange", options);

      // Assert
      expect(
        spy.calledWithExactly(0x61, 0, options)
      ).to.be.true;

    });

    it("should properly call '_deselectRegisteredParameter()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "_deselectRegisteredParameter");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnDecrement("pitchbendrange", options);

      // Assert
      expect(
        spy.calledOnceWithExactly(options)
      ).to.be.true;

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendRpnDecrement("pitchbendrange")
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("destroy()", function () {

    it("should set output and channel number to null", function () {

      // Act
      WEBMIDI_OUTPUT.channels[1].destroy();

      // Assert
      expect(WEBMIDI_OUTPUT.channels[1].output).to.be.null;
      expect(WEBMIDI_OUTPUT.channels[1].number).to.be.null;

    });

    it("should remove all listeners", function () {

      // Arrange
      WEBMIDI_OUTPUT.channels[1].addListener("test", () => {});

      // Act
      WEBMIDI_OUTPUT.channels[1].destroy();

      // Assert
      expect(WEBMIDI_OUTPUT.channels[1].hasListener()).to.be.false;

    });

  });

  describe("sendRpnIncrement()", function () {

    it("should throw error if registered parameter, specified by name, is invalid", function () {

      // Arrange
      let values = ["xxx", undefined, null, ""];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendRpnIncrement(value);
        }).to.throw(TypeError);
      }

    });

    it("should throw error if registered parameter, specified by array, is invalid", function () {

      // Arrange
      let values = [
        [],
        [-1, -1],
        [0x3d, 1111]
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendRpnIncrement(value);
        }).to.throw();
      };

    });

    it("should send correct MIDI messages for all valid named parameters", function(done) {

      // Arrange
      let index = 0;

      let parameters = [
        {name: "pitchbendrange", value: [0x00, 0x00]},
        {name: "channelfinetuning", value: [0x00, 0x01]},
        {name: "channelcoarsetuning", value: [0x00, 0x02]},
        {name: "tuningprogram", value: [0x00, 0x03]},
        {name: "tuningbank", value: [0x00, 0x04]},
        {name: "modulationrange", value: [0x00, 0x05]},
        {name: "azimuthangle", value: [0x3D, 0x00]},
        {name: "elevationangle", value: [0x3D, 0x01]},
        {name: "gain", value: [0x3D, 0x02]},
        {name: "distanceratio", value: [0x3D, 0x03]},
        {name: "maximumdistance", value: [0x3D, 0x04]},
        {name: "maximumdistancegain", value: [0x3D, 0x05]},
        {name: "referencedistanceratio", value: [0x3D, 0x06]},
        {name: "panspreadangle", value: [0x3D, 0x07]},
        {name: "rollangle", value: [0x3D, 0x08]},
      ];

      let expected = [];

      parameters.forEach(param => {
        expected.push([176, 101, param.value[0]]);  // select rpn
        expected.push([176, 100, param.value[1]]);  // select rpn
        expected.push([176, 96, 0]);                // increment
        expected.push([176, 101, 127]);             // deselect rpn
        expected.push([176, 100, 127]);             // deselect rpn
      });

      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      parameters.forEach(param => {
        WEBMIDI_OUTPUT.channels[1].sendRpnIncrement(param.name);
      });

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send correct MIDI messages for all valid array parameters", function(done) {

      // Arrange
      let index = 0;

      let parameters = [
        {name: "pitchbendrange", value: [0x00, 0x00]},
        {name: "channelfinetuning", value: [0x00, 0x01]},
        {name: "channelcoarsetuning", value: [0x00, 0x02]},
        {name: "tuningprogram", value: [0x00, 0x03]},
        {name: "tuningbank", value: [0x00, 0x04]},
        {name: "modulationrange", value: [0x00, 0x05]},
        {name: "azimuthangle", value: [0x3D, 0x00]},
        {name: "elevationangle", value: [0x3D, 0x01]},
        {name: "gain", value: [0x3D, 0x02]},
        {name: "distanceratio", value: [0x3D, 0x03]},
        {name: "maximumdistance", value: [0x3D, 0x04]},
        {name: "maximumdistancegain", value: [0x3D, 0x05]},
        {name: "referencedistanceratio", value: [0x3D, 0x06]},
        {name: "panspreadangle", value: [0x3D, 0x07]},
        {name: "rollangle", value: [0x3D, 0x08]},
      ];

      let expected = [];

      parameters.forEach(param => {
        expected.push([176, 101, param.value[0]]);  // select rpn
        expected.push([176, 100, param.value[1]]);  // select rpn
        expected.push([176, 96, 0]);                // increment
        expected.push([176, 101, 127]);             // deselect rpn
        expected.push([176, 100, 127]);             // deselect rpn
      });

      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      parameters.forEach(param => {
        WEBMIDI_OUTPUT.channels[1].sendRpnIncrement(param.value);
      });

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should properly call '_selectRegisteredParameter()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "_selectRegisteredParameter");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnIncrement("pitchbendrange", options);

      // Assert
      expect(
        spy.calledOnceWithExactly(
          Enumerations.REGISTERED_PARAMETERS["pitchbendrange"],
          options
        )
      ).to.be.true;

    });

    it("should properly call 'sendControlChange()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendControlChange");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnIncrement("pitchbendrange", options);

      // Assert
      expect(
        spy.calledWithExactly(0x60, 0, options)
      ).to.be.true;

    });

    it("should properly call '_deselectRegisteredParameter()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "_deselectRegisteredParameter");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnIncrement("pitchbendrange", options);

      // Assert
      expect(
        spy.calledOnceWithExactly(options)
      ).to.be.true;

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendRpnIncrement("pitchbendrange")
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("playNote()", function () {

    it("should call 'sendNoteOn()' with correct parameters", function () {

      // Arrange
      let note = "G5";
      let options = {time: 10, attack: 0.5, rawAttack: 127};
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendNoteOn");

      // Act
      WEBMIDI_OUTPUT.channels[1].playNote(note, options);

      // Assert
      expect(spy.calledOnceWith(note)).to.be.true;
      expect(spy.args[0][0]).to.equal(note);
      expect(spy.args[0][1].time).to.equal(options.time);
      expect(spy.args[0][1].attack).to.equal(options.attack);
      expect(spy.args[0][1].rawAttack).to.equal(options.rawAttack);

    });

    it("should call 'sendNoteOff()' with correct parameters if duration is valid", function () {

      // Arrange
      let note = "G5";
      let options = {time: 10, duration: 20, release: 0.5, rawRelease: 127};
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendNoteOff");

      // Act
      WEBMIDI_OUTPUT.channels[1].playNote(note, options);

      // Assert
      expect(spy.calledOnceWith(note)).to.be.true;
      expect(spy.args[0][0]).to.equal(note);
      expect(spy.args[0][1].time).to.equal(options.time + options.duration);
      expect(spy.args[0][1].release).to.equal(options.release);
      expect(spy.args[0][1].rawRelease).to.equal(options.rawRelease);

    });

    it("shouldn't call 'sendNoteOff()' if duration is invalid", function () {

      // Arrange
      let values = [0, undefined, null, "", NaN, Infinity, -Infinity, -1];
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendNoteOff");

      // Act
      values.forEach(value => {
        WEBMIDI_OUTPUT.channels[1].playNote("C3", {duration: value});
      });

      // Assert
      expect(spy.callCount).to.equal(0);

    });

    it("should call 'sendNoteOn()' with correct parameters if passed a Note", function () {

      // Arrange
      let note = new Note("C4", { duration: 250, attack: 0.5, rawAttack: 127 });
      let options = { time: 10 };
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendNoteOff");

      // Act
      WEBMIDI_OUTPUT.channels[1].playNote(note, options);

      // Assert
      expect(spy.calledOnceWith(note)).to.be.true;
      expect(spy.args[0][0]).to.equal(note);
      expect(spy.args[0][0].attack).to.equal(note.attack);
      expect(spy.args[0][0].rawAttack).to.equal(note.rawAttack);
      expect(spy.args[0][1].time).to.equal(options.time + note.duration);
    });

    it("should call 'sendNoteOff()' for each note if parameter is Note[]", function () {

      // Arrange
      let note = new Note("C4", { duration: 250 });
      let notes = [
        note,
        new Note("D#2", { duration: 500 }),
        new Note("F3", { duration: 250 })
      ];

      let options = {};
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendNoteOff");

      // // Act
      WEBMIDI_OUTPUT.channels[1].playNote(notes, options);

      // // Assert
      expect(spy.callCount).to.equal(3);
      expect(spy.args[0][0]).to.equal(note);
      // Hard to get exact timing values, assert in future
      expect(spy.args[0][1].time).to.greaterThan(WebMidi.time);
      expect(spy.args[0][1].release).to.equal(note.release);
      expect(spy.args[0][1].rawRelease).to.equal(note.rawRelease);
    });


    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].playNote("C3")
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

    it("should properly send note off according to specified relative time", function (done) {

      // Arrange
      let note = 64;
      let channel = 1;
      let expected = [128, note, 64]; // 128 = note off on ch 1
      let delay = 100;
      let timestamp = "+" + delay;
      let duration = 100;
      let sent = WebMidi.time;

      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[channel].playNote(note, {time: timestamp, duration: duration});


      // Assert
      function assert(deltaTime, message) {

        if (JSON.stringify(message) == JSON.stringify(expected)) {
          expect(WebMidi.time - sent - delay - duration).to.be.within(-5, 10);
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should properly send note off according to specified absolute time", function (done) {

      // Arrange
      let note = 64;
      let channel = 1;
      let expected = [128, note, 64]; // 128 = note off on ch 1
      let delay = 100;
      let timestamp = WebMidi.time + delay;
      let duration = 100;

      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[channel].playNote(note, {time: timestamp, duration: duration});


      // Assert
      function assert(deltaTime, message) {

        if (JSON.stringify(message) == JSON.stringify(expected)) {
          expect(WebMidi.time - timestamp - duration).to.be.within(-5, 10);
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should properly send note off when no time is specified", function (done) {

      // Arrange
      let note = 64;
      let channel = 1;
      let expected = [128, note, 64]; // 128 = note off on ch 1
      let duration = 100;
      let sent = WebMidi.time;

      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[channel].playNote(note, {duration: duration});


      // Assert
      function assert(deltaTime, message) {

        if (JSON.stringify(message) == JSON.stringify(expected)) {
          expect(WebMidi.time - sent - duration).to.be.within(-5, 15);
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should call 'sendNoteOff()' if duration in Note object is valid", function (done) {

      // Arrange
      let note = new Note("C4", { duration: 250 });
      let channel = WEBMIDI_OUTPUT.channels[1];
      let expected = [128, note.number, 64]; // 128 = note off on ch 1
      let sent = WebMidi.time;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      channel.playNote(note);

      // Assert
      function assert(deltaTime, message) {

        if (JSON.stringify(message) == JSON.stringify(expected)) {
          expect(WebMidi.time - sent - note.duration).to.be.within(-5, 10);
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

  });

  describe("sendResetAllControllers()", function () {

    it("should properly call 'sendChannelMode()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendChannelMode");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendResetAllControllers(options);

      // Assert
      expect(spy.calledOnceWithExactly("resetallcontrollers", 0, options)).to.be.true;

    });

    it("should send correct MIDI message", function(done) {

      // Arrange
      let expected = [176, 121, 0];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendResetAllControllers();

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendResetAllControllers()
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("send()", function () {

    it("should throw error when invalid status is provided", function () {

      // Arrange
      const uint8Array1 = new Uint8Array(1);
      uint8Array1[0] = 127;
      const uint8Array2 = new Uint8Array(1);
      uint8Array2[0] = 0;

      let messages = [
        ["xxx"],
        [NaN],
        [127],
        [256],
        [undefined],
        [null],
        [-1],
        [0],
        [{}],
        uint8Array1,
        uint8Array2
      ];

      // Act
      messages.forEach(assert);

      // Assert
      function assert(value){
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].send(value);
        }).to.throw(RangeError);
      };

    });

    it("should throw error when invalid data is provided", function () {

      // Arrange
      let messages = [
        [0x90, "xxx"],
        [0x90, -1],
        [0x90, 256],
        [0x90, NaN],
        [0x90, null],
        [0x90, Infinity]
      ];

      // Act
      messages.forEach(assert);

      // Assert
      function assert(value){
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].send(value);
        }).to.throw(RangeError);
      };

    });

    it("should actually send MIDI message specified by array", function (done) {

      // Arrange
      let message = [0x90, 60, 127]; // Note on: channel 0 (144), note number (60), velocity (127)
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].send(message);

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(message);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    // We cannot test sending with Uint8Array because it is not supported in Node.js
    it("should actually send MIDI message specified by Uint8Array");

    it("should actually send MIDI message specified by Message object", function (done) {

      // Arrange
      let data = Uint8Array.from([0x90, 60, 127]); // Note on: ch 0, number (60), velocity (127)
      const message = new Message(data);
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].send(message);

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(message);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should throw error if message is incomplete", function() {

      // Arrange
      const uint8Array = new Uint8Array(1);
      uint8Array[0] = 0x90;

      let messages = [
        [0x90],
        uint8Array
      ];

      // Act
      messages.forEach(assert);

      // Assert
      function assert(value){
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].send(value);
        }).to.throw(TypeError);
      };

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].send([144, 127, 127])
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

    it("should send immediately if no valid timestamp is found", function (done) {

      // Arrange
      let data = [144, 13, 0];
      let sent = WebMidi.time;
      let timestamps = [
        {time: -1},
        {time: -Infinity},
        {time: undefined},
        {time: null},
        {time: NaN},
        {}
      ];
      let index = 0;

      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      timestamps.forEach(
        stamp => WEBMIDI_OUTPUT.channels[1].send(data, stamp)
      );

      // Assert
      function assert(deltaTime, message) {

        if (JSON.stringify(message) == JSON.stringify(data)) {

          expect(WebMidi.time - sent).to.be.within(0, 5);
          index++;

          if (index === timestamps.length) {
            VIRTUAL_OUTPUT.removeAllListeners();
            done();
          }

        }

      }

    });

    it("should schedule message according to absolute timestamp", function (done) {

      // Arrange
      let message = [144, 10, 0];
      let target = WebMidi.time + 100;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].send(message, {time: target});

      // Assert
      function assert() {
        VIRTUAL_OUTPUT.removeAllListeners();
        expect(WebMidi.time - target).to.be.within(-5, 10);
        done();
      }

    });

    it("should schedule message according to relative timestamp", function (done) {

      // Arrange
      let message = [144, 10, 0];
      let offset = "+100";
      let target = WebMidi.time + 100;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].send(message, {time: offset});

      // Assert
      function assert() {
        VIRTUAL_OUTPUT.removeAllListeners();
        expect(WebMidi.time - target).to.be.within(-5, 10);
        done();
      }

    });

  });

  describe("sendChannelMode()", function () {

    it("should properly send MIDI message when using message numbers", function(done) {

      // Arrange
      let index = 120;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      for (let i = 120; i < 128; i++) WEBMIDI_OUTPUT.channels[1].sendChannelMode(i, 0);
      index = 120;

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members([176, index, 0]);
        index++;

        if (index >= 128) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should actually send MIDI message when using message names", function(done) {

      // Arrange
      let index = 120;
      let names = [
        "allsoundoff",
        "resetallcontrollers",
        "localcontrol",
        "allnotesoff",
        "omnimodeoff",
        "omnimodeon",
        "monomodeon",
        "polymodeon"
      ];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      names.forEach(name => WEBMIDI_OUTPUT.channels[1].sendChannelMode(name, 0));

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members([176, index, 0]);
        index++;

        if (index >= 128) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should throw error when invalid name is passed", function () {

      // Arrange
      let values = [
        "xxx",
        0,
        1,
        -1,
        undefined,
        Infinity,
        null
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendChannelMode(value, 0);
        }).to.throw();
      }

    });

    it("should throw error when invalid value is passed", function () {

      // Arrange
      let values = [
        -1,
        128,
        NaN,
        null,
        Infinity,
        -Infinity
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendChannelMode(120, value);
        }).to.throw();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendChannelMode(120, 0)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendControlChange()", function () {

    it("should properly send MIDI message when using controller numbers", function(done) {

      // Arrange
      let index = 0;
      const max = 127;

      // Act
      VIRTUAL_OUTPUT.on("message", assert);
      for (let i = 0; i <= max; i++) WEBMIDI_OUTPUT.channels[1].sendControlChange(i, 123);

      // Assert
      function assert(deltaTime, message) {

        expect(message[0]).to.equal(176);
        expect(message[1]).to.equal(index);
        index++;

        if (index > max) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should properly send 2 MIDI message when using value array", function(done) {

      // Arrange
      let index = 0;

      // Act
      VIRTUAL_OUTPUT.on("message", assert);
      WEBMIDI_OUTPUT.channels[1].sendControlChange(0, [12, 34]);

      // Assert
      function assert(deltaTime, message) {

        if (index === 0) {
          expect(message[0]).to.equal(0xB0);  // control change on channel 1
          expect(message[1]).to.equal(0);     // bankselectcoarse
          expect(message[2]).to.equal(12);    // bankselectcoarse
          index++;
        } else {
          expect(message[0]).to.equal(0xB0);  // control change on channel 1
          expect(message[1]).to.equal(32);    // bankselectfine
          expect(message[2]).to.equal(34);    // bankselectcoarse
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should properly send MIDI message when using controller names", function(done) {

      // Arrange
      let index = 0;
      let map = [
        ["bankselectcoarse", 0],
        ["modulationwheelcoarse", 1],
        ["breathcontrollercoarse", 2],
        ["footcontrollercoarse", 4],
        ["portamentotimecoarse", 5],
        ["dataentrycoarse", 6],
        ["volumecoarse", 7],
        ["balancecoarse", 8],
        ["pancoarse", 10],
        ["expressioncoarse", 11],
        ["effectcontrol1coarse", 12],
        ["effectcontrol2coarse", 13],
        ["generalpurposecontroller1", 16],
        ["generalpurposecontroller2", 17],
        ["generalpurposecontroller3", 18],
        ["generalpurposecontroller4", 19],
        ["bankselectfine", 32],
        ["modulationwheelfine", 33],
        ["breathcontrollerfine", 34],
        ["footcontrollerfine", 36],
        ["portamentotimefine", 37],
        ["dataentryfine", 38],
        ["channelvolumefine", 39],
        ["balancefine", 40],
        ["panfine", 42],
        ["expressionfine", 43],
        ["effectcontrol1fine", 44],
        ["effectcontrol2fine", 45],
        ["damperpedal", 64],
        ["portamento", 65],
        ["sostenuto", 66],
        ["softpedal", 67],
        ["legatopedal", 68],
        ["hold2", 69],
        ["soundvariation", 70],
        ["resonance", 71],
        ["releasetime", 72],
        ["attacktime", 73],
        ["brightness", 74],
        ["decaytime", 75],
        ["vibratorate", 76],
        ["vibratodepth", 77],
        ["vibratodelay", 78],
        ["controller79", 79],
        ["generalpurposecontroller5", 80],
        ["generalpurposecontroller6", 81],
        ["generalpurposecontroller7", 82],
        ["generalpurposecontroller8", 83],
        ["portamentocontrol", 84],
        ["highresolutionvelocityprefix", 88],
        ["effect1depth", 91],
        ["effect2depth", 92],
        ["effect3depth", 93],
        ["effect4depth", 94],
        ["effect5depth", 95],
        ["dataincrement", 96],
        ["datadecrement", 97],
        ["nonregisteredparameterfine", 98],
        ["nonregisteredparametercoarse", 99],
        ["registeredparameterfine", 100],
        ["registeredparametercoarse", 101],

        ["allsoundoff", 120],
        ["resetallcontrollers", 121],
        ["localcontrol", 122],
        ["allnotesoff", 123],
        ["omnimodeoff", 124],
        ["omnimodeon", 125],
        ["monomodeon", 126],
        ["polymodeon", 127]
      ];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      map.forEach(pair => WEBMIDI_OUTPUT.channels[1].sendControlChange(pair[0], 123));

      // Assert
      function assert(deltaTime, message) {

        expect(message[0]).to.equal(176);
        expect(message[1]).to.equal(map[index][1]);
        index++;

        if (index >= map.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should properly send MIDI message for deprecated names (legacy)", function(done) {

      // Arrange
      let index = 0;
      let map = [
        ["generalpurposeslider1", 16],
        ["generalpurposeslider2", 17],
        ["generalpurposeslider3", 18],
        ["generalpurposeslider4", 19],
        ["volumefine", 39],
        ["holdpedal", 64],
        ["sustenutopedal", 66],
        ["hold2pedal", 69],
        ["soundreleasetime", 72],
        ["soundattacktime", 73],
        ["soundcontrol6", 75],
        ["soundcontrol7", 76],
        ["soundcontrol8", 77],
        ["soundcontrol9", 78],
        ["soundcontrol10", 79],
        ["generalpurposebutton1", 80],
        ["generalpurposebutton2", 81],
        ["generalpurposebutton3", 82],
        ["generalpurposebutton4", 83],
        ["portamentocontrol", 84],
        ["highresolutionvelocityprefix", 88],
        ["reverblevel", 91],
        ["tremololevel", 92],
        ["choruslevel", 93],
        ["celestelevel", 94],
        ["phaserlevel", 95],
        ["databuttonincrement", 96],
        ["databuttondecrement", 97],
        ["nonregisteredparameterfine", 98],
        ["nonregisteredparametercoarse", 99],
        ["registeredparameterfine", 100],
        ["registeredparametercoarse", 101],
      ];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      map.forEach(pair => WEBMIDI_OUTPUT.channels[1].sendControlChange(pair[0], 123));

      // Assert
      function assert(deltaTime, message) {

        expect(message[0]).to.equal(176);
        expect(message[1]).to.equal(map[index][1]);
        index++;

        if (index >= map.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should throw error when invalid controller name is specified", function () {

      // Arrange
      let values = [
        "xxx"
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendControlChange(value, 123);
        }).to.throw();
      }

    });

    it("should throw error when invalid controller number is specified", function () {

      // Arrange
      let values = [
        -1,
        128
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendControlChange(value, 123);
        }).to.throw();
      }

    });

    it("should throw error when invalid value is specified", function () {

      // Arrange
      let invalid = [
        NaN,
        undefined,
        null
      ];

      // Act
      invalid.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendControlChange(0, value);
        }).to.throw();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendControlChange("bankselectcoarse", 0)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendNoteOff()", function () {

    it("should send MIDI message when specifying note by number", function(done) {

      // Arrange
      let channel = 1;
      let index = 0;
      let options = {time: 0};
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      for (let i = 0; i <= 127; i++) WEBMIDI_OUTPUT.channels[channel].sendNoteOff(i, options);

      // Assert
      function assert(deltaTime, message) {
        expect(message[0]).to.equal(128);
        expect(message[1]).to.equal(index);
        index++;
        if (index > 127) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }
      }

    });

    it("should send MIDI message when specifying note by name", function(done) {

      // Arrange
      let channel = 1;
      let notes = ["C-1", "C3", "G5", "G9"];
      let index = 0;
      let options = {time: 0};
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      notes.forEach(note => WEBMIDI_OUTPUT.channels[channel].sendNoteOff(note, options));

      // Assert
      function assert(deltaTime, message) {

        expect(message[0]).to.equal(128);
        expect(message[1]).to.equal(Utilities.toNoteNumber(notes[index]));

        index++;

        if (index >= notes.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send MIDI message when specifying note by Note object", function(done) {

      // Arrange
      let channel = 1;
      let notes = [new Note("C-1"), new Note("C3"), new Note("G5"), new Note("G9")];
      let index = 0;
      let options = {time: 0};
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      notes.forEach(note => WEBMIDI_OUTPUT.channels[channel].sendNoteOff(note, options));

      // Assert
      function assert(deltaTime, message) {

        expect(message[0]).to.equal(128);
        expect(message[1]).to.equal(notes[index].number);
        index++;

        if (index >= notes.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send correct release velocity when specified with normal value", function(done) {

      // Arrange
      let channel = 1;
      let note = 0;
      let options = {release: 1};
      let expected = [128, 0, 127];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOff(note, options);

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should send correct release velocity when specified with raw value", function(done) {

      // Arrange
      let channel = 1;
      let note = 0;
      let options = {release: 1, rawRelease: 83};
      let expected = [128, 0, options.rawRelease];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOff(note, options);

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should call 'send' method with correct parameters when using 'rawRelease'", function () {

      // Arrange
      let channel = 1;
      let note = 60;
      let options = {time: 10, release: 0.5, rawRelease: 127};
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[channel], "send");

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOff(note, options);

      // Assert
      let args = spy.args[0];
      expect(spy.calledOnce).to.be.true;
      expect(args[0][1]).to.equal(note);
      expect(args[0][2]).to.equal(options.rawRelease);
      expect(args[1].time).to.equal(options.time);

    });

    it("should call 'send' method with correct parameters when using 'attack'", function () {

      // Arrange
      let channel = 1;
      let note = 60;
      let options = {time: 10, release: 0.5};
      let expectedRawRelease = 64;
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[channel], "send");

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOff(note, options);

      // Assert
      let args = spy.args[0];
      expect(spy.calledOnce).to.be.true;
      expect(args[0][1]).to.equal(note);
      expect(args[0][2]).to.equal(expectedRawRelease);
      expect(args[1].time).to.equal(options.time);

    });

    it("should call 'send' with correct 'octaveOffset' when using number", function () {

      // Arrange
      const channel = 1;

      WebMidi.octaveOffset = -1;
      WEBMIDI_OUTPUT.octaveOffset = -1;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = -1;

      const offset = WebMidi.octaveOffset +
        WEBMIDI_OUTPUT.octaveOffset +
        WEBMIDI_OUTPUT.channels[channel].octaveOffset;

      const inputNumber = 60;
      const outputNumber = inputNumber + offset * 12;
      const spy = sinon.spy(WEBMIDI_OUTPUT.channels[channel], "send");

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOff(inputNumber);

      // Assert
      let args = spy.args[0];
      expect(spy.calledOnce).to.be.true;
      expect(args[0][1]).to.equal(outputNumber);

      WebMidi.octaveOffset = 0;
      WEBMIDI_OUTPUT.octaveOffset = 0;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 0;

    });

    it("should call 'send' with correct 'octaveOffset' when using identifier", function () {

      // Arrange
      const channel = 1;

      WebMidi.octaveOffset = 1;
      WEBMIDI_OUTPUT.octaveOffset = 1;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 1;

      const offset = WebMidi.octaveOffset +
        WEBMIDI_OUTPUT.octaveOffset +
        WEBMIDI_OUTPUT.channels[channel].octaveOffset;

      const note = new Note("C4");
      const outputNumber = note.number + offset * 12;
      const spy = sinon.spy(WEBMIDI_OUTPUT.channels[channel], "send");

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOff(note);

      // Assert
      let args = spy.args[0];
      expect(spy.calledOnce).to.be.true;
      expect(args[0][1]).to.equal(outputNumber);

      WebMidi.octaveOffset = 0;
      WEBMIDI_OUTPUT.octaveOffset = 0;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 0;

    });

    it("should call 'send' with correct 'octaveOffset' when using Note", function () {

      // Arrange
      const channel = 1;

      WebMidi.octaveOffset = 1;
      WEBMIDI_OUTPUT.octaveOffset = 1;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 1;

      const offset = WebMidi.octaveOffset +
        WEBMIDI_OUTPUT.octaveOffset +
        WEBMIDI_OUTPUT.channels[channel].octaveOffset;

      const note = new Note(60);
      const outputNumber = note.number + offset * 12;
      const spy = sinon.spy(WEBMIDI_OUTPUT.channels[channel], "send");

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOff(note);

      // Assert
      let args = spy.args[0];
      expect(spy.calledOnce).to.be.true;
      expect(args[0][1]).to.equal(outputNumber);

      WebMidi.octaveOffset = 0;
      WEBMIDI_OUTPUT.octaveOffset = 0;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 0;

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendNoteOff(0)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendNoteOn()", function () {

    it("should send MIDI message when specifying note by number", function(done) {

      // Arrange
      let channel = 1;
      let index = 0;
      let options = {time: 0};
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      for (let i = 0; i <= 127; i++) {
        WEBMIDI_OUTPUT.channels[channel].sendNoteOn(i, options);
      }

      // Assert
      function assert(deltaTime, message) {
        expect(message[0]).to.equal(144);
        expect(message[1]).to.equal(index);
        index++;
        if (index > 127) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }
      }

    });

    it("should send MIDI message when specifying note by name", function(done) {

      // Arrange
      let channel = 1;
      let notes = ["C-1", "C3", "G5", "G9"];
      let index = 0;
      let options = {time: 0};
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      notes.forEach(note => WEBMIDI_OUTPUT.channels[channel].sendNoteOn(note, options));

      // Assert
      function assert(deltaTime, message) {

        expect(message[0]).to.equal(144);
        expect(message[1]).to.equal(Utilities.toNoteNumber(notes[index]));

        index++;

        if (index >= notes.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send MIDI message when specifying note by Note object", function(done) {

      // Arrange
      let channel = 1;
      let notes = [new Note("C-1"), new Note("C3"), new Note("G5"), new Note("G9")];
      let index = 0;
      let options = {time: 0};
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      notes.forEach(note => WEBMIDI_OUTPUT.channels[channel].sendNoteOn(note, options));

      // Assert
      function assert(deltaTime, message) {

        expect(message[0]).to.equal(144);
        expect(message[1]).to.equal(notes[index].number);
        index++;

        if (index >= notes.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send correct attack velocity when specified with normal value", function(done) {

      // Arrange
      let channel = 1;
      let note = 0;
      let options = {attack: 1};
      let expected = [144, 0, 127];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOn(note, options);

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should send correct attack velocity when specified with raw value", function(done) {

      // Arrange
      let channel = 1;
      let note = 0;
      let options = {attack: 1, rawAttack: 98};
      let expected = [144, 0, options.rawAttack];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOn(note, options);

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should call 'send' method with correct parameters when using 'rawAttack'", function () {

      // Arrange
      let channel = 1;
      let note = 60;
      let options = {time: 10, attack: 0.5, rawAttack: 127};
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[channel], "send");

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOn(note, options);

      // Assert
      let args = spy.args[0];
      expect(spy.calledOnce).to.be.true;
      expect(args[0][1]).to.equal(note);
      expect(args[0][2]).to.equal(options.rawAttack);
      expect(args[1].time).to.equal(options.time);

    });

    it("should call 'send' method with correct parameters when using 'attack'", function () {

      // Arrange
      let channel = 1;
      let note = 60;
      let options = {time: 10, attack: 0.5};
      let expectedRawAttack = 64;
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[channel], "send");

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOn(note, options);

      // Assert
      let args = spy.args[0];
      expect(spy.calledOnce).to.be.true;
      expect(args[0][1]).to.equal(note);
      expect(args[0][2]).to.equal(expectedRawAttack);
      expect(args[1].time).to.equal(options.time);

    });

    it("should call 'send' with correct 'octaveOffset' when using number", function () {

      // Arrange
      const channel = 1;

      WebMidi.octaveOffset = 1;
      WEBMIDI_OUTPUT.octaveOffset = 1;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 1;

      const offset = WebMidi.octaveOffset +
        WEBMIDI_OUTPUT.octaveOffset +
        WEBMIDI_OUTPUT.channels[channel].octaveOffset;

      const inputNumber = 60;
      const outputNumber = inputNumber + offset * 12;
      const spy = sinon.spy(WEBMIDI_OUTPUT.channels[channel], "send");

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOn(inputNumber);

      // Assert
      let args = spy.args[0];
      expect(spy.calledOnce).to.be.true;
      expect(args[0][1]).to.equal(outputNumber);

      WebMidi.octaveOffset = 0;
      WEBMIDI_OUTPUT.octaveOffset = 0;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 0;

    });

    it("should call 'send' with correct 'octaveOffset' when using identifier", function () {

      // Arrange
      const channel = 1;

      WebMidi.octaveOffset = 1;
      WEBMIDI_OUTPUT.octaveOffset = 1;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 1;

      const offset = WebMidi.octaveOffset +
        WEBMIDI_OUTPUT.octaveOffset +
        WEBMIDI_OUTPUT.channels[channel].octaveOffset;

      const note = new Note("C4");
      const outputNumber = note.number + offset * 12;
      const spy = sinon.spy(WEBMIDI_OUTPUT.channels[channel], "send");

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOn(note);

      // Assert
      let args = spy.args[0];
      expect(spy.calledOnce).to.be.true;
      expect(args[0][1]).to.equal(outputNumber);

      WebMidi.octaveOffset = 0;
      WEBMIDI_OUTPUT.octaveOffset = 0;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 0;

    });

    it("should call 'send' with correct 'octaveOffset' when using Note", function () {

      // Arrange
      const channel = 1;

      WebMidi.octaveOffset = 1;
      WEBMIDI_OUTPUT.octaveOffset = 1;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 1;

      const offset = WebMidi.octaveOffset +
        WEBMIDI_OUTPUT.octaveOffset +
        WEBMIDI_OUTPUT.channels[channel].octaveOffset;

      const note = new Note(60);
      const outputNumber = note.number + offset * 12;
      const spy = sinon.spy(WEBMIDI_OUTPUT.channels[channel], "send");

      // Act
      WEBMIDI_OUTPUT.channels[channel].sendNoteOn(note);

      // Assert
      let args = spy.args[0];
      expect(spy.calledOnce).to.be.true;
      expect(args[0][1]).to.equal(outputNumber);

      WebMidi.octaveOffset = 0;
      WEBMIDI_OUTPUT.octaveOffset = 0;
      WEBMIDI_OUTPUT.channels[channel].octaveOffset = 0;

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendNoteOn(0)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendChannelAftertouch()", function () {

    it("should send correct MIDI message when using float", function(done) {

      // Arrange
      let index = 0;
      let values = [0, 0.5, 1];
      let expected = [
        [208, 0],
        [208, 64],
        [208, 127],
      ];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      values.forEach(value => WEBMIDI_OUTPUT.channels[1].sendChannelAftertouch(value));


      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);

        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should throw error when invalid pressure is specified", function() {

      // Arrange
      let values = [
        -1,
        2,
        undefined,
        null,
        "test"
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendChannelAftertouch(value);
        }).to.throw(RangeError);
      }

    });

    it("should throw error when invalid raw pressure is specified", function() {

      // Arrange
      let values = [
        -1,
        128,
        undefined,
        null,
        "test"
      ];
      let options = {rawValue: true};

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendChannelAftertouch(value, options);
        }).to.throw(RangeError);
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendChannelAftertouch(1)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendKeyAftertouch()", function () {

    it("should send correct MIDI message when using note number", function(done) {

      // Arrange
      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      for (let i = 0; i <= 127; i++) WEBMIDI_OUTPUT.channels[1].sendKeyAftertouch(i, 0.5);

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members([160, index, 64]);
        index++;

        if (index >= 127) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send correct MIDI message when using note identifier", function(done) {

      // Arrange
      let index = 0;
      const value = 0.5;
      const items = [
        {identifier: "C-1", number: 0},
        {identifier: "C4", number: 60},
        {identifier: "G9", number: 127},
      ];

      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      items.forEach(item => {
        WEBMIDI_OUTPUT.channels[1].sendKeyAftertouch(item.identifier, value);
      });


      // Assert
      function assert(deltaTime, message) {

        expect(
          message
        ).to.have.ordered.members([160, items[index].number, Utilities.fromFloatTo7Bit(value)]);

        index++;

        if (index >= items.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send correct message when offset is used with note number", function(done) {

      // Arrange
      WebMidi.octaveOffset = -1;
      WEBMIDI_OUTPUT.octaveOffset = -1;
      WEBMIDI_OUTPUT.channels[1].octaveOffset = -1;
      const offset = WebMidi.octaveOffset + WEBMIDI_OUTPUT.octaveOffset +
        WEBMIDI_OUTPUT.channels[1].octaveOffset;
      let index = Math.abs(offset) * 12;
      const max = 127;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      for (let i = index; i <= max; i++) WEBMIDI_OUTPUT.channels[1].sendKeyAftertouch(i, 0.5);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members([160, index + offset * 12, 64]);
        index++;

        if (index >= max) {
          VIRTUAL_OUTPUT.removeAllListeners();
          WebMidi.octaveOffset = 0;
          WEBMIDI_OUTPUT.octaveOffset = 0;
          WEBMIDI_OUTPUT.channels[1].octaveOffset = 0;
          done();
        }

      }

    });

    it("should send correct message when offset is used with note identifier", function(done) {

      // Arrange
      WebMidi.octaveOffset = 1;
      WEBMIDI_OUTPUT.octaveOffset = 1;
      WEBMIDI_OUTPUT.channels[1].octaveOffset = 1;

      let index = 0;
      const value = 0.5;

      const items = [
        {identifier: "C-1", number: 36},
        {identifier: "C4", number: 96}
      ];

      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      items.forEach(item => {
        WEBMIDI_OUTPUT.channels[1].sendKeyAftertouch(item.identifier, value);
      });


      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(
          [160, items[index].number, Utilities.fromFloatTo7Bit(value)]
        );

        index++;

        if (index >= items.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          WebMidi.octaveOffset = 0;
          WEBMIDI_OUTPUT.octaveOffset = 0;
          WEBMIDI_OUTPUT.channels[1].octaveOffset = 0;
          done();
        }

      }

    });

    it("should throw error when invalid pressure is specified", function() {

      // Arrange
      let values = [
        -1,
        2,
        undefined,
        null,
        "test"
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendKeyAftertouch(64, value);
        }).to.throw(RangeError);
      }

    });

    it("should throw error when invalid raw pressure is specified", function() {

      // Arrange
      let values = [
        -1,
        128,
        undefined,
        null,
        "test"
      ];
      let options = {rawValue: true};

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendKeyAftertouch(64, value, options);
        }).to.throw(RangeError);
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendKeyAftertouch(64, 0.5)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendLocalControl()", function () {

    it("should call 'sendChannelMode' method with correct parameter for 'true'", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendChannelMode");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendLocalControl(true, options);

      // Assert
      expect(spy.calledOnceWithExactly("localcontrol", 127, options)).to.be.true;

    });

    it("should call 'sendChannelMode' method with correct parameter for 'false'", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendChannelMode");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendLocalControl(false, options);

      // Assert
      expect(spy.calledOnceWithExactly("localcontrol", 0, options)).to.be.true;

    });

    it("should send correct MIDI message", function(done) {

      // Arrange
      let expected = [176, 122, 0];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendLocalControl();

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendLocalControl()
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendMasterTuning()", function () {

    it("should call 'sendRpnValue' method for coarse and fine tuning", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendRpnValue");
      let options = {time: 0};
      let value = 12.5;

      // Act
      WEBMIDI_OUTPUT.channels[1].sendMasterTuning(value, options);

      // Assert
      expect(spy.calledWith("channelcoarsetuning")).to.be.true;
      expect(spy.calledWith("channelfinetuning")).to.be.true;
      expect(spy.calledTwice).to.be.true;

    });

    it("should throw error when invalid value is specified", function() {

      // Arrange
      let values = [
        -65,
        64
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendMasterTuning(value);
        }).to.throw(RangeError);
      }

    });

    it("should send correct MIDI messages", function(done) {

      // Arrange
      let coarse = 25;
      let fine = 0.13;
      let expected = [

        // Master coarse tuning 0,2
        [ 176, 101, 0 ],
        [ 176, 100, 2 ],
        [ 176, 6, coarse + 64 ],
        [ 176, 101, 127 ],
        [ 176, 100, 127 ],

        // Master fine tuning 0,1
        [ 176, 101, 0 ],
        [ 176, 100, 1 ],
        [ 176, 6, 72 ],  // msb
        [ 176, 38, 40 ], // lsb
        [ 176, 101, 127 ],
        [ 176, 100, 127 ]

      ];

      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendMasterTuning(coarse + fine);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendMasterTuning(0)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendModulationRange()", function () {

    it("should properly call 'sendRpnValue()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendRpnValue");
      let semitones = 8;
      let cents = 123;
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendModulationRange(semitones, cents, options);

      // Assert
      expect(
        spy.calledOnceWithExactly("modulationrange", [semitones, cents], options)
      ).to.be.true;

    });

    it("should send correct MIDI messages", function(done) {

      // Arrange
      let semitones = 8;
      let cents = 123;

      let expected = [
        [ 176, 101, 0 ],
        [ 176, 100, 5 ],
        [ 176, 6, semitones ],
        [ 176, 38, cents ],
        [ 176, 101, 127 ],
        [ 176, 100, 127 ]
      ];

      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendModulationRange(semitones, cents);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should throw error when invalid semitones value is specified", function() {

      // Arrange
      let semitones = [
        -1,
        128,
        undefined,
        NaN,
        null
      ];

      // Act
      semitones.forEach(assert);

      // Assert
      function assert(semitone) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendModulationRange(semitone);
        }).to.throw(RangeError);
      }

    });

    it("should throw error if cents value is specified but invalid", function() {

      // Arrange
      let values = [
        -1,
        128,
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendModulationRange(64, value);
        }).to.throw(RangeError);
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendModulationRange(8, 9)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendNrpnValue()", function () {

    it("should properly call '_selectNonRegisteredParameter()' method", function () {

      // Arrange
      let parameter = [8, 123];
      let data = 123;
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "_selectNonRegisteredParameter");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendNrpnValue(parameter, data, options);

      // Assert
      expect(
        spy.calledOnceWithExactly(parameter, options)
      ).to.be.true;

    });

    it("should properly call '_setCurrentParameter()' method", function () {

      // Arrange
      let parameter = [8, 123];
      let data = [47];
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "_setCurrentParameter");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendNrpnValue(parameter, data, options);

      // Assert
      expect(
        spy.calledWithExactly(data, options)
      ).to.be.true;

    });

    it("should properly call '_deselectNonRegisteredParameter()' method", function () {

      // Arrange
      let parameter = [8, 123];
      let data = 123;
      let options = {time: 0};
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "_deselectNonRegisteredParameter");

      // Act
      WEBMIDI_OUTPUT.channels[1].sendNrpnValue(parameter, data, options);

      // Assert
      expect(
        spy.calledOnceWithExactly(options)
      ).to.be.true;

    });

    it("should send correct MIDI messages when using data array", function(done) {

      // Arrange
      let parameter = [8, 123];
      let data = [45, 67];

      let expected = [
        [ 176, 99, parameter[0] ],
        [ 176, 98, parameter[1] ],
        [ 176, 6, data[0] ],
        [ 176, 38, data[1] ],
        [ 176, 101, 127 ],
        [ 176, 100, 127 ]
      ];

      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendNrpnValue(parameter, data);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send correct MIDI messages when single data byte", function(done) {

      // Arrange
      let parameter = [8, 123];
      let data = 45;

      let expected = [
        [ 176, 99, parameter[0] ],
        [ 176, 98, parameter[1] ],
        [ 176, 6, data ],
        [ 176, 101, 127 ],
        [ 176, 100, 127 ]
      ];

      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendNrpnValue(parameter, data);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should throw error when invalid NRPN value is specified", function() {

      // Arrange
      let values = [
        1,
        [-1, 64],
        [64, 128],
        undefined,
        NaN,
        null
      ];
      let data = 45;

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendNrpnValue(value, data);
        }).to.throw();
      }

    });

    it("should throw error when invalid data is specified", function() {

      // Arrange
      let values = [
        1,
        [-1, 64],
        [64, 128],
        undefined,
        NaN,
        null
      ];
      let nrpn = 45;

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendNrpnValue(nrpn, value);
        }).to.throw();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {

      // Arrange
      let nrpn = [12, 34];

      // Assert
      expect(
        WEBMIDI_OUTPUT.channels[1].sendNrpnValue(nrpn, 56)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);

    });

  });

  describe("sendOmniMode()", function () {

    it("should call 'sendChannelMode()' method with correct parameter for 'true'", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendChannelMode");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendOmniMode(true, options);

      // Assert
      expect(spy.calledOnceWithExactly("omnimodeon", 0, options)).to.be.true;

    });

    it("should call 'sendChannelMode()' method with correct parameter for 'false'", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendChannelMode");
      let options = {};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendOmniMode(false, options);

      // Assert
      expect(spy.calledOnceWithExactly("omnimodeoff", 0, options)).to.be.true;

    });

    it("should send correct MIDI message", function(done) {

      // Arrange
      let expected = [176, 125, 0];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendOmniMode();

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendOmniMode(true)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendPitchBend()", function () {

    it("should send correct MIDI message when using float (-1 to 1)", function(done) {

      // Arrange
      let index = 0;
      let values = [-1, 0, 1];
      let expected = [
        [224, 0, 0],
        [224, 0, 64],
        [224, 127, 127]
      ];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      values.forEach(value => WEBMIDI_OUTPUT.channels[1].sendPitchBend(value));

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected[index]);
        index++;
        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }
      }

    });

    it("should send correct MIDI message when using integers", function(done) {

      // Arrange
      let values = [
        [0, 0],
        [64, 0],
        [127, 0],
        [0, 0],
        [0, 64],
        [0, 127]
      ];
      let options = {rawValue: true};
      let expected = [
        [224, 0, 0],
        [224, 0, 64],
        [224, 0, 127],
        [224, 0, 0],
        [224, 64, 0],
        [224, 127, 0]
      ];
      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      values.forEach(value => WEBMIDI_OUTPUT.channels[1].sendPitchBend(value, options));

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected[index]);
        index++;
        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }
      }

    });

    it("should throw error when invalid value is specified", function() {

      // Arrange
      let values = [
        undefined,
        NaN,
        null,
        -2,
        2
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendPitchBend(value);
        }).to.throw();
      }

    });

    it("should throw error when invalid raw value is specified", function() {

      // Arrange
      let values = [
        undefined,
        NaN,
        null,
        -1,
        128,
        [-1, 64],
        [128, 64],
        [64, -1],
        [64, 128],
        []
      ];
      let options = {rawValue: true};

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendPitchBend(value, options);
        }).to.throw();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendPitchBend(0)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendPitchBendRange()", function () {

    it("should call 'sendRpnValue()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendRpnValue");
      let semitones = 8;
      let cents = 123;
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendPitchBendRange(semitones, cents, options);

      // Assert
      expect(
        spy.calledOnceWithExactly("pitchbendrange", [semitones, cents], options)
      ).to.be.true;

    });

    it("should send correct MIDI messages", function(done) {

      // Arrange
      let semitones = 8;
      let cents = 123;

      let expected = [
        [ 176, 101, 0 ],
        [ 176, 100, 0 ],
        [ 176, 6, semitones ],
        [ 176, 38, cents ],
        [ 176, 101, 127 ],
        [ 176, 100, 127 ]
      ];

      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendPitchBendRange(semitones, cents);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should throw error when invalid semitones value is specified", function() {

      // Arrange
      let values = [
        -1,
        128,
        undefined,
        NaN,
        null
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendPitchBendRange(64, value);
        }).to.throw(RangeError);
      }

    });

    it("should throw error when invalid cents value is specified", function() {

      // Arrange
      let values = [
        -1,
        128,
        undefined,
        NaN,
        null
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendPitchBendRange(64, value);
        }).to.throw(RangeError);
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendPitchBendRange(8, 9)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendPolyphonicMode()", function () {

    it("should call 'sendChannelMode' method with correct parameter for 'mono'", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendChannelMode");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendPolyphonicMode("mono", options);

      // Assert
      expect(spy.calledOnceWithExactly("monomodeon", 0, options)).to.be.true;

    });

    it("should call 'sendChannelMode' method with correct parameter for 'poly'", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendChannelMode");
      let options = {};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendPolyphonicMode("poly", options);

      // Assert
      expect(spy.calledOnceWithExactly("polymodeon", 0, options)).to.be.true;

    });

    it("should send correct MIDI message for 'mono'", function(done) {

      // Arrange
      let expected = [176, 126, 0];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendPolyphonicMode("mono");

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should send correct MIDI message for 'poly'", function(done) {

      // Arrange
      let expected = [176, 127, 0];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendPolyphonicMode("poly");

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendPolyphonicMode("mono")
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendProgramChange()", function () {

    it("should send correct MIDI message", function(done) {

      // Arrange
      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      for (let i = 0; i <= 127; i++) {
        WEBMIDI_OUTPUT.channels[1].sendProgramChange(i);
      }

      // Assert
      function assert(deltaTime, message) {
        expect(message[0]).to.equal(192);
        expect(message[1]).to.equal(index);
        index++;
        if (index > 127) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }
      }

    });

    it("should throw error when invalid value is specified", function() {

      // Arrange
      let values = [
        -1,
        129
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendProgramChange(value);
        }).to.throw(RangeError);
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendProgramChange(1)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendRpnValue()", function () {

    it("should properly call '_selectRegisteredParameter()' method", function () {

      // Arrange
      let rpn = [0x3D, 0x00];
      let data = 123;
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "_selectRegisteredParameter");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnValue(rpn, data, options);

      // Assert
      expect(
        spy.calledOnceWithExactly(rpn, options)
      ).to.be.true;

    });

    it("should properly call '_setCurrentParameter()' method", function () {

      // Arrange
      let rpn = [0x00, 0x00];
      let data = 47;
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "_setCurrentParameter");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnValue(rpn, data, options);

      // Assert
      expect(
        spy.calledWithExactly(data, options)
      ).to.be.true;

    });

    it("should properly call '_deselectRegisteredParameter()' method", function () {

      // Arrange
      let rpn = [0x00, 0x01];
      let data = 123;
      let options = {time: 0};
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "_deselectRegisteredParameter");

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnValue(rpn, data, options);

      // Assert
      expect(
        spy.calledOnceWithExactly(options)
      ).to.be.true;

    });

    it("should send correct MIDI messages when using RPN name", function(done) {

      // Arrange
      let rpn = "modulationrange";
      let rpnAsNumbers = [0x00, 0x05];
      let data = [45, 67];

      let expected = [
        [ 176, 101, rpnAsNumbers[0] ],
        [ 176, 100, rpnAsNumbers[1] ],
        [ 176, 6, data[0] ],
        [ 176, 38, data[1] ],
        [ 176, 101, 127 ],
        [ 176, 100, 127 ]
      ];

      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnValue(rpn, data);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send correct MIDI messages when using data array", function(done) {

      // Arrange
      let rpn = [0x00, 0x02];
      let data = [45, 67];

      let expected = [
        [ 176, 101, rpn[0] ],
        [ 176, 100, rpn[1] ],
        [ 176, 6, data[0] ],
        [ 176, 38, data[1] ],
        [ 176, 101, 127 ],
        [ 176, 100, 127 ]
      ];

      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnValue(rpn, data);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should send correct MIDI messages when using single data byte", function(done) {

      // Arrange
      let rpn = [8, 123];
      let data = 45;

      let expected = [
        [ 176, 101, rpn[0] ],
        [ 176, 100, rpn[1] ],
        [ 176, 6, data ],
        [ 176, 101, 127 ],
        [ 176, 100, 127 ]
      ];

      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendRpnValue(rpn, data);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should throw error when invalid RPN value is specified", function() {

      // Arrange
      let values = [
        1,
        [-1, 64],
        [64, 128],
        undefined,
        NaN,
        null
      ];
      let data = 45;

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendRpnValue(value, data);
        }).to.throw();
      }

    });

    it("should throw error when invalid data is specified", function() {

      // Arrange
      let values = [
        1,
        [-1, 64],
        [64, 128],
        undefined,
        NaN,
        null
      ];
      let rpn = 45;

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendRpnValue(rpn, value);
        }).to.throw();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {

      // Arrange
      let nrpn = [12, 34];

      // Assert
      expect(
        WEBMIDI_OUTPUT.channels[1].sendRpnValue(nrpn, 56)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);

    });

  });

  describe("sendTuningBank()", function () {

    it("should call 'sendRpnValue()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendRpnValue");
      let value = 8;
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendTuningBank(value, options);

      // Assert
      expect(
        spy.calledOnceWith("tuningbank", value, options)
      ).to.be.true;

    });

    it("should send correct MIDI messages", function(done) {

      // Arrange
      let value = 8;

      let expected = [
        [ 176, 101, 0 ],
        [ 176, 100, 4 ],
        [ 176, 6, value ],
        [ 176, 101, 127 ],
        [ 176, 100, 127 ]
      ];

      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendTuningBank(value);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);

        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should throw error when invalid value is specified", function() {

      // Arrange
      let values = [
        -1,
        129,
        undefined,
        NaN,
        null
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendTuningBank(value);
        }).to.throw(RangeError);
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendTuningBank(8)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendTuningProgram()", function () {

    it("should call 'sendRpnValue()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendRpnValue");
      let value = 8;
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendTuningProgram(value, options);

      // Assert
      expect(
        spy.calledOnceWith("tuningprogram", value, options)
      ).to.be.true;

    });

    it("should send correct MIDI messages", function(done) {

      // Arrange
      let value = 8;
      let expected = [
        [ 176, 101, 0 ],
        [ 176, 100, 3 ],
        [ 176, 6, value],
        [ 176, 101, 127 ],
        [ 176, 100, 127 ]
      ];
      let index = 0;
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendTuningProgram(value);

      // Assert
      function assert(deltaTime, message) {

        expect(message).to.have.ordered.members(expected[index]);
        index++;

        if (index >= expected.length) {
          VIRTUAL_OUTPUT.removeAllListeners();
          done();
        }

      }

    });

    it("should throw error when invalid value is specified", function() {

      // Arrange
      let values = [
        -1,
        129,
        undefined,
        NaN,
        null
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WEBMIDI_OUTPUT.channels[1].sendTuningProgram(value);
        }).to.throw(RangeError);
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendTuningProgram(8)
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("stopNote()", function () {

    it("should properly call 'sendNoteOff()' method", function () {

      // Arrange
      let channel = 1;
      let note = "G5";
      let options = {time: 0};
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendNoteOff");

      // Act
      WEBMIDI_OUTPUT.channels[channel].stopNote(note, options);

      // Assert
      expect(
        spy.calledOnceWithExactly(note, options)
      ).to.be.true;

    });

    it("should call the 'sendNoteOff()' method with correct parameters", function () {

      // Arrange
      let note = "G5";
      let options = {time: 10, release: 0.5, rawRelease: 127};
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendNoteOff");

      // Act
      WEBMIDI_OUTPUT.channels[1].stopNote(note, options);

      // Assert
      expect(spy.calledOnceWith(note)).to.be.true;
      expect(spy.args[0][0]).to.equal(note);
      expect(spy.args[0][1].time).to.equal(options.time);
      expect(spy.args[0][1].release).to.equal(options.release);
      expect(spy.args[0][1].rawRelease).to.equal(options.rawRelease);

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].playNote("C3")
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendAllNotesOff()", function () {

    it("should properly call 'sendChannelMode()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendChannelMode");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendAllNotesOff(options);

      // Assert
      expect(spy.calledOnceWithExactly("allnotesoff", 0, options)).to.be.true;

    });

    it("should send correct MIDI message", function(done) {

      // Arrange
      let expected = [176, 123, 0];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendAllNotesOff();

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendAllNotesOff()
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

  describe("sendAllSoundOff()", function () {

    it("should properly call 'sendChannelMode()' method", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_OUTPUT.channels[1], "sendChannelMode");
      let options = {time: 0};

      // Act
      WEBMIDI_OUTPUT.channels[1].sendAllSoundOff(options);

      // Assert
      expect(spy.calledOnceWithExactly("allsoundoff", 0, options)).to.be.true;

    });

    it("should send the correct MIDI message", function(done) {

      // Arrange
      let expected = [176, 120, 0];
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      WEBMIDI_OUTPUT.channels[1].sendAllSoundOff();

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(expected);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should return 'OutputChannel' object for method chaining", function () {
      expect(
        WEBMIDI_OUTPUT.channels[1].sendAllSoundOff()
      ).to.equal(WEBMIDI_OUTPUT.channels[1]);
    });

  });

});
