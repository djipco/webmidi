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

  /**
   * Enumeration of all MIDI channel messages and their associated 4-bit numerical value:
   *
   * - `noteoff`: 0x8 (8)
   * - `noteon`: 0x9 (9)
   * - `keyaftertouch`: 0xA (10)
   * - `controlchange`: 0xB (11)
   * - `nrpn`: 0xB (11)
   * - `programchange`: 0xC (12)
   * - `channelaftertouch`: 0xD (13)
   * - `pitchbend`: 0xE (14)
   *
   * @enum {Object.<string, number>}
   * @readonly
   */
  get MIDI_CHANNEL_MESSAGES() {

    return {
      noteoff: 0x8,           // 8
      noteon: 0x9,            // 9
      keyaftertouch: 0xA,     // 10
      controlchange: 0xB,     // 11
      programchange: 0xC,     // 12
      channelaftertouch: 0xD, // 13
      pitchbend: 0xE          // 14
    };

  }

  /**
   * Enum of all channel mode messages and their associated numerical value:
   *
   * - `allsoundoff`: 120
   * - `resetallcontrollers`: 121
   * - `localcontrol`: 122
   * - `allnotesoff`: 123
   * - `omnimodeoff`: 124
   * - `omnimodeon`: 125
   * - `monomodeon`: 126
   * - `polymodeon`: 127
   *
   * @enum {Object.<string, number>}
   * @readonly
   */
  get MIDI_CHANNEL_MODE_MESSAGES() {

    return {
      allsoundoff: 120,
      resetallcontrollers: 121,
      localcontrol: 122,
      allnotesoff: 123,
      omnimodeoff: 124,
      omnimodeon: 125,
      monomodeon: 126,
      polymodeon: 127
    };

  }

}

// Export singleton instance of Enumerations class. The 'constructor' is nulled so that it cannot be
// used to instantiate a new Enumerations object or extend it. However, it is not freezed so it
// remains extensible (properties can be added at will).
const enums = new Enumerations();
enums.constructor = null;
export {enums as Enumerations};
