import { module, test } from 'qunit';

import { setupTest } from 'construtoraconfidence/tests/helpers';

module('Unit | Adapter | projetos', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:projetos');
    assert.ok(adapter);
  });
});
