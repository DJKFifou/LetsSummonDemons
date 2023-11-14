import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';

type GameActionsProps = {
  playerData: PlayerData;
  gameData: GameData;
};

export const GameActions = ({ gameData, playerData }: GameActionsProps) => {
  const startGame = () => {
    socket.emit('gameStart');
  };

  const launchDices = () => {
    socket.emit('turnLaunchDices');
  };

  const buyNeighbor = () => {
    socket.emit('turnBuyNeighbor');
  };

  const invokeDemon = () => {
    socket.emit('turnInvokeDemon');
  };

  const endTurn = () => {
    socket.emit('turnEnd');
  };

  if (gameData.state === 'starting') {
    return (
      <article>
        <button onClick={startGame}>Démarrer</button>
      </article>
    );
  }

  const currentPlayer = gameData.turn?.currentPlayer;

  if (!currentPlayer || currentPlayer.id !== playerData.id) {
    return <article></article>;
  }

  return (
    <article>
      {!currentPlayer.launchedDices && (
        <button onClick={launchDices}>Lancer les dés</button>
      )}
      {!currentPlayer.bougthNeighbor && (
        <button onClick={buyNeighbor}>Acheter le voisin sélectionné</button>
      )}
      {!currentPlayer.invokedDemon && (
        <button onClick={invokeDemon}>Invoquer le démon sélectionné</button>
      )}
      {currentPlayer.launchedDices && (
        <button onClick={endTurn}>Terminer le tour</button>
      )}
    </article>
  );
};
