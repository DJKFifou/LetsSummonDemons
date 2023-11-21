import { v4 } from 'uuid';
import {
  CandleCardData,
  CardInput,
  DemonCardData,
  NeighborCardData,
} from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { Game } from '../game/game.js';
import { Player } from '../player/player.js';

// les arguments que reçoit la fonction d'activation de la carte
interface CardResolveFunctionArgs {
  game: Game;
  cardOwner: Player;
}

// le type de la fonction d'activation
type CardResolveFunction = (args: CardResolveFunctionArgs) => Promise<void>;

// arguments de la classe
export interface CardArgs<
  T extends NeighborCardData | DemonCardData | CandleCardData,
> {
  data: CardInput<T>;
  activateFn: CardResolveFunction;
}

export class Card<T extends NeighborCardData | DemonCardData | CandleCardData>
  implements EntityClass<T>
{
  protected data: T;
  protected activateFn: CardResolveFunction;

  constructor({ data, activateFn }: CardArgs<T>) {
    this.data = {
      id: v4(),
      ...data,
    } as T;
    // ici on stocke dans la classe la fonction
    // d'activation qui a été passée en paramètres
    this.activateFn = activateFn;
  }

  /**
   * Appelle la fonction d'activation de la carte
   */
  async activate(args: CardResolveFunctionArgs): Promise<void> {
    await this.activateFn(args);

    console.log(`${this.data.name} activated for ${args.cardOwner.getData().name} by ${args.game.getData().turn.current.player.name}`);

    args.game.emitDataToSockets();
  }

  isActivatedByNumber(number: number): boolean {
    return this.data.activationNumbers.includes(number);
  }

  /**
   * Données pour la transmisison au front
   */
  getData(): T {
    return this.data;
  }
}
