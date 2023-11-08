let snake = {
    name: 'LE SERPENT',
    number: 2,
    description: 'Gagnez immédiatement la partie.',
    cardImage: 'snake.png',
}

let demonBook = {
    name: 'LE DÉGUEULIVRE DES DÉMONS',
    number: 3,
    description: 'Parcourez la pioche Démon et invoquez le Démon de votre choix gratuitement.',
    subDescription: '(Il compte comme un de vos 3 démons nécessaires à la victoire. Mélangez ensuite la pioche Démon).',
    cardImage: 'demonBook.png',
}

let bogeyMan = {
    name: 'LE PĖRE FOUETTARD',
    number: 4,
    description: 'Obtenez les 2 premières cartes de la pioche VOISINAGE.',
    cardImage: 'bogeyMan.png',
}

let porcus = {
    name: 'PORCUS',
    number: 5,
    description: 'Récoltez 5 Âmes.',
    cardImage: 'porcus.png',
}

let legionNanny = {
    name: 'NOUNOU SOMMES LÉGION',
    number: 6,
    description: 'Récoltez 5 Âmes.',
    cardImage: 'legionNanny.png',
}

let belzeBzz = {
    name: 'BELZÉ\'BZZ',
    number: 7,
    description: 'Activez toutes vos cartes GARÇONS et FILLES.',
    cardImage: 'belzeBzz.png',
}

let baelHound = {
    name: 'MOLOSSE DE BAËL',
    number: 8,
    description: 'Pour chacun de vos Animaux, volez 1 Âme',
    subDescription: '(à vos adversaires et/ou depuis la réserve commune).',
    cardImage: 'baelHound.png',
}

let mechanicalSatange = {
    name: 'SATANGE MÉCANIQUE',
    number: 9,
    description: 'Récoltez une Âme. Rejouez immédiatement. Seules vos cartes s\'activeront durant ce tour supplémentaire.',
    cardImage: 'mechanicalSatange.png',
}

let antechrist = {
    name: 'ANTÉCHRIST',
    number: 10,
    description: 'Volez 5 Âmes',
    subDescription: '(aux autres joueurs et/ou depuis la réserve commune).',
    cardImage: 'antechrist.png',
}

let mefilstopheles = {
    name: 'MÉFILSTOPHÉLES',
    number: 11,
    description: 'Volez n\'importe quelle carte d\'un adversaire, dont ses Démons',
    subDescription: '(mais jamais son Cierge).',
    cardImage: 'mefilstopheles.png',
}

let devil = {
    name: 'LE DIABLE',
    number: 12,
    description: 'Volez toutes les cartes d\'un adversaire, dont ses Démons',
    subDescription: '(mais jamais son Cierge).',
    cardImage: 'devil.png',
}

let incesteDemon = {
    name: 'DÉMON INCESTE',
    description: 'Tous vos GARÇONS et FILLES comptent comme à la fois ADORABLES et HORRIBLES.',
    cardImage: 'incesteDemon.png',
}

let demogorguignol = {
    name: 'DÉMOGORGUIGNOL',
    description: 'Tous vos GARÇONS et FILLES comptent comme à la fois GARÇONS et FILLES.',
    cardImage: 'demogorguignol.png',
}

let macabreOni = {
    name: 'MACABRE ONI',
    description: 'vos GARÇONS et FILLES récoltent le double d\'Âmes à votre tour.',
    cardImage: 'macabreOni.png',
}

export const demons = [snake, demonBook, bogeyMan, porcus, legionNanny, belzeBzz, baelHound, mechanicalSatange, antechrist, mefilstopheles, devil, incesteDemon, demogorguignol, macabreOni];