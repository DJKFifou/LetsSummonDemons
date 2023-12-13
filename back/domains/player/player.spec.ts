import { faker } from '@faker-js/faker';
import { Player } from './player.js';

test('should have an id', () => {
  const player = new Player({
    name: faker.person.fullName(),
  });

  expect(player.data.id).not.toBe(null);
});
