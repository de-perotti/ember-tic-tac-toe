import Model, { belongsTo } from '@ember-data/model';

export default class BoardHistoryModel extends Model {
  @belongsTo('board') board;
  @hasMany('player-event') events;
}
