let WebMidiOutputChannel;

describe("OutputChannel Object", function() {

  beforeEach("Check support and enable", async function () {
    if (!WebMidi.supported) {
      console.warn("The Web MIDI API is not supported in this environment.");
      this.skip();
    }
    await WebMidi.enable();
    WebMidiOutputChannel = WebMidi.getOutputByName(config.output.name).channels[1];
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  describe("decrementRegisteredParameter()", function () {

    it("should throw error if registered parameter, specified by name, is invalid", function () {

      expect(() => {
        WebMidiOutputChannel.decrementRegisteredParameter("xxx");
      }).to.throw(TypeError);

    });

    it("should throw error if registered parameter, specified by array, is invalid", function () {

      [[], [-1, -1], [0x3d, 1111]].forEach(value => {

        expect(() => {
          WebMidiOutputChannel.decrementRegisteredParameter(value);
        }).to.throw();

      });

    });

    it("should actually send the messages", function(done) {

      let messages = [];

      config.output.port.on("message", (deltaTime, message) => {

        messages.push(message);

        if (messages.length >= 5) {

          config.output.port.removeAllListeners();

          expect(messages[0]).to.include.members([176, 101, 0]);    // select rpn
          expect(messages[1]).to.include.members([176, 100, 5]);    // select rpn
          expect(messages[2]).to.include.members([176, 97, 0]);     // decrement
          expect(messages[3]).to.include.members([176, 101, 127]);  // deselect rpn
          expect(messages[4]).to.include.members([176, 100, 127]);  // deselect rpn

          done();

        }

      });

      WebMidiOutputChannel.decrementRegisteredParameter("modulationrange");

    });

    it("should return the 'OutputChannel' object for method chaining", function () {
      expect(
        WebMidiOutputChannel.decrementRegisteredParameter("pitchbendrange")
      ).to.equal(WebMidiOutputChannel);
    });

  });

  describe("destroy()", function () {

    it("should set the output to null", function () {
      WebMidiOutputChannel.destroy();
      expect(WebMidiOutputChannel.output).to.be.null;
    });

    it("should remove all listeners", function () {
      let f1 = () => {};
      WebMidiOutputChannel.addListener("test", f1);
      WebMidiOutputChannel.destroy();
      expect(WebMidiOutputChannel.hasListener("test", f1)).to.be.false;
    });

  });

  describe("incrementRegisteredParameter()", function () {

    it("should throw error if registered parameter, specified by name, is invalid", function () {

      expect(() => {
        WebMidiOutputChannel.incrementRegisteredParameter("xxx");
      }).to.throw(TypeError);

    });

    it("should throw error if registered parameter, specified by array, is invalid", function () {

      [[], [-1, -1], [0x3d, 1111]].forEach(value => {

        expect(() => {
          WebMidiOutputChannel.incrementRegisteredParameter(value);
        }).to.throw();

      });

    });

    it("should actually send the messages", function(done) {

      let messages = [];

      config.output.port.on("message", (deltaTime, message) => {

        messages.push(message);

        if (messages.length >= 5) {

          config.output.port.removeAllListeners();

          expect(messages[0]).to.include.members([176, 101, 0]);    // select rpn
          expect(messages[1]).to.include.members([176, 100, 5]);    // select rpn
          expect(messages[2]).to.include.members([176, 96, 0]);     // increment
          expect(messages[3]).to.include.members([176, 101, 127]);  // deselect rpn
          expect(messages[4]).to.include.members([176, 100, 127]);  // deselect rpn

          done();

        }

      });

      WebMidiOutputChannel.incrementRegisteredParameter("modulationrange");

    });

    it("should return the 'OutputChannel' object for method chaining", function () {
      expect(
        WebMidiOutputChannel.incrementRegisteredParameter("pitchbendrange")
      ).to.equal(WebMidiOutputChannel);
    });

  });

  describe("playNote()", function () {

    it("should call the 'sendNoteOn' method", function () {

      // Arrange
      let spy = sinon.spy(WebMidiOutputChannel, "sendNoteOn");

      // Act
      WebMidiOutputChannel.playNote("G5");

      // Assert
      expect(spy.calledOnce).to.be.true;

    });

    it("should call the 'sendNoteOff' method if duration is valid", function () {

      // Arrange
      let spy = sinon.spy(WebMidiOutputChannel, "sendNoteOff");
      let invalid = [undefined, null, "", NaN, Infinity, -Infinity, -1];

      // Act
      WebMidiOutputChannel.playNote("C3", {duration: 123});
      invalid.forEach(value => WebMidiOutputChannel.playNote("C3", {duration: value}));

      // Assert
      expect(spy.calledOnce).to.be.true;

    });

    it("should return the 'OutputChannel' object for method chaining", function () {
      expect(
        WebMidiOutputChannel.playNote("C3")
      ).to.equal(WebMidiOutputChannel);
    });

  });

  describe("resetAllControllers()", function () {

    it("should call the 'sendChannelMode' method", function () {

      // Arrange
      let spy = sinon.spy(WebMidiOutputChannel, "sendChannelMode");
      let options = {};

      // Act
      WebMidiOutputChannel.resetAllControllers(options);

      // Assert
      expect(spy.calledOnceWithExactly("resetallcontrollers", 0, options)).to.be.true;

    });

    it("should return the 'OutputChannel' object for method chaining", function () {
      expect(
        WebMidiOutputChannel.resetAllControllers()
      ).to.equal(WebMidiOutputChannel);
    });

  });

  describe("send()", function () {

    it("should actually send the MIDI message", function (done) {

      let status = 144;
      let data = [10, 0];

      config.output.port.on("message", (deltaTime, message) => {

        config.output.port.removeAllListeners();

        expect(message[0]).to.equal(status);
        expect(message[1]).to.equal(data[0]);
        expect(message[2]).to.equal(data[1]);

        done();

      });

      WebMidiOutputChannel.send(status, data);

    });

    it("should schedule the message according to the timestamp", function (done) {

      // Arrange
      let status = 144;
      let data = [12, 0];
      let target = WebMidi.time + 100;

      config.output.port.on("message", (deltaTime, message) => {

        if (message[0] === status && message[1] === data[0] && message[2] === data[1]) {
          config.output.port.removeAllListeners();
          expect(WebMidi.time - target).to.be.within(-2, 8);
          done();
        }

      });

      // Act
      WebMidiOutputChannel.send(status, data, target);

    });

    it("should send immediately if no valid future timestamp is found", function (done) {

      // Arrange
      let status = 144;
      let data = [13, 0];
      let sent = WebMidi.time;
      let timestamps = [-1, 0, -Infinity, undefined, null, WebMidi.time, NaN];
      let index = 0;


      config.output.port.on("message", (deltaTime, message) => {

        if (message[0] === status && message[1] === data[0] && message[2] === data[1]) {

          expect(WebMidi.time - sent).to.be.within(0, 5);
          index++;

          if (index === timestamps.length) {
            config.output.port.removeAllListeners();
            done();
          }

        }

      });

      // Act
      timestamps.forEach(stamp => WebMidiOutputChannel.send(status, data, stamp));

    });

    it("should return the 'OutputChannel' object for method chaining", function () {
      expect(
        WebMidiOutputChannel.send(144, [127, 127])
      ).to.equal(WebMidiOutputChannel);
    });

  });

});


// it("should actually send the messages", function(done) {
//
//   config.output.port.on("message", (deltaTime, message) => {
//     console.log(message);
//     if (message[0] === 243) {
//       config.output.port.removeAllListeners();
//       done();
//     }
//   });
//
//   WebMidiOutputChannel.resetAllControllers();
//
// });
