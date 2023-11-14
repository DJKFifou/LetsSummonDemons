import { EntityClass } from '../../contracts/entities.js';
import { PlayerId } from '../../contracts/player.js';
import { TurnData, TurnPlayerData } from '../../contracts/turn.js';
import {
  AlreadyBoughtNeighborInTurnError,
  AlreadyInvokedDemonInTurnError,
  AlreadyLaunchedDicesInTurnError,
  NeedToLaunchDicesInTurnError,
  NoMorePlayersToPlayInTurnError,
} from './turn.errors.js';

export class Turn implements EntityClass<TurnData> {
  protected playedPlayers: Array<PlayerId>;
  protected currentPlayer: TurnPlayerData;
  protected remainingPlayers: Array<PlayerId>;

  constructor(playerIds: Array<PlayerId>) {
    this.playedPlayers = [];
    this.currentPlayer = null;
    this.remainingPlayers = [...playerIds];

    this.nextPlayerTurn();
  }

  launchDices(): void {
    if (this.currentPlayer.launchedDices) {
      throw new AlreadyLaunchedDicesInTurnError();
    }
    this.currentPlayer.launchedDices = true;
  }

  buyNeighbor(): void {
    if (this.currentPlayer.bougthNeighbor) {
      throw new AlreadyBoughtNeighborInTurnError();
    }
    this.currentPlayer.bougthNeighbor = true;
  }

  invokeDemon(): void {
    if (this.currentPlayer.invokedDemon) {
      throw new AlreadyInvokedDemonInTurnError();
    }
    this.currentPlayer.invokedDemon = true;
  }

  endTurn(): void {
    if (!this.currentPlayer.launchedDices) {
      throw new NeedToLaunchDicesInTurnError();
    }

    this.nextPlayerTurn();
  }

  protected nextPlayerTurn(): Turn {
    if (this.currentPlayer) {
      this.playedPlayers.push(this.currentPlayer.id);
    }

    const nextPlayerId = this.getNextPlayerId();
    if (!nextPlayerId) {
      throw new NoMorePlayersToPlayInTurnError();
    }

    this.remainingPlayers = this.remainingPlayers.filter(
      (id) => id !== nextPlayerId,
    );
    this.currentPlayer = {
      id: nextPlayerId,
      launchedDices: false,
      invokedDemon: false,
      bougthNeighbor: false,
    };

    return this;
  }

  protected getNextPlayerId(): PlayerId | null {
    return this.remainingPlayers[0] ?? null;
  }

  getData(): TurnData {
    return {
      playedPlayers: this.playedPlayers,
      currentPlayer: this.currentPlayer,
      remainingPlayers: this.remainingPlayers,
    };
  }
}
