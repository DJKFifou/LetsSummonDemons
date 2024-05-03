import { socket } from '@/socket';
import { NeighborCardData } from '@lsd/back/contracts/card';
import { Card } from './Card';
import styles from './MarketNeighborCard.module.scss';
import { GameData } from '@lsd/back/contracts/game';
import { useEffect, useState } from 'react';
type MarketNeighborCardProps = {
  gameData: GameData;
  cardData: NeighborCardData;
  isBuyable?: boolean;
  itsYou: boolean;
};
export const MarketNeighborCard = ({
  gameData,
  cardData,
  isBuyable,
  itsYou,
}: MarketNeighborCardProps) => {
  const [selectedCardCount, setSelectedCardCount] = useState<number>(0);
  useEffect(() => {
    console.log('UseEffect, selectedCardCount : ', selectedCardCount);
  }, [selectedCardCount]);
  const buyNeighbor = () => {
    if (!isBuyable) {
      return;
    }
    socket.emit('turnBuyNeighbor', cardData.id);
    console.log('socketEmitted');
  };
  const choosedNeighbor = () => {
    if (!gameData.turn?.current.shouldSelectCards && !itsYou) {
      return false;
    }
    console.log('selectedCardCountBefore', selectedCardCount);
    setSelectedCardCount(selectedCardCount + 1);
    console.log('selectedCardCountAfter', selectedCardCount);

    socket.emit('turnChoosedNeighbor', cardData.id);
    console.log('socketEmitted');
  };
  const isSelectable = (): boolean => {
    const currentTurn = gameData.turn?.current;
    if (!currentTurn || !currentTurn.shouldSelectCardsFilter) {
      return false;
    }

    const { rangeOfSelection, type, neighborType, neighborKindness } =
      currentTurn.shouldSelectCardsFilter;

    const isRangeOfSelectionMarketChoice = rangeOfSelection === 'marketChoice';
    const isTypeCorrespond = type ? type.includes(cardData.type) : false;
    const isNeighborTypeCorrespond =
      neighborType && Array.isArray(neighborType)
        ? neighborType.some((type) => cardData.neighborType.includes(type))
        : false;
    const isNeighborKindnessCorrespond = neighborKindness
      ? neighborKindness == cardData.neighborKindness
      : false;

    return (
      isRangeOfSelectionMarketChoice &&
      isTypeCorrespond &&
      isNeighborTypeCorrespond &&
      isNeighborKindnessCorrespond
    );
  };

  return (
    <article className={styles.marketCard}>
      <Card isSelectable={itsYou && isSelectable()} cardData={cardData} />
      {isBuyable && (
        <button onClick={buyNeighbor}>Acheter {cardData.name}</button>
      )}
      {itsYou &&
        isSelectable() &&
        gameData.turn?.current.canChoosedNeighbor && (
          <button onClick={choosedNeighbor}>Récupérer {cardData.name}</button>
        )}
    </article>
  );
};
