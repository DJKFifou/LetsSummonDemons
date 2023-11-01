let jane = {
    name: 'JANE',
    description: 'Obtenez une carte ANIMAL du VOISINAGE.',
    number: 6,
    genre: 'FILLE'
}

let lola = {
    name: 'LOLA',
    description: 'Pour chacun de vos GARÇONS: récoltez une Âme.',
    number: 6,
    genre: 'FILLE'
}

let eve = {
    name: 'EVE',
    description: 'Récoltez une Âme.',
    number: 6,
    genre: 'FILLE'
}

let adam = {
    name: 'ADAM',
    description: 'Récoltez une Âme.',
    number: 8,
    genre: 'GARÇON'
}

let caroline = {
    name: 'CAROLINE',
    description: 'Récoltez 5 Âmes.',
    number: 2,
    genre: 'FILLE',
    type: 'ADORABLE'
}

let regan = {
    name: 'REGAN',
    description: 'Récoltez une Âme.',
    number: 9,
    genre: 'FILLE',
    type: 'HORRIBLE'
}

let tommy = {
    name: 'TOMMY',
    description: 'Défaussez la première carte de la PIOCHE VOISINAGE : si c\'est une FILLE, obtenez-la',
    number: 9,
    genre: 'GARÇON',
    type: 'HORRIBLE'
}

let calvin = {
    name: 'CALVIN',
    description: 'Si vous avez au moins 3 HORRIBLES GAMINS : volez 2 Âmes',
    subDescription: '(aux autres joueurs et/ou depuis la réserve commune).',
    number: 9,
    genre: 'GARÇON',
    type: 'HORRIBLE'
}

let dolores = {
    name: 'DOLORÈS',
    description: '???',
    number: 10,
    genre: 'FILLE',
    type: 'HORRIBLE'
}

let sam = {
    name: 'SAM',
    description: '???',
    number: 10,
    genre: 'GARÇON',
    type: 'HORRIBLE'
}

let annie = {
    name: 'ANNIE',
    description: '???',
    number: 9,
    genre: 'FILLE',
    type: 'HORRIBLE'
}

let jesus = {
    name: 'JÉSUS',
    description: 'Récoltez 2 Âmes.',
    number: 3,
    genre: 'GARÇON',
    type: 'HORRIBLE'
}

let chuck = {
    name: 'CHUCK',
    description: 'Si vous avez un autre ADORABLE GAMIN : récoltez 2 Âmes.',
    number: 4,
    genre: 'GARÇON',
    type: 'ADORABLE'
}

let louis = {
    name: 'LOUIS',
    description: '???',
    number: 5,
    genre: 'GARÇON',
    type: 'ADORABLE'
}

let carrie = {
    name: 'CARRIE',
    description: '???',
    number: 11,
    genre: 'FILLE',
    type: 'HORRIBLE'
}

let donnie = {
    name: 'LOUIS',
    description: '???',
    number: 12,
    genre: 'GARÇON',
    type: 'HORRIBLE'
}

let lisa = {
    name: 'LISA',
    description: '???',
    number: 3,
    genre: 'FILLE',
    type: 'ADORABLE'
}

let alice = {
    name: 'ALICE',
    description: 'Défaussez les 2 premières carte de la PIOCHE VOISINAGE : obtenez chaque carte ADORABLE GAMIN ainsi défaussée',
    number: '???',
    genre: 'FILLE',
    type: 'ADORABLE'
}

let marilyn = {
    name: 'MARILYN',
    description: '???',
    number: 5,
    genre: 'FILLE',
    type: 'ADORABLE'
}

let fifi = {
    name: 'FIFI',
    description: '???',
    number: 4,
    genre: 'FILLE',
    type: 'ADORABLE'
}

let damien = {
    name: 'DAMIEN',
    description: 'Vous pouvez défaussez cette carte : dans ce cas, invoquez un Démon au hasard de votre main.',
    subDescription: '(cette action ne compte pas comme votre invocation pour ce tour.)',
    number: 11,
    genre: 'GARÇON',
    type: 'HORRIBLE'
}

let cat = {
    name: 'CHAT',
    description: 'Défaussez la 1re carte de la PIOCHE VOISINAGE : si c\'est un ANIMAL, obtenez-le.',
    number: 7,
    type: 'ANIMAL'
}

let dog = {
    name: 'CHIEN',
    description: 'Si vous avez un GARÇON ou une FILLE : récoltez une Âme.',
    number: 7,
    type: 'ANIMAL'
}

let redFish = {
    name: 'POISSOU ROUGE',
    description: 'Vous pouvez défaussez cette carte : dans ce cas, récoltez 5 Âmes.',
    number: 7,
    type: 'ANIMAL'
}

let araMacao = {
    name: 'ARA MACAO',
    description: 'Si vous avez au moins 2 GARÇON ou 2 FILLES : récoltez 2 Âmes.',
    number: 7,
    type: 'ANIMAL'
}

let rabbit = {
    name: 'LAPIN',
    description: 'Si vous avez au moins 3 ANIMAUX : récoltez 2 Âmes.',
    number: 7,
    type: 'ANIMAL'
}

let goat = {
    name: 'CHÈVRE',
    description: 'Vous pouvez défausser exactement 1 GARÇON et 1 FILLE : invoquez le Démon du dessus de la pioche gratuitement.',
    subDescription: '(Il compte parmi vos 3 démons nécessaires à la victoire.)',
    number: 7,
    type: 'ANIMAL'
}

export const voisinage = [jane, lola, eve, adam, caroline, regan, tommy, calvin, dolores, sam, annie, jesus, chuck, louis, carrie, donnie, lisa, alice, marilyn, fifi, damien, cat, dog, redFish, araMacao, rabbit, goat];

console.log(voisinage);