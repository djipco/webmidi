export var __esModule: boolean;
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
 * @since 3.0.0
 */
export class Note {
    constructor(value: any, options?: {});
    set duration(arg: number);
    /**
     * The duration of the note as a positive decimal number representing the number of milliseconds
     * that the note should play for.
     *
     * @type {number}
     * @since 3.0.0
     */
    get duration(): number;
    set attack(arg: number);
    /**
     * The attack velocity of the note as an integer between 0 and 127.
     * @type {number}
     * @since 3.0.0
     */
    get attack(): number;
    set release(arg: number);
    /**
     * The release velocity of the note as an integer between 0 and 127.
     * @type {number}
     * @since 3.0.0
     */
    get release(): number;
    set identifier(arg: string);
    /**
     * The name, optional accidental and octave of the note, as a string.
     * @type {string}
     * @since 3.0.0
     */
    get identifier(): string;
    _name: any;
    _accidental: string;
    _octave: number;
    set name(arg: string);
    /**
     * The name (letter) of the note
     * @type {string}
     * @since 3.0.0
     */
    get name(): string;
    set accidental(arg: string);
    /**
     * The accidental (#, ##, b or bb) of the note
     * @type {string}
     * @since 3.0.0
     */
    get accidental(): string;
    set octave(arg: number);
    /**
     * The octave of the note
     * @type {number}
     * @since 3.0.0
     */
    get octave(): number;
    _duration: number;
    _attack: number;
    _release: number;
    /**
     * The attack velocity of the note as a positive integer between 0 and 127.
     * @type {number}
     * @since 3.0.0
     */
    get rawAttack(): number;
    /**
     * The release velocity of the note as a positive integer between 0 and 127.
     * @type {number}
     * @since 3.0.0
     */
    get rawRelease(): number;
    /**
     * The MIDI number of the note. This number is derived from the note identifier using C4 as a
     * reference for middle C.
     *
     * @type {number}
     * @since 3.0.0
     */
    get number(): number;
    /**
     * Returns a MIDI note number offset by the integer specified in the parameter. If the calculated
     * value is less than 0, 0 will be returned. If the calculated value is more than 127, 127 will be
     * returned. If an invalid value is supplied, 0 will be used.
     *
     * @param offset
     * @returns {number} An integer between 0 and 127
     */
    getOffsetNumber(octaveOffset?: number, semitoneOffset?: number): number;
}
declare const utils: Utilities;
declare const wm: WebMidi;
/**
 * The `Utilities` class contains general-purpose utility functions. The class is a singleton (its
 * methode are static) and is not meant to be instantiated.
 *
 * @since 3.0.0
 */
declare class Utilities {
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
     * @since 3.0.0
     */
    toNoteNumber(identifier: string, octaveOffset?: number): number;
    /**
     * Given a proper note identifier ("C#4", "Gb-1", etc.), this method returns an object containing
     * the fragments composing it (uppercase letter, accidental and octave).
     *
     * @param identifier
     * @returns {{octave: number, letter: string, accidental: string}}
     *
     * @throws TypeError Invalid note identifier
     *
     * @since 3.0.0
     */
    getFragments(identifier: any): {
        octave: number;
        letter: string;
        accidental: string;
    };
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
     */
    sanitizeChannels(channel?: number | number[]): any[];
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
     */
    toTimestamp(time?: number | string): number | false;
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
     */
    guessNoteNumber(input: string | number, octaveOffset: any): number | false;
    /**
     * Returns an identifier string representing a note name (with optional accidental) followed by an
     * octave number. The octave can be offset by using the `octaveOffset` parameter.
     *
     * @param {number} The MIDI note number to convert to a note identifier
     * @param {octaveOffset} An offset to apply to the resulting octave
     *
     * @returns {string}
     *
     * @throws RangeError Invalid note number
     * @throws RangeError Invalid octaveOffset value
     *
     * @since 3.0.0
     */
    toNoteIdentifier(number: any, octaveOffset: any): string;
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
     */
    buildNote(input?: number | string | Note, options?: {
        duration?: number;
        attack?: number;
        release?: number;
        octaveOffset?: number;
    }): Note;
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
     */
    buildNoteArray(notes?: number | string | Note | number[] | string[] | Note[], options?: {
        duration?: number;
        attack?: number;
        release?: number;
        rawAttack?: number;
        rawRelease?: number;
        octaveOffset?: number;
    }): Note[];
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
     */
    toNormalized(value: any): number;
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
     */
    to7Bit(value: any): number;
    /**
     * Returns an object inside which the three bytes have been broken up into `command`, `data1` and
     * `data2` properties.
     *
     * @param data A MIDI message
     * @returns {{data2: (number|undefined), data1: (number|undefined), command: number}}
     */
    getMessage(data: any): {
        data2: (number | undefined);
        data1: (number | undefined);
        command: number;
    };
    /**
     * Returns the supplied MIDI note number offset by the requested octave and semitone values. If
     * the calculated value is less than 0, 0 will be returned. If the calculated value is more than
     * 127, 127 will be returned. If an invalid offset value is supplied, 0 will be used.
     *
     * @param offset
     * @returns {number} An integer between 0 and 127
     *
     * @throws {Error} Invalid note number
     */
    offsetNumber(number: any, octaveOffset?: number, semitoneOffset?: number): number;
}
/**
 * The `WebMidi` object makes it easier to work with the Web MIDI API. Basically, it simplifies
 * sending outgoing MIDI messages and reacting to incoming MIDI messages.
 *
 * When using the WebMidi.js library, the `WebMidi` class has already been instantiated for you.
 * If you use the **IIFE** version, you should simply use the global object called `WebMidi`. If you
 * use the **CJS** (CommonJS) or **ESM** (ES6 module) version, you get an already-instantiated
 * object. This means there is no need to instantiate a new `WebMidi` object directly.
 *
 * The `WebMidi` object extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
 * [removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
 * [hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
 * others.
 *
 * @fires WebMidi#connected
 * @fires WebMidi#disabled
 * @fires WebMidi#disconnected
 * @fires WebMidi#enabled
 * @fires WebMidi#midiaccessgranted
 *
 * @extends EventEmitter
 */
declare class WebMidi {
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
    defaults: any;
    /**
     * The `MIDIAccess` instance used to talk to the Web MIDI API. This should not be used directly
     * unless you know what you are doing.
     *
     * @type {?MIDIAccess}
     * @readonly
     */
    interface: any;
    /**
     * Indicates whether argument validation and backwards-compatibility checks are performed
     * throughout the WebMidi.js library for object methods and property setters.
     *
     * This is an advanced setting that should be used carefully. Setting `validation` to `false`
     * improves performance but should only be done once the project has been thoroughly tested with
     * validation turned on.
     *
     * @type {boolean}
     */
    validation: boolean;
    /**
     * Array of all {@link Input} objects
     * @type {Input[]}
     * @private
     */
    private _inputs;
    /**
     * Array of all {@link Output} objects
     * @type {Output[]}
     * @private
     */
    private _outputs;
    /**
     * Array of statechange events to process. These events must be parsed synchronously so they do
     * not override each other.
     *
     * @type {string[]}
     * @private
     */
    private _stateChangeQueue;
    /**
     * @type {number}
     * @private
     */
    private _octaveOffset;
    /**
     * Checks if the Web MIDI API is available in the current environment and then tries to connect to
     * the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
     * be displayed to the user.
     *
     * To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
     * `true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
     * and system exclusive messages are always enabled. You can check the
     * [sysexEnabled]{@link WebMidi#sysexEnabled} property to confirm.
     *
     * To enable access to software synthesizers available on the host, you would set the `software`
     * option to `true`. However, this option is only there to future-proof the library as support for
     * software synths has not yet been implemented in any browser (as of September 2021).
     *
     * There are 3 ways to execute code after `WebMidi` has been enabled:
     *
     * - Pass a callback function in the `options`
     * - Listen to the `enabled` event
     * - Wait for the promise to resolve
     *
     * In order, this is what happens towards the end of the enabling process:
     *
     * 1. `midiaccessgranted` event is triggered
     * 2. `connected` events are triggered (for each available input and output)
     * 3. `enabled` event is triggered when WebMidi.js is ready
     * 4. specified callback (if any) is executed
     * 5. promise is resolved
     *
     * The promise is fulfilled with the WebMidi object.
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
     * `validation` to `false` improves performance but should only be done once the project has been
     * thoroughly tested with validation turned on.
     *
     * @param [options.software=false] {boolean} Whether to request access to software synthesizers on
     * the host system. This is part of the spec but has not yet been implemented by most browsers as
     * of April 2020.
     *
     * @async
     *
     * @returns {Promise<Object>} The promise is fulfilled with the `WebMidi` object
     *
     * @throws Error The Web MIDI API is not supported in your environment.
     * @throws Error Jazz-Plugin must be installed to use WebMIDIAPIShim.
     */
    enable(options?: {
        callback?: Function;
        sysex?: boolean;
        validation?: boolean;
        software?: boolean;
    }, legacy?: boolean): Promise<any>;
    /**
     * Completely disables `WebMidi.js` by unlinking the MIDI subsystem's interface and closing all
     * {@link Input} and {@link Output} objects that may be available. This also means that listeners
     * added to {@link Input} objects, {@link Output} objects or to `WebMidi` itself are also
     * destroyed.
     *
     * @async
     * @returns {Promise<void>}
     *
     * @throws Error The Web MIDI API is not supported by your environment.
     *
     * @since 2.0.0
     */
    disable(): Promise<void>;
    /**
     * Returns the {@link Input} object that matches the specified ID string or `false` if no matching
     * input is found. As per the Web MIDI API specification, IDs are strings (not integers).
     *
     * Please note that IDs change from one host to another. For example, Chrome does not use the same
     * kind of IDs as Jazz-Plugin.
     *
     * @param id {string} The ID string of the input. IDs can be viewed by looking at the
     * [inputs]{@link WebMidi#inputs} array. Even though they sometimes look like integers, IDs are
     * strings.
     *
     * @returns {Input|false} An {@link Input} object matching the specified ID string. If no matching
     * input can be found, the method returns `false`.
     *
     * @throws Error WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getInputById(id: string): Input | false;
    /**
     * Returns the first {@link Input} object whose name **contains** the specified string. Note that
     * the port names change from one environment to another. For example, Chrome does not report
     * input names in the same way as the Jazz-Plugin does.
     *
     * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
     * those visible in the [inputs]{@link WebMidi#inputs} array).
     *
     * @returns {Input|false} The {@link Input} that was found or `false` if no input contained the
     * specified name.
     *
     * @throws {Error} WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getInputByName(name: string): Input | false;
    /**
     * Returns the first {@link Output} object whose name **contains** the specified string. Note that
     * the port names change from one environment to another. For example, Chrome does not report
     * input names in the same way as the Jazz-Plugin does.
     *
     * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
     * those visible in the [outputs]{@link WebMidi#outputs} array).
     *
     * @returns {Output|false} The {@link Output} that was found or `false` if no output matched the
     * specified name.
     *
     * @throws Error WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getOutputByName(name: string): Output | false;
    /**
     * Returns the {@link Output} object that matches the specified ID string or `false` if no
     * matching output is found. As per the Web MIDI API specification, IDs are strings (not
     * integers).
     *
     * Please note that IDs change from one host to another. For example, Chrome does not use the same
     * kind of IDs as Jazz-Plugin.
     *
     * @param id {string} The ID string of the port. IDs can be viewed by looking at the
     * [outputs]{@link WebMidi#outputs} array.
     *
     * @returns {Output|false} An {@link Output} object matching the specified ID string. If no
     * matching output can be found, the method returns `false`.
     *
     * @throws Error WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getOutputById(id: string): Output | false;
    /**
     * @private
     * @deprecated since version 3.0.0 Use Utilities.toNoteNumber() instead.
     */
    private noteNameToNumber;
    /**
     * Returns the octave number for the specified MIDI note number (0-127). By default, the value is
     * based on middle C (note number 60) being placed on the 4th octave (C4).
     *
     * **Note**: since v3.x, this method returns `false` instead of `undefined` when the value cannot
     * be parsed to a valid octave.
     *
     * @param number {number} An integer representing a valid MIDI note number (between 0 and 127).
     *
     * @returns {number|false} The octave (as a signed integer) or `false` if the value could not be
     * parsed to a valid octave.
     *
     * @since 2.0.0-rc.6
     */
    getOctave(number: number): number | false;
    /**
     * @private
     * @deprecated since version 3.0. Use Utilities.sanitizeChannels() instead.
     */
    private sanitizeChannels;
    /**
     * @private
     * @deprecated since version 3.0. Use sanitizeChannels() instead.
     */
    private toMIDIChannels;
    /**
     * @private
     * @deprecated since version 3.0.0. Use Utilities.guessNoteNumber() instead.
     */
    private guessNoteNumber;
    /**
     * @private
     * @deprecated since version 3. Moved to Utilities.buildNoteArray().
     */
    private getValidNoteArray;
    /**
     * @private
     * @deprecated moved to Utilities.toTimestamp()
     */
    private convertToTimestamp;
    /**
     * @return {Promise<void>}
     * @private
     */
    private _destroyInputsAndOutputs;
    /**
     * @private
     */
    private _onInterfaceStateChange;
    /**
     * @private
     */
    private _updateInputsAndOutputs;
    /**
     * @private
     */
    private _updateInputs;
    /**
     * @private
     */
    private _updateOutputs;
    /**
     * Indicates whether access to the host's MIDI subsystem is active or not.
     *
     * @readonly
     * @type {boolean}
     */
    get enabled(): boolean;
    /**
     * An array of all currently available MIDI inputs.
     *
     * @readonly
     * @type {Array}
     */
    get inputs(): any[];
    /**
     * Indicates whether the current environment is Node.js or not. If you need to check if we are in
     * browser, use isBrowser. In certain environments (such as Electron and NW.js) isNode and
     * isBrowser can both be true at the same time.
     * @type {boolean}
     */
    get isNode(): boolean;
    /**
     * Indicates whether the current environment is a browser environment or not. If you need to check
     * if we are in Node.js, use isNode. In certain environments (such as Electron and NW.js) isNode
     * and isBrowser can both be true at the same time.
     * @type {boolean}
     */
    get isBrowser(): boolean;
    set octaveOffset(arg: number);
    /**
     * An integer to offset the octave of notes received from external devices or sent to external
     * devices.
     *
     * When a MIDI message comes in on an input channel the reported note name will be offset. For
     * example, if the `octaveOffset` is set to `-1` and a **note on** message with MIDI number 60
     * comes in, the note will be reported as C3 (instead of C4).
     *
     * By the same token, when `OutputChannel.playNote()` is called, the MIDI note number being sent
     * will be offset. If `octaveOffset` is set to `-1`, the MIDI note number sent will be 72 (instead
     * of 60).
     *
     * @type {number}
     *
     * @since 2.1
     */
    get octaveOffset(): number;
    /**
     * An array of all currently available MIDI outputs.
     *
     * @readonly
     * @type {Array}
     */
    get outputs(): any[];
    /**
     * Indicates whether the environment provides support for the Web MIDI API or not.
     *
     * **Note**: in environments that do not offer built-in MIDI support, this will report `true` if
     * the `navigator.requestMIDIAccess` function is available. For example, if you have installed
     * WebMIDIAPIShim.js but no plugin, this property will be `true` even though actual support might
     * not be there.
     *
     * @readonly
     * @type {boolean}
     */
    get supported(): boolean;
    /**
     * Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
     * enabled via the `enable()` method.
     *
     * @readonly
     * @type Boolean
     */
    get sysexEnabled(): boolean;
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
    get time(): number;
    /**
     * Enum of all MIDI channel voice messages and their associated numerical value:
     *
     * - `noteoff`: 0x8 (8)
     * - `noteon`: 0x9 (9)
     * - `keyaftertouch`: 0xA (10)
     * - `controlchange`: 0xB (11)
     * - `channelmode`: 0xB (11)
     * - `nrpn`: 0xB (11)
     * - `programchange`: 0xC (12)
     * - `channelaftertouch`: 0xD (13)
     * - `pitchbend`: 0xE (14)
     *
     * @enum {Object.<string, number>}
     * @readonly
     *
     * @since 3.0.0
     */
    get MIDI_CHANNEL_VOICE_MESSAGES(): {
        noteoff: number;
        noteon: number;
        keyaftertouch: number;
        controlchange: number;
        channelmode: number;
        nrpn: number;
        programchange: number;
        channelaftertouch: number;
        pitchbend: number;
    };
    /**
     * Enum of all MIDI channel voice messages and their associated numerical value. Note that it
     * has been deprecated since v3.0. You should now use
     * [MIDI_CHANNEL_VOICE_MESSAGES]{@link WebMidi.MIDI_CHANNEL_VOICE_MESSAGES}.
     *
     * @enum {Object.<string, number>}
     * @readonly
     * @deprecated since version 3.0 (will be dropped in version 4.0)
     *
     * @since 2.0.0
     */
    get MIDI_CHANNEL_MESSAGES(): {
        noteoff: number;
        noteon: number;
        keyaftertouch: number;
        controlchange: number;
        channelmode: number;
        nrpn: number;
        programchange: number;
        channelaftertouch: number;
        pitchbend: number;
    };
    /**
     * Enum of all channel mode messages and their associated numerical value:
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
     *
     * @since 2.0.0
     */
    get MIDI_CHANNEL_MODE_MESSAGES(): {
        allsoundoff: number;
        resetallcontrollers: number;
        localcontrol: number;
        allnotesoff: number;
        omnimodeoff: number;
        omnimodeon: number;
        monomodeon: number;
        polymodeon: number;
    };
    /**
     * Enum of all control change messages and their associated numerical value:
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
     * @enum {Object.<string, number>}
     * @readonly
     *
     * @since 2.0.0
     */
    get MIDI_CONTROL_CHANGE_MESSAGES(): {
        bankselectcoarse: number;
        modulationwheelcoarse: number;
        breathcontrollercoarse: number;
        footcontrollercoarse: number;
        portamentotimecoarse: number;
        dataentrycoarse: number;
        volumecoarse: number;
        balancecoarse: number;
        pancoarse: number;
        expressioncoarse: number;
        effectcontrol1coarse: number;
        effectcontrol2coarse: number;
        generalpurposeslider1: number;
        generalpurposeslider2: number;
        generalpurposeslider3: number;
        generalpurposeslider4: number;
        bankselectfine: number;
        modulationwheelfine: number;
        breathcontrollerfine: number;
        footcontrollerfine: number;
        portamentotimefine: number;
        dataentryfine: number;
        volumefine: number;
        balancefine: number;
        panfine: number;
        expressionfine: number;
        effectcontrol1fine: number;
        effectcontrol2fine: number;
        holdpedal: number;
        portamento: number;
        sustenutopedal: number;
        softpedal: number;
        legatopedal: number;
        hold2pedal: number;
        soundvariation: number;
        resonance: number;
        soundreleasetime: number;
        soundattacktime: number;
        brightness: number;
        soundcontrol6: number;
        soundcontrol7: number;
        soundcontrol8: number;
        soundcontrol9: number;
        soundcontrol10: number;
        generalpurposebutton1: number;
        generalpurposebutton2: number;
        generalpurposebutton3: number;
        generalpurposebutton4: number;
        reverblevel: number;
        tremololevel: number;
        choruslevel: number;
        celestelevel: number;
        phaserlevel: number;
        databuttonincrement: number;
        databuttondecrement: number;
        nonregisteredparametercoarse: number;
        nonregisteredparameterfine: number;
        registeredparametercoarse: number;
        registeredparameterfine: number;
    };
    /**
     * Array of valid events triggered at the interface level.
     *
     * @type {string[]}
     * @readonly
     */
    get MIDI_INTERFACE_EVENTS(): string[];
    /**
     * Enum of all control change messages that are used to create NRPN messages and their associated
     * numerical value:
     *
     * - `entrymsb`: 6
     * - `entrylsb`: 38
     * - `increment`: 96
     * - `decrement`: 97
     * - `paramlsb`: 98
     * - `parammsb`: 99
     * - `nullactiveparameter`: 127
     *
     * @enum {Object.<string, number>}
     * @readonly
     *
     * @since 2.0.0
     */
    get MIDI_NRPN_MESSAGES(): {
        entrymsb: number;
        entrylsb: number;
        increment: number;
        decrement: number;
        paramlsb: number;
        parammsb: number;
        nullactiveparameter: number;
    };
    /**
     * Enum of all registered parameters and their associated pair of numerical values. MIDI
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
     * @enum {Object.<string, number>}
     * @readonly
     *
     * @since 2.0.0
     */
    get MIDI_REGISTERED_PARAMETER(): {
        pitchbendrange: number[];
        channelfinetuning: number[];
        channelcoarsetuning: number[];
        tuningprogram: number[];
        tuningbank: number[];
        modulationrange: number[];
        azimuthangle: number[];
        elevationangle: number[];
        gain: number[];
        distanceratio: number[];
        maximumdistance: number[];
        maximumdistancegain: number[];
        referencedistanceratio: number[];
        panspreadangle: number[];
        rollangle: number[];
    };
    /**
     * Enum of all valid MIDI system messages and matching numerical values. WebMidi.js also uses
     * two custom messages.
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
     *
     * @since 2.0.0
     */
    get MIDI_SYSTEM_MESSAGES(): {
        sysex: number;
        timecode: number;
        songposition: number;
        songselect: number;
        tunerequest: number;
        tuningrequest: number;
        sysexend: number;
        clock: number;
        start: number;
        continue: number;
        stop: number;
        activesensing: number;
        reset: number;
        midimessage: number;
        unknownsystemmessage: number;
    };
    /**
     * Array of standard note names
     *
     * @type {string[]}
     * @readonly
     */
    get NOTES(): string[];
}
/**
 * The `Input` class represents a single MIDI input port. This object is derived from the host's
 * MIDI subsystem and cannot be instantiated directly.
 *
 * You can find a list of all currently available `Input` objects in the {@link WebMidi#inputs}
 * array.
 *
 * The `Input` class extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [getListeners()](https://djipco.github.io/djipevents/EventEmitter.html#getListeners),
 * [emit()](https://djipco.github.io/djipevents/EventEmitter.html#emit),
 * [suspendEvent()](https://djipco.github.io/djipevents/EventEmitter.html#suspendEvent) and several
 * others.
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
 * @fires Input#midimessage
 * @fires Input#unknownmidimessage
 */
declare class Input extends e {
    constructor(midiInput: any);
    /**
     * Reference to the actual MIDIInput object
     * @private
     */
    private _midiInput;
    /**
     * @type {number}
     * @private
     */
    private _octaveOffset;
    /**
     * Array containing the 16 {@link InputChannel} objects available for this `Input`. The
     * channels are numbered 1 through 16.
     *
     * @type {InputChannel[]}
     */
    channels: InputChannel[];
    /**
     * Destroys the `Input` by remove all listeners, emptying the `channels` array and unlinking the
     * MIDI subsystem.
     *
     * @returns {Promise<void>}
     */
    destroy(): Promise<void>;
    /**
     * Executed when a `"statechange"` event occurs.
     *
     * @param e
     * @private
     */
    private _onStateChange;
    /**
     * Executed when a `"midimessage"` event is received
     * @param e
     * @private
     */
    private _onMidiMessage;
    /**
     * @private
     */
    private _parseEvent;
    /**
     * Opens the input for usage. This is usually unnecessary as the port is open automatically when
     * WebMidi is enabled.
     *
     * @returns {Promise<Input>} The promise is fulfilled with the `Input` object
     */
    open(): Promise<Input>;
    /**
     * Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
     * the input is opened again by calling [Input.open()]{@link Input#open}.
     *
     * @returns {Promise<Input>} The promise is fulfilled with the `Input` object
     */
    close(): Promise<Input>;
    /**
     * @private
     * @deprecated since v3.0.0 (moved to 'InputChannel' class)
     */
    private getChannelModeByNumber;
    /**
     * This is an alias to the [Input.addListener()]{@link Input#addListener} method.
     * @since 2.0.0
     * @deprecated since v3.0
     * @private
     */
    private on;
    /**
     * Name of the MIDI input
     *
     * @type {string}
     * @readonly
     */
    get name(): string;
    /**
     * ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
     * platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
     * the same port.
     *
     * @type {string}
     * @readonly
     */
    get id(): string;
    /**
     * Input port's connection state: `"pending"`, `"open"` or `"closed"`.
     *
     * @type {string}
     * @readonly
     */
    get connection(): string;
    /**
     * Name of the manufacturer of the device that makes this input port available.
     *
     * @type {string}
     * @readonly
     */
    get manufacturer(): string;
    set octaveOffset(arg: number);
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
    get octaveOffset(): number;
    /**
     * State of the input port: `"connected"` or `"disconnected"`.
     *
     * @type {string}
     * @readonly
     */
    get state(): string;
    /**
     * Port type. In the case of `Input`, this is always: `"input"`.
     *
     * @type {string}
     * @readonly
     */
    get type(): string;
    /**
     * @type {boolean}
     * @private
     * @deprecated since v3.0.0 (moved to 'InputChannel' class)
     */
    private get nrpnEventsEnabled();
}
/**
 * The `Output` class represents a MIDI output port. This object is derived from the host's MIDI
 * subsystem and cannot be instantiated directly.
 *
 * You can find a list of all available `Output` objects in the
 * [WebMidi.outputs]{@link WebMidi#outputs} array.
 *
 * The `Output` class extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
 * [removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
 * [hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
 * others.
 *
 * @param {MIDIOutput} midiOutput `MIDIOutput` object as provided by the MIDI subsystem
 *
 * @fires Output#opened
 * @fires Output#disconnected
 * @fires Output#closed
 */
declare class Output extends e {
    constructor(midiOutput: any);
    /**
     * A reference to the `MIDIOutput` object
     * @type {MIDIOutput}
     * @private
     */
    private _midiOutput;
    /**
     * @type {number}
     * @private
     */
    private _octaveOffset;
    /**
     * Array containing the 16 {@link OutputChannel} objects available for this `Output`. The
     * channels are numbered 1 through 16.
     *
     * @type {OutputChannel[]}
     */
    channels: OutputChannel[];
    /**
     * Destroys the `Output`. All listeners are removed, all channels are destroyed and the MIDI
     * subsystem is unlinked.
     * @returns {Promise<void>}
     */
    destroy(): Promise<void>;
    /**
     * @private
     */
    private _onStateChange;
    /**
     * Opens the output for usage.
     *
     * @returns {Promise<Output>} The promise is fulfilled with the `Output`
     */
    open(): Promise<Output>;
    /**
     * Closes the output connection. When an output is closed, it cannot be used to send MIDI messages
     * until the output is opened again by calling [Output.open()]{@link Output#open}. You can check
     * the connection status by looking at the [connection]{@link Output#connection} property.
     *
     * @returns {Promise<void>}
     */
    close(): Promise<void>;
    /**
     * Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
     * sent immediately. The message should be an array of 8 bit unsigned integers (0-225) or a
     * [Uint8Array]{@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array}
     * object.
     *
     * Note that **you cannot use a
     * [Uint8Array]{@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array}
     * parameter in the Node.js environment**. This is because the MIDI submodule used in Node.js
     * ([JZZ.js]{@link https://www.npmjs.com/package/jzz}) does not support it.
     *
     * It is usually not necessary to use this method directly as you can use one of the simpler
     * helper methods such as [playNote()`, `stopNote()`, `sendControlChange()`, etc.
     *
     * Details on the format of MIDI messages are available in the summary of
     * [MIDI messages]{@link https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message}
     * from the MIDI Manufacturers Association.
     *
     * @param message {number[]|Uint8Array} An array of 8bit unsigned integers or a `Uint8Array`
     * object (not available in Node.js) containing the message bytes. Depending on the type of
     * message, one to three bytes will be used.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a positive
     * number
     * ([DOMHighResTimeStamp]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that point time. If `time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The first byte (status) must be an integer between 128 and 255.
     *
     * @throws {RangeError} Data bytes must be integers between 0 and 255.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    send(message: number[] | Uint8Array, options?: {
        time?: number | string;
    }, legacy?: any): Output;
    /**
     * Sends a MIDI [system exclusive]{@link
      * https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages}
     * (*sysex*) message. The generated message will automatically be prepended with the *sysex byte*
     * (0xF0) and terminated with the *end of sysex byte* (0xF7).
     *
     * To use the `sendSysex()` method, system exclusive message support must have been enabled. To
     * do so, you must set the `sysex` option to `true` when calling `WebMidi.enable()`:
     *
     * ```js
     * WebMidi.enable({sysex: true})
     *   .then(() => console.log("System exclusive messages are enabled");
     * ```
     *
     * Note that, depending on browser, version and platform, it is generally necessary to serve the
     * page over HTTPS to enable sysex support.
     *
     * ##### Examples
     *
     * If you want to send a sysex message to a Korg device connected to the first output, you would
     * use the following code:
     *
     * ```js
     * WebMidi.outputs[0].sendSysex(0x42, [0x1, 0x2, 0x3, 0x4, 0x5]);
     * ```
     *
     * The parameters can be specified using any number notation (decimal, hex, binary, etc.).
     * Therefore, the code below is equivalent to the code above:
     *
     * ```js
     * WebMidi.outputs[0].sendSysex(66, [1, 2, 3, 4, 5]);
     * ```
     *
     * The above code sends the byte values 1, 2, 3, 4 and 5 to Korg devices (hex 42 is the same as
     * decimal 66).
     *
     * Some manufacturers are identified using 3 bytes. In this case, you would use a 3-position array
     * as the first parameter. For example, to send the same sysex message to a
     * *Native Instruments* device:
     *
     * ```js
     * WebMidi.outputs[0].sendSysex([0x00, 0x21, 0x09], [0x1, 0x2, 0x3, 0x4, 0x5]);
     * ```
     * There is no limit for the length of the data array. However, it is generally suggested to keep
     * system exclusive messages to 64Kb or less.
     *
     * @param manufacturer {number|number[]} An unsigned integer or an array of three unsigned
     * integers between 0 and 127 that identify the targeted manufacturer. The *MIDI Manufacturers
     * Association* maintains a full list of
     * [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers)
     * .
     *
     * @param [data=number[]] {Array} An array of unsigned integers between 0 and 127. This is the
     * data you wish to transfer.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {DOMException} Failed to execute 'send' on 'MIDIOutput': System exclusive message is
     * not allowed.
     *
     * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index x is greater
     * than 0xFF.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendSysex(manufacturer: number | number[], data?: any[], options?: {
        time?: number | string;
    }): Output;
    /**
     * Clears all messages that have been queued but not yet delivered.
     *
     * Warning: this method has been defined in the specification but has not been implemented yet. As
     * soon as browsers implement it, it will work.
     *
     * You can check out the current status of this feature for Chromium (Chrome) here:
     * https://bugs.chromium.org/p/chromium/issues/detail?id=471798
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    clear(): Output;
    /**
     * Sends a MIDI **timecode quarter frame** message. Please note that no processing is being done
     * on the data. It is up to the developer to format the data according to the
     * [MIDI Timecode](https://en.wikipedia.org/wiki/MIDI_timecode) format.
     *
     * @param value {number} The quarter frame message content (integer between 0 and 127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendTimecodeQuarterFrame(value: number, options?: {
        time?: number | string;
    }): Output;
    /**
     * Sends a **ong position** MIDI message. The value is expressed in MIDI beats (between 0 and
     * 16383) which are 16th note. Position 0 is always the start of the song.
     *
     * @param [value=0] {number} The MIDI beat to cue to (integer between 0 and 16383).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setSongPosition(value?: number, options?: {
        time?: number | string;
    }): Output;
    /**
     * @private
     * @deprecated since version 3.0
     */
    private sendSongPosition;
    /**
     * Sends a **song select** MIDI message.
     *
     * **Note**: since version 3.0, the song number is an integer between 1 and 128. In versions 1.0
     * and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices that
     * use a numbering scheme starting at 1.
     *
     * @param value {number} The number of the song to select (integer between 1 and 128).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws The song number must be between 1 and 128.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setSong(value: number, options?: {
        time?: number | string;
    }): Output;
    /**
     * @private
     * @deprecated since version 3.0
     */
    private sendSongSelect;
    /**
     * Sends a MIDI **tune request** real-time message.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendTuneRequest(options?: {
        time?: number | string;
    }): Output;
    /**
     * Sends a MIDI **clock* real-time message. According to the standard, there are 24 MIDI Clocks
     * for every quarter note.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendClock(options?: {
        time?: number | string;
    }): Output;
    /**
     * Sends a **start** real-time message. A MIDI Start message starts the playback of the current
     * song at beat 0. To start playback elsewhere in the song, use the
     * [sendContinue()]{@link Output#sendContinue} method.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendStart(options?: {
        time?: number | string;
    }): Output;
    /**
     * Sends a **continue** real-time message. This resumes song playback where it was previously
     * stopped or where it was last cued with a song position message. To start playback from the
     * start, use the [sendStart()]{@link Output#sendStart}` method.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendContinue(options?: {
        time?: number | string;
    }): Output;
    /**
     * Sends a **stop** real-time message. This tells the device connected to this output to stop
     * playback immediately (or at the scheduled time).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendStop(options?: {
        time?: number | string;
    }): Output;
    /**
     * Sends an **active sensing** real-time message. This tells the device connected to this port
     * that the connection is still good. Active sensing messages should be sent every 300 ms if there
     * was no other activity on the MIDI port.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendActiveSensing(options?: {
        time?: number | string;
    }): Output;
    /**
     * Sends a **reset** real-time message. This tells the device connected to this output that it
     * should reset itself to a default state.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendReset(options?: {
        time?: number | string;
    }): Output;
    /**
     * @private
     * @deprecated since version 3.0
     */
    private sendTuningRequest;
    /**
     * Sends a MIDI **key aftertouch** message to the specified channel(s) at the scheduled time. This
     * is a key-specific aftertouch. For a channel-wide aftertouch message, use
     * [setChannelAftertouch()]{@link Output#setChannelAftertouch}.
     *
     * @param note {number|string|Array}  The note for which you are sending an aftertouch value. The
     * notes can be specified in one of two ways. The first way is by using the MIDI note number (an
     * integer between 0 and 127). The second way is by using the note name followed by the octave
     * (C3, G#4, F-1, Db7). The octave range should be between -1 and 9. The lowest note is C-1 (MIDI
     * note number 0) and the highest note is G9 (MIDI note number 127). It is also possible to use
     * an array of note names and/or numbers.
     *
     * @param [pressure=0.5] {number} The pressure level (between 0 and 1). An invalid pressure value
     * will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the
     * pressure can be defined by using an integer between 0 and 127.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setKeyAftertouch(note: number | string | any[], pressure?: number, options?: {
        channels?: number | number[] | "all";
        rawValue?: boolean;
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * @private
     * @deprecated since version 3.0
     */
    private sendKeyAftertouch;
    /**
     * Sends a MIDI **control change** message to the specified channel(s) at the scheduled time. The
     * control change message to send can be specified numerically or by using one of the following
     * common names:
     *
     *  * `bankselectcoarse` (#0)
     *  * `modulationwheelcoarse` (#1)
     *  * `breathcontrollercoarse` (#2)
     *  * `footcontrollercoarse` (#4)
     *  * `portamentotimecoarse` (#5)
     *  * `dataentrycoarse` (#6)
     *  * `volumecoarse` (#7)
     *  * `balancecoarse` (#8)
     *  * `pancoarse` (#10)
     *  * `expressioncoarse` (#11)
     *  * `effectcontrol1coarse` (#12)
     *  * `effectcontrol2coarse` (#13)
     *  * `generalpurposeslider1` (#16)
     *  * `generalpurposeslider2` (#17)
     *  * `generalpurposeslider3` (#18)
     *  * `generalpurposeslider4` (#19)
     *  * `bankselectfine` (#32)
     *  * `modulationwheelfine` (#33)
     *  * `breathcontrollerfine` (#34)
     *  * `footcontrollerfine` (#36)
     *  * `portamentotimefine` (#37)
     *  * `dataentryfine` (#38)
     *  * `volumefine` (#39)
     *  * `balancefine` (#40)
     *  * `panfine` (#42)
     *  * `expressionfine` (#43)
     *  * `effectcontrol1fine` (#44)
     *  * `effectcontrol2fine` (#45)
     *  * `holdpedal` (#64)
     *  * `portamento` (#65)
     *  * `sustenutopedal` (#66)
     *  * `softpedal` (#67)
     *  * `legatopedal` (#68)
     *  * `hold2pedal` (#69)
     *  * `soundvariation` (#70)
     *  * `resonance` (#71)
     *  * `soundreleasetime` (#72)
     *  * `soundattacktime` (#73)
     *  * `brightness` (#74)
     *  * `soundcontrol6` (#75)
     *  * `soundcontrol7` (#76)
     *  * `soundcontrol8` (#77)
     *  * `soundcontrol9` (#78)
     *  * `soundcontrol10` (#79)
     *  * `generalpurposebutton1` (#80)
     *  * `generalpurposebutton2` (#81)
     *  * `generalpurposebutton3` (#82)
     *  * `generalpurposebutton4` (#83)
     *  * `reverblevel` (#91)
     *  * `tremololevel` (#92)
     *  * `choruslevel` (#93)
     *  * `celestelevel` (#94)
     *  * `phaserlevel` (#95)
     *  * `databuttonincrement` (#96)
     *  * `databuttondecrement` (#97)
     *  * `nonregisteredparametercoarse` (#98)
     *  * `nonregisteredparameterfine` (#99)
     *  * `registeredparametercoarse` (#100)
     *  * `registeredparameterfine` (#101)
     *
     * Note: as you can see above, not all control change message have a matching common name. This
     * does not mean you cannot use the others. It simply means you will need to use their number
     * (0-119) instead of their name. Numbers 120 to 127 are reserved for *channel mode* messages. See
     * [sendChannelMode()]{@link Output#sendChannelMode} method for more info.
     *
     * To view a list of all available `control change` messages, please consult "Table 3 - Control
     * Change Messages" from the [MIDI Messages](
     * https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
     * specification.
     *
     * @param controller {number|string} The MIDI controller name or number (0-119).
     *
     * @param [value=0] {number} The value to send (0-127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {RangeError} Controller numbers must be between 0 and 119.
     * @throws {RangeError} Invalid controller name.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     */
    sendControlChange(controller: number | string, value?: number, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
     * adjust the range used by their pitch bend lever. The range is specified by using the
     * `semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
     * means that the pitch bend range will be 12 semitones above and below the nominal pitch.
     *
     * @param semitones {number} The desired adjustment value in semitones (between 0 and 127). While
     * nothing imposes that in the specification, it is very common for manufacturers to limit the
     * range to 2 octaves (-12 semitones to 12 semitones).
     *
     * @param [cents=0] {number} The desired adjustment value in cents (integer between 0-127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The msb value must be between 0 and 127.
     * @throws {RangeError} The lsb value must be between 0 and 127.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setPitchBendRange(semitones: number, cents?: number, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sets the specified MIDI registered parameter to the desired value. The value is defined with
     * up to two bytes of data (msb, lsb) that each can go from 0 to 127.
     *
     * MIDI
     * [registered parameters]
     * (https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
     * extend the original list of control change messages. The MIDI 1.0 specification lists only a
     * limited number of them. Here are the original registered parameters with the identifier that
     * can be used as the first parameter of this function:
     *
     *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
     *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
     *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
     *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
     *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
     *  * Modulation Range (0x00, 0x05): `"modulationrange"`
     *
     * Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
     * Standard*, which is not widely implemented.
     *
     * Another set of extra parameters have been later added for 3D sound controllers. They are:
     *
     *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
     *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
     *  * Gain (0x3D, 0x02): `"gain"`
     *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
     *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
     *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
     *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
     *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
     *  * Roll Angle (0x3D, 0x08): `"rollangle"`
     *
     * @param parameter {string|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the
     * registered parameter.
     *
     * @param [data=[]] {number|number[]} A single integer or an array of integers with a maximum
     * length of 2 specifying the desired data.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    setRegisteredParameter(parameter: string | number[], data?: number | number[], options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sends a MIDI **channel aftertouch** message to the specified channel(s). For key-specific
     * aftertouch, you should instead use [setKeyAftertouch()]{@link Output#setKeyAftertouch}.
     *
     * @param [pressure=0.5] {number} The pressure level (between 0 and 1). An invalid pressure value
     * will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the
     * pressure can be defined by using an integer between 0 and 127.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     * @since 3.0.0
     */
    setChannelAftertouch(pressure?: number, options?: {
        channels?: number | number[] | "all";
        rawValue?: boolean;
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * @private
     * @deprecated since version 3.0
     */
    private sendChannelAftertouch;
    /**
     * Sends a MIDI **pitch bend** message to the specified channel(s) at the scheduled time.
     *
     * @param {number|number[]} value The intensity of the bend (between -1.0 and 1.0). A value of
     * zero means no bend. The resulting bend is relative to the pitch bend range that has been
     * defined. The range can be set with [setPitchBendRange()]{@link OutputChannel#setPitchBendRange}
     * . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of
     * -1 will bend the note 1 octave below its nominal value.
     *
     * If an invalid value is specified, the nearest valid value will be used instead.
     *
     * If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either
     * using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127
     * representing, respectively, the MSB (most significant byte) and the LSB (least significant
     * byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64`
     * bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents
     * (1/100 of a semitone). An LSB of `64` also means no bend.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or
     * an array of 2 integers if using both MSB and LSB).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setPitchBend(value: number | number[], options?: {
        channels?: number | number[] | "all";
        rawValue?: boolean;
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * @private
     * @deprecated since version 3.0
     */
    private sendPitchBend;
    /**
     * Sends a MIDI **program change** message to the specified channel(s) at the scheduled time.
     *
     * **Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
     * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
     * that use a numbering scheme starting at 1.
     *
     * @param [program=1] {number} The MIDI patch (program) number (1-128)
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
     * than 0xFF.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setProgram(program?: number, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * @private
     * @deprecated since version 3.0
     */
    private sendProgramChange;
    /**
     * Sends a **modulation depth range** message to the specified channel(s) so that they adjust the
     * depth of their modulation wheel's range. The range can be specified with the `semitones`
     * parameter, the `cents` parameter or by specifying both parameters at the same time.
     *
     * @param [semitones=0] {number} The desired adjustment value in semitones (integer between
     * 0 and 127).
     *
     * @param [cents=0] {number} The desired adjustment value in cents (integer between 0 and 127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The msb value must be between 0 and 127
     * @throws {RangeError} The lsb value must be between 0 and 127
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setModulationRange(semitones?: number, cents?: number, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sends a master tuning message to the specified channel(s). The value is decimal and must be
     * larger than -65 semitones and smaller than 64 semitones.
     *
     * Because of the way the MIDI specification works, the decimal portion of the value will be
     * encoded with a resolution of 14bit. The integer portion must be between -64 and 63
     * inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
     * a **Master Fine Tuning** RPN messages.
     *
     * @param [value=0.0] {number} The desired decimal adjustment value in semitones (-65 < x < 64)
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The value must be a decimal number between larger than -65 and smaller
     * than 64.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setMasterTuning(value?: number, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
     * *MIDI Tuning Standard*, which is not widely implemented.
     *
     * **Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
     * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
     * that use a numbering scheme starting at 1.
     *
     * @param value {number} The desired tuning program (1-128).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The program value must be between 1 and 128.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setTuningProgram(value: number, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
     * *MIDI Tuning Standard*, which is not widely implemented.
     *
     * **Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
     * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
     * that use a numbering scheme starting at 1.
     *
     * @param value {number} The desired tuning bank (1-128).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The bank value must be between 1 and 128.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setTuningBank(value: number, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sends a MIDI **channel mode** message to the specified channel(s). The channel mode message to
     * send can be specified numerically or by using one of the following common names:
     *
     *   * `"allsoundoff"` (#120)
     *   * `"resetallcontrollers"` (#121)
     *   * `"localcontrol"` (#122)
     *   * `"allnotesoff"` (#123)
     *   * `"omnimodeoff"` (#124)
     *   * `"omnimodeon"` (#125)
     *   * `"monomodeon"` (#126)
     *   * `"polymodeon"` (#127)
     *
     * It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may
     * require a value that's not zero. For that reason, the `value` parameter is optional and
     * defaults to 0.
     *
     * To make it easier, all channel mode messages have a matching helper method:
     *
     *   - [turnSoundOff()]{@link OutputChannel#turnSoundOff}
     *   - [resetAllControllers()]{@link OutputChannel#resetAllControllers}
     *   - [setLocalControl()]{@link OutputChannel#turnSoundOff}
     *   - [turnNotesOff()]{@link OutputChannel#turnNotesOff}
     *   - [setOmniMode()]{@link OutputChannel#setOmniMode}
     *   - [setPolyphonicMode()]{@link OutputChannel#setPolyphonicMode}
     *
     * @param command {number|string} The numerical identifier of the channel mode message (integer
     * between 120-127) or its name as a string.
     *
     * @param [value] {number} The value to send (integer between 0-127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {TypeError} Invalid channel mode message name.
     * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
     * @throws {RangeError} Value must be an integer between 0 and 127.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     */
    sendChannelMode(command: number | string, value?: number, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sends an **all sound off** channel mode message. This will silence all sounds playing on that
     * channel but will not prevent new sounds from being triggered.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output}
     *
     * @since 3.0.0
     */
    turnSoundOff(options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sends an **all notes off** channel mode message. This will make all currently playing notes
     * fade out just as if their key had been released. This is different from the
     * [turnSoundOff()]{@link Output#turnSoundOff} method which mutes all sounds immediately.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output}
     *
     * @since 3.0.0
     */
    turnNotesOff(options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sends a **reset all controllers** channel mode message. This resets all controllers, such as
     * the pitch bend, to their default value.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output}
     */
    resetAllControllers(options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
     * and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
     * multiple notes are being played.
     *
     * @param mode {string} The mode to use: `"mono"` or `"poly"`.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setPolyphonicMode(mode: string, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Turns local control on or off. Local control is usually enabled by default. If you disable it,
     * the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
     * its out port.
     *
     * @param [state=false] {boolean} Whether to activate local control (`true`) or disable it
     * (`false`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setLocalControl(state?: boolean, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sets OMNI mode to `"on"` or `"off"` for the specified channel(s). MIDI's OMNI mode causes the
     * instrument to respond to messages from all channels.
     *
     * It should be noted that support for OMNI mode is not as common as it used to be.
     *
     * @param [state] {boolean} Whether to activate OMNI mode (`true`) or not (`false`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {TypeError} Invalid channel mode message name.
     * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
     * @throws {RangeError} Value must be an integer between 0 and 127.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    setOmniMode(state?: boolean, options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sets a non-registered parameter to the specified value. The NRPN is selected by passing in a
     * two-position array specifying the values of the two control bytes. The value is specified by
     * passing in a single integer (most cases) or an array of two integers.
     *
     * NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
     * they see fit. For example, according to the Roland GS specification, you can control the
     * **vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
     * would use:
     *
     * ```js
     * WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123);
     * ```
     *
     * Obviously, you should select a channel so the message is not sent to all channels. For
     * instance, to send to channel 1 of the first output port, you would use:
     *
     * ```js
     * WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123, 1);
     * ```
     *
     * In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
     * would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
     * uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
     * value to send was 10, you could use:
     *
     * ```js
     * WebMidi.outputs[0].setNonRegisteredParameter([2, 63], [0, 10], [1]);
     * ```
     *
     * For further implementation details, refer to the manufacturer"s documentation.
     *
     * @param parameter {number[]} A two-position array specifying the two control bytes (0x63,
     * 0x62) that identify the non-registered parameter.
     *
     * @param [data=[]] {number|number[]} An integer or an array of integers with a length of 1 or 2
     * specifying the desired data.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The control value must be between 0 and 127.
     * @throws {RangeError} The msb value must be between 0 and 127
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    setNonRegisteredParameter(parameter: number[], data?: number | number[], options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Increments the specified MIDI registered parameter by 1. Here is the full list of parameter
     * names that can be used with this method:
     *
     *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
     *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
     *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
     *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
     *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
     *  * Modulation Range (0x00, 0x05): `"modulationrange"`
     *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
     *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
     *  * Gain (0x3D, 0x02): `"gain"`
     *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
     *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
     *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
     *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
     *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
     *  * Roll Angle (0x3D, 0x08): `"rollangle"`
     *
     * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
     * parameter.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    incrementRegisteredParameter(parameter: string | number[], options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Decrements the specified MIDI registered parameter by 1. Here is the full list of parameter
     * names that can be used with this method:
     *
     *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
     *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
     *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
     *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
     *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
     *  * Modulation Range (0x00, 0x05): `"modulationrange"`
     *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
     *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
     *  * Gain (0x3D, 0x02): `"gain"`
     *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
     *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
     *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
     *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
     *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
     *  * Roll Angle (0x3D, 0x08): `"rollangle"`
     *
     * @param parameter {String|number[]} A string identifying the parameter"s name (see above) or a
     * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
     * parameter.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @throws TypeError The specified parameter is not available.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    decrementRegisteredParameter(parameter: string | number[], options?: {
        channels?: number | number[] | "all";
        time?: number | string;
    }, legacy?: {}): Output;
    /**
     * Sends a **note off** message for the specified notes on the specified channel(s). The first
     * parameter is the note. It can be a single value or an array of the following valid values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *  - A {@link Note} object
     *
     *  The execution of the **note off** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * When using {@link Note} objects, the release velocity defined in the {@link Note} objects has
     * precedence over the one specified via the method's `options` parameter.
     *
     * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to stop. The notes can be
     * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
     * {@link Note} object or an array of the previous types. When using a note name, octave range
     * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
     * note is G9 (MIDI note number 127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {boolean} [options.rawValue=false] Controls whether the release velocity is set using
     * integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`,
     * default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @param {number} [options.release=0.5] The velocity at which to release the note (between `0`
     * and `1`). If the `rawValue` option is `true`, the value should be specified as an integer
     * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendNoteOff(note: number | string | Note | number[] | string[] | Note[], options?: {
        channels?: number | number[] | "all";
        rawValue?: boolean;
        time?: number | string;
        release?: number;
    }, legacy?: {}): Output;
    /**
     * This is an alias to the [sendNoteOff()]{@link Output#sendNoteOff} method.
     *
     * @see {@link Output#sendNoteOff}
     *
     * @param note
     * @param options
     * @returns {Output}
     */
    stopNote(note: any, options: any): Output;
    /**
     * Plays a note or an array of notes on one or more channels of this output. The first parameter
     * is the note to play. It can be a single value or an array of the following valid values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *  - A {@link Note} object
     *
     * The `playNote()` method sends a **note on** MIDI message for all specified notes on all
     * specified channels. If no channels are specified, it will send to all channels. If a `duration`
     * is set in the `options` parameter or in the {@link Note} object's
     * [duration]{@link Note#duration} property, it will also schedule a **note off** message to end
     * the note after said duration. If no `duration` is set, the note will simply play until a
     * matching **note off** message is sent with [stopNote()]{@link Output#stopNote} or
     * [sendNoteOff()]{@link Output#sendNoteOff}.
     *
     * The execution of the **note on** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * When using {@link Note} objects, the durations and velocities defined in the {@link Note}
     * objects have precedence over the ones specified via the method's `options` parameter.
     *
     * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
     * functionally equivalent to a **note off** message.
     *
     * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
     * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
     * {@link Note} object or an array of the previous types. When using a note name, octave range
     * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
     * note is G9 (MIDI note number 127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to play the note on. The special value `"all"` can
     * also be used to use all channels (default).
     *
     * @param {number} [options.duration=undefined] The number of milliseconds (integer) after which a
     * **note off** message will be scheduled. If left undefined, only a **note on** message is sent.
     *
     * @param {boolean} [options.rawValue=false] Controls whether the attack and release velocities
     * are set using integers between `0` and `127` (`true`) or a decimal number between `0` and `1`
     * (`false`, default).
     *
     * @param {number} [options.release=0.5] The velocity at which to release the note (between `0`
     * and `1`). If the `rawValue` option is `true`, the value should be specified as an integer
     * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
     * This is only used with the **note off** event triggered when `options.duration` is set.
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @param {number} [options.attack=0.5] The attack velocity to use when playing the note (between
     * `0` and `1`). If the `rawValue` option is `true`, the value should be specified as an integer
     * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    playNote(note: number | string | Note | number[] | string[] | Note[], options?: {
        channels?: number | number[] | "all";
        duration?: number;
        rawValue?: boolean;
        release?: number;
        time?: number | string;
        attack?: number;
    }, legacy?: {}): Output;
    /**
     * Sends a **note on** message for the specified notes on the specified channel(s). The first
     * parameter is the note. It can be a single value or an array of the following valid values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *  - A {@link Note} object
     *
     *  The execution of the **note on** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * When using {@link Note} objects, the attack velocity defined in the {@link Note} objects has
     * precedence over the one specified via the method's `options` parameter. Also, the `duration` is
     * ignored. If you want to also send a **note off** message, use the
     * [playNote()]{@link Output#playNote} method instead.
     *
     * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
     * functionally equivalent to a **note off** message.
     *
     * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
     * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
     * {@link Note} object or an array of the previous types. When using a note name, octave range
     * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
     * note is G9 (MIDI note number 127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]|"all"} [options.channels="all"] The MIDI channel number (between `1`
     * and `16`) or an array of channel numbers to use. The special value `"all"` can also be used to
     * use all channels (default).
     *
     * @param {boolean} [options.rawValue=false] Controls whether the attack velocity is set using
     * integers between `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`,
     * default).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number
     * (DOMHighResTimeStamp), the operation will be scheduled for that time. If `time` is omitted, or
     * in the past, the operation will be carried out as soon as possible.
     *
     * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
     * `1`). If the `rawValue` option is `true`, the value should be specified as an integer
     * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendNoteOn(note: number | string | Note | number[] | string[] | Note[], options?: {
        channels?: number | number[] | "all";
        rawValue?: boolean;
        time?: number | string;
        attack?: number;
    }, legacy?: {}): Output;
    /**
     * Name of the MIDI output
     *
     * @type {string}
     * @readonly
     */
    get name(): string;
    /**
     * ID string of the MIDI output. The ID is host-specific. Do not expect the same ID on different
     * platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
     * the same port.
     *
     * @type {string}
     * @readonly
     */
    get id(): string;
    /**
     * Output port's connection state: `"pending"`, `"open"` or `"closed"`.
     *
     * @type {string}
     * @readonly
     */
    get connection(): string;
    /**
     * Name of the manufacturer of the device that makes this output port available.
     *
     * @type {string}
     * @readonly
     */
    get manufacturer(): string;
    /**
     * State of the output port: `"connected"` or `"disconnected"`.
     *
     * @type {string}
     * @readonly
     */
    get state(): string;
    /**
     * Type of the output port (`"output"`)
     *
     * @type {string}
     * @readonly
     */
    get type(): string;
    set octaveOffset(arg: number);
    /**
     * An integer to offset the octave of outgoing notes. By default, middle C (MIDI note number 60)
     * is placed on the 4th octave (C4).
     *
     * Note that this value is combined with the global offset value defined on the `WebMidi` object
     * (if any).
     *
     * @type {number}
     *
     * @since 3.0
     */
    get octaveOffset(): number;
}
declare class e {
    static get ANY_EVENT(): symbol;
    constructor(e?: boolean);
    eventMap: {};
    eventsSuspended: boolean;
    addListener(n: any, r: any, i?: {}): t;
    addOneTimeListener(e: any, t: any, n?: {}): void;
    hasListener(n: any, r: any): boolean;
    get eventNames(): string[];
    getListeners(e: any): any;
    suspendEvent(e: any): void;
    unsuspendEvent(e: any): void;
    getListenerCount(e: any): any;
    emit(t: any, ...n: any[]): any[];
    removeListener(e: any, t: any, n?: {}): any;
    waitFor(e: any, t?: {}): Promise<any>;
    get eventCount(): number;
}
/**
 * The `InputChannel` class represents an input MIDI channel (1-16) from a single input device. This
 * object is derived from the host's MIDI subsystem and cannot be instantiated directly.
 *
 * All 16 `InputChannel` objects can be found inside the input's [channels]{@link Input#channels}
 * property.
 *
 * The `InputChannel` class extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
 * [removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
 * [hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
 * others. Check out the
 * [documentation for EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) for more
 * details.
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
 * @fires InputChannel#channelmode
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
 * @since 3.0.0
 */
declare class InputChannel extends e {
    constructor(input: any, number: any);
    /**
     * @type {Input}
     * @private
     */
    private _input;
    /**
     * @type {number}
     * @private
     */
    private _number;
    /**
     * @type {number}
     * @private
     */
    private _octaveOffset;
    /**
     * Destroys the `Input` by removing all listeners and severing the link with the MIDI subsystem's
     * input.
     */
    destroy(): void;
    /**
     * @param e MIDIMessageEvent
     * @private
     */
    private _processMidiMessageEvent;
    /**
     * Parses incoming channel events and emit standard MIDI message events (noteon, noteoff, etc.)
     * @param e Event
     * @private
     */
    private _parseEventForStandardMessages;
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
    getChannelModeByNumber(number: number): string | false;
    _parseChannelModeMessage(e: any): void;
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
    getCcNameByNumber(number: number): string | undefined;
    set octaveOffset(arg: number);
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
    get octaveOffset(): number;
    /**
     * The {@link Input} this channel belongs to
     * @type {Input}
     * @since 3.0
     */
    get input(): Input;
    /**
     * This channel's MIDI number (1-16)
     * @type {number}
     * @since 3.0
     */
    get number(): number;
}
/**
 * The `OutputChannel` class represents a single output channel (1-16) from an output device. This
 * object is derived from the host's MIDI subsystem and cannot be instantiated directly.
 *
 * All 16 `OutputChannel` objects can be found inside the parent output's
 * [channels]{@link Output#channels} property.
 *
 * The `OutputChannel` class extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
 * [removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
 * [hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
 * others.
 *
 * @param {Output} output The output this channel belongs to
 * @param {number} number The channel number (1-16)
 *
 * @since 3.0.0
 */
declare class OutputChannel extends e {
    constructor(output: any, number: any);
    /**
     * @type {Output}
     * @private
     */
    private _output;
    /**
     * @type {number}
     * @private
     */
    private _number;
    /**
     * @type {number}
     * @private
     */
    private _octaveOffset;
    /**
     * Unlinks the MIDI subsystem, removes all listeners attached to the channel and nulls the channel
     * number. This method is mostly for internal use. It has not been prefixed with an underscore
     * since it is called by other objects such as the `Output` object.
     *
     * @private
     */
    private destroy;
    /**
     * Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
     * sent immediately. The message should be an array of 8 bit unsigned integers (0-225) or a
     * [Uint8Array]{@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array}
     * object.
     *
     * Note that **you cannot use a
     * [Uint8Array]{@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array}
     * parameter in the Node.js environment**. This is because the MIDI submodule used in Node.js
     * ([JZZ.js]{@link https://www.npmjs.com/package/jzz}) does not support it.
     *
     * It is usually not necessary to use this method directly as you can use one of the simpler
     * helper methods such as `playNote()`, `stopNote()`, `sendControlChange()`, etc.
     *
     * Details on the format of MIDI messages are available in the summary of
     * [MIDI messages]{@link https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message}
     * from the MIDI Manufacturers Association.
     *
     * @param message {number[]|Uint8Array} An array of 8bit unsigned integers or a `Uint8Array`
     * object (not available in Node.js) containing the message bytes. Depending on the type of
     * message, one to three bytes will be used.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a positive
     * number
     * ([DOMHighResTimeStamp]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that point time. If `time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The first byte (status) must be an integer between 128 and 255.
     *
     * @throws {RangeError} Data bytes must be integers between 0 and 255.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    send(message: number[] | Uint8Array, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends a MIDI **key aftertouch** message at the scheduled time. This is a key-specific
     * aftertouch. For a channel-wide aftertouch message, use
     * [setChannelAftertouch()]{@link Output#setChannelAftertouch}.
     *
     * The key can be a single value or an array of the following valid values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note identifier such as `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.
     *
     * @param target {number|string|number[]|string[]} The key(s) for which you are sending an
     * aftertouch value. The notes can be specified by using a MIDI note number (0-127), a note
     * identifier (e.g. C3, G#4, F-1, Db7), or an array of the previous types.
     *
     * When using a note identifier, the octave value will be offset by the combined value of
     * `InputChannel.octaveOffset`, `Input.octaveOffset` and `WebMidi.octaveOffset` (if those values
     * are not `0`). When using a key number, octaveOffset values are ignored.
     *
     * @param [pressure=0.5] {number} The pressure level (between 0 and 1). An invalid pressure value
     * will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the
     * pressure is defined by using an integer between 0 and 127.
     *
     * @param {Object} [options={}]
     *
     * @param {boolean} [options.useRawValue=false] A boolean indicating whether the value should be
     * considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @return {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     *
     * @throws RangeError Invalid key aftertouch value.
     */
    setKeyAftertouch(target: number | string | number[] | string[], pressure?: number, options?: {
        useRawValue?: boolean;
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends a MIDI **control change** message to the channel at the scheduled time. The control
     * change message to send can be specified numerically (0 to 119) or by using one of the following
     * common names:
     *
     *  * `bankselectcoarse` (#0)
     *  * `modulationwheelcoarse` (#1)
     *  * `breathcontrollercoarse` (#2)
     *  * `footcontrollercoarse` (#4)
     *  * `portamentotimecoarse` (#5)
     *  * `dataentrycoarse` (#6)
     *  * `volumecoarse` (#7)
     *  * `balancecoarse` (#8)
     *  * `pancoarse` (#10)
     *  * `expressioncoarse` (#11)
     *  * `effectcontrol1coarse` (#12)
     *  * `effectcontrol2coarse` (#13)
     *  * `generalpurposeslider1` (#16)
     *  * `generalpurposeslider2` (#17)
     *  * `generalpurposeslider3` (#18)
     *  * `generalpurposeslider4` (#19)
     *  * `bankselectfine` (#32)
     *  * `modulationwheelfine` (#33)
     *  * `breathcontrollerfine` (#34)
     *  * `footcontrollerfine` (#36)
     *  * `portamentotimefine` (#37)
     *  * `dataentryfine` (#38)
     *  * `volumefine` (#39)
     *  * `balancefine` (#40)
     *  * `panfine` (#42)
     *  * `expressionfine` (#43)
     *  * `effectcontrol1fine` (#44)
     *  * `effectcontrol2fine` (#45)
     *  * `holdpedal` (#64)
     *  * `portamento` (#65)
     *  * `sustenutopedal` (#66)
     *  * `softpedal` (#67)
     *  * `legatopedal` (#68)
     *  * `hold2pedal` (#69)
     *  * `soundvariation` (#70)
     *  * `resonance` (#71)
     *  * `soundreleasetime` (#72)
     *  * `soundattacktime` (#73)
     *  * `brightness` (#74)
     *  * `soundcontrol6` (#75)
     *  * `soundcontrol7` (#76)
     *  * `soundcontrol8` (#77)
     *  * `soundcontrol9` (#78)
     *  * `soundcontrol10` (#79)
     *  * `generalpurposebutton1` (#80)
     *  * `generalpurposebutton2` (#81)
     *  * `generalpurposebutton3` (#82)
     *  * `generalpurposebutton4` (#83)
     *  * `reverblevel` (#91)
     *  * `tremololevel` (#92)
     *  * `choruslevel` (#93)
     *  * `celestelevel` (#94)
     *  * `phaserlevel` (#95)
     *  * `databuttonincrement` (#96)
     *  * `databuttondecrement` (#97)
     *  * `nonregisteredparametercoarse` (#98)
     *  * `nonregisteredparameterfine` (#99)
     *  * `registeredparametercoarse` (#100)
     *  * `registeredparameterfine` (#101)
     *
     * Note: as you can see above, not all control change message have a matching common name. This
     * does not mean you cannot use the others. It simply means you will need to use their number
     * (0-119) instead of their name. Numbers 120 to 127 are reserved for *channel mode* messages. See
     * [sendChannelMode()]{@link OutputChannel#sendChannelMode} method for more info.
     *
     * To view a detailed list of all available **control change** messages, please consult "Table 3 -
     * Control Change Messages" from the [MIDI Messages](
     * https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
     * specification.
     *
     * @param {number|string} controller The MIDI controller name or number (0-119).
     *
     * @param {number} value The value to send (0-127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @throws {RangeError} Controller numbers must be between 0 and 119.
     * @throws {RangeError} Invalid controller name.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendControlChange(controller: number | string, value: number, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Selects a MIDI non-registered parameter so it is affected by upcoming data entry, data
     * increment and data decrement messages.
     *
     * @param parameter {number[]} A two-position array specifying the two control bytes that identify
     * the registered parameter. The NRPN MSB (99 or 0x63) is a position 0. The NRPN LSB (98 or 0x62)
     * is at position 1.
     *
     * @private
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    private _selectNonRegisteredParameter;
    /**
     * Deselects the currently active MIDI registered parameter so it is no longer affected by data
     * entry, data increment and data decrement messages.
     *
     * Current best practice recommends doing that after each call to
     * [_setCurrentParameter()]{@link OutputChannel#_setCurrentParameter}.
     *
     * @private
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    private _deselectRegisteredParameter;
    /**
     * Deselects the currently active MIDI non-registered parameter so it is no longer affected by
     * data entry, data increment and data decrement messages.
     *
     * @private
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    private _deselectNonRegisteredParameter;
    /**
     * Selects a MIDI registered parameter so it is affected by upcoming data entry, data increment
     * and data decrement messages.
     *
     * @private
     *
     * @param parameter {number[]} A two-position array of integers specifying the two control bytes
     * (0x65, 0x64) that identify the registered parameter. The integers must be between 0 and 127.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    private _selectRegisteredParameter;
    /**
     * Sets the value of the currently selected MIDI registered parameter.
     *
     * @private
     *
     * @param data {number|number[]}
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    private _setCurrentParameter;
    /**
     * Decrements the specified MIDI registered parameter by 1. Here is the full list of parameter
     * names that can be used with this function:
     *
     *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
     *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
     *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
     *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
     *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
     *  * Modulation Range (0x00, 0x05): `"modulationrange"`
     *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
     *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
     *  * Gain (0x3D, 0x02): `"gain"`
     *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
     *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
     *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
     *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
     *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
     *  * Roll Angle (0x3D, 0x08): `"rollangle"`
     *
     * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
     * parameter.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @throws TypeError The specified registered parameter is invalid.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    decrementRegisteredParameter(parameter: string | number[], options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Increments the specified MIDI registered parameter by 1. Here is the full list of parameter
     * names that can be used with this function:
     *
     *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
     *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
     *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
     *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
     *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
     *  * Modulation Range (0x00, 0x05): `"modulationrange"`
     *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
     *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
     *  * Gain (0x3D, 0x02): `"gain"`
     *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
     *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
     *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
     *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
     *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
     *  * Roll Angle (0x3D, 0x08): `"rollangle"`
     *
     * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
     * parameter.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @throws TypeError The specified registered parameter is invalid.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    incrementRegisteredParameter(parameter: string | number[], options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Plays a note or an array of notes on the channel. The first parameter is the note to play. It
     * can be a single value or an array of the following valid values:
     *
     *  - A {@link Note} object
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *
     * The `playNote()` method sends a **note on** MIDI message for all specified notes on all
     * specified channels. If a `duration` is set in the `options` parameter or in the {@link Note}
     * object's [duration]{@link Note#duration} property, it will also schedule a **note off** message
     * to end the note after said duration. If no `duration` is set, the note will simply play until
     * a matching **note off** message is sent with [stopNote()]{@link OutputChannel#stopNote} or
     * [sendNoteOff()]{@link OutputChannel#sendNoteOff}.
     *
     *  The execution of the **note on** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * When using {@link Note} objects, the durations and velocities defined in the {@link Note}
     * objects have precedence over the ones specified via the method's `options` parameter.
     *
     * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
     * functionally equivalent to a **note off** message.
     *
     * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
     * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
     * {@link Note} object or an array of the previous types. When using a note name, octave range
     * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
     * note is G9 (MIDI note number 127).
     *
     * @param {Object} [options={}]
     *
     * @param {number} [options.duration] A positive number larger than 0 representing the number of
     * milliseconds to wait before sending a **note off** message. If invalid or left undefined, only
     * a **note on** message will be sent.
     *
     * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
     * `1`). If the `rawAttack` option is also defined, it will have priority. An invalid velocity
     * value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawAttack=0.5] The attack velocity at which to play the note (between
     * `0` and `127`). This has priority over the `attack` property. An invalid velocity value will
     * silently trigger the default of `0.5`.
     *
     * @param {number} [options.release=0.5] The velocity at which to release the note (between `0`
     * and `1`). If the `rawRelease` option is also defined, it will have priority. An invalid
     * velocity value will silently trigger the default of `0.5`. This is only used with the
     * **note off** event triggered when `options.duration` is set.
     *
     * @param {number} [options.rawRelease=0.5] The velocity at which to release the note (between `0`
     * and `127`). This has priority over the `release` property. An invalid velocity value will
     * silently trigger the default of `0.5`. This is only used with the **note off** event triggered
     * when `options.duration` is set.
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    playNote(note: number | string | Note | number[] | string[] | Note[], options?: {
        duration?: number;
        attack?: number;
        rawAttack?: number;
        release?: number;
        rawRelease?: number;
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends a **note off** message for the specified notes on the channel. The first parameter is the
     * note. It can be a single value or an array of the following valid values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *  - A {@link Note} object
     *
     *  The execution of the **note off** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * When using {@link Note} objects, the release velocity defined in the {@link Note} objects has
     * precedence over the one specified via the method's `options` parameter.
     *
     * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to stop. The notes can be
     * specified by using a MIDI note number (0-127), a note name (e.g. C3, G#4, F-1, Db7), a
     * {@link Note} object or an array of the previous types. When using a note name, octave range
     * must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
     * note is G9 (MIDI note number 127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @param {number} [options.release=0.5] The velocity at which to release the note
     * (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have
     * priority. An invalid velocity value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawRelease=64] The velocity at which to release the note
     * (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have
     * priority. An invalid velocity value will silently trigger the default of `64`.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendNoteOff(note: number | string | Note | number[] | string[] | Note[], options?: {
        time?: number | string;
        release?: number;
        rawRelease?: number;
    }): OutputChannel;
    /**
     * This is an alias to the [sendNoteOff()]{@link OutputChannel#sendNoteOff} method.
     *
     * @see {@link OutputChannel#sendNoteOff}
     *
     * @param note
     * @param options
     * @returns {Output}
     */
    stopNote(note: any, options?: {}): Output;
    /**
     * Sends a **note on** message for the specified note(s) on the channel. The first parameter is
     * the note. It can be a single value or an array of the following valid values:
     *
     *  - A {@link Note} object
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *
     *  When passing a {@link Note} object or a note name, the `octaveOffset` will be applied. This is
     *  not the case when using a note number number. In this case, we assume you know exactly which
     *  MIDI note number should be sent out.
     *
     *
     *  The execution of the **note on** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * When using {@link Note} objects, the attack velocity defined in the {@link Note} objects has
     * precedence over the one specified via the method's `options` parameter. Also, the `duration` is
     * ignored. If you want to also send a **note off** message, use the
     * [playNote()]{@link Output#playNote} method instead.
     *
     * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
     * functionally equivalent to a **note off** message.
     *
     * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
     * specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a
     * {@link Note} object or an array of the previous types.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
     * `1`).  If the `rawAttack` option is also defined, `rawAttack` will have priority. An invalid
     * velocity value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawAttack=64] The velocity at which to release the note (between `0`
     * and `127`). If the `attack` option is also defined, `rawAttack` will have priority. An invalid
     * velocity value will silently trigger the default of `64`.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendNoteOn(note: number | string | Note | number[] | string[] | Note[], options?: {
        time?: number | string;
        attack?: number;
        rawAttack?: number;
    }): OutputChannel;
    /**
     * Sends a MIDI **channel mode** message. The channel mode message to send can be specified
     * numerically or by using one of the following common names:
     *
     *   * `"allsoundoff"` (#120)
     *   * `"resetallcontrollers"` (#121)
     *   * `"localcontrol"` (#122)
     *   * `"allnotesoff"` (#123)
     *   * `"omnimodeoff"` (#124)
     *   * `"omnimodeon"` (#125)
     *   * `"monomodeon"` (#126)
     *   * `"polymodeon"` (#127)
     *
     * It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may
     * require a value that's not zero. For that reason, the `value` parameter is optional and
     * defaults to 0.
     *
     * To make it easier, all channel mode messages have a matching helper method:
     *
     *   - [turnSoundOff()]{@link Output#turnSoundOff}
     *   - [resetAllControllers()]{@link Output#resetAllControllers}
     *   - [setLocalControl()]{@link Output#turnSoundOff}
     *   - [turnNotesOff()]{@link Output#turnNotesOff}
     *   - [setOmniMode()]{@link Output#setOmniMode}
     *   - [setPolyphonicMode()]{@link Output#setPolyphonicMode}
     *
     * @param command {number|string} The numerical identifier of the channel mode message (integer
     * between 120-127) or its name as a string.
     *
     * @param value {number} The value to send (integer between 0-127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendChannelMode(command: number | string, value: number, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sets OMNI mode to `"on"` or `"off"`. MIDI's OMNI mode causes the instrument to respond to
     * messages from all channels.
     *
     * It should be noted that support for OMNI mode is not as common as it used to be.
     *
     * @param [state=true] {boolean} Whether to activate OMNI mode (`true`) or not (`false`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @throws {TypeError} Invalid channel mode message name.
     * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
     * @throws {RangeError} Value must be an integer between 0 and 127.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setOmniMode(state?: boolean, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends a MIDI **channel aftertouch** message. For key-specific aftertouch, you should instead
     * use [setKeyAftertouch()]{@link Output#setKeyAftertouch}.
     *
     * @param [pressure] {number} The pressure level (between 0 and 1). If the `rawValue` option is
     * set to `true`, the pressure can be defined by using an integer between 0 and 127.
     *
     * @param {Object} [options={}]
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered a float between 0 and 1.0 (default) or a raw integer between 0 and 127.
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     *
     * @throws RangeError Invalid channel aftertouch value.
     */
    setChannelAftertouch(pressure?: number, options?: {
        rawValue?: boolean;
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends a **master tuning** message. The value is decimal and must be larger than -65 semitones
     * and smaller than 64 semitones.
     *
     * Because of the way the MIDI specification works, the decimal portion of the value will be
     * encoded with a resolution of 14bit. The integer portion must be between -64 and 63
     * inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
     * a **Master Fine Tuning** RPN messages.
     *
     * @param [value=0.0] {number} The desired decimal adjustment value in semitones (-65 < x < 64)
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @throws {RangeError} The value must be a decimal number between larger than -65 and smaller
     * than 64.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setMasterTuning(value?: number, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends a **modulation depth range** message to adjust the depth of the modulation wheel's range.
     * The range can be specified with the `semitones` parameter, the `cents` parameter or by
     * specifying both parameters at the same time.
     *
     * @param {number} semitones The desired adjustment value in semitones (integer between 0 and
     * 127).
     *
     * @param {number} [cents=0] The desired adjustment value in cents (integer between 0 and 127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setModulationRange(semitones: number, cents?: number, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sets a non-registered parameter (NRPN) to the specified value. The NRPN is selected by passing
     * in a two-position array specifying the values of the two control bytes. The value is specified
     * by passing in a single integer (most cases) or an array of two integers.
     *
     * NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
     * they see fit. For example, according to the Roland GS specification, you can control the
     * **vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
     * would use:
     *
     * ```js
     * WebMidi.outputs[0].channels[0].setNonRegisteredParameter([1, 8], 123);
     * ```
     *
     * In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
     * would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
     * uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
     * value to send was 10, you could use:
     *
     * ```js
     * WebMidi.outputs[0].channels[0].setNonRegisteredParameter([2, 63], [0, 10]);
     * ```
     *
     * For further implementation details, refer to the manufacturer's documentation.
     *
     * @param parameter {number[]} A two-position array specifying the two control bytes (0x63,
     * 0x62) that identify the non-registered parameter.
     *
     * @param [data=[]] {number|number[]} An integer or an array of integers with a length of 1 or 2
     * specifying the desired data.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @throws {RangeError} The control value must be between 0 and 127.
     * @throws {RangeError} The msb value must be between 0 and 127
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setNonRegisteredParameter(nrpn: any, data?: number | number[], options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends a MIDI **pitch bend** message at the scheduled time.
     *
     * @param {number|number[]} [value] The intensity of the bend (between -1.0 and 1.0). A value of
     * zero means no bend. The resulting bend is relative to the pitch bend range that has been
     * defined. The range can be set with [setPitchBendRange()]{@link OutputChannel#setPitchBendRange}
     * . So, for example, if the pitch bend range has been set to 12 semitones, using a bend value of
     * -1 will bend the note 1 octave below its nominal value.
     *
     * If the `rawValue` option is set to `true`, the intensity of the bend can be defined by either
     * using a single integer between 0 and 127 (MSB) or an array of two integers between 0 and 127
     * representing, respectively, the MSB (most significant byte) and the LSB (least significant
     * byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower than `64`
     * bends downwards while a value higher than `64` bends upwards. The LSB is expressed in cents
     * (1/100 of a semitone). An LSB of `64` also means no bend.
     *
     * @param {Object} [options={}]
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or
     * an array of 2 integers if using both MSB and LSB).
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setPitchBend(value?: number | number[], options?: {
        rawValue?: boolean;
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
     * adjust the range used by their pitch bend lever. The range is specified by using the
     * `semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
     * means that the pitch bend range will be 12 semitones above and below the nominal pitch.
     *
     * @param semitones {number} The desired adjustment value in semitones (between 0 and 127). While
     * nothing imposes that in the specification, it is very common for manufacturers to limit the
     * range to 2 octaves (-12 semitones to 12 semitones).
     *
     * @param [cents=0] {number} The desired adjustment value in cents (integer between 0-127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @throws {RangeError} The msb value must be between 0 and 127.
     * @throws {RangeError} The lsb value must be between 0 and 127.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setPitchBendRange(semitones: number, cents?: number, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends a MIDI **program change** message at the scheduled time.
     *
     * **Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
     * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
     * that use a numbering scheme starting at 1.
     *
     * @param [program=1] {number} The MIDI patch (program) number (1-128)
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
     * than 0xFF.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     *
     */
    setProgram(program?: number, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sets the specified MIDI registered parameter to the desired value. The value is defined with
     * up to two bytes of data (msb, lsb) that each can go from 0 to 127.
     *
     * MIDI
     * [registered parameters]
     * (https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
     * extend the original list of control change messages. The MIDI 1.0 specification lists only a
     * limited number of them. Here are the original registered parameters with the identifier that
     * can be used as the first parameter of this function:
     *
     *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
     *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
     *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
     *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
     *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
     *  * Modulation Range (0x00, 0x05): `"modulationrange"`
     *
     * Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
     * Standard*, which is not widely implemented.
     *
     * Another set of extra parameters have been later added for 3D sound controllers. They are:
     *
     *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
     *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
     *  * Gain (0x3D, 0x02): `"gain"`
     *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
     *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
     *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
     *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
     *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
     *  * Roll Angle (0x3D, 0x08): `"rollangle"`
     *
     * @param parameter {string|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the
     * registered parameter.
     *
     * @param [data=[]] {number|number[]} An single integer or an array of integers with a maximum
     * length of 2 specifying the desired data.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setRegisteredParameter(rpn: any, data?: number | number[], options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
     * *MIDI Tuning Standard*, which is not widely implemented.
     *
     * **Note**: since version 3.0, the bank number is an integer between 1 and 128. In versions
     * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
     * that use a numbering scheme starting at 1.
     *
     * @param value {number} The desired tuning bank (1-128).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @throws {RangeError} The bank value must be between 1 and 128.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setTuningBank(value: number, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
     * *MIDI Tuning Standard*, which is not widely implemented.
     *
     * **Note**: since version 3.0, the program number is an integer between 1 and 128. In versions
     * 1.0 and 2.0, the number was between 0 and 127. This change aligns WebMidi.js with most devices
     * that use a numbering scheme starting at 1.
     *
     * @param value {number} The desired tuning program (1-128).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @throws {RangeError} The program value must be between 1 and 128.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setTuningProgram(value: number, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Turns local control on or off. Local control is usually enabled by default. If you disable it,
     * the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
     * its out port.
     *
     * @param [state=false] {boolean} Whether to activate local control (`true`) or disable it
     * (`false`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setLocalControl(state?: boolean, options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends an **all notes off** channel mode message. This will make all currently playing notes
     * fade out just as if their key had been released. This is different from the
     * [turnSoundOff()]{@link OutputChannel#turnSoundOff} method which mutes all sounds immediately.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    turnNotesOff(options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends an **all sound off** channel mode message. This will silence all sounds playing on that
     * channel but will not prevent new sounds from being triggered.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    turnSoundOff(options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sends a **reset all controllers** channel mode message. This resets all controllers, such as
     * the pitch bend, to their default value.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    resetAllControllers(options?: {
        time?: number | string;
    }): OutputChannel;
    /**
     * Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
     * and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
     * multiple notes are being played.
     *
     * @param {string} [mode=poly] The mode to use: `"mono"` or `"poly"`.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
     * will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    setPolyphonicMode(mode?: string, options?: {
        time?: number | string;
    }): OutputChannel;
    set octaveOffset(arg: number);
    /**
     * An integer to offset the reported octave of outgoing note-specific messages (`noteon`,
     * `noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
     * octave (C4).
     *
     * Note that this value is combined with the global offset value defined on the `WebMidi` object
     * and with the value defined on the parent `Output` object.
     *
     * @type {number}
     *
     * @since 3.0
     */
    get octaveOffset(): number;
    /**
     * The parent {@link Output} this channel belongs to
     * @type {Output}
     * @since 3.0
     */
    get output(): Output;
    /**
     * This channel's MIDI number (1-16)
     * @type {number}
     * @since 3.0
     */
    get number(): number;
}
declare class t {
    constructor(t: any, n: any, r: any, i?: {}, ...args: any[]);
    event: any;
    target: any;
    callback: any;
    context: any;
    remaining: number;
    count: number;
    arguments: any;
    suspended: boolean;
    remove(): void;
}
export { utils as Utilities, wm as WebMidi };
