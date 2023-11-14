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
      <p>CARDS:</p>
      <div className={styles.players}>
        {playerData.cards.map((card) => (
          <CardDataDisplay cardData={card} key={card.id} />
        ))}
      </div>
    </article>
  );
};
