import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  constructor(...args) {
    super(...args);
    this.newGame().catch(() => {});
  }

  @service('game') gameService;

  @tracked state = 'loading';
  @tracked currentPlayer;
  @tracked game;

  @action
  async newGame(game) {
    if (game) {
      this.setPlaying(game);
      return;
    }

    if (this.isLoading) {
      return;
    }

    this.setLoading();
    const newGame = await this.gameService.create();
    this.setPlaying(newGame);
  }

  setPlaying(game) {
    this.game = game;
    this.currentPlayer = this.game.players[0];
    this.state = 'playing';
  }

  setLoading() {
    this.state = 'loading';
    this.currentPlayer = undefined;
  }
}
