import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';
import { GameDataDisplay } from '../game/GameDataDisplay';

type IngameScreenProps = {
  playerData: PlayerData;
  gameData: GameData;
};

export const IngameScreen = ({ gameData }: IngameScreenProps) => {
  const startGame = () => {
    socket.emit('gameStart');
  };

  return (
    <article>
      <h1>En partie</h1>
      {gameData.state === 'starting' && (
        <button onClick={startGame}>Démarrer</button>
      )}
      <GameDataDisplay gameData={gameData} />
    </article>
  );
};
