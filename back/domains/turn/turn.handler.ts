import { IoServer, IoSocket } from '../../contracts/io.js';
import { Game } from '../game/game.js';
import { gameRepository } from '../game/game.repository.js';

const isPlayerTurn = ({
  game,
  socket,
}: {
  game?: Game;
  socket: IoSocket;
}): boolean => game && game.data.turn.current.player.id == socket.data.playerId;

export const registerTurnHandlers = (_io: IoServer, socket: IoSocket): void => {
  socket.on('turnLaunchDices', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.launchDices();
  });

  socket.on('testDices', (number) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.testDices(number);
  });

  socket.on('turnBuyNeighbor', (neighborCardId) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.buyNeighbor(neighborCardId);

    socket.emit('gameData', game.data);
  });

  socket.on('turnChoosedCard', (neighborCardId) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    game.turn.choosedCard(neighborCardId);

    socket.emit('gameData', game.data);
  });

  socket.on('stopCardReplacement', () => {
    const game = gameRepository.getGameById(socket.data.gameId);


    game.turn.current.cleanShouldReplaceMarketCards();

    socket.emit('gameData', game.data);
  });

  socket.on('drawCardAndActiveIt', (neighborCardId) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    game.turn.drawnedCard(neighborCardId);

    socket.emit('gameData', game.data);
  });

  socket.on('turnInvokeDemon', ({ demonCardId, neighborsSacrifiedIds }) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.summonDemon(demonCardId, neighborsSacrifiedIds);

    socket.emit('gameData', game.data);
  });

  socket.on('turnEnd', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.endTurn();

    socket.emit('gameData', game.data);
  });
};
