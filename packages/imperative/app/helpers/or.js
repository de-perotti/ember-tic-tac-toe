import { helper } from '@ember/component/helper';

export default helper(function or(params /*, hash*/) {
  return params.reduce((a, b) => Boolean(a) || Boolean(b), false);
});
