
# Enumerations

The `Enumerations` class contains enumerations and lists of elements used throughout the library.
All properties are static and should be referenced using the class name. For example:
`Enumerations.MIDI_CHANNEL_MESSAGES`.

**Since**: 3.0.0


***

## Properties

### `.MIDI_CHANNEL_NUMBERS` {#MIDI_CHANNEL_NUMBERS}

**Type**: Array.&lt;number&gt;<br />
**Attributes**: read-only, static<br />


An simple array of the 16 valid MIDI channel numbers (`1` to `16`):



***

## Enums

### `.MIDI_CHANNEL_MESSAGES` {#MIDI_CHANNEL_MESSAGES}
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of all MIDI channel message names and their associated 4-bit numerical value:

| Message Name        | Hexadecimal Value  |  Decimal Value |
|---------------------|--------------------|----------------|
| `noteoff`           | 0x8                | 8              |
| `noteon`            | 0x9                | 9              |
| `keyaftertouch`     | 0xA                | 10             |
| `controlchange`     | 0xB                | 11             |
| `nrpn`              | 0xB                | 11             |
| `programchange`     | 0xC                | 12             |
| `channelaftertouch` | 0xD                | 13             |
| `pitchbend`         | 0xE                | 14             |
### `.MIDI_CHANNEL_MODE_MESSAGES` {#MIDI_CHANNEL_MODE_MESSAGES}
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of all MIDI channel mode message names and their associated numerical value:


| Message Name          | Hexadecimal Value  |  Decimal Value |
|-----------------------|--------------------|----------------|
| `allsoundoff`         | 0x78               | 120            |
| `resetallcontrollers` | 0x79               | 121            |
| `localcontrol`        | 0x7A               | 122            |
| `allnotesoff`         | 0x7B               | 123            |
| `omnimodeoff`         | 0x7C               | 124            |
| `omnimodeon`          | 0x7D               | 125            |
| `monomodeon`          | 0x7E               | 126            |
| `polymodeon`          | 0x7F               | 127            |
### `.MIDI_CONTROL_CHANGE_MESSAGES` {#MIDI_CONTROL_CHANGE_MESSAGES}
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of all control change messages identifying the control function associated to its
control number.

Not all numbers have a preassigned control function. For those that don't, the control function
is identified as the word "controller" followed by the number (e.g. `controller123`).

| Control Function               | Control Number |
|--------------------------------|----------------|
| `bankselectcoarse`             | 0              |
| `modulationwheelcoarse`        | 1              |
| `breathcontrollercoarse`       | 2              |
| `controller3`                  | 3              |
| `footcontrollercoarse`         | 4              |
| `portamentotimecoarse`         | 5              |
| `dataentrycoarse`              | 6              |
| `volumecoarse`                 | 7              |
| `balancecoarse`                | 8              |
| `controller9`                  | 9              |
| `pancoarse`                    | 10             |
| `expressioncoarse`             | 11             |
| `effectcontrol1coarse`         | 12             |
| `effectcontrol2coarse`         | 13             |
| `controller14`                 | 14             |
| `controller15`                 | 15             |
| `generalpurposeslider1`        | 16             |
| `generalpurposeslider2`        | 17             |
| `generalpurposeslider3`        | 18             |
| `generalpurposeslider4`        | 19             |
| `controller20`                 | 20             |
| `controller21`                 | 21             |
| `controller22`                 | 22             |
| `controller23`                 | 23             |
| `controller24`                 | 24             |
| `controller25`                 | 25             |
| `controller26`                 | 26             |
| `controller27`                 | 27             |
| `controller28`                 | 28             |
| `controller29`                 | 29             |
| `controller30`                 | 30             |
| `controller31`                 | 31             |
| `bankselectfine`               | 32             |
| `modulationwheelfine`          | 33             |
| `breathcontrollerfine`         | 34             |
| `controller35`                 | 35             |
| `footcontrollerfine`           | 36             |
| `portamentotimefine`           | 37             |
| `dataentryfine`                | 38             |
| `volumefine`                   | 39             |
| `balancefine`                  | 40             |
| `controller41`                 | 41             |
| `panfine`                      | 42             |
| `expressionfine`               | 43             |
| `effectcontrol1fine`           | 44             |
| `effectcontrol2fine`           | 45             |
| `controller46`                 | 46             |
| `controller47`                 | 47             |
| `controller48`                 | 48             |
| `controller49`                 | 49             |
| `controller50`                 | 50             |
| `controller51`                 | 51             |
| `controller52`                 | 52             |
| `controller53`                 | 53             |
| `controller54`                 | 54             |
| `controller55`                 | 55             |
| `controller56`                 | 56             |
| `controller57`                 | 57             |
| `controller58`                 | 58             |
| `controller59`                 | 59             |
| `controller60`                 | 60             |
| `controller61`                 | 61             |
| `controller62`                 | 62             |
| `controller63`                 | 63             |
| `holdpedal`                    | 64             |
| `portamento`                   | 65             |
| `sustenutopedal`               | 66             |
| `softpedal`                    | 67             |
| `legatopedal`                  | 68             |
| `hold2pedal`                   | 69             |
| `soundvariation`               | 70             |
| `resonance`                    | 71             |
| `soundreleasetime`             | 72             |
| `soundattacktime`              | 73             |
| `brightness`                   | 74             |
| `soundcontrol6`                | 75             |
| `soundcontrol7`                | 76             |
| `soundcontrol8`                | 77             |
| `soundcontrol9`                | 78             |
| `soundcontrol10`               | 79             |
| `generalpurposebutton1`        | 80             |
| `generalpurposebutton2`        | 81             |
| `generalpurposebutton3`        | 82             |
| `generalpurposebutton4`        | 83             |
| `controller84`                 | 84             |
| `controller85`                 | 85             |
| `controller86`                 | 86             |
| `controller87`                 | 87             |
| `controller88`                 | 88             |
| `controller89`                 | 89             |
| `controller90`                 | 90             |
| `reverblevel`                  | 91             |
| `tremololevel`                 | 92             |
| `choruslevel`                  | 93             |
| `celestelevel`                 | 94             |
| `phaserlevel`                  | 95             |
| `databuttonincrement`          | 96             |
| `databuttondecrement`          | 97             |
| `nonregisteredparametercoarse` | 98             |
| `nonregisteredparameterfine`   | 99             |
| `registeredparametercoarse`    | 100            |
| `registeredparameterfine`      | 101            |
| `controller102`                | 102            |
| `controller103`                | 103            |
| `controller104`                | 104            |
| `controller105`                | 105            |
| `controller106`                | 106            |
| `controller107`                | 107            |
| `controller108`                | 108            |
| `controller109`                | 109            |
| `controller110`                | 110            |
| `controller111`                | 111            |
| `controller112`                | 112            |
| `controller113`                | 113            |
| `controller114`                | 114            |
| `controller115`                | 115            |
| `controller116`                | 116            |
| `controller117`                | 117            |
| `controller118`                | 118            |
| `controller119`                | 119            |
| `allsoundoff`                  | 120            |
| `resetallcontrollers`          | 121            |
| `localcontrol`                 | 122            |
| `allnotesoff`                  | 123            |
| `omnimodeoff`                  | 124            |
| `omnimodeon`                   | 125            |
| `monomodeon`                   | 126            |
| `polymodeon`                   | 127            |
### `.MIDI_REGISTERED_PARAMETERS` {#MIDI_REGISTERED_PARAMETERS}
**Type**: Object.&lt;string, Array.&lt;number&gt;&gt;<br />
**Attributes**: static

Enumeration of all MIDI registered parameters and their associated pair of numerical values.
MIDI registered parameters extend the original list of control change messages. Currently,
there are only a limited number of them:


| Control Function             | [LSB, MSB]   |
|------------------------------|--------------|
| `pitchbendrange`             | [0x00, 0x00] |
| `channelfinetuning`          | [0x00, 0x01] |
| `channelcoarsetuning`        | [0x00, 0x02] |
| `tuningprogram`              | [0x00, 0x03] |
| `tuningbank`                 | [0x00, 0x04] |
| `modulationrange`            | [0x00, 0x05] |
| `azimuthangle`               | [0x3D, 0x00] |
| `elevationangle`             | [0x3D, 0x01] |
| `gain`                       | [0x3D, 0x02] |
| `distanceratio`              | [0x3D, 0x03] |
| `maximumdistance`            | [0x3D, 0x04] |
| `maximumdistancegain`        | [0x3D, 0x05] |
| `referencedistanceratio`     | [0x3D, 0x06] |
| `panspreadangle`             | [0x3D, 0x07] |
| `rollangle`                  | [0x3D, 0x08] |
### `.MIDI_SYSTEM_MESSAGES` {#MIDI_SYSTEM_MESSAGES}
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of all valid MIDI system messages and matching numerical values. WebMidi.js also
uses two additional custom messages.


**System common messages**

| Function               | Hexadecimal Value | Decimal Value   |
|------------------------|-------------------|-----------------|
| `sysex`                | 0xF0              |  240            |
| `timecode`             | 0xF1              |  241            |
| `songposition`         | 0xF2              |  242            |
| `songselect`           | 0xF3              |  243            |
| `tunerequest`          | 0xF6              |  246            |
| `sysexend`             | 0xF7              |  247            |

The `sysexend` message is never actually received. It simply ends a sysex stream.

**System real-time messages**

| Function               | Hexadecimal Value | Decimal Value   |
|------------------------|-------------------|-----------------|
| `clock`                | 0xF8              |  248            |
| `start`                | 0xFA              |  250            |
| `continue`             | 0xFB              |  251            |
| `stop`                 | 0xFC              |  252            |
| `activesensing`        | 0xFE              |  254            |
| `reset`                | 0xFF              |  255            |

Values 249 and 253 are relayed by the Web MIDI API but they do not serve any specific purpose.
The [MIDI 1.0 spec](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
simply states that they are undefined/reserved.

**Custom WebMidi.js messages**

| Function               | Hexadecimal Value | Decimal Value   |
|------------------------|-------------------|-----------------|
| `midimessage`          |                   |  0              |
| `unknownsystemmessage` |                   |  -1             |

