import { setupApplicationTest } from 'ember-qunit';
import { click } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('clickIgnoreTimers', async function(assert) {
    await click(selector);
  });
});
