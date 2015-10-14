'use strict';

var grunt = require('grunt');

function compareFiles(test, filename, description) {
  var actual = grunt.file.read('test/fixtures/_' + filename);
  var expected = grunt.file.read('test/expected/' + filename);
  test.equal(actual, expected, description);
  test.done();
}

exports.release = {
  bump: function(test){
    compareFiles(test, 'component.json', 'should set version 0.0.13');
  },
  bumpMultiple: function(test){
    compareFiles(test, 'bower.json', 'bower.json should also have version 0.0.13');
  },
  bumpChangelog: function(test){
    compareFiles(test, 'CHANGELOG.md', 'CHANGELOG.md should be updated');
  },
  bumpAbsolute: function(test){
    compareFiles(test, 'bower-absolute.json', 'should set absolute version');
  },
  bumpPatch: function(test){
    compareFiles(test, 'component-patch.json', 'should bump patch version');
  },
  bumpMinor: function(test){
    compareFiles(test, 'component-minor.json', 'should bump minor version');
  },
  bumpMajor: function(test){
    compareFiles(test, 'component-major.json', 'should bump major version');
  }
};
