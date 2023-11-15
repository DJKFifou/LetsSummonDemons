import { Game } from '../game/game.js';

export interface Card {
  activate: (game: Game) => void;
}
