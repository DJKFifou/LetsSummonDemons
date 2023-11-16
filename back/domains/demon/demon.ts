import { v4 } from 'uuid';
import { DemonCardData, DemonCardInputData } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { Game } from '../game/game.js';
import { Player } from '../player/player.js';

// les arguments que reçoit la fonction d'activation de la carte
interface DemonResolveFunctionArgs {
  game: Game;
  player: Player;
}

// le type de la fonction d'activation
type DemonResolveFunction = (args: DemonResolveFunctionArgs) => void;

// arguments de la classe
export interface DemonArgs {
  data: DemonCardInputData;
  activateFn: DemonResolveFunction;
}

export class DemonCard implements EntityClass<DemonCardData> {
  protected data: DemonCardData;
  protected activateFn: DemonResolveFunction;

  constructor({ data, activateFn }: DemonArgs) {
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
  activate(args: DemonResolveFunctionArgs): void {
    this.activateFn(args);
  }

  /**
   * Données pour la transmisison au front
   */
  getData(): DemonCardData {
    return this.data;
  }
}
