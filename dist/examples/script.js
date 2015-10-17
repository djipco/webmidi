// Enable WebMidi. 3 parameters: onSuccess handler, onFailure handler and boolean
// indicating if you want to use system exclusive messages (defaults to false).
WebMidi.enable(

  function() {

    WebMidi.playNote(0, [61, "62", "d#5"], 0.5);
    WebMidi.stopNote(0, [61, "62", "d#5"], 0.5, 1000);

  //  // Viewing available inputs and outputs
  //  console.log(WebMidi.inputs);
  //  console.log(WebMidi.outputs);
  //
  //  // Getting the current time
  //  console.log(WebMidi.time);
  //
  //  // Playing a note (note number 59 on the 1st channel [0] at half velocity)
  //  WebMidi.playNote(0, 60, 0.5);
  //  WebMidi.playNote(0, 60, 0.5, 1000);           // send a noteoff after 1 sec.
  //  WebMidi.playNote(0, 60, 0.5, 1000, 1000);     // wait 1 sec. before playing
  //
  //  // Stopping a playing note
  //  WebMidi.stopNote(0, 60, 1);
  //  WebMidi.stopNote(0, 60, 0.5, 2000);           // wait 2 sec. before stopping
  //
  //  // Send polyphonic aftertouch message
  //  WebMidi.sendKeyAftertouch(0, 60, 0.5);
  //  WebMidi.sendKeyAftertouch(0, 60, 0.5, 1000);  // wait 1 sec. before sending
  //
  //  // Send control change value 127 to controller 1 (modulation) on channel 0
  //  WebMidi.sendControlChange(0, 1, 127);
  //  WebMidi.sendControlChange(0, 1, 127, 1000);     // wait 1 sec. before sending
  //
  //  // Send channel aftertouch
  //  WebMidi.sendChannelAftertouch(0, 0.5);
  //
  //  // Send pitch bend (between -1 and 1)
  //  WebMidi.sendPitchBend(0, -1);
  //
  //  // Chaining method calls
  //  WebMidi.sendPitchBend(0, -1)
  //    .sendPitchBend(0, -0.5, 200)
  //    .sendPitchBend(0, 0, 400)
  //    .sendPitchBend(0, 0.5, 800)
  //    .sendPitchBend(0, 1, 1000);
  //
  //  // Listening for a 'note on' message (on all channels)
  //  WebMidi.addEventListener(
  //    'noteon',
  //    function(e){ console.log(e); },
  //    'all'
  //  );
  //
  //  // Listening for a 'note on' message (on channel 0 only)
  //  WebMidi.addEventListener(
  //    'noteon',
  //    function(e){ console.log(e); },
  //    0
  //  );
  //
  //  // Listening to other messages works the same way (defaults to 'all' channels)
  //  WebMidi.addEventListener(
  //    'noteoff',
  //    function(e){ console.log(e); }
  //  );
  //
  //  WebMidi.addEventListener(
  //    'pitchbend',
  //    function(e){ console.log(e); }
  //  );
  //
  //
  //  // The special 'statechange' event tells you that a device has been plugged or
  //  // unplugged. For system-wide events, you do not need to specify a channel.
  //  WebMidi.addEventListener(
  //    'statechange',
  //    function(e){ console.log(e); }
  //  );
  //
  //
  //  // You can also check and remove event listeners (in this case, you shouldn't use
  //  // anonymous methods).
  //  WebMidi.addEventListener('statechange', test);
  //  console.log("Has event listener: ",  WebMidi.hasEventListener('statechange', test) );
  //  WebMidi.removeEventListener('statechange', test);
  //  console.log("Has event listener: ",  WebMidi.hasEventListener('statechange', test) );
  //
  //  function test(e) {
  //    console.log(e);
  //  }

  },

  function(m) {
    console.log("Could not enable MIDI interface: " + m);
  },

  true      // Whether to enable sysex or not. When set to 'true', it might trigger an
            // authorization prompt to the user. If you do not need it, leave it to false.

);