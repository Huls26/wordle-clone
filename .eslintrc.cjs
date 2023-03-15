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
  eslintIgnore: ['test-utils.tsx'],
  settings: {
    react: {
      version: 'detect',
    },
    // 'import/resolver': {
    //   node: {
    //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //   },
    // },
  },
};
