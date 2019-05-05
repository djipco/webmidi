module.exports = {

  "env": {
    "amd": true,
    "browser": true,
    "mocha": true,
    "node": true
  },

  "parserOptions": {
    "ecmaVersion": 6
  },

  "globals": {
    "Promise": "readonly"
  },

  "extends": ["eslint:recommended", "prettier"],

  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double", {"avoidEscape":  true, "allowTemplateLiterals": true}],
    "no-console": ["error", { "allow": ["info", "warn", "error"] }],
    "no-multi-spaces": ["error", { "ignoreEOLComments": true }],
    "no-trailing-spaces": ["error", { "skipBlankLines": true, "ignoreComments": true }],
    "no-underscore-dangle": "off",
    "quote-props": ["error", "as-needed"],
    "semi": ["error", "always"]
  }

};