import { Server } from 'socket.io';
import {
  IClientToServerEvents,
  IServerToClientEvents,
  IServerToServerEvents,
  ISocketSessionData,
} from '../../contracts/io.js';
import { httpServer } from '../http/server.js';
import { registerHandlers } from './handlers.js';

// The ioServer is a singleton (single instance) because of module pattern :
// Each time you import the ioServer, you will get the same instance, because
// one instance is defined at the moment of the exportation.
// So, in other scripts, you import the same only on instance that have been created
export const ioServer = new Server<
  IClientToServerEvents,
  IServerToClientEvents,
  IServerToServerEvents,
  ISocketSessionData
>(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

registerHandlers(ioServer);
