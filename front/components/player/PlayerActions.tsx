import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';

type GameActionsProps = {
  playerData: PlayerData;
  gameData: GameData;
  itsYou: boolean;
};

export const PlayerActions = ({ gameData, playerData, itsYou }: GameActionsProps) => {
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

  const stopCardChoice = () => {
    if (!gameData.turn?.current.shouldSelectCards && !itsYou) {
      console.log('return false');
      return false;
    }

    socket.emit('stopCardAction');
    console.log('socketEmitted');
  };

  return (
    <article>
      {current.launchedDices && (
        <span>Vous avez fait {current.dicesResult}</span>
      )}
      {current.canLaunchDices && <button onClick={testDices}>Test</button>}
      <input type="number" id="diceInput" placeholder="Entrez un nombre" />
      {current.canLaunchDices && (
        <button onClick={launchDices}>Lancer les dés</button>
      )}
      {current.canEndTurn && (
        <button onClick={endTurn}>Terminer le tour</button>
      )}
      {itsYou && current.shouldSelectCard && (
        <button onClick={stopCardChoice}>Annuler</button>
      )}
    </article>
  );
};
