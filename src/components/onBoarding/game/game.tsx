import React from "react";
import styles from "./Game.module.scss";

function Game() {
    function goToGame () {
      <Game />
    }
    return (
      <div className={styles.head}>
        <input type="text" id="playerName" placeholder="Nom du joueur" />
        <button id="addPlayer">Ajouter un joueur</button>
        <button id="removePlayer">Enlever un joueur</button>
        <button id="goToGame" onClick={goToGame}>Commencer la partie</button>
      </div>
    );
  }
  
  export default Game;