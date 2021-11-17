---
sidebar_position: 1
slug: /
---

# Quick Start

**You want to get started as quickly as possible?** This guide will let you establish a connection
with your MIDI instrument in less than 5 minutes.

:::info

This guide is for **version 3.x**. Documentation for [version 2.5.x](archives/v2) and
[version 1.0.0](archives/v1) is also available.

:::

## Step 1 - Create the HTML page

:::tip

Hint: You can **go even faster** by copying the
[code](https://github.com/djipco/webmidi/blob/develop/examples/quick-start/index.html) from
our GitHub repo.

:::

Create an HTML document and include the library (this will install the latest alpha version): 

```html
<!DOCTYPE html>

<html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>WebMidi.js Quick Start</title>
    <script src="https://cdn.jsdelivr.net/npm/webmidi@next/dist/iife/webmidi.iife.js"></script>
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
<script type="module">

  // Enable WebMidi.js and trigger the onEnabled() function when ready
  WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

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
compatible browser. You will be prompted to authorize the MIDI connection.

After authorization, the page should detect the connected MIDI devices and display their name.

:::info

If nothing shows up, first make sure your MIDI device is detected at the operating system level.

:::

## Step 4 - Listen for MIDI messages

In the `onEnabled()` function, we first retrieve the input device we want to work with and store it
in the `mySynth` variable. You can retrieve it by number or by name (as you wish).

Then we use the `addListener()` method on MIDI channel 1 of the input device to add a 
callback function that will be called each time a **noteon** event is received on that MIDI channel.

```javascript
function onEnabled() {

  if (WebMidi.inputs.length < 1) {
    document.body.innerHTML+= "No device detected.";
  } else {
    WebMidi.inputs.forEach((device, index) => {
      document.body.innerHTML+= `${index}: ${device.name} <br>`;
    });
  }
  
  const mySynth = WebMidi.inputs[0];
  // const mySynth = WebMidi.getInputByName("TYPE NAME HERE!")
  
  mySynth.channels[1].addListener("noteon", e => {
    document.body.innerHTML+= `${e.note.name} <br>`;
  });
  
}
```
Alternatively, if you wish to listen for notes from several channels at once, you can add the 
listener directly on the input device itself:

```javascript
// Listen to 'note on' events on channels 1, 2 and 3 of the first input MIDI device
WebMidi.inputs[0].addListener("noteon", e => {
  document.body.innerHTML+= `${e.note.name} <br>`;
}, {channels: [1, 2, 3]});
```

## Step 5 - Have fun!

**That's it!** To go further, please take some time to check out the 
[Getting Started](getting-started) section. It covers important topics such as installation 
options, compatibility, security, etc.

:::tip

If you ever need further help, you can also head over to the
[GitHub Discussions](https://github.com/djipco/webmidi/discussions) page and ask all the questions
you want!

:::
