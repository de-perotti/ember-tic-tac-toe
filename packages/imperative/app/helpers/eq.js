import { helper } from '@ember/component/helper';

export default helper(function eq(params) {
  const [f] = params;
  return params.every((p) => p === f);
});
