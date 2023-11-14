import {
  IClientToServerEvents,
  IServerToClientEvents,
} from '@lsd/back/contracts/io';
import { Socket, io } from 'socket.io-client';

type ClientSocket = Socket<IServerToClientEvents, IClientToServerEvents>;
export const socket: ClientSocket = io('ws://localhost:3010', {
  reconnection: true,
  reconnectionDelay: 1000,
});
