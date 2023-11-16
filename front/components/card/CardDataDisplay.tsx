import { CardData } from '@lsd/back/contracts/card';
import styles from './CardDataDisplay.module.scss';

type CardDataDisplayProps = {
  cardData: CardData;
};
export const CardDataDisplay = ({ cardData }: CardDataDisplayProps) => {
  return (
    <article className={styles.card}>
      <p>
        <b>CARD</b>
      </p>
      <p>ID: {cardData.id}</p>
      <p>NAME: {cardData.name}</p>
      <img className={styles.cardsImage} src={cardData.cardImage} alt={`Image for ${cardData.name}`} />
    </article>
  );
};
