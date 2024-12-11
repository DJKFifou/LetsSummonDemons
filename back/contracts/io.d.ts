import { Server, Socket } from 'socket.io';
import { CardId } from './card.js';
import { GameData, GameId } from './game.js';
import { PlayerId } from './player.js';

export interface IServerToClientEvents {
  gameData: (gameData: GameData) => void;
  playerId: (playerId: PlayerId) => void;
  hostId: (playerId: PlayerId) => void;
  playersReadyUpdate: (playerIds: Array<PlayerId>) => void;
  gameChatMessage: (gameChat: Array<ChatMessage>) => void;
}

export interface IClientToServerEvents {
  gameCreate: ({ playerInputData: PlayerInputData }) => void;
  gameJoin: ({ gameId: GameId, playerInputData: PlayerInputData }) => void;
  deckShow: () => void;
  playerReady: () => void;
  chatMessage: (message: string) => void;
  turnLaunchDices: () => void;
  testDices: (number: number) => void;
  testGiveCard: (CardId: CardId) => void;
  turnBuyNeighbor: (neighborCardId: CardId) => void;
  turnChoosedCard: (neighborCardId: CardId) => void;
  stopCardAction: () => void;
  turnChoosedPlayer: (playerId: PlayerId) => void;
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
  hostId?: GameId;
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

export interface ChatMessage {
  playerName: string;
  message: string;
}