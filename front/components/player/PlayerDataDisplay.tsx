import { socket } from '@/socket';
import { CardId } from '@lsd/back/contracts/card';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';
import { useState } from 'react';
import { Card } from '../card/Card';
import { CoveredDemonCard } from '../card/CoveredDemonCard';
import { Souls } from '../soul/Souls';
import { PlayerActions } from './PlayerActions';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();
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

  return (
    <article className="flex flex-col gap-2 p-2 border">
      <p>
        <b>{t('player.playerDataDisplay.player')}</b>
      </p>
      {itsTurn && (
        <p>
          <b>{t('player.playerDataDisplay.turn')}</b>
        </p>
      )}
      {canSummonDemon && (
        <button onClick={summonDemon}>
          {t('player.playerDataDisplay.summonSelectedDemon')}
        </button>
      )}
      {itsYourTurn && (
        <PlayerActions gameData={gameData} playerData={playerData} />
      )}
      <p>
        {t('player.playerDataDisplay.id')}: {playerData.id}
      </p>
      <p>
        {t('player.playerDataDisplay.name')}: {playerData.name}
      </p>
      <Souls count={playerData.soulsTokenCount} />
      <p>{t('player.playerDataDisplay.candleCard')}:</p>
      <div className="flex gap-2">
        {playerData.candleCard && <Card cardData={playerData.candleCard} />}
      </div>
      <p>{t('player.playerDataDisplay.coveredDemonCards')}:</p>
      <div className="flex gap-2">
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
      <p>{t('player.playerDataDisplay.summonedDemonCards')}:</p>
      <div className="flex gap-2">
        {playerData.summonedDemonsCards.map((card) => (
          <Card cardData={card} key={card.id} />
        ))}
      </div>
      <p>{t('player.playerDataDisplay.neighborsCards')}:</p>
      <div className="flex gap-2">
        {playerData.neighborsCards.map((card) => (
          <Card
            isSelectable={!!demonToSummonId}
            isSelected={neighborsToSacrifice.includes(card.id)}
            onToggleSelect={() => toggleNeighborToSacrifice(card.id)}
            cardData={card}
            key={card.id}
          />
        ))}
      </div>
    </article>
  );
};
