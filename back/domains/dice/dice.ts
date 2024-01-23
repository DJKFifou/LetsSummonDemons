import { DICE_FACES_COUNT } from '../../constants/dices.js';
import { DiceData } from '../../contracts/dice.js';
import { EntityClass } from '../../contracts/entities.js';
import { randomInteger } from '../../utils/number.js';
import {
  NotAnIntegerFacesCountDiceError,
  UnsufficientFacesCountDiceError,
} from './dice.errors.js';

export class Dice implements EntityClass<DiceData> {
  private readonly MIN_DICE_NUMBER = 1;
  private facesCount: number;
  private result: number;

  constructor(facesCount: number = DICE_FACES_COUNT) {
    if (facesCount < this.MIN_DICE_NUMBER) {
      throw new UnsufficientFacesCountDiceError();
    }

    if (!Number.isInteger(facesCount)) {
      throw new NotAnIntegerFacesCountDiceError();
    }

    this.facesCount = facesCount;
    this.result = null;
  }

  launch(): number {
    this.result = randomInteger(this.MIN_DICE_NUMBER, this.facesCount);

    return this.result;
  }

  get data(): DiceData {
    return {
      facesCount: this.facesCount,
      result: this.result,
    };
  }
}
