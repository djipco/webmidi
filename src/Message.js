import {WebMidi} from "./WebMidi.js";
import {Utilities} from "./Utilities.js";

/**
 * The `Message` class represents a single MIDI message. It has several properties that make it
 * easy to make sense of the binaru data it contains.
 *
 * @param {Uint8Array} data The raw data of the MIDI message as a Uint8Array of integers between 0
 * and 255.
 *
 * @since 3.0.0
 */
export class Message {

  constructor(data) {

    /**
     * A Uint8Array containing the 1, 2 or 3 byte(s) of the MIDI message. Each byte is an integer
     * between 0 and 255.
     * @type {Uint8Array}
     * @readonly
     */
    this.rawData = data;

    /**
     * An array containing the 1, 2 or 3 unsigned integers of the MIDI message. Each integer is
     * between 0 and 255.
     * @type {number[]}
     * @readonly
     */
    this.data = Array.from(this.rawData);

    /**
     * The MIDI status byte of the message as an integer between 0 and 255.
     * @type {number}
     * @readonly
     */
    this.statusByte = this.rawData[0];

    /**
     * An array of 0, 1 or 2 unsigned integer(s) (0-127) representing the data byte(s) of the MIDI
     * message.
     * @type {number[]}
     * @readonly
     */
    this.dataBytes = [];

    /**
     * A boolean indicating whether the MIDI message is a channel-specific message.
     * @type {boolean}
     * @readonly
     */
    this.channelMessage = false;

    /**
     * A boolean indicating whether the MIDI message is a channel mode message (a special type of
     * control message).
     * @type {boolean}
     * @readonly
     */
    this.channelModeMessage = false;

    /**
     * A boolean indicating whether the MIDI message is a system message (not specific to a
     * channel).
     * @type {boolean}
     * @readonly
     */
    this.systemMessage = false;

    /**
     * An integer identifying the MIDI command. For channel-specific messages, the value will be
     * between 8 and 14. For system messages, the value will be between 240 and 255.
     * @type {number}
     * @readonly
     */
    this.command = undefined;

    /**
     * The MIDI channel number that the message is targeting. For system messages, this will be
     * undefined.
     * @type {number}
     * @readonly
     */
    this.channel = undefined;

    // Extract data bytes for all messages (except sysex)
    if (this.statusByte !== WebMidi.MIDI_SYSTEM_MESSAGES.sysex) this.dataBytes = this.data.slice(1);

    // Assign values to property that vary according to whether they are channel-specific or system
    if (this.statusByte < 240) {

      this.channelMessage = true;
      this.command = this.statusByte >> 4;
      this.channel = (this.statusByte & 0b00001111) + 1;

      if (
        this.command === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.controlchange &&
        this.dataBytes[0] >= 120
      ) {
        this.channelModeMessage = true;
      }

    } else {
      this.systemMessage = true;
      this.command = this.statusByte;
    }

    // Identify the exact type of message
    if (this.channelModeMessage) {
      this.type = Utilities.getPropertyByValue(WebMidi.MIDI_CHANNEL_MODE_MESSAGES, this.dataBytes[0]);
    } else if (this.channelMessage) {                       // channel messages
      this.type = Utilities.getPropertyByValue(WebMidi.MIDI_CHANNEL_MESSAGES, this.command);
    } else if (this.systemMessage) {                        // system messages
      this.type = Utilities.getPropertyByValue(WebMidi.MIDI_SYSTEM_MESSAGES, this.command);
    }

  }

}
