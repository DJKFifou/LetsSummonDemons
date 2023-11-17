import { CandleCardData } from '../contracts/card.js';
import { candles as candlesCards } from '../domains/candle/candles.js';

export const candles: Array<CandleCardData> = candlesCards.map((candle) =>
  candle.getData(),
);
