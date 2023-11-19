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
type CardInput<Card extends NeighborCardData | DemonCardData | CandleCardData> =
  Omit<Card, 'id'>;

export type NeighborType = 'GIRL' | 'BOY' | 'ANIMAL';
export type NeighborKindness = 'NEUTRAL' | 'ADORABLE' | 'HORRIBLE';
export type NeighborCardInputData = CardInput<NeighborCardData>;
export interface NeighborCardData extends CardData {
  neighborType: NeighborType;
  neighborKindness?: NeighborKindness;
  isActivable: boolean;
}

export interface DemonCardData extends CardData {
  isPermanent: boolean;
}
export type DemonCardInputData = CardInput<DemonCardData>;

export interface CandleCardData extends CardData {}
export type CandleCardInputData = CardInput<CandleCardData>;

interface CardFilter {
  ids?: Array<CardId>;
  types?: Array<CardType>;
  neighborTypes?: Array<NeighborType>;
  neighborKindnesses?: Array<NeighborKindness>;
  activationNumbers?: Array<number>;
}
