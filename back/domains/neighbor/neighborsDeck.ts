import {
  NEIGHBORS_MARKET_COUNT,
  SOULS_COUNT_TO_BUY_NEIGHBOR_CARD,
} from '../../constants/game.js';
import { CardId } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { NeighborsDeckData } from '../../contracts/neighborsDeck.js';
import { shuffleArray } from '../../utils/array.js';
import { Player } from '../player/player.js';
import { NeighborCard } from './neighbor.js';
import {
  NeighborNotInMarketError,
  NotEnoughtSoulsToBuyNeighborError,
} from './neighborsDeck.errors.js';

interface NeighborsDeckArgs {
  cards: Array<NeighborCard>;
}

export class NeighborsDeck implements EntityClass<NeighborsDeckData> {
  protected remainingCards: Array<NeighborCard>;
  protected market: Array<NeighborCard | null>;
  protected drawned: Array<NeighborCard | null>;
  protected discard: Array<NeighborCard | null>;

  constructor({ cards }: NeighborsDeckArgs) {
    this.remainingCards = shuffleArray(cards);
    this.market = Array.from({ length: NEIGHBORS_MARKET_COUNT }).map(
      () => null,
    );
    this.drawned = [];
    this.discard = [];

    this.fillMarket();
  }

  protected getCardInMarketById(cardId: CardId): NeighborCard {
    const card = this.market.find((card) => card.data.id === cardId);

    if (!card) {
      throw new NeighborNotInMarketError();
    }

    return card;
  }

  findCardByName(cardName: string): NeighborCard | null {
    const lowerCaseCardName = cardName.toLowerCase();
    const cardInRemaining = this.remainingCards.find(
      (card) => card.data.name.toLowerCase() === lowerCaseCardName,
    );
    if (cardInRemaining) {
      return cardInRemaining;
    }
    return null;
  }

  giveCardByName(player: Player, cardName: string): void {
    const card = this.findCardByName(cardName);
    if (!card) {
      throw new Error(
        `La carte ${cardName} n'existe pas dans le deck des voisins.`,
      );
    }
    player.addNeighborCard(card);
    this.remainingCards = this.remainingCards.filter(
      (remainingCard) => remainingCard.data.id !== card.data.id,
    );
  }

  protected pickCardFromMarketById(cardId: CardId): NeighborCard | null {
    const card = this.getCardInMarketById(cardId);

    for (let i = 0, iMax = this.market.length; i < iMax; i++) {
      if (this.market[i].data.id === cardId) {
        this.market[i] = null;
      }
    }

    return card;
  }

  replaceCard(cardId: CardId): void {
    for (let i = 0, iMax = this.market.length; i < iMax; i++) {
      if (this.market[i].data.id === cardId) {
        this.market[i] = null;
      }
    }
    this.fillMarket();
  }

  fillMarket(): void {
    for (let i = 0; i < 5; i++) {
      if (!this.market[i]) {
        this.market[i] = this.remainingCards.shift();
      }
    }
  }

  getMarket = (): Array<NeighborCard | null> => this.market;

  buyCard(player: Player, cardId: CardId): void {
    if (player.data.soulsTokenCount < SOULS_COUNT_TO_BUY_NEIGHBOR_CARD) {
      throw new NotEnoughtSoulsToBuyNeighborError();
    }

    player.removeSoulToken(SOULS_COUNT_TO_BUY_NEIGHBOR_CARD);

    const card = this.pickCardFromMarketById(cardId);
    const newCard: NeighborCard = card;
    newCard.isActivableSetter();
    player.addNeighborCard(newCard);

    this.fillMarket();
  }

  giveCard(player: Player, cardId: CardId): void {
    const card = this.pickCardFromMarketById(cardId);
    const newCard: NeighborCard = card;
    player.addNeighborCard(newCard);

    this.fillMarket();
  }

  drawnCard(): NeighborCard {
    const card = this.remainingCards.shift();
    this.drawned.push(card);
    return card;
  }

  throwCards(cardCount: number): void {
    for (let i = 0; i < cardCount; i++) {
      this.drawned.shift();
    }
  }

  throwMarketCards(index: number): void {
    this.getMarket().splice(index, 1);
  }

  get data(): NeighborsDeckData {
    return {
      remainingCardsCount: this.remainingCards.length,
      market: this.market.map((card) => card.data),
      drawned: this.drawned.map((card) => card.data),
      discard: this.discard.map((card) => card.data),
    };
  }
}
