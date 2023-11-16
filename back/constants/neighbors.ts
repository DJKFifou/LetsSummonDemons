import { NeighborCardData } from '../contracts/card.js';
import { neighbors as demonsCards } from '../domains/neighbor/neighbors.js';

export const neighbors: Array<NeighborCardData> = demonsCards.map((neighbor) =>
  neighbor.getData(),
);
