module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  // parserOptions: {
  //   ecmaVersion: 12,
  //   parser: '@typescript-eslint/parser',
  //   sourceType: 'module'
  // },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    // jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    //"off" or 0 - 关闭规则
    //"warn" or 1 - 将规则视为一个警告（不会影响退出码）
    //"error" or 2 - 将规则视为一个错误 (退出码为1)

    // 末尾强制不加分号
    'semi': [2, 'never'],
    // 不加尾随逗号
    'comma-dangle': [2, 'never'],
    // 属性名如果又引号，则都加引号
    'quote-props': [2, 'consistent-as-needed'],
    // 换行符问题关闭校验
    'linebreak-style': [0, 'windows'],
    // vue3允许根部多个标签
    'vue/no-multiple-template-root': 0,
    // devDependencies下面的包也可以import
    'import/no-extraneous-dependencies': 0,
    // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
    "computed-property-spacing": [2,"never"],
    "object-curly-spacing": [2,"always"],
    // 禁止使用console
    'no-console': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 返回值没有类型也可以
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-vars': 2,

    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/script-setup-uses-vars': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
