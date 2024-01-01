import { Node, Edge } from './types';
import aStar from './aStar';

const createNode = (id: string, x: number, y: number): Node => {
  return {
    id,
    x,
    y,
    neighbors: [],
  };
};

const createEdge = (target: Node, cost: number): Edge => {
  return {
    target,
    cost,
  };
};

const createGraph = (): Node[] => {
  const nodeA = createNode('A', 0, 0);
  const nodeB = createNode('B', 1, 0);
  const nodeC = createNode('C', 2, 0);
  const nodeD = createNode('D', 3, 0);

  nodeA.neighbors.push(createEdge(nodeB, 2));
  nodeB.neighbors.push(createEdge(nodeA, 4));
  nodeB.neighbors.push(createEdge(nodeC, 5));
  nodeA.neighbors.push(createEdge(nodeC, 1));
  nodeC.neighbors.push(createEdge(nodeD, 3));
  nodeD.neighbors.push(createEdge(nodeC, 2));

  return [nodeA, nodeB, nodeC, nodeD];
};

const createGraph2 = (): Node[] => {
  const nodeA = createNode('A', 0, 0);
  const nodeB = createNode('B', 1, 0);
  const nodeC = createNode('C', 2, 0);

  nodeA.neighbors.push(createEdge(nodeB, 2));
  nodeB.neighbors.push(createEdge(nodeC, 3));
  nodeA.neighbors.push(createEdge(nodeC, 10));

  return [nodeA, nodeB, nodeC];
};

describe('A* algorithm', () => {
  it('should return the shortest path A to B node', async () => {
    const graph = createGraph();
    const start = graph[0];
    const goal = graph[1];
    const path = await aStar(start, goal);
    expect(path).toEqual([start, goal]);
  });

  it('should return the shortest path A to D node', async () => {
    const graph = createGraph();
    const start = graph[0];
    const goal = graph[3];
    const path = await aStar(start, goal);
    expect(path).toEqual([start, graph[2], goal]);
  });

  it('should return the shortest path B to C node', async () => {
    const graph = createGraph();
    const start = graph[1];
    const goal = graph[2];
    const path = await aStar(start, goal);
    expect(path).toEqual([start, goal]);
  });

  it('should return the shortest path A to C node', async () => {
    const graph = createGraph2();
    const start = graph[0];
    const goal = graph[2];
    const path = await aStar(start, goal);
    expect(path).toEqual([start, graph[1], goal]);
  });

  it('should return an empty path if no path exist A to not connected node', async () => {
    const graph = createGraph();
    const start = graph[0];
    const goal = createNode('E', 4, 0);
    const path = await aStar(start, goal);
    expect(path).toEqual([]);
  });
});
