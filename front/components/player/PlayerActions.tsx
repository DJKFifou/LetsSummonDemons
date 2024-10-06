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
    const dicesNumber = parseFloat(
      (document.getElementById('diceInput') as HTMLInputElement).value,
    );
    socket.emit('testDices', dicesNumber);
  };

  const testGiveCard = () => {
    const giveCardName = (
      document.getElementById('giveCardInput') as HTMLInputElement
    ).value;

    socket.emit('testGiveCard', giveCardName);
  };

  const endTurn = () => {
    socket.emit('turnEnd');
  };

  const current = gameData.turn?.current;

  if (!current || current.player.id !== playerData.id) {
    return <article></article>;
  }

  return (
    <article className="playerActions">
      <div className="numbersContainer">
        {current.launchedDices && (
          <span>Vous avez fait {current.dicesResult}</span>
        )}
        {current.canLaunchDices && <button onClick={testDices}>Triche</button>}
        <input type="number" id="diceInput" placeholder="Entrez un nombre" />
        {current.canLaunchDices && (
          <button onClick={launchDices}>Lancer les dés</button>
        )}
        {current.canEndTurn && (
          <button onClick={endTurn}>Terminer le tour</button>
        )}
      </div>
      <div className="giveCardContainer">
        <button onClick={testGiveCard}>Triche</button>
        <input
          type="text"
          id="giveCardInput"
          placeholder="Entrez le nom de la carte"
        />
      </div>
    </article>
  );
};
