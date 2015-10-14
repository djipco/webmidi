
/*
 * applause
 *
 * Copyright (c) 2015 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/applause/blob/master/LICENSE-MIT
 */

// dependencies

var _ = require('lodash');
var CSON = require('cson-parser');

// expose

module.exports = {
  name: 'cson',
  priority: 10,
  match: function (pattern, opts) {
    var cson = pattern.cson;
    var match = typeof cson !== 'undefined';
    return match;
  },
  transform: function (pattern, opts, done) {
    var cson = pattern.cson;
    // function support
    if (_.isFunction(cson)) {
      cson.call(this, function (result) {
        // override cson function with value
        cson = result;
      });
    }
    try {
      done({
        json: CSON.parse(cson)
      });
    } catch (e) {
      done(e);
    }
  }
};
