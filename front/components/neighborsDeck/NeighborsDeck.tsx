import { CardData } from '@lsd/back/contracts/card';
import { NeighborsDeckData } from '@lsd/back/contracts/neighborsDeck';
import { Card } from '../card/Card';
import { MarketNeighborCard } from '../card/MarketNeighborCard';
import { DrawnedNeighborCard } from '../card/DrawnNeighborCard';
import { GameData } from '@lsd/back/contracts/game';
import { useTranslation } from 'react-i18next';
import { socket } from '@/socket';

interface CoveredCardStackProps {
  cardData: CardData;
  cardCount: number;
}
const CoveredCardStack = ({ cardData, cardCount }: CoveredCardStackProps) => {
  return (
    <div className="coveredCardStack relative *:absolute ">
      {cardCount > 1 && <Card cardData={cardData} covered={true} />}
      {cardCount > 2 && <Card cardData={cardData} covered={true} />}
      {cardCount > 3 && <Card cardData={cardData} covered={true} />}
      {cardCount > 4 && <Card cardData={cardData} covered={true} />}
    </div>
  );
};

interface NeighborsDeckProps {
  gameData: GameData;
  neighborsDeck: NeighborsDeckData;
  isMarketOpen: boolean;
  itsYou: boolean;
}
export const NeighborsDeck = ({
  gameData,
  neighborsDeck,
  isMarketOpen,
  itsYou,
}: NeighborsDeckProps) => {
  const { t } = useTranslation();

  const stopCardReplacement = () => {
    if (!gameData.turn?.current.canReplaceCard || !itsYou) {
      return false;
    }

    socket.emit('stopCardAction');
    console.log('socketEmitted');
  };

  const chooseMarket = () => {
    if (
      itsYou ||
      gameData.turn?.current.shouldSelectFilter?.choiceType !== 'player'
    ) {
      return false;
    }

    socket.emit('turnChoosedPlayer', 'market');
    console.log('socketEmitted');
  };

  return (
    <article className="flex flex-col items-center gap-4">
      <h3 className="text-2xl">
        {t('neighborsDeck.neighborsDeck.neighborsDeck')}
      </h3>
      <div className="grid grid-cols-6 gap-4">
        {neighborsDeck.market[0] && (
          <CoveredCardStack
            cardCount={neighborsDeck.remainingCardsCount}
            cardData={neighborsDeck.market[0]}
          />
        )}
        {neighborsDeck.market.map((card) => (
          <MarketNeighborCard
            gameData={gameData}
            isBuyable={isMarketOpen}
            cardData={card}
            key={card.id}
            itsYou={itsYou}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 max-w-full flex-wrap">
        {itsYou && gameData.turn?.current.canReplaceCard && (
          <button onClick={stopCardReplacement}>Je m'arrète la !</button>
        )}
        {!itsYou &&
          gameData.turn?.current.canChoosedPlayer &&
          gameData.turn?.current.shouldSelectFilter?.actionAwaited ==
            'steal' && <button onClick={chooseMarket}>Je Prends ici</button>}
        <div>
          {neighborsDeck.drawned.map((card) => (
            <DrawnedNeighborCard cardData={card} key={card.id} />
          ))}
        </div>
      </div>
    </article>
  );
};
