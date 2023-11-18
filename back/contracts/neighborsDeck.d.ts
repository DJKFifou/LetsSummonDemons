import { NeighborCardData } from './card.js';

export interface NeighborsDeckData {
  remainingCardsCount: number;
  market: Array<NeighborCardData>;
  drawned: Array<NeighborCardData>;
  discard: Array<NeighborCardData>;
}
