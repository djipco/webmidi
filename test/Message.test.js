const expect = require("chai").expect;
const {Message, WebMidi} = require("../dist/webmidi.cjs.js");

describe("Message Object", function() {

  describe("constructor()", function() {

    it("should correctly set the type of message for system messages", function() {

      // Arrange
      let data = new Uint8Array(3);

      const items = [
        {type: "sysex", status: 240},
        {type: "timecode", status: 241},
        {type: "songposition", status: 242},
        {type: "songselect", status: 243},
        {type: "tunerequest", status: 246},
        {type: "sysexend", status: 247},
        {type: "clock", status: 248},
        {type: "start", status: 250},
        {type: "continue", status: 251},
        {type: "stop", status: 252},
        {type: "activesensing", status: 254},
        {type: "reset", status: 255}
      ];

      // Act
      items.forEach(item => {
        data[0] = item.status;
        const message = new Message(data);
        expect(message.isSystemMessage).to.be.true;
        expect(message.type).to.equal(item.type);
      });

    });

    it("should correctly set properties for sysex with basic manufacturer code", function() {

      // Arrange
      let data = new Uint8Array(6);
      data[0] = WebMidi.MIDI_SYSTEM_MESSAGES.sysex;     // sysex
      data[1] = 0x42;                                   // Korg
      data[2] = 1;                                      // Some data
      data[3] = 2;                                      // Some data
      data[4] = 3;                                      // Some data
      data[5] = WebMidi.MIDI_SYSTEM_MESSAGES.sysexend;  // sysex end

      // Act
      const message = new Message(data);

      // Assert
      expect(message.manufacturerId).to.have.ordered.members([data[1]]);
      expect(message.dataBytes).to.have.ordered.members([data[2], data[3], data[4]]);

    });

    it("should correctly set properties for sysex with extended manufacturer code", function() {

      // Arrange
      let data = new Uint8Array(8);
      data[0] = WebMidi.MIDI_SYSTEM_MESSAGES.sysex;     // sysex
      data[1] = 0;                                      // MOTU (byte 1)
      data[2] = 0;                                      // MOTU (byte 2)
      data[3] = 0x3B;                                   // MOTU (byte 3)
      data[4] = 1;                                      // Some data
      data[5] = 2;                                      // Some data
      data[6] = 3;                                      // Some data
      data[7] = WebMidi.MIDI_SYSTEM_MESSAGES.sysexend;  // sysex end

      // Act
      const message = new Message(data);

      // Assert
      expect(message.manufacturerId).to.have.ordered.members([data[1], data[2], data[3]]);
      expect(message.dataBytes).to.have.ordered.members([data[4], data[5], data[6]]);

    });

    it("should correctly set the type of message for channel messages");
    // it("should correctly set the type of message for channel messages", function() {
    //
    //   // Arrange
    //   let data = new Uint8Array(3);
    //
    //   const items = [
    //     {noteoff: 0x8},
    //     {noteon: 0x9},
    //     {keyaftertouch: 0xA},
    //     {controlchange: 0xB},
    //     {programchange: 0xC},
    //     {channelaftertouch: 0xD},
    //     {pitchbend: 0xE},
    //   ];
    //
    //   // Act
    //   items.forEach(item => {
    //     data[0] = item.status;
    //     const message = new Message(data);
    //     expect(message.isSystemMessage).to.be.true;
    //     expect(message.type).to.equal(item.type);
    //   });
    //
    // });

  });

});

// ,data[0] = (WebMidi.MIDI_SYSTEM_MESSAGES[value] << 4) + (this.number - 1)
