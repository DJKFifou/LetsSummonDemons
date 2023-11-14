import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';
import { GameDataDisplay } from '../game/GameDataDisplay';

type IngameScreenProps = {
  playerData: PlayerData;
  gameData: GameData;
};

export const IngameScreen = ({ gameData }: IngameScreenProps) => {
  return (
    <article>
      <h1>En partie</h1>
      <GameDataDisplay gameData={gameData} />
    </article>
  );
};
