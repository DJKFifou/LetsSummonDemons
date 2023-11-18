import { CardData } from '@lsd/back/contracts/card';
import { useState } from 'react';
import { Card } from './Card';

type CoveredDemonCard = {
  cardData: CardData;
  isSummonable?: boolean;
  isSelected?: boolean;
  isYourCard?: boolean;
  onToggleSelect?: () => void;
};
export const CoveredDemonCard = ({
  cardData,
  isSummonable,
  isSelected,
  isYourCard,
  onToggleSelect,
}: CoveredDemonCard) => {
  const [isCovered, setIsCovered] = useState(false);

  const uncover = () => isYourCard && setIsCovered(true);
  const cover = () => isYourCard && setIsCovered(false);

  return (
    <article
      onFocusCapture={uncover}
      onMouseEnter={uncover}
      onBlurCapture={cover}
      onMouseLeave={cover}
    >
      <Card
        isSelectable={isSummonable}
        isSelected={isSelected}
        onToggleSelect={onToggleSelect}
        covered={!isCovered && !isSelected}
        cardData={cardData}
      />
    </article>
  );
};
