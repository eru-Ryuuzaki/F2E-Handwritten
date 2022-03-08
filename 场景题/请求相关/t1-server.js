const http = require("http");

const server = http.createServer((req, res) => {
  if (Math.random() > 0.75) {
    res.writeHead(500, {
      "Content-type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*", // * 代表允许所有的源访问
      "Access-Control-Allow-Methods": "GET, POST, PUT", // 允许请求的方法
    });
    res.end("失败了哈哈哈");
    return;
  }
  res.writeHead(200, {
    "Content-type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*", // * 代表允许所有的源访问
    "Access-Control-Allow-Methods": "GET, POST, PUT", // 允许请求的方法
  });
  //   JSON
  // [
  //     { name: '张三', score: 99, time: '2021-12-22' },
  //     { name: '李四', score: 60, time: '2021-12-12' },
  //     { name: '王五', score: 77, time: '2021-11-08' },
  //     ...
  // ]
  // 到时候可以改概率看看是否存在异步问题
  let data = new Array(10).fill(0).map((item) => {
    let stu = { name: "匿名用户" };
    // let score = Math.random() * 15 + 85;
    // let mon = ~~(Math.random() * 12) + 1;
    // let day = ~~(Math.random() * 28) + 1;
    let score = Math.random() * 3 + 97;
    let mon = ~~(Math.random() * 3) + 10;
    let day = ~~(Math.random() * 3) + 26;
    stu.score = score;
    stu.time = `2021-${mon}-${day}`;
    return stu;
  });
  res.end(JSON.stringify(data));
});

server.listen(9999);
console.log("server run at 9999");
