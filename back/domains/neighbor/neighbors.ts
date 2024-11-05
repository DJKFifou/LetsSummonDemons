import { NEIGHBORS_MARKET_COUNT } from '../../constants/game.js';
import { NeighborCardData } from '../../contracts/card.js';
import { CardArgs } from '../card/card.js';
import { Game } from '../game/game.js';
import { NeighborCard } from './neighbor.js';

const createNeighborCards = (
  data: CardArgs<NeighborCardData>,
  count: number,
): Array<NeighborCard> => {
  return Array.from({ length: count }, () => new NeighborCard(data));
};

const cardBack = '/cards/back/neighbourhood.png';

const jane: CardArgs<NeighborCardData> = {
  data: {
    name: 'JANE',
    type: 'NEIGHBOR',
    description: 'Obtenez une carte ANIMAL du VOISINAGE.',
    activationNumbers: [6],
    neighborType: ['GIRL'],
    neighborKindness: ['NEUTRAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/jane.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    // TO FINISH
    const neighborsMarket = game.neighborsDeck.getMarket();
    const animalNeighborCards = [];
    for (let i = 0; i < neighborsMarket.length; i++) {
      if (neighborsMarket[i].data.neighborType.includes('ANIMAL')) {
        animalNeighborCards.push(neighborsMarket[i]);
      }
    }
    if (animalNeighborCards.length === 1) {
      game.neighborsDeck.giveCard(cardOwner, animalNeighborCards[0].data.id);
    } else if (animalNeighborCards.length > 1) {
      try {
        if(!game.turn.current.selectionRequired(cardOwner, 'card', 1, ['marketChoice'], 'pick', ['NEIGHBOR'], ['ANIMAL'])) {
          game.neighborsDeck.giveCard(cardOwner, animalNeighborCards[0]);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
  },
};

const lola: CardArgs<NeighborCardData> = {
  data: {
    name: 'LOLA',
    type: 'NEIGHBOR',
    description: 'Pour chacun de vos GARÇONS: récoltez une Âme.',
    activationNumbers: [6],
    neighborType: ['GIRL'],
    neighborKindness: ['NEUTRAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/lola.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const boys = cardOwner.getBoyNeighborCards();
    const soulTokens = boys.length;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const eve: CardArgs<NeighborCardData> = {
  data: {
    name: 'EVE',
    type: 'NEIGHBOR',
    description: 'Récoltez une Âme.',
    activationNumbers: [6],
    neighborType: ['GIRL'],
    neighborKindness: ['NEUTRAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/eve.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const soulTokens = 1;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const adam: CardArgs<NeighborCardData> = {
  data: {
    name: 'ADAM',
    type: 'NEIGHBOR',
    description: 'Récoltez une Âme.',
    activationNumbers: [8],
    neighborType: ['BOY'],
    neighborKindness: ['NEUTRAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/adam.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const soulTokens = 1;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const caroline: CardArgs<NeighborCardData> = {
  data: {
    name: 'CAROLINE',
    type: 'NEIGHBOR',
    description: 'Récoltez 5 Âmes.',
    activationNumbers: [2],
    neighborType: ['GIRL'],
    neighborKindness: ['ADORABLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/caroline.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const soulTokens = 5;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const regan: CardArgs<NeighborCardData> = {
  data: {
    name: 'REGAN',
    type: 'NEIGHBOR',
    description: 'Récoltez une Âme.',
    activationNumbers: [9],
    neighborType: ['GIRL'],
    neighborKindness: ['HORRIBLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/regan.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const soulTokens = 1;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const tommy: CardArgs<NeighborCardData> = {
  data: {
    name: 'TOMMY',
    type: 'NEIGHBOR',
    description:
      "Défaussez la première carte de la PIOCHE VOISINAGE : si c'est une FILLE, obtenez-la",
    activationNumbers: [9],
    neighborType: ['BOY'],
    neighborKindness: ['HORRIBLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/tommy.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    const drawnedCard: NeighborCard = game.neighborsDeck.drawnCard();
    game.emitDataToSockets();
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    if (drawnedCard.data.neighborType.includes('GIRL')) {
      cardOwner.addNeighborCard(drawnedCard);
    }
    game.neighborsDeck.throwCards(1);
    game.emitDataToSockets();
  },
};

const calvin: CardArgs<NeighborCardData> = {
  data: {
    name: 'CALVIN',
    type: 'NEIGHBOR',
    description: 'Si vous avez au moins 3 HORRIBLES GAMINS : volez 2 Âmes',
    subDescription: '(aux autres joueurs et/ou depuis la réserve commune).',
    activationNumbers: [9],
    neighborType: ['BOY'],
    neighborKindness: ['HORRIBLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/calvin.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    //TO FINISH
    if (cardOwner.getHorribleNeighborCards().length > 2) {
      const soulTokens = 2;
      let soulTokensToSteal = 0;
      for (let i = 0; i < soulTokens; i++) {
        game.playerList.forEach(player => {
          if(player.data.id !== cardOwner.data.id) {
            soulTokensToSteal =+ player.data.soulsTokenCount;
          }
        });
        if (soulTokensToSteal >= 1) {
          if (!await game.turn.current.selectionRequired(cardOwner, 'player', 1, ['opponentChoice'], 'steal')) {
            game.playerList[1].removeSoulToken(1);
            cardOwner.addSoulToken(1);
          }
        } else {
          cardOwner.addSoulToken(1);
        }
        cardOwner.addBoysAndGirlsSoulsToken(1);
      }
    }
  },
};

const dolores: CardArgs<NeighborCardData> = {
  data: {
    name: 'DOLORÈS',
    type: 'NEIGHBOR',
    description:
      'Remplacez tous les ADORABLES GAMINS du VOISINNAGE. Obtenez ensuite un HORRIBLE GAMIN du VOISINNAGE.',
    subDescription:
      '(Remplacer veut dire défausser une carte, puis la remplacer par une carte de la pioche VOISINAGE.).',
    activationNumbers: [10],
    neighborType: ['GIRL'],
    neighborKindness: ['HORRIBLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/dolores.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    for (let i = 0; i < game.neighborsDeck.getMarket().length; i++) {
      if (
        game.neighborsDeck.getMarket()[i].data.neighborKindness &&
        game.neighborsDeck
          .getMarket()
          [i].data.neighborKindness.includes('ADORABLE')
      ) {
        game.neighborsDeck.throwMarketCards(i);
        console.log('Spliced');
        i--;
      }
    }
    game.neighborsDeck.fillMarket();
    const horribleNeighbors = [];
    for (let i = 0; i < game.neighborsDeck.getMarket().length; i++) {
      if (
        game.neighborsDeck.getMarket()[i].data.neighborKindness &&
        game.neighborsDeck
          .getMarket()
          [i].data.neighborKindness.includes('HORRIBLE')
      ) {
        horribleNeighbors.push(game.neighborsDeck.getMarket()[i].data.id);
      }
    }
    if (horribleNeighbors.length == 1) {
      game.neighborsDeck.giveCard(cardOwner, horribleNeighbors[0]);
    } else if (horribleNeighbors.length > 1) {
      game.turn.current.setShouldSelectCards(
        1,
        'marketChoice',
        'NEIGHBOR',
        ['BOY', 'GIRL'],
        'HORRIBLE',
      );
      console.log('avant waitForCardSelection');
      try {
        await game.turn.current.waitForCardSelection(game);
        console.log('après waitForCardSelection');
        console.log(
          'playerChoicesCardId: ',
          game.turn.current.playerChoicesCardId,
        );
        for (let i = 0; i < game.turn.current.playerChoicesCardId.length; i++) {
          game.neighborsDeck.giveCard(
            cardOwner,
            game.turn.current.playerChoicesCardId[i],
          );
        }
        game.turn.current.cleanShouldSelectCards();
      } catch (error) {
        console.log('error: ', error);
      }
      if (!game.turn.data.current.playerChoosed) {
        game.neighborsDeck.giveCard(cardOwner, horribleNeighbors[0]);
      }
    }
  },
};

const sam: CardArgs<NeighborCardData> = {
  data: {
    name: 'SAM',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défausser un de vos ANIMAUX: dans ce cas, récoltez 6 Âmes.',
    activationNumbers: [10],
    neighborType: ['BOY'],
    neighborKindness: ['HORRIBLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/sam.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    // TO FINISH
    if (cardOwner.getAnimalNeighborCards().length > 0) {
      cardOwner.removeNeighborCardById(
        cardOwner.getAnimalNeighborCards()[0].data.id,
      );
      const soulTokens = 6;
      cardOwner.addSoulToken(soulTokens);
      cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
    }
  },
};

const annie: CardArgs<NeighborCardData> = {
  data: {
    name: 'ANNIE',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défausser cette carte: dans ce cas volez un GAMIN ou obtenez-en un du VOISINNAGE.',
    activationNumbers: [9],
    neighborType: ['GIRL'],
    neighborKindness: ['HORRIBLE'],
    cardBack: cardBack,
    isActivable: false,
    discardableToActivateIt: false,
    cardImage: '/cards/neighbourhood/annie.png',
  },
  activateFn: async ({ game, cardOwner, card }): Promise<void> => {
    const neighborsMarket = game.neighborsDeck.getMarket();
    const kidNeighborCards = [];
    let kidNeighborCardInMarket = false;
    let kidNeighborCardInPlayer = false;
    for (let i = 0; i < neighborsMarket.length; i++) {
      if (!neighborsMarket[i].data.neighborType.includes('ANIMAL')) {
        kidNeighborCardInMarket = true;
        kidNeighborCards.push(neighborsMarket[i]);
      }
    }
    game.playerList.forEach(player => {
      const playerKidDeck = player.getKidNeighborCards();
      if (playerKidDeck) {
        for (let i = 0; i < playerKidDeck.length; i++) {
          if(player.data.id !== cardOwner.data.id) {
            kidNeighborCardInPlayer = true;
            kidNeighborCards.push(playerKidDeck[i]);
          }
        }
      }
    });
    if(kidNeighborCardInMarket || kidNeighborCardInPlayer) {
      card.data.discardableToActivateIt = true;
      try {
        if(await game.turn.current.selectionRequired(cardOwner, 'card', 1, ['selfChoice'], 'discard')) {
          if(kidNeighborCards.length > 1) {
            await game.turn.current.selectionRequired(cardOwner, 'card', 1, ['marketChoice', 'opponentChoice'], 'steal', ['NEIGHBOR'], ['BOY', 'GIRL']);
          } else if (kidNeighborCards.length == 1) {
            if(kidNeighborCardInMarket) {
              game.neighborsDeck.giveCard(cardOwner, kidNeighborCards[0].data.id);
            } else if(kidNeighborCardInPlayer) {
              cardOwner.stealNeighborCardToPlayerById(kidNeighborCards[0].data.id, game.turn.current.getCardOwnerById(kidNeighborCards[0].data.id));
            }
          }
        }
      } catch (error) {
        console.log("Player didn't draw his card to activate it. ", error);
      }
      card.data.discardableToActivateIt = false;
    }
  },
};

const jesus: CardArgs<NeighborCardData> = {
  data: {
    name: 'JÉSUS',
    type: 'NEIGHBOR',
    description: 'Récoltez 2 Âmes.',
    activationNumbers: [3],
    neighborType: ['BOY'],
    neighborKindness: ['ADORABLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/jesus.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const soulTokens = 2;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const chuck: CardArgs<NeighborCardData> = {
  data: {
    name: 'CHUCK',
    type: 'NEIGHBOR',
    description: 'Si vous avez un autre ADORABLE GAMIN : récoltez 2 Âmes.',
    activationNumbers: [4],
    neighborType: ['BOY'],
    neighborKindness: ['ADORABLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/chuck.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const adorable = cardOwner.getAdorableNeighborCards();
    if (adorable.length > 1) {
      const soulTokens = 2;
      cardOwner.addSoulToken(soulTokens);
      cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
    }
  },
};

const louis: CardArgs<NeighborCardData> = {
  data: {
    name: 'LOUIS',
    type: 'NEIGHBOR',
    description: 'Récoltez une Âme.',
    activationNumbers: [5],
    neighborType: ['BOY'],
    neighborKindness: ['ADORABLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/louis.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const soulTokens = 1;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const carrie: CardArgs<NeighborCardData> = {
  data: {
    name: 'CARRIE',
    type: 'NEIGHBOR',
    description: 'Récoltez 2 Âmes',
    activationNumbers: [11],
    neighborType: ['GIRL'],
    neighborKindness: ['HORRIBLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/carrie.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const soulTokens = 2;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const donnie: CardArgs<NeighborCardData> = {
  data: {
    name: 'DONNIE',
    type: 'NEIGHBOR',
    description:
      'Pour chacun de vos HORRIBLES GAMINS(dont celui-ci): volez une Âme(aux autres joueurs et/ou depuis la réserve commune).',
    activationNumbers: [12],
    neighborType: ['BOY'],
    neighborKindness: ['HORRIBLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/donnie.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    // TO FINISH
    for (let i = 0; i < cardOwner.getHorribleNeighborCards().length; i++) {
      const soulTokens = 1;
      game.playerList[1].removeSoulToken(soulTokens);
      cardOwner.addSoulToken(soulTokens);
      cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
    }
  },
};

const lisa: CardArgs<NeighborCardData> = {
  data: {
    name: 'LISA',
    type: 'NEIGHBOR',
    description:
      'Pour chacun de vos ADORABLES GAMINS(dont celui-ci): récoltez une Âme.',
    activationNumbers: [3],
    neighborType: ['GIRL'],
    neighborKindness: ['ADORABLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/lisa.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const adorable = cardOwner.getAdorableNeighborCards();
    const soulTokens = adorable.length;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const alice: CardArgs<NeighborCardData> = {
  data: {
    name: 'ALICE',
    type: 'NEIGHBOR',
    description:
      'Défaussez les 2 premières carte de la PIOCHE VOISINAGE : obtenez chaque carte ADORABLE GAMIN ainsi défaussée',
    activationNumbers: [4],
    neighborType: ['GIRL'],
    neighborKindness: ['ADORABLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/alice.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    const ALICE_DRAW_CARDS_COUNT = 2;
    const drawnedCards: NeighborCard[] = [];
    for (let i = 0; i < ALICE_DRAW_CARDS_COUNT; i++) {
      drawnedCards.push(game.neighborsDeck.drawnCard());
      game.emitDataToSockets();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
    for (let i = 0; i < ALICE_DRAW_CARDS_COUNT; i++) {
      const drawnedCard: NeighborCard | undefined = drawnedCards[i];
      if (
        drawnedCard.data.neighborKindness &&
        drawnedCard.data.neighborKindness.includes('ADORABLE')
      ) {
        cardOwner.addNeighborCard(drawnedCard);
      }
      game.neighborsDeck.throwCards(ALICE_DRAW_CARDS_COUNT);
      game.emitDataToSockets();
    }
  },
};

const marilyn: CardArgs<NeighborCardData> = {
  data: {
    name: 'MARILYN',
    type: 'NEIGHBOR',
    description: 'Obtenez une carte GARÇON du VOISINNAGE.',
    activationNumbers: [5],
    neighborType: ['GIRL'],
    neighborKindness: ['ADORABLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/marilyn.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    // TO FINISH
    const neighborsMarket = game.neighborsDeck.getMarket();
    const boyNeighborCards = [];
    for (let i = 0; i < neighborsMarket.length; i++) {
      if (neighborsMarket[i].data.neighborType.includes('BOY')) {
        boyNeighborCards.push(neighborsMarket[i]);
      }
    }
    if (boyNeighborCards.length === 1) {
      game.neighborsDeck.giveCard(cardOwner, boyNeighborCards[0].data.id);
    } else if (boyNeighborCards.length > 1) {
      game.turn.current.setShouldSelectCards(
        1,
        'marketChoice',
        'NEIGHBOR',
        ['BOY'],
        null,
      );
      console.log('avant waitForCardSelection');
      try {
        await game.turn.current.waitForCardSelection(game);
        console.log('après waitForCardSelection');
        console.log(
          'playerChoicesCardId: ',
          game.turn.current.playerChoicesCardId,
        );
        for (let i = 0; i < game.turn.current.playerChoicesCardId.length; i++) {
          game.neighborsDeck.giveCard(
            cardOwner,
            game.turn.current.playerChoicesCardId[i],
          );
        }
        game.turn.current.cleanShouldSelectCards();
      } catch (error) {
        console.log('error: ', error);
      }
      if (!game.turn.data.current.playerChoosed) {
        game.neighborsDeck.giveCard(cardOwner, boyNeighborCards[0]);
      }
    }
  },
};

const fifi: CardArgs<NeighborCardData> = {
  data: {
    name: 'FIFI',
    type: 'NEIGHBOR',
    description: 'Pour chacun de vos ANIMAUX: récoltez une Âme.',
    activationNumbers: [4],
    neighborType: ['GIRL'],
    neighborKindness: ['ADORABLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/fifi.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const animals = cardOwner.getAnimalNeighborCards();
    const soulTokens = animals.length;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const damien: CardArgs<NeighborCardData> = {
  data: {
    name: 'DAMIEN',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défaussez cette carte : dans ce cas, invoquez un Démon au hasard de votre main.',
    subDescription:
      '(cette action ne compte pas comme votre invocation pour ce tour.)',
    activationNumbers: [11],
    neighborType: ['BOY'],
    neighborKindness: ['HORRIBLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/damien.png',
  },
  activateFn: async ({ cardOwner, card }): Promise<void> => {
    if (cardOwner.getCoveredDemonCards().length < 1) {
      return;
    }

    const randomDemonCard = cardOwner.getRandomDemonCard();
    cardOwner.uncoverDemonCard(randomDemonCard.data.id);
    cardOwner.removeNeighborCardById(card.data.id);
  },
};

const destiny: CardArgs<NeighborCardData> = {
  data: {
    name: 'DESTINY',
    type: 'NEIGHBOR',
    description: 'Activez un autre de vos ADORABLES GAMINS.',
    activationNumbers: [5],
    neighborType: ['GIRL'],
    neighborKindness: ['ADORABLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/destiny.png',
  },
  activateFn: async ({ cardOwner, game, card }): Promise<void> => {
    // TO FINISH
    const adorableNeighborCards = cardOwner.getAdorableNeighborCards();
    const neighborArray = [];

    for (let i = 0; i < adorableNeighborCards.length; i++) {
      if (adorableNeighborCards[i].data.id !== card.data.id) {
        neighborArray.push(adorableNeighborCards[i]);
      }
    }

    if (neighborArray.length > 0) {
      neighborArray[0].activate({ cardOwner, game });
    }
  },
};

const dillinger: CardArgs<NeighborCardData> = {
  data: {
    name: 'DILLINGER',
    type: 'NEIGHBOR',
    description: 'Volez une âme',
    subDescription: '(à un adversaire ou depuis la réserve commune).',
    activationNumbers: [10],
    neighborType: ['BOY'],
    neighborKindness: ['HORRIBLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/dillinger.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    // TO FINISH
    const soulTokens = 1;
    game.playerList[1].removeSoulToken(soulTokens);
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const glen: CardArgs<NeighborCardData> = {
  data: {
    name: 'GLEN',
    type: 'NEIGHBOR',
    description:
      'Recoltez 2 Âmes et choisissez un adversaire qui récolte une Âme.',
    activationNumbers: [5],
    neighborType: ['BOY'],
    neighborKindness: ['ADORABLE'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/glen.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    // TO FINISH
    const soulTokens = 2;
    const soulTokensToGive = 1;
    cardOwner.addSoulToken(soulTokens);
    try {
      if (!await game.turn.current.selectionRequired(cardOwner, 'player', soulTokensToGive, ['opponentChoice'], 'give')) {
        game.playerList[1].addSoulToken(soulTokensToGive);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  },
};

const irwin: CardArgs<NeighborCardData> = {
  data: {
    name: 'IRWIN',
    type: 'NEIGHBOR',
    description: 'Activez toutes vos cartes ANIMAUX.',
    activationNumbers: [8],
    neighborType: ['BOY'],
    neighborKindness: ['NEUTRAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/irwin.png',
  },
  activateFn: async ({ cardOwner, game }): Promise<void> => {
    // TO FINISH
    const animalNeighborCards = cardOwner.getAnimalNeighborCards();

    for (let i = 0; i < animalNeighborCards.length; i++) {
      animalNeighborCards[i].activate({ cardOwner, game });
    }
  },
};

const romeo: CardArgs<NeighborCardData> = {
  data: {
    name: 'ROMÉO',
    type: 'NEIGHBOR',
    description: 'Pour chacune de vos filles: récoltez une Âme.',
    activationNumbers: [8],
    neighborType: ['BOY'],
    neighborKindness: ['NEUTRAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/romeo.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const girls = cardOwner.getGirlNeighborCards();
    const soulTokens = girls.length;
    cardOwner.addSoulToken(soulTokens);
    cardOwner.addBoysAndGirlsSoulsToken(soulTokens);
  },
};

const cat: CardArgs<NeighborCardData> = {
  data: {
    name: 'CHAT',
    type: 'NEIGHBOR',
    description:
      "Défaussez la 1re carte de la PIOCHE VOISINAGE : si c'est un ANIMAL, obtenez-le.",
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/cat.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    const drawnedCard: NeighborCard = game.neighborsDeck.drawnCard();
    game.emitDataToSockets();
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    if (drawnedCard.data.neighborType.includes('ANIMAL')) {
      cardOwner.addNeighborCard(drawnedCard);
    }
    game.neighborsDeck.throwCards(1);
  },
};

const dog: CardArgs<NeighborCardData> = {
  data: {
    name: 'CHIEN',
    type: 'NEIGHBOR',
    description: 'Si vous avez un GARÇON ou une FILLE : récoltez une Âme.',
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/dog.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const boys = cardOwner.getBoyNeighborCards();
    const girls = cardOwner.getGirlNeighborCards();
    if (boys.length + girls.length > 0) {
      cardOwner.addSoulToken(1);
    }
  },
};

const goldenFish: CardArgs<NeighborCardData> = {
  data: {
    name: 'POISSON ROUGE',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défaussez cette carte : dans ce cas, récoltez 5 Âmes.',
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/golden_fish.png',
  },
  activateFn: async ({ cardOwner, card }): Promise<void> => {
    // TO FINISH
    cardOwner.removeNeighborCardById(card.data.id);
    cardOwner.addSoulToken(5);
  },
};

const araMacao: CardArgs<NeighborCardData> = {
  data: {
    name: 'ARA MACAO',
    type: 'NEIGHBOR',
    description:
      'Si vous avez au moins 2 GARÇONS ou 2 FILLES : récoltez 2 Âmes.',
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/macao_ara.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const boys = cardOwner.getBoyNeighborCards();
    const girls = cardOwner.getGirlNeighborCards();
    if (boys.length > 1 || girls.length > 1) {
      cardOwner.addSoulToken(2);
    }
  },
};

const rabbit: CardArgs<NeighborCardData> = {
  data: {
    name: 'LAPIN',
    type: 'NEIGHBOR',
    description: 'Si vous avez au moins 3 ANIMAUX : récoltez 2 Âmes.',
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/rabbit.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const animals = cardOwner.getAnimalNeighborCards();
    if (animals.length > 2) {
      cardOwner.addSoulToken(2);
    }
  },
};

const goat: CardArgs<NeighborCardData> = {
  data: {
    name: 'CHÈVRE',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défausser exactement 1 GARÇON et 1 FILLE : invoquez le Démon du dessus de la pioche gratuitement.',
    subDescription: '(Il compte parmi vos 3 démons nécessaires à la victoire.)',
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/goat.png',
  },
  activateFn: async ({ cardOwner, game }): Promise<void> => {
    if (
      cardOwner.getBoyNeighborCards().length > 0 &&
      cardOwner.getGirlNeighborCards().length > 0
    ) {
      try {
        if(await game.turn.current.selectionRequired(cardOwner, 'card', 1, ['selfChoice'], 'sacrifice', ['NEIGHBOR'], ['BOY'])) {
          if(await game.turn.current.selectionRequired(cardOwner, 'card', 1, ['selfChoice'], 'sacrifice', ['NEIGHBOR'], ['GIRL'])) {
            if(game.demonsDeck.length > 0) {
              const demon = game.demonsDeck[0];
              cardOwner.addSummonedDemonCard(demon);
              game.demonsDeck.shift();
            }
          }
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
  },
};

const alligator: CardArgs<NeighborCardData> = {
  data: {
    name: 'ALLIGATOR',
    type: 'NEIGHBOR',
    description:
      "Vous pouvez défausser cette carte: dans ce cas, défaussez jusqu'à 2 GAMINS au total parmi les cartes de vos adversaires.",
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    discardableToActivateIt: false,
    cardImage: '/cards/neighbourhood/alligator.png',
  },
  activateFn: async ({ game, cardOwner, card }): Promise<void> => {
    //TO FINISH
    const PlayersKidNeighborCards = [];
    game.playerList.forEach(player => {
      const playerKidDeck = player.getKidNeighborCards();
      if (playerKidDeck) {
        for (let i = 0; i < playerKidDeck.length; i++) {
          if(player.data.id !== cardOwner.data.id) {
            PlayersKidNeighborCards.push(playerKidDeck[i]);
          }
        }
      }
    });
    if (PlayersKidNeighborCards.length > 0) {
      card.data.discardableToActivateIt = true;
      try {
        if(await game.turn.current.selectionRequired(cardOwner, 'card', 1, ['selfChoice'], 'discard'))
        {
          game.emitDataToSockets();
          card.data.discardableToActivateIt = false;
          await game.turn.current.selectionRequired(cardOwner, 'card', 1, ['opponentChoice'], 'discard', ['NEIGHBOR'], ['BOY', 'GIRL']);
          await game.turn.current.selectionRequired(cardOwner, 'card', 1, ['opponentChoice'], 'discard', ['NEIGHBOR'], ['BOY', 'GIRL'])
        }
      } catch (error) {
        console.log('error: ', error);
      }
      card.data.discardableToActivateIt = false;
    }
  },
};

const falcon: CardArgs<NeighborCardData> = {
  data: {
    name: 'FALCON',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défausser cette carte: dans ce cas défaussez les 7 premières cartes de la PIOCHE VOISINNAGE. Obtenez chaque carte ANIMAL ainsi défaussée',
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/falcon.png',
  },
  activateFn: async ({ game, cardOwner, card }): Promise<void> => {
    const FALCON_DRAW_CARDS_COUNT = 7;
    const drawnedCards: NeighborCard[] = [];
    cardOwner.removeNeighborCardById(card.data.id);
    for (let i = 0; i < FALCON_DRAW_CARDS_COUNT; i++) {
      drawnedCards.push(game.neighborsDeck.drawnCard());
      game.emitDataToSockets();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
    for (let i = 0; i < FALCON_DRAW_CARDS_COUNT; i++) {
      const drawnedCard: NeighborCard | undefined = drawnedCards[i];
      if (drawnedCard.data.neighborType.includes('ANIMAL')) {
        cardOwner.addNeighborCard(drawnedCard);
      }
      game.neighborsDeck.throwCards(FALCON_DRAW_CARDS_COUNT);
      game.emitDataToSockets();
    }
  },
};

const owl: CardArgs<NeighborCardData> = {
  data: {
    name: 'CHOUETTE',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défausser cette carte: dans ce cas récoltez 4 Âmes et remplacez une ou plusieurs cartes du VOISINNAGE.',
    subDescription:
      '(Défaussez-les et remplacez-les immédiatement par de nouvelles cartes de la PIOCHE VOISINNAGE)',
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    discardableToActivateIt: false,
    cardImage: '/cards/neighbourhood/owl.png',
  },
  activateFn: async ({ game, cardOwner, card }): Promise<void> => {
    card.data.discardableToActivateIt = true;
    try {
      if(await game.turn.current.selectionRequired(cardOwner, 'card', 1, ['selfChoice'], 'discard'))
      {
        cardOwner.addSoulToken(4);
        game.emitDataToSockets();
        await game.turn.current.selectionRequired(cardOwner, 'card', NEIGHBORS_MARKET_COUNT, ['marketChoice'], 'replace');
      }
    } catch (error) {
      console.log('error: ', error);
    }
    card.data.discardableToActivateIt = false;
  },
};

const skunk: CardArgs<NeighborCardData> = {
  data: {
    name: 'MOUFETTE',
    type: 'NEIGHBOR',
    description:
      'Chaque joueur doit défausser toutes ses cartes, sauf ses démons',
    subDescription: '(y compris celle-ci).',
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/skunk.png',
  },
  activateFn: async ({ game }): Promise<void> => {
    const players = game.playerList;
    for (let i = 0; i < players.length; i++) {
      const neighbors = game.playerList[i].getNeighborCards();
      for (let j = 0; j < neighbors.length; j++) {
        game.playerList[i].removeNeighborCardById(neighbors[j].data.id);
      }
    }
  },
};

const strayCat: CardArgs<NeighborCardData> = {
  data: {
    name: 'CHAT ERRANT',
    type: 'NEIGHBOR',
    description:
      "Si vous n'avez ni GARÇON ni FILLE: obtenez la carte du dessus de la pioche voisinnage.",
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/stray_cat.png',
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    const boys = cardOwner.getBoyNeighborCards();
    const girls = cardOwner.getGirlNeighborCards();
    if (boys.length < 1 && girls.length < 1) {
      const drawnedCard: NeighborCard = game.neighborsDeck.drawnCard();
      game.emitDataToSockets();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      cardOwner.addNeighborCard(drawnedCard);
      game.neighborsDeck.throwCards(1);
      game.emitDataToSockets();
    }
  },
};

const rabidDog: CardArgs<NeighborCardData> = {
  data: {
    name: 'CHIEN ENRAGÉ',
    type: 'NEIGHBOR',
    description: "Si vous n'avez ni GARÇON ni FILLE: récoltez 2 Âmes.",
    activationNumbers: [7],
    neighborType: ['ANIMAL'],
    cardBack: cardBack,
    isActivable: false,
    cardImage: '/cards/neighbourhood/rabid_dog.png',
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    const boys = cardOwner.getBoyNeighborCards();
    const girls = cardOwner.getGirlNeighborCards();
    if (boys.length == 0 && girls.length == 0) {
      cardOwner.addSoulToken(2);
    }
  },
};

export const neighbors: Array<NeighborCard> = [
  // Animals
  ...createNeighborCards(goat, 1),
  ...createNeighborCards(falcon, 1),
  ...createNeighborCards(skunk, 1),
  ...createNeighborCards(alligator, 2),
  ...createNeighborCards(rabidDog, 2),
  ...createNeighborCards(araMacao, 2),
  ...createNeighborCards(rabbit, 2),
  ...createNeighborCards(strayCat, 2),
  ...createNeighborCards(owl, 4),
  ...createNeighborCards(goldenFish, 4),
  ...createNeighborCards(cat, 6),
  ...createNeighborCards(dog, 6),

  // Girls
  ...createNeighborCards(lisa, 2),
  ...createNeighborCards(alice, 2),
  ...createNeighborCards(marilyn, 2),
  ...createNeighborCards(destiny, 2),
  ...createNeighborCards(caroline, 2),
  ...createNeighborCards(fifi, 2),
  ...createNeighborCards(annie, 2),
  ...createNeighborCards(dolores, 2),
  ...createNeighborCards(carrie, 4),
  ...createNeighborCards(regan, 4),
  ...createNeighborCards(lola, 2),
  ...createNeighborCards(jane, 2),
  ...createNeighborCards(eve, 6),

  // Boys
  ...createNeighborCards(chuck, 2),
  ...createNeighborCards(glen, 2),
  ...createNeighborCards(jesus, 4),
  ...createNeighborCards(louis, 4),
  ...createNeighborCards(dillinger, 2),
  ...createNeighborCards(calvin, 200),
  ...createNeighborCards(tommy, 2),
  ...createNeighborCards(donnie, 2),
  ...createNeighborCards(sam, 2),
  ...createNeighborCards(damien, 2),
  ...createNeighborCards(romeo, 2),
  ...createNeighborCards(irwin, 2),
  ...createNeighborCards(adam, 6),
];
