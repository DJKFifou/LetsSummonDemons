let ciergeTitle = 'Récoltez une Âme.';
let ciergeDescription = 'Les CIERGES ne peuvent JAMAIS être volés ou défaussés';
let ciergeSubDescription = 'Vous ne pouvez donc pas les sacrifier pour invoquer un Démon';

let kindCandle = {
    name: 'GENTILLE BOUGIE',
    number: [3, 4, 5],
    title: ciergeTitle,
    description: ciergeDescription,
    subDescription: ciergeSubDescription,
};

let sweetCandle = {
    name: 'DOUCE BOUGIE',
    number: [5, 6],
    title: ciergeTitle,
    description: ciergeDescription,
    subDescription: ciergeSubDescription,
};

let beginnerCandle = {
    name: 'BOUGIE DE DÉBUTANT',
    number: [6, 8],
    title: ciergeTitle,
    description: ciergeDescription,
    subDescription: ciergeSubDescription,
};

let evilCandle = {
    name: 'CIERGE MALÉFIQUE',
    number: [8, 9],
    title: ciergeTitle,
    description: ciergeDescription,
    subDescription: ciergeSubDescription,
};

let devilCandle = {
    name: 'CIERGE DIABOLIQUE',
    number: [9, 10, 11],
    title: ciergeTitle,
    description: ciergeDescription,
    subDescription: ciergeSubDescription,
};

export const cierges = [kindCandle, sweetCandle, beginnerCandle, evilCandle, devilCandle];