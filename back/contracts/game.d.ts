import { NeighborsDeckData } from './neighborsDeck.js';
import { PlayerData, PlayerId } from './player.js';
import { TurnData } from './turn.js';

export type GameId = string;

export type GameState = 'starting' | 'started' | 'showDeck' | 'ended';

export interface GameData {
  id: GameId;
  hostId: PlayerId;
  players: Array<PlayerData>;
  playersReady: Array<PlayerId>;
  state: GameState;
  gameConsole: [string];
  gameChat: { playerName: string; message: string }[];
  neighborsDeck: NeighborsDeckData;
  turn?: TurnData;
  winner?: PlayerId;
}
