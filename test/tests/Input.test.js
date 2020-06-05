let WebMidiInput;

describe("Input Object", function() {

  beforeEach("Check support and enable WebMidi.js", async function () {
    if (!WebMidi.supported) {
      console.warn("The Web MIDI API is not supported in this environment.");
      this.skip();
    }
    await WebMidi.enable();
    WebMidiInput = WebMidi.getInputByName(config.input.name);
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  describe("addListener()", function() {

    it("should add listeners to all specified channels", function() {

      // Arrange
      let l1 = () => {};
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let event = "noteon";

      // Act
      WebMidiInput.addListener(event, channels, l1);

      // Assert
      WebMidiInput.channels.forEach(ch => {
        expect(ch.hasListener(event, l1)).to.be.true;
      });

    });

    it("should add listeners for system (input-wide) messages", function() {

      // Arrange
      let l1 = () => {};

      // Act
      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(key => {
        WebMidiInput.addListener(key, undefined, l1);
      });

      // Assert
      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(key => {
        expect(WebMidiInput.hasListener(key, l1)).to.be.true;
      });

    });

    it("should throw error for invalid event types", function() {

      // Arrange
      let values = [undefined, null, "", NaN, [], {}, 0];
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

      //  Act
      values.forEach(assert);

      // Assert
      function assert(event) {
        expect(() => {
          WebMidiInput.addListener(event, channels, () => {});
        }).to.throw(TypeError);
      }

    });

    it("should return array of 'Listener' objects (of length 1) for system messages", function() {

      // Arrange
      let callbacks = [];
      let listeners = [];

      // Act
      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(function(key, index) {
        callbacks[index] = () => {};
        listeners[index] = WebMidiInput.addListener(key, undefined, callbacks[index]);
      });

      // Assert
      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(function(key, index) {
        expect(listeners[index].length).to.equal(1);
        expect(listeners[index][0].callback === callbacks[index]).to.be.true;
      });

    });

    it("should return an array of 'Listener' objects for channel messages", function() {

      // Arrange
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let callbacks = [];
      let listeners = [];

      Object.keys(WebMidi.MIDI_CHANNEL_VOICE_MESSAGES).forEach((key, index) => {
        callbacks[index] = () => {};
        listeners[index] = WebMidiInput.addListener(key, channels, callbacks[index]);
      });

      Object.keys(WebMidi.MIDI_CHANNEL_VOICE_MESSAGES).forEach((key, index) => {
        expect(listeners[index].length).to.equal(channels.length);
        expect(listeners[index][0].callback === callbacks[index]).to.be.true;
      });

    });

    it("should throw error if channels are specified but listener is not a function", function() {

      // Arrange
      let event = "noteon";
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

      expect(() => {
        WebMidiInput.addListener(event, channels);
      }).to.throw(TypeError);

    });

    it("should ignore invalid channels", function() {

      // Arrange
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, "", NaN, [], {}, 0];
      let channels = valid.concat(invalid);

      // Act
      let listeners = WebMidiInput.addListener("noteon", channels, () => {});

      // Assert
      expect(listeners.length).to.equal(valid.length);

    });

  });

  describe("addOneTimeListener()", function() {

    it("should properly call 'addListener()' with appropriate parameters", function () {

      // Arrange
      let spy = sinon.spy(WebMidiInput.channels[1], "addListener");
      let event = "noteon";
      let channel = 1;
      let context = {};
      let params = [1, 2, 3];
      let listener = () => {
      };
      let options = {
        context: context,
        prepend: true,
        duration: 1000,
        arguments: params
      };

      // Act
      WebMidiInput.addOneTimeListener(event, channel, listener, options);

      // Assert
      let args = spy.args[0];
      expect(args[0]).to.equal(event);
      expect(args[1]).to.equal(listener);
      expect(args[2].context).to.equal(context);
      expect(args[2].prepend).to.equal(options.prepend);
      expect(args[2].duration).to.equal(options.duration);
      expect(args[2].arguments).to.equal(options.arguments);
      expect(args[2].remaining).to.equal(1);

    });

    it("should call 'addListener()' for all specified channels", function () {

      // Arrange
      let event = "noteon";
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let listener = () => {};
      let spies = [];

      // Act
      channels.forEach(ch => {
        spies.push(sinon.spy(WebMidiInput.channels[ch], "addListener"));
      });

      WebMidiInput.addOneTimeListener(event, channels, listener);

      // Assert
      spies.forEach(spy => {
        expect(spy.args[0][2].remaining).to.equal(1);
        expect(spy.calledOnce).to.be.true;
      });

    });

  });

  describe("constructor()", function() {

    it("should set up all 'InputChannel' objects", function() {

      expect(WebMidiInput.channels.length).to.equal(16+1);

      for (let i = 1; i <= 16; i++) {
        expect(WebMidiInput.channels[i].number).to.equal(i);
      }

    });

  });

  describe("close()", function() {

    it("should close the port", async function () {

      // Act
      await WebMidiInput.close();

      // Assert
      expect(WebMidiInput.connection).to.equal("closed");

    });

  });

  describe("destroy()", function() {

    it("should destroy the 'Input'", async function() {

      // Act
      await WebMidiInput.destroy();

      // Assert
      try {
        WebMidiInput.name;
      } catch (e) {
        await Promise.resolve();
      }

      if (WebMidiInput.channels.length !== 0) return Promise.reject();
      if (WebMidiInput.hasListener() === true) return Promise.reject();

    });

  });

  describe("getCcNameByNumber()", function() {

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

  describe("hasListener()", function() {

    it("should call channel's 'hasListener()' for all specified channels", function () {

      // Arrange
      let event = "noteon";
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let listener = () => {};
      let spies = [];

      // Act
      channels.forEach(ch => {
        spies.push(sinon.spy(WebMidiInput.channels[ch], "hasListener"));
      });

      WebMidiInput.addListener(event, channels, listener);
      WebMidiInput.hasListener(event, channels, listener);

      // Assert
      spies.forEach(spy => {
        expect(spy.calledOnce).to.be.true;
      });

    });

    it("should call input's 'hasListener()' for all input-wide events", function () {

      // Arrange
      let event = "clock";
      let listener = () => {};
      let spy = sinon.spy(WebMidiInput, "hasListener");

      // Act
      WebMidiInput.addListener(event, undefined, listener);
      WebMidiInput.hasListener(event, undefined, listener);

      // Assert
      expect(spy.calledOnce).to.be.true;
      expect(spy.args[0][0]).to.equal(event);
      expect(spy.args[0][2]).to.equal(listener);

    });

  });

  describe("open()", async function() {

    it("should open the port", async function () {

      // Act
      await WebMidiInput.close();
      await WebMidiInput.open();

      // Assert
      expect(WebMidiInput.connection).to.equal("open");

    });

  });

  describe("removeListener()", function() {

    it("should call channel's 'removeListener()' for all specified channels", function () {

      // Arrange
      let event = "noteon";
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let listener = () => {};
      let spies = [];

      // Act
      channels.forEach(ch => {
        spies.push(sinon.spy(WebMidiInput.channels[ch], "removeListener"));
      });

      WebMidiInput.removeListener(event, channels, listener);

      // Assert
      spies.forEach(spy => {
        expect(spy.calledOnce).to.be.true;
      });

    });

    it("should call input's 'removeListener()' for all input-wide events", function () {

      // Arrange
      let event = "clock";
      let listener = () => {};
      let spy = sinon.spy(WebMidiInput, "removeListener");

      // Act
      WebMidiInput.removeListener(event, undefined, listener);

      // Assert
      expect(spy.calledOnce).to.be.true;
      expect(spy.args[0][0]).to.equal(event);
      expect(spy.args[0][2]).to.equal(listener);

    });

  });

});
