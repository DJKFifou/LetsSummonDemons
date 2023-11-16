export type CardId = string;

export type CardType = 'churchCandle' | 'neighbors' | 'demon';

interface CardData {
  id: CardId;
  name: string;
  action?: string;
  description?: string;
  subDescription?: string;
  cardImage: string;
  cardBack: string;
  activationNumbers: Array<number>;
}

export interface NeighborCardData extends CardData {
  type: 'GIRL' | 'BOY' | 'ANIMAL';
  kindness?: 'NEUTRAL' | 'ADORABLE' | 'HORRIBLE';
}
export type NeighborCardInputData = Omit<NeighborCardData, 'id'>;

export interface DemonCardData extends CardData {
  isPermanent: boolean;
}
export type DemonCardInputData = Omit<DemonCardData, 'id'>;

export interface CandleCardData extends CardData {}
export type CandleCardInputData = Omit<CandleCardData, 'id'>;
