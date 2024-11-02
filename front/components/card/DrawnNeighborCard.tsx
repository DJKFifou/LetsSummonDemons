import { CardData } from '@lsd/back/contracts/card';
import { Card } from './Card';

type DrawnedNeighborCardProps = {
  cardData: CardData;
};
export const DrawnedNeighborCard = ({ cardData }: DrawnedNeighborCardProps) => {
  return (
    <article className="flex flex-col justify-center">
      <Card cardData={cardData} />
    </article>
  );
};
