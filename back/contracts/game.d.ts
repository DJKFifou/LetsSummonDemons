import { NeighborsDeckData } from './neighborsDeck.js';
import { PlayerData, PlayerId } from './player.js';
import { TurnData } from './turn.js';

export type GameId = string;

export type GameState = 'starting' | 'started' | 'ended';

export interface GameData {
  id: GameId;
  players: Array<PlayerData>;
  state: GameState;
  neighborsDeck: NeighborsDeckData;
  turn?: TurnData;
  winner?: PlayerId;
}
