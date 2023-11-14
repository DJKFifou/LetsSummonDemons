import * as _ from 'lodash';
import { DICE_FACES_COUNT } from '../../constants/dices.js';
import { DiceData } from '../../contracts/dice.js';
import { EntityClass } from '../../contracts/entities.js';
import {
  NotAnIntegerFacesCountDiceError,
  UnsufficientFacesCountDiceError,
} from './dice.errors.js';

export class Dice implements EntityClass<DiceData> {
  private readonly MIN_DICE_NUMBER = 1;
  private facesCount: number;
  private displayNumber: number;

  constructor(facesCount: number = DICE_FACES_COUNT) {
    if (facesCount < this.MIN_DICE_NUMBER) {
      throw new UnsufficientFacesCountDiceError();
    }

    if (!_.isInteger(facesCount)) {
      throw new NotAnIntegerFacesCountDiceError();
    }

    this.facesCount = facesCount;
    this.displayNumber = null;
  }

  launch(): Dice {
    this.displayNumber = _.random(this.MIN_DICE_NUMBER, this.facesCount);

    return this;
  }

  getData(): DiceData {
    return {
      facesCount: this.facesCount,
      displayNumber: this.displayNumber,
    };
  }
}
