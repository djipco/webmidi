const expect = require("chai").expect;
const midi = require("midi");
const sinon = require("sinon");
const {WebMidi, Enumerations, Forwarder} = require("../dist/cjs/webmidi.cjs.js");

// The virtual port is an "external" device so an output is seen as an input by WebMidi. To avoid
// confusion, the naming scheme adopts WebMidi's perspective.
let VIRTUAL_INPUT = new midi.Output();
let VIRTUAL_INPUT_NAME = "Virtual Input";
let WEBMIDI_INPUT;

// The virtual port is an "external" device so an input is seen as an output by WebMidi. To avoid
// confusion, the naming scheme adopts WebMidi's perspective.
let VIRTUAL_OUTPUT = new midi.Input();
let VIRTUAL_OUTPUT_NAME = "Virtual Output";
let WEBMIDI_OUTPUT;

describe("Input Object", function() {

  before(function () {

    VIRTUAL_INPUT.openVirtualPort(VIRTUAL_INPUT_NAME);

    VIRTUAL_OUTPUT.openVirtualPort(VIRTUAL_OUTPUT_NAME);
    VIRTUAL_OUTPUT.ignoreTypes(false, false, false); // enable sysex, timing & active sensing

  });

  after(function () {
    VIRTUAL_INPUT.closePort();
    VIRTUAL_OUTPUT.closePort();
  });

  beforeEach("Check support and enable WebMidi.js", async function () {
    await WebMidi.enable({sysex: true});
    WEBMIDI_INPUT = WebMidi.getInputByName(VIRTUAL_INPUT_NAME);
    WEBMIDI_OUTPUT = WebMidi.getOutputByName(VIRTUAL_OUTPUT_NAME);
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
  });

  it("should dispatch events when receiving sysex messages (normal)", function (done) {

    // Arrange
    let data = [
      Enumerations.MIDI_SYSTEM_MESSAGES.sysex,
      0x42, // Korg
      1,    // data
      2,    // data
      3,    // data
      Enumerations.MIDI_SYSTEM_MESSAGES.sysexend
    ];
    WEBMIDI_INPUT.addListener("sysex", assert);

    // Act
    VIRTUAL_INPUT.sendMessage(data);

    // Assert
    function assert(e) {
      expect(e.message.data).to.have.ordered.members(data);
      done();
    }

  });

  it("should dispatch events when receiving system common MIDI messages (normal)", function (done) {

    // Arrange
    let items = [
      {type: "timecode", data: [0xF1, 0x36]},
      {type: "songposition", data: [12, 34]},
      {type: "songselect", data: [123]},
      {type: "tunerequest", data: []}
    ];
    let index = 0;

    items.forEach(item => {
      WEBMIDI_INPUT.addListener(item.type, assert);
    });

    // Act
    items.forEach(item => {
      VIRTUAL_INPUT.sendMessage(
        [Enumerations.MIDI_SYSTEM_MESSAGES[item.type]].concat(item.data)
      );
    });

    // Assert
    function assert(e) {
      expect(e.type).to.equal(items[index].type);
      index++;
      if (index >= items.length) done();
    }

  });

  it("should dispatch events when receiving system common MIDI messages (legacy)", function (done) {

    // Arrange
    let items = [
      {type: "timecode", data: [0xF1, 0x36]},
      {type: "songposition", data: [12, 34]},
      {type: "songselect", data: [123]},
      {type: "tunerequest", data: []}
    ];
    let index = 0;

    items.forEach(item => {
      WEBMIDI_INPUT.addListener(item.type, undefined, assert);
    });

    // Act
    items.forEach(item => {
      VIRTUAL_INPUT.sendMessage(
        [Enumerations.MIDI_SYSTEM_MESSAGES[item.type]].concat(item.data)
      );
    });

    // Assert
    function assert(e) {
      expect(e.type).to.equal(items[index].type);
      index++;
      if (index >= items.length) done();
    }

  });

  it("should dispatch events when receiving realtime MIDI messages (normal)", function (done) {

    // Arrange
    let events = [
      "clock",
      "start",
      "continue",
      "stop",
      "activesensing",
      "reset"
    ];
    let index = 0;

    events.forEach(event => {
      WEBMIDI_INPUT.addListener(event, assert);
    });

    // Act
    events.forEach(event => {
      VIRTUAL_INPUT.sendMessage(
        [Enumerations.MIDI_SYSTEM_MESSAGES[event]]
      );
    });

    // Assert
    function assert(e) {
      let event = events[index];
      expect(e.data).to.have.ordered.members([Enumerations.MIDI_SYSTEM_MESSAGES[event]]);
      index++;
      if (index >= events.length) done();
    }

  });

  it("should dispatch events when receiving realtime MIDI messages (legacy)", function (done) {

    // Arrange
    let events = [
      "clock",
      "start",
      "continue",
      "stop",
      "activesensing",
      "reset"
    ];
    let index = 0;

    events.forEach(event => {
      WEBMIDI_INPUT.addListener(event, undefined, assert);
    });

    // Act
    events.forEach(event => {
      VIRTUAL_INPUT.sendMessage(
        [Enumerations.MIDI_SYSTEM_MESSAGES[event]]
      );
    });

    // Assert
    function assert(e) {
      let event = events[index];
      expect(e.data).to.have.ordered.members([Enumerations.MIDI_SYSTEM_MESSAGES[event]]);
      index++;
      if (index >= events.length) done();
    }

  });

  it("should dispatch midimessage event when receiving any messages (normal)", function (done) {

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

    WEBMIDI_INPUT.addListener("midimessage", assert);

    // Act
    messages.forEach(msg => {
      VIRTUAL_INPUT.sendMessage(msg);
    });

    // Assert
    function assert(e) {
      expect(e.data).to.have.ordered.members(messages[index]);
      index++;
      if (index >= messages.length) done();
    }

  });

  it("should dispatch midimessage event when receiving any messages (legacy)", function (done) {

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

    WEBMIDI_INPUT.addListener("midimessage", undefined, assert);

    // Act
    messages.forEach(msg => {
      VIRTUAL_INPUT.sendMessage(msg);
    });

    // Assert
    function assert(e) {
      expect(e.data).to.have.ordered.members(messages[index]);
      index++;
      if (index >= messages.length) done();
    }

  });

  it("should trigger 'opened' event", function (done) {

    // Arrange
    const input = WebMidi.getInputByName(VIRTUAL_INPUT_NAME);
    input.addListener("opened", () => done());
    input.addListener("closed", () => input.open());

    // Act
    input.close();

  });

  it("should trigger 'closed' event", function (done) {

    // Arrange
    const input = WebMidi.getInputByName(VIRTUAL_INPUT_NAME);
    input.addListener("closed", () => done());

    // Act
    input.close();

  });

  it("should trigger 'disconnected' event"); // below does not work...
  // it.only("should trigger 'disconnected' event", function (done) {
  //
  //   // Arrange
  //   const input = WebMidi.getInputByName(VIRTUAL_INPUT_NAME);
  //   input.addListener("disconnected", () => done());
  //
  //   // Act
  //   VIRTUAL_INPUT.closePort();
  //
  //   setTimeout(() => {
  //     VIRTUAL_INPUT.openVirtualPort(VIRTUAL_INPUT_NAME);
  //   }, 100);
  //
  // });

  describe("addListener()", function() {

    it("should add listeners to all specified channels (normal)", function() {

      // Arrange
      let l1 = () => {};
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let event = "noteon";

      // Act
      WEBMIDI_INPUT.addListener(event, l1, {channels: channels});

      // Assert
      WEBMIDI_INPUT.channels.forEach(ch => {
        expect(ch.hasListener(event, l1)).to.be.true;
      });

      expect(
        WEBMIDI_INPUT.hasListener(event, l1, {channels: channels})
      ).to.be.true;

    });

    it("should add listeners to all specified channels (legacy)", function() {

      // Arrange
      let l1 = () => {};
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let event = "noteon";

      // Act
      WEBMIDI_INPUT.addListener(event, channels, l1);

      // Assert
      WEBMIDI_INPUT.channels.forEach(ch => {
        expect(ch.hasListener(event, l1)).to.be.true;
      });

      expect(
        WEBMIDI_INPUT.hasListener(event, channels, l1)
      ).to.be.true;

    });

    it("should add listeners for input-wide messages (normal)", function() {

      // Arrange
      let l1 = () => {};

      // Act
      Object.keys(Enumerations.MIDI_SYSTEM_MESSAGES).forEach(key => {
        WEBMIDI_INPUT.addListener(key, l1);
      });

      // Assert
      Object.keys(Enumerations.MIDI_SYSTEM_MESSAGES).forEach(key => {
        expect(WEBMIDI_INPUT.hasListener(key, l1)).to.be.true;
      });

    });

    it("should add listeners for input-wide messages (legacy)", function() {

      // Arrange
      let l1 = () => {};

      // Act
      Object.keys(Enumerations.MIDI_SYSTEM_MESSAGES).forEach(key => {
        WEBMIDI_INPUT.addListener(key, undefined, l1);
      });

      // Assert
      Object.keys(Enumerations.MIDI_SYSTEM_MESSAGES).forEach(key => {
        expect(WEBMIDI_INPUT.hasListener(key, undefined, l1)).to.be.true;
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
          WEBMIDI_INPUT.addListener(event, () => {}, {channels: channels});
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
          WEBMIDI_INPUT.addListener(event, channels, () => {});
        }).to.throw(TypeError);
      }

    });

    it("should add listener to all channels when none is specified (normal)", function () {
      // Arrange

      // Act
      const listener = WEBMIDI_INPUT.addListener("noteon", () => {});

      // Assert
      expect(listener.length).to.equal(16);

    });

    it("should add listener to all channels when none is specified (legacy)", function () {

      // Arrange

      // Act
      const listener = WEBMIDI_INPUT.addListener("noteon", undefined, () => {});

      // Assert
      expect(listener.length).to.equal(16);

    });

    it("should return a single 'Listener' for system messages (normal)", function() {

      // Arrange
      let callbacks = [];
      let listeners = [];

      // Act
      Object.keys(Enumerations.MIDI_SYSTEM_MESSAGES).forEach(function(key, index) {
        callbacks[index] = () => {};
        listeners[index] = WEBMIDI_INPUT.addListener(key, callbacks[index]);
      });

      // Assert
      Object.keys(Enumerations.MIDI_SYSTEM_MESSAGES).forEach(function(key, index) {
        expect(Array.isArray(listeners[index])).to.be.false;
        expect(listeners[index].callback === callbacks[index]).to.be.true;
      });

    });

    it("should return a single 'Listener' for system messages (normal)", function() {

      // Arrange
      let callbacks = [];
      let listeners = [];

      // Act
      Object.keys(Enumerations.MIDI_SYSTEM_MESSAGES).forEach(function(key, index) {
        callbacks[index] = () => {};
        listeners[index] = WEBMIDI_INPUT.addListener(key, undefined, callbacks[index]);
      });

      // Assert
      Object.keys(Enumerations.MIDI_SYSTEM_MESSAGES).forEach(function(key, index) {
        expect(Array.isArray(listeners[index])).to.be.false;
        expect(listeners[index].callback === callbacks[index]).to.be.true;
      });

    });

    it("should return an array of 'Listener' objects for channel messages (normal)", function() {

      // Arrange
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let callbacks = [];
      let listeners = [];

      Object.keys(Enumerations.CHANNEL_MESSAGES).forEach((key, index) => {
        callbacks[index] = () => {};
        listeners[index] = WEBMIDI_INPUT.addListener(key, callbacks[index], {channels: channels});
      });

      Object.keys(Enumerations.CHANNEL_MESSAGES).forEach((key, index) => {
        expect(listeners[index].length).to.equal(channels.length);
        expect(listeners[index][0].callback === callbacks[index]).to.be.true;
      });

    });

    it("should return an array of 'Listener' objects for channel messages (legacy)", function() {

      // Arrange
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let callbacks = [];
      let listeners = [];

      Object.keys(Enumerations.CHANNEL_MESSAGES).forEach((key, index) => {
        callbacks[index] = () => {};
        listeners[index] = WEBMIDI_INPUT.addListener(key, channels, callbacks[index]);
      });

      Object.keys(Enumerations.CHANNEL_MESSAGES).forEach((key, index) => {
        expect(listeners[index].length).to.equal(channels.length);
        expect(listeners[index][0].callback === callbacks[index]).to.be.true;
      });

    });

    it("should throw if channels are specified but listener not a function (normal)", function() {

      // Arrange
      let event = "noteon";
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

      expect(() => {
        WEBMIDI_INPUT.addListener(event, undefined, {channels: channels});
      }).to.throw(TypeError);

    });

    it("should throw if channels are specified but listener not a function (legacy)", function() {

      // Arrange
      let event = "noteon";
      let channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

      expect(() => {
        WEBMIDI_INPUT.addListener(event, channels);
      }).to.throw(Error);

    });

    it("should ignore invalid channels (normal)", function() {

      // Arrange
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, "", NaN, [], {}, 0];
      let channels = valid.concat(invalid);

      // Act
      let listeners = WEBMIDI_INPUT.addListener("noteon", () => {}, {channels: channels});

      // Assert
      expect(listeners.length).to.equal(valid.length);

    });

    it("should ignore invalid channels (legacy)", function() {

      // Arrange
      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      let invalid = [undefined, null, "", NaN, [], {}, 0];
      let channels = valid.concat(invalid);

      // Act
      let listeners = WEBMIDI_INPUT.addListener("noteon", channels, () => {});

      // Assert
      expect(listeners.length).to.equal(valid.length);

    });

  });

  describe("addOneTimeListener()", function() {

    it("should properly call 'addListener()' with appropriate parameters", function () {

      // Arrange
      let spy = sinon.spy(WEBMIDI_INPUT.channels[1], "addListener");
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
      WEBMIDI_INPUT.addOneTimeListener(event, listener, options);

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
        spies.push(sinon.spy(WEBMIDI_INPUT.channels[ch], "addListener"));
      });

      WEBMIDI_INPUT.addOneTimeListener(event, listener, {channels: channels});

      // Assert
      spies.forEach(spy => {
        expect(spy.args[0][2].remaining).to.equal(1);
        expect(spy.calledOnce).to.be.true;
      });

    });

  });

  describe("constructor()", function() {

    it("should set up all 'InputChannel' objects", function() {

      expect(WEBMIDI_INPUT.channels.length).to.equal(16+1);

      for (let i = 1; i <= 16; i++) {
        expect(WEBMIDI_INPUT.channels[i].number).to.equal(i);
      }

    });

  });

  describe("close()", function() {

    it("should close the port", async function () {

      // Act
      await WEBMIDI_INPUT.close();

      // Assert
      expect(WEBMIDI_INPUT.connection).to.equal("closed");

    });

  });

  describe("destroy()", function() {

    it("should destroy the 'Input'", async function() {

      // Act
      await WEBMIDI_INPUT.destroy();

      // Assert
      try {
        WEBMIDI_INPUT.name;
      } catch (e) {
        await Promise.resolve();
      }

      if (WEBMIDI_INPUT.channels.length !== 0) return Promise.reject();
      if (WEBMIDI_INPUT.hasListener() === true) return Promise.reject();

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
        spies.push(sinon.spy(WEBMIDI_INPUT.channels[ch], "hasListener"));
      });

      WEBMIDI_INPUT.addListener(event, listener, {channels: channels});
      WEBMIDI_INPUT.hasListener(event, listener, {channels: channels});

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
        spies.push(sinon.spy(WEBMIDI_INPUT.channels[ch], "hasListener"));
      });

      WEBMIDI_INPUT.addListener(event, channels, listener);
      WEBMIDI_INPUT.hasListener(event, channels, listener);

      // Assert
      spies.forEach(spy => {
        expect(spy.calledOnce).to.be.true;
      });

    });

    it("should call input's 'hasListener()' for all input-wide events", function () {

      // Arrange
      let event = "clock";
      let listener = () => {};
      let spy = sinon.spy(WEBMIDI_INPUT, "hasListener");

      // Act
      WEBMIDI_INPUT.addListener(event, listener);
      WEBMIDI_INPUT.hasListener(event, listener);

      // Assert
      expect(spy.calledOnce).to.be.true;
      expect(spy.args[0][0]).to.equal(event);
      expect(spy.args[0][1]).to.equal(listener);

    });

  });

  describe("open()", async function() {

    it("should open the port", async function () {

      // Act
      await WEBMIDI_INPUT.close();
      await WEBMIDI_INPUT.open();

      // Assert
      expect(WEBMIDI_INPUT.connection).to.equal("open");

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
        spies.push(sinon.spy(WEBMIDI_INPUT.channels[ch], "removeListener"));
      });

      WEBMIDI_INPUT.removeListener(event, listener, {channels: channels});

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
        spies.push(sinon.spy(WEBMIDI_INPUT.channels[ch], "removeListener"));
      });

      WEBMIDI_INPUT.removeListener(event, channels, listener);

      // Assert
      spies.forEach(spy => {
        expect(spy.calledOnce).to.be.true;
      });

    });

    it("should call input's 'removeListener()' for all input-wide events (normal)", function () {

      // Arrange
      let event = "clock";
      let listener = () => {};
      let spy = sinon.spy(WEBMIDI_INPUT, "removeListener");

      // Act
      WEBMIDI_INPUT.removeListener(event, listener);

      // Assert
      expect(spy.calledOnce).to.be.true;
      expect(spy.args[0][0]).to.equal(event);
      expect(spy.args[0][1]).to.equal(listener);

    });

    it("should call input's 'removeListener()' for all input-wide events (legacy)", function () {

      // Arrange
      let event = "clock";
      let listener = () => {};
      let spy = sinon.spy(WEBMIDI_INPUT, "removeListener");

      // Act
      WEBMIDI_INPUT.removeListener(event, undefined, listener);

      // Assert
      expect(spy.calledOnce).to.be.true;
      expect(spy.args[0][0]).to.equal(event);
      expect(spy.args[0][2]).to.equal(listener);

    });

  });

  describe("addForwarder()", function() {

    it("should add a forwarder and return it", function() {

      // Arrange

      // Act
      const forwarder = WEBMIDI_INPUT.addForwarder(WEBMIDI_OUTPUT);

      // Assert
      expect(WEBMIDI_INPUT.hasForwarder(forwarder)).to.be.true;

    });

    it("should forward message to specified output", function(done) {

      // Arrange
      const data = [0x90, 64, 127];
      WEBMIDI_INPUT.addForwarder(WEBMIDI_OUTPUT);
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      VIRTUAL_INPUT.sendMessage(data);

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(data);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should forward message to specified output (with channel filter)", function(done) {

      // Arrange
      let target = [0x99, 64, 127]; // noteon on channel 10
      const data = [
        [0x90, 64, 127], // noteon on channel 1
        [0x81, 64, 127], // noteoff on channel 2
        target,
      ];
      WEBMIDI_INPUT.addForwarder(WEBMIDI_OUTPUT, {channels: 10});
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      data.forEach(item => VIRTUAL_INPUT.sendMessage(item));

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(target);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should not forward message to filtered outputs (with channel filter)", function(done) {

      // Arrange
      const channel = 10;
      WEBMIDI_INPUT.addForwarder(WEBMIDI_OUTPUT, {channels: channel});
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        .filter(x => x !== channel).forEach(i => {
          VIRTUAL_INPUT.sendMessage([0x90 + i - 1, 64, 127]);
        });

      // Assert
      const id = setTimeout(() => {
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }, 750);

      function assert(deltaTime, message) {
        VIRTUAL_OUTPUT.removeAllListeners();
        clearTimeout(id);
        done(new Error("Callback should not have been triggered. " + message));
      }

    });

    it("should forward message to specified output (with type filter)", function(done) {

      // Arrange
      let type = "controlchange";
      const target = [0xB2, 64, 127];
      const data = [
        [0x90, 64, 127],  // noteon on channel 1
        [0x81, 64, 127],  // noteoff on channel 2
        target            // control change on channel 3
      ];
      WEBMIDI_INPUT.addForwarder(WEBMIDI_OUTPUT, {types: type});
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      data.forEach(item => VIRTUAL_INPUT.sendMessage(item));

      // Assert
      function assert(deltaTime, message) {
        expect(message).to.have.ordered.members(target);
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }

    });

    it("should not forward message to filtered outputs (with type filter)", function(done) {

      // Arrange
      const target = {name: "pitchbend", number: 0xE0}; // pitchbend
      const messages = [
        0x80,
        0x90,
        0xA0,
        0xB0,
        0xC0,
        0xD0,
        0xE0
      ];
      WEBMIDI_INPUT.addForwarder(WEBMIDI_OUTPUT, {types: target.name});
      VIRTUAL_OUTPUT.on("message", assert);

      // Act
      messages.filter(x => x !== target.number).forEach(i => {
        VIRTUAL_INPUT.sendMessage([i, 64, 127]);
      });

      // Assert
      const id = setTimeout(() => {
        VIRTUAL_OUTPUT.removeAllListeners();
        done();
      }, 750);

      function assert(deltaTime, message) {
        VIRTUAL_OUTPUT.removeAllListeners();
        clearTimeout(id);
        done(new Error("Callback should not have been triggered. " + message));
      }

    });

  });

  describe("removeForwarder()", function() {

    it("should remove specified forwarder", function() {

      // Arrange
      const forwarder = WEBMIDI_INPUT.addForwarder(WEBMIDI_OUTPUT);

      // Act
      WEBMIDI_INPUT.removeForwarder(forwarder);

      // Assert
      expect(WEBMIDI_INPUT.hasForwarder(forwarder)).to.be.false;

    });

  });

  describe("hasForwarder()", function() {

    it("should correctly report prsence of forwarder", function() {

      // Arrange
      const forwarder1 = WEBMIDI_INPUT.addForwarder(WEBMIDI_OUTPUT);
      const forwarder2 = WEBMIDI_INPUT.addForwarder(WEBMIDI_OUTPUT);

      // Act
      WEBMIDI_INPUT.removeForwarder(forwarder1);

      // Assert
      expect(WEBMIDI_INPUT.hasForwarder(forwarder1)).to.be.false;
      expect(WEBMIDI_INPUT.hasForwarder(forwarder2)).to.be.true;
      expect(WEBMIDI_INPUT.hasForwarder(new Forwarder(WEBMIDI_OUTPUT))).to.be.false;

    });

  });

});
