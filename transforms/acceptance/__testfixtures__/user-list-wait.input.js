import { setupApplicationTest } from 'ember-qunit';
import { visit, waitUntil } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('waitUntil user list', async function(assert) {
    await visit('/developer-signup');
    // NOTE to codemod author. This transform is specific to this actual selector. No need to handle other selectors.
    await waitUntil(() => find('.js__users-table__body tr'));
  });
});
