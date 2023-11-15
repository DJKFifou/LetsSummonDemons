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

## Lancer les serveurs

#### `npm run dev`

Exécute l'application front en mode développement et exécute le serveur en mode développement.
Ouvrez [http://localhost:3000](http://localhost:3000) pour l'afficher le front dans votre navigateur.

La page se rechargera lorsque vous ferez des changements.

Le serveur est accessible sur [http://localhost:3010](http://localhost:3010).

## Lancer les tests

#### `npm test -w back`

Lance le programme de test du serveur en mode interactif (watch).
