/**
 * The `Enumerations` class contains enumerations and arrays of elements used throughout the
 * library. All its properties are static and should be referenced using the class name. For
 * example: `Enumerations.CHANNEL_MESSAGES`.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */
export class Enumerations {

  /**
   * @enum {Object.<string, number>}
   * @readonly
   * @deprecated since 3.1 (use Enumerations.CHANNEL_MESSAGES instead)
   * @private
   * @static
   */
  static get MIDI_CHANNEL_MESSAGES() {

    if (this.validation) {
      console.warn(
        "The MIDI_CHANNEL_MESSAGES enum has been deprecated. Use the " +
        "Enumerations.CHANNEL_MESSAGES enum instead."
      );
    }

    return Enumerations.CHANNEL_MESSAGES;

  }

  /**
   * Enumeration of all MIDI channel message names and their associated 4-bit numerical value:
   *
   * | Message Name        | Hexadecimal | Decimal |
   * |---------------------|-------------|---------|
   * | `noteoff`           | 0x8         | 8       |
   * | `noteon`            | 0x9         | 9       |
   * | `keyaftertouch`     | 0xA         | 10      |
   * | `controlchange`     | 0xB         | 11      |
   * | `programchange`     | 0xC         | 12      |
   * | `channelaftertouch` | 0xD         | 13      |
   * | `pitchbend`         | 0xE         | 14      |
   *
   * @enum {Object.<string, number>}
   * @readonly
   * @since 3.1
   * @static
   */
  static get CHANNEL_MESSAGES() {

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
   * A simple array of the 16 valid MIDI channel numbers (`1` to `16`):
   *
   * @type {number[]}
   * @readonly
   * @since 3.1
   * @static
   */
  static get CHANNEL_NUMBERS() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  }

  /**
   * @type {number[]}
   * @readonly
   * @deprecated since 3.1 (use Enumerations.CHANNEL_NUMBERS instead)
   * @private
   * @static
   */
  static get MIDI_CHANNEL_NUMBERS() {

    if (this.validation) {
      console.warn(
        "The MIDI_CHANNEL_NUMBERS array has been deprecated. Use the " +
        "Enumerations.CHANNEL_NUMBERS array instead."
      );
    }

    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  }

  /**
   * Enumeration of all MIDI channel mode message names and their associated numerical value:
   *
   *
   * | Message Name          | Hexadecimal | Decimal |
   * |-----------------------|-------------|---------|
   * | `allsoundoff`         | 0x78        | 120     |
   * | `resetallcontrollers` | 0x79        | 121     |
   * | `localcontrol`        | 0x7A        | 122     |
   * | `allnotesoff`         | 0x7B        | 123     |
   * | `omnimodeoff`         | 0x7C        | 124     |
   * | `omnimodeon`          | 0x7D        | 125     |
   * | `monomodeon`          | 0x7E        | 126     |
   * | `polymodeon`          | 0x7F        | 127     |
   *
   * @enum {Object.<string, number>}
   * @readonly
   * @since 3.1
   * @static
   */
  static get CHANNEL_MODE_MESSAGES() {

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

  /**
   * @enum {Object.<string, number>}
   * @deprecated since 3.1 (use Enumerations.CHANNEL_MODE_MESSAGES instead)
   * @private
   * @readonly
   * @static
   */
  static get MIDI_CHANNEL_MODE_MESSAGES() {

    if (this.validation) {
      console.warn(
        "The MIDI_CHANNEL_MODE_MESSAGES enum has been deprecated. Use the " +
        "Enumerations.CHANNEL_MODE_MESSAGES enum instead."
      );
    }

    return Enumerations.CHANNEL_MODE_MESSAGES;

  }

  /**
   * @enum {Object.<string, number>}
   * @readonly
   * @static
   * @private
   * @deprecated since version 3.0.26 (use `CONTROL_CHANGE_MESSAGES` instead)
   */
  static get MIDI_CONTROL_CHANGE_MESSAGES() {

    if (this.validation) {
      console.warn(
        "The MIDI_CONTROL_CHANGE_MESSAGES enum has been deprecated. Use the " +
        "Enumerations.CONTROL_CHANGE_MESSAGES array instead."
      );
    }

    return {

      bankselectcoarse: 0,
      modulationwheelcoarse: 1,
      breathcontrollercoarse: 2,
      controller3: 3,
      footcontrollercoarse: 4,
      portamentotimecoarse: 5,
      dataentrycoarse: 6,
      volumecoarse: 7,
      balancecoarse: 8,
      controller9: 9,
      pancoarse: 10,
      expressioncoarse: 11,
      effectcontrol1coarse: 12,
      effectcontrol2coarse: 13,
      controller14: 14,
      controller15: 15,
      generalpurposeslider1: 16,
      generalpurposeslider2: 17,
      generalpurposeslider3: 18,
      generalpurposeslider4: 19,
      controller20: 20,
      controller21: 21,
      controller22: 22,
      controller23: 23,
      controller24: 24,
      controller25: 25,
      controller26: 26,
      controller27: 27,
      controller28: 28,
      controller29: 29,
      controller30: 30,
      controller31: 31,
      bankselectfine: 32,
      modulationwheelfine: 33,
      breathcontrollerfine: 34,
      controller35: 35,
      footcontrollerfine: 36,
      portamentotimefine: 37,
      dataentryfine: 38,
      volumefine: 39,
      balancefine: 40,
      controller41: 41,
      panfine: 42,
      expressionfine: 43,
      effectcontrol1fine: 44,
      effectcontrol2fine: 45,
      controller46: 46,
      controller47: 47,
      controller48: 48,
      controller49: 49,
      controller50: 50,
      controller51: 51,
      controller52: 52,
      controller53: 53,
      controller54: 54,
      controller55: 55,
      controller56: 56,
      controller57: 57,
      controller58: 58,
      controller59: 59,
      controller60: 60,
      controller61: 61,
      controller62: 62,
      controller63: 63,
      holdpedal: 64,
      portamento: 65,
      sustenutopedal: 66,
      softpedal: 67,
      legatopedal: 68,
      hold2pedal: 69,
      soundvariation: 70,
      resonance: 71,
      soundreleasetime: 72,
      soundattacktime: 73,
      brightness: 74,
      soundcontrol6: 75,
      soundcontrol7: 76,
      soundcontrol8: 77,
      soundcontrol9: 78,
      soundcontrol10: 79,
      generalpurposebutton1: 80,
      generalpurposebutton2: 81,
      generalpurposebutton3: 82,
      generalpurposebutton4: 83,
      controller84: 84,
      controller85: 85,
      controller86: 86,
      controller87: 87,
      controller88: 88,
      controller89: 89,
      controller90: 90,
      reverblevel: 91,
      tremololevel: 92,
      choruslevel: 93,
      celestelevel: 94,
      phaserlevel: 95,
      databuttonincrement: 96,
      databuttondecrement: 97,
      nonregisteredparametercoarse: 98,
      nonregisteredparameterfine: 99,
      registeredparametercoarse: 100,
      registeredparameterfine: 101,
      controller102: 102,
      controller103: 103,
      controller104: 104,
      controller105: 105,
      controller106: 106,
      controller107: 107,
      controller108: 108,
      controller109: 109,
      controller110: 110,
      controller111: 111,
      controller112: 112,
      controller113: 113,
      controller114: 114,
      controller115: 115,
      controller116: 116,
      controller117: 117,
      controller118: 118,
      controller119: 119,
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

  /**
   * An array of objects, ordered by control number, describing control change messages. Each object
   * in the array has 3 properties with some objects having a fourth one (`position`) :
   *
   *  * `number`: MIDI control number (0-127);
   *  * `name`: name of emitted event (eg: `bankselectcoarse`, `choruslevel`, etc) that can be
   *  listened to;
   *  * `description`: user-friendly description of the controller's purpose;
   *  * `position` (optional): whether this controller's value should be considered an `msb` or
   *  `lsb`
   *
   * Not all controllers have a predefined function. For those that don't, `name` is the word
   * "controller" followed by the number (e.g. `controller112`).
   *
   * | Event name                     | Control Number |
   * |--------------------------------|----------------|
   * | `bankselectcoarse`             | 0              |
   * | `modulationwheelcoarse`        | 1              |
   * | `breathcontrollercoarse`       | 2              |
   * | `controller3`                  | 3              |
   * | `footcontrollercoarse`         | 4              |
   * | `portamentotimecoarse`         | 5              |
   * | `dataentrycoarse`              | 6              |
   * | `volumecoarse`                 | 7              |
   * | `balancecoarse`                | 8              |
   * | `controller9`                  | 9              |
   * | `pancoarse`                    | 10             |
   * | `expressioncoarse`             | 11             |
   * | `effectcontrol1coarse`         | 12             |
   * | `effectcontrol2coarse`         | 13             |
   * | `controller14`                 | 14             |
   * | `controller15`                 | 15             |
   * | `generalpurposecontroller1`    | 16             |
   * | `generalpurposecontroller2`    | 17             |
   * | `generalpurposecontroller3`    | 18             |
   * | `generalpurposecontroller4`    | 19             |
   * | `controller20`                 | 20             |
   * | `controller21`                 | 21             |
   * | `controller22`                 | 22             |
   * | `controller23`                 | 23             |
   * | `controller24`                 | 24             |
   * | `controller25`                 | 25             |
   * | `controller26`                 | 26             |
   * | `controller27`                 | 27             |
   * | `controller28`                 | 28             |
   * | `controller29`                 | 29             |
   * | `controller30`                 | 30             |
   * | `controller31`                 | 31             |
   * | `bankselectfine`               | 32             |
   * | `modulationwheelfine`          | 33             |
   * | `breathcontrollerfine`         | 34             |
   * | `controller35`                 | 35             |
   * | `footcontrollerfine`           | 36             |
   * | `portamentotimefine`           | 37             |
   * | `dataentryfine`                | 38             |
   * | `channelvolumefine`            | 39             |
   * | `balancefine`                  | 40             |
   * | `controller41`                 | 41             |
   * | `panfine`                      | 42             |
   * | `expressionfine`               | 43             |
   * | `effectcontrol1fine`           | 44             |
   * | `effectcontrol2fine`           | 45             |
   * | `controller46`                 | 46             |
   * | `controller47`                 | 47             |
   * | `controller48`                 | 48             |
   * | `controller49`                 | 49             |
   * | `controller50`                 | 50             |
   * | `controller51`                 | 51             |
   * | `controller52`                 | 52             |
   * | `controller53`                 | 53             |
   * | `controller54`                 | 54             |
   * | `controller55`                 | 55             |
   * | `controller56`                 | 56             |
   * | `controller57`                 | 57             |
   * | `controller58`                 | 58             |
   * | `controller59`                 | 59             |
   * | `controller60`                 | 60             |
   * | `controller61`                 | 61             |
   * | `controller62`                 | 62             |
   * | `controller63`                 | 63             |
   * | `damperpedal`                  | 64             |
   * | `portamento`                   | 65             |
   * | `sostenuto`                    | 66             |
   * | `softpedal`                    | 67             |
   * | `legatopedal`                  | 68             |
   * | `hold2`                        | 69             |
   * | `soundvariation`               | 70             |
   * | `resonance`                    | 71             |
   * | `releasetime`                  | 72             |
   * | `attacktime`                   | 73             |
   * | `brightness`                   | 74             |
   * | `decaytime`                    | 75             |
   * | `vibratorate`                  | 76             |
   * | `vibratodepth`                 | 77             |
   * | `vibratodelay`                 | 78             |
   * | `controller79`                 | 79             |
   * | `generalpurposecontroller5`    | 80             |
   * | `generalpurposecontroller6`    | 81             |
   * | `generalpurposecontroller7`    | 82             |
   * | `generalpurposecontroller8`    | 83             |
   * | `portamentocontrol`            | 84             |
   * | `controller85`                 | 85             |
   * | `controller86`                 | 86             |
   * | `controller87`                 | 87             |
   * | `highresolutionvelocityprefix` | 88             |
   * | `controller89`                 | 89             |
   * | `controller90`                 | 90             |
   * | `effect1depth`                 | 91             |
   * | `effect2depth`                 | 92             |
   * | `effect3depth`                 | 93             |
   * | `effect4depth`                 | 94             |
   * | `effect5depth`                 | 95             |
   * | `dataincrement`                | 96             |
   * | `datadecrement`                | 97             |
   * | `nonregisteredparameterfine`   | 98             |
   * | `nonregisteredparametercoarse` | 99             |
   * | `nonregisteredparameterfine`   | 100            |
   * | `registeredparametercoarse`    | 101            |
   * | `controller102`                | 102            |
   * | `controller103`                | 103            |
   * | `controller104`                | 104            |
   * | `controller105`                | 105            |
   * | `controller106`                | 106            |
   * | `controller107`                | 107            |
   * | `controller108`                | 108            |
   * | `controller109`                | 109            |
   * | `controller110`                | 110            |
   * | `controller111`                | 111            |
   * | `controller112`                | 112            |
   * | `controller113`                | 113            |
   * | `controller114`                | 114            |
   * | `controller115`                | 115            |
   * | `controller116`                | 116            |
   * | `controller117`                | 117            |
   * | `controller118`                | 118            |
   * | `controller119`                | 119            |
   * | `allsoundoff`                  | 120            |
   * | `resetallcontrollers`          | 121            |
   * | `localcontrol`                 | 122            |
   * | `allnotesoff`                  | 123            |
   * | `omnimodeoff`                  | 124            |
   * | `omnimodeon`                   | 125            |
   * | `monomodeon`                   | 126            |
   * | `polymodeon`                   | 127            |
   *
   * @type {object[]}
   * @readonly
   * @static
   * @since 3.1
   */
  static get CONTROL_CHANGE_MESSAGES() {

    return [
      {
        number: 0,
        name: "bankselectcoarse",
        description: "Bank Select (Coarse)",
        position: "msb"
      },
      {
        number: 1,
        name: "modulationwheelcoarse",
        description: "Modulation Wheel (Coarse)",
        position: "msb"
      },
      {
        number: 2,
        name: "breathcontrollercoarse",
        description: "Breath Controller (Coarse)",
        position: "msb"
      },
      {
        number: 3,
        name: "controller3",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 4,
        name: "footcontrollercoarse",
        description: "Foot Controller (Coarse)",
        position: "msb"
      },
      {
        number: 5,
        name: "portamentotimecoarse",
        description: "Portamento Time (Coarse)",
        position: "msb"
      },
      {
        number: 6,
        name: "dataentrycoarse",
        description: "Data Entry (Coarse)",
        position: "msb"
      },
      {
        number: 7,
        name: "volumecoarse",
        description: "Channel Volume (Coarse)",
        position: "msb"
      },
      {
        number: 8,
        name: "balancecoarse",
        description: "Balance (Coarse)",
        position: "msb"
      },
      {
        number: 9,
        name: "controller9",
        description: "Controller 9 (Coarse)",
        position: "msb"
      },
      {
        number: 10,
        name: "pancoarse",
        description: "Pan (Coarse)",
        position: "msb"
      },
      {
        number: 11,
        name: "expressioncoarse",
        description: "Expression Controller (Coarse)",
        position: "msb"
      },
      {
        number: 12,
        name: "effectcontrol1coarse",
        description: "Effect Control 1 (Coarse)",
        position: "msb"
      },
      {
        number: 13,
        name: "effectcontrol2coarse",
        description: "Effect Control 2 (Coarse)",
        position: "msb"
      },
      {
        number: 14,
        name: "controller14",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 15,
        name: "controller15",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 16,
        name: "generalpurposecontroller1",
        description: "General Purpose Controller 1 (Coarse)",
        position: "msb"
      },
      {
        number: 17,
        name: "generalpurposecontroller2",
        description: "General Purpose Controller 2 (Coarse)",
        position: "msb"
      },
      {
        number: 18,
        name: "generalpurposecontroller3",
        description: "General Purpose Controller 3 (Coarse)",
        position: "msb"
      },
      {
        number: 19,
        name: "generalpurposecontroller4",
        description: "General Purpose Controller 4 (Coarse)",
        position: "msb"
      },
      {
        number: 20,
        name: "controller20",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 21,
        name: "controller21",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 22,
        name: "controller22",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 23,
        name: "controller23",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 24,
        name: "controller24",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 25,
        name: "controller25",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 26,
        name: "controller26",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 27,
        name: "controller27",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 28,
        name: "controller28",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 29,
        name: "controller29",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 30,
        name: "controller30",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 31,
        name: "controller31",
        description: "Undefined",
        position: "msb"
      },
      {
        number: 32,
        name: "bankselectfine",
        description: "Bank Select (Fine)",
        position: "lsb"
      },
      {
        number: 33,
        name: "modulationwheelfine",
        description: "Modulation Wheel (Fine)",
        position: "lsb"
      },
      {
        number: 34,
        name: "breathcontrollerfine",
        description: "Breath Controller (Fine)",
        position: "lsb"
      },
      {
        number: 35,
        name: "controller35",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 36,
        name: "footcontrollerfine",
        description: "Foot Controller (Fine)",
        position: "lsb"
      },
      {
        number: 37,
        name: "portamentotimefine",
        description: "Portamento Time (Fine)",
        position: "lsb"
      },
      {
        number: 38,
        name: "dataentryfine",
        description: "Data Entry (Fine)",
        position: "lsb"
      },
      {
        number: 39,
        name: "channelvolumefine",
        description: "Channel Volume (Fine)",
        position: "lsb"
      },
      {
        number: 40,
        name: "balancefine",
        description: "Balance (Fine)",
        position: "lsb"
      },
      {
        number: 41,
        name: "controller41",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 42,
        name: "panfine",
        description: "Pan (Fine)",
        position: "lsb"
      },
      {
        number: 43,
        name: "expressionfine",
        description: "Expression Controller (Fine)",
        position: "lsb"
      },
      {
        number: 44,
        name: "effectcontrol1fine",
        description: "Effect control 1 (Fine)",
        position: "lsb"
      },
      {
        number: 45,
        name: "effectcontrol2fine",
        description: "Effect control 2 (Fine)",
        position: "lsb"
      },
      {
        number: 46,
        name: "controller46",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 47,
        name: "controller47",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 48,
        name: "controller48",
        description: "General Purpose Controller 1 (Fine)",
        position: "lsb"
      },
      {
        number: 49,
        name: "controller49",
        description: "General Purpose Controller 2 (Fine)",
        position: "lsb"
      },
      {
        number: 50,
        name: "controller50",
        description: "General Purpose Controller 3 (Fine)",
        position: "lsb"
      },
      {
        number: 51,
        name: "controller51",
        description: "General Purpose Controller 4 (Fine)",
        position: "lsb"
      },
      {
        number: 52,
        name: "controller52",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 53,
        name: "controller53",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 54,
        name: "controller54",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 55,
        name: "controller55",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 56,
        name: "controller56",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 57,
        name: "controller57",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 58,
        name: "controller58",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 59,
        name: "controller59",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 60,
        name: "controller60",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 61,
        name: "controller61",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 62,
        name: "controller62",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 63,
        name: "controller63",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 64,
        name: "damperpedal",
        description: "Damper Pedal On/Off"
      },
      {
        number: 65,
        name: "portamento",
        description: "Portamento On/Off"
      },
      {
        number: 66,
        name: "sostenuto",
        description: "Sostenuto On/Off"
      },
      {
        number: 67,
        name: "softpedal",
        description: "Soft Pedal On/Off"
      },
      {
        number: 68,
        name: "legatopedal",
        description: "Legato Pedal On/Off"
      },
      {
        number: 69,
        name: "hold2",
        description: "Hold 2 On/Off"
      },
      {
        number: 70,
        name: "soundvariation",
        description: "Sound Variation",
        position: "lsb"
      },
      {
        number: 71,
        name: "resonance",
        description: "Resonance",
        position: "lsb"
      },
      {
        number: 72,
        name: "releasetime",
        description: "Release Time",
        position: "lsb"
      },
      {
        number: 73,
        name: "attacktime",
        description: "Attack Time",
        position: "lsb"
      },
      {
        number: 74,
        name: "brightness",
        description: "Brightness",
        position: "lsb"
      },
      {
        number: 75,
        name: "decaytime",
        description: "Decay Time",
        position: "lsb"
      },
      {
        number: 76,
        name: "vibratorate",
        description: "Vibrato Rate",
        position: "lsb"
      },
      {
        number: 77,
        name: "vibratodepth",
        description: "Vibrato Depth",
        position: "lsb"
      },
      {
        number: 78,
        name: "vibratodelay",
        description: "Vibrato Delay",
        position: "lsb"
      },
      {
        number: 79,
        name: "controller79",
        description: "Undefined",
        position: "lsb"
      },
      {
        number: 80,
        name: "generalpurposecontroller5",
        description: "General Purpose Controller 5",
        position: "lsb"
      },
      {
        number: 81,
        name: "generalpurposecontroller6",
        description: "General Purpose Controller 6",
        position: "lsb"
      },
      {
        number: 82,
        name: "generalpurposecontroller7",
        description: "General Purpose Controller 7",
        position: "lsb"
      },
      {
        number: 83,
        name: "generalpurposecontroller8",
        description: "General Purpose Controller 8",
        position: "lsb"
      },
      {
        number: 84,
        name: "portamentocontrol",
        description: "Portamento Control",
        position: "lsb"
      },
      {
        number: 85,
        name: "controller85",
        description: "Undefined"
      },
      {
        number: 86,
        name: "controller86",
        description: "Undefined"
      },
      {
        number: 87,
        name: "controller87",
        description: "Undefined"
      },
      {
        number: 88,
        name: "highresolutionvelocityprefix",
        description: "High Resolution Velocity Prefix",
        position: "lsb"
      },
      {
        number: 89,
        name: "controller89",
        description: "Undefined"
      },
      {
        number: 90,
        name: "controller90",
        description: "Undefined"
      },
      {
        number: 91,
        name: "effect1depth",
        description: "Effects 1 Depth (Reverb Send Level)"
      },
      {
        number: 92,
        name: "effect2depth",
        description: "Effects 2 Depth"
      },
      {
        number: 93,
        name: "effect3depth",
        description: "Effects 3 Depth (Chorus Send Level)"
      },
      {
        number: 94,
        name: "effect4depth",
        description: "Effects 4 Depth"
      },
      {
        number: 95,
        name: "effect5depth",
        description: "Effects 5 Depth"
      },
      {
        number: 96,
        name: "dataincrement",
        description: "Data Increment"
      },
      {
        number: 97,
        name: "datadecrement",
        description: "Data Decrement"
      },
      {
        number: 98,
        name: "nonregisteredparameterfine",
        description: "Non-Registered Parameter Number (Fine)",
        position: "lsb"
      },
      {
        number: 99,
        name: "nonregisteredparametercoarse",
        description: "Non-Registered Parameter Number (Coarse)",
        position: "msb"
      },
      {
        number: 100,
        name: "registeredparameterfine",
        description: "Registered Parameter Number (Fine)",
        position: "lsb"
      },
      {
        number: 101,
        name: "registeredparametercoarse",
        description: "Registered Parameter Number (Coarse)",
        position: "msb"
      },
      {
        number: 102,
        name: "controller102",
        description: "Undefined"
      },
      {
        number: 103,
        name: "controller103",
        description: "Undefined"
      },
      {
        number: 104,
        name: "controller104",
        description: "Undefined"
      },
      {
        number: 105,
        name: "controller105",
        description: "Undefined"
      },
      {
        number: 106,
        name: "controller106",
        description: "Undefined"
      },
      {
        number: 107,
        name: "controller107",
        description: "Undefined"
      },
      {
        number: 108,
        name: "controller108",
        description: "Undefined"
      },
      {
        number: 109,
        name: "controller109",
        description: "Undefined"
      },
      {
        number: 110,
        name: "controller110",
        description: "Undefined"
      },
      {
        number: 111,
        name: "controller111",
        description: "Undefined"
      },
      {
        number: 112,
        name: "controller112",
        description: "Undefined"
      },
      {
        number: 113,
        name: "controller113",
        description: "Undefined"
      },
      {
        number: 114,
        name: "controller114",
        description: "Undefined"
      },
      {
        number: 115,
        name: "controller115",
        description: "Undefined"
      },
      {
        number: 116,
        name: "controller116",
        description: "Undefined"
      },
      {
        number: 117,
        name: "controller117",
        description: "Undefined"
      },
      {
        number: 118,
        name: "controller118",
        description: "Undefined"
      },
      {
        number: 119,
        name: "controller119",
        description: "Undefined"
      },
      {
        number: 120,
        name: "allsoundoff",
        description: "All Sound Off"
      },
      {
        number: 121,
        name: "resetallcontrollers",
        description: "Reset All Controllers"
      },
      {
        number: 122,
        name: "localcontrol",
        description: "Local Control On/Off"
      },
      {
        number: 123,
        name: "allnotesoff",
        description: "All Notes Off"
      },
      {
        number: 124,
        name: "omnimodeoff",
        description: "Omni Mode Off"
      },
      {
        number: 125,
        name: "omnimodeon",
        description: "Omni Mode On"
      },
      {
        number: 126,
        name: "monomodeon",
        description: "Mono Mode On"
      },
      {
        number: 127,
        name: "polymodeon",
        description: "Poly Mode On"
      },
    ];

  }

  /**
   * Enumeration of all MIDI registered parameters and their associated pair of numerical values.
   * MIDI registered parameters extend the original list of control change messages. Currently,
   * there are only a limited number of them:
   *
   *
   * | Control Function             | [LSB, MSB]   |
   * |------------------------------|--------------|
   * | `pitchbendrange`             | [0x00, 0x00] |
   * | `channelfinetuning`          | [0x00, 0x01] |
   * | `channelcoarsetuning`        | [0x00, 0x02] |
   * | `tuningprogram`              | [0x00, 0x03] |
   * | `tuningbank`                 | [0x00, 0x04] |
   * | `modulationrange`            | [0x00, 0x05] |
   * | `azimuthangle`               | [0x3D, 0x00] |
   * | `elevationangle`             | [0x3D, 0x01] |
   * | `gain`                       | [0x3D, 0x02] |
   * | `distanceratio`              | [0x3D, 0x03] |
   * | `maximumdistance`            | [0x3D, 0x04] |
   * | `maximumdistancegain`        | [0x3D, 0x05] |
   * | `referencedistanceratio`     | [0x3D, 0x06] |
   * | `panspreadangle`             | [0x3D, 0x07] |
   * | `rollangle`                  | [0x3D, 0x08] |
   *
   * @enum {Object.<string, number[]>}
   * @readonly
   * @since 3.1
   * @static
   */
  static get REGISTERED_PARAMETERS() {

    return {
      pitchbendrange: [0x00, 0x00],
      channelfinetuning: [0x00, 0x01],
      channelcoarsetuning: [0x00, 0x02],
      tuningprogram: [0x00, 0x03],
      tuningbank: [0x00, 0x04],

      modulationrange: [0x00, 0x05],
      azimuthangle: [0x3D, 0x00],
      elevationangle: [0x3D, 0x01],
      gain: [0x3D, 0x02],
      distanceratio: [0x3D, 0x03],
      maximumdistance: [0x3D, 0x04],
      maximumdistancegain: [0x3D, 0x05],
      referencedistanceratio: [0x3D, 0x06],
      panspreadangle: [0x3D, 0x07],
      rollangle: [0x3D, 0x08]
    };

  }

  /**
   * @enum {Object.<string, number[]>}
   * @readonly
   * @deprecated since 3.1 (use Enumerations.REGISTERED_PARAMETERS instead)
   * @private
   * @static
   */
  static get MIDI_REGISTERED_PARAMETERS() {

    if (this.validation) {
      console.warn(
        "The MIDI_REGISTERED_PARAMETERS enum has been deprecated. Use the " +
        "Enumerations.REGISTERED_PARAMETERS enum instead."
      );
    }

    return Enumerations.MIDI_REGISTERED_PARAMETERS;

  }

  /**
   * Enumeration of all valid MIDI system messages and matching numerical values. This library also
   * uses two additional custom messages.
   *
   * **System Common Messages**
   *
   * | Function               | Hexadecimal | Decimal |
   * |------------------------|-------------|---------|
   * | `sysex`                | 0xF0        |  240    |
   * | `timecode`             | 0xF1        |  241    |
   * | `songposition`         | 0xF2        |  242    |
   * | `songselect`           | 0xF3        |  243    |
   * | `tunerequest`          | 0xF6        |  246    |
   * | `sysexend`             | 0xF7        |  247    |
   *
   * The `sysexend` message is never actually received. It simply ends a sysex stream.
   *
   * **System Real-Time Messages**
   *
   * | Function               | Hexadecimal | Decimal |
   * |------------------------|-------------|---------|
   * | `clock`                | 0xF8        |  248    |
   * | `start`                | 0xFA        |  250    |
   * | `continue`             | 0xFB        |  251    |
   * | `stop`                 | 0xFC        |  252    |
   * | `activesensing`        | 0xFE        |  254    |
   * | `reset`                | 0xFF        |  255    |
   *
   * Values 249 and 253 are relayed by the
   * [Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API) but they do not
   * serve any specific purpose. The
   * [MIDI 1.0 spec](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
   * simply states that they are undefined/reserved.
   *
   * **Custom Messages**
   *
   * These two messages are mostly for internal use. They are not MIDI messages and cannot be sent
   * or forwarded.
   *
   * | Function               | Hexadecimal | Decimal |
   * |------------------------|-------------|---------|
   * | `midimessage`          |             |  0      |
   * | `unknownsystemmessage` |             |  -1     |
   *
   * @enum {Object.<string, number>}
   * @readonly
   * @since 3.1
   * @static
   */
  static get SYSTEM_MESSAGES() {

    return {

      // System common messages
      sysex: 0xF0,            // 240
      timecode: 0xF1,         // 241
      songposition: 0xF2,     // 242
      songselect: 0xF3,       // 243
      tunerequest: 0xF6,      // 246
      tuningrequest: 0xF6,    // for backwards-compatibility (deprecated in version 3.0)
      sysexend: 0xF7,         // 247 (never actually received - simply ends a sysex)

      // System real-time messages
      clock: 0xF8,            // 248
      start: 0xFA,            // 250
      continue: 0xFB,         // 251
      stop: 0xFC,             // 252
      activesensing: 0xFE,    // 254
      reset: 0xFF,            // 255

      // Custom WebMidi.js messages
      midimessage: 0,
      unknownsystemmessage: -1

    };

  }

  /**
   * @enum {Object.<string, number>}
   * @readonly
   * @deprecated since 3.1 (use Enumerations.SYSTEM_MESSAGES instead)
   * @private
   * @static
   */
  static get MIDI_SYSTEM_MESSAGES() {

    if (this.validation) {
      console.warn(
        "The MIDI_SYSTEM_MESSAGES enum has been deprecated. Use the " +
        "Enumerations.SYSTEM_MESSAGES enum instead."
      );
    }

    return Enumerations.SYSTEM_MESSAGES;

  }

  /**
   * Array of channel-specific event names that can be listened for. This includes channel mode
   * events and RPN/NRPN events.
   *
   * @type {string[]}
   * @readonly
   */
  static get CHANNEL_EVENTS() {

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

      // RPN/NRPN events
      "nrpn",
      "nrpn-dataentrycoarse",
      "nrpn-dataentryfine",
      "nrpn-dataincrement",
      "nrpn-datadecrement",
      "rpn",
      "rpn-dataentrycoarse",
      "rpn-dataentryfine",
      "rpn-dataincrement",
      "rpn-datadecrement",

      // Legacy (remove in v4)
      "nrpn-databuttonincrement",
      "nrpn-databuttondecrement",
      "rpn-databuttonincrement",
      "rpn-databuttondecrement",

    ];
  }

}
