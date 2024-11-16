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
  CannotChoosedPlayerError,
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
  protected shouldSelectPlayers: boolean;
  choiceCountdown: number;
  protected cardIdSelected?: Array<CardId>;
  protected playerIdSelected?: PlayerId;
  protected shouldSelectFilter?: {
    choiceType?:
      | 'card'
      | 'player';
    number?: number;
    rangeOfSelection?: Array<
      | 'marketChoice'
      | 'opponentChoice'
      | 'selfChoice'
      | 'null'>;
    actionAwaited?:
      | 'discard'
      | 'replace'
      | 'steal'
      | 'pick'
      | 'sacrifice'
      | 'active'
      | 'give';
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
    this.choiceCountdown = null;
    this.shouldSelectFilter = {};
    this.cardIdSelected = [];
    this.instanceOfMarketCanBeReplaced = [];
    this.shouldSelectPlayers = null;
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

  async timer (startTime : number): Promise<void> {
    this.choiceCountdown = Math.round(
      30 - (Date.now() - startTime) / 1007,
    );
    this.game.emitDataToSockets();
    // Temporisation pour éviter une boucle infinie
    console.log("Temps restant : ", this.choiceCountdown);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Attendre 1 seconde avant de vérifier à nouveau
  }

  async waitForCardSelection(numberOfCardAwaited): Promise<void> {
    this.choiceCountdown = 30;
    const startTime = Date.now();

    while (
      (this.playerChoicesCardId.length < numberOfCardAwaited
      || this.canReplaceCard)
      && this.choiceCountdown
      && this.choiceCountdown > 0
    ) {
      await this.timer(startTime);
    }
    if (this.playerChoicesCardId.length === numberOfCardAwaited) {
      this.playerChoosed = true;
    } else if (this.choiceCountdown !== 0) {
      this.playerChoosed = false;
      throw new Error('Timeout: Card selection took too long.');
    }
    this.choiceCountdown = null;
  }

  async waitForPlayerSelection(): Promise<PlayerId> {
    const startTime = Date.now();
    this.choiceCountdown = 30;
    let playerId = null;

    while (
      this.shouldSelectPlayers &&
      !this.playerIdSelected &&
      this.choiceCountdown > 0
    ) {
      await this.timer(startTime);
    }
    if (this.playerIdSelected) {
      playerId = this.playerIdSelected;
      this.playerChoosed = true;
    } else if (this.choiceCountdown !== 0) {
      this.playerChoosed = false;
      throw new Error('Timeout: Selection took too long.');
    }
    this.choiceCountdown = null;
    return playerId;
  }

  async selectionRequired(
      cardOwner : Player,
      choiceType : 'card' | 'player',
      choiceNumber : number,
      rangeOfSelection : Array<String>,
      actionAwaited : String,
      type? : Array<CardType>,
      neighborType? : Array<NeighborType>,
      neighborKindness? : Array<NeighborKindness>
    ): Promise<Boolean> {

    let response = false;

    if(choiceType == 'card') {
      
      this.cleanShouldSelectCards();
      this.setShouldSelectCards(
        choiceType,
        choiceNumber,
        rangeOfSelection,
        actionAwaited,
        type ? type : null,
        neighborType ? neighborType : null,
        neighborKindness ? neighborKindness : null,
      );

      this.game.emitDataToSockets();

      switch (actionAwaited)
      {
        case 'discard':
          if (rangeOfSelection.includes('selfChoice'))
          {
            try {
              await this.waitForCardSelection(choiceNumber);
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
          } else if (rangeOfSelection.includes('opponentChoice')) 
          {
            try {
              await this.waitForCardSelection(choiceNumber);
              if(this.playerChoosed)
              {
                this.playerChoicesCardId.forEach(cardId => {
                    this.getCardOwnerById(cardId).removeNeighborCardById(cardId);
                  });
                response = true;
              }
            } catch (error) {
              console.log("Player didn't make choice", error);
              console.error(error);
            }
          }
          break;
        case 'replace':
          this.setShouldReplaceMarketCards();
          this.game.emitDataToSockets();
          try {
            await this.waitForCardSelection(choiceNumber);
          } catch (error) {
            console.log("Player didn't make choice", error);
            console.error(error);
          }
          this.cleanShouldReplaceMarketCards();
          break;
        case 'steal':
          try {
              await this.waitForCardSelection(choiceNumber);
              if (this.playerChoosed) {
                  this.playerChoicesCardId.forEach(cardId => {
                    console.log('cardId :', cardId);
                    console.log('this.getCardOwnerById(cardId) :', this.getCardOwnerById(cardId));
                      if (this.getCardOwnerById(cardId) == null) {
                          this.game.neighborsDeck.giveCard(cardOwner, cardId);
                      }
                      else {
                          const cardOwnerOpponent = this.getCardOwnerById(cardId);
                          console.log('Player owner of the card returned is :', cardOwnerOpponent);
                          const card = cardOwnerOpponent.getNeighborCardById(cardId);
                          cardOwnerOpponent.removeNeighborCardById(cardId);
                          cardOwner.addNeighborCard(card);
                      }
                  });
                  response = true;
              }
          }
          catch (error) {
            console.log("Player didn't make choice", error);
            console.error(error);
          }
          break;
        case 'pick':
          try {
            await this.waitForCardSelection(choiceNumber);
            if (this.playerChoosed) {
              this.playerChoicesCardId.forEach(cardId => {
                this.game.neighborsDeck.giveCard(cardOwner, cardId);
              });
              response = true;
            }
          }
          catch (error) {
            console.log("Player didn't make choice", error);
            console.error(error);
          }
          break;
        case 'sacrifice':
          try {
            await this.waitForCardSelection(choiceNumber);
            if (this.playerChoosed) {
              this.playerChoicesCardId.forEach(cardId => {
                cardOwner.removeNeighborCardById(cardId);
              });
              response = true;
            }
          } catch (error) {
            console.log("Player didn't make choice", error);
            console.error(error);
          }
          break;
        case 'active':
          try {
            console.log('this.shouldSelectFilter :', this.shouldSelectFilter);
            await this.waitForCardSelection(choiceNumber);
            if (this.playerChoosed) {
              this.playerChoicesCardId.forEach(cardId => {
                const card = cardOwner.getNeighborCardById(cardId);
                card.data.isActivable = false;
                card.activate({
                  game: this.game,
                  cardOwner: cardOwner,
                });
              });
              response = true;
            }
          } catch (error) {
            console.log("Player didn't make choice", error);
            console.error(error);
          }
          this.cleanShouldReplaceMarketCards();
          break;
      }

    } else if(choiceType == 'player') {

      this.cleanShouldSelectPlayers();
      this.setShouldSelectPlayers(
        choiceType,
        choiceNumber,
        rangeOfSelection,
        actionAwaited,
      );
      this.game.emitDataToSockets();

      switch (actionAwaited) {
        case 'steal':
          try {
            const targetId : PlayerId = await this.waitForPlayerSelection();
            if (this.playerChoosed) {
              console.log('target :', targetId);
              if(targetId !== 'market') {
                this.game.getPlayerById(targetId).removeSoulToken(choiceNumber);
              }
              console.log('choiceNumber :', choiceNumber);
              cardOwner.addSoulToken(choiceNumber);
              response = true;
            }
          } catch (error) {
            console.log("Player didn't make choice", error);
            console.error(error);
          }
          break;
        case 'give':
          try {
            const targetId : PlayerId = await this.waitForPlayerSelection();
            if (this.playerChoosed) {
              this.game.getPlayerById(targetId).addSoulToken(choiceNumber);
              response = true;
            }
          } catch (error) {
            console.log("Player didn't make choice", error);
            console.error(error);
          }
          break;
      }
    }

    this.cleanShouldSelectPlayers();
    this.cleanShouldSelectCards();

    this.game.emitDataToSockets();
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
      
      if (this.shouldSelectFilter.actionAwaited == 'replace') {
        this.game.neighborsDeck.replaceCard(neighborCardId);
      }

      this.game.emitDataToSockets();
    } else {
      throw new CannotChoosedCardError();
    }
  }

  choosedPlayer(playerId: PlayerId): void {
    if (this.canChoosedPlayer) {
      this.playerIdSelected = playerId;

      this.game.emitDataToSockets();
    } else {
      throw new CannotChoosedPlayerError();
    }
  }

  getCardOwnerById(cardId) {
    let cardOwner = null;
    this.game.playerList.forEach(player => {
        const playerKidDeck = player.getKidNeighborCards();
        for (let i = 0; i < playerKidDeck.length; i++) {
            if (playerKidDeck[i].data.id == cardId) {
                cardOwner = player;
            }
        }
    });
    return cardOwner;
}

  summonDemon(demonCardId: CardId, neighborsSacrifiedIds: Array<CardId>): void {
    if (!this.canSummonDemon) {
      throw new CannotSummonDemonError();
    }

    if (
      neighborsSacrifiedIds.length < this.player.data.sacrificeNeighborsCountToInvokeDemon
    ) {
      throw new NotEnoughNeighborsProdivedToSummonDemonError();
    }

    if (
      neighborsSacrifiedIds.length > this.player.data.sacrificeNeighborsCountToInvokeDemon
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
    choiceType,
    cardNumber,
    rangeOfSelections,
    actionAwaited,
    cardTypeAwait,
    neighborTypeAwait?,
    neighborKindnessAwait?,
  ): void {
    this.shouldSelectCards = true;
    this.data.shouldSelectFilter.choiceType = choiceType;
    this.data.shouldSelectFilter.number = cardNumber;
    this.data.shouldSelectFilter.rangeOfSelection = rangeOfSelections;
    this.data.shouldSelectFilter.actionAwaited = actionAwaited;
    this.data.shouldSelectFilter.type = cardTypeAwait;
    this.data.shouldSelectFilter.neighborType = neighborTypeAwait;
    this.data.shouldSelectFilter.neighborKindness = neighborKindnessAwait;
  }

  setShouldSelectPlayers(
    choiceType,
    number,
    rangeOfSelections,
    actionAwaited,
  ): void {
    this.playerIdSelected = null;
    this.shouldSelectPlayers = true;
    this.data.shouldSelectFilter.choiceType = choiceType;
    this.data.shouldSelectFilter.number = number;
    this.data.shouldSelectFilter.rangeOfSelection = rangeOfSelections;
    this.data.shouldSelectFilter.actionAwaited = actionAwaited;
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
    this.data.shouldSelectFilter.number = null;
    this.data.shouldSelectFilter.rangeOfSelection = null;
    this.data.shouldSelectFilter.actionAwaited = null;
    this.data.shouldSelectFilter.type = null;
    this.data.shouldSelectFilter.neighborType = null;
    this.data.shouldSelectFilter.neighborKindness = null;
    this.playerChoicesCardId.length = 0;
    this.playerChoosed = false;
  }

  cleanShouldSelectPlayers(): void {
    this.playerIdSelected = null;
    this.shouldSelectPlayers = false;
    this.data.shouldSelectFilter.number = null;
    this.data.shouldSelectFilter.rangeOfSelection = null;
    this.data.shouldSelectFilter.actionAwaited = null;
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

  get playerChoicesPlayerId(): PlayerId {
    return this.playerIdSelected;
  }

  get canChoosedCard(): boolean {
    return (
      this.shouldSelectCards &&
      this.cardIdSelected.length < this.shouldSelectFilter.number
    );
  }

  get canChoosedPlayer(): boolean {
    return (
      this.shouldSelectPlayers && this.playerIdSelected == null
    );
  }

  get canReplaceCard(): boolean {
    return (
      this.shouldSelectFilter.actionAwaited == 'replace' &&
      this.cardIdSelected.length < this.instanceOfMarketCanBeReplaced.length
    );
  }

  get canSummonDemon(): boolean {
    return (
      !this.summonedDemon &&
      this.player.getCoveredDemonCards().length &&
      this.player.getNeighborCards().length >=
      this.player.data.sacrificeNeighborsCountToInvokeDemon
    );
  }

  get canEndTurn(): boolean {
    return this.launchedDices && !this.shouldSelectCards && !this.shouldSelectPlayers;
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
      canChoosedPlayer: this.canChoosedPlayer,
      canReplaceCard: this.canReplaceCard,
      canSummonDemon: this.canSummonDemon,
      canLaunchDices: this.canLaunchDices,
      cardSelector: this.cardSelector,
      shouldSelectCards: this.shouldSelectCards,
      choiceCountdown: this.choiceCountdown,
      shouldSelectFilter: this.shouldSelectFilter,
      playerChoosed: this.playerChoosed,
      instanceOfMarketCanBeReplaced: this.instanceOfMarketCanBeReplaced,
      shouldSelectPlayers: this.shouldSelectPlayers,
    };
  }
}
