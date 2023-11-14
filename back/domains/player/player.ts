import { v4 as uuidv4 } from 'uuid';
import {
  CandleCardData,
  DemonCardData,
  NeighborCardData,
} from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import {
  PlayerData,
  PlayerId,
  PlayerInputData,
} from '../../contracts/player.js';

export class Player implements EntityClass<PlayerData> {
  protected id: PlayerId;
  protected name: string;
  protected soulsTokenCount: number;
  protected candleCard?: CandleCardData;
  protected coveredDemonsCards: Array<DemonCardData>;
  protected summonedDemonsCards: Array<DemonCardData>;
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
      coveredDemonsCards: this.coveredDemonsCards,
      summonedDemonsCards: this.summonedDemonsCards,
      neighborsCards: this.neighborsCards,
    };
  }

  addSoulToken(count:number=1): void{
    this.soulsTokenCount+=count;
  }

  setCandleCard(candleCard:CandleCardData): void {
    this.candleCard=candleCard;
  }

  addDemonCard(demonCard:DemonCardData): void {
    this.coveredDemonsCards.push(demonCard);
  }

  addNeighborCard(neighborCard:NeighborCardData): void {
    this.neighborsCards.push(neighborCard);
  }
  

}


