  // 1. 构造科里化结构
  // 2. 输入 处理外层的arguments => 类数组处理
  // 3. 传入参数无限拓展 => 内层递归 => 返回递归函数本身
  // 4. 主功能区
  // 5. 输出 从函数到产出 toString替换

  const add  = function() {
    // input
    let args = Array.prototype.slice.call(arguments);

    // 内层函数
    let inner = function() {
        args.push(...arguments)

        return inner;
    }

    // 主功能
    inner.toString = function() {
        return args.reduce((prev, cur) => {
            return prev + cur;
        })
    }

    // 返回
    return inner;
}

'' + add(1)(2)(3)(4) // 10
// 如何去调用原来的toString => .call()

// rx.js => rx
// 多来源
// h5 => ajax
// im => socket
// toolbar => bridge
// channel => webRTC