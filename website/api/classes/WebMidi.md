<a name="WebMidi"></a>

# WebMidi ⇐ <code>EventEmitter</code>
The `WebMidi` object makes it easier to work with the Web MIDI API. Basically, it simplifies
sending outgoing MIDI messages and reacting to incoming MIDI messages.

When using the WebMidi.js library, the `WebMidi` class has already been instantiated for you.
If you use the **IIFE** version, you should simply use the global object called `WebMidi`. If you
use the **CJS** (CommonJS) or **ESM** (ES6 module) version, you get an already-instantiated
object. This means there is no need to instantiate a new `WebMidi` object directly.

The `WebMidi` object extends the
[EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
[djipevents](https://djipco.github.io/djipevents/index.html) module. This means
it also includes methods such as
[addListener()](https://djipco.github.io/djipevents/EventEmitter.html#addListener),
[removeListener()](https://djipco.github.io/djipevents/EventEmitter.html#removeListener),
[hasListener()](https://djipco.github.io/djipevents/EventEmitter.html#hasListener) and several
others.

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  
**Emits**: [<code>connected</code>](#WebMidi+event_connected), [<code>disconnected</code>](#WebMidi+event_disconnected), [<code>enabled</code>](#WebMidi+event_enabled), [<code>disabled</code>](#WebMidi+event_disabled)  

* [WebMidi](#WebMidi) ⇐ <code>EventEmitter</code>
    * [.interface](#WebMidi+interface) : <code>MIDIAccess</code>
    * [.validation](#WebMidi+validation) : <code>boolean</code>
    * [.enabled](#WebMidi+enabled) : <code>boolean</code>
    * [.inputs](#WebMidi+inputs) : <code>Array</code>
    * [.isNode](#WebMidi+isNode) : <code>boolean</code>
    * [.isBrowser](#WebMidi+isBrowser) : <code>boolean</code>
    * [.octaveOffset](#WebMidi+octaveOffset) : <code>number</code>
    * [.outputs](#WebMidi+outputs) : <code>Array</code>
    * [.supported](#WebMidi+supported) : <code>boolean</code>
    * [.sysexEnabled](#WebMidi+sysexEnabled) : <code>Boolean</code>
    * [.time](#WebMidi+time) : <code>DOMHighResTimeStamp</code>
    * [.MIDI_INTERFACE_EVENTS](#WebMidi+MIDI_INTERFACE_EVENTS) : <code>Array.&lt;string&gt;</code>
    * [.NOTES](#WebMidi+NOTES) : <code>Array.&lt;string&gt;</code>
    * [.MIDI_CHANNEL_VOICE_MESSAGES](#WebMidi+MIDI_CHANNEL_VOICE_MESSAGES) : <code>enum</code>
    * ~~[.MIDI_CHANNEL_MESSAGES](#WebMidi+MIDI_CHANNEL_MESSAGES) : <code>enum</code>~~
    * [.MIDI_CHANNEL_MODE_MESSAGES](#WebMidi+MIDI_CHANNEL_MODE_MESSAGES) : <code>enum</code>
    * [.MIDI_CONTROL_CHANGE_MESSAGES](#WebMidi+MIDI_CONTROL_CHANGE_MESSAGES) : <code>enum</code>
    * [.MIDI_NRPN_MESSAGES](#WebMidi+MIDI_NRPN_MESSAGES) : <code>enum</code>
    * [.MIDI_REGISTERED_PARAMETER](#WebMidi+MIDI_REGISTERED_PARAMETER) : <code>enum</code>
    * [.MIDI_SYSTEM_MESSAGES](#WebMidi+MIDI_SYSTEM_MESSAGES) : <code>enum</code>
    * [.enable([options])](#WebMidi+enable) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.disable()](#WebMidi+disable) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getInputById(id)](#WebMidi+getInputById) ⇒ <code>Input</code> \| <code>false</code>
    * [.getInputByName(name)](#WebMidi+getInputByName) ⇒ <code>Input</code> \| <code>false</code>
    * [.getOutputByName(name)](#WebMidi+getOutputByName) ⇒ <code>Output</code> \| <code>false</code>
    * [.getOutputById(id)](#WebMidi+getOutputById) ⇒ <code>Output</code> \| <code>false</code>
    * [.getNoteNumberByName(name)](#WebMidi+getNoteNumberByName) ⇒ <code>number</code> \| <code>false</code>
    * [.getOctave(number)](#WebMidi+getOctave) ⇒ <code>number</code> \| <code>false</code>
    * [.sanitizeChannels([channel])](#WebMidi+sanitizeChannels) ⇒ <code>Array</code>
    * [.guessNoteNumber(input)](#WebMidi+guessNoteNumber) ⇒ <code>number</code> \| <code>false</code>
    * [.getValidNoteArray([notes], [options])](#WebMidi+getValidNoteArray) ⇒ <code>Array.&lt;Note&gt;</code>
    * [.getNoteObject([notes], [options])](#WebMidi+getNoteObject) ⇒ <code>Note</code>
    * [.convertToTimestamp([time])](#WebMidi+convertToTimestamp) ⇒ <code>number</code> \| <code>false</code>
    * ["enabled"](#WebMidi+event_enabled)
    * ["disabled"](#WebMidi+event_disabled)
    * ["connected"](#WebMidi+event_connected)
    * ["disconnected"](#WebMidi+event_disconnected)

<a name="WebMidi+interface"></a>

## webMidi.interface : <code>MIDIAccess</code>
The `MIDIAccess` instance used to talk to the Web MIDI API. This should not be used directly
unless you know what you are doing.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
<a name="WebMidi+validation"></a>

## webMidi.validation : <code>boolean</code>
Indicates whether argument validation and backwards-compatibility checks are performed
throughout the WebMidi.js library for object methods and property setters.

This is an advanced setting that should be used carefully. Setting `validation` to `false`
improves performance but should only be done once the project has been thoroughly tested with
validation turned on.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
<a name="WebMidi+enabled"></a>

## webMidi.enabled : <code>boolean</code>
Indicates whether access to the host's MIDI subsystem is active or not.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
<a name="WebMidi+inputs"></a>

## webMidi.inputs : <code>Array</code>
An array of all currently available MIDI inputs.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
<a name="WebMidi+isNode"></a>

## webMidi.isNode : <code>boolean</code>
Indicates whether the current environment is Node.js or not. If you need to check if we are in
browser, use isBrowser. In certain environments (such as Electron and NW.js) isNode and
isBrowser can both be true at the same time.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
<a name="WebMidi+isBrowser"></a>

## webMidi.isBrowser : <code>boolean</code>
Indicates whether the current environment is a browser environment or not. If you need to check
if we are in Node.js, use isNode. In certain environments (such as Electron and NW.js) isNode
and isBrowser can both be true at the same time.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
<a name="WebMidi+octaveOffset"></a>

## webMidi.octaveOffset : <code>number</code>
An integer to offset the octave both in inbound and outbound messages. By default, middle C
(MIDI note number 60) is placed on the 4th octave (C4).

If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
`octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
**Since**: 2.1  
<a name="WebMidi+outputs"></a>

## webMidi.outputs : <code>Array</code>
An array of all currently available MIDI outputs.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
<a name="WebMidi+supported"></a>

## webMidi.supported : <code>boolean</code>
Indicates whether the environment provides support for the Web MIDI API or not.

**Note**: in environments that do not offer built-in MIDI support, this will report `true` if
the `navigator.requestMIDIAccess` function is available. For example, if you have installed
WebMIDIAPIShim.js but no plugin, this property will be `true` even though actual support might
not be there.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
<a name="WebMidi+sysexEnabled"></a>

## webMidi.sysexEnabled : <code>Boolean</code>
Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
enabled via the `enable()` method.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
<a name="WebMidi+time"></a>

## webMidi.time : <code>DOMHighResTimeStamp</code>
The elapsed time, in milliseconds, since the time
[origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).
Said simply, it is the number of milliseconds that passed since the page was loaded. Being a
floating-point number, it has sub-millisecond accuracy. According to the
[documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), the
time should be accurate to 5 µs (microseconds). However, due to various constraints, the
browser might only be accurate to one millisecond.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
<a name="WebMidi+MIDI_INTERFACE_EVENTS"></a>

## webMidi.MIDI\_INTERFACE\_EVENTS : <code>Array.&lt;string&gt;</code>
Array of valid events triggered at the interface level.

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
<a name="WebMidi+NOTES"></a>

## webMidi.NOTES : <code>Array.&lt;string&gt;</code>
Array of standard note names

**Kind**: instance property of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
<a name="WebMidi+MIDI_CHANNEL_VOICE_MESSAGES"></a>

## webMidi.MIDI\_CHANNEL\_VOICE\_MESSAGES : <code>enum</code>
Enum of all MIDI channel voice messages and their associated numerical value:

- `noteoff`: 0x8 (8)
- `noteon`: 0x9 (9)
- `keyaftertouch`: 0xA (10)
- `controlchange`: 0xB (11)
- `channelmode`: 0xB (11)
- `nrpn`: 0xB (11)
- `programchange`: 0xC (12)
- `channelaftertouch`: 0xD (13)
- `pitchbend`: 0xE (14)

**Kind**: instance enum of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
**Since**: 3.0.0  
<a name="WebMidi+MIDI_CHANNEL_MESSAGES"></a>

## ~~webMidi.MIDI\_CHANNEL\_MESSAGES : <code>enum</code>~~
***Deprecated***

Enum of all MIDI channel voice messages and their associated numerical value. Note that it
has been deprecated since v3.0. You should now use
[MIDI_CHANNEL_VOICE_MESSAGES](WebMidi.MIDI_CHANNEL_VOICE_MESSAGES).

**Kind**: instance enum of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
**Since**: 2.0.0  
<a name="WebMidi+MIDI_CHANNEL_MODE_MESSAGES"></a>

## webMidi.MIDI\_CHANNEL\_MODE\_MESSAGES : <code>enum</code>
Enum of all channel mode messages and their associated numerical value:

- `allsoundoff`: 120
- `resetallcontrollers`: 121
- `localcontrol`: 122
- `allnotesoff`: 123
- `omnimodeoff`: 124
- `omnimodeon`: 125
- `monomodeon`: 126
- `polymodeon`: 127

**Kind**: instance enum of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
**Since**: 2.0.0  
<a name="WebMidi+MIDI_CONTROL_CHANGE_MESSAGES"></a>

## webMidi.MIDI\_CONTROL\_CHANGE\_MESSAGES : <code>enum</code>
Enum of all control change messages and their associated numerical value:

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

**Kind**: instance enum of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
**Since**: 2.0.0  
<a name="WebMidi+MIDI_NRPN_MESSAGES"></a>

## webMidi.MIDI\_NRPN\_MESSAGES : <code>enum</code>
Enum of all control change messages that are used to create NRPN messages and their associated
numerical value:

- `entrymsb`: 6
- `entrylsb`: 38
- `increment`: 96
- `decrement`: 97
- `paramlsb`: 98
- `parammsb`: 99
- `nullactiveparameter`: 127

**Kind**: instance enum of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
**Since**: 2.0.0  
<a name="WebMidi+MIDI_REGISTERED_PARAMETER"></a>

## webMidi.MIDI\_REGISTERED\_PARAMETER : <code>enum</code>
Enum of all registered parameters and their associated pair of numerical values. MIDI
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

**Kind**: instance enum of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
**Since**: 2.0.0  
<a name="WebMidi+MIDI_SYSTEM_MESSAGES"></a>

## webMidi.MIDI\_SYSTEM\_MESSAGES : <code>enum</code>
Enum of all valid MIDI system messages and matching numerical values. WebMidi.js also uses
two custom messages.

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

**Kind**: instance enum of [<code>WebMidi</code>](#WebMidi)  
**Read only**: true  
**Since**: 2.0.0  
<a name="WebMidi+enable"></a>

## webMidi.enable([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Checks if the Web MIDI API is available in the current environment and then tries to connect to
the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
be displayed to the user.

To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
`true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
and system exclusive messages are always enabled. You can check the
[sysexEnabled](#WebMidi+sysexEnabled) property to confirm.

To enable access to software synthesizers available on the host, you would set the `software`
option to `true`. However, this option is only there to future-proof the library as support for
software synths has not yet been implemented in any browser (as of April 2020).

There are 3 ways to execute code after `WebMidi` has been enabled:

- Pass a callback function in the options
- Listen to the `enabled` event
- Wait for the promise to resolve

In order, this is what happens towards the end of the enabling process:

1. callback is executed
2. `enabled` event is triggered
3. `connected` events from available inputs and outputs are triggered
4. promise is resolved

The promise is fulfilled with an object containing two properties (`inputs` and `outputs`) that
contain arrays of available inputs and outputs, respectively.

**Important note**: starting with Chrome v77, a page using Web MIDI API must be hosted on a
secure origin (`https://`, `localhost` or `file:///`) and the user will always be prompted to
authorize the operation (no matter if the `sysex` option is `true` or not).

##### Examples
```js
// Enabling WebMidi and using the promise
WebMidi.enable().then(ports => {
  console.log("WebMidi.js has been enabled!");
  console.log("Inputs: ", ports.inputs);
  console.log("Outputs: ", ports.outputs);
})
```

```js
// Enabling WebMidi and listening to 'enabled' event
WebMidi.addListener("enabled", e => {
  console.log("WebMidi.js has been enabled!");
});
WebMidi.enable();
```

```js
// Enabling WebMidi and using callback function
WebMidi.enable({callback: e => {
  console.log("WebMidi.js has been enabled!");
});
```

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The promise is fulfilled with an object containing two properties
(`inputs` and `outputs`) that contain arrays of available inputs and outputs, respectively.  
**Throws**:

- Error The Web MIDI API is not supported in your environment.
- Error Jazz-Plugin must be installed to use WebMIDIAPIShim.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.callback] | <code>function</code> |  | A function to execute once the operation completes. This function will receive an `Error` object if enabling the Web MIDI API failed. |
| [options.sysex] | <code>boolean</code> | <code>false</code> | Whether to enable MIDI system exclusive messages or not. |
| [options.validation] | <code>boolean</code> | <code>true</code> | Whether to enable library-wide validation of method arguments and setter values. This is an advanced setting that should be used carefully. Setting `validation` to `false` improves performance but should only be done once the project has been thoroughly tested with validation turned on. |
| [options.software] | <code>boolean</code> | <code>false</code> | Whether to request access to software synthesizers on the host system. This is part of the spec but has not yet been implemented by most browsers as of April 2020. |

<a name="WebMidi+disable"></a>

## webMidi.disable() ⇒ <code>Promise.&lt;void&gt;</code>
Completely disables `WebMidi.js` by unlinking the MIDI subsystem's interface and closing all
[Input](Input) and [Output](Output) objects that may be available. This also means that listeners
added to [Input](Input) objects, [Output](Output) objects or to `WebMidi` itself are also
destroyed.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Throws**:

- Error The Web MIDI API is not supported by your environment.

**Since**: 2.0.0  
<a name="WebMidi+getInputById"></a>

## webMidi.getInputById(id) ⇒ <code>Input</code> \| <code>false</code>
Returns the [Input](Input) object that matches the specified ID string or `false` if no matching
input is found. As per the Web MIDI API specification, IDs are strings (not integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Returns**: <code>Input</code> \| <code>false</code> - An [Input](Input) object matching the specified ID string. If no matching
input can be found, the method returns `false`.  
**Throws**:

- Error WebMidi is not enabled.

**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID string of the input. IDs can be viewed by looking at the [inputs](#WebMidi+inputs) array. Even though they sometimes look like integers, IDs are strings. |

<a name="WebMidi+getInputByName"></a>

## webMidi.getInputByName(name) ⇒ <code>Input</code> \| <code>false</code>
Returns the first [Input](Input) object whose name **contains** the specified string. Note that
the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Returns**: <code>Input</code> \| <code>false</code> - The [Input](Input) that was found or `false` if no input contained the
specified name.  
**Throws**:

- <code>Error</code> WebMidi is not enabled.

**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The non-empty string to look for within the name of MIDI inputs (such as those visible in the [inputs](#WebMidi+inputs) array). |

<a name="WebMidi+getOutputByName"></a>

## webMidi.getOutputByName(name) ⇒ <code>Output</code> \| <code>false</code>
Returns the first [Output](Output) object whose name **contains** the specified string. Note that
the port names change from one environment to another. For example, Chrome does not report
input names in the same way as the Jazz-Plugin does.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Returns**: <code>Output</code> \| <code>false</code> - The [Output](Output) that was found or `false` if no output matched the
specified name.  
**Throws**:

- Error WebMidi is not enabled.

**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The non-empty string to look for within the name of MIDI inputs (such as those visible in the [outputs](#WebMidi+outputs) array). |

<a name="WebMidi+getOutputById"></a>

## webMidi.getOutputById(id) ⇒ <code>Output</code> \| <code>false</code>
Returns the [Output](Output) object that matches the specified ID string or `false` if no
matching output is found. As per the Web MIDI API specification, IDs are strings (not
integers).

Please note that IDs change from one host to another. For example, Chrome does not use the same
kind of IDs as Jazz-Plugin.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Returns**: <code>Output</code> \| <code>false</code> - An [Output](Output) object matching the specified ID string. If no
matching output can be found, the method returns `false`.  
**Throws**:

- Error WebMidi is not enabled.

**Since**: 2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID string of the port. IDs can be viewed by looking at the [outputs](#WebMidi+outputs) array. |

<a name="WebMidi+getNoteNumberByName"></a>

## webMidi.getNoteNumberByName(name) ⇒ <code>number</code> \| <code>false</code>
Returns a MIDI note number matching the note name passed in the form of a string parameter. The
note name must include the octave number. The name can also optionally include a sharp (#),
a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
names: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.

When converting note names to numbers, C4 is considered to be middle C (MIDI note number 60) as
per the scientific pitch notation standard.

The resulting note number is offset by the [octaveOffset](#WebMidi+octaveOffset) value (if
not zero). For example, if you pass in "C4" and the [octaveOffset](#WebMidi+octaveOffset)
value is 2, the resulting MIDI note number will be 36.

**Note**: since v3.x, this function returns `false` instead of throwing an error when it cannot
parse the name to a number.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Returns**: <code>number</code> \| <code>false</code> - The MIDI note number (an integer between 0 and 127) or `false` if the
name could not successfully be parsed to a number.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the note in the form of a letter, followed by an optional "#", "##", "b" or "bb" followed by the octave number. |

<a name="WebMidi+getOctave"></a>

## webMidi.getOctave(number) ⇒ <code>number</code> \| <code>false</code>
Returns the octave number for the specified MIDI note number (0-127). By default, the value is
based on middle C (note number 60) being placed on the 4th octave (C4). However, by using the
[octaveOffset](#WebMidi+octaveOffset) property, you can offset the result as desired.

**Note**: since v3.x, this method returns `false` instead of `undefined` when the value cannot
be parsed to a valid octave.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Returns**: <code>number</code> \| <code>false</code> - The octave (as a signed integer) or `false` if the value could not be
parsed to a valid octave.  
**Since**: 2.0.0-rc.6  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | An integer representing a valid MIDI note number (between 0 and 127). |

<a name="WebMidi+sanitizeChannels"></a>

## webMidi.sanitizeChannels([channel]) ⇒ <code>Array</code>
Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be a
single integer or an array of integers.

For backwards-compatibility, passing `undefined` as a parameter to this method results in all
channels being returned (1-16). Otherwise, parameters that cannot successfully be parsed to
integers between 1 and 16 are silently ignored.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Returns**: <code>Array</code> - An array of 0 or more valid MIDI channel numbers.  

| Param | Type | Description |
| --- | --- | --- |
| [channel] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | An integer or an array of integers to parse as channel numbers. |

<a name="WebMidi+guessNoteNumber"></a>

## webMidi.guessNoteNumber(input) ⇒ <code>number</code> \| <code>false</code>
Returns a valid MIDI note number (0-127) given the specified input. The parameter usually is a
string containing a note name (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer between 0
and 127 is passed, it will simply be returned as is (for convenience). Other strings will be
parsed for integer, if possible.

**Note**: since v3.x, this method returns `false` instead of throwing an error when the input
is invalid.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Returns**: <code>number</code> \| <code>false</code> - A valid MIDI note number (0-127) or `false` if the input could not
successfully be parsed to a note number.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>number</code> | A string to extract the note number from. An integer can also be used, in this case it will simply be returned as is (if between 0 and 127). |

<a name="WebMidi+getValidNoteArray"></a>

## webMidi.getValidNoteArray([notes], [options]) ⇒ <code>Array.&lt;Note&gt;</code>
Converts an input value, which can be an unsigned integer (0-127), a note name, a [Note](Note)
object or an array of the previous types, to an array of [Note](Note) objects.

[Note](Note) objects are returned as is. For note numbers and names, a [Note](Note) object is
created with the options specified. An error will be thrown when encountering invalid input.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Throws**:

- TypeError An element could not be parsed as a note.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [notes] | <code>number</code> \| <code>string</code> \| <code>Note</code> \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;Note&gt;</code> |  |  |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the note should be explicitly stopped. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The note's attack velocity as a decimal number between 0 and 1. |
| [options.release] | <code>number</code> | <code>0.5</code> | The note's release velocity as a decimal number between 0 and 1. |
| [options.rawAttack] | <code>number</code> | <code>64</code> | The note's attack velocity as an integer between 0 and 127. |
| [options.rawRelease] | <code>number</code> | <code>64</code> | The note's release velocity as an integer between 0 and 127. |

<a name="WebMidi+getNoteObject"></a>

## webMidi.getNoteObject([notes], [options]) ⇒ <code>Note</code>
Converts the `note` parameter to a valid [Note](Note) object. The input usually is an unsigned
integer (0-127) or a note name (`"C4"`, `"G#5"`, etc.). If the input is a [Note](Note) object,
it will be returned as is.

If the input is a note number or name, it is possible to specify options by providing the
optional `options` parameter.

An error is thrown for invalid input.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Throws**:

- TypeError The input could not be parsed as a note


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [notes] | <code>number</code> \| <code>string</code> \| <code>Note</code> |  |  |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.duration] | <code>number</code> | <code>Infinity</code> | The number of milliseconds before the note should be explicitly stopped. |
| [options.attack] | <code>number</code> | <code>0.5</code> | The note's attack velocity as a decimal number between 0 and 1. |
| [options.release] | <code>number</code> | <code>0.5</code> | The note's release velocity as a decimal number between 0 and 1. |
| [options.rawAttack] | <code>number</code> | <code>64</code> | The note's attack velocity as an integer between 0 and 127. |
| [options.rawRelease] | <code>number</code> | <code>64</code> | The note's release velocity as an integer between 0 and 127. |

<a name="WebMidi+convertToTimestamp"></a>

## webMidi.convertToTimestamp([time]) ⇒ <code>number</code> \| <code>false</code>
Returns a valid timestamp, relative to the navigation start of the document, derived from the
`time` parameter. If the parameter is a string starting with the "+" sign and followed by a
number, the resulting timestamp will be the sum of the current timestamp plus that number. If
the parameter is a positive number, it will be returned as is. Otherwise, false will be
returned.

**Kind**: instance method of [<code>WebMidi</code>](#WebMidi)  
**Returns**: <code>number</code> \| <code>false</code> - A positive number or `false` (if the time cannot be converted)  

| Param | Type | Description |
| --- | --- | --- |
| [time] | <code>number</code> \| <code>string</code> | The time string (e.g. `"+2000"`) or number to parse |

<a name="WebMidi+event_enabled"></a>

## "enabled"
Event emitted once `WebMidi` has been successfully enabled.

**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| target | [<code>WebMidi</code>](#WebMidi) | The object that triggered the event |
| type | <code>string</code> | `enabled` |

<a name="WebMidi+event_disabled"></a>

## "disabled"
Event emitted once `WebMidi` has been successfully disabled.

**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| target | [<code>WebMidi</code>](#WebMidi) | The object that triggered the event |
| type | <code>string</code> | `disabled` |

<a name="WebMidi+event_connected"></a>

## "connected"
Event emitted when an [Input](Input) or [Output](Output) becomes available. This event is
typically fired whenever a MIDI device is plugged in. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).

**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | The moment (DOMHighResTimeStamp) when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `connected` |
| target | <code>Input</code> \| <code>Output</code> | The [Input](Input) or [Output](Output) object that triggered the event. |

<a name="WebMidi+event_disconnected"></a>

## "disconnected"
Event emitted when an [Input](Input) or [Output](Output) becomes unavailable. This event is
typically fired whenever a MIDI device is unplugged. Please note that it may fire several
times if a device possesses multiple inputs and/or outputs (which is often the case).

**Kind**: event emitted by [<code>WebMidi</code>](#WebMidi)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | <code>DOMHighResTimeStamp</code> | The moment when the event occurred (in milliseconds since the navigation start of the document). |
| type | <code>string</code> | `disconnected` |
| target | <code>Object</code> | Object with properties describing the [Input](Input) or {@Output} that triggered the event. |
| target.connection | <code>string</code> | `"closed"` |
| target.id | <code>string</code> | ID of the input |
| target.manufacturer | <code>string</code> | Manufacturer of the device that provided the input |
| target.name | <code>string</code> | Name of the device that provided the input |
| target.state | <code>string</code> | `disconnected` |
| target.type | <code>string</code> | `input` or `output` |

