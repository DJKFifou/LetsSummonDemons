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

  const testDices = () => {
    // Récupérer la valeur entrée dans le champ de texte
    const dicesNumber = parseFloat(
      (document.getElementById('diceInput') as HTMLInputElement).value,
    );

    // Envoyer la valeur au backend
    socket.emit('testDices', dicesNumber);
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
      {current.launchedDices && (
        <span>Vous avez fait {current.dicesResult}</span>
      )}
      <input type="number" id="diceInput" placeholder="Entrez un nombre" />
      <button onClick={testDices}>Test</button>
      {current.canLaunchDices && (
        <button onClick={launchDices}>Lancer les dés</button>
      )}
      {current.canEndTurn && (
        <button onClick={endTurn}>Terminer le tour</button>
      )}
    </article>
  );
};
