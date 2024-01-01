export type Node = {
  id: string;
  x: number;
  y: number;
  neighbors: Edge[];
};

export type Edge = {
  target: Node;
  cost: number;
};
