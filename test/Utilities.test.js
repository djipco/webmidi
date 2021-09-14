const expect = require("chai").expect;
const {Utilities, WebMidi, Note} = require("../dist/webmidi.cjs.js");

// VERIFIED
describe("Utilities Object", function() {

  describe("getNoteNumberByName()", function() {

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

    it("should throw error if invalid name is provided", function() {

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
        "Cbb-1",
        "H3",
        "G##9"
      ];

      // Act
      values.forEach(assert);

      // Assert

      function assert(value) {
        expect(function() {
          Utilities.getNoteNumberByName(value);
        }).to.throw();
      }

    });

    it("should return the correct MIDI note number when using octaveOffset", function() {

      // Arrange
      const items = [
        {name: "C-1", octaveOffset: 1, number: 12},
        {name: "C4", octaveOffset: -1, number: 48},
        {name: "C4", octaveOffset: 1, number: 72},
        {name: "G9", octaveOffset: -1, number: 115},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.getNoteNumberByName(item.name, item.octaveOffset)
        ).to.equal(item.number);
      }

    });

    it("should throw when using invalid octaveOffset", function() {

      // Arrange
      const items = [
        NaN,
        Infinity,
        -Infinity,
        [],
        {},
        -1,
        20
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(function () {
          Utilities.getNoteNumberByName("C-1", item);
        }).to.throw(RangeError);
      }

    });

  });

  describe("getNoteFragments()", function() {

    it("should return the correct fragments", function () {

      // Arrange
      const items = [
        {name: "C-1", letter: "C", accidental: undefined, octave: -1},
        {name: "D##0", letter: "D", accidental: "##", octave: 0},
        {name: "E#1", letter: "E", accidental: "#", octave: 1},
        {name: "Fb8", letter: "F", accidental: "b", octave: 8},
        {name: "Fbb9", letter: "F", accidental: "bb", octave: 9},
        {name: "G9", letter: "G", accidental: undefined, octave: 9},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        const fragments = Utilities.getNoteFragments(item.name);
        expect(fragments.name).to.equal(item.name);
        expect(fragments.letter).to.equal(item.letter);
        expect(fragments.accidental).to.equal(item.accidental);
        expect(fragments.octave).to.equal(item.octave);
      }

    });

    it("should should throw when passing invalid note name", function () {

      // Arrange
      const items = [
        NaN,
        Infinity,
        -Infinity,
        [],
        {},
        -1,
        20,
        "C###3",
        "Bbbb6",
        "test"
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(function () {
          Utilities.getNoteNumberByName(item);
        }).to.throw(TypeError);
      }

    });

  });

  describe("sanitizeChannels()", function() {

    it("should return only valid MIDI channel numbers", function() {

      // Valid values are 1, 8 and 16
      let channels = [
        1, -1, -2.3, 0, 17, "x", NaN, null, Infinity, 8, -Infinity, {}, true, false, [undefined],
        4e2, 16
      ];
      expect(Utilities.sanitizeChannels(channels).length).to.equal(3);
      expect(Utilities.sanitizeChannels([]).length).to.equal(0);
      expect(Utilities.sanitizeChannels([9.7])[0]).to.equal(9);
      expect(Utilities.sanitizeChannels([1e1])[0]).to.equal(10);
      expect(Utilities.sanitizeChannels("none").length).to.equal(0);

    });

    it('should return all channels when "all" is specified', function() {
      expect(Utilities.sanitizeChannels("all").length).to.equal(16);
    });

    it("should return an empty array when 'none' is passed", function() {
      expect(WebMidi.sanitizeChannels("none").length).to.equal(0);
    });

  });

  describe("convertToTimestamp()", function() {

    beforeEach("Enable WebMidi", async function() {
      await WebMidi.enable({sysex: true});
    });

    it("should return timestamp when passed string starting with '+'", function() {
      // Assert
      expect(WebMidi.convertToTimestamp("+1000")).to.be.a("number");
    });

    it("should return false for invalid input", function() {

      // Arrange
      let values = [undefined, null, false, [], {}, "", "-1", "+", -1, -Infinity];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(WebMidi.convertToTimestamp(value)).to.be.false;
      }

    });

    it("should return a positive number as is", function() {

      // Arrange
      let values = [0, 1, Infinity];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(WebMidi.convertToTimestamp(value)).to.equal(value);
      }

    });

  });

  describe("getNoteNameByNumber()", function() {

    it("should return the correct note name", function() {

      // Arrange
      const items = [
        {number: 0, name: "C-1"},
        {number: 60, name: "C4"},
        {number: 127, name: "G9"},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(Utilities.getNoteNameByNumber(item.number)).to.equal(item.name);
      }

    });

    it("should return the correct name when using 'octaveOffset'", function() {

      // Arrange
      const items = [
        {name: "C-1", octaveOffset: 1, number: 12},
        {name: "C4", octaveOffset: -1, number: 48},
        {name: "C4", octaveOffset: 1, number: 72},
        {name: "G9", octaveOffset: -1, number: 115},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.getNoteNumberByName(item.name, item.octaveOffset)
        ).to.equal(item.number);
      }

    });

    it("should throw error if invalid number is provided", function() {

      // Arrange
      const values = [
        -1,
        128,
        "",
        "abc",
        null,
        undefined,
        {},
        "555"
      ];

      // Act
      values.forEach(assert);

      // Assert

      function assert(value) {
        expect(function() {
          Utilities.getNoteNameByNumber(value);
        }).to.throw();
      }

    });

    it("should throw when using invalid octaveOffset", function() {

      // Arrange
      const items = [
        NaN,
        Infinity,
        -Infinity,
        [],
        {},
        "abc"
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(function () {
          Utilities.getNoteNameByNumber(60, item);
        }).to.throw(RangeError);
      }

    });

  });

  describe("guessNoteNumber()", function() {

    it("should return the correct number for ints and floats", function() {

      // Arrange
      const items = [
        0,
        0.0,
        0.1,
        0.5,
        0.9
      ];

      // Act
      for (let i = 0; i <= 127; i++) {
        assert(i);
      }

      // Assert
      function assert(value) {

        items.forEach(item => {
          expect(
            Utilities.guessNoteNumber(value + item)
          ).to.equal(value);
        });

      }

    });

    it("should return the correct number for numbers in strings", function() {

      // Arrange
      const items = [
        "abc",
        ".",
        undefined,
        null
      ];

      // Act
      for (let i = 0; i <= 127; i++) {
        assert(i);
      }

      // Assert
      function assert(value) {

        items.forEach(item => {
          expect(
            Utilities.guessNoteNumber(value.toString() + item)
          ).to.equal(value);
        });

      }

    });

    it("should return the correct number for note names", function() {

      // Arrange
      const items = [
        {name: "C-1", number: 0},
        {name: "D#0", number: 15},
        {name: "D##0", number: 16},
        {name: "C4", number: 60},
        {name: "Eb4", number: 63},
        {name: "Ebb4", number: 62},
        {name: "G9", number: 127},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.guessNoteNumber(item.name)
        ).to.equal(item.number);
      }

    });

    it("should strip whitespace for note names", function() {

      // Arrange
      const items = [
        {name: " C-1 ", number: 0},
        {name: "\nD#0", number: 15},
        {name: "D##0\t", number: 16},
        {name: "\rC4", number: 60},
        {name: "\rEb4\r", number: 63},
        {name: "\n\r\t Ebb4", number: 62},
        {name: "G9\n\r\t ", number: 127},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.guessNoteNumber(item.name)
        ).to.equal(item.number);
      }

    });

    it("should return the correct number for note names when using octaveOffset", function() {

      // Arrange
      const items = [
        {name: "C-1", number: 0, offset: 0},
        {name: "C-1", number: 12, offset: 1},
        {name: "C4", number: 60, offset: 0},
        {name: "C4", number: 48, offset: -1},
        {name: "C4", number: 72, offset: 1},
        {name: "G9", number: 127, offset: 0},
        {name: "G9", number: 115, offset: -1},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.guessNoteNumber(item.name, item.offset)
        ).to.equal(item.number);
      }

    });

    it("should disregard octaveOffset for note numbers", function() {

      // Arrange
      const items = [
        {number: 0, offset: -3},
        {number: 64, offset: -2},
        {number: 127, offset: -1},
        {number: "0", offset: 1},
        {number: "64.0", offset: 2},
        {number: "127x", offset: 3},
        {number: 0.1, offset: 4},
        {number: 64.5, offset: 5},
        {number: 127.9, offset: 6},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.guessNoteNumber(item.number, item.offset)
        ).to.equal(parseInt(item.number));
      }

    });

    it("should return false for note names when using out-of-bounds octaveOffset", function() {

      // Arrange
      const items = [
        {name: "C-1", offset: -10},
        {name: "C-1", offset: -1},
        {name: "G9", offset: 1},
        {name: "G9", offset: 10},
        {name: "C4", offset: 100},
        {name: "C4", offset: -100}
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.guessNoteNumber(item.name, item.offset)
        ).to.be.false;
      }

    });

    it("should return false if invalid input is provided", function() {

      // Arrange
      const items = [
        "abc",
        null,
        undefined,
        -1,
        -1.2,
        128,
        128.1,
        function () {},
        {},
        "555",
        "H3",
        "Z#8",
        Infinity,
        -Infinity,
        -2.3,
        false,
        true
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(WebMidi.guessNoteNumber(item)).to.be.false;
      };

    });

  });

  describe("getNoteObject()", function() {

    it("should return the same note if a note is passed in", function () {

      // Arrange
      const note = new Note("C4", {attack: 123, release: 45, duration: 56});

      // Act
      const result = Utilities.getNoteObject(note);

      // Assert
      expect(result).to.equal(note);
      expect(result.name).to.equal(note.name);
      expect(result.attack).to.equal(note.attack);
      expect(result.release).to.equal(note.release);
      expect(result.duration).to.equal(note.duration);

    });

    it("should return the right note when passing name", function () {

      // Arrange
      const name = "C4";
      const options = {attack: 123, release: 45, duration: 56};

      // Act
      const result = Utilities.getNoteObject(name, options);

      // Assert
      expect(result.name).to.equal(name);
      expect(result.attack).to.equal(options.attack);
      expect(result.release).to.equal(options.release);
      expect(result.duration).to.equal(options.duration);

    });

    it("should return the right note when passing name and octaveOffset", function () {

      // Arrange
      const items = [
        {target: "C0", offset: 1, name: "C-1"},
        {target: "C2", offset: -2, name: "C4"},
        {target: "C6", offset: 2, name: "C4"},
        {target: "G8", offset: -1, name: "G9"}
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        const n = Utilities.getNoteObject(item.name, {octaveOffset: item.offset});
        expect(n.name).to.equal(item.target);
      }

    });

    it("should return the right note when passing number", function () {

      // Arrange
      const number = 60;
      const name = "C4";
      const options = {attack: 123, release: 45, duration: 56};

      // Act
      const result = Utilities.getNoteObject(number, options);

      // Assert
      expect(result.name).to.equal(name);
      expect(result.attack).to.equal(options.attack);
      expect(result.release).to.equal(options.release);
      expect(result.duration).to.equal(options.duration);

    });

    it("should disregard octaveOffset when passing number", function () {

      // Arrange
      const items = [
        {number: 0, offset: -3, name: "C-1"},
        {number: 64, offset: -2, name: "E4"},
        {number: 127, offset: -1, name: "G9"},
        {number: "0", offset: 1, name: "C-1"},
        {number: "64.0", offset: 2, name: "E4"},
        {number: "127x", offset: 3, name: "G9"},
        {number: 0.1, offset: 4, name: "C-1"},
        {number: 64.5, offset: 5, name: "E4"},
        {number: 127.9, offset: -6, name: "G9"}
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        const n = Utilities.getNoteObject(item.number, {octaveOffset: item.offset});
        expect(n.name).to.equal(item.name);
      }

    });

    it("should throw if invalid input is provided", function() {

      // Arrange
      const items = [
        "abc",
        null,
        undefined,
        -1,
        -1.2,
        128,
        128.1,
        function () {},
        {},
        "555",
        "H3",
        "Z#8",
        Infinity,
        -Infinity,
        -2.3,
        false,
        true
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(function () {
          Utilities.getNoteObject(item);
        }).to.throw(TypeError);
      };

    });

  });

  describe("getValidNoteArray()", function() {

    it("should return an array of valid notes when passing number array", function () {

      // Arrange
      const items = [
        0,
        60,
        127
      ];
      const targets = [
        "C-1",
        "C4",
        "G9"
      ];

      // Act
      const results = Utilities.getValidNoteArray(items);

      // Assert
      results.forEach((result, index) => {
        expect(result.name).to.equal(targets[index]);
      });

    });

    it("should return an array of valid notes when passing name array", function () {

      // Arrange
      const items = [
        "C-1",
        "C4",
        "G9"
      ];

      // Act
      const results = Utilities.getValidNoteArray(items);

      // Assert
      results.forEach((result, index) => {
        expect(result.name).to.equal(items[index]);
      });

    });

    it("should return an array of valid notes when passing notes array", function () {

      // Arrange
      const items = [
        new Note("C-1"),
        new Note("C4"),
        new Note("G9")
      ];

      // Act
      const results = Utilities.getValidNoteArray(items);

      // Assert
      results.forEach((result, index) => {
        expect(result).to.equal(items[index]);
      });

    });

    it("should return an array of valid notes when passing single number", function () {

      // Arrange
      const items = [
        0,
        60,
        127
      ];
      const targets = [
        "C-1",
        "C4",
        "G9"
      ];
      const results = [];

      // Act
      items.forEach(item => {
        results.push(Utilities.getValidNoteArray(item));
      });

      // Assert
      results.forEach((result, index) => {
        expect(result[0].name).to.equal(targets[index]);
      });

    });

    it("should return an array of valid notes when passing single name", function () {

      // Arrange
      const items = [
        "C-1",
        "C4",
        "G9"
      ];
      const results = [];

      // Act
      items.forEach(item => {
        results.push(Utilities.getValidNoteArray(item));
      });

      // Assert
      results.forEach((result, index) => {
        expect(result[0].name).to.equal(items[index]);
      });

    });

    it("should return an array of valid notes when passing single note", function () {

      // Arrange
      const items = [
        new Note("C-1"),
        new Note("C4"),
        new Note("G9")
      ];
      const results = [];

      // Act
      items.forEach(item => {
        results.push(Utilities.getValidNoteArray(item));
      });

      // Assert
      results.forEach((result, index) => {
        expect(result[0].name).to.equal(items[index].name);
      });

    });

    it("should throw error for invalid values", function() {

      // Arrange
      let values = [
        "abc",
        null,
        undefined,
        -1,
        128,
        {},
        "555",
        "H3",
        "Z#8",
        Infinity,
        -Infinity,
        "G10",
        "C-2"
      ];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(() => {
          Utilities.getValidNoteArray(value);
        }).to.throw();
      }

    });

    it("should pass on options to values that aren't 'Note' objects", function() {

      let options1 = {
        duration: 1000,
        attack: 123,
        release: 45
      };

      let notes1 = Utilities.getValidNoteArray([60], options1);
      expect(notes1[0].duration).to.equal(1000);
      expect(notes1[0].attack).to.equal(123);
      expect(notes1[0].release).to.equal(45);

    });

  });

  describe("from7Bit()", function() {

    it("should return the correct value for normal input", function () {

      // Arrange
      const items = [
        {input: 0, output: 0},
        {input: 64, output: 64/127},
        {input: 127, output: 1},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.from7Bit(item.input)
        ).to.equal(item.output);
      }

    });

    it("should return the correct value for out of bounds input", function () {

      // Arrange
      const items = [
        {input: -1, output: 0},
        {input: -10, output: 0},
        {input: 128, output: 1},
        {input: 1280, output: 1},
        {input: Infinity, output: 1},
        {input: -Infinity, output: 0},
        {input: 127.1, output: 1},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.from7Bit(item.input)
        ).to.equal(item.output);
      }

    });

  });

  // TO DO
  describe("buildStructuredMidiMessage()", function() {

    it("should have some tests!!");

  });

});
