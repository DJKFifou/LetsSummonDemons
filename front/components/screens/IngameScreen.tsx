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

  const copyGameId = () => {
    navigator.clipboard.writeText(gameData.id);
  };

  const isHost = gameData.hostId === playerId;

  return (
    <article className="container mx-auto h-full flex flex-col items-center">
      {gameData.state === 'starting' && (
        <div className="flex items-center justify-center h-full text-center">
          <TranslationButtons />
          <SoundButton />
          <Logo />
          {isHost && (
            <div className="flex flex-col items-center gap-10">
              <h2 className="text-4.5xl font-semibold">
                en attente d’autres joueurs...
              </h2>
              <div className="flex items-center gap-8">
                <span className="text-3xl">{gameData.id}</span>
                <span
                  onClick={copyGameId}
                  className="p-4 border-2 border-white cursor-pointer"
                >
                  COPIER
                </span>
              </div>
              <h5 className="text-xl font-semibold">
                Envoyez ce code à vos comparses pour qu’ils rejoignent le
                cercle. Ensuite, semez le désordre.
              </h5>
              <div className="absolute left-1/2 bottom-16 -translate-x-1/2 flex flex-col gap-6 text-xl font-semibold">
                <h5>
                  {gameData.players.length} joueurs ont rejoint le rituel.
                </h5>
                <button
                  onClick={startGame}
                  className="w-96 py-4 px-6 bg-white text-black"
                >
                  {t('screens.inGame.startButton')}
                </button>
              </div>
            </div>
          )}
          {!isHost && (
            <div className="flex flex-col gap-10">
              <h2 className="text-4.5xl font-semibold">partie rejointe !</h2>
              <h5 className="text-xl font-semibold">
                En attente d’autres joueurs... ({gameData.players.length}/5)
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
