import { v4 as uuidv4 } from 'uuid';
import { PlayerId } from '../../contracts/player.js';
import { NoMorePlayersToPlayInTurnError } from './turn.errors.js';
import { Turn } from './turn.js';

test('turn of first player', () => {
  const playerA: PlayerId = uuidv4();
  const playerB: PlayerId = uuidv4();

  const turn = new Turn([playerA, playerB]);

  expect(turn.currentPlayer).toBe(playerA);
});

test('turn can pass to next player', () => {
  const playerA: PlayerId = uuidv4();
  const playerB: PlayerId = uuidv4();
  const turn = new Turn([playerA, playerB]);

  turn.nextPlayerToPlay();

  expect(turn.playedPlayers[0]).toBe(playerA);
  expect(turn.currentPlayer).toBe(playerB);
  expect(turn.remainingPlayers.length).toBe(0);
});

test('cannot pass to next player if all players played', () => {
  const playerA: PlayerId = uuidv4();
  const playerB: PlayerId = uuidv4();
  const turn = new Turn([playerA, playerB]);

  turn.nextPlayerToPlay();

  expect(() => turn.nextPlayerToPlay()).toThrow(NoMorePlayersToPlayInTurnError);
});
