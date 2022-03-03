/**
 * 1. Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
 * 2. Promise 中有三种状态 成功 fulfilled 失败 rejected 等待 pending
 *  pending -> fulfilled
 *  pending -> rejected
 * 3. resolve he reject 函数是用来更改状态的
 *  resolve：fulfilled
 *  reject： rejected
 * 4. then 方法内部做的事情就是判断状态 并且调用相对应状态的回调函数
 *    then 方法是定义在原型对象中的
 * 5. then 成功回调有一个参数表示成功后的值 失败的时候有个失败的原因
 */

const MyPromise = require("./myPromise");

let promise = new MyPromise((resolve, reject) => {
  resolve("成功");
  // 原来并没有直接停止函数
  console.log("状态改变之后还是执行了");
  //   reject("失败");
});

promise.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
