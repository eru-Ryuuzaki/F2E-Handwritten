let url = "http://www.nowcoder.com?key=1&key=2&key=3&test=4tr#hehe";
let tar = "eru";
function solve(url, key, target) {
  let reg = new RegExp(`[\\?&]?(${key})=([^&#]+)`, "g");
  return url.replace(reg, function ($0, $1, $2) {
    return $0.replace($2, target);
  });
}
console.log(solve(url, "test", tar));
// > http://www.nowcoder.com?key=1&key=2&key=3&test=eru#hehe
