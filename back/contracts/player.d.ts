import { CandleCardData, DemonCardData, NeighborCardData } from './card.js';

export type PlayerId = string;

export interface PlayerData {
  id: PlayerId;
  name: string;
  soulsTokenCount: number;
  candleCard?: CandleCardData;
  coveredDemonsCards: Array<DemonCardData>;
  summonedDemonsCards: Array<DemonCardData>;
  neighborsCards: Array<NeighborCardData>;
  isBot?: boolean;
}

export interface PlayerInputData {
  name: string;
}
