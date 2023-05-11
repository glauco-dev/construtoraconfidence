import { module, test } from 'qunit';

import { setupTest } from 'construtoraconfidence/tests/helpers';

module('Unit | Model | obra realizada', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('obra-realizada', {});
    assert.ok(model);
  });
});
