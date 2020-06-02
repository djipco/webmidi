import {WebMidi} from "./WebMidi.js";

let validators = {};

validators.controlChangeIdentifier = value => {

  try {
    validators.controlChangeName(value);
    validators.controlChangeNumber(value);
  } catch (err) {
    throw new TypeError(
      "Control change must be identified with a valid name or an integer between 0 and 119."
    );
  }

};

validators.controlChangeName = value => {
  if (WebMidi.MIDI_CONTROL_CHANGE_MESSAGES[value] == undefined) {
    throw new TypeError("Control change name does not exist.");
  }
};

validators.controlChangeNumber = value => {
  if ( !Number.isInteger(value) || !(value >= 0 && value <= 119) ) {
    throw new TypeError("Control change number must be an integer between 0 and 119.");
  }
};

validators.controlChangeValue = value => {
  if ( !Number.isInteger(value) || !(value >= 0 && value <= 127) ) {
    throw new TypeError("Control change value must be an integer between 0 and 127");
  }
};

validators.options = value => {
  if (typeof value === "object" && value !== null) {
    throw new TypeError("Options must be an object");
  }
};

export function check(values, types) {

  // Make sure we are working with arrays
  values = Array.from(values);
  types = Array.from(types);

  // Execute all validators
  types.forEach((validator, index) => {
    if (validators[validator] === undefined) {
      throw new TypeError(`Invalid validator (${validator})`);
    } else {
      validators[validator](values[index]);
    }
  });

  // If we make it here, its all good!
  return true;

}
