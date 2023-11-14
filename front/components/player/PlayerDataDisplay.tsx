import { PlayerData } from '@lsd/back/contracts/player';
import { CardDataDisplay } from '../card/CardDataDisplay';
import styles from './PlayerDataDisplay.module.scss';

type PlayerDataDisplayProps = {
  playerData: PlayerData;
  itsTurn: boolean;
};
export const PlayerDataDisplay = ({
  playerData,
  itsTurn,
}: PlayerDataDisplayProps) => {
  return (
    <article className={styles.player}>
      <p>
        <b>PLAYER</b>
      </p>
      {itsTurn && (
        <p>
          <b>It&apos;s his turn</b>
        </p>
      )}
      <p>ID: {playerData.id}</p>
      <p>NAME: {playerData.name}</p>
      <p>SOULS: {playerData.soulsTokenCount}</p>
      <p>CANDLE CARD:</p>
      <div className={styles.cards}>
        {playerData.candleCard && (
          <CardDataDisplay cardData={playerData.candleCard} />
        )}
      </div>
      <p>COVERED DEMON CARDS:</p>
      <div className={styles.cards}>
        {playerData.coveredDemonsCards.map((card) => (
          <CardDataDisplay cardData={card} key={card.id} />
        ))}
      </div>
      <p>INVOKATED DEMON CARDS:</p>
      <div className={styles.cards}>
        {playerData.summonedDemonsCards.map((card) => (
          <CardDataDisplay cardData={card} key={card.id} />
        ))}
      </div>
      <p>NEIGHBORS CARDS:</p>
      <div className={styles.cards}>
        {playerData.neighborsCards.map((card) => (
          <CardDataDisplay cardData={card} key={card.id} />
        ))}
      </div>
    </article>
  );
};
