const { returnStatement } = require("babel-types");

class Graph {
  constructor(numVertices) {
    this.adjMatrix = new Array(numVertices).map(() =>
      new Array(numVertices).fill(false)
    );
    this.numEdges = 0;
  }

  getNumVertices() {
    return this.adjMatrix.length;
  }

  getNumEdges() {
    return this.numEdges;
  }

  getAdjVertices(vertex) {
    return this.adjMatrix[vertex].reduce(
      (preResult, isConnected, adjVertex) => {
        if (isConnected) {
          return [...preResult, adjVertex];
        }
        return preResult;
      },
      []
    );
  }

  addEdge(vertexA, vertexB) {
    this.adjMatrix[vertexA][vertexB] = true;
    this.adjMatrix[vertexB][vertexA] = true;
    this.numEdges++;
  }

  static getVertexDegree(graph, v) {
    return graph.getAdjVertices(v).length;
  }

  static getMaxDegree(graph) {
    let max = 0;
    for (let v = 0; v < graph.getNumVertices(); v++) {
      const degree = Graph.getVertexDegree(graph, v);
      max = Math.max(max, degree);
    }
    return max;
  }
}
