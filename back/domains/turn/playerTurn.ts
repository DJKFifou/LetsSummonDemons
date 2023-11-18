import {
  SACRIFICE_NEIGHBORS_COUNT_TO_INVOKE_DEMON,
  SOULS_COUNT_TO_BUY_NEIGHBOR_CARD,
} from '../../constants/game.js';
import { CardId } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { PlayerTurnData } from '../../contracts/turn.js';
import { Game } from '../game/game.js';
import {
  NotEnoughNeighborsProdivedToSummonDemonError,
  TooManyNeighborsProdivedToSummonDemonError,
} from '../player/player.errors.js';
import { Player } from '../player/player.js';
import {
  CannotBuyNeighborError,
  CannotLaunchDicesError,
  CannotSummonDemonError,
} from './turn.errors.js';

export interface PlayerTurnArgs {
  game: Game;
  player: Player;
}

export class PlayerTurn implements EntityClass<PlayerTurnData> {
  protected game: Game;
  player: Player;
  protected launchedDices: boolean;
  protected dicesResult?: number;
  protected summonedDemon: boolean;
  protected bougthNeighbor: boolean;

  constructor({ game, player }: PlayerTurnArgs) {
    this.game = game;
    this.player = player;
    this.launchedDices = false;
    this.dicesResult = null;
    this.summonedDemon = false;
    this.bougthNeighbor = false;
  }

  launchDices(): void {
    if (!this.canLaunchDices) {
      throw new CannotLaunchDicesError();
    }
    this.launchedDices = true;

    let dicesResult = 0;
    this.game.dices.forEach((dice) => {
      dicesResult += dice.launch();
    });
    this.dicesResult = dicesResult;
    this.game.emitDataToSockets();

    this.diceListening(this.dicesResult);
  }

  protected diceListening(dicesResult: number): void {
    this.game.getPlayerList().forEach((player) => {
      player.getNeighborCards().forEach((neighborCard) => {
        if (!neighborCard.isActivatedByNumber(dicesResult)) {
          return;
        }

        neighborCard.activate({
          game: this.game,
          player: player,
        });
      });
    });

    this.player.getSummonedDemonCards().forEach((demonCard) => {
      if (!demonCard.isActivatedByNumber(dicesResult)) {
        return;
      }

      demonCard.activate({
        game: this.game,
        player: this.player,
      });
    });
  }

  buyNeighbor(neighborCardId: CardId): void {
    if (!this.canBuyNeighbor) {
      throw new CannotBuyNeighborError();
    }

    this.game.neighborsDeck.buyCard(this.player, neighborCardId);

    this.bougthNeighbor = true;

    this.game.emitDataToSockets();
  }

  summonDemon(demonCardId: CardId, neighborsSacrifiedIds: Array<CardId>): void {
    if (!this.canSummonDemon) {
      throw new CannotSummonDemonError();
    }

    if (
      neighborsSacrifiedIds.length < SACRIFICE_NEIGHBORS_COUNT_TO_INVOKE_DEMON
    ) {
      throw new NotEnoughNeighborsProdivedToSummonDemonError();
    }

    if (
      neighborsSacrifiedIds.length > SACRIFICE_NEIGHBORS_COUNT_TO_INVOKE_DEMON
    ) {
      throw new TooManyNeighborsProdivedToSummonDemonError();
    }

    neighborsSacrifiedIds.forEach((neighborId) => {
      this.player.removeNeighborCardById(neighborId);
    });

    const summonedCard = this.player.removeCoveredDemonCardById(demonCardId);
    this.player.addSummonedDemonCard(summonedCard);

    this.summonedDemon = true;

    this.game.emitDataToSockets();
  }

  get canLaunchDices(): boolean {
    return !this.launchedDices;
  }

  get canBuyNeighbor(): boolean {
    return (
      !this.bougthNeighbor &&
      this.player.getData().soulsTokenCount >= SOULS_COUNT_TO_BUY_NEIGHBOR_CARD
    );
  }

  get canSummonDemon(): boolean {
    return (
      !this.summonedDemon &&
      this.player.getCoveredDemonCards().length &&
      this.player.getNeighborCards().length >=
        SACRIFICE_NEIGHBORS_COUNT_TO_INVOKE_DEMON
    );
  }

  get canEndTurn(): boolean {
    return this.launchedDices;
  }

  getData(): PlayerTurnData {
    return {
      player: this.player.getData(),
      launchedDices: this.launchedDices,
      dicesResult: this.dicesResult,
      summonedDemon: this.summonedDemon,
      bougthNeighbor: this.bougthNeighbor,
      canEndTurn: this.canEndTurn,
      canBuyNeighbor: this.canBuyNeighbor,
      canSummonDemon: this.canSummonDemon,
      canLaunchDices: this.canLaunchDices,
      shouldSelectCards: false,
      shouldSelectCardsFilter: null,
    };
  }
}
