class DoublyLinkedListNode {
  val: any;
  next: DoublyLinkedListNode | null;
  previous: DoublyLinkedListNode | null;

  constructor(val: any) {
    this.val = val;
    this.next = null;
    this.previous = null;
  }
}

class DoublyLinkedList {
  head: DoublyLinkedListNode | null;
  tail: DoublyLinkedListNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: any) {
    const newNode = new DoublyLinkedListNode(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;
      }
    }
    this.length++;

    return this;
  }
}
