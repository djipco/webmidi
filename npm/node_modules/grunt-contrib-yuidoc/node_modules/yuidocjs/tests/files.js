'use strict';

var YUITest = require('yuitest');
var Assert = YUITest.Assert;
var path = require('path');
var fs = require('fs');
var Y = require(path.join(__dirname, '../', 'lib', 'index'));

//Move to the test dir before running the tests.
process.chdir(__dirname);

var suite = new YUITest.TestSuite('Files Test Suite');

suite.add(new YUITest.TestCase({
    name: 'Files Test Case',
    'test: exists': function () {
        var test = this;
        fs.writeFileSync('file1.txt', 'Files Test');
        Y.Files.exists('file1.txt', function (exists) {
            test.resume(function () {
                Assert.isTrue(exists);
                fs.unlinkSync('file1.txt');
            });
        });
        test.wait(100);
    },
    'test: copyDirectory': function () {
        var test = this;
        fs.mkdirSync('dir1');
        Y.Files.copyDirectory('dir1', 'dir2', true, function (err) {
            test.resume(function () {
                Assert.isUndefined(err);
                fs.rmdirSync('dir1');
                fs.rmdirSync('dir2');
            });
        });
        test.wait(100);
    },
    'test: copyFile': function () {
        var test = this;
        fs.writeFileSync('file1.txt', 'Files Test');
        Y.Files.copyFile('file1.txt', 'file2.txt', true, function (err) {
            test.resume(function () {
                Assert.isUndefined(err);
                fs.unlinkSync('file1.txt');
                fs.unlinkSync('file2.txt');
            });
        });
        test.wait(100);
    },
    'test: copyPath for file': function () {
        var test = this;
        fs.writeFileSync('file1.txt', 'Files Test');
        Y.Files.copyPath('file1.txt', 'file2.txt', true, function (err) {
            test.resume(function () {
                Assert.isUndefined(err);
                fs.unlinkSync('file1.txt');
                fs.unlinkSync('file2.txt');
            });
        });
        test.wait(100);
    },
    'test: copyPath for directory': function () {
        var test = this;
        fs.mkdirSync('dir1');
        Y.Files.copyPath('dir1', 'dir2', true, function (err) {
            test.resume(function () {
                Assert.isUndefined(err);
                fs.rmdirSync('dir1');
                fs.rmdirSync('dir2');
            });
        });
        test.wait(100);
    },
    'test: deletePath for file': function () {
        fs.writeFileSync('file1.txt', 'Files Test');
        Y.Files.deletePath('file1.txt');
        Assert.isFalse(fs.existsSync('file1.txt'));
    },
    'test: deletePath for symbolic link': function () {
        fs.writeFileSync('file1.txt', 'Files Test');
        fs.symlinkSync('file1.txt', 'file2.txt');
        Y.Files.deletePath('file2.txt');
        Assert.isFalse(fs.existsSync('file2.txt'));
        Assert.isTrue(fs.existsSync('file1.txt'));
        fs.unlinkSync('file1.txt');
    },
    'test: deletePath for directory': function () {
        fs.mkdirSync('dir1');
        Y.Files.deletePath('dir1');
        Assert.isFalse(fs.existsSync('dir1'));
    },
    'test: isDirectory for directory': function () {
        fs.mkdirSync('dir1');
        Assert.isTrue(Y.Files.isDirectory('dir1'));
        fs.rmdirSync('dir1');
    },
    'test: isDirectory for symbolic link': function () {
        fs.mkdirSync('dir1');
        fs.symlinkSync('dir1', 'dir2');
        Assert.isTrue(Y.Files.isDirectory('dir2', true));
        fs.unlinkSync('dir2');
        fs.rmdirSync('dir1');
    },
    'test: isFile for file': function () {
        fs.writeFileSync('file1.txt', 'Files Test');
        Assert.isTrue(Y.Files.isFile('file1.txt'));
        fs.unlinkSync('file1.txt');
    },
    'test: isFile for symbolic link': function () {
        fs.writeFileSync('file1.txt', 'Files Test');
        fs.symlinkSync('file1.txt', 'file2.txt');
        Assert.isTrue(Y.Files.isFile('file2.txt', true));
        fs.unlinkSync('file2.txt');
        fs.unlinkSync('file1.txt');
    },
    'test: isSymbolicLink': function () {
        fs.writeFileSync('file1.txt', 'Files Test');
        fs.symlinkSync('file1.txt', 'file2.txt');
        Assert.isTrue(Y.Files.isSymbolicLink('file2.txt'));
        fs.unlinkSync('file2.txt');
        fs.unlinkSync('file1.txt');
    },
    'test: lstatSync': function () {
        fs.writeFileSync('file1.txt', 'Files Test');
        Assert.isInstanceOf(fs.Stats, Y.Files.lstatSync('file1.txt'));
        fs.unlinkSync('file1.txt');
    },
    'test: statSync': function () {
        fs.writeFileSync('file1.txt', 'Files Test');
        Assert.isInstanceOf(fs.Stats, Y.Files.statSync('file1.txt'));
        fs.unlinkSync('file1.txt');
    },
    'test: copyAssets': function () {
        var test = this;
        fs.mkdirSync('dir1');
        fs.mkdirSync('dir2');
        fs.writeFileSync('dir1/file1.txt', 'Files Test');
        fs.writeFileSync('dir2/file2.txt', 'Files Test');
        Y.Files.copyAssets(['dir1', 'dir2'], 'dir3', false, function () {
            test.resume(function () {
                Assert.isTrue(fs.existsSync('dir3/file1.txt'));
                Assert.isTrue(fs.existsSync('dir3/file2.txt'));
                fs.unlinkSync('dir3/file1.txt');
                fs.unlinkSync('dir3/file2.txt');
                fs.unlinkSync('dir2/file2.txt');
                fs.unlinkSync('dir1/file1.txt');
                fs.rmdirSync('dir1');
                fs.rmdirSync('dir2');
                fs.rmdirSync('dir3');
            });
        });
        test.wait(100);
    },
    'test: getJSON': function () {
        var data = Y.Files.getJSON('input/folders1/yuidoc.json');
        Assert.isTypeOf('object', data);
        Assert.areSame('yuidoc-root', data.name);
    },
    'test: writeFile': function () {
        var test = this;
        Y.Files.writeFile('file1.txt', 'Files Test', function () {
            test.resume(function () {
                Assert.isTrue(fs.existsSync('file1.txt'));
                fs.unlinkSync('file1.txt');
            });
        });
        test.wait(100);
    },
    'test: readFile': function () {
        var test = this;
        Y.Files.readFile('input/test/test.js', 'utf8', function (err) {
            test.resume(function () {
                Assert.isNull(err);
            });
        });
        test.wait(100);
    }
}));

YUITest.TestRunner.add(suite);
