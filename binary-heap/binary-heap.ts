// a heap is a tree represented in an array.

// in max binary heap, every parent node is always larger than children.

// heap is always as compact as possible. as full as can be. left children are always filled out first.

class MaxBinaryHeap {
  values: number[];

  constructor() {
    this.values = [];
  }

  // to insert: add to the end and bubble up.

  insert(value: number) {
    // add to end.
    this.values.push(value);

    let currentNodeIndex = this.values.length - 1;

    let done = false;

    while (!done) {
      if (this.values.length === 1) {
        done = true;
      } else {
        const currentParentNodeIndex = Math.floor((currentNodeIndex - 1) / 2);
        if (
          this.values[currentNodeIndex] > this.values[currentParentNodeIndex]
        ) {
          // swap
          const temp = this.values[currentNodeIndex];
          this.values[currentNodeIndex] = this.values[currentParentNodeIndex];
          this.values[currentParentNodeIndex] = temp;
          currentNodeIndex = currentParentNodeIndex;
        } else {
          done = true;
        }
      }
    }

    // take node and compare to parent. if > parent, swap.
  }
}
