# Let Summon Demons (@lsd)

## Explication de l'architecture

#### Monorepo de 3 dossiers:

- `back/` : là où toute la logique du jeu est controllée (pour éviter la triche côté front). Communique au front via socket.io (pour les données en temps réel)
- `common/` : définitions et types partagés entre le front et le back (par exemple les constantes des règles du jeu, ou les types des données qui seront échangés via socket.io entre le front et le back)
- `front/` : toute l'interface utilisateur en React

## Travailler

### Initialisation

#### `npm i --workspaces`

Installe les modules globaux et spécifiques à chaque dossier.

### Ajouter un package

Si le package est global à tous les dossiers, éxécutez la commande `npm i {le_nom_du_package}` à la racine. Sinon, éxécutez la commande dans le dossier en question (`cd {front|common|back} && npm i {le_nom_du_package}`)

## Travailler sur le Front

#### `cd front && npm start`

Exécute l'application front en mode développement.
Ouvrez [http://localhost:3000](http://localhost:3000) pour l'afficher dans votre navigateur.

La page se rechargera lorsque vous ferez des changements.

#### `cd front && npm test`

Lance le programme de test de l'application en mode interactif (watch).
Voir la section sur [l'exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d'informations.

## Travailler sur le Back

#### `cd back && npm start`

Exécute le serveur en mode développement sur [http://localhost:3010](http://localhost:3010).

#### `cd back && npm test`

Lance le programme de test du serveur en mode interactif (watch).
