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

    it("should add listeners to all specified channels (normal)", function() {

      // Arrange
      let l1 = () => {};
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let event = "noteon";

      // Act
      WebMidiInput.addListener(event, l1, {channels: channels});

      // Assert
      WebMidiInput.channels.forEach(ch => {
        expect(ch.hasListener(event, l1)).to.be.true;
      });

      expect(
        WebMidiInput.hasListener(event, l1, {channels: channels})
      ).to.be.true;

    });

    it("should add listeners to all specified channels (legacy)", function() {

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

      expect(
        WebMidiInput.hasListener(event, channels, l1)
      ).to.be.true;

    });

    it("should add listeners for input-wide messages (normal)", function() {

      // Arrange
      let l1 = () => {};

      // Act
      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(key => {
        WebMidiInput.addListener(key, l1);
      });

      // Assert
      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(key => {
        expect(WebMidiInput.hasListener(key, l1)).to.be.true;
      });

    });

    it("should add listeners for input-wide messages (legacy)", function() {

      // Arrange
      let l1 = () => {};

      // Act
      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(key => {
        WebMidiInput.addListener(key, undefined, l1);
      });

      // Assert
      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(key => {
        expect(WebMidiInput.hasListener(key, undefined, l1)).to.be.true;
      });

    });

    it("should throw error for invalid event types (normal)", function() {

      // Arrange
      let values = [undefined, null, "", NaN, [], {}, 0];
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

      //  Act
      values.forEach(assert);

      // Assert
      function assert(event) {
        expect(() => {
          WebMidiInput.addListener(event, () => {}, {channels: channels});
        }).to.throw(TypeError);
      }

    });

    it("should throw error for invalid event types (legacy)", function() {

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

    it("should return array of 'Listener' (of length 1) for system messages (normal)", function() {

      // Arrange
      let callbacks = [];
      let listeners = [];

      // Act
      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(function(key, index) {
        callbacks[index] = () => {};
        listeners[index] = WebMidiInput.addListener(key, callbacks[index]);
      });

      // Assert
      Object.keys(WebMidi.MIDI_SYSTEM_MESSAGES).forEach(function(key, index) {
        expect(listeners[index].length).to.equal(1);
        expect(listeners[index][0].callback === callbacks[index]).to.be.true;
      });

    });

    it("should return array of 'Listener' (of length 1) for system messages (legacy)", function() {

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

    it("should return an array of 'Listener' objects for channel messages (normal)", function() {

      // Arrange
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let callbacks = [];
      let listeners = [];

      Object.keys(WebMidi.MIDI_CHANNEL_VOICE_MESSAGES).forEach((key, index) => {
        callbacks[index] = () => {};
        listeners[index] = WebMidiInput.addListener(key, callbacks[index], {channels: channels});
      });

      Object.keys(WebMidi.MIDI_CHANNEL_VOICE_MESSAGES).forEach((key, index) => {
        expect(listeners[index].length).to.equal(channels.length);
        expect(listeners[index][0].callback === callbacks[index]).to.be.true;
      });

    });

    it("should return an array of 'Listener' objects for channel messages (legacy)", function() {

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

    it("should throw if channels are specified but listener not a function (normal)", function() {

      // Arrange
      let event = "noteon";
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

      expect(() => {
        WebMidiInput.addListener(event, undefined, {channels: channels});
      }).to.throw(TypeError);

    });

    it("should throw if channels are specified but listener not a function (legacy)", function() {

      // Arrange
      let event = "noteon";
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

      expect(() => {
        WebMidiInput.addListener(event, channels);
      }).to.throw(TypeError);

    });

    it("should ignore invalid channels (normal)", function() {

      // Arrange
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, "", NaN, [], {}, 0];
      let channels = valid.concat(invalid);

      // Act
      let listeners = WebMidiInput.addListener("noteon", () => {}, {channels: channels});

      // Assert
      expect(listeners.length).to.equal(valid.length);

    });

    it("should ignore invalid channels (legacy)", function() {

      // Arrange
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, "", NaN, [], {}, 0];
      let channels = valid.concat(invalid);

      // Act
      let listeners = WebMidiInput.addListener("noteon", channels, () => {});

      // Assert
      expect(listeners.length).to.equal(valid.length);

    });

    it("should trigger events when receiving system MIDI messages (normal)", function (done) {

      // Arrange
      let events = [
        // "sysex",         // RT-Midi does not seem to support these messages?!
        // "timecode",
        // "songposition",
        // "songselect",
        "tunerequest",
        "clock",
        "start",
        "continue",
        "stop",
        "activesensing",
        "reset"
      ];
      let index = 0;

      events.forEach(event => {
        WebMidiInput.addListener(event, assert);
      });

      // Act
      events.forEach(event => {
        config.input.port.sendMessage(
          [WebMidi.MIDI_SYSTEM_MESSAGES[event]]
        );
      });

      // Assert
      function assert(e) {
        let event = events[index];
        expect(e.data).to.have.ordered.members([WebMidi.MIDI_SYSTEM_MESSAGES[event]]);
        index++;
        if (index >= events.length) done();
      }

    });

    it("should trigger events when receiving system MIDI messages(legacy)", function (done) {

      // Arrange
      let events = [
        // "sysex",         // RT-Midi does not seem to support these messages?!
        // "timecode",
        // "songposition",
        // "songselect",
        "tunerequest",
        "clock",
        "start",
        "continue",
        "stop",
        "activesensing",
        "reset"
      ];
      let index = 0;

      events.forEach(event => {
        WebMidiInput.addListener(event, undefined, assert);
      });

      // Act
      events.forEach(event => {
        config.input.port.sendMessage(
          [WebMidi.MIDI_SYSTEM_MESSAGES[event]]
        );
      });

      // Assert
      function assert(e) {
        let event = events[index];
        expect(e.data).to.have.ordered.members([WebMidi.MIDI_SYSTEM_MESSAGES[event]]);
        index++;
        if (index >= events.length) done();
      }

    });

    it("should trigger midimessage event when receiving any messages (normal)", function (done) {

      // Arrange
      let messages = [
        [0x80, 48, 87],     // Note off
        [0x90, 52, 64],     // Note on
        [0xA0, 60, 83],     // Key pressure
        [0xB0, 67, 92],     // Control change
        [0xC0, 88],         // Program change
        [0xD0, 93],         // Program change
        [0xE0, 95, 101],    // Pitch bend
        [250]               // Start
      ];
      let index = 0;

      WebMidiInput.addListener("midimessage", assert);

      // Act
      messages.forEach(msg => {
        config.input.port.sendMessage(msg);
      });

      // Assert
      function assert(e) {
        expect(e.data).to.have.ordered.members(messages[index]);
        index++;
        if (index >= messages.length) done();
      }

    });

    it("should trigger midimessage event when receiving any messages (legacy)", function (done) {

      // Arrange
      let messages = [
        [0x80, 48, 87],     // Note off
        [0x90, 52, 64],     // Note on
        [0xA0, 60, 83],     // Key pressure
        [0xB0, 67, 92],     // Control change
        [0xC0, 88],         // Program change
        [0xD0, 93],         // Program change
        [0xE0, 95, 101],    // Pitch bend
        [250]               // Start
      ];
      let index = 0;

      WebMidiInput.addListener("midimessage", undefined, assert);

      // Act
      messages.forEach(msg => {
        config.input.port.sendMessage(msg);
      });

      // Assert
      function assert(e) {
        expect(e.data).to.have.ordered.members(messages[index]);
        index++;
        if (index >= messages.length) done();
      }

    });

    it("should throw if event is input-specific but no ch. is defined (normal)", function () {

      // Arrange
      let events = [
        "noteoff",
        "noteon",
        "keyaftertouch",
        "controlchange",
        "channelmode",
        "nrpn",
        "programchange",
        "channelaftertouch",
        "pitchbend"
      ];

      // Act
      events.forEach(assert);

      // Assert
      function assert(event) {
        expect(() => {
          WebMidiInput.addListener(event, assert);
        }).to.throw();
      }

    });

    it("should throw if event is input-specific but no ch. is defined (legacy)", function () {

      // Arrange
      let events = [
        "noteoff",
        "noteon",
        "keyaftertouch",
        "controlchange",
        "channelmode",
        "nrpn",
        "programchange",
        "channelaftertouch",
        "pitchbend"
      ];

      // Act
      events.forEach(assert);

      // Assert
      function assert(event) {
        expect(() => {
          WebMidiInput.addListener(event, undefined, assert);
        }).to.throw();
      }

    });

    // it("should trigger 'opened' event", function (done) {
    //
    //   // Arrange
    //   WebMidiInput.addListener("opened", undefined, done);
    //
    //   // Act
    //   // WebMidiInput.close().then(() => WebMidiInput.open());
    //
    // });

    it("should trigger 'closed' event");
    it("should trigger 'disconnected' event");

  });

  describe("addOneTimeListener()", function() {

    it("should properly call 'addListener()' with appropriate parameters", function () {

      // Arrange
      let spy = sinon.spy(WebMidiInput.channels[1], "addListener");
      let event = "noteon";
      let listener = () => {};
      let options = {
        channels: 1,
        context: {},
        prepend: true,
        duration: 1000,
        arguments: [1, 2, 3]
      };

      // Act
      WebMidiInput.addOneTimeListener(event, listener, options);

      // Assert
      let args = spy.args[0];
      expect(args[0]).to.equal(event);
      expect(args[1]).to.equal(listener);
      expect(args[2].context).to.equal(options.context);
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

      WebMidiInput.addOneTimeListener(event, listener, {channels: channels});

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

  describe("hasListener()", function() {

    it("should call channel's 'hasListener()' for all specified channels (normal)", function () {

      // Arrange
      let event = "noteon";
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let listener = () => {};
      let spies = [];

      // Act
      channels.forEach(ch => {
        spies.push(sinon.spy(WebMidiInput.channels[ch], "hasListener"));
      });

      WebMidiInput.addListener(event, listener, {channels: channels});
      WebMidiInput.hasListener(event, listener, {channels: channels});

      // Assert
      spies.forEach(spy => {
        expect(spy.calledOnce).to.be.true;
      });

    });

    it("should call channel's 'hasListener()' for all specified channels (legacy)", function () {

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
      WebMidiInput.addListener(event, listener);
      WebMidiInput.hasListener(event, listener);

      // Assert
      expect(spy.calledOnce).to.be.true;
      expect(spy.args[0][0]).to.equal(event);
      expect(spy.args[0][1]).to.equal(listener);

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

    it("should call channel's 'removeListener()' for all specified channels (normal)", function () {

      // Arrange
      let event = "noteon";
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let listener = () => {};
      let spies = [];

      // Act
      channels.forEach(ch => {
        spies.push(sinon.spy(WebMidiInput.channels[ch], "removeListener"));
      });

      WebMidiInput.removeListener(event, listener, {channels: channels});

      // Assert
      spies.forEach(spy => {
        expect(spy.calledOnce).to.be.true;
      });

    });

    it("should call channel's 'removeListener()' for all specified channels (legacy)", function () {

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

    it("should call input's 'removeListener()' for all input-wide events (normal)", function () {

      // Arrange
      let event = "clock";
      let listener = () => {};
      let spy = sinon.spy(WebMidiInput, "removeListener");

      // Act
      WebMidiInput.removeListener(event, listener);

      // Assert
      expect(spy.calledOnce).to.be.true;
      expect(spy.args[0][0]).to.equal(event);
      expect(spy.args[0][1]).to.equal(listener);

    });

    it("should call input's 'removeListener()' for all input-wide events (legacy)", function () {

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
