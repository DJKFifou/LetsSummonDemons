import { PlayerData, PlayerId } from './player.js';

export interface TurnPlayerData {
  player: PlayerData;
  launchedDices: boolean;
  bougthNeighbor: boolean;
  invokedDemon: boolean;
}

export interface TurnData {
  played: Array<PlayerId>;
  current: TurnPlayerData;
  remaining: Array<PlayerId>;
}
