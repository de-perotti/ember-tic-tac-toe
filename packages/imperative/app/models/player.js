import Model, { hasMany } from '@ember-data/model';

export default class PlayerModel extends Model {
  @hasMany('session') sessions;
  @hasMany('board') boards;
  @hasMany('player-event') events;
}
