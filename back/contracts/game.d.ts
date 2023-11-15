import { PlayerData, PlayerId } from './player.js';
import { TurnData } from './turn.js';

export type GameId = string;

export type GameState = 'starting' | 'started' | 'ended';

export interface GameData {
  id: GameId;
  players: Array<PlayerData>;
  state: GameState;
  turn?: TurnData;
  winner?: PlayerId;
}
