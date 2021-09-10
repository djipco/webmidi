import {WebMidi} from "./WebMidi.js";
import {Utilities} from "./Utilities.js";

/**
 * The `Note` class represents a single note to be played. The `Note` can be played on a single
 * channel by using [OutputChannel.playNote()]{@link OutputChannel#playNote} or on multiple
 * channels at once by using [Output.playNote()]{@link Output#playNote}.
 *
 * If the note's `duration` property is set, the note will be stopped at the end of the duration. If
 * no duration is set, it will play until it is explicitly stopped using
 * [OutputChannel.stopNote()]{@link OutputChannel#stopNote} or
 * [Output.stopNote()]{@link Output#stopNote}.
 *
 * @param value {string|number} The name or note number of the note to create. If a number is used,
 * it must be an integer between 0 and 127. If a string is used, it must be the note name followed
 * by the octave (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). The octave range must be between -1 and
 * 9. The lowest note is C-1 (MIDI note number 0) and the highest note is G9 (MIDI note number 127).
 *
 * @param {Object} [options={}]
 *
 * @param {number} [options.duration=Infinity] The number of milliseconds before the note should be
 * explicitly stopped.
 *
 * @param {number} [options.attack=0.5] The note's attack velocity as a decimal number between 0 and
 * 1.
 *
 * @param {number} [options.octaveOffset=0] The offset to apply to the reported octave
 *
 * @param {number} [options.release=0.5] The note's release velocity as a decimal number between 0
 * and 1.
 *
 * @param {number} [options.rawAttack=64] The note's attack velocity as an integer between 0 and
 * 127.
 *
 * @param {number} [options.rawRelease=64] The note's release velocity as an integer between 0 and
 * 127.
 *
 * @throws {Error} Invalid note name.
 * @throws {Error} Invalid note number.
 * @throws {RangeError} Invalid duration.
 * @throws {RangeError} Invalid attack value.
 * @throws {RangeError} Invalid rawAttack value.
 * @throws {RangeError} Invalid release value.
 * @throws {RangeError} Invalid rawRelease value.
 *
 * @since 3.0.0
 */
export class Note {

  constructor(value, options = {}) {

    if (Number.isInteger(value)) {
      this.number = value;
    } else {
      this.name = value;
    }

    this.duration = (options.duration == undefined) ? Infinity : options.duration;
    this.attack = (options.attack == undefined) ? 0.5 : options.attack;
    this.release = (options.release == undefined) ? 0.5 : options.release;
    this.octaveOffset = (options.octaveOffset == undefined) ? 0 : options.octaveOffset;

    if (options.rawAttack != undefined) this.rawAttack = options.rawAttack;
    if (options.rawRelease != undefined) this.rawRelease = options.rawRelease;

  }

  /**
   * The name of the note with the octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.).
   *
   * The name is affected by the `octaveOffset` property. For instance, a `Note` with a MIDI note
   * number of 60 will be reported as `C4` if the `octaveOffset` property is `0`. However, it will
   * be reported as `C5` if the  `octaveOffset` is `1`.
   *
   * @type {string}
   */
  get name() {
    return WebMidi.NOTES[this._number % 12] + this.octave.toString();
  }
  set name(value) {

    if (WebMidi.validation) {
      if (Utilities.guessNoteNumber(value, {octaveOffset: WebMidi.octaveOffset}) === false) {
        throw new Error("Invalid note name.");
      }
    }

    this._number = Utilities.getNoteNumberByName(value, {octaveOffset: WebMidi.octaveOffset});

  }

  /**
   * The MIDI note number as an integer between 0 and 127
   * @type {number}
   */
  get number() {
    return this._number;
  }
  set number(value) {

    if (WebMidi.validation) {
      if (Utilities.guessNoteNumber(value, {octaveOffset: WebMidi.octaveOffset}) === false) {
        throw new Error("Invalid note number.");
      }
    }

    this._number = Utilities.guessNoteNumber(value, {octaveOffset: WebMidi.octaveOffset});

  }

  /**
   * An integer to offset the reported octave of the note. By default, middle C (MIDI note number
   * 60) is placed on the 4th octave (C4).
   *
   * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
   * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
   *
   * @type {number}
   *
   * @since 3.0
   */
  get octaveOffset() {
    return this._octaveOffset;
  }
  set octaveOffset(value) {

    if (this.validation) {
      value = parseInt(value);
      if (isNaN(value)) throw new TypeError("The 'octaveOffset' property must be an integer.");
    }

    this._octaveOffset = value;

  }

  /**
   * The duration of the note as a positive decimal number representing the number of milliseconds
   * that the note should play for.
   *
   * @type {number}
   */
  get duration() {
    return this._duration;
  }
  set duration(value) {

    if (WebMidi.validation) {
      value = parseFloat(value);
      if (isNaN(value) || value === null || value < 0) throw new RangeError("Invalid duration.");
    }

    this._duration = value;

  }

  /**
   * The attack velocity of the note as a decimal number between 0 and 1.
   * @type {number}
   */
  get attack() {
    return this._rawAttack / 127;
  }
  set attack(value) {

    if (WebMidi.validation) {
      value = parseFloat(value);
      if (isNaN(value) || value === null || !(value >= 0 && value <= 1)) {
        throw new RangeError("Invalid attack value.");
      }
    }

    this._rawAttack = Math.round(value * 127);

  }

  /**
   * The raw attack velocity of the note as an integer between 0 and 127.
   * @type {number}
   */
  get rawAttack() {
    return this._rawAttack;
  }
  set rawAttack(value) {

    if (WebMidi.validation) {
      value = parseFloat(value);
      if (isNaN(value) || value === null || !(value >= 0 && value <= 127)) {
        throw new RangeError("Invalid rawAttack value.");
      }
    }

    this._rawAttack = value;

  }

  /**
   * The release velocity of the note as a decimal number between 0 and 1.
   * @type {number}
   */
  get release() {
    return this._rawRelease / 127;
  }
  set release(value) {

    if (WebMidi.validation) {
      value = parseFloat(value);
      if (isNaN(value) || value === null || !(value >= 0 && value <= 1)) {
        throw new RangeError("Invalid release value.");
      }
    }

    this._rawRelease = Math.round(value * 127);

  }

  /**
   * The raw release velocity of the note as an integer between 0 and 127.
   * @type {number}
   */
  get rawRelease() {
    return this._rawRelease;
  }
  set rawRelease(value) {

    if (WebMidi.validation) {
      value = parseFloat(value);
      if (isNaN(value) || value === null || !(value >= 0 && value <= 127)) {
        throw new RangeError("Invalid rawRelease value.");
      }
    }

    this._rawRelease = value;

  }

  /**
   * The octave of the note as an integer between -1 and 9.
   * @type {number}
   */
  get octave() {
    return Math.floor(this._number / 12 - 1) + this.octaveOffset;
  }

}
