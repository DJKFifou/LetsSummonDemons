import { CardData } from '@lsd/back/contracts/card';
import { Card } from './Card';
import styles from './MarketNeighborCard.module.scss';

type DrawnedNeighborCardProps = {
  cardData: CardData;
};
export const DrawnedNeighborCard = ({ cardData }: DrawnedNeighborCardProps) => {
  return (
    <article className={styles.marketCard}>
      <Card cardData={cardData} />
    </article>
  );
};
