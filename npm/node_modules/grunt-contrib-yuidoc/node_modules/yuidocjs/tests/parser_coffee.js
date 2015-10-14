'use strict';

var YUITest = require('yuitest');
var Assert = YUITest.Assert;
var path = require('path');
var Y = require(path.join(__dirname, '../', 'lib', 'index'));

//Move to the test dir before running the tests.
process.chdir(__dirname);

var suite = new YUITest.TestSuite({
    name: 'CoffeeScript Parser Test Suite'
});

suite.add(new YUITest.TestCase({
    name: 'CoffeeScript Parser Test 1',
    setUp: function () {
        var json = (new Y.YUIDoc({
            quiet: true,
            paths: ['input/coffee1'],
            outdir: './out',
            extension: '.coffee',
            syntaxtype: 'coffee'
        })).run();

        this.project = json.project;
    },
    'test: CoffeeScript Project Data 1': function () {
        Assert.areSame(path.normalize('input/coffee1/test.coffee'),
            this.project.file, 'Project data loaded from wrong file');
        Assert.areSame(2, this.project.line, 'Line number is off');
        Assert.areSame('The test project', this.project.description, 'Description not set properly');
        Assert.areSame('The Tester', this.project.title, 'Title not set');
        Assert.areSame('admo', this.project.author, 'Author not set');
        Assert.areSame('entropy', this.project.contributor, 'Contributor not set');
        Assert.areSame('http://a.img', this.project.icon[0], 'Icon not set');
        Assert.areSame(1, this.project.icon.length, 'Found wring number of icons');
        Assert.areSame(2, this.project.url.length, 'Found wrong number of urls');
        Assert.areSame('http://one.url', this.project.url[0], 'URL #1 is wrong');
        Assert.areSame('http://two.url', this.project.url[1], 'URL #2 is wrong');
    }
}));

suite.add(new YUITest.TestCase({
    name: 'CoffeeScript Parser Test 2',
    setUp: function () {
        var json = (new Y.YUIDoc({
            quiet: true,
            paths: ['input/coffee2'],
            outdir: './out',
            extension: '.coffee',
            syntaxtype: 'coffee'
        })).run();

        this.project = json.project;
    },
    'test: CoffeeScript Project Data 2': function () {
        Assert.areSame(path.normalize('input/coffee2/test.coffee'),
            this.project.file, 'Project data loaded from wrong file');
        Assert.areSame(2, this.project.line, 'Line number is off');
        Assert.areSame('The test project', this.project.description, 'Description not set properly');
        Assert.areSame('The Tester', this.project.title, 'Title not set');
        Assert.areSame('admo', this.project.author, 'Author not set');
        Assert.areSame('entropy', this.project.contributor, 'Contributor not set');
        Assert.areSame('http://a.img', this.project.icon[0], 'Icon not set');
        Assert.areSame(1, this.project.icon.length, 'Found wring number of icons');
        Assert.areSame(2, this.project.url.length, 'Found wrong number of urls');
        Assert.areSame('http://one.url', this.project.url[0], 'URL #1 is wrong');
        Assert.areSame('http://two.url', this.project.url[1], 'URL #2 is wrong');
    }
}));

YUITest.TestRunner.add(suite);
