import {WebMidi} from "./WebMidi.js";

/**
 * The `InputChannel` class represents a single MIDI message
 *
 * @param {Uint8Array} data The raw data of the MIDI message
 *
 * @since 3.0.0
 */
export class Message {

  constructor(data) {

    // Extract data bytes (unless it's a sysex message)
    let dataBytes = null;
    if (data[0] !== WebMidi.MIDI_SYSTEM_MESSAGES.sysex) dataBytes = data.slice(1);

    // Extract basic data
    this.data = Array.from(data);
    this.rawData = data;
    this.statusByte = data[0];
    this.dataBytes = dataBytes;

    // Identify if we are dealing with a channel voice, channel mode or system message
    this.channelVoiceMessage = false;
    this.channelModeMessage = false;
    this.systemMessage = false;


    if (this.statusByte < 240) {

      this.command = data[0] & 0b11110000;
      this.command4bit = data[0] >> 4;
      this.channel = (data[0] & 0b00001111) + 1;
      this.channelVoiceMessage = true;

      if (
        this.command4bit === WebMidi.MIDI_CHANNEL_VOICE_MESSAGES.controlchange &&
        this.dataBytes[0] >= 120
      ) {
        this.channelModeMessage = true;

      }

    } else {
      this.command = data[0];
      this.systemMessage = true;
    }

    // Identify the precise type of message
    if (this.channelVoiceMessage) {

      if (this.channelModeMessage) {

        for (let value in WebMidi.MIDI_CHANNEL_MODE_MESSAGES) {
          if (WebMidi.MIDI_CHANNEL_MODE_MESSAGES[value] === this.dataBytes[0]) {
            this.type = value;
            break;
          }
        }

      } else {

        for (let value in WebMidi.MIDI_CHANNEL_VOICE_MESSAGES) {
          if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[value] === this.command4bit) {
            this.type = value;
            break;
          }
        }

      }


    } else if (this.systemMessage) {

      for (let value in WebMidi.MIDI_SYSTEM_MESSAGES) {
        if (WebMidi.MIDI_SYSTEM_MESSAGES[value] === this.command) {
          this.type = value;
          break;
        }
      }

    }

  }

}
