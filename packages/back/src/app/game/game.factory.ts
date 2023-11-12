import { playerFactory } from '../player/player.factory.js';
import { Game } from './game.js';

export const gameFactory = {
  create: (): Game => new Game(),
  createStarted: (): Game => {
    const game = gameFactory.create();
    for (let i = 0, iMax = game.MIN_PLAYER; i < iMax; i++) {
      game.addPlayer(playerFactory.create());
    }

    return game.start();
  },
};
