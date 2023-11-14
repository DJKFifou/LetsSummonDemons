import { CandleCardData, DemonCardData, NeighborCardData } from './card.js';

export type PlayerId = string;

export interface PlayerData {
  id: PlayerId;
  name: string;
  soulsTokenCount: number;
  candleCard?: CandleCardData;
  coveredDemonsCards: Array<DemonCardData>;
  invokatedDemonsCards: Array<DemonCardData>;
  neighborsCards: Array<NeighborCardData>;
}

export interface PlayerInputData {
  name: string;
}
