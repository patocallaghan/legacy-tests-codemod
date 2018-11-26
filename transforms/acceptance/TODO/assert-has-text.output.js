import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('assert.hasText', async function(assert) {
    await visit('/developer-signup');
    assert.dom('Jan 1, 1970').hasText(SELECTORS.approvalCreatedAt);
    assert.dom('Jan 1, 1970').hasText(SELECTORS.approvalCreatedAt, 'some message');
  });
});
