import {
  MAX_GAME_PLAYERS,
  MIN_GAME_PLAYERS,
} from '@lsd/common/constants/game.js';
import { playerFactory } from '../player/player.factory.js';
import {
  JoinAlreadyStartedGameError,
  JoinFullGameError,
  StartWithoutEnoughPlayersError,
} from './game.errors.js';
import { gameFactory } from './game.factory.js';

test('should have an id', () => {
  const game = gameFactory.create();

  expect(game.id).not.toBe(null);
});

describe('starting', () => {
  test('cannot start when minimum player is not present', () => {
    const game = gameFactory.create();

    expect(() => game.start()).toThrow(StartWithoutEnoughPlayersError);
  });

  test('can start when minimum player is present', () => {
    const game = gameFactory.create();
    for (let i = 0, iMax = MIN_GAME_PLAYERS; i < iMax; i++) {
      game.addPlayer(playerFactory.create());
    }

    game.start();

    expect(game.state).toBe('started');
  });

  test('define a player to play', () => {
    const startedGame = gameFactory.createStarted();

    expect(startedGame.turn).not.toBe(null);
  });
});

describe('joining', () => {
  test('can join if not full', () => {
    const game = gameFactory.create();
    const player = playerFactory.create();

    game.addPlayer(player);

    expect(game.players).toContain(player);
  });

  test('cannot join if full', () => {
    const game = gameFactory.create();
    const player = playerFactory.create();
    for (let i = 0, iMax = MAX_GAME_PLAYERS; i < iMax; i++) {
      game.addPlayer(playerFactory.create());
    }

    expect(() => game.addPlayer(player)).toThrow(JoinFullGameError);
  });

  test('cannot join if game started', () => {
    const startedGame = gameFactory.createStarted();
    const player = playerFactory.create();

    expect(() => startedGame.addPlayer(player)).toThrow(
      JoinAlreadyStartedGameError,
    );
  });
});
