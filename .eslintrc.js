module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },

  parserOptions: {
    parser: "@typescript-eslint/parser"
  },

  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)"],
      env: {
        mocha: true
      }
    }
  ],

  extends: [
    "plugin:vue/recommended",
    "@vue/prettier",
    "plugin:vue/essential",
    "@vue/typescript"
  ]
};
