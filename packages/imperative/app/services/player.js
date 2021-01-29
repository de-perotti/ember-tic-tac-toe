import Service, { inject as service } from '@ember/service';

export default class PlayerService extends Service {
  @service store;

  async create(board, n) {
    const players = Array(n)
      .fill()
      .map(() => this.store.createRecord('player'));
    await Promise.all(
      players.map((t) => {
        t.boards = [board];
        return t.save();
      })
    );
    return players;
  }
}
