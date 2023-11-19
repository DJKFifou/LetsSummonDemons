import { CardFilter, NeighborCardData } from '../../contracts/card.js';
import { NeighborCard } from './neighbor.js';

describe('filter', () => {
  const fakeNeighbor: NeighborCardData = {
    id: 'fake-id',
    type: 'NEIGHBOR',
    name: '',
    cardImage: '',
    cardBack: '',
    activationNumbers: [3],
    neighborType: 'GIRL',
    neighborKindness: 'ADORABLE',
  };

  test('should not pass filter equals neighbor type "ANIMAL"', () => {
    const card = new NeighborCard({
      data: fakeNeighbor,
      activateFn: async (): Promise<void> => {},
    });
    const filter: CardFilter = {
      neighborTypes: ['ANIMAL'],
    };

    expect(card.passFilter(filter)).toBe(false);
  });

  test('should pass filter equals neighbor type "GIRL"', () => {
    const card = new NeighborCard({
      data: fakeNeighbor,
      activateFn: async (): Promise<void> => {},
    });
    const filter: CardFilter = {
      neighborTypes: ['GIRL'],
    };

    expect(card.passFilter(filter)).toBe(true);
  });

  test('should not pass filter equals neighbor kindness "HORRIBLE"', () => {
    const card = new NeighborCard({
      data: fakeNeighbor,
      activateFn: async (): Promise<void> => {},
    });
    const filter: CardFilter = {
      neighborKindnesses: ['HORRIBLE'],
    };

    expect(card.passFilter(filter)).toBe(false);
  });

  test('should pass filter equals neighbor kindness "ADORABLE"', () => {
    const card = new NeighborCard({
      data: fakeNeighbor,
      activateFn: async (): Promise<void> => {},
    });
    const filter: CardFilter = {
      neighborKindnesses: ['ADORABLE'],
    };

    expect(card.passFilter(filter)).toBe(true);
  });
});
