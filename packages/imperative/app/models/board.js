import Model, { hasMany, belongsTo } from '@ember-data/model';

export default class BoardModel extends Model {
  @belongsTo('session-history') sessionHistory;
  @hasMany('player') players;
  @belongsTo('board-history') history;
  @hasMany('tile') tiles;
}
