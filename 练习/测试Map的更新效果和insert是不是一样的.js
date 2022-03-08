// test1 set 更新后是否会排到最后
// let mp = new Map();
// mp.set(1, 11);
// mp.set(2, 22);
// console.log(mp);
// // 删除后再插入
// // mp.delete(1);
// // mp.set(1, 33);
// // console.log(mp);
// // 直接更新
// mp.set(1, 33);
// console.log(mp);

// 总结: 效果是不一样的

// test2 for in break 可以提前结束循环吗
// let arr = [1, 2, 3, 4, 5];
// for (let v in arr) {
//   console.log(v);
//   break;
// }
// 总结： 可以

// test3 对 map 进行遍历 for in 和 forEach 的顺序一样吗
// let mp = new Map([
//   [1, 111],
//   [6, 666],
//   [3, 333],
// ]);
// console.log(mp);
// // mp.forEach((value, key) => {
// //   console.log(key, value);
// // });
// for (let key in mp) {
//   console.log(key, mp.get(key));
// }
// 貌似直接用 for in 是遍历不了的、、
