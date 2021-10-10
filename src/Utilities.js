import {Note} from "./Note.js";
import {WebMidi} from "./WebMidi.js";

/**
 * The `Utilities` class contains general-purpose utility methods. All methods are static and
 * should be called using the class name. For example: `Utilities.getNoteDetails("C4")`.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */
export class Utilities {

  /**
   * Returns a MIDI note number matching the identifier passed in the form of a string. The
   * identifier must include the octave number. The identifier also optionally include a sharp (#),
   * a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
   * identifiers: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.
   *
   * When converting note identifiers to numbers, C4 is considered to be middle C (MIDI note number
   * 60) as per the scientific pitch notation standard.
   *
   * The resulting note number can be offset by using the `octaveOffset` parameter.
   *
   * @param identifier {string} The identifier in the form of a letter, followed by an optional "#",
   * "##", "b" or "bb" followed by the octave number. For exemple: C5, G4, D#-1, F0, Gb7, Eb-1,
   * Abb4, B##6, etc.
   *
   * @param {number} [octaveOffset=0] A integer to offset the octave by.
   *
   * @returns {number} The MIDI note number (an integer between 0 and 127).
   *
   * @throws RangeError Invalid 'octaveOffset' value
   *
   * @throws TypeError Invalid note identifier
   *
   * @license Apache-2.0
   * @since 3.0.0
   * @static
   */
  static toNoteNumber(identifier, octaveOffset = 0) {

    // Validation
    octaveOffset = octaveOffset == undefined ? 0 : parseInt(octaveOffset);
    if (isNaN(octaveOffset)) throw new RangeError("Invalid 'octaveOffset' value");
    if (typeof identifier !== "string") identifier = "";

    const fragments = this.getNoteDetails(identifier);
    if (!fragments) throw new TypeError("Invalid note identifier");

    const notes = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    let result = (fragments.octave + 1 + octaveOffset) * 12;
    result += notes[fragments.name];

    if (fragments.accidental) {
      if (fragments.accidental.startsWith("b")) {
        result -= fragments.accidental.length;
      } else {
        result += fragments.accidental.length;
      }
    }

    if (result < 0 || result > 127) throw new RangeError("Invalid octaveOffset value");

    return result;

  }

  /**
   * Given a proper note identifier ("C#4", "Gb-1", etc.) or a valid MIDI note number (9-127), this
   * method returns an object containing broken down details about the specified note (uppercase
   * letter, accidental and octave).
   *
   * When a number is specified, the translation to note is done using a value of 60 for middle C
   * (C4 = middle C).
   *
   * @param value {string|number} A note identifier A  atring ("C#4", "Gb-1", etc.) or a MIDI note
   * number (0-127).
   *
   * @returns {{octave: number, letter: string, accidental: string}}
   *
   * @throws TypeError Invalid note identifier
   *
   * @since 3.0.0
   * @static
   */
  static getNoteDetails(value) {

    if (Number.isInteger(value)) value = this.toNoteIdentifier(value);

    const matches = value.match(/^([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)$/i);
    if (!matches) throw new TypeError("Invalid note identifier");

    const name = matches[1].toUpperCase();
    const octave = parseInt(matches[3]);
    let accidental = matches[2].toLowerCase();
    accidental = accidental === "" ? undefined : accidental;

    const fragments = {
      name: name,
      accidental: accidental,
      octave: octave,
      identifier: name + (accidental || "") + octave
    };

    return fragments;

  }

  /**
   * Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be a
   * single integer or an array of integers.
   *
   * For backwards-compatibility, passing `undefined` as a parameter to this method results in all
   * channels being returned (1-16). Otherwise, parameters that cannot successfully be parsed to
   * integers between 1 and 16 are silently ignored.
   *
   * @param [channel] {number|number[]} An integer or an array of integers to parse as channel
   * numbers.
   *
   * @returns {Array} An array of 0 or more valid MIDI channel numbers.
   *
   * @since 3.0.0
   * @static
   */
  static sanitizeChannels(channel) {

    let channels;

    if (this.validation) {

      if (channel === "all") { // backwards-compatibility
        channels = ["all"];
      } else if (channel === "none") { // backwards-compatibility
        return [];
      }

    }

    if (!Array.isArray(channel)) {
      channels = [channel];
    } else {
      channels = channel;
    }

    // In order to preserve backwards-compatibility, we let this assignment as it is.
    if (channels.indexOf("all") > -1) {
      channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    }

    return channels
      .map(function(ch) {
        return parseInt(ch);
      })
      .filter(function(ch) {
        return (ch >= 1 && ch <= 16);
      });

  }

  /**
   * Returns a valid timestamp, relative to the navigation start of the document, derived from the
   * `time` parameter. If the parameter is a string starting with the "+" sign and followed by a
   * number, the resulting timestamp will be the sum of the current timestamp plus that number. If
   * the parameter is a positive number, it will be returned as is. Otherwise, false will be
   * returned.
   *
   * @param [time] {number|string} The time string (e.g. `"+2000"`) or number to parse
   * @return {number|false} A positive number or `false` (if the time cannot be converted)
   *
   * @since 3.0.0
   * @static
   */
  static toTimestamp(time) {

    let value = false;

    const parsed = parseFloat(time);
    if (isNaN(parsed)) return false;

    if (typeof time === "string" && time.substring(0, 1) === "+") {
      if (parsed >= 0) value = WebMidi.time + parsed;
    } else {
      if (parsed >= 0) value = parsed;
    }

    return value;

  }

  /**
   * Returns a valid MIDI note number (0-127) given the specified input. The input usually is a
   * string containing a note identifier (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer
   * between 0 and 127 is passed, it will simply be returned as is (for convenience). Other strings
   * will be parsed for integer value, if possible.
   *
   * If the input is an identifier, the resulting note number is offset by the `octaveOffset`
   * parameter. For example, if you pass in "C4" (note number 60) and the `octaveOffset` value is
   * -2, the resulting MIDI note number will be 36.
   *
   * @param input {string|number} A string or number to extract the MIDI note number from.
   *
   * @returns {number|false} A valid MIDI note number (0-127) or `false` if the input could not
   * successfully be parsed to a note number.
   *
   * @since 3.0.0
   * @static
   */
  static guessNoteNumber(input, octaveOffset) {

    // Validate and, if necessary, assign default
    octaveOffset = parseInt(octaveOffset) || 0;

    let output = false;

    // Check input type
    if (Number.isInteger(input) && input >= 0 && input <= 127) {        // uint
      output = parseInt(input);
    } else if (parseInt(input) >= 0 && parseInt(input) <= 127) {        // float or uint as string
      output = parseInt(input);
    } else if (typeof input === "string" || input instanceof String) {  // string
      try {
        output = this.toNoteNumber(input.trim(), octaveOffset);
      } catch (e) {
        return false;
      }
    }

    return output;

  }

  /**
   * Returns an identifier string representing a note name (with optional accidental) followed by an
   * octave number. The octave can be offset by using the `octaveOffset` parameter.
   *
   * @param {number} number The MIDI note number to convert to a note identifier
   * @param {number} octaveOffset An offset to apply to the resulting octave
   *
   * @returns {string}
   *
   * @throws RangeError Invalid note number
   * @throws RangeError Invalid octaveOffset value
   *
   * @since 3.0.0
   * @static
   */
  static toNoteIdentifier(number, octaveOffset) {

    number = parseInt(number);
    if (isNaN(number) || number < 0 || number > 127) throw new RangeError("Invalid note number");

    octaveOffset = octaveOffset == undefined ? 0 : parseInt(octaveOffset);
    if (isNaN(octaveOffset)) throw new RangeError("Invalid octaveOffset value");

    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const octave = Math.floor(number / 12 - 1) + octaveOffset;
    return notes[number % 12] + octave.toString();

  }

  /**
   * Converts the `input` parameter to a valid {@link Note} object. The input usually is an unsigned
   * integer (0-127) or a note identifier (`"C4"`, `"G#5"`, etc.). If the input is a {@link Note}
   * object, it will be returned as is.
   *
   * If the input is a note number or identifier, it is possible to specify options by providing the
   * `options` parameter.
   *
   * @param [input] {number|string|Note}
   *
   * @param {Object} [options={}]
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the note should
   * be explicitly stopped.
   *
   * @param {number} [options.attack=64] The note's attack velocity as an integer between 0 and 127.
   *
   * @param {number} [options.release=64] The note's release velocity as an integer between 0 and
   * 127.
   *
   * @param {number} [options.octaveOffset=0] An integer to offset the octave by. **This is only
   * used when the input value is a note identifier.**
   *
   * @returns {Note}
   *
   * @throws TypeError The input could not be parsed to a note
   *
   * @since version 3.0.0
   * @static
   */
  static buildNote(input, options= {}) {

    options.octaveOffset = parseInt(options.octaveOffset) || 0;

    // If it's already a Note, we're done
    if (input instanceof Note) return input;

    let number = this.guessNoteNumber(input, options.octaveOffset);

    if (number === false) { // We use a comparison b/c the note can be 0 (which equates to false)
      throw new TypeError(`The input could not be parsed as a note (${input})`);
    }

    // If we got here, we have a proper note number. Before creating the new note, we strip out
    // 'octaveOffset' because it has already been factored in when calling guessNoteNumber().
    options.octaveOffset = undefined;
    return new Note(number, options);

  }

  /**
   * Converts an input value, which can be an unsigned integer (0-127), a note identifier, a
   * {@link Note} object or an array of the previous types, to an array of {@link Note} objects.
   *
   * {@link Note} objects are returned as is. For note numbers and identifiers, a {@link Note}
   * object is created with the options specified. An error will be thrown when encountering invalid
   * input.
   *
   * @param [notes] {number|string|Note|number[]|string[]|Note[]}
   *
   * @param {Object} [options={}]
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the note should
   * be explicitly stopped.
   *
   * @param {number} [options.attack=0.5] The note's attack velocity as a decimal number between 0
   * and 1.
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
   * @param {number} [options.octaveOffset=0] An integer to offset the octave by. **This is only
   * used when the input value is a note identifier.**
   *
   * @returns {Note[]}
   *
   * @throws TypeError An element could not be parsed as a note.
   *
   * @since 3.0.0
   * @static
   */
  static buildNoteArray(notes, options = {}) {

    let result = [];
    if (!Array.isArray(notes)) notes = [notes];

    notes.forEach(note => {
      result.push(this.buildNote(note, options));
    });

    return result;

  }

  /**
   * Returns a number between 0 and 1 representing the ratio of the input value divided by 127 (7
   * bit). The returned value is restricted between 0 and 1 even if the input is greater than 127 or
   * smaller than 0.
   *
   * Passing `Infinity` will return `1` and passing `-Infinity` will return `0`. Otherwise, when the
   * input value cannot be converted to an integer, the method returns 0.
   *
   * @param value A positive integer between 0 and 127 (inclusive)
   * @returns {number} A number between 0 and 1 (inclusive)
   * @static
   */
  static toNormalized(value) {
    if (value === Infinity) value = 127;
    value = parseInt(value) || 0;
    return Math.min(Math.max(value / 127, 0), 1);
  }

  /**
   * Returns a number between 0 and 127 which is the result of multiplying the input value by 127.
   * The input value should be number between 0 and 1 (inclusively). The returned value is
   * restricted between 0 and 127 even if the input is greater than 1 or smaller than 0.
   *
   * Passing `Infinity` will return `127` and passing `-Infinity` will return `0`. Otherwise, when
   * the input value cannot be converted to a number, the method returns 0.
   *
   * @param value A positive integer between 0 and 127 (inclusive)
   * @returns {number} A number between 0 and 1 (inclusive)
   * @static
   */
  static to7Bit(value) {
    if (value === Infinity) value = 1;
    value = parseFloat(value) || 0;
    return Math.min(Math.max(Math.round(value * 127), 0), 127);
  }

  /**
   * Returns the supplied MIDI note number offset by the requested octave and semitone values. If
   * the calculated value is less than 0, 0 will be returned. If the calculated value is more than
   * 127, 127 will be returned. If an invalid offset value is supplied, 0 will be used.
   *
   * @param offset
   * @returns {number} An integer between 0 and 127
   *
   * @throws {Error} Invalid note number
   * @static
   */
  static offsetNumber(number, octaveOffset = 0, semitoneOffset = 0) {

    if (WebMidi.validation) {
      number = parseInt(number);
      if (isNaN(number)) throw new Error("Invalid note number");
      octaveOffset = parseInt(octaveOffset) || 0;
      semitoneOffset = parseInt(semitoneOffset) || 0;
    }

    return Math.min(Math.max(number + (octaveOffset * 12) + semitoneOffset, 0), 127);

  }

  /**
   * Returns the name of the first property of the supplied object whose value is equal to the one
   * supplied.
   *
   * @param object {Object}
   * @param value {*}
   * @returns {string} The name of the matching property
   * @static
   */
  static getPropertyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

}
