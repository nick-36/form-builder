// {
//   "extends": [
//     "next/core-web-vitals",
//     "next/typescript",
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended"
//   ],
//   "rules": {
//     "no-unused-vars": "off",
//     "@typescript-eslint/no-unused-vars": ["error"]
//   }
// }

module.exports = {
  parser: "babel-eslint",
  extends: [
    "prettier",
    "plugin:react/recommended",
    "plugin:storybook/recommended",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    es2020: true,
  },
  plugins: ["prettier", "react", "react-hooks"],
  rules: {
    "no-extra-semi": 1,
    "no-inner-declarations": 2,
    "no-use-before-define": [
      "warn",
      {
        functions: false,
        classes: true,
      },
    ],
    "react/no-unescaped-entities": "off",
    curly: 2,
    "no-eval": 2,
    "no-extend-native": 2,
    "no-new-wrappers": 2,
    "no-with": 2,
    "no-return-await": 2,
    "no-undef": 2,
    "no-var": 1,
    "no-unused-vars": [
      2,
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "all",
        ignoreReadBeforeAssign: false,
      },
    ],
    "no-array-constructor": 2,
    "no-new-object": 2,
    "prettier/prettier": "error",
    "react/prop-types": 0,
    "react/no-find-dom-node": 0,
    "no-console": 1,
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-warning-comments": 0,
    "@typescript-eslint/no-unused-vars": [
      2,
      {
        args: "none",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      rules: {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"], // "@typescript-eslint/no-explicit-any": "warn",
      },
    },
  ],
  settings: {
    eslint: {
      packageManager: "npm",
    },
  },
};
