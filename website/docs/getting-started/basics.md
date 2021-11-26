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

## What's Next

I hope this short guide helped you getting started. Obviously, the library can do a whole lot more. 
Some of that is covered in the **Going Further** section but all of it is detailed in the [API 
documentation](../../api/index).

If you need help, you can ask questions in the 
[Forum](https://github.com/djipco/webmidi/discussions). If you want to stay posted, I suggest you 
subscribe to our low-volume [newsletter](https://mailchi.mp/eeffe50651bd/webmidijs-newsletter) and 
follow our [@webmidijs](https://twitter.com/webmidijs) account on Twitter.

Finally, if this software proves useful I cannot encourage you enough to support it by becoming a 
[sponsor](https://github.com/sponsors/djipco) on GitHub. 

-- [Jean-Philippe Côté](../../about#who-created-this)
