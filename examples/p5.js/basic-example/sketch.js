function setup() {

  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();

  // Enable WebMidi.js and trigger the onWebMidiEnabled() function when ready.
  WebMidi.enable()
    .then(onWebMidiEnabled)
    .catch(err => alert(err));

}

function draw() {

}

function onWebMidiEnabled() {

  // Check if at least one MIDI input is detected. If not, display warning and quit.
  if (WebMidi.inputs.length < 1) {
    alert("No MIDI inputs detected.");
    return;
  }

  // Add a listener on all the MIDI inputs that are detected
  WebMidi.inputs.forEach(input => {

    // When a "note on" is received on MIDI channel 1, generate a random color start
    input.channels[1].addListener("noteon", function() {
      fill(random(255), random(255), random(255));
      circle(random(width), random(height), 100);
    });

  });

}
