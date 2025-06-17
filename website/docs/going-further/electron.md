---
sidebar_position: 5
title: Electron
---

# Electron

WEBMIDI.js works fine inside [Electron](https://www.electronjs.org/) but you must make sure to 
properly handle the permission request and permission check handlers from within the main process:

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
