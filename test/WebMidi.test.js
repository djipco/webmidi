const expect = require("chai").expect;
const {WebMidi} = require("../dist/webmidi.cjs.js");
const midi = require("midi");

// The virtual port from the 'midi' library is an "external" device so an output is seen as an input
// by WebMidi. To avoid confusion, the naming scheme adopts WebMidi's perspective.
const VIRTUAL_INPUT_NAME = "Virtual Input";
const VIRTUAL_INPUT = new midi.Output(VIRTUAL_INPUT_NAME);
const VIRTUAL_OUTPUT_NAME = "Virtual Output";
const VIRTUAL_OUTPUT = new midi.Input(VIRTUAL_OUTPUT_NAME);

describe("WebMidi Object", function() {

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  it("should not allow itself to be instantiated", function() {

    // Assert
    expect(function() {
      new WebMidi();
    }).to.throw(TypeError);

  });

  it("should not allow itself to be instantiated through 'constructor' property", function() {

    // Assert
    expect(function() {
      new WebMidi.constructor();
    }).to.throw(TypeError);

  });

  it("should remain extensible", function() {

    // Assert
    expect(Object.isExtensible(WebMidi)).to.be.true;

  });

  it("should have empty 'inputs' and 'outputs' arrays", function() {

    // Assert
    expect(WebMidi.inputs.length).to.equal(0);
    expect(WebMidi.outputs.length).to.equal(0);

  });

  // THIS WORKS BY ITSELF BUT STOPS WORKING WHEN THE OTHER TESTS ARE RUN!
  it("should trigger 'connected' events for new inputs");
  // it("should trigger 'connected' events for new inputs", function(done) {
  //
  //   WebMidi.addListener("connected", e => {
  //     if (e.port.name === VIRTUAL_INPUT_NAME) {
  //       WebMidi.removeListener();
  //       VIRTUAL_INPUT.closePort();
  //       done();
  //     }
  //   });
  //
  //   // Assert
  //   WebMidi.enable().then(() => {
  //     setTimeout(function () {
  //       VIRTUAL_INPUT.openVirtualPort(VIRTUAL_INPUT_NAME);
  //     }, 100);
  //   });
  //
  // });

  // THIS WORKS BY ITSELF BUT STOPS WORKING WHEN THE OTHER TESTS ARE RUN!
  it("should trigger 'connected' events for new outputs");
  // it("should trigger 'connected' events for new outputs", function(done) {
  //
  //   WebMidi.addListener("connected", e => {
  //     if (e.port.name === VIRTUAL_OUTPUT_NAME) {
  //       WebMidi.removeListener();
  //       VIRTUAL_OUTPUT.closePort();
  //       done();
  //     }
  //   });
  //
  //   // Assert
  //   WebMidi.enable().then(() => {
  //     setTimeout(()=>{
  //       VIRTUAL_OUTPUT.openVirtualPort(VIRTUAL_OUTPUT_NAME);
  //     }, 250);
  //   });
  //
  // });

  it("should trigger 'disconnected' events for disconnected outputs");
  // it("should trigger 'disconnected' events for disconnected outputs", function(done) {
  //
  //   VIRTUAL_OUTPUT.openVirtualPort(VIRTUAL_OUTPUT_NAME);
  //
  //   WebMidi.addListener("disconnected", e => {
  //     if (e.port.name === VIRTUAL_OUTPUT_NAME) {
  //       WebMidi.removeListener();
  //       done();
  //     }
  //   });
  //
  //   // Assert
  //   WebMidi.enable().then(() => {
  //     setTimeout(() => {
  //       VIRTUAL_OUTPUT.closePort();
  //     }, 250);
  //   });
  //
  // });

  it("should trigger 'disconnected' events for disconnected inputs");
  // it("should trigger 'disconnected' events for disconnected inputs", function(done) {
  //
  //   VIRTUAL_INPUT.openVirtualPort(VIRTUAL_INPUT_NAME);
  //
  //   WebMidi.addListener("disconnected", e => {
  //     if (e.port.name === VIRTUAL_INPUT_NAME) {
  //       WebMidi.removeListener();
  //       done();
  //     }
  //   });
  //
  //   // Assert
  //   WebMidi.enable().then(() => {
  //     setTimeout(() => {
  //       VIRTUAL_INPUT.closePort();
  //     }, 250);
  //   });
  //
  // });

  // VERIFIED
  describe("constructor()", function() {

    beforeEach("Enable WebMidi", async function() {
      await WebMidi.enable({sysex: true});
    });

    it("should adjust to Node.js environment", function() {

      // Assert
      expect(typeof navigator.requestMIDIAccess).to.equal("function");
      expect(typeof performance.now).to.equal("function");

    });

  });

  // VERIFIED
  describe("convertToTimestamp()", function() {

    beforeEach("Enable WebMidi", async function() {
      await WebMidi.enable({sysex: true});
    });

    it("should return timestamp when passed string starting with '+'", function() {
      // Assert
      expect(WebMidi.convertToTimestamp("+1000")).to.be.a("number");
    });

    it("should return false for invalid input", function() {

      // Arrange
      let values = [undefined, null, false, [], {}, "", "-1", "+", -1, -Infinity];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(WebMidi.convertToTimestamp(value)).to.be.false;
      }

    });

    it("should return a positive number as is", function() {

      // Arrange
      let values = [0, 1, Infinity];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(WebMidi.convertToTimestamp(value)).to.equal(value);
      }

    });

  });

  // VERIFIED
  describe("disable()", function() {

    beforeEach("Enable WebMidi", async function() {
      await WebMidi.enable({sysex: true});
    });

    it("should set 'enabled' property to false", function(done) {

      // Assert
      WebMidi.disable().then(() => {
        expect(WebMidi.enabled).to.equal(false);
        done();
      });

    });

    it("should set the 'sysexEnabled' property to false", function(done) {

      // Assert
      WebMidi.disable().then(() => {
        expect(WebMidi.sysexEnabled).to.equal(false);
        done();
      });

    });

    it("should trim 'input' and 'output' array lengths to 0", function(done) {

      // Assert
      WebMidi.disable().then(() => {
        expect(WebMidi.inputs.length).to.equal(0);
        expect(WebMidi.outputs.length).to.equal(0);
        done();
      });

    });

    it("should remove all user handlers", async function() {

      // Arrange
      WebMidi.addListener("connected", () => {});
      WebMidi.addListener("disconnected", () => {});
      WebMidi.addListener("enabled", () => {});
      WebMidi.addListener("disabled", () => {});

      // Act
      await WebMidi.disable();

      // Assert
      expect(WebMidi.hasListener()).to.be.false;

    });

    it("should set 'interface' to 'null'", async function() {

      // Act
      await WebMidi.disable();

      // Assert
      expect(WebMidi.interface).to.be.null;

    });

    it("should dispatch 'disabled' event", function (done) {
      WebMidi.addListener("disabled", () => done());
      WebMidi.disable();
    });

  });

  // VERIFIED
  describe("enable()", function() {

    it("should return a resolved promise if already enabled", function(done) {

      WebMidi.enable().then(() => {
        WebMidi.enable().then(() => {
          done();
        });
      });

    });

    it("should execute the callback if already enabled (legacy)", function(done) {

      WebMidi.enable(function() {
        WebMidi.enable(function() {
          done();
        });
      });

    });

    it("should pass error to callback upon failure to create interface (legacy)", function(done) {

      // Arrange
      let backup;

      if (navigator && navigator.requestMIDIAccess) {
        backup = navigator.requestMIDIAccess;
        navigator.requestMIDIAccess = () => Promise.reject(new Error("Simulated failure!"));
      }

      // Assert
      WebMidi.enable(function (err) {
        expect(err).to.be.an("error");
        navigator.requestMIDIAccess = backup;
        done();
      });

    });

    it("should pass error to callback upon failure to create interface", function(done) {

      // Arrange
      let backup;

      if (navigator && navigator.requestMIDIAccess) {
        backup = navigator.requestMIDIAccess;
        navigator.requestMIDIAccess = () => Promise.reject(new Error("Simulated failure!"));
      }

      // Assert
      WebMidi.enable({callback: err => {
        expect(err).to.be.an("error");
        navigator.requestMIDIAccess = backup;
        done();
      }}).catch(() => {});


    });

    it("should trigger error event upon failure to create interface", function(done) {

      // Arrange
      let backup;

      if (navigator && navigator.requestMIDIAccess) {
        backup = navigator.requestMIDIAccess;
        navigator.requestMIDIAccess = () => Promise.reject(new Error("Simulated failure!"));
      }

      // Assert
      WebMidi.addListener("error", e => {
        expect(e.error).to.be.an("error");
        navigator.requestMIDIAccess = backup;
        done();
      });

      // Act
      WebMidi.enable();

    });

    it("should return a rejected promise upon failure to create interface", function(done) {

      // Arrange
      let backup;

      if (navigator && navigator.requestMIDIAccess) {
        backup = navigator.requestMIDIAccess;
        navigator.requestMIDIAccess = () => Promise.reject(new Error("Simulated failure!"));
      }

      // Assert
      WebMidi.enable().catch(err => {
        navigator.requestMIDIAccess = backup;
        expect(err).to.be.an("error");
        done();
      });

    });

    it("should set 'enabled' property to false if enable() method fails", function(done) {

      // Arrange
      let backup;

      if (navigator && navigator.requestMIDIAccess) {
        backup = navigator.requestMIDIAccess;
        navigator.requestMIDIAccess = () => Promise.reject(new Error("Simulated failure!"));
      }

      // Assert
      WebMidi.enable().catch(() => {
        expect(WebMidi.enabled).to.equal(false);
        navigator.requestMIDIAccess = backup;
        done();
      });

    });

    it("should set 'enabled' property to false if enable() method fails (legacy)", function(done) {

      // Arrange
      let backup;

      if (navigator && navigator.requestMIDIAccess) {
        backup = navigator.requestMIDIAccess;
        navigator.requestMIDIAccess = () => Promise.reject(new Error("Simulated failure!"));
      }

      WebMidi.enable(function () {
        expect(WebMidi.enabled).to.equal(false);
        navigator.requestMIDIAccess = backup;
        done();
      });

    });

    it("should set 'enabled' property to true if successful", function(done) {

      WebMidi.enable({callback: function (err) {

        if (err) { // This could happen if WebMIDIAPIShim is there but not the Jazz-Plugin
          expect(WebMidi.enabled).to.equal(false);
        } else {
          expect(WebMidi.enabled).to.equal(true);
        }

        done();

      }});

    });

    it("should set 'enabled' property to true if successful (legacy)", function(done) {

      WebMidi.enable(function (err) {

        if (err) { // This could happen if WebMIDIAPIShim is there but not the Jazz-Plugin
          expect(WebMidi.enabled).to.equal(false);
        } else {
          expect(WebMidi.enabled).to.equal(true);
        }

        done();

      });

    });

    it("should execute the callback if successful", function(done) {
      WebMidi.enable({callback: function () {
        done();
      }});
    });

    it("should execute the callback if successful (legacy)", function(done) {
      WebMidi.enable(function() {
        done();
      });
    });

    it("should return a promise if successful", function(done) {
      WebMidi.enable().then(() => done());
    });

    it("should trigger 'connected' events for already connected inputs", function(done) {

      // Arrange
      VIRTUAL_INPUT.openVirtualPort(VIRTUAL_INPUT_NAME);

      WebMidi.addListener("connected", e => {
        if (e.port.name === VIRTUAL_INPUT_NAME) {
          WebMidi.removeListener();
          VIRTUAL_INPUT.closePort();
          done();
        }
      });

      // Assert
      WebMidi.enable();

    });

    it("should trigger 'connected' events for already connected outputs", function(done) {

      VIRTUAL_OUTPUT.openVirtualPort(VIRTUAL_OUTPUT_NAME);

      WebMidi.addListener("connected", e => {
        if (e.port.name === VIRTUAL_OUTPUT_NAME) {
          WebMidi.removeListener();
          VIRTUAL_OUTPUT.closePort();
          done();
        }
      });

      // Assert
      WebMidi.enable();

    });

    it("should enable sysex only if requested", function(done) {
      WebMidi.enable({sysex: true}).then(() => {
        expect(WebMidi.sysexEnabled).to.equal(true);
        done();
      });
    });

    it("should enable sysex only if requested (legacy)", function(done) {
      WebMidi.enable(function () {
        expect(WebMidi.sysexEnabled).to.equal(true);
        done();
      }, true);
    });

    it("should not enable sysex unless requested", function(done) {

      WebMidi.enable().then(() => {
        expect(WebMidi.sysexEnabled).to.equal(false);
        done();
      });

    });

    it("should not enable sysex unless requested (legacy)", function(done) {
      WebMidi.enable(function () {
        expect(WebMidi.sysexEnabled).to.equal(false);
        done();
      });
    });

    it("should continue to support the legacy properties", function(done) {

      WebMidi.enable(function () {

        if (WebMidi.supported) {
          expect(WebMidi.enabled).to.equal(true);
          expect(WebMidi.sysexEnabled).to.equal(true);
        } else {
          expect(WebMidi.enabled).to.equal(false);
        }

        done();

      }, true);

    });

    it("should dispatch 'enabled' event", function (done) {

      // Arrange
      this.timeout(10000);

      // Assert
      WebMidi.addListener("enabled", () => done());
      WebMidi.enable();

    });

    it("should dispatch 'interfaceready' event", function(done) {

      // Arrange
      WebMidi.addListener("interfaceready", () => done());

      // Act
      WebMidi.enable();

    });

  });

  describe("getInputById()", function() {

    beforeEach("Enable WebMidi", async function() {
      await WebMidi.enable({sysex: true});
    });

    it("should throw error if WebMidi is disabled", async function() {

      await WebMidi.disable();

      try {
        WebMidi.getInputById("test");
        return Promise.reject();
      } catch (err) {
        return Promise.resolve();
      }

    });

    it("should return false if no device is found", function() {
      expect(WebMidi.getInputById("0000000")).to.equal(false);
    });

    it("should return the right input", function() {

      if (WebMidi.inputs.length > 0) {
        let id = WebMidi.inputs[0].id;
        expect(WebMidi.getInputById(id)).to.equal(WebMidi.inputs[0]);
      } else {
        this.skip();
      }

    });

    it("should return an instance of 'Input' class", function() {

      if (WebMidi.inputs.length > 0) {
        expect(WebMidi.getInputById(WebMidi.inputs[0].id))
          .to.be.instanceOf(WebMidi.inputs[0].constructor);
      } else {
        this.skip();
      }

    });

    it("should return 'false' when invalid id is provided", function() {

      if (WebMidi.inputs.length > 0) {
        [null, undefined, "", [], {}].forEach(id => {
          expect(WebMidi.getInputById(id)).to.equal(false);
        });
      } else {
        this.skip();
      }

    });

  });

  describe("getInputByName()", function() {

    beforeEach("Enable WebMidi", async function() {
      await WebMidi.enable({sysex: true});
    });

    it("should throw error if WebMidi is disabled", async function() {

      await WebMidi.disable();

      try {
        WebMidi.getInputByName("test");
        return Promise.reject();
      } catch (err) {
        return Promise.resolve();
      }

    });

    it("should return false if no device is found", function() {
      expect(WebMidi.getInputByName("0000000")).to.equal(false);
    });

    it("should return the right input", function() {

      if (WebMidi.inputs.length > 0) {
        let name = WebMidi.inputs[0].name;
        expect(WebMidi.getInputByName(name).name).to.equal(name);
      } else {
        this.skip();
      }

    });

    it("should return instance of 'Input' class", function() {

      if (WebMidi.inputs.length > 0) {
        expect(WebMidi.getInputByName(WebMidi.inputs[WebMidi.inputs.length - 1].name))
          .to.be.instanceOf(WebMidi.inputs[WebMidi.inputs.length - 1].constructor);
      } else {
        this.skip();
      }

    });

    it("should return 'false' when an invalid name is provided", function() {

      if (WebMidi.inputs.length > 0) {
        [null, undefined, ""].forEach(name => {
          expect(WebMidi.getInputByName(name)).to.equal(false);
        });
      } else {
        this.skip();
      }

    });

  });

  describe("getOutputById()", function() {

    beforeEach("Enable WebMidi", async function() {
      await WebMidi.enable({sysex: true});
    });

    it("should throw error if WebMidi is disabled", async function() {

      await WebMidi.disable();

      try {
        WebMidi.getOutputById("test");
        return Promise.reject();
      } catch (err) {
        return Promise.resolve();
      }

    });

    it("should return false if no device is found", function() {
      expect(WebMidi.getOutputById("0000000")).to.equal(false);
    });

    it("should return the right output", function() {

      if (WebMidi.outputs.length > 0) {
        var id = WebMidi.outputs[0].id;
        expect(WebMidi.getOutputById(id)).to.equal(WebMidi.outputs[0]);
      } else {
        this.skip();
      }

    });

    it("should return an instance of the Output class", function() {

      if (WebMidi.outputs.length > 0) {
        expect(WebMidi.getOutputById(WebMidi.outputs[0].id))
          .to.be.instanceOf(WebMidi.outputs[0].constructor);
      } else {
        this.skip();
      }

    });

    it("should return 'false' when a weird id is provided", function() {

      if (WebMidi.inputs.length > 0) {
        [null, undefined, "", [], {}].forEach(id => {
          expect(WebMidi.getOutputById(id)).to.equal(false);
        });
      } else {
        this.skip();
      }

    });

  });

  describe("getOutputByName()", function() {

    beforeEach("Enable WebMidi", async function() {
      await WebMidi.enable({sysex: true});
    });

    it("should throw error if WebMidi is disabled", async function() {

      await WebMidi.disable();

      try {
        WebMidi.getOutputByName("test");
        return Promise.reject();
      } catch (err) {
        return Promise.resolve();
      }

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

    it("should return instance of Output class", function() {

      if (WebMidi.outputs.length > 0) {
        expect(WebMidi.getOutputByName(WebMidi.outputs[WebMidi.outputs.length - 1].name))
          .to.be.instanceOf(WebMidi.outputs[WebMidi.outputs.length - 1].constructor);
      } else {
        this.skip();
      }

    });

    it("should return 'false' when an invalid name is provided", function() {

      if (WebMidi.outputs.length > 0) {
        [null, undefined, ""].forEach(name => {
          expect(WebMidi.getOutputByName(name)).to.equal(false);
        });
      } else {
        this.skip();
      }

    });

  });

  describe("getOctave()", function() {

    it("should return false if number is invalid", function() {
      ["abc", null, undefined, -1, 128, () => {}, {}, "555", Infinity, -Infinity]
        .forEach(function (param) {
          expect(WebMidi.getOctave(param)).to.be.false;
        });
    });

    it("should return a signed integer", function() {
      for (let i = 0; i <= 127; i++) {
        let result = WebMidi.getOctave(i);
        expect(result % 1).to.be.equal(0);
      }
    });

    it("should place MIDI note number 60 (C4/middle C) at octave 4", function() {
      expect(WebMidi.getOctave(60)).to.be.equal(4);
    });

    it("should take into account desired 'octaveOffset' value", function() {
      WebMidi.octaveOffset = 2;
      expect(WebMidi.getOctave(60)).to.be.equal(6);
      WebMidi.octaveOffset = -4;
      expect(WebMidi.getOctave(60)).to.be.equal(0);
      WebMidi.octaveOffset = -11;
      expect(WebMidi.getOctave(60)).to.be.equal(-7);
      WebMidi.octaveOffset = 0;
    });

  });

  describe("getValidNoteArray()", function() {

    it("should throw error for invalid values", function() {

      // Arrange
      let values = ["abc", null, undefined, -1, 128, {}, "555", "H3", "Z#8", Infinity, -Infinity];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WebMidi.getValidNoteArray(value);
        }).to.throw();
      }

    });

    it("should pass on options to values that aren't 'Note' objects", function() {

      let options1 = {
        duration: 1000,
        attack: 1,
        release: 1
      };

      let notes1 = WebMidi.getValidNoteArray([60], options1);
      expect(notes1[0].duration).to.equal(1000);
      expect(notes1[0].attack).to.equal(1);
      expect(notes1[0].release).to.equal(1);

      let options2 = {
        attack: 0.1,
        release: 0.1,
        rawAttack: 127,
        rawRelease: 127,
      };

      let notes2 = WebMidi.getValidNoteArray([60], options2);
      expect(notes2[0].duration).to.equal(Infinity);
      expect(notes2[0].attack).to.equal(1);
      expect(notes2[0].release).to.equal(1);


    });

  });

  describe("guessNoteNumber()", function() {

    it("should return false if invalid input is provided", function() {

      [
        "abc", null, undefined, -1, 128, function () {}, {}, "555", "H3", "Z#8", Infinity, -Infinity
      ].forEach(function (param) {
        expect(WebMidi.guessNoteNumber(param)).to.be.false;
      });

    });

    it("should provide the correct value for numerical values", function() {

      for (var i = 0; i <= 127; i++) {
        expect(WebMidi.guessNoteNumber(i)).to.equal(i);
        expect(WebMidi.guessNoteNumber(i + "")).to.equal(i);
        expect(WebMidi.guessNoteNumber(i + 0.1)).to.equal(i);
        expect(WebMidi.guessNoteNumber(i + 0.5)).to.equal(Math.min(i, 127));
      }

    });

    it("should return matching number for strings containing valid numbers", function() {
      expect(WebMidi.guessNoteNumber("127")).to.equal(127);
      expect(WebMidi.guessNoteNumber("0")).to.equal(0);
      expect(WebMidi.guessNoteNumber("1")).to.equal(1);
    });

    it("should provide correct value for note names with varying octave offsets", function() {

      let value = 0;

      [-20, -15, -9, 0, 7, 13, 20].forEach(function (offset) {

        WebMidi.octaveOffset = offset;

        // Sharps
        for (var octave = -1 + offset; octave <= 9 + offset; octave++) {

          for (var k = 0; k < WebMidi.NOTES.length; k++) {
            if (value > 127) break;
            expect(WebMidi.guessNoteNumber(WebMidi.NOTES[k] + octave)).to.equal(value);
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

    it("should return false if note is outside range, given current octave offset", function() {

      WebMidi.octaveOffset = 0;

      expect(WebMidi.guessNoteNumber("C-2")).to.be.false;
      expect(WebMidi.guessNoteNumber("G#9")).to.be.false;
      expect(WebMidi.guessNoteNumber("C10")).to.be.false;

      WebMidi.octaveOffset = -1;

      expect(WebMidi.guessNoteNumber("C-3")).to.be.false;
      expect(WebMidi.guessNoteNumber("G#8")).to.be.false;
      expect(WebMidi.guessNoteNumber("C9")).to.be.false;

      WebMidi.octaveOffset = 0;

    });

  });

  describe("getNoteNumberByName()", function() {

    it("should return false if invalid input is provided", function() {

      [
        "", "abc", null, undefined, "G#9", "Cb-1", "X2", function () {}, {}, "555", "C-3",
        "Cbb-1/", "H3", "G##9"
      ].forEach(param => {
        expect(WebMidi.getNoteNumberByName(param)).to.be.false;
      });

    });

    it("should return the correct number given the current octave", function() {

      WebMidi.octaveOffset = 0;
      expect(WebMidi.getNoteNumberByName("C-1")).to.equal(0);
      expect(WebMidi.getNoteNumberByName("B-1")).to.equal(11);
      WebMidi.octaveOffset = -1;
      expect(WebMidi.getNoteNumberByName("C-1")).to.equal(12);
      expect(WebMidi.getNoteNumberByName("B-1")).to.equal(23);
      WebMidi.octaveOffset = -10;
      expect(WebMidi.getNoteNumberByName("C-1")).to.equal(120);
      expect(WebMidi.getNoteNumberByName("B-1")).to.be.false;
      WebMidi.octaveOffset = 0;

    });

  });

  describe("noteNameToNumber()", function() {

    it("should return the same as getNoteNumberByName()", function() {

      [
        "", "abc", null, undefined, "G#9", "Cb-1", "555", "C-3", "Cbb-1/", "H3", "G##9",
        "C6", "C-1", "G9"
      ].forEach(param => {
        expect(WebMidi.noteNameToNumber(param)).to.equal(WebMidi.getNoteNumberByName(param));
      });

    });

    it("should return the correct number given the current octave", function() {

      WebMidi.octaveOffset = 0;
      expect(WebMidi.getNoteNumberByName("C-1")).to.equal(0);
      expect(WebMidi.getNoteNumberByName("B-1")).to.equal(11);
      WebMidi.octaveOffset = -1;
      expect(WebMidi.getNoteNumberByName("C-1")).to.equal(12);
      expect(WebMidi.getNoteNumberByName("B-1")).to.equal(23);
      WebMidi.octaveOffset = -10;
      expect(WebMidi.getNoteNumberByName("C-1")).to.equal(120);
      expect(WebMidi.getNoteNumberByName("B-1")).to.be.false;
      WebMidi.octaveOffset = 0;

    });

  });

  describe("set octaveOffset()", function() {

    it("should be tested!");

  });

  describe("sanitizeChannels()", function() {

    it("should return only valid MIDI channel numbers", function() {

      // Valid values are 1, 8 and 16
      let channels = [
        1, -1, -2.3, 0, 17, "x", NaN, null, Infinity, 8, -Infinity, {}, true, false, [undefined],
        4e2, 16
      ];
      expect(WebMidi.sanitizeChannels(channels).length).to.equal(3);
      expect(WebMidi.sanitizeChannels([]).length).to.equal(0);
      expect(WebMidi.sanitizeChannels([9.7])[0]).to.equal(9);
      expect(WebMidi.sanitizeChannels([1e1])[0]).to.equal(10);
      expect(WebMidi.sanitizeChannels("none").length).to.equal(0);

    });

    it('should return all channels when "all" is specified', function() {
      expect(WebMidi.sanitizeChannels("all").length).to.equal(16);
    });

    it("should return an empty array when 'none' is passed", function() {
      expect(WebMidi.sanitizeChannels("none").length).to.equal(0);
    });

  });

  describe("toMIDIChannels()", function() {

    it("should return the same as sanitizeChannels()", function() {

      let values = [
        1, -1, -2.3, 0, 17, "x", NaN, null, Infinity, 8, -Infinity, true, false, [undefined],
        4e2, 16, 1, 16
      ];

      let a = WebMidi.toMIDIChannels(values);
      let b = WebMidi.sanitizeChannels(values);
      for (let i = 0; i <a.length; i++) expect(a[i]).to.equal(b[i]);

    });

  });

  describe("get MIDI_CHANNEL_VOICE_MESSAGES()", function() {
    it("should return an object with valid properties", function() {
      expect(WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.pitchbend).to.equal(0xE);
    });
  });

  describe("get MIDI_CHANNEL_MESSAGES()", function() {
    it("should return an object with valid properties", function() {
      expect(WebMidi.MIDI_CHANNEL_MESSAGES.pitchbend).to.equal(0xE);
    });
  });

  describe("get MIDI_REGISTERED_PARAMETER()", function() {
    it("should return an object with valid properties", function() {
      expect(WebMidi.MIDI_REGISTERED_PARAMETER.rollangle[0]).to.equal(0x3D);
      expect(WebMidi.MIDI_REGISTERED_PARAMETER.rollangle[1]).to.equal(0x08);
    });
  });

  describe("get MIDI_CONTROL_CHANGE_MESSAGES()", function() {
    it("should return an object with valid properties", function() {
      expect(WebMidi.MIDI_CONTROL_CHANGE_MESSAGES.registeredparameterfine).to.equal(101);
    });
  });

  describe("get MIDI_NRPN_MESSAGES()", function() {
    it("should return an object with valid properties", function() {
      expect(WebMidi.MIDI_NRPN_MESSAGES.nullactiveparameter).to.equal(127);
    });
  });

  describe("set octaveOffset()", function() {

    afterEach("Reset octave", function () {
      WebMidi.octaveOffset = 0;
    });

    it("should throw error for invalid values", function() {
      ["abc", null, undefined, () => {}, {}, Infinity, -Infinity].forEach(value => {
        expect(() => WebMidi.octaveOffset = value).to.throw(Error);
      });
    });

    it("should properly set the octave when the value is valid", function() {
      [-1, 9, "-1", "9"].forEach(value => {
        WebMidi.octaveOffset = value;
        expect(WebMidi._octaveOffset).to.equal(WebMidi.octaveOffset);
      });
    });

  });

});

