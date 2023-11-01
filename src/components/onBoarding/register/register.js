import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./register.module.scss";

const playerList = []; // Déclarez la variable en dehors de la fonction pour qu'elle soit accessible globalement

function addPlayer() {
  const playerName = document.getElementById("playerName").value;
  playerList.push(playerName);
  console.log(playerList);
}

function removePlayer() {
  const playerName = document.getElementById("playerName").value;
  const index = playerList.indexOf(playerName);
  if (index > -1) {
    playerList.splice(index, 1);
  }
  console.log(playerList);
}

function Register() {
  return (
    <div className={styles.App}>
      <input type="text" id="playerName" placeholder="Nom du joueur" />
      <button id="addPlayer" onClick={addPlayer}>Ajouter un joueur</button>
      <button id="removePlayer" onClick={removePlayer}>Enlever un joueur</button>
      <Link to="/game">
        <button>Commencer la partie</button>
      </Link>
    </div>
  );
}
export { playerList };
export default Register;