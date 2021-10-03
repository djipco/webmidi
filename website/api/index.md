---
sidebar_position: 1
title: API Documentation
---

# API Documentation

:::caution

This documentation is for the **alpha** version currently under development. This version is 
unstable and **should not be used in production** environments. 

:::

:::info

While we port the API documentation over to the new system, the 
[old documentation format](https://djipco.github.io/webmidi/archives/api/v3/) will remain be 
available. 

:::

## Core Objects

These objects are the ones end-users are most likely to be dealing with while developing their MIDI 
projects. Note that all these objects are already instantiated within WebMidi.js.

* [**WebMidi**](classes/WebMidi)
* [**Input**](classes/Input)
* [**InputChannel**](classes/InputChannel)
* [**Output**](classes/Output)
* [**OutputChannel**](classes/OutputChannel)
* [**Message**](classes/Message)

The exception is the `Note` class which you can instantiate when you need to store a musical note:

* [**Note**](classes/Note)

## Support Classes

These classes are mostly for internal use but you might find them useful in some contexts. The 
`Enumerations` contains static enums of MIDI messages, registered parameters, etc. The `Utilities`
class contains various static methods. 

* [**Enumerations**](classes/Enumerations)
* [**Utilities**](classes/Utilities)
