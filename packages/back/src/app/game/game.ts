import {
  GameData,
  GameId,
  GameState,
} from '@letssummondemons/common/src/contracts/game/game.js';
import { TurnData } from '@letssummondemons/common/src/contracts/game/turn.js';
import { v4 as uuidv4 } from 'uuid';
import { Player } from '../player/player.js';
import { Turn } from '../turn/turn.js';
import {
  JoinAlreadyStartedGameError,
  JoinFullGameError,
  StartWithoutEnoughPlayersError,
} from './game.errors.js';

export class Game implements GameData {
  readonly MIN_PLAYER = 2;
  readonly MAX_PLAYER = 10;

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

    if (this.players.length >= this.MAX_PLAYER) {
      throw new JoinFullGameError();
    }

    this.players.push(player);

    return this;
  }

  start(): Game {
    if (this.players.length < this.MIN_PLAYER) {
      throw new StartWithoutEnoughPlayersError();
    }

    this.state = 'started';

    const playerIds = this.players.map((player) => player.id);
    this.turn = new Turn(playerIds);

    return this;
  }
}
