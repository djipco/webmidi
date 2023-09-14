# Using WEBMIDI.js with Electron

A collection of examples to use WEBMIDI.js inside an Electron application.

## Examples

* [**Basic Electron Example**](basic-example)

## Platform specific notes

The permission requests must be properly handled in the main process before initializing WEBMIDI:

```javascript
  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback, details) => {
    if (permission === 'midi' || permission === 'midiSysex') {
      callback(true);
    } else {
      callback(false);
    }
  })

  mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
    if (permission === 'midi' || permission === 'midiSysex') {
      return true;
    }

    return false;
  });
```
