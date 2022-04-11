Promise.prototype._all = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new Error("promises 需要是一个数组");
    }
    let result = [];
    let count = 0;
    promises.forEach((p, idx) => {
      p.then(
        (res) => {
          result[idx] = res;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};
