// 链式执行
// 00 个 promise，10个先执行，每 resolve 一个，加一个进去。形成 stream.
const promiseArrGenerator = (num) =>
  new Array(num).fill(0).map(
    (item, index) => () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(index);
        }, Math.random() * 1000);
      })
  );

let arr = promiseArrGenerator(100);

// arr.map((fn) => {
//     fn().then(console.log)
// })
// Promise.all(arr.map(fn => fn())).then(res => console.log(res))

// 设计一个 promise Chain 链式调用

const promiseChain = (arr) => {
  arr.reduce(
    (proChain, pro) =>
      proChain.then((res) => {
        ~res && console.log(res);
        return pro();
      }),
    Promise.resolve(-1)
  );
};

promiseChain(arr);

// 手动触发
// sleep 函数，halk 函数
const engine = (cb) => {
  let _resolve;

  new Promise((resolve, reject) => {
    _resolve = resolve;
  }).then((res) => {
    cb();
  });

  return {
    start: () => {
      _resolve();
    },
  };
};

let e = engine(() => {
  console.log("engine");
});

e.start();
