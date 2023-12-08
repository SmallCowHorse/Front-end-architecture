### 手写 apply/bind

call、apply、bind 区别

1. call <==> apply 传参不同，依次传入/数组传入
   第一个参数：你要改变的 this 指向
   第二个参数开始：call 依次给函数传递，apply 是一个数组或者伪数组
2. bind 返回值不同
   <b>注意:</b>不会调用函数，而是返回一个新的函数，一个被改变好 this 指向的函数

```js
// 1. 需求：手写bind => bind位置 => Function.prototype => 原型
Function.prototype.newBind = function () {
  // 2. this改变原理
  const _this = this;
  // 将函数传入的参数转化为数组对象
  // 详见<b>例子</b>
  const args = Array.prototype.slice.call(arguments);
  const newThis = args.shift(); // 删除数组最前面的一个数据，返回值为删除的那个数据，直接修改原始数组

  // 核心封装函数不执行
  return function () {
    // 执行核心apply
    return _this.newApply(newThis, args);
  };
};
// 2. 内层实现
Function.prototype.newApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  // 参数兜底
  context = context | window;
  // 临时挂载执行函数
  context.fn = this;

  let result = arguments[1] ? context.fn(...arguments[1]) : context.fn()

  delete context.fn;
  return result
};
```

```js
  // 例子:
  function foo (a, b, c, d) {
    const args = Array.prototype.slice.call(arguments)
    console.log(args); // ['a', 'b', 'c', 'd']
    console.log(typeof arguments); // object
    console.log(arguments);
  };
  foo('a', 'b', 'c', 'd');
```
