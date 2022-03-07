const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  const query = querystring.parse(req.url.split("?")[1]);
  const queryStr = JSON.stringify(query);
  res.writeHead(200, {
    "Content-type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*", // * 代表允许所有的源访问
    "Access-Control-Allow-Methods": "GET, POST, PUT", // 允许请求的方法
  });
  let { callback } = query;
  let jsonpStr = `${callback}(${queryStr})`;
  setTimeout(() => {
    res.end(jsonpStr);
  }, 5000);
});

server.listen(9999);
console.log("server run at 9999");
