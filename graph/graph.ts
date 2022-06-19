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

  depthFirstTraversalRecursive(vertex: string | null) {
    const result: string[] = [];
    const visited: Record<string, boolean> = {};

    const traverse = (vertex: string | null) => {
      if (!vertex) return;
      visited[vertex] = true;
      result.push(vertex);

      for (const currentVertex of this.adjacencyList[vertex]) {
        if (!visited[currentVertex]) {
          traverse(currentVertex);
        }
      }
    };

    traverse(vertex);

    return result;
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

g.depthFirstTraversalRecursive("A");
