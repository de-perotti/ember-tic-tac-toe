import Model from '@ember-data/model';

export default class PlayerEventModel extends Model {
  @belongsTo('board-history') boardHistory;
  @belongsTo('player') player;
  @belongsTo('tile') tile;
}
