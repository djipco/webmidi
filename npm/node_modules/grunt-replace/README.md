# grunt-replace [![Build Status](https://img.shields.io/travis/outaTiME/grunt-replace.svg)](https://travis-ci.org/outaTiME/grunt-replace) [![NPM Version](https://img.shields.io/npm/v/grunt-replace.svg)](https://npmjs.org/package/grunt-replace)

> Replace text patterns with [applause](https://github.com/outaTiME/applause).

## Install

From NPM:

```shell
npm install grunt-replace --save-dev
```

## Replace Task

Assuming installation via NPM, you can use `grunt-replace` in your gruntfile like this:

```javascript
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-replace');
  grunt.initConfig({
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'foo',
              replacement: 'bar'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['src/index.html'], dest: 'build/'}
        ]
      }
    }
  });
  grunt.registerTask('default', 'replace');
};
```

### Options



#### patterns
Type: `Array`

Define patterns that will be used to replace the contents of source files.

#### patterns.match
Type: `String|RegExp`

Indicates the matching expression.

If matching type is `String` we use a simple variable lookup mechanism `@@string` (in any other case we use the default regexp replace logic):

```javascript
{
  patterns: [
    {
      match: 'foo',
      replacement: 'bar'  // replaces "@@foo" to "bar"
    }
  ]
}
```

#### patterns.replacement or patterns.replace
Type: `String|Function|Object`

Indicates the replacement for match, for more information about replacement check out the [String.replace].

You can specify a function as replacement. In this case, the function will be invoked after the match has been performed. The function's result (return value) will be used as the replacement string.

```javascript
{
  patterns: [
    {
      match: /foo/g,
      replacement: function () {
        return 'bar'; // replaces "foo" to "bar"
      }
    }
  ]
}
```

Also supports object as replacement (we create string representation of object using [JSON.stringify]):

```javascript
{
  patterns: [
    {
      match: /foo/g,
      replacement: [1, 2, 3] // replaces "foo" with string representation of "array" object
    }
  ]
}
```

> The replacement only resolve the [special replacement patterns] when using regexp for matching.

[String.replace]: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
[JSON.stringify]: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
[special replacement patterns]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter

#### patterns.json
Type: `Object`

If an attribute `json` is found in pattern definition we flatten the object using `delimiter` concatenation and each key–value pair will be used for the replacement (simple variable lookup mechanism and no regexp support).

```javascript
{
  patterns: [
    {
      json: {
        "key": "value" // replaces "@@key" to "value"
      }
    }
  ]
}
```

Also supports nested objects:

```javascript
{
  patterns: [
    {
      json: {
        "key": "value",   // replaces "@@key" to "value"
        "inner": {        // replaces "@@inner" with string representation of "inner" object
          "key": "value"  // replaces "@@inner.key" to "value"
        }
      }
    }
  ]
}
```

For deferred invocations is possible to define functions:

```javascript
{
  patterns: [
    {
      json: function (done) {
        done({
          key: 'value'
        });
      }
    }
  ]
}
```

#### patterns.yaml
Type: `String`

If an attribute `yaml` found in pattern definition it will be converted and then processed like [json attribute](#patternsjson).

```javascript
{
  patterns: [
    {
      yaml: 'key: value'  // replaces "@@key" to "value"
    }
  ]
}
```

For deferred invocations is possible to define functions:

```javascript
{
  patterns: [
    {
      yaml: function (done) {
        done('key: value');
      }
    }
  ]
}
```

#### patterns.cson
Type: `String`

If an attribute `cson` is found in pattern definition it will be converted and then processed like [json attribute](#patternsjson).

```javascript
{
  patterns: [
    {
      cson: 'key: \'value\''
    }
  ]
}
```

For deferred invocations is possible to define functions:

```javascript
{
  patterns: [
    {
      cson: function (done) {
        done('key: \'value\'');
      }
    }
  ]
}
```

#### variables
Type: `Object`

This is the old way to define patterns using plain object (simple variable lookup mechanism and no regexp support). You can still use this but for more control you should use the new `patterns` way.

```javascript
{
  variables: {
    'key': 'value' // replaces "@@key" to "value"
  }
}
```

#### prefix
Type: `String`
Default: `@@`

The prefix added for matching (prevent bad replacements / easy way).

> This only applies for simple variable lookup mechanism.

#### usePrefix
Type: `Boolean`
Default: `true`

If set to `false`, we match the pattern without `prefix` concatenation (useful when you want to lookup a simple string).

> This only applies for simple variable lookup mechanism.

#### preservePrefix
Type: `Boolean`
Default: `false`

If set to `true`, we preserve the `prefix` in target.

> This only applies for simple variable lookup mechanism and when `patterns.replacement` is a string.

#### delimiter
Type: `String`
Default: `.`

The delimiter used to flatten when using object as replacement.

#### preserveOrder
Type: `Boolean`
Default: `false`

If set to `true`, we preserve the patterns definition order, otherwise these will be sorted (in ascending order) to prevent replacement issues like `head` / `header` (typo regexps will be resolved at last).

#### detail
Type: `Boolean`
Default: `false`

If set to `true`, return an object response with the `content` and `detail` of replace operation.


#### excludeBuiltins
Type: `Boolean`
Default: `false`

If set to `true`, we exclude built-in matching rules.

#### force
Type: `Boolean`
Default: `true`

Force the copy of files even when those files don't have any match found for replacement.

#### noProcess
Type: `String`

This option is an advanced way to control which file contents are processed.

> `processContentExclude` has been renamed to `noProcess` and the option name will be removed in the future.

#### encoding
Type: `String`
Default: `grunt.file.defaultEncoding`

The file encoding to copy files with.

#### mode
Type: `Boolean` or `Number`
Default: `false`

Whether to copy or set the existing file permissions. Set to `true` to copy the existing file permissions. Or set to the mode, i.e.: `0644`, that copied files will be set to.

#### silent
Type: `Boolean`
Default: `false`

If set to `true`, removes the output from stdout.

#### pedantic
Type: `Boolean`
Default: `false`

If set to `true`, the task will fail with a `grunt.fail.warn` when no matches are present.

### Built-in Replacements

Few matching rules are provided by default and can be used anytime (these will be affected by the `options` given):

 *  `__SOURCE_FILE__`:

    Replace match with the source file.

 *  `__SOURCE_PATH__`:

    Replace match with the path of source file.

 *  `__SOURCE_FILENAME__`:

    Replace match with the filename of source file.

 *  `__TARGET_FILE__`:

    Replace match with the target file.

 *  `__TARGET_PATH__`:

    Replace match with the path of target file.

 *  `__TARGET_FILENAME__`:

    Replace match with the filename of target file.

> If you are looking how to use an `built-in` replacements, check out the [How to insert filename in target](#how-to-insert-filename-in-target) usage.

### Usage Examples

#### Basic

File `src/manifest.appcache`:

```
CACHE MANIFEST
# @@timestamp

CACHE:

favicon.ico
index.html

NETWORK:
*
```

Gruntfile, define pattern (for timestamp) and the source files for lookup:

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'timestamp',
          replacement: '<%= grunt.template.today() %>'
        }
      ]
    },
    files: [
      {expand: true, flatten: true, src: ['src/manifest.appcache'], dest: 'build/'}
    ]
  }
}
```

#### Multiple matching

File `src/manifest.appcache`:

```
CACHE MANIFEST
# @@timestamp

CACHE:

favicon.ico
index.html

NETWORK:
*
```

File `src/humans.txt`:

```
              __     _
   _    _/__  /./|,//_`
  /_//_// /_|///  //_, outaTiME v.@@version

/* TEAM */
  Web Developer / Graphic Designer: Ariel Oscar Falduto
  Site: http://www.outa.im
  Twitter: @outa7iME
  Contact: afalduto at gmail dot com
  From: Buenos Aires, Argentina

/* SITE */
  Last update: @@timestamp
  Standards: HTML5, CSS3, robotstxt.org, humanstxt.org
  Components: H5BP, Modernizr, jQuery, Twitter Bootstrap, LESS, Jade, Grunt
  Software: Sublime Text 2, Photoshop, LiveReload

```

Gruntfile:

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'version',
          replacement: '<%= pkg.version %>'
        },
        {
          match: 'timestamp',
          replacement: '<%= grunt.template.today() %>'
        }
      ]
    },
    files: [
      {expand: true, flatten: true, src: ['src/manifest.appcache', 'src/humans.txt'], dest: 'build/'}
    ]
  }
}
```

#### Cache busting

File `src/assets/index.html`:

```html
<head>
  <link rel="stylesheet" href="/css/style.css?rel=@@timestamp">
  <script src="/js/app.js?rel=@@timestamp"></script>
</head>
```

Gruntfile:

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'timestamp',
          replacement: '<%= new Date().getTime() %>'
        }
      ]
    },
    files: [
      {src: ['src/assets/index.html'], dest: 'build/index.html'}
    ]
  }
}
```

#### Include file

File `src/index.html`:

```html
<body>
  @@include
</body>
```

Gruntfile:

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'include',
          replacement: '<%= grunt.file.read("includes/content.html") %>'
        }
      ]
    },
    files: [
      {expand: true, flatten: true, src: ['src/index.html'], dest: 'build/'}
    ]
  }
}
```

#### Regular expression

File `src/username.txt`:

```
John Smith
```

Gruntfile:

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: /(\w+)\s(\w+)/,
          replacement: '$2, $1' // replaces "John Smith" to "Smith, John"
        }
      ]
    },
    files: [
      {expand: true, flatten: true, src: ['src/username.txt'], dest: 'build/'}
    ]
  }
}
```

#### Lookup for `foo` instead of `@@foo`

Gruntfile:

```js
// option 1 (explicitly using an regexp)
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: /foo/g,
          replacement: 'bar'
        }
      ]
    },
    files: [
      {expand: true, flatten: true, src: ['src/foo.txt'], dest: 'build/'}
    ]
  }
}

// option 2 (easy way)
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ],
      usePrefix: false
    },
    files: [
      {expand: true, flatten: true, src: ['src/foo.txt'], dest: 'build/'}
    ]
  }
}

// option 3 (old way)
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ],
      prefix: '' // remove prefix
    },
    files: [
      {expand: true, flatten: true, src: ['src/foo.txt'], dest: 'build/'}
    ]
  }
}
```

#### How to insert filename in target

File `src/app.js`:

```js
// filename: @@__SOURCE_FILENAME__

var App = App || (function () {

  return {

    // app contents

  };

}());

window.App = App;
```

Gruntfile:

```js
replace: {
  dist: {
    options: {
      // pass, we use built-in replacements
    },
    files: [
      {expand: true, flatten: true, src: ['src/**/*.js'], dest: 'build/'}
    ]
  }
}
```

## Release History

 * 2015-09-09   v0.11.0   Improvements in handling patterns. Fix plain object representation issue. More test cases.
 * 2015-08-20   v0.10.2   Restore verbose after new pedantic option.
 * 2015-08-19   v0.10.0   Last [applause](https://github.com/outaTiME/applause) integration and package.json update.
 * 2015-08-06   v0.9.3   New pedantic option (thanks [@donkeybanana](https://github.com/donkeybanana)). Fix issue with special characters attributes ($$, $&, $`, $', $n or $nn) on JSON, YAML and CSON.
 * 2015-05-07   v0.9.2   Fix regression issue with empty string in replacement.
 * 2015-05-01   v0.9.1   Better output.
 * 2015-05-01   v0.9.0   Output available via --verbose flag. The mode option now also applies to directories. Fix path issue on Windows. Display warning message when no matches and overall of replacements. Update to [applause](https://github.com/outaTiME/applause) v0.4.0.
 * 2014-10-10   v0.8.0   Escape regexp when matching type is `String`.
 * 2014-08-26   v0.7.9   Fixes backwards incompatible changes introduced in NPM.
 * 2014-06-10   v0.7.8   Remove node v.8.0 support and third party dependencies updated. Force flag now are true by default.
 * 2014-04-20   v0.7.7   JSON / YAML / CSON as function supported. Readme updated (thanks [@milanlandaverde](https://github.com/milanlandaverde)).
 * 2014-03-23   v0.7.6   Readme updated.
 * 2014-03-22   v0.7.5   Modular core renamed to [applause](https://github.com/outaTiME/applause). Performance improvements. Expression flag removed. New pattern matching for CSON object. More test cases, readme updated and code cleanup.
 * 2014-03-21   v0.7.4   Test cases in Mocha, readme updated and code cleanup.
 * 2014-03-17   v0.7.3   Update script files for readme file generation.
 * 2014-03-12   v0.7.2   Typo error, replace task name again.
 * 2014-03-11   v0.7.1   Task name update.
 * 2014-03-11   v0.7.0   New [pattern-replace](https://github.com/outaTiME/pattern-replace) modular core for replacements.
 * 2014-02-13   v0.6.2   Attach process data for function replacements (source / target). Add delimiter option for object as replacement. Dependencies updated.
 * 2014-02-06   v0.6.1   Rename excludePrefix to preservePrefix (more readable) and adds usePrefix flag. Support the noProcess option like [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy).
 * 2014-02-05   v0.6.0   Object replacement allowed. New excludePrefix flag (thanks [@shinnn](https://github.com/shinnn)). Encoding / Mode options added.
 * 2013-09-18   v0.5.1   New pattern matching for JSON object.
 * 2013-09-17   v0.5.0   Regular expression matching now supported and notation has been updated but is backward compatible.
 * 2013-05-03   v0.4.4   Fix escape $ before performing regexp replace (thanks [@warpech](https://github.com/warpech)).
 * 2013-04-14   v0.4.3   Detect path destinations correctly on Windows.
 * 2013-04-02   v0.4.2   Add peerDependencies and update description.
 * 2013-04-02   v0.4.1   Add trace when force flag.
 * 2013-02-28   v0.4.0   First official release for Grunt 0.4.0.
 * 2012-11-20   v0.3.2   New examples added.
 * 2012-09-25   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib, add force flag.
 * 2012-09-25   v0.3.0   General cleanup and consolidation. Global options depreciated.

---

Task submitted by [Ariel Falduto](http://outa.im/)
