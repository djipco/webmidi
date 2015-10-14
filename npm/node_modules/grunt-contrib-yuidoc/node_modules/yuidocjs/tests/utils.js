'use strict';

var YUITest = require('yuitest');
var Assert = YUITest.Assert;
var path = require('path');
var Y = require(path.join(__dirname, '../', 'lib', 'index'));

var suite = new YUITest.TestSuite({
    name: 'Utils Test Suite'
});

suite.add(new YUITest.TestCase({
    name: 'getProjectData Folder Priority',
    'test: Nearest Folder Priority': function () {
        var d = Y.getProjectData('input/folders1');
        Assert.areEqual('yuidoc-root', d.name, 'must use nearest yuidoc.json first');
    },
    'test: Finds package.json': function () {
        var d = Y.getProjectData('input/folders2');
        Assert.areEqual('yuidoc-two', d.name, 'used deep yuidoc.json');
        Assert.areEqual('package-root', d.description, 'used shallow package.json');
    },
    'test: Finds package.json in same folder as yuidoc.json': function () {
        var d = Y.getProjectData('input/folders3');
        Assert.areEqual('yuidoc-root', d.name, 'used deep yuidoc.json');
        Assert.areEqual('package-root', d.description, 'used deep package.json');
    },
    'test: Ignores package.json in deeper folder than yuidoc.json': function () {
        var d = Y.getProjectData('input/folders4');
        Assert.areEqual('yuidoc-one', d.name, 'used deep yuidoc.json');
        Assert.isUndefined(d.description, 'used deep package.json');
    },
    'test: Must be breadth-first': function () {
        var d = Y.getProjectData('input/folders5');
        Assert.areEqual('yuidoc-two', d.name, 'used wrong yuidoc.json');
        Assert.areEqual('package-two', d.description, 'used wrong package.json');
    }
}));

suite.add(new YUITest.TestCase({
    name: 'validatePaths',
    'test: path globs': function () {
        var options;

        process.chdir(path.join(__dirname, 'input/globbing'));

        // Simulate a path provided by a configuration...
        // first with a String path
        options = {
            paths: '**/yui/src/*'
        };
        options = Y.Project.init(options);

        Assert.isArray(options.paths, 'Failed to set path');
        Assert.areSame(3, options.paths.length, 'Failed to retrieve all path options');

        // then with an Array of path
        options = {
            paths: [
                '**/yui/src/*'
            ]
        };
        options = Y.Project.init(options);

        Assert.isArray(options.paths, 'Failed to set path');
        Assert.areSame(3, options.paths.length, 'Failed to retrieve all path options');


        // Test with a path as passed to Y.Options
        options = Y.Options([
            '**/yui/src/*'
        ]);
        options = Y.Project.init(options);

        Assert.isArray(options.paths, 'Failed to set path');
        Assert.areSame(3, options.paths.length, 'Failed to retrieve all path options');
    }
}));

suite.add(new YUITest.TestCase({
    name: 'produce valid web urls',
    'test: Adds paths onto end in sequence': function() {
        var url = Y.webpath('foo', 'bar', 'baz');
        Assert.areEqual('foo/bar/baz', url, 'parts should be added in sequence');
    },
    'test: normalises windows paths into web happy urls': function() {
        var url = Y.webpath('foo\\bar', 'baz');
        Assert.areEqual('foo/bar/baz', url, '\\ should be normalised to /');
    },
    'test: joins relative paths': function() {
        var url = Y.webpath('./foo/bar', './baz/');
        Assert.areEqual('foo/bar/baz/', url, 'should join relative paths');
    }
}));

YUITest.TestRunner.add(suite);
