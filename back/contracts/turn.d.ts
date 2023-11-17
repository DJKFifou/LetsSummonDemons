import { PlayerData, PlayerId } from './player.js';

export interface PlayerTurnData {
  player: PlayerData;
  launchedDices: boolean;
  dicesResult?: number;
  bougthNeighbor: boolean;
  summonedDemon: boolean;
}

export interface TurnData {
  played: Array<PlayerId>;
  current: PlayerTurnData;
  remaining: Array<PlayerId>;
}
