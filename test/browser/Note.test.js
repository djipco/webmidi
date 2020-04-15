import {WebMidi} from "../../src/WebMidi.js";
import {Note} from "../../src/Note.js";

const expect = chai.expect;

export default function() {

  describe("Note", function() {

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
        expect(note1.rawAttackVelocity).to.equal(64);
        let note2 = new Note(60);
        expect(note2.rawReleaseVelocity).to.equal(64);
      });

      it("should convert invalid velocities to valid values", function() {

        let note1 = new Note(60, {attackVelocity: -1.1});
        expect(note1.rawAttackVelocity).to.equal(0);
        expect(note1.attackVelocity).to.equal(0);

        let note2 = new Note(60, {releaseVelocity: 1.1});
        expect(note2.releaseVelocity).to.equal(1);
        expect(note2.rawReleaseVelocity).to.equal(127);

        let note3 = new Note(60, {rawAttackVelocity: -1});
        expect(note3.attackVelocity).to.equal(0);
        expect(note3.rawAttackVelocity).to.equal(0);

        let note4 = new Note(60, {rawReleaseVelocity: 128});
        expect(note4.releaseVelocity).to.equal(1);
        expect(note4.rawReleaseVelocity).to.equal(127);

        ["xxx", [], {}, NaN, undefined, null].forEach(param => {
          let note1 = new Note(60, {attackVelocity: param});
          expect(note1.rawAttackVelocity).to.equal(64);
          let note2 = new Note(60, {releaseVelocity: param});
          expect(note1.rawReleaseVelocity).to.equal(64);
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

  });

}
