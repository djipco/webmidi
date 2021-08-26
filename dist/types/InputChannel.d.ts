/**
 * The `InputChannel` class represents a single input MIDI channel (1-16) from a single input
 * device. This object is derived from the host's MIDI subsystem and cannot be instantiated
 * directly.
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
 * @param {Input} input The `Input` this channel belongs to
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
export class InputChannel {
    constructor(input: any, number: any);
    /**
     * The {@link Input} this channel belongs to
     * @type {Input}
     */
    input: any;
    /**
     * This channel's number (1-16)
     * @type {number}
     */
    number: number;
    /**
     * @type {OutputChannel|OutputChannel[]}
     * @private
     */
    private _forwardTo;
    destroy(): void;
    /**
     * @param e Event
     * @protected
     */
    protected _parseEvent(e: any): void;
    getStructuredMidiMessage(data: any): {
        command: number;
        data1: any;
        data2: any;
    };
    /**
     * Parses channel events for standard (non-NRPN) events.
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
     * @returns {string|false} The matching control change name or `false` if not match was found
     *
     * @throws {RangeError} Invalid control change number.
     *
     * @since 2.0.0
     */
    getCcNameByNumber(number: number): string | false;
}
