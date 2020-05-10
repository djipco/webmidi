let WebMidiOutput;

describe("Output Object", function() {

  beforeEach("Check support and enable", async function () {
    if (!WebMidi.supported) {
      console.warn("The Web MIDI API is not supported in this environment.");
      this.skip();
    }
    await WebMidi.enable();
    WebMidiOutput = WebMidi.getOutputByName(config.output.name);
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  describe("clear()", function () {
    it("should return 'Output' object for chaining", function() {
      expect(WebMidiOutput.clear()).to.equal(WebMidiOutput);
    });
  });

  describe("close()", function () {

    it("should close connection", function() {
      WebMidiOutput.close();
      expect(WebMidiOutput.connection).to.equal("closed");
    });

  });

  describe("decrementRegisteredParameter()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "decrementRegisteredParameter"));
      });

      WebMidiOutput.decrementRegisteredParameter(
        "pitchbendrange",
        valid.concat(invalid),
        options
      );

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly("pitchbendrange", options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the 'Output' object for method chaining", function() {
      expect(
        WebMidiOutput.decrementRegisteredParameter("pitchbendrange")
      ).to.equal(WebMidiOutput);
    });

  });

  describe("destroy()", function () {

    it("should destroy the 'Output'", async function() {

      await WebMidiOutput.destroy();

      try {
        WebMidiOutput.name;
      } catch (e) {
        await Promise.resolve();
      }

      if (WebMidiOutput.channels.length !== 0) await Promise.reject();
      if (WebMidiOutput.hasListener() === true) await Promise.reject();

    });

  });

  describe("incrementRegisteredParameter()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "incrementRegisteredParameter"));
      });

      WebMidiOutput.incrementRegisteredParameter(
        "pitchbendrange",
        valid.concat(invalid),
        options
      );

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly("pitchbendrange", options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the 'Output' object for method chaining", function() {
      expect(
        WebMidiOutput.decrementRegisteredParameter("pitchbendrange")
      ).to.equal(WebMidiOutput);
    });

    it("should throw error if registered parameter is invalid", function() {

      expect(function () {
        WebMidiOutput.incrementRegisteredParameter("xxx", [1]);
      }).to.throw(Error);

      expect(function () {
        WebMidiOutput.incrementRegisteredParameter([], [1]);
      }).to.throw(Error);

    });

  });

  describe("open()", function () {

    it("should open connection", async function() {
      await WebMidiOutput.close();
      await WebMidiOutput.open();
      expect(WebMidiOutput.connection).to.equal("open");
    });

  });

  describe("playNote()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "playNote"));
      });

      WebMidiOutput.playNote(60, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.playNote(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("resetAllControllers()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "resetAllControllers"));
      });

      WebMidiOutput.resetAllControllers(valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.resetAllControllers(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("send()", function () {

    it("should throw error if status byte is invalid", function() {

      ["xxx", [], NaN, 127, 256, undefined, null, -1, 0, {}].forEach(param => {
        expect(() => {
          WebMidiOutput.send(param);
        }).to.throw(TypeError);
      });

    });

    it("should throw error if data bytes are invalid", function() {

      ["xxx", -1, 256, NaN, null, Infinity].forEach(param => {
        expect(() => {
          WebMidiOutput.send(64, param);
        }).to.throw(TypeError);
      });

    });

    it("should throw error if message is incomplete", function() {

      [0x80, 0x90, 0xA0].forEach(param => {
        expect(() => {
          WebMidiOutput.send(param, []);
        }).to.throw(TypeError);
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.send(144, [64, 64])
      ).to.equal(WebMidiOutput);
    });

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 0x90 && message[1] === 60 && message[2] === 127) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on, channel 0 (144), note number (60), velocity (127)
      WebMidiOutput.send(0x90, [60, 127]);

    });

  });

  describe("sendActiveSensing()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 254) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (254)
      WebMidiOutput.sendActiveSensing();

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendActiveSensing(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendChannelAftertouch()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setChannelAftertouch"));
      });

      WebMidiOutput.sendChannelAftertouch(0.5, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(0.5, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendChannelAftertouch(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendChannelMode()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "sendChannelMode"));
      });

      WebMidiOutput.sendChannelMode("allnotesoff", 42, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly("allnotesoff", 42, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendChannelMode("allnotesoff", 42, [1])
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendClock()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 248) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (248)
      WebMidiOutput.sendClock();

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendClock()
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendContinue()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 251) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (251)
      WebMidiOutput.sendContinue();

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendContinue()
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendControlChange()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "sendControlChange"));
      });

      WebMidiOutput.sendControlChange(60, 64, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, 64, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendControlChange(60, 64, [1])
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendKeyAftertouch()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setKeyAftertouch"));
      });

      WebMidiOutput.sendKeyAftertouch(60, valid.concat(invalid), 0.5, options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, 0.5, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendKeyAftertouch(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendNoteOff()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "sendNoteOff"));
      });

      WebMidiOutput.sendNoteOff(60, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendNoteOff(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendNoteOn()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "sendNoteOn"));
      });

      WebMidiOutput.sendNoteOn(60, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendNoteOn(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendPitchBend()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setPitchBend"));
      });

      WebMidiOutput.sendPitchBend(0.5, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(0.5, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendPitchBend(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendProgramChange()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setProgram"));
      });

      WebMidiOutput.sendProgramChange(60, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendProgramChange(64, [1])
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendReset()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 255) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (255)
      WebMidiOutput.sendReset();

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendReset(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendSongPosition()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 242) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (242)
      WebMidiOutput.sendSongPosition();

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendSongPosition(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendSongSelect()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 243) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (243)
      WebMidiOutput.sendSongSelect(42);

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendSongSelect(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendStart()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 250) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (250)
      WebMidiOutput.sendStart();

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendStart(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendStop()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 252) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (252)
      WebMidiOutput.sendStop();

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendStop(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendSysex()", function () {

    it("should throw error if 'sysex' was not enabled", function() {
      expect(() => {
        WebMidiOutput.sendSysex(66, [1, 2, 3, 4, 5]);
      }).to.throw();
    });

    it("should actually send the message", async function() {

      await WebMidi.disable();
      await WebMidi.enable({sysex: true});
      WebMidiOutput = WebMidi.getOutputByName(config.output.name);

      await new Promise(resolve => {

        config.output.port.on("message", (deltaTime, message) => {

          if (
            message[0] === 240 &&
            message[1] === 0x42 &&
            message[2] === 0x1 &&
            message[3] === 0x2 &&
            message[4] === 0x3 &&
            message[5] === 247
          ) {
            config.output.port.removeAllListeners();
            resolve();
          }

        });

        // Sysex (240...247)
        WebMidiOutput.sendSysex(0x42, [0x1, 0x2, 0x3]);

      });


    });

    it("should return the Output object for method chaining", async function() {
      await WebMidi.disable();
      await WebMidi.enable({sysex: true});
      WebMidiOutput = WebMidi.getOutputByName(config.output.name);
      expect(
        WebMidiOutput.sendSysex(66, [1, 2, 3, 4, 5])
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendTimecodeQuarterFrame()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 241 && message[1] === 42) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (251)
      WebMidiOutput.sendTimecodeQuarterFrame(42);

    });

    it("should throw error on invalid data", function() {

      [255, 9999999, undefined, null, [], {}].forEach(value => {
        expect(() => {
          WebMidiOutput.sendTimecodeQuarterFrame(value);
        }).to.throw(TypeError);
      });


    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendTimecodeQuarterFrame(0)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendTuneRequest()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 246) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (246)
      WebMidiOutput.sendTuneRequest();

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendTuneRequest()
      ).to.equal(WebMidiOutput);
    });

  });

  describe("sendTuningRequest()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 246) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (246)
      WebMidiOutput.sendTuningRequest();

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendTuningRequest()
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setChannelAftertouch()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setChannelAftertouch"));
      });

      WebMidiOutput.setChannelAftertouch(0.5, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(0.5, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setChannelAftertouch(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setKeyAftertouch()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setKeyAftertouch"));
      });

      WebMidiOutput.setKeyAftertouch(60, 0.5, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, 0.5, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setKeyAftertouch(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setLocalControl()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setLocalControl"));
      });

      WebMidiOutput.setLocalControl(true, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(true, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setLocalControl(true)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setMasterTuning()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setMasterTuning"));
      });

      WebMidiOutput.setMasterTuning(42, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(42, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setMasterTuning(true)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setModulationRange()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setModulationRange"));
      });

      WebMidiOutput.setModulationRange(42, 24, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(42, 24, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setModulationRange(true)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setNonRegisteredParameter()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setNonRegisteredParameter"));
      });

      WebMidiOutput.setNonRegisteredParameter([2, 63], [0, 10], valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly([2, 63], [0, 10], options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setNonRegisteredParameter([2, 63], [0, 10], 1)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setOmniMode()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setOmniMode"));
      });

      WebMidiOutput.setOmniMode(true, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(true, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setOmniMode(true)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setProgram()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setProgram"));
      });

      WebMidiOutput.setProgram(60, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendProgramChange(64, [1])
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setPitchBend()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setPitchBend"));
      });

      WebMidiOutput.setPitchBend(0.5, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(0.5, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setPitchBend(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setPitchBendRange()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setPitchBendRange"));
      });

      WebMidiOutput.setPitchBendRange(42, 24, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(42, 24, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setPitchBendRange(42, 24)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setPolyphonicMode()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setPolyphonicMode"));
      });

      WebMidiOutput.setPolyphonicMode("mono", valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly("mono", options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setPolyphonicMode("mono")
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setProgram()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setProgram"));
      });

      WebMidiOutput.setProgram(42, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(42, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setProgram(42)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setRegisteredParameter()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setRegisteredParameter"));
      });

      WebMidiOutput.setRegisteredParameter("modulationrange", 42, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly("modulationrange", 42, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setRegisteredParameter("modulationrange", 42)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setSong()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 243) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (243)
      WebMidiOutput.setSong(42);

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setSong(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setSongPosition()", function () {

    it("should actually send the message", function(done) {

      config.output.port.on("message", (deltaTime, message) => {
        if (message[0] === 242) {
          config.output.port.removeAllListeners();
          done();
        }
      });

      // Note on (242)
      WebMidiOutput.setSongPosition();

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.sendActiveSensing(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setTuningBank()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setTuningBank"));
      });

      WebMidiOutput.setTuningBank(60, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setTuningBank(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("setTuningProgram()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "setTuningProgram"));
      });

      WebMidiOutput.setTuningProgram(60, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.setTuningProgram(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("stopNote()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "stopNote"));
      });

      WebMidiOutput.stopNote(60, valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(60, options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.stopNote(64)
      ).to.equal(WebMidiOutput);
    });

  });

  describe("turnNotesOff()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "turnNotesOff"));
      });

      WebMidiOutput.turnNotesOff(valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.turnNotesOff()
      ).to.equal(WebMidiOutput);
    });

  });

  describe("turnSoundOff()", function () {

    it("should trigger the channel method for all valid channels", function() {

      let spies = [];
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, NaN, -1, "", Infinity, -Infinity];
      let options = {time: 123};

      WebMidiOutput.channels.forEach(ch => {
        spies.push(sinon.spy(ch, "turnSoundOff"));
      });

      WebMidiOutput.turnSoundOff(valid.concat(invalid), options);

      spies.forEach(spy => {
        expect(spy.calledOnceWithExactly(options)).to.be.true;
        spy.restore();
      });

    });

    it("should return the Output object for method chaining", function() {
      expect(
        WebMidiOutput.turnSoundOff()
      ).to.equal(WebMidiOutput);
    });

  });

});
