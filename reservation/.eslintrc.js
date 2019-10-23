module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', 'jsx']
      }
    ],
    'prettier/prettier': 'error',
    'max-len': ['error', 80],
    'no-console': 'off',
    'no-unused-vars': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'skipUndeclared'
  }
};
