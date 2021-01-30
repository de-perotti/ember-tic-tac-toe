import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GameService extends Service {
  static boardDimension = [3, 3];
  static tickers = ['x', 'o'];

  @service store;

  @service('session') sessionService;
  @service('board') boardService;
  @service('tile') tileService;
  @service('player') playerService;
  @service('player-event') playerEventService;

  @tracked state = 'idle';
  @tracked currentPlayer;
  @tracked session;
  @tracked board;
  @tracked tiles;
  @tracked players;

  @action
  async newGame() {
    if (this.state === 'loading') {
      return;
    }

    this._setLoading();
    const newGame = await this.create();
    this._setPlaying(newGame);
  }

  @action
  async move(tile, player) {
    if (tile.ticker) {
      return;
    }

    this.state = 'moving';
    tile.ticker = player.ticker;
    tile.event = await this.playerEventService.create({ player, tile });
    await tile.save();

    const actions = {
      win: (winner) => this._setWinner(winner),
      draw: () => this._setDraw(),
      incomplete: () => this._keepPlaying(),
    };

    const { state, winner } = this._getBoardState();
    actions[state](winner);
  }

  async create() {
    const session = await this.sessionService.getLatest();
    const board = await this.boardService.create(session);
    const tiles = await this.tileService.create(
      board,
      GameService.boardDimension
    );
    const players = await this.playerService.create(board, GameService.tickers);

    return {
      session,
      board,
      tiles,
      players,
    };
  }

  _getBoardState() {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];

    for (const condition of winningConditions) {
      const [ticker, ...tickers] = condition.map((i) => this.tiles[i].ticker);

      if (!ticker) {
        continue;
      }

      if (tickers.every((t) => t === ticker)) {
        return { state: 'win', winner: this.currentPlayer };
      }
    }

    if (this.tiles.some((t) => !t.ticker)) {
      return { state: 'incomplete' };
    }

    return { state: 'draw' };
  }

  _setWinner() {
    this.state = 'winner';
  }

  _setDraw() {
    this.state = 'draw';
  }

  _keepPlaying() {
    this._setNextPlayer();
    this.state = 'playing';
  }

  _setNextPlayer() {
    const currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    const newPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
    this.currentPlayer = this.players[newPlayerIndex];
  }

  _setPlaying({ session, board, tiles, players }) {
    this.session = session;
    this.board = board;
    this.tiles = tiles;
    this.players = players;
    this.currentPlayer = this.players[0];
    this.state = 'playing';
  }

  _setLoading() {
    this.state = 'loading';
    this.currentPlayer = undefined;
    this.session = undefined;
    this.board = undefined;
    this.tiles = undefined;
    this.players = undefined;
  }
}
