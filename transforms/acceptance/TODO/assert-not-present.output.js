import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('assert.notPresent', async function(assert) {
    await visit('/developer-signup');
    assert.dom(SELECTORS.banner.title).doesNotExist();
    assert.dom(SELECTORS.banner.title).doesNotExist('message');
  });
});
