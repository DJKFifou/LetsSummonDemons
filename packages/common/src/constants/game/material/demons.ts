import { v4 } from 'uuid';
import { DemonCardData } from '../../../contracts/game/material/card.js';

export const DEMONS_CARD_COUNT = 20;

const cardBack = '/cards/back/demons.png';

const snake: DemonCardData = {
  name: 'LE SERPENT',
  id: v4(),
  activationNumbers: [2],
  description: 'Gagnez immédiatement la partie.',
  cardImage: '/cards/demons/snake.png',
  cardBack,
  isPermanent: false,
};

const demonBook: DemonCardData = {
  name: 'LE DÉGUEULIVRE DES DÉMONS',
  id: v4(),
  activationNumbers: [3],
  description:
    'Parcourez la pioche Démon et invoquez le Démon de votre choix gratuitement.',
  subDescription:
    '(Il compte comme un de vos 3 démons nécessaires à la victoire. Mélangez ensuite la pioche Démon).',
  cardImage: '/cards/demons/degueulivre_demons.png',
  cardBack,
  isPermanent: false,
};

const bogeyMan: DemonCardData = {
  name: 'LE PĖRE FOUETTARD',
  id: v4(),
  activationNumbers: [4],
  isPermanent: false,
  description: 'Obtenez les 2 premières cartes de la pioche VOISINAGE.',
  cardImage: '/cards/demons/fouettard_father.png',
  cardBack,
};

const porcus: DemonCardData = {
  name: 'PORCUS',
  id: v4(),
  activationNumbers: [5],
  isPermanent: false,
  description: 'Récoltez 5 Âmes.',
  cardImage: '/cards/demons/porcus.png',
  cardBack,
};

const legionNanny: DemonCardData = {
  name: 'NOUNOU SOMMES LÉGION',
  id: v4(),
  activationNumbers: [6],
  isPermanent: false,
  description: 'Récoltez 5 Âmes.',
  cardImage: '/cards/demons/nounou_sommes_legion.png',
  cardBack,
};

const belzeBzz: DemonCardData = {
  name: "BELZÉ'BZZ",
  id: v4(),
  activationNumbers: [7],
  isPermanent: false,
  description: 'Activez toutes vos cartes GARÇONS et FILLES.',
  cardImage: '/cards/demons/belze_bzz.png',
  cardBack,
};

const baelHound: DemonCardData = {
  name: 'MOLOSSE DE BAËL',
  id: v4(),
  activationNumbers: [8],
  isPermanent: false,
  description: 'Pour chacun de vos Animaux, volez 1 Âme',
  subDescription: '(à vos adversaires et/ou depuis la réserve commune).',
  cardImage: '/cards/demons/bael_hound.png',
  cardBack,
};

const mechanicalSatange: DemonCardData = {
  name: 'SATANGE MÉCANIQUE',
  id: v4(),
  activationNumbers: [9],
  isPermanent: false,
  description:
    "Récoltez une Âme. Rejouez immédiatement. Seules vos cartes s'activeront durant ce tour supplémentaire.",
  cardImage: '/cards/demons/satange_mecanique.png',
  cardBack,
};

const antechrist: DemonCardData = {
  name: 'ANTÉCHRIST',
  id: v4(),
  activationNumbers: [10],
  isPermanent: false,
  description: 'Volez 5 Âmes',
  subDescription: '(aux autres joueurs et/ou depuis la réserve commune).',
  cardImage: '/cards/demons/antechrist.png',
  cardBack,
};

const mefilstopheles: DemonCardData = {
  name: 'MÉFILSTOPHÉLES',
  id: v4(),
  activationNumbers: [11],
  isPermanent: false,
  description: "Volez n'importe quelle carte d'un adversaire, dont ses Démons",
  subDescription: '(mais jamais son Cierge).',
  cardImage: '/cards/demons/mefilstopheles.png',
  cardBack,
};

const devil: DemonCardData = {
  name: 'LE DIABLE',
  id: v4(),
  activationNumbers: [12],
  isPermanent: false,
  description: "Volez toutes les cartes d'un adversaire, dont ses Démons",
  subDescription: '(mais jamais son Cierge).',
  cardImage: '/cards/demons/devil.png',
  cardBack,
};

const incesteDemon: DemonCardData = {
  name: 'DÉMON INCESTE',
  id: v4(),
  activationNumbers: [],
  isPermanent: true,
  description:
    'Tous vos GARÇONS et FILLES comptent comme à la fois ADORABLES et HORRIBLES.',
  cardImage: '/cards/demons/incest_demon.png',
  cardBack,
};

const demogorguignol: DemonCardData = {
  name: 'DÉMOGORGUIGNOL',
  id: v4(),
  activationNumbers: [],
  isPermanent: true,
  description:
    'Tous vos GARÇONS et FILLES comptent comme à la fois GARÇONS et FILLES.',
  cardImage: '/cards/demons/demogorguignol.png',
  cardBack,
};

const macabreOni: DemonCardData = {
  name: 'MACABRE ONI',
  id: v4(),
  activationNumbers: [],
  isPermanent: true,
  description: "vos GARÇONS et FILLES récoltent le double d'Âmes à votre tour.",
  cardImage: '/cards/demons/gruesome_oni.png',
  cardBack,
};

const aneModee: DemonCardData = {
  name: 'ÂNE-MODÉE',
  id: v4(),
  activationNumbers: [],
  isPermanent: true,
  description: 'Chaque fois que vous obtenez un ANIMAL récoltez une Âme.',
  cardImage: '/cards/demons/ane_modee.png',
  cardBack,
};

const baphometal: DemonCardData = {
  name: 'BAPHOMÉTAL',
  id: v4(),
  activationNumbers: [],
  isPermanent: true,
  description:
    'Vos adversaires doivent sacrifier une 4e carte pour invoquer un démon.',
  cardImage: '/cards/demons/baphometal.png',
  cardBack,
};
const dedeZuzu: DemonCardData = {
  name: 'DÉDÉ-ZUZU',
  id: v4(),
  activationNumbers: [],
  isPermanent: true,
  description:
    "Chaque fois que vous faîtes un double aux dés. Récoltez le nombre d'âmes indiqué sur la face d'un dé.",
  cardImage: '/cards/demons/dede_zuzu.png',
  cardBack,
};

const relancifer: DemonCardData = {
  name: 'RELANCIFER',
  id: v4(),
  activationNumbers: [],
  isPermanent: true,
  description: 'A votre tour: vous pouvez relancer les dés une fois.',
  subDescription:
    "(Le précédent résultat est considéré comme n'ayant jamais existé.).",
  cardImage: '/cards/demons/relancifer.png',
  cardBack,
};
const rosemaryEgg: DemonCardData = {
  name: "L'OEUF DE ROSEMARY",
  id: v4(),
  activationNumbers: [],
  isPermanent: true,
  description:
    "Quand vous invoquez ce démon. Défaussez-le immédiatement. Regardez les 3 premières cartes de la pioche Démon, invoquez l'un d'eux et défaussez les 2 autres.",
  cardImage: '/cards/demons/gruesome_oni.png',
  cardBack,
};

const spectralux: DemonCardData = {
  name: 'SPECTRALUX',
  id: v4(),
  activationNumbers: [],
  isPermanent: true,
  description:
    'Vos adversaires ne peuvent pas vous voler ni vous faire défausser.',
  cardImage: '/cards/demons/spectralux.png',
  cardBack,
};

export const demons = [
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
