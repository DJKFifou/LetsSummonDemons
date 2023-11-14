import { GameData } from '@lsd/back/contracts/game';
import { PlayerDataDisplay } from '../player/PlayerDataDisplay';
import styles from './GameDataDisplay.module.scss';

type GameDataDisplayProps = {
  gameData: GameData;
};
export const GameDataDisplay = ({ gameData }: GameDataDisplayProps) => {
  return (
    <article className={styles.game}>
      <p>
        <b>GAME</b>
      </p>
      <p>ID: {gameData.id}</p>
      <p>STATE: {gameData.state}</p>
      <p>PLAYERS:</p>
      <div className={styles.players}>
        {gameData.players.map((player) => (
          <PlayerDataDisplay playerData={player} key={player.id} />
        ))}
      </div>
    </article>
  );
};
