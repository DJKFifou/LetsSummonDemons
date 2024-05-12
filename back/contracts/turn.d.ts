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
  canChoosedCard: boolean;
  canLaunchDices: boolean;
  cardSelector?: PlayerId;
  shouldSelectCards: boolean;
  shouldSelectCardsFilter?: {
    numberCard?: number;
    rangeOfSelection?:
      | 'marketChoice'
      | 'opponentChoice'
      | 'selfChoice'
      | 'null';
    type?: Array<CardType>;
    neighborType?: Array<NeighborType>;
    neighborKindness?: Array<NeighborKindness>;
  };
}

export interface TurnData {
  played: Array<PlayerId>;
  current: PlayerTurnData;
  remaining: Array<PlayerId>;
}
