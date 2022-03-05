let arr = new Array(20).fill(0).map(() => Math.floor(Math.random() * 10000));

function heapSort(arr) {
  // 从下面的非叶子结点开始执行 adjustHeap，大的数逐渐浮上来，小的数逐渐沉下去
  for (let i = ~~(arr.length / 2) - 1; i >= 0; i--) {
    adjustHeap(arr, arr.length, i);
  }
  // 取出堆顶元素和当前堆的最后一个元素交换，相当于变成了一个比之前小 1 的完全二叉树，这样再执行一次 adjustHeap 就又变回堆了
  for (let i = arr.length - 1; i > 0; i--) {
    let tmp = arr[0];
    arr[0] = arr[i];
    arr[i] = tmp;
    adjustHeap(arr, i, 0);
  }
}

// 让 root 找到合适的位置, n 还是要传的，因为后期 堆变小，arr 后面一部分用来存已经有序的数了
function adjustHeap(arr, n, root) {
  let leftChild = root * 2 + 1,
    rightNode = root * 2 + 2,
    nextRoot = root;
  if (leftChild < n && arr[leftChild] > arr[nextRoot]) nextRoot = leftChild;
  if (rightNode < n && arr[rightNode] > arr[nextRoot]) nextRoot = rightNode;
  if (nextRoot != root) {
    let tmp = arr[root];
    arr[root] = arr[nextRoot];
    arr[nextRoot] = tmp;
    adjustHeap(arr, n, nextRoot);
  }
}

heapSort(arr);

console.log(arr);
