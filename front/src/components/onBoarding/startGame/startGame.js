import React from 'react';
import { Link } from 'react-router-dom';
import styles from './startGame.module.scss';

function StartGame() {
  return (
    <div className={styles.App}>
      <Link to="/register">
        <button>Lancer le jeu</button>
      </Link>
    </div>
  );
}

export default StartGame;
