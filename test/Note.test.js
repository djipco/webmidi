const expect = require("chai").expect;
const {WebMidi, Note, Utilities} = require("../dist/webmidi.cjs.js");

describe("Note Object", function() {

  describe("constructor()", function () {

    it("should return 'Note' with defaults when using number and no options", function() {

      // Arrange
      let notes = [];

      // Act
      for (let i = 0; i <= 127; i++) notes.push(new Note(i));

      // Assert
      notes.forEach((note, i) => {

        const compare = Utilities.getFragments(Utilities.toNoteIdentifier(i));

        expect(note).to.be.an.instanceof(Note);
        expect(note.attack).to.equal(WebMidi.defaults.note.attack);
        expect(note.release).to.equal(WebMidi.defaults.note.release);
        expect(note.duration).to.equal(WebMidi.defaults.note.duration);

        expect(note.name).to.equal(compare.name);
        expect(note.accidental).to.equal(compare.accidental);
        expect(note.octave).to.equal(compare.octave);

      });

    });

    it("should return 'Note' with defaults when using identifier and no options", function() {

      // Arrange
      let values = [
        "C-1",
        "D#0",
        "E##1",
        "Fb2",
        "Fbb3",
        "G9",
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {

        const note = new Note(value);

        expect(note).to.be.an.instanceof(Note);
        expect(note.attack).to.equal(WebMidi.defaults.note.attack);
        expect(note.release).to.equal(WebMidi.defaults.note.release);
        expect(note.duration).to.equal(WebMidi.defaults.note.duration);

        expect(note.identifier).to.equal(value);
        expect(note.name).to.equal(Utilities.getFragments(value).name);
        expect(note.accidental).to.equal(Utilities.getFragments(value).accidental);
        expect(note.octave).to.equal(Utilities.getFragments(value).octave);

      }

    });

    it("should return 'Note' with correct props when using number and options", function() {

      // Arrange
      let notes = [];
      let options = {duration: 12.34, attack: 0.26, release: 0.79};

      // Act
      for (let i = 0; i <= 127; i++) notes.push(new Note(i, options));

      // Assert
      notes.forEach(note => {
        expect(note).to.be.an.instanceof(Note);
        expect(note.attack).to.equal(options.attack);
        expect(note.rawAttack).to.equal(Utilities.to7Bit(options.attack));
        expect(note.release).to.equal(options.release);
        expect(note.rawRelease).to.equal(Utilities.to7Bit(options.release));
        expect(note.duration).to.equal(options.duration);
      });

    });

    it("should return 'Note' with correct props when using identifier and options", function() {

      // Arrange
      let values = [
        "C-1",
        "D#0",
        "E##1",
        "Fb2",
        "Fbb3",
        "G9",
      ];
      let options = {duration: 12.34, attack: 0.13, release: 0.98};

      // Act
      values.forEach(value => {
        assert(new Note(value, options));
      });

      // Assert
      function assert(note) {
        expect(note).to.be.an.instanceof(Note);
        expect(note.attack).to.equal(options.attack);
        expect(note.rawAttack).to.equal(Utilities.to7Bit(options.attack));
        expect(note.release).to.equal(options.release);
        expect(note.rawRelease).to.equal(Utilities.to7Bit(options.release));
        expect(note.duration).to.equal(options.duration);
      }

    });

    it("should prioritize rawAttack and rawRelease when defined", function() {

      // Arrange
      const identifier = "C4";
      let options = {attack: 0.12, rawAttack: 100, release: 0.98, rawRelease: 5};

      // Act
      const note = new Note(identifier, options);

      // Assert
      expect(note.attack).to.equal(Utilities.from7Bit(options.rawAttack));
      expect(note.release).to.equal(Utilities.from7Bit(options.rawRelease));

    });

    it("should offset 'Note' if 'octaveOffset' is specified when using number", function() {

      // Arrange
      let triplets = [
        {number: 0, octaveOffset: 0, identifier: "C-1"},
        {number: 0, octaveOffset: 1, identifier: "C0"},
        {number: 60, octaveOffset: 0, identifier: "C4"},
        {number: 60, octaveOffset: -1, identifier: "C3"},
        {number: 127, octaveOffset: 0, identifier: "G9"},
        {number: 127, octaveOffset: -1, identifier: "G8"}
      ];

      // Act
      triplets.forEach(assert);

      // Assert
      function assert(triplet) {
        const note = new Note(triplet.number, {octaveOffset: triplet.octaveOffset});
        expect(note.identifier).to.equal(triplet.identifier);
      }

    });

    it("should ignore 'octaveOffset' for notes specified by identifier", function() {

      // Arrange
      let triplets = [
        {number: 0, octaveOffset: -1, identifier: "C0"},
        {number: 0, octaveOffset: 2, identifier: "C0"},
        {number: 60, octaveOffset: -3, identifier: "C4"},
        {number: 60, octaveOffset: 4, identifier: "C4"},
        {number: 127, octaveOffset: -5, identifier: "G9"},
        {number: 127, octaveOffset: 6, identifier: "G9"}
      ];

      // Act
      triplets.forEach(assert);

      // Assert
      function assert(triplet) {
        const note = new Note(triplet.identifier, {octaveOffset: triplet.octaveOffset});
        expect(note.identifier).to.equal(triplet.identifier);
      }

    });

    it("should throw when using invalid value", function() {

      // Arrange
      let values = [
        -1,
        128,
        Infinity,
        -Infinity,
        "0",
        "127",
        undefined,
        null,
        "X2",
        "Cbbb4",
        "test",
        [],
        {},
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(function() {
          new Note(value);
        }).to.throw();
      }

    });

    it("should throw when using invalid duration", function() {

      // Arrange
      let values = [
        -1,
        -Infinity,
        "test",
        [],
        -1.5,
        -0.6,
        {},
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(function() {
          new Note("B3", {duration: value});
        }).to.throw(RangeError);
      }

    });

    it("should throw when using invalid attack or release", function() {

      // Arrange
      let values = [
        -1,
        2,
        -Infinity,
        "test",
        [],
        {},
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {

        expect(function() {
          new Note("Db5", {attack: value});
        }).to.throw(RangeError);

        expect(function() {
          new Note("E##5", {release: value});
        }).to.throw(RangeError);

      }

    });

    it("should throw when using invalid rawAttack or rawRelease", function() {

      // Arrange
      let values = [
        -1,
        128,
        -Infinity,
        "test",
        [],
        {},
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {

        expect(function() {
          new Note("Db5", {attack: value});
        }).to.throw(RangeError);

        expect(function() {
          new Note("E##5", {release: value});
        }).to.throw(RangeError);

      }

    });

    it("should throw when using invalid octaveOffset", function() {

      // Arrange
      let values = [
        Infinity,
        -Infinity,
        "test",
        [],
        {},
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {

        expect(function() {
          new Note(123, {octaveOffset: value});
        }).to.throw(RangeError);

      }

    });

  });

  describe("set identifier()", function () {

    it("should throw error if setting to an invalid value", function() {

      // Arrange
      let note = new Note(42);
      let values = [
        -1,
        128,
        Infinity,
        -Infinity,
        "0",
        "127",
        undefined,
        null,
        "X2",
        "Cbbb4",
        "test",
        [],
        {},
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => note.identifier = value).to.throw(Error);
      }

    });

  });

  describe("set attack()", function () {

    it("should throw error if setting to an invalid value", function() {

      // Arrange
      let note = new Note(42);
      let values = [
        -1,
        2,
        -Infinity,
        "test",
        [],
        {},
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => note.attack = value).to.throw(RangeError);
      }

    });

  });

  describe("set release()", function () {

    it("should throw error if setting to an invalid value", function() {

      // Arrange
      let note = new Note(42);
      let values = [
        -1,
        2,
        -Infinity,
        "test",
        [],
        {},
        NaN
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => note.release = value).to.throw(RangeError);
      }

    });

  });

  describe("set duration()", function () {

    it("should throw error if invalid duration is specified", function() {

      // Arrange
      let note = new Note(42);
      let values = [
        -1,
        -Infinity,
        "test",
        [],
        -1.5,
        -0.6,
        {},
        NaN,
        null,
        undefined
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => note.duration = value).to.throw();
      }

    });

  });

  describe("set name()", function () {

    it("should throw error if invalid name is specified", function() {

      // Arrange
      let note = new Note(42);
      let values = [
        -1,
        -Infinity,
        "test",
        "H",
        [],
        -1.5,
        -0.6,
        {},
        NaN,
        null,
        undefined
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => note.name = value).to.throw();
      }

    });

  });

  describe("set accidental()", function () {

    it("should throw error if invalid accidental is specified", function() {

      // Arrange
      let note = new Note(42);
      let values = [
        -1,
        "###",
        "bbb",
        NaN,
        null,
        undefined
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => note.accidental = value).to.throw();
      }

    });

  });

  describe("set octave()", function () {

    it("should throw error if invalid octave is specified", function() {

      // Arrange
      let note = new Note(42);
      let values = [
        Infinity,
        -Infinity,
        "abc",
        NaN,
        null,
        undefined
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => note.octave = value).to.throw();
      }

    });

  });

});
