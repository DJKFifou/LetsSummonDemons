import { CardType, NeighborKindness, NeighborType } from './card.js';
import { PlayerData, PlayerId } from './player.js';

export interface PlayerTurnData {
  player: PlayerData;
  launchedDices: boolean;
  dicesResult?: number;
  bougthNeighbor: boolean;
  summonedDemon: boolean;
  canEndTurn: boolean;
  canSummonDemon: boolean;
  canBuyNeighbor: boolean;
  canLaunchDices: boolean;
  shouldSelectCards: boolean;
  shouldSelectCardsFilter?: {
    type?: Array<CardType>;
    neighborKindness?: Array<NeighborKindness>;
    neighborType?: Array<NeighborType>;
  };
}

export interface TurnData {
  played: Array<PlayerId>;
  current: PlayerTurnData;
  remaining: Array<PlayerId>;
}
