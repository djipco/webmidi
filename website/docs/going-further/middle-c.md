---
sidebar_position: 1
---

# Middle C & Octave Offset

## The Default Value for Middle C

The general MIDI 1.0 specification does not explicitly define a pitch for middle C but it does 
consider middle C to be note number 60. The **MIDI Tuning Standard** states that note number 69
should be tuned at 440Hz by default, which would also make middle C (60) to be C4. However, 
different manufacturers have assigned middle C to various octaves/pitches (usually C3, C4 or C5).

In accordance with the **MIDI Tuning Standard** and the 
[scientific pitch notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation), WebMidi.js 
considers middle C to be C4. 

## Offsetting Middle C

To make it easier to interface with devices using a different value for middle C, you can offset the 
note number for middle C by using the `octaveOffset` property. Changing this property on the 
[WebMidi](http://localhost:3000/webmidi/api/classes/WebMidi) object has a global effect. For more
granularity, You can also change it on the [Input](http://localhost:3000/webmidi/api/classes/Input),
[InputChannel](http://localhost:3000/webmidi/api/classes/InputChannel), 
[Output](http://localhost:3000/webmidi/api/classes/Output) and 
[OutputChannel](http://localhost:3000/webmidi/api/classes/OutputChannel) objects.

When a note-related MIDI message (note on, note off or key aftertouch) is received, the reported 
note number is always the one hard-coded in the inbound message. However, the reported octave is 
offset by the `octaveOffset` property. So, if you receive note number 60 and `octaveOffset` is et to
0, the reported octave will be 4 and the note name will be C4. If you receive the same note number
but the `octaveOffset` is set to -1, the reported octave will be 3 and the note name will be C3. 
