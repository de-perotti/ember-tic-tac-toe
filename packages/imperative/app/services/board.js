import Service, { inject as service } from '@ember/service';

export default class BoardService extends Service {
  @service store;

  async create(session) {
    const board = this.store.createRecord('board');
    board.sessionHistory = session.history;
    const boardHistory = this.store.createRecord('board-history');
    boardHistory.board = board;
    await boardHistory.save();
    board.history = boardHistory;
    await board.save();
    return board;
  }
}
