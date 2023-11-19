import { CardFilter, NeighborCardData } from '../../contracts/card.js';
import { Card } from './card.js';

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

  test('should not pass filter equals id "inexistent-id"', () => {
    const card = new Card<NeighborCardData>({
      data: fakeNeighbor,
      activateFn: async (): Promise<void> => {},
    });
    const filter: CardFilter = {
      ids: ['inexistant-id'],
    };

    expect(card.passFilter(filter)).toBe(false);
  });

  test('should pass filter equals id "fake-id"', () => {
    const card = new Card<NeighborCardData>({
      data: fakeNeighbor,
      activateFn: async (): Promise<void> => {},
    });
    const filter: CardFilter = {
      ids: [fakeNeighbor.id],
    };

    expect(card.passFilter(filter)).toBe(true);
  });

  test('should not pass filter equals type DEMON', () => {
    const card = new Card<NeighborCardData>({
      data: fakeNeighbor,
      activateFn: async (): Promise<void> => {},
    });
    const filter: CardFilter = {
      types: ['DEMON'],
    };

    expect(card.passFilter(filter)).toBe(false);
  });

  test('should pass filter equals same type NEIGHBOR', () => {
    const card = new Card<NeighborCardData>({
      data: fakeNeighbor,
      activateFn: async (): Promise<void> => {},
    });
    const filter: CardFilter = {
      types: ['NEIGHBOR'],
    };

    expect(card.passFilter(filter)).toBe(true);
  });

  test('should not pass filter equals activation numbers "2"', () => {
    const card = new Card<NeighborCardData>({
      data: fakeNeighbor,
      activateFn: async (): Promise<void> => {},
    });
    const filter: CardFilter = {
      activationNumbers: [2],
    };

    expect(card.passFilter(filter)).toBe(false);
  });

  test('should pass filter equals activation numbers "3"', () => {
    const card = new Card<NeighborCardData>({
      data: fakeNeighbor,
      activateFn: async (): Promise<void> => {},
    });
    const filter: CardFilter = {
      activationNumbers: [3],
    };

    expect(card.passFilter(filter)).toBe(true);
  });
});
