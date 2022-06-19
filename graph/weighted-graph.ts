const util = require("util");

type GraphNode = { node: string; weight: number };
type SimpleQueueNode = { val: string; priority: number };

class WeightedGraph {
  adjacencyList: Record<string, GraphNode[]>;

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: string) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1: string, vertex2: string, weight: number) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  Dijkstra(startingVertex: string, endingVertex: string) {
    const nodes = new SimplePriorityQueue();
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const resultPath = [];
    let smallest;

    // build up initial state - iterate over adjacency list
    // set up data
    for (let vertex in this.adjacencyList) {
      if (vertex === startingVertex) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }

      previous[vertex] = null;
    }

    // as long as there's something to visit, iterate over nodes
    while (nodes.values.length) {
      smallest = nodes.dequeue()?.val;
      if (smallest === endingVertex) {
        // WE ARE DONE and we need to build the path to return.

        while (smallest && previous[smallest]) {
          resultPath.push(smallest);
          smallest = previous[smallest];
        }
        // break out of outer while loop since we are done.
        break;
      }

      if (smallest || (smallest && distances[smallest] !== Infinity)) {
        for (let neighbor in this.adjacencyList[smallest]) {
          // calculate distance to neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];

          let candidate = distances[smallest] + nextNode.weight;

          if (candidate < distances[nextNode.node]) {
            // updating new smallest distance to neighbor.
            distances[nextNode.node] = candidate;
            // update previous - how we got to neighbor.
            previous[nextNode.node] = smallest;

            nodes.enqueue(nextNode.node, candidate);
          }
        }
      }
    }

    console.log(distances);
    // should return array containing nodes in order.
    return resultPath.concat(smallest || "").reverse();
  }
}

class SimplePriorityQueue {
  values: SimpleQueueNode[];

  constructor() {
    this.values = [];
  }

  enqueue(val: string, priority: number) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    // ascending order, so lowest priority first.
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

const weightedGraph = new WeightedGraph();

weightedGraph.addVertex("A");
weightedGraph.addVertex("B");
weightedGraph.addVertex("C");
weightedGraph.addVertex("D");
weightedGraph.addVertex("E");
weightedGraph.addVertex("F");

weightedGraph.addEdge("A", "B", 4);
weightedGraph.addEdge("A", "C", 2);
weightedGraph.addEdge("B", "E", 3);
weightedGraph.addEdge("C", "D", 2);
weightedGraph.addEdge("C", "F", 4);
weightedGraph.addEdge("D", "E", 3);
weightedGraph.addEdge("D", "F", 1);
weightedGraph.addEdge("E", "F", 1);

console.log(
  util.inspect(weightedGraph, { showHidden: false, depth: null, colors: true })
);

const shortestPath = weightedGraph.Dijkstra("A", "E");

console.log("shortest path", shortestPath);
