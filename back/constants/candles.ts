import { v4 } from 'uuid';
import { CandleCardData } from '../contracts/card.js';

const candleAction = 'Récoltez une Âme.';
const candleDescription =
  'Les CIERGES ne peuvent JAMAIS être volés ou défaussés';
const candleSubDescription =
  'Vous ne pouvez donc pas les sacrifier pour invoquer un Démon';
const cardBack = '/cards/back/candles.png';

const kindCandle: CandleCardData = {
  id: v4(),
  name: 'GENTILLE BOUGIE',
  activationNumbers: [3, 4, 5],
  action: candleAction,
  description: candleDescription,
  subDescription: candleSubDescription,
  cardImage: '/cards/candles/kind_candle.png',
  cardBack,
};

const sweetCandle: CandleCardData = {
  id: v4(),
  name: 'DOUCE BOUGIE',
  activationNumbers: [5, 6],
  action: candleAction,
  description: candleDescription,
  subDescription: candleSubDescription,
  cardImage: '/cards/candles/sweet_candle.png',
  cardBack,
};

const beginnerCandle: CandleCardData = {
  id: v4(),
  name: 'BOUGIE DE DÉBUTANT',
  activationNumbers: [6, 8],
  action: candleAction,
  description: candleDescription,
  subDescription: candleSubDescription,
  cardImage: '/cards/candles/beginner_candle.png',
  cardBack,
};

const evilCandle: CandleCardData = {
  id: v4(),
  name: 'CIERGE MALÉFIQUE',
  activationNumbers: [8, 9],
  action: candleAction,
  description: candleDescription,
  subDescription: candleSubDescription,
  cardImage: '/cards/candles/maleficent_candle.png',
  cardBack,
};

const devilCandle: CandleCardData = {
  id: v4(),
  name: 'CIERGE DIABOLIQUE',
  activationNumbers: [9, 10, 11],
  action: candleAction,
  description: candleDescription,
  subDescription: candleSubDescription,
  cardImage: '/cards/candles/diabolic_candle.png',
  cardBack,
};

export const candles: Array<CandleCardData> = [
  kindCandle,
  sweetCandle,
  beginnerCandle,
  evilCandle,
  devilCandle,
];
