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
  protected resetBoysAndGirlsSoulsTokenCount: number;
  protected summonedDemon: boolean;
  protected boughtNeighbor: boolean;

  constructor({ game, player }: PlayerTurnArgs) {
    this.game = game;
    this.player = player;
    this.player.resetBoysAndGirlsSoulsTokenCount();
    this.launchedDices = false;
    this.dicesResult = null;
    this.summonedDemon = false;
    this.boughtNeighbor = false;
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

    this.activateCards(this.dicesResult);
  }

  testDices(number): void {
    if (!this.canLaunchDices) {
      throw new CannotLaunchDicesError();
    }
    this.launchedDices = true;

    this.dicesResult = number;
    this.game.emitDataToSockets();

    this.activateCards(this.dicesResult);
  }

  protected async activateCards(dicesResult: number): Promise<void> {
    for await (const player of this.game.turn?.playerListFromCurrent ?? []) {
      player.resetBoysAndGirlsSoulsTokenCount();
      for await (const neighborCard of player.getNeighborCards()) {
        if (
          neighborCard.isActivatedByNumber(dicesResult) &&
          neighborCard.data.isActivable
        ) {
          await neighborCard.activate({
            game: this.game,
            cardOwner: player,
          });
        }
      }

      const candleCard = player.getCandleCard();
      if (candleCard.isActivatedByNumber(dicesResult)) {
        candleCard.activate({
          game: this.game,
          cardOwner: player,
        });
      }
    }

    for await (const demonCard of this.player.getSummonedDemonCards()) {
      if (!demonCard.isActivatedByNumber(dicesResult)) {
        return;
      }

      await demonCard.activate({
        game: this.game,
        cardOwner: this.player,
      });
    }
  }

  buyNeighbor(neighborCardId: CardId): void {
    if (!this.canBuyNeighbor) {
      throw new CannotBuyNeighborError();
    }

    this.game.neighborsDeck.buyCard(this.player, neighborCardId);

    this.boughtNeighbor = true;

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

    this.player.uncoverDemonCard(demonCardId);

    this.summonedDemon = true;

    this.game.emitDataToSockets();
  }

  get canLaunchDices(): boolean {
    return !this.launchedDices;
  }

  get canBuyNeighbor(): boolean {
    return (
      !this.boughtNeighbor &&
      this.player.data.soulsTokenCount >= SOULS_COUNT_TO_BUY_NEIGHBOR_CARD
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

  get data(): PlayerTurnData {
    return {
      player: this.player.data,
      launchedDices: this.launchedDices,
      dicesResult: this.dicesResult,
      summonedDemon: this.summonedDemon,
      boughtNeighbor: this.boughtNeighbor,
      canEndTurn: this.canEndTurn,
      canBuyNeighbor: this.canBuyNeighbor,
      canSummonDemon: this.canSummonDemon,
      canLaunchDices: this.canLaunchDices,
      shouldSelectCards: false,
      shouldSelectCardsFilter: null,
    };
  }
}
