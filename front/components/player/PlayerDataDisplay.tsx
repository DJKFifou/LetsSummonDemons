import { PlayerData } from '@lsd/back/contracts/player';
import { CardDataDisplay } from '../card/CardDataDisplay';
import styles from './PlayerDataDisplay.module.scss';

type PlayerDataDisplayProps = {
  playerData: PlayerData;
};
export const PlayerDataDisplay = ({ playerData }: PlayerDataDisplayProps) => {
  return (
    <article className={styles.player}>
      <p>
        <b>PLAYER</b>
      </p>
      <p>ID: {playerData.id}</p>
      <p>NAME: {playerData.name}</p>
      <p>SOULS: {playerData.soulsTokenCount}</p>
      <p>CANDLE CARD:</p>
      <div className={styles.cards}>
        {playerData.candleCard && (
          <CardDataDisplay cardData={playerData.candleCard} />
        )}
      </div>
      <p>COVERED DEMON CARDS COUNT: {playerData.coveredDemonsCardsCount}</p>
      <p>INVOKATED DEMON CARDS:</p>
      <div className={styles.cards}>
        {playerData.invokatedDemonsCards.map((card) => (
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
