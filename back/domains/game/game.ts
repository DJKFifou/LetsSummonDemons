import { BroadcastOperator } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { ioServer } from '../../app/io/server.js';
import { candles } from '../../constants/candles.js';
import { DICE_COUNT } from '../../constants/dices.js';
import {
  MAX_GAME_PLAYERS,
  MIN_GAME_PLAYERS,
  START_WITH_DEMONS_COUNT,
  START_WITH_SOUL_TOKEN_COUNT,
} from '../../constants/game.js';
import { neighbors } from '../../constants/neighbors.js';
import { CandleCardData } from '../../contracts/card.js';
import { EntityClass } from '../../contracts/entities.js';
import { GameData, GameId, GameState } from '../../contracts/game.js';
import {
  IServerToClientEvents,
  ISocketSessionData,
} from '../../contracts/io.js';
import { PlayerData, PlayerId } from '../../contracts/player.js';
import { shuffleArray } from '../../utils/array.js';
import { DemonCard } from '../demon/demon.js';
import { demons } from '../demon/demons.js';
import { Dice } from '../dice/dice.js';
import { NeighborsDeck } from '../neighbor/neighborsDeck.js';
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
  protected winner?: PlayerId;

  turn?: Turn;
  readonly dices: Array<Dice>;

  protected candlesDeck: Array<CandleCardData>;
  protected demonsDeck: Array<DemonCard>;
  neighborsDeck?: NeighborsDeck;

  constructor() {
    this.id = uuidv4();
    this.players = [];
    this.turn = null;
    this.state = 'starting';

    this.dices = Array.from({ length: DICE_COUNT }, () => new Dice());
  }

  addPlayer(player: Player): void {
    if (this.state !== 'starting') {
      throw new JoinAlreadyStartedGameError();
    }

    if (this.players.length >= MAX_GAME_PLAYERS) {
      throw new JoinFullGameError();
    }

    this.players.push(player);

    this.emitDataToSockets();
  }

  getPlayerById(id: PlayerId): Player {
    return this.players.find((player) => player.getData().id === id);
  }

  start(): void {
    if (this.players.length < MIN_GAME_PLAYERS) {
      throw new StartWithoutEnoughPlayersError();
    }

    this.shuffleDecks();
    this.distribute();
    this.state = 'started';

    this.nextTurn();

    this.emitDataToSockets();
  }

  nextTurn(): void {
    this.turn = new Turn(this);
  }

  end(playerData: PlayerData): void {
    this.state = 'ended';
    this.winner = playerData.id;

    console.log(`game won by ${playerData.name} (id: ${playerData.id})`);

    this.emitDataToSockets();
  }

  protected shuffleDecks(): void {
    this.candlesDeck = shuffleArray(candles);
    this.demonsDeck = shuffleArray(demons);
    this.neighborsDeck = new NeighborsDeck({
      cards: neighbors,
    });
  }

  protected distribute(): void {
    this.players.forEach((player) => {
      player.setCandleCard(this.candlesDeck.pop());

      for (let i = 0; i < START_WITH_DEMONS_COUNT; i++) {
        player.addCoveredDemonCard(this.demonsDeck.pop());
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
      neighborsDeck: this.neighborsDeck?.getData(),
    };
  }

  protected toSockets(): BroadcastOperator<
    IServerToClientEvents,
    ISocketSessionData
  > {
    return ioServer.to(this.id);
  }

  emitDataToSockets(): void {
    this.toSockets().emit('gameData', this.getData());
  }
}
