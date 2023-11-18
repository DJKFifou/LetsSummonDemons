import {
  NeighborActivateFnArgs,
  NeighborArgs,
  NeighborCard,
} from './neighbor.js';

const createNeighborCards = (
  data: NeighborArgs,
  count: number,
): Array<NeighborCard> => {
  return Array.from({ length: count }, () => new NeighborCard(data));
};

const cardBack = '/cards/back/neighbourhood.png';

const jane: NeighborArgs = {
  inputData: {
    name: 'JANE',
    type: 'NEIGHBOR',
    description: 'Obtenez une carte ANIMAL du VOISINAGE.',
    activationNumbers: [6],
    neighborType: 'GIRL',
    neighborKindness: 'NEUTRAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/jane.png',
  },
  activateFn: (): void => {},
};

const lola: NeighborArgs = {
  inputData: {
    name: 'LOLA',
    type: 'NEIGHBOR',
    description: 'Pour chacun de vos GARÇONS: récoltez une Âme.',
    activationNumbers: [6],
    neighborType: 'GIRL',
    neighborKindness: 'NEUTRAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/lola.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    const boys = player.getBoyNeighborCards();
    const soulTokens = boys.length;
    player.addSoulToken(soulTokens);
  },
};

const eve: NeighborArgs = {
  inputData: {
    name: 'EVE',
    type: 'NEIGHBOR',
    description: 'Récoltez une Âme.',
    activationNumbers: [6],
    neighborType: 'GIRL',
    neighborKindness: 'NEUTRAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/eve.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    player.addSoulToken(1);
  },
};

const adam: NeighborArgs = {
  inputData: {
    name: 'ADAM',
    type: 'NEIGHBOR',
    description: 'Récoltez une Âme.',
    activationNumbers: [8],
    neighborType: 'BOY',
    neighborKindness: 'NEUTRAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/adam.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    player.addSoulToken(1);
  },
};

const caroline: NeighborArgs = {
  inputData: {
    name: 'CAROLINE',
    type: 'NEIGHBOR',
    description: 'Récoltez 5 Âmes.',
    activationNumbers: [2],
    neighborType: 'GIRL',
    neighborKindness: 'ADORABLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/caroline.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    player.addSoulToken(5);
  },
};

const regan: NeighborArgs = {
  inputData: {
    name: 'REGAN',
    type: 'NEIGHBOR',
    description: 'Récoltez une Âme.',
    activationNumbers: [9],
    neighborType: 'GIRL',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/regan.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    player.addSoulToken(1);
  },
};

const tommy: NeighborArgs = {
  inputData: {
    name: 'TOMMY',
    type: 'NEIGHBOR',
    description:
      "Défaussez la première carte de la PIOCHE VOISINAGE : si c'est une FILLE, obtenez-la",
    activationNumbers: [9],
    neighborType: 'BOY',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/tommy.png',
  },
  activateFn: async (args: NeighborActivateFnArgs): Promise<void> => {
    console.log('tommy awake');
    const player = args.player;
    const game = args.game;
    const drawnedCard: NeighborCard = game.neighborsDeck.drawnCard();
    game.emitDataToSockets();
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    if (drawnedCard.getData().type === 'GIRL') {
      player.addNeighborCard(drawnedCard);
    }
    game.neighborsDeck.throwCards(1);
    game.emitDataToSockets();
  },
};

const calvin: NeighborArgs = {
  inputData: {
    name: 'CALVIN',
    type: 'NEIGHBOR',
    description: 'Si vous avez au moins 3 HORRIBLES GAMINS : volez 2 Âmes',
    subDescription: '(aux autres joueurs et/ou depuis la réserve commune).',
    activationNumbers: [9],
    neighborType: 'BOY',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/calvin.png',
  },
  activateFn: (): void => {},
};

const dolores: NeighborArgs = {
  inputData: {
    name: 'DOLORÈS',
    type: 'NEIGHBOR',
    description:
      'Remplacez tous les ADORABLES GAMINS du VOISINNAGE. Obtenez ensuite un HORRIBLE GAMIN du VOISINNAGE.',
    subDescription:
      '(Remplacer veut dire défausser une carte, puis la remplacer par une carte de la pioche VOISINAGE.).',
    activationNumbers: [10],
    neighborType: 'GIRL',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/dolores.png',
  },
  activateFn: (): void => {},
};

const sam: NeighborArgs = {
  inputData: {
    name: 'SAM',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défausser un de vos ANIMAUX: dans ce cas, récoltez 6 Âmes.',
    activationNumbers: [10],
    neighborType: 'BOY',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/sam.png',
  },
  activateFn: (): void => {},
};

const annie: NeighborArgs = {
  inputData: {
    name: 'ANNIE',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défausser cette carte: dans ce cas volez un GAMIN ou obtenez-en un du VOISINNAGE.',
    activationNumbers: [9],
    neighborType: 'GIRL',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/annie.png',
  },
  activateFn: (): void => {},
};

const jesus: NeighborArgs = {
  inputData: {
    name: 'JÉSUS',
    type: 'NEIGHBOR',
    description: 'Récoltez 2 Âmes.',
    activationNumbers: [3],
    neighborType: 'BOY',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/jesus.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    player.addSoulToken(2);
  },
};

const chuck: NeighborArgs = {
  inputData: {
    name: 'CHUCK',
    type: 'NEIGHBOR',
    description: 'Si vous avez un autre ADORABLE GAMIN : récoltez 2 Âmes.',
    activationNumbers: [4],
    neighborType: 'BOY',
    neighborKindness: 'ADORABLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/chuck.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    const adorable = player.getAdorableNeighborCards();
    if (adorable.length > 1) {
      player.addSoulToken(2);
    }
  },
};

const louis: NeighborArgs = {
  inputData: {
    name: 'LOUIS',
    type: 'NEIGHBOR',
    description: 'Récoltez une Âme.',
    activationNumbers: [5],
    neighborType: 'BOY',
    neighborKindness: 'ADORABLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/louis.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    player.addSoulToken(1);
  },
};

const carrie: NeighborArgs = {
  inputData: {
    name: 'CARRIE',
    type: 'NEIGHBOR',
    description: 'Récoltez 2 Âmes',
    activationNumbers: [11],
    neighborType: 'GIRL',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/carrie.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    player.addSoulToken(2);
  },
};

const donnie: NeighborArgs = {
  inputData: {
    name: 'DONNIE',
    type: 'NEIGHBOR',
    description:
      'Pour chacun de vos HORRIBLES GAMINS(dont celui-ci): volez une Âme(aux autres joueurs et/ou depuis la réserve commune).',
    activationNumbers: [12],
    neighborType: 'BOY',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/donnie.png',
  },
  activateFn: (): void => {},
};

const lisa: NeighborArgs = {
  inputData: {
    name: 'LISA',
    type: 'NEIGHBOR',
    description:
      'Pour chacun de vos ADORABLES GAMINS(dont celui-ci): récoltez une Âme.',
    activationNumbers: [3],
    neighborType: 'GIRL',
    neighborKindness: 'ADORABLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/lisa.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    const adorable = player.getAdorableNeighborCards();
    const soulTokens = adorable.length;
    player.addSoulToken(soulTokens);
  },
};

const alice: NeighborArgs = {
  inputData: {
    name: 'ALICE',
    type: 'NEIGHBOR',
    description:
      'Défaussez les 2 premières carte de la PIOCHE VOISINAGE : obtenez chaque carte ADORABLE GAMIN ainsi défaussée',
    activationNumbers: [4],
    neighborType: 'GIRL',
    neighborKindness: 'ADORABLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/alice.png',
  },
  activateFn: async (args: NeighborActivateFnArgs): Promise<void> => {
    console.log('alice awake');
    const player = args.player;
    const game = args.game;
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
      if (drawnedCard.getData().kindness === 'ADORABLE') {
        player.addNeighborCard(drawnedCard);
      }
      game.neighborsDeck.throwCards(ALICE_DRAW_CARDS_COUNT);
      game.emitDataToSockets();
    }
  },
};

const marilyn: NeighborArgs = {
  inputData: {
    name: 'MARILYN',
    type: 'NEIGHBOR',
    description: 'Obtenez une carte GARÇON du VOISINNAGE.',
    activationNumbers: [5],
    neighborType: 'GIRL',
    neighborKindness: 'ADORABLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/marilyn.png',
  },
  activateFn: (): void => {},
};

const fifi: NeighborArgs = {
  inputData: {
    name: 'FIFI',
    type: 'NEIGHBOR',
    description: 'Pour chacun de vos ANIMAUX: récoltez une Âme.',
    activationNumbers: [4],
    neighborType: 'GIRL',
    neighborKindness: 'ADORABLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/fifi.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    const animals = player.getAnimalNeighborCards();
    const soulTokens = animals.length;
    player.addSoulToken(soulTokens);
  },
};

const damien: NeighborArgs = {
  inputData: {
    name: 'DAMIEN',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défaussez cette carte : dans ce cas, invoquez un Démon au hasard de votre main.',
    subDescription:
      '(cette action ne compte pas comme votre invocation pour ce tour.)',
    activationNumbers: [11],
    neighborType: 'BOY',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/damien.png',
  },
  activateFn: (): void => {},
};

const destiny: NeighborArgs = {
  inputData: {
    name: 'DESTINY',
    type: 'NEIGHBOR',
    description: 'Activez un autre de vos ADORABLES GAMINS.',
    activationNumbers: [5],
    neighborType: 'GIRL',
    neighborKindness: 'ADORABLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/destiny.png',
  },
  activateFn: (): void => {},
};

const dillinger: NeighborArgs = {
  inputData: {
    name: 'DILLINGER',
    type: 'NEIGHBOR',
    description: 'Volez une âme',
    subDescription: '(à un adversaire ou depuis la réserve commune).',
    activationNumbers: [10],
    neighborType: 'BOY',
    neighborKindness: 'HORRIBLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/dillinger.png',
  },
  activateFn: (): void => {},
};

const glen: NeighborArgs = {
  inputData: {
    name: 'GLEN',
    type: 'NEIGHBOR',
    description:
      'Recoltez 2 Âmes et choisissez un adversaire qui récolte une Âme.',
    activationNumbers: [5],
    neighborType: 'BOY',
    neighborKindness: 'ADORABLE',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/glen.png',
  },
  activateFn: (): void => {},
};

const irwin: NeighborArgs = {
  inputData: {
    name: 'IRWIN',
    type: 'NEIGHBOR',
    description: 'Activez toutes vos cartes ANIMAUX.',
    activationNumbers: [8],
    neighborType: 'BOY',
    neighborKindness: 'NEUTRAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/irwin.png',
  },
  activateFn: (): void => {},
};

const romeo: NeighborArgs = {
  inputData: {
    name: 'ROMÉO',
    type: 'NEIGHBOR',
    description: 'Pour chacune de vos filles: récoltez une Âme.',
    activationNumbers: [8],
    neighborType: 'BOY',
    neighborKindness: 'NEUTRAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/romeo.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    const girls = player.getGirlNeighborCards();
    const soulTokens = girls.length;
    player.addSoulToken(soulTokens);
  },
};

const cat: NeighborArgs = {
  inputData: {
    name: 'CHAT',
    type: 'NEIGHBOR',
    description:
      "Défaussez la 1re carte de la PIOCHE VOISINAGE : si c'est un ANIMAL, obtenez-le.",
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/cat.png',
  },

  activateFn: async (args: NeighborActivateFnArgs): Promise<void> => {
    console.log('cat awake');
    const player = args.player;
    const game = args.game;
    const drawnedCard: NeighborCard = game.neighborsDeck.drawnCard();
    game.emitDataToSockets();
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    if (drawnedCard.getData().type === 'ANIMAL') {
      player.addNeighborCard(drawnedCard);
    }
    game.neighborsDeck.throwCards(1);
    game.emitDataToSockets();
  },
};

const dog: NeighborArgs = {
  inputData: {
    name: 'CHIEN',
    type: 'NEIGHBOR',
    description: 'Si vous avez un GARÇON ou une FILLE : récoltez une Âme.',
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/dog.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    const boys = player.getBoyNeighborCards();
    const girls = player.getGirlNeighborCards();
    if (boys.length + girls.length > 0) {
      player.addSoulToken(1);
    }
  },
};

const goldenFish: NeighborArgs = {
  inputData: {
    name: 'POISSOU ROUGE',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défaussez cette carte : dans ce cas, récoltez 5 Âmes.',
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/golden_fish.png',
  },
  activateFn: (): void => {},
};

const araMacao: NeighborArgs = {
  inputData: {
    name: 'ARA MACAO',
    type: 'NEIGHBOR',
    description:
      'Si vous avez au moins 2 GARÇONS ou 2 FILLES : récoltez 2 Âmes.',
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/macao_ara.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    const boys = player.getBoyNeighborCards();
    const girls = player.getGirlNeighborCards();
    if (boys.length > 1 || girls.length > 1) {
      player.addSoulToken(2);
    }
  },
};

const rabbit: NeighborArgs = {
  inputData: {
    name: 'LAPIN',
    type: 'NEIGHBOR',
    description: 'Si vous avez au moins 3 ANIMAUX : récoltez 2 Âmes.',
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/rabbit.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    const animals = player.getAnimalNeighborCards();
    if (animals.length > 2) {
      player.addSoulToken(2);
    }
  },
};

const goat: NeighborArgs = {
  inputData: {
    name: 'CHÈVRE',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défausser exactement 1 BOY et 1 FILLE : invoquez le Démon du dessus de la pioche gratuitement.',
    subDescription: '(Il compte parmi vos 3 démons nécessaires à la victoire.)',
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/goat.png',
  },
  activateFn: (): void => {},
};

const alligator: NeighborArgs = {
  inputData: {
    name: 'ALLIGATOR',
    type: 'NEIGHBOR',
    description:
      "Vous pouvez défausser cette carte: dans ce cas, défaussez jusuqu'à 2 GAMINS au total parmi les cartes de vos adversaires.",
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/alligator.png',
  },
  activateFn: (): void => {},
};

const falcon: NeighborArgs = {
  inputData: {
    name: 'FALCON',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défausser cette carte: dans ce cas défaussez les 7 premières cartes de la PIOCHE VOISINNAGE. Obtenez chaque carte ANIMAL ainsi défaussée',
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/falcon.png',
  },
  activateFn: async (args: NeighborActivateFnArgs): Promise<void> => {
    console.log('falcon awake');
    const player = args.player;
    const game = args.game;
    const FALCON_DRAW_CARDS_COUNT = 7;
    const drawnedCards: NeighborCard[] = [];
    for (let i = 0; i < FALCON_DRAW_CARDS_COUNT; i++) {
      drawnedCards.push(game.neighborsDeck.drawnCard());
      game.emitDataToSockets();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
    for (let i = 0; i < FALCON_DRAW_CARDS_COUNT; i++) {
      const drawnedCard: NeighborCard | undefined = drawnedCards[i];
      if (drawnedCard.getData().type === 'ANIMAL') {
        player.addNeighborCard(drawnedCard);
      }
      game.neighborsDeck.throwCards(FALCON_DRAW_CARDS_COUNT);
      game.emitDataToSockets();
    }
  },
};

const owl: NeighborArgs = {
  inputData: {
    name: 'CHOUETTE',
    type: 'NEIGHBOR',
    description:
      'Vous pouvez défausser cette carte: dans ce cas récoltez 4 Âmes et remplacez une ou plusieurs cartes du VOISINNAGE.',
    subDescription:
      '(Défaussez-les et remplacez-les immédiatement par de nouvelles cartes de la PIOCHE VOISINNAGE)',
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/owl.png',
  },
  activateFn: (): void => {},
};

const skunk: NeighborArgs = {
  inputData: {
    name: 'MOUFETTE',
    type: 'NEIGHBOR',
    description:
      'Chaque joueur doit défausser toutes ses cartes, sauf ses démons',
    subDescription: '(y compris celle-ci).',
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/skunk.png',
  },
  activateFn: (): void => {},
};
const strayCat: NeighborArgs = {
  inputData: {
    name: 'CHAT ERRANT',
    type: 'NEIGHBOR',
    description:
      "Si vous n'avez GARÇON ni FILLE: obtenez la carte du dessus de la pioche voisinnage.",
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/stray_cat.png',
  },
  activateFn: async (args: NeighborActivateFnArgs): Promise<void> => {
    console.log('stray cat awake');
    const player = args.player;
    const game = args.game;
    const boys = player.getBoyNeighborCards();
    const girls = player.getGirlNeighborCards();
    if (boys.length < 1 && girls.length < 1) {
      const drawnedCard: NeighborCard = game.neighborsDeck.drawnCard();
      game.emitDataToSockets();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      player.addNeighborCard(drawnedCard);
      game.neighborsDeck.throwCards(1);
      game.emitDataToSockets();
    }
  },
};

const rabidDog: NeighborArgs = {
  inputData: {
    name: 'CHIEN ENRAGÉ',
    type: 'NEIGHBOR',
    description: "Si vous n'avez ni GARÇON ni FILLE: récoltez 2 Âmes.",
    activationNumbers: [7],
    neighborType: 'ANIMAL',
    cardBack: cardBack,
    cardImage: '/cards/neighbourhood/rabid_dog.png',
  },
  activateFn: (args: NeighborActivateFnArgs): void => {
    const player = args.player;
    const boys = player.getBoyNeighborCards();
    const girls = player.getGirlNeighborCards();
    if (boys.length == 0 && girls.length == 0) {
      player.addSoulToken(2);
    }
  },
};

export const neighbors: Array<NeighborCard> = [
  // Animals
  ...createNeighborCards(goat, 1),
  ...createNeighborCards(falcon, 50),
  ...createNeighborCards(skunk, 1),
  ...createNeighborCards(alligator, 1),
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
  ...createNeighborCards(calvin, 2),
  ...createNeighborCards(tommy, 2),
  ...createNeighborCards(donnie, 2),
  ...createNeighborCards(sam, 2),
  ...createNeighborCards(damien, 2),
  ...createNeighborCards(romeo, 2),
  ...createNeighborCards(irwin, 2),
  ...createNeighborCards(adam, 6),
];
