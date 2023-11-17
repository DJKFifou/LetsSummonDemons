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
  const summonDemon = () => {
    if (!isSummonable) {
      return;
    }
    socket.emit('turnInvokeDemon', cardData.id);
  };

  return (
    <article>
      {isSummonable && <button onClick={summonDemon}>Summon</button>}
      <Card covered={true} cardData={cardData} />
    </article>
  );
};
