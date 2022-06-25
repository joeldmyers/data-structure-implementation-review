/**
 *
 * https://leetcode.com/explore/featured/card/graph/618/disjoint-set/3881/
 *
 * This can help see if two nodes are connected in a network, for ex.
 *
 * implementing using array, with INDEX representing the value of the VERTEX,
 *
 * and the VALUE of the array at that index representing the parent node.
 *
 * We then need to have methods to connect them.
 *
 * We need to choose a parent node for each union
 *
 * For any given node, if parent node is itself, it is a "root node"
 *
 * If two nodes have the same root node, they're connected.
 *
 * Steps:
 *
 * 1. We initialize the array with the value that corresponds to vertex - each vertex is its own parent.
 * 2. We do union operation to connect nodes together.
 * 3. To find if two nodes are connected, we need to see if they have the same root node.
 *
 * There are two ways to do this - quick find and quick union.
 *
 * For quick find, we store the root node instead of the parent node to speed up finding.
 */

class DisjointSet {
  root: number[];

  // size is number of vertices
  constructor(size: number) {
    this.root = [];

    for (let i = 0; i < size; i++) {
      this.root[i] = i;
    }
  }

  /**
   * finds the root node of a given vertex
   */
  find(x: number) {
    return this.root[x];
  }
  /**
   * unions (connects) two vertices and makes their root nodes the same
   */
  union(x: number, y: number) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      for (let i = 0; i < this.root.length; i++) {
        if (this.root[i] === rootY) {
          this.root[i] = rootX;
        }
      }
    }
  }

  isConnected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }
}
