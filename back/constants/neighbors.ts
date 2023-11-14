import { v4 } from 'uuid';
import { NeighborCardData } from '../contracts/card.js';
import { createCardStack } from '../utils/cards.js';

const cardBack = '/cards/back/neighbourhood.png';

const jane: NeighborCardData = {
  id: v4(),
  name: 'JANE',
  description: 'Obtenez une carte ANIMAL du VOISINAGE.',
  activationNumbers: [6],
  type: 'GIRL',
  kindness: 'NEUTRAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/jane.png',
};

const lola: NeighborCardData = {
  id: v4(),
  name: 'LOLA',
  description: 'Pour chacun de vos GARÇONS: récoltez une Âme.',
  activationNumbers: [6],
  type: 'GIRL',
  kindness: 'NEUTRAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/lola.png',
};

const eve: NeighborCardData = {
  id: v4(),
  name: 'EVE',
  description: 'Récoltez une Âme.',
  activationNumbers: [6],
  type: 'GIRL',
  kindness: 'NEUTRAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/eve.png',
};

const adam: NeighborCardData = {
  id: v4(),
  name: 'ADAM',
  description: 'Récoltez une Âme.',
  activationNumbers: [8],
  type: 'BOY',
  kindness: 'NEUTRAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/adam.png',
};

const caroline: NeighborCardData = {
  id: v4(),
  name: 'CAROLINE',
  description: 'Récoltez 5 Âmes.',
  activationNumbers: [2],
  type: 'GIRL',
  kindness: 'ADORABLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/caroline.png',
};

const regan: NeighborCardData = {
  id: v4(),
  name: 'REGAN',
  description: 'Récoltez une Âme.',
  activationNumbers: [9],
  type: 'GIRL',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/regan.png',
};

const tommy: NeighborCardData = {
  id: v4(),
  name: 'TOMMY',
  description:
    "Défaussez la première carte de la PIOCHE VOISINAGE : si c'est une FILLE, obtenez-la",
  activationNumbers: [9],
  type: 'BOY',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/tommy.png',
};

const calvin: NeighborCardData = {
  id: v4(),
  name: 'CALVIN',
  description: 'Si vous avez au moins 3 HORRIBLES GAMINS : volez 2 Âmes',
  subDescription: '(aux autres joueurs et/ou depuis la réserve commune).',
  activationNumbers: [9],
  type: 'BOY',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/calvin.png',
};

const dolores: NeighborCardData = {
  id: v4(),
  name: 'DOLORÈS',
  description:
    'Remplacez tous les ADORABLES GAMINS du VOISINNAGE. Obtenez ensuite un HORRIBLE GAMIN du VOISINNAGE.',
  subDescription:
    '(Remplacer veut dire défausser une carte, puis la remplacer par une carte de la pioche VOISINAGE.).',
  activationNumbers: [10],
  type: 'GIRL',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/dolores.png',
};

const sam: NeighborCardData = {
  id: v4(),
  name: 'SAM',
  description:
    'Vous pouvez défausser un de vos ANIMAUX: dans ce cas, récoltez 6 Âmes.',
  activationNumbers: [10],
  type: 'BOY',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/sam.png',
};

const annie: NeighborCardData = {
  id: v4(),
  name: 'ANNIE',
  description:
    'Vous pouvez défausser cette carte: dans ce cas volez un GAMIN ou obtenez-en un du VOISINNAGE.',
  activationNumbers: [9],
  type: 'GIRL',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/annie.png',
};

const jesus: NeighborCardData = {
  id: v4(),
  name: 'JÉSUS',
  description: 'Récoltez 2 Âmes.',
  activationNumbers: [3],
  type: 'BOY',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/jesus.png',
};

const chuck: NeighborCardData = {
  id: v4(),
  name: 'CHUCK',
  description: 'Si vous avez un autre ADORABLE GAMIN : récoltez 2 Âmes.',
  activationNumbers: [4],
  type: 'BOY',
  kindness: 'ADORABLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/chuck.png',
};

const louis: NeighborCardData = {
  id: v4(),
  name: 'LOUIS',
  description: 'Récoltez une Âme.',
  activationNumbers: [5],
  type: 'BOY',
  kindness: 'ADORABLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/louis.png',
};

const carrie: NeighborCardData = {
  id: v4(),
  name: 'CARRIE',
  description: 'Récoltez 2 Âmes',
  activationNumbers: [11],
  type: 'GIRL',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/carrie.png',
};

const donnie: NeighborCardData = {
  id: v4(),
  name: 'DONNIE',
  description:
    'Pour chacun de vos HORRIBLES GAMINS(dont celui-ci): volez une Âme(aux autres joueurs et/ou depuis la réserve commune).',
  activationNumbers: [12],
  type: 'BOY',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/donnie.png',
};

const lisa: NeighborCardData = {
  id: v4(),
  name: 'LISA',
  description:
    'Pour chacun de vos ADORABLES GAMINS(dont celui-ci): récoltez une Âme.',
  activationNumbers: [3],
  type: 'GIRL',
  kindness: 'ADORABLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/lisa.png',
};

const alice: NeighborCardData = {
  id: v4(),
  name: 'ALICE',
  description:
    'Défaussez les 2 premières carte de la PIOCHE VOISINAGE : obtenez chaque carte ADORABLE GAMIN ainsi défaussée',
  activationNumbers: [4],
  type: 'GIRL',
  kindness: 'ADORABLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/alice.png',
};

const marilyn: NeighborCardData = {
  id: v4(),
  name: 'MARILYN',
  description: 'Obtenez une carte BOY du VOISINNAGE.',
  activationNumbers: [5],
  type: 'GIRL',
  kindness: 'ADORABLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/marilyn.png',
};

const fifi: NeighborCardData = {
  id: v4(),
  name: 'FIFI',
  description: 'Pour chacun de vos ANIMAUX: récoltez une Âme.',
  activationNumbers: [4],
  type: 'GIRL',
  kindness: 'ADORABLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/fifi.png',
};

const damien: NeighborCardData = {
  id: v4(),
  name: 'DAMIEN',
  description:
    'Vous pouvez défaussez cette carte : dans ce cas, invoquez un Démon au hasard de votre main.',
  subDescription:
    '(cette action ne compte pas comme votre invocation pour ce tour.)',
  activationNumbers: [11],
  type: 'BOY',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/damien.png',
};

const destiny: NeighborCardData = {
  id: v4(),
  name: 'DESTINY',
  description: 'Acvtivez un autre de vos ADORABLES GAMINS.',
  activationNumbers: [5],
  type: 'GIRL',
  kindness: 'ADORABLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/destiny.png',
};

const dillinger: NeighborCardData = {
  id: v4(),
  name: 'DILLINGER',
  description: 'Volez une âme',
  subDescription: '(à un adversaire ou depuis la réserve commune).',
  activationNumbers: [10],
  type: 'BOY',
  kindness: 'HORRIBLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/dillinger.png',
};

const glen: NeighborCardData = {
  id: v4(),
  name: 'GLEN',
  description:
    'Recoltez 2 Âmes et choisissez un adversaire qui récolte une Âme.',
  activationNumbers: [5],
  type: 'BOY',
  kindness: 'ADORABLE',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/glen.png',
};

const irwin: NeighborCardData = {
  id: v4(),
  name: 'IRWIN',
  description: 'Activez toutes vos cartes ANIMAUX.',
  activationNumbers: [8],
  type: 'BOY',
  kindness: 'NEUTRAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/irwin.png',
};

const romeo: NeighborCardData = {
  id: v4(),
  name: 'ROMÉO',
  description: 'Pour chacune de vos filles: récoltez une Âme.',
  activationNumbers: [8],
  type: 'BOY',
  kindness: 'NEUTRAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/romeo.png',
};

const cat: NeighborCardData = {
  id: v4(),
  name: 'CHAT',
  description:
    "Défaussez la 1re carte de la PIOCHE VOISINAGE : si c'est un ANIMAL, obtenez-le.",
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/cat.png',
};

const dog: NeighborCardData = {
  id: v4(),
  name: 'CHIEN',
  description: 'Si vous avez un BOY ou une FILLE : récoltez une Âme.',
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/dog.png',
};

const goldenFish: NeighborCardData = {
  id: v4(),
  name: 'POISSOU ROUGE',
  description:
    'Vous pouvez défaussez cette carte : dans ce cas, récoltez 5 Âmes.',
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/golden_fish.png',
};

const araMacao: NeighborCardData = {
  id: v4(),
  name: 'ARA MACAO',
  description: 'Si vous avez au moins 2 BOY ou 2 FILLES : récoltez 2 Âmes.',
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/macao_ara.png',
};

const rabbit: NeighborCardData = {
  id: v4(),
  name: 'LAPIN',
  description: 'Si vous avez au moins 3 ANIMAUX : récoltez 2 Âmes.',
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/rabbit.png',
};

const goat: NeighborCardData = {
  id: v4(),
  name: 'CHÈVRE',
  description:
    'Vous pouvez défausser exactement 1 BOY et 1 FILLE : invoquez le Démon du dessus de la pioche gratuitement.',
  subDescription: '(Il compte parmi vos 3 démons nécessaires à la victoire.)',
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/goat.png',
};

const alligator: NeighborCardData = {
  id: v4(),
  name: 'ALLIGATOR',
  description:
    "Vous pouvez défausser cette carte: dans ce cas, défaussez jusuqu'à 2 GAMINS au total parmi les cartes de vos adversaires.",
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/alligator.png',
};

const falcon: NeighborCardData = {
  id: v4(),
  name: 'FALCON',
  description:
    'Vous pouvez défausser cette carte: dans ce cas défaussez les 7 premières cartes de la PIOCHE VOISINNAGE. Obtenez chaque carte ANIMAL ainsi défaussée',
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/falcon.png',
};

const owl: NeighborCardData = {
  id: v4(),
  name: 'CHOUETTE',
  description:
    'Vous pouvez défausser cette carte: dans ce cas récoltez 4 Âmes et remplacez une oui plusieurs cartes du VOISINNAGE.',
  subDescription:
    '(Défaussez-les et remplacez-les immédiatement par de nouvelles cartes de la PIOCHE VOISINNAGE)',
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/owl.png',
};

const skunk: NeighborCardData = {
  id: v4(),
  name: 'MOUFETTE',
  description:
    'Chaque joueur doit défausser toutes ses cartes, sauf ses démons',
  subDescription: '(y compris celle-ci).',
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/skunk.png',
};
const strayCat: NeighborCardData = {
  id: v4(),
  name: 'CHAT ERRANT',
  description:
    "Si vous n'avez GARÇON ni FILLE: obtenez la carte du dessus de la pioche voisinnage.",
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/stray_cat.png',
};

const rabidDog: NeighborCardData = {
  id: v4(),
  name: 'CHIEN ENRAGÉ',
  description: "Si vous n'avez ni GARÇON ni FILLE: récoltez 2 Âmes.",
  activationNumbers: [7],
  type: 'ANIMAL',
  cardBack: cardBack,
  cardImage: '/cards/neighbourhood/rabid_dog.png',
};

export const neighbors = [
  // Animals
  ...createCardStack(goat, 1),
  ...createCardStack(falcon, 1),
  ...createCardStack(skunk, 1),
  ...createCardStack(alligator, 1),
  ...createCardStack(rabidDog, 2),
  ...createCardStack(araMacao, 2),
  ...createCardStack(rabbit, 2),
  ...createCardStack(strayCat, 2),
  ...createCardStack(owl, 4),
  ...createCardStack(goldenFish, 4),
  ...createCardStack(cat, 6),
  ...createCardStack(dog, 6),

  // Girls
  ...createCardStack(lisa, 2),
  ...createCardStack(alice, 2),
  ...createCardStack(marilyn, 2),
  ...createCardStack(destiny, 2),
  ...createCardStack(caroline, 2),
  ...createCardStack(fifi, 2),
  ...createCardStack(annie, 2),
  ...createCardStack(dolores, 2),
  ...createCardStack(carrie, 4),
  ...createCardStack(regan, 4),
  ...createCardStack(lola, 2),
  ...createCardStack(jane, 2),
  ...createCardStack(eve, 6),

  // Boys
  ...createCardStack(chuck, 2),
  ...createCardStack(glen, 2),
  ...createCardStack(jesus, 4),
  ...createCardStack(louis, 4),
  ...createCardStack(dillinger, 2),
  ...createCardStack(calvin, 2),
  ...createCardStack(tommy, 2),
  ...createCardStack(donnie, 2),
  ...createCardStack(sam, 2),
  ...createCardStack(damien, 2),
  ...createCardStack(romeo, 2),
  ...createCardStack(irwin, 2),
  ...createCardStack(adam, 6),
];
