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

  set(indexOfItemToUpdate: number, valueToUpdate: any) {
    const foundNode = this.get(indexOfItemToUpdate);
    if (foundNode) {
      foundNode.val = valueToUpdate;
      return true;
    }
    return false;
  }

  insert(positionIndex: number, value: any) {
    if (positionIndex < 0 || positionIndex >= this.length) return false;

    if (positionIndex === this.length - 1) {
      this.push(value);
    }

    if (positionIndex === 0) {
      this.unshift(value);
    }

    const newNode = new LinkedListNode(value);

    const itemToInsertAfter = this.get(positionIndex - 1);
    if (itemToInsertAfter) {
      const oldItemNext = itemToInsertAfter?.next;
      itemToInsertAfter.next = newNode;
      newNode.next = oldItemNext;
      this.length++;
    }
  }

  remove(indexOfItemToRemove: number) {
    if (indexOfItemToRemove < 0 || indexOfItemToRemove >= this.length) {
      return false;
    }

    if (indexOfItemToRemove === this.length - 1) {
      this.pop();
      return true;
    }

    if (indexOfItemToRemove === 0) {
      this.shift();
      return true;
    }

    const itemBeforeItemToRemove = this.get(indexOfItemToRemove - 1);
    const itemToRemove = itemBeforeItemToRemove?.next;

    if (itemBeforeItemToRemove) {
      itemBeforeItemToRemove.next = itemBeforeItemToRemove.next?.next || null;
    }
    if (itemToRemove) {
      itemToRemove.next = null;
      return itemToRemove;
    }
  }

  reverseInPlace() {
    let currentNode = this.head;
    this.head = this.tail;
    this.tail = currentNode;
    let previous = null;
    let nextNode;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = previous;
      previous = currentNode;
      currentNode = nextNode;
    }
  }
}
