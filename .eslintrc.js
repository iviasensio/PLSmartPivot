module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    sourceType: "module"
  },
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    angular: false,
    define: false,
    describe: false,
    document: false,
    expect: false,
    it: false,
    require: false
  },
  rules: {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "unix"],
    "object-curly-spacing": ["error", "always"],
    "max-lines": ["warn", 300],
    "max-len": ["warn", { "code": 120, "ignoreComments": true, "ignoreTrailingComments": false }],
    "no-console": ["warn"],
    "no-mixed-operators": ["warn", {
      "groups": [
        ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
        ["&&", "||"],
        ["in", "instanceof"]
      ],
      "allowSamePrecedence": true
    }],
    "no-multi-spaces": ["error"],
    "no-cond-assign": ["warn"],
    "no-fallthrough": ["warn"],
    "no-undef": ["error"],
    "no-unused-vars": ["error"],
    "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": false }],
    "no-useless-escape": ["warn"],
    "no-useless-return": ["warn"],
    "no-underscore-dangle": ["warn", { "allow": ["_id"] }],
    "no-redeclare": ["error"],
    "no-restricted-syntax": ["warn"],
    "operator-linebreak": ["warn", "before"],
    "prefer-promise-reject-errors": ["warn"],
    "padded-blocks": ["warn", { "blocks": "never", "switches": "never", "classes": "never" }],
    "semi": ["error", "always"],
    "valid-typeof": ["warn"],
    "no-eval": ["error"],
    "no-implied-eval": ["error"],
    "no-debugger": ["warn"],
    "no-unreachable": ["warn"],
    "quotes": ["warn", "single", { "avoidEscape": true }],
    "sort-imports": ["off"],
    "max-lines-per-function": ["off"], // marks the entire functions, a bit too noisy
    "complexity": ["warn"],
    "camelcase": ["warn"],
    "max-statements": ["off"],  // marks the entire functions, a bit too noisy
    "sort-vars": ["off"], // not much value for the work
    "init-declarations": ["off"],
    "capitalized-comments": ["off"],
    "one-var": ["off"],
    "no-var": ["error"],
    "no-plusplus": ["warn"],
    "vars-on-top": ["off"],
    "no-magic-numbers": ["off"], // useful, but also complains for reasonable checks with actual numbers
    "new-cap": ["warn"],
    "block-scoped-var": ["warn"],
    "require-unicode-regexp": ["off"],
    "no-negated-condition": ["warn"],
    "operator-assignment": ["off"],
    "no-extra-parens": ["off"],
    "quote-props": ["off"],
    "prefer-template": ["warn"],
    "no-lonely-if": ["warn"],
    "sort-keys": ["off"], // not much value for the work
    "no-implicit-coercion": ["warn"],
    "no-inline-comments": ["off"],
    "spaced-comment": ["warn"],
    "require-jsdoc": ["off"],
    "func-style": ["off"],
    "func-names": ["off"],
    "id-length": ["warn"],
    "prefer-arrow-callback": ["warn"],
    "dot-location": ["off"],
    "line-comment-position": ["off"],
    "no-warning-comments": ["warn"],
    "multiline-comment-style": ["off"],
    "consistent-return": ["warn"],
    "no-else-return": ["warn"],
    "array-bracket-newline": ["warn"],
    "array-element-newline": ["warn"],
    "object-shorthand": ["warn"],
    "eqeqeq": ["warn"],
    "no-empty-function": ["off"],
    "function-paren-newline": ["warn"],
    "no-invalid-this": ["warn"],
    "newline-per-chained-call": ["warn"],
    "no-unused-expressions": ["warn"],
    "strict": ["warn"],
    "no-ternary": ["off"],
    "multiline-ternary": ["off"],
    "no-param-reassign": ["error"],
    "prefer-destructuring": ["warn"],
    "arrow-parens": ["off"],
    "no-array-constructor": ["warn"],
    "default-case": ["warn"],
    "no-alert": ["warn"],
    "max-params": ["warn"],
    "brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
    "prefer-const": ["warn"],

    // plugin:react
    "react/jsx-indent": ["warn", 2],
    "react/jsx-indent-props": ["warn", 2],
    "react/forbid-prop-types": ["warn"],
    "react/no-array-index-key": ["warn"],
    "react/jsx-sort-props": ["warn"],
    "react/require-default-props": ["warn"],
    "react/sort-prop-types": ["warn"],
    "react/jsx-max-props-per-line": ["warn"],
    "react/jsx-no-literals": ["off"],
    "react/jsx-max-depth": ["off"], // rule throws exception in single-dimension-measure
    "react/jsx-filename-extension": ["warn"],
    "react/prefer-stateless-function": ["warn"]
  },
  extends: [
    "eslint:all",
    "plugin:react/all"
  ]
}
