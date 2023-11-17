import { PlayerTurn, PlayerTurnArgs } from './playerTurn.js';

export class BotTurn extends PlayerTurn {
  constructor({ game, player }: PlayerTurnArgs) {
    super({ game, player });

    setTimeout(() => {
      this.launchDices();
      this.game.turn.endTurn();
    }, 500);
  }
}
