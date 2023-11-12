import { PlayerId } from '@letssummondemons/common/definitions/game.js';
import { TurnData } from '@letssummondemons/common/definitions/turn.js';
import * as _ from 'lodash';
import { NoMorePlayersToPlayInTurnError } from './turn.errors.js';

export class Turn implements TurnData {
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

    const nextPlayer = this.getNextPlayer();
    if (!nextPlayer) {
      throw new NoMorePlayersToPlayInTurnError();
    }

    _.remove(this.remainingPlayers, (value) => value === nextPlayer);
    this.currentPlayer = nextPlayer;

    return this;
  }
}
