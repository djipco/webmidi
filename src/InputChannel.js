import {EventEmitter} from "../node_modules/djipevents/dist/djipevents.esm.min.js";

/**
 * InputChannel class...
 *
 * @param {Input} input The Input this channel belongs to
 * @param {number} number The channel number (1-16)
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
