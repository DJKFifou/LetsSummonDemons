import { v4 as uuidv4 } from 'uuid';
import { PlayerId } from '../../contracts/player.js';
import {
  AlreadyBoughtNeighborInTurnError,
  AlreadyInvokedDemonInTurnError,
  AlreadyLaunchedDicesInTurnError,
  NeedToLaunchDicesInTurnError,
} from './turn.errors.js';
import { Turn } from './turn.js';

test('start by first player', () => {
  const playerA: PlayerId = uuidv4();
  const playerB: PlayerId = uuidv4();

  const turn = new Turn([playerA, playerB]);

  expect(turn.getData().current.id).toBe(playerA);
});

describe('player turn', () => {
  test("cannot end turn if hasn't launched dices", () => {
    const playerA: PlayerId = uuidv4();
    const playerB: PlayerId = uuidv4();
    const turn = new Turn([playerA, playerB]);

    expect(() => turn.endTurn()).toThrow(NeedToLaunchDicesInTurnError);
  });

  test('can launch dices', () => {
    const playerA: PlayerId = uuidv4();
    const playerB: PlayerId = uuidv4();
    const turn = new Turn([playerA, playerB]);

    turn.launchDices();

    expect(turn.getData().current.launchedDices).toBe(true);
  });

  test('can end turn if launched dices', () => {
    const playerA: PlayerId = uuidv4();
    const playerB: PlayerId = uuidv4();
    const turn = new Turn([playerA, playerB]);

    turn.launchDices();
    turn.endTurn();

    expect(turn.getData().played).toContain(playerA);
  });

  test('cannot launch dices twice', () => {
    const playerA: PlayerId = uuidv4();
    const playerB: PlayerId = uuidv4();
    const turn = new Turn([playerA, playerB]);

    turn.launchDices();

    expect(() => turn.launchDices()).toThrow(AlreadyLaunchedDicesInTurnError);
  });

  test('can buy neighbor', () => {
    const playerA: PlayerId = uuidv4();
    const playerB: PlayerId = uuidv4();
    const turn = new Turn([playerA, playerB]);

    turn.buyNeighbor();

    expect(turn.getData().current.bougthNeighbor).toBe(true);
  });

  test('cannot buy neighbor twice', () => {
    const playerA: PlayerId = uuidv4();
    const playerB: PlayerId = uuidv4();
    const turn = new Turn([playerA, playerB]);

    turn.buyNeighbor();

    expect(() => turn.buyNeighbor()).toThrow(AlreadyBoughtNeighborInTurnError);
  });

  test('can invoke demon', () => {
    const playerA: PlayerId = uuidv4();
    const playerB: PlayerId = uuidv4();
    const turn = new Turn([playerA, playerB]);

    turn.invokeDemon();

    expect(turn.getData().current.invokedDemon).toBe(true);
  });

  test('cannot invoke demon twice', () => {
    const playerA: PlayerId = uuidv4();
    const playerB: PlayerId = uuidv4();
    const turn = new Turn([playerA, playerB]);

    turn.invokeDemon();

    expect(() => turn.invokeDemon()).toThrow(AlreadyInvokedDemonInTurnError);
  });
});

test('next player is the next in the list', () => {
  const playerA: PlayerId = uuidv4();
  const playerB: PlayerId = uuidv4();
  const turn = new Turn([playerA, playerB]);

  turn.launchDices();
  turn.endTurn();

  expect(turn.getData().current.id).toBe(playerB);
});
