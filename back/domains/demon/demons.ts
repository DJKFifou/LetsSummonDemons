import { DemonCard } from './demon.js';
import { NeighborCard } from '../neighbor/neighbor.js';

const cardBack = '/cards/back/demons.png';
const activationNumbersPermanent = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const snake = new DemonCard({
  data: {
    name: 'LE SERPENT',
    type: 'DEMON',
    activationNumbers: [2],
    description: 'Gagnez immédiatement la partie.',
    cardImage: '/cards/demons/snake.png',
    cardBack,
    isPermanent: false,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    game.end(cardOwner.data);
  },
});

const demonBook = new DemonCard({
  data: {
    name: 'LE DÉGUEULIVRE DES DÉMONS',
    type: 'DEMON',
    activationNumbers: [3],
    description:
      'Parcourez la pioche Démon et invoquez le Démon de votre choix gratuitement.',
    subDescription:
      '(Il compte comme un de vos 3 démons nécessaires à la victoire. Mélangez ensuite la pioche Démon).',
    cardImage: '/cards/demons/degueulivre_demons.png',
    cardBack,
    isPermanent: false,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    //TO FINISH
    const demon = game.demonsDeck[0];
    cardOwner.addSummonedDemonCard(demon);
    game.demonsDeck.shift();
  },
});

const bogeyMan = new DemonCard({
  data: {
    name: 'LE PĖRE FOUETTARD',
    type: 'DEMON',
    activationNumbers: [4],
    isPermanent: false,
    description: 'Obtenez les 2 premières cartes de la pioche VOISINAGE.',
    cardImage: '/cards/demons/fouettard_father.png',
    cardBack,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    const drawnedCards: NeighborCard[] = [];
    for (let i = 0; i < 2; i++) {
      drawnedCards.push(game.neighborsDeck.drawnCard());
      game.emitDataToSockets();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
    for (let i = 0; i < 2; i++) {
      const drawnedCard: NeighborCard | undefined = drawnedCards[i];
      cardOwner.addNeighborCard(drawnedCard);
      game.neighborsDeck.throwCards(2);
    }
  },
});

const porcus = new DemonCard({
  data: {
    name: 'PORCUS',
    type: 'DEMON',
    activationNumbers: [5],
    isPermanent: false,
    description: 'Récoltez 5 Âmes.',
    cardImage: '/cards/demons/porcus.png',
    cardBack,
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    cardOwner.addSoulToken(5);
  },
});

const legionNanny = new DemonCard({
  data: {
    name: 'NOUNOU SOMMES LÉGION',
    type: 'DEMON',
    activationNumbers: [6],
    isPermanent: false,
    description: 'Récoltez 5 Âmes.',
    cardImage: '/cards/demons/nounou_sommes_legion.png',
    cardBack,
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    cardOwner.addSoulToken(5);
  },
});

const belzeBzz = new DemonCard({
  data: {
    name: "BELZÉ'BZZ",
    type: 'DEMON',
    activationNumbers: [7],
    isPermanent: false,
    description: 'Activez toutes vos cartes GARÇONS et FILLES.',
    cardImage: '/cards/demons/belze_bzz.png',
    cardBack,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    const neighborsCards = cardOwner.getNeighborCards();
    for (let i = 0; i < neighborsCards.length; i++) {
      if (!neighborsCards[i].data.neighborType.includes('ANIMAL')) {
        neighborsCards[i].activate({ cardOwner, game });
      }
    }
  },
});

const baelHound = new DemonCard({
  data: {
    name: 'MOLOSSE DE BAËL',
    type: 'DEMON',
    activationNumbers: [8],
    isPermanent: false,
    description: 'Pour chacun de vos Animaux, volez 1 Âme',
    subDescription: '(à vos adversaires et/ou depuis la réserve commune).',
    cardImage: '/cards/demons/bael_hound.png',
    cardBack,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    //TO FINISH
    const animals = cardOwner.getAnimalNeighborCards();
    const soulTokens = animals.length;
    if (game.playerList[1].data.soulsTokenCount > soulTokens) {
      game.playerList[1].removeSoulToken(soulTokens);
      cardOwner.addSoulToken(soulTokens);
    } else {
      cardOwner.addSoulToken(soulTokens);
    }
  },
});

const mechanicalSatange = new DemonCard({
  data: {
    name: 'SATANGE MÉCANIQUE',
    type: 'DEMON',
    activationNumbers: [9],
    isPermanent: false,
    description:
      "Récoltez une Âme. Rejouez immédiatement. Seules vos cartes s'activeront durant ce tour supplémentaire.",
    cardImage: '/cards/demons/satange_mecanique.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});

const antechrist = new DemonCard({
  data: {
    name: 'ANTÉCHRIST',
    type: 'DEMON',
    activationNumbers: [10],
    isPermanent: false,
    description: 'Volez 5 Âmes',
    subDescription: '(aux autres joueurs et/ou depuis la réserve commune).',
    cardImage: '/cards/demons/antechrist.png',
    cardBack,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    //TO FINISH
    if (game.playerList[1].data.soulsTokenCount > 5) {
      game.playerList[1].removeSoulToken(5);
      cardOwner.addSoulToken(5);
    } else {
      cardOwner.addSoulToken(5);
    }
  },
});

const mefilstopheles = new DemonCard({
  data: {
    name: 'MÉFILSTOPHÉLES',
    type: 'DEMON',
    activationNumbers: [11],
    isPermanent: false,
    description:
      "Volez n'importe quelle carte d'un adversaire, dont ses Démons",
    subDescription: '(mais jamais son Cierge).',
    cardImage: '/cards/demons/mefilstopheles.png',
    cardBack,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    //TO FINISH
    if (game.playerList[1].getSummonedDemonCards().length > 0) {
      cardOwner.addSummonedDemonCard(
        game.playerList[1].getSummonedDemonCards()[0],
      );
      game.playerList[1].removeSummonedDemonCardById(
        game.playerList[1].data.summonedDemonsCards[0].id,
      );
    } else if (game.playerList[1].getNeighborCards().length > 0) {
      cardOwner.addNeighborCard(game.playerList[1].getNeighborCards()[0]);
      game.playerList[1].removeNeighborCardById(
        game.playerList[1].getNeighborCards()[0].data.id,
      );
    }
  },
});

const devil = new DemonCard({
  data: {
    name: 'LE DIABLE',
    type: 'DEMON',
    activationNumbers: [12],
    isPermanent: false,
    description: "Volez toutes les cartes d'un adversaire, dont ses Démons",
    subDescription: '(mais jamais son Cierge).',
    cardImage: '/cards/demons/devil.png',
    cardBack,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    //TO FINISH
    const neighborsCardsPlayerList = game.playerList[2].getNeighborCards();
    for (let i = 0; i < neighborsCardsPlayerList.length; i++) {
      cardOwner.addNeighborCard(neighborsCardsPlayerList[i]);
      game.playerList[2].removeNeighborCardById(
        neighborsCardsPlayerList[i].data.id,
      );
    }
    const demonsCardsPlayerList = game.playerList[2].getSummonedDemonCards();
    for (let i = 0; i < demonsCardsPlayerList.length; i++) {
      cardOwner.addSummonedDemonCard(demonsCardsPlayerList[i]);
      game.playerList[2].removeSummonedDemonCardById(
        demonsCardsPlayerList[i].data.id,
      );
    }
  },
});

const incesteDemon = new DemonCard({
  data: {
    name: 'DÉMON INCESTE',
    type: 'DEMON',
    activationNumbers: activationNumbersPermanent,
    isPermanent: true,
    description:
      'Tous vos GARÇONS et FILLES comptent comme à la fois ADORABLES et HORRIBLES.',
    cardImage: '/cards/demons/incest_demon.png',
    cardBack,
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    //TO FINISH (ADD THE KINDNESS TO THE NEW NEIGHBORS CARDS)
    const neighbordCards = cardOwner.getNeighborCards();
    for (let i = 0; i < neighbordCards.length; i++) {
      if (!neighbordCards[i].data.neighborType.includes('ANIMAL')) {
        neighbordCards[i].data.neighborKindness = ['ADORABLE', 'HORRIBLE'];
      }
    }
  },
});

const demogorguignol = new DemonCard({
  data: {
    name: 'DÉMOGORGUIGNOL',
    type: 'DEMON',
    activationNumbers: activationNumbersPermanent,
    isPermanent: true,
    description:
      'Tous vos GARÇONS et FILLES comptent comme à la fois GARÇONS et FILLES.',
    cardImage: '/cards/demons/demogorguignol.png',
    cardBack,
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    //TO FINISH (ADD THE TYPE TO THE NEW NEIGHBORS CARDS)
    const neighbordCards = cardOwner.getNeighborCards();
    for (let i = 0; i < neighbordCards.length; i++) {
      if (!neighbordCards[i].data.neighborType.includes('ANIMAL')) {
        neighbordCards[i].data.neighborType = ['BOY', 'GIRL'];
      }
    }
  },
});

const macabreOni = new DemonCard({
  data: {
    name: 'MACABRE ONI',
    type: 'DEMON',
    activationNumbers: activationNumbersPermanent,
    isPermanent: true,
    description:
      "vos GARÇONS et FILLES récoltent le double d'Âmes à votre tour.",
    cardImage: '/cards/demons/gruesome_oni.png',
    cardBack,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    if (game.data.turn.current.player.id === cardOwner.data.id) {
      console.log(cardOwner.getBoysAndGirlsSoulsTokenCount());
      cardOwner.addSoulToken(cardOwner.getBoysAndGirlsSoulsTokenCount());
    }
  },
});

const aneModee = new DemonCard({
  data: {
    name: 'ÂNE-MODÉE',
    type: 'DEMON',
    activationNumbers: activationNumbersPermanent,
    isPermanent: true,
    description: 'Chaque fois que vous obtenez un ANIMAL récoltez une Âme.',
    cardImage: '/cards/demons/ane_modee.png',
    cardBack,
  },
  activateFn: async ({ cardOwner }): Promise<void> => {
    if (
      cardOwner.getAnimalNeighborCards().length > cardOwner.getAnimalsCount()
    ) {
      cardOwner.addSoulToken(
        cardOwner.getAnimalNeighborCards().length - cardOwner.getAnimalsCount(),
      );
    }
    cardOwner.setAnimalsCount(cardOwner.getAnimalNeighborCards().length);
  },
});

const baphometal = new DemonCard({
  data: {
    name: 'BAPHOMÉTAL',
    type: 'DEMON',
    activationNumbers: activationNumbersPermanent,
    isPermanent: true,
    description:
      'Vos adversaires doivent sacrifier une 4e carte pour invoquer un démon.',
    cardImage: '/cards/demons/baphometal.png',
    cardBack,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    for (let i = 0; i < game.playerList.length; i++) {
      if (game.playerList[i].data.id == cardOwner.data.id) {
        if (cardOwner.data.minDemonsInvocatedForWin == 4) {
          cardOwner.data.coveredDemonsCards.pop();
          game.playerList[i].setMinDemonsInvocatedForWin(3);
        }
      } else {
        game.playerList[i].setMinDemonsInvocatedForWin(4);
        game.playerList[i].addCoveredDemonCard(game.demonsDeck[0]);
      }
    }
  },
});

const dedeZuzu = new DemonCard({
  data: {
    name: 'DÉDÉ-ZUZU',
    type: 'DEMON',
    activationNumbers: activationNumbersPermanent,
    isPermanent: true,
    description:
      "Chaque fois que vous faîtes un double aux dés. Récoltez le nombre d'âmes indiqué sur la face d'un dé.",
    cardImage: '/cards/demons/dede_zuzu.png',
    cardBack,
  },
  activateFn: async ({ game, cardOwner }): Promise<void> => {
    if (game.dices[0].data.result === game.dices[1].data.result) {
      cardOwner.addSoulToken(Number(game.dices[0].data.result));
    }
  },
});

const relancifer = new DemonCard({
  data: {
    name: 'RELANCIFER',
    type: 'DEMON',
    activationNumbers: activationNumbersPermanent,
    isPermanent: true,
    description: 'A votre tour: vous pouvez relancer les dés une fois.',
    subDescription:
      "(Le précédent résultat est considéré comme n'ayant jamais existé.).",
    cardImage: '/cards/demons/relancifer.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});

const rosemaryEgg = new DemonCard({
  data: {
    name: "L'OEUF DE ROSEMARY",
    type: 'DEMON',
    activationNumbers: activationNumbersPermanent,
    isPermanent: true,
    description:
      "Quand vous invoquez ce démon. Défaussez-le immédiatement. Regardez les 3 premières cartes de la pioche Démon, invoquez l'un d'eux et défaussez les 2 autres.",
    cardImage: '/cards/demons/rosemary_egg.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});

const spectralux = new DemonCard({
  data: {
    name: 'SPECTRALUX',
    type: 'DEMON',
    activationNumbers: activationNumbersPermanent,
    isPermanent: true,
    description:
      'Vos adversaires ne peuvent pas vous voler ni vous faire défausser.',
    cardImage: '/cards/demons/spectralux.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});

export const demons: Array<DemonCard> = [
  snake,
  demonBook,
  bogeyMan,
  porcus,
  legionNanny,
  belzeBzz,
  baelHound,
  mechanicalSatange,
  antechrist,
  mefilstopheles,
  devil,
  incesteDemon,
  demogorguignol,
  macabreOni,
  aneModee,
  baphometal,
  dedeZuzu,
  relancifer,
  rosemaryEgg,
  spectralux,
];
