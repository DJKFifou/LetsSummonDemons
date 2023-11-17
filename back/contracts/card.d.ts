export type CardId = string;

export type CardType = 'CHURCH_CANDLE' | 'NEIGHBOR' | 'DEMON';

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
type CardInput<Card> = Omit<Card, 'id' | 'actions'>;

export interface NeighborCardData extends CardData {
  type: 'GIRL' | 'BOY' | 'ANIMAL';
  kindness?: 'NEUTRAL' | 'ADORABLE' | 'HORRIBLE';
}
export type NeighborCardInputData = CardInput<NeighborCardData>;

export interface DemonCardData extends CardData {
  isPermanent: boolean;
}
export type DemonCardInputData = CardInput<DemonCardData>;

export interface CandleCardData extends CardData {}
export type CandleCardInputData = CardInput<CandleCardData>;
