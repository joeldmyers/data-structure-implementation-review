class LinkedListNode {
  val: number | string;
  next: LinkedListNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  head: LinkedListNode | null;
  tail: LinkedListNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: number) {
    const newNode = new LinkedListNode(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }

    this.length++;
  }

  pop() {
    if (!this.head) return;

    const nodeToReturn = this.tail;

    let currentNode = this.head;
    let newTail = currentNode;

    while (currentNode?.next) {
      newTail = currentNode.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return nodeToReturn;
  }

  shift() {
    if (!this.head) return;

    const oldHead = this.head;
    this.head = this.head.next;
    this.length--;

    return oldHead;
  }
}
