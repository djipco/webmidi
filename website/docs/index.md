---
sidebar_position: 1
slug: /
---

# Quick Start

**You want to quickly try out the library?** This quick start guide will let you establish a
connection with your MIDI instrument in less than 5 minutes.

⚠️ Hint: You can **go even faster** by copying the 
[code](https://github.com/djipco/webmidi/blob/master/examples/quick-start/index.html) from 
our GitHub repo.

## Step 1 - Create the HTML page

Create an HTML document and include the library: 

```html
<!DOCTYPE html>

<html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>WebMidi.js Quick Start</title>
    <script src="https://cdn.jsdelivr.net/npm/webmidi@3.0.0-alpha.16/dist/webmidi.iife.js"></script>
  </head>
  
  <body>
    <h1>WebMidi.js Quick Start</h1>
  </body>

</html>
```

## Step 2 - Add a script

Add the following `<script>` tag to the `<head>` of the HTML page. This code waits for the library 
to be loaded, then enables it and then displays available MIDI input devices (such as synths, drum 
machines, controllers, etc.):

```html
<script>

  // Make sure the library is loaded before starting
  window.addEventListener("load", e => {

    // Enable WebMidi.js and trigger the onEnabled() function when ready
    WebMidi
      .enable()
      .then(onEnabled)
      .catch(err => alert(err));

  });

  // Function triggered when WebMidi.js is ready
  function onEnabled() {

    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
      document.body.innerHTML+= "No device detected.";
    } else {
      WebMidi.inputs.forEach((device, index) => {
        document.body.innerHTML+= `${index}: ${device.name} <br>`;
      });
    }

  }
  
</script>
```
## Step 3 - Connect your device 

🎹 Connect an input MIDI device (synth, drum machine, controller, etc.) and load the HTML page in a 
compatible browser. The page will detect the device and display its name.

⚠️ If nothing shows up, first make sure your MIDI device is detected at the system level. Also make 
sure is shows up as an input device.

## Step 4 - Listen for MIDI messages

In the `onEnabled()` function, we now add a callback function that will be triggered each time 
```javascript
function onEnabled() {

  if (WebMidi.inputs.length < 1) {
    document.body.innerHTML+= "No device detected.";
  } else {
    WebMidi.inputs.forEach((device, index) => {
      document.body.innerHTML+= `${index}: ${device.name} <br>`;
    });
  }
  
  // Retrieve the first MIDI input device found
  const synth = WebMidi.inputs[0];
  
  // Retrieve the first MIDI channel of the device and add a listener 
  // for 'noteon' events.
  synth.channels[1].addListener("noteon", e => {
    document.body.innerHTML+= `${e.note.name} <br>`;
  });
  
}
```
If you wish to listen for notes on several channels, you can add the listener directly on the 
input device itself:

```javascript
// Listen to 'note on' events on channels 1, 2 and 3 of the first input MIDI device
WebMidi.inputs[0].addListener("noteon", e => {
  document.body.innerHTML+= `${e.note.name} <br>`;
}, {channels: [1, 2, 3]});
```

If you wish to use another device, simply substitute the `0` in `input[0]` for the index of the
device you want to use.

## Step 5 - Have fun!

**That's it!** To go further, please take some time to check out the 
[Getting Started](getting-started) section. It covers important topics such as instalaltion 
options, compatibility, security, etc.

If you ever need help, head over to the 
[GitHub Discussions](https://github.com/djipco/webmidi/discussions) page and ask all the questions
you want!
