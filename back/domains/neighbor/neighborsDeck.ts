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
import { InsuficientSoulsToBuyNeighborError } from './neighborsDeck.errors.js';

interface NeighborsDeckArgs {
  cards: Array<NeighborCard>;
}

export class NeighborsDeck implements EntityClass<NeighborsDeckData> {
  protected remainingCards: Array<NeighborCard>;
  protected market: Array<NeighborCard | null>;

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

  protected pickCardFromMarketById(cardId: CardId): NeighborCard | null {
    for (let i = 0, iMax = this.market.length; i < iMax; i++) {
      if (this.market[i].getData().id === cardId) {
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
      market: this.market.map((card) => card.getData()),
    };
  }
}
