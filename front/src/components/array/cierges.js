let ciergeTitle = 'Récoltez une Âme.';
let ciergeDescription = 'Les CIERGES ne peuvent JAMAIS être volés ou défaussés';
let ciergeSubDescription = 'Vous ne pouvez donc pas les sacrifier pour invoquer un Démon';
let cardBack = document.createElement("img");
cardBack.src = "/cards/back/candles.png";


let kindCandle = {
    name: 'GENTILLE BOUGIE',
    number: [3, 4, 5],
    title: ciergeTitle,
    description: ciergeDescription,
    subDescription: ciergeSubDescription,
    cardImage: "/cards/candles/kind_candle.png",
    cardBack,
};

let sweetCandle = {
    name: 'DOUCE BOUGIE',
    number: [5, 6],
    title: ciergeTitle,
    description: ciergeDescription,
    subDescription: ciergeSubDescription,
    cardImage: "/cards/candles/sweet_candle.png",
    cardBack,
};

let beginnerCandle = {
    name: 'BOUGIE DE DÉBUTANT',
    number: [6, 8],
    title: ciergeTitle,
    description: ciergeDescription,
    subDescription: ciergeSubDescription,
    cardImage: "/cards/candles/beginner_candle.png",
    cardBack,
};

let evilCandle = {
    name: 'CIERGE MALÉFIQUE',
    number: [8, 9],
    title: ciergeTitle,
    description: ciergeDescription,
    subDescription: ciergeSubDescription,
    cardImage: "/cards/candles/maleficent_candle.png",
    cardBack,
};

let devilCandle = {
    name: 'CIERGE DIABOLIQUE',
    number: [9, 10, 11],
    title: ciergeTitle,
    description: ciergeDescription,
    subDescription: ciergeSubDescription,
    cardImage: "/cards/candles/diabolic_candle.png",
    cardBack,
};

export const cierges = [kindCandle, sweetCandle, beginnerCandle, evilCandle, devilCandle];