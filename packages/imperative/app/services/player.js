import Service, { inject as service } from '@ember/service';

export default class PlayerService extends Service {
  @service store;

  async create(board, tickers) {
    const players = tickers.map((ticker) =>
      this.store.createRecord('player', { ticker })
    );

    await Promise.all(
      players.map((t) => {
        t.boards = [board];
        return t.save();
      })
    );

    return players;
  }
}
