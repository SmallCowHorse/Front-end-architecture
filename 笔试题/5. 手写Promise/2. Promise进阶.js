// 规则
/*
- resolve / reject 执行了之后，再执行 onfulfilled 和 onjected；
- onfulfilled 和 onjected 应该是微任务。
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

  if(this.status === "pending") {
      this.onFulfilledArray.push(onFulfilled);
      this.onRejectedArray.push(onRejected);
  }
}
