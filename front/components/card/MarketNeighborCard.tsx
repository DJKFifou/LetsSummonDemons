import { socket } from '@/socket';
import { CardData } from '@lsd/back/contracts/card';
import { CardDataDisplay } from './CardDataDisplay';

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
    <article>
      {isBuyable && <button onClick={buyNeighbor}>Buy</button>}
      <CardDataDisplay cardData={cardData} />
    </article>
  );
};
