// every node to left is less than parent; every node to right is greater than parent.

class BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root: BSTNode | null;

  constructor() {
    this.root = null;
  }

  insert(valueToInsert: number) {
    const newNode = new BSTNode(valueToInsert);
    if (!this.root) {
      this.root = newNode;
      return this;
    } else {
      let currentNode = this.root;
      while (true) {
        // don't handle identical values in this implementation
        if (valueToInsert === currentNode.value) return;

        if (valueToInsert < currentNode.value) {
          if (currentNode.left === null) {
            currentNode.left = newNode;
            return this;
          } else {
            currentNode = currentNode.left;
          }
        } else {
          if (currentNode.right === null) {
            currentNode.right = newNode;
            return this;
          } else {
            currentNode = currentNode.right;
          }
        }
      }
    }
  }

  find(valueToFind: number) {
    let currentNode = this.root;
    if (currentNode === null) return false;

    let hasFoundValue = false;

    while (currentNode && !hasFoundValue) {
      if (currentNode && currentNode.value < valueToFind) {
        currentNode = currentNode.left;
      } else if (currentNode && currentNode.value > valueToFind) {
        currentNode = currentNode.right;
      } else {
        hasFoundValue = true;
      }
    }
    if (!hasFoundValue) return;

    return currentNode;
  }
}
