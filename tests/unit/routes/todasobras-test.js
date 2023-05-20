import { module, test } from 'qunit';
import { setupTest } from 'construtoraconfidence/tests/helpers';

module('Unit | Route | todasobras', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:todasobras');
    assert.ok(route);
  });
});
