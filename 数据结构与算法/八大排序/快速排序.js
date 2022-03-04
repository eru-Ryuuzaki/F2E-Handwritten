let arr = new Array(20).fill(0).map(() => Math.floor(Math.random() * 100));

// 这种写法还不够熟练，多看看多理解一下
function qsort1(arr, left, right) {
  if (left >= right) return;
  let base = arr[left];
  let i = left,
    j = right;
  while (i < j) {
    while (i < j && arr[j] >= base) j--;
    while (i < j && arr[i] <= base) i++;
    // while (i < j && arr[j] >= base) j--;
    // if (i >= j) break;
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  // 把基点放到相遇的地方，就能把两边分开了！
  arr[left] = arr[i];
  arr[i] = base;
  //   console.log(left, right, i, arr);
  qsort1(arr, left, i - 1);
  qsort1(arr, i + 1, right);
}

// 主要是交换的步骤和 1 不同
function qsort2(arr, left, right) {
  if (left >= right) return;
  let base = arr[left];
  let i = left,
    j = right;
  while (i < j) {
    while (i < j && arr[j] >= base) j--;
    if (i < j) {
      arr[i] = arr[j];
      i++;
    }
    while (i < j && arr[i] <= base) i++;
    if (i < j) {
      arr[j] = arr[i];
      j--;
    }
  }
  arr[i] = base;
  //   console.log(left, right, i, arr);
  qsort2(arr, left, i - 1);
  qsort2(arr, i + 1, right);
}
// qsort1(arr, 0, arr.length - 1);
qsort2(arr, 0, arr.length - 1);
console.log(arr);
