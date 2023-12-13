import { v4 as uuidv4 } from 'uuid';
import { GameRepository } from './game.repository.js';

test('can create game', () => {
  const gameRepo = new GameRepository();

  const game = gameRepo.createGame();

  expect(game).not.toBeNull();
});

describe('retrieve game by id', () => {
  test('should return game when found', () => {
    const gameRepo = new GameRepository();

    const game = gameRepo.createGame();

    expect(gameRepo.getGameById(game.data.id)).toStrictEqual(game);
  });

  test('should return null when not found', () => {
    const gameRepo = new GameRepository();

    const inexistantGameId = uuidv4();

    expect(gameRepo.getGameById(inexistantGameId)).toBe(null);
  });
});
