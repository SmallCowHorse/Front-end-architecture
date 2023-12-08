// 规则
/*
- then 方法，应该返回一个 Promise
  promise2 = promise1.then(onFulfilled, onRejected)
  - onFulfilled / onRejected 的执行结果，为 x， 调用 resolvePromise
  - 如果 onFulfilled / onRejected 执行时抛出异常，我们 promise2 需要被 reject
  - 如果 onFulfilled / onRejected 不是一个函数，promise2 以 promise1 的 value 或者 reason 触发 fulfilled 和 rejected
promise1 中 onfulfilled 返回了一个值，这个值需要被 promise2 进行 resolve ，才能出现在下一个 then(res)。
*/
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
                  let result = onFulfilled(this.value);
                  resolve(result);
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
                  let result = onRejected(this.reason);
                  resolve(result);
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
                  let result = onFulfilled(this.value);
                  resolve(result);
              } catch(e) {
                  reject(e)
              }
          });
          this.onRejectedArray.push(() => {
              try {
                  // promise1 中 onfulfilled 返回了一个值，这个值需要被 promise2 进行 resolve ，才能出现在下一个 then(res)
                  let result = onRejected(this.reason);
                  resolve(result);
              } catch(e) {
                  reject(e)
              }
          });
      })

  }
}

