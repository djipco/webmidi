const expect = require("chai").expect;
const {WebMidi, Utilities} = require("../dist/cjs/webmidi.cjs.js");
const midi = require("midi");
const semver = require("semver");

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

  it("should report valid version", function() {
    expect(semver.valid(WebMidi.version)).to.not.be.null;
  });

  it("should report valid flavour", function() {
    expect(WebMidi.flavour).to.equal("cjs");
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

    it("should return a promise fulfilled with the WebMidi objectif successful", function(done) {
      WebMidi.enable().then(wm => {
        expect(wm).to.equal(WebMidi);
        done();
      });
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

    it("should dispatch 'midiaccessgranted' event", function(done) {

      // Arrange
      WebMidi.addListener("midiaccessgranted", () => done());

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

    it("should return undefined if no device is found", function() {
      expect(WebMidi.getInputById("0000000")).to.equal(undefined);
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

    it("should return 'undefined' when invalid id is provided", function() {

      if (WebMidi.inputs.length > 0) {
        [null, undefined, "", [], {}].forEach(id => {
          expect(WebMidi.getInputById(id)).to.equal(undefined);
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

    it("should return undefined if no device is found", function() {
      expect(WebMidi.getInputByName("0000000")).to.equal(undefined);
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

    it("should return 'undefined' when an invalid name is provided", function() {

      if (WebMidi.inputs.length > 0) {
        [null, undefined, ""].forEach(name => {
          expect(WebMidi.getInputByName(name)).to.equal(undefined);
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

    it("should return undefined if no device is found", function() {
      expect(WebMidi.getOutputById("0000000")).to.equal(undefined);
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

    it("should return 'undefined' when a weird id is provided", function() {

      if (WebMidi.inputs.length > 0) {
        [null, undefined, "", [], {}].forEach(id => {
          expect(WebMidi.getOutputById(id)).to.equal(undefined);
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

    it("should return undefined if no device is found", function() {
      expect(WebMidi.getOutputByName("0000000")).to.equal(undefined);
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

    it("should return 'undefined' when an invalid name is provided", function() {

      if (WebMidi.outputs.length > 0) {
        [null, undefined, ""].forEach(name => {
          expect(WebMidi.getOutputByName(name)).to.equal(undefined);
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
      WebMidi.octaveOffset = 0;
    });

  });

  describe("noteNameToNumber()", function() {

    it("should return the same as Utilities.toNoteNumber()", function() {

      // Arrange
      const items = [
        "C-1",
        "Cb4",
        "C4",
        "C#4",
        "G9"
      ];

      // Act
      items.forEach(param => {
        expect(WebMidi.noteNameToNumber(param)).to.equal(Utilities.toNoteNumber(param));
      });

    });

    it("should return the correct number given the current octave", function() {

      expect(Utilities.toNoteNumber("C-1", 0)).to.equal(0);
      expect(Utilities.toNoteNumber("C-1", 1)).to.equal(12);
      expect(Utilities.toNoteNumber("C4", 0)).to.equal(60);
      expect(Utilities.toNoteNumber("C4", -1)).to.equal(48);
      expect(Utilities.toNoteNumber("C4", 1)).to.equal(72);
      expect(Utilities.toNoteNumber("G8", 1)).to.equal(127);

    });

  });

  describe("set octaveOffset()", function() {

    it("should be tested!");

  });

  describe("toMIDIChannels()", function() {

    it("should return the same as sanitizeChannels()", function() {

      let values = [
        1, -1, -2.3, 0, 17, "x", NaN, null, Infinity, 8, -Infinity, true, false, [undefined],
        4e2, 16, 1, 16
      ];

      let a = WebMidi.toMIDIChannels(values);
      let b = Utilities.sanitizeChannels(values);
      for (let i = 0; i <a.length; i++) expect(a[i]).to.equal(b[i]);

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

