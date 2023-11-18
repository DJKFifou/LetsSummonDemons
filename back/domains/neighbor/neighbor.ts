import { v4 } from 'uuid';
import {
  NeighborCardData,
  NeighborCardInputData,
} from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { Game } from '../game/game.js';
import { Player } from '../player/player.js';

// les arguments que reçoit la fonction d'activation de la carte
export interface NeighborActivateFnArgs {
  game: Game;
  player: Player;
}

// le type de la fonction d'activation
type NeighborActivateFn = (args: NeighborActivateFnArgs) => Promise<void>;

// arguments de la classe
export interface NeighborArgs {
  inputData: NeighborCardInputData;
  activateFn: NeighborActivateFn;
}

export class NeighborCard implements EntityClass<NeighborCardData> {
  protected data: NeighborCardData;
  protected activateFn: NeighborActivateFn;

  constructor({ inputData: data, activateFn }: NeighborArgs) {
    this.data = {
      id: v4(),
      ...data,
    };
    // ici on stocke dans la classe la fonction
    // d'activation qui a été passée en paramètres
    this.activateFn = activateFn;
  }

  /**
   * Appelle la fonction d'activation de la carte
   */
  async activate(args: NeighborActivateFnArgs): Promise<void> {
    await this.activateFn(args);

    args.game.emitDataToSockets();
  }

  isActivatedByNumber(number: number): boolean {
    return this.data.activationNumbers.includes(number);
  }

  /**
   * Données pour la transmisison au front
   */
  getData(): NeighborCardData {
    return this.data;
  }
}
