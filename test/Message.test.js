const expect = require("chai").expect;
const {Message} = require("../dist/webmidi.cjs.js");

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
