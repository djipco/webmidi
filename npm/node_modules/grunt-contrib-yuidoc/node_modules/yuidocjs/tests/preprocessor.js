'use strict';

var YUITest = require('yuitest');
var Assert = YUITest.Assert;
var path = require('path');
var fs = require('fs');
var Y = require(path.join(__dirname, '../', 'lib', 'index'));

//Move to the test dir before running the tests.
process.chdir(__dirname);

var suite = new YUITest.TestSuite({
    name: 'Preprocessor Test Suite',
    setUp: function () {
        process.chdir(__dirname);
    }
});

suite.add(new YUITest.TestCase({
    name: 'Preprocessor',
    'test: single preprocessor': function () {
        global.testPreprocessorCallCount = 0;

        var json = (new Y.YUIDoc({
            quiet: true,
            paths: ['input/preprocessor'],
            outdir: './out',
            preprocessor: 'lib/testpreprocessor.js'
        })).run();

        Assert.isObject(json);
        Assert.areSame(global.testPreprocessorCallCount, 1, 'the preprocessor was not called');
    },
    'test: single preprocessor with absolute path': function () {
        global.testPreprocessorCallCount = 0;

        var json = (new Y.YUIDoc({
            quiet: true,
            paths: ['input/preprocessor'],
            outdir: './out',
            preprocessor: path.join(process.cwd(), '/lib/testpreprocessor.js')
        })).run();

        Assert.isObject(json);
        Assert.areSame(global.testPreprocessorCallCount, 1, 'the preprocessor was not called when an absolute path was used');
    },
    'test: several preprocessors': function () {
        global.testPreprocessorCallCount = 0;

        var json = (new Y.YUIDoc({
            quiet: true,
            paths: ['input/preprocessor'],
            outdir: './out',
            preprocessor: ['lib/testpreprocessor.js', './lib/testpreprocessor']
        })).run();

       Assert.isObject(json);
       Assert.areSame(global.testPreprocessorCallCount, 2, 'the preprocessor was not called twice');
    },
    'test: the test preprocessor does its job': function () {
        var json = (new Y.YUIDoc({
            quiet: true,
            paths: ['input/preprocessor'],
            outdir: './out',
            preprocessor: 'lib/testpreprocessor.js',
            star: '#'
        })).run();

        Assert.isObject(json);
        Assert.areSame(json.classes.TestPreprocessor.customtagPlusStar, 'hello#', 'the preprocessor did not modify the data');
    },
    'test: load preprocessor as a npm module': function () {
        // We are testing if it works to load the preprocessor from node_modules,
        // so first we need to copy it in place.
        if (!fs.existsSync('../node_modules/testpreprocessormodule')) {
            fs.mkdirSync('../node_modules/testpreprocessormodule');
        }

        fs.writeFileSync('../node_modules/testpreprocessormodule/package.json',
            fs.readFileSync('lib/testpreprocessormodule/package.json'));

        fs.writeFileSync('../node_modules/testpreprocessormodule/testpreprocessormodule.js',
            fs.readFileSync('lib/testpreprocessormodule/testpreprocessormodule.js'));

        var json = (new Y.YUIDoc({
            quiet: true,
            paths: ['input/preprocessor'],
            outdir: './out',
            preprocessor: 'testpreprocessormodule'
        })).run();

        Assert.isObject(json);
        Assert.isTrue(json.testModuleWasHere, 'the preprocesor module was not run');

        // Clean up things when we are done.
        fs.unlinkSync('../node_modules/testpreprocessormodule/package.json');
        fs.unlinkSync('../node_modules/testpreprocessormodule/testpreprocessormodule.js');
        fs.rmdirSync('../node_modules/testpreprocessormodule');
    }
}));

YUITest.TestRunner.add(suite);
