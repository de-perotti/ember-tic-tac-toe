import Model, { hasMany, attr } from '@ember-data/model';

export default class PlayerModel extends Model {
  @attr('string') ticker;
  @attr('string') name;

  @hasMany('session') sessions;
  @hasMany('board') boards;
  @hasMany('player-event') events;
}
