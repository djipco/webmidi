# Using WEBMIDI.js in a TypeScript project

Version 3 of WEBMIDI.js officially supports TypeScript. Type declarations are available for the ESM
(ECMAScript modules) and CJS (CommonJS, a.k.a. Node.js modules) flavours in the `/dist` directory.

To use the example, `cd` into the example directory, install the necessary modules  with 
`npm install` and write some TypeScript code. You can generate the final JavaScript code with
`tsc myFile.ts`. This should yield a `myFile.js` which you can run with `node myFile.js`.

## Examples

* [**Basic Node.js Example**](basic-nodejs-example): listing input and output ports and reacting to 
  pressed keyboard keys.
