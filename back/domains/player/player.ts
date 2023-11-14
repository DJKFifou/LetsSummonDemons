import { v4 as uuidv4 } from 'uuid';
import { CardData } from '../../contracts/card';
import { PlayerData, PlayerId, PlayerInputData } from '../../contracts/player';

export class Player implements PlayerData {
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
}
