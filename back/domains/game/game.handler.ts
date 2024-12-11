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

    if (
      !game ||
      !playerInputData.name?.trim() ||
      game.data.players.length >= 5 ||
      game.playerList.some(
        (player) => player.data.name === playerInputData.name,
      )
    ) {
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

  socket.on('deckShow', () => {
    const game = gameRepository.getGameById(socket.data.gameId);
    game.showDeck();
  });

  socket.on('playerReady', () => {
    const game = gameRepository.getGameById(socket.data.gameId);

    if (!game) return;

    game.playerList.forEach((player) => {
      if (player.data.isBot && !game.playersReady.includes(player.data.id)) {
        game.playersReady.push(player.data.id);
      }
    });

    if (!game.playersReady.includes(socket.data.playerId)) {
      game.playersReady.push(socket.data.playerId);
    }

    socket.to(game.data.id).emit('playersReadyUpdate', game.playersReady);
    socket.emit('playersReadyUpdate', game.playersReady);

    if (game.playersReady.length === game.playerList.length) {
      game.start();
    }
  });

  socket.on('chatMessage', (message) => {
    const game = gameRepository.getGameById(socket.data.gameId);
    const player = game.playerList.find(
      (p) => p.data.id === socket.data.playerId,
    ); // Assuming you have player data stored
    const playerName = player ? player.data.name : 'Unknown Player'; // Get the player's name, default to 'Unknown Player'

    // Push both player name and message to the game chat
    game.gameChat.push({ playerName, message });

    // Emit the updated game chat to all clients
    socket.to(game.data.id).emit('gameChatMessage', game.gameChat);
    socket.emit('gameChatMessage', game.gameChat);
  });
};
