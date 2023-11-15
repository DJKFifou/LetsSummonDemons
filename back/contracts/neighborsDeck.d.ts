import { NeighborCardData } from './card.js';

export interface NeighborsDeckData {
  remainingCardsCount: number;
  market: Array<NeighborCardData>;
}
