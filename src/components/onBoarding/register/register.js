import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./register.module.scss";

function Register() {
  const [playerList, setPlayerList] = useState([]);

  function addPlayer() {
    const playerName = document.getElementById("playerName").value;
    setPlayerList([...playerList, playerName]);
    console.log(playerList);
  }

  function removePlayer() {
    const playerName = document.getElementById("playerName").value;
    const updatedList = playerList.filter(name => name !== playerName);
    setPlayerList(updatedList);
    console.log(updatedList);
  }

  return (
    <div className={styles.App}>
      <input type="text" id="playerName" placeholder="Nom du joueur" />
      <button id="addPlayer" onClick={addPlayer}>Ajouter un joueur</button>
      <button id="removePlayer" onClick={removePlayer}>Enlever un joueur</button>
      <Link to={{
        pathname: "/game",
        state: { playerList }
      }}>
        <button>Commencer la partie</button>
      </Link>
    </div>
  );
}

export default Register;
