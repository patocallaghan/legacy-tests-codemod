import { setupApplicationTest } from 'ember-qunit';
import { visit, triggerKeyEvent } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('containerLookup', async function(assert) {
    await visit('/developer-signup');
    await triggerKeyEvent(selector, 'keydown', 13);
  });
});
