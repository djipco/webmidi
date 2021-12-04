---
sidebar_position: 1
slug: /migration
---

# Migration

:::caution

This document is a work in progress. Your feedback is critical in identifying and, hopefully, 
mitigating migration pitfalls. 🙏🏻 Please **share your observations, suggestions and issues** in the 
[**Migration**](https://github.com/djipco/webmidi/discussions/categories/migration) section of the forum
so they can benefit others! 

:::

## Highlights of the New Version

Version 3.x is a **major** update. It moves WEBMIDI.js from a smallish hobby project to a more 
serious long-term endeavour. Here are some key highlights:

- Modern architecture with **ESM** (ECMAScript module), **IIFE** (Immediately Invoked Function 
Expression) and **CJS** (CommonJS) flavours
- Full **Node.js** support
- **TypeScript** definitions files
- Various **new objects**:
  - [`InputChannel`](../api3/classes/InputChannel) and [`OutputChannel`](../api3/classes/OutputChannel) 
  objects to communicate with a single MIDI channel
  - [`Note`](../api3/classes/Note) object to store and pass around note information
  - [`Message`](../api3/classes/Message) object to better encapsulate MIDI messages
  - [`Forwarder`](../api3/classes/Forwarder) object to allow message forwarding from an input to an output
  - and others...
- More and better **unit tests** to prevent regression issues
- Support for **promises** where appropriate (such as 
[`WebMidi.enable()`](../api3/classes/WebMidi#enable))
- More granular **events**. For example:
  - `midiaccessgranted` to know when a user clicked the MIDI authorization prompt
  - `controlchange-controllerXXX` to listen to a single type of control change message
  - and various others...
- Ability to query **current note state** (currently playing or not) with 
[`InputChannel.getNoteState()`](../api3/classes/InputChannel#getNoteState) 
and [`InputChannel.notesState`](../api3/classes/InputChannel#notesState) array
- Ability to unplug and replug a device while **retaining its state**
- Better **sysex** (system exclusive) message support
- **Octave transposition** can be performed at the global, input/output or channel level
- and so much more!

## Backwards Compatibility

Backwards compatibility was a major concern while developing the new version. While every effort 
has been made to ease the transition, the new version might break a few things, mostly in edge 
cases.

Whenever it was possible, we deprecated old practices instead of completely dropping support. This 
means that your code should continue to work but you may see warnings in the console about the new 
ways to do things.

:::info

If you expected certain things to keep working after upgrade and they don't, please reach out in the
[**Migration**](https://github.com/djipco/webmidi/discussions/categories/migration) section of the
forum so whe can assess if the behaviour is expected or not and troubleshoot from there.

:::

## Architecture Change

In v2, there was a top-level `WebMidi` object that provided access to a list of inputs and outputs. 
Most of the activity happened at the `Input` and `Output` level. This is where you would listen for
inbound messages and send outbound messages.

For example, if you wanted to listen for a message on a single MIDI channel, you would have 
specified it in the call to `addListener()` in this manner:

```javascript
// In WebMidi.js version 2.5.x
WebMidi.inputs[0].addListener("noteon", 7, someFunction);
```

This would listen for **noteon** events on MIDI channel 7 of input 0. **While this still works in 
v3**, the preferred syntax would be: 

```javascript
WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [7]});
```

You may think (rightly so!) that this syntax is more cumbersome. The reasoning is that, if you want
to listen to events on a single channel, you should do so on the channel itself 
(the new [`InputChannel`](../api3/classes/InputChannel) object):

```javascript
WebMidi.inputs[0].channels[7].addListener("noteon", someFunction);
```

Here, `WebMidi.inputs[0].channels[7]` refers to an
[`InputChannel`](../api3/classes/InputChannel) object that has, for the most part, the same methods 
as the [`Input`](../api3/classes/Input) object you were used to in v2.5.x.

So, the idea is to use the [`Input`](../api3/classes/Input) object if you need to listen to events on 
more than one channel and to use the [`InputChannel`](../api3/classes/InputChannel) object to listen
for events dispatched by a single channel.

The exact same logic applies to the [`Output`](../api3/classes/Output) and 
[`OutputChannel`](../api3/classes/OutputChannel) objects. For example, if you want to send a 
**controlchange** message to all channels of an output, you can use:

```javascript
WebMidi.outputs[0].sendControlChange("resonance", 123);
```
To send to multiple, but specific, channels, you can use:

```javascript
WebMidi.outputs[0].sendControlChange("resonance", 123, {channels: [1, 2, 3]});
```

To send the message to a single channel (e.g. 7), you would use:

```javascript
WebMidi.outputs[0].channels[7].sendControlChange("resonance", 123);
```

In the end, the idea is to target specifically what is appropriate. Therefore, a more idiomatic
snippet would be something like this:

```javascript
const output = WebMidi.getOutputByName("My Awesome Midi Device");
const synth = output.channels[10];
synth.playNote("A4");
```

Having said all that, let me reiterate that **the previous way of doing things will still work in 
v3**. This will give you a chance to smoothly transition to the new version.

Let's recap. In v3, there is a top-level [`WebMidi`](../api3/classes/WebMidi) object which has both 
an [`inputs`](../api3/classes/WebMidi#inputs) and an [`outputs`](../api3/classes/WebMidi#outputs) 
array. These arrays contain, respectively, a list [`Input`](../api3/classes/Input) and 
[`Output`](../api3/classes/Output) objects. The [`Input`](../api3/classes/Input) and
[`Output`](../api3/classes/Output)  objects have a `channels` array that contains a list of 
[`InputChannel`](../api3/classes/InputChannel) or [`OutputChannel`](../api3/classes/OutputChannel)
objects.

## Things to Watch Out For

### The `WebMidi.enable()` method now returns a promise

**You can still use a callback** with [`WebMidi.enable()`](../api3/classes/WebMidi#enable) and it 
will work just like before. However, you are now welcome to use the promise-based approach:

```javascript
WebMidi.enable().then(() => {
  console.log("WebMidi.js has been enabled!");
})
```
