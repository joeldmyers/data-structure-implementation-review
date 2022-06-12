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

  pop() {
    if (this.length === 0) return;

    const nodeToPop = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      if (this.tail) {
        this.tail = this.tail.previous;
        if (this.tail) {
          this.tail.next = null;
        }
      }

      if (nodeToPop) {
        nodeToPop.previous = null;
      }
    }
    this.length--;
    return nodeToPop;
  }

  shift() {
    if (!this.length) return;

    if (this.length === 1) {
      const nodeToShift = this.head;
      this.head = null;
      this.tail = null;

      return nodeToShift;
    } else {
      const nodeToShift = this.head;
      if (this.head) {
        this.head = this.head.next;
        if (this.head) {
          this.head.previous = null;
        }
      }
      length--;
      if (nodeToShift) {
        nodeToShift.next = null;
      }
      return nodeToShift;
    }
  }

  unShift(val: any) {
    const newNode = new DoublyLinkedListNode(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.head) {
        newNode.next = this.head;
        this.head.previous = newNode;
        this.head = newNode;
      }
    }
    this.length++;
    return this;
  }

  get(index: number) {
    if (index < 0 || index >= this.length) return;

    if (this.length - index < index) {
      // start from end;

      let counter = this.length;
      let current = this.tail;

      while (counter !== index) {
        if (current) {
          current = current?.previous;
          counter--;
        }
      }
      return current?.val;
    } else {
      // start from beginning
      let counter = this.length;
      let current = this.head;

      while (counter !== index) {
        if (current) {
          current = current?.previous;
          counter++;
        }
      }
      return current?.val;
    }
  }

  set(indexOfItemToUpdate: number, valueToUpdate: any) {
    const foundNode = this.get(indexOfItemToUpdate);
    if (foundNode) {
      foundNode.val = valueToUpdate;
      return true;
    }
    return false;
  }

  insert(indexOfItemToUpdate: number, value: any) {
    if (indexOfItemToUpdate < 0 || indexOfItemToUpdate > this.length)
      return false;
    if (indexOfItemToUpdate === 0) {
      return this.unShift(value);
    }
    if (indexOfItemToUpdate === this.length) {
      return this.push(value);
    }
    const newNode = new DoublyLinkedListNode(value);
    const beforeNode = this.get(indexOfItemToUpdate - 1);
    const afterNode = beforeNode.next;
    beforeNode.next = newNode;
    newNode.previous = beforeNode;
    newNode.next = afterNode;
    afterNode.previous = newNode;
    this.length++;
    return true;
  }

  remove(indexOfItemToRemove: number) {
    if (indexOfItemToRemove < 0 || indexOfItemToRemove >= this.length) return;
    if (indexOfItemToRemove === 0) return this.shift();
    if (indexOfItemToRemove === this.length - 1) return this.pop();

    const itemToRemove = this.get(indexOfItemToRemove);
    const prevNode = itemToRemove.previous;
    const nextNode = itemToRemove.next;
    prevNode.next = nextNode;
    nextNode.previous = prevNode;
    this.length--;

    itemToRemove.previous = null;
    itemToRemove.next = null;
    return itemToRemove;
  }
}
