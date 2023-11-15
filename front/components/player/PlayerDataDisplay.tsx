import { CardId } from '@lsd/back/contracts/card';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';
import { useState } from 'react';
import { CardDataDisplay } from '../card/CardDataDisplay';
import { GameActions } from './GameActions';
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
  const [selectedCoveredDemonId, setSelectedCoveredDemonId] =
    useState<CardId | null>(null);

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
        <GameActions
          gameData={gameData}
          playerData={playerData}
          selectedCoveredDemonId={selectedCoveredDemonId}
        />
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
          <CardDataDisplay
            isSelected={selectedCoveredDemonId === card.id}
            isSelectable={
              itsYou && itsTurn && !gameData.turn?.current.invokedDemon
            }
            onSelect={() => setSelectedCoveredDemonId(card.id)}
            onUnselect={() => setSelectedCoveredDemonId(null)}
            cardData={card}
            key={card.id}
          />
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
