// let a = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123)
//     }, 2000)
// })

function fn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 2000);
  });
}

async function test() {
  let res = await fn();
  console.log(res);
}
test();
// 接受的是 resolve 的值
