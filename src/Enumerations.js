/**
 * The `Enumerations` class contains list of elements used throughout the library. The class is a
 * singleton with static methods and is not meant to be instantiated.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */
class Enumerations {

  /**
   * An array of channel-specific event names that can be listened to.
   * @type {string[]}
   */
  get CHANNEL_EVENTS() {
    return [

      // MIDI channel message events
      "noteoff",
      "controlchange",
      "noteon",
      "keyaftertouch",
      "programchange",
      "channelaftertouch",
      "pitchbend",

      // MIDI channel mode events
      "allnotesoff",
      "allsoundoff",
      "localcontrol",
      "monomode",
      "omnimode",
      "resetallcontrollers",

      // NRPN events
      "nrpndataentrycoarse",
      "nrpndataentryfine",
      "nrpndatabuttonincrement",
      "nrpndatabuttondecrement",

      // RPN events
      "rpndataentrycoarse",
      "rpndataentryfine",
      "rpndatabuttonincrement",
      "rpndatabuttondecrement"

    ];
  }

}

// Export singleton instance of Enumerations class. The 'constructor' is nulled so that it cannot be
// used to instantiate a new Enumerations object or extend it. However, it is not freezed so it
// remains extensible (properties can be added at will).
const enums = new Enumerations();
enums.constructor = null;
export {enums as Enumerations};
