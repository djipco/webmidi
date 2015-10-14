/*
 * grunt-contrib-yuidoc
 * http://gruntjs.com/
 *
 * Copyright (c) 2015 George Pantazis, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('yuidoc', 'Create YUIDocs', function() {

    var fs = require('fs');
    var path = require('path');
    var kindOf = grunt.util.kindOf;
    var Y = require('yuidocjs');
    var done = this.async();
    var startTime = Date.now();
    var json;

    var options = this.options({
      quiet: true
    });

    // process project data templates
    var projectData = {};
    grunt.util._.each(this.data, function(value, key) {
      if (kindOf(value) === 'string') {
        projectData[key] = value;
      }
    });

    // when invoking yuidocs via node, the project details
    // are assigned under the options object using the key
    // 'project'
    options.project = projectData;

    // Catch if required fields are not provided.
    if (!options.paths) {
      grunt.fail.warn('No path(s) provided for YUIDoc to scan.');
    }
    if (!options.outdir) {
      grunt.fail.warn('You must specify a directory for YUIDoc output.');
    }

    // ensure destination dir is available
    grunt.file.mkdir(options.outdir);

    // Input path: array expected, but grunt conventions allows for either a string or an array.
    if (kindOf(options.paths) === 'string') {
      options.paths = [ options.paths ];
    }

    try {
      json = (new Y.YUIDoc(options)).run();
    } catch(e) {
      grunt.warn(e);
    }

    options = Y.Project.mix(json, options);

    if (options.parseOnly) {
      fs.writeFileSync(path.join(options.outdir, 'data.json'), JSON.stringify(json, null, 4));
      done();
    } else {
      var builder = new Y.DocBuilder(options, json);

      grunt.log.writeln('Start YUIDoc compile...');
      grunt.log.writeln('Scanning: ' + grunt.log.wordlist(options.paths));
      grunt.log.writeln('Output: ' + options.outdir.cyan);

      builder.compile(function() {
        var secondsTaken = (Date.now() - startTime) / 1000;
        grunt.log.writeln('YUIDoc compile completed in ' + secondsTaken + ' seconds');
        done();
      });
    }
  });
};
