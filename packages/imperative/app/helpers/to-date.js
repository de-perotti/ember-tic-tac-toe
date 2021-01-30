import { helper } from '@ember/component/helper';

export default helper(function toDate([date] /*, hash*/) {
  return new Date(date).toISOString();
});
