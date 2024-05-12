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
    this.remaining = game.data.players.map((player) => player.id);

    this.nextPlayer();
  }

  launchDices(): void {
    this.current.launchDices();
  }

  testDices(number): void {
    this.current.testDices(number);
  }

  buyNeighbor(neighborCardId: CardId): void {
    this.current.buyNeighbor(neighborCardId);
  }

  choosedCard(neighborCardId: CardId): void {
    this.current.choosedCard(neighborCardId);
  }

  summonDemon(demonCardId: CardId, neighborsSacrifiedIds: Array<CardId>): void {
    this.current.summonDemon(demonCardId, neighborsSacrifiedIds);
  }

  endTurn(): void {
    if (!this.current.canEndTurn) {
      throw new CannotEndTurnError();
    }

    this.game.playerList.forEach((player) => {
      player.getNeighborCards().forEach((neighborCard) => {
        neighborCard.isActivableSetter();
      });
    });

    if (this.checkWin()) {
      this.game.end(this.current.data.player);
    } else {
      this.nextPlayer();

      this.game.emitDataToSockets();
    }
  }

  protected checkWin(): boolean {
    const currentPlayerData = this.current.data.player;

    return (
      currentPlayerData.summonedDemonsCards.length >=
        currentPlayerData.minDemonsInvocatedForWin &&
      currentPlayerData.soulsTokenCount >= RULE_TO_WIN.MIN_SOUL
    );
  }

  protected nextPlayer(): void {
    if (this.current) {
      this.played.push(this.current.data.player.id);
    }

    const newCurrentPlayer = this.getNextPlayer();
    if (!newCurrentPlayer) {
      this.game.nextTurn();
      return;
    }

    this.remaining = this.remaining.filter(
      (id) => id !== newCurrentPlayer.data.id,
    );

    const turnClass = newCurrentPlayer.data.isBot ? BotTurn : PlayerTurn;

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
    const playerList = this.game.playerList;
    const indexOfCurrent = playerList.findIndex(
      (player) => player.data.id === this.current.player.data.id,
    );

    return [
      ...playerList.slice(indexOfCurrent),
      ...playerList.slice(0, indexOfCurrent),
    ];
  }

  get data(): TurnData {
    return {
      played: this.played,
      current: this.current.data,
      remaining: this.remaining,
    };
  }
}
