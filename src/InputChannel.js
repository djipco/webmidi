import {EventEmitter} from "../node_modules/djipevents/dist/djipevents.esm.min.js";

/**
 * The `InputChannel` class represents a single input channel (1-16) from an input device. This
 * object is derived from the host's MIDI subsystem and cannot be instantiated directly.
 *
 * All 16 `InputChannel` objects can be found inside the input's [channels]{@link Input#channels}
 * property.
 *
 * @param {Input} input The `Input` this channel belongs to
 * @param {number} number The channel's number (1-16)
 */
export class InputChannel extends EventEmitter {

  constructor(input, number) {

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

}
