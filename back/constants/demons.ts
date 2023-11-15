import { DemonCardData } from '../contracts/card.js';
import { demons as demonsClasses } from '../domains/demon/demons.js';

export const demons: Array<DemonCardData> = demonsClasses.map((demon) =>
  demon.getData(),
);
