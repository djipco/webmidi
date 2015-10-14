'use strict';

var YUITest = require('yuitest');
var Assert = YUITest.Assert;
var path = require('path');
var fs = require('fs');
var Y = require(path.join(__dirname, '../', 'lib', 'index'));

//Move to the test dir before running the tests.
process.chdir(__dirname);

var suite = new YUITest.TestSuite({
    name: 'Builder Test Suite',
    findByName: function (name, cl) {
        var items = this.data.classitems,
            ret;

        items.forEach(function (i) {
            if (i.name === name && i.class === cl) {
                ret = i;
            }
        });

        return ret;
    },
    setUp: function () {
        var options, json, builder;

        options = {
            quiet: true,
            paths: ['input/'],
            outdir: './out',
            helpers: [
                path.join(__dirname, 'lib/davglass.js')
            ],
            markdown: {
                langPrefix: 'language-'
            }
        };
        json = (new Y.YUIDoc(options)).run();

        this.project = json.project;
        this.data = json;

        builder = new Y.DocBuilder(options, json);
        builder.compile(function () {
            suite._setupComplete = true;
        });
        this.builder = builder;
    }
});


var exists = fs.existsSync || path.existsSync;

suite.add(new YUITest.TestCase({
    name: 'Builder setup',
    'test: prep': function () {
        this.project = suite.project;
        this.data = suite.data;
        /*
            This test is a total crap test, I need to setup something
            that is async, but suite's don't appear to support .wait/.resume
            so I have to check it in the first test to make sure my
            async task in the setup is complete before I can test against it.
        */
        var test = this,
            timer = setInterval(function () {
                if (suite._setupComplete) {
                    clearInterval(timer);
                    test.resume(function () {
                        Assert.isTrue(suite._setupComplete);
                    });
                }
            }, 10);
        this.wait();
    },
    'test: Directories': function () {
        var dirs = ['assets', 'classes', 'files', 'modules', 'elements'];
        dirs.forEach(function (d) {
            var p = path.join(__dirname, 'out', d);
            Assert.isTrue(exists(p), 'Failed to find: ' + p);
        });

    },
    'test: Assets Directories': function () {
        var dirs = ['css', 'js', 'img', 'vendor', 'index.html'];
        dirs.forEach(function (d) {
            var p = path.join(__dirname, 'out', 'assets', d);
            Assert.isTrue(exists(p), 'Failed to find: ' + p);
        });

    },
    'test: index.html': function () {
        var p = path.join(__dirname, 'out', 'index.html');
        Assert.isTrue(exists(p), 'Failed to find: ' + p);
    },
    'test: data.json': function () {
        var p = path.join(__dirname, 'out', 'data.json');
        Assert.isTrue(exists(p), 'Failed to find: ' + p);
    },
    'test: api.js': function () {
        var p = path.join(__dirname, 'out', 'api.js');
        Assert.isTrue(exists(p), 'Failed to find: ' + p);
    },
    'test: classes/JSON.html': function () {
        var p = path.join(__dirname, 'out', 'classes', 'JSON.html');
        Assert.isTrue(exists(p), 'Failed to find: ' + p);
    },
    'test: files name filter': function () {
        var dir = path.join(__dirname, 'out', 'files');
        fs.readdirSync(dir).forEach(function (file) {
            Assert.isTrue(((file.indexOf('input_') === 0) || file.indexOf('index.html') === 0), 'Filed to parse: ' + file);
        });
    },
    'test: module files': function () {
        var mods = this.data.modules;
        Object.keys(mods).forEach(function (name) {
            var m = mods[name],
                p = path.join(__dirname, 'out', 'modules', m.name + '.html');
            Assert.isTrue(exists(p), 'Failed to render: ' + m.name + '.html');
        });
    },
    'test: class files': function () {
        var mods = this.data.classes;
        Object.keys(mods).forEach(function (name) {
            var m = mods[name],
                p = path.join(__dirname, 'out', 'classes', m.name + '.html');
            Assert.isTrue(exists(p), 'Failed to render: ' + m.name + '.html');
        });
    },
    'test: element files': function () {
        var mods = this.data.elements;
        Object.keys(mods).forEach(function (name) {
            var m = mods[name],
                p = path.join(__dirname, 'out', 'elements', m.name + '.html');
            Assert.isTrue(exists(p), 'Failed to render: ' + m.name + '.html');
        });
    }
}));

suite.add(new YUITest.TestCase({
    name: 'Builder Augmentation Tests',
    'test: inherited methods': function () {
        var item = suite.data.classes['mywidget.SubWidget'];
        Assert.isObject(item, 'Failed to parse class');
        suite.builder.renderClass(function (html, view, opts) {
            var method;
            opts.meta.methods.forEach(function (i) {
                if (i.name === 'myMethod' && i.class === 'mywidget.SubWidget') {
                    method = i;
                }
            });

            Assert.isObject(method, 'Failed to find inherited method');
            Assert.isObject(method.overwritten_from, 'Failed to find overwritten data');
        }, item);
    },
    'test: helper methods': function () {
        var item = suite.data.classes['mywidget.SuperWidget'];
        Assert.isObject(item, 'Failed to parse class');
        suite.builder.renderClass(function (html, view, opts) {
            var method;
            opts.meta.methods.forEach(function (i) {
                if (i.name === 'getTargets2' && i.class === 'mywidget.SuperWidget') {
                    method = i;
                }
            });

            Assert.isObject(method, 'Failed to find inherited method');
            Assert.isTrue((method.description.indexOf('DAVGLASS_WAS_HERE::Foo') > 0), 'Helper failed to parse');
        }, item);
    },

    'test: markdown options': function () {
        var item = suite.data.classes['mywidget.SuperWidget'];
        Assert.isObject(item, 'Failed to parse class');
        suite.builder.renderClass(function (html, view, opts) {
            var method;
            opts.meta.methods.forEach(function (i) {
                if (i.name === 'getTargets3' && i.class === 'mywidget.SuperWidget') {
                    method = i;
                }
            });

            Assert.isTrue((method.description.indexOf('language-javascript') > 0), 'Markdown options were not applied');
        }, item);
    }
}));


YUITest.TestRunner.add(suite);
