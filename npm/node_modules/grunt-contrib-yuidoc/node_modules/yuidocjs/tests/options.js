'use strict';

var YUITest = require('yuitest');
var Assert = YUITest.Assert;
var path = require('path');
var Y = require(path.join(__dirname, '../', 'lib', 'index'));

//Move to the test dir before running the tests.
process.chdir(__dirname);

var suite = new YUITest.TestSuite('Options Test Suite');

suite.add(new YUITest.TestCase({
    name: 'Server Options',
    'test: server': function () {
        var options = Y.Options([
            '--server'
        ]);

        Assert.isTrue(options.server, 'Failed to set server option');
        Assert.areSame(3000, options.port, 'Failed to set default port');
    },
    'test: server with port': function () {
        var options = Y.Options([
            '--server',
            '5000'
        ]);

        Assert.isTrue(options.server, 'Failed to set server option');
        Assert.areSame(5000, options.port, 'Failed to set port');
    },
    'test: server with default port and following argument': function () {
        var options = Y.Options([
            '--server',
            './foo'
        ]);

        Assert.isTrue(options.server, 'Failed to set server option');
        Assert.areSame(3000, options.port, 'Failed to set default port');
        Assert.isArray(options.paths, 'Failed to set path');
        Assert.areSame('./foo', options.paths[0], 'Failed to set path after empty --server');
    },
    'test: tab-to-space': function () {
        var options, value;

        // Test that --tab-to-space gives the correct number.
        // It uses parseInt so check numbers which look like octals too.

        value = 12;
        options = Y.Options([
            '--tab-to-space',
            '0' + value
        ]);
        Assert.areSame(value, options.tabtospace);
        Assert.areSame(value, options.tabspace.length);

        options = Y.Options([
            '--tab-to-space',
            '' + value
        ]);
        Assert.areSame(value, options.tabtospace);
        Assert.areSame(value, options.tabspace.length);

        options = Y.Options([
            '--tab-to-space',
            value
        ]);
        Assert.areSame(value, options.tabtospace);
        Assert.areSame(value, options.tabspace.length);

        value = 10;
        options = Y.Options([
            '--tab-to-space',
            '0' + value
        ]);
        Assert.areSame(value, options.tabtospace);
        Assert.areSame(value, options.tabspace.length);

        options = Y.Options([
            '--tab-to-space',
            '' + value
        ]);
        Assert.areSame(value, options.tabtospace);
        Assert.areSame(value, options.tabspace.length);

        options = Y.Options([
            '--tab-to-space',
            value
        ]);
        Assert.areSame(value, options.tabtospace);
        Assert.areSame(value, options.tabspace.length);

    }
}));

suite.add(new YUITest.TestCase({
    name: 'Various Options',
    'test: long quiet option': function () {
        var options = Y.Options([
            '--quiet'
        ]);
        Assert.isTrue(options.quiet, 'Failed to set long quiet');
    },
    'test: short quiet option': function () {
        var options = Y.Options([
            '-q'
        ]);
        Assert.isTrue(options.quiet, 'Failed to set short quiet');
    },
    'test: short config': function () {
        var options = Y.Options([
            '-c',
            './foo.json'
        ]);
        Assert.areSame('./foo.json', options.configfile, 'Failed to set config');
    },
    'test: --config': function () {
        var options = Y.Options([
            '--config',
            './foo.json'
        ]);
        Assert.areSame('./foo.json', options.configfile, 'Failed to set config');
    },
    'test: --configfile': function () {
        var options = Y.Options([
            '--configfile',
            './foo.json'
        ]);
        Assert.areSame('./foo.json', options.configfile, 'Failed to set config');
    },
    'test: -e': function () {
        var options = Y.Options([
            '-e',
            '.foo'
        ]);
        Assert.areSame('.foo', options.extension, 'Failed to set extension');
    },
    'test: --extension': function () {
        var options = Y.Options([
            '--extension',
            '.foo'
        ]);
        Assert.areSame('.foo', options.extension, 'Failed to set extension');
    },
    'test: -x': function () {
        var options = Y.Options([
            '-x',
            'foo,bar,baz'
        ]);
        Assert.areSame('foo,bar,baz', options.exclude, 'Failed to set exclude');
    },
    'test: --exclude': function () {
        var options = Y.Options([
            '--exclude',
            'foo,bar,baz'
        ]);
        Assert.areSame('foo,bar,baz', options.exclude, 'Failed to set exclude');
    },
    'test: --project-version': function () {
        var options = Y.Options([
            '--project-version',
            '6.6.6'
        ]);
        Assert.areSame('6.6.6', options.version, 'Failed to set version');
    },
    'test: --no-color': function () {
        var options = Y.Options([
            '--no-color'
        ]);
        Assert.isTrue(options.nocolor, 'Failed to set nocolor');
        Assert.isFalse(Y.config.useColor, 'Failed to set Y.config.useColor');
    },
    'test: -N': function () {
        var options = Y.Options([
            '-N'
        ]);
        Assert.isTrue(options.nocolor, 'Failed to set nocolor');
        Assert.isFalse(Y.config.useColor, 'Failed to set Y.config.useColor');
    },
    'test: --no-code': function () {
        var options = Y.Options([
            '--no-code'
        ]);
        Assert.isTrue(options.nocode, 'Failed to set nocode');
    },
    'test: -C': function () {
        var options = Y.Options([
            '-C'
        ]);
        Assert.isTrue(options.nocode, 'Failed to set nocode');
    },
    'test: --norecurse': function () {
        var options = Y.Options([
            '--norecurse'
        ]);
        Assert.isTrue(options.norecurse, 'Failed to set norecurse');
    },
    'test: -n': function () {
        var options = Y.Options([
            '-n'
        ]);
        Assert.isTrue(options.norecurse, 'Failed to set norecurse');
    },
    'test: --no-sort': function () {
        var options = Y.Options([
            '--no-sort'
        ]);
        Assert.isTrue(options.dontsortfields, 'Failed to set dontsortfields');
    },
    'test: --selleck': function () {
        var options = Y.Options([
            '--selleck'
        ]);
        Assert.isTrue(options.selleck, 'Failed to set selleck');
    },
    'test: -S': function () {
        var options = Y.Options([
            '-S'
        ]);
        Assert.isTrue(options.selleck, 'Failed to set selleck');
    },
    'test: -T simple': function () {
        var options = Y.Options([
            '-T',
            'simple'
        ]);
        Assert.areEqual(path.join(__dirname, '../themes/simple'), options.themedir);
    },
    'test: --theme simple': function () {
        var options = Y.Options([
            '--theme',
            'simple'
        ]);
        Assert.areEqual(path.join(__dirname, '../themes/simple'), options.themedir);
    },
    'test: --theme foobar': function () {
        var options = Y.Options([
            '--theme',
            'foobar'
        ]);
        Assert.areEqual(path.join(__dirname, '../themes/foobar'), options.themedir);
    },
    'test: -t ./foobar': function () {
        var options = Y.Options([
            '-t',
            './foobar'
        ]);
        Assert.areEqual('./foobar', options.themedir);
    },
    'test: --themedir ./foobar': function () {
        var options = Y.Options([
            '--themedir',
            './foobar'
        ]);
        Assert.areEqual('./foobar', options.themedir);
    },
    'test: --syntaxtype coffee': function () {
        var options = Y.Options([
            '--syntaxtype',
            'coffee'
        ]);
        Assert.areEqual('coffee', options.syntaxtype);
    },
    'test: --view': function () {
        var options = Y.Options([
            '--view'
        ]);
        Assert.isTrue(options.dumpview);
    },
    'test: -V': function () {
        var options = Y.Options([
            '-V'
        ]);
        Assert.isTrue(options.dumpview);
    },
    'test: -p': function () {
        var options = Y.Options([
            '-p'
        ]);
        Assert.isTrue(options.parseOnly);
    },
    'test: --parse-only': function () {
        var options = Y.Options([
            '--parse-only'
        ]);
        Assert.isTrue(options.parseOnly);
    },
    'test: -o <path>': function () {
        var options = Y.Options([
            '-o',
            '/foo/bar'
        ]);
        Assert.areEqual('/foo/bar', options.outdir);
    },
    'test: --outdir <path>': function () {
        var options = Y.Options([
            '--outdir',
            '/foo/bar'
        ]);
        Assert.areEqual('/foo/bar', options.outdir);
    },
    'test: -D': function () {
        var options = Y.Options([
            '-D'
        ]);
        Assert.isTrue(options.nodeleteout);
    },
    'test: --no-delete-out': function () {
        var options = Y.Options([
            '--no-delete-out'
        ]);
        Assert.isTrue(options.nodeleteout);
    },
    'test: --lint': function () {
        var options = Y.Options([
            '--lint'
        ]);
        Assert.isTrue(options.lint);
        Assert.isTrue(options.parseOnly);
        Assert.isTrue(options.quiet);
        Assert.isFalse(options.writeJSON);
    },
    'test --debug': function () {
        Assert.isFalse(Y.config.debug);
        Y.Options([
            '--debug'
        ]);
        Assert.isTrue(Y.config.debug);
        Assert.areEqual('debug', Y.config.filter);
        Y.applyConfig({
            debug: false
        });
    },
    'test: --charset': function () {
        Y.Options([
            '--charset'
        ]);
        Assert.areEqual('utf8', Y.charset);

    },
    'test: --charset foo': function () {
        Y.Options([
            '--charset',
            'foo'
        ]);
        Assert.areEqual('foo', Y.charset);
        Y.charset = 'utf8';
    },
    'test: --tab-to-space 8': function () {
        var options = Y.Options([
            '--tab-to-space',
            '8'
        ]);
        Assert.areEqual(8, options.tabtospace);
        Assert.areEqual('        ', options.tabspace);
    }
}));


YUITest.TestRunner.add(suite);
