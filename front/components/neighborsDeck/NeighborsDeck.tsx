import { CardData } from '@lsd/back/contracts/card';
import { NeighborsDeckData } from '@lsd/back/contracts/neighborsDeck';
import { Card } from '../card/Card';
import { MarketNeighborCard } from '../card/MarketNeighborCard';
import { DrawnedNeighborCard } from '../card/DrawnNeighborCard';
import styles from './NeighborsDeck.module.scss';
import { GameData } from '@lsd/back/contracts/game';

interface CoveredCardStackProps {
  cardData: CardData;
  cardCount: number;
}
const CoveredCardStack = ({ cardData, cardCount }: CoveredCardStackProps) => {
  return (
    <div className={styles.coveredCardStack}>
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
  return (
    <article className={styles.deck}>
      <h3>Voisinage</h3>
      <div className={styles.cards}>
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
      <div className={styles.neighborsDrawned}>
        {neighborsDeck.drawned.map((card) => (
          <DrawnedNeighborCard cardData={card} key={card.id} />
        ))}
      </div>
    </article>
  );
};
