import { GameId } from '@lsd/common/src/contracts/game/game.js';
import { Game } from './game.js';

export class GameRepository {
  private readonly games: Map<string, Game>;

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
