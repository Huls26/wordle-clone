module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "eslint:recommended",\
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:vitest/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.vite.json',
  },
  plugins: [
    'react',
    'vitest',
  ],
  rules: {
    // 'linebreak-style': ['error', 'window'],
    'linebreak-style': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
