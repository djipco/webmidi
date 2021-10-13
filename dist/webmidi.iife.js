/**
 * WebMidi.js v3.0.0-alpha.16
 * A JavaScript library to kickstart your MIDI projects
 * https://webmidijs.org
 * Build generated on October 13th, 2021.
 *
 * © Copyright 2015-2021, Jean-Philippe Côté.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

(function (exports) {
  'use strict';

  class e {
    constructor(e = !1) {
      this.eventMap = {}, this.eventsSuspended = 1 == e;
    }

    addListener(n, r, i = {}) {
      if ("string" == typeof n && n.length < 1 || n instanceof String && n.length < 1 || "string" != typeof n && !(n instanceof String) && n !== e.ANY_EVENT) throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");
      if ("function" != typeof r) throw new TypeError("The callback must be a function.");
      const s = new t(n, this, r, i);
      return this.eventMap[n] || (this.eventMap[n] = []), i.prepend ? this.eventMap[n].unshift(s) : this.eventMap[n].push(s), s;
    }

    addOneTimeListener(e, t, n = {}) {
      n.remaining = 1, this.addListener(e, t, n);
    }

    static get ANY_EVENT() {
      return Symbol.for("Any event");
    }

    hasListener(n, r) {
      if (void 0 === n) return !!(this.eventMap[e.ANY_EVENT] && this.eventMap[e.ANY_EVENT].length > 0) || Object.entries(this.eventMap).some(([, e]) => e.length > 0);

      if (this.eventMap[n] && this.eventMap[n].length > 0) {
        if (r instanceof t) {
          return this.eventMap[n].filter(e => e === r).length > 0;
        }

        if ("function" == typeof r) {
          return this.eventMap[n].filter(e => e.callback === r).length > 0;
        }

        return null == r;
      }

      return !1;
    }

    get eventNames() {
      return Object.keys(this.eventMap);
    }

    getListeners(e) {
      return this.eventMap[e] || [];
    }

    suspendEvent(e) {
      this.getListeners(e).forEach(e => {
        e.suspended = !0;
      });
    }

    unsuspendEvent(e) {
      this.getListeners(e).forEach(e => {
        e.suspended = !1;
      });
    }

    getListenerCount(e) {
      return this.getListeners(e).length;
    }

    emit(t, ...n) {
      if ("string" != typeof t && !(t instanceof String)) throw new TypeError("The 'event' parameter must be a string.");
      if (this.eventsSuspended) return;
      let r = [],
          i = this.eventMap[e.ANY_EVENT] || [];
      return this.eventMap[t] && (i = i.concat(this.eventMap[t])), i.forEach(e => {
        if (e.suspended) return;
        let t = [...n];
        Array.isArray(e.arguments) && (t = t.concat(e.arguments)), e.remaining > 0 && (r.push(e.callback.apply(e.context, t)), e.count++), --e.remaining < 1 && e.remove();
      }), r;
    }

    removeListener(e, t, n = {}) {
      if (void 0 === e) return void (this.eventMap = {});
      if (!this.eventMap[e]) return;
      let r = this.eventMap[e].filter(e => t && e.callback !== t || n.remaining && n.remaining !== e.remaining || n.context && n.context !== e.context);
      r.length ? this.eventMap[e] = r : delete this.eventMap[e];
    }

    async waitFor(e, t = {}) {
      return t.duration = parseInt(t.duration), (isNaN(t.duration) || t.duration <= 0) && (t.duration = 1 / 0), new Promise((n, r) => {
        let i,
            s = this.addListener(e, () => {
          clearTimeout(i), n();
        }, {
          remaining: 1
        });
        t.duration !== 1 / 0 && (i = setTimeout(() => {
          s.remove(), r("The duration expired before the event was emitted.");
        }, t.duration));
      });
    }

    get eventCount() {
      return Object.keys(this.eventMap).length;
    }

  }

  class t {
    constructor(t, n, r, i = {}) {
      if ("string" != typeof t && !(t instanceof String) && t !== e.ANY_EVENT) throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");
      if (!n) throw new ReferenceError("The 'target' parameter is mandatory.");
      if ("function" != typeof r) throw new TypeError("The 'callback' must be a function.");
      void 0 === i.arguments || Array.isArray(i.arguments) || (i.arguments = [i.arguments]), (i = Object.assign({
        context: n,
        remaining: 1 / 0,
        arguments: void 0,
        duration: 1 / 0
      }, i)).duration !== 1 / 0 && setTimeout(() => this.remove(), i.duration), this.event = t, this.target = n, this.callback = r, this.context = i.context, this.remaining = parseInt(i.remaining) >= 1 ? parseInt(i.remaining) : 1 / 0, this.count = 0, this.arguments = i.arguments, this.suspended = !1;
    }

    remove() {
      this.target.removeListener(this.event, this.callback, {
        context: this.context,
        remaining: this.remaining
      });
    }

  }

  /**
   * The `Note` class represents a single musical note such as `"D3"`, `"G#4"`, `"F-1"`, `"Gb7"`, etc.
   *
   * `Note` objects can be played back on a single channel by calling
   * [OutputChannel.playNote()]{@link OutputChannel#playNote} or on multiple channels of the same
   * output by calling [Output.playNote()]{@link Output#playNote}.
   *
   * The note has attack and release velocities set at 0.5 by default. These can be changed by passing
   * in the appropriate option. It is also possible to set a system-wide default for attack and
   * release velocities by using the `WebMidi.defaults` property.
   *
   * The note may have a duration. If it does, playback will be automatically stopped when the
   * duration has elapsed by sending a **noteoff** event. By default, the duration is set to
   * `Infinity`. In this case, it will never stop playing unless explicitly stopped by calling a
   * method such as [OutputChannel.stopNote()]{@link OutputChannel#stopNote},
   * [Output.stopNote()]{@link Output#stopNote} or similar.
   *
   * @param value {string|number} The value used to create the note. If an identifier string is used,
   * it must start with the note letter, optionally followed by an accidental and followed by the
   * octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). If a number is used, it must be an
   * integer between 0 and 127. In this case, middle C is considered to be C4 (note number 60).
   *
   * @param {Object} [options={}]
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the note should be
   * explicitly stopped.
   *
   * @param {number} [options.attack=0.5] The note's attack velocity as a float between 0 and 1. If
   * you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both
   * `attack` and `rawAttack` are specified, the latter has precedence.
   *
   * @param {number} [options.release=0.5] The note's release velocity as a float between 0 and 1. If
   * you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both
   * `release` and `rawRelease` are specified, the latter has precedence.
   *
   * @param {number} [options.rawAttack=64] The note's attack velocity as an integer between 0 and
   * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
   * `attack` and `rawAttack` are specified, the latter has precedence.
   *
   * @param {number} [options.rawRelease=64] The note's release velocity as an integer between 0 and
   * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
   * `release` and `rawRelease` are specified, the latter has precedence.
   *
   * @throws {Error} Invalid note identifier
   * @throws {RangeError} Invalid name value
   * @throws {RangeError} Invalid accidental value
   * @throws {RangeError} Invalid octave value
   * @throws {RangeError} Invalid duration value
   * @throws {RangeError} Invalid attack value
   * @throws {RangeError} Invalid release value
   *
   * @license Apache-2.0
   * @since 3.0.0
   */

  class Note {
    constructor(value, options = {}) {
      // Assign property defaults
      this.duration = wm.defaults.note.duration;
      this.attack = wm.defaults.note.attack;
      this.release = wm.defaults.note.release; // Assign property values from options (validation occurs in setter)

      if (options.duration != undefined) this.duration = options.duration;
      if (options.attack != undefined) this.attack = options.attack;
      if (options.rawAttack != undefined) this.attack = Utilities.toNormalized(options.rawAttack);
      if (options.release != undefined) this.release = options.release;
      if (options.rawRelease != undefined) this.release = Utilities.toNormalized(options.rawRelease); // Assign note depending on the way it was specified (name or number)

      if (Number.isInteger(value)) {
        this.identifier = Utilities.toNoteIdentifier(value);
      } else {
        this.identifier = value;
      }
    }
    /**
     * The name, optional accidental and octave of the note, as a string.
     * @type {string}
     * @since 3.0.0
     */


    get identifier() {
      return this._name + (this._accidental || "") + this._octave;
    }

    set identifier(value) {
      const fragments = Utilities.getNoteDetails(value);

      if (wm.validation) {
        if (!value) throw new Error("Invalid note identifier");
      }

      this._name = fragments.name;
      this._accidental = fragments.accidental;
      this._octave = fragments.octave;
    }
    /**
     * The name (letter) of the note
     * @type {string}
     * @since 3.0.0
     */


    get name() {
      return this._name;
    }

    set name(value) {
      if (wm.validation) {
        value = value.toUpperCase();

        if (!["C", "D", "E", "F", "G", "A", "B"].includes(value)) {
          throw new Error("Invalid name value");
        }
      }

      this._name = value;
    }
    /**
     * The accidental (#, ##, b or bb) of the note
     * @type {string}
     * @since 3.0.0
     */


    get accidental() {
      return this._accidental;
    }

    set accidental(value) {
      if (wm.validation) {
        value = value.toLowerCase();
        if (!["#", "##", "b", "bb"].includes(value)) throw new Error("Invalid accidental value");
      }

      this._accidental = value;
    }
    /**
     * The octave of the note
     * @type {number}
     * @since 3.0.0
     */


    get octave() {
      return this._octave;
    }

    set octave(value) {
      if (wm.validation) {
        value = parseInt(value);
        if (isNaN(value)) throw new Error("Invalid octave value");
      }

      this._octave = value;
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
      if (wm.validation) {
        value = parseFloat(value);

        if (isNaN(value) || value === null || value < 0) {
          throw new RangeError("Invalid duration value.");
        }
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
      if (wm.validation) {
        value = parseFloat(value);

        if (isNaN(value) || !(value >= 0 && value <= 1)) {
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
      if (wm.validation) {
        value = parseFloat(value);

        if (isNaN(value) || !(value >= 0 && value <= 1)) {
          throw new RangeError("Invalid release value.");
        }
      }

      this._release = value;
    }
    /**
     * The attack velocity of the note as a positive integer between 0 and 127.
     * @type {number}
     * @since 3.0.0
     */


    get rawAttack() {
      return Utilities.to7Bit(this._attack);
    }
    /**
     * The release velocity of the note as a positive integer between 0 and 127.
     * @type {number}
     * @since 3.0.0
     */


    get rawRelease() {
      return Utilities.to7Bit(this._release);
    }
    /**
     * The MIDI number of the note. This number is derived from the note identifier using C4 as a
     * reference for middle C.
     *
     * @type {number}
     * @since 3.0.0
     */


    get number() {
      return Utilities.toNoteNumber(this.identifier);
    }
    /**
     * Returns a MIDI note number offset by octave and/or semitone. If the calculated value is less
     * than 0, 0 will be returned. If the calculated value is more than 127, 127 will be returned. If
     * an invalid value is supplied, 0 will be used.
     *
     * @param [octaveOffset] {number} An integer to offset the note number by octave.
     * @param [semitoneOffset] {number} An integer to offset the note number by semitone.
     * @returns {number} An integer between 0 and 127
     */


    getOffsetNumber(octaveOffset = 0, semitoneOffset = 0) {
      if (wm.validation) {
        octaveOffset = parseInt(octaveOffset) || 0;
        semitoneOffset = parseInt(semitoneOffset) || 0;
      }

      return Math.min(Math.max(this.number + octaveOffset * 12 + semitoneOffset, 0), 127);
    }

  }

  /**
   * The `Utilities` class contains general-purpose utility methods. All methods are static and
   * should be called using the class name. For example: `Utilities.getNoteDetails("C4")`.
   *
   * @license Apache-2.0
   * @since 3.0.0
   */

  class Utilities {
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
      const notes = {
        C: 0,
        D: 2,
        E: 4,
        F: 5,
        G: 7,
        A: 9,
        B: 11
      };
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
        if (channel === "all") {
          // backwards-compatibility
          channels = ["all"];
        } else if (channel === "none") {
          // backwards-compatibility
          return [];
        }
      }

      if (!Array.isArray(channel)) {
        channels = [channel];
      } else {
        channels = channel;
      } // In order to preserve backwards-compatibility, we let this assignment as it is.


      if (channels.indexOf("all") > -1) {
        channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      }

      return channels.map(function (ch) {
        return parseInt(ch);
      }).filter(function (ch) {
        return ch >= 1 && ch <= 16;
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
        if (parsed >= 0) value = wm.time + parsed;
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
      let output = false; // Check input type

      if (Number.isInteger(input) && input >= 0 && input <= 127) {
        // uint
        output = parseInt(input);
      } else if (parseInt(input) >= 0 && parseInt(input) <= 127) {
        // float or uint as string
        output = parseInt(input);
      } else if (typeof input === "string" || input instanceof String) {
        // string
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


    static buildNote(input, options = {}) {
      options.octaveOffset = parseInt(options.octaveOffset) || 0; // If it's already a Note, we're done

      if (input instanceof Note) return input;
      let number = this.guessNoteNumber(input, options.octaveOffset);

      if (number === false) {
        // We use a comparison b/c the note can be 0 (which equates to false)
        throw new TypeError(`The input could not be parsed as a note (${input})`);
      } // If we got here, we have a proper note number. Before creating the new note, we strip out
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
      if (wm.validation) {
        number = parseInt(number);
        if (isNaN(number)) throw new Error("Invalid note number");
        octaveOffset = parseInt(octaveOffset) || 0;
        semitoneOffset = parseInt(semitoneOffset) || 0;
      }

      return Math.min(Math.max(number + octaveOffset * 12 + semitoneOffset, 0), 127);
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

  /**
   * The `Enumerations` class contains enumerations of elements used throughout the library. All
   * enumerations are static and should be referenced using the class name. For example:
   * `Enumerations.MIDI_CHANNEL_MESSAGES`.
   *
   * @license Apache-2.0
   * @since 3.0.0
   */
  class Enumerations {
    /**
     * Enumeration of all MIDI channel messages and their associated 4-bit numerical value:
     *
     * - `noteoff`: 0x8 (8)
     * - `noteon`: 0x9 (9)
     * - `keyaftertouch`: 0xA (10)
     * - `controlchange`: 0xB (11)
     * - `nrpn`: 0xB (11)
     * - `programchange`: 0xC (12)
     * - `channelaftertouch`: 0xD (13)
     * - `pitchbend`: 0xE (14)
     *
     * @enum {Object.<string, number>}
     * @readonly
     * @static
     */
    static get MIDI_CHANNEL_MESSAGES() {
      return {
        noteoff: 0x8,
        // 8
        noteon: 0x9,
        // 9
        keyaftertouch: 0xA,
        // 10
        controlchange: 0xB,
        // 11
        programchange: 0xC,
        // 12
        channelaftertouch: 0xD,
        // 13
        pitchbend: 0xE // 14

      };
    }
    /**
     * Enumeration of all channel mode messages and their associated numerical value:
     *
     * - `allsoundoff`: 120
     * - `resetallcontrollers`: 121
     * - `localcontrol`: 122
     * - `allnotesoff`: 123
     * - `omnimodeoff`: 124
     * - `omnimodeon`: 125
     * - `monomodeon`: 126
     * - `polymodeon`: 127
     *
     * @enum {Object.<string, number>}
     * @readonly
     * @static
     */


    static get MIDI_CHANNEL_MODE_MESSAGES() {
      return {
        allsoundoff: 120,
        resetallcontrollers: 121,
        localcontrol: 122,
        allnotesoff: 123,
        omnimodeoff: 124,
        omnimodeon: 125,
        monomodeon: 126,
        polymodeon: 127
      };
    }
    /**
     * Enumeration of most control change messages and their associated numerical value. Note that
     * some control change numbers do not have a predefined purpose and are absent from this list.
     *
     * - `bankselectcoarse`: 0
     * - `modulationwheelcoarse`: 1
     * - `breathcontrollercoarse`: 2
     * - `footcontrollercoarse`: 4
     * - `portamentotimecoarse`: 5
     * - `dataentrycoarse`: 6
     * - `volumecoarse`: 7
     * - `balancecoarse`: 8
     * - `pancoarse`: 10
     * - `expressioncoarse`: 11
     * - `effectcontrol1coarse`: 12
     * - `effectcontrol2coarse`: 13
     * - `generalpurposeslider1`: 16
     * - `generalpurposeslider2`: 17
     * - `generalpurposeslider3`: 18
     * - `generalpurposeslider4`: 19
     * - `bankselectfine`: 32
     * - `modulationwheelfine`: 33
     * - `breathcontrollerfine`: 34
     * - `footcontrollerfine`: 36
     * - `portamentotimefine`: 37
     * - `dataentryfine`: 38
     * - `volumefine`: 39
     * - `balancefine`: 40
     * - `panfine`: 42
     * - `expressionfine`: 43
     * - `effectcontrol1fine`: 44
     * - `effectcontrol2fine`: 45
     * - `holdpedal`: 64
     * - `portamento`: 65
     * - `sustenutopedal`: 66
     * - `softpedal`: 67
     * - `legatopedal`: 68
     * - `hold2pedal`: 69
     * - `soundvariation`: 70
     * - `resonance`: 71
     * - `soundreleasetime`: 72
     * - `soundattacktime`: 73
     * - `brightness`: 74
     * - `soundcontrol6`: 75
     * - `soundcontrol7`: 76
     * - `soundcontrol8`:`77
     * - `soundcontrol9`: 78
     * - `soundcontrol10`: 79
     * - `generalpurposebutton1`: 80
     * - `generalpurposebutton2`: 81
     * - `generalpurposebutton3`: 82
     * - `generalpurposebutton4`: 83
     * - `reverblevel`: 91
     * - `tremololevel`: 92
     * - `choruslevel`: 93
     * - `celestelevel`: 94
     * - `phaserlevel`: 95
     * - `databuttonincrement`: 96
     * - `databuttondecrement`: 97
     * - `nonregisteredparametercoarse`: 98
     * - `nonregisteredparameterfine`: 99
     * - `registeredparametercoarse`: 100
     * - `registeredparameterfine`: 101
     *
     * - `allsoundoff`: 120
     * - `resetallcontrollers`: 121
     * - `localcontrol`: 122
     * - `allnotesoff`: 123
     * - `omnimodeoff`: 124
     * - `omnimodeon`: 125
     * - `monomodeon`: 126
     * - `polymodeon`: 127
     *
     * @enum {Object.<string, number>}
     * @readonly
     * @static
     */


    static get MIDI_CONTROL_CHANGE_MESSAGES() {
      return {
        bankselectcoarse: 0,
        modulationwheelcoarse: 1,
        breathcontrollercoarse: 2,
        footcontrollercoarse: 4,
        portamentotimecoarse: 5,
        dataentrycoarse: 6,
        volumecoarse: 7,
        balancecoarse: 8,
        pancoarse: 10,
        expressioncoarse: 11,
        effectcontrol1coarse: 12,
        effectcontrol2coarse: 13,
        generalpurposeslider1: 16,
        generalpurposeslider2: 17,
        generalpurposeslider3: 18,
        generalpurposeslider4: 19,
        bankselectfine: 32,
        modulationwheelfine: 33,
        breathcontrollerfine: 34,
        footcontrollerfine: 36,
        portamentotimefine: 37,
        dataentryfine: 38,
        volumefine: 39,
        balancefine: 40,
        panfine: 42,
        expressionfine: 43,
        effectcontrol1fine: 44,
        effectcontrol2fine: 45,
        holdpedal: 64,
        portamento: 65,
        sustenutopedal: 66,
        softpedal: 67,
        legatopedal: 68,
        hold2pedal: 69,
        soundvariation: 70,
        resonance: 71,
        soundreleasetime: 72,
        soundattacktime: 73,
        brightness: 74,
        soundcontrol6: 75,
        soundcontrol7: 76,
        soundcontrol8: 77,
        soundcontrol9: 78,
        soundcontrol10: 79,
        generalpurposebutton1: 80,
        generalpurposebutton2: 81,
        generalpurposebutton3: 82,
        generalpurposebutton4: 83,
        reverblevel: 91,
        tremololevel: 92,
        choruslevel: 93,
        celestelevel: 94,
        phaserlevel: 95,
        databuttonincrement: 96,
        databuttondecrement: 97,
        nonregisteredparametercoarse: 98,
        nonregisteredparameterfine: 99,
        registeredparametercoarse: 100,
        registeredparameterfine: 101,
        allsoundoff: 120,
        resetallcontrollers: 121,
        localcontrol: 122,
        allnotesoff: 123,
        omnimodeoff: 124,
        omnimodeon: 125,
        monomodeon: 126,
        polymodeon: 127
      };
    }
    /**
     * Enumeration of all registered parameters and their associated pair of numerical values. MIDI
     * registered parameters extend the original list of control change messages. Currently, there are
     * only a limited number of them:
     *
     * - `pitchbendrange`: [0x00, 0x00]
     * - `channelfinetuning`: [0x00, 0x01]
     * - `channelcoarsetuning`: [0x00, 0x02]
     * - `tuningprogram`: [0x00, 0x03]
     * - `tuningbank`: [0x00, 0x04]
     * - `modulationrange`: [0x00, 0x05]
     * - `azimuthangle`: [0x3D, 0x00]
     * - `elevationangle`: [0x3D, 0x01]
     * - `gain`: [0x3D, 0x02]
     * - `distanceratio`: [0x3D, 0x03]
     * - `maximumdistance`: [0x3D, 0x04]
     * - `maximumdistancegain`: [0x3D, 0x05]
     * - `referencedistanceratio`: [0x3D, 0x06]
     * - `panspreadangle`: [0x3D, 0x07]
     * - `rollangle`: [0x3D, 0x08]
     *
     * @enum {Object.<string, number[]>}
     * @readonly
     * @static
     */


    static get MIDI_REGISTERED_PARAMETERS() {
      return {
        pitchbendrange: [0x00, 0x00],
        channelfinetuning: [0x00, 0x01],
        channelcoarsetuning: [0x00, 0x02],
        tuningprogram: [0x00, 0x03],
        tuningbank: [0x00, 0x04],
        modulationrange: [0x00, 0x05],
        azimuthangle: [0x3D, 0x00],
        elevationangle: [0x3D, 0x01],
        gain: [0x3D, 0x02],
        distanceratio: [0x3D, 0x03],
        maximumdistance: [0x3D, 0x04],
        maximumdistancegain: [0x3D, 0x05],
        referencedistanceratio: [0x3D, 0x06],
        panspreadangle: [0x3D, 0x07],
        rollangle: [0x3D, 0x08]
      };
    }
    /**
     * Enumeration of all valid MIDI system messages and matching numerical values. WebMidi.js also
     * uses two custom messages.
     *
     * **System common messages**
     * - `sysex`: 0xF0 (240)
     * - `timecode`: 0xF1 (241)
     * - `songposition`: 0xF2 (242)
     * - `songselect`: 0xF3 (243)
     * - `tunerequest`: 0xF6 (246)
     * - `sysexend`: 0xF7 (247)
     *
     * The `sysexend` message is never actually received. It simply ends a sysex stream.
     *
     * **System real-time messages**
     *
     * - `clock`: 0xF8 (248)
     * - `start`: 0xFA (250)
     * - `continue`: 0xFB (251)
     * - `stop`: 0xFC (252)
     * - `activesensing`: 0xFE (254)
     * - `reset`: 0xFF (255)
     *
     * Values 249 and 253 are actually relayed by the Web MIDI API but they do not serve a specific
     * purpose. The
     * [MIDI 1.0 spec](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
     * simply states that they are undefined/reserved.
     *
     * **Custom WebMidi.js messages**
     *
     * - `midimessage`: 0
     * - `unknownsystemmessage`: -1
     *
     * @enum {Object.<string, number>}
     * @readonly
     * @static
     */


    static get MIDI_SYSTEM_MESSAGES() {
      return {
        // System common messages
        sysex: 0xF0,
        // 240
        timecode: 0xF1,
        // 241
        songposition: 0xF2,
        // 242
        songselect: 0xF3,
        // 243
        tunerequest: 0xF6,
        // 246
        tuningrequest: 0xF6,
        // for backwards-compatibility (deprecated in version 3.0)
        sysexend: 0xF7,
        // 247 (never actually received - simply ends a sysex)
        // System real-time messages
        clock: 0xF8,
        // 248
        start: 0xFA,
        // 250
        continue: 0xFB,
        // 251
        stop: 0xFC,
        // 252
        activesensing: 0xFE,
        // 254
        reset: 0xFF,
        // 255
        // Custom WebMidi.js messages
        midimessage: 0,
        unknownsystemmessage: -1
      };
    }

  }

  /**
   * The `InputChannel` class represents a MIDI input channel (1-16) from a single input device. This
   * object is derived from the host's MIDI subsystem and cannot be instantiated directly.
   *
   * All 16 `InputChannel` objects can be found inside the input's [channels](Input#channels)
   * property.
   *
   * @param {Input} input The `Input` object this channel belongs to
   * @param {number} number The MIDI channel's number (1-16)
   *
   * @fires InputChannel#midimessage
   *
   * @fires InputChannel#noteoff
   * @fires InputChannel#noteon
   * @fires InputChannel#keyaftertouch
   * @fires InputChannel#controlchange
   * @fires InputChannel#programchange
   * @fires InputChannel#channelaftertouch
   * @fires InputChannel#pitchbend
   *
   * @fires InputChannel#allnotesoff
   * @fires InputChannel#allsoundoff
   * @fires InputChannel#localcontrol
   * @fires InputChannel#monomode
   * @fires InputChannel#omnimode
   * @fires InputChannel#resetallcontrollers
   *
   * @fires InputChannel#nrpndataentrycoarse
   * @fires InputChannel#nrpndataentryfine
   * @fires InputChannel#nrpndatabuttonincrement
   * @fires InputChannel#nrpndatabuttondecrement
   *
   * @fires InputChannel#rpndataentrycoarse
   * @fires InputChannel#rpndataentryfine
   * @fires InputChannel#rpndatabuttonincrement
   * @fires InputChannel#rpndatabuttondecrement
   *
   * @extends EventEmitter
   * @license Apache-2.0
   * @since 3.0.0
   */

  class InputChannel extends e {
    constructor(input, number) {
      super();
      /**
       * @type {Input}
       * @private
       */

      this._input = input;
      /**
       * @type {number}
       * @private
       */

      this._number = number;
      /**
       * @type {number}
       * @private
       */

      this._octaveOffset = 0;
      /**
       * An array of messages that form the current NRPN sequence
       * @private
       * @type {Message[]}
       */

      this._nrpnBuffer = [];
      /**
       * An array of messages that form the current RPN sequence
       * @private
       * @type {Message[]}
       */

      this._rpnBuffer = [];
      /**
       * Indicates whether events for **Non-Registered Parameter Number** should be dispatched. NRPNs
       * are composed of a sequence of specific **control change** messages. When a valid sequence of
       * such control change messages is received, an `nrpn` event will fire.
       *
       * If an invalid or
       * out-of-order control change message is received, it will fall through the collector logic and
       * all buffered control change messages will be discarded as incomplete.
       *
       * @type {boolean}
       */

      this.parameterNumberEventsEnabled = true;
    }
    /**
     * Destroys the `Input` by removing all listeners and severing the link with the MIDI subsystem's
     * input.
     */


    destroy() {
      this._input = null;
      this._number = null;
      this._octaveOffset = 0;
      this._nrpnBuffer = [];
      this.parameterNumberEventsEnabled = false;
      this.removeListener();
    }
    /**
     * @param e MIDIMessageEvent
     * @private
     */


    _processMidiMessageEvent(e) {
      // Create and emit a new 'midimessage' event based on the incoming one
      const event = Object.assign({}, e);
      event.target = this;
      event.type = "midimessage";
      /**
       * Event emitted when a MIDI message of any kind is received by an `InputChannel`
       *
       * @event InputChannel#midimessage
       *
       * @type {Object}
       *
       * @property {Input} target The `InputChannel` that triggered the event.
       * @property {Message} message A `Message` object containing information about the incoming MIDI
       * message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"midimessage"`
       *
       * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
       * the `message` object instead).
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
       * the `message` object instead).
       * @property {number} event.statusByte The message's status byte  (deprecated, use the `message`
       * object instead).
       * @property {?number[]} event.dataBytes The message's data bytes as an array of 0, 1 or 2
       * integers. This will be null for `sysex` messages (deprecated, use the `message` object
       * instead).
       */

      this.emit(event.type, event); // Parse the inbound event for regular MIDI messages

      this._parseEventForStandardMessages(event);
    }
    /**
     * Parses incoming channel events and emit standard MIDI message events (noteon, noteoff, etc.)
     * @param e Event
     * @private
     */


    _parseEventForStandardMessages(e) {
      const event = Object.assign({}, e);
      event.type = event.message.type || "unknownmidimessage";
      const data1 = e.message.dataBytes[0];
      const data2 = e.message.dataBytes[1];

      if (event.type === "noteoff" || event.type === "noteon" && data2 === 0) {
        /**
         * Event emitted when a **note off** MIDI message has been received on the channel.
         *
         * @event InputChannel#noteoff
         *
         * @type {Object}
         * @property {string} type `"noteoff"`
         *
         * @property {InputChannel} target The object that triggered the event (the `InputChannel`
         * object).
         * @property {Message} message A `Message` object containing information about the incoming
         * MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {Object} note A [`Note`](Note) object containing information such as note name,
         * octave and release velocity.
         * @property {number} value The release velocity amount expressed as a float between 0 and 1.
         * @property {number} rawValue The release velocity amount expressed as an integer (between 0
         * and 127).
         */
        // The object created when a noteoff event arrives is a Note with an attack velocity of 0.
        event.note = new Note(Utilities.offsetNumber(data1, this.octaveOffset + this.input.octaveOffset + wm.octaveOffset), {
          rawAttack: 0,
          rawRelease: data2
        });
        event.value = Utilities.toNormalized(data2);
        event.rawValue = data2; // Those are kept for backwards-compatibility but are gone from the documentation. They will
        // be removed in future versions (@deprecated).

        event.velocity = event.note.release;
        event.rawVelocity = event.note.rawRelease;
      } else if (event.type === "noteon") {
        /**
         * Event emitted when a **note on** MIDI message has been received.
         *
         * @event InputChannel#noteon
         *
         * @type {Object}
         * @property {string} type `"noteon"`
         *
         * @property {InputChannel} channel The `InputChannel` object that triggered the event.
         * @property {Array} event.data The MIDI message as an array of 8 bit values.
         * @property {InputChannel} input The [`Input`](Input) object where through which the message
         * was received.
         * @property {Uint8Array} event.rawData The raw MIDI message as a `Uint8Array`.
         * @property {InputChannel} target The object that triggered the event (the `InputChannel`
         * object).
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {Note} note A [`Note`](Note) object containing information such as note name,
         * octave and attack velocity.
         *
         * @property {number} value The attack velocity amount expressed as a float between 0 and 1.
         * @property {number} rawValue The attack velocity amount expressed as an integer (between 0
         * and 127).
         */
        event.note = new Note(Utilities.offsetNumber(data1, this.octaveOffset + this.input.octaveOffset + wm.octaveOffset), {
          rawAttack: data2
        });
        event.value = Utilities.toNormalized(data2);
        event.rawValue = data2; // Those are kept for backwards-compatibility but are gone from the documentation. They will
        // be removed in future versions (@deprecated).

        event.velocity = event.note.attack;
        event.rawVelocity = event.note.rawAttack;
      } else if (event.type === "keyaftertouch") {
        /**
         * Event emitted when a **key-specific aftertouch** MIDI message has been received.
         *
         * @event InputChannel#keyaftertouch
         *
         * @type {Object}
         * @property {string} type `"keyaftertouch"`
         *
         * @property {InputChannel} target The object that triggered the event (the `InputChannel`
         * object).
         * @property {Message} message A `Message` object containing information about the incoming
         * MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {string} identifier The note identifier of the key to apply the aftertouch to.
         * This includes any octave offset applied at the channel, input or global level.
         * @property {number} key The MIDI note number of the key to apply the aftertouch to. This
         * includes any octave offset applied at the channel, input or global level.
         * @property {number} rawKey The MIDI note number of the key to apply the aftertouch to. This
         * excludes any octave offset defined at the channel, input or global level.
         * @property {number} value The aftertouch amount expressed as a float between 0 and 1.
         * @property {number} rawValue The aftertouch amount expressed as an integer (between 0 and
         * 127).
         */
        event.identifier = Utilities.toNoteIdentifier(data1, wm.octaveOffset + this.input.octaveOffset + this.octaveOffset);
        event.key = Utilities.toNoteNumber(event.identifier);
        event.rawKey = data1;
        event.value = Utilities.toNormalized(data2);
        event.rawValue = data2; // This is kept for backwards-compatibility but is gone from the documentation. It will be
        // removed from future versions (@deprecated).

        event.note = new Note(Utilities.offsetNumber(data1, this.octaveOffset + this.input.octaveOffset + wm.octaveOffset));
      } else if (event.type === "controlchange") {
        /**
         * Event emitted when a **control change** MIDI message has been received.
         *
         * @event InputChannel#controlchange
         *
         * @type {Object}
         * @property {string} type `"controlchange"`
         *
         * @property {InputChannel} target The object that triggered the event (the `InputChannel`
         * object).
         * @property {Message} message A `Message` object containing information about the incoming
         * MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {Object} controller
         * @property {Object} controller.number The number of the controller.
         * @property {Object} controller.name The usual name or function of the controller.
         * @property {number} value The value expressed as a float between 0 and 1.
         * @property {number} rawValue The value expressed as an integer (between 0 and 127).
         */
        event.controller = {
          number: data1,
          name: this.getCcNameByNumber(data1)
        };
        event.value = Utilities.toNormalized(data2);
        event.rawValue = data2; // Trigger channel mode message events (if appropriate)

        if (event.message.dataBytes[0] >= 120) this._parseChannelModeMessage(event); // Parse the inbound event to see if its part of an RPN/NRPN sequence

        if (this.parameterNumberEventsEnabled && this.isRpnOrNrpnController(event.message.dataBytes[0])) {
          this._parseEventForParameterNumber(event);
        }
      } else if (event.type === "programchange") {
        /**
         * Event emitted when a **program change** MIDI message has been received.
         *
         * @event InputChannel#programchange
         *
         * @type {Object}
         * @property {string} type `"programchange"`
         *
         * @property {InputChannel} target The object that triggered the event (the `InputChannel`
         * object).
         * @property {Message} message A `Message` object containing information about the incoming
         * MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {number} value The value expressed as an integer between 1 and 128.
         * @property {number} rawValue The value expressed as an integer between 0 and 127..
         */
        event.value = data1 + 1;
        event.rawValue = data1;
      } else if (event.type === "channelaftertouch") {
        /**
         * Event emitted when a control change MIDI message has been received.
         *
         * @event InputChannel#channelaftertouch
         *
         * @type {Object}
         * @property {string} type `"channelaftertouch"`
         *
         * @property {InputChannel} target The object that triggered the event (the `InputChannel`
         * object).
         * @property {Message} message A `Message` object containing information about the incoming
         * MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {number} value The value expressed as a float between 0 and 1.
         * @property {number} rawValue The value expressed as an integer (between 0 and 127).
         */
        event.value = Utilities.toNormalized(data1);
        event.rawValue = data1;
      } else if (event.type === "pitchbend") {
        /**
         * Event emitted when a pitch bend MIDI message has been received.
         *
         * @event InputChannel#pitchbend
         *
         * @type {Object}
         * @property {string} type `"pitchbend"`
         *
         * @property {InputChannel} target The object that triggered the event (the `InputChannel`
         * object).
         * @property {Message} message A `Message` object containing information about the incoming
         * MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {number} value The value expressed as a float between 0 and 1.
         * @property {number} rawValue The value expressed as an integer (between 0 and 16383).
         */
        event.value = ((data2 << 7) + data1 - 8192) / 8192;
        event.rawValue = (data2 << 7) + data1;
      } else {
        event.type = "unknownmessage";
      }

      this.emit(event.type, event);
    }

    _parseChannelModeMessage(e) {
      // Make a shallow copy of the incoming event so we can use it as the new event.
      const event = Object.assign({}, e);
      event.type = event.controller.name;
      /**
       * Event emitted when an "all sound off" channel-mode MIDI message has been received.
       *
       * @event InputChannel#allsoundoff
       *
       * @type {Object}
       * @property {string} type `"allsoundoff"`
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       */

      /**
       * Event emitted when a "reset all controllers" channel-mode MIDI message has been received.
       *
       * @event InputChannel#resetallcontrollers
       *
       * @type {Object}
       * @property {string} type `"resetallcontrollers"`
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       */

      /**
       * Event emitted when a "local control" channel-mode MIDI message has been received. The value
       * property of the event is set to either `true` (local control on) of `false` (local control
       * off).
       *
       * @event InputChannel#localcontrol
       *
       * @type {Object}
       * @property {string} type `"localcontrol"`
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {boolean} value For local control on, the value is `true`. For local control off,
       * the value is `false`.
       */

      if (event.type === "localcontrol") {
        event.value = event.message.data[2] === 127 ? true : false;
      }
      /**
       * Event emitted when an "all notes off" channel-mode MIDI message has been received.
       *
       * @event InputChannel#allnotesoff
       *
       * @type {Object}
       * @property {string} type `"allnotesoff"`
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       */

      /**
       * Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
       * property of the event is set to either `true` (omni mode on) of `false` (omni mode off).
       *
       * @event InputChannel#omnimode
       *
       * @type {Object}
       * @property {string} type `"omnimode"`
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {boolean} value The value is `true` for omni mode on and false for omni mode off.
       */


      if (event.type === "omnimodeon") {
        event.type = "omnimode";
        event.value = true;
      } else if (event.type === "omnimodeoff") {
        event.type = "omnimode";
        event.value = false;
      }
      /**
       * Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
       * the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
       * poly mode on).
       *
       * @event InputChannel#monomode
       *
       * @type {Object}
       * @property {string} type `"monomode"`
       *
       * @property {InputChannel} target The object that triggered the event (the `InputChannel`
       * object).
       * @property {Message} message A `Message` object containing information about the incoming
       * MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {boolean} value The value is `true` for omni mode on and false for omni mode off.
       */


      if (event.type === "monomodeon") {
        event.type = "monomode";
        event.value = true;
      } else if (event.type === "polymodeon") {
        event.type = "monomode";
        event.value = false;
      }

      this.emit(event.type, event);
    }
    /**
     * Parses inbound events to identify NRPN sequences.
     *
     * and constructs NRPN message parts in valid sequences.
     * Keeps a separate NRPN buffer for each channel.
     * Emits an event after it receives the final CC parts msb 127 lsb 127.
     * If a message is incomplete and other messages are received before
     * the final 127 bytes, the incomplete message is cleared.
     * @param e Event
     * @private
     */


    _parseEventForParameterNumber(event) {
      // To make it more legible
      const controller = event.message.dataBytes[0];
      const value = event.message.dataBytes[1];
      const list = Enumerations.MIDI_CONTROL_CHANGE_MESSAGES; // A. Check if the message is the start of an RPN (101) or NRPN (99) parameter declaration.

      if (controller === list.nonregisteredparameterfine || // 99
      controller === list.registeredparameterfine // 101
      ) {
          this._nrpnBuffer = [];
          this._rpnBuffer = [];

          if (controller === list.nonregisteredparameterfine) {
            // 99
            this._nrpnBuffer = [event.message];
          } else {
            // 101
            // 127 is a reset so we ignore it
            if (value !== 127) this._rpnBuffer = [event.message];
          } // B. Check if the message is the end of an RPN (100) or NRPN (98) parameter declaration.

        } else if (controller === list.nonregisteredparametercoarse || // 98
      controller === list.registeredparametercoarse // 100
      ) {
          if (controller === list.nonregisteredparametercoarse) {
            // 98
            // Flush the other buffer (they are mutually exclusive)
            this._rpnBuffer = []; // Check if we are in sequence

            if (this._nrpnBuffer.length === 1) {
              this._nrpnBuffer.push(event.message);
            } else {
              this._nrpnBuffer = []; // out of sequence
            }
          } else {
            // 100
            // Flush the other buffer (they are mutually exclusive)
            this._nrpnBuffer = []; // 127 is a reset so we ignore it

            if (this._rpnBuffer.length === 1 && value !== 127) {
              this._rpnBuffer.push(event.message);
            } else {
              this._rpnBuffer = []; // out of sequence or reset
            }
          } // C. Check if the message is for data entry (6, 38, 96 or 97). Those messages trigger events.

        } else if (controller === list.dataentrycoarse || // 6
      controller === list.dataentryfine || // 38
      controller === list.databuttonincrement || // 96
      controller === list.databuttondecrement // 97
      ) {
          if (this._rpnBuffer.length === 2) {
            this._dispatchParameterNumberEvent("rpn", this._rpnBuffer[0].dataBytes[1], this._rpnBuffer[1].dataBytes[1], event);
          } else if (this._nrpnBuffer.length === 2) {
            this._dispatchParameterNumberEvent("nrpn", this._nrpnBuffer[0].dataBytes[1], this._nrpnBuffer[1].dataBytes[1], event);
          } else {
            this._nrpnBuffer = [];
            this._rpnBuffer = [];
          }
        }
    }

    isRpnOrNrpnController(controller) {
      return controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.dataentrycoarse || //   6
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.dataentryfine || //  38
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.databuttonincrement || //  96
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.databuttondecrement || //  97
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.nonregisteredparametercoarse || //  98
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.nonregisteredparameterfine || //  99
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.registeredparametercoarse || // 100
      controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.registeredparameterfine; // 101
    }

    _dispatchParameterNumberEvent(type, paramMsb, paramLsb, e) {
      /**
       * Event emitted when a 'dataentrycoarse' NRPN message has been received on the input.
       *
       * @event InputChannel#nrpndataentrycoarse
       *
       * @type {Object}
       *
       * @property {string} type `"nrpndataentrycoarse"`
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {number} parameter The non-registered parameter number (0-16383)
       * @property {number} parameterMsb The MSB portion of the non-registered parameter number
       * (0-127)
       * @property {number} parameterLsb: The LSB portion of the non-registered parameter number
       * (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when a 'dataentryfine' NRPN message has been received on the input.
       *
       * @event InputChannel#nrpndataentryfine
       *
       * @type {Object}
       *
       * @property {string} type `"nrpndataentryfine"`
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {number} parameter The non-registered parameter number (0-16383)
       * @property {number} parameterMsb The MSB portion of the non-registered parameter number
       * (0-127)
       * @property {number} parameterLsb: The LSB portion of the non-registered parameter number
       * (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when a 'databuttonincrement' NRPN message has been received on the input.
       *
       * @event InputChannel#nrpndatabuttonincrement
       *
       * @type {Object}
       *
       * @property {string} type `"nrpndatabuttonincrement"`
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {number} parameter The non-registered parameter number (0-16383)
       * @property {number} parameterMsb The MSB portion of the non-registered parameter number
       * (0-127)
       * @property {number} parameterLsb: The LSB portion of the non-registered parameter number
       * (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when a 'databuttondecrement' NRPN message has been received on the input.
       *
       * @event InputChannel#nrpndatabuttondecrement
       *
       * @type {Object}
       *
       * @property {string} type `"nrpndatabuttondecrement"`
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {number} parameter The non-registered parameter number (0-16383)
       * @property {number} parameterMsb The MSB portion of the non-registered parameter number
       * (0-127)
       * @property {number} parameterLsb: The LSB portion of the non-registered parameter number
       * (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when a 'dataentrycoarse' RPN message has been received on the input.
       *
       * @event InputChannel#rpndataentrycoarse
       *
       * @type {Object}
       *
       * @property {string} type `"rpndataentrycoarse"`
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when a 'dataentryfine' RPN message has been received on the input.
       *
       * @event InputChannel#rpndataentryfine
       *
       * @type {Object}
       *
       * @property {string} type `"rpndataentryfine"`
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when a 'databuttonincrement' RPN message has been received on the input.
       *
       * @event InputChannel#rpndatabuttonincrement
       *
       * @type {Object}
       *
       * @property {string} type `"rpndatabuttonincrement"`
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when a 'databuttondecrement' RPN message has been received on the input.
       *
       * @event InputChannel#rpndatabuttondecrement
       *
       * @type {Object}
       *
       * @property {string} type `"rpndatabuttondecrement"`
       * @property {InputChannel} target The `InputChannel` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */
      const event = {
        target: e.target,
        timestamp: e.timestamp,
        parameterMsb: paramMsb,
        parameterLsb: paramLsb,
        value: Utilities.toNormalized(e.message.dataBytes[1]),
        rawValue: e.message.dataBytes[1],
        type: type === "rpn" ? "rpn" : "nrpn"
      }; // Retrieve controller type and append to event type

      event.type += Utilities.getPropertyByValue(Enumerations.MIDI_CONTROL_CHANGE_MESSAGES, e.message.dataBytes[0]); // Identify the parameter (by name for RPN and by number for NRPN)

      if (type === "rpn") {
        event.parameter = Object.keys(Enumerations.MIDI_REGISTERED_PARAMETERS).find(key => {
          return Enumerations.MIDI_REGISTERED_PARAMETERS[key][0] === paramMsb && Enumerations.MIDI_REGISTERED_PARAMETERS[key][1] === paramLsb;
        });
      } else {
        event.parameter = (paramMsb << 7) + paramLsb;
      }

      this.emit(event.type, event);
    }
    /**
     * Returns the channel mode name matching the specified number. If no match is found, the function
     * returns `false`.
     *
     * @param {number} number An integer representing the channel mode message.
     * @returns {string|false} The name of the matching channel mode or `false` if not match could be
     * found.
     *
     * @since 2.0.0
     */


    getChannelModeByNumber(number) {
      if (wm.validation) {
        number = Math.floor(number);
      }

      if (!(number >= 120 && number <= 127)) return false;

      for (let cm in Enumerations.MIDI_CHANNEL_MODE_MESSAGES) {
        if (Enumerations.MIDI_CHANNEL_MODE_MESSAGES.hasOwnProperty(cm) && number === Enumerations.MIDI_CHANNEL_MODE_MESSAGES[cm]) {
          return cm;
        }
      }

      return false;
    }
    /**
     * Returns the name of a control change message matching the specified number. Some valid control
     * change numbers do not have a specific name or purpose assigned in the MIDI
     * [spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
     * In this case, the method returns `false`.
     *
     * @param {number} number An integer representing the control change message
     * @returns {string|undefined} The matching control change name or `undefined` if not match was
     * found.
     *
     * @throws {RangeError} Invalid control change number.
     *
     * @since 2.0.0
     */


    getCcNameByNumber(number) {
      if (wm.validation) {
        number = parseInt(number);
        if (!(number >= 0 && number <= 127)) throw new RangeError("Invalid control change number.");
      }

      return Utilities.getPropertyByValue(Enumerations.MIDI_CONTROL_CHANGE_MESSAGES, number);
    }
    /**
     * An integer to offset the reported octave of incoming note-specific messages (`noteon`,
     * `noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
     * octave (C4).
     *
     * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
     * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
     *
     * Note that this value is combined with the global offset value defined on the `WebMidi` object
     * and with the value defined on the parent `Input` object.
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
     * The [`Input`](Input) this channel belongs to
     * @type {Input}
     * @since 3.0
     */


    get input() {
      return this._input;
    }
    /**
     * This channel's MIDI number (1-16)
     * @type {number}
     * @since 3.0
     */


    get number() {
      return this._number;
    }
    /**
     * Whether RPN/NRPN events are parsed and dispatched.
     * @type {boolean}
     * @since 3.0
     * @deprecated Use parameterNumberEventsEnabled instead.
     * @private
     */


    get nrpnEventsEnabled() {
      return this.parameterNumberEventsEnabled;
    }

    set nrpnEventsEnabled(value) {
      if (this.validation) {
        value = !!value;
      }

      this.parameterNumberEventsEnabled = value;
    }
    /**
     * Array of channel-specific event names that can be listened to.
     * @type {string[]}
     * @readonly
     */


    static get EVENTS() {
      return [// MIDI channel message events
      "noteoff", "controlchange", "noteon", "keyaftertouch", "programchange", "channelaftertouch", "pitchbend", // MIDI channel mode events
      "allnotesoff", "allsoundoff", "localcontrol", "monomode", "omnimode", "resetallcontrollers", // NRPN events
      "nrpndataentrycoarse", "nrpndataentryfine", "nrpndatabuttonincrement", "nrpndatabuttondecrement", // RPN events
      "rpndataentrycoarse", "rpndataentryfine", "rpndatabuttonincrement", "rpndatabuttondecrement"];
    }

  }

  /**
   * The `Input` class represents a single MIDI input port. This object is automatically instantiated
   * by the library according to the host's MIDI subsystem and should not be directly instantiated.
   * Instead, you can access all `Input` objects by referring to the [`WebMidi.inputs`](WebMidi#inputs)
   * array.
   *
   * Note that a single device may expose several inputs and/or outputs.
   *
   * @param {MIDIInput} midiInput `MIDIInput` object as provided by the MIDI subsystem (Web MIDI API).
   *
   * @fires Input#opened
   * @fires Input#disconnected
   * @fires Input#closed
   * @fires Input#midimessage
   * @fires Input#sysex
   * @fires Input#timecode
   * @fires Input#songposition
   * @fires Input#songselect
   * @fires Input#tunerequest
   * @fires Input#clock
   * @fires Input#start
   * @fires Input#continue
   * @fires Input#stop
   * @fires Input#activesensing
   * @fires Input#reset
   * @fires Input#unknownmidimessage
   *
   * @extends EventEmitter
   * @license Apache-2.0
   */

  class Input extends e {
    constructor(midiInput) {
      super();
      /**
       * Reference to the actual MIDIInput object
       * @private
       */

      this._midiInput = midiInput;
      /**
       * @type {number}
       * @private
       */

      this._octaveOffset = 0;
      /**
       * Array containing the 16 [`InputChannel`](InputChannel) objects available for this `Input`. The
       * channels are numbered 1 through 16.
       *
       * @type {InputChannel[]}
       */

      this.channels = [];

      for (let i = 1; i <= 16; i++) this.channels[i] = new InputChannel(this, i); // Setup listeners


      this._midiInput.onstatechange = this._onStateChange.bind(this);
      this._midiInput.onmidimessage = this._onMidiMessage.bind(this);
    }
    /**
     * Destroys the `Input` by removing all listeners, emptying the `channels` array and unlinking the
     * MIDI subsystem.
     *
     * @returns {Promise<void>}
     */


    async destroy() {
      this.removeListener();
      this.channels.forEach(ch => ch.destroy());
      this.channels = [];

      if (this._midiInput) {
        this._midiInput.onstatechange = null;
        this._midiInput.onmidimessage = null;
      }

      await this.close();
      this._midiInput = null;
    }
    /**
     * Executed when a `"statechange"` event occurs.
     *
     * @param e
     * @private
     */


    _onStateChange(e) {
      let event = {
        timestamp: wm.time,
        target: this
      };

      if (e.port.connection === "open") {
        /**
         * Event emitted when the {@link Input} has been opened by calling the {@link Input#open}
         * method.
         *
         * @event Input#opened
         * @type {Object}
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {string} type `"opened"`
         * @property {Input} target The object that triggered the event
         */
        event.type = "opened";
        this.emit("opened", event);
      } else if (e.port.connection === "closed" && e.port.state === "connected") {
        /**
         * Event emitted when the {@link Input} has been closed by calling the {@link Input#close}
         * method.
         *
         * @event Input#closed
         * @type {Object}
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {string} type `"closed"`
         * @property {Input} target The object that triggered the event
         */
        event.type = "closed";
        this.emit("closed", event);
      } else if (e.port.connection === "closed" && e.port.state === "disconnected") {
        /**
         * Event emitted when the {@link Input} becomes unavailable. This event is typically fired
         * when the MIDI device is unplugged.
         *
         * @event Input#disconnected
         * @type {Object}
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {string} type `"disconnected"`
         * @property {Object} target Object with properties describing the {@link Input} that
         * triggered the event. This is not the actual `Input` as it is no longer available.
         * @property {string} target.connection `"closed"`
         * @property {string} target.id ID of the input
         * @property {string} target.manufacturer Manufacturer of the device that provided the input
         * @property {string} target.name Name of the device that provided the input
         * @property {string} target.state `"disconnected"`
         * @property {string} target.type `"input"`
         */
        event.type = "disconnected";
        event.target = {
          connection: e.port.connection,
          id: e.port.id,
          manufacturer: e.port.manufacturer,
          name: e.port.name,
          state: e.port.state,
          type: e.port.type
        };
        this.emit("disconnected", event);
      } else if (e.port.connection === "pending" && e.port.state === "disconnected") ; else {
        console.warn("This statechange event was not caught: ", e.port.connection, e.port.state);
      }
    }
    /**
     * Executed when a `"midimessage"` event is received
     * @param e
     * @private
     */


    _onMidiMessage(e) {
      // Create Message object from MIDI data
      const message = new Message(e.data);
      /**
       * Event emitted when any MIDI message is received on an `Input`
       *
       * @event Input#midimessage
       *
       * @type {Object}
       *
       * @property {Input} target The `Input` that triggered the event.
       * @property {Message} message A `Message` object containing information about the incoming MIDI
       * message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"midimessage"`
       *
       * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
       * the `message` object instead).
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array (deprecated, use
       * the `message` object instead).
       * @property {number} event.statusByte The message's status byte  (deprecated, use the `message`
       * object instead).
       * @property {?number[]} event.dataBytes The message's data bytes as an array of 0, 1 or 2
       * integers. This will be null for `sysex` messages (deprecated, use the `message` object
       * instead).
       *
       * @since 2.1
       */

      const event = {
        target: this,
        message: message,
        timestamp: e.timeStamp,
        type: "midimessage",
        data: message.data,
        // @deprecated (will be removed in v4)
        rawData: message.data,
        // @deprecated (will be removed in v4)
        statusByte: message.data[0],
        // @deprecated (will be removed in v4)
        dataBytes: message.dataBytes // @deprecated (will be removed in v4)

      };
      this.emit("midimessage", event); // Messages are forwarded to InputChannel if they are channel messages or parsed locally for
      // system messages.

      if (message.isSystemMessage) {
        // system messages
        this._parseEvent(event);
      } else if (message.isChannelMessage) {
        // channel messages
        this.channels[message.channel]._processMidiMessageEvent(event);
      }
    }
    /**
     * @private
     */


    _parseEvent(e) {
      // Make a shallow copy of the incoming event so we can use it as the new event.
      const event = Object.assign({}, e);
      event.type = event.message.type || "unknownmidimessage"; // Add custom property for 'songselect'

      if (event.type === "songselect") {
        event.song = e.data[1] + 1;
      } // Emit event


      this.emit(event.type, event);
    }
    /**
     * Opens the input for usage. This is usually unnecessary as the port is open automatically when
     * WebMidi is enabled.
     *
     * @returns {Promise<Input>} The promise is fulfilled with the `Input` object
     */


    async open() {
      // Explicitly opens the port for usage. This is not mandatory. When the port is not explicitly
      // opened, it is implicitly opened (asynchronously) when assigning a listener to the
      // `onmidimessage` property of the `MIDIInput`. We do it explicitly so that 'connected' events
      // are dispatched immediately and that we are ready to listen.
      try {
        await this._midiInput.open();
      } catch (err) {
        return Promise.reject(err);
      }

      return Promise.resolve(this);
    }
    /**
     * Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
     * the input is opened again by calling [Input.open()]{@link Input#open}.
     *
     * @returns {Promise<Input>} The promise is fulfilled with the `Input` object
     */


    async close() {
      // We close the port. This triggers a statechange event which, in turn, will emit the 'closed'
      // event.
      if (!this._midiInput) return Promise.resolve(this);

      try {
        await this._midiInput.close();
      } catch (err) {
        return Promise.reject(err);
      }

      return Promise.resolve(this);
    }
    /**
     * @private
     * @deprecated since v3.0.0 (moved to 'InputChannel' class)
     */


    getChannelModeByNumber() {
      if (wm.validation) {
        console.warn("The 'getChannelModeByNumber()' method has been moved to the 'InputChannel' class.");
      }
    }
    /**
     * Adds an event listener that will trigger a function callback when the specified event happens.
     * The event can be **channel-bound** or **input-wide**. Channel-bound events are dispatched by
     * {@link InputChannel} objects and are tied to a specific MIDI channel while input-wide events
     * are dispatched by the {@link Input} object itself and are not tied to a specific channel.
     *
     * When listening for an input-wide event, you must specify the event to listen for and the
     * callback function to trigger when the event happens:
     *
     * ```
     * WebMidi.inputs[0].addListener("midimessage", someFunction);
     * ```
     *
     * To listen for a channel-bound event, you must also specify the event to listen for and the
     * function to trigger but you have to add the channels you wish to listen on in the `options`
     * parameter:
     *
     * ```
     * WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
     * ```
     *
     * The code above will add a listener for the `"noteon"` event and call `someFunction` when the
     * event is triggered on MIDI channels `1`, `2` or `3`.
     *
     * Note that, when adding events to channels, it is the {@link InputChannel} instance that
     * actually gets a listener added and not the `{@link Input} instance.
     *
     * Note: if you want to add a listener to a single MIDI channel you should probably do so directly
     * on the {@link InputChannel} object itself.
     *
     * There are 6 families of events you can listen to:
     *
     * 1. **MIDI System Common** Events (input-wide)
     *
     *    * [songposition]{@link Input#event:songposition}
     *    * [songselect]{@link Input#event:songselect}
     *    * [sysex]{@link Input#event:sysex}
     *    * [timecode]{@link Input#event:timecode}
     *    * [tunerequest]{@link Input#event:tunerequest}
     *
     * 2. **MIDI System Real-Time** Events (input-wide)
     *
     *    * [clock]{@link Input#event:clock}
     *    * [start]{@link Input#event:start}
     *    * [continue]{@link Input#event:continue}
     *    * [stop]{@link Input#event:stop}
     *    * [activesensing]{@link Input#event:activesensing}
     *    * [reset]{@link Input#event:reset}
     *
     * 3. **State Change** Events (input-wide)
     *
     *    * [opened]{@link Input#event:opened}
     *    * [closed]{@link Input#event:closed}
     *    * [disconnected]{@link Input#event:disconnected}
     *
     * 4. **Catch-All** Events (input-wide)
     *
     *    * [midimessage]{@link Input#event:midimessage}
     *    * [unknownmidimessage]{@link Input#event:unknownmidimessage}
     *
     * 5. **Channel Voice** Events (channel-specific)
     *
     *    * [channelaftertouch]{@link InputChannel#event:channelaftertouch}
     *    * [controlchange]{@link InputChannel#event:controlchange}
     *    * [keyaftertouch]{@link InputChannel#event:keyaftertouch}
     *    * [noteoff]{@link InputChannel#event:noteoff}
     *    * [noteon]{@link InputChannel#event:noteon}
     *    * [nrpn]{@link InputChannel#event:nrpn}
     *    * [pitchbend]{@link InputChannel#event:pitchbend}
     *    * [programchange]{@link InputChannel#event:programchange}
     *
     * 6. **Channel Mode** Events (channel-specific)
     *
     *    * allnotesoff
     *    * allsoundoff
     *    * localcontrol
     *    * monomode
     *    * omnimode
     *    * resetallcontrollers
     *
     * 7. **NRPN** Events (channel-specific)
     *
     *    * nrpndataentrycoarse
     *    * nrpndataentryfine
     *    * nrpndatabuttonincrement
     *    * nrpndatabuttondecrement
     *
     * 8. **RPN** Events (channel-specific)
     *
     *    * rpndataentrycoarse
     *    * rpndataentryfine
     *    * rpndatabuttonincrement
     *    * rpndatabuttondecrement
     *
     * @param event {string} The type of the event.
     *
     * @param listener {function} A callback function to execute when the specified event is detected.
     * This function will receive an event parameter object. For details on this object's properties,
     * check out the documentation for the various events (links above).
     *
     * @param {Object} [options={}]
     *
     * @param {array} [options.arguments] An array of arguments which will be passed separately to the
     * callback function. This array is stored in the `arguments` property of the `Listener` object
     * and can be retrieved or modified as desired.
     *
     * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
     * such integers representing the MIDI channel(s) to listen on. This parameter is ignored for
     * input-wide events.
     *
     * @param {Object} [options.context=this] The value of `this` in the callback function.
     *
     * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
     * automatically expires.
     *
     * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
     * of the listeners array.
     *
     * @param {boolean} [options.remaining=Infinity] The number of times after which the callback
     * should automatically be removed.
     *
     * @throws {Error} For channel-specific events, 'options.channels' must be defined.
     *
     * @returns {Listener[]} An array of all `Listener` objects that were created.
     */


    addListener(event, listener, options = {}) {
      if (wm.validation) {
        // Legacy compatibility
        if (typeof options === "function") {
          let channels = listener != undefined ? [].concat(listener) : undefined; // clone

          listener = options;
          options = {
            channels: channels
          };
        } // Validation


        if (InputChannel.EVENTS.includes(event) && options.channels === undefined) {
          throw new Error("For channel-specific events, 'options.channels' must be defined.");
        }
      }

      let listeners = []; // Check if the event is channel-specific or input-wide

      if (!InputChannel.EVENTS.includes(event)) {
        listeners.push(super.addListener(event, listener, options));
      } else {
        Utilities.sanitizeChannels(options.channels).forEach(ch => {
          listeners.push(this.channels[ch].addListener(event, listener, options));
        });
      }

      return listeners;
    }
    /**
     * Adds a one-time event listener that will trigger a function callback when the specified event
     * happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
     * dispatched by {@link InputChannel} objects and are tied to a specific MIDI channel while
     * input-wide events are dispatched by the {@link Input} object itself and are not tied to a
     * specific channel.
     *
     * When listening for an input-wide event, you must specify the event to listen for and the
     * callback function to trigger when the event happens:
     *
     * ```
     * WebMidi.inputs[0].addListener("midimessage", someFunction);
     * ```
     *
     * To listen for a channel-bound event, you must also specify the event to listen for and the
     * function to trigger but you have to add the channels you wish to listen on in the `options`
     * parameter:
     *
     * ```
     * WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
     * ```
     *
     * The code above will add a listener for the `"noteon"` event and call `someFunction` when the
     * event is triggered on MIDI channels `1`, `2` or `3`.
     *
     * Note that, when adding events to channels, it is the {@link InputChannel} instance that
     * actually gets a listener added and not the `{@link Input} instance.
     *
     * Note: if you want to add a listener to a single MIDI channel you should probably do so directly
     * on the {@link InputChannel} object itself.
     *
     * There are 6 families of events you can listen to:
     *
     * 1. **MIDI System Common** Events (input-wide)
     *
     *    * [songposition]{@link Input#event:songposition}
     *    * [songselect]{@link Input#event:songselect}
     *    * [sysex]{@link Input#event:sysex}
     *    * [timecode]{@link Input#event:timecode}
     *    * [tunerequest]{@link Input#event:tunerequest}
     *
     * 2. **MIDI System Real-Time** Events (input-wide)
     *
     *    * [clock]{@link Input#event:clock}
     *    * [start]{@link Input#event:start}
     *    * [continue]{@link Input#event:continue}
     *    * [stop]{@link Input#event:stop}
     *    * [activesensing]{@link Input#event:activesensing}
     *    * [reset]{@link Input#event:reset}
     *
     * 3. **State Change** Events (input-wide)
     *
     *    * [opened]{@link Input#event:opened}
     *    * [closed]{@link Input#event:closed}
     *    * [disconnected]{@link Input#event:disconnected}
     *
     * 4. **Catch-All** Events (input-wide)
     *
     *    * [midimessage]{@link Input#event:midimessage}
     *    * [unknownmidimessage]{@link Input#event:unknownmidimessage}
     *
     * 5. **Channel Voice** Events (channel-specific)
     *
     *    * [channelaftertouch]{@link InputChannel#event:channelaftertouch}
     *    * [controlchange]{@link InputChannel#event:controlchange}
     *    * [keyaftertouch]{@link InputChannel#event:keyaftertouch}
     *    * [noteoff]{@link InputChannel#event:noteoff}
     *    * [noteon]{@link InputChannel#event:noteon}
     *    * [nrpn]{@link InputChannel#event:nrpn}
     *    * [pitchbend]{@link InputChannel#event:pitchbend}
     *    * [programchange]{@link InputChannel#event:programchange}
     *
     * 6. **Channel Mode** Events (channel-specific)
     *
     *    * allnotesoff
     *    * allsoundoff
     *    * localcontrol
     *    * monomode
     *    * omnimode
     *    * resetallcontrollers
     *
     * @param event {string} The type of the event.
     *
     * @param listener {function} A callback function to execute when the specified event is detected.
     * This function will receive an event parameter object. For details on this object's properties,
     * check out the documentation for the various events (links above).
     *
     * @param {Object} [options={}]
     *
     * @param {array} [options.arguments] An array of arguments which will be passed separately to the
     * callback function. This array is stored in the `arguments` property of the `Listener` object
     * and can be retrieved or modified as desired.
     *
     * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
     * such integers representing the MIDI channel(s) to listen on. This parameter is ignored for
     * input-wide events.
     *
     * @param {Object} [options.context=this] The value of `this` in the callback function.
     *
     * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
     * automatically expires.
     *
     * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
     * of the listeners array.
     *
     * @throws {Error} For channel-specific events, 'options.channels' must be defined.
     *
     * @returns {Listener[]} An array of all `Listener` objects that were created.
     */


    addOneTimeListener(event, listener, options = {}) {
      options.remaining = 1;
      return this.addListener(event, listener, options);
    }
    /**
     * This is an alias to the [Input.addListener()]{@link Input#addListener} method.
     * @since 2.0.0
     * @deprecated since v3.0
     * @private
     */


    on(event, channel, listener, options) {
      return this.addListener(event, channel, listener, options);
    }
    /**
     * Checks if the specified event type is already defined to trigger the listener function. For
     * channel-specific events, the function will return `true` only if all channels have the listener
     * defined.
     *
     * @param event {string} The type of the event.
     *
     * @param listener {function} The callback function to check for.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
     * such integers representing the MIDI channel(s) to check. This parameter is ignored for
     * input-wide events.
     *
     * @returns {Boolean} Boolean value indicating whether or not the channel(s) already have this
     * listener defined.
     *
     * @throws Error For channel-specific events, 'options.channels' must be defined.
     */


    hasListener(event, listener, options = {}) {
      if (wm.validation) {
        // Legacy compatibility
        if (typeof options === "function") {
          let channels = [].concat(listener); // clone

          listener = options;
          options = {
            channels: channels
          };
        } // Validation


        if (InputChannel.EVENTS.includes(event) && options.channels === undefined) {
          throw new Error("For channel-specific events, 'options.channels' must be defined.");
        }
      }

      if (InputChannel.EVENTS.includes(event)) {
        return Utilities.sanitizeChannels(options.channels).every(ch => {
          return this.channels[ch].hasListener(event, listener);
        });
      } else {
        return super.hasListener(event, listener);
      }
    }
    /**
     * Removes the specified listener for the specified event. If no listener is specified, all
     * listeners for the specified event will be removed. If no event is specified, all listeners for
     * the `Input` as well as all listeners for all `InputChannels` will be removed.
     *
     * By default, channel-specific listeners will be removed from all channels unless the
     * `options.channel` narrows it down.
     *
     * @param [type] {String} The type of the event.
     *
     * @param [listener] {Function} The callback function to check for.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
     * such integers representing the MIDI channel(s) to match. This parameter is ignored for
     * input-wide events.
     *
     * @param {*} [options.context] Only remove the listeners that have this exact context.
     *
     * @param {number} [options.remaining] Only remove the listener if it has exactly that many
     * remaining times to be executed.
     */


    removeListener(event, listener, options = {}) {
      if (wm.validation) {
        // Legacy compatibility
        if (typeof options === "function") {
          let channels = [].concat(listener); // clone

          listener = options;
          options = {
            channels: channels
          };
        }
      }

      if (options.channels === undefined) {
        options.channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      } // If the event is not specified, remove everything (channel-specific and input-wide)!


      if (event == undefined) {
        Utilities.sanitizeChannels(options.channels).forEach(ch => {
          if (this.channels[ch]) this.channels[ch].removeListener();
        });
        return super.removeListener();
      } // If the event is specified, check if it's channel-specific or input-wide.


      if (InputChannel.EVENTS.includes(event)) {
        Utilities.sanitizeChannels(options.channels).forEach(ch => {
          this.channels[ch].removeListener(event, listener, options);
        });
      } else {
        super.removeListener(event, listener, options);
      }
    }
    /**
     * Name of the MIDI input
     *
     * @type {string}
     * @readonly
     */


    get name() {
      return this._midiInput.name;
    }
    /**
     * ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
     * platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
     * the same port.
     *
     * @type {string}
     * @readonly
     */


    get id() {
      return this._midiInput.id;
    }
    /**
     * Input port's connection state: `"pending"`, `"open"` or `"closed"`.
     *
     * @type {string}
     * @readonly
     */


    get connection() {
      return this._midiInput.connection;
    }
    /**
     * Name of the manufacturer of the device that makes this input port available.
     *
     * @type {string}
     * @readonly
     */


    get manufacturer() {
      return this._midiInput.manufacturer;
    }
    /**
     * An integer to offset the reported octave of incoming notes. By default, middle C (MIDI note
     * number 60) is placed on the 4th octave (C4).
     *
     * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
     * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
     *
     * Note that this value is combined with the global offset value defined on the `WebMidi` object
     * (if any).
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
     * State of the input port: `"connected"` or `"disconnected"`.
     *
     * @type {string}
     * @readonly
     */


    get state() {
      return this._midiInput.state;
    }
    /**
     * Port type. In the case of `Input`, this is always: `"input"`.
     *
     * @type {string}
     * @readonly
     */


    get type() {
      return this._midiInput.type;
    }
    /**
     * @type {boolean}
     * @private
     * @deprecated since v3.0.0 (moved to 'InputChannel' class)
     */


    get nrpnEventsEnabled() {
      if (wm.validation) {
        console.warn("The 'nrpnEventsEnabled' property has been moved to the 'InputChannel' class.");
      }

      return false;
    }

  } // Events that do not have code below them must be placed outside the class definition (?!)

  /**
   * Input-wide (system) event emitted when a **system exclusive** message has been received.
   * You should note that, to receive `sysex` events, you must call the `WebMidi.enable()`
   * method with the `sysex` option set to `true`:
   *
   * ```js
   * WebMidi.enable({sysex: true})
   *  .then(() => console.log("WebMidi has been enabled with sysex support."))
   *  .catch(err => console.log("WebMidi could not be enabled."))
   * ```
   *
   * @event Input#sysex
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"sysex"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values.
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
   */

  /**
   * Input-wide (system) event emitted when a **time code quarter frame** message has been
   * received.
   *
   * @event Input#timecode
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"timecode"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **song position** message has been received.
   *
   * @event Input#songposition
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"songposition"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **song select** message has been received.
   *
   * @event Input#songselect
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"songselect"`
   * @property {string} song Song (or sequence) number to select (1-128)
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **tune request** message has been received.
   *
   * @event Input#tunerequest
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"tunerequest"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **timing clock** message has been received.
   *
   * @event Input#clock
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"clock"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **start** message has been received.
   *
   * @event Input#start
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"start"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **continue** message has been received.
   *
   * @event Input#continue
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"continue"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **stop** message has been received.
   *
   * @event Input#stop
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"stop"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when an **active sensing** message has been received.
   *
   * @event Input#activesensing
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"activesensing"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **reset** message has been received.
   *
   * @event Input#reset
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"reset"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when an unknown MIDI message has been received. It could
   * be, for example, one of the undefined/reserved messages.
   *
   * @event Input#unknownmidimessage
   *
   * @type {Object}
   *
   * @property {Input} target The `Input` that triggered the event.
   * @property {Message} message A `Message` object containing information about the incoming MIDI
   * message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `"unknownmidimessage"`
   *
   * @property {Array} event.data The MIDI message as an array of 8 bit values (deprecated, use
   * the `message` object instead).
   * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array  (deprecated, use
   * the `message` object instead).
   *
   * @since 2.1
   */

  /**
   * The `Message` class represents a single MIDI message. It has several properties that make it
   * easy to make sense of the binaru data it contains.
   *
   * @param {Uint8Array} data The raw data of the MIDI message as a Uint8Array of integers between 0
   * and 255.
   *
   * @license Apache-2.0
   * @since 3.0.0
   */

  class Message {
    constructor(data) {
      /**
       * A Uint8Array containing the bytes of the MIDI message. Each byte is an integer between 0 and
       * 255.
       *
       * @type {Uint8Array}
       * @readonly
       */
      this.rawData = data;
      /**
       * An array containing the bytes of the MIDI message. Each byte is an integer is between 0 and
       * 255.
       *
       * @type {number[]}
       * @readonly
       */

      this.data = Array.from(this.rawData);
      /**
       * The MIDI status byte of the message as an integer between 0 and 255.
       *
       * @type {number}
       * @readonly
       */

      this.statusByte = this.rawData[0];
      /**
       * A Uint8Array of the data byte(s) of the MIDI message. When the message is a system exclusive
       * message (sysex), `rawDataBytes` explicitly excludes the manufacturer ID and the sysex end
       * byte so only the actual data is included.
       *
       * @type {Uint8Array}
       * @readonly
       */

      this.rawDataBytes = this.rawData.slice(1);
      /**
       * An array of the the data byte(s) of the MIDI message. When the message is a system exclusive
       * message (sysex), `dataBytes` explicitly excludes the manufacturer ID and the sysex end
       * byte so only the actual data is included.
       *
       * @type {number[]}
       * @readonly
       */

      this.dataBytes = this.data.slice(1);
      /**
       * A boolean indicating whether the MIDI message is a channel-specific message.
       *
       * @type {boolean}
       * @readonly
       */

      this.isChannelMessage = false;
      /**
       * A boolean indicating whether the MIDI message is a system message (not specific to a
       * channel).
       *
       * @type {boolean}
       * @readonly
       */

      this.isSystemMessage = false;
      /**
       * An integer identifying the MIDI command. For channel-specific messages, the value will be
       * between 8 and 14. For system messages, the value will be between 240 and 255.
       *
       * @type {number}
       * @readonly
       */

      this.command = undefined;
      /**
       * The MIDI channel number (1-16) that the message is targeting. This is only for
       * channel-specific messages. For system messages, this will be left undefined.
       *
       * @type {number}
       * @readonly
       */

      this.channel = undefined;
      /**
       * When the message is a system exclusive message (sysex), this property contains an array with
       * either 1 or 3 entries that identify the manufacturer targeted by the message.
       *
       * To know how to translate these entries into manufacturer names, check out the official list:
       * https://www.midi.org/specifications-old/item/manufacturer-id-numbers
       *
       * @type {number[]}
       * @readonly
       */

      this.manufacturerId = undefined; // Assign values to property that vary according to whether they are channel-specific or system

      if (this.statusByte < 240) {
        this.isChannelMessage = true;
        this.command = this.statusByte >> 4;
        this.channel = (this.statusByte & 0b00001111) + 1;
      } else {
        this.isSystemMessage = true;
        this.command = this.statusByte;
      } // Assign type (depending in whether the message is channel-specific or system)


      if (this.isChannelMessage) {
        this.type = Utilities.getPropertyByValue(Enumerations.MIDI_CHANNEL_MESSAGES, this.command);
      } else if (this.isSystemMessage) {
        this.type = Utilities.getPropertyByValue(Enumerations.MIDI_SYSTEM_MESSAGES, this.command);
      } // When the message is a sysex message, we add a manufacturer property and strip out the id from
      // dataBytes and rawDataBytes.


      if (this.statusByte === Enumerations.MIDI_SYSTEM_MESSAGES.sysex) {
        if (this.dataBytes[0] === 0) {
          this.manufacturerId = this.dataBytes.slice(0, 3);
          this.dataBytes = this.dataBytes.slice(3, this.rawDataBytes.length - 1);
          this.rawDataBytes = this.rawDataBytes.slice(3, this.rawDataBytes.length - 1);
        } else {
          this.manufacturerId = [this.dataBytes[0]];
          this.dataBytes = this.dataBytes.slice(1, this.dataBytes.length - 1);
          this.rawDataBytes = this.rawDataBytes.slice(1, this.rawDataBytes.length - 1);
        }
      }
    }

  }

  /**
   * The `WebMidi` object makes it easier to work with the low-level Web MIDI API. Basically, it
   * simplifies sending outgoing MIDI messages and reacting to incoming MIDI messages.
   *
   * When using the WebMidi.js library, you should know that the `WebMidi` class has already been
   * instantiated. You cannot instantiate it yourself. If you use the **IIFE** version, you should
   * simply use the global object called `WebMidi`. If you use the **CJS** (CommonJS) or **ESM** (ES6
   * module) version, you get an already-instantiated object when you import the module.
   *
   * @fires WebMidi#connected
   * @fires WebMidi#disabled
   * @fires WebMidi#disconnected
   * @fires WebMidi#enabled
   * @fires WebMidi#midiaccessgranted
   *
   * @extends EventEmitter
   * @license Apache-2.0
   */

  class WebMidi extends e {
    constructor() {
      super();
      /**
       * Object containing system-wide default values that can be changed to customize how the library
       * works.
       *
       * @type {Object}
       *
       * @property {object}  defaults.note - Default values relating to note
       * @property {number}  defaults.note.attack - A number between 0 and 127 representing the
       * default attack velocity of notes. Initial value is 64.
       * @property {number}  defaults.note.release - A number between 0 and 127 representing the
       * default release velocity of notes. Initial value is 64.
       * @property {number}  defaults.note.duration - A number representing the default duration of
       * notes (in seconds). Initial value is Infinity.
       */

      this.defaults = {
        note: {
          attack: Utilities.toNormalized(64),
          release: Utilities.toNormalized(64),
          duration: Infinity
        }
      };
      /**
       * The [`MIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
       * instance used to talk to the lower-level Web MIDI API. This should not be used directly
       * unless you know what you are doing.
       *
       * @type {?MIDIAccess}
       * @readonly
       */

      this.interface = null;
      /**
       * Indicates whether argument validation and backwards-compatibility checks are performed
       * throughout the WebMidi.js library for object methods and property setters.
       *
       * This is an advanced setting that should be used carefully. Setting `validation` to `false`
       * improves performance but should only be done once the project has been thoroughly tested with
       * `validation` turned on.
       *
       * @type {boolean}
       */

      this.validation = true;
      /**
       * Array of all (Input) objects
       * @type {Input[]}
       * @private
       */

      this._inputs = [];
      this._disconnectedInputs = [];
      /**
       * Array of all [`Output`](Output) objects
       * @type {Output[]}
       * @private
       */

      this._outputs = [];
      this._disconnectedOutputs = [];
      /**
       * Array of statechange events to process. These events must be parsed synchronously so they do
       * not override each other.
       *
       * @type {string[]}
       * @private
       */

      this._stateChangeQueue = [];
      /**
       * @type {number}
       * @private
       */

      this._octaveOffset = 0;
    }
    /**
     * Checks if the Web MIDI API is available in the current environment and then tries to connect to
     * the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
     * be displayed to the user.
     *
     * To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
     * `true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
     * and system exclusive messages are always enabled. You can check the
     * [`sysexEnabled`](#sysexEnabled) property to confirm.
     *
     * To enable access to software synthesizers available on the host, you would set the `software`
     * option to `true`. However, this option is only there to future-proof the library as support for
     * software synths has not yet been implemented in any browser (as of September 2021).
     *
     * By the way, if you call the [`enable()`](#enable) method while WebMidi.js is already enabled,
     * the callback function will be executed (if any), the promise will resolve but the events
     * ([`"midiaccessgranted"`](#event:midiaccessgranted), [`"connected"`](#event:connected) and
     * [`"enabled"`](#event:enabled)) will not be fired.
     *
     * There are 3 ways to execute code after `WebMidi` has been enabled:
     *
     * - Pass a callback function in the `options`
     * - Listen to the [`"enabled"`](#event:enabled) event
     * - Wait for the promise to resolve
     *
     * In order, this is what happens towards the end of the enabling process:
     *
     * 1. [`"midiaccessgranted"`](#event:midiaccessgranted) event is triggered
     * 2. [`"connected"`](#event:connected) events are triggered (for each available input and output)
     * 3. [`"enabled"`](#event:enabled) event is triggered when WebMidi.js is ready
     * 4. specified callback (if any) is executed
     * 5. promise is resolved and fulfilled with the `WebMidi` object.
     *
     * **Important note**: starting with Chrome v77, a page using Web MIDI API must be hosted on a
     * secure origin (`https://`, `localhost` or `file:///`) and the user will always be prompted to
     * authorize the operation (no matter if the `sysex` option is `true` or not).
     *
     * ##### Example
     * ```js
     * // Enabling WebMidi and using the promise
     * WebMidi.enable().then(ports => {
     *   console.log("WebMidi.js has been enabled!");
     *   console.log("Inputs: ", ports.inputs);
     *   console.log("Outputs: ", ports.outputs);
     * })
     * ```
     *
     * @param [options] {Object}
     *
     * @param [options.callback] {function} A function to execute once the operation completes. This
     * function will receive an `Error` object if enabling the Web MIDI API failed.
     *
     * @param [options.sysex=false] {boolean} Whether to enable MIDI system exclusive messages or not.
     *
     * @param [options.validation=true] {boolean} Whether to enable library-wide validation of method
     * arguments and setter values. This is an advanced setting that should be used carefully. Setting
     * [`validation`](#validation) to `false` improves performance but should only be done once the
     * project has been thoroughly tested with [`validation`](#validation)  turned on.
     *
     * @param [options.software=false] {boolean} Whether to request access to software synthesizers on
     * the host system. This is part of the spec but has not yet been implemented by most browsers as
     * of April 2020.
     *
     * @async
     *
     * @returns {Promise.<WebMidi>} The promise is fulfilled with the `WebMidi` object fro
     * chainability
     *
     * @throws {Error} The Web MIDI API is not supported in your environment.
     * @throws {Error} Jazz-Plugin must be installed to use WebMIDIAPIShim.
     */


    async enable(options = {}, legacy = false) {
      this.validation = options.validation !== false;

      if (this.validation) {
        // Backwards-compatibility. Previous syntax was: enable(callback, sysex)
        if (typeof options === "function") options = {
          callback: options,
          sysex: legacy
        };
        if (legacy) options.sysex = true;
      } // If already enabled, trigger callback and resolve promise but do not dispatch events.


      if (this.enabled) {
        if (typeof options.callback === "function") options.callback();
        return Promise.resolve();
      } // The Jazz-Plugin takes a while to be available (even after the Window's 'load' event has been
      // fired). Therefore, we wait a little while to give it time to finish loading (initiqted in
      // constructor).
      // if (!this.supported) {
      //
      //   await new Promise((resolve, reject) => {
      //
      //     const start = this.time;
      //
      //     const intervalID = setInterval(() => {
      //
      //       if (this.supported) {
      //         clearInterval(intervalID);
      //         resolve();
      //       } else {
      //         if (this.time > start + 1500) {
      //           clearInterval(intervalID);
      //           let error = new Error("The Web MIDI API is not available in your environment.");
      //           if (typeof options.callback === "function") options.callback(error);
      //           reject(error);
      //         }
      //       }
      //
      //     }, 25);
      //
      //   });
      //
      // }

      /**
       * Event emitted when an error occurs trying to enable `WebMidi`
       *
       * @event WebMidi#error
       * @type {Object}
       * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {WebMidi} target The object that triggered the event
       * @property {string} type `error`
       * @property {*} error Actual error that occurred
       */


      const errorEvent = {
        timestamp: this.time,
        target: this,
        type: "error",
        error: undefined
      };
      /**
       * Event emitted once the MIDI interface has been successfully created.
       *
       * @event WebMidi#midiaccessgranted
       * @type {Object}
       * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
       * since the navigation start of the document).
       * @property {WebMidi} target The object that triggered the event
       * @property {string} type `midiaccessgranted`
       */

      const midiAccessGrantedEvent = {
        timestamp: this.time,
        target: this,
        type: "midiaccessgranted"
      };
      /**
       * Event emitted once `WebMidi` has been fully enabled
       *
       * @event WebMidi#enabled
       * @type {Object}
       * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
       * since the navigation start of the document).
       * @property {WebMidi} target The object that triggered the event
       * @property {string} type `"enabled"`
       */

      const enabledEvent = {
        timestamp: this.time,
        target: this,
        type: "enabled"
      }; // Request MIDI access (this iw where the prompt will appear)

      try {
        this.interface = await navigator.requestMIDIAccess({
          sysex: options.sysex,
          software: options.software
        });
      } catch (err) {
        errorEvent.error = err;
        this.emit("error", errorEvent);
        if (typeof options.callback === "function") options.callback(err);
        return Promise.reject(err);
      } // Now that the Web MIDI API interface has been created, we trigger the 'midiaccessgranted'
      // event. This allows the developer an occasion to assign listeners on 'connected' events.


      this.emit("midiaccessgranted", midiAccessGrantedEvent); // We setup the state change listener before creating the ports so that it properly catches the
      // the ports' `connected` events

      this.interface.onstatechange = this._onInterfaceStateChange.bind(this); // Update inputs and outputs (this is where `Input` and `Output` objects are created).

      try {
        await this._updateInputsAndOutputs();
      } catch (err) {
        errorEvent.error = err;
        this.emit("error", errorEvent);
        if (typeof options.callback === "function") options.callback(err);
        return Promise.reject(err);
      } // If we make it here, the ports have been successfully created, so we trigger the 'enabled'
      // event.


      this.emit("enabled", enabledEvent); // Execute the callback (if any) and resolve the promise with 'this' (for chainability)

      if (typeof options.callback === "function") options.callback();
      return Promise.resolve(this);
    }
    /**
     * Completely disables **WebMidi.js** by unlinking the MIDI subsystem's interface and closing all
     * [`Input`](Input) and [`Output`](Output) objects that may have been opened. This also means that
     * listeners added to [`Input`](Input) objects, [`Output`](Output) objects or to `WebMidi` itself
     * are also destroyed.
     *
     * @async
     * @returns {Promise}
     *
     * @throws {Error} The Web MIDI API is not supported by your environment.
     *
     * @since 2.0.0
     */


    async disable() {
      return this._destroyInputsAndOutputs().then(() => {
        if (typeof navigator.close === "function") navigator.close();
        if (this.interface) this.interface.onstatechange = undefined;
        this.interface = null; // also resets enabled, sysexEnabled

        /**
         * Event emitted once `WebMidi` has been successfully disabled.
         *
         * @event WebMidi#disabled
         * @type {Object}
         * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {WebMidi} target The object that triggered the event
         * @property {string} type `"disabled"`
         */

        let event = {
          timestamp: this.time,
          target: this,
          type: "disabled"
        }; // Finally, trigger the 'disabled' event and then remove all listeners.

        this.emit("disabled", event);
        this.removeListener();
      });
    }

    /**
     * Returns the [`Input`](Input) object that matches the specified ID string or `false` if no
     * matching input is found. As per the Web MIDI API specification, IDs are strings (not integers).
     *
     * Please note that IDs change from one host to another. For example, Chrome does not use the same
     * kind of IDs as Jazz-Plugin.
     *
     * @param id {string} The ID string of the input. IDs can be viewed by looking at the
     * [`WebMidi.inputs`](WebMidi#inputs) array. Even though they sometimes look like integers, IDs
     * are strings.
     *
     * @returns {Input|false} An [`Input`](Input) object matching the specified ID string or `false`
     * if no matching input can be found.
     *
     * @throws {Error} WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getInputById(id) {
      if (this.validation) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        if (!id) return false;
      }

      for (let i = 0; i < this.inputs.length; i++) {
        if (this.inputs[i].id === id.toString()) return this.inputs[i];
      }

      return false;
    }

    /**
     * Returns the first [`Input`](Input) object whose name **contains** the specified string. Note
     * that the port names change from one environment to another. For example, Chrome does not report
     * input names in the same way as the Jazz-Plugin does.
     *
     * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
     * those visible in the [inputs](WebMidi#inputs) array).
     *
     * @returns {Input|false} The [`Input`](Input) that was found or `false` if no input contained the
     * specified name.
     *
     * @throws {Error} WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getInputByName(name) {
      if (this.validation) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        if (!name) return false;
        name = name.toString();
      }

      for (let i = 0; i < this.inputs.length; i++) {
        if (~this.inputs[i].name.indexOf(name)) return this.inputs[i];
      }

      return false;
    }

    /**
     * Returns the first [`Output`](Output) object whose name **contains** the specified string. Note
     * that the port names change from one environment to another. For example, Chrome does not report
     * input names in the same way as the Jazz-Plugin does.
     *
     * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
     * those visible in the [outputs](WebMidi#outputs) array).
     *
     * @returns {Output|false} The [`Output`](Output) that was found or `false` if no output matched
     * the specified name.
     *
     * @throws {Error} WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getOutputByName(name) {
      if (this.validation) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        if (!name) return false;
        name = name.toString();
      }

      for (let i = 0; i < this.outputs.length; i++) {
        if (~this.outputs[i].name.indexOf(name)) return this.outputs[i];
      }

      return false;
    }

    /**
     * Returns the [`Output`](Output) object that matches the specified ID string or `false` if no
     * matching output is found. As per the Web MIDI API specification, IDs are strings (not
     * integers).
     *
     * Please note that IDs change from one host to another. For example, Chrome does not use the same
     * kind of IDs as Jazz-Plugin.
     *
     * @param id {string} The ID string of the port. IDs can be viewed by looking at the
     * [`WebMidi.outputs`](WebMidi#outputs) array.
     *
     * @returns {Output|false} An [`Output`](Output) object matching the specified ID string. If no
     * matching output can be found, the method returns `false`.
     *
     * @throws {Error} WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getOutputById(id) {
      if (this.validation) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        if (!id) return false;
      }

      for (let i = 0; i < this.outputs.length; i++) {
        if (this.outputs[i].id === id.toString()) return this.outputs[i];
      }

      return false;
    }

    /**
     * @private
     * @deprecated since version 3.0.0, use Utilities.toNoteNumber() instead.
     */
    noteNameToNumber(name) {
      if (this.validation) {
        console.warn("The noteNameToNumber() method is deprecated. Use " + "Utilities.toNoteNumber() instead.");
      }

      return Utilities.toNoteNumber(name, this.octaveOffset);
    }
    /**
     * @private
     * @deprecated since 3.0.0, use Utilities.getNoteDetails() instead.
     */


    getOctave(number) {
      if (this.validation) {
        console.warn("The getOctave()is deprecated. Use Utilities.getNoteDetails() instead");
        number = parseInt(number);
      }

      if (!isNaN(number) && number >= 0 && number <= 127) {
        return Utilities.getNoteDetails(Utilities.offsetNumber(number, this.octaveOffset)).octave;
      } else {
        return false;
      }
    }
    /**
     * @private
     * @deprecated since 3.0.0, use Utilities.sanitizeChannels() instead.
     */


    sanitizeChannels(channel) {
      if (this.validation) {
        console.warn("The sanitizeChannels() method has been moved to the utilities class.");
      }

      return Utilities.sanitizeChannels(channel); // let channels;
      //
      // if (this.validation) {
      //
      //   if (channel === "all") { // backwards-compatibility
      //     channels = ["all"];
      //   } else if (channel === "none") { // backwards-compatibility
      //     return [];
      //   }
      //
      // }
      //
      // if (!Array.isArray(channel)) {
      //   channels = [channel];
      // } else {
      //   channels = channel;
      // }
      //
      // // In order to preserve backwards-compatibility, we let this assignment as it is.
      // if (channels.indexOf("all") > -1) {
      //   channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      // }
      //
      // return channels
      //   .map(function(ch) {
      //     return parseInt(ch);
      //   })
      //   .filter(function(ch) {
      //     return (ch >= 1 && ch <= 16);
      //   });
    }
    /**
     * @private
     * @deprecated since version 3.0.0, use Utilities.sanitizeChannels() instead.
     */


    toMIDIChannels(channel) {
      if (this.validation) {
        console.warn("The toMIDIChannels() method has been deprecated. Use Utilities.sanitizeChannels() instead.");
      }

      return Utilities.sanitizeChannels(channel);
    }
    /**
     * @private
     * @deprecated since version 3.0.0, use Utilities.guessNoteNumber() instead.
     */


    guessNoteNumber(input) {
      if (this.validation) {
        console.warn("The guessNoteNumber() method has been deprecated. Use Utilities.guessNoteNumber() instead.");
      }

      return Utilities.guessNoteNumber(input, this.octaveOffset);
    }
    /**
     * @private
     * @deprecated since version 3.0.0, use Utilities.buildNoteArray() instead.
     */


    getValidNoteArray(notes, options = {}) {
      if (this.validation) {
        console.warn("The getValidNoteArray() method has been moved to the Utilities.buildNoteArray()");
      }

      return Utilities.buildNoteArray(notes, options);
    }
    /**
     * @private
     * @deprecated since version 3.0.0, use Utilities.toTimestamp() instead.
     */


    convertToTimestamp(time) {
      if (this.validation) {
        console.warn("The convertToTimestamp() method has been moved to Utilities.toTimestamp().");
      }

      return Utilities.toTimestamp(time);
    }
    /**
     * @return {Promise<void>}
     * @private
     */


    async _destroyInputsAndOutputs() {
      let promises = [];
      this.inputs.forEach(input => promises.push(input.destroy()));
      this.outputs.forEach(output => promises.push(output.destroy()));
      return Promise.all(promises).then(() => {
        this._inputs = [];
        this._outputs = [];
      });
    }
    /**
     * @private
     */


    _onInterfaceStateChange(e) {
      console.log(e.type, e.port.name, e.port.state, e.port.connection);

      this._updateInputsAndOutputs();
      /**
       * Event emitted when an [`Input`](Input) or [`Output`](Output) becomes available. This event is
       * typically fired whenever a MIDI device is plugged in. Please note that it may fire several
       * times if a device possesses multiple inputs and/or outputs (which is often the case).
       *
       * @event WebMidi#connected
       * @type {Object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred
       * (in milliseconds since the navigation start of the document).
       * @property {string} type `"connected"`
       * @property {Input|Output} target The [`Input`](Input) or [`Output`](Output) object that
       * triggered the event.
       */

      /**
       * Event emitted when an [`Input`](Input) or [`Output`](Output) becomes unavailable. This event
       * is typically fired whenever a MIDI device is unplugged. Please note that it may fire several
       * times if a device possesses multiple inputs and/or outputs (which is often the case).
       *
       * @event WebMidi#disconnected
       * @type {Object}
       * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
       * since the navigation start of the document).
       * @property {string} type `"disconnected"`
       * @property {Object} target Object with properties describing the [`Input`](Input) or
       * [`Output`](Output) that triggered the event.
       * @property {string} target.connection `"closed"`
       * @property {string} target.id ID of the input
       * @property {string} target.manufacturer Manufacturer of the device that provided the input
       * @property {string} target.name Name of the device that provided the input
       * @property {string} target.state `disconnected`
       * @property {string} target.type `input` or `output`
       */


      let event = {
        timestamp: e.timeStamp,
        type: e.port.state
      }; // We check if "connection" is "open" because connected events are also triggered with
      // "connection=closed"

      if (e.port.state === "connected" && e.port.connection === "open") {
        if (e.port.type === "output") {
          event.port = this.getOutputById(e.port.id); // legacy

          event.target = event.port;
        } else if (e.port.type === "input") {
          event.port = this.getInputById(e.port.id); // legacy

          event.target = event.port;
        }

        this.emit(e.port.state, event); // We check if "connection" is "pending" because we do not always get the "closed" event
      } else if (e.port.state === "disconnected" && e.port.connection === "pending") {
        // It feels more logical to include a `target` property instead of a `port` property. This is
        // the terminology used everywhere in the library.
        event.port = {
          connection: "closed",
          id: e.port.id,
          manufacturer: e.port.manufacturer,
          name: e.port.name,
          state: e.port.state,
          type: e.port.type
        };
        event.target = event.port;
        this.emit(e.port.state, event);
      }
    }

    /**
     * @private
     */
    async _updateInputsAndOutputs() {
      return Promise.all([this._updateInputs(), this._updateOutputs()]);
    }

    /**
     * @private
     */
    async _updateInputs() {
      // We must check for the existence of this.interface because it might have been closed via
      // WebMidi.disable().
      if (!this.interface) return; // Check for items to remove from the existing array (because they are no longer being reported
      // by the MIDI back-end).

      for (let i = this._inputs.length - 1; i >= 0; i--) {
        const current = this._inputs[i];
        const inputs = Array.from(this.interface.inputs.values());

        if (!inputs.find(input => input === current._midiInput)) {
          // Instead of destroying removed inputs, we stash them in case they come back later (which
          // is the case when the computer goes to sleep and is later brought back online).
          this._disconnectedInputs.push(current);

          this._inputs.splice(i, 1);
        }
      } // Array to hold pending promises from trying to open all input ports


      let promises = []; // Add new inputs (if not already present)

      this.interface.inputs.forEach(nInput => {
        // Check if the input is currently absent from the 'inputs' array.
        if (!this._inputs.find(input => input._midiInput === nInput)) {
          // If the input has previously been stashed away, reuse it. If not, create a new one.
          let input = this._disconnectedInputs.find(input => input._midiInput === nInput);

          if (!input) input = new Input(nInput);

          this._inputs.push(input);

          promises.push(input.open());
        }
      }); // Return a promise that resolves when all promises have resolved

      return Promise.all(promises);
    }

    /**
     * @private
     */
    async _updateOutputs() {
      // We must check for the existence of this.interface because it might have been closed via
      // WebMidi.disable().
      if (!this.interface) return; // Check for items to remove from the existing array (because they are no longer being reported
      // by the MIDI back-end).

      for (let i = this._outputs.length - 1; i >= 0; i--) {
        const current = this._outputs[i];
        const outputs = Array.from(this.interface.outputs.values());

        if (!outputs.find(output => output === current._midiOutput)) {
          // Instead of destroying removed inputs, we stash them in case they come back later (which
          // is the case when the computer goes to sleep and is later brought back online).
          this._disconnectedOutputs.push(current);

          this._outputs.splice(i, 1);
        }
      } // Array to hold pending promises from trying to open all output ports


      let promises = []; // // Add new outputs (if not already present)
      // this.interface.outputs.forEach(nOutput => {
      //
      //   // Check if the output already exists
      //   const exists = this._outputs.find(output => output._midiOutput === nOutput);
      //
      //   // If the output does not already exist, create new Input object and add it to the list of
      //   // outputs.
      //   if (!exists) {
      //     const output = new Output(nOutput);
      //     this._outputs.push(output);
      //     promises.push(output.open());
      //   }
      //
      // });
      // Add new outputs (if not already present)

      this.interface.outputs.forEach(nOutput => {
        // Check if the output is currently absent from the 'outputs' array.
        if (!this._outputs.find(output => output._midiOutput === nOutput)) {
          // If the output has previously been stashed away, reuse it. If not, create a new one.
          let output = this._disconnectedOutputs.find(output => output._midiInput === nOutput);

          if (!output) output = new Input(nOutput);

          this._inputs.push(output);

          promises.push(output.open());
        }
      }); // Return a promise that resolves when all promises have resolved

      return Promise.all(promises);
    }

    // injectPluginMarkup(parent) {
    //
    //   // Silently ignore on Node.js
    //   if (this.isNode) return;
    //
    //   // Default to <body> if no parent is specified
    //   if (!(parent instanceof Element) && !(parent instanceof HTMLDocument)) {
    //     parent = document.body;
    //   }
    //
    //   // IE10 needs this:
    //   // <meta http-equiv="X-UA-Compatible" content="requiresActiveX=true"/>
    //
    //   // Create markup and add to parent
    //   const obj = document.createElement("object");
    //   obj.classid = "CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90"; // IE
    //   if (!obj.isJazz) obj.type = "audio/x-jazz";                 // Standards-compliant
    //   obj.style.visibility = "hidden";
    //   obj.style.width = obj.style.height = "0px";
    //   parent.appendChild(obj);
    //
    // }

    /**
     * Indicates whether access to the host's MIDI subsystem is active or not.
     *
     * @readonly
     * @type {boolean}
     */
    get enabled() {
      return this.interface !== null;
    }
    /**
     * An array of all currently available MIDI inputs.
     *
     * @readonly
     * @type {Array}
     */


    get inputs() {
      return this._inputs;
    }
    /**
     * Indicates whether the current environment is Node.js or not. If you need to check if we are in
     * browser, use [`isBrowser`](#isBrowser). In certain environments (such as Electron and
     * NW.js) [`isNode`](#isNode) and [`isBrowser`](#isBrowser) can both be true at the
     * same time.
     * @type {boolean}
     */


    get isNode() {
      return Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]"; // Alternative way to try
      // return typeof process !== "undefined" &&
      //   process.versions != null &&
      //   process.versions.node != null;
    }
    /**
     * Indicates whether the current environment is a browser environment or not. If you need to check
     * if we are in Node.js, use [`isNode`](#isNode). In certain environments (such as Electron and
     * NW.js) [`isNode`](#isNode) and [`isBrowser`](#isBrowser) can both be true at the same time.
     * @type {boolean}
     */


    get isBrowser() {
      return typeof window !== "undefined" && typeof window.document !== "undefined";
    }
    /**
     * An integer to offset the octave of notes received from external devices or sent to external
     * devices.
     *
     * When a MIDI message comes in on an input channel the reported note name will be offset. For
     * example, if the `octaveOffset` is set to `-1` and a [`"noteon"`](InputChannel#event:noteon)
     * message with MIDI number 60 comes in, the note will be reported as C3 (instead of C4).
     *
     * By the same token, when [`OutputChannel.playNote()`](OutputChannel#playNote) is called, the
     * MIDI note number being sent will be offset. If `octaveOffset` is set to `-1`, the MIDI note
     * number sent will be 72 (instead of 60).
     *
     * @type {number}
     *
     * @since 2.1
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
     * An array of all currently available MIDI outputs as [`Output`](Output) objects.
     *
     * @readonly
     * @type {Array}
     */


    get outputs() {
      return this._outputs;
    }
    /**
     * Indicates whether the environment provides support for the Web MIDI API or not.
     *
     * **Note**: in environments that do not offer built-in MIDI support, this will report `true` if
     * the
     * [`navigator.requestMIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
     * function is available. For example, if you have installed WebMIDIAPIShim.js but no plugin, this
     * property will be `true` even though actual support might not be there.
     *
     * @readonly
     * @type {boolean}
     */


    get supported() {
      return typeof navigator !== "undefined" && navigator.requestMIDIAccess;
    }
    /**
     * Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
     * enabled via the [`enable()`](#enable) method.
     *
     * @readonly
     * @type boolean
     */


    get sysexEnabled() {
      return !!(this.interface && this.interface.sysexEnabled);
    }
    /**
     * The elapsed time, in milliseconds, since the time
     * [origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).
     * Said simply, it is the number of milliseconds that passed since the page was loaded. Being a
     * floating-point number, it has sub-millisecond accuracy. According to the
     * [documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), the
     * time should be accurate to 5 µs (microseconds). However, due to various constraints, the
     * browser might only be accurate to one millisecond.
     *
     * @type {DOMHighResTimeStamp}
     * @readonly
     */


    get time() {
      return performance.now();
    }
    /**
     * @private
     * @deprecated since 3.0.0. Use InputChannel.EVENTS instead.
     */


    get CHANNEL_EVENTS() {
      if (this.validation) {
        console.warn("The CHANNEL_EVENTS enum has been moved to InputChannel.EVENTS.");
      }

      return InputChannel.EVENTS;
    }
    /**
     * @private
     * @deprecated since 3.0.0. Use Enumerations.MIDI_SYSTEM_MESSAGES instead.
     */


    get MIDI_SYSTEM_MESSAGES() {
      if (this.validation) {
        console.warn("The MIDI_SYSTEM_MESSAGES enum has been moved to " + "Enumerations.MIDI_SYSTEM_MESSAGES.");
      }

      return Enumerations.MIDI_SYSTEM_MESSAGES;
    }
    /**
     * @private
     * @deprecated since 3.0.0. Use Enumerations.MIDI_CHANNEL_MODE_MESSAGES instead
     */


    get MIDI_CHANNEL_MODE_MESSAGES() {
      if (this.validation) {
        console.warn("The MIDI_CHANNEL_MODE_MESSAGES enum has been moved to " + "Enumerations.MIDI_CHANNEL_MODE_MESSAGES.");
      }

      return Enumerations.MIDI_CHANNEL_MODE_MESSAGES;
    }
    /**
     * @private
     * @deprecated since 3.0.0. Use Enumerations.MIDI_CONTROL_CHANGE_MESSAGES instead.
     */


    get MIDI_CONTROL_CHANGE_MESSAGES() {
      if (this.validation) {
        console.warn("The MIDI_CONTROL_CHANGE_MESSAGES enum has been moved to " + "Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.");
      }

      return Enumerations.MIDI_CONTROL_CHANGE_MESSAGES;
    }
    /**
     * @deprecated since 3.0.0. Use Enumerations.MIDI_REGISTERED_PARAMETERS instead.
     * @private
     */


    get MIDI_REGISTERED_PARAMETER() {
      if (this.validation) {
        console.warn("The MIDI_REGISTERED_PARAMETER enum has been moved to " + "Enumerations.MIDI_REGISTERED_PARAMETERS.");
      }

      return this.MIDI_REGISTERED_PARAMETERS;
    }
    /**
     * @deprecated since 3.0.0.
     * @private
     */


    get NOTES() {
      if (this.validation) {
        console.warn("The NOTES enum has been deprecated.");
      }

      return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    }

  } // Export singleton instance of WebMidi class. The 'constructor' is nulled so that it cannot be used
  // to instantiate a new WebMidi object or extend it. However, it is not freezed so it remains
  // extensible (properties can be added at will).


  const wm = new WebMidi();
  wm.constructor = null;

  exports.Enumerations = Enumerations;
  exports.Message = Message;
  exports.Note = Note;
  exports.Utilities = Utilities;
  exports.WebMidi = wm;

}(this.window = this.window || {}));
