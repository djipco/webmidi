# grunt-release

[![Build Status](https://travis-ci.org/geddski/grunt-release.svg?branch=master)](https://travis-ci.org/geddski/grunt-release)
[![Dependency Status](https://david-dm.org/geddski/grunt-release.svg)](https://david-dm.org/geddski/grunt-release)
[![devDependency Status](https://david-dm.org/geddski/grunt-release/dev-status.svg)](https://david-dm.org/geddski/grunt-release#info=devDependencies)

[Grunt](http://gruntjs.com) plugin for automating all the release steps of your node lib or bower component, with optional publishing to npm.

## Repetition Killed the Cat
Releasing a new version of your killer Node/Bower/Component/JS lib looks something like this:

1. bump the version in your `package.json` file.
2. stage the package.json file's change.
3. commit that change with a message like "release 0.6.22".
4. create a new git tag for the release.
5. push the changes out to GitHub.
6. also push the new tag out to GitHub.
7. create a .zip release on GitHub.
8. publish the new version to npm.

Cool, right? No! What's wrong with you? Automate all that:

```shell
grunt release
```

Done. No more GitHub issues from angry people reminding you how often you forget to do one or more of the steps.

## Setup
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-release --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-release');
```

## Using grunt-release

**Patch Release:**
```shell
grunt release
```
or
```shell
grunt release:patch
```

**Minor Release:**
```shell
grunt release:minor
```

**Major Release:**
```shell
grunt release:major
```

**Specific Version Release:**
```shell
grunt release:1.2.3
```

**Pre-release**
```shell
grunt release:prerelease
```

`prerelease` will just update the number after `MAJOR.MINOR.PATCH` (eg: `1.0.0-1`)
If you want to add an alphanumeric identifier, you will need to add it by hand.
Example: add `-alpha.0` to get something like `1.0.0-alpha.0`. Calling `grunt release:prerelease` will just update the last number to `1.0.0-alpha.1`.

**Releasing Unstable/Beta Versions**
Sometimes it is useful to publish an 'unstable' or 'beta' version to `npm`, while leaving your last stable release as the default that gets installed on an `npm install`.
`npm` accomplishes this using the `--tag myUnstableVersion` flag. You can enable this flag in grunt-release either by setting the `npmtag` option:

```js
  release: {
    options: {
      npmtag: 'canary',
    }
  }
```

or by passing the CLI arg:

```shell
grunt release --npmtag canary
```

NOTE: If the tag you pass is **true**, then the tag will be the *new* version number after the bump. Otherwise it will be the string you provided.


**Bump multiple files at once**

Sometimes you may need to bump multiple files while releasing.

```js
  release: {
    options: {
      additionalFiles: ['bower.json']
    }
  }
```

You can also provide multiple files in this array or provide a string with multiple file paths separated by comma (`,`).

The version to bump is set in the master file defined with option 'file' (default : package.json).
This version will be propagated to every additionalFiles.

**Dry Run:**
To see what grunt-release does, without really changing anything, use `--no-write` option.

```shell
grunt release --no-write
```

You'll see something like:
```
>> Release dry run
>> bumped version to 0.8.0
>> staged package.json
>> committed package.json
>> created new git tag: 0.8.0
>> pushed to remote git repo
>> pushed new tag 0.8.0 to remote git repo
>> published version 0.8.0 to npm
>> created 0.8.0 release on github.

Done, without errors.
```

## Options
The following are all the release steps, you can disable any you need to:

```js
  release: {
    options: {
      bump: false, //default: true
      changelog: true, //default: false
      changelogText: '<%= version %>\n', //default: '### <%= version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n'
      file: 'component.json', //default: package.json
      add: false, //default: true
      commit: false, //default: true
      tag: false, //default: true
      push: false, //default: true
      pushTags: false, //default: true
      npm: false, //default: true
      npmtag: true, //default: no tag
      indentation: '\t', //default: '  ' (two spaces)
      folder: 'folder/to/publish/to/npm', //default project root
      tagName: 'some-tag-<%= version %>', //default: '<%= version %>'
      commitMessage: 'check out my release <%= version %>', //default: 'release <%= version %>'
      tagMessage: 'tagging version <%= version %>', //default: 'Version <%= version %>',
      beforeBump: [], // optional grunt tasks to run before file versions are bumped
      afterBump: [], // optional grunt tasks to run after file versions are bumped
      beforeRelease: [], // optional grunt tasks to run after release version is bumped up but before release is packaged
      afterRelease: [], // optional grunt tasks to run after release is packaged
      updateVars: [], // optional grunt config objects to update (this will update/set the version property on the object specified)
      github: {
        apiRoot: 'https://git.example.com/v3', // Default: https://github.com
        repo: 'geddski/grunt-release', //put your user/repo here
        accessTokenVar: 'GITHUB_ACCESS_TOKE', //ENVIRONMENT VARIABLE that contains GitHub Access Token

        // Or you can use username and password env variables, we discourage you to do so
        usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains GitHub username
        passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains GitHub password
      }
    }
  }
```

If you want to use multiline commit messages just pass an array to the `commitMessage` option instead of a string.

### Notes on GitHub Releases:

1. Yes, you have to use environment variables.
2. The [GitHub Releases API](http://developer.github.com/v3/repos/releases/) is still unstable and may change in the future.
3. You should use an environment variable to set an [access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use) and "link" it via `accessTokenVar`.
4. You can use environment variables for username (referenced in `usernameVar`) and password (`passwordVar`).
5. We don't encourage you to use username and password for the GitHub release.

For node libs, leave `file` option blank as it will default to `package.json`. For Bower components, set it to `bower.json`.

## License
MIT
