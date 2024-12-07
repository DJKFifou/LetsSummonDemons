import { socket } from '@/socket';
import { CardData, CardId } from '@lsd/back/contracts/card';
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
    neighborsToSacrifice.length ===
      playerData.sacrificeNeighborsCountToInvokeDemon &&
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

    setDemonToSummonId(null);
    setNeighborsToSacrifice([]);
  };

  const choosedCard = (cardData: any) => {
    if (!gameData.turn?.current.shouldSelectCards) {
      return false;
    }
    console.log('La carte cliqué:', cardData);
    socket.emit('turnChoosedCard', cardData.id);
    console.log('socketEmitted');
  };

  const stopDiscardSelfCardChoice = () => {
    if (
      gameData.turn?.current.shouldSelectFilter?.actionAwaited !== 'discard' ||
      !itsYou
    ) {
      console.log('return false');
      return false;
    }

    socket.emit('stopCardAction');
    console.log('socketEmitted');
  };

  const choosePlayer = (playerId: any) => {
    if (
      itsYou ||
      gameData.turn?.current?.shouldSelectFilter?.choiceType !== 'player'
    ) {
      return false;
    }
    console.log('Le joueur choisi:', playerId);
    socket.emit('turnChoosedPlayer', playerId);
    console.log('socketEmitted');
  };

  const isSelectable = (card: any, action: string): boolean => {
    const currentTurn = gameData.turn?.current;
    if (
      !currentTurn ||
      currentTurn.shouldSelectFilter?.actionAwaited !== action
    ) {
      return false;
    }

    const {
      choiceType,
      rangeOfSelection,
      type,
      neighborType,
      neighborKindness,
    } = currentTurn.shouldSelectFilter;

    const isChoiceTypeCard = choiceType === 'card' ? true : false;

    let isRightRangeOfSelection = null;

    if (action === 'sacrifice' || action === 'active') {
      const isRangeOfSelectionSelfChoice =
        rangeOfSelection && Array.isArray(rangeOfSelection)
          ? rangeOfSelection.includes('selfChoice')
          : false;
      isRightRangeOfSelection = isRangeOfSelectionSelfChoice;
    } else if (action === 'discard') {
      isRightRangeOfSelection = true;
    } else {
      const isRangeOfSelectionOpponentChoice =
        rangeOfSelection && Array.isArray(rangeOfSelection)
          ? rangeOfSelection.includes('opponentChoice')
          : false;
      isRightRangeOfSelection = isRangeOfSelectionOpponentChoice;
    }

    const isTypeCorrespond = type ? type.includes(card.type) : false;

    const isNeighborTypeCorrespond =
      neighborType && Array.isArray(neighborType)
        ? neighborType.some((type) => card.neighborType.includes(type))
        : false;
    if (neighborKindness && card.neighborKindness) {
      const isNeighborKindnessCorrespond =
        neighborKindness && Array.isArray(neighborKindness)
          ? neighborKindness.some((kindness) =>
              card.neighborKindness.includes(kindness),
            )
          : card.neighborKindness.includes(neighborKindness);
      return (
        isChoiceTypeCard &&
        isRightRangeOfSelection &&
        isTypeCorrespond &&
        isNeighborTypeCorrespond &&
        isNeighborKindnessCorrespond
      );
    } else {
      return (
        isChoiceTypeCard &&
        isRightRangeOfSelection &&
        isTypeCorrespond &&
        isNeighborTypeCorrespond
      );
    }
  };

  return (
    <article className="flex flex-col gap-2 p-2 border">
      <p>
        <b>{t('player.playerDataDisplay.player')}</b>
        {!itsYou && gameData.turn?.current.canChoosedPlayer && (
          <button onClick={() => choosePlayer(playerData.id)}>
            Choisir ce joueur
          </button>
        )}
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
        <PlayerActions
          gameData={gameData}
          playerData={playerData}
          itsYou={itsYou}
        />
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
          <div key={card.id}>
            <Card
              isSelectable={!!demonToSummonId}
              isSelected={neighborsToSacrifice.includes(card.id)}
              onToggleSelect={() => toggleNeighborToSacrifice(card.id)}
              cardData={card}
            />
            {itsYou && card.discardableToActivateIt && (
              <button onClick={() => choosedCard(card)}>
                Défausser et activer {card.name}
              </button>
            )}
            {itsYou && card.discardableToActivateIt && (
              <button onClick={stopDiscardSelfCardChoice}>
                Ne pas défausser et activer {card.name}
              </button>
            )}
            {!itsYou &&
              isSelectable(card, 'steal') &&
              gameData.turn?.current.canChoosedCard && (
                <button onClick={() => choosedCard(card)}>
                  Voler {card.name}
                </button>
              )}
            {gameData.turn?.current?.shouldSelectFilter?.rangeOfSelection?.includes(
              'opponentChoice',
            )
              ? !itsYou &&
                isSelectable(card, 'discard') &&
                gameData.turn?.current.canChoosedCard && (
                  <button onClick={() => choosedCard(card)}>
                    Défausser {card.name}
                  </button>
                )
              : itsYou &&
                isSelectable(card, 'discard') &&
                gameData.turn?.current.canChoosedCard && (
                  <button onClick={() => choosedCard(card)}>
                    Défausser {card.name}
                  </button>
                )}
            {itsYou &&
              isSelectable(card, 'sacrifice') &&
              gameData.turn?.current.canChoosedCard && (
                <button onClick={() => choosedCard(card)}>
                  Sacrifier {card.name}
                </button>
              )}
            {itsYou &&
              isSelectable(card, 'active') &&
              gameData.turn?.current.canChoosedCard &&
              card.name !== 'DESTINY' && (
                <button onClick={() => choosedCard(card)}>
                  Activer {card.name}
                </button>
              )}
          </div>
        ))}
      </div>
    </article>
  );
};
