---
sidebar_position: 1
slug: /
---

# Quick Start

**You want to quickly try out the library?** This quick start guide will let you interface with your 
MIDI device in less than 5-minute.

## Step 1

Create an HTML document and add a link to the WebMidi.js library:

```html
<script src="https://cdn.jsdelivr.net/npm/webmidi/dist/webmidi.iife.js"></script>
```

## Step 2

Add some code to your HTML page. The example below enables the library and adds a listener that will
be triggered each time a note is played on your MIDI device:

```html
<script>
  
  // Enable WebMidi.js and trigger onEnabled() function when ready.
  WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

  function onEnabled() {
    
    // Display available inputs and outputs in the console.
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
    
    // Add a listener for 'noteon' events on all MIDI channels of the 
    // the first inoput device. When a 'noteon' is received, the event
    // will be displayed in the console.
    WebMidi.inputs[0].addListener("noteon", e => {
      console.log(e);
    });
    
  }
</script>
```

## Step 3

Plug in your MIDI device. Then, open the HTML page in a compatible-browser and open the developer 
tools. Play some notes and you should see the output in the console.

That's it!
