import { IoServer, IoSocket } from '../../contracts/io.js';
import { Player } from '../player/player.js';
import { gameRepository } from './game.repository.js';

export const registerGameHandlers = (_io: IoServer, socket: IoSocket): void => {
  console.log('connection');

  socket.on('gameCreate', (playerData) => {
    console.log('create game');

    const createdGame = gameRepository.createGame();

    const player = new Player(playerData);
    socket.emit('playerData', player);

    createdGame.addPlayer(player);
    socket.emit('gameData', createdGame);
  });

  socket.on('gameJoin', (gameId, playerData) => {
    const game = gameRepository.getGameById(gameId);

    if (!game) {
      // todo handle no game found
    }

    const player = new Player(playerData);
    socket.emit('playerData', player);

    game.addPlayer(player);
    socket.emit('gameData', game);
  });
};
