import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';

type IngameScreenProps = {
  playerData: PlayerData;
  gameData: GameData;
};

export const IngameScreen = ({ gameData }: IngameScreenProps) => {
  return (
    <article>
      <h1>En partie</h1>
      <div>Données de la partie : {JSON.stringify(gameData)}</div>
    </article>
  );
};
