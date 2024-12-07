import { socket } from '@/socket';
import { NeighborCardData } from '@lsd/back/contracts/card';
import { Card } from './Card';
import { GameData } from '@lsd/back/contracts/game';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const buyNeighbor = () => {
    if (!isBuyable) {
      return;
    }
    socket.emit('turnBuyNeighbor', cardData.id);
  };

  const choosedCard = () => {
    if (!gameData.turn?.current.shouldSelectCards || !itsYou) {
      return false;
    }
    console.log('La carte cliqué:', cardData);
    socket.emit('turnChoosedCard', cardData.id);
  };

  const isSelectable = (): boolean => {
    const currentTurn = gameData.turn?.current;
    if (
      !currentTurn ||
      (currentTurn.shouldSelectFilter?.actionAwaited !== 'pick' &&
        currentTurn.shouldSelectFilter?.actionAwaited !== 'steal')
    ) {
      return false;
    }

    const { rangeOfSelection, type, neighborType, neighborKindness } =
      currentTurn.shouldSelectFilter;

    const isRangeOfSelectionMarketChoice = rangeOfSelection
      ? rangeOfSelection.includes('marketChoice')
      : false;
    const isTypeCorrespond = type ? type.includes(cardData.type) : false;
    const isNeighborTypeCorrespond =
      neighborType && Array.isArray(neighborType)
        ? neighborType.some((type) => cardData.neighborType.includes(type))
        : false;
    if (neighborKindness && cardData.neighborKindness) {
      const isNeighborKindnessCorrespond =
        neighborKindness && Array.isArray(neighborKindness)
          ? neighborKindness.some(
              (kindness) => cardData.neighborKindness?.includes(kindness),
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
  const isReplacable = (cardId: any): boolean => {
    const currentTurn = gameData.turn?.current;
    let cardIsReplacable = false;
    if (!currentTurn || !currentTurn.canReplaceCard) {
      return false;
    }
    const cardsCanBeReplaced = currentTurn.instanceOfMarketCanBeReplaced;
    cardsCanBeReplaced?.forEach((allowedCardId) => {
      if (cardId == allowedCardId) {
        cardIsReplacable = true;
      }
    });
    return cardIsReplacable;
  };

  return (
    <article className="flex flex-col justify-center items-center">
      <Card cardData={cardData} />
      {isBuyable && !gameData.turn?.current.shouldSelectCards && (
        <button onClick={buyNeighbor}>
          {t('card.marketNeighborCard.buy')} {cardData.name}
        </button>
      )}
      {itsYou && isSelectable() && gameData.turn?.current.canChoosedCard && (
        <button onClick={choosedCard}>
          {t('card.marketNeighborCard.retrieve')} {cardData.name}
        </button>
      )}
      {itsYou &&
        isReplacable(cardData.id) &&
        gameData.turn?.current.canReplaceCard && (
          <button onClick={choosedCard}>Remplacer {cardData.name}</button>
        )}
    </article>
  );
};
