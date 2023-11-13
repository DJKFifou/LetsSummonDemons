import { MIN_GAME_PLAYERS } from '@lsd/common/constants/game/game.js';
import { playerFactory } from '../player/player.factory.js';
import { Game } from './game.js';

export const gameFactory = {
  create: (): Game => new Game(),
  createStarted: (): Game => {
    const game = gameFactory.create();
    for (let i = 0, iMax = MIN_GAME_PLAYERS; i < iMax; i++) {
      game.addPlayer(playerFactory.create());
    }

    return game.start();
  },
};
