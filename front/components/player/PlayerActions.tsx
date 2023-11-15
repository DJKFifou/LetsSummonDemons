import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';

type GameActionsProps = {
  playerData: PlayerData;
  gameData: GameData;
};

export const PlayerActions = ({ gameData, playerData }: GameActionsProps) => {
  const launchDices = () => {
    socket.emit('turnLaunchDices');
  };

  const endTurn = () => {
    socket.emit('turnEnd');
  };

  const current = gameData.turn?.current;

  if (!current || current.player.id !== playerData.id) {
    return <article></article>;
  }

  return (
    <article>
      {!current.launchedDices && (
        <button onClick={launchDices}>Lancer les dés</button>
      )}
      {current.launchedDices && (
        <button onClick={endTurn}>Terminer le tour</button>
      )}
    </article>
  );
};
