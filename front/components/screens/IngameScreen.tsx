import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { GameDataDisplay } from '../game/Game';
import { useTranslation } from 'react-i18next';
import { TranslationButtons } from '@/components/layout/TranslationButtons';
import { SoundButton } from '@/components/layout/SoundButton';
import { Logo } from '@/components/layout/Logo';

type IngameScreenProps = {
  playerId: PlayerId;
  gameData: GameData;
};

export const IngameScreen = ({ gameData, playerId }: IngameScreenProps) => {
  const { t } = useTranslation();
  const startGame = () => {
    socket.emit('gameStart');
  };

  const isHost = gameData.hostId === playerId;

  return (
    <article className="container mx-auto h-full flex flex-col items-center">
      {gameData.state === 'starting' && (
        <div>
          <TranslationButtons />
          <SoundButton />
          <Logo />
          {isHost && (
            <div className="flex flex-col gap-10">
              <h2 className="text-4.5xl font-semibold">
                en attente d’autres joueurs...
              </h2>
              <h5 className="text-xl font-semibold">
                Envoyez ce code à vos comparses pour qu’ils rejoignent le
                cercle. Ensuite, semez le désordre.
              </h5>
              <div className="flex gap-8">
                <span>{gameData.id}</span>
                <span className="p-4 border-2 border-white">COPIER</span>
              </div>
              <button onClick={startGame}>
                {t('screens.inGame.startButton')}
              </button>
            </div>
          )}
          {!isHost && (
            <div className="flex flex-col gap-10">
              <h2 className="text-4.5xl font-semibold">partie rejointe !</h2>
              <h5 className="text-xl font-semibold">
                En attente d’autres joueurs... (2/3)
              </h5>
            </div>
          )}
        </div>
      )}
      {/* <h1>{t('screens.inGame.title')}</h1>
      {gameData.turn?.current.choiceCountdown !== null && (
        <div className="absolute top-2 right-2">
          {gameData.turn?.current.choiceCountdown}
        </div>
      )}
      {isHost && gameData.state === 'starting' && (
        <div>
          <button onClick={startGame}>{t('screens.inGame.startButton')}</button>
        </div>
      )}
      {!isHost && gameData.state === 'starting' && (
        <div>
          <button>Invité</button>
        </div>
      )} */}
      {gameData.state === 'started' && (
        <GameDataDisplay playerId={playerId} gameData={gameData} />
      )}
    </article>
  );
};
