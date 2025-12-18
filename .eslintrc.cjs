module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'xo',
  ],
  overrides: [
    {
      extends: [
        'xo-typescript',
      ],
      files: [
        '*.ts',
        '*.tsx',
      ],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        "@typescript-eslint/no-unsafe-argument": "warn",
        '@typescript-eslint/object-curly-spacing': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
          },
        ],
        'object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/consistent-type-assertions': 'warn',
        '@typescript-eslint/naming-convention': 'off',
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/consistent-indexed-object-style": "off",
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 14,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    'capitalized-comments': 'off',
    'object-curly-spacing': ['error', 'always'],
    'vue/max-attributes-per-line': [2, {
      singleline: 10,
      multiline: 1,
    }],
    'no-console': [2, { allow: ['warn', 'error'] }],
    'no-async-promise-executor': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    "vue/html-indent": ["error", "tab", {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],

    // project only
    camelcase: [0, { properties: 'never' }],
  },
};
