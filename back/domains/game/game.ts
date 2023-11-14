import { v4 as uuidv4 } from 'uuid';
import { MAX_GAME_PLAYERS, MIN_GAME_PLAYERS } from '../../constants/game.js';
import { EntityClass } from '../../contracts/entities.js';
import { GameData, GameId, GameState } from '../../contracts/game.js';
import { Player } from '../player/player.js';
import { Turn } from '../turn/turn.js';
import {
  JoinAlreadyStartedGameError,
  JoinFullGameError,
  StartWithoutEnoughPlayersError,
} from './game.errors.js';

export class Game implements EntityClass<GameData> {
  protected id: GameId;
  protected players: Player[];
  protected state: GameState;
  turn?: Turn;

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

    const playerIds = this.players.map((player) => player.getData().id);
    this.turn = new Turn(playerIds);

    return this;
  }

  getData(): GameData {
    return {
      id: this.id,
      players: this.players.map((player) => player.getData()),
      state: this.state,
      turn: this.turn?.getData(),
    };
  }
}
