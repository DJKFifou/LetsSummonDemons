import {
  SACRIFICE_NEIGHBORS_COUNT_TO_INVOKE_DEMON,
  SOULS_COUNT_TO_BUY_NEIGHBOR_CARD,
} from '../../constants/game.js';
import {
  CardId,
  CardType,
  NeighborKindness,
  NeighborType,
} from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { PlayerId } from '../../contracts/player.js';
import { PlayerTurnData } from '../../contracts/turn.js';
import { Game } from '../game/game.js';
import {
  NotEnoughNeighborsProdivedToSummonDemonError,
  TooManyNeighborsProdivedToSummonDemonError,
} from '../player/player.errors.js';
import { Player } from '../player/player.js';
import {
  CannotBuyNeighborError,
  CannotChoosedCardError,
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
  protected bougthNeighbor: boolean;
  protected cardSelector?: PlayerId;
  protected shouldSelectCards: boolean;
  cardChoiceCountdown: number;
  protected cardIdSelected?: Array<CardId>;
  protected shouldSelectCardsFilter?: {
    numberCard?: number;
    rangeOfSelection?:
      | 'marketChoice'
      | 'opponentChoice'
      | 'selfChoice'
      | 'null';
    actionAwaited?:
      | 'draw'
      | 'replace'
      | 'steal'
      | 'pick'
      | 'sacrifice';
    type?: Array<CardType>;
    neighborType?: Array<NeighborType>;
    neighborKindness?: Array<NeighborKindness>;
  };
  protected playerChoosed?: boolean;
  protected instanceOfMarketCanBeReplaced? : Array<CardId>;

  constructor({ game, player }: PlayerTurnArgs) {
    this.game = game;
    this.player = player;
    this.player.resetBoysAndGirlsSoulsTokenCount();
    this.launchedDices = false;
    this.dicesResult = null;
    this.summonedDemon = false;
    this.bougthNeighbor = false;
    this.shouldSelectCards = false;
    this.cardChoiceCountdown = null;
    this.shouldSelectCardsFilter = {};
    this.cardIdSelected = [];
    this.instanceOfMarketCanBeReplaced = [];
    
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
          this.cardSelector = player.data.id;
          console.log('Card owner assigné ? :', this.data.cardSelector);
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

  async waitForCardSelection(numberOfCardAwaited): Promise<void> {
    const startTime = Date.now();
    this.cardChoiceCountdown = 30;

    while (
      (this.playerChoicesCardId.length < numberOfCardAwaited
      || this.canReplaceCard)
      && this.cardChoiceCountdown
      && this.cardChoiceCountdown > 0
    ) {
      this.cardChoiceCountdown = Math.round(
        30 - (Date.now() - startTime) / 1007,
      );
      this.game.emitDataToSockets();
      // Temporisation pour éviter une boucle infinie
      console.log("Temps restant : ", this.cardChoiceCountdown);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Attendre 1 seconde avant de vérifier à nouveau
    }
    if (this.playerChoicesCardId.length === numberOfCardAwaited) {
      this.playerChoosed = true;
    } else if (this.cardChoiceCountdown !== 0) {
      this.playerChoosed = false;
      throw new Error('Timeout: Card selection took too long.');
    }
    this.cardChoiceCountdown = null;
  }

  async cardSelectionRequired(
      game: Game,
      cardOwner : Player,
      numberOfCard : Number,
      rangeOfSelection : String,
      actionAwaited : String,
      type? : Array<CardType>,
      neighborType? : Array<NeighborType>,
      neighborKindness? : Array<NeighborKindness>
    ): Promise<Boolean> {

    let response = false;

    this.cleanShouldSelectCards();
    this.setShouldSelectCards(
      numberOfCard,
      rangeOfSelection,
      actionAwaited,
      type ? type : null,
      neighborType ? neighborType : null,
      neighborKindness ? neighborKindness : null,
    );

    game.emitDataToSockets();

    switch (actionAwaited)
    {
      case 'draw':
        if (rangeOfSelection == 'selfChoice')
        {
          try {
            await this.waitForCardSelection(numberOfCard);
            if(this.playerChoosed)
            {
              this.playerChoicesCardId.forEach(cardId => {
                cardOwner.removeNeighborCardById(cardId);
              });
              response = true;
            }
          } catch (error) {
            console.error(error);
          }
        }
        break;
      case 'replace':
        this.setShouldReplaceMarketCards();
        game.emitDataToSockets();
        try {
          await this.waitForCardSelection(numberOfCard);
        } catch (error) {
          console.error(error);
        }
        this.cleanShouldReplaceMarketCards();
        break;
      // case 'steal':
      //   await this.waitForSelection(numberOfCard);
      //   break;
      // case 'pick':
      //   await this.waitForSelection(numberOfCard);
      //   break;
      // case 'sacrifice':
      //   await this.waitForSelection(numberOfCard);
      //   break;
    }

    this.cleanShouldSelectCards();

    return response;

  }

  buyNeighbor(neighborCardId: CardId): void {
    if (!this.canBuyNeighbor) {
      throw new CannotBuyNeighborError();
    }

    this.game.neighborsDeck.buyCard(this.player, neighborCardId);

    this.bougthNeighbor = true;

    this.game.emitDataToSockets();
  }

   choosedCard(neighborCardId: CardId): void {
    if (this.canChoosedCard) {
      this.cardIdSelected.push(neighborCardId);
      
      if (this.shouldSelectCardsFilter.actionAwaited == 'replace') {
        this.game.neighborsDeck.replaceCard(neighborCardId);
      }

      this.game.emitDataToSockets();
    } else {
      throw new CannotChoosedCardError();
    }
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

  setShouldSelectCards(
    numberCard,
    rangeOfSelections,
    actionAwaited,
    cardTypeAwait,
    neighborTypeAwait?,
    neighborKindnessAwait?,
  ): void {
    this.shouldSelectCards = true;
    this.data.shouldSelectCardsFilter.numberCard = numberCard;
    this.data.shouldSelectCardsFilter.rangeOfSelection = rangeOfSelections;
    this.data.shouldSelectCardsFilter.actionAwaited = actionAwaited;
    this.data.shouldSelectCardsFilter.type = cardTypeAwait;
    this.data.shouldSelectCardsFilter.neighborType = neighborTypeAwait;
    this.data.shouldSelectCardsFilter.neighborKindness = neighborKindnessAwait;
  }

  setShouldReplaceMarketCards(): void {
    this.instanceOfMarketCanBeReplaced = [];
    for (const item of this.game.data.neighborsDeck.market) {
      this.instanceOfMarketCanBeReplaced.push(item.id);
    }
    console.log(this.instanceOfMarketCanBeReplaced);
  }

  cleanShouldReplaceMarketCards(): void {
    this.instanceOfMarketCanBeReplaced = [];
    this.playerChoosed = false;
    this.playerChoicesCardId.length = 0;
  }

  cleanShouldSelectCards(): void {
    this.shouldSelectCards = false;
    this.data.shouldSelectCardsFilter.numberCard = null;
    this.data.shouldSelectCardsFilter.rangeOfSelection = null;
    this.data.shouldSelectCardsFilter.actionAwaited = null;
    this.data.shouldSelectCardsFilter.type = null;
    this.data.shouldSelectCardsFilter.neighborType = null;
    this.data.shouldSelectCardsFilter.neighborKindness = null;
    this.playerChoicesCardId.length = 0;
    this.playerChoosed = false;
  }

  get canLaunchDices(): boolean {
    return !this.launchedDices;
  }

  get canBuyNeighbor(): boolean {
    return (
      !this.bougthNeighbor &&
      this.player.data.soulsTokenCount >= SOULS_COUNT_TO_BUY_NEIGHBOR_CARD
    );
  }

  get playerChoicesCardId(): Array<CardId> {
    return this.cardIdSelected;
  }

  get canChoosedCard(): boolean {
    return (
      this.shouldSelectCards &&
      this.cardIdSelected.length < this.shouldSelectCardsFilter.numberCard
    );
  }

  get canReplaceCard(): boolean {
    return (
      this.shouldSelectCardsFilter.actionAwaited == 'replace' &&
      this.cardIdSelected.length < this.instanceOfMarketCanBeReplaced.length
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
    return this.launchedDices && !this.shouldSelectCards;
  }

  get data(): PlayerTurnData {
    return {
      player: this.player.data,
      launchedDices: this.launchedDices,
      dicesResult: this.dicesResult,
      summonedDemon: this.summonedDemon,
      bougthNeighbor: this.bougthNeighbor,
      canEndTurn: this.canEndTurn,
      canBuyNeighbor: this.canBuyNeighbor,
      canChoosedCard: this.canChoosedCard,
      canReplaceCard: this.canReplaceCard,
      canSummonDemon: this.canSummonDemon,
      canLaunchDices: this.canLaunchDices,
      cardSelector: this.cardSelector,
      shouldSelectCards: this.shouldSelectCards,
      cardChoiceCountdown: this.cardChoiceCountdown,
      shouldSelectCardsFilter: this.shouldSelectCardsFilter,
      playerChoosed: this.playerChoosed,
      instanceOfMarketCanBeReplaced: this.instanceOfMarketCanBeReplaced,
    };
  }
}
