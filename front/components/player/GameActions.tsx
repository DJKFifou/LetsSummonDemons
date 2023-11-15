import { socket } from '@/socket';
import { CardId } from '@lsd/back/contracts/card';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';

type GameActionsProps = {
  playerData: PlayerData;
  gameData: GameData;
  selectedCoveredDemonId: CardId | null;
};

export const GameActions = ({
  gameData,
  playerData,
  selectedCoveredDemonId,
}: GameActionsProps) => {
  const launchDices = () => {
    socket.emit('turnLaunchDices');
  };

  const buyNeighbor = () => {
    socket.emit('turnBuyNeighbor');
  };

  const invokeDemon = () => {
    if (!selectedCoveredDemonId) {
      return;
    }
    socket.emit('turnInvokeDemon', selectedCoveredDemonId);
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
      {!current.bougthNeighbor && (
        <button onClick={buyNeighbor}>Acheter le voisin sélectionné</button>
      )}
      {!current.invokedDemon && selectedCoveredDemonId && (
        <button onClick={invokeDemon}>Invoquer le démon sélectionné</button>
      )}
      {current.launchedDices && (
        <button onClick={endTurn}>Terminer le tour</button>
      )}
    </article>
  );
};
