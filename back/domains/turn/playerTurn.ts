import { CardId } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { PlayerTurnData } from '../../contracts/turn.js';
import { DemonCard } from '../demon/demon.js';
import { Game } from '../game/game.js';
import { Player } from '../player/player.js';
import {
  AlreadyBoughtNeighborInTurnError,
  AlreadyInvokedDemonInTurnError,
  AlreadyLaunchedDicesInTurnError,
} from './turn.errors.js';
import { Turn } from './turn.js';

interface PlayerTurnArgs {
  game: Game;
  turn: Turn;
  player: Player;
}
export class PlayerTurn implements EntityClass<PlayerTurnData> {
  protected game: Game;
  protected turn: Turn;
  player: Player;
  protected launchedDices: boolean;
  protected dicesResult?: number;
  protected invokedDemon: boolean;
  protected bougthNeighbor: boolean;

  constructor({ game, turn, player }: PlayerTurnArgs) {
    this.game = game;
    this.turn = turn;
    this.player = player;
    this.launchedDices = false;
    this.dicesResult = null;
    this.invokedDemon = false;
    this.bougthNeighbor = false;
  }

  launchDices(): void {
    if (this.launchedDices) {
      throw new AlreadyLaunchedDicesInTurnError();
    }
    this.launchedDices = true;

    let dicesResult = 0;
    this.game.dices.forEach((dice) => {
      dice.launch();
      dicesResult += dice.getData().result;
    });
    this.dicesResult = dicesResult;

    this.game.emitDataToSockets();
  }

  buyNeighbor(neighborCardId: CardId): void {
    if (this.bougthNeighbor) {
      throw new AlreadyBoughtNeighborInTurnError();
    }

    this.game.neighborsDeck.buyCard(this.player, neighborCardId);

    this.bougthNeighbor = true;

    this.game.emitDataToSockets();
  }

  invokeDemon(demonCard: DemonCard): void {
    if (this.invokedDemon) {
      throw new AlreadyInvokedDemonInTurnError();
    }

    this.player.removeCoveredDemonCardById(demonCard.getData().id);
    this.player.addSummonedDemonCard(demonCard);

    this.invokedDemon = true;

    this.game.emitDataToSockets();
  }

  getData(): PlayerTurnData {
    return {
      player: this.player.getData(),
      launchedDices: this.launchedDices,
      dicesResult: this.dicesResult,
      invokedDemon: this.invokedDemon,
      bougthNeighbor: this.bougthNeighbor,
    };
  }
}
