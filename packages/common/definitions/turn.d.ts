import { PlayerId } from './game.js';

export interface TurnData {
  playedPlayers: Array<PlayerId>;
  currentPlayer: PlayerId;
  remainingPlayers: Array<PlayerId>;
}
