---
sidebar_position: 1
title: API Documentation
slug: /
---

# API Documentation

## Core Classes

These classes are the ones developers are most likely to be dealing with while working on their MIDI 
projects. Note that all these classes are pre-instantiated within WEBMIDI.js.

* [**WebMidi**](./classes/WebMidi.md)
* [**Input**](./classes/Input.md)
* [**InputChannel**](./classes/InputChannel.md)
* [**Output**](./classes/Output.md)
* [**OutputChannel**](./classes/OutputChannel.md)
* [**Message**](./classes/Message.md)

The exception are the [`Note`](./classes/Note.md) class which you can instantiate when you need
to store a musical note and the [`Forwarder`](./classes/Forwarder.md) class used to forward
messages from an input to an output:

* [**Note**](./classes/Note.md)
* [**Forwarder**](./classes/Forwarder.md)

## Support Classes

These classes are mostly for internal use, but you might find them useful in some contexts. The 
[`Enumerations`](./classes/Enumerations.md) class contains static enums of MIDI messages,
registered parameters, etc. The [`Utilities`](./classes/Utilities.md) class contains various 
static methods. 

* [**Enumerations**](./classes/Enumerations.md)
* [**Utilities**](./classes/Utilities.md)

## DjipEvents Classes

The `EventEmitter` and `Listener` classes from the 
[DjipEvents](https://github.com/djipco/djipevents) module are extended by various WEBMIDI.js 
classes. So, in the interest of completeness, we include their full documentation here and 
cross-reference it with the core classes

* [**EventEmitter**](./classes/EventEmitter.md)
* [**Listener**](./classes/Listener.md)
