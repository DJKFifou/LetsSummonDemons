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
}

export interface TurnData {
  played: Array<PlayerId>;
  current: PlayerTurnData;
  remaining: Array<PlayerId>;
}
