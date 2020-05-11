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

});
