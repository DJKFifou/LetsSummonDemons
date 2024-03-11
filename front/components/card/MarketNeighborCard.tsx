import { socket } from '@/socket';
import { CardData, CardId, NeighborCardData } from '@lsd/back/contracts/card';
import { Card } from './Card';
import styles from './MarketNeighborCard.module.scss';
import { GameData } from '@lsd/back/contracts/game';
import { useState } from 'react';
type MarketNeighborCardProps = {
  gameData: GameData;
  cardData: NeighborCardData;
  isBuyable?: boolean;
};
export const MarketNeighborCard = ({
  gameData,
  cardData,
  isBuyable,
}: MarketNeighborCardProps) => {
  const [neighborChoosen, setneighborChoosen] = useState<CardId | null>(null);
  const buyNeighbor = () => {
    if (!isBuyable) {
      return;
    }
    socket.emit('turnBuyNeighbor', cardData.id);
  };
  const toggleNeighborToPick = (neighborId: CardId) => {
    setneighborChoosen(neighborId);
  };
  const isSelectable = () => {
    const currentTurn = gameData.turn?.current;
    if (!currentTurn || !currentTurn.shouldSelectCardsFilter) {
      console.log(false);
      return false;
    }

    const { rangeOfSelection, type, neighborType, neighborKindness } =
      currentTurn.shouldSelectCardsFilter;
    console.log(rangeOfSelection, type, neighborType, neighborKindness);
    const isRangeOfSelectionMarketChoice = rangeOfSelection === 'marketChoice';
    console.log(isRangeOfSelectionMarketChoice);
    const isTypeIncluded = type ? type.includes(cardData.type) : false;
    console.log(isTypeIncluded);
    const isNeighborTypeIncluded =
      neighborType && Array.isArray(neighborType)
        ? neighborType.some((type) => cardData.neighborType.includes(type))
        : false;
    console.log(isNeighborTypeIncluded);
    const isNeighborKindnessIncluded =
      neighborKindness && Array.isArray(neighborKindness)
        ? neighborKindness.some((kindness) =>
            cardData.neighborKindness!.includes(kindness),
          )
        : false;
    console.log(isNeighborKindnessIncluded);
    return (
      isRangeOfSelectionMarketChoice &&
      isTypeIncluded &&
      isNeighborTypeIncluded &&
      isNeighborKindnessIncluded
    );
  };

  return (
    <article className={styles.marketCard}>
      <Card
        isSelectable={isSelectable()}
        isSelected={neighborChoosen === cardData.id}
        onToggleSelect={() => toggleNeighborToPick(cardData.id)}
        cardData={cardData}
      />
      {isBuyable && (
        <button onClick={buyNeighbor}>Acheter {cardData.name}</button>
      )}
    </article>
  );
};
