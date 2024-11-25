import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';
import { useTranslation } from 'react-i18next';

type GameActionsProps = {
  playerData: PlayerData;
  gameData: GameData;
  itsYou: boolean;
};

export const PlayerActions = ({
  gameData,
  playerData,
  itsYou,
}: GameActionsProps) => {
  const { t } = useTranslation();
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

  const stopCardChoice = () => {
    if (!gameData.turn?.current.shouldSelectCards && !itsYou) {
      console.log('return false');
      return false;
    }

    socket.emit('stopCardAction');
    console.log('socketEmitted');
  };

  return (
    <article className="playerActions">
      <div className="numbersContainer">
        {current.launchedDices && (
          <span>
            {t('player.playerActions.dicesResult')} {current.dicesResult}
          </span>
        )}
        {current.canLaunchDices && (
          <button onClick={testDices}>
            {t('player.playerActions.testDices')}
          </button>
        )}
        <input
          type="number"
          id="diceInput"
          placeholder={t('player.playerActions.diceInput')}
        />
        {current.canLaunchDices && (
          <button onClick={launchDices}>
            {t('player.playerActions.launchDices')}
          </button>
        )}
        {current.canEndTurn && (
          <button onClick={endTurn}>{t('player.playerActions.endTurn')}</button>
        )}
      </div>
      <div className="giveCardContainer">
        <button onClick={testGiveCard}>
          {t('player.playerActions.testGiveCard')}
        </button>
        <input
          type="text"
          id="giveCardInput"
          placeholder={t('player.playerActions.giveCardInput')}
        />
      </div>
      {itsYou &&
        (gameData.turn?.current.canChoosedCard ||
          gameData.turn?.current.canChoosedPlayer) && (
          <button onClick={stopCardChoice}>Annuler</button>
        )}
    </article>
  );
};
