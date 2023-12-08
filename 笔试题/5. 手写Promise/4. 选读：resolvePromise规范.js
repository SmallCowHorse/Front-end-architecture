// 规则
/**
 * resolvePromise(promise2, x, resolve, reject)
- 如果 promise2 和 x 相等，那么 reject error;
- 如果 promise2 是一个 promise
  - 如果 x 是一个pending 状态，那么 promise2 必须要再 pending, 直到 x 变成 fulfilled / rejected
  - 如果 x 被 fulfilled， fulfill promise with the same value
  - 如果 x 被 rejected， reject promise with the same reason
- 如果 x 是一个 object 或者 function
  - Let thenable = x.then
  - 如果 x.then 这一步出错，那么 reject promise with e as the reason
  - 如果 then 是一个函数，then.call(x, resolvePromiseFn, rejectPromiseFn)
    - resolvePromiseFn 的入参是y, 执行 resolvePromise(promise2, y, resolve, reject)
    - rejectPromiseFn 的入参是 r, reject promise with r
    - 如果 resolvePromiseFn 和 rejectPromiseFn 都调用了，那么第一个调用优先，后面的忽略
    - 如果调用then 抛出异常
      - 如果 resolvePromise 或 rejectPromise 已经被调用，可以忽略
    - 如果 then 不是一个 function， fulfill promise with x
*/

const resolvePromise = (promise2, result, resolve, reject) => {
  // 当 result 和 promise2 相等时，也就是说 onfulfilled 返回 promise2 时，进行 reject
  if (result === promise2) {
    reject(new TypeError('error due to circular reference'))
  }

  // 是否已经执行过 onfulfilled 或者 onrejected
  let consumed = false
  let thenable

  if (result instanceof LPromise) {
    if (result.status === 'pending') {
      result.then(function(data) {
        resolvePromise(promise2, data, resolve, reject)
      }, reject)
    } else {
      result.then(resolve, reject)
    }
    return
  }

  let isComplexResult = target => (typeof target === 'function' || typeof target === 'object') && (target !== null)

  // 如果返回的是疑似 Promise 类型
  if (isComplexResult(result)) {
    try {
      thenable = result.then
      // 如果返回的是 Promise 类型，具有 then 方法
      if (typeof thenable === 'function') {
        thenable.call(result, function(data) {
          if (consumed) {
            return
          }
          consumed = true

          return resolvePromise(promise2, data, resolve, reject)
        }, function(error) {
          if (consumed) {
            return
          }
          consumed = true

          return reject(error)
        })
      }
      else {
        resolve(result)
      }

    } catch(e) {
      if (consumed) {
        return
      }
      consumed = true
      return reject(e)
    }
  }
  else {
    resolve(result)
  }
}

function LPromise(execute) {
  this.status = "pending";
  this.value = null;
  this.reason = null;

  this.onFulfilledArray = [];
  this.onRejectedArray = [];

  const resolve = (value) => {
      queueMicrotask(() => {
          if(this.status === "pending") {
              this.value = value;
              this.status = "fulfilled";
              this.onFulfilledArray.forEach(func => func(value))
          }
      })
  }

  const reject = (reason) => {
      queueMicrotask(() => {
          if(this.status === "pending") {
              this.reason = reason;
              this.status = "rejected";
              this.onRejectedArray.forEach(func => func(reason))
          }
      })
  }
  // try catch
  execute(resolve, reject);
}

LPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled: (data) => { return data };
  onRejected = typeof onRejected === "function" ? onRejected: (error) => { throw error };

  let promise2;

  if(this.status === "fulfilled") {
      return promise2 = new LPromise((resolve, reject) => {
          queueMicrotask(() => {
              try {
                  // promise1 中 onfulfilled 返回了一个值，这个值需要被 promise2 进行 resolve ，才能出现在下一个 then(res)
                  let x = onFulfilled(this.value);
                  resolvePromise(promise2, x, resolve, reject)
              } catch(e) {
                  reject(e)
              }
          })
      })

  }

  if(this.status === "rejected") {
      return promise2 = new LPromise((resolve, reject) => {
          queueMicrotask(() => {
              try {
                  // promise1 中 onfulfilled 返回了一个值，这个值需要被 promise2 进行 resolve ，才能出现在下一个 then(res)
                  let x = onRejected(this.reason);
                  resolvePromise(promise2, x, resolve, reject)
              } catch(e) {
                  reject(e)
              }
          })
      })
  }

  if(this.status === "pending") {
      return promise2 = new LPromise((resolve, reject) => {
          this.onFulfilledArray.push(() => {
              try {
                  let x = onFulfilled(this.value);
                  resolvePromise(promise2, x, resolve, reject)
              } catch(e) {
                  reject(e)
              }
          });
          this.onRejectedArray.push(() => {
              try {
                  // promise1 中 onfulfilled 返回了一个值，这个值需要被 promise2 进行 resolve ，才能出现在下一个 then(res)
                  let x = onRejected(this.reason);
                  resolvePromise(promise2, x, resolve, reject)
              } catch(e) {
                  reject(e)
              }
          });
      })

  }
}

