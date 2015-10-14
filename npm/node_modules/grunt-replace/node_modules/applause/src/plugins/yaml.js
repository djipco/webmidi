
/*
 * applause
 *
 * Copyright (c) 2015 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/applause/blob/master/LICENSE-MIT
 */

// dependencies

var _ = require('lodash');
var YAML = require('js-yaml');

// expose

module.exports = {
  name: 'yaml',
  priority: 10,
  match: function (pattern, opts) {
    var yaml = pattern.yaml;
    var match = typeof yaml !== 'undefined';
    return match;
  },
  transform: function (pattern, opts, done) {
    var yaml = pattern.yaml;
    // function support
    if (_.isFunction(yaml)) {
      yaml.call(this, function (result) {
        // override yaml function with value
        yaml = result;
      });
    }
    try {
      done({
        json: YAML.safeLoad(yaml)
      });
    } catch (e) {
      done(e);
    }
  }
};
