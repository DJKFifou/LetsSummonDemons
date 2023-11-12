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

export interface DemonCardData extends CardData {
  isPermanent: boolean;
}

export interface CandleCardData extends CardData {}
