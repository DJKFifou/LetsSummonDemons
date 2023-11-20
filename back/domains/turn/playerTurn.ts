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

    this.activateCards(this.dicesResult);
  }

  protected async activateCards(dicesResult: number): Promise<void> {
    for await (const player of this.game.turn?.playerListFromCurrent ?? []) {
      for await (const neighborCard of player.getNeighborCards()) {
        if (
          neighborCard.isActivatedByNumber(dicesResult) &&
          neighborCard.getData().isActivable
        ) {
          await neighborCard.activate({
            game: this.game,
            player: this.player,
          });
        }
      }

      const candleCard = player.getCandleCard();
      if (candleCard.isActivatedByNumber(dicesResult)) {
        candleCard.activate({
          game: this.game,
          player: this.player,
        });
      }
    }

    for await (const demonCard of this.player.getSummonedDemonCards()) {
      if (!demonCard.isActivatedByNumber(dicesResult)) {
        return;
      }

      await demonCard.activate({
        game: this.game,
        player: this.player,
      });
    }
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

    this.player.uncoveredDemonCard(demonCardId);

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
