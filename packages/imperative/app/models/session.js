import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class SessionModel extends Model {
  @attr date;

  @belongsTo('user') user;
  @hasMany('player') players;
  @belongsTo('session-history') history;
}
