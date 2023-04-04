module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "eslint:recommended",\
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
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
    'import/no-unresolved': 0,
    'linebreak-style': 0,
    'import/extensions': 0,
    'import/default': 0,
    'import/no-extraneous-dependencies': 0,
  },
  ignorePatterns: ['test-utils.tsx', 'setup.ts'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
