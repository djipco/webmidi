import {Enumerations} from "./Enumerations.js";
import {Output} from "./Output.js";
import {WebMidi} from "./WebMidi.js";

/**
 * The `Forwarder` class allows the forwarding of MIDI messages to predetermined outputs. When you
 * call its [`forward()`](#forward) method, it will send the specified [`Message`](Message) object
 * to all the outputs listed in its [`destinations`](#destinations) property.
 *
 * If specific channels or message types have been defined in the [`channels`](#channels) or
 * [`types`](#types) properties, only messages matching the channels/types will be forwarded.
 *
 * While it can be manually instantiated, you are more likely to come across a `Forwarder` object as
 * the return value of the [`Input.addForwarder()`](Input#addForwarder) method.
 *
 * @param {Output|Output[]} [destinations=\[\]] An [`Output`](Output) object, or an array of such objects,
 * to forward the message to.
 *
 * @param {object} [options={}]
 * @param {string|string[]} [options.types=(all messages)] A MIDI message type or an array of such types
 * (`"noteon"`, `"controlchange"`, etc.), that the specified message must match in order to be
 * forwarded. If this option is not specified, all types of messages will be forwarded. Valid
 * messages are the ones found in either [`MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES)
 * or [`MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).
 * @param {number} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
 * A MIDI channel number or an array of channel numbers that the message must match in order to be
 * forwarded. By default all MIDI channels are included (`1` to `16`).
 *
 * @license Apache-2.0
 * @since 3.0.0
 */
export class Forwarder {

  constructor(destinations = [], options = {}) {

    /**
     * An array of [`Output`](Output) objects to forward the message to.
     * @type {Output[]}
     */
    this.destinations = [];

    /**
     * An array of message types (`"noteon"`, `"controlchange"`, etc.) that must be matched in order
     * for messages to be forwarded. By default, this array includes all
     * [`Enumerations.MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES) and
     * [`Enumerations.MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).
     * @type {string[]}
     */
    this.types = [
      ...Object.keys(Enumerations.MIDI_SYSTEM_MESSAGES),
      ...Object.keys(Enumerations.MIDI_CHANNEL_MESSAGES)
    ];

    /**
     * An array of MIDI channel numbers that the message must match in order to be forwarded. By
     * default, this array includes all MIDI channels (`1` to `16`).
     * @type {number[]}
     */
    this.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

    /**
     * Indicates whether message forwarding is currently suspended or not in this forwarder.
     * @type {boolean}
     */
    this.suspended = false;

    // Make sure parameters are arrays
    if (!Array.isArray(destinations)) destinations = [destinations];
    if (options.types && !Array.isArray(options.types)) options.types = [options.types];
    if (options.channels && !Array.isArray(options.channels)) options.channels = [options.channels];

    if (WebMidi.validation) {

      // Validate destinations
      destinations.forEach(destination => {
        if ( !(destination instanceof Output) ) {
          throw new TypeError("Destinations must be of type 'Output'.");
        }
      });

      // Validate types
      if (options.types !== undefined) {

        options.types.forEach(type => {
          if (
            ! Enumerations.MIDI_SYSTEM_MESSAGES.hasOwnProperty(type) &&
            ! Enumerations.MIDI_CHANNEL_MESSAGES.hasOwnProperty(type)
          ) {
            throw new TypeError("Type must be a valid message type.");
          }
        });

      }

      // Validate channels
      if (options.channels !== undefined) {

        options.channels.forEach(channel => {
          if (! Enumerations.MIDI_CHANNEL_NUMBERS.includes(channel) ) {
            throw new TypeError("MIDI channel must be between 1 and 16.");
          }
        });

      }

    }

    this.destinations = destinations;
    if (options.types) this.types = options.types;
    if (options.channels) this.channels = options.channels;

  }

  /**
   * Sends the specified message to the forwarder's destination(s) if it matches the specified
   * type(s) and channel(s).
   *
   * @param {Message} message The [`Message`](Message) object to forward.
   */
  forward(message) {

    // Abort if forwarding is currently suspended
    if (this.suspended) return;

    // Abort if this message type should not be forwarded
    if (!this.types.includes(message.type)) return;

    // Abort if this channel should not be forwarded
    if (message.channel && !this.channels.includes(message.channel)) return;

    // Forward
    this.destinations.forEach(destination => {

      if (WebMidi.validation) {
        if ( !(destination instanceof Output) ) return;
      }

      destination.send(message);

    });

  }

}

