import { IoServer, IoSocket } from '../../contracts/io.js';
import { playerFactory } from '../player/player.factory.js';
import { Player } from '../player/player.js';
import { gameRepository } from './game.repository.js';

export const registerGameHandlers = (_io: IoServer, socket: IoSocket): void => {
  socket.on('gameCreate', ({ playerInputData }) => {
    console.log('create game');

    const createdGame = gameRepository.createGame();
    const createdGameId = createdGame.data.id;

    socket.join(createdGameId);

    const player = new Player(playerInputData);
    createdGame.addPlayer(player);

    createdGame.data.hostId = player.data.id;

    socket.data.gameId = createdGameId;
    socket.data.playerId = player.data.id;
    socket.data.hostId = player.data.id;

    createdGame.addPlayer(playerFactory.createBot());

    socket.emit('playerId', player.data.id);
    socket.emit('hostId', player.data.id);
  });

  socket.on('gameJoin', ({ gameId, playerInputData }) => {
    const game = gameRepository.getGameById(gameId);

    if (!game) {
      return;
      // todo handle no game found
    }

    socket.join(gameId);

    const player = new Player(playerInputData);
    game.addPlayer(player);

    socket.data.gameId = game.data.id;
    socket.data.playerId = player.data.id;

    socket.emit('playerId', player.data.id);
  });

  socket.on('gameStart', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!game) {
      return;
    }

    game.start();
  });
};
