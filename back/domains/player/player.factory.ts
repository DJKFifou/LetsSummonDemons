import { faker } from '@faker-js/faker';
import { Player } from './player.js';

export const playerFactory = {
  create: (): Player =>
    new Player({
      name: `Fake ${faker.person.firstName()}`,
    }),
  createBot: (): Player => {
    const p = playerFactory.create();
    p.setIsBot();
    return p;
  },
};
