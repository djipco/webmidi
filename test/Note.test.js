const expect = require("chai").expect;
const {Note} = require("../dist/webmidi.cjs.js");

describe("Note Object", function() {

  describe("constructor()", function () {

    it("should return 'Note' object with correct values", function() {

      // Arrange
      let notes = [];
      let options = {
        duration: 10,
        attack: 0.25,
        release: 0.5,
        rawAttack: 127,
        rawRelease: 64
      };

      // Act
      for (let i = 0; i <= 127; i++) notes.push(new Note(i, options));

      // Assert
      notes.forEach((note, index) => {
        expect(note).to.be.an.instanceof(Note);
        expect(note.number).to.equal(index);
        expect(note.rawAttack).to.equal(options.rawAttack);
        expect(note.rawRelease).to.equal(options.rawRelease);
      });

    });

    it("should throw error if 'value' parameter is invalid", function() {

      // Arrange
      let values = [-1, 128, "B-2", "G#9", "xxx", "", [], {}, NaN, undefined, null, Infinity];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(
          () => new Note(value)
        ).to.throw(Error);
      }

    });

    it("should throw error for invalid durations", function() {

      // Arrange
      let values = [
        -Infinity,
        -1,
        -1.5,
        -0.6,
        "xxx",
        [],
        {},
        NaN
      ];
      let note = 60;

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(
          () => {
            new Note(note, {duration: value});
          }
        ).to.throw();
      };

    });

    it("should set correct default value for velocities", function() {

      // Arrange
      let number = 60;

      // Act
      let note = new Note(number);

      // Assert
      expect(note.rawAttack).to.equal(64);
      expect(note.rawRelease).to.equal(64);

    });

    it("should give priority to rawAttack/rawRelease over attack/release", function() {

      // Arrange
      let number = 60;
      let options = {
        attack: 0,
        release: 0,
        rawAttack: 127,
        rawRelease: 127
      };

      // Act
      let note = new Note(number, options);

      // Assert
      expect(note.attack).to.equal(1);
      expect(note.release).to.equal(1);
      expect(note.rawAttack).to.equal(options.rawAttack);
      expect(note.rawRelease).to.equal(options.rawRelease);

    });

    it("should throw error for invalid rawAttack and rawRelease velocities", function() {

      // Arrange
      let number = 60;
      let values = [
        -1,
        128,
        "xxx",
        [],
        {},
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {

        expect(() => {
          new Note(number, {rawAttack: value});
        }).to.throw();

        expect(() => {
          new Note(number, {rawRelease: value});
        }).to.throw();

      }

    });

    it("should throw error for invalid attack and release velocities", function() {

      // Arrange
      let number = 60;
      let values = [
        -1,
        2,
        "xxx",
        [],
        {},
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {

        expect(() => {
          new Note(number, {attack: value});
        }).to.throw();

        expect(() => {
          new Note(number, {release: value});
        }).to.throw();

      }

    });

    it("should report the correct octave value", function() {

      // Arrange
      let lowValues = ["C-1", 0];
      let lowTarget = -1;
      let highValues = ["G9", 127];
      let highTarget = 9;

      // Assert
      lowValues.forEach(param => {
        let note = new Note(param);
        expect(note.octave).to.equal(lowTarget);
      });

      highValues.forEach(param => {
        let note = new Note(param);
        expect(note.octave).to.equal(highTarget);
      });

    });

  });

  describe("set name()", function () {

    it("should throw error if passing invalid note name", function() {

      // Arrange
      let note = new Note(42);
      let values = [-1, 128, undefined, null, NaN, "xxx", "C-2", "G10"];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => note.name = value).to.throw(Error);
      }

    });

  });

  describe("set number()", function () {

    it("should throw error if passing invalid note number", function() {

      // Arrange
      let note = new Note(42);
      let values = [
        "abc",
        null,
        undefined,
        -1,
        128,
        function () {},
        {},
        "555",
        "H3",
        "Z#8",
        Infinity,
        -Infinity
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(param) {
        expect(() => note.number = param).to.be.throw(Error);
      };

    });

  });

  describe("set duration()", function () {

    it("should throw error if invalid duration is specified", function() {

      // Arrange
      let note = new Note(42);
      let values = [
        "abc", null, function () {}, {}, "H3", NaN, "-1", -1, -Infinity
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => note.duration = value).to.throw();
      }

    });

  });

});
