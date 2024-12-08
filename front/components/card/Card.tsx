import { CardData } from '@lsd/back/contracts/card';
import Image from 'next/image';
import { GameData } from '@lsd/back/contracts/game';
import { useTranslation } from 'react-i18next';

type CardProps = {
  gameData?: GameData;
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
  const { t } = useTranslation();
  return (
    <figure
      className={`card relative ${
        cardData.type === 'DEMON' ? 'w-[3vw]' : 'w-[10vw]'
      } rounded-full`}
      aria-selected={isSelected}
    >
      <Image
        className="w-full h-auto aspect-square"
        src={covered ? cardData.cardBack : cardData.cardImage}
        width={500}
        height={500}
        alt=""
      />

      <figcaption className="hidden absolute top-0 left-0 w-px h-px">
        <p>
          {t('card.card.card')} {cardData.name}
        </p>
        <p>{cardData.description}</p>
      </figcaption>

      {isSelectable && (
        <button
          onClick={onToggleSelect}
          className="absolute top-0 left-0 w-full h-full border-none bg-transparent rounded-full"
          aria-label={`Sélectionner ${cardData.name}`}
        ></button>
      )}
    </figure>
  );
};
