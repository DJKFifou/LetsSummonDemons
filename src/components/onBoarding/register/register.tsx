import React from "react";
import styles from "./Register.module.scss";
import Game from "@/components/onBoarding/Game/Game.tsx";

function Register() {
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

export default Register;