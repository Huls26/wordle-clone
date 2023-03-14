module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:vitest/recommended",
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended'
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "vitest"
    ],
    "rules": {
        
    },
    settings: {
        react: {
          version: 'detect'
        }
      }
}
