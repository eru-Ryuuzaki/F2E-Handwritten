let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("执行了");
    resolve(123);
  }, 2000);
});
p.then((res) => {
  console.log(res);
});
p.then((res) => {
  console.log(res);
});
// 总结：并不会发起多次请求，但是then可以执行多次
