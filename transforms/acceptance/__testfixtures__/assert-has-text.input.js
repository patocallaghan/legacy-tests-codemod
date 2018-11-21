import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('assert.hasText', async function(assert) {
    await visit('/developer-signup');
    assert.hasText('Jan 1, 1970', SELECTORS.approvalCreatedAt);
    assert.hasText('Jan 1, 1970', SELECTORS.approvalCreatedAt, 'some message');
  });
});
