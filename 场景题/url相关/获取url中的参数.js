function getUrlParam1(sUrl, sKey) {
  let idx1 = sUrl.indexOf("?");
  let idx2 = sUrl.includes("#") ? sUrl.indexOf("#") : sUrl.length;
  if (idx1 === -1) {
    if (sKey) return "";
    else return {};
  }
  let paramsUrl = sUrl
    .split("")
    .slice(idx1 + 1, idx2)
    .join("")
    .split("&");
  if (sKey) {
    let ans = [];
    paramsUrl.forEach((item) => {
      let arr = item.split("=");
      if (arr[0] === sKey) {
        ans.push(arr[1]);
      }
    });
    if (ans.length <= 1) return ans.toString();
    return ans;
  } else {
    let ans = {};
    paramsUrl.forEach((item) => {
      let arr = item.split("=");
      if (!ans[arr[0]]) {
        ans[arr[0]] = [arr[1]];
      } else {
        ans[arr[0]].push(arr[1]);
      }
    });
    for (let v in ans) {
      if (!Array.isArray(ans[v])) {
        ans[v] = ans[v].toString();
      }
    }
    return ans;
  }
}

function getUrlParam2(sUrl, sKey) {
  var left = sUrl.indexOf("?") + 1;
  var right = sUrl.lastIndexOf("#");
  var parasString = sUrl.slice(left, right);
  var paras = parasString.split("&");
  var parasjson = {};
  paras.forEach(function (value, index, arr) {
    var a = value.split("=");
    parasjson[a[0]] !== undefined
      ? (parasjson[a[0]] = [].concat(parasjson[a[0]], a[1]))
      : (parasjson[a[0]] = a[1]);
  });

  let result =
    arguments[1] !== void 0 ? parasjson[arguments[1]] || "" : parasjson;
  return result;
}

function getUrlParam3(sUrl, sKey) {
  var result,
    Oparam = {};
  // $0 表示的是整一块匹配的子串, $1、$2...... 这些才是分组的子串
  sUrl.replace(/[\?&]?(\w+)=(\w+)/g, function ($0, $1, $2) {
    console.log("$0:" + $0 + "     $1:" + $1 + "     $2:" + $2);
    Oparam[$1] === void 0
      ? (Oparam[$1] = $2)
      : (Oparam[$1] = [].concat(Oparam[$1], $2));
  });
  sKey === void 0 || sKey === ""
    ? (result = Oparam)
    : (result = Oparam[sKey] || "");
  return result;
}
