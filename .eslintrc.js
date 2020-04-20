module.exports = {

  "env": {
    "amd": true,
    "browser": true,
    "mocha": true,
    "node": true,
    "es6": true
  },

  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },

  "globals": {
    "Promise": "readonly",
    "WebMidi": "readonly",
    "chai": "readonly",
    "sinon": "readonly",
    "expect": "readonly",
    "Note": "readonly",
    "isNative": "readonly",
    "inputPort": "readonly",
    "outputPort": "readonly",
  },

  "extends": ["eslint:recommended", "prettier"],

  // The idea here is to stick to the rules defined by Prettier (https://prettier.io/) and only make
  // exceptions in ESLint when absolutely necessary.
  "rules": {

    // Rules to align ESLint with Prettier (even though we are already using eslint-config-prettier)
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "quote-props": ["error", "as-needed"],
    "quotes": ["error", "double", {"avoidEscape":  true, "allowTemplateLiterals": true}],

    // Rules that knowingly change the default Prettier behaviour
    "no-multi-spaces": ["error", { "ignoreEOLComments": true }],
    "linebreak-style": ["error", "unix"], // Force \n instead of Prettier's auto-detect behaviour
    "no-trailing-spaces": ["error", { "skipBlankLines": true, "ignoreComments": true }],
    "max-len": ["error", { "code": 100 }], // Prettier's 80 is too small. Period.
    "no-console": ["error", { "allow": ["info", "warn", "error"] }], // Only some (unlike Prettier)

    // Other rules
    "no-prototype-builtins": "off"

  }

};
