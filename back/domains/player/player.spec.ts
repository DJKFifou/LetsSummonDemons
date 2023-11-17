import { faker } from '@faker-js/faker';
import { demons } from '../demon/demons.js';
import { neighbors } from '../neighbor/neighbors.js';
import {
  DoesNotHaveThisDemonCoveredError,
  DoesNotHaveThisNeighborError,
  NotEnoughNeighborsProdivedToSummonDemonError,
  TooManyNeighborsProdivedToSummonDemonError,
} from './player.errors.js';
import { playerFactory } from './player.factory.js';
import { Player } from './player.js';

test('should have an id', () => {
  const player = new Player({
    name: faker.person.fullName(),
  });

  expect(player.getData().id).not.toBe(null);
});

describe('summon demon', () => {
  test('cannot summon demon if not enough neighbors cards', () => {
    const player = playerFactory.create();
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addCoveredDemonCard(demons[0]);

    const summonDemon = (): void =>
      player.summonDemon(demons[0].getData().id, [
        neighbors[0].getData().id,
        neighbors[1].getData().id,
        neighbors[2].getData().id,
      ]);

    expect(summonDemon).toThrow(DoesNotHaveThisNeighborError);
  });

  test('cannot summon demon if not enough neighbors provided', () => {
    const player = playerFactory.create();
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addCoveredDemonCard(demons[0]);

    const summonDemon = (): void =>
      player.summonDemon(demons[0].getData().id, [
        neighbors[0].getData().id,
        neighbors[1].getData().id,
      ]);

    expect(summonDemon).toThrow(NotEnoughNeighborsProdivedToSummonDemonError);
  });

  test('cannot summon demon if too many neighbors provided', () => {
    const player = playerFactory.create();
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addNeighborCard(neighbors[2]);
    player.addNeighborCard(neighbors[3]);
    player.addCoveredDemonCard(demons[0]);

    const summonDemon = (): void =>
      player.summonDemon(demons[0].getData().id, [
        neighbors[0].getData().id,
        neighbors[1].getData().id,
        neighbors[2].getData().id,
        neighbors[3].getData().id,
      ]);

    expect(summonDemon).toThrow(TooManyNeighborsProdivedToSummonDemonError);
  });

  test("cannot summon demon that he doesn't have in its covered cards", () => {
    const player = playerFactory.create();
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addNeighborCard(neighbors[2]);

    const summonDemon = (): void =>
      player.summonDemon(demons[0].getData().id, [
        neighbors[0].getData().id,
        neighbors[1].getData().id,
        neighbors[2].getData().id,
      ]);

    expect(summonDemon).toThrow(DoesNotHaveThisDemonCoveredError);
  });

  test('summon demon destroy selected neighbors', () => {
    const player = playerFactory.create();
    player.addNeighborCard(neighbors[0]);
    player.addNeighborCard(neighbors[1]);
    player.addNeighborCard(neighbors[2]);
    player.addCoveredDemonCard(demons[0]);

    player.summonDemon(demons[0].getData().id, [
      neighbors[0].getData().id,
      neighbors[1].getData().id,
      neighbors[2].getData().id,
    ]);

    expect(player.getNeighborCards.length).toBe(0);
  });
});
