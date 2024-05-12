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
      {itsYou && isSelectable() && gameData.turn?.current.canChoosedCard && (
        <button onClick={choosedCard}>Récupérer {cardData.name}</button>
      )}
    </article>
  );
};
