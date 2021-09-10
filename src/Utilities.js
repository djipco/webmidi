import {Note} from "./Note.js";

/**
 * The `Utilities` class contains all the general-purpose utility functions of the library. The
 * class is a singleton and is not meant to be instantiated. Its methods are static.
 *
 * @since 3.0.0
 */
class Utilities {

  /**
   * Returns a MIDI note number matching the note name passed in the form of a string parameter. The
   * note name must include the octave number. The name can also optionally include a sharp (#),
   * a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
   * names: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.
   *
   * When converting note names to numbers, C4 is considered to be middle C (MIDI note number 60) as
   * per the scientific pitch notation standard.
   *
   * The resulting note number is offset by the value of the `octaveOffset` property of the options
   * object (if any).
   *
   * **Note**: since v3.x, this function returns `false` instead of throwing an error when it cannot
   * parse the name to a number.
   *
   * @param name {string} The name of the note in the form of a letter, followed by an optional "#",
   * "##", "b" or "bb" followed by the octave number.
   *
   * @param {Object} [options={}]
   *
   * @param {number} [options.octaveOffset=0] A integer to offset the octave by
   *
   * @returns {number|false} The MIDI note number (an integer between 0 and 127) or `false` if the
   * name could not successfully be parsed to a number.
   */
  getNoteNumberByName(name, octaveOffset = 0) {

    // Validation
    octaveOffset = parseInt(octaveOffset);
    if (isNaN(octaveOffset)) return false;
    if (typeof name !== "string") name = "";

    let matches = name.match(/([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)/i);
    if(!matches) return false;

    let semitones = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    let semitone = semitones[matches[1].toUpperCase()];
    let octave = parseInt(matches[3]);
    let result = ((octave + 1 - octaveOffset) * 12) + semitone;

    if (matches[2].toLowerCase().indexOf("b") > -1) {
      result -= matches[2].length;
    } else if (matches[2].toLowerCase().indexOf("#") > -1) {
      result += matches[2].length;
    }

    if (result < 0 || result > 127) return false;

    return result;

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
   */
  sanitizeChannels(channel) {

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
   */
  convertToTimestamp(time) {

    let value = false;
    let parsed = parseFloat(time);
    if (isNaN(parsed)) return false;

    if (typeof time === "string" && time.substring(0, 1) === "+") {
      if (parsed >= 0) value = this.time + parsed;
    } else {
      if (parsed >= 0) value = parsed;
    }

    return value;

  }

  /**
   * Returns a valid MIDI note number (0-127) given the specified input. The parameter usually is a
   * string containing a note name (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer between 0
   * and 127 is passed, it will simply be returned as is (for convenience). Other strings will be
   * parsed for integer, if possible.
   *
   * If the input is a string, the resulting note number is offset by the
   * [octaveOffset]{@link WebMidi#octaveOffset} value (if not zero). For example, if you pass in
   * "C4" and the [octaveOffset]{@link WebMidi#octaveOffset} value is 2, the resulting MIDI note
   * number will be 36.
   *
   * **Note**: since v3.x, this method returns `false` instead of throwing an error when the input
   * is invalid.
   *
   * @param input {string|number} A string to extract the note number from. An integer can also be
   * used, in this case it will simply be returned as is (if between 0 and 127).
   *
   * @returns {number|false} A valid MIDI note number (0-127) or `false` if the input could not
   * successfully be parsed to a note number.
   */
  guessNoteNumber(input, options = {}) {

    if (options.octaveOffset == undefined) options.octaveOffset = 0;
    options.octaveOffset = parseInt(options.octaveOffset);

    let output = false;

    if (Number.isInteger(input) && input >= 0 && input <= 127) {        // uint
      output = parseInt(input);
    } else if (parseInt(input) >= 0 && parseInt(input) <= 127) {        // float or uint as string
      output = parseInt(input);
    } else if (typeof input === "string" || input instanceof String) {  // string
      output = this.getNoteNumberByName(input, {octaveOffset: this.octaveOffset});
    }

    if (output === false) return false;
    return output;

  }

  /**
   * Converts the `input` parameter to a valid {@link Note} object. The input usually is an unsigned
   * integer (0-127) or a note name (`"C4"`, `"G#5"`, etc.). If the input is a {@link Note} object,
   * it will be returned as is.
   *
   * If the input is a note number or name, it is possible to specify options by providing the
   * optional `options` parameter.
   *
   * An error is thrown for invalid input.
   *
   * @param [input] {number|string|Note}
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
   * @param {number} [options.octaveOffset=0] An integer to offset the octave by.
   *
   * @returns {Note}
   *
   * @throws TypeError The input could not be parsed as a note
   *
   * @since version 3
   */
  getNoteObject(input, options= {}) {

    if (options.octaveOffset == undefined) options.octaveOffset = 0;

    if (input instanceof Note) {
      return input;
    } else {
      let number = this.guessNoteNumber(input, {octaveOffset: options.octaveOffset});
      if (number !== false) {
        return new Note(number, options);
      } else {
        throw new TypeError(`The input could not be parsed as a note (${input})`);
      }
    }

  }

  /**
   * Converts an input value, which can be an unsigned integer (0-127), a note name, a {@link Note}
   * object or an array of the previous types, to an array of {@link Note} objects.
   *
   * {@link Note} objects are returned as is. For note numbers and names, a {@link Note} object is
   * created with the options specified. An error will be thrown when encountering invalid input.
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
   * @returns {Note[]}
   *
   * @throws TypeError An element could not be parsed as a note.
   */
  getValidNoteArray(notes, options = {}) {

    let result = [];
    if (!Array.isArray(notes)) notes = [notes];

    notes.forEach(note => {
      result.push(this.getNoteObject(note, options));
    });

    return result;

  }

}

// Export singleton instance of Utilities class. The 'constructor' is nulled so that it cannot be
// used to instantiate a new Utilities object or extend it. However, it is not freezed so it remains
// extensible (properties can be added at will).
const utils = new Utilities();
utils.constructor = null;
export {utils as Utilities};
