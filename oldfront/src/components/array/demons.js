let cardBack = document.createElement('img');
cardBack.src = '/cards/back/demons.png';

let snake = {
  name: 'LE SERPENT',
  number: 2,
  description: 'Gagnez immédiatement la partie.',
  cardImage: '/cards/demons/snake.png',
  cardBack,
};

let demonBook = {
  name: 'LE DÉGUEULIVRE DES DÉMONS',
  number: 3,
  description:
    'Parcourez la pioche Démon et invoquez le Démon de votre choix gratuitement.',
  subDescription:
    '(Il compte comme un de vos 3 démons nécessaires à la victoire. Mélangez ensuite la pioche Démon).',
  cardImage: '/cards/demons/degueulivre_demons.png',
  cardBack,
};

let bogeyMan = {
  name: 'LE PĖRE FOUETTARD',
  number: 4,
  description: 'Obtenez les 2 premières cartes de la pioche VOISINAGE.',
  cardImage: '/cards/demons/fouettard_father.png',
  cardBack,
};

let porcus = {
  name: 'PORCUS',
  number: 5,
  description: 'Récoltez 5 Âmes.',
  cardImage: '/cards/demons/porcus.png',
  cardBack,
};

let legionNanny = {
  name: 'NOUNOU SOMMES LÉGION',
  number: 6,
  description: 'Récoltez 5 Âmes.',
  cardImage: '/cards/demons/nounou_sommes_legion.png',
  cardBack,
};

let belzeBzz = {
  name: "BELZÉ'BZZ",
  number: 7,
  description: 'Activez toutes vos cartes GARÇONS et FILLES.',
  cardImage: '/cards/demons/belze_bzz.png',
  cardBack,
};

let baelHound = {
  name: 'MOLOSSE DE BAËL',
  number: 8,
  description: 'Pour chacun de vos Animaux, volez 1 Âme',
  subDescription: '(à vos adversaires et/ou depuis la réserve commune).',
  cardImage: '/cards/demons/bael_hound.png',
  cardBack,
};

let mechanicalSatange = {
  name: 'SATANGE MÉCANIQUE',
  number: 9,
  description:
    "Récoltez une Âme. Rejouez immédiatement. Seules vos cartes s'activeront durant ce tour supplémentaire.",
  cardImage: '/cards/demons/satange_mecanique.png',
  cardBack,
};

let antechrist = {
  name: 'ANTÉCHRIST',
  number: 10,
  description: 'Volez 5 Âmes',
  subDescription: '(aux autres joueurs et/ou depuis la réserve commune).',
  cardImage: '/cards/demons/antechrist.png',
  cardBack,
};

let mefilstopheles = {
  name: 'MÉFILSTOPHÉLES',
  number: 11,
  description: "Volez n'importe quelle carte d'un adversaire, dont ses Démons",
  subDescription: '(mais jamais son Cierge).',
  cardImage: '/cards/demons/mefilstopheles.png',
  cardBack,
};

let devil = {
  name: 'LE DIABLE',
  number: 12,
  description: "Volez toutes les cartes d'un adversaire, dont ses Démons",
  subDescription: '(mais jamais son Cierge).',
  cardImage: '/cards/demons/devil.png',
  cardBack,
};

let incesteDemon = {
  name: 'DÉMON INCESTE',
  description:
    'Tous vos GARÇONS et FILLES comptent comme à la fois ADORABLES et HORRIBLES.',
  cardImage: '/cards/demons/incest_demon.png',
  cardBack,
};

let demogorguignol = {
  name: 'DÉMOGORGUIGNOL',
  description:
    'Tous vos GARÇONS et FILLES comptent comme à la fois GARÇONS et FILLES.',
  cardImage: '/cards/demons/demogorguignol.png',
  cardBack,
};

let macabreOni = {
  name: 'MACABRE ONI',
  description: "vos GARÇONS et FILLES récoltent le double d'Âmes à votre tour.",
  cardImage: '/cards/demons/gruesome_oni.png',
  cardBack,
};

let aneModee = {
  name: 'ÂNE-MODÉE',
  description: 'Chaque fois que vous obtenez un ANIMAL récoltez une Âme.',
  cardImage: '/cards/demons/ane_modee.png',
  cardBack,
};

let baphometal = {
  name: 'BAPHOMÉTAL',
  description:
    'Vos adversaires doivent sacrifier une 4e carte pour invoquer un démon.',
  cardImage: '/cards/demons/baphometal.png',
  cardBack,
};
let dedeZuzu = {
  name: 'DÉDÉ-ZUZU',
  description:
    "Chaque fois que vous faîtes un double aux dés. Récoltez le nombre d'âmes indiqué sur la face d'un dé.",
  cardImage: '/cards/demons/dede_zuzu.png',
  cardBack,
};

let relancifer = {
  name: 'RELANCIFER',
  description: 'A votre tour: vous pouvez relancer les dés une fois.',
  subDescription:
    "(Le précédent résultat est considéré comme n'ayant jamais existé.).",
  cardImage: '/cards/demons/relancifer.png',
  cardBack,
};
let rosemaryEgg = {
  name: "L'OEUF DE ROSEMARY",
  description:
    "Quand vous invoquez ce démon. Défaussez-le immédiatement. Regardez les 3 premières cartes de la pioche Démon, invoquez l'un d'eux et défaussez les 2 autres.",
  cardImage: '/cards/demons/gruesome_oni.png',
  cardBack,
};

let spectralux = {
  name: 'SPECTRALUX',
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
