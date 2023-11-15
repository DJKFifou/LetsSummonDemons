import { socket } from '@/socket';
import { CardData } from '@lsd/back/contracts/card';
import { CardDataDisplay } from './CardDataDisplay';

type CardDataDisplayProps = {
  cardData: CardData;
  isSummonable?: boolean;
};
export const CoveredDemonCardDataDisplay = ({
  cardData,
  isSummonable,
}: CardDataDisplayProps) => {
  const summonDemon = () => {
    if (!isSummonable) {
      return;
    }
    socket.emit('turnInvokeDemon', cardData.id);
  };

  return (
    <article>
      {isSummonable && <button onClick={summonDemon}>Summon</button>}
      <CardDataDisplay cardData={cardData} />
    </article>
  );
};
