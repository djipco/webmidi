import {WebMidi} from "./WebMidi.js";
import {Utilities} from "./Utilities.js";

/**
 * The `Note` class represents a single musical note such as `"D3"`, `"G#4"`, `"F-1"`, `"Gb7"`, etc.
 *
 * Note that a `Note` object does not have a MIDI number per se. The MIDI note number is determined
 * when the note is played. This is because, the `octaveOffset` property of various objects
 * (`WebMidi`, `OutputChannel`, `Output`, etc.) can be used to offset the note number to match
 * external devices where middle C is not equal to C4.
 *
 * The octave of the note has no intrinsic limit. You can specify a note to be "F27" or "G#-16".
 * However, to play such notes on a MIDI channel, the channel will need to be offset accordingly.
 *
 * `Note` objects can be played back on a single channel by calling
 * [OutputChannel.playNote()]{@link OutputChannel#playNote}. A note can also be played back on the
 * multiple channels of an output by using [Output.playNote()]{@link Output#playNote}.
 *
 * The note has attack and release velocities set at 64 by default. These can be changed by passing
 * in the appropriate option. It is also possible to set a system-wide default for attack and
 * release velocities by using the `WebMidi.defaults` property.
 *
 * The note may have a duration. If it does, playback will be stopped when the duration has elapsed
 * by automatically sending a **noteoff** event. By default, the duration is set to `Infinity`. In
 * this case, it will never stop playing unless explicitly stopped by calling a method such as
 * [OutputChannel.stopNote()]{@link OutputChannel#stopNote},
 * [Output.stopNote()]{@link Output#stopNote} or similar.
 *
 * @param value {string|number} The value used to create the note. If a string is used, it must be
 * the note name (with optional accidental) followed by the octave (`"C3"`, `"G#4"`, `"F-1"`,
 * `"Db7"`, etc.). If a number is used, it must be an integer between 0 and 127. The number will be
 * converted to a note name. In this case, middle C is considered to be C4 (note number 60) but that
 * can be offset with the `octaveOffset`property.
 *
 * @param {Object} [options={}]
 *
 * @param {number} [options.duration=Infinity] The number of milliseconds before the note should be
 * explicitly stopped.
 *
 * @param {number} [options.attack=64] The note's attack velocity as an integer between 0 and
 * 127.
 *
 * @param {number} [options.release=64] The note's release velocity as an integer between 0 and
 * 127.
 *
 * @param {number} [options.octaveOffset=0] An integer to offset the octave value. **This is only
 * used when the note is specified using a MIDI note number.**
 *
 * @throws {Error} Invalid note name
 * @throws {RangeError} Invalid duration
 * @throws {RangeError} Invalid attack value
 * @throws {RangeError} Invalid release value
 * @throws {RangeError} Invalid 'octaveOffset' value
 *
 * @since 3.0.0
 */
export class Note {

  constructor(value, options = {}) {

    // Assign property defaults
    this.duration = WebMidi.defaults.note.duration;
    this.attack = WebMidi.defaults.note.attack;
    this.release = WebMidi.defaults.note.release;

    // Assign property values from options (validation occurs in setter)
    if (options.duration != undefined) this.duration = options.duration;
    if (options.attack != undefined) this.attack = options.attack;
    if (options.release != undefined) this.release = options.release;

    // Validate and assign options.octaveOffset value
    options.octaveOffset = options.octaveOffset == undefined ? 0 :parseInt(options.octaveOffset);
    if (isNaN(options.octaveOffset)) throw new RangeError("Invalid 'octaveOffset' value");

    // Assign note depending on the way it was specified (name or number)
    if (Number.isInteger(value)) {
      this.name = Utilities.getNoteNameByNumber(value, options.octaveOffset);
    } else {
      this.name = value;
    }

  }

  /**
   * The name of the note as a string combining the note, an optional accidental and the octave.
   * @type {string}
   * @since 3.0.0
   */
  get name() {
    return this._name;
  }
  set name(value) {

    if (WebMidi.validation) {
      value = Utilities.getNoteFragments(value).name;
      if (!value) throw new Error("Invalid note name");
    }

    this._name = value;

  }

  /**
   * The duration of the note as a positive decimal number representing the number of milliseconds
   * that the note should play for.
   *
   * @type {number}
   * @since 3.0.0
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
   * The attack velocity of the note as an integer between 0 and 127.
   * @type {number}
   * @since 3.0.0
   */
  get attack() {
    return this._attack;
  }
  set attack(value) {

    if (WebMidi.validation) {
      value = parseFloat(value);
      if (isNaN(value) || !(value >= 0 && value <= 127)) {
        throw new RangeError("Invalid attack value.");
      }
    }

    this._attack = value;

  }

  /**
   * The release velocity of the note as an integer between 0 and 127.
   * @type {number}
   * @since 3.0.0
   */
  get release() {
    return this._release;
  }
  set release(value) {

    if (WebMidi.validation) {
      value = parseFloat(value);
      if (isNaN(value) || !(value >= 0 && value <= 127)) {
        throw new RangeError("Invalid release value.");
      }
    }

    this._release = value;

  }

  /**
   * The attack velocity of the note as a decimal number between 0 and 1.
   * @type {number}
   * @since 3.0.0
   */
  get attackNormalized() {
    return Utilities.normalizeFrom7Bit(this._attack);
  }

  /**
   * The release velocity of the note as a decimal number between 0 and 1.
   * @type {number}
   * @since 3.0.0
   */
  get releaseNormalized() {
    return Utilities.normalizeFrom7Bit(this._release);
  }

}
