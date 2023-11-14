import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';
import { GameActions } from '../game/GameActions';
import { GameDataDisplay } from '../game/GameDataDisplay';

type IngameScreenProps = {
  playerData: PlayerData;
  gameData: GameData;
};

export const IngameScreen = ({ gameData, playerData }: IngameScreenProps) => {
  return (
    <article>
      <h1>En partie</h1>
      <GameActions gameData={gameData} playerData={playerData} />
      <GameDataDisplay gameData={gameData} />
    </article>
  );
};
