/**
 * NOTES! Because there are a lot of things to do here. There are two main parts: setup and iterating over all nodes.
 *
 * SETUP:
 * 1. This method takes a starting vertex and an ending vertex
 * 2. In the method, create an object, called distances. Set each key to be each vertex in
 * the adjacency list, with a value of Infinity, EXCEPT the starting vertex, which should have a value of 0.
 * 3. Add each vertex with a priority of infinity to the priority queue, EXCEPT the starting vertex,
 * which should have a priority of 0.
 * 4. Create another object called previous and set each key to be every vertex in the adjacency list, with a value of null.
 *
 * ITERATING:
 *
 * 1. Start looping (while loop) as long as there are nodes in the priority queue.
 * 2. Within that, dequeue a vertex from the priority queue.
 * 3. If that vertex is the same as the end vertex we're going for, we're done
 * - We will need to go backwards starting from the current vertex we're looking at, through the
 * previous object we set up above, and create the "path". We'll need to add the first node to it and then
 * reverse it and we can return this value.
 * 4. Otherwise, loop through each value in the adjacency list at that vertex.
 * 5. Calculate the distance to that vertex from the starting vertex.
 * 6. If the distance is less than what is currently stored in our distances object:
 * - update distances object with new lower distance
 * - update the previous object to contain that vertex
 * - enqueue the vertex with the total distance from the start node.
 */

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
    // whatever
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

      if (smallest || distances[smallest] !== Infinity)) {
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
  // this is inefficient(n log n) and we should use the binary heap version instead.
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
