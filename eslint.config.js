/** @type {import('eslint').ESLint.FlatConfig} */
module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/package/**',
      '**/reports/**',
      '**/vendor/*.js',
      '.vscode',
    ],
    files: ['src/**/*.js'],
    rules: {
      'no-console': ['warn', { allow: ['log', 'error', 'warn'] }],
      'no-unused-vars': 'warn',
      'prettier/prettier': ['error'], // Make sure this rule is defined correctly
    },
    plugins: {
      import: require('eslint-plugin-import'),
      prettier: require('eslint-plugin-prettier'), // Include prettier plugin here
    },
  },
  {
    files: ['src/**/*.js'],
    rules: {
      'no-undef': 'off',
    },
  },
];
