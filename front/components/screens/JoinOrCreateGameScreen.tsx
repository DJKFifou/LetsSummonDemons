import { socket } from '@/socket';
import { useState } from 'react';

export const JoinOrCreateGameScreen = () => {
  const [name, setName] = useState('Bob');
  const [gameId, setGameId] = useState('');

  const createGame = () => {
    socket.emit('gameCreate', { playerInputData: { name } });
  };

  const joinGame = () => {
    socket.emit('gameJoin', { gameId, playerInputData: { name } });
  };

  return (
    <article>
      <h1>Créer ou rejoindre une partie</h1>
      <div>
        <label>Nom</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <button onClick={createGame}>Créer une partie</button>
      </div>
      <div>
        <label>Id de la partie</label>
        <input
          className="border"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
        <button onClick={joinGame}>Rejoindre la partie</button>
      </div>
    </article>
  );
};
