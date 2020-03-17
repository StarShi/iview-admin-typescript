module.exports = {
  root: true,
  env: {
    node: true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  // parser: "@typescript-eslint/parser",	// 指定解析器
  // plugins: ["@typescript-eslint"],	// 指定插件
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": ["off", {
      // 允许声明未使用变量
      "vars": "all",
      // 参数不检查
      "args": "none"
    }],
    "no-dupe-keys":"error",
    // 优先使用const
    "prefer-const":"off",
    // 空函数
    "no-empty-function":"off",
    // "@typescript-eslint/no-inferrable-types": "off" // 关闭类型推断
  }
}