import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('assert.hasText', async function(assert) {
    await visit('/developer-signup');
    assert.dom(selectors.approvalCreatedAt).hasText('Jan 1, 1970');
    assert.dom(selectors.approvalCreatedAt).hasText('Jan 1, 1970', 'some message');
  });
});
