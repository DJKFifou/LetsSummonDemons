import { socket } from '@/socket';
import { useEffect, useState } from 'react';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { ShowDeckDisplay } from '../game/ShowDeck';
import { GameDataDisplay } from '../game/Game';
import { useTranslation } from 'react-i18next';
import { TranslationButtons } from '@/components/layout/TranslationButtons';
import { SoundButton } from '@/components/layout/SoundButton';
import { Logo } from '@/components/layout/Logo';

type IngameScreenProps = {
  playerId: PlayerId;
  gameData: GameData;
};

interface ConsoleMessage {
  text: string;
  timestamp: number;
  id: number;
  opacity: number;
}

export const IngameScreen = ({ gameData, playerId }: IngameScreenProps) => {
  const { t } = useTranslation();

  // const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);

  // const MESSAGE_LIFETIME = 8000;
  // const FADE_DURATION = 1000;

  // useEffect(() => {
  //   const newMessages = gameData.gameConsole.map((line, index) => ({
  //     text: line,
  //     timestamp: Date.now(),
  //     id: index,
  //     opacity: 1,
  //   }));

  //   setConsoleMessages(newMessages);

  //   newMessages.forEach((message) => {
  //     setTimeout(() => {
  //       setConsoleMessages((prevMessages) =>
  //         prevMessages.map((msg) =>
  //           msg.id === message.id ? { ...msg, opacity: 0 } : msg,
  //         ),
  //       );

  //       setTimeout(() => {
  //         setConsoleMessages((prevMessages) =>
  //           prevMessages.filter((msg) => msg.id !== message.id),
  //         );
  //       }, FADE_DURATION);
  //     }, MESSAGE_LIFETIME);
  //   });
  // }, [gameData.gameConsole]);

  const showDeck = () => {
    socket.emit('deckShow');
  };

  const copyGameId = () => {
    navigator.clipboard.writeText(gameData.id);
  };

  const isHost = gameData.hostId === playerId;

  return (
    <article className="container mx-auto h-full flex flex-col items-center">
      {/* Console Start */}
      <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
        {/* {consoleMessages.map((message) => {
          const opacity = Math.max(0, message.opacity);

          return (
            <div
              key={message.id}
              className="transition-opacity duration-1000 ease-in-out"
              style={{ opacity }}
            >
              {message.text}
            </div>
          );
        })} */}
        {gameData.gameConsole.slice(-5).map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
      {/* Console End */}
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
                  onClick={showDeck}
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
      {gameData.state === 'showDeck' && (
        <ShowDeckDisplay playerId={playerId} gameData={gameData} />
      )}
      {gameData.state === 'started' && (
        <GameDataDisplay playerId={playerId} gameData={gameData} />
      )}
    </article>
  );
};
