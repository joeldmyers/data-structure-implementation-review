class LinkedListNode {
  val: any;
  next: LinkedListNode | null;

  constructor(val: any) {
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

  push(val: any) {
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

  unshift(val: any) {
    const newNode = new LinkedListNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
      return this;
    }
  }

  get(indexOfItemToFind: number) {
    if (indexOfItemToFind >= this.length || indexOfItemToFind < 0) return;

    let counter = 1;
    let currentNode = this.head;

    while (currentNode && counter !== indexOfItemToFind) {
      currentNode = currentNode?.next;
      counter++;
    }

    return currentNode;
  }
}
