import { socket } from '@/socket';
import { CardId } from '@lsd/back/contracts/card';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';
import { useState } from 'react';
import { Card } from '../card/Card';
import { CoveredDemonCard } from '../card/CoveredDemonCard';
import { Souls } from '../soul/Souls';
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
  const [demonToSummonId, setDemonToSummonId] = useState<CardId | null>(null);
  const [neighborsToSacrifice, setNeighborsToSacrifice] = useState<
    Array<CardId>
  >([]);

  const itsYourTurn = itsTurn && itsYou;

  const toggleDemonToSummon = (demonId: CardId) => {
    if (demonToSummonId === demonId) {
      setDemonToSummonId(null);
      setNeighborsToSacrifice([]);
    } else {
      setDemonToSummonId(demonId);
    }
  };

  const toggleNeighborToSacrifice = (neighborId: CardId) => {
    if (neighborsToSacrifice.includes(neighborId)) {
      setNeighborsToSacrifice(
        neighborsToSacrifice.filter((cardId) => cardId !== neighborId),
      );
    } else {
      setNeighborsToSacrifice([...neighborsToSacrifice, neighborId]);
    }
  };

  const canSummonDemon =
    demonToSummonId &&
    neighborsToSacrifice.length === 3 &&
    !gameData.turn?.current.shouldSelectCards;

  const summonDemon = () => {
    if (
      !itsYourTurn ||
      !gameData.turn?.current.canSummonDemon ||
      !demonToSummonId
    ) {
      return;
    }
    socket.emit('turnInvokeDemon', {
      demonCardId: demonToSummonId,
      neighborsSacrifiedIds: neighborsToSacrifice,
    });
  };

  const choosedCard = (cardData) => {
    if (!gameData.turn?.current.shouldSelectCards && !itsYou) {
      return false;
    }

    socket.emit('turnChoosedCard', cardData.id);
    console.log('socketEmitted');
  };

  const stopDrawSelfCardChoice = () => {
    if (gameData.turn?.current.shouldSelectCardsFilter.actionAwaited !== 'draw' || !itsYou) {
      console.log('return false');
      return false;
    }

    socket.emit('stopCardAction');
    console.log('socketEmitted');
  };

  return (
    <article className={styles.player}>
      <p>
        <b>PLAYER</b>
      </p>
      {itsTurn && (
        <p>
          <b>C&apos;est son tour</b>
        </p>
      )}
      {canSummonDemon && (
        <button onClick={summonDemon}>Invoquer le démon selectionné</button>
      )}
      {itsYourTurn && (
        <PlayerActions gameData={gameData} playerData={playerData} />
      )}
      <p>ID: {playerData.id}</p>
      <p>NAME: {playerData.name}</p>
      <Souls count={playerData.soulsTokenCount} />
      <p>CANDLE CARD:</p>
      <div className={styles.cards}>
        {playerData.candleCard && <Card cardData={playerData.candleCard} />}
      </div>
      <p>COVERED DEMON CARDS:</p>
      <div className={styles.cards}>
        {playerData.coveredDemonsCards.map((card) => (
          <CoveredDemonCard
            isYourCard={itsYou}
            isSummonable={
              itsYourTurn &&
              gameData.turn?.current.canSummonDemon &&
              !gameData.turn?.current.shouldSelectCards
            }
            cardData={card}
            onToggleSelect={() => toggleDemonToSummon(card.id)}
            isSelected={demonToSummonId === card.id}
            key={card.id}
          />
        ))}
      </div>
      <p>SUMMONED DEMON CARDS:</p>
      <div className={styles.cards}>
        {playerData.summonedDemonsCards.map((card) => (
          <Card cardData={card} key={card.id} />
        ))}
      </div>
      <p>NEIGHBORS CARDS:</p>
      <div className={styles.cards}>
        {playerData.neighborsCards.map((card) => (
          <div key={card.id}>
            <Card
              isSelectable={!!demonToSummonId}
              isSelected={neighborsToSacrifice.includes(card.id)}
              onToggleSelect={() => toggleNeighborToSacrifice(card.id)}
              cardData={card}
            />
            {itsYou && card.drawableToActivateIt && (
              <button onClick={() => choosedCard(card)}>Défausser et activer {card.name}</button>
            )}
            {itsYou && card.drawableToActivateIt && (
              <button onClick={stopDrawSelfCardChoice}>Ne pas défausser et activer {card.name}</button>
            )}
          </div>
        ))}
      </div>
    </article>
  );
};
