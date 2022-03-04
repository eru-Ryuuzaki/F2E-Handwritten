// 使用条件

// 要求数据可以分割独立的位来比较；
// 位之间由递进关系，如果 a 数据的高位比 b 数据大，那么剩下的地位就不用比较了；
// 每一位的数据范围不能太大，要可以用线性排序，否则基数排序的时间复杂度无法做到 O(n)。
let arr = new Array(20).fill(0).map(() => Math.floor(Math.random() * 10000));

/**
 * name: 基数排序
 * @param  array 待排序数组
 * @param  max 最大位数
 */
const radixSort = (arr, max) => {
  const buckets = new Array(10).fill(0).map(() => []);
  let unit = 10,
    base = 1;
  for (let i = 0; i < max; i++, unit *= 10, base *= 10) {
    for (let j = 0; j < arr.length; j++) {
      let num = ~~((arr[j] % unit) / base);
      buckets[num].push(arr[j]);
    }
    let pos = 0;
    for (let j = 0; j < buckets.length; j++) {
      while (buckets[j].length) {
        arr[pos] = buckets[j].shift();
        pos++;
      }
    }
  }
  return arr;
};

radixSort(arr, 5);
console.log(arr);
