import { RULE_TO_WIN } from '../../constants/game.js';
import { EntityClass } from '../../contracts/entities.js';
import { PlayerData, PlayerId } from '../../contracts/player.js';
import { TurnData, TurnPlayerData } from '../../contracts/turn.js';
import { Game } from '../game/game.js';
import {
  AlreadyBoughtNeighborInTurnError,
  AlreadyInvokedDemonInTurnError,
  AlreadyLaunchedDicesInTurnError,
  NeedToLaunchDicesInTurnError,
  NoMorePlayersToPlayInTurnError,
} from './turn.errors.js';

export class Turn implements EntityClass<TurnData> {
  protected game: Game;

  protected played: Array<PlayerId>;
  protected current: TurnPlayerData;
  protected remaining: Array<PlayerId>;

  constructor(game: Game) {
    this.game = game;

    this.played = [];
    this.current = null;
    this.remaining = game.getData().players.map((player) => player.id);

    this.nextPlayer();
  }

  launchDices(): void {
    if (this.current.launchedDices) {
      throw new AlreadyLaunchedDicesInTurnError();
    }
    this.current.launchedDices = true;
  }

  buyNeighbor(): void {
    if (this.current.bougthNeighbor) {
      throw new AlreadyBoughtNeighborInTurnError();
    }
    this.current.bougthNeighbor = true;
  }

  invokeDemon(): void {
    if (this.current.invokedDemon) {
      throw new AlreadyInvokedDemonInTurnError();
    }
    this.current.invokedDemon = true;
  }

  endTurn(): void {
    if (!this.current.launchedDices) {
      throw new NeedToLaunchDicesInTurnError();
    }

    if (this.checkWin()) {
      this.game.end();
    } else {
      this.nextPlayer();
    }
  }

  checkWin(): boolean {
    const currentPlayer = this.current.player;

    return (
      currentPlayer.summonedDemonsCards.length >=
        RULE_TO_WIN.MIN_DEMONS_INVOCATED ||
      currentPlayer.soulsTokenCount >= RULE_TO_WIN.MIN_SOUL
    );
  }

  protected nextPlayer(): void {
    if (this.current) {
      this.played.push(this.current.player.id);
    }

    const newCurrentPlayer = this.getNextPlayer();
    if (!newCurrentPlayer) {
      throw new NoMorePlayersToPlayInTurnError();
    }

    this.remaining = this.remaining.filter((id) => id !== newCurrentPlayer.id);
    this.current = {
      player: newCurrentPlayer,
      launchedDices: false,
      invokedDemon: false,
      bougthNeighbor: false,
    };
  }

  protected getNextPlayer(): PlayerData | null {
    const nextPlayerId = this.remaining[0] ?? null;

    return this.game
      .getData()
      .players.find((player) => player.id === nextPlayerId);
  }

  getData(): TurnData {
    return {
      played: this.played,
      current: this.current,
      remaining: this.remaining,
    };
  }
}
