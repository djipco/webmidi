// Type definitions for WebMidi.js (available since v2.3.0)
// Project: <https://github.com/djipco/webmidi>
// Definitions by: mmmveggies <https://www.github.com/mmmveggies>
//   Largely copied from original JSDoc comments

/** All Input events extend this base event. */
export interface InputEventBase<T extends keyof InputEvents> {
  /** The Input that triggered the event. */
  target: Input

  /** The raw MIDI message as an array of 8 bit values. */
  data: Uint8Array

  /** The time when the event occurred (in milliseconds) */
  timestamp: number

  /** The type of event that occured. */
  type: T
}

/** All Input events that relate to a specific channel extend this event. */
export interface InputEventChannelBase<T extends keyof InputEvents> extends InputEventBase<T> {
  /** The channel where the event occurred (between 1 and 16). */
  channel: number
}

/** The controller `name` and `number` information. */
export interface IEventController {
  /** The usual name or function of the controller. */
  name: string

  /** The number of the controller. */
  number: number
}

/** The note information for a given event. */
export interface IEventNote {
  /** The MIDI note number. */
  number: number

  /** The usual note name (C, C#, D, D#, etc.). */
  name: string

  /** The octave (between -2 and 8). */
  octave: number
}

/** Parameter describing 1-16 midi channels, "all" means all */
export type IMidiChannel = number | number[] | "all"

/**
 * A description of a note, used in method parameters.
 * Strings can be name with octaves e.g. "A#5" and numbers
 * are midi ints e.g. middle C is 60
 */
export type INoteParam = number | string | Array<number | string>


/** Event emitted when a system active sensing MIDI message has been received. */
export type InputEventActivesensing = InputEventBase<"activesensing">

/**
 * Event emitted when a channel-wide aftertouch MIDI message has been received on a specific
 * device and channel.
 */
export interface InputEventChannelaftertouch extends InputEventChannelBase<"channelaftertouch"> {
  /** The aftertouch value received (between 0 and 1). */
  value: number
}

/**
 * Event emitted when a channel mode MIDI message has been received on a
 * specific device and channel.
 */
export interface InputEventChannelmode extends InputEventChannelBase<"channelmode"> {
  /** The controller `name` and `number` information. */
  controller: IEventController

  /** The value received (between 0 and 127). */
  value: number
}

/** Event emitted when a system timing clock MIDI message has been received. */
export type InputEventClock = InputEventBase<"clock">

/** Event emitted when a system continue MIDI message has been received. */
export type InputEventContinue = InputEventBase<"continue">

/**
 * Event emitted when a control change MIDI message has been received
 * on a specific device and channel.
 */
export interface InputEventControlchange extends InputEventChannelBase<"controlchange"> {
  /** The controller `name` and `number` information. */
  controller: IEventController

  /** The value received (between 0 and 127). */
  value: number
}

/** Event emitted when a key-specific aftertouch MIDI message has been received on a specific
          device and channel. */
export interface InputEventKeyaftertouch extends InputEventChannelBase<"keyaftertouch"> {
  /** The note information for a given event. */
  note: IEventNote

  /** The aftertouch amount (between 0 and 1). */
  value: number
}

/**
 * Event emitted when a MIDI message is received.
 * This should be used primarily for debugging purposes.
 */
export type InputEventMidimessage = InputEventBase<"midimessage">

/**
 * Event emitted when a note off MIDI message has been received on a
 * specific device and channel.
 */
export interface InputEventNoteoff extends InputEventChannelBase<"noteoff"> {
  /** The note information for a given event. */
  note: IEventNote

  /** The release velocity (between 0 and 1). */
  velocity: number

  /** The attack velocity expressed as a 7-bit integer (between 0 and 127). */
  rawVelocity: number
}

/**
 * Event emitted when a note on MIDI message has been received on a
 * specific device and channel.
 */
export interface InputEventNoteon extends InputEventChannelBase<"noteon"> {
  /** The note information for a given event. */
  note: IEventNote

  /** The attack velocity (between 0 and 1). */
  velocity: number

  /** The attack velocity expressed as a 7-bit integer (between 0 and 127). */
  rawVelocity: number
}

/**
 * Event emitted when a pitch bend MIDI message has been received on a
 * specific device and channel.
 */
export interface InputEventPitchbend extends InputEventChannelBase<"pitchbend"> {
  /** The pitch bend value received (between -1 and 1). */
  value: number
}

/**
 * Event emitted when a program change MIDI message has been received on a
 * specific device and channel.
 */
export interface InputEventProgramchange extends InputEventChannelBase<"programchange"> {
  /** The value received (between 0 and 127). */
  value: number
}

/** Event emitted when a system reset MIDI message has been received. */
export type InputEventReset = InputEventBase<"reset">

/** Event emitted when a system song position pointer MIDI message has been received. */
export type InputEventSongposition = InputEventBase<"songposition">

/** Event emitted when a system song select MIDI message has been received. */
export interface InputEventSongselect extends InputEventBase<"songselect"> {
  /** Song (or sequence) number to select. */
  song: string
}

/** Event emitted when a system start MIDI message has been received. */
export type InputEventStart = InputEventBase<"start">

/** Event emitted when a system stop MIDI message has been received. */
export type InputEventStop = InputEventBase<"stop">

/**
 * Event emitted when a system exclusive MIDI message has been received.
 * You should note that, to receive `sysex` events,
 * you must call the `WebMidi.enable()` method with a second parameter set to `true`:
 * 
 *      WebMidi.enable(function(err) {
 *        if (err) {
 *          console.log("WebMidi could not be enabled.");
 *        }
 *        var input = WebMidi.inputs[0];
 *        input.addListener("sysex", "all", function (e) {
 *          console.log(e);
 *        });
 *      }, true);
 **/
export type InputEventSysex = InputEventBase<"sysex">

/** Event emitted when a system MIDI time code quarter frame message has been received. */
export type InputEventTimecode = InputEventBase<"timecode">

/** Event emitted when a system tune request MIDI message has been received. */
export type InputEventTuningrequest = InputEventBase<"tuningrequest">

/**
 * Event emitted when an unknown system MIDI message has been received.
 * It could be, for example, one of the undefined/reserved messages.
 */
export type InputEventUnknownsystemmessage = InputEventBase<"unknownsystemmessage">

/** All events one can listen to on an `Input`. */
export interface InputEvents {
  activesensing: InputEventActivesensing
  channelaftertouch: InputEventChannelaftertouch
  channelmode: InputEventChannelmode
  clock: InputEventClock
  continue: InputEventContinue
  controlchange: InputEventControlchange
  keyaftertouch: InputEventKeyaftertouch
  midimessage: InputEventMidimessage
  noteoff: InputEventNoteoff
  noteon: InputEventNoteon
  pitchbend: InputEventPitchbend
  programchange: InputEventProgramchange
  reset: InputEventReset
  songposition: InputEventSongposition
  songselect: InputEventSongselect
  start: InputEventStart
  stop: InputEventStop
  sysex: InputEventSysex
  timecode: InputEventTimecode
  tuningrequest: InputEventTuningrequest
  unknownsystemmessage: InputEventUnknownsystemmessage
}

/**
 * Generic description of a MIDI port
 */
export interface MidiPort<T extends "input" | "output" = "input" | "output"> {
  /** Status of the MIDI port's connection */
  readonly connection: "pending" | "open" | "closed"

  /**
   * ID string of the MIDI port. The ID is host-specific.
   * Do not expect the same ID on different platforms.
   * For example, Google Chrome and the Jazz-Plugin report
   * completely different IDs for the same port.
   */
  readonly id: string

  /**
   * Name of the manufacturer of the device that makes this port available.
   */
  readonly manufacturer: string

  /** Name of the MIDI port */
  readonly name: string

  /** State of the MIDI port */
  readonly state: "connected" | "disconnected"

  /** Type of the MIDI port */
  readonly type: T
}


/**
 * List of valid MIDI channel messages and matching hexadecimal values.
 */
export interface MidiChannelMessages {
  noteoff: 0x8
  noteon: 0x9
  keyaftertouch: 0xA
  controlchange: 0xB
  channelmode: 0xB
  programchange: 0xC
  channelaftertouch: 0xD
  pitchbend: 0xE
}

/**
 * Event emitted when a MIDI port becomes available. This event is typically fired whenever a
 * MIDI device is plugged in. Please note that it may fire several times if a device possesses
 * multiple input/output ports.
 */
export interface WebMidiEventConnected {
  /** The timestamp when the event occurred (in milliseconds since the epoch) */
  timestamp: number

  /** The type of event that occurred */
  type: "connected"

  /** The actual `Input` or `Output` object associated to the event. */
  port: Input | Output
}

/**
 * Event emitted when a MIDI port becomes unavailable. This event is typically fired whenever a
 * MIDI device is unplugged. Please note that it may fire several times if a device possesses
 * multiple input/output ports.
 */
export interface WebMidiEventDisconnected {
  /** The timestamp when the event occurred (in milliseconds since the epoch) */
  timestamp: number

  /** The type of event that occurred */
  type: "disconnected"

  /** An generic object containing details about the port that triggered the event. */
  port: MidiPort
}

/** All possible events that `WebMidi` itself can be set up to listen for */
export interface WebMidiEvents {
  connected: WebMidiEventConnected
  disconnected: WebMidiEventDisconnected
}

/**
 * List of valid MIDI registered parameters and their matching pair of hexadecimal
 * values. MIDI registered parameters extend the original list of control change messages.
 * Currently, there are only a limited number of them.
 */
export interface MidiRegisteredParameters {
  pitchbendrange: [0x00, 0x00]
  channelfinetuning: [0x00, 0x01]
  channelcoarsetuning: [0x00, 0x02]
  tuningprogram: [0x00, 0x03]
  tuningbank: [0x00, 0x04]
  modulationrange: [0x00, 0x05]
  azimuthangle: [0x3D, 0x00]
  elevationangle: [0x3D, 0x01]
  gain: [0x3D, 0x02]
  distanceratio: [0x3D, 0x03]
  maximumdistance: [0x3D, 0x04]
  maximumdistancegain: [0x3D, 0x05]
  referencedistanceratio: [0x3D, 0x06]
  panspreadangle: [0x3D, 0x07]
  rollangle: [0x3D, 0x08]
}

/**
 * List of MIDI channel mode messages as defined in the official MIDI
 * specification.
 */
export interface MidiChannelModeMessages {
  allsoundoff: 120
  resetallcontrollers: 121
  localcontrol: 122
  allnotesoff: 123
  omnimodeoff: 124
  omnimodeon: 125
  monomodeon: 126
  polymodeon: 127
}

/**
 * List of MIDI control change messages
 *
 * Valid MIDI registered parameters and their matching pair of hexadecimal
 * values. MIDI registered parameters extend the original list of control change messages.
 * Currently, there are only a limited number of them.
 */
export interface MidiControlChangeMessages {
  bankselectcoarse: 0
  modulationwheelcoarse: 1
  breathcontrollercoarse: 2
  footcontrollercoarse: 4
  portamentotimecoarse: 5
  dataentrycoarse: 6
  volumecoarse: 7
  balancecoarse: 8
  pancoarse: 10
  expressioncoarse: 11
  effectcontrol1coarse: 12
  effectcontrol2coarse: 13
  generalpurposeslider1: 16
  generalpurposeslider2: 17
  generalpurposeslider3: 18
  generalpurposeslider4: 19
  bankselectfine: 32
  modulationwheelfine: 33
  breathcontrollerfine: 34
  footcontrollerfine: 36
  portamentotimefine: 37
  dataentryfine: 38
  volumefine: 39
  balancefine: 40
  panfine: 42
  expressionfine: 43
  effectcontrol1fine: 44
  effectcontrol2fine: 45
  holdpedal: 64
  portamento: 65
  sustenutopedal: 66
  softpedal: 67
  legatopedal: 68
  hold2pedal: 69
  soundvariation: 70
  resonance: 71
  soundreleasetime: 72
  soundattacktime: 73
  brightness: 74
  soundcontrol6: 75
  soundcontrol7: 76
  soundcontrol8: 77
  soundcontrol9: 78
  soundcontrol10: 79
  generalpurposebutton1: 80
  generalpurposebutton2: 81
  generalpurposebutton3: 82
  generalpurposebutton4: 83
  reverblevel: 91
  tremololevel: 92
  choruslevel: 93
  celestelevel: 94
  phaserlevel: 95
  databuttonincrement: 96
  databuttondecrement: 97
  nonregisteredparametercoarse: 98
  nonregisteredparameterfine: 99
  registeredparametercoarse: 100
  registeredparameterfine: 101
}

/**
 * List of valid MIDI system messages and matching hexadecimal values.
 *
 * Note: values 249 and 253 are actually dispatched by the Web MIDI API but I do not know what
 * they are used for. They are not part of the online
 * [MIDI 1.0 spec](http://www.midi.org/techspecs/midimessages.php).
 */
export interface MidiSystemMessages {
  // System common messages
  sysex: 0xF0
  timecode: 0xF1
  songposition: 0xF2
  songselect: 0xF3
  tuningrequest: 0xF6

  /** never actually received - simply ends a sysex */
  sysexend: 0xF7

  // System real-time messages
  clock: 0xF8
  start: 0xFA
  continue: 0xFB
  stop: 0xFC
  activesensing: 0xFE
  reset: 0xFF

  // Custom WebMidi.js messages
  midimessage: 0
  unknownsystemmessage: -1
}

/**
 * All `Output` methods that have an `options` parameter
 * derive from this base interface
 */
export interface OutputBaseOptions {
  /**
   * This value can be one of two things. 
   * If the value is a string starting with the + sign and followed by a number,
   * the request will be delayed by the specified number (in milliseconds).
   * Otherwise, the value is considered a timestamp and the request will
   * be scheduled at that timestamp.
   * 
   * The `DOMHighResTimeStamp` value is relative to the navigation start of the document.
   * To retrieve the current time, you can use `WebMidi.time`.
   * If time is not present or is set to a time in the past,
   * the request is to be sent as soon as possible.
   */
  time?: DOMHighResTimeStamp | string
}

/**
 * The `Input` object represents a MIDI input port on the host system.
 * This object is created by the MIDI subsystem and cannot be instantiated directly.
 * You will find all available `Input` objects in the `WebMidi.inputs` array.
 */
export interface Input extends MidiPort<"input"> {
  /**
   * Adds an event listener to the Input that will trigger a function
   * callback when the specified event happens.
   * The events that are dispatched can be channel-specific or Input-wide.
   * 
   * Channel-specific MIDI events:
   *   noteoff, noteon, keyaftertouch, controlchange, channelmode,
   *   programchange, channelaftertouch, pitchbend
   * 
   * Input-wide MIDI events:
   *   sysex, timecode, songposition, songselect, tuningrequest,
   *   clock, start, continue, stop, activesensing, reset,
   *   midimessage, unknownsystemmessage
   * 
   * For device-wide events, the channel parameter will be silently ignored.
   * You can simply use `undefined` in that case.
   * 
   * If you want to view all incoming MIDI traffic,
   * you can listen to the input-wide `"midimessage"` event.
   * This event is dispatched for every single message that is received on that input.
   * 
   * @param type - The type of the event.
   * @param channel - The MIDI channel to listen on (integer between 1 and 16).
   * You can also specify an array of channel numbers or the value "all"
   * (or leave it undefined for input-wide events).
   * @param listener A callback function to execute when the specified event is detected.
   * @returns the WebMidi object so methods can be chained.
   */
  addListener<T extends keyof InputEvents>(
    type: T,
    channel: IMidiChannel | undefined,
    listener: (event: InputEvents[T]) => void
  ): Input

  /** Alias for `addListener` */
  on<T extends keyof InputEvents>(
    type: T,
    channel: IMidiChannel | undefined,
    listener: (event: InputEvents[T]) => void
  ): Input

  /**
   * Returns the name of a control change message matching the specified number.
   * If no match is found, the function returns `undefined`.
   * @param number The number of the control change message.
   * @returns The matching control change name or `undefined`.
   * @throws {RangeError} The control change number must be between 0 and 119.
   */
  getCcNameByNumber(number: number): string | undefined


  /**
   * Returns the channel mode name matching the specified number.
   * If no match is found, the function returns undefined.
   * @param number The number of the channel mode message.
   * @returns The matching channel mode message's name or `undefined`.
   * @throws {RangeError} The channel mode number must be between 120 and 127.
   */
  getChannelModeByNumber(number: number): string | undefined

  /**
   * Checks if the specified event type is already defined to 
   * trigger the listener function on the specified channel(s).
   * If more than one channel is specified, the function will
   * return true only if all channels have the listener defined.
   * 
   * For device-wide events (sysex, start, etc.), the channel parameter
   * is silently ignored. We suggest you use `undefined` in such cases.
   * @param type The type of event.
   * @param channel The MIDI channel to check on (between 1 and 16).
   * You can also specify an array of channel numbers or the string "all".
   * @param listener The callback function to check for.
   * @returns Boolean value indicating whether or not the channel(s)
   * already have this listener defined.
   */
  hasListener<T extends keyof InputEvents>(
    type: T,
    channel: IMidiChannel,
    listener: (event: InputEvents[T]) => void
  ): boolean

  /**
   * Removes the specified listener from the specified channel(s).
   * If the `listener` parameter is left undefined,
   * all listeners for the specified type will be removed from all channels.
   * If the `channel` is also omitted,
   * all listeners of the specified type will be removed from all channels.
   * If no parameters are defined, all listeners attached to any channel of the Input will be removed.
   * 
   * For device-wide events (sysex, start, etc.), the channel parameter is silently ignored.
   * You can use `undefined` in such cases.
   * @param type The type of event.
   * @param channel The MIDI channel to check on (between 1 and 16).
   * You can also specify an array of channel numbers or the string "all".
   * @param listener The callback function to check for.
   * @returns The `Input` object for easy method chaining.
   */
  removeListener<T extends keyof InputEvents>(
    type?: T,
    channel?: IMidiChannel,
    listener?: (event: InputEvents[T]) => void
  ): Input
}

/**
 * The Output object represents a MIDI output port on the host system.
 * This object is created by the MIDI subsystem and cannot be instantiated directly.
 * You will find all available `Output` objects in the `WebMidi.outputs` array.
 */
export interface Output extends MidiPort<"output"> {
  /**
   * Decrements the specified MIDI registered parameter by 1. For more specific MIDI usage
   * information, check out [RP-18](http://dev.midi.org/techspecs/rp18.php) regarding the usage of
   * increment and decrement controllers.
   *
   * >Unless you are very familiar with the MIDI standard you probably should favour one of the
   * >simpler to use functions such as: `setPitchbendRange()`, `setModulationRange()`,
   * >`setMasterTuning()`, etc.
   *
   * 
   * See `WebMidi.MIDI_REGISTER_PARAMETERS` for a full list of parameter names that can be used.
   *
   * @param parameter A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @throws Error The specified parameter is not available.
   *
   * @returns Returns the `Output` object so methods can be chained.
   */
  decrementRegisteredParameter(
    parameter: keyof MidiRegisteredParameters | [number, number],
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Increments the specified MIDI registered parameter by 1. For more specific MIDI usage
   * information, check out [RP-18](http://dev.midi.org/techspecs/rp18.php) regarding the usage of
   * increment and decrement controllers.
   *
   * >Unless you are very familiar with the MIDI standard you probably should favour one of the
   * >simpler to use functions such as: `setPitchbendRange()`, `setModulationRange()`,
   * >`setMasterTuning()`, etc.
   *
   * 
   * See `WebMidi.MIDI_REGISTER_PARAMETERS` for a full list of parameter names that can be used.
   *
   * @param parameter A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @throws Error The specified parameter is not available.
   *
   * @returns {Output} Returns the `Output` object so methods can be chained.
   */
  incrementRegisteredParameter(
    parameter: keyof MidiRegisteredParameters | [number, number],
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Requests the playback of a single note or multiple notes on the specified channel(s). You can
   * delay the execution of the **note on** command by using the `time` property of the `options`
   * parameter (milliseconds).
   *
   * If no duration is specified in the `options`, the note will play until a matching **note off**
   * is sent. If a duration is specified, a **note off** will be automatically sent after said
   * duration.
   *
   * Note: As per the MIDI standard, a **note on** event with a velocity of `0` is considered to be
   * a **note off**.
   *
   * @param note The note(s) you wish to play. The notes can be specified in
   * one of two ways. The first way is by using the MIDI note number (an integer between 0 and 127).
   * The second way is by using the note name followed by the octave (C3, G#4, F-1, Db7). The octave
   * range should be between -2 and 8. The lowest note is C-2 (MIDI note number 0) and the highest
   * note is G8 (MIDI note number 127). It is also possible to specify an array of note numbers
   * and/or names.
   *
   * @param channel The MIDI channel number (between `1` and `16`) or an
   * array of channel numbers. If the special value **all** is used (default), the message will be
   * sent to all 16 channels.
   *
   * @param options
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  playNote(
    note: INoteParam,
    channel?: IMidiChannel,
    options?: OutputBaseOptions & {
      /**
       * The number of milliseconds (integer) to wait before sending a matching **note off** event.
       * If left undefined, only a **note on** message is sent.
       */
      duration?: number

      /**
       * Controls whether the attack and release velocities are set using integers between
       * `0` and `127` (`true`) or a decimal number between `0` and `1` (`false`, default).
       */
      rawVelocity?: boolean


      /**
       * The velocity at which to release the note (between `0`
       * and `1`). If the `rawVelocity` option is `true`, the value should be specified as an integer
       * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
       * This is only used with the **note off** event triggered when `options.duration` is set.
       */
      release?: number

      /**
       * The velocity at which to play the note (between `0` and
       * `1`). If the `rawVelocity` option is `true`, the value should be specified as an integer
       * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
       */
      velocity?: number
    }
  ): Output

  /**
   * Sends a MIDI message on the MIDI output port, at the scheduled timestamp.
   *
   * Unless, you are familiar with the details of the MIDI message format, you should not use this
   * method directly. Instead, use one of the simpler helper methods: `playNote()`, `stopNote()`,
   * `sendControlChange()`, `sendSystemMessage()`, etc.
   *
   * Details on the format of MIDI messages are available in the
   * [summary of MIDI messages](http://www.midi.org/techspecs/midimessages.php) of the
   * MIDI Manufacturers Association.
   *
   * @param status The MIDI status byte of the message (128-255).
   * @param data An array of uints for the message. The number of data bytes varies
   * depending on the status byte. It is perfectly legal to send no data for some message types (use
   * undefined or an empty array in this case). Each byte must be between 0 and 255.
   * @param timestamp The timestamp at which to send the message. You can
   * use `WebMidi.time` to retrieve the current timestamp. To send immediately, leave blank or use
   * 0.
   *
   * @throws {RangeError} The status byte must be an integer between 128 (0x80) and 255 (0xFF).
   * @throws {RangeError} Data bytes must be integers between 0 (0x00) and 255 (0x7F).
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  send(
    status: number,
    data?: number[],
    timestamp?: DOMHighResTimeStamp
  ): Output

  /**
   * Sends an *Active Sensing* real-time message. This tells the device connected to this port that
   * the connection is still good. Active sensing messages should be sent every 300 ms if there was
   * no other activity on the MIDI port.
   *
   * @param options
   * 
   * @return Returns the `Output` object so methods can be chained.
   */
  sendActiveSensing(options?: OutputBaseOptions): Output

  /**
   * Sends a MIDI `channel aftertouch` message to the specified channel(s). For key-specific
   * aftertouch, you should instead use `sendKeyAftertouch()`.
   *
   * @param pressure The pressure level (between 0 and 1). An invalid pressure value
   * will silently trigger the default behaviour.
   * @param channel The MIDI channel number (between 1 and 16) or
   * an array of channel numbers. If the special value "all" is used, the message will be sent to
   * all 16 channels.
   * @param options
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendChannelAftertouch(
    pressure?: number,
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a MIDI `channel mode` message to the specified channel(s). The channel mode message to send can be specified
   * numerically or by using one of `WebMidi.MIDI_CHANNEL_MODE_MESSAGES`
   *
   * It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may require a value
   * that's not zero. For that reason, the `value` parameter is optional and defaults to 0.
   *
   * @param command The numerical identifier of the channel mode message (integer between 120-127) or
   * its name as a string.
   * @param value The value to send (integer between 0-127).
   * @param channel The MIDI channel number (between 1 and 16) or an array of channel
   * numbers. If the special value "all" is used, the message will be sent to all 16 channels.
   * @param options
   * 
   * @throws {TypeError} Invalid channel mode message name.
   * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
   * @throws {RangeError} Value must be an integer between 0 and 127.
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendChannelMode(
    command: keyof MidiChannelModeMessages | number,
    value?: number,
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a *MIDI Clock* real-time message. According to the standard, there are 24 MIDI Clocks
   * for every quarter note.
   *
   * @param options
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendClock(options?: OutputBaseOptions): Output

  /**
   * Sends a *Continue* real-time message. This resumes song playback where it was previously
   * stopped or where it was last cued with a song position message. To start playback from the
   * start, use the `sendStart()` function.
   *
   * @param options
   *
   * @return Returns the `WebMidi` object so methods can be chained.
   */
  sendContinue(options?: OutputBaseOptions): Output

  /**
   * Sends a MIDI `control change` message to the specified channel(s) at the scheduled time. The
   * control change message to send can be specified numerically or by using one of `WebMidi.MIDI_CONTROL_CHANGE_MESSAGE`
   *
   * Note: as you can see above, not all control change message have a matching common name. This
   * does not mean you cannot use the others. It simply means you will need to use their number
   * instead of their name.
   *
   * To view a list of all available `control change` messages, please consult "Table 3 - Control
   * Change Messages" from the
   * [MIDI Messages](https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
   * specification.
   *
   * @param controller The MIDI controller number (0-119) or name.
   * @param value The value to send (0-127).
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @throws {RangeError} Controller numbers must be between 0 and 119.
   * @throws {RangeError} Value must be between 0 and 127.
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendControlChange(
    controller: keyof MidiControlChangeMessages | number,
    value?: number,
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a MIDI `key aftertouch` message to the specified channel(s) at the scheduled time. This
   * is a key-specific aftertouch. For a channel-wide aftertouch message, use
   * `WebMidi.sendChannelAftertouch()`
   *
   * @param note  The note for which you are sending an aftertouch value. The
   * notes can be specified in one of two ways. The first way is by using the MIDI note number (an
   * integer between 0 and 127). The second way is by using the note name followed by the octave
   * (C3, G#4, F-1, Db7). The octave range should be between -2 and 8. The lowest note is C-2 (MIDI
   * note number 0) and the highest note is G8 (MIDI note number 127). It is also possible to use
   * an array of note names and/or numbers.
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param pressure The pressure level to send (between 0 and 1).
   * @param options
   *
   * @throws {RangeError} The channel must be between 1 and 16.
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendKeyAftertouch(
    note: INoteParam,
    channel?: IMidiChannel,
    pressure?: number,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a MIDI `pitch bend` message to the specified channel(s) at the scheduled time.
   *
   * @param bend The intensity level of the bend (between -1 and 1). A value of zero means
   * no bend.
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @throws {RangeError} Pitch bend value must be between -1 and 1.
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendPitchBend(
    bend: number,
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a MIDI `program change` message to the specified channel(s) at the scheduled time.
   *
   * @param program The MIDI patch (program) number (0-127)
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @throws {RangeError} Program numbers must be between 0 and 127.
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendProgramChange(
    program: number,
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends *Reset* real-time message. This tells the device connected to this port that is should
   * reset itself to a default state.
   *
   * @param options
   *
   * @return  Returns the `Output` object so methods can be chained.
   */
  sendReset(options?: OutputBaseOptions): Output

  /**
   * Sends a *Song Position* MIDI message. The value is expressed in MIDI beats (between 0 and
   * 16383) which are 16th note. Position 0 is always the start of the song.
   *
   * @param value The MIDI beat to cue to (int between 0 and 16383).
   * @param options
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendSongPosition(
    value: number,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a *Song Select* MIDI message. Beware that some devices will display position 0 as
   * position 1 for user-friendlyness.
   *
   * @param value The number of the song to select (integer between 0 and 127).
   *
   * @param options
   *
   * @throws The song number must be between 0 and 127.
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendSongSelect(
    value: number,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a *Start* real-time message. A MIDI Start message starts the playback of the current
   * song at beat 0. To start playback elsewhere in the song, use the `sendContinue()` function.
   *
   * @param options
   * 
   * @return Returns the `Output` object so methods can be chained.
   */
  sendStart(options?: OutputBaseOptions): Output

  /**
   * Sends a *Stop* real-time message. This tells the device connected to this port to stop playback
   * immediately (or at the scheduled time).
   *
   * @param options
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendStop(options?: OutputBaseOptions): Output

  /**
   * Sends a MIDI *system exclusive* (sysex) message. The generated message will automatically be
   * prepended with the *sysex* byte (0xF0) and terminated with the *end of sysex* byte (0xF7).
   *
   * To use the `sendSysex()` method, system exclusive message support must have been enabled. To
   * do so, you must pass `true` as the second parameter to `WebMidi.enable()`:
   *
   *     WebMidi.enable(function (err) {
   *         if (err) {
   *             console.warn(err);
   *         } else {
   *             console.log("Sysex is enabled!");
   *         }
   *     }, true);
   *
   * Note that, depending on browser, version and platform, it may be necessary to serve the page
   * over HTTPS to enable sysex support.
   *
   * #### Examples
   *
   * If you want to send a sysex message to a Korg device connected to the first output, you would
   * use the following code:
   *
   *     WebMidi.outputs[0].sendSysex(0x42, [1, 2, 3, 4, 5]);
   *
   * The above code sends the byte values 1, 2, 3, 4 and 5 to Korg (ID 0x42) devices. Some
   * manufacturers are identified using 3 bytes. In this case, you would use a 3-position array as
   * the first parameter. For example, to send the same sysex message to a *Native Instruments*
   * device:
   *
   *     WebMidi.outputs[0].sendSysex([0x00, 0x21, 0x09], [1, 2, 3, 4, 5]);
   *
   * There is no limit for the length of the data array. However, it is generally suggested to keep
   * system exclusive messages to 64Kb or less.
   *
   * @param manufacturer An unsigned integer or an array of three unsigned integers
   * between 0 and 127 that identify the targeted manufacturer. The *MIDI Manufacturers Association*
   * maintains a full list of
   * [Manufacturer ID Numbers](https://www.midi.org/specifications/item/manufacturer-id-numbers).
   * @param data An array of uints between 0 and 127. This is the data you wish to transfer.
   * @param options
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendSysex(
    manufacturer: number | number[],
    data?: number[],
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a *MIDI Timecode Quarter Frame* message. Please note that no processing is being done on
   * the data. It is up to the developer to format the data according to the
   * [MIDI Timecode](https://en.wikipedia.org/wiki/MIDI_timecode) format.
   *
   * @param value The quarter frame message content (integer between 0 and 127).
   * @param options
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendTimecodeQuarterFrame(
    value: number,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a *MIDI tuning request* real-time message.
   *
   * Note: there is currently a bug in Chrome's MIDI implementation. If you try to use this
   * function, Chrome will actually throw a "Message is incomplete" error. The bug is
   * [scheduled to be fixed](https://bugs.chromium.org/p/chromium/issues/detail?id=610116).
   *
   * @param options
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  sendTuningRequest(options?: OutputBaseOptions): Output

  /**
   * Sends a master tuning message to the specified channel(s). The value is decimal and must be
   * larger than -65 semitones and smaller than 64 semitones.
   *
   * >Because of the way the MIDI specification works, the decimal portion of the value will be
   * >encoded with a resolution of 14bit. The integer portion must be between -64 and 63
   * >inclusively. For those familiar with the MIDI protocol, this function actually generates
   * >**Master Coarse Tuning** and **Master Fine Tuning** RPN messages.
   *
   * @param value The desired decimal adjustment value in semitones (-65 < x < 64)
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @throws {RangeError} The value must be a decimal number between larger than -65 and smaller
   * than 64.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  setMasterTuning(
    value?: number,
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a modulation depth range message to the specified channel(s) so that they adjust the
   * depth of their modulation wheel's range. The range can be specified with the `semitones`
   * parameter, the `cents` parameter or by specifying both parameters at the same time.
   *
   * @param semitones The desired adjustment value in semitones (integer between 0-127).
   * @param cents The desired adjustment value in cents (0-127).
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @throws {RangeError} The semitones value must be between 0 and 127.
   * @throws {RangeError} The cents value must be between 0 and 127.
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  setModulationRange(
    semitones?: number,
    cents?: number,
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sets a non-registered parameter to the specified value. The NRPN is selected by passing in a
   * two-position array specifying the values of the two control bytes. The value is specified by
   * passing in an single integer (most cases) or an array of two integers.
   *
   * NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
   * they see fit. For example, according to the Roland GS specification, you can control the
   * **vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
   * would use:
   *
   *     WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123);
   *
   * Obviously, you should select a channel so the message is not sent to all channels. For
   * instance, to send to channel 1 of the first output port, you would use:
   *
   *     WebMidi.outputs[0].setNonRegisteredParameter([1, 8], 123, 1);
   *
   * In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
   * would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
   * uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
   * value to send was 10, you could use:
   *
   *     WebMidi.outputs[0].setNonRegisteredParameter([2, 63], [0, 10]);
   *
   * For further implementation details, refer to the manufacturer's documentation.
   *
   * @param parameter A two-position array specifying the two control bytes (0x63,
   * 0x62) that identify the non-registered parameter.
   * @param data An integer or an array of integers with a length of 1 or 2
   * specifying the desired data.
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @returns Returns the `Output` object so methods can be chained.
   */
  setNonRegisteredParameter(
    parameter: [number, number],
    data?: number | [number] | [number, number],
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they
   * adjust the range used by their pitch bend lever. The range can be specified with the `semitones`
   * parameter, the `cents` parameter or by specifying both parameters at the same time.
   *
   * @param semitones The desired adjustment value in semitones (integer between
   * 0-127). While nothing imposes that in the specification, it is very common for manufacturers to
   * limit the range to 2 octaves (-12 semitones to 12 semitones).
   * @param cents The desired adjustment value in cents (integer between 0-127).
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @throws {RangeError} The semitones value must be between 0 and 127.
   * @throws {RangeError} The cents value must be between 0 and 127.
   *
   * @return {Output} Returns the `Output` object so methods can be chained.
   */
  setPitchBendRange(
    semitones?: number,
    cents?: number,
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sets the specified MIDI registered parameter to the desired value. The value is defined with
   * up to two bytes of data that each can go from 0 to 127.
   *
   * >Unless you are very familiar with the MIDI standard you probably should favour one of the
   * >simpler to use functions such as: `setPitchbendRange()`, `setModulationRange()`,
   * >`setMasterTuning()`, etc.
   *
   * MIDI registered parameters extend the original list of control change messages. Currently,
   * there are only a limited number of them. See `WebMidi.MIDI_REGISTER_PARAMETERS`
   *
   * @param parameter A string identifying the parameter's name (see above) or a
   * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
   * parameter.
   * @param data A single integer or an array of integers with a maximum length
   * of 2 specifying the desired data.
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @returns Returns the `Output` object so methods can be chained.
   */
  setRegisteredParameter(
    parameter: keyof MidiRegisteredParameters | [number, number],
    data?: number | [number] | [number, number],
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * @param value The desired tuning bank (0-127).
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @throws {RangeError} The bank value must be between 0 and 127.
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  setTuningBank(
    value: number,
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
   * *MIDI Tuning Standard*, which is not widely implemented.
   *
   * @param value The desired tuning program (0-127).
   * @param channel The MIDI channel number (between 1 and 16) or an
   * array of channel numbers. If the special value "all" is used, the message will be sent to all
   * 16 channels.
   * @param options
   *
   * @throws {RangeError} The program value must be between 0 and 127.
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  setTuningProgram(
    value: number,
    channel?: IMidiChannel,
    options?: OutputBaseOptions
  ): Output

  /**
   * Sends a MIDI **note off** message to the specified channel(s) for a single note or multiple
   * simultaneous notes (chord). You can delay the execution of the **note off** command by using
   * the `time` property of the `options` parameter (in milliseconds).
   *
   * @param note The note(s) you wish to stop. The notes can be specified in
   * one of three ways. The first way is by using the MIDI note number (an integer between `0` and
   * `127`). The second way is by using the note name followed by the octave (C3, G#4, F-1, Db7).
   * The octave range should be between -2 and 8. The lowest note is C-2 (MIDI note number 0) and
   * the highest note is G8 (MIDI note number 127). It is also possible to specify an array of note
   * numbers and/or names. The final way is to use the special value `all` to send an 'allnotesoff'
   * channel message.
   *
   * @param channel The MIDI channel number (between `1` and `16`) or an
   * array of channel numbers. If the special value `all` is used (default), the message will be
   * sent to all 16 channels.
   *
   * @param options
   *
   * @return Returns the `Output` object so methods can be chained.
   */
  stopNote(
    note: INoteParam,
    channel?: IMidiChannel,
    options?: OutputBaseOptions & {
      /** 
       * Controls whether the release velocity is set using an integer between `0` and `127` (`true`)
       * or a decimal number between `0` and `1` (`false`, default).
       */
      rawVelocity: boolean

      /**
       * The velocity at which to release the note (between `0`
       * and `1`). If the `rawVelocity` option is `true`, the value should be specified as an integer
       * between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
       * Note that when the first parameter to `stopNote()` is `all`, the release velocity is silently
       * ignored.
       */
      velocity: number
    }
  ): Output
}

/**
 * The `WebMidi` object makes it easier to work with the Web MIDI API. Basically, it simplifies
 * two things: sending outgoing MIDI messages and reacting to incoming MIDI messages.
 *
 * Sending MIDI messages is done via an `Output` object. All available outputs can be accessed in
 * the `WebMidi.outputs` array. There is one `Output` object for each output port available on
 * your system. Similarly, reacting to MIDI messages as they are coming in is simply a matter of
 * adding a listener to an `Input` object. Similarly, all inputs can be found in the
 * `WebMidi.inputs` array.
 *
 * Please note that a single hardware device might create more than one input and/or output ports.
 *
 * #### Sending messages
 *
 * To send MIDI messages, you simply need to call the desired method (`playNote()`,
 * `sendPitchBend()`, `stopNote()`, etc.) from an `Output` object and pass in the appropriate
 * parameters. All the native MIDI communication will be handled for you. The only additional
 * thing that needs to be done is to first enable `WebMidi`. Here is an example:
 *
 *      WebMidi.enable(function(err) {
 *        if (err) console.log("An error occurred", err);
 *        WebMidi.outputs[0].playNote("C3");
 *      });
 *
 * The code above, calls the `WebMidi.enable()` method. Upon success, this method executes the
 * callback function specified as a parameter. In this case, the callback calls the `playnote()`
 * function to play a 3rd octave C on the first available output port.
 *
 * #### Receiving messages
 *
 * Receiving messages is just as easy. You simply have to set a callback function to be triggered
 * when a specific MIDI message is received. For example, here's how to listen for pitch bend
 * events on the first input port:
 *
 *      WebMidi.enable(function(err) {
 *        if (err) console.log("An error occurred", err);
 *
 *        WebMidi.inputs[0].addListener('pitchbend', "all", function(e) {
 *          console.log("Pitch value: " + e.value);
 *        });
 *
 *      });
 *
 * As you can see, this library is much easier to use than the native Web MIDI API. No need to
 * manually craft or decode binary MIDI messages anymore!
 *
 * @throws Error WebMidi is a singleton, it cannot be instantiated directly.
 */
export interface WebMidi {
  /**
   * List of valid MIDI channel messages and matching hexadecimal values.
   */
  readonly MIDI_CHANNEL_MESSAGES: MidiChannelMessages

  /**
   * List of MIDI channel mode messages as defined in the official MIDI
   * specification.
   */
  readonly MIDI_CHANNEL_MODE_MESSAGES: MidiChannelModeMessages

  /**
   * List of MIDI control change messages
   *
   * valid MIDI registered parameterS and their matching pair of hexadecimal
   * values. MIDI registered parameters extend the original list of control change messages.
   * Currently, there are only a limited number of them.
   */
  readonly MIDI_CONTROL_CHANGE_MESSAGES: MidiControlChangeMessages

  /**
   * List of valid MIDI registered parameters and their matching pair of hexadecimal
   * values. MIDI registered parameters extend the original list of control change messages.
   * Currently, there are only a limited number of them.
   */
  readonly MIDI_REGISTERED_PARAMETER: MidiRegisteredParameters

  /**
   * List of valid MIDI system messages and matching hexadecimal values.
   *
   * Note: values 249 and 253 are actually dispatched by the Web MIDI API but I do not know what
   * they are used for. They are not part of the online
   * [MIDI 1.0 spec](http://www.midi.org/techspecs/midimessages.php).
   */
  readonly MIDI_SYSTEM_MESSAGES: MidiSystemMessages

  /**
   * Indicates whether the interface to the host's MIDI subsystem is currently
   * enabled.
   */
  readonly enabled: boolean

  /**
   * An array of all currently available MIDI input ports.
   */
  readonly inputs: Input[]

  /**
   * An array of all currently available MIDI output ports.
   */
  readonly outputs: Output[]

  /**
   * Indicates whether the environment supports the Web MIDI API or not.
   *
   * Note: in environments that do not offer built-in MIDI support, this will report true if the
   * `navigator.requestMIDIAccess` function is available. For example, if you have installed
   * WebMIDIAPIShim but no plugin, this property will be true even though actual support might
   * not be there.
   */
  readonly supported: boolean

  /**
   * Indicates whether the interface to the host's MIDI subsystem is currently
   * active.
   */
  readonly sysexEnabled: boolean

  /**
   * Current MIDI performance time in milliseconds. This can be used to queue events
   * in the future.
   */
  readonly time: DOMHighResTimeStamp

  /**
   * An integer to offset the octave both in inbound and outbound messages. By default, middle C
   * (MIDI note number 60) is placed on the 4th octave (C4).
   *
   * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
   * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
   */
  octaveOffset: number

  /**
   * Adds an event listener on the `WebMidi` object that will trigger a function callback when the
   * specified event happens.
   *
   * WebMidi must be enabled before adding event listeners.
   * 
   * @param type The type of the event.
   *
   * @param listener A callback function to execute when the specified event is detected.
   * This function will receive an event parameter object. For details on this object's properties,
   * check out the documentation for the various events (links above).
   *
   * @throws {Error} WebMidi must be enabled before adding event listeners.
   * @throws {TypeError} The specified event type is not supported.
   * @throws {TypeError} The 'listener' parameter must be a function.
   */
  addListener<T extends keyof WebMidiEvents>(
    type: T,
    listener: (event: WebMidiEvents[T]) => void
  ): WebMidi

  /**
   * Completely disables `WebMidi` by unlinking the MIDI subsystem's interface and destroying all
   * `Input` and `Output` objects that may be available. This also means that any listener that may
   * have been defined on `Input` or `Output` objects will be destroyed.
   */
  disable(): void

  /**
   * Checks if the Web MIDI API is available and then tries to connect to the host's MIDI subsystem.
   * This is an asynchronous operation. When it's done, the specified handler callback will be
   * executed. If an error occurred, the callback function will receive an `Error` object as its
   * sole parameter.
   *
   * To enable the use of system exclusive messages, the `sysex` parameter should be set to true.
   * However, under some environments (e.g. Jazz-Plugin), the sysex parameter is ignored and sysex
   * is always enabled.
   *
   * @param callback A function to execute upon success. This function will receive an
   * `Error` object upon failure to enable the Web MIDI API.
   * 
   * @param sysex Whether to enable MIDI system exclusive messages or not.
   *
   * @throws Error The Web MIDI API is not supported by your browser.
   * @throws Error Jazz-Plugin must be installed to use WebMIDIAPIShim.
   */
  enable(
    callback?: (err?: Error) => void,
    sysex?: boolean
  ): void

  /**
   *
   * Returns an `Input` object representing the input port with the specified id.
   *
   * Please note that the IDs change from one host to another. For example, Chrome does not use the
   * same kind of IDs as the Jazz-Plugin.
   *
   * @param id The id of the port. IDs can be viewed by looking at the `WebMidi.inputs` array.
   *
   * @returns A MIDIInput port matching the specified id. If no matching port
   * can be found, the method returns `false`.
   */
  getInputById(id: string): Input | false

  /**
   * Returns the first MIDI `Input` whose name *contains* the specified string.
   *
   * Please note that the port names change from one host to another. For example, Chrome does
   * not report port names in the same way as the Jazz-Plugin does.
   *
   * @param name The name of a MIDI input port such as those visible in the `WebMidi.inputs` array.
   *
   * @returns The `Input` that was found or `false` if no input matched the specified name.
   *
   * @throws Error WebMidi is not enabled.
   * @throws TypeError The name must be a string.
   */
  getInputByName(name: string): Input | false

  /**
   * Returns the octave number for the specified MIDI note number (0-127). By default, the value is
   * based on middle C (note number 60) being placed on the 4th octave (C4). However, by using the
   * `WebMidi.octaveOffset` property, you can offset the result as much as you want.
   *
   * @param number An integer representing a valid MIDI note number (between 0 and 127).
   *
   * @returns The octave (as a signed integer) or `undefined`.
   */
  getOctave(number: number): number | undefined

  /**
   * Returns an `Output` object representing the output port matching the specified id.
   *
   * Please note that the IDs change from one host to another. For example, Chrome does not use the
   * same kind of IDs as the Jazz-Plugin.
   *
   * @param id The id of the port. Ids can be viewed by looking at the `WebMidi.outputs` array.
   *
   * @returns A MIDIOutput port matching the specified id. If no matching
   * port can be found, the method returns `false`.
   */
  getOutputById(id: string): Output | false

  /**
   * Returns the first MIDI `Output` that matches the specified name.
   *
   * Please note that the port names change from one host to another. For example, Chrome does
   * not report port names in the same way as the Jazz-Plugin does.
   *
   * @param name The name of a MIDI output port such as those visible in the `WebMidi.outputs` array.
   * 
   * @returns The `Output` that was found or `false` if no output matched the specified name.
   * 
   * @throws Error WebMidi is not enabled.
   */
  getOutputByName(name: string): Output | false

  /**
   * Returns a valid MIDI note number (0-127) given the specified input. The input usually is a note
   * name (C3, F#4, D-2, G8, etc.). If an integer between 0 and 127, it will simply be returned as
   * is.
   *
   * @param input A string to extract the note number from. An integer can also be
   * used, in which case it will simply be returned (if between 0 and 127).
   * @throws {Error} Invalid input value
   * @returns A valid MIDI note number (0-127).
   */
  guessNoteNumber(input: number | string): number

  /**
   * Checks if the specified event type is already defined to trigger the specified listener
   * function.
   *
   * @param type The type of the event.
   * @param listener The callback function to check for.
   *
   * @throws {Error} WebMidi must be enabled before checking event listeners.
   * @throws {TypeError} The 'listener' parameter must be a function.
   * @throws {TypeError} The specified event type is not supported.
   *
   * @return Boolean value indicating whether or not a callback is already defined for
   * this event type.
   */
  hasListener<T extends keyof WebMidiEvents>(
    type: T,
    listener: (event: WebMidiEvents[T]) => void
  ): boolean

  /**
   * Returns a MIDI note number matching the note name passed in the form of a string parameter. The
   * note name must include the octave number. The name can also optionally include a sharp (#),
   * a double sharp (##), a flat (b) or a double flat (bb) symbol: C5, G4, D#-1, F0, Gb7, Eb-1,
   * Abb4, B##6, etc.
   *
   * Note that, in converting note names to numbers, C4 is considered to be middle C (MIDI note
   * number 60) as per the scientific pitch notation standard.
   *
   * Also note that the resulting note number is offset by the `octaveOffset` value (if not zero).
   * For example, if you pass in "C4" and the `octaveOffset` value is 2 the resulting MIDI note
   * number will be 36.
   *
   * @param name The name of the note in the form of a letter, followed by an optional "#",
   * "##", "b" or "bb" followed by the octave number.
   *
   * @throws {RangeError} Invalid note name.
   * @throws {RangeError} Invalid note name or note outside valid range.
   * @return The MIDI note number (between 0 and 127)
   */
  noteNameToNumber(name: string): number

  /**
   * Removes the specified listener(s). If the `listener` parameter is left undefined, all listeners
   * for the specified `type` will be removed. If both the `listener` and the `type` parameters are
   * omitted, all listeners attached to the `WebMidi` object will be removed.
   *
   * @param type The type of the event.
   * @param listener The callback function to check for.
   *
   * @throws {Error} WebMidi must be enabled before removing event listeners.
   * @throws {TypeError} The 'listener' parameter must be a function.
   * @throws {TypeError} The specified event type is not supported.
   *
   * @return The `WebMidi` object for easy method chaining.
   */
  removeListener<T extends keyof WebMidiEvents>(
    type?: T,
    listener?: (event: WebMidiEvents[T]) => void
  ): WebMidi
}

/** The `webmidi` module is a singleton of the `WebMidi` class */
declare const webmidi: WebMidi

export default webmidi;