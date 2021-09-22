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
     * A Uint8Array of the data byte(s) of the MIDI message.
     *
     * @type {Uint8Array}
     * @readonly
     */
    this.rawDataBytes = this.rawData.slice(1);

    /**
     * An array of the the data byte(s) of the MIDI message.
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

    // Assign values to property that vary according to whether they are channel-specific or system
    if (this.statusByte < 240) {
      this.isChannelMessage = true;
      this.command = this.statusByte >> 4;
      this.channel = (this.statusByte & 0b00001111) + 1;
    } else {
      this.isSystemMessage = true;
      this.command = this.statusByte;
    }

    // Assign type (depending in whether the message is channel-specific or system)
    if (this.isChannelMessage) {
      this.type = Utilities.getPropertyByValue(WebMidi.MIDI_CHANNEL_MESSAGES, this.command);
    } else if (this.isSystemMessage) {
      this.type = Utilities.getPropertyByValue(WebMidi.MIDI_SYSTEM_MESSAGES, this.command);
    }

  }

}
