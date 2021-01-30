import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service('game') gameService;

  constructor(...args) {
    super(...args);
    this.gameService.newGame().catch(() => {});
  }
}
