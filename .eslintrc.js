module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    "standard",
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'padded-blocks': ["error", { "classes": "always" }]
  }
}
