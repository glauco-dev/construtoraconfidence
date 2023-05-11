import { module, test } from 'qunit';
import { setupRenderingTest } from 'construtoraconfidence/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | apresent-section', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ApresentSection />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <ApresentSection>
        template block text
      </ApresentSection>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
