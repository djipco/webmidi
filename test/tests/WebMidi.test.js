describe("WebMidi", function() {

  beforeEach("Check support", function () {
    if (!WebMidi.supported) {
      console.warn("The Web MIDI API is not supported in this environment.");
      this.skip();
    }
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  it("should not allow itself to be instantiated", function() {
    expect(function() {
      new WebMidi();
    }).to.throw(TypeError);
  });

  it("should not allow itself to be instantiated through 'constructor' property", function() {
    expect(function() {
      new WebMidi.constructor();
    }).to.throw(TypeError);
  });

  it("should remain extensible", function() {
    expect(Object.isExtensible(WebMidi)).to.be.true;
  });

  it("should have empty 'inputs' and 'outputs' arrays", function() {
    expect(WebMidi.inputs.length).to.equal(0);
    expect(WebMidi.outputs.length).to.equal(0);
  });

  it("should trigger 'enabled' event", async function () {

    // Ignore in browser
    if (!WebMidi.isNode) this.skip();

    return new Promise(async resolve => {
      WebMidi.addListener("enabled", async () => {
        await WebMidi.disable();
        resolve();
      });
      await WebMidi.enable();
    });

  });

  it("should trigger 'disabled' event", async function () {

    // Ignore in browser
    if (!WebMidi.isNode) this.skip();

    return new Promise(async resolve => {
      WebMidi.addListener("disabled", resolve);
      await WebMidi.enable();
      await WebMidi.disable();
    });

  });







  // it("should trigger 'connected' event for output ports", async function () {
  //
  //   // Ignore in browser
  //   if (!WebMidi.isNode) this.skip();
  //
  //   // We disconnect the external device's input port. From WebMidi's point of view, it is an output
  //   // port. As a matter of fact, it shows up here as "VIRTUAL MIDI-Out".
  //   inputPort.disconnect();
  //
  //   return new Promise(async (resolve, reject) => {
  //
  //     // WebMidi.addListener("connected", e => {
  //     //
  //     //   if (e.target.name === "VIRTUAL MIDI-Out") {
  //     //     // Had weird issues with "VIRTUAL MIDI-Out" sometimes not showing up... Seems fine now!
  //     //     // console.log(e.target.name, "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  //     //     resolve();
  //     //   }
  //     //
  //     // })
  //     //
  //     // try {
  //     //   await WebMidi.enable();
  //     //   await new Promise(resolve => setTimeout(resolve, 200));
  //     //   // inputPort.connect();
  //     // } catch (err) {
  //     //   reject();
  //     // }
  //
  //     try {
  //
  //       await WebMidi.enable();
  //
  //       WebMidi.addListener("connected", e => {
  //         if (e.target.name === "VIRTUAL MIDI-Out") {
  //           console.log(e.target.name, "XXXXXXXXXXXXXXXXXXX0000000000000000000XXXXXXXXXXXXXXXX");
  //           console.log(resolve);
  //           resolve();
  //         }
  //       });
  //
  //       inputPort.connect();
  //
  //     } catch (err) {
  //       reject(err);
  //     }
  //
  //
  //
  //   });
  //
  // });

  it("should trigger 'connected' event for output ports DOES NOT WORK!!!!!", function (done) {

    done();

    // // Ignore in browser
    // if (!WebMidi.isNode) this.skip();
    //
    // // We disconnect the external device's input port. From WebMidi's point of view, it is an output
    // // port. As a matter of fact, it shows up here as "VIRTUAL MIDI-Out".
    // inputPort.disconnect();
    //
    // WebMidi.enable()
    //   .then(function() {
    //
    //     // done(); // ici, ça marche!
    //
    //     WebMidi.addListener("connected", function(e) {
    //       if (e.target.name === "VIRTUAL MIDI-Out") {
    //         done(); // ici, ça marche pas.
    //         console.log(e.target.name, "XXXXXXXXXXXXXXXXXXX0000000000000000000XXXXXXXXXXXXXXXX");
    //       }
    //     });
    //
    //     inputPort.connect();
    //
    //   })
    //   .catch(err => done(err))

  });








  describe("disable()", function() {

    beforeEach("Enable WebMidi", function (done) {
      WebMidi.enable({sysex: true})
        .then(() => done())
        .catch(() => {});
    });

    afterEach("Make sure WebMidi is disabled when done", function (done) {
      WebMidi.disable()
        .then(() => done())
        .catch(() => {});
    });

    it("should set the 'enabled' property to false", function(done) {

      WebMidi.disable().then(() => {
        expect(WebMidi.enabled).to.equal(false);
        done();
      });

    });

    it("should set the 'sysexEnabled' property to false", function(done) {
      WebMidi.disable().then(() => {
        expect(WebMidi.sysexEnabled).to.equal(false);
        done();
      });
    });

    it("should trim 'input' and 'output' array lengths to 0", function(done) {
      WebMidi.disable().then(() => {
        expect(WebMidi.inputs.length).to.equal(0);
        expect(WebMidi.outputs.length).to.equal(0);
        done();
      });
    });

    it("should remove all user handlers", function(done) {

      WebMidi.addListener("connected", () => {});
      WebMidi.addListener("disconnected", () => {});
      WebMidi.addListener("enabled", () => {});
      WebMidi.addListener("disabled", () => {});

      WebMidi.disable().then(() => {
        expect(WebMidi.hasListener()).to.be.false;
        done();
      });

    });

    it("should set 'interface' to 'null'", function(done) {

      WebMidi.disable().then(() => {
        expect(WebMidi.interface).to.be.null;
        done();
      });
    });

    it("should throw error if Web MIDI API is not supported", function(done) {

      let backup = navigator.requestMIDIAccess;
      navigator.requestMIDIAccess = undefined;

      WebMidi.disable().catch(err => {
        expect(err).to.be.an("error");
        navigator.requestMIDIAccess = backup;
        WebMidi.disable().then(done);
      });

    });

    it("should fire 'disabled' event if successful", function(done) {
      WebMidi.addListener("disabled", () => done());
      WebMidi.disable();
    });

  });

  describe("enable()", function() {

    afterEach("Make sure WebMidi is disabled when done", function(done) {
      WebMidi.disable().then(() => done());
    });

    it("should pass error to callback upon failure", function(done) {

      let backup = navigator.requestMIDIAccess;
      navigator.requestMIDIAccess = undefined;

      WebMidi.enable({callback: err => {
          expect(err).to.be.an("error");
          done();
        }}).catch(() => {});

      navigator.requestMIDIAccess = backup;

    });

    it("should return a rejected promise upon failure", function(done) {

      let backup = navigator.requestMIDIAccess;
      navigator.requestMIDIAccess = undefined;

      WebMidi.enable().catch(err => {
        expect(err).to.be.an("error");
        done();
      });

      navigator.requestMIDIAccess = backup;

    });

    it("should return a resolved promise if already enabled", function(done) {

      WebMidi.enable().then(() => {
        WebMidi.enable().then(() => {
          done();
        });
      });

    });

    it("should set 'enabled' property to false if it fails", function(done) {

      let backup;

      if (navigator && navigator.requestMIDIAccess) {
        backup = navigator.requestMIDIAccess;
        navigator.requestMIDIAccess = () => Promise.reject(new Error("Simulated failure!"));
      }

      WebMidi.enable().catch(() => {
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

    it("should execute the callback if successful", function(done) {
      WebMidi.enable({callback: function () {
          done();
        }});
    });

    it("should return a promise if successful", function(done) {
      WebMidi.enable().then(() => done());
    });

    it("should enable sysex only if requested (for browsers with native MIDI)", function(done) {

      WebMidi.enable({sysex: true})
        .then(() => {

          if ( isNative(navigator.requestMIDIAccess) ) {
            expect(WebMidi.sysexEnabled).to.equal(true);
          } else {
            expect(WebMidi.sysexEnabled).to.be.oneOf([true, false]);
          }

          done();

        });

    });

    it("should not enable sysex unless requested (for browsers with native MIDI)", function(done) {

      WebMidi.enable(function () {

        if (isNative(navigator.requestMIDIAccess) ) {
          expect(WebMidi.sysexEnabled).to.equal(false);
        } else {
          expect(WebMidi.sysexEnabled).to.be.oneOf([true, false]);
        }

        done();

      }, false);

    });

    it("should continue to support the old syntax", function(done) {

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

    it("should fire 'enabled' event if successful", function(done) {
      WebMidi.addListener("enabled", () => done());
      WebMidi.enable();
    });

  });

  describe("getInputById()", function() {

    beforeEach("Enable WebMidi", function (done) {
      WebMidi.enable().then(() => done());
    });

    afterEach("Make sure WebMidi is disabled when done", function(done) {
      WebMidi.disable().then(() => done());
    });

    it("should throw error if WebMidi is disabled", function(done) {

      WebMidi.disable().then(() => {

        try {
          WebMidi.getInputById("test");
        } catch (err) {
          expect(err).to.be.an("error");
          done();
        }

      });

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

    it("should return an instance of the Input class", function() {

      if (WebMidi.inputs.length > 0) {
        expect(WebMidi.getInputById(WebMidi.inputs[0].id))
          .to.be.instanceOf(WebMidi.inputs[0].constructor);
      } else {
        this.skip();
      }

    });

    it("should return 'false' when a weird id is provided", function() {

      if (WebMidi.inputs.length > 0) {
        [null, undefined, "", [], {}].forEach(id => {
          expect(WebMidi.getInputById(id)).to.equal(false);
        });
      } else {
        this.skip();
      }

    });

  });

  describe("getOutputById()", function() {

    beforeEach("Enable WebMidi", function (done) {
      WebMidi.enable().then(() => done());
    });

    afterEach("Make sure WebMidi is disabled when done", function(done) {
      WebMidi.disable().then(() => done());
    });

    it("should throw error if WebMidi is disabled", function(done) {

      WebMidi.disable().then(() => {

        try {
          WebMidi.getOutputById("test");
        } catch (err) {
          expect(err).to.be.an("error");
          done();
        }

      });

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

  describe("getInputByName()", function() {

    beforeEach("Enable WebMidi", function (done) {
      WebMidi.enable().then(() => done());
    });

    it("should throw error if WebMidi is disabled", function(done) {

      WebMidi.disable().then(() => {

        try {
          WebMidi.getInputByName("test");
        } catch (err) {
          expect(err).to.be.an("error");
          done();
        }

      });

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

    it("should return instance of Input class", function() {

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

  describe("getOutputByName()", function() {

    beforeEach("Enable WebMidi", function (done) {
      WebMidi.enable().then(() => done());
    });

    afterEach("Make sure WebMidi is disabled when done", function(done) {
      WebMidi.disable().then(() => done());
    });

    it("should throw error if WebMidi is disabled", function(done) {

      WebMidi.disable().then(() => {

        try {
          WebMidi.getOutputByName("test");
        } catch (err) {
          expect(err).to.be.an("error");
          done();
        }

      });

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

    beforeEach("Enable WebMidi", function (done) {
      WebMidi.enable().then(() => done());
    });

    afterEach("Make sure WebMidi is disabled when done", function(done) {
      WebMidi.disable().then(() => done());
    });

    it("should return undefined if number is invalid", function() {
      ["abc", null, undefined, -1, 128, () => {}, {}, "555"].forEach(function (param) {
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

  describe("guessNoteNumber()", function() {

    it("should return false if invalid input is provided", function() {

      [
        "abc", null, undefined, -1, 128, function () {}, {}, "555", "H3", "Z#8"
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

});

