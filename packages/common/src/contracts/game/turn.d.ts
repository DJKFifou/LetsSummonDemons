import { PlayerId } from './player.js';

export interface TurnData {
  playedPlayers: Array<PlayerId>;
  currentPlayer: PlayerId;
  remainingPlayers: Array<PlayerId>;
}
