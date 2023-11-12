import { faker } from '@faker-js/faker';
import { Player } from './player.js';

export const playerFactory = {
  create: (): Player =>
    new Player({
      name: faker.person.fullName(),
    }),
};
