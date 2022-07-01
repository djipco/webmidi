// This file is required by the index.html file and will be executed in the renderer process for
// that window. No Node.js APIs are available in this process because `nodeIntegration` is turned
// off. Use `preload.js` to selectively enable features needed in the rendering process.

import {WebMidi} from "./node_modules/webmidi/dist/esm/webmidi.esm.js";

WebMidi.enable()
  .then(onEnabled)
  .catch(err => console.warning(err));

function onEnabled() {

  document.getElementById("webmidi-version").innerHTML += `v${WebMidi.version}`;

  WebMidi.inputs.forEach(input => {
    document.getElementById("webmidi-inputs").innerHTML += `${input.name}, `;
  });

  WebMidi.outputs.forEach(output => {
    document.getElementById("webmidi-outputs").innerHTML += `${output.name}, `;
  });

}
