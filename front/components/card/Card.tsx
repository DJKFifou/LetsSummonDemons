import { CardData } from '@lsd/back/contracts/card';
import Image from 'next/image';
import styles from './Card.module.scss';

type CardProps = {
  cardData: CardData;
  covered?: boolean;
};
export const Card = ({ cardData, covered }: CardProps) => {
  return (
    <figure className={styles.card}>
      <Image
        className={styles.cardImage}
        src={covered ? cardData.cardBack : cardData.cardImage}
        width={500}
        height={500}
        alt=""
      />
      <figcaption className={styles.cardDescription}>
        <p>Carte {cardData.name}</p>
        <p>{cardData.description}</p>
      </figcaption>
    </figure>
  );
};
