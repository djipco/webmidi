# vue-webmidi3

Currently, this example does not work because the bundler is looking for perf_hooks even though it's
a native module since Node.js v8.x. Something will have to be fixed in Vue.js in order to make this 
work.

Check out this discussion of the issue: https://github.com/djipco/webmidi/issues/120

## Install dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```
