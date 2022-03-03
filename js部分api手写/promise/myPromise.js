const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  // promise 状态
  status = PENDING;

  // 成功之后的值
  value = undefined;
  // 失败之后的原因
  reason = undefined;
  // 使用箭头函数是为了 this 指向 MyPromise 这个类
  // 如果状态不是 pending 就不能改变状态
  resolve = (value) => {
    if (this.status !== PENDING) return;
    // 将状态改为成功
    this.status = FULFILLED;
    this.value = value;
  };
  reject = (reason) => {
    if (this.status !== PENDING) return;
    // 将状态改为失败
    this.status = REJECTED;
    this.reason = reason;
  };
  then(successCallback, failCallback) {
    if (this.status === FULFILLED) {
      successCallback(this.value);
    } else if (this.status === REJECTED) {
      failCallback(this.reason);
    }
  }
}

// node 环境下用 common.js 导出
module.exports = MyPromise;
