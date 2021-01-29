import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  @service game;

  async model() {
    return this.game.create();
  }
}
