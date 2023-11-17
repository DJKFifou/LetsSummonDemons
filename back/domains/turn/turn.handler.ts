import { IoServer, IoSocket } from '../../contracts/io.js';
import { Game } from '../game/game.js';
import { gameRepository } from '../game/game.repository.js';

const isPlayerTurn = ({
  game,
  socket,
}: {
  game?: Game;
  socket: IoSocket;
}): boolean =>
  game && game.getData().turn.current.player.id == socket.data.playerId;

export const registerTurnHandlers = (_io: IoServer, socket: IoSocket): void => {
  socket.on('turnLaunchDices', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.launchDices();
  });

  socket.on('turnBuyNeighbor', (neighborCardId) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.buyNeighbor(neighborCardId);

    socket.emit('gameData', game.getData());
  });

  socket.on('turnInvokeDemon', ({ demonCardId, neighborsSacrifiedIds }) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.summonDemon(demonCardId, neighborsSacrifiedIds);

    socket.emit('gameData', game.getData());
  });

  socket.on('turnEnd', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.endTurn();

    socket.emit('gameData', game.getData());
  });
};
