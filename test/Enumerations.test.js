const expect = require("chai").expect;
const {Enumerations} = require("../dist/webmidi.cjs.js");

// VERIFIED
describe("Enumerations Object", function() {

  describe("get MIDI_CHANNEL_MESSAGES()", function() {
    it("should return an object with valid properties", function() {
      expect(Enumerations.MIDI_CHANNEL_MESSAGES.pitchbend).to.equal(0xE);
    });
  });

  describe("get MIDI_REGISTERED_PARAMETER()", function() {
    it("should return an object with valid properties", function() {
      expect(Enumerations.MIDI_REGISTERED_PARAMETERS.rollangle[0]).to.equal(0x3D);
      expect(Enumerations.MIDI_REGISTERED_PARAMETERS.rollangle[1]).to.equal(0x08);
    });
  });

  describe("get MIDI_CONTROL_CHANGE_MESSAGES()", function() {
    it("should return an object with valid properties", function() {
      expect(Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.registeredparameterfine).to.equal(101);
    });
  });

});
