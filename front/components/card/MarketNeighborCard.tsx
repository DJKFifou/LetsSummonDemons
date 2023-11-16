import { socket } from '@/socket';
import { CardData } from '@lsd/back/contracts/card';
import { Card } from './Card';
import styles from './MarketNeighborCard.module.scss';
type MarketNeighborCardProps = {
  cardData: CardData;
  isBuyable?: boolean;
};
export const MarketNeighborCard = ({
  cardData,
  isBuyable,
}: MarketNeighborCardProps) => {
  const buyNeighbor = () => {
    if (!isBuyable) {
      return;
    }
    socket.emit('turnBuyNeighbor', cardData.id);
  };

  return (
    <article className={styles.marketCard}>
      <Card cardData={cardData} />
      {isBuyable && (
        <button onClick={buyNeighbor}>Acheter {cardData.name}</button>
      )}
    </article>
  );
};
