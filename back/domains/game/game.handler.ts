import { IoServer, IoSocket } from '../../contracts/io.js';
import { playerFactory } from '../player/player.factory.js';
import { Player } from '../player/player.js';
import { gameRepository } from './game.repository.js';

export const registerGameHandlers = (_io: IoServer, socket: IoSocket): void => {
  socket.on('gameCreate', ({ playerInputData }) => {
    console.log('create game');

    const createdGame = gameRepository.createGame();
    const createdGameId = createdGame.getData().id;

    socket.join(createdGameId);

    const player = new Player(playerInputData);
    createdGame.addPlayer(player);

    socket.data.gameId = createdGameId;
    socket.data.playerId = player.getData().id;

    createdGame.addPlayer(playerFactory.createBot());

    socket.emit('playerId', player.getData().id);
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

    socket.data.gameId = game.getData().id;
    socket.data.playerId = player.getData().id;

    socket.emit('playerId', player.getData().id);
  });

  socket.on('gameStart', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!game) {
      return;
    }

    game.start();
  });
};
