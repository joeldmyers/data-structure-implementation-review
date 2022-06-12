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

  BFS() {
    let dataFound = [];
    let queue = [];
    let currentNode = this.root;

    queue.push(currentNode);

    while (queue.length) {
      currentNode = queue.shift() || null;
      dataFound.push(currentNode?.value);

      if (currentNode?.left) {
        queue.push(currentNode.left);
      }

      if (currentNode?.right) {
        queue.push(currentNode.left);
      }
    }

    return dataFound;
  }

  // top down and to the left first, then right.
  DFSPreOrder() {
    let data: BSTNode[] = [];
    let current = this.root;
    if (current === null) return;

    const traverse = (node: BSTNode) => {
      // **** PRE ORDER DATA PUSH ****
      data.push(node);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };

    traverse(current);
    return data;
  }

  // starts at bottom left and goes up - root is last thing visited.
  DFSPostOrder() {
    let data: BSTNode[] = [];
    let current = this.root;
    if (current === null) return;

    const traverse = (node: BSTNode) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      // ***** POST ORDER DATA PUSH ****
      data.push(node);
    };

    traverse(current);
    return data;
  }

  // starts at bottom left and basically goes from left to right.
  DFSInOrder() {
    let data: BSTNode[] = [];
    let current = this.root;
    if (current === null) return;

    const traverse = (node: BSTNode) => {
      if (node.left) traverse(node.left);
      // ***** IN ORDER DATA PUSH ****
      data.push(node);
      if (node.right) traverse(node.right);
    };

    traverse(current);
    return data;
  }
}

/**
 *
 * DFS is better for wide squat trees (a lot wider than deep)
 * BFS is better for tall narrow trees (a lot deeper than wide)
 *
 * InOrder is good for Binary Search Trees. This keeps the order :)
 */
