export type CardId = string;

export type CardType = 'CHURCH_CANDLE' | 'NEIGHBOR' | 'DEMON';

interface CardData {
  id: CardId;
  type: CardType;
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
  neighborType: NeighborType;
  neighborKindness?: NeighborKindness;
}
export type NeighborType = 'GIRL' | 'BOY' | 'ANIMAL';
export type NeighborKindness = 'NEUTRAL' | 'ADORABLE' | 'HORRIBLE';
export type NeighborCardInputData = CardInput<NeighborCardData>;

export interface DemonCardData extends CardData {
  isPermanent: boolean;
}
export type DemonCardInputData = CardInput<DemonCardData>;

export interface CandleCardData extends CardData {}
export type CandleCardInputData = CardInput<CandleCardData>;
