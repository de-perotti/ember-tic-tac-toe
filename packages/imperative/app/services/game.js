import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GameService extends Service {
  @service store;

  @service('session') sessionService;
  @service('board') boardService;
  @service('tile') tileService;
  @service('player') playerService;
  @service('player-event') playerEventService;

  @tracked state = 'idle';
  @tracked currentPlayer;
  @tracked game;

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
    this._setNextPlayer();
    this.state = 'playing';
  }

  async create() {
    const session = await this.sessionService.getLatest();
    const board = await this.boardService.create(session);
    const tiles = await this.tileService.create(board, 9);
    const players = await this.playerService.create(board, ['x', 'o']);

    return { session, board, tiles, players };
  }

  _setNextPlayer() {
    const currentPlayerIndex = this.game.players.indexOf(this.currentPlayer);
    const newPlayerIndex = (currentPlayerIndex + 1) % this.game.players.length;
    this.currentPlayer = this.game.players[newPlayerIndex];
  }

  _setPlaying(game) {
    this.game = game;
    this.currentPlayer = this.game.players[0];
    this.state = 'playing';
  }

  _setLoading() {
    this.game = undefined;
    this.state = 'loading';
    this.currentPlayer = undefined;
  }
}
