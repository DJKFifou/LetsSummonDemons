import { IoServer, IoSocket } from '../../contracts/io.js';
import { registerGameHandlers } from '../../domains/game/game.handler.js';
import { registerTurnHandlers } from '../../domains/turn/turn.handler.js';

export const registerHandlers = (io: IoServer): void => {
  io.on('connection', (socket: IoSocket) => {
    registerGameHandlers(io, socket);
    registerTurnHandlers(io, socket);
  });
};
