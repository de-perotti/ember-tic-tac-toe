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

  @tracked currentPlayer;
  @tracked isLoading = true;
  @tracked isPlaying = false;
  @tracked game;

  @action
  async newGame(game) {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.isPlaying = false;
    this.currentPlayer = undefined;

    this.game = game || (await this.gameService.create());

    this.currentPlayer = this.game.players[0];
    this.isPlaying = true;
    this.isLoading = false;
  }
}
