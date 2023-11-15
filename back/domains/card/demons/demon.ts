import { DemonCardData } from '../../../contracts/card.js';
import { EntityClass } from '../../../contracts/entities.js';
import { Game } from '../../game/game.js';
import { Player } from '../../player/player.js';

interface DemonArgs {
  data: DemonCardData;
  activateFn: DemonResolveFunction;
}

interface DemonResolveFunctionArgs {
  game: Game;
  player: Player;
}

type DemonResolveFunction = (args: DemonResolveFunctionArgs) => void;

export class DemonCard implements EntityClass<DemonCardData> {
  protected data: DemonCardData;
  protected activateFn: DemonResolveFunction;

  constructor({ data, activateFn }: DemonArgs) {
    this.data = data;
    this.activateFn = activateFn;
  }

  activate(args: DemonResolveFunctionArgs): void {
    this.activateFn(args);
  }

  getData(): DemonCardData {
    return this.data;
  }
}
