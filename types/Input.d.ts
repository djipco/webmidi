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
export class Input {
    constructor(midiInput: any);
    /**
     * Reference to the actual MIDIInput object
     * @private
     */
    private _midiInput;
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
     * Opens the input for usage.
     *
     * @returns {Promise<Input>} The promise is fulfilled with the `Input`
     */
    open(): Promise<Input>;
    /**
     * Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
     * the input is opened again by calling [Input.open()]{@link Input#open}.
     *
     * @returns {Promise<void|*>}
     */
    close(): Promise<void | any>;
    /**
     * @private
     * @deprecated since v3.0.0 (moved to 'InputChannel' class)
     */
    private getChannelModeByNumber;
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
     *    * [channelmode]{@link InputChannel#event:channelmode}
     *    * To be completed...
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
    addListener(event: string, listener: Function, options?: {
        arguments?: any[];
        channels?: number | number[];
        context?: any;
        duration?: number;
        prepend?: boolean;
        remaining?: boolean;
    }): any[];
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
     *    * [channelmode]{@link InputChannel#event:channelmode}
     *    * To be completed...
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
    addOneTimeListener(event: string, listener: Function, options?: {
        arguments?: any[];
        channels?: number | number[];
        context?: any;
        duration?: number;
        prepend?: boolean;
    }): any[];
    /**
     * This is an alias to the [Input.addListener()]{@link Input#addListener} method.
     * @since 2.0.0
     * @deprecated since v3.0
     * @private
     */
    private on;
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
    hasListener(event: string, listener: Function, options?: {
        channels?: number | number[];
    }): boolean;
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
    removeListener(event: any, listener?: Function, options?: {
        channels?: number | number[];
        context?: any;
        remaining?: number;
    }): any;
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
import { InputChannel } from "./InputChannel.js";
