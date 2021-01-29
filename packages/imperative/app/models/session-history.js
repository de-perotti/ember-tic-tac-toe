import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class SessionHistoryModel extends Model {
  @belongsTo('session') session;
  @hasMany('board') boards;
}
