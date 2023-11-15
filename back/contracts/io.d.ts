import { Server, Socket } from 'socket.io';
import { GameData, GameId } from './game.js';
import { PlayerData, PlayerId } from './player.js';

export interface IServerToClientEvents {
  playerData: (playerData: PlayerData) => void;
  playerId: (playerId: PlayerId) => void;
  gameData: (gameData: GameData) => void;
}

export interface IClientToServerEvents {
  gameCreate: ({ playerInputData: PlayerInputData }) => void;
  gameJoin: ({ gameId: GameId, playerInputData: PlayerInputData }) => void;
  gameStart: () => void;
  turnLaunchDices: () => void;
  turnBuyNeighbor: () => void;
  turnInvokeDemon: () => void;
  turnEnd: () => void;
}

export interface IServerToServerEvents {}

export interface ISocketSessionData {
  gameId?: GameId;
  playerId?: GameId;
}

export type IoServer = Server<
  IClientToServerEvents,
  IServerToClientEvents,
  IServerToServerEvents,
  ISocketSessionData
>;

export type IoSocket = Socket<
  IClientToServerEvents,
  IServerToClientEvents,
  IServerToServerEvents,
  ISocketSessionData
>;
