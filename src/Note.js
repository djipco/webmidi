import {WebMidi} from './WebMidi.js';

/**
 * The `Note` class represents a single note to be played. The `Note` can be played on a single
 * channel by using [OutputChannel.playNote()]{@link OutputChannel#playNote} or on multiple
 * channels at once by using [Output.playNote()]{@link Output#playNote}.
 *
 * If the note's `duration` property is set, the note will be stopped at the end of the duration. If
 * no duration is set, it will play until it is explicitely stopped using
 * [OutputChannel.stopNote()]{@link OutputChannel#stopNote} or
 * [Output.stopNote()]{@link Output#stopNote}.
 *
 * @param name {string|number} The name or note number of the note to create. If a number is used,
 * it must be an integer between 0 and 127. If a string is used, it must be the note name followed
 * by the octave (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). The octave range must be between -2 and
 * 8. The lowest note is C-2 (MIDI note number 0) and the highest note is G8 (MIDI note number 127).
 *
 * @param {Object} [options={}]
 *
 * @param {number} [options.duration=Infinity] The number of milliseconds before the note should be
 * explicitly stopped.
 *
 * @param {number} [options.channel] The channel number to play the note on (1-16).
 *
 * @param {number} [options.attackVelocity=0.5] The note's attack velocity as a decimal number
 * between 0 and 1.
 *
 * @param {number} [options.releaseVelocity=0.5] The note's release velocity as a decimal number
 * between 0 and 1.
 *
 * @param {number} [options.rawAttackVelocity=64] The note's attack velocity as an integer between
 * 0 and 127.
 *
 * @param {number} [options.rawReleaseVelocity=64] The note's release velocity as an integer between
 * 0 and 127.
 *
 */
export class Note {

  constructor(name, options = {}) {

    if (Number.isInteger(name)) {
      this.number = name;
    } else {
      this.name = name;
    }

    this.duration = options.duration;
    this.channel = options.channel;
    this.attackVelocity = options.attackVelocity;
    this.releaseVelocity = options.remaining;
    if (options.rawAttackVelocity) this.rawAttackVelocity = options.rawAttackVelocity;
    if (options.rawReleaseVelocity) this.rawReleaseVelocity = options.rawReleaseVelocity;

  }

  /**
   * The name of the note with the octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.)
   *
   * @type {string}
   */
  get name() {
    return WebMidi.NOTES[this._number % 12] + WebMidi.getOctave(data1);
  }
  set name(value) {
    let value = WebMidi.guessNoteNumber(value);
    if (value === false) throw new Error("Invalid note name.")
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
    let value = WebMidi.guessNoteNumber(value);
    if (value === false) throw new Error("Invalid note number.")
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
    let value = Math.max(parseFloat(value), 0);
    this._duration = isNaN(value) ? Infinity : value;
  }

  /**
   * A positive integer between 1 and 16 or an array of such numbers representing the MIDI
   * channel(s) the note should be played on.
   *
   * This is only necessary if you intend to use the {@link Output} object's
   * [playNote()]{@link Output#playNote} method. If you use the {@link OutputChannel} object's
   * [playNote()]{@link OutputChannel#playNote} method, it will be played on that channel (no matter
   * what has been set as the channel).
   *
   * @type {number|number[]}
   */
  get channel() {
    return this._channel;
  }
  set channel(value) {
    this._channel = WebMidi.sanitizeChannels(value);
  }

  /**
   * The attack velocity of the note as a decimal number between 0 and 1. By default, this is set to
   * 0.5.
   * @type {number}
   */
  get attackVelocity() {
    return this._rawAttackVelocity / 127;
  }
  set attackVelocity(value) {
    value = Math.min(Math.max(parseFloat(value), 0), 1);
    this._rawAttackVelocity = isNaN(value) ? 64 : Math.round(value * 127);
  }

  /**
   * The raw attack velocity of the note as an integer between 0 and 127. By default, this is set to
   * 64.
   * @type {number}
   */
  get rawAttackVelocity() {
    return this._rawAttackVelocity;
  }
  set rawAttackVelocity(value) {
    value = Math.min(Math.max(parseInt(value), 0), 127);
    this._rawAttackVelocity = isNaN(value) ? 64 : value;
  }

  /**
   * The release velocity of the note as a decimal number between 0 and 1. By default, this is set
   * to 0.5.
   * @type {number}
   */
  get releaseVelocity() {
    return this._rawReleaseVelocity / 127;
  }
  set releaseVelocity(value) {
    value = Math.min(Math.max(parseFloat(value), 0), 1);
    this._rawReleaseVelocity = isNaN(value) ? 64 : Math.round(value * 127);
  }

  /**
   * The raw release velocity of the note as an integer between 0 and 127. By default, this is set
   * to 64.
   * @type {number}
   */
  get rawReleaseVelocity() {
    return this._rawReleaseVelocity;
  }
  set rawReleaseVelocity(value) {
    value = Math.min(Math.max(parseInt(value), 0), 127);
    this._rawReleaseVelocity = isNaN(value) ? 64 : value;
  }

}
