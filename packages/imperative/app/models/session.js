import Model, { hasMany, belongsTo } from '@ember-data/model';

export default class SessionModel extends Model {
  @belongsTo('user') user;
  @hasMany('player') players;
  @belongsTo('session-history') history;
}
