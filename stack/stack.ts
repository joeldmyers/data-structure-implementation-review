// stack is LIFO - last in is first out. like a stack of plates.

// could use a linked list to make a stack.

// can just use push and pop with an array to make a stack. pretty easy.

class StackNode {
  val: any;
  next: StackNode | null;

  constructor(val: any) {
    this.val = val;
    this.next = null;
  }
}
class Stack {
  first: StackNode | null;
  last: StackNode | null;
  size: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // push and pop are using shift and unshift bc better time complexity.
  // otherwise single

  push(val: any) {
    const newNode = new StackNode(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      const temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }
    this.size++;
    return this.size;
  }

  pop() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.val;
  }
}
