import Service, { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @service store;

  async getLatest() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const session = await this.store
      .queryRecord(
        'session',
        {
          date: today.getTime(),
        },
        { include: 'user,history,players' }
      )
      .catch(() => null);

    return session || this._create(today);
  }

  async _create(today) {
    const session = this.store.createRecord('session', {
      date: today.getTime(),
    });
    const user = this.store.createRecord('user');
    const history = this.store.createRecord('session-history');

    session.user = user;
    session.history = history;
    await Promise.all([user.save(), history.save(), session.save()]);

    return session;
  }
}
