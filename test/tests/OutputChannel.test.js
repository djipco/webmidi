describe("Output", function() {

  beforeEach("Check support and enable", async function () {
    if (!WebMidi.supported) {
      console.warn("The Web MIDI API is not supported in this environment.");
      this.skip();
    }
    await WebMidi.enable();
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  describe("decrementRegisteredParameter()", function () {

    it("should throw error if registered parameter is invalid", function () {

      expect(function () {
        WebMidi.outputs[0].decrementRegisteredParameter(0);
      }).to.throw(TypeError);

      expect(function () {
        WebMidi.outputs[0].decrementRegisteredParameter("xxx");
      }).to.throw(TypeError);

    });

    // it("should call send the right amount of times", function() {
    //
    //   var spy = sinon.spy(WebMidi.outputs[0], "send");
    //
    //   // expect(function () {
    //     WebMidi.outputs[0].decrementRegisteredParameter("pitchbendrange", 1);
    //   // }).to.throw(RangeError);
    //
    //   expect(spy.callCount).to.equal(2);
    //   spy.restore(WebMidi, "send");
    //
    // });

    it("should return the Output object for method chaining", function () {
      expect(
        WebMidi.outputs[0].decrementRegisteredParameter("pitchbendrange")
      ).to.equal(WebMidi.outputs[0]);
    });

    // it("should throw error if options.time is invalid", function(done) {
    //
    // });

  });

});
