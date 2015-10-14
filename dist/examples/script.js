//var midi, data;
//
//// Check if MIDI is supported by the browser
//if (navigator.requestMIDIAccess) {
//  navigator.requestMIDIAccess({ sysex: false}).then(onMIDISuccess, onMIDIFailure);
//} else {
//  alert("No MIDI support in your browser.");
//}
//
//// midi functions
//function onMIDISuccess(midiAccess) {
//  // when we get a succesful response, run this code
//  midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
//
//  var inputs = midi.inputs.values();
//  // loop over all available inputs and listen for any MIDI input
//  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
//    // each time there is a midi message call the onMIDIMessage function
//    input.value.onmidimessage = onMIDIMessage;
//  }
//}
//
//function onMIDIFailure(error) {
//  // when we get a failed response, run this code
//  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
//}
//
//function onMIDIMessage(message) {
//  data = message.data; // this gives us our [command/channel, note, velocity] data.
//  console.log('MIDI data', data); // MIDI data [144, 63, 73]
//}



WebMidi.enable(
  function() {

    //console.log(WebMidi);
    //console.log(WebMidi.inputs);
    //console.log(WebMidi.outputs);
    //console.log(WebMidi.time);

    //WebMidi.stopNote(2, 76, 1);
    //WebMidi.stopNote(2, 76, 0.5, 2000);

    //WebMidi.playNote(2, 59, 0.5);
    //WebMidi.playNote(2, 59, 0.75, 1000);
    //WebMidi.playNote(2, 59, 0.75, 1000, 1000);

    //WebMidi.sendKeyAftertouch(2, 84, 1);
    //WebMidi.sendKeyAftertouch(2, 84, 0.5, 1000);

    //WebMidi.sendControlChange(2, 34, 127);
    //WebMidi.sendControlChange(2, 23, 0, 1000);

    //WebMidi.sendChannelMode(2, 123, 0);
    //WebMidi.sendChannelMode(2, 56, 0);
    //WebMidi.sendChannelMode(2, 125, 0);
    //WebMidi.sendChannelMode(2, 126, 10);

    //WebMidi.sendProgramChange(2, 32);

    //WebMidi.sendChannelAftertouch(2, 0.5);

    //WebMidi.sendPitchBend(2, -1);       // -8192
    //WebMidi.sendPitchBend(2, 1);        // 8191
    //WebMidi.sendPitchBend(2, 0.5);      // 4095
    //WebMidi.sendPitchBend(2, 0);        // 0
    //WebMidi.sendPitchBend(2, 0, 2000);  // 0

    //WebMidi.sendSystemMessage("start", []);
    //WebMidi.sendSystemMessage("start", [], WebMidi.time + 3000);

    //WebMidi.sendSystemMessage("sysex", [1, 2, 0xF7])
    //  .sendSystemMessage("timecode", [123])
    //  .sendSystemMessage("songposition", [123, 123])
    //  .sendSystemMessage("songselect", [123]);
      //.sendSystemMessage("tuningrequest");
      //.sendSystemMessage("sysexend");


    //WebMidi.sendSystemMessage("clock")
    //  .sendSystemMessage("start")
    //  .sendSystemMessage("continue")
    //  .sendSystemMessage("stop")
    //  .sendSystemMessage("activesensing")
    //  .sendSystemMessage("reset");

    //WebMidi.sendSysexMessage([0x41], [1, 2, 3]);



    //WebMidi.addEventListener("statechange", function(e){
    //  console.log(e);
    //});

    //WebMidi.addEventListener('noteoff', "all", function(e){
    //  console.log(e);
    //});

    //WebMidi.addEventListener('noteon', function(e){
    //  console.log(e);
    //});

    //WebMidi.addEventListener('keyaftertouch', 0, function(e){
    //  console.log(e);
    //});

    //WebMidi.addEventListener('controlchange', 0, function(e){
    //  console.log(e);
    //});

    //WebMidi.addEventListener('channelmode', 0, function(e){
    //  console.log(e);
    //});

    //WebMidi.addEventListener('programchange', function(e){
    //  console.log(e);
    //});

    //WebMidi.addEventListener('channelaftertouch', 0, function(e){
    //  console.log(e);
    //});

    //WebMidi.addEventListener('pitchbend', "all", function(e){
    //  console.log(e);
    //});




    function test(e){
      console.log(e);
      console.log("a");
    }

    function test1(e){
      console.log(e);
      console.log("b");
    }

    //WebMidi.addEventListener('noteon', test, 'all');
    //WebMidi.removeEventListener('noteon', test, 2);
    //console.log("result:",  WebMidi.hasEventListener('noteon', test, 'all') );
    //WebMidi.addEventListener('noteon', test, 'all');
    ////WebMidi.removeEventListener('noteon', test, "all");
    //console.log("result:",  WebMidi.hasEventListener('noteon', test, 'all') );

    WebMidi.addEventListener('statechange', test);
    WebMidi.removeEventListener('statechange', test);
    console.log("result:",  WebMidi.hasEventListener('statechange', test) );
    WebMidi.addEventListener('statechange', test);
    WebMidi.removeEventListener('statechange', test);
    console.log("result:",  WebMidi.hasEventListener('statechange', test) );



  },
  function(m) {
    console.log("Fuck. " + m);
  },
  true
);