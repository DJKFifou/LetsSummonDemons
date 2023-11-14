import { v4 as uuidv4 } from 'uuid';
import { CardData } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import {
  PlayerData,
  PlayerId,
  PlayerInputData,
} from '../../contracts/player.js';

export class Player implements EntityClass<PlayerData> {
  id: PlayerId;
  name: string;
  cards: CardData[];

  constructor(playerData: PlayerInputData) {
    this.id = uuidv4();
    this.name = playerData.name;
    this.cards = [];
  }

  receiveCard(card: CardData): Player {
    this.cards.push(card);

    return this;
  }

  getData(): PlayerData {
    return {
      id: this.id,
      name: this.name,
      cards: this.cards,
    };
  }
}
