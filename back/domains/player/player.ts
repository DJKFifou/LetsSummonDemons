import { v4 as uuidv4 } from 'uuid';
import { CardId } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import {
  PlayerData,
  PlayerId,
  PlayerInputData,
} from '../../contracts/player.js';
import { CandleCard } from '../candle/candle.js';
import { DemonCard } from '../demon/demon.js';
import { NeighborCard } from '../neighbor/neighbor.js';
import {
  DoesNotHaveThisDemonCoveredError,
  DoesNotHaveThisNeighborError,
} from './player.errors.js';
import { SACRIFICE_NEIGHBORS_COUNT_TO_INVOKE_DEMON } from '../../constants/game.js';

export class Player implements EntityClass<PlayerData> {
  protected id: PlayerId;
  protected name: string;
  protected soulsTokenCount: number;
  protected boysAndGirlsSoulsTokenCount: number;
  protected animalsCount: number;
  protected candleCard?: CandleCard;
  protected coveredDemonsCards: Array<DemonCard>;
  protected summonedDemonsCards: Array<DemonCard>;
  protected neighborsCards: Array<NeighborCard>;
  protected isBot: boolean;
  protected sacrificeNeighborsCountToInvokeDemon: number;

  constructor(playerData: PlayerInputData) {
    this.id = uuidv4();
    this.name = playerData.name;
    this.soulsTokenCount = 0;
    this.boysAndGirlsSoulsTokenCount = 0;
    this.animalsCount = 0;
    this.candleCard = null;
    this.coveredDemonsCards = [];
    this.summonedDemonsCards = [];
    this.neighborsCards = [];
    this.isBot = false;
    this.sacrificeNeighborsCountToInvokeDemon = SACRIFICE_NEIGHBORS_COUNT_TO_INVOKE_DEMON;
  }

  get data(): PlayerData {
    return {
      id: this.id,
      name: this.name,
      soulsTokenCount: this.soulsTokenCount,
      boysAndGirlsSoulsTokenCount: this.boysAndGirlsSoulsTokenCount,
      animalsCount: this.animalsCount,
      candleCard: this.candleCard?.data,
      coveredDemonsCards: this.coveredDemonsCards.map((card) => card.data),
      summonedDemonsCards: this.summonedDemonsCards.map((card) => card.data),
      neighborsCards: this.neighborsCards.map((card) => card.data),
      isBot: this.isBot,
      sacrificeNeighborsCountToInvokeDemon: this.sacrificeNeighborsCountToInvokeDemon,
    };
  }

  setIsBot(isBot: boolean = true): void {
    this.isBot = isBot;
  }

  addSoulToken(count: number = 1): void {
    this.soulsTokenCount += count;
  }

  resetBoysAndGirlsSoulsTokenCount() {
    this.boysAndGirlsSoulsTokenCount = 0;
  }

  getAnimalsCount(): number {
    return this.animalsCount;
  }

  setAnimalsCount(count: number) {
    this.animalsCount = count;
  }

  getBoysAndGirlsSoulsTokenCount(): number {
    return this.boysAndGirlsSoulsTokenCount;
  }

  addBoysAndGirlsSoulsToken(count: number = 1) {
    this.boysAndGirlsSoulsTokenCount += count;
  }

  removeSoulToken(count: number = 1): void {
    this.soulsTokenCount -= count;
  }

  setCandleCard(candleCard): void {
    this.candleCard = candleCard;
  }

  getCandleCard(): CandleCard | null {
    return this.candleCard;
  }

  addCoveredDemonCard(demonCard: DemonCard): void {
    this.coveredDemonsCards.push(demonCard);
  }

  setSacrificeNeighborsCountToInvokeDemon(count: number) {
    this.sacrificeNeighborsCountToInvokeDemon = count;
  }

  removeCoveredDemonCardById(demonIdToRemove: CardId): DemonCard {
    const removedCard: DemonCard =
      this.getCoveredDemonCardById(demonIdToRemove);

    this.coveredDemonsCards = this.coveredDemonsCards.filter(
      (card) => card.data.id !== demonIdToRemove,
    );

    return removedCard;
  }

  getCoveredDemonCardById(demonCardId: CardId): DemonCard {
    const card = this.coveredDemonsCards.find(
      (card) => card.data.id === demonCardId,
    );

    if (!card) {
      throw new DoesNotHaveThisDemonCoveredError();
    }

    return card;
  }

  getCoveredDemonCards(): Array<DemonCard> {
    return this.coveredDemonsCards;
  }

  addSummonedDemonCard(demonCard: DemonCard): void {
    this.summonedDemonsCards.push(demonCard);
  }

  removeSummonedDemonCardById(demonCardId: CardId): DemonCard {
    let removedCard: DemonCard;

    this.summonedDemonsCards = this.summonedDemonsCards.filter((card) => {
      if (card.data.id !== demonCardId) {
        return true;
      }

      removedCard = card;
      return false;
    });

    return removedCard;
  }

  getSummonedDemonCardById(demonCardId: CardId): DemonCard {
    return this.summonedDemonsCards.find(
      (card) => card.data.id === demonCardId,
    );
  }

  uncoverDemonCard(demonCardId: CardId): void {
    const demonCard = this.getCoveredDemonCardById(demonCardId);

    this.removeCoveredDemonCardById(demonCardId);
    this.addSummonedDemonCard(demonCard);
  }

  getSummonedDemonCards(): Array<DemonCard> {
    return this.summonedDemonsCards;
  }

  getRandomDemonCard(): DemonCard {
    const randomIndex = Math.floor(
      Math.random() * this.coveredDemonsCards.length,
    );

    return this.coveredDemonsCards[randomIndex];
  }

  addNeighborCard(neighborCard: NeighborCard): void {
    this.neighborsCards.push(neighborCard);
  }

  removeNeighborCardById(neighborIdToRemove: CardId): NeighborCard {
    const removedCard: NeighborCard =
      this.getNeighborCardById(neighborIdToRemove);

    this.neighborsCards = this.neighborsCards.filter(
      (card) => card.data.id !== neighborIdToRemove,
    );

    return removedCard;
  }

  getNeighborCardById(neighborCardId: CardId): NeighborCard {
    const card = this.neighborsCards.find(
      (card) => card.data.id === neighborCardId,
    );

    if (!card) {
      throw new DoesNotHaveThisNeighborError();
    }

    return card;
  }

  stealNeighborCardToPlayerById(cardId: CardId, player: Player) {
    const neighborCard = player.removeNeighborCardById(cardId);
    this.addNeighborCard(neighborCard);
  }

  getNeighborCards(): Array<NeighborCard> {
    return this.neighborsCards;
  }

  getKidNeighborCards(): Array<NeighborCard> {
    return this.neighborsCards.filter(
      (card) =>
        card.data.neighborType.includes('BOY') ||
        card.data.neighborType.includes('GIRL'),
    );
  }

  getBoyNeighborCards(): Array<NeighborCard> {
    return this.neighborsCards.filter((card) =>
      card.data.neighborType.includes('BOY'),
    );
  }

  getGirlNeighborCards(): Array<NeighborCard> {
    return this.neighborsCards.filter((card) =>
      card.data.neighborType.includes('GIRL'),
    );
  }

  getAnimalNeighborCards(): Array<NeighborCard> {
    return this.neighborsCards.filter((card) =>
      card.data.neighborType.includes('ANIMAL'),
    );
  }

  getHorribleNeighborCards(): Array<NeighborCard> {
    return this.neighborsCards.filter(
      (card) =>
        card.data.neighborKindness &&
        card.data.neighborKindness.includes('HORRIBLE'),
    );
  }

  getAdorableNeighborCards(): Array<NeighborCard> {
    return this.neighborsCards.filter(
      (card) =>
        card.data.neighborKindness &&
        card.data.neighborKindness.includes('ADORABLE'),
    );
  }
}
