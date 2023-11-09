let cardBack = document.createElement("img");
cardBack.src = "@./cards/back/demons.png";

let snake = {
    name: 'LE SERPENT',
    number: 2,
    description: 'Gagnez immédiatement la partie.',
    cardImage: '@./cards/candles/demons/snake.png',
    cardBack,
}

let demonBook = {
    name: 'LE DÉGUEULIVRE DES DÉMONS',
    number: 3,
    description: 'Parcourez la pioche Démon et invoquez le Démon de votre choix gratuitement.',
    subDescription: '(Il compte comme un de vos 3 démons nécessaires à la victoire. Mélangez ensuite la pioche Démon).',
    cardImage: '@./cards/candles/demons/degueulivre_demons.png',
    cardBack,
}

let bogeyMan = {
    name: 'LE PĖRE FOUETTARD',
    number: 4,
    description: 'Obtenez les 2 premières cartes de la pioche VOISINAGE.',
    cardImage: '@./cards/candles/demons/fouettard_father.png',
    cardBack,
}

let porcus = {
    name: 'PORCUS',
    number: 5,
    description: 'Récoltez 5 Âmes.',
    cardImage: '@./cards/candles/demons/porcus.png',
    cardBack,
}

let legionNanny = {
    name: 'NOUNOU SOMMES LÉGION',
    number: 6,
    description: 'Récoltez 5 Âmes.',
    cardImage: '@./cards/candles/demons/nounou_sommes_legion.png',
    cardBack,
}

let belzeBzz = {
    name: 'BELZÉ\'BZZ',
    number: 7,
    description: 'Activez toutes vos cartes GARÇONS et FILLES.',
    cardImage: '@./cards/candles/demons/belze_bzz.png',
    cardBack,
}

let baelHound = {
    name: 'MOLOSSE DE BAËL',
    number: 8,
    description: 'Pour chacun de vos Animaux, volez 1 Âme',
    subDescription: '(à vos adversaires et/ou depuis la réserve commune).',
    cardImage: '@./cards/candles/demons/bael_hound.png',
    cardBack,
}

let mechanicalSatange = {
    name: 'SATANGE MÉCANIQUE',
    number: 9,
    description: 'Récoltez une Âme. Rejouez immédiatement. Seules vos cartes s\'activeront durant ce tour supplémentaire.',
    cardImage: '@./cards/candles/demons/satange_mecanique.png',
    cardBack,
}

let antechrist = {
    name: 'ANTÉCHRIST',
    number: 10,
    description: 'Volez 5 Âmes',
    subDescription: '(aux autres joueurs et/ou depuis la réserve commune).',
    cardImage: '@./cards/candles/demons/antechrist.png',
    cardBack,
}

let mefilstopheles = {
    name: 'MÉFILSTOPHÉLES',
    number: 11,
    description: 'Volez n\'importe quelle carte d\'un adversaire, dont ses Démons',
    subDescription: '(mais jamais son Cierge).',
    cardImage: '@./cards/candles/demons/mefilstopheles.png',
    cardBack,
}

let devil = {
    name: 'LE DIABLE',
    number: 12,
    description: 'Volez toutes les cartes d\'un adversaire, dont ses Démons',
    subDescription: '(mais jamais son Cierge).',
    cardImage: '@./cards/candles/demons/devil.png',
    cardBack,
}

let incesteDemon = {
    name: 'DÉMON INCESTE',
    description: 'Tous vos GARÇONS et FILLES comptent comme à la fois ADORABLES et HORRIBLES.',
    cardImage: '@./cards/candles/demons/incest_demon.png',
    cardBack,
}

let demogorguignol = {
    name: 'DÉMOGORGUIGNOL',
    description: 'Tous vos GARÇONS et FILLES comptent comme à la fois GARÇONS et FILLES.',
    cardImage: '@./cards/candles/demons/demogorguignol.png',
    cardBack,
}

let macabreOni = {
    name: 'MACABRE ONI',
    description: 'vos GARÇONS et FILLES récoltent le double d\'Âmes à votre tour.',
    cardImage: '@./cards/candles/demons/gruesome_oni.png',
    cardBack,
}

export const demons = [snake, demonBook, bogeyMan, porcus, legionNanny, belzeBzz, baelHound, mechanicalSatange, antechrist, mefilstopheles, devil, incesteDemon, demogorguignol, macabreOni];