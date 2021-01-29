import Model from '@ember-data/model';

export default class UserModel extends Model {
  @hasMany('session') sessions;
}
