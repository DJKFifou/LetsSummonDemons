import { DemonCardData } from '../contracts/card.js';
import { demons as demonsCards } from '../domains/demon/demons.js';

export const demons: Array<DemonCardData> = demonsCards.map((demon) =>
  demon.getData(),
);
