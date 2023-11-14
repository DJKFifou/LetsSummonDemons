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
  protected invokatedDemonsCards: Array<DemonCardData>;
  protected neighborsCards: Array<NeighborCardData>;

  constructor(playerData: PlayerInputData) {
    this.id = uuidv4();
    this.name = playerData.name;
    this.soulsTokenCount = 0;
    this.candleCard = null;
    this.coveredDemonsCards = [];
    this.invokatedDemonsCards = [];
    this.neighborsCards = [];
  }

  getData(): PlayerData {
    return {
      id: this.id,
      name: this.name,
      soulsTokenCount: this.soulsTokenCount,
      candleCard: this.candleCard,
      coveredDemonsCardsCount: this.coveredDemonsCards.length,
      invokatedDemonsCards: this.invokatedDemonsCards,
      neighborsCards: this.neighborsCards,
    };
  }
}
