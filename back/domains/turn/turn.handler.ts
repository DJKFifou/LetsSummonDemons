import { IoServer, IoSocket } from '../../contracts/io.js';
import { gameRepository } from '../game/game.repository.js';

export const registerTurnHandlers = (_io: IoServer, socket: IoSocket): void => {
  socket.on('turnLaunchDices', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!game) {
      return;
    }

    game.turn.launchDices();
  });

  socket.on('turnBuyNeighbor', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!game) {
      return;
    }

    game.turn.buyNeighbor();

    socket.emit('gameData', game.getData());
  });

  socket.on('turnInvokeDemon', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!game) {
      return;
    }

    game.turn.invokeDemon();

    socket.emit('gameData', game.getData());
  });

  socket.on('turnEnd', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!game) {
      return;
    }

    game.turn.endTurn();

    socket.emit('gameData', game.getData());
  });
};
