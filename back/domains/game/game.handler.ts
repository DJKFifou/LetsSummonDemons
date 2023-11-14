import { IoServer, IoSocket } from '../../contracts/io.js';
import { playerFactory } from '../player/player.factory.js';
import { Player } from '../player/player.js';
import { gameRepository } from './game.repository.js';

export const registerGameHandlers = (_io: IoServer, socket: IoSocket): void => {
  socket.on('gameCreate', ({ playerInputData }) => {
    console.log('create game');

    const createdGame = gameRepository.createGame();
    createdGame.addPlayer(playerFactory.create());
    socket.data.gameId = createdGame.getData().id;

    const player = new Player(playerInputData);
    createdGame.addPlayer(player);
    socket.data.playerId = player.getData().id;

    socket.emit('playerData', player.getData());
    socket.emit('gameData', createdGame.getData());
  });

  socket.on('gameJoin', ({ gameId, playerInputData }) => {
    const game = gameRepository.getGameById(gameId);

    if (!game) {
      return;
      // todo handle no game found
    }

    const player = new Player(playerInputData);
    game.addPlayer(player);
    socket.data.gameId = game.getData().id;
    socket.data.playerId = player.getData().id;

    socket.emit('playerData', player.getData());
    socket.emit('gameData', game.getData());
  });

  socket.on('gameStart', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!game) {
      return;
    }

    game.start();
    socket.emit('gameData', game.getData());
  });
};
