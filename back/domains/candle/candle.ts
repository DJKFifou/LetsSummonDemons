import { v4 } from 'uuid';
import { CandleCardData, CandleCardInputData } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { Game } from '../game/game.js';
import { Player } from '../player/player.js';

// les arguments que reçoit la fonction d'activation de la carte
export interface CandleResolveFunctionArgs {
  game: Game;
  player: Player;
}

// le type de la fonction d'activation
type CandleResolveFunction = (args: CandleResolveFunctionArgs) => void;

// arguments de la classe
export interface CandleArgs {
  data: CandleCardInputData;
  activateFn: CandleResolveFunction;
}

export class CandleCard implements EntityClass<CandleCardData> {
  data: CandleCardData;
  activateFn: CandleResolveFunction;

  constructor({ data, activateFn }: CandleArgs) {
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
  activate(args: CandleResolveFunctionArgs): void {
    this.activateFn(args);

    args.game.emitDataToSockets();
  }

  isActivatedByNumber(number: number): boolean {
    return this.data.activationNumbers.includes(number);
  }

  /**
   * Données pour la transmission au front
   */
  getData(): CandleCardData {
    return this.data;
  }
}
