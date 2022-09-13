// a heap is a tree represented in an array.

// in max binary heap, every parent node is always larger than children.

// heap is always as compact as possible. as full as can be. left children are always filled out first.

// Note: I rewrote this after looking at this solution: https://reginafurness.medium.com/implementing-a-max-heap-in-javascript-b3e2f788390c
// While there are some little cleanup things, one thing I like about her solution is that
// it really breaks up some of these things into helper methods - parent, leftChild, rightChild, swap, etc.
// it makes it more readable / intuitive.

class MaxHeap {
  values: number[];

  constructor() {
    this.values = [];
  }

  parent(index: number) {
    return Math.floor((index - 1) / 2);
  }

  leftChild(index: number) {
    return index * 2 + 1;
  }

  rightChild(index: number) {
    return index * 2 + 2;
  }

  swap(idx1: number, idx2: number) {
    [this.values[idx1], this.values[idx2]] = [
      this.values[idx2],
      this.values[idx1],
    ];
  }

  insert(value: number) {
    this.values.push(value);
    this.bubbleUp(this.values.length - 1);
  }

  bubbleUp(idx: number) {
    let currentIndex = idx;
    let parentIndex = this.parent(currentIndex);

    while (
      currentIndex > 0 &&
      this.values[currentIndex] > this.values[parentIndex]
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.parent(parentIndex);
    }
  }

  extractMax() {
    if (this.values.length < 1) return;

    const max = this.values[0];
    const end = this.values.pop();

    this.values[0] = end || 0;

    this.sinkDown(0);

    return max;
  }

  sinkDown(index: number) {
    const leftChildIndex = this.leftChild(index);
    let rightChildIndex = this.rightChild(index);

    let largerChildIndex =
      this.values[rightChildIndex] > this.values[leftChildIndex]
        ? rightChildIndex
        : leftChildIndex;

    if (this.values[index] < this.values[largerChildIndex]) {
      this.swap(index, largerChildIndex);

      this.sinkDown(largerChildIndex);
    }
  }
}
