import Model, { attr, belongsTo } from '@ember-data/model';

export default class PlayerEventModel extends Model {
  @attr date;

  @belongsTo('board-history') boardHistory;
  @belongsTo('player') player;
  @belongsTo('tile') tile;
}
