// Enable WebMidi. 3 parameters: onSuccess handler, onFailure handler and boolean
// indicating if you want to use system exclusive messages (defaults to false).
WebMidi.enable(

  function() {

    // Viewing available inputs and outputs
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);

    // Getting the current time
    console.log(WebMidi.time);

    // Playing a note (C3 on all available devices/channels)
    WebMidi.playNote("C3");

    // Playing a chord (on all available devices/channels)
    WebMidi.playNote(["C3", "D#3", "G3"]);

    // Playing a note (F#-1, at full velocity on all available devices/channels)
    WebMidi.playNote("F#-1", 1);

    // Playing a note (on channel 3 of the first output device)
    WebMidi.playNote(60, 1, undefined, WebMidi.outputs[0], 3);
    WebMidi.playNote(60, 1, 1000, WebMidi.outputs[0], 3);             // send a noteoff after 1 sec.
    WebMidi.playNote(60, 1, 1000, WebMidi.outputs[0], 3, "+2000");    // wait 2 sec. before playing
    WebMidi.playNote(60, 1, 1000, WebMidi.outputs[0], 3, 50000.0);    // play 50 seconds after start

    // Stopping a playing note (with a release velocity at half)
    WebMidi.stopNote("C0", 0.5);
    WebMidi.stopNote("C0", 0.5, WebMidi.outputs[0], 12);          // For specific device and channel
    WebMidi.stopNote("C0", 0.5, WebMidi.outputs[0], 12, "+3000");    // After 3 sec. delay

    // Send polyphonic aftertouch message (half value)
    WebMidi.sendKeyAftertouch("C3", 0.5);
    WebMidi.sendKeyAftertouch("C3", 0.5, WebMidi.outputs[0], 12); // For specific device and channel

    // Send channel aftertouch
    WebMidi.sendChannelAftertouch(0.5, WebMidi.outputs[0], 12);

    // Send pitch bend (between -1 and 1)
    WebMidi.sendPitchBend(-1, WebMidi.outputs[0], 12);

    // Chaining method calls
    WebMidi.sendPitchBend(-1, WebMidi.outputs[0], 12)
      .sendPitchBend(-0.5, WebMidi.outputs[0], 12, 200)
      .sendPitchBend(0, WebMidi.outputs[0], 12, 400)
      .sendPitchBend(0.5, WebMidi.outputs[0], 12, 800)
      .sendPitchBend(1, WebMidi.outputs[0], 12, 1000);

    // Listening for a 'note on' message (on all devices and channels)
    WebMidi.addListener(
      'noteon',
      function(e){ console.log(e); }
    );

    // Listening for a 'note off' message (on device with id 1135369092 and channel 3)
    WebMidi.addListener(
      'noteoff',
      function(e){ console.log(e); },
      {input: WebMidi.inputs[0], channel: 3}
    );

    // Listening to other messages works the same way
    WebMidi.addListener(
      'pitchbend',
      function(e){ console.log(e); }
    );

    // The special 'statechange' event tells you that a device has been plugged or unplugged. For
    // system-wide events, you do not need to specify a device or channel.
    WebMidi.addListener(
      'statechange',
      function(e){ console.log(e); }
    );

    // You can also check and remove event listeners (in this case, you shouldn't use
    // anonymous methods).
    WebMidi.addListener('statechange', test);
    console.log("Has event listener: ",  WebMidi.hasListener('statechange', test) );
    WebMidi.removeListener('statechange', test);
    console.log("Has event listener: ",  WebMidi.hasListener('statechange', test) );

    function test(e) {
      console.log(e);
    }

  },

  function(m) {
    console.log("Could not enable MIDI interface: " + m);
  },

  true

);