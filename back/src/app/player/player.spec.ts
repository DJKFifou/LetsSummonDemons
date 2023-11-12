import { faker } from '@faker-js/faker';
import { Player } from './player.js';

test('should have an id', () => {
  const player = new Player({
    name: faker.person.fullName(),
  });

  expect(player.id).not.toBe(null);
});

// test('can receive card', () => {
//   const player = new Player();

//   player.receiveCard();

//   expect(player.id).not.toBe(null);
// });
