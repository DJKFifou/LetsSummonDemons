import { CandleCardData, DemonCardData, NeighborCardData } from './card.js';

export type PlayerId = string;

export interface PlayerData {
  id: PlayerId;
  name: string;
  soulsTokenCount: number;
  boysAndGirlsSoulsTokenCount: number;
  animalsCount: number;
  candleCard?: CandleCardData;
  coveredDemonsCards: Array<DemonCardData>;
  summonedDemonsCards: Array<DemonCardData>;
  neighborsCards: Array<NeighborCardData>;
  isBot?: boolean;
  isTheftProtected?: boolean;
  sacrificeNeighborsCountToInvokeDemon: number;
}

export interface PlayerInputData {
  name: string;
}
