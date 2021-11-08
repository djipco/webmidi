---
sidebar_position: 3
slug: /enabling-the-library
---

# Enabling the Library

The first step to get started is to enable the library. To do that, you simply call 
`WebMidi.enable()`. Starting with v3, the `enable()` method returns a promise which is resolved when
the library is ready.

```javascript
WebMidi
  .enable()
  .then(() => console.log("WebMidi enabled!"))
  .catch(err => alert(err));
```

To interact with devices you need to know which `Input` and `Output` ports are available. Connect a
MIDI device and try the following:

```javascript
WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));

function onEnabled() {
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);
}
```

You should see your devices appear in the console. As you can probably witness, most MIDI devices
will make several input and/or output ports available. 
