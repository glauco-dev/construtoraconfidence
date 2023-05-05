import { module, test } from 'qunit';
import { setupRenderingTest } from 'construtoraconfidence/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | contato', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Contato />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Contato>
        template block text
      </Contato>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
