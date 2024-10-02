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
    console.log('socketEmitted for buyNeighbor');
  };
  const choosedCard = () => {
    if (!gameData.turn?.current.shouldSelectCards && !itsYou) {
      return false;
    }

    socket.emit('turnChoosedCard', cardData.id);
    console.log('socketEmitted for choosedCard');
  };
  const isSelectable = (): boolean => {
    const currentTurn = gameData.turn?.current;
    if (!currentTurn || !currentTurn.shouldSelectCardsFilter) {
      console.log(
        'Not selectable: currentTurn or shouldSelectCardsFilter missing',
      );
      return false;
    }

    const { rangeOfSelection, type, neighborType, neighborKindness } =
      currentTurn.shouldSelectCardsFilter;

    console.log('rangeOfSelection:', rangeOfSelection);
    console.log('cardData.type:', cardData.type);

    const isRangeOfSelectionMarketChoice = rangeOfSelection === 'marketChoice';
    const isTypeCorrespond = type ? type.includes(cardData.type) : false;
    const isNeighborTypeCorrespond =
      neighborType && Array.isArray(neighborType)
        ? neighborType.some((type) => cardData.neighborType.includes(type))
        : false;

    console.log(
      'isRangeOfSelectionMarketChoice:',
      isRangeOfSelectionMarketChoice,
    );
    console.log('isTypeCorrespond:', isTypeCorrespond);
    console.log('isNeighborTypeCorrespond:', isNeighborTypeCorrespond);

    console.log('neighborKindness:', neighborKindness);
    console.log('cardData.neighborKindness:', cardData.neighborKindness);

    if (neighborKindness && cardData.neighborKindness) {
      const isNeighborKindnessCorrespond = Array.isArray(neighborKindness)
        ? neighborKindness.some((kindness) =>
            cardData.neighborKindness.includes(kindness),
          )
        : cardData.neighborKindness.includes(neighborKindness);

      console.log(
        'isNeighborKindnessCorrespond:',
        isNeighborKindnessCorrespond,
      );

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

  console.log('isBuyable:', isBuyable);
  console.log('itsYou:', itsYou);
  console.log('isSelectable:', isSelectable());
  console.log('canChoosedCard:', gameData.turn?.current.canChoosedCard);

  return (
    <article className={styles.marketCard}>
      <Card cardData={cardData} />
      {isBuyable && !gameData.turn?.current.shouldSelectCards && (
        <button onClick={buyNeighbor}>Acheter {cardData.name}</button>
      )}
      {itsYou && isSelectable() && gameData.turn?.current.canChoosedCard && (
        <button onClick={choosedCard}>Récupérer {cardData.name}</button>
      )}
    </article>
  );
};
