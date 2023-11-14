import { PlayerId } from './player.js';

export interface TurnPlayerData {
  id: PlayerId;
  launchedDices: boolean;
  bougthNeighbor: boolean;
  invokedDemon: boolean;
}

export interface TurnData {
  playedPlayers: Array<PlayerId>;
  currentPlayer: TurnPlayerData;
  remainingPlayers: Array<PlayerId>;
}
