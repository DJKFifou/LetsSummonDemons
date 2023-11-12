import { v4 as uuidv4 } from 'uuid';
import { CardData } from './game.js';

export const cards: Array<CardData> = [
  {
    id: uuidv4(),
    number: 1,
  },
  {
    id: uuidv4(),
    number: 2,
  },
  {
    id: uuidv4(),
    number: 3,
  },
  {
    id: uuidv4(),
    number: 4,
  },
  {
    id: uuidv4(),
    number: 5,
  },
];
