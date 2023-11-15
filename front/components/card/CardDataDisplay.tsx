import { CardData } from '@lsd/back/contracts/card';
import styles from './CardDataDisplay.module.scss';

type CardDataDisplayProps = {
  isSelected?: boolean;
  isSelectable?: boolean;
  onSelect?: () => void;
  onUnselect?: () => void;
  cardData: CardData;
};
export const CardDataDisplay = ({
  cardData,
  isSelected,
  isSelectable,
  onSelect,
  onUnselect,
}: CardDataDisplayProps) => {
  return (
    <article className={styles.card}>
      {isSelectable && (
        <>
          {isSelected && (
            <p>
              <b>SELECTED</b>
            </p>
          )}
          {!isSelected && onSelect && (
            <button onClick={onSelect}>Select</button>
          )}
          {isSelected && onUnselect && (
            <button onClick={onUnselect}>Unselect</button>
          )}
        </>
      )}
      <p>
        <b>CARD</b>
      </p>
      <p>ID: {cardData.id}</p>
      <p>NAME: {cardData.name}</p>
    </article>
  );
};
