import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';
import { Card } from '../card/Card';
import { CoveredDemonCard } from '../card/CoveredDemonCard';
import { PlayerActions } from './PlayerActions';
import styles from './PlayerDataDisplay.module.scss';

type PlayerDataDisplayProps = {
  gameData: GameData;
  playerData: PlayerData;
  itsTurn: boolean;
  itsYou: boolean;
};
export const PlayerDataDisplay = ({
  gameData,
  playerData,
  itsTurn,
  itsYou,
}: PlayerDataDisplayProps) => {

  //Display souls
  const soulImage = '/souls/soul.png';
  const soulsImages = Array.from({ length: playerData.soulsTokenCount }, (_, index) => (
    <img key={index} src={soulImage} className={styles.souls} alt={`Image for soul ${index}`} />
  ));
  //Display souls
  
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
      {itsTurn && itsYou && (
        <PlayerActions gameData={gameData} playerData={playerData} />
      )}
      <p>ID: {playerData.id}</p>
      <p>NAME: {playerData.name}</p>
      <p>SOULS: {playerData.soulsTokenCount}</p>
      <div className={styles.soulsContainer}>
        {soulsImages}
      </div>
      <p>CANDLE CARD:</p>
      <div className={styles.cards}>
        {playerData.candleCard && <Card cardData={playerData.candleCard} />}
      </div>
      <p>COVERED DEMON CARDS:</p>
      <div className={styles.cards}>
        {playerData.coveredDemonsCards.map((card) => (
          <CoveredDemonCard
            isSummonable={
              itsYou && itsTurn && !gameData.turn?.current.invokedDemon
            }
            cardData={card}
            key={card.id}
          />
        ))}
      </div>
      <p>INVOKATED DEMON CARDS:</p>
      <div className={styles.cards}>
        {playerData.summonedDemonsCards.map((card) => (
          <Card cardData={card} key={card.id} />
        ))}
      </div>
      <p>NEIGHBORS CARDS:</p>
      <div className={styles.cards}>
        {playerData.neighborsCards.map((card) => (
          <Card cardData={card} key={card.id} />
        ))}
      </div>
    </article>
  );
};
