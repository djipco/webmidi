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

    // Playing a note for 1 sec. by MIDI number (on all channels of device with id 1135369092). The
    // id can be viewed in WebMidi.outputs
    WebMidi.playNote(60, 1, 1000, "1135369092");

    // Playing a note (on channel 3 of a specific device)
    WebMidi.playNote(60, 1, undefined, "1135369092", 3);
    WebMidi.playNote(60, 1, 1000, "1135369092", 3);             // send a noteoff after 1 sec.
    WebMidi.playNote(60, 1, 1000, "1135369092", 3, "+2000");    // wait 2 sec. before playing
    WebMidi.playNote(60, 1, 1000, "1135369092", 3, 50000.0);    // play 50 seconds after start

    // Stopping a playing note (with a release velocity at half)
    WebMidi.stopNote("C0", 0.5);
    WebMidi.stopNote("C0", 0.5, "1135369092", 12);          // For specific device and channel
    WebMidi.stopNote("C0", 0.5, "1135369092", 12, "+3000");    // After 3 sec. delay

    // Send polyphonic aftertouch message (half value)
    WebMidi.sendKeyAftertouch("C3", 0.5);
    WebMidi.sendKeyAftertouch("C3", 0.5, "1135369092", 12); // For specific device and channel

    // Send channel aftertouch
    WebMidi.sendChannelAftertouch(0.5, "1135369092", 12);

    // Send pitch bend (between -1 and 1)
    WebMidi.sendPitchBend(-1, "1135369092", 12);

    // Chaining method calls
    WebMidi.sendPitchBend(-1, "1135369092", 12)
      .sendPitchBend(-0.5, "1135369092", 12, 200)
      .sendPitchBend(0, "1135369092", 12, 400)
      .sendPitchBend(0.5, "1135369092", 12, 800)
      .sendPitchBend(1, "1135369092", 12, 1000);

    // Listening for a 'note on' message (on all devices and channels)
    WebMidi.addListener(
      'noteon',
      function(e){ console.log(e); }
    );

    // Listening for a 'note off' message (on device with id 1135369092 and channel 3)
    WebMidi.addListener(
      'noteoff',
      function(e){ console.log(e); },
      {device: "1135369092", channel: 3}
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