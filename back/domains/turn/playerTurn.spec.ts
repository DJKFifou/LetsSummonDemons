import {
  SOULS_COUNT_TO_BUY_NEIGHBOR_CARD,
  START_WITH_SOUL_TOKEN_COUNT,
} from '../../constants/game.js';
import { demons } from '../demon/demons.js';
import { gameFactory } from '../game/game.factory.js';
import { neighbors } from '../neighbor/neighbors.js';
import { NeighborNotInMarketError } from '../neighbor/neighborsDeck.errors.js';
import {
  DoesNotHaveThisDemonCoveredError,
  NotEnoughNeighborsProdivedToSummonDemonError,
  TooManyNeighborsProdivedToSummonDemonError,
} from '../player/player.errors.js';
import { PlayerTurn } from './playerTurn.js';
import {
  CannotBuyNeighborError,
  CannotLaunchDicesError,
  CannotSummonDemonError,
} from './turn.errors.js';

describe('launch dices', () => {
  test('can launch dices', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });
    expect(playerTurn.canLaunchDices).toBe(true);

    playerTurn.launchDices();

    expect(playerTurn.data.launchedDices).toBe(true);
  });

  test('cannot launch dices twice', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });

    playerTurn.launchDices();

    expect(playerTurn.canLaunchDices).toBe(false);
    expect(() => playerTurn.launchDices()).toThrow(CannotLaunchDicesError);
  });
});

describe('buy neighbor', () => {
  test('cannot buy neighbor if not enough souls', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });
    player.removeSoulToken(START_WITH_SOUL_TOKEN_COUNT);
    player.addSoulToken(SOULS_COUNT_TO_BUY_NEIGHBOR_CARD - 1);

    const buyNeighbor = (): void =>
      playerTurn.buyNeighbor(game.neighborsDeck.data.market[0].id);

    expect(playerTurn.canBuyNeighbor).toBe(false);
    expect(buyNeighbor).toThrow(CannotBuyNeighborError);
  });

  test('cannot buy neighbor that is not in market', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });

    const buyNeighbor = (): void =>
      playerTurn.buyNeighbor('id-that-cannot-be-of-card-in-market');

    expect(playerTurn.canBuyNeighbor).toBe(true);
    expect(buyNeighbor).toThrow(NeighborNotInMarketError);
  });

  test('buy neighbor remove souls', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });
    player.addSoulToken(SOULS_COUNT_TO_BUY_NEIGHBOR_CARD);
    expect(playerTurn.canBuyNeighbor).toBe(true);

    playerTurn.buyNeighbor(game.neighborsDeck.data.market[0].id);

    expect(playerTurn.canBuyNeighbor).toBe(false);
    expect(player.data.soulsTokenCount).toBe(START_WITH_SOUL_TOKEN_COUNT);
  });

  test('cannot buy neighbor twice', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });
    player.addSoulToken(SOULS_COUNT_TO_BUY_NEIGHBOR_CARD);
    const buyNeighbor = (): void =>
      playerTurn.buyNeighbor(game.neighborsDeck.data.market[0].id);

    buyNeighbor();

    expect(playerTurn.canBuyNeighbor).toBe(false);
    expect(buyNeighbor).toThrow(CannotBuyNeighborError);
  });
});

describe('summon demon', () => {
  test('cannot summon demon if not enough neighbors cards', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addCoveredDemonCard(demons[0]);

    const summonDemon = (): void =>
      playerTurn.summonDemon(demons[0].data.id, [
        neighbors[0].data.id,
        neighbors[1].data.id,
        neighbors[2].data.id,
      ]);

    expect(playerTurn.canSummonDemon).toBe(false);
    expect(summonDemon).toThrow(CannotSummonDemonError);
  });

  test('cannot summon demon if not enough neighbors provided', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addNeighborCard(neighbors[2]);
    player.addCoveredDemonCard(demons[0]);

    const summonDemon = (): void =>
      playerTurn.summonDemon(demons[0].data.id, [
        neighbors[0].data.id,
        neighbors[1].data.id,
      ]);

    expect(playerTurn.canSummonDemon).toBe(true);
    expect(summonDemon).toThrow(NotEnoughNeighborsProdivedToSummonDemonError);
  });

  test('cannot summon demon if too many neighbors provided', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addNeighborCard(neighbors[2]);
    player.addNeighborCard(neighbors[3]);
    player.addCoveredDemonCard(demons[0]);

    const summonDemon = (): void =>
      playerTurn.summonDemon(demons[0].data.id, [
        neighbors[0].data.id,
        neighbors[1].data.id,
        neighbors[2].data.id,
        neighbors[3].data.id,
      ]);

    expect(playerTurn.canSummonDemon).toBe(true);
    expect(summonDemon).toThrow(TooManyNeighborsProdivedToSummonDemonError);
  });

  test("cannot summon demon that he doesn't have in its covered cards", () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addNeighborCard(neighbors[2]);
    player.addCoveredDemonCard(demons[2]);

    const summonDemon = (): void =>
      playerTurn.summonDemon(demons[0].data.id, [
        neighbors[0].data.id,
        neighbors[1].data.id,
        neighbors[2].data.id,
      ]);

    expect(playerTurn.canSummonDemon).toBe(true);
    expect(summonDemon).toThrow(DoesNotHaveThisDemonCoveredError);
  });

  test('summon demon destroy selected neighbors', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addNeighborCard(neighbors[2]);
    player.addCoveredDemonCard(demons[0]);
    expect(playerTurn.canSummonDemon).toBe(true);

    playerTurn.summonDemon(demons[0].data.id, [
      neighbors[0].data.id,
      neighbors[1].data.id,
      neighbors[2].data.id,
    ]);

    expect(playerTurn.canSummonDemon).toBe(false);
    expect(player.getNeighborCards.length).toBe(0);
  });

  test('cannot summon demon twice', () => {
    const game = gameFactory.createStarted();
    const player = game.playerList[0];
    const playerTurn = new PlayerTurn({ game, player });
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addNeighborCard(neighbors[2]);
    player.addCoveredDemonCard(demons[0]);
    const summonDemon = (): void =>
      playerTurn.summonDemon(demons[0].data.id, [
        neighbors[0].data.id,
        neighbors[1].data.id,
        neighbors[2].data.id,
      ]);

    summonDemon();

    expect(playerTurn.canSummonDemon).toBe(false);
    expect(summonDemon).toThrow(CannotSummonDemonError);
  });
});
