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

// 执行器里面的内容会立即执行
let promise = new MyPromise((resolve, reject) => {
  // 这版本的 promise 如果是异步结果的话，是不能连续链式调用 then 的

  // setTimeout(() => {
  //   resolve("成功");
  // }, 2000);
  // throw new Error("executor error");
  // resolve("成功");
  reject("失败");
  // 原来并没有直接停止函数
  // console.log("状态改变之后还是执行了");
  // setTimeout(() => {
  //   reject("失败");
  // }, 2000);
});
promise
  .then()
  .then()
  .then(
    (res) => {
      console.log(res);
    },
    (reason) => {
      console.log(`失败了~ ${reason}`);
    }
  );
// promise
//   .then(
//     (value) => {
//       console.log(value);
//       return "aaa";
//       // throw new Error("then error");
//     },
//     (reason) => {
//       console.log(reason.message);
//       return 10000;
//     }
//   )
//   .then(
//     (value) => {
//       console.log(value);
//     },
//     (reason) => {
//       console.log(reason.message);
//     }
//   );

// promise.then(
//   (value) => {
//     console.log(value);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );

function other() {
  return new MyPromise((resolve, reject) => {
    resolve("other");
  });
}

// promise
//   .then(
//     (value) => {
//       console.log(value);
//       return other();
//     },
//     (reason) => {
//       console.log(reason);
//     }
//   )
//   .then((value) => {
//     console.log(value);
//   });

// console.log("同步代码");
// let p1 = promise.then((value) => {
//   console.log(value);
//   return p1;
// });

// p1.then(
//   (value) => {
//     console.log(value);
//   },
//   (reason) => {
//     console.log(reason.message);
//   }
// );
