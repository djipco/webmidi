import { WebMidi } from '../../dist/cjs/webmidi.cjs.js';

async function start() {

  await WebMidi.enable();

  // console.log(WebMidi.inputs);
  // console.log(WebMidi.outputs);

  const input = WebMidi.getInputByName("MPK mini 3");

  input.addListener('noteon', (e) => {
    console.log(e);
  });

}

start();
