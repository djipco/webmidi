# Contributing

First off, **thank you** for considering to contribute to this project. You should know that there 
are many ways to contribute. You can write tutorials or blog posts, improve the documentation, 
submit bug reports or feature requests and write actual source code. All of these are very 
worthwhile contributions.

Following these guidelines helps to communicate that you respect the time of the developers managing 
this open source project. In return, they will reciprocate that respect in addressing your issue, 
assessing changes, and helping you finalize your pull requests.

## Submitting a Feature Requests

If you find yourself wishing for a feature, you are probably not alone. There are bound to be others 
out there with similar needs. Before submitting a feature request, first check if the 
[wiki](https://github.com/djipco/webmidi/wiki)'s enhancements section already lists that feature. 

If not, open an [issue](https://github.com/djipco/webmidi/issues) which describes the feature you 
would like to see, why you need it, and how it should work.

## Understanding How to Contribute

Contribution to this project is done via pull requests. This allows the owner and contributors to
properly review what gets merged into the project. 

**If this is your first pull request**, you can learn how to get started from a free series of 
tutorials called 
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

## Submitting a Pull Request

**WebMidi.js** is a relatively small library supported by an even smaller team. Therefore, the 
process for contributing is intended to be simple and friendly. 

However, to insure good quality, there are steps that you should go through when submitting a PR. 
Here are the usual steps:

1. Discuss the change(s) you wish to make by means of an 
[issue](https://github.com/djipco/webmidi/issues).
2. Unless the PR is for a minor improvement (typo, documentation, etc.), you should write and/or 
update unit tests and check your code against the tests (see below).
3. If appropriate, update the [jsdoc](http://usejsdoc.org/) comments. Keeping the documentation and
the API consistant is very important.
4. If appropriate, update the `README.md` file.

Please note that your code should adhere to the styles defined in `.eslintrc.js`. You can use 
`npm run lint` to make sure it does.

Finally, **do not** update the library's version number. Version numbering and releases will be 
handled by the owner. If the PR breaks backwards-compatibility, it must be communicated explicitely
to the owner. The versioning scheme follows the [SemVer](http://semver.org/) standard.

## Testing

WebMidi.js now has a proper test suite. The tests can be run on the command line without a need for
a browser (thanks to Tim Susa).

You can execute all tests, including code coverage, by running the following command in the 
terminal or on the command line:

``` 
npm run test-all
``` 

You can develop in *watch mode* with hot file reloading like so: 
``` 
npm run test -- -w
``` 

You can start a single test in this way:
``` 
npx mocha ./test/virtual-midi-test.js
``` 

You can develop a single test in *watch mode* like this:
``` 
npx mocha ./test/virtual-midi-test.js -- -w
``` 

If you simply want to view code coverage, you can do:
``` 
npm run test-coverage
``` 
