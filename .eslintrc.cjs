module.exports = {
  extends: ['plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', 'shymean'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
