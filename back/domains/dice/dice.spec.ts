import {
  NotAnIntegerFacesCountDiceError,
  UnsufficientFacesCountDiceError,
} from './dice.errors.js';
import { Dice } from './dice.js';

describe('dice', () => {
  test('cannot have less than 1 face', () => {
    expect(() => new Dice(0)).toThrow(UnsufficientFacesCountDiceError);
  });

  test('face number should be an integer', () => {
    expect(() => new Dice(1.12)).toThrow(NotAnIntegerFacesCountDiceError);
  });

  test('should fall on a number between 1 and faces count', () => {
    const dice = new Dice(1);

    dice.launch();

    expect(dice.data.result).toBe(1);
  });
});
