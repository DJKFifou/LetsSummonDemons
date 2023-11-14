import { IoServer, IoSocket } from '../../contracts/io.js';
import { registerGameHandlers } from '../../domains/game/game.handler.js';

export const registerHandlers = (io: IoServer): void => {
  io.on('connection', (socket: IoSocket) => {
    registerGameHandlers(io, socket);
  });
};
