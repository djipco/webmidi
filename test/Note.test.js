const expect = require("chai").expect;
const {WebMidi, Note} = require("../dist/webmidi.cjs.js");

describe("Note Object", function() {

  describe("constructor()", function () {

    it("should return 'Note' with defaults when using number and no options", function() {

      // Arrange
      let notes = [];

      // Act
      for (let i = 0; i <= 127; i++) notes.push(new Note(i));

      // Assert
      notes.forEach(note => {
        expect(note).to.be.an.instanceof(Note);
        expect(note.attack).to.equal(WebMidi.defaults.note.attack);
        expect(note.release).to.equal(WebMidi.defaults.note.release);
        expect(note.duration).to.equal(WebMidi.defaults.note.duration);
      });

    });

    it("should return 'Note' with defaults when using name and no options", function() {

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
      values.forEach(value => {
        assert(new Note(value));
      });

      // Assert
      function assert(note) {
        expect(note).to.be.an.instanceof(Note);
        expect(note.attack).to.equal(WebMidi.defaults.note.attack);
        expect(note.release).to.equal(WebMidi.defaults.note.release);
        expect(note.duration).to.equal(WebMidi.defaults.note.duration);
      }

    });

    it("should return 'Note' with correct props when using number and options", function() {

      // Arrange
      let notes = [];
      let options = {duration: 12.34, attack: 56, release: 78};

      // Act
      for (let i = 0; i <= 127; i++) notes.push(new Note(i, options));

      // Assert
      notes.forEach(note => {
        expect(note).to.be.an.instanceof(Note);
        expect(note.attack).to.equal(options.attack);
        expect(note.release).to.equal(options.release);
        expect(note.duration).to.equal(options.duration);
      });

    });

    it("should return 'Note' with correct props when using name and options", function() {

      // Arrange
      let values = [
        "C-1",
        "D#0",
        "E##1",
        "Fb2",
        "Fbb3",
        "G9",
      ];
      let options = {duration: 12.34, attack: 56, release: 78};

      // Act
      values.forEach(value => {
        assert(new Note(value, options));
      });

      // Assert
      function assert(note) {
        expect(note).to.be.an.instanceof(Note);
        expect(note.attack).to.equal(options.attack);
        expect(note.release).to.equal(options.release);
        expect(note.duration).to.equal(options.duration);
      }

    });

    it("should offset 'Note' if 'octaveOffset' is specified when using number", function() {

      // Arrange
      let triplets = [
        {number: 0, octaveOffset: 0, name: "C-1"},
        {number: 0, octaveOffset: 1, name: "C0"},
        {number: 60, octaveOffset: 0, name: "C4"},
        {number: 60, octaveOffset: -1, name: "C3"},
        {number: 127, octaveOffset: 0, name: "G9"},
        {number: 127, octaveOffset: -1, name: "G8"}
      ];

      // Act
      triplets.forEach(assert);

      // Assert
      function assert(triplet) {
        const note = new Note(triplet.number, {octaveOffset: triplet.octaveOffset});
        expect(note.name).to.equal(triplet.name);
      }

    });

    it("should ignore 'octaveOffset' for notes specified by name", function() {

      // Arrange
      let triplets = [
        {number: 0, octaveOffset: -1, name: "C0"},
        {number: 0, octaveOffset: 2, name: "C0"},
        {number: 60, octaveOffset: -3, name: "C4"},
        {number: 60, octaveOffset: 4, name: "C4"},
        {number: 127, octaveOffset: -5, name: "G9"},
        {number: 127, octaveOffset: 6, name: "G9"}
      ];

      // Act
      triplets.forEach(assert);

      // Assert
      function assert(triplet) {
        const note = new Note(triplet.name, {octaveOffset: triplet.octaveOffset});
        expect(note.name).to.equal(triplet.name);
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

  describe("set name()", function () {

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
        expect(() => note.name = value).to.throw(Error);
      }

    });

  });

  describe("set attack()", function () {

    it("should throw error if setting to an invalid value", function() {

      // Arrange
      let note = new Note(42);
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

});
