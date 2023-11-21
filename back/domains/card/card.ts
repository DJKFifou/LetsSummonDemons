import { v4 } from 'uuid';
import { CardInput, GenericCardData } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { Game } from '../game/game.js';
import { Player } from '../player/player.js';

// les arguments pour activer la carte
interface ActivateArgs {
  game: Game;
  cardOwner: Player;
}

// les arguments que reçoit la fonction d'activation de la carte
interface ActivateFunctionArgs<T extends GenericCardData> {
  game: Game;
  cardOwner: Player;
  card: Card<T>;
}

// le type de la fonction d'activation
type ActivateFunction<T extends GenericCardData> = (
  args: ActivateFunctionArgs<T>,
) => Promise<void>;

// arguments de la classe
export interface CardArgs<T extends GenericCardData> {
  data: CardInput<T>;
  activateFn: ActivateFunction<T>;
}

export class Card<T extends GenericCardData> implements EntityClass<T> {
  protected data: T;
  protected activateFn: ActivateFunction<T>;

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
  async activate({ game, cardOwner }: ActivateArgs): Promise<void> {
    // ici on appelle la fonction d'activation en passant la carte en paramètre
    await this.activateFn({
      game,
      cardOwner,
      card: this,
    });

    console.log(
      `${this.data.name} activated for ${cardOwner.getData().name} by ${
        game.getData().turn.current.player.name
      }`,
    );

    game.emitDataToSockets();
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
