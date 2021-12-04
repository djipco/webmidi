---
sidebar_position: 1
---

# Middle C & Octave Offset

## Default Value for Middle C

The general MIDI 1.0 specification does not explicitly define a pitch for middle C but it does 
consider middle C to be note number 60. The **MIDI Tuning Standard** states that note number 69
should be tuned at 440Hz by default, which would also make middle C (60) to be C4. However, 
different manufacturers have assigned middle C to various octaves/pitches (usually C3, C4 or C5).

In accordance with the **MIDI Tuning Standard** and the 
[**scientific pitch notation**](https://en.wikipedia.org/wiki/Scientific_pitch_notation), WebMidi.js 
considers middle C (261.626 Hz) to be C4 by default.

## Offsetting Middle C

You can offset the reported note name and octave by using the `octaveOffset` property of various 
objects. This will make it easier to interface with devices that do not place middle C at C4.

### Inbound Note Example

If your external MIDI keyboard sends C3 and WebMidi.js reports it as C4, it is because your keyboard
places middle C one octave lower than WebMidi.js does. To account for that, simply set 
`WebMidi.octaveOffset` to `-1`. This way, when your keyboard sends C3, WebMidi.js will also report 
it as C3.

In both cases the actual note number (60) remains the same. It is just being reported differently by
WebMidi.js.

### Outbound Note Example

If you are sending F#4 to an external device and that device thinks it's receiving F#5, it means
that the external device places middle C one octave higher than WebMidi.js. In this case, set 
`WebMidi.octaveOffset` to `1` to account for the difference.

## Offsetting Granularity

For most scenarios, setting the global `WebMidi.octaveOffset` is enough. However, the `octaveOffset`
property is available for several objects to allow for better granularity:

* [Input](http://localhost:3000/webmidi/api3/classes/Input)
* [InputChannel](http://localhost:3000/webmidi/api3/classes/InputChannel)
* [Output](http://localhost:3000/webmidi/api3/classes/Output)
* [OutputChannel](http://localhost:3000/webmidi/api3/classes/OutputChannel)
* [Note](http://localhost:3000/webmidi/api3/classes/Note)
* [WebMidi](http://localhost:3000/webmidi/api3/classes/WebMidi)

If you define `octaveOffset` on several objects, their value will be added. For example, if you 
set `WebMidi.octaveOffset` to `-1` and set `octaveOffset` on a specific channel to `1`, the 
resulting offset on that channel will be `0` (-1 + 1) while the offset on other channels will be 
`1`.
