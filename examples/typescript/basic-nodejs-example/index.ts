import {WebMidi} from "webmidi";

async function start() {

  await WebMidi.enable();

  // List available inputs
  console.log("Available inputs: ");

  WebMidi.inputs.forEach(input => {
    console.log("\t" + input.name);
    input.addListener("noteon", e => console.log(e.note.identifier));
  });

  // List available outputs
  console.log("Available outputs: ");

  WebMidi.outputs.forEach(output => {
    console.log("\t" + output.name);
  });

}

start();
