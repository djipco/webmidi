export { wm as WebMidi };
export { Note } from "./Note.js";
declare const wm: WebMidi;
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
 * @fires WebMidi#disconnected
 * @fires WebMidi#enabled
 * @fires WebMidi#disabled
 *
 * @extends EventEmitter
 */
declare class WebMidi {
    /**
     * The `MIDIAccess` instance used to talk to the Web MIDI API. This should not be used directly
     * unless you know what you are doing.
     *
     * @type {?MIDIAccess}
     * @readonly
     */
    readonly interface: any;
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
     *
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
     * software synths has not yet been implemented in any browser (as of April 2020).
     *
     * There are 3 ways to execute code after `WebMidi` has been enabled:
     *
     * - Pass a callback function in the options
     * - Listen to the `enabled` event
     * - Wait for the promise to resolve
     *
     * In order, this is what happens towards the end of the enabling process:
     *
     * 1. callback is executed
     * 2. `enabled` event is triggered
     * 3. `connected` events from available inputs and outputs are triggered
     * 4. promise is resolved
     *
     * The promise is fulfilled with an object containing two properties (`inputs` and `outputs`) that
     * contain arrays of available inputs and outputs, respectively.
     *
     * **Important note**: starting with Chrome v77, a page using Web MIDI API must be hosted on a
     * secure origin (`https://`, `localhost` or `file:///`) and the user will always be prompted to
     * authorize the operation (no matter if the `sysex` option is `true` or not).
     *
     * ##### Examples
     * ```js
     * // Enabling WebMidi and using the promise
     * WebMidi.enable().then(ports => {
     *   console.log("WebMidi.js has been enabled!");
     *   console.log("Inputs: ", ports.inputs);
     *   console.log("Outputs: ", ports.outputs);
     * })
     * ```
     *
     * ```js
     * // Enabling WebMidi and listening to 'enabled' event
     * WebMidi.addListener("enabled", e => {
     *   console.log("WebMidi.js has been enabled!");
     * });
     * WebMidi.enable();
     * ```
     *
     * ```js
     * // Enabling WebMidi and using callback function
     * WebMidi.enable({callback: e => {
     *   console.log("WebMidi.js has been enabled!");
     * });
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
     * @returns {Promise<Object>} The promise is fulfilled with an object containing two properties
     * (`inputs` and `outputs`) that contain arrays of available inputs and outputs, respectively.
     *
     * @throws Error The Web MIDI API is not supported in your environment.
     * @throws Error Jazz-Plugin must be installed to use WebMIDIAPIShim.
     */
    enable(options?: {
        callback?: Function;
        sysex?: boolean;
        validation?: boolean;
        software?: boolean;
    }, sysex?: boolean): Promise<any>;
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
     * Returns a MIDI note number matching the note name passed in the form of a string parameter. The
     * note name must include the octave number. The name can also optionally include a sharp (#),
     * a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
     * names: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.
     *
     * When converting note names to numbers, C4 is considered to be middle C (MIDI note number 60) as
     * per the scientific pitch notation standard.
     *
     * The resulting note number is offset by the [octaveOffset]{@link WebMidi#octaveOffset} value (if
     * not zero). For example, if you pass in "C4" and the [octaveOffset]{@link WebMidi#octaveOffset}
     * value is 2, the resulting MIDI note number will be 36.
     *
     * **Note**: since v3.x, this function returns `false` instead of throwing an error when it cannot
     * parse the name to a number.
     *
     * @param name {string} The name of the note in the form of a letter, followed by an optional "#",
     * "##", "b" or "bb" followed by the octave number.
     *
     * @returns {number|false} The MIDI note number (an integer between 0 and 127) or `false` if the
     * name could not successfully be parsed to a number.
     */
    getNoteNumberByName(name: string): number | false;
    /**
     * @private
     * @deprecated since version 3.0. Use getNoteNumberByName() instead.
     */
    private noteNameToNumber;
    /**
     * Returns the octave number for the specified MIDI note number (0-127). By default, the value is
     * based on middle C (note number 60) being placed on the 4th octave (C4). However, by using the
     * [octaveOffset]{@link WebMidi#octaveOffset} property, you can offset the result as desired.
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
    sanitizeChannels(channel?: number | number[]): any[];
    /**
     * @private
     * @deprecated since version 3.0. Use sanitizeChannels() instead.
     */
    private toMIDIChannels;
    /**
     * Returns a valid MIDI note number (0-127) given the specified input. The parameter usually is a
     * string containing a note name (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer between 0
     * and 127 is passed, it will simply be returned as is (for convenience). Other strings will be
     * parsed for integer, if possible.
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
    guessNoteNumber(input: string | number): number | false;
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
    getValidNoteArray(notes?: number | string | Note | number[] | string[] | Note[], options?: {
        duration?: number;
        attack?: number;
        release?: number;
        rawAttack?: number;
        rawRelease?: number;
    }): Note[];
    /**
     * Converts the `note` parameter to a valid {@link Note} object. The input usually is an unsigned
     * integer (0-127) or a note name (`"C4"`, `"G#5"`, etc.). If the input is a {@link Note} object,
     * it will be returned as is.
     *
     * If the input is a note number or name, it is possible to specify options by providing the
     * optional `options` parameter.
     *
     * An error is thrown for invalid input.
     *
     * @param [notes] {number|string|Note}
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
     * @returns {Note}
     *
     * @throws TypeError The input could not be parsed as a note
     */
    getNoteObject(note: any, options?: {
        duration?: number;
        attack?: number;
        release?: number;
        rawAttack?: number;
        rawRelease?: number;
    }): Note;
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
    convertToTimestamp(time?: number | string): number | false;
    /**
     *
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
     * An integer to offset the octave both in inbound and outbound messages. By default, middle C
     * (MIDI note number 60) is placed on the 4th octave (C4).
     *
     * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
     * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
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
import { Input } from "./Input.js";
import { Output } from "./Output.js";
import { Note } from "./Note.js";
