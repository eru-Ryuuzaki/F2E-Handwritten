let arr = new Array(20).fill(0).map(() => Math.floor(Math.random() * 100));

for (let i = 1; i < arr.length; i++) {
  let tmp = arr[i];
  let j = i - 1;
  while (j >= 0 && arr[j] > tmp) {
    arr[j + 1] = arr[j];
    j--;
  }
  arr[j + 1] = tmp;
}

console.log(arr);
