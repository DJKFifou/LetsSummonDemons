import {
  NEIGHBORS_MARKET_COUNT,
  SOULS_COUNT_TO_BUY_NEIGHBOR_CARD,
} from '../../constants/game.js';
import { playerFactory } from '../player/player.factory.js';
import { neighbors } from './neighbors.js';
import { NotEnoughtSoulsToBuyNeighborError } from './neighborsDeck.errors.js';
import { NeighborsDeck } from './neighborsDeck.js';

test('shuffle and put 5 cards on market when created', () => {
  const neighborsDeck = new NeighborsDeck({
    cards: neighbors,
  });

  expect(neighborsDeck.data.market.length).toBe(NEIGHBORS_MARKET_COUNT);
  expect(neighborsDeck.data.remainingCardsCount).toBe(
    neighbors.length - NEIGHBORS_MARKET_COUNT,
  );
});

test('player with enough souls can buy a neighbor', () => {
  const neighborsDeck = new NeighborsDeck({
    cards: neighbors,
  });
  const player = playerFactory.create();
  player.addSoulToken(SOULS_COUNT_TO_BUY_NEIGHBOR_CARD);
  const cardToBuy = neighborsDeck.data.market[0];

  neighborsDeck.buyCard(player, cardToBuy.id);

  expect(player.data.neighborsCards[0].id).toBe(cardToBuy.id);
  expect(player.data.soulsTokenCount).toBe(0);
  expect(neighborsDeck.data.market.length).toBe(NEIGHBORS_MARKET_COUNT);
  expect(neighborsDeck.data.market[0]).not.toBe(cardToBuy.id);
});

test('player with not enough souls cannot buy a neighbor', () => {
  const neighborsDeck = new NeighborsDeck({
    cards: neighbors,
  });
  const player = playerFactory.create();
  player.addSoulToken(SOULS_COUNT_TO_BUY_NEIGHBOR_CARD - 1);
  const cardToBuy = neighborsDeck.data.market[0];

  expect(() => neighborsDeck.buyCard(player, cardToBuy.id)).toThrow(
    NotEnoughtSoulsToBuyNeighborError,
  );
});
