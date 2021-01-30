import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service game;
  model() {
    return this.game.create();
  }

  setupController(controller, model) {
    controller.newGame(model);
  }
}
