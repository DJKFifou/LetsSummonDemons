import { NeighborsDeckData } from '@lsd/back/contracts/neighborsDeck';
import { MarketNeighborCard } from '../card/MarketNeighborCard';
import styles from './NeighborsDeck.module.scss';

interface NeighborsDeckProps {
  neighborsDeck: NeighborsDeckData;
  isMarketOpen: boolean;
}
export const NeighborsDeck = ({
  neighborsDeck,
  isMarketOpen,
}: NeighborsDeckProps) => {
  return (
    <article className={styles.deck}>
      <p>NEIGHBORS DECK</p>
      <p>{neighborsDeck.remainingCardsCount} cards remaining</p>
      <div className={styles.cards}>
        {neighborsDeck.market.map((card) => (
          <MarketNeighborCard
            isBuyable={isMarketOpen}
            cardData={card}
            key={card.id}
          />
        ))}
      </div>
    </article>
  );
};
