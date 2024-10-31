import { socket } from '@/socket';
import { NeighborCardData } from '@lsd/back/contracts/card';
import { Card } from './Card';
import styles from './MarketNeighborCard.module.scss';
import { GameData } from '@lsd/back/contracts/game';
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
  const buyNeighbor = () => {
    if (!isBuyable) {
      return;
    }
    socket.emit('turnBuyNeighbor', cardData.id);
    console.log('socketEmitted');
  };
  const choosedCard = () => {
    if (!gameData.turn?.current.shouldSelectCards && !itsYou) {
      return false;
    }

    socket.emit('turnChoosedCard', cardData.id);
    console.log('socketEmitted');
  };
  const isSelectable = (): boolean => {
    const currentTurn = gameData.turn?.current;
    if (!currentTurn || !currentTurn.shouldSelectCards) {
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
    if (neighborKindness && cardData.neighborKindness) {
      const isNeighborKindnessCorrespond =
        neighborKindness && Array.isArray(neighborKindness)
          ? neighborKindness.some((kindness) =>
              cardData.neighborKindness.includes(kindness),
            )
          : cardData.neighborKindness.includes(neighborKindness);
      return (
        isRangeOfSelectionMarketChoice &&
        isTypeCorrespond &&
        isNeighborTypeCorrespond &&
        isNeighborKindnessCorrespond
      );
    } else {
      return (
        isRangeOfSelectionMarketChoice &&
        isTypeCorrespond &&
        isNeighborTypeCorrespond
      );
    }
  };
  const isReplacable = (cardId): boolean => {
    const currentTurn = gameData.turn?.current;
    let cardIsReplacable = false;
    if (!currentTurn || !currentTurn.canReplaceCard) {
      return false;
    }
    const cardsCanBeReplaced = currentTurn.instanceOfMarketCanBeReplaced;
    cardsCanBeReplaced.forEach(allowedCardId => {
      if(cardId == allowedCardId) {
        cardIsReplacable = true;
      }
    });
    return cardIsReplacable;
  };

  return (
    <article className={styles.marketCard}>
      <Card cardData={cardData} />
      {isBuyable && !gameData.turn?.current.shouldSelectCards && (
        <button onClick={buyNeighbor}>Acheter {cardData.name}</button>
      )}
      {itsYou && isSelectable() && gameData.turn?.current.canChoosedCard && (
        <button onClick={choosedCard}>Récupérer {cardData.name}</button>
      )}
      {itsYou && isReplacable(cardData.id) && gameData.turn?.current.canReplaceCard && (
        <button onClick={choosedCard}>Remplacer {cardData.name}</button>
      )}
    </article>
  );
};
