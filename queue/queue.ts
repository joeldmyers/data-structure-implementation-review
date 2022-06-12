// queue is FIFO.
// can sort of do with an array but removing is bad computation wise (O of n) bc shift.

class QueueNode {
  value: any;
  next: QueueNode | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  first: QueueNode | null;
  last: QueueNode | null;
  size: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // adds to end
  enqueue(val: any) {
    const newNode = new QueueNode(val);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      if (this.last) {
        this.last.next = newNode;
        this.last = newNode;
      }
    }

    this.size++;
    return this.size;
  }

  // removes from beginning
  dequeue() {
    if (!this.first) return;

    const temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}
