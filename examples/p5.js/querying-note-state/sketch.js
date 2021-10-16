let channel, ready;

async function setup() {

  // Enable WebMidi.js
  await WebMidi.enable();

  // Display available inputs in console (use the name to retrieve it)
  console.log(WebMidi.inputs);
  const input = WebMidi.getInputByName("nanoKEY2 KEYBOARD");
  channel = input.channels[1];

  // Once WebMidi is enabled, we can start using it in draw()
  ready = true;

  // Create canvas
  createCanvas(500, 200);

}

function draw() {

  if (!ready) return;

  // Draw blank keys
  for (let i = 0; i < 8; i++) {

    // Default fill is white
    fill("white");

    // Each key has its own color. When its pressed, we draw it in color (instead of white)
    if (i === 0 && channel.getNoteState("C4")) {
      fill("yellow");
    } else if (i === 1 && channel.getNoteState("D4")) {
      fill("red");
    } else if (i === 2 && channel.getNoteState("E4")) {
      fill("pink");
    } else if (i === 3 && channel.getNoteState("F4")) {
      fill("orange");
    } else if (i === 4 && channel.getNoteState("G4")) {
      fill("purple");
    } else if (i === 5 && channel.getNoteState("A4")) {
      fill("green");
    } else if (i === 6 && channel.getNoteState("B4")) {
      fill("turquoise");
    } else if (i === 7 && channel.getNoteState("C5")) {
      fill("blue");
    }

    // Draw the keys
    rect(85 + i * 40, 50, 30, 100);

  }

}
