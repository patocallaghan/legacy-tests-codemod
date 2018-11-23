import { setupApplicationTest } from 'ember-qunit';
import { visit, waitFor } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('waitUntil user list', async function(assert) {
    await visit('/developer-signup');
    await waitFor('.js__users-table__body tr');
  });
});
