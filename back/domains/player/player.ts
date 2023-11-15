import { v4 as uuidv4 } from 'uuid';
import {
  CandleCardData,
  CardId,
  NeighborCardData,
} from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import {
  PlayerData,
  PlayerId,
  PlayerInputData,
} from '../../contracts/player.js';
import { DemonCard } from '../demon/demon.js';

export class Player implements EntityClass<PlayerData> {
  protected id: PlayerId;
  protected name: string;
  protected soulsTokenCount: number;
  protected candleCard?: CandleCardData;
  protected coveredDemonsCards: Array<DemonCard>;
  protected summonedDemonsCards: Array<DemonCard>;
  protected neighborsCards: Array<NeighborCardData>;

  constructor(playerData: PlayerInputData) {
    this.id = uuidv4();
    this.name = playerData.name;
    this.soulsTokenCount = 0;
    this.candleCard = null;
    this.coveredDemonsCards = [];
    this.summonedDemonsCards = [];
    this.neighborsCards = [];
  }

  getData(): PlayerData {
    return {
      id: this.id,
      name: this.name,
      soulsTokenCount: this.soulsTokenCount,
      candleCard: this.candleCard,
      coveredDemonsCards: this.coveredDemonsCards.map((card) => card.getData()),
      summonedDemonsCards: this.summonedDemonsCards.map((card) =>
        card.getData(),
      ),
      neighborsCards: this.neighborsCards,
    };
  }

  addSoulToken(count: number = 1): void {
    this.soulsTokenCount += count;
  }

  removeSoulToken(count: number = 1): void {
    this.soulsTokenCount -= count;
  }

  setCandleCard(candleCard: CandleCardData): void {
    this.candleCard = candleCard;
  }

  addCoveredDemonCard(demonCard: DemonCard): void {
    this.coveredDemonsCards.push(demonCard);
  }

  removeCoveredDemonCardById(demonCardId: CardId): DemonCard {
    let removedCard: DemonCard;

    this.coveredDemonsCards = this.coveredDemonsCards.filter((card) => {
      if (card.getData().id !== demonCardId) {
        return true;
      }

      removedCard = card;
      return false;
    });

    return removedCard;
  }

  getCoveredDemonCardById(demonCardId: CardId): DemonCard {
    return this.coveredDemonsCards.find(
      (card) => card.getData().id === demonCardId,
    );
  }

  addSummonedDemonCard(demonCard: DemonCard): void {
    this.summonedDemonsCards.push(demonCard);
  }

  removeSummonedDemonCardById(demonCardId: CardId): DemonCard {
    let removedCard: DemonCard;

    this.summonedDemonsCards = this.summonedDemonsCards.filter((card) => {
      if (card.getData().id !== demonCardId) {
        return true;
      }

      removedCard = card;
      return false;
    });

    return removedCard;
  }

  getSummonedDemonCardById(demonCardId: CardId): DemonCard {
    return this.summonedDemonsCards.find(
      (card) => card.getData().id === demonCardId,
    );
  }

  addNeighborCard(neighborCard: NeighborCardData): void {
    this.neighborsCards.push(neighborCard);
  }
}
