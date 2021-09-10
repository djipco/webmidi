const expect = require("chai").expect;
const {Utilities} = require("../dist/webmidi.cjs.js");

describe("Utilities Object", function() {

  describe("getNoteNumberByName()", function() {

    it("should return false if invalid input is provided", function() {

      // Arrange
      const values = [
        "",
        "abc",
        null,
        undefined,
        "G#9",
        "Cb-1",
        "X2",
        function () {},
        {},
        "555",
        "C-3",
        "Cbb-1/",
        "H3",
        "G##9"
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(Utilities.getNoteNumberByName(value)).to.be.false;
      }

    });

    it("should return the correct MIDI note number", function() {

      // Arrange
      const pairs = [
        {name: "C-1", number: 0},
        {name: "C4", number: 60},
        {name: "G9", number: 127}
      ];

      // Act
      pairs.forEach(assert);

      // Assert
      function assert(pair) {
        expect(Utilities.getNoteNumberByName(pair.name)).to.equal(pair.number);
      }

    });

    it.only("should return the correct MIDI note number given octave parameter", function() {

      // Arrange
      const name = "C4";
      const pairs = [
        {offset: "-1", number: 48},
        {offset: "0", number: 60},
        // {offset: "+1", number: 127}
      ];

      // Act
      pairs.forEach(assert);

      // Assert
      function assert(pair) {
        expect(
          Utilities.getNoteNumberByName(name, pair.offset)
        ).to.equal(pair.number);
      }

    });

    it("should return the correct number given the current octave", function() {

      expect(Utilities.getNoteNumberByName("C-1", {octaveOffset: 0})).to.equal(0);
      expect(Utilities.getNoteNumberByName("B-1", {octaveOffset: 0})).to.equal(11);
      expect(Utilities.getNoteNumberByName("C-1", {octaveOffset: -1})).to.equal(12);
      expect(Utilities.getNoteNumberByName("B-1", {octaveOffset: -1})).to.equal(23);
      expect(Utilities.getNoteNumberByName("C-1", {octaveOffset: -10})).to.equal(120);
      expect(Utilities.getNoteNumberByName("B-1", {octaveOffset: -10})).to.be.false;

    });

  });

});

