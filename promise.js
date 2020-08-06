class Promise {
  static resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(
        new TypeError(
          "代码实现在满足所有要求的情况下可以允许 promise2 === promise1 。每个实现都要文档说明其是否允许以及在何种条件下允许 promise2 === promise1"
        )
      );
    }
    // 如果x是一个看似thenable
    if ((typeof x === "object" && x !== null) || typeof x === "function") {
      try {
        const then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            (y) => {
              if (y instanceof Promise) {
                reject(
                  new TypeError(
                    "如果一个 promise 被一个循环的 thenable 链中的对象解决，而 [[Resolve]](promise, thenable) 的递归性质又使得其被再次调用，根据上述的算法将会陷入无限递归之中。算法虽不强制要求，但也鼓励施者检测这样的递归是否存在，若检测到存在则以一个可识别的 TypeError 为据因来拒绝 promise。"
                  )
                );
              } else {
                resolve(y);
              }
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          resolve(x);
        }
      } catch (e) {
        reject(e);
      }
    } else {
      // 表示为普通值
      resolve(x);
    }
  }
  constructor(executor) {
    //一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）
    this.status = "Pending";
    // promise的成功的值
    this.value = undefined;
    // promise失败的值
    this.reason = undefined;
    // 用来存储resolve的回调函数
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    // 一个执行executor函数提供给他的两个方法
    // 用来作为成功和失败时的回调
    const resolve = (value) => {
      //只有当promise处于等待状态时候才可以改变值，并且改变后状态不可变
      if (this.status === "Pending") {
        this.status = "Fulfilled";
        this.value = value;
        this.onResolvedCallbacks.forEach((cb) => cb());
      }
    };
    const reject = (reason) => {
      if (this.status === "Pending") {
        this.status = "Rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };
    // 初次就执行executor
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === "Fulfilled") {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            Promise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === "Rejected") {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            Promise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === "Pending") {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);

              Promise.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              Promise.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  }
}

module.exports = Promise;
