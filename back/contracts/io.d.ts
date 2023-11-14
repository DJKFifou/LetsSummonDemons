import { Server, Socket } from 'socket.io';
import { CardData } from './card.js';
import { GameData, GameId } from './game.js';
import { PlayerData, PlayerInputData } from './player.js';

export interface IServerToClientEvents {
  playerData: (playerData: PlayerData) => void;
  gameData: (gameData: GameData) => void;
}

export interface IClientToServerEvents {
  gameCreate: (player: PlayerInputData) => void;
  gameJoin: (gameId: GameId, player: PlayerInputData) => void;
  gameTurnPlay: (card: CardData) => void;
}

export interface IServerToServerEvents {}

export interface ISocketSessionData {
  player?: PlayerData;
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
