import {
  CardFilter,
  DemonCardData,
  NeighborCardData,
} from '../../contracts/card.js';
import { Card } from './card.js';

type GenericCard = Card<DemonCardData | NeighborCardData>;

interface CardRepositoryArgs {
  cards: Array<GenericCard>;
}
export class CardRepository {
  protected cards: Array<GenericCard>;

  constructor({ cards }: CardRepositoryArgs) {
    this.cards = cards;
  }

  all(): Array<GenericCard> {
    return this.cards;
  }

  filter(filter: CardFilter): Array<GenericCard> {
    return this.cards.filter((card) => card.passFilter(filter));
  }

  add(cards: Array<GenericCard>): void {
    this.cards.push(...cards);
  }

  remove(filter: CardFilter): Array<GenericCard> {
    const removedCards: Array<GenericCard> = [];
    const keepedCards: Array<GenericCard> = [];

    this.cards.forEach((card) => {
      if (card.passFilter(filter)) {
        removedCards.push(card);
      } else {
        keepedCards.push(card);
      }
    });
    this.cards = keepedCards;

    return removedCards;
  }
}
