    // 1. 需求：手写bind => bind位置 => Function.prototype => 原型
    Function.prototype.newBind = function() {
      // 1.1 bind原理
      const _this = this
      const args = Array.prototype.slice.call(arguments) // 类数组
      const newThis = args.shift()

      // 1.2 返回值不执行 => 返回函数
      return function() {
          // 执行核心
          return _this.newApply(newThis, args)
      }
  }

  // 2. 内层实现
  Function.prototype.newApply = function(context) {
      // 参数兜底
      context = context || window

      // 临时挂载执行函数
      context.fn = this

      let result = arguments[1]
          ? context.fn(...arguments[1])
          : context.fn()

      delete context.fn
      return result;
  }