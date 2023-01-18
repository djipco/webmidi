const expect = require("chai").expect;
const {Enumerations} = require("../dist/cjs/webmidi.cjs.js");

// VERIFIED
describe("Enumerations Object", function() {

  describe("get CHANNEL_MESSAGES()", function() {
    it("should return an object with valid properties", function() {
      expect(Enumerations.CHANNEL_MESSAGES.pitchbend).to.equal(0xE);
    });
  });

  describe("get MIDI_REGISTERED_PARAMETER()", function() {
    it("should return an object with valid properties", function() {
      expect(Enumerations.REGISTERED_PARAMETERS.rollangle[0]).to.equal(0x3D);
      expect(Enumerations.REGISTERED_PARAMETERS.rollangle[1]).to.equal(0x08);
    });
  });

  describe("get CONTROL_CHANGE_MESSAGES()", function() {
    it("should return an an array with valid properties", function() {
      expect(Enumerations.CONTROL_CHANGE_MESSAGES[73].name).to.equal("attacktime");
    });
  });

  // Legacy (remove in v4)
  describe("get MIDI_CONTROL_CHANGE_MESSAGES()", function() {
    it("should return an object with valid properties", function() {
      expect(Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.registeredparameterfine).to.equal(101);
    });
  });

});
