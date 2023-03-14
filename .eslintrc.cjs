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
        'plugin:react-hooks/recommended',
        'airbnb'
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "tsconfig.vite.json"
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
