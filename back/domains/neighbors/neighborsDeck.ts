import {
  NEIGHBORS_MARKET_COUNT,
  SOULS_COUNT_TO_BUY_NEIGHBOR_CARD,
} from '../../constants/game.js';
import { CardId, NeighborCardData } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { NeighborsDeckData } from '../../contracts/neighborsDeck.js';
import { shuffleArray } from '../../utils/array.js';
import { Player } from '../player/player.js';
import { InsuficientSoulsToBuyNeighborError } from './neighborsDeck.errors.js';

interface NeighborsDeckArgs {
  cards: Array<NeighborCardData>;
}

export class NeighborsDeck implements EntityClass<NeighborsDeckData> {
  protected remainingCards: Array<NeighborCardData>;
  protected market: Array<NeighborCardData | null>;

  constructor({ cards }: NeighborsDeckArgs) {
    this.remainingCards = shuffleArray(cards);
    this.market = Array.from({ length: NEIGHBORS_MARKET_COUNT }).map(
      () => null,
    );

    this.fillMarket();
  }

  protected fillMarket(): void {
    for (let i = 0, iMax = this.market.length; i < iMax; i++) {
      if (!this.market[i]) {
        this.market[i] = this.remainingCards.shift();
      }
    }
  }

  protected pickCardFromMarketById(cardId: CardId): NeighborCardData | null {
    for (let i = 0, iMax = this.market.length; i < iMax; i++) {
      if (this.market[i].id === cardId) {
        const card = this.market[i];
        this.market[i] = null;
        return card;
      }
    }

    return null;
  }

  buyCard(player: Player, cardId: CardId): void {
    if (player.getData().soulsTokenCount < SOULS_COUNT_TO_BUY_NEIGHBOR_CARD) {
      throw new InsuficientSoulsToBuyNeighborError();
    }

    player.removeSoulToken(SOULS_COUNT_TO_BUY_NEIGHBOR_CARD);

    const card = this.pickCardFromMarketById(cardId);
    player.addNeighborCard(card);

    this.fillMarket();
  }

  getData(): NeighborsDeckData {
    return {
      remainingCardsCount: this.remainingCards.length,
      market: this.market,
    };
  }
}
