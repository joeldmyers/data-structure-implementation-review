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

  extractMax() {
    // take the first value in it.
    // replace with the most recently added (item at the end)
    // sink this down, swapping with larger of two children until it's in the right place.
    const max = this.values[0];

    const lastItem = this.values.pop();
    if (lastItem) {
      this.values[0] = lastItem;
    }

    let done = false;
    let indexOfCurrentItem = 0;

    while (!done) {
      let leftChildIndex = indexOfCurrentItem * 2 + 1;
      let rightChildIndex = indexOfCurrentItem * 2 + 2;

      let leftChild, rightChild;

      leftChild = this.values[leftChildIndex] || Number.NEGATIVE_INFINITY;

      rightChild = this.values[rightChildIndex] || Number.NEGATIVE_INFINITY;

      let largerChild = rightChild > leftChild ? rightChild : leftChild;
      let winningChildIndex =
        rightChild > leftChild ? rightChildIndex : leftChildIndex;

      if (this.values[indexOfCurrentItem] < largerChild) {
        const temp = this.values[indexOfCurrentItem];
        this.values[indexOfCurrentItem] = largerChild;
        this.values[winningChildIndex] = temp;
        indexOfCurrentItem = winningChildIndex;
      } else {
        done = true;
      }
    }

    return max;
  }
}
