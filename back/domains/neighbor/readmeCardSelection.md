# Let Summon Demons (@lsd) / Neighbors

## Explication de la logique de choix de cartes

### Cas d'étude : Chouette

#### Fonction activateFn dans neighbors.ts

- La chouette contient une variable "drawableToActivateIt"
- dans la fonction activateFn de la chouette, on definit "drawnedOrNot" à false
- puis "drawableToActivateIt" à true

- Ensuite, "game.turn.current.setShouldDrawCards(1);" => voir "Dans playerTurn.ts" ⬇️

- Puis, drawnedOrNot = await game.turn.current.waitForDrawOrNot(game); => voir "Dans playerTurn.ts" ⬇️

#### Dans playerTurn.ts

##### Variables

- shouldDrawCards

##### Fonctions

- Fonction "setShouldDrawCards" : 
    
    setShouldDrawCards(number:number): void {
    this.shouldDrawCards = number;
  }

- Fonction "waitForDrawOrNot" : 

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
    }