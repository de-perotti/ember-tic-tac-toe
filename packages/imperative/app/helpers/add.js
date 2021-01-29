import { helper } from '@ember/component/helper';

export default helper(function add(params /*, hash*/) {
  return params.reduce((a, b) => a + b);
});
