---
sidebar_position: 1
title: API Documentation
slug: /
---

# API Documentation

## Core Classes

These classes are the ones developers are most likely to be dealing with while working on their MIDI 
projects. Note that all these classes are pre-instantiated within WebMidi.js.

* [**WebMidi**](api/classes/WebMidi)
* [**Input**](api/classes/Input)
* [**InputChannel**](api/classes/InputChannel)
* [**Output**](api/classes/Output)
* [**OutputChannel**](api/classes/OutputChannel)
* [**Message**](api/classes/Message)

The exception are the [`Note`](api/classes/Note) class which you can instantiate when you need to store 
a musical note and the [`Forwarder`](api/classes/Forwarder) class used to forward messages from an input
to an output:

* [**Note**](api/classes/Note)
* [**Forwarder**](api/classes/Forwarder)

## Support Classes

These classes are mostly for internal use, but you might find them useful in some contexts. The 
[`Enumerations`](api/classes/Enumerations) class contains static enums of MIDI messages, registered 
parameters, etc. The [`Utilities`](api/classes/Utilities) class contains various static methods. 

* [**Enumerations**](api/classes/Enumerations)
* [**Utilities**](api/classes/Utilities)

## DjipEvents Classes

The `EventEmitter` and `Listener` classes from the [DjipEvents](https://github.com/djipco/djipevents)
module are extended by various WebMidi.js classes. So, in the interest of completeness, we include
their full documentation here and cross-reference it with the core classes

* [**EventEmitter**](api/classes/EventEmitter)
* [**Listener**](api/classes/Listener)
