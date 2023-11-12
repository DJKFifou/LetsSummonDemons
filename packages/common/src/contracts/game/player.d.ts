import { CardData } from './material/card.js';

export type PlayerId = string;

export interface PlayerData {
  id: PlayerId;
  name: string;
  cards: Array<CardData>;
}

export interface PlayerInputData {
  name: string;
}
