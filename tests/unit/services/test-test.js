import { module, test } from 'qunit';
import { setupTest } from 'construtoraconfidence/tests/helpers';

module('Unit | Service | test', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:test');
    assert.ok(service);
  });
});
