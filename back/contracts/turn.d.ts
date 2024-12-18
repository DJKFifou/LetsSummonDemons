import { CardId, CardType, NeighborKindness, NeighborType } from './card.js';
import { PlayerData, PlayerId } from './player.js';

export interface PlayerTurnData {
  player: PlayerData;
  launchedDices: boolean;
  dicesResult?: number;
  boughtNeighbor: boolean;
  summonedDemon: boolean;
  canEndTurn: boolean;
  canSummonDemon: boolean;
  canBuyNeighbor: boolean;
  canChoosedCard: boolean;
  canChoosedPlayer: boolean;
  canReplaceCard: boolean;
  canLaunchDices: boolean;
  cardSelector?: PlayerId;
  shouldSelectCards: boolean;
  shouldSelectPlayers: boolean;
  choiceCountdown: number;
  shouldSelectFilter?: {
    choiceType?:
      | 'card'
      | 'player';
    number?: number;
    rangeOfSelection?: Array<
      | 'marketChoice'
      | 'opponentChoice'
      | 'selfChoice'
      | 'null'>;
    actionAwaited?:
      | 'discard'
      | 'replace'
      | 'steal'
      | 'pick'
      | 'sacrifice'
      | 'active'
      | 'give';
    type?: Array<CardType>;
    neighborType?: Array<NeighborType>;
    neighborKindness?: Array<NeighborKindness>;
  };
  playerChoosed?: boolean;
  instanceOfMarketCanBeReplaced?: Array<CardId>;
}

export interface TurnData {
  played: Array<PlayerId>;
  current: PlayerTurnData;
  remaining: Array<PlayerId>;
}
