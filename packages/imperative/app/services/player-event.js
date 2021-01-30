import Service, { inject as service } from '@ember/service';

export default class PlayerEventService extends Service {
  @service store;

  async create({ player, tile }) {
    const event = this.store.createRecord('player-event', {
      player,
      tile,
      boardHistory: tile.get('board.history'),
    });
    await event.save();

    return event;
  }
}
