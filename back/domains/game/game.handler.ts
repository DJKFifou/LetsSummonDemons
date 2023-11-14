import { IoServer, IoSocket } from '../../contracts/io.js';
import { Player } from '../player/player.js';
import { gameRepository } from './game.repository.js';

export const registerGameHandlers = (_io: IoServer, socket: IoSocket): void => {
  socket.on('gameCreate', ({ playerInputData }) => {
    console.log('create game');

    const createdGame = gameRepository.createGame();
    socket.data.gameId = createdGame.id;
    playerInputData;
    const player = new Player(playerInputData);
    createdGame.addPlayer(player);
    socket.data.playerId = player.id;

    socket.emit('playerData', player);
    socket.emit('gameData', createdGame);
  });

  socket.on('gameJoin', ({ gameId, playerInputData }) => {
    const game = gameRepository.getGameById(gameId);

    if (!game) {
      // todo handle no game found
    }

    const player = new Player(playerInputData);
    game.addPlayer(player);
    socket.data.gameId = game.id;
    socket.data.playerId = player.id;

    socket.emit('playerData', player);
    socket.emit('gameData', game);
  });
};
