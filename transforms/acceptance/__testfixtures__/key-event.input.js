import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import { keyEvent } from 'ember-native-dom-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('containerLookup', async function(assert) {
    await visit('/developer-signup');
    await keyEvent(selector, 'keydown', 13);
  });
});
