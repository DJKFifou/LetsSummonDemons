import { gameFactory } from '../game/game.factory.js';
import {
  AlreadyLaunchedDicesInTurnError,
  NeedToLaunchDicesInTurnError,
} from './turn.errors.js';
import { Turn } from './turn.js';

test('start by first player', () => {
  const game = gameFactory.createStarted();
  const playerA = game.getData().players[0];

  const turn = new Turn(game);

  expect(turn.getData().current.player.id).toBe(playerA.id);
});

describe('player turn', () => {
  test("cannot end turn if hasn't launched dices", () => {
    const game = gameFactory.createStarted();
    const turn = new Turn(game);

    expect(() => turn.endTurn()).toThrow(NeedToLaunchDicesInTurnError);
  });

  test('can launch dices', () => {
    const game = gameFactory.createStarted();

    const turn = new Turn(game);

    turn.launchDices();

    expect(turn.getData().current.launchedDices).toBe(true);
  });

  test('can end turn if launched dices', () => {
    const game = gameFactory.createStarted();
    const playerA = game.getData().players[0];
    const turn = new Turn(game);

    turn.launchDices();
    turn.endTurn();

    expect(turn.getData().played).toContain(playerA.id);
  });

  test('cannot launch dices twice', () => {
    const game = gameFactory.createStarted();
    const turn = new Turn(game);

    turn.launchDices();

    expect(() => turn.launchDices()).toThrow(AlreadyLaunchedDicesInTurnError);
  });

  // test('can buy neighbor', () => {
  //   const game = gameFactory.createStarted();
  //   const turn = new Turn(game);

  //   turn.buyNeighbor();

  //   expect(turn.getData().current.bougthNeighbor).toBe(true);
  // });

  // test('cannot buy neighbor twice', () => {
  //   const game = gameFactory.createStarted();
  //   const turn = new Turn(game);

  //   turn.buyNeighbor();

  //   expect(() => turn.buyNeighbor()).toThrow(AlreadyBoughtNeighborInTurnError);
  // });

  // test('can invoke demon', () => {
  //   const game = gameFactory.createStarted();
  //   const turn = new Turn(game);

  //   turn.invokeDemon();

  //   expect(turn.getData().current.invokedDemon).toBe(true);
  // });

  // test('cannot invoke demon twice', () => {
  //   const game = gameFactory.createStarted();
  //   const turn = new Turn(game);

  //   turn.invokeDemon();

  //   expect(() => turn.invokeDemon()).toThrow(AlreadyInvokedDemonInTurnError);
  // });
});

test('next player is the next in the list', () => {
  const game = gameFactory.createStarted();
  const playerB = game.getData().players[1];

  const turn = new Turn(game);

  turn.launchDices();
  turn.endTurn();

  expect(turn.getData().current.player.id).toBe(playerB.id);
});
