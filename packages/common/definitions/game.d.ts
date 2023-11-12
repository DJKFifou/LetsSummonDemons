import { UUID } from 'crypto';
import { TurnData } from './turn.js';

export type GameId = UUID;
export type GameState = 'starting' | 'started' | 'ended';
export interface GameData {
  id: GameId;
  players: Array<PlayerData>;
  state: GameState;
  turn?: TurnData;
}

export type PlayerId = UUID;
export interface PlayerData {
  id: PlayerId;
  name: string;
  cards: Array<CardData>;
}
export interface PlayerInputData {
  name: string;
}

export type CardId = UUID;
export interface CardData {
  id: CardId;
  number: number;
}
