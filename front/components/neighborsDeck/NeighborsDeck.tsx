import { NeighborsDeckData } from '@lsd/back/contracts/neighborsDeck';
import { CardDataDisplay } from '../card/CardDataDisplay';
import styles from './NeighborsDeck.module.scss';

interface NeighborsDeckProps {
  neighborsDeck: NeighborsDeckData;
}
export const NeighborsDeck = ({ neighborsDeck }: NeighborsDeckProps) => {
  return (
    <article className={styles.deck}>
      <p>NEIGHBORS DECK</p>
      <p>{neighborsDeck.remainingCardsCount} cards remaining</p>
      <div className={styles.cards}>
        {neighborsDeck.market.map((card) => (
          <CardDataDisplay cardData={card} key={card.id} />
        ))}
      </div>
    </article>
  );
};
