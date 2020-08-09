class Promise {
  static all(promises) {
    return new Promise((resolve, reject) => {
      const promisesArray = [];
      promises.forEach((any, index) => {
        if (any instanceof Promise) {
          any.then(ret => {
            promisesArray[index] = ret;
            if (promisesArray.length === promises.length) {
              resolve(promisesArray);
            }
          }, reject);
        } else {
          promisesArray[index] = any;
        }
      });
    });
  }
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
      let called;
      try {
        const then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            y => {
              if (called) return;
              called = true;
              Promise.resolvePromise(promise2, y, resolve, reject);
            },
            r => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } else {
          if (called) return;
          called = true;
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        called = true;
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
    const resolve = value => {
      // 如果一上来执行的resolve一个promise 继续调用then
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      //只有当promise处于等待状态时候才可以改变值，并且改变后状态不可变
      if (this.status === "Pending") {
        this.status = "Fulfilled";
        this.value = value;
        this.onResolvedCallbacks.forEach(cb => cb());
      }
    };
    const reject = reason => {
      if (this.status === "Pending") {
        this.status = "Rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach(cb => cb());
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
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : val => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : val => {
            throw val;
          };
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
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
Promise.deferred = function () {
  const dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
// promises-aplus-tests ./promise.js
module.exports = Promise;
