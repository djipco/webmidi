# Changelog

Starting with version 3.x, all notable changes to WebMidi.js will be documented in this file. The 
format used is the one suggested by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.0.0]

### Added

- CHANGELOG.md

### Changed

- Documentation is now generated with [jsdoc](https://www.npmjs.com/package/jsdoc) instead of the 
outdated [yuidoc](https://www.npmjs.com/package/grunt-contrib-yuidoc).

- Grunt has been replaced with NPM scripts for all build purposes.

- All methods now return `false` instead of throwing an error when invalid input is provided. 
Methods that were changed to match this behaviour are `guessNoteNumber()`, `getOctave()` and
`noteNameToNumber()`

### Deprecated

### Removed

- Support for Bower.

### Fixed

## [2.5.1] - 2019-08-25

Versions 2.5.x and earlier have not been tracked in this changelog.
