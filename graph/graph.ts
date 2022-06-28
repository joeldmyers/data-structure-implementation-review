class Graph {
  adjacencyList: Record<string, any[]>;

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: string) {
    this.adjacencyList[vertex] = this.adjacencyList[vertex] || [];
  }

  addEdge(vertex1: string, vertex2: string) {
    this.adjacencyList[vertex1].push(vertex2);

    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1: string, vertex2: string) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (vertex) => vertex !== vertex2
    );

    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (vertex) => vertex !== vertex1
    );
  }

  removeVertex(vertex: string) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }

    delete this.adjacencyList[vertex];
  }

  dfsRecursive(vertex: string | null) {
    const result: string[] = [];
    const visited: Record<string, boolean> = {};

    const traverse = (vertex: string | null) => {
      if (!vertex) return;
      visited[vertex] = true;
      result.push(vertex);

      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) {
          traverse(neighbor);
        }
      }
    };

    traverse(vertex);

    return result;
  }

  dfsIterative(vertex: string) {
    const visited: Record<string, boolean> = {};
    const stack = [];
    const result = [];
    stack.push(vertex);

    while (stack.length) {
      const currentVertex = stack.pop();
      if (currentVertex && !visited[currentVertex]) {
        result.push(currentVertex);
        visited[currentVertex] = true;

        for (const neighbor of this.adjacencyList[currentVertex]) {
          stack.push(neighbor);
        }
      }
    }

    return result;
  }

  bfsIterative(vertex: string) {
    const result = [];
    let currentVertex = vertex;
    const queue: string[] = [];
    queue.push(currentVertex);

    const visited = new Set();
    visited.add(currentVertex);

    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);

      for (const neighbor of this.adjacencyList[currentVertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
}

const g = new Graph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("E", "F");

g.dfsIterative("A");
