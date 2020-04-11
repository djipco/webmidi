import {EventEmitter} from "../node_modules/djipevents/dist/djipevents.esm.min.js";
import {WebMidi} from './WebMidi';

/**
 * OutputChannel class...
 *
 * @param {Output} output The output this channel belongs to
 * @param {number} number The channel number (1-16)
 */
export class OutputChannel extends EventEmitter {

  constructor(output, number) {

    super();

    /**
     * The output this channel belongs to
     * @type {Output}
     */
    this.output = output;

    /**
     * The channel number (1-16)
     * @type {number}
     */
    this.number = number;

  }

  /**
   * Sends a MIDI `key aftertouch` message to the specified channel(s) at the scheduled time. This
   * is a key-specific aftertouch. For a channel-wide aftertouch message, use
   * {@link Output#sendChannelAftertouch}.
   *
   * @param note {number|string|array}  The note for which you are sending an aftertouch value. The
   * notes can be specified in one of two ways. The first way is by using the MIDI note number (an
   * integer between 0 and 127). The second way is by using the note name followed by the octave
   * (C3, G#4, F-1, Db7). The octave range should be between -2 and 8. The lowest note is C-2 (MIDI
   * note number 0) and the highest note is G8 (MIDI note number 127). It is also possible to use
   * an array of note names and/or numbers.
   *
   * @param {Number} [pressure=0.5] The pressure level to send (between 0 and 1).
   *
   * @param {Object} [options={}]
   *
   * @param {DOMHighResTimeStamp|String} [options.time=undefined] This value can be one of two
   * things. If the value is a string starting with the + sign and followed by a number, the request
   * will be delayed by the specified number (in milliseconds). Otherwise, the value is considered a
   * timestamp and the request will be scheduled at that timestamp. The `DOMHighResTimeStamp` value
   * is relative to the navigation start of the document. To retrieve the current time, you can use
   * `WebMidi.time`. If `time` is not present or is set to a time in the past, the request is to be
   * sent as soon as possible.
   *
   * @return {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
   */
  sendKeyAftertouch(note, pressure, options= {}) {

    if (isNaN(pressure) || pressure < 0 || pressure > 1) {
      pressure = 0.5;
    }

    var nPressure = Math.round(pressure * 127);

    this._convertToNoteArray(note).forEach(item => {

      WebMidi.sanitizeChannels(this.number).forEach(ch => {
        this.send(
          (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.keyaftertouch << 4) + (ch - 1),
          [item, nPressure],
          this._convertToTimestamp(options.time)
        );
      });

    });

    return this;

  };

}
