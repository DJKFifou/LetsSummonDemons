import React, { useState } from 'react';
import { socket } from '@/socket';
import { CardData } from '@lsd/back/contracts/card';
import { Card } from './Card';

type CoveredDemonCard = {
  cardData: CardData;
  isSummonable?: boolean;
};
export const CoveredDemonCard = ({
  cardData,
  isSummonable,
}: CoveredDemonCard) => {
  const [isCovered, setIsCovered] = useState(false);

  const summonDemon = () => {
    if (!isSummonable) {
      return;
    }
    socket.emit('turnInvokeDemon', cardData.id);
  };

  return (
    <article
      onMouseEnter={() => setIsCovered(true)}
      onMouseLeave={() => setIsCovered(false)}
    >
      {isSummonable && <button onClick={summonDemon}>Summon</button>}
      <Card covered={!isCovered} cardData={cardData} />
    </article>
  );
};
