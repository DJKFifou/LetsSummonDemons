import { NeighborCardData } from '../contracts/card.js';
import { neighbors as neighborsCards } from '../domains/neighbor/neighbors.js';

export const neighbors: Array<NeighborCardData> = neighborsCards.map(
  (neighbor) => neighbor.getData(),
);
