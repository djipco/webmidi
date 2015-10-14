### 0.13.0 - 2015-06-19
* Add Github Enterprise Option
* Fix GitHub release status check
* Add Github auth token as variable
* Fix order of execution of before and after tasks
* Add support to update config variables with release
* Update node modules to latest versions

### 0.12.0
* Add support to release specific versions (#108)
* Feature: Add possibilitity to tag release as Github prerelease (#104)
* Bugfix: Ensure before and after tasks run correctly (#105)
  (!) Please be sure to use beforeBump, afterBump, beforeRelease and
      afterRelease as documented in README.md.

### v0.11.0 - 2015-02-05
* Adding custom tasks to run before or after bump and release

### v0.10.0 - 2015-01-12
* Update instructions for 'additionalFiles' usage
* Support strings in `option.additionalFiles`
* Update possibility to add a message in change log
* Fix `Cannot read property 'options' of undefined`
* Prevent message when committing from stating `undefined`
* Capitalize task description

### v0.9.0 - 2014-12-02
* Fix bugs related to `additionalFiles` option
* Fix JSHint errors in task
* Add .jshintrc and .editorconfig
* Update node modules to current version
* Add TravisCI configuration

### v0.8.1 - 2014-12-02
* Fix reference to package name in task configuration

### v0.8.0 - 2014-12-02
* Features/tag push specificity (#55)
* Add package.json/component.json name to templateData for messages (#54)
* Add support for multiline commit messages (#42)
* Support renamed tasks (#35)
* Prevent from releasing empty version numbers (#33)
* bump multiple files at once (fixes #90, #91)

### v0.7.0 and older release
