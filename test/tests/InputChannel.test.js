let WebMidiInput;

describe("InputChannel Object", function() {

  beforeEach("Check support and enable", async function () {
    await WebMidi.enable();
    WebMidiInput = WebMidi.getInputByName(config.input.name);
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  it.only("should dispatch event for standard MIDI events", function (done) {

    // Arrange
    let channel = WebMidiInput.channels[1];
    let events = [
      "noteoff",
      "noteon",
      // "keyaftertouch",
      // "controlchange",
      // "channelmode",
      // "programchange",
      // "channelaftertouch",
      // "pitchbend"
    ];
    let messages = [
      [0x80, 48, 87], // noteoff
      [0x90, 52, 64], // noteon
      // [0xA << 0],  // keyaftertouch
      // [0xB << 0],  // controlchange
      // [0xB << 0],  // channelmode
      // [0xB << 0],  // nrpn
      // [0xC << 0],  // programchange
      // [0xD << 0],  // channelaftertouch
      // [0xE << 0],  // pitchbend
    ];
    let index = 0;

    events.forEach(event => channel.addListener(event, assert));

    // Act
    messages.forEach(msg => config.input.port.sendMessage(msg));

    // Assert
    function assert(e) {
      console.log(e);
      let event = events[index];
      expect(e.type).to.equal(event);
      index++;
      if (index >= events.length) done();
    }

  });

  describe("destroy()", function () {

    it("should set input and channel number to null", function () {

      // Arrange
      let channel = WebMidiInput.channels[1];

      // Act
      channel.destroy();

      // Assert
      expect(channel.input).to.be.null;
      expect(channel.number).to.be.null;

    });

    it("should remove all listeners", function () {

      // Arrange
      let channel = WebMidiInput.channels[1];
      channel.addListener("test", () => {});

      // Act
      channel.destroy();

      // Assert
      expect(channel.hasListener()).to.be.false;

    });

  });

  describe("getChannelModeByNumber()", function () {

    it("should return string for valid channel mode numbers", function () {

      // Arrange
      let channel = WebMidiInput.channels[1];
      let results = [];

      // Act
      for (let cc in WebMidi.MIDI_CHANNEL_MODE_MESSAGES) {
        let number = WebMidi.MIDI_CHANNEL_MODE_MESSAGES[cc];
        results.push(channel.getChannelModeByNumber(number));
      }

      // Assert
      results.forEach(result => {
        expect(result).to.be.a("string");
      });

    });

    it("should return 'false' for numbers with no match", function () {

      // Arrange
      let channel = WebMidiInput.channels[1];
      let values = [
        -1,
        0,
        119,
        128
      ];
      let results = [];

      // Act
      values.forEach(value => {
        results.push(channel.getChannelModeByNumber(value));
      });

      // Assert
      results.forEach(result => {
        expect(result).to.be.false;
      });

    });

  });

  describe("getCcNameByNumber()", function () {

    it("should throw error for invalid control change numbers", function () {

      // Arrange
      let channel = WebMidiInput.channels[1];
      let values = [
        -1,
        // 120,
        // "test",
        // undefined,
        // NaN,
        // null
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          channel.getCcNameByNumber(value);
        }).to.throw(RangeError);
      }

    });

    it("should return string for valid control change numbers", function () {

      // Arrange
      let channel = WebMidiInput.channels[1];
      let results = [];

      // Act
      for (let cc in WebMidi.MIDI_CONTROL_CHANGE_MESSAGES) {
        let number = WebMidi.MIDI_CONTROL_CHANGE_MESSAGES[cc];
        results.push(channel.getCcNameByNumber(number));
      }

      // Assert
      results.forEach(result => {
        expect(result).to.be.a("string");
      });

    });

    it("should return 'false' for numbers with no predefined purpose", function () {

      // Arrange
      let channel = WebMidiInput.channels[1];
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
        results.push(channel.getCcNameByNumber(value));
      });

      // Assert
      results.forEach(result => {
        expect(result).to.be.false;
      });

    });

  });

});
