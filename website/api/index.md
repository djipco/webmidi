---
sidebar_position: 1
title: API Documentation
slug: /
---

# API Documentation

## Core Classes

These classes are the ones developers are most likely to be dealing with while working on their MIDI 
projects. Note that all these classes are pre-instantiated within WebMidi.js.

* [**WebMidi**](classes/WebMidi)
* [**Input**](classes/Input)
* [**InputChannel**](classes/InputChannel)
* [**Output**](classes/Output)
* [**OutputChannel**](classes/OutputChannel)
* [**Message**](classes/Message)

The exception are the [`Note`](classes/Note) class which you can instantiate when you need to store 
a musical note and the [`Forwarder`](classes/Forwarder) class used to forward messages from an input
to an output:

* [**Note**](classes/Note)
* [**Forwarder**](classes/Forwarder)

## Support Classes

These classes are mostly for internal use, but you might find them useful in some contexts. The 
[`Enumerations`](classes/Enumerations) class contains static enums of MIDI messages, registered 
parameters, etc. The [`Utilities`](classes/Utilities) class contains various static methods. 

* [**Enumerations**](classes/Enumerations)
* [**Utilities**](classes/Utilities)

## DjipEvents Classes

The `EventEmitter` and `Listener` classes from the [DjipEvents](https://github.com/djipco/djipevents)
module are extended by various WebMidi.js classes. So, in the interest of completeness, we include
their full documentation here and cross-reference it with the core classes

* [**EventEmitter**](classes/EventEmitter)
* [**Listener**](classes/Listener)
