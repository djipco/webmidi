const expect = require("chai").expect;
const {Utilities, WebMidi, Note, Enumerations} = require("../dist/cjs/webmidi.cjs.js");

// VERIFIED
describe("Utilities Object", function() {

  describe("toNoteNumber()", function() {

    it("should return the correct MIDI note number", function() {

      // Arrange
      const pairs = [
        {identifier: "C-1", number: 0},
        {identifier: "C4", number: 60},
        {identifier: "G9", number: 127}
      ];

      // Act
      pairs.forEach(assert);

      // Assert
      function assert(pair) {
        expect(Utilities.toNoteNumber(pair.identifier)).to.equal(pair.number);
      }

    });

    it("should throw error if invalid identifier is provided", function() {

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
          Utilities.toNoteNumber(value);
        }).to.throw();
      }

    });

    it("should return the correct MIDI note number when using octaveOffset", function() {

      // Arrange
      const items = [
        {identifier: "C-1", octaveOffset: 1, number: 12},
        {identifier: "C4", octaveOffset: -1, number: 48},
        {identifier: "C4", octaveOffset: 1, number: 72},
        {identifier: "G9", octaveOffset: -1, number: 115},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.toNoteNumber(item.identifier, item.octaveOffset)
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
          Utilities.toNoteNumber("C-1", item);
        }).to.throw(RangeError);
      }

    });

  });

  describe("getNoteDetails()", function() {

    it("should return the correct fragments when using identifier", function () {

      // Arrange
      const items = [
        {identifier: "C-1", name: "C", accidental: undefined, octave: -1},
        {identifier: "D##0", name: "D", accidental: "##", octave: 0},
        {identifier: "E#1", name: "E", accidental: "#", octave: 1},
        {identifier: "Fb8", name: "F", accidental: "b", octave: 8},
        {identifier: "Fbb9", name: "F", accidental: "bb", octave: 9},
        {identifier: "G9", name: "G", accidental: undefined, octave: 9},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        const fragments = Utilities.getNoteDetails(item.identifier);
        expect(fragments.identifier).to.equal(item.identifier);
        expect(fragments.name).to.equal(item.name);
        expect(fragments.accidental).to.equal(item.accidental);
        expect(fragments.octave).to.equal(item.octave);
      }

    });

    it("should return the correct fragments when using number", function () {

      // Arrange
      const items = [
        {number: 0, name: "C", accidental: undefined, octave: -1},
        {number: 59, name: "B", accidental: undefined, octave: 3},
        {number: 60, name: "C", accidental: undefined, octave: 4},
        {number: 61, name: "C", accidental: "#", octave: 4},
        {number: 127, name: "G", accidental: undefined, octave: 9},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        const fragments = Utilities.getNoteDetails(item.number);
        expect(fragments.name).to.equal(item.name);
        expect(fragments.accidental).to.equal(item.accidental);
        expect(fragments.octave).to.equal(item.octave);
      }

    });

    it("should should throw when passing invalid note identifier", function () {

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
          Utilities.toNoteNumber(item);
        }).to.throw(TypeError);
      }

    });

  });

  describe("getCcNameByNumber()", function() {

    it("should return the correct name", function () {

      // Arrange
      const items = [-1, 128, null, undefined, "test"];

      // Act

      // Assert
      for (let i = 0; i <= 127; i++) {
        expect(Utilities.getCcNameByNumber(i))
          .to.equal(Enumerations.CONTROL_CHANGE_MESSAGES[i].name);
      }

      items.forEach(item => {
        expect(Utilities.getCcNameByNumber(item)).to.equal(undefined);
      });

    });

  });

  describe("getCcNumberByName()", function() {

    it("should return the correct number", function () {

      // Arrange
      const items = [
        {name: "bankselectcoarse", number: 0},
        {name: "controller31", number: 31},
        {name: "attacktime", number: 73},
        {name: "polymodeon", number: 127},
      ];

      // Act

      // Assert
      items.forEach(item => {
        expect(Utilities.getCcNumberByName(item.name)).to.equal(item.number);
      });

    });

    it("should return undefined for invalid names", function () {

      // Arrange
      const items = ["", undefined, null, "test"];

      // Act

      // Assert
      items.forEach(item => {
        expect(Utilities.getCcNumberByName(item)).to.equal(undefined);
      });

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
      expect(Utilities.sanitizeChannels("none").length).to.equal(0);
    });

  });

  describe("convertToTimestamp()", function() {

    beforeEach("Enable WebMidi", async function() {
      await WebMidi.enable({sysex: true});
    });

    it("should return timestamp when passed string starting with '+'", function() {
      // Assert
      expect(Utilities.toTimestamp("+1000")).to.be.a("number");
    });

    it("should return false for invalid input", function() {

      // Arrange
      let values = [undefined, null, false, [], {}, "", "-1", "+", -1, -Infinity];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(Utilities.toTimestamp(value)).to.be.false;
      }

    });

    it("should return a positive number as is", function() {

      // Arrange
      let values = [0, 1, Infinity];

      // Act
      values.forEach(assert);

      // Assert
      function assert(value) {
        expect(Utilities.toTimestamp(value)).to.equal(value);
      }

    });

  });

  describe("toNoteIdentifier()", function() {

    it("should return the correct note identifier", function() {

      // Arrange
      const items = [
        {number: 0, identifier: "C-1"},
        {number: 60, identifier: "C4"},
        {number: 127, identifier: "G9"},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(Utilities.toNoteIdentifier(item.number)).to.equal(item.identifier);
      }

    });

    it("should return the correct identifier when using 'octaveOffset'", function() {

      // Arrange
      const items = [
        {identifier: "C-1", octaveOffset: 1, number: 12},
        {identifier: "C4", octaveOffset: -1, number: 48},
        {identifier: "C4", octaveOffset: 1, number: 72},
        {identifier: "G9", octaveOffset: -1, number: 115},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.toNoteNumber(item.identifier, item.octaveOffset)
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
          Utilities.toNoteIdentifier(value);
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
          Utilities.toNoteIdentifier(60, item);
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

    it("should return the correct number for note identifiers", function() {

      // Arrange
      const items = [
        {identifier: "C-1", number: 0},
        {identifier: "D#0", number: 15},
        {identifier: "D##0", number: 16},
        {identifier: "C4", number: 60},
        {identifier: "Eb4", number: 63},
        {identifier: "Ebb4", number: 62},
        {identifier: "G9", number: 127},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.guessNoteNumber(item.identifier)
        ).to.equal(item.number);
      }

    });

    it("should strip whitespace for note identifiers", function() {

      // Arrange
      const items = [
        {identifier: " C-1 ", number: 0},
        {identifier: "\nD#0", number: 15},
        {identifier: "D##0\t", number: 16},
        {identifier: "\rC4", number: 60},
        {identifier: "\rEb4\r", number: 63},
        {identifier: "\n\r\t Ebb4", number: 62},
        {identifier: "G9\n\r\t ", number: 127},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.guessNoteNumber(item.identifier)
        ).to.equal(item.number);
      }

    });

    it("should return the correct number for note identifiers when using octaveOffset", function() {

      // Arrange
      const items = [
        {identifier: "C-1", number: 0, offset: 0},
        {identifier: "C-1", number: 12, offset: 1},
        {identifier: "C4", number: 60, offset: 0},
        {identifier: "C4", number: 48, offset: -1},
        {identifier: "C4", number: 72, offset: 1},
        {identifier: "G9", number: 127, offset: 0},
        {identifier: "G9", number: 115, offset: -1},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.guessNoteNumber(item.identifier, item.offset)
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

    it("should return false for identifiers when using out-of-bounds octaveOffset", function() {

      // Arrange
      const items = [
        {identifier: "C-1", offset: -10},
        {identifier: "C-1", offset: -1},
        {identifier: "G9", offset: 1},
        {identifier: "G9", offset: 10},
        {identifier: "C4", offset: 100},
        {identifier: "C4", offset: -100}
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.guessNoteNumber(item.identifier, item.offset)
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
        expect(Utilities.guessNoteNumber(item)).to.be.false;
      };

    });

  });

  describe("offsetNumber()", function () {

    it("should use 0 if octaveOffset is invalid", function() {

      // Arrange
      let number = 60;
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
        expect(Utilities.offsetNumber(number, value)).to.equal(number);
      }

    });

    it("should use 0 if semitoneOffset is invalid", function() {

      // Arrange
      let number = 60;
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
        expect(Utilities.offsetNumber(number, 0, value)).to.equal(number);
      }

    });

    it("should cap returned value at 127", function() {

      // Arrange
      let number = 60;
      let pairs = [
        {octaveOffset: 0, semitoneOffset: 1000},
        {octaveOffset: 100, semitoneOffset: 0},
        {octaveOffset: 20, semitoneOffset: 20},
      ];

      // Act
      pairs.forEach(assert);

      // Assert
      function assert(pair) {
        expect(
          Utilities.offsetNumber(number, pair.octaveOffset, pair.semitoneOffset)
        ).to.equal(127);
      }

    });

    it("should return 0 for values smaller than 0", function() {

      // Arrange
      let number = 60;
      let pairs = [
        {octaveOffset: 0, semitoneOffset: -200},
        {octaveOffset: -20, semitoneOffset: 0},
        {octaveOffset: -20, semitoneOffset: -20},
      ];

      // Act
      pairs.forEach(assert);

      // Assert
      function assert(pair) {
        expect(
          Utilities.offsetNumber(number, pair.octaveOffset, pair.semitoneOffset)
        ).to.equal(0);
      }

    });

  });

  describe("buildNote()", function() {

    it("should return the same note if a note is passed in", function () {

      // Arrange
      const note = new Note("C4", {attack: 0.12, release: 0.34, duration: 56});

      // Act
      const result = Utilities.buildNote(note);

      // Assert
      expect(result).to.equal(note);
      expect(result.identifier).to.equal(note.identifier);
      expect(result.attack).to.equal(note.attack);
      expect(result.release).to.equal(note.release);
      expect(result.duration).to.equal(note.duration);

    });

    it("should return the right note when passing identifier", function () {

      // Arrange
      const identifier = "C4";
      const options = {attack: 0.12, release: 0.34, duration: 56};

      // Act
      const result = Utilities.buildNote(identifier, options);

      // Assert
      expect(result.identifier).to.equal(identifier);
      expect(result.attack).to.equal(options.attack);
      expect(result.release).to.equal(options.release);
      expect(result.duration).to.equal(options.duration);

    });

    it("should return the right note when passing identifier and octaveOffset", function () {

      // Arrange
      const items = [
        {target: "C0", offset: 1, identifier: "C-1"},
        {target: "C2", offset: -2, identifier: "C4"},
        {target: "C6", offset: 2, identifier: "C4"},
        {target: "G8", offset: -1, identifier: "G9"}
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        const n = Utilities.buildNote(item.identifier, {octaveOffset: item.offset});
        expect(n.identifier).to.equal(item.target);
      }

    });

    it("should return the right note when passing number", function () {

      // Arrange
      const number = 60;
      const identifier = "C4";
      const options = {attack: 0.98, release: 0.76, duration: 56};

      // Act
      const result = Utilities.buildNote(number, options);

      // Assert
      expect(result.identifier).to.equal(identifier);
      expect(result.attack).to.equal(options.attack);
      expect(result.release).to.equal(options.release);
      expect(result.duration).to.equal(options.duration);

    });

    it("should disregard octaveOffset when passing number", function () {

      // Arrange
      const items = [
        {number: 0, offset: -3, identifier: "C-1"},
        {number: 64, offset: -2, identifier: "E4"},
        {number: 127, offset: -1, identifier: "G9"},
        {number: "0", offset: 1, identifier: "C-1"},
        {number: "64.0", offset: 2, identifier: "E4"},
        {number: "127x", offset: 3, identifier: "G9"},
        {number: 0.1, offset: 4, identifier: "C-1"},
        {number: 64.5, offset: 5, identifier: "E4"},
        {number: 127.9, offset: -6, identifier: "G9"}
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        const n = Utilities.buildNote(item.number, {octaveOffset: item.offset});
        expect(n.identifier).to.equal(item.identifier);
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
          Utilities.buildNote(item);
        }).to.throw(TypeError);
      };

    });

  });

  describe("buildNoteArray()", function() {

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
      const results = Utilities.buildNoteArray(items);

      // Assert
      results.forEach((result, index) => {
        expect(result.identifier).to.equal(targets[index]);
      });

    });

    it("should return an array of valid notes when passing identifier array", function () {

      // Arrange
      const items = [
        "C-1",
        "C4",
        "G9"
      ];

      // Act
      const results = Utilities.buildNoteArray(items);

      // Assert
      results.forEach((result, index) => {
        expect(result.identifier).to.equal(items[index]);
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
      const results = Utilities.buildNoteArray(items);

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
        results.push(Utilities.buildNoteArray(item));
      });

      // Assert
      results.forEach((result, index) => {
        expect(result[0].identifier).to.equal(targets[index]);
      });

    });

    it("should return an array of valid notes when passing single identifier", function () {

      // Arrange
      const items = [
        "C-1",
        "C4",
        "G9"
      ];
      const results = [];

      // Act
      items.forEach(item => {
        results.push(Utilities.buildNoteArray(item));
      });

      // Assert
      results.forEach((result, index) => {
        expect(result[0].identifier).to.equal(items[index]);
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
        results.push(Utilities.buildNoteArray(item));
      });

      // Assert
      results.forEach((result, index) => {
        expect(result[0].identifier).to.equal(items[index].identifier);
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
          Utilities.buildNoteArray(value);
        }).to.throw();
      }

    });

    it("should pass on options to values that aren't 'Note' objects", function() {

      let options = {
        duration: 1000,
        attack: 0.56,
        release: 0.78
      };

      let notes1 = Utilities.buildNoteArray([60], options);
      expect(notes1[0].duration).to.equal(1000);
      expect(notes1[0].attack).to.equal(options.attack);
      expect(notes1[0].release).to.equal(options.release);

    });

  });

  describe("from7bitToFloat()", function() {

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
          Utilities.from7bitToFloat(item.input)
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
          Utilities.from7bitToFloat(item.input)
        ).to.equal(item.output);
      }

    });

  });

  describe("fromFloatTo7Bit()", function() {

    it("should return the correct value for normal input", function () {

      // Arrange
      const items = [
        {input: 0, output: 0},
        {input: 0.5, output: 64},
        {input: 1, output: 127},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.fromFloatTo7Bit(item.input)
        ).to.equal(item.output);
      }

    });

    it("should return the correct value for out of bounds input", function () {

      // Arrange
      const items = [
        {input: -1, output: 0},
        {input: -10, output: 0},
        {input: 2, output: 127},
        {input: 20, output: 127},
        {input: Infinity, output: 127},
        {input: -Infinity, output: 0},
        {input: 1.1, output: 127},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.fromFloatTo7Bit(item.input)
        ).to.equal(item.output);
      }

    });

  });

  describe("fromMsbLsbToFloat()", function() {

    it("should return the correct value for normal input", function () {

      // Arrange
      const items = [
        {msb: 0, lsb: 0, output: 0/16383},
        {msb: 0, lsb: 64, output: 64/16383},
        {msb: 0, lsb: 127, output: 127/16383},
        {msb: 64, lsb: 0, output: 8192/16383},
        {msb: 64, lsb: 64, output: 8256/16383},
        {msb: 64, lsb: 127, output: 8319/16383},
        {msb: 127, lsb: 0, output: 16256/16383},
        {msb: 127, lsb: 64, output: 16320/16383},
        {msb: 127, lsb: 127, output: 16383/16383}
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.fromMsbLsbToFloat(item.msb, item.lsb)
        ).to.equal(item.output);
      }

    });

    it("should return the correct value for out of bounds input", function () {

      // Arrange
      const items = [
        {msb: -1, lsb: 0, output: 0},
        {msb: 0, lsb: -1, output: 0},
        {msb: 128, lsb: 0, output: 16256/16383},
        {msb: 0, lsb: 128, output: 127/16383}
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        expect(
          Utilities.fromMsbLsbToFloat(item.msb, item.lsb)
        ).to.equal(item.output);
      }

    });

  });

  describe("fromFloatToMsbLsb()", function() {

    it("should return the correct value for normal input", function () {

      // Arrange
      const items = [
        {input: 0, msb: 0, lsb: 0},
        {input: 0.25, msb: 32, lsb: 0},
        {input: 0.5, msb: 64, lsb: 0},
        {input: 0.75, msb: 95, lsb: 127},
        {input: 1, msb: 127, lsb: 127}
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        let {msb, lsb} = Utilities.fromFloatToMsbLsb(item.input);
        expect(msb).to.equal(item.msb);
        expect(lsb).to.equal(item.lsb);
      }

    });

    it("should return the correct value for out of bounds input", function () {

      // Arrange
      const items = [
        {input: -10, msb: 0, lsb: 0},
        {input: -1, msb: 0, lsb: 0},
        {input: 1.2, msb: 127, lsb: 127},
        {input: 12, msb: 127, lsb: 127},
      ];

      // Act
      items.forEach(assert);

      // Assert
      function assert(item) {
        let {msb, lsb} = Utilities.fromFloatToMsbLsb(item.input);
        expect(msb).to.equal(item.msb);
        expect(lsb).to.equal(item.lsb);
      }

    });

  });

  describe("isNode", function() {

    it("should return the correct value depending on environment", function () {
      // Assert
      expect(Utilities.isNode).to.be.true;
    });

  });

  describe("isBrowser", function() {

    it("should return the correct value depending on environment", function () {
      // Assert
      expect(Utilities.isBrowser).to.be.false;
    });

  });

  describe("getPropertyByValue()", function() {

    it("should return the correct property");

  });

});
