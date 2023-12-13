import { DemonCard } from './demon.js';

const cardBack = '/cards/back/demons.png';

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
  activateFn: async (): Promise<void> => {},
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
  activateFn: async (): Promise<void> => {},
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
  activateFn: async (): Promise<void> => {},
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
  activateFn: async (): Promise<void> => {},
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
  activateFn: async (): Promise<void> => {},
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
  activateFn: async (): Promise<void> => {},
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
  activateFn: async (): Promise<void> => {},
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
  activateFn: async (): Promise<void> => {},
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
  activateFn: async (): Promise<void> => {},
});

const incesteDemon = new DemonCard({
  data: {
    name: 'DÉMON INCESTE',
    type: 'DEMON',
    activationNumbers: [],
    isPermanent: true,
    description:
      'Tous vos GARÇONS et FILLES comptent comme à la fois ADORABLES et HORRIBLES.',
    cardImage: '/cards/demons/incest_demon.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});

const demogorguignol = new DemonCard({
  data: {
    name: 'DÉMOGORGUIGNOL',
    type: 'DEMON',
    activationNumbers: [],
    isPermanent: true,
    description:
      'Tous vos GARÇONS et FILLES comptent comme à la fois GARÇONS et FILLES.',
    cardImage: '/cards/demons/demogorguignol.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});

const macabreOni = new DemonCard({
  data: {
    name: 'MACABRE ONI',
    type: 'DEMON',
    activationNumbers: [],
    isPermanent: true,
    description:
      "vos GARÇONS et FILLES récoltent le double d'Âmes à votre tour.",
    cardImage: '/cards/demons/gruesome_oni.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});

const aneModee = new DemonCard({
  data: {
    name: 'ÂNE-MODÉE',
    type: 'DEMON',
    activationNumbers: [],
    isPermanent: true,
    description: 'Chaque fois que vous obtenez un ANIMAL récoltez une Âme.',
    cardImage: '/cards/demons/ane_modee.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});

const baphometal = new DemonCard({
  data: {
    name: 'BAPHOMÉTAL',
    type: 'DEMON',
    activationNumbers: [],
    isPermanent: true,
    description:
      'Vos adversaires doivent sacrifier une 4e carte pour invoquer un démon.',
    cardImage: '/cards/demons/baphometal.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});
const dedeZuzu = new DemonCard({
  data: {
    name: 'DÉDÉ-ZUZU',
    type: 'DEMON',
    activationNumbers: [],
    isPermanent: true,
    description:
      "Chaque fois que vous faîtes un double aux dés. Récoltez le nombre d'âmes indiqué sur la face d'un dé.",
    cardImage: '/cards/demons/dede_zuzu.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});

const relancifer = new DemonCard({
  data: {
    name: 'RELANCIFER',
    type: 'DEMON',
    activationNumbers: [],
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
    activationNumbers: [],
    isPermanent: true,
    description:
      "Quand vous invoquez ce démon. Défaussez-le immédiatement. Regardez les 3 premières cartes de la pioche Démon, invoquez l'un d'eux et défaussez les 2 autres.",
    cardImage: '/cards/demons/gruesome_oni.png',
    cardBack,
  },
  activateFn: async (): Promise<void> => {},
});

const spectralux = new DemonCard({
  data: {
    name: 'SPECTRALUX',
    type: 'DEMON',
    activationNumbers: [],
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
