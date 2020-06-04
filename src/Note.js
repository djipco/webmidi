import {WebMidi} from "./WebMidi.js";

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
 * @param name {string|number} The name or note number of the note to create. If a number is used,
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
 *
 * @since 3.0.0
 */
export class Note {

  constructor(name, options = {}) {

    if (Number.isInteger(name)) {
      this.number = name;
    } else {
      this.name = name;
    }

    this.duration = options.duration;
    this.attack = options.attack;
    this.release = options.release;
    if (options.rawAttack != undefined) this.rawAttack = options.rawAttack;
    if (options.rawRelease != undefined) this.rawRelease = options.rawRelease;

  }

  /**
   * The name of the note with the octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.)
   *
   * @type {string}
   */
  get name() {
    return WebMidi.NOTES[this._number % 12] + WebMidi.getOctave(this.number);
  }
  set name(value) {
    value = WebMidi.guessNoteNumber(value);
    if (value === false) throw new Error("Invalid note name.");
    this._number = value;
  }

  /**
   * The MIDI note number as an integer between 0 and 127
   * @type {number}
   */
  get number() {
    return this._number;
  }
  set number(value) {
    value = WebMidi.guessNoteNumber(value);
    if (value === false) throw new Error("Invalid note number.");
    this._number = value;
  }

  /**
   * The duration of the note as a positive decimal number representing the number of milliseconds
   * that the note should play for. If the duration is set, a **note off** message is automatically
   * scheduled to stop the note after the specified duration.
   *
   * @type {number}
   */
  get duration() {
    return this._duration;
  }
  set duration(value) {
    value = Math.max(parseFloat(value), 0);
    this._duration = isNaN(value) ? Infinity : value;
  }

  /**
   * The attack velocity of the note as a decimal number between 0 and 1. By default, this is set to
   * 64 ÷ 127 which is roughly 0.5.
   *
   * @type {number}
   */
  get attack() {
    return this._rawAttack / 127;
  }
  set attack(value) {
    value = Math.min(Math.max(parseFloat(value), 0), 1);
    this._rawAttack = isNaN(value) ? 64 : Math.round(value * 127);
  }

  /**
   * The raw attack velocity of the note as an integer between 0 and 127. By default, this is set to
   * 64.
   * @type {number}
   */
  get rawAttack() {
    return this._rawAttack;
  }
  set rawAttack(value) {
    value = Math.min(Math.max(parseInt(value), 0), 127);
    this._rawAttack = isNaN(value) ? 64 : value;
  }

  /**
   * The release velocity of the note as a decimal number between 0 and 1. By default, this is set
   * to 64 ÷ 127 which is roughly 0.5.
   *
   * @type {number}
   */
  get release() {
    return this._rawRelease / 127;
  }
  set release(value) {
    value = Math.min(Math.max(parseFloat(value), 0), 1);
    this._rawRelease = isNaN(value) ? 64 : Math.round(value * 127);
  }

  /**
   * The raw release velocity of the note as an integer between 0 and 127. By default, this is set
   * to 64.
   * @type {number}
   */
  get rawRelease() {
    return this._rawRelease;
  }
  set rawRelease(value) {
    value = Math.min(Math.max(parseInt(value), 0), 127);
    this._rawRelease = isNaN(value) ? 64 : value;
  }

  /**
   * The octave of the note as an integer between -1 and 8.
   * @type {number}
   */
  get octave() {
    return Math.floor(Math.floor(this._number) / 12 - 1);
  }

}
