# Let Summon Demons (@lsd)

## Explication de l'architecture

#### Monorepo de 3 dossiers:

- `back/` : là où toute la logique du jeu est controllée (pour éviter la triche côté front). Communique au front via socket.io (pour les données en temps réel)
- `common/` : définitions et types partagés entre le front et le back (par exemple les constantes des règles du jeu, ou les types des données qui seront échangés via socket.io entre le front et le back)
- `front/` : toute l'interface utilisateur en React

## Travailler

### Initialisation

#### `npm i`

Installe les modules globaux et spécifiques à chaque dossier.

### Ajouter un package

Si le package est global à tous les dossiers, éxécutez la commande `npm i {le_nom_du_package}`. Sinon, éxécutez la commande dans le dossier en question (`npm i {le_nom_du_package} -w {front|common|back}`)

## Travailler sur le Front

#### `npm start -w front`

Exécute l'application front en mode développement.
Ouvrez [http://localhost:3000](http://localhost:3000) pour l'afficher dans votre navigateur.

La page se rechargera lorsque vous ferez des changements.

#### `npm test -w front`

Lance le programme de test de l'application en mode interactif (watch).
Voir la section sur [l'exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d'informations.

## Travailler sur le Back

#### `npm start -w back`

Exécute le serveur en mode développement sur [http://localhost:3010](http://localhost:3010).

#### `npm test -w back`

Lance le programme de test du serveur en mode interactif (watch).
