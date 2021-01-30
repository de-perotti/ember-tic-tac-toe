import { helper } from '@ember/component/helper';

export default helper(function coalesce(params) {
  return params.reduce((a, b) => a || b, '');
});
