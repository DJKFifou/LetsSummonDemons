# Let Summon Demons (@lsd) / Neighbors

## Explication de la logique de choix de cartes

### Cas d'étude : Chouette

#### Fonction activateFn dans neighbors.ts

##### Partie concernant la défausse de la chouette

- La chouette contient une variable "drawableToActivateIt"
- dans la fonction activateFn de la chouette, on definit "drawnedOrNot" à false
- puis "drawableToActivateIt" à true

- Ensuite, "game.turn.current.setShouldDrawCards(1);" => voir "Dans playerTurn.ts" ⬇️ 1️⃣

- Puis, drawnedOrNot = await game.turn.current.waitForDrawOrNot(game); => voir "Dans playerTurn.ts" ⬇️ 2️⃣

- On retire la carte de la main : cardOwner.removeNeighborCardById(game.turn.current.playerDrawChoicesCardId[0]);
- On clean le choix, parce qu'on attends plus du joueur qu'il défausse une carte ou non :

    game.turn.current.cleanCardIdToDraw();

- puis, qu'il ai défaussé ou non, on clean les variables de "tu peux défausser" :

    card.data.drawableToActivateIt = false;
    game.turn.current.cleanShouldDrawCards();

- On ressort de tout ça avec : game.turn.data.current.playerChoosed qui nous indique si le joueur a choisi ou non
(Pas très propre pour l'instant car il faut implémenter le choix de ne pas défausser, auquel cas la variable a récupérer n'est pas s'il a choisit ou pas mais s'il a défaussé ou pas)

##### Partie concernant le "si on a défaussé la chouette"

- On donne 4 ames au joueur : cardOwner.addSoulToken(4);

- On appelle une fonction pour dire que le joueur peux remplacer des cartes du marché : 

    game.turn.current.setShouldReplaceMarketCards();

=> voir "Dans playerTurn.ts" ⬇️ 3️⃣

- Dans le front les boutons s'allument :

    const isReplacable = (cardId): boolean => {
    const currentTurn = gameData.turn?.current;
    let cardIsReplacable = false;
    if (!currentTurn || !currentTurn.shouldReplaceMarketCards) {
      return false;
    }
    const cardsCanBeReplaced = currentTurn.instanceOfMarketCanBeReplaced;
    cardsCanBeReplaced.forEach(element => {
      if(element == cardId) {
        cardIsReplacable = true;
      }
    });
    return cardIsReplacable;
  };

  En gros, si currentTurn.shouldReplaceMarketCards est true on vérifie si la carte est éligible au remplacement.


#### Dans playerTurn.ts

##### Variables

- shouldDrawCards

##### Fonctions

- Fonction "setShouldDrawCards" : 1️⃣
    
    setShouldDrawCards(number:number): void {
    this.shouldDrawCards = number;
  } ⬆️

- Fonction "waitForDrawOrNot" : 2️⃣

    while (
      this.cardIdToDraw.length <
        this.shouldDrawCards &&
      Date.now() - startTime < timeout
    ) { on attends }

    quand c'est finit :

    if (this.playerDrawChoicesCardId)
    {
      this.playerChoosed = true;
    } else {
      this.playerChoosed = false;
      throw new Error('Timeout: Card selection took too long.');
    } ⬆️

- Fonction "waitForDrawOrNot" : 3️⃣

    this.instanceOfMarketCanBeReplaced = [];
    for (const item of this.game.data.neighborsDeck.market) {
      this.instanceOfMarketCanBeReplaced.push(item.id);
    } // On conserve une copie le marché
    this.shouldReplaceMarketCards = true; // On dit à cette variable que OUI le joueur doit/peut remplacer des cartes ⬆️
