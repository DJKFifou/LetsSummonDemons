import { CardData } from '@lsd/back/contracts/card';
import Image from 'next/image';
import styles from './Card.module.scss';

type CardProps = {
  cardData: CardData;
  covered?: boolean;
  isSelectable?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
};
export const Card = ({
  cardData,
  covered,
  isSelected,
  isSelectable,
  onToggleSelect,
}: CardProps) => {
  return (
    <figure className={styles.card} aria-selected={isSelected}>
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

      {isSelectable && (
        <button
          onClick={onToggleSelect}
          className={styles.cardSelectBtn}
          aria-label={`Sélectionner ${cardData.name}`}
        ></button>
      )}
    </figure>
  );
};
