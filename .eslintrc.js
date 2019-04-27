module.exports = {

  'env': {
    'browser': true
  },

  'globals': {
    'define': 'readonly',
    'Promise': 'readonly',
    'module': 'readonly'
  },

  'extends': 'eslint:recommended',

  'rules': {
    'indent': ['error', 2, { 'VariableDeclarator': 'first' }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single', {'avoidEscape':  true, 'allowTemplateLiterals': true}],
    'no-console': ['error', { 'allow': ['warn', 'error'] }],
    'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
    'no-trailing-spaces': ['error', { 'skipBlankLines': true, 'ignoreComments': true }],
    'no-underscore-dangle': 'off'
  }

};