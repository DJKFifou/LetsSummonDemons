import { CandleCardData, DemonCardData, NeighborCardData } from './card.js';

export type PlayerId = string;

export interface PlayerData {
  id: PlayerId;
  name: string;
  soulsTokenCount: number;
  candleCard?: CandleCardData;
  coveredDemonsCardsCount: number;
  invokatedDemonsCards: Array<DemonCardData>;
  neighborsCards: Array<NeighborCardData>;
}

export interface PlayerInputData {
  name: string;
}
