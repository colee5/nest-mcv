// Graph Problems

function buildAdjacencyList() {
  let adjList = new Map();
  let edges = [
    ['A', 'B'],
    ['B', 'C'],
    ['B', 'E'],
    ['C', 'E'],
    ['E', 'D'],
  ];

  for (let edge of edges) {
    let src = edge[0];
    let dst = edge[1];

    if (!adjList.has(src)) {
      adjList.set(src, []);
    }

    if (!adjList.has(dst)) {
      adjList.set(dst, []);
    }

    adjList.get(src).push(dst);
  }

  return adjList;
}

class AdjacencyListGraph {
  private adjList: Map<number, number[]>;

  constructor() {
    this.adjList = new Map<number, number[]>();
  }

  addEdge(src: number, dst: number): void {
    if (!this.adjList.has(src)) {
      this.adjList.set(src, []);
    }

    if (!this.adjList.has(dst)) {
      this.adjList.set(dst, []);
    }

    if (!this.adjList.get(src)!.includes(dst)) {
      this.adjList.get(src)!.push(dst);
    }
  }

  removeEdge(src: number, dst: number): boolean {
    if (!this.adjList.has(src)) {
      return false;
    }

    const neighbors = this.adjList.get(src)!;
    const index = neighbors.indexOf(dst);

    if (index === -1) {
      return false;
    }

    neighbors.splice(index, 1);
    return true;
  }

  hasPath(src: number, dst: number): boolean {
    let visit = new Set<number>();
    return this.dfs(src, dst, visit);
  }

  dfs(src: number, dst: number, visit: Set<number>): boolean {
    if (src === dst) {
      return true;
    }

    visit.add(src);

    for (let neighbor of this.adjList.get(src)!) {
      if (!visit.has(neighbor)) {
        if (this.dfs(neighbor, dst, visit)) {
          return true;
        }
      }
    }

    return false;
  }
}
