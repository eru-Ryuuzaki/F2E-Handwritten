let arr = new Array(20).fill(0).map(() => Math.floor(Math.random() * 100));

function mergeSort(arr, left, right) {
  if (left >= right) return;
  let mid = (left + right) >> 1;
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
  let tmpL = arr.slice(left, mid + 1),
    tmpR = arr.slice(mid + 1, right + 1),
    cur = [];
  while (tmpL.length || tmpR.length) {
    if (!tmpL.length) {
      cur.push(tmpR.shift());
    } else if (!tmpR.length) {
      cur.push(tmpL.shift());
    } else if (tmpL[0] < tmpR[0]) {
      cur.push(tmpL.shift());
    } else {
      cur.push(tmpR.shift());
    }
  }
  arr.splice(left, cur.length, ...cur);
}

mergeSort(arr, 0, arr.length - 1);

console.log(arr);
