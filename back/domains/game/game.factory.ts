import { MIN_GAME_PLAYERS } from '../../constants/game.js';
import { playerFactory } from '../player/player.factory.js';
import { Game } from './game.js';

export const gameFactory = {
  create: (): Game => new Game(),
  createStarted: (): Game => {
    const game = gameFactory.create();
    for (let i = 0, iMax = MIN_GAME_PLAYERS; i < iMax; i++) {
      game.addPlayer(playerFactory.create());
    }

    game.start();

    return game;
  },
};
