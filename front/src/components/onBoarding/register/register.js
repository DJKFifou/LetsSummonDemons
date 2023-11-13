import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.scss';
import { Player } from '../../players/player';

function Register({ playerList, setPlayerList }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Efface le message après 3 secondes
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  function addPlayer() {
    const playerName = document.getElementById('playerName').value;

    if (playerList.length < 5) {
      const player = new Player(playerName);
      setPlayerList([...playerList, player]);
      console.log(playerList);
    } else {
      setMessage('Le nombre maximum de joueurs (5) a été atteint.');
    }
  }

  function removePlayer() {
    if (selectedPlayer) {
      const updatedList = playerList.filter(
        (player) => player !== selectedPlayer,
      );
      setPlayerList(updatedList);
      // Clear the selection after removal
      setSelectedPlayer(null);
    }
  }

  return (
    <div className={styles.App}>
      <input
        className={styles.input}
        type="text"
        id="playerName"
        placeholder="Nom du joueur"
      />
      <button id="addPlayer" onClick={addPlayer}>
        Ajouter un joueur
      </button>

      <ul>
        {playerList.map((player, index) => (
          <li
            key={index}
            className={selectedPlayer === player ? styles.selected : ''}
            onClick={() => setSelectedPlayer(player)}
          >
            {player.name}
          </li>
        ))}
      </ul>

      <button id="removePlayer" onClick={removePlayer}>
        Poubelle, Hop ! Il dégage celui la !
      </button>

      <Link
        to={{
          pathname: '/game',
          state: { playerList },
        }}
      >
        <button>Commencer la partie</button>
      </Link>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default Register;
