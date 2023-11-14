import { EntityClass } from '../../contracts/entities.js';
import { PlayerId } from '../../contracts/player.js';
import { TurnData } from '../../contracts/turn.js';
import { NoMorePlayersToPlayInTurnError } from './turn.errors.js';

export class Turn implements EntityClass<TurnData> {
  playedPlayers: Array<PlayerId>;
  currentPlayer: PlayerId;
  remainingPlayers: Array<PlayerId>;

  constructor(playerIds: Array<PlayerId>) {
    this.playedPlayers = [];
    this.currentPlayer = null;
    this.remainingPlayers = [...playerIds];

    this.nextPlayerToPlay();
  }

  private getNextPlayer(): PlayerId | null {
    return this.remainingPlayers[0] ?? null;
  }

  nextPlayerToPlay(): Turn {
    if (this.currentPlayer) {
      this.playedPlayers.push(this.currentPlayer);
    }

    const nextPlayerId = this.getNextPlayer();
    if (!nextPlayerId) {
      throw new NoMorePlayersToPlayInTurnError();
    }

    this.remainingPlayers = this.remainingPlayers.filter(
      (playerId) => playerId !== nextPlayerId,
    );
    this.currentPlayer = nextPlayerId;

    return this;
  }

  getData(): TurnData {
    return {
      playedPlayers: this.playedPlayers,
      currentPlayer: this.currentPlayer,
      remainingPlayers: this.remainingPlayers,
    };
  }
}
