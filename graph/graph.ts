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
}
