module.exports = {
  globals: { angular: false, module: false, inject: false, document: false },
  env: { browser: true, amd: true, node: true },
  root: true,
  extends: ["eslint:recommended", "prettier", "plugin:prettier/recommended"],
  ignorePatterns: ["styleguide.config.js"],
  plugins: ["react", "react-hooks"],
  overrides: [
    {
      files: ["src/**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/no-unsafe-return": "warn",
        "@typescript-eslint/no-empty-interface": [
          "warn",
          { allowSingleExtends: true },
        ],
        "@typescript-eslint/array-type": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-shadow": "warn",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
        "@typescript-eslint/member-ordering": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          { allowExpressions: true },
        ],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-extra-semi": "off",
      },
    },
    {
      files: ["src/**/*"],
      rules: {
        "prettier/prettier": [
          "warn",
          {
            endOfLine: "auto",
          },
        ],
        "guard-for-in": "warn",
        "react-hooks/rules-of-hooks": "warn",
        "react-hooks/exhaustive-deps": "warn",
        "no-sequences": "warn",
        "prefer-const": "warn",
        "no-console": "warn",
        "react/no-find-dom-node": "warn",
        "import/no-anonymous-default-export": "off",
        "no-unused-vars": "off",
        "no-shadow": "off",
        "no-extra-boolean-cast": "off",
        "no-constant-condition": "off",
        "no-case-declarations": "off",
        "no-irregular-whitespace": "off",
        "react/prop-types": "off",
        "react/no-children-prop": "off",
        "react/display-name": "off",
        "react/no-unescaped-entities": "off",
        "no-return-await": "warn",
        "require-await": "warn",
        curly: "warn",
      },
    },
  ],
};
