const expect = require("chai").expect;
const midi = require("midi");
const {WebMidi, Utilities, Enumerations, Note} = require("../dist/cjs/webmidi.cjs.js");

// Create virtual MIDI input port. Being an external device, the virtual device's output is seen as
// an input from WebMidi's perspective. To avoid confusion, the property names adopt WebMidi's point
// of view.
let VIRTUAL_INPUT = {
  PORT: new midi.Output(),
  NAME: "Virtual input"
};

let WEBMIDI_INPUT;

describe("InputChannel Object", function() {

  before(function () {
    VIRTUAL_INPUT.PORT.openVirtualPort(VIRTUAL_INPUT.NAME);
  });

  after(function () {
    VIRTUAL_INPUT.PORT.closePort();
  });

  beforeEach("Check support and enable", async function () {
    await WebMidi.enable();
    WEBMIDI_INPUT = WebMidi.getInputByName(VIRTUAL_INPUT.NAME);
  });

  afterEach("Disable WebMidi.js", async function () {
    await WebMidi.disable();
    WEBMIDI_INPUT = undefined;
  });

  it("should dispatch 'midimessage' events for all channel voice MIDI messages", function (done) {

    // Arrange
    let event = "midimessage";
    let messages = [
      [0x80, 48, 87],     // Note off
      [0x90, 52, 64],     // Note on
      [0xA0, 60, 83],     // Key pressure
      [0xB0, 67, 92],     // Control change
      [0xC0, 88],         // Program change
      [0xD0, 93],         // Channel aftertouch
      [0xE0, 95, 101],    // Pitch bend
      [0xB0, 120, 0],     // All sound off
      [0xB0, 121, 0],     // reset all controllers
      [0xB0, 122, 0],     // Local control off
      [0xB0, 122, 127],   // Local control on
      [0xB0, 123, 0],     // All notes off
      [0xB0, 126, 0],     // Mono mode on (poly mode off)
      [0xB0, 127, 0]      // Mono mode off (poly mode on)
    ];
    let channel = WEBMIDI_INPUT.channels[1];
    let index = 0;
    channel.addListener(event, assert);

    // Act
    messages.forEach(message => {
      VIRTUAL_INPUT.PORT.sendMessage(message);
    });

    // Assert
    function assert(e) {

      expect(e.type).to.equal(event);
      expect(e.data).to.have.ordered.members(messages[index]);

      index++;
      if (index >= messages.length) done();

    }

  });

  it("should dispatch event for inbound 'noteoff' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "noteoff";
    let velocity = 87;
    let status = 0x80;
    let index = 0;
    channel.addListener(event, assert);

    // Act
    for (let i = 0; i <= 127; i++) {
      VIRTUAL_INPUT.PORT.sendMessage([status, i, velocity]);
    }

    // Assert
    function assert(e) {

      expect(e.type).to.equal(event);
      expect(e.note.identifier).to.equal(Utilities.toNoteIdentifier(index));
      expect(e.note.attack).to.equal(0); // the note must have an attack of 0 to be a noteoff
      expect(e.note.rawRelease).to.equal(velocity);
      expect(e.note.duration).to.equal(WebMidi.defaults.note.duration);
      expect(e.value).to.equal(Utilities.from7bitToFloat(velocity));
      expect(e.rawValue).to.equal(velocity);
      expect(e.target).to.equal(channel);

      index++;
      if (index > 127) done();

    }

  });

  it("should dispatch 'noteoff' event when receiving 'noteon' with 0 velocity", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "noteoff";
    let velocity = 0;
    let status = 0x90; // note on
    let index = 0;
    channel.addListener(event, assert);

    // Act
    for (let i = 0; i <= 127; i++) {
      VIRTUAL_INPUT.PORT.sendMessage([status, i, velocity]);
    }

    // Assert
    function assert(e) {

      expect(e.type).to.equal(event);
      expect(e.note.identifier).to.equal(Utilities.toNoteIdentifier(index));
      expect(e.note.attack).to.equal(0); // the note must have an attack of 0 to be a noteoff
      expect(e.note.rawRelease).to.equal(velocity);
      expect(e.note.duration).to.equal(WebMidi.defaults.note.duration);
      expect(e.value).to.equal(Utilities.from7bitToFloat(velocity));
      expect(e.rawValue).to.equal(velocity);
      expect(e.target).to.equal(channel);

      index++;
      if (index > 127) done();

    }

  });

  it("should report correct octave for 'noteoff' event (with octaveOffset)", function (done) {

    // Arrange
    const channel = WEBMIDI_INPUT.channels[1];
    const event = "noteoff";
    const message = [0x80, 60, 64];
    WebMidi.octaveOffset = -1;
    WEBMIDI_INPUT.octaveOffset = -1;
    channel.octaveOffset = -1;
    const offset = WebMidi.octaveOffset + WEBMIDI_INPUT.octaveOffset + channel.octaveOffset;
    const result = 4 + offset;

    // Act
    channel.addListener(event, assert);
    VIRTUAL_INPUT.PORT.sendMessage(message);

    // Assert
    function assert(e) {
      expect(e.note.octave).to.equal(result);
      WebMidi.octaveOffset = 0;
      done();
    }

  });

  it("should dispatch event for inbound 'noteon' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "noteon";
    let velocity = 64;
    let status = 0x90;
    let index = 0;

    channel.addListener(event, assert);

    // Act
    for (let i = 0; i <= 127; i++) {
      VIRTUAL_INPUT.PORT.sendMessage([status, i, velocity]);
    }

    // Assert
    function assert(e) {

      expect(e.type).to.equal(event);
      expect(Utilities.toNoteNumber(e.note.identifier)).to.equal(index);
      expect(e.rawValue).to.equal(velocity);
      expect(e.target).to.equal(channel);

      index++;
      if (index > 127) done();

    }

  });

  it("should report correct octave in 'noteon' event (with octaveOffset)", function (done) {

    // Arrange
    const channel = WEBMIDI_INPUT.channels[1];
    const event = "noteon";
    const message = [0x90, 60, 64];
    WebMidi.octaveOffset = -1;
    WEBMIDI_INPUT.octaveOffset = -1;
    channel.octaveOffset = -1;
    const result = 4 + WebMidi.octaveOffset + WEBMIDI_INPUT.octaveOffset + channel.octaveOffset;

    // Act
    channel.addListener(event, assert);
    VIRTUAL_INPUT.PORT.sendMessage(message);

    // Assert
    function assert(e) {
      expect(e.note.octave).to.equal(result);
      WebMidi.octaveOffset = 0;
      done();
    }

  });

  it("should dispatch event for inbound 'keyaftertouch' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "keyaftertouch";
    let status = 0xA0;
    let velocity = 73;
    let index = 0;
    channel.addListener(event, assert);

    // Act
    for (let i = 0; i <= 127; i++) {
      VIRTUAL_INPUT.PORT.sendMessage([status, i, velocity]);
    }

    // Assert
    function assert(e) {

      expect(e.type).to.equal(event);
      expect(e.rawKey).to.equal(index);
      expect(e.rawValue).to.equal(velocity);
      expect(e.target).to.equal(channel);

      index++;
      if (index > 127) done();

    }

  });

  it("should report correct octave in 'keyaftertouch' event (with octaveOffset)", function (done) {

    // Arrange
    const channel = WEBMIDI_INPUT.channels[1];
    const event = "keyaftertouch";
    const message = [0xA0, 60, 64];
    WebMidi.octaveOffset = 1;
    channel.input.octaveOffset = 1;
    channel.octaveOffset = 1;
    const offset = WebMidi.octaveOffset + channel.octaveOffset + channel.input.octaveOffset;
    const result = 4 + offset;

    // Act
    channel.addListener(event, assert);
    VIRTUAL_INPUT.PORT.sendMessage(message);

    // Assert
    function assert(e) {
      expect(e.note.octave).to.equal(result);
      WebMidi.octaveOffset = 0;
      done();
    }

  });

  it("should dispatch event for inbound 'controlchange' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "controlchange";
    let status = 0xB0;
    let value = 123;
    let index = 0;
    channel.addListener(event, assert);

    // Act
    for (let i = 0; i <= 127; i++) {
      VIRTUAL_INPUT.PORT.sendMessage([status, i, value]);
    }

    // Assert
    function assert(e) {
      expect(e.type).to.equal(event);
      expect(e.controller.number).to.equal(index);
      expect(e.rawValue).to.equal(value);
      expect(e.target).to.equal(channel);

      index++;
      if (index > 127) done();

    }

  });

  it("should dispatch event for all 'controlchange' numbered subtypes", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "controlchange";
    let status = 0xB0;
    let value = 123;

    for (let i = 0; i <= 127; i++) {
      channel.addListener(`${event}-controller${i}`, e => {
        assert(e, i);
      });
    }

    // Act
    for (let i = 0; i <= 127; i++) {
      VIRTUAL_INPUT.PORT.sendMessage([status, i, value]);
    }

    // Assert
    function assert(e, index) {
      expect(e.type).to.equal(`${event}-controller${index}`);
      expect(e.controller.number).to.equal(index);
      expect(e.controller.name).to.equal(Enumerations.CONTROL_CHANGE_MESSAGES[index].name);
      expect(e.controller.description)
        .to.equal(Enumerations.CONTROL_CHANGE_MESSAGES[index].description);
      expect(e.controller.position)
        .to.equal(Enumerations.CONTROL_CHANGE_MESSAGES[index].position);
      expect(e.rawValue).to.equal(value);
      expect(e.target).to.equal(channel);
      if (index === 127) done();
    }

  });

  it("should dispatch event for all 'controlchange' named subtypes", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "controlchange";
    let status = 0xB0;
    let value = 123;

    for (let i = 0; i <= 127; i++) {

      const name = Enumerations.CONTROL_CHANGE_MESSAGES[i].name;
      if (name.indexOf("controller") !== 0) {
        channel.addListener(`${event}-` + name, e => {
          assert(e, i);
        });
      }

    }

    // Act
    for (let i = 0; i <= 127; i++) {
      VIRTUAL_INPUT.PORT.sendMessage([status, i, value]);
    }

    // Assert
    function assert(e, index) {
      expect(e.type).to.equal(`${event}-` + Enumerations.CONTROL_CHANGE_MESSAGES[index].name);
      expect(e.controller.number).to.equal(index);
      expect(e.controller.name).to.equal(Enumerations.CONTROL_CHANGE_MESSAGES[index].name);
      expect(e.controller.description)
        .to.equal(Enumerations.CONTROL_CHANGE_MESSAGES[index].description);
      expect(e.controller.position)
        .to.equal(Enumerations.CONTROL_CHANGE_MESSAGES[index].position);
      expect(e.rawValue).to.equal(value);
      expect(e.target).to.equal(channel);
      if (index === 127) done();
    }

  });

  it("should dispatch event for inbound 'program change' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "programchange";
    let status = 0xC0;
    let value = 19;
    channel.addListener(event, assert);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, value]);

    // Assert
    function assert(e) {
      expect(e.type).to.equal(event);
      expect(e.value).to.equal(value);
      expect(e.rawValue).to.equal(value);
      expect(e.target).to.equal(channel);
      done();
    }

  });

  it("should dispatch event for inbound 'channel aftertouch' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "channelaftertouch";
    let status = 0xD0;
    let value = 114;
    channel.addListener(event, assert);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, value]);

    // Assert
    function assert(e) {
      expect(e.type).to.equal(event);
      expect(e.rawValue).to.equal(value);
      expect(e.target).to.equal(channel);
      done();
    }

  });

  it("should dispatch event for inbound 'pitchbend' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "pitchbend";
    let status = 0xE0;
    let lsb = 6;
    let msb = 89;
    channel.addListener(event, assert);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, lsb, msb]);

    // Assert
    function assert(e) {
      expect(e.type).to.equal(event);
      expect(e.data[1]).to.equal(lsb);
      expect(e.data[2]).to.equal(msb);
      expect(e.target).to.equal(channel);
      done();
    }

  });

  it("should dispatch event for inbound 'all sound off' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "allsoundoff";
    let status = 0xB0;
    let mode = 120;
    channel.addListener(event, assert);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, mode, 0]);

    // Assert
    function assert(e) {
      expect(e.type).to.equal(event);
      expect(e.target).to.equal(channel);
      done();
    }

  });

  it("should dispatch event for inbound 'reset all controllers' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "resetallcontrollers";
    let status = 0xB0;
    let mode = 121;
    channel.addListener(event, assert);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, mode, 0]);

    // Assert
    function assert(e) {
      expect(e.type).to.equal(event);
      expect(e.target).to.equal(channel);
      done();
    }

  });

  it("should dispatch event for inbound 'local control' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "localcontrol";
    let status = 0xB0;
    let mode = 122;
    channel.addListener(event, assert);
    let index = 0;

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, mode, 0]);
    VIRTUAL_INPUT.PORT.sendMessage([status, mode, 127]);

    // Assert
    function assert(e) {

      expect(e.type).to.equal(event);
      expect(e.target).to.equal(channel);

      if (index === 0) {
        expect(e.value).to.be.false;
      } else if (index === 1) {
        expect(e.value).to.be.true;
        done();
      }

      index++;

    }

  });

  it("should dispatch event for inbound 'all notes off' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "allnotesoff";
    let status = 0xB0;
    let mode = 123;
    channel.addListener(event, assert);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, mode, 0]);

    // Assert
    function assert(e) {
      expect(e.type).to.equal(event);
      expect(e.target).to.equal(channel);
      done();
    }

  });

  it("should dispatch event for inbound 'monomode/polymode' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "monomode";
    let status = 0xB0;
    channel.addListener(event, assert);
    let index = 0;

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 126, 0]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 127, 0]);

    // Assert
    function assert(e) {

      expect(e.type).to.equal(event);
      expect(e.target).to.equal(channel);

      if (index === 0) {
        expect(e.value).to.be.true;
      } else if (index === 1) {
        expect(e.value).to.be.false;
        done();
      }

      index++;

    }

  });

  it("should dispatch event for inbound 'omni mode on/off' MIDI message", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "omnimode";
    let status = 0xB0;
    channel.addListener(event, assert);
    let index = 0;

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 124, 0]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 125, 0]);

    // Assert
    function assert(e) {

      expect(e.type).to.equal(event);
      expect(e.target).to.equal(channel);

      if (index === 0) {
        expect(e.value).to.be.false;
      } else if (index === 1) {
        expect(e.value).to.be.true;
        done();
      }

      index++;

    }

  });

  it("should dispatch general and specific events for nrpn-dataentrycoarse", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "nrpn";
    let subtype = "dataentrycoarse";
    let status = 0xB0;      // control change
    let parameterMsb = 12;
    let parameterLsb = 34;
    let value = 56;

    channel.addListener(`${event}-${subtype}`, assert1);
    channel.addListener(event, assert2);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 99, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 98, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 6, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
    }
    function assert2(e) {
      expect(e.type).to.equal(event);
      expect(e.subtype).to.equal(subtype);
      expect(e.rawValue).to.equal(value);
      done();
    }

  });

  it("should dispatch nrpn-dataentryfine", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "nrpn";
    let subtype = "dataentryfine";
    let status = 0xB0;      // control change
    let parameterMsb = 12;
    let parameterLsb = 34;
    let value = 56;

    channel.addListener(`${event}-${subtype}`, assert1);
    channel.addListener(event, assert2);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 99, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 98, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 38, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
    }
    function assert2(e) {
      expect(e.type).to.equal(event);
      expect(e.subtype).to.equal(subtype);
      expect(e.rawValue).to.equal(value);
      done();
    }

  });

  it("should dispatch nrpn-dataincrement", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "nrpn";
    let subtype = "dataincrement";
    let status = 0xB0;      // control change
    let parameterMsb = 12;
    let parameterLsb = 34;
    let value = 56;

    channel.addListener(`${event}-${subtype}`, assert1);
    channel.addListener(event, assert2);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 99, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 98, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 96, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
    }
    function assert2(e) {
      expect(e.type).to.equal(event);
      expect(e.subtype).to.equal(subtype);
      expect(e.rawValue).to.equal(value);
      done();
    }

  });

  it("should dispatch nrpn-datadecrement", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "nrpn";
    let subtype = "datadecrement";
    let status = 0xB0;      // control change
    let parameterMsb = 12;
    let parameterLsb = 34;
    let value = 56;

    channel.addListener(`${event}-${subtype}`, assert1);
    channel.addListener(event, assert2);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 99, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 98, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 97, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
    }
    function assert2(e) {
      expect(e.type).to.equal(event);
      expect(e.subtype).to.equal(subtype);
      expect(e.rawValue).to.equal(value);
      done();
    }

  });

  it("should ignore out-of-order NRPN messages", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "nrpn";
    let subtype = "datadecrement";
    let status = 0xB0;      // control change
    let parameterMsb = 12;
    let parameterLsb = 34;
    let value = 56;

    channel.addListener(`${event}-${subtype}`, assert1);
    channel.addListener(event, assert2);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 98, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 99, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);

    VIRTUAL_INPUT.PORT.sendMessage([status, 99, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 98, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 97, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
    }
    function assert2(e) {
      expect(e.type).to.equal(event);
      expect(e.subtype).to.equal(subtype);
      expect(e.rawValue).to.equal(value);
      done();
    }

  });

  it("should dispatch rpn-dataentrycoarse", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "rpn";
    let subtype = "dataentrycoarse";
    let status = 0xB0;      // control change
    let parameter = "pitchbendrange";
    let parameterMsb = 0;
    let parameterLsb = 0;
    let value = 123;

    channel.addListener(`${event}-${subtype}`, assert1);
    channel.addListener(event, assert2);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 6, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
    }
    function assert2(e) {
      expect(e.type).to.equal(event);
      expect(e.subtype).to.equal(subtype);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
      done();
    }

  });

  it("should dispatch rpn-dataentryfine", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "rpn";
    let subtype = "dataentryfine";
    let status = 0xB0;      // control change
    let parameter = "channelfinetuning";
    let parameterMsb = 0;
    let parameterLsb = 1;
    let value = 123;

    channel.addListener(`${event}-${subtype}`, assert1);
    channel.addListener(event, assert2);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 38, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
    }
    function assert2(e) {
      expect(e.type).to.equal(event);
      expect(e.subtype).to.equal(subtype);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
      done();
    }

  });

  it("should dispatch rpn-dataincrement", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "rpn";
    let subtype = "dataincrement";
    let status = 0xB0;      // control change
    let parameter = "tuningbank";
    let parameterMsb = 0;
    let parameterLsb = 4;
    let value = 123;

    channel.addListener(`${event}-${subtype}`, assert1);
    channel.addListener(event, assert2);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 96, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
    }
    function assert2(e) {
      expect(e.type).to.equal(event);
      expect(e.subtype).to.equal(subtype);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
      done();
    }

  });

  it("should dispatch rpn-datadecrement", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "rpn";
    let subtype = "datadecrement";
    let status = 0xB0;      // control change
    let parameter = "referencedistanceratio";
    let parameterMsb = 0x3D;
    let parameterLsb = 0x06;
    let value = 123;

    channel.addListener(`${event}-${subtype}`, assert1);
    channel.addListener(event, assert2);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 97, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
    }
    function assert2(e) {
      expect(e.type).to.equal(event);
      expect(e.subtype).to.equal(subtype);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
      done();
    }

  });

  it("should ignore out-of-order RPN messages", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "rpn";
    let subtype = "datadecrement";
    let status = 0xB0;      // control change
    let parameter = "referencedistanceratio";
    let parameterMsb = 0x3D;
    let parameterLsb = 0x06;
    let value = 123;

    channel.addListener(event, assert);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 97, 456]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, parameterLsb]);

    VIRTUAL_INPUT.PORT.sendMessage([status, 101, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 97, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert(e) {
      expect(e.type).to.equal(event);
      expect(e.subtype).to.equal(subtype);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
      done();
    }

  });


  it("should dispatch nrpn-databuttonincrement (legacy)", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "nrpn";
    let subtype = "databuttonincrement";
    let status = 0xB0;      // control change
    let parameterMsb = 12;
    let parameterLsb = 34;
    let value = 56;

    channel.addListener(`${event}-${subtype}`, assert1);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 99, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 98, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 96, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
      done();
    }

  });

  it("should dispatch nrpn-databuttondecrement (legacy)", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "nrpn";
    let subtype = "databuttondecrement";
    let status = 0xB0;      // control change
    let parameterMsb = 12;
    let parameterLsb = 34;
    let value = 56;

    channel.addListener(`${event}-${subtype}`, assert1);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 99, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 98, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 97, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
      done();
    }

  });

  it("should dispatch rpn-databuttonincrement (legacy)", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "rpn";
    let subtype = "databuttonincrement";
    let status = 0xB0;      // control change
    let parameter = "tuningbank";
    let parameterMsb = 0;
    let parameterLsb = 4;
    let value = 123;

    channel.addListener(`${event}-${subtype}`, assert1);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 96, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
      done();
    }

  });

  it("should dispatch rpn-databuttondecrement (legacy)", function (done) {

    // Arrange
    let channel = WEBMIDI_INPUT.channels[1];
    let event = "rpn";
    let subtype = "databuttondecrement";
    let status = 0xB0;      // control change
    let parameter = "referencedistanceratio";
    let parameterMsb = 0x3D;
    let parameterLsb = 0x06;
    let value = 123;

    channel.addListener(`${event}-${subtype}`, assert1);

    // Act
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, parameterMsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, parameterLsb]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 97, value]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 101, 127]);
    VIRTUAL_INPUT.PORT.sendMessage([status, 100, 127]);

    // Assert
    function assert1(e) {
      expect(e.type).to.equal(`${event}-${subtype}`);
      expect(e.rawValue).to.equal(value);
      expect(e.parameter).to.equal(parameter);
      done();
    }

  });


  describe("destroy()", function () {

    it("should set input and channel number to null", function () {

      // Arrange
      let channel = WEBMIDI_INPUT.channels[1];

      // Act
      channel.destroy();

      // Assert
      expect(channel.input).to.be.null;
      expect(channel.number).to.be.null;

    });

    it("should remove all listeners", function () {

      // Arrange
      let channel = WEBMIDI_INPUT.channels[1];
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
      let channel = WEBMIDI_INPUT.channels[1];
      let results = [];

      // Act
      for (let cc in Enumerations.CHANNEL_MODE_MESSAGES) {
        let number = Enumerations.CHANNEL_MODE_MESSAGES[cc];
        results.push(channel.getChannelModeByNumber(number));
      }

      // Assert
      results.forEach(result => {
        expect(result).to.be.a("string");
      });

    });

    it("should return 'false' for numbers with no match", function () {

      // Arrange
      let channel = WEBMIDI_INPUT.channels[1];
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
      let channel = WEBMIDI_INPUT.channels[1];
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
      let channel = WEBMIDI_INPUT.channels[1];
      let results = [];

      // Act
      for (let cc in Enumerations.CONTROL_CHANGE_MESSAGES) {
        let number = Enumerations.CONTROL_CHANGE_MESSAGES[cc].number;
        results.push(channel.getCcNameByNumber(number));
      }

      // Assert
      results.forEach(result => {
        expect(result).to.be.a("string");
      });

    });

  });

  describe("getNoteState()", function () {

    it("should return correct play state", function (done) {

      // Arrange
      let channel = WEBMIDI_INPUT.channels[1];
      let status = 0x90; // note on on channel 1
      let event = "noteon";
      let velocity = 127;
      let note = 64;

      channel.addListener(event, assert);

      // Act
      VIRTUAL_INPUT.PORT.sendMessage([status, note, velocity]);

      // Assert
      function assert() {

        for (let i = 0; i < 128; i++) {
          if (i === note) {
            expect(channel.getNoteState(note)).to.equal(true);
            expect(channel.getNoteState(new Note(i))).to.equal(true);
            expect(channel.getNoteState(Utilities.toNoteIdentifier(i))).to.equal(true);
          } else {
            expect(channel.getNoteState(i)).to.equal(false);
            expect(channel.getNoteState(new Note(i))).to.equal(false);
            expect(channel.getNoteState(Utilities.toNoteIdentifier(i))).to.equal(false);
          }
        }

        done();

      }

    });

    it("should return correct play state (with octaveOffset", function (done) {

      // Arrange
      let channel = WEBMIDI_INPUT.channels[1];
      let event = "noteon";
      let velocity = 127;
      let index = 0;
      let status = 0x90;

      WebMidi.octaveOffset = 1;
      WEBMIDI_INPUT.octaveOffset = 1;
      channel.octaveOffset = 1;

      let notes = [
        {identifier: "C-4", number: 0},
        {identifier: "C1", number: 60},
        {identifier: "G6", number: 127}
      ];

      channel.addListener(event, assert);

      // Act
      notes.forEach(note => {
        VIRTUAL_INPUT.PORT.sendMessage([status, note.number, velocity]);
      });

      // Assert
      function assert() {

        index++;
        if (index < notes.length) return;

        notes.forEach(note => {
          expect(channel.getNoteState(new Note(note.identifier))).to.equal(true);
        });

        done();

      }

    });

  });

});
