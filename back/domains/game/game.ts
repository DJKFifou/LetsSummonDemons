import { v4 as uuidv4 } from 'uuid';
import { MAX_GAME_PLAYERS, MIN_GAME_PLAYERS } from '../../constants/game.js';
import { GameData, GameId, GameState } from '../../contracts/game.js';
import { TurnData } from '../../contracts/turn.js';
import { Player } from '../player/player.js';
import { Turn } from '../turn/turn.js';
import {
  JoinAlreadyStartedGameError,
  JoinFullGameError,
  StartWithoutEnoughPlayersError,
} from './game.errors.js';

export class Game implements GameData {
  id: GameId;
  players: Player[];
  state: GameState;
  turn?: TurnData;

  constructor() {
    this.id = uuidv4();
    this.players = [];
    this.turn = null;
    this.state = 'starting';
  }

  addPlayer(player: Player): Game {
    if (this.state !== 'starting') {
      throw new JoinAlreadyStartedGameError();
    }

    if (this.players.length >= MAX_GAME_PLAYERS) {
      throw new JoinFullGameError();
    }

    this.players.push(player);

    return this;
  }

  start(): Game {
    if (this.players.length < MIN_GAME_PLAYERS) {
      throw new StartWithoutEnoughPlayersError();
    }

    this.state = 'started';

    const playerIds = this.players.map((player) => player.id);
    this.turn = new Turn(playerIds);

    return this;
  }
}
