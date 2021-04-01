module.exports = {
  // root: true,
  env: {
    //指定代码的运行环境
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // 指定ESLint解析器
  extends: [
    'plugin:react/recommended', // 使用来自 @eslint-plugin-react 的推荐规则
    'plugin:@typescript-eslint/recommended', // 使用来自@typescript-eslint/eslint-plugin的推荐规则
    // 'prettier/@typescript-eslint',  // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2019, // 允许解析最新的 ECMAScript 特性
    sourceType: 'module', // 允许使用 import
    ecmaFeatures: {
      jsx: true, // 允许对JSX进行解析
    },
  },
  rules: {
    // 自定义规则
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'prettier/prettier': 'off',
    // 继承于standard规则，还包含了import，node，promise，具体规则请看 https://standardjs.com/rules-zhcn.html#javascript-standard-style
    'no-useless-escape': 'off', // 禁用不必要的转义,但由于`\$\{${key}\}` 这样的他识别错误，所以关掉它
    'prefer-promise-reject-errors': 'off', // 可以使用非error对象作为promise reject的原因 有时直接 reject 一个字符串还是比较方便的
    'no-mixed-operators': 'warn', // 混合使用不同的操作符最好用括号括起来明确意图  例如 a && b || c 这样写其实虽然挺直接的，但最好写成 (a && b) || c ，因为standard里是错误，此处改为警告就行
    'no-prototype-builtins': 'warn', // 禁止直接使用 Object.prototypes 的内置属性，建议使用 Object.prototype.hasOwnProperty.call(foo, "bar") 这种方式
    'max-depth': ['error', 5], // 函数嵌套过深，提醒重构
    'max-params': ['error', 7], // 函数参数过多, 注意可以使用对象传参，这里应该调整为5好一点，不过考虑项目有历史代码，先调整为7
    'max-nested-callbacks': ['error', 3], // 最大回调深度 为3层
    'prefer-rest-params': 'warn', // 建议使用解构 ...args 来代替 arguments , arguments 没有 Array.prototype 方法，所以有点不方便
    'no-var': 'error', // 禁止使用 var，必须用 let 或 const
    'for-direction': 'error', // 如果一个 for 循环的停止条件永远无法到达，比如，计数器在错误的方向上移动，将陷入无限循环。
    'getter-return': 'error', // 每个 getter 都期望有返回值
    complexity: ['warn', 5], // 所有代码的独立现行路径条数 例如多个 if else
    'no-empty': 'error', // 禁止空块语句
    'no-inner-declarations': 'error', // 禁止在嵌套的语句块中出现function 声明
    'default-case': 'error', // 要求 Switch 语句中有 Default 分支,如果的确没有 可在最后注释 // No Default
    'guard-for-in': 'warn', // 在使用 for in 遍历对象时，会把从原型链继承来的属性也包括进来,最好增加if判断，比如foo.hasOwnProperty(key)，不过注意不要违反 no-prototype-builtins
    'max-classes-per-file': ['warn', 1], // 每个文件中建议只包含1个类 单一责任原则
    'no-alert': 'error', // alert、confirm 和 prompt 被广泛认为是突兀的 UI 元素，应该被一个更合适的自定义的 UI 界面代替。
    'no-empty-function': 'error', // 禁止出现空函数,尤其是箭头函数的空语句块，可以在空函数里写一条注释
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect', // 告诉 eslint-plugin-react 自动检测 React 的版本
    },
  },
};
