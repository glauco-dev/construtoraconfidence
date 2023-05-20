import { module, test } from 'qunit';
import { setupTest } from 'construtoraconfidence/tests/helpers';

module('Unit | Controller | todasobras', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:todasobras');
    assert.ok(controller);
  });
});
