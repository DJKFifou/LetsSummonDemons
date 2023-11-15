import { v4 as uuidv4 } from 'uuid';
import { candles } from '../../constants/candles.js';
import { demons } from '../../constants/demons.js';
import {
  MAX_GAME_PLAYERS,
  MIN_GAME_PLAYERS,
  START_WITH_DEMONS_COUNT,
  START_WITH_SOUL_TOKEN_COUNT,
} from '../../constants/game.js';
import { neighbors } from '../../constants/neighbors.js';
import {
  CandleCardData,
  DemonCardData,
  NeighborCardData,
} from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { GameData, GameId, GameState } from '../../contracts/game.js';
import { shuffleArray } from '../../utils/array.js';
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
  protected candlesDeck: Array<CandleCardData>;
  protected demonsDeck: Array<DemonCardData>;
  protected neighborsDeck: Array<NeighborCardData>;

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

    this.shuffleDecks();
    this.distribute();
    this.state = 'started';

    this.turn = new Turn(this);

    return this;
  }

  end(): void {
    this.state = 'ended';
    console.log('game end');
  }

  shuffleDecks(): void {
    this.candlesDeck = shuffleArray(candles);
    this.demonsDeck = shuffleArray(demons);
    this.neighborsDeck = shuffleArray(neighbors);
  }

  distribute(): void {
    this.players.forEach((player) => {
      player.setCandleCard(this.candlesDeck.pop());

      for (let i = 0; i < START_WITH_DEMONS_COUNT; i++) {
        player.addDemonCard(this.demonsDeck.pop());
      }

      player.addSoulToken(START_WITH_SOUL_TOKEN_COUNT);
    });
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
