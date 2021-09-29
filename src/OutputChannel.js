import {EventEmitter} from "../node_modules/djipevents/dist/djipevents.esm.min.js";
import {WebMidi} from "./WebMidi.js";
import {Utilities} from "./Utilities.js";
import {Enumerations} from "./Enumerations.js";

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
export class OutputChannel extends EventEmitter {

  constructor(output, number) {

    super();

    /**
     * @type {Output}
     * @private
     */
    this._output = output;

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

  }

  /**
   * Unlinks the MIDI subsystem, removes all listeners attached to the channel and nulls the channel
   * number. This method is mostly for internal use. It has not been prefixed with an underscore
   * since it is called by other objects such as the `Output` object.
   *
   * @private
   */
  destroy() {
    this._output = null;
    this._number = null;
    this._octaveOffset = 0;
    this.removeListener();
  }

  /**
   * Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
   * sent immediately. The message should be an array of 8 bit unsigned integers (0-225), a
   * [Uint8Array]{@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array}
   * object or a `Message` object.
   *
   * It is usually not necessary to use this method directly as you can use one of the simpler
   * helper methods such as `playNote()`, `stopNote()`, `sendControlChange()`, etc.
   *
   * Details on the format of MIDI messages are available in the summary of
   * [MIDI messages]{@link https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message}
   * from the MIDI Manufacturers Association.
   *
   * @param message {number[]|Uint8Array|Message} An array of 8bit unsigned integers, a `Uint8Array`
   * object (not available in Node.js) containing the message bytes or a `Message` object.
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
  send(message, options = {time: 0}) {
    this.output.send(message, options);
    return this;
  }

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
  setKeyAftertouch(target, pressure, options = {}) {

    if (WebMidi.validation) {

      // Legacy support
      if (options.useRawValue) options.rawValue = options.useRawValue;

      if (isNaN(parseFloat(pressure))) {
        throw new RangeError("Invalid key aftertouch value.");
      }
      if (options.rawValue) {
        if (!(pressure >= 0 && pressure <= 127 && Number.isInteger(pressure))) {
          throw new RangeError("Key aftertouch raw value must be an integer between 0 and 127.");
        }
      } else {
        if (!(pressure >= 0 && pressure <= 1)) {
          throw new RangeError("Key aftertouch value must be a float between 0 and 1.");
        }
      }

    }

    // Normalize pressure to integer
    if (!options.rawValue) pressure = Utilities.to7Bit(pressure);

    // Retrieve key number. If identifier specified, offset by total offset value
    const offset = WebMidi.octaveOffset + this.output.octaveOffset + this.octaveOffset;
    if (!Array.isArray(target)) target = [target];
    target = target.map(item => Utilities.guessNoteNumber(item));

    target.forEach(n => {
      this.send(
        [
          (Enumerations.MIDI_CHANNEL_MESSAGES.keyaftertouch << 4) + (this.number - 1),
          Utilities.offsetNumber(n, offset),
          pressure
        ],
        {time: Utilities.toTimestamp(options.time)}
      );
    });

    return this;





    //
    // Utilities.buildNoteArray(note, {rawAttack: nVelocity}).forEach(n => {
    //   this.send(
    //     [
    //       (Enumerations.MIDI_CHANNEL_MESSAGES.noteon << 4) + (this.number - 1),
    //       n.getOffsetNumber(offset),
    //       n.rawAttack
    //     ],
    //     {time: Utilities.toTimestamp(options.time)}
    //   );
    // });


  }

  /**
   * Sends a MIDI **control change** message to the channel at the scheduled time. The control
   * change message to send can be specified numerically (0 to 127) or by using one of the following
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
   *  * `allsoundoff` (#120)
   *  * `resetallcontrollers` (#121)
   *  * `localcontrol` (#122)
   *  * `allnotesoff` (#123)
   *  * `omnimodeoff` (#124)
   *  * `omnimodeon` (#125)
   *  * `monomodeon` (#126)
   *  * `polymodeon` (#127)
   *
   * As you can see above, not all control change message have a matching common name. This
   * does not mean you cannot use the others. It simply means you will need to use their number
   * (0-127) instead of their name. While you can still use them, numbers 120 to 127 are usually
   * reserved for *channel mode* messages. See
   * [sendChannelMode()]{@link OutputChannel#sendChannelMode} method for more info.
   *
   * To view a detailed list of all available **control change** messages, please consult "Table 3 -
   * Control Change Messages" from the [MIDI Messages](
   * https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
   * specification.
   *
   * Note: messages #0-31 (MSB) are paired with messages #32-63 (LSB). For example, message #1
   * (modulationwheelcoarse) can be accompanied by a second control change message for
   * modulationwheelfine to achieve a greater level of precision. if you want to specify both MSB
   * and LSB for messages between 0 and 31, you can do so by passing a 2-value array as the second
   * parameter.
   *
   * @param {number|string} controller The MIDI controller name or number (0-127).
   *
   * @param {number|number[]} value The value to send (0-127). You can also use a two-position array
   * for controllers 0 to 31. In this scenario, the first value will be sent as usual and the second
   * calue will be sent to the matching LSB controller (which is obtained by adding 32 to the first
   * controller)
   *
   * @param {Object} [options={}]
   *
   * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
   * a number, the message will be delayed by that many milliseconds. If the value is a number, the
   * operation will be scheduled for that time. The current time can be retrieved with
   * [WebMidi.time]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the operation
   * will be carried out as soon as possible.
   *
   * @throws {RangeError} Controller numbers must be between 0 and 127.
   * @throws {RangeError} Invalid controller name.
   * @throws {TypeError} The value array must have a length of 2.
   *
   * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   *
   * @license Apache-2.0
   * @since 3.0.0
   */
  sendControlChange(controller, value, options = {}) {

    if (typeof controller === "string") {
      controller = WebMidi.MIDI_CONTROL_CHANGE_MESSAGES[controller];
    }

    if (!Array.isArray(value)) value = [value];

    if (WebMidi.validation) {

      if (controller === undefined) {
        throw new TypeError(
          "Control change must be identified with a valid name or an integer between 0 and 127."
        );
      }

      if (!Number.isInteger(controller) || !(controller >= 0 && controller <= 127)) {
        throw new TypeError("Control change number must be an integer between 0 and 127.");
      }

      value = value.map(item => {
        const output = Math.min(Math.max(parseInt(item), 0), 127);
        if (isNaN(output)) throw new TypeError("Values must be integers between 0 and 127");
        return output;
      });

      if (value.length === 2 && controller >= 32) {
        throw new TypeError("To use a value array, the controller must be between 0 and 31");
      }

    }

    value.forEach((item, index) => {

      this.send(
        [
          (Enumerations.MIDI_CHANNEL_MESSAGES.controlchange << 4) + (this.number - 1),
          controller + (index * 32),
          value[index]
        ],
        {time: Utilities.toTimestamp(options.time)}
      );

    });

    return this;

  }

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
  _selectNonRegisteredParameter(parameter, options = {}) {

    // parameter[0] = Math.floor(parameter[0]);
    // if (!(parameter[0] >= 0 && parameter[0] <= 127)) {
    //   throw new RangeError("The control63 value must be between 0 and 127.");
    // }
    //
    // parameter[1] = Math.floor(parameter[1]);
    // if (!(parameter[1] >= 0 && parameter[1] <= 127)) {
    //   throw new RangeError("The control62 value must be between 0 and 127.");
    // }

    this.sendControlChange(0x63, parameter[0], options);
    this.sendControlChange(0x62, parameter[1], options);

    return this;

  }

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
  _deselectRegisteredParameter(options = {}) {
    this.sendControlChange(0x65, 0x7F, options);
    this.sendControlChange(0x64, 0x7F, options);
    return this;
  }

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
  _deselectNonRegisteredParameter(options = {}) {
    this.sendControlChange(0x65, 0x7F, options);
    this.sendControlChange(0x64, 0x7F, options);
    return this;
  }

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
  _selectRegisteredParameter(parameter, options = {}) {
    this.sendControlChange(0x65, parameter[0], options);
    this.sendControlChange(0x64, parameter[1], options);
    return this;
  }

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
  _setCurrentParameter(data, options = {}) {

    data = [].concat(data);

    // MSB
    // data[0] = parseInt(data[0]);
    // if (!isNaN(data[0]) && data[0] >= 0 && data[0] <= 127) {
    this.sendControlChange(0x06, data[0], options);
    // } else {
    //   throw new RangeError("The msb value must be between 0 and 127.");
    // }

    if (data.length < 2) return this;

    // LSB
    // data[1] = parseInt(data[1]);

    // if (!isNaN(data[1]) && data[1] >= 0 && data[1] <= 127) {
    this.sendControlChange(0x26, data[1], options);
    // } else {
    //   throw new RangeError("The lsb value must be between 0 and 127.");
    // }

    return this;

  }

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
  decrementRegisteredParameter(parameter, options = {}) {

    if (!Array.isArray(parameter)) parameter = WebMidi.MIDI_REGISTERED_PARAMETERS[parameter];

    if (WebMidi.validation) {
      if (parameter === undefined) {
        throw new TypeError("The specified registered parameter is invalid.");
      }

      let valid = false;

      Object.getOwnPropertyNames(WebMidi.MIDI_REGISTERED_PARAMETERS).forEach(p => {
        if (
          WebMidi.MIDI_REGISTERED_PARAMETERS[p][0] === parameter[0] &&
          WebMidi.MIDI_REGISTERED_PARAMETERS[p][1] === parameter[1]
        ) {
          valid = true;
        }
      });

      if (!valid) throw new TypeError("The specified registered parameter is invalid.");
    }

    this._selectRegisteredParameter(parameter, options);
    this.sendControlChange(0x61, 0, options);
    this._deselectRegisteredParameter(options);

    return this;

  }

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
  incrementRegisteredParameter(parameter, options = {}) {

    if (!Array.isArray(parameter)) parameter = WebMidi.MIDI_REGISTERED_PARAMETERS[parameter];

    if (WebMidi.validation) {
      if (parameter === undefined) {
        throw new TypeError("The specified registered parameter is invalid.");
      }

      let valid = false;

      Object.getOwnPropertyNames(WebMidi.MIDI_REGISTERED_PARAMETERS).forEach(p => {
        if (
          WebMidi.MIDI_REGISTERED_PARAMETERS[p][0] === parameter[0] &&
          WebMidi.MIDI_REGISTERED_PARAMETERS[p][1] === parameter[1]
        ) {
          valid = true;
        }
      });

      if (!valid) throw new TypeError("The specified registered parameter is invalid.");
    }

    this._selectRegisteredParameter(parameter, options);
    this.sendControlChange(0x60, 0, options);
    this._deselectRegisteredParameter(options);

    return this;

  }

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
  playNote(note, options = {}) {

    // Send note on and, optionally, note off message (if duration is a positive number)
    this.sendNoteOn(note, options);

    // https://stackoverflow.com/questions/600763#answer-601877
    if (options.duration > 0 && isFinite(String(options.duration).trim() || NaN)) {

      let noteOffOptions = {
        time: (Utilities.toTimestamp(options.time) || WebMidi.time) + options.duration,
        release: options.release,
        rawRelease: options.rawRelease,
      };

      this.sendNoteOff(note, noteOffOptions);

    }

    return this;

  }

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
  sendNoteOff(note, options = {}) {

    if (WebMidi.validation) {

      if (
        options.rawRelease != undefined &&
        !(options.rawRelease >= 0 && options.rawRelease <= 127)
      ) {
        throw new RangeError("The 'rawRelease' option must be an integer between 0 and 127");
      }

      if (options.release != undefined && !(options.release >= 0 && options.release <= 1)) {
        throw new RangeError("The 'release' option must be an number between 0 and 1");
      }

      // Legacy compatibility warnings
      if (options.rawVelocity) {
        options.rawRelease = options.velocity;
        console.warn("The 'rawVelocity' option is deprecated. Use 'rawRelease' instead.");
      }
      if (options.velocity) {
        options.release = options.velocity;
        console.warn("The 'velocity' option is deprecated. Use 'attack' instead.");
      }

    }

    let nVelocity = 64;

    if (options.rawRelease != undefined) {
      nVelocity = options.rawRelease;
    } else {
      if (!isNaN(options.release)) nVelocity = Math.round(options.release * 127);
    }

    // Plot total octave offset
    const offset = WebMidi.octaveOffset + this.output.octaveOffset + this.octaveOffset;

    Utilities.buildNoteArray(note, {rawRelease: parseInt(nVelocity)}).forEach(n => {
      this.send(
        [
          (Enumerations.MIDI_CHANNEL_MESSAGES.noteoff << 4) + (this.number - 1),
          n.getOffsetNumber(offset),
          n.rawRelease,
        ],
        {time: Utilities.toTimestamp(options.time)}
      );
    });

    return this;

  }

  /**
   * This is an alias to the [sendNoteOff()]{@link OutputChannel#sendNoteOff} method.
   *
   * @see {@link OutputChannel#sendNoteOff}
   *
   * @param note
   * @param options
   * @returns {Output}
   */
  stopNote(note, options = {}) {
    return this.sendNoteOff(note, options);
  }

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
  sendNoteOn(note, options = {}) {

    if (WebMidi.validation) {

      if (options.rawAttack != undefined && !(options.rawAttack >= 0 && options.rawAttack <= 127)) {
        throw new RangeError("The 'rawAttack' option must be an integer between 0 and 127");
      }

      if (options.attack != undefined && !(options.attack >= 0 && options.attack <= 1)) {
        throw new RangeError("The 'attack' option must be an number between 0 and 1");
      }

      // Legacy compatibility warnings
      if (options.rawVelocity) {
        options.rawAttack = options.velocity;
        options.rawRelease = options.release;
        console.warn("The 'rawVelocity' option is deprecated. Use 'rawAttack' or 'rawRelease'.");
      }
      if (options.velocity) {
        options.attack = options.velocity;
        console.warn("The 'velocity' option is deprecated. Use 'attack' instead.");
      }

    }

    let nVelocity = 64;

    if (options.rawAttack != undefined) {
      nVelocity = options.rawAttack;
    } else {
      if (!isNaN(options.attack)) nVelocity = Math.round(options.attack * 127);
    }

    // Plot total octave offset
    const offset = WebMidi.octaveOffset + this.output.octaveOffset + this.octaveOffset;

    Utilities.buildNoteArray(note, {rawAttack: nVelocity}).forEach(n => {
      this.send(
        [
          (Enumerations.MIDI_CHANNEL_MESSAGES.noteon << 4) + (this.number - 1),
          n.getOffsetNumber(offset),
          n.rawAttack
        ],
        {time: Utilities.toTimestamp(options.time)}
      );
    });

    return this;

  }

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
  sendChannelMode(command, value, options = {}) {

    // Normalize command to integer
    if (typeof command === "string") command = WebMidi.MIDI_CHANNEL_MODE_MESSAGES[command];

    if (WebMidi.validation) {

      if (command === undefined) {
        throw new TypeError("Invalid channel mode message name or number.");
      }

      if (isNaN(command) || !(command >= 120 && command <= 127)) {
        throw new TypeError("Invalid channel mode message number.");
      }

      if (isNaN(parseInt(value)) || value < 0 || value > 127) {
        throw new RangeError("Value must be an integer between 0 and 127.");
      }

    }

    this.send(
      [
        (Enumerations.MIDI_CHANNEL_MESSAGES.controlchange << 4) + (this.number - 1),
        command,
        value
      ],
      {time: Utilities.toTimestamp(options.time)}
    );

    return this;

  }

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
  setOmniMode(state, options = {}) {

    if (state === undefined || state) {
      this.sendChannelMode("omnimodeon", 0, options);
    } else {
      this.sendChannelMode("omnimodeoff", 0, options);
    }

    return this;

  }

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
  setChannelAftertouch(pressure, options = {}) {

    if (WebMidi.validation) {

      if (isNaN(parseFloat(pressure))) {
        throw new RangeError("Invalid channel aftertouch value.");
      }

      if (options.rawValue) {
        if (!(pressure >= 0 && pressure <= 127 && Number.isInteger(pressure))) {
          throw new RangeError(
            "Channel aftertouch raw value must be an integer between 0 and 127.")
          ;
        }
      } else {
        if (!(pressure >= 0 && pressure <= 1)) {
          throw new RangeError("Channel aftertouch value must be a float between 0 and 1.");
        }
      }

    }

    this.send(
      [
        (Enumerations.MIDI_CHANNEL_MESSAGES.channelaftertouch << 4) + (this.number - 1),
        Math.round(pressure * 127)
      ],
      {time: Utilities.toTimestamp(options.time)}
    );

    return this;

  }

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
  setMasterTuning(value, options = {}) {

    value = parseFloat(value) || 0.0;

    if (WebMidi.validation) {

      if (!(value > -65 && value < 64)) {
        throw new RangeError(
          "The value must be a decimal number larger than -65 and smaller than 64."
        );
      }

    }

    let coarse = Math.floor(value) + 64;
    let fine = value - Math.floor(value);

    // Calculate MSB and LSB for fine adjustment (14bit resolution)
    fine = Math.round((fine + 1) / 2 * 16383);
    let msb = (fine >> 7) & 0x7F;
    let lsb = fine & 0x7F;

    this.setRegisteredParameter("channelcoarsetuning", coarse, options);
    this.setRegisteredParameter("channelfinetuning", [msb, lsb], options);

    return this;

  }

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
  setModulationRange(semitones, cents, options = {}) {

    if (WebMidi.validation) {

      if (!Number.isInteger(semitones) || !(semitones >= 0 && semitones <= 127)) {
        throw new RangeError("The semitones value must be an integer between 0 and 127.");
      }

      if (!(cents == undefined) && (!Number.isInteger(cents) || !(cents >= 0 && cents <= 127))) {
        throw new RangeError("If specified, the cents value must be an integer between 0 and 127.");
      }

    }

    // Default value for cents
    if (!(cents >= 0 && cents <= 127)) cents = 0;

    this.setRegisteredParameter("modulationrange", [semitones, cents], options);

    return this;

  }

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
  setNonRegisteredParameter(nrpn, data, options = {}) {

    data = [].concat(data);

    if (WebMidi.validation) {

      if (!Array.isArray(nrpn) || !Number.isInteger(nrpn[0]) || !Number.isInteger(nrpn[1])) {
        throw new TypeError("The specified NRPN is invalid.");
      }

      if (!(nrpn[0] >= 0 && nrpn[0] <= 127)) {
        throw new RangeError("The first byte of the NRPN must be between 0 and 127.");
      }

      if (!(nrpn[1] >= 0 && nrpn[1] <= 127)) {
        throw new RangeError("The second byte of the NRPN must be between 0 and 127.");
      }

      data.forEach(value => {
        if (!(value >= 0 && value <= 127)) {
          throw new RangeError("The data bytes of the NRPN must be between 0 and 127.");
        }
      });

    }

    this._selectNonRegisteredParameter(nrpn, options);
    this._setCurrentParameter(data, options);
    this._deselectNonRegisteredParameter(options);

    return this;

  }

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
  setPitchBend(value, options = {}) {

    if (WebMidi.validation) {

      if (options.rawValue && Array.isArray(value)) {

        if (!(value[0] >= 0 && value[0] <= 127)) {
          throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");
        }
        if (!(value[1] >= 0 && value[1] <= 127)) {
          throw new RangeError("The pitch bend LSB must be an integer between 0 and 127.");
        }

      } else if (options.rawValue && !Array.isArray(value)) {

        if (!(value >= 0 && value <= 127)) {
          throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");
        }

      } else {

        if (isNaN(value) || value === null) {
          throw new RangeError("Invalid pitch bend value.");
        }

        if (!(value >= -1 && value <= 1)) {
          throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");
        }

      }

    }

    let msb = 0;
    let lsb = 0;

    // Calculate MSB and LSB for both scenarios
    if (options.rawValue && Array.isArray(value)) {
      msb = value[0];
      lsb = value[1];
    } else if (options.rawValue && !Array.isArray(value)) {
      msb = value;
    } else {
      let nLevel = Math.round((value + 1) / 2 * 16383);
      msb = (nLevel >> 7) & 0x7F;
      lsb = nLevel & 0x7F;
    }

    this.send(
      [
        (Enumerations.MIDI_CHANNEL_MESSAGES.pitchbend << 4) + (this.number - 1),
        lsb,
        msb
      ],
      {time: Utilities.toTimestamp(options.time)}
    );

    return this;

  }

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
  setPitchBendRange(semitones, cents, options = {}) {

    if (WebMidi.validation) {

      if (!Number.isInteger(semitones) || !(semitones >= 0 && semitones <= 127)) {
        throw new RangeError("The semitones value must be an integer between 0 and 127.");
      }

      if (!Number.isInteger(cents) || !(cents >= 0 && cents <= 127)) {
        throw new RangeError("The cents value must be an integer between 0 and 127.");
      }

    }

    this.setRegisteredParameter("pitchbendrange", [semitones, cents], options);
    return this;

  }

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
  setProgram(program, options = {}) {

    program = parseInt(program) || 1;

    if (WebMidi.validation) {

      if (!(program >= 1 && program <= 128)) {
        throw new RangeError("The program number must be between 1 and 128.");
      }

    }

    this.send(
      [
        (Enumerations.MIDI_CHANNEL_MESSAGES.programchange << 4) + (this.number - 1),
        program - 1
      ],
      {time: Utilities.toTimestamp(options.time)}
    );

    return this;

  }

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
  setRegisteredParameter(rpn, data, options = {}) {

    if (!Array.isArray(rpn)) rpn = WebMidi.MIDI_REGISTERED_PARAMETERS[rpn];

    if (WebMidi.validation) {

      if (!Number.isInteger(rpn[0]) || !Number.isInteger(rpn[1])) {
        throw new TypeError("The specified NRPN is invalid.");
      }

      if (!(rpn[0] >= 0 && rpn[0] <= 127)) {
        throw new RangeError("The first byte of the RPN must be between 0 and 127.");
      }

      if (!(rpn[1] >= 0 && rpn[1] <= 127)) {
        throw new RangeError("The second byte of the RPN must be between 0 and 127.");
      }

      [].concat(data).forEach(value => {
        if (!(value >= 0 && value <= 127)) {
          throw new RangeError("The data bytes of the RPN must be between 0 and 127.");
        }
      });

    }

    this._selectRegisteredParameter(rpn, options);
    this._setCurrentParameter(data, options);
    this._deselectRegisteredParameter(options);

    return this;

  }

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
  setTuningBank(value, options = {}) {

    if (WebMidi.validation) {

      if (!Number.isInteger(value) || !(value >= 1 && value <= 128)) {
        throw new RangeError("The tuning bank number must be between 1 and 128.");
      }

    }

    this.setRegisteredParameter("tuningbank", value - 1, options);
    return this;

  }

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
  setTuningProgram(value, options = {}) {

    if (WebMidi.validation) {

      if (!Number.isInteger(value) || !(value >= 1 && value <= 128)) {
        throw new RangeError("The tuning program number must be between 1 and 128.");
      }

    }

    this.setRegisteredParameter("tuningprogram", value - 1, options);
    return this;

  }

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
  setLocalControl(state, options = {}) {
    if (state) {
      return this.sendChannelMode("localcontrol", 127, options);
    } else {
      return this.sendChannelMode("localcontrol", 0, options);
    }
  }

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
  turnNotesOff(options = {}) {
    return this.sendChannelMode("allnotesoff", 0, options);
  }

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
  turnSoundOff(options = {}) {
    return this.sendChannelMode("allsoundoff", 0, options);
  }

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
  resetAllControllers(options = {}) {
    return this.sendChannelMode("resetallcontrollers", 0, options);
  }

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
  setPolyphonicMode(mode, options = {}) {
    if (mode === "mono") {
      return this.sendChannelMode("monomodeon", 0, options);
    } else {
      return this.sendChannelMode("polymodeon", 0, options);
    }
  }

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
   * The parent {@link Output} this channel belongs to
   * @type {Output}
   * @since 3.0
   */
  get output() {
    return this._output;
  }

  /**
   * This channel's MIDI number (1-16)
   * @type {number}
   * @since 3.0
   */
  get number() {
    return this._number;
  }

}
