import { CandleCard } from './candle.js';

const candleAction = 'Récoltez une Âme.';
const candleDescription =
  'Les CIERGES ne peuvent JAMAIS être volés ou défaussés';
const candleSubDescription =
  'Vous ne pouvez donc pas les sacrifier pour invoquer un Démon';
const cardBack = '/cards/back/candles.png';

const kindCandle = new CandleCard({
  data: {
    name: 'GENTILLE BOUGIE',
    activationNumbers: [3, 4, 5],
    action: candleAction,
    description: candleDescription,
    subDescription: candleSubDescription,
    cardImage: '/cards/candles/kind_candle.png',
    cardBack,
  },
  activateFn: ({ player }): void => {
    player.addSoulToken(1);
  },
});

const sweetCandle = new CandleCard({
  data: {
    name: 'DOUCE BOUGIE',
    activationNumbers: [5, 6],
    action: candleAction,
    description: candleDescription,
    subDescription: candleSubDescription,
    cardImage: '/cards/candles/sweet_candle.png',
    cardBack,
  },
  activateFn: ({ player }): void => {
    player.addSoulToken(1);
  },
});

const beginnerCandle = new CandleCard({
  data: {
    name: 'BOUGIE DE DÉBUTANT',
    activationNumbers: [6, 8],
    action: candleAction,
    description: candleDescription,
    subDescription: candleSubDescription,
    cardImage: '/cards/candles/beginner_candle.png',
    cardBack,
  },
  activateFn: ({ player }): void => {
    player.addSoulToken(1);
  },
});

const evilCandle = new CandleCard({
  data: {
    name: 'CIERGE MALÉFIQUE',
    activationNumbers: [8, 9],
    action: candleAction,
    description: candleDescription,
    subDescription: candleSubDescription,
    cardImage: '/cards/candles/maleficent_candle.png',
    cardBack,
  },
  activateFn: ({ player }): void => {
    player.addSoulToken(1);
  },
});

const devilCandle = new CandleCard({
  data: {
    name: 'CIERGE DIABOLIQUE',
    activationNumbers: [9, 10, 11],
    action: candleAction,
    description: candleDescription,
    subDescription: candleSubDescription,
    cardImage: '/cards/candles/diabolic_candle.png',
    cardBack,
  },
  activateFn: ({ player }): void => {
    player.addSoulToken(1);
  },
});

export const candles: Array<CandleCard> = [
  kindCandle,
  sweetCandle,
  beginnerCandle,
  evilCandle,
  devilCandle,
];
