module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser', // 解析器
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'], // 使用 eslint 和 typescript-eslint 建议的规则
  plugins: ['@typescript-eslint', 'prettier', 'import'], // 代码规范插件
  rules: {
    'prettier/prettier': 'error', // 不符合 prettier 规则的代码，要进行错误提示
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: 'tsconfig.json',
      },
    },
  },
};
