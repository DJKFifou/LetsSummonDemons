import { RULE_TO_WIN } from '../../constants/game.js';
import { CardId } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { PlayerId } from '../../contracts/player.js';
import { TurnData } from '../../contracts/turn.js';
import { Game } from '../game/game.js';
import { Player } from '../player/player.js';
import { BotTurn } from './botTurn.js';
import { PlayerTurn } from './playerTurn.js';
import { CannotEndTurnError } from './turn.errors.js';

export class Turn implements EntityClass<TurnData> {
  protected game: Game;

  protected played: Array<PlayerId>;
  current: PlayerTurn;
  protected remaining: Array<PlayerId>;

  constructor(game: Game) {
    this.game = game;

    this.played = [];
    this.current = null;
    this.remaining = game.getData().players.map((player) => player.id);

    this.nextPlayer();
  }

  launchDices(): void {
    this.current.launchDices();
  }

  buyNeighbor(neighborCardId: CardId): void {
    this.current.buyNeighbor(neighborCardId);
  }

  summonDemon(demonCardId: CardId, neighborsSacrifiedIds: Array<CardId>): void {
    this.current.summonDemon(demonCardId, neighborsSacrifiedIds);
  }

  endTurn(): void {
    if (!this.current.canEndTurn) {
      throw new CannotEndTurnError();
    }

    if (this.checkWin()) {
      this.game.end(this.current.getData().player);
    } else {
      this.nextPlayer();

      this.game.emitDataToSockets();
    }
  }

  protected checkWin(): boolean {
    const currentPlayerData = this.current.getData().player;

    return (
      currentPlayerData.summonedDemonsCards.length >=
        RULE_TO_WIN.MIN_DEMONS_INVOCATED &&
      currentPlayerData.soulsTokenCount >= RULE_TO_WIN.MIN_SOUL
    );
  }

  protected nextPlayer(): void {
    if (this.current) {
      this.played.push(this.current.getData().player.id);
    }

    const newCurrentPlayer = this.getNextPlayer();
    if (!newCurrentPlayer) {
      this.game.nextTurn();
      return;
    }

    this.remaining = this.remaining.filter(
      (id) => id !== newCurrentPlayer.getData().id,
    );

    const turnClass = newCurrentPlayer.getData().isBot ? BotTurn : PlayerTurn;

    this.current = new turnClass({
      game: this.game,
      player: newCurrentPlayer,
    });
  }

  protected getNextPlayer(): Player | null {
    const nextPlayerId = this.remaining[0] ?? null;

    return this.game.getPlayerById(nextPlayerId);
  }

  get playerListFromCurrent(): Array<Player> {
    const playerList = this.game.getPlayerList();
    const indexOfCurrent = playerList.findIndex(
      (player) => player.getData().id === this.current.player.getData().id,
    );

    return [
      ...playerList.slice(indexOfCurrent),
      ...playerList.slice(0, indexOfCurrent),
    ];
  }

  getData(): TurnData {
    return {
      played: this.played,
      current: this.current.getData(),
      remaining: this.remaining,
    };
  }
}
