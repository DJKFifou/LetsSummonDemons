import { MAX_GAME_PLAYERS } from '../../constants/game.js';
import { gameFactory } from '../game/game.factory.js';
import { playerFactory } from '../player/player.factory.js';
import { CannotEndTurnError } from './turn.errors.js';
import { Turn } from './turn.js';

test('start by first player', () => {
  const game = gameFactory.createStarted();
  const playerA = game.data.players[0];

  const turn = new Turn(game);

  expect(turn.data.current.player.id).toBe(playerA.id);
});

describe('end turn', () => {
  test("cannot end turn if hasn't launched dices", () => {
    const game = gameFactory.createStarted();
    const turn = new Turn(game);

    expect(turn.current.canEndTurn).toBe(false);
    expect(() => turn.endTurn()).toThrow(CannotEndTurnError);
  });

  test('can end turn if launched dices', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const turn = new Turn(game);

    turn.launchDices();

    expect(turn.current.canEndTurn).toBe(true);

    turn.endTurn();

    expect(turn.current.canEndTurn).toBe(false);
    expect(turn.data.played).toContain(player.data.id);
  });
});

test('next player is the next in the list', () => {
  const game = gameFactory.createStarted();
  const playerB = game.data.players[1];

  const turn = new Turn(game);

  turn.launchDices();
  turn.endTurn();

  expect(turn.data.current.player.id).toBe(playerB.id);
});

describe('list from current', () => {
  test('should start from current followed by ordered players', () => {
    const game = gameFactory.create();
    for (let i = 0, iMax = MAX_GAME_PLAYERS; i < iMax; i++) {
      game.addPlayer(playerFactory.create());
    }

    const turn = new Turn(game);
    turn.launchDices();
    turn.endTurn();

    const list = game.playerList;
    const listFromCurrent = turn.playerListFromCurrent;
    expect(listFromCurrent[0].data.id).toBe(list[1].data.id);
    expect(listFromCurrent[1].data.id).toBe(list[2].data.id);
    expect(listFromCurrent[listFromCurrent.length - 1].data.id).toBe(
      list[0].data.id,
    );
  });
});
