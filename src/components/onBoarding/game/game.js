import React, { useState, useEffect } from 'react';
import styles from "./game.module.scss";
import { Player } from "../../players/player";
import { demons } from "../../array/demons";
import { cierges } from "../../array/cierges";
import { neighbourStack } from "../../array/voisinage";

function Game({ playerList }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState();
  const [demonCards, setDemonCards] = useState([]);
  const [ciergeCards, setCiergeCards] = useState([]);
  const [neighbourCards, setNeighbourCards] = useState([]);
  const [remainingNeighbourCards, setRemainingNeighbourCards] = useState(neighbourStack);

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    console.log('Shuffled Array:', newArray);
    return newArray;
  }

  useEffect(() => {
    const shuffledDemons = shuffleArray(demons);
    const shuffledCierges = shuffleArray(cierges);
    const shuffledNeighbourStack = shuffleArray(neighbourStack);
    setRemainingNeighbourCards(shuffledNeighbourStack);

    const playerDemonCards = [];
    const playerCiergeCards = [];

    for (let i = 0; i < playerList.length; i++) {
      const player = playerList[i];

      const playerDemons = [];
      for (let j = 0; j < 3; j++) {
        const randomDemon = shuffledDemons.pop();
        playerDemons.push(randomDemon);
      }

      const playerCierge = shuffledCierges.pop(); // Prendre le cierge du dessus de la pile

      player.coveredDemonsCards = playerDemons;
      player.cierge = playerCierge;

      playerDemonCards.push(player);
      playerCiergeCards.push(player);
    }

    setDemonCards(playerDemonCards);
    setCiergeCards(playerCiergeCards);

    const drawnCards = remainingNeighbourCards.slice(0, 5);
    setRemainingNeighbourCards(remainingNeighbourCards.slice(5));
    setNeighbourCards(drawnCards);
    console.log(playerList);
    setCurrentPlayerIndex(0)
  }, [playerList]);

  function nextTurn() {
    // Calculer le prochain indice du joueur
    const nextPlayerIndex = (currentPlayerIndex + 1) % playerList.length;
    
    // Mettre à jour l'indice du joueur actif
    setCurrentPlayerIndex(nextPlayerIndex);
  };

  function buyCard(card) {
    console.log(currentPlayerIndex);
    const index=playerList.findIndex(currentPlayerIndex);
    console.log(index);
    if(currentPlayerIndex == (playerList.findIndex(currentPlayerIndex)+1)){
      console.log("ok");
      playerList[currentPlayerIndex].neighbourhoodCards.push(card);
    }
  };

  function rollButton() {
    function diceShuffle() {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      return [die1, die2];
    }
    const result = diceShuffle();
    console.log(`Dé 1: ${result[0]}, Dé 2: ${result[1]}`);
    console.log(result[0] + result[1]);
  }

  return (
    <div className={styles.App}>
      {/* Afficher le nom du joueur actif */}
      <p>Current Player: {playerList[currentPlayerIndex]?.name}</p>
      <div className={styles.entitled}>
        <span className={styles.players}>Players</span>
        <span className={styles.cards}>Cards</span>
      </div>
      {demonCards.map((player, index) => (
        <div className={styles.containerPlayer} key={index}>
          <div className={styles.container}>
            <div className={styles.contentPlayer}>{player.name}</div>
            <div className={styles.containerCards}>
              <div className={styles.containerCierge}>
                <span className={styles.contentCierge}>
                  <img src={player.cierge.cardImage} alt={`Card for ${player.cierge.name}`} />
                </span>
              </div>
              <div className={styles.containerDemons}>
                {player.coveredDemonsCards.map((demon, demonIndex) => (
                  <span key={demonIndex} className={styles.contentDemons}>
                    <img src={demon.cardImage} alt={`Card for ${demon.name}`} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.containerDeck}>
        <div className={styles.deck}>
          <span className={styles.neighbourhood}>Neighbourhood</span>
        </div>
        <div className={styles.containerNeighbours}>
          {remainingNeighbourCards.length > 0 && (
            <div>
              <img src={remainingNeighbourCards[0].backImage} alt={`Ouais ouais`} />
            </div>
          )}
          {neighbourCards.map((card, index) => (
            <div key={index} className={styles.containerNeighbours}>
              <button onClick={() => buyCard(card)}>
              <img src={card.cardImage} alt={`Card for ${card.name}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button id="rollButton" onClick={rollButton}>Lancer les dés</button>
      {/*<button id="buyCard" onClick={buyCard}>Acheter une carte du voisinage</button>*/}
      {/*<button id="summonDemon" onClick={summonDemon}>Invoquer un démon</button>*/}
      <button id="endOfTurn" onClick={nextTurn}>Fin du tour</button>
    </div>
  );
}

export default Game;