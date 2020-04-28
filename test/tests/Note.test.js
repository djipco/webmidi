describe("Note Object", function() {

  describe("constructor()", function () {

    it("should throw error if the name parameter is invalid", function() {

      let params = [-1, 128, "B-2", "G#9", "xxx", "", [], {}, NaN, undefined, null, Infinity];

      params.forEach(param => {
        expect(() => new Note(param)).to.throw(Error);
      });

    });

    it("should convert out of bounds durations to valid duration", function() {

      [-Infinity, -1, -1.5, -0.6].forEach(param => {
        let note = new Note(60, {duration: param});
        expect(note.duration).to.equal(0);
      });

      ["xxx", [], {}, NaN, undefined, null, Infinity].forEach(param => {
        let note = new Note(60, {duration: param});
        expect(note.duration).to.equal(Infinity);
      });

    });

    it("should only keep valid channels in the 'channels' property", function() {

      let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 16];
      let invalid = [-1, 0, "xxx", [], {}, NaN, undefined, null, Infinity, -Infinity];
      let note = new Note(60, {channels: valid.concat(invalid)});
      expect(note.channels.length).to.equal(valid.length);

    });

    it("should set correct default value for velocities", function() {
      let note1 = new Note(60);
      expect(note1.rawAttack).to.equal(64);
      let note2 = new Note(60);
      expect(note2.rawRelease).to.equal(64);
    });

    it("should give priority to rawAttack/rawRelease over attack/release", function() {

      let options = {
        attack: 42,
        release: 0,
        rawAttack: 127,
        rawRelease: 127
      };

      let note = new Note(60, options);

      expect(note.attack).to.equal(1);
      expect(note.release).to.equal(1);
      expect(note.rawAttack).to.equal(127);
      expect(note.rawRelease).to.equal(127);

    });

    it("should convert invalid velocities to valid values", function() {

      let note1 = new Note(60, {attack: -1.1});
      expect(note1.rawAttack).to.equal(0);
      expect(note1.attack).to.equal(0);

      let note2 = new Note(60, {release: 1.1});
      expect(note2.release).to.equal(1);
      expect(note2.rawRelease).to.equal(127);

      let note3 = new Note(60, {rawAttack: -1});
      expect(note3.attack).to.equal(0);
      expect(note3.rawAttack).to.equal(0);

      let note4 = new Note(60, {rawRelease: 128});
      expect(note4.release).to.equal(1);
      expect(note4.rawRelease).to.equal(127);

      ["xxx", [], {}, NaN, undefined, null].forEach(param => {
        let note1 = new Note(60, {attack: param});
        expect(note1.rawAttack).to.equal(64);
        let note2 = new Note(60, {release: param});
        expect(note2.rawRelease).to.equal(64);
      });

    });

    it("should report the correct octave value", function() {

      ["C-1", 0].forEach(param => {
        let note = new Note(param);
        expect(note.octave).to.equal(-1);
      });

      ["G9", 127].forEach(param => {
        let note = new Note(param);
        expect(note.octave).to.equal(9);
      });

    });

  });

  describe("set name()", function () {

    it("should throw error if passing an invalid note name", function() {

      let note = new Note(42);

      let params = [-1];

      params.forEach(param => {
        expect(() => note.name = param).to.throw(Error);
      });

    });

  });

  describe("set number()", function () {

    it("should throw error if passing an invalid note name", function() {

      let note = new Note(42);

      [
        "abc", null, undefined, -1, 128, function () {}, {}, "555", "H3", "Z#8", Infinity, -Infinity
      ].forEach(function (param) {
        expect(() => note.number = param).to.be.throw(Error);
      });

    });

  });

  describe("set duration()", function () {

    it("should set duration to infinity if the value is invalid", function() {

      let note = new Note(42);

      [
        "abc", null, undefined, function () {}, {}, "H3", NaN
      ].forEach(function (param) {
        note.duration = param;
        expect(note.duration).to.equal(Infinity);
      });

    });

    it("should set duration to 0 if the value is negative", function() {

      let note = new Note(42);

      ["-1", -1, -Infinity].forEach(function (param) {
        note.duration = param;
        expect(note.duration).to.equal(0);
      });

    });

  });

});
