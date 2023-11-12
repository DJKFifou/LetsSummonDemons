import { GameId } from '@letssummondemons/common/definitions/game.js';
import { v4 as uuidv4 } from 'uuid';
import { Game } from './game.js';

export class GameRepository {
  private readonly games: Map<uuidv4, Game>;

  constructor() {
    this.games = new Map();
  }

  createGame(): Game {
    const newGame: Game = new Game();

    this.games.set(newGame.id, newGame);

    return newGame;
  }

  getGameById(gameId: GameId): Game | null {
    return this.games.get(gameId) ?? null;
  }
}

export const gameRepository = new GameRepository();
