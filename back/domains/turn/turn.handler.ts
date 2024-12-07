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

  socket.on('testGiveCard', (cardName) => {
    try {
      const game = gameRepository.getGameById(socket.data.gameId);

      if (!isPlayerTurn({ socket, game })) {
        return;
      }
      game.turn.testGiveCard(cardName);
    } catch (error) {
      console.error(`Erreur lors de l'appel à testGiveCard : ${error.message}`);
    }
  });

  socket.on('turnBuyNeighbor', (neighborCardId) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.buyNeighbor(neighborCardId);

    game.gameConsole.push(
      `${game.data.turn.current.player.name} bought ${
        game.data.turn.current.player.neighborsCards[
          game.data.turn.current.player.neighborsCards.length - 1
        ].name
      }`,
    );

    socket.emit('gameData', game.data);
  });

  socket.on('turnChoosedCard', (neighborCardId) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    game.turn.choosedCard(neighborCardId);

    socket.emit('gameData', game.data);
  });

  socket.on('turnChoosedPlayer', (playerId) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    game.turn.choosedPlayer(playerId);

    socket.emit('gameData', game.data);
  });

  socket.on('stopCardAction', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    game.turn.current.choiceCountdown = 0;

    socket.emit('gameData', game.data);
  });

  socket.on('turnInvokeDemon', ({ demonCardId, neighborsSacrifiedIds }) => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!isPlayerTurn({ socket, game })) {
      return;
    }

    game.turn.summonDemon(demonCardId, neighborsSacrifiedIds);

    game.gameConsole.push(
      `${game.data.turn.current.player.name} invoked ${
        game.data.turn.current.player.summonedDemonsCards[
          game.data.turn.current.player.summonedDemonsCards.length - 1
        ].name
      }`,
    );

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
