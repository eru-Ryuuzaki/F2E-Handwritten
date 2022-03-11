const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  // promise 状态
  status = PENDING;

  // 成功之后的值
  value = undefined;
  // 失败之后的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];
  // 使用箭头函数是为了 this 指向 MyPromise 这个类
  // 如果状态不是 pending 就不能改变状态
  resolve = (value) => {
    if (this.status !== PENDING) return;
    // 将状态改为成功
    this.status = FULFILLED;
    this.value = value;
    // 如果成功回调存在那么就调用
    // this.successCallback && this.successCallback(this.value);
    while (this.successCallback.length) {
      this.successCallback.shift()();
    }
  };
  reject = (reason) => {
    if (this.status !== PENDING) return;
    // 将状态改为失败
    this.status = REJECTED;
    this.reason = reason;
    // this.failCallback && this.failCallback(this.reason);
    while (this.failCallback.length) {
      this.failCallback.shift()();
    }
  };
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : (value) => value;
    failCallback = failCallback
      ? failCallback
      : (reason) => {
          throw reason;
        };
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 改成 setTimeout 是为了变成异步，让 resolvePromise 能获取到 promise2
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            // 判断 x 的值是普通值还是 promise 对象
            // 如果是普通值 直接调用 resolve
            // 如果是 promise 对象 查看promise 对象返回的结果
            // 再根据 promise 对象返回的结果 决定调用 resolve还是 reject
            resolvePromise(promise2, x, resolve, reject); // 用来解析 x 值的
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            // 判断 x 的值是普通值还是 promise 对象
            // 如果是普通值 直接调用 resolve
            // 如果是 promise 对象 查看promise 对象返回的结果
            // 再根据 promise 对象返回的结果 决定调用 resolve还是 reject
            resolvePromise(promise2, x, resolve, reject); // 用来解析 x 值的
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else {
        // 将成功回调和失败回调存放到数组中
        // 这里不理解
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              // 判断 x 的值是普通值还是 promise 对象
              // 如果是普通值 直接调用 resolve
              // 如果是 promise 对象 查看promise 对象返回的结果
              // 再根据 promise 对象返回的结果 决定调用 resolve还是 reject
              resolvePromise(promise2, x, resolve, reject); // 用来解析 x 值的
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              // 判断 x 的值是普通值还是 promise 对象
              // 如果是普通值 直接调用 resolve
              // 如果是 promise 对象 查看promise 对象返回的结果
              // 再根据 promise 对象返回的结果 决定调用 resolve还是 reject
              resolvePromise(promise2, x, resolve, reject); // 用来解析 x 值的
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  if (x instanceof MyPromise) {
    // x.then(() => resolve(value), reason => reject(reason))
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

// node 环境下用 common.js 导出
module.exports = MyPromise;
