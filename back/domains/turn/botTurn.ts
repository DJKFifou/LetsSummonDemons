import { PlayerTurn, PlayerTurnArgs } from './playerTurn.js';

export class BotTurn extends PlayerTurn {
  constructor({ game, turn, player }: PlayerTurnArgs) {
    super({ game, turn, player });

    setTimeout(() => {
      this.launchDices();
      this.turn.endTurn();
    }, 500);
  }
}
