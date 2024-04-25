import { socket } from '@/socket';
import { CardData, CardId, NeighborCardData } from '@lsd/back/contracts/card';
import { Card } from './Card';
import styles from './MarketNeighborCard.module.scss';
import { GameData } from '@lsd/back/contracts/game';
import { useState } from 'react';
type MarketNeighborCardProps = {
  gameData: GameData;
  cardData: NeighborCardData;
  isBuyable?: boolean;
  itsYou: boolean;
};
export const MarketNeighborCard = ({
  gameData,
  cardData,
  isBuyable,
  itsYou,
}: MarketNeighborCardProps) => {
  const [neighborChoosen, setneighborChoosen] = useState<CardId | null>(null);
  const buyNeighbor = () => {
    if (!isBuyable) {
      return;
    }
    socket.emit('turnBuyNeighbor', cardData.id);
    console.log('socketEmitted');
  };
  const choosedNeighbor = () => {
    if (!gameData.turn?.current.shouldSelectCards) {
      return;
    }
    socket.emit('turnBuyNeighbor', cardData.id);
    console.log('socketEmitted');
  };
  const toggleNeighborToPick = (neighborId: CardId) => {
    setneighborChoosen(neighborId);
    if (neighborChoosen === neighborId) {
      setneighborChoosen(null);
    } else {
      setneighborChoosen(neighborId);
    }
  };
  const isSelectable = () => {
    const currentTurn = gameData.turn?.current;
    if (!currentTurn || !currentTurn.shouldSelectCardsFilter) {
      console.log(false);
      return false;
    }

    const { rangeOfSelection, type, neighborType, neighborKindness } =
      currentTurn.shouldSelectCardsFilter;
    console.log(
      'Objet de vérif :',
      rangeOfSelection,
      type,
      neighborType,
      neighborKindness,
    );
    const isRangeOfSelectionMarketChoice = rangeOfSelection === 'marketChoice';
    console.log('Bonne range ?:', isRangeOfSelectionMarketChoice);
    const isTypeCorrespond = type ? type.includes(cardData.type) : false;
    console.log('Bon type ?:', isTypeCorrespond);
    const isNeighborTypeCorrespond =
      neighborType && Array.isArray(neighborType)
        ? neighborType.some((type) => cardData.neighborType.includes(type))
        : false;
    console.log('Garcon ou fille ?:', isNeighborTypeCorrespond);
    console.log('Le type a verif : ', neighborKindness);
    console.log('Le type de la carte : ', cardData.neighborKindness);
    const isNeighborKindnessCorrespond = neighborKindness
      ? neighborKindness == cardData.neighborKindness
      : false;
    console.log('Des bonbons ou un sort :', isNeighborKindnessCorrespond);
    console.log('ItsYou ? : ', itsYou);
    return (
      isRangeOfSelectionMarketChoice &&
      isTypeCorrespond &&
      isNeighborTypeCorrespond &&
      isNeighborKindnessCorrespond
    );
  };

  return (
    <article className={styles.marketCard}>
      <Card
        isSelectable={itsYou && isSelectable()}
        isSelected={neighborChoosen === cardData.id}
        onToggleSelect={() => toggleNeighborToPick(cardData.id)}
        cardData={cardData}
      />
      {isBuyable && (
        <button onClick={buyNeighbor}>Acheter {cardData.name}</button>
      )}
      {neighborChoosen && (
        <button onClick={buyNeighbor}>Récupérer {cardData.name}</button>
      )}
    </article>
  );
};
