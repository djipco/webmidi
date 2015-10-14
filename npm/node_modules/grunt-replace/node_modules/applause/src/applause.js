
/*
 * applause
 *
 * Copyright (c) 2015 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/applause/blob/master/LICENSE-MIT
 */

// dependencies

var _ = require('lodash');
var plugins = require('./plugins');

// took from MDN
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

var escapeRegExp = function (string) {
  return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
};

var getPatterns = function (applause) {
  var opts = applause.options;
  // shallow patterns
  var patterns = _.chain(opts.patterns)
    .clone()
    .compact()
    .filter(function (pattern) {
      return !_.isEmpty(pattern);
    })
    .value();
  // backward compatibility
  var variables = opts.variables;
  if (!_.isEmpty(variables)) {
    patterns.push({
      json: variables
    });
  }
  // process
  for (var i = patterns.length - 1; i >= 0; i -= 1) {
    var pattern = patterns[i];
    // plugins
    plugins.forEach(function (plugin) {
      if (plugin.match(pattern, opts) === true) {
        plugin.transform(pattern, opts, function (items) {
          if (items instanceof Error) {
            throw items;
          } else {
            // store transformed pattern in context
            pattern = items;
          }
        });
      } else {
        // plugin doesn't apply
      }
    });
    // convert to array
    if (!_.isArray(pattern)) {
      pattern = [pattern];
    }
    // link with pattern with original source
    pattern.forEach(function (pattern) {
      pattern.source = patterns[i];
    });
    // attach index
    Array.prototype.splice.apply(patterns, [i, 1].concat(pattern));
  }
  if (opts.preserveOrder !== true) {
    // only sort non regex patterns (prevents replace issues like head, header)
    patterns.sort(function (a, b) {
      var x = a.match;
      var y = b.match;
      if (_.isString(x) && _.isString(y)) {
        return y.length - x.length;
      } else if (_.isString(x)) {
        return -1;
      }
      return 1;
    });
  }
  return patterns;
};

// applause

var Applause = function (opts) {
  this.options = _.defaults(opts, {
    patterns: [],
    prefix: opts.usePrefix === false ? '' : '@@',
    usePrefix: true,
    preservePrefix: false,
    delimiter: '.',
    preserveOrder: false,
    detail: false
  });
};

Applause.prototype.replace = function (content, process) {
  var opts = this.options;
  // prevent null
  content = content || '';
  // prepare patterns
  var patterns = getPatterns(this);
  var detail = [];
  var total_count = 0;
  // iterate over each pattern and make replacement
  patterns.forEach(function (pattern, i) {
    // filter empty patterns
    var match = pattern.match;
    // support replace flag too
    var replacement = pattern.replacement;
    if (replacement === undefined || replacement === null) {
      replacement = pattern.replace;
    }
    var source = pattern.source;
    var expression = false;
    // match check
    if (match !== undefined && match !== null) {
      if (_.isRegExp(match)) {
        expression = true;
      } else if (_.isString(match)) {
        if (match.length > 0) {
          match = new RegExp(opts.prefix + escapeRegExp(match), 'g');
        } else {
          // empty match
          return;
        }
      } else {
        throw new Error('Unsupported match type (RegExp or String expected).');
      }
    } else {
      throw new Error('Match attribute expected in pattern definition.');
    }
    // replacement check
    if (replacement !== undefined && replacement !== null) {
      if (!_.isFunction(replacement)) {
        if (!_.isString(replacement)) {
          // transform object to string
          replacement = JSON.stringify(replacement);
        }
        if (expression === false) {
          // escape dollar sequences in easy mode
          replacement = replacement.replace(/\$/g, '$$$');
          // preserve prefix
          if (opts.preservePrefix === true) {
            replacement = opts.prefix + replacement;
          }
        }
      } else {
        // replace using function return value
        replacement = function () {
          var args = Array.prototype.slice.call(arguments);
          return pattern.replacement.apply(this, args.concat(process || []));
        };
      }
    } else {
      throw new Error('Replacement attribute expected in pattern definition.');
    }
    // replace logic
    var count = (content.match(match) || []).length;
    if (count > 0) {
      // update content
      content = content.replace(match, replacement);
      // save detail data
      detail.push({
        source: pattern.source,
        count: count
      });
      total_count += count;
    }
  });
  if (detail.length === 0) {
    content = false;
  }
  if (opts.detail === true) {
    return {
      content: content,
      detail: detail,
      count: total_count
    };
  }
  return content;
};

// static

Applause.create = function (opts) {
  return new Applause(opts);
};

Applause.VERSION = require('../package.json').version;

// expose

module.exports = Applause;
