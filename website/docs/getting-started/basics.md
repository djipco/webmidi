---
sidebar_position: 3
---

# Basics

## Enabling the Library 

The first step to get started is to enable the library. To do that, you simply call
[`WebMidi.enable()`](../../api/classes/WebMidi#enable). Starting with v3, the `enable()` method returns 
a promise which is resolved when the library has been enabled:

```javascript
WebMidi
  .enable()
  .then(() => console.log("WebMidi enabled!"))
  .catch(err => alert(err));
```

:::caution

If you intend to use MIDI **system exclusive** messages, you must explicitly enable them by setting 
the `sysex` option to `true`:

```javascript
WebMidi
  .enable({sysex: true})
  .then(() => console.log("WebMidi with sysex enabled!"))
  .catch(err => alert(err));
```

:::

## Listing Available Devices

To interact with devices you need to know which `Input` and `Output` ports are available. Connect a
MIDI device and try the following:

```javascript
WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));

function onEnabled() {
  
  // Inputs
  WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));
  
  // Outputs
  WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));

}
```

You should see your hardware and software devices appear in the console. Note that many devices make
available several input and/or output ports. 

You can retrieve a reference to an [`Input`](../../api/classes/Input) by using the 
[`getInputByName()`](../../api/classes/WebMidi#getInputByName) or
[`getInputById()`](../../api/classes/WebMidi#getInputById) methods:

```javascript
const myInput = WebMidi.getInputByName("MPK mini 3");
```
Once you have a reference to the input, you can add listeners that will react when a message (such
as a note press) arrives.

## Listening For Incoming MIDI Messages

On a MIDI device, an input has 16 discrete channels. If you want to listen on all of them, you can
add a listener directly on the [`Input`](../../api/classes/Input) object:

```javascript
const myInput = WebMidi.getInputByName("MPK mini 3");
myInput.addListener("noteon", e => {
  console.log(e.note.identifier);
})
```

Try playing a note on your device. You should see the note's name and octave in the console.

Obviously, you can listen to many more messages coming from your device. For a full list, check out
the [`Input.addListener()`](../../api/classes/Input#addListener) documentation.

It is also possible to listen to messages coming from a specific MIDI channel. For example, when
I press the drum pads on my Akai MPK Mini, the messages are sent to channel 10:

```javascript
const myInput = WebMidi.getInputByName("MPK mini 3");
const mySynth = myInput.channels[10]; // <-- the MIDI channel (10)

mySynth.addListener("noteon", e => {
  console.log(e.note.identifier, e.message.channel);
})
```
In this case, the listener only listens to **noteon** messages coming in from channel 10 of the 
input device.

## Sending Outgoing MIDI Messages

To send messages to an external device, you must first get a reference to it. For that, you can use
methods such as [`getOutputByName()`](../../api/classes/WebMidi#getOutputByName) or
[`getOutputById()`](../../api/classes/WebMidi#getOutputById):

```javascript
const myOutput = WebMidi.getOutputByName("SP-404MKII");
```

Then, you can use various methods to send your message. For example, if you want to tell you sampler
to turn all sounds off, you could do the following:

```javascript
const myOutput = WebMidi.getOutputByName("SP-404MKII");
myOutput.sendAllSoundOff();
```

You can learn about all the the methods available to send data by looking at the documentation for
the [`Output`](../../api/classes/Output) object.

You can send messages to a specific MIDI channel by first grabbing a reference to the channel you 
want. For example, on the Roland SP-404 MK II sampler, you can control a vocoder effet by sending a 
**pitchbend** message on channel 11:

```javascript
const myOutput = WebMidi.getOutputByName("SP-404MKII");
const vocoder = myOutput.channels[11];
vocoder.sendPitchBend(-0.5);
```
In this case, the `vocoder` constant contains an  [`OutputChannel`](../../api/classes/OutputChannel) 
object.


## Code Examples

Here are various other examples to give you an idea of what is possible with the library. All the
examples below only work if the library has first been properly enabled with 
[`WebMidi.enable()`](../../api/classes/WebMidi#enable).


### Retrieve an output port/device using its id, name or array index

Different ways to retrieve an output. Beware that IDs are different from one platform to another and
on Node.js the `id` is the same as the `name`.

```javascript
let output1 = WebMidi.getOutputById("123456789");
let output2 = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
let output3 = WebMidi.outputs[0];
```

### Play a note on a specific MIDI channel (1)

The `channels` property of an `Output` object contains references to 16 `OutputChannel` objects
(1-16).

```javascript
let output = WebMidi.outputs[0];
let channel = output.channels[1];
channel.playNote("C3");
```

### Play a note on multiple channels at once

You can call [`playNote()`](../../api/classes/Output#playNote) (and various other methods) directly 
on the [`Output`](../../api/classes/Output) object. This allows you to play a note on several 
channels at once. For example, to play a note on channels 1, 2 and 3:

```javascript
let output = WebMidi.outputs[0];
output.playNote("Gb4", [1, 2, 3]);
```
You can also create a [`Note`](../../api/classes/Note) object and pass it to the 
[`playNote()`](../../api/classes/Output#playNote) method:

```javascript
const note = new Note("A4");
const output = WebMidi.outputs[0];
output.playNote(note);
```

### Play a note on a specific MIDI channel

To play a note on a specific MIDI channel, you can use the 
[`playNote()`](../../api/classes/OutputChannel#playNote) method of the 
[`OutputChannel`](../../api/classes/OutputChannel) object (instead of the one on the
[`Output`](../../api/classes/Output) object).

For example, to play a chord on MIDI channel 1:

```javascript
let output = WebMidi.outputs[0];
let channel = output.channels[1];
channel.playNote(["C3", "D#3", "G3"]);
```

### Control note velocity

You can control attack and release velocities when playing a note by using the `options` parameter.

```javascript
let output = WebMidi.outputs[0];
let channel = output.channels[1];
channel.playNote("C3", {attack: 0.5});
```
If you prefer to use raw (7 bit) values between 0 and 127, you can use the `rawAttack` option 
instead: 

```javascript
let output = WebMidi.outputs[0];
let channel = output.channels[1];
channel.playNote("C3", {rawAttack: 123});
```

### Specify note duration

If you specify a duration (in decimal milliseconds) for the note, it will automatically be stopped
after the duration has expired. For example, to stop it after 1 second (1000 ms):

```javascript
let output = WebMidi.outputs[0];
let channel = output.channels[1];
channel.playNote("C3", {duration: 1000});
```

### Schedule notes

You can specify an absolute or relative time to schedule note playback in the future:

```javascript
WebMidi.outputs[0].channels[1].playNote("C3", {time: WebMidi.time + 3000});
WebMidi.outputs[0].channels[1].playNote("C3", {time: "+2000"});
```

You can retrieve the current time with [`WebMidi.time`](../../api/classes/WebMidi#time). The time is
in milliseconds (decimal) relative to the navigation start of the document.

### Manually stopping playback

You can stop playback of a note right away or in the future.

```javascript
WebMidi.outputs[0].channels[1].stopNote("C3");
WebMidi.outputs[0].channels[1].stopNote("C3", {time: "+2500"});
```

### Set polyphonic aftertouch

Send polyphonic aftertouch message to channel 8:

```javascript
WebMidi.outputs[0].channels[8].sendKeyAftertouch("B#3", 0.25);
```

### Set pitch bend value

The value is between -1 and 1 (a value of 0 means no bend).

```javascript
WebMidi.outputs[0].channels[8].setPitchBend(-0.25);
```
You can set the range of the bend with 
[`OutputChannel.sendPitchBendRange()`](../../api/classes/OutputChannel#sendPitchBendRange).

### Use Chained Methods

Most methods return `this` so you can chain them:

```javascript
WebMidi.outputs[0].channels[8]
    .setPitchBend(-0.25)
    .playNote("F4");
```

### Listen to event on single channel

```javascript
WebMidi.inputs[0].channels[1].addListener("noteon", e => {
  console.log(`Received 'noteon' message (${e.note.name}${e.note.octave}).`);
});
```

### Listen to event on multiple channels at once

If you add a listener to the `Input` instead of the `InputChannel`, you can listen on multiple 
channels at once by using the `channels` option:

```javascript
WebMidi.inputs[0].addListener("controlchange", e => {
  console.log(`Received 'controlchange' message.`, e);
}, {channels: [1, 2, 3]});
```
If you do not specify a `channels` option, the listener will listen on all channels.

### Check for the presence of an event listener

```javascript
let channel = WebMidi.inputs[0].channels[1];
let test = e => console.log(e);
channel.addListener('programchange', test);
console.log("Has event listener: ", channel.hasListener('programchange', test));
```

### Remove listeners

```javascript
let channel = WebMidi.inputs[0].channels[1];
let test = e => console.log(e);
channel.removeListener("noteoff", test);  // specifically this one
channel.removeListener("noteoff");        // all noteoff on this channel
channel.removeListener();                 // all listeners
```

## What's Next

I hope this short guide helped you getting started. Obviously, the library can do a whole lot more. 
Some of that is covered in the **Going Further** section but all of it is detailed in the [API 
documentation](../../api).

If you need help, you can ask questions in the 
[Forum](https://github.com/djipco/webmidi/discussions). If you want to stay posted, I suggest you 
subscribe to our low-volume [newsletter](https://mailchi.mp/eeffe50651bd/webmidijs-newsletter) and 
follow our [@webmidijs](https://twitter.com/webmidijs) account on Twitter.

Finally, if this software proves useful I cannot encourage you enough to support it by becoming a 
[sponsor](https://github.com/sponsors/djipco) on GitHub. 

-- [Jean-Philippe](../../about#who-created-this)
