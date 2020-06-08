describe("OutputChannel Object", function() {

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

  describe("getCcNameByNumber()", function () {

    it("should throw error for invalid control change numbers", function () {

      // Arrange
      let values = [-1, 120, "test", undefined, NaN, null];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          WebMidiInput.getCcNameByNumber(value);
        }).to.throw(RangeError);
      }

    });

    it("should return string for valid control change numbers", function () {

      // Arrange
      let results = [];

      // Act
      for (let cc in WebMidi.MIDI_CONTROL_CHANGE_MESSAGES) {
        let number = WebMidi.MIDI_CONTROL_CHANGE_MESSAGES[cc];
        results.push(WebMidiInput.getCcNameByNumber(number));
      }

      // Assert
      results.forEach(result => {
        expect(result).to.be.a("string");
      });

    });

    it("should return 'false' for numbers with no predefined purpose", function () {

      // Arrange
      let values = [
        3, 9,
        14, 15,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31,
        85, 86, 87, 89, 90,
        102, 103, 104, 105, 106, 107, 108, 109,
        110, 111, 112, 113, 114, 115, 116, 117, 118, 119
      ];
      let results = [];

      // Act
      values.forEach(value => {
        results.push(WebMidiInput.getCcNameByNumber(value));
      });

      // Assert
      results.forEach(result => {
        expect(result).to.be.false;
      });

    });

  });

});
