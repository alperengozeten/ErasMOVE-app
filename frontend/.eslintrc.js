// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        // "plugin:react/jsx-runtime",
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "plugins": [
        "react",
    ],
    "rules":{
      "react/display-name": [0, { "ignoreTranspilerName": true }],
      "semi": [2, "always"],
      // "react/jsx-curly-spacing": [2, {"when": "always"}],
      // "comma-dangle": ["error", "always-multiline"],
      'arrow-parens': ['error', 'as-needed'],
      'arrow-body-style': 'off',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: [
            '.js',
            '.jsx',
          ],
        },
      ],
  },
};
