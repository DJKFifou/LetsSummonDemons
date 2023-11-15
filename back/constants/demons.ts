import { DemonCardData } from '../contracts/card.js';
import { demons as demonsClasses } from '../domains/card/demons/demons.js';

export const demons: Array<DemonCardData> = demonsClasses.map((demon) =>
  demon.getData(),
);
