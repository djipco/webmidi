import { WebMidi } from 'webmidi';

async function start() {

  await WebMidi.enable();

  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);

}

start();
