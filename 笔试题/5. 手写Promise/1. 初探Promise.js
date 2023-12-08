// 规则
/*
- Promise 是一个构造函数；
- Promise 接受一个函数作为参数，这个函数的参数，是两个函数(resolve, reject)
- Promise 返回一个对象，这个对象包含一个 then 函数，这个then 函数，接收两个参数，这两个参数，也都是函数。
- Promise 的 status：
  - pending
    - 初始的状态，可以改变
    - 一个 Promise 在 resolve 或者 reject 之前，都处于这个状态
    - 我们可以通过调用 resolve 或者 reject 方法，让这个 Promise 变成 fulfilled 或者 rejected 的状态。
  - fulfilled
    - 不可变状态
    - 在 resolve 之后，变成这个状态，拥有一个 value
  - rejected
    - 不可变状态
    - 在 reject 之后，变成这个状态，拥有一个 reason
- then 函数
  - 参数
    - onFulfilled, onRejected 必须是函数类型，如果不是，应该被忽略；
  - onFulfilled 和 onRejected 的特性
    - 在 promise 变成 fulfilled / rejected 状态的时候，应该调用 onFulfilled / onRejected；
    - 在 promise 变成 fulfilled / rejected 状态之前，不应该被调用
    - 只能调用一次。
*/
function LPromise(execute) {
  this.status = "pending";
  this.value = null;
  this.reason = null;

  const resolve = (value) => {
      if(this.status === "pending") {
          this.value = value;
          this.status = "fulfilled";
      }
  }

  const reject = (reason) => {
      if(this.status === "pending") {
          this.reason = reason;
          this.status = "rejected";
      }
  }

  execute(resolve, reject);
}

LPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled: (data) => { return data };
  onRejected = typeof onRejected === "function" ? onRejected: (error) => { throw error };

  if(this.status === "fulfilled") {
      onFulfilled(this.value);
  }

  if(this.status === "rejected") {
      onRejected(this.reason);
  }
}
