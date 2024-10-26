import { Server, Socket } from 'socket.io';
import { CardId } from './card.js';
import { GameData, GameId } from './game.js';
import { PlayerId } from './player.js';

export interface IServerToClientEvents {
  gameData: (gameData: GameData) => void;
  playerId: (playerId: PlayerId) => void;
}

export interface IClientToServerEvents {
  gameCreate: ({ playerInputData: PlayerInputData }) => void;
  gameJoin: ({ gameId: GameId, playerInputData: PlayerInputData }) => void;
  gameStart: () => void;
  turnLaunchDices: () => void;
  testDices: (number: number) => void;
  turnBuyNeighbor: (neighborCardId: CardId) => void;
  turnChoosedCard: (neighborCardId: CardId) => void;
  stopCardReplacement: () => void;
  drawCardAndActiveIt: (neighborCardId: CardId) => void;
  turnInvokeDemon: ({
    demonCardId,
    neighborsSacrifiedIds,
  }: {
    demonCardId: CardId;
    neighborsSacrifiedIds: Array<CardId>;
  }) => void;
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
