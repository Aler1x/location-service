import { Node } from './types';

async function aStar(start: Node, goal: Node): Promise<Node[]> {
  const closedSet: Set<Node> = new Set();
  const openSet: Set<Node> = new Set([start]);
  const cameFrom: Map<Node, Node> = new Map();

  const gScore: Map<Node, number> = new Map();
  gScore.set(start, 0);

  const fScore: Map<Node, number> = new Map();
  fScore.set(start, heuristicCostEstimate(start, goal));

  while (openSet.size > 0) {
    const current: Node = getLowestFScore(openSet, fScore);
    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);
    closedSet.add(current);

    await Promise.all(
      current.neighbors.map(async (neighbor) => {
        if (closedSet.has(neighbor.target)) {
          return;
        }

        const tentativeGScore: number = gScore.get(current) + neighbor.cost;

        if (!openSet.has(neighbor.target)) {
          openSet.add(neighbor.target);
        } else if (tentativeGScore >= gScore.get(neighbor.target)) {
          return;
        }

        cameFrom.set(neighbor.target, current);
        gScore.set(neighbor.target, tentativeGScore);
        fScore.set(
          neighbor.target,
          gScore.get(neighbor.target) +
            (await heuristicCostEstimate(neighbor.target, goal)),
        );
      }),
    );
  }

  return [];
}

function reconstructPath(cameFrom: Map<Node, Node>, current: Node): Node[] {
  const path: Node[] = [current];

  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    path.push(current);
  }

  return path.reverse();
}

function heuristicCostEstimate(start: Node, goal: Node): number {
  return Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y);
}

function getLowestFScore(openSet: Set<Node>, fScore: Map<Node, number>): Node {
  let lowest: Node = null;
  let lowestScore: number = Number.MAX_SAFE_INTEGER;

  for (const node of openSet) {
    const score: number = fScore.get(node);
    if (score < lowestScore) {
      lowest = node;
      lowestScore = score;
    }
  }

  return lowest;
}

export default aStar;
