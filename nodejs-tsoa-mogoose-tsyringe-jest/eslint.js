module.exports = {
    root: true,
    env: {
      node: true,
      es2021: true,
      "jest/globals": true
    },
    extends: [
      'airbnb-typescript/base',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    plugins: [
      '@typescript-eslint',
      'import-newlines',
      'jest',
    ],
    rules: {
      '@typescript-eslint/type-annotation-spacing': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'linebreak-style': 'off',
      'class-methods-use-this': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'max-len': ['error', 140, 2],
      'import-newlines/enforce': [
        'error',
        { items: 2 },
      ],
      'object-curly-newline': ['error', {
        ObjectExpression: {
          multiline: true,
          minProperties: 2,
        },
        ObjectPattern: { multiline: true },
        ImportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
  
      }],
      'object-property-newline': ['error', { allowMultiplePropertiesPerLine: false }],
      '@typescript-eslint/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      }],
    },
  };
  