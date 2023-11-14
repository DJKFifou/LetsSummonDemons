import { Server, Socket } from 'socket.io';
import { CardData } from './card.js';
import { GameData, GameId } from './game.js';
import { PlayerData } from './player.js';

export interface IServerToClientEvents {
  playerData: (playerData: PlayerData) => void;
  gameData: (gameData: GameData) => void;
}

export interface IClientToServerEvents {
  gameCreate: ({ playerInputData: PlayerInputData }) => void;
  gameJoin: ({ gameId: GameId, playerInputData: PlayerInputData }) => void;
  gameStart: () => void;
  gameTurnPlay: (card: CardData) => void;
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
