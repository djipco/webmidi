# Enumerations

The `Enumerations` class contains enumerations of elements used throughout the library. All
enumerations are static and should be referenced using the class name. For example:
`Enumerations.MIDI_CHANNEL_MESSAGES`.

**Since**: 3.0.0




***

## Enums

### `.MIDI_CHANNEL_MESSAGES`
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of all MIDI channel messages and their associated 4-bit numerical value:

- `noteoff`: 0x8 (8)
- `noteon`: 0x9 (9)
- `keyaftertouch`: 0xA (10)
- `controlchange`: 0xB (11)
- `nrpn`: 0xB (11)
- `programchange`: 0xC (12)
- `channelaftertouch`: 0xD (13)
- `pitchbend`: 0xE (14)


### `.MIDI_CHANNEL_MODE_MESSAGES`
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of all channel mode messages and their associated numerical value:

- `allsoundoff`: 120
- `resetallcontrollers`: 121
- `localcontrol`: 122
- `allnotesoff`: 123
- `omnimodeoff`: 124
- `omnimodeon`: 125
- `monomodeon`: 126
- `polymodeon`: 127


### `.MIDI_CONTROL_CHANGE_MESSAGES`
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of most control change messages and their associated numerical value. Note that
some control change numbers do not have a predefined purpose and are absent from this list.

- `bankselectcoarse`: 0
- `modulationwheelcoarse`: 1
- `breathcontrollercoarse`: 2
- `footcontrollercoarse`: 4
- `portamentotimecoarse`: 5
- `dataentrycoarse`: 6
- `volumecoarse`: 7
- `balancecoarse`: 8
- `pancoarse`: 10
- `expressioncoarse`: 11
- `effectcontrol1coarse`: 12
- `effectcontrol2coarse`: 13
- `generalpurposeslider1`: 16
- `generalpurposeslider2`: 17
- `generalpurposeslider3`: 18
- `generalpurposeslider4`: 19
- `bankselectfine`: 32
- `modulationwheelfine`: 33
- `breathcontrollerfine`: 34
- `footcontrollerfine`: 36
- `portamentotimefine`: 37
- `dataentryfine`: 38
- `volumefine`: 39
- `balancefine`: 40
- `panfine`: 42
- `expressionfine`: 43
- `effectcontrol1fine`: 44
- `effectcontrol2fine`: 45
- `holdpedal`: 64
- `portamento`: 65
- `sustenutopedal`: 66
- `softpedal`: 67
- `legatopedal`: 68
- `hold2pedal`: 69
- `soundvariation`: 70
- `resonance`: 71
- `soundreleasetime`: 72
- `soundattacktime`: 73
- `brightness`: 74
- `soundcontrol6`: 75
- `soundcontrol7`: 76
- `soundcontrol8`:`77
- `soundcontrol9`: 78
- `soundcontrol10`: 79
- `generalpurposebutton1`: 80
- `generalpurposebutton2`: 81
- `generalpurposebutton3`: 82
- `generalpurposebutton4`: 83
- `reverblevel`: 91
- `tremololevel`: 92
- `choruslevel`: 93
- `celestelevel`: 94
- `phaserlevel`: 95
- `databuttonincrement`: 96
- `databuttondecrement`: 97
- `nonregisteredparametercoarse`: 98
- `nonregisteredparameterfine`: 99
- `registeredparametercoarse`: 100
- `registeredparameterfine`: 101

- `allsoundoff`: 120
- `resetallcontrollers`: 121
- `localcontrol`: 122
- `allnotesoff`: 123
- `omnimodeoff`: 124
- `omnimodeon`: 125
- `monomodeon`: 126
- `polymodeon`: 127


### `.MIDI_REGISTERED_PARAMETERS`
**Type**: Object.&lt;string, Array.&lt;number&gt;&gt;<br />
**Attributes**: static

Enumeration of all registered parameters and their associated pair of numerical values. MIDI
registered parameters extend the original list of control change messages. Currently, there are
only a limited number of them:

- `pitchbendrange`: [0x00, 0x00]
- `channelfinetuning`: [0x00, 0x01]
- `channelcoarsetuning`: [0x00, 0x02]
- `tuningprogram`: [0x00, 0x03]
- `tuningbank`: [0x00, 0x04]
- `modulationrange`: [0x00, 0x05]
- `azimuthangle`: [0x3D, 0x00]
- `elevationangle`: [0x3D, 0x01]
- `gain`: [0x3D, 0x02]
- `distanceratio`: [0x3D, 0x03]
- `maximumdistance`: [0x3D, 0x04]
- `maximumdistancegain`: [0x3D, 0x05]
- `referencedistanceratio`: [0x3D, 0x06]
- `panspreadangle`: [0x3D, 0x07]
- `rollangle`: [0x3D, 0x08]


### `.MIDI_SYSTEM_MESSAGES`
**Type**: Object.&lt;string, number&gt;<br />
**Attributes**: static

Enumeration of all valid MIDI system messages and matching numerical values. WebMidi.js also
uses two custom messages.

**System common messages**
- `sysex`: 0xF0 (240)
- `timecode`: 0xF1 (241)
- `songposition`: 0xF2 (242)
- `songselect`: 0xF3 (243)
- `tunerequest`: 0xF6 (246)
- `sysexend`: 0xF7 (247)

The `sysexend` message is never actually received. It simply ends a sysex stream.

**System real-time messages**

- `clock`: 0xF8 (248)
- `start`: 0xFA (250)
- `continue`: 0xFB (251)
- `stop`: 0xFC (252)
- `activesensing`: 0xFE (254)
- `reset`: 0xFF (255)

Values 249 and 253 are actually relayed by the Web MIDI API but they do not serve a specific
purpose. The
[MIDI 1.0 spec](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
simply states that they are undefined/reserved.

**Custom WebMidi.js messages**

- `midimessage`: 0
- `unknownsystemmessage`: -1



