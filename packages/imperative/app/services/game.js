import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class GameService extends Service {
  @service store;

  @service('session') sessionService;
  @service('board') boardService;
  @service('tile') tileService;
  @service('player') playerService;

  async create() {
    const session = await this.sessionService.getLatest();
    const board = await this.boardService.create(session);
    const tiles = await this.tileService.create(board, 9);
    const players = await this.playerService.create(board, 2);

    return { session, board, tiles, players };
  }
}
