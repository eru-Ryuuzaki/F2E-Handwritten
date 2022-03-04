let arr = new Array(20).fill(0).map(() => Math.floor(Math.random() * 100));
// step 增量
let step = arr.length;
while (step) {
  // 可以设置成别的，暂时还没研究如果最后没取到 step = 1 的话还能不能保证有序
  step = Math.floor(step / 2);
  // step 表示现在分成了多少组
  for (let i = 0; i < step; i++) {
    // 开始对组内元素进行插入排序
    for (let j = i + step; j < arr.length; j += step) {
      let tmp = arr[j],
        pos;
      for (pos = j - step; pos >= 0; pos -= step) {
        if (arr[pos] > tmp) {
          arr[pos + step] = arr[pos];
        } else {
          break;
        }
      }
      arr[pos + step] = tmp;
    }
  }
}
console.log(arr);
